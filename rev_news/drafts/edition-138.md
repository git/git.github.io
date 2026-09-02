---
title: Git Rev News Edition 138 (August 31st, 2026)
layout: default
date: 2026-08-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 138 (August 31st, 2026)

Welcome to the 138th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](https://git.github.io).

This edition covers what happened during the months of July and August 2026.

## Discussions

<!---
### General
-->

### Reviews

+ [[PATCH/RFC 0/6] commit-reach: terminate merge-base walk when one side is exhausted](https://lore.kernel.org/git/pull.2149.git.1781951820.gitgitgadget@gmail.com)

Kristofer Karlsson had a monorepo of around 2.6 million commits in
which a very ordinary operation was painfully slow: computing the
merge base between a pull request branch and the mainline took several
seconds. He had described the problem in
[an earlier RFC discussion](https://lore.kernel.org/git/CAL71e4Ps-2_0+uuZu43N9pFnXBemoAohPs_eyRJf8taXHJPAXQ@mail.gmail.com/),
and in June he followed it up with actual code, writing that he
expected "the design to still be scrutinized, but that may be easier
with actual code to look at".

The culprit is `paint_down_to_common()` in `commit-reach.c`, the
function underlying `git merge-base`, `git merge-tree`, and every
command that needs to know where two histories diverged. Kristofer's
cover letter included an ASCII diagram of the shape that triggers the
pathology: a repository import that grafts a separate history with its
own root commit. When the walk from one side reaches a commit with a
very low generation number that the other side never paints, the walk
is forced to drain almost the whole graph before it can convince itself
that it is done. Any merge that introduces a low-generation commit
never painted by the other side has the same effect.

The key observation, and the whole idea behind the series, is that a
new merge-base candidate can only be discovered when exclusive
`PARENT1` and `PARENT2` paint meet. In the initial numbers Kristofer
reported, this turned a 4.293 second `git merge-base --all` across the
import into 8 milliseconds, a 537x improvement, and a 5.345 second
`git merge-tree` into 13 milliseconds.

#### Some background on the paint walk and generation numbers

`paint_down_to_common()` is a single traversal driven by one priority
queue, which holds the frontier of commits waiting to be visited. It
paints the first commit with the flag `PARENT1` and each of the other
commits with `PARENT2`, puts them all in the queue, and then repeats
one step until it can stop: pop the commit with the highest generation
number, and pass its flags to its parents, putting each parent in the
queue if it gained a flag it did not already have.

Painting and enqueuing are therefore the same operation: a commit is
painted precisely when one of its children passes it a flag, and
nothing else can change its paint. A commit holding both `PARENT1` and
`PARENT2` has been reached from both sides, making it a merge-base
candidate. A third flag, `STALE`, then spreads to its ancestors, which
cannot be merge bases themselves.

A generation number, stored in the commit-graph file, records how far
a commit is from a root, and a child's is always greater than its
parent's. Since each pop returns the highest generation left in the
queue, and every child of the popped commit has a higher generation
still, no child of it can ever be popped later, so its paint is
final. That is the property the new optimization depends on: it means
that when one side has no exclusive commits left in the queue, none
can ever reappear, so no new merge-base candidate can turn up and the
walk can stop there.

#### The first round of review

Derrick Stolee reviewed the RFC thoroughly and set the tone for
everything that followed: "Overall, I believe that this implementation
is functionally correct and everything I have to say is about
presentation and data gathering."

His most consequential structural objection was about the first two
patches. Kristofer had moved `ahead_behind()` off the shared
`nonstale_queue` abstraction in order to replace that abstraction with
a new one. Stolee argued this was "essentially recreating its logic
in a more disjointed way here, leaving this code in a worse state",
and asked for a *new* data structure to be introduced alongside the
existing one rather than replacing something that already worked for
multiple callers. Kristofer agreed to leave `ahead_behind()`
untouched.

Stolee also asked for the switch statements tracking paint transitions
to be reformatted per the coding guidelines, questioned whether the
`pq` field name was wise when it could stand for either `prio_queue` or
`paint_queue`, and made a suggestion that shaped the rest of the
series: rather than testing the termination condition in the loop body,
`paint_queue_get()` should return `NULL` when it detects that no further
merge base can be found, so that the loop has a single exit. He
preferred `!count` over summing counters and comparing to zero, too.

Separately, Elijah Newren had independently discovered the same
optimization and had an implementation of his own in
[gitgitgadget PR #2150](https://github.com/gitgitgadget/git/pull/2150).
Rather than compete, the two combined efforts: Elijah's test cases were
folded into the series as a patch authored by him, and Elijah's
criss-cross counterexample from the earlier RFC thread, along with
Stolee's, had already sharpened the halt condition.

When Kristofer wondered how to benchmark reliably given the noise from
commit parsing, Stolee pointed him at
[hyperfine](https://github.com/sharkdp/hyperfine) and showed the exact
invocation for comparing two builds.

#### Measuring the walk instead of the clock

[Version 2](https://lore.kernel.org/git/pull.2149.v2.git.1782303254.gitgitgadget@gmail.com)
reordered the series so that the documentation came first, describing
the algorithm as it already existed, and the tests came before the code
changes so they could be shown passing with the old logic. The
`ahead_behind()` patch was dropped, the new struct was renamed from
`paint_queue` to `paint_state`, and all termination conditions moved
into `paint_queue_get()` as Stolee had suggested.

The most useful addition was one Stolee had implicitly asked for by
requesting better "data gathering": a `trace2_data_intmax()` call
reporting how many commits the paint walk visited. Because step counts
are deterministic, unlike wall-clock times, they can be asserted in the
test suite. Stolee was enthusiastic saying "This is great data", and
suggested going further by reordering the instrumentation patch before
the new tests, so that those tests would carry step-count assertions
from birth and visibly update when the implementation changed. He also
noticed that Kristofer had omitted step counts for one benchmark row.
Kristofer confessed "I will have to attribute to laziness I suppose :)"
and filled in the table.

Junio Hamano, the Git maintainer, read the new technical document and
called it a "Great write-up that very clearly and concisely explains
what goes on inside the merge-base computation. Thanks for a pleasant
read."

#### A self-reported breakage, and a rename

[Version 3](https://lore.kernel.org/git/pull.2149.v3.git.1782479286.gitgitgadget@gmail.com)
consolidated the `min_generation` check and the generation-monotonicity
`BUG()` assertion into `paint_queue_get()` as well, so that
`commit_graph_generation()` is called exactly once per dequeued commit.
Stolee worked through the change out loud, initially doubting that
`last_gen` belonged in the struct and then concluding "This is an
appropriate use of this value. My concerns are no longer valid. Thanks
for letting me think out loud."

This round also broke `t6600`, and Junio ejected it from `seen`.
Kristofer had spotted the mistake himself and self-reported it, but
only in a reply to the individual patch rather than to the cover
letter. Junio was relaxed about it: "Mistakes happen, and do not need
to rush, as collaboration is asynchronous around here anyway, and we
may read our e-mails in different order ;-)", adding that "It would
have been a more troubling experience if only my set-up were seeing the
issue".

René Scharfe reviewed the new `paint_state` struct and asked whether
its counters could ever go negative, suggesting `size_t` to match `nr`
from `struct prio_queue`, and then, in his words, indulged in "some
bikeshedding" about the field names: why abbreviate `p1_count` when
`parent1_count` reads more easily and pairs visibly with the `PARENT1`
flag? [Version 4](https://lore.kernel.org/git/pull.2149.v4.git.1782649547.gitgitgadget@gmail.com)
adopted both suggestions, renaming the counters to `parent1_count`,
`parent2_count` and `mb_candidate_count` and switching them to `size_t`.

#### Growing scope: a test helper and an eight-year-old workaround

SZEDER Gábor made a brief but useful appearance on version 4, pointing
out that the patch removing the now-unused `nonstale_queue_put_dedup()`
and `nonstale_queue_get_dedup()` wrappers had to be squashed into the
preceding one: because the last callers disappeared in that earlier
commit, the tree could no longer be built with `DEVELOPER=1` without
tripping `-Wunused-function`. Kristofer agreed, noting it was
"unfortunate that this means the commit itself becomes less clean, but
I don't have any other good solution -- and having each commit compile
cleanly is more important."

[Version 5](https://lore.kernel.org/git/pull.2149.v5.git.1782923832.gitgitgadget@gmail.com)
grew the series to ten patches with two notable additions. The first
was a `test_trace2_data_singular()` helper for
`t/test-lib-functions.sh`: the existing `test_trace2_data()` is a bare
`grep` that fails silently, whereas the new helper reports whether the
key was missing, appeared more than once, or simply held the wrong
value. Kristofer offered to drop it, calling it possibly "unnecessary
infrastructure", but it survived. New test topologies with deliberate
clock skew were also added, to exercise precisely the cases where
date ordering would break the optimization.

The second addition was much bolder: removing the commit-date ordering
fallback introduced by 091f4cf3 (commit: don't use generation numbers
if not needed, 2018-08-30). That fallback existed because v1
commit-graphs, which stored topological levels rather than corrected
commit dates, could make `git merge-base v4.8 v4.9` on the Linux
kernel walk 636k commits instead of 167k. Side exhaustion solves the
same problem far better. Kristofer measured the step count for that
query dropping to 5,725 on a v1 graph and 3,887 on a v2 graph. And
removing the fallback means the queue is always generation-ordered, so
every termination condition can rely on a single invariant. He noted
that if this patch were kept, his separate
`kk/commit-reach-find-all-fix` topic would become unnecessary.

#### Waiting for reviewers

[Version 6](https://lore.kernel.org/git/pull.2149.v6.git.1783776466.gitgitgadget@gmail.com)
prompted a process aside. Kristofer had written that the series was
"rebased on next", and Junio responded firmly: "As always, do *not*
base your patches on 'next'. I cannot apply such a patch series to my
tree, as merging the resulting topic down to 'master' will pull _all_
the other topics, including those that are not ready", recommending
instead a synthetic base built by merging only the topics actually
depended upon. Kristofer explained he had merely *verified* against
`next` and had in fact prepared exactly such a synthetic base, and that
he should have said so more clearly. Junio replied "Well that is how I
wiggled the series in my tree after all ;-)".

Then the topic stalled for several weeks, and Junio asked the list
plainly: "we really need to get somebody take a look at these patches
to move them forward. Any takers?". Kristofer, unfazed, offered to
shrink the series, dropping the date-ordering cleanup, dropping the
test helper, or squashing test commits, while wondering whether "this
is simply the time of year where people take more vacation and are
thus spending less time on code reviews". Elijah answered the call: "I
started looking at the series and left a couple comments. I'll
continue looking at it on Monday."

#### Naming the region

Elijah's review of
[version 7](https://lore.kernel.org/git/pull.2149.v7.git.1786013982.gitgitgadget@gmail.com)
was detailed and warm, and it repeatedly praised the series structure
rather than just the code. Of the `paint_state` patch, he wrote "Ooh,
I like this setup for what comes later; it sets the stage perfectly
for the key insight behind the optimization". Of the optimization
patch itself, he said "...this is the insight behind this
optimization, which the previous patch set up so nicely."

His substantive concern was about a case the series had glossed over.
With v1 commit-graphs, generation numbers *saturate* at
`GENERATION_NUMBER_V1_MAX`, so many commits at genuinely different
depths share one value, breaking ordering guarantees in exactly the
same way as `GENERATION_NUMBER_INFINITY` does. Elijah asked "What
about `GENERATION_NUMBER_V1_MAX`?" and objected that the documentation
mentioned the problem while the code at that point in the series only
gated on infinity, so patch 8 was internally inconsistent. He also
pushed on vocabulary: rather than "finite-generation region", why not
call it the "reliably-ordered region"? Kristofer liked the coinage,
replying that he would rewrite the documentation to speak of ordered
versus unordered regions, "I think you coined it in one of the other
emails, and I quite prefer that over infinite/finite", and confessed
that "I've always found it easier to write correct code than useful
documentation, so now the real work starts". Version 7 had already
introduced a `topo_ceiling` (`V1_MAX` for v1 graphs, `INFINITY` for
v2) that the early-exit gates compare against, so saturated commits
are treated as unordered.

Junio also spotted that one test patch's commit message described
changes to `t6600` that the diffstat showed happening two patches
later. Kristofer traced it to a reorganisation back at version 5 and
fixed it. Junio, apologising for "nitpicking", added "Maybe others can
give more serious reviews on the topic. This gives us an important
optimization."

#### Conclusion

[Version 8](https://lore.kernel.org/git/pull.2149.v8.git.1786440533.gitgitgadget@gmail.com)
moved `topo_ceiling` into the patch where the side-exhaustion gate
first needs it, so V1 saturation is handled correctly at every commit
in the series, and renamed the "finite/INFINITY region" to
"ordered/unordered region" throughout. Elijah's response was
unreserved:

> I am quite pleased with how this series has turned out. Not only does
> it provide nice speedups, I think the structure of the series is
> particularly nicely set up in a way that helps guide the discovery of
> the idea behind the optimization for others to read, documents and
> tests everything logically and thoroughly, and was a pleasant read.

He added a `Reviewed-by:` trailer, and then a mock complaint that
Kristofer had normalized some double spaces after periods in the
documentation: "Don't think for a second that I didn't notice you
murdering these double spaces. You villain! ;-)" That prompted
Kristofer to wonder whether the project should codify a preference.
Junio ruled that this "is a thing that is best left for 'match the
surrounding area' rule". Junio then asked "We can declare victory and
mark the topic for 'next' now?", and both author and reviewer agreed.

The topic was merged to `master` on 23 August 2026 and should be
released as part of Git 2.56.0 around the end of September 2026.

Beyond the speedups themselves, which will be most visible to anyone
working in a large monorepo or a repository with a grafted import, the
discussion left Git with three lasting artefacts: a new
`Documentation/technical/paint-down-to-common.adoc` explaining an
algorithm that had never been written down, `trace2` step-count
instrumentation that makes future work on the paint walk measurable
without benchmarking wall-clock time, and one fewer special case, now
that the 2018 commit-date ordering fallback has been removed and the
merge-base queue is always generation-ordered.

<!---
### Support
-->

<!---
## Developer Spotlight:
-->

## Other News

__Various__
+ [The August 17 outage, and the work ahead](https://github.blog/news-insights/company-news/the-august-17-outage-and-the-work-ahead/)
  by Vlad Fedorov on GitHub Blog.
+ [Incident with GitHub.com: Incident Report for GitHub](https://www.githubstatus.com/incidents/zkxwbgr0cnmx)
  for August 17, 2026.  On githubstatus\.com.
+ [GitHub blames 8-hour outage on autoscaling fail and VS Code retry storm](https://www.theregister.com/saas/2026/08/19/github-blames-8-hour-outage-on-autoscaling-fail-and-vs-code-retry-storm/5289547)
  by Richard Speed for The Register.
+ [GitHub's Latest Outage Sparks Exodus: Cursor's Origin Emerges as the New Alternative](https://www.alphamatch.ai/blog/cursor-origin-github-outage-2026)
  on AlphaMatch\.AI
+ [GitHub, autoscaling, and the component substitution fallacy](https://surfingcomplexity.blog/2026/08/19/github-autoscaling-and-the-component-substitution-fallacy/)
  by Lorin Hochstein on his Surfing Complexity blog.
+ [GitHub Outages 2025 - 2026: Reliability Analysis and Outage History](https://blog.incidenthub.cloud/github-reliability-outage-history-2025-2026)
  by Hrishikesh Barua on The IncidentHub Blog.
  This article analyzes in depth GitHub's outage history between May 2025 and April 2026.
+ [Stacked pull requests are now in public preview](https://github.blog/changelog/2026-07-30-stacked-pull-requests-are-now-in-public-preview/)
  on GitHub Changelog.


__Light reading__
+ [How and Why to Ditch GitHub](https://taggart-tech.com/migrate-to-codeberg/)
  (and migrate to Codeberg) by Michael Taggart on his Taggart Tech blog.
+ [GitHub has alternatives, but no replacement](https://lalitm.com/post/github-alternatives/)
  by Lalit Maganti on their blog.
+ [Issues in the Repo](https://nesbitt.io/2026/08/20/issues-in-the-repo.html)
  by Andrew Nesbitt on his blog.
  This article provides systematic survey of tools
  that keep issue and review data inside the repository
  so it clones and pushes with the code.
  Inspired by the recent GitHub outage, with issues and pull request threads going dark.
+ [Git at any scale](https://cursor.com/blog/git-at-any-scale)
  by Vicent Martí on Cursor blog.<br>
  See also [How Cursor beat Git's scalability shortcomings](https://www.theregister.com/devops/2026/08/23/how-cursor-beat-gits-scalability-shortcomings/5291421)
  by Joab Jackson for The Register.
+ [20× the CI traffic without getting slower: How we rebuilt Git serving at Datadog](https://www.datadoghq.com/blog/engineering/gitretriever/)
  by Mike Thompson and Daniel Esponda on Datadog HQ Blog.
+ [distributed identity](https://jyn.dev/distributed-identity/)
  by Jynn Nelson on the website of jyn.
  This article talks about the problem of changing e-mail or changing identity
  in Git, Mercurial and ATproto (the protocol powering Bluesky),
  trying to solve one of three problems: changing names and emails after the fact,
  doing it in a way that's time-based instead of identity-based (new name after some date),
  and doing it in such a way that the previous name isn't detectable.
    + The article mentions [Tangled.sh](https://tangled.org), which is
      a new social-enabled Git collaboration platform built on top of AT Protocol / ATProto,
      only in passing.
      It does not address other decentralized code hosting and collaboration platforms like
      [Radicle](https://radicle.xyz/) or [Grasp](https://gitgrasp.com/).
      <br>
      Tangled was first mentioned in [Git Rev News Edition #125](https://git.github.io/rev_news/2025/07/31/edition-125/),
      and most recently in [Edition #137](https://git.github.io/rev_news/2026/07/31/edition-137/).
    + See also [Too many words about DIDs](https://steveklabnik.com/writing/too-many-words-about-dids/)
      (“Decentralized Identity” standard) by Steve Klabnik,
      mentioned in [Git Rev News Edition #137](https://git.github.io/rev_news/2026/07/31/edition-137/).
+ [Run your own CI](https://blog.tangled.org/selfhost-ci/)
  by oppi.li on Tangled Blog.  Possibly inspired by the August 17th GitHub outage.
  Advertises Tangled (and provides links to articles about CI and Tangled).
+ [Git worktrees are not an isolation boundary for coding agents](https://fletch.sh/blog/git-worktrees-vs-clones-for-ai-agents/)
  by Alex Chaplinsky on Fletch Blog.
  It is a good addition to all the articles about Git worktrees for AI agents,
  and all specialized tools for managing worktrees, mentioned in recent editions.
+ [Git Submodules as a Package Manager](https://nesbitt.io/2026/09/01/git-submodules-as-a-package-manager.html)
  by Andrew Nesbitt on his blog.
+ [How I Learned to Stop Worrying and Love the Monorepo](https://www.eamoncaddigan.net/posts/git-monorepos/)
  by Eamon Caddigan on his Potentially Useful blog.<br>
  A reminder: a _monorepo_ or _monorepository_ is a software-development strategy
  in which the code for a number of projects is stored in the same repository.
+ [Sign Git Commits With SSH Keys: Git & GitHub Setup for Signed Commits & Verification](https://scratchbuffer.net/topics/developer-tools/git-commit-sign-ssh/)
  by Franco Posa on ScratchBuffer.
+ [git: cd from linked worktree to main checkout](https://perrotta.dev/2026/08/git-cd-from-worktree-to-main-checkout/)
  (using a shell function)
  by Thiago Perrotta on just serendipity blog.
+ [Why I still hand write my commit messages](https://www.jvt.me/posts/2026/08/17/hand-write-commits/),
  [My new workflow for local code review with `tuicr`](https://www.jvt.me/posts/2026/08/25/tuicr/),
  [Updating dependent branches when rebasing, automagically](https://www.jvt.me/posts/2026/08/25/git-rebase-update-refs/) with `git rebase -i --update-refs`, and
  [What commit did I branch off from?](https://www.jvt.me/posts/2026/08/23/determine-branch/) with `git merge-base`,
  by Jamie Tanna on his blog.
+ [The comments that go into code versus those that go into the pull request description](https://devblogs.microsoft.com/oldnewthing/20260812-00/?p=112607)
  by Raymond Chen on Microsoft Dev Blogs.
+ [Commit message test plans](https://blog.waleedkhan.name/commit-message-test-plans/)
  with [`scrut`](https://facebookincubator.github.io/scrut/)
  by Waleed Khan on Steno & PL personal blog.
+ [GitHub suspended my account 2h after my project went viral — what I've learned about the appeal process so far](https://www.reddit.com/r/git/comments/1vukp5b/github_suspended_my_account_2h_after_my_project/)
  by 0\_KermitTheFrog\_0 on r/git sub-Reddit.
+ [GitHub Actions needs OpenID Connect (OIDC) audience constraints](https://blog.yossarian.net/2026/08/10/github-actions-needs-oidc-audience-constraints),
  by William Woodruff (yossarian) on his personal site.
+ [Feature comparison of ack, ag, git-grep, GNU grep and ripgrep](https://beyondgrep.com/feature-comparison/)
  by ack, a grep-like source code search tool.

<!---
__Easy watching__
-->

__Git tools and sites__
+ [upd.dev](https://www.upd.dev/): Code hosting for people who still love code.
  Free as in freedom, free as in beer.
  The engine is [Forgejo](https://forgejo.org/),
  the diffs come from [Pierre](https://diffs.com/).
+ [Gitoro](https://gitoro.com/): Git and CI/CD, hosted in Europe.
  Repositories, pipelines, and code review, run on OVHcloud infrastructure in the EU.
  Needs log in to browse repositories.
+ [git.vodka](https://git.vodka/~c/git-vodka)
  is a small Git hosting service built as one Cloudflare Worker.
  Repository metadata, refs, users, and token relationships live in D1.
  Incoming packs, canonical Git objects, and archived packfiles live in R2.
  The browser UI is server-rendered HTML/CSS with no JavaScript.
  Written in TypeScript, under MIT license.
+ [durable-git](https://github.com/littledivy/durable-git) (formerly dgit)
  is a Git server for Cloudflare Workers and for your own machines with celld.
  Each repository is a Durable Object: a small server with a name
  and a private SQLite database that holds the repository's objects and refs,
  speaks the Git smart HTTP protocol to a stock Git client,
  and renders a cgit-style web interface.
  Written in TypeScript, under MIT license.
+ [Gitignore Debugger](https://ignoredebugger.com/) is an on-line service
  that helps you find out exactly why Git isn't ignoring your file.
  Free, no signup, and everything runs in the browser.
  An alternative to `git check-ignore -v`.
+ [drift](https://github.com/aymanbagabas/drift) is a Git diff pager with terminal UI:
  syntax highlighting, word-level change emphasis, split or unified views,
  a file-list modal and a live sidebar you can click and drag
  to resize, jump-to-hunk, in-file search, open-in-$EDITOR,
  and a live mode that repaints the moment your index or branch moves.
  You can point it at a commit, your staging area, or your working tree,
  or just pipe a diff into it like any other pager.
  Written in Rust, under MIT license.
+ [git-knife](https://github.com/TheRealYT/git-knife) is a desktop GUI
  for editing Git commit metadata directly — message, author date, committer date, author name/email.
  It fills the gap between existing GUIs with some commit editing capabilities
  (like GitKraken, Sublime Merge, Fork, lazygit), and tools for editing a Git repository
  (`git-filter-repo`, `git rebase` env tricks, `git commit-tree`) without a GUI.
  It never reimplements Git — it shells out to the system `git` CLI
  and rebuilds commits with `git commit-tree`, reusing each commit's original tree
  so file contents are provably never changed.
  Written in Rust (and TypeScript) using the Tauri application framework,
  no license provided.
+ [GitComet](https://github.com/Auto-Explore/GitComet) is a Git GUI
  built for teams that want fast Git operations
  with local-first privacy, familiar workflows, and open source freedom.
  It can be used as a standalone diff and merge tool
  invoked by `git difftool` and `git mergetool`.
  Available for Linux, Windows, and macOS.
  Written in Rust, under GNU Affero General Public License Version 3 (AGPL-3.0-only).
+ [Maiao](https://github.com/runetes/maiao) brings the power of **stacked pull requests** (or merge requests)
  to your Git hosting provider, enabling you to break large features
  into small, reviewable commits where each commit becomes its own PR/MR.
  It provides a Gerrit-style code review workflow
  for GitHub, GitLab, Gitea, Forgejo, Bitbucket Cloud, and Cursor Origin.
  Written in Go, under MIT license.
+ [`tuicr`](https://github.com/agavra/tuicr) is a code review TUI with vim keybindings.
  Export to GitHub, GitLab, Bitbucket, or clipboard.
  Written in Rust, under MIT license.
+ [Marvelous](https://github.com/stevenjjobson/marvelous) is a fast, standalone
  desktop Markdown reader/editor featuring a clean interface
  with improved object rendering for lists, tables and mermaid graphs,
  and with Git awareness and diff review support.  Tuned for reading an AI-written wiki.
  Written in TypeScript and Rust, under MIT license.

* [crux](https://github.com/Emran-goat/crux) by Emran is a CLI that finds the exact commit which changed a program's behavior, then minimizes that commit down to the lines that caused the change. It handles cases git bisect can't: behaviors that aren't pass/fail tests, failures that need two commits together, and regressions caused by dependency updates. ([crates.io](https://crates.io/crates/crux-finder))


## Releases

+ Git for Windows [v2.55.0(5)](https://github.com/git-for-windows/git/releases/tag/v2.55.0.windows.5),
[v2.53.0(4)](https://github.com/git-for-windows/git/releases/tag/v2.53.0.windows.4),
[v2.55.0(4)](https://github.com/git-for-windows/git/releases/tag/v2.55.0.windows.4),
[v2.54.0(3)](https://github.com/git-for-windows/git/releases/tag/v2.54.0.windows.3)
+ libgit2 [1.9.7](https://github.com/libgit2/libgit2/releases/tag/v1.9.7)
+ gitoxide [0.58.0](https://github.com/GitoxideLabs/gitoxide/releases/tag/v0.58.0),
[0.57.0](https://github.com/GitoxideLabs/gitoxide/releases/tag/v0.57.0)
+ GitHub Enterprise [3.22.0](https://docs.github.com/enterprise-server@3.22/admin/release-notes#3.22.0),
[3.21.4](https://docs.github.com/enterprise-server@3.21/admin/release-notes#3.21.4),
[3.20.6](https://docs.github.com/enterprise-server@3.20/admin/release-notes#3.20.6),
[3.19.10](https://docs.github.com/enterprise-server@3.19/admin/release-notes#3.19.10),
[3.18.13](https://docs.github.com/enterprise-server@3.18/admin/release-notes#3.18.13),
[3.17.19](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.19)
+ GitLab [19.4](https://docs.gitlab.com/releases/19/gitlab-19-4-released/),
[19.3](https://docs.gitlab.com/releases/19/gitlab-19-3-released/)
+ Gitea [1.27.3](https://github.com/go-gitea/gitea/releases/tag/v1.27.3),
[1.27.2](https://github.com/go-gitea/gitea/releases/tag/v1.27.2)
+ GitKraken [12.4.0](https://help.gitkraken.com/gitkraken-desktop/current/)
+ GitHub Desktop [3.6.4](https://desktop.github.com/release-notes/)
+ lazygit [0.64.1](https://github.com/jesseduffield/lazygit/releases/tag/v0.64.1),
[0.64.0](https://github.com/jesseduffield/lazygit/releases/tag/v0.64.0)
+ Garden [2.6.2](https://github.com/garden-rs/garden/releases/tag/v2.6.2)
+ GitButler [0.22.3](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.22.3),
[0.22.2](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.22.2)
+ difftastic [0.70.0](https://github.com/Wilfred/difftastic/releases/tag/0.70.0)
+ git-lfs [3.8.0](https://github.com/git-lfs/git-lfs/releases/tag/v3.8.0)
+ b4 [0.16.0](https://github.com/mricon/b4/releases/tag/v0.16.0)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Simone Arpe and Tuomas Ahola.
