---
title: Git Rev News Edition 136 (June 30th, 2026)
layout: default
date: 2026-06-30 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 136 (June 30th, 2026)

Welcome to the 136th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](https://git.github.io).

This edition covers what happened during the months of May and June 2026.

## Discussions

<!---
### General
-->


### Reviews

+ [[PATCH 0/3] Batch prefetching](https://lore.kernel.org/git/pull.2089.git.1776379694.gitgitgadget@gmail.com)

  Elijah Newren sent a 3 patch series to improve the performance of a
  couple of commands in [partial clones](https://git-scm.com/docs/partial-clone).
  The work was spurred by a real-world report where `git cherry` jobs were each
  doing hundreds of single-blob fetches, at a cost of around 3 seconds
  each, so that batching those downloads should dramatically speed up
  such jobs. As Elijah put it, he "decided to fix up `git grep`
  similarly while at it". The series also corrected a small
  documentation typo he had noticed in `patch-ids.h` (a missing
  trailing parenthesis in a comment), as a preparatory fixup.

  For readers unfamiliar with the trade-off, partial clones let users
  avoid downloading blobs upfront, at the expense of needing to
  download them later as they run other commands. That trade-off can
  sometimes be more painful than expected: when the needed blobs are
  discovered one at a time as they are accessed, each one triggers a
  separate network round-trip. Some commands like `checkout`, `diff`,
  and `merge` already mitigate this by doing batch prefetches of the
  blobs they will need, which dramatically reduces the cost of
  on-demand loading. The aim of this series was to extend that ability
  to two more commands, `git cherry` and `git grep`.

  The interesting part for `git cherry` is how to figure out,
  *without* fetching anything yet, which blobs will eventually be
  needed. As Elijah explained, `git cherry` works in two phases: it
  first computes header-only patch IDs (based on file paths and
  modes), and only falls back to full content-based IDs when the
  header-only IDs collide. Those full IDs are what requires reading
  blob content, and the comparison is driven by a hashmap whose
  comparison function, `patch_id_neq()`, is exactly what triggers the
  on-demand fetches. To enumerate the colliding blobs ahead of time,
  the patch temporarily swaps the hashmap's comparison function for a
  trivial `always_match()` function, walks the entries that would
  collide to collect their blob OIDs into an `oidset`, restores the
  original comparison function, and then fetches everything in a
  single batch via `promisor_remote_get_direct()`. A helper,
  `collect_diff_blob_oids()`, lists the blob OIDs touched by a
  commit's diff. It leaves out files that are explicitly marked as
  binary in the userdiff configuration, because for those files
  the `patch_id` just hashes the OID with `oid_to_hex()` instead of
  reading the blob, so there is no point downloading them.

  While `git cherry` relies on hashmap comparisons, the `git grep` patch
  takes an analogous but simpler approach: it adds a preliminary walk
  over the tree (similar to `grep_tree()`) that collects the blobs of
  interest and prefetches them in one go.

  Junio Hamano, the Git maintainer, took a first look and immediately
  spotted something that did not belong: the series added a 210-line
  `investigations/cherry-prefetch-design-spec.md` file to the
  project. He pointed out that, as a document describing how
  `git cherry` works, it was "vastly lacking", that much of its content
  was the sort of material that would normally go into a commit message,
  and that he was "not sure how others would benefit from being able
  to read it" once the series landed. Elijah's reply was short and to
  the point: "Ugh, no, sorry." That stray file had been committed by
  mistake.

  Elijah quickly sent [version 2](https://lore.kernel.org/git/pull.2089.v2.git.1776472347.gitgitgadget@gmail.com),
  whose only change compared to v1 was to remove that stray file,
  noting it was "So embarrassing that I didn't catch that before
  submitting."

  Phillip Wood reviewed v2 and made an interesting connection:
  `git rebase` without `--reapply-cherry-picks` suffers from the same
  problem, since it does the equivalent of `git log --cherry-pick`. He
  asked whether `prefetch_cherry_blobs()` could be shared with the
  cherry-pick detection in `revision.c`. Elijah agreed the connection
  was correct, explaining that `git rebase` (without
  `--reapply-cherry-picks`) and `git log --cherry-pick` both go
  through `cherry_pick_list()` in `revision.c`, which has the same
  shape as the loop in `cmd_cherry()` and triggers fetches from the
  same `patch_id_neq()` callback. He even sketched what sharing the
  code would look like.

  However, he preferred to leave that out of the current series,
  expressing reservations about expanding partial-clone support
  further into this area: `git cherry`, `git log --cherry-pick`, and
  the default cherry-pick detection in `git rebase` all exist to
  answer "has this patch already landed upstream?", a question that,
  in repositories large enough to need partial clones, he felt "is
  rarely worth the cost of computing patch-ids across arbitrary
  amounts of history." His honest guidance for users on a large
  repository would be to pass `--reapply-cherry-picks` (with rebase)
  and skip the detection entirely, or to narrow the range under
  consideration. He noted that the omission of a
  `--no-reapply-cherry-picks` option in `git replay` had been a
  deliberate choice rather than an oversight. He had only implemented
  the `git cherry` fix because of a specific customer whose tooling
  had already baked in the operation, and prefetching at least made
  the worst case tolerable. He added that he would happily review a
  patch from anyone wanting to carry the shared code forward.

  Phillip continued the exchange with several good questions, asking
  whether patch IDs are computed for every upstream commit or just the
  ones modifying the same paths, and remarking that it "is a shame
  that we don't have a config setting for `--reapply-cherry-picks` as
  it is easy to forget to pass that option" (a setting made awkward
  because the apply backend does not support that option). He was also
  "a bit surprised customers aren't complaining about tools that use
  `git rebase` being slow."

  Elijah replied that determining which upstream commits modify the
  same paths still requires walking the upstream commits and doing a
  tree-diff for each, and that in the biggest repositories "even a
  merge-base operation can start to feel expensive." On the surprise
  about rebase, he answered "Are you sure they aren't complaining?",
  explaining that the merging parts of a rebase already do batch
  prefetching, but the cherry-pick-detection part does not. He also
  noted that the customer in question was using `git replay` rather
  than `git rebase`, probably because early versions of `git replay`
  lacked the drop-commits-that-become-empty logic that Phillip later
  added (he thanked Phillip again for that), and that the prefetch
  patch lets things stay fast even if they keep their `git cherry`
  calls.

  Derrick Stolee then reviewed v2, reading both the `git cherry` and
  `git grep` patches together. He worried that
  `collect_diff_blob_oids()` being "hidden in builtin/log.c may not be
  the right long-term home", anticipating more and more cases where
  Git would want to prefetch blobs, and wondered whether the logic
  could take advantage of, or live alongside, the existing
  `diff_queued_diff_prefetch()` within `diffcore_std()` in
  `diff.c`. He framed the `git cherry` patch as caring about a diff
  and the `git grep` patch as caring about a "scan prep", suggesting
  `git archive` as a closer analog for the latter than `checkout`. He
  was careful to add that he did not mean to complicate the series and
  was "most interested in having this logic be more reusable in the
  future without needing to move code across files."

  Junio, seeing that Stolee's two review messages had gone unanswered
  for a while, asked whether he should keep the patches in his tree
  "hoping that responses may come some day", and said he would mark
  the topic as expecting review responses in the draft "What's
  cooking" report for the time being. Elijah apologized for the delay,
  explaining he had been pulled into firefighting and remediation
  duties after a number of incidents at work, and suggested marking
  the series as expecting a re-roll since Stolee had asked for an
  additional test.

  Elijah then answered Stolee's reusability question in detail. He
  read the patch differently: `collect_diff_blob_oids()` already leans
  on the diff library at the per-commit level (`diff_tree_oid()` plus
  `diffcore_std()`), and the real value of the series lives *above*
  the diff library, in the accumulation across many commits.

  Concretely, the motivating case was a patch touching a few files
  where upstream had tens of thousands of commits in the relevant
  range, several hundred of which modified the same set of files: a
  per-diff prefetch like `diff.c` uses would turn that into hundreds
  of small fetches, "what this series gives you is one fetch." He
  pointed out two further `git cherry`-specific filters that he felt
  did not belong in the diff library: most commits are skipped before
  patch-ID is even computed (so prefetching for them would be wasted),
  and content for binary files is skipped because patch-ID uses
  `oid_to_hex()` for them. To check Stolee's idea concretely, he
  reviewed all of the existing `promisor_remote_get_direct()` call
  sites and concluded that none of them shared the "diff two trees and
  harvest OIDs" shape, so there was no natural shared layer above the
  `promisor_remote_get_direct()` primitive itself. He agreed
  `git archive` would be the closest analog if it ever grew prefetch
  logic, and proposed factoring out a tree-walk helper only when a
  second caller actually wanted one.

  For the `git grep` patch, Stolee asked for a test that exercises a
  pathspec filter, with files like `matches.txt`, `nomatch.txt`, and
  `matches.md`, so that `git grep -c "needle" HEAD -- *.txt` would
  download only the matching subset. This turned out to be more
  valuable than a simple test improvement: Elijah replied "Yes,
  absolutely", and discovered that while he was handling pathspecs
  correctly, he was unconditionally requesting whatever objects
  matched the pathspecs even when those blobs were already present
  locally. He promised to send a fix along with the updated test.

  That fix arrived in [version 3](https://lore.kernel.org/git/pull.2089.v3.git.1778775928.gitgitgadget@gmail.com),
  which made three changes compared to v2:

  - the final patch's test case was updated, as Stolee had suggested,
    to exercise a pathspec,

  - the last two patches were modified to avoid re-downloading blobs
    already present locally (checking with
    `odb_read_object_info_extended()` and `OBJECT_INFO_FOR_PREFETCH`
    on the `git cherry` side, and `odb_has_object()` on the `git grep`
    side), with the tests adjusted to verify it, and

  - a new first patch was inserted documenting the filtering contract
    of `promisor_remote_get_direct()`.

  That documentation patch explains that the function does not filter
  out OIDs already present locally on its happy path, so callers are
  responsible for filtering and deduplicating themselves. Elijah
  candidly noted in the commit message that he "missed this originally
  and wrote two problematic callers". He also mentioned that he had
  not pursued Stolee's code-sharing suggestion, since it appeared to
  be based on a misunderstanding that the `git cherry` patch was about
  a diff.

  Stolee reviewed v3 and declared it "good to go", graciously adding
  that Elijah's detailed responses in the v2 thread "helped me
  understand that my thought was misguided" and gave him "extra
  confidence" in the approach. Junio agreed the series was "in a good
  shape" and marked the topic for the `next` branch. Elijah thanked
  Stolee one more time, noting that the comments on the `git grep`
  patch in particular "led me to what would have been a rather
  annoying bug", so calling out the test improvement had been time
  well spent.

  In the end, the series was merged into the `master` branch and is part
  of the recent v2.55.0 release. A concrete customer pain point led to
  extending Git's existing batch-prefetching habit to two more
  commands, `git cherry` and `git grep`, as well as a bug fix and
  improved documentation. The thread also clarified the boundaries of
  partial-clone friendliness for cherry-pick detection, leaving the
  door open for sharing the new code with `git rebase` and
  `git log --cherry-pick`, should someone wish to carry that work
  forward.

<!---
### Support
-->

<!---
## Developer Spotlight:
-->

## Other News

__Events__
+ [Recapping the Mercurial's London sprint](https://mercurial-scm.org/news/2026/0005-london-sprint-recap).

__Various__
+ [What's new in Git 2.55.0?](https://about.gitlab.com/blog/whats-new-in-git-2-55-0/)
  by Toon Claes on GitLab Blog.  Mentions a new git-history(1) fixup command,
  an fsmonitor daemon for Linux, pushing to remote groups, and more.
+ [Highlights from Git 2.55](https://github.blog/open-source/git/highlights-from-git-2-55/)
  by Taylor Blau on GitHub Blog.  Mentions repacking with incremental multi-pack indexes,
  fixing up earlier commits with `git history`, running config based hooks in parallel,
  an inotify-based fsmonitor daemon for Linux, faster generation of reachability bitmaps
  and pseudo-merge bitmaps improvements, new experimental `git format-rev` command,
  push groups, and more.
+ [I discovered a large-scale malware distribution campaign on GitHub](https://orchidfiles.com/github-repositories-distributing-malware/)
  by Orchid (@orchidfiles).
+ [Git good with Epic Games' new open source VCS, Lore](https://www.theregister.com/devops/2026/06/17/git-good-with-epic-games-new-open-source-vcs-lore/5257978)
  by Brandon Vigliarolo on The Register.
  [Lore](https://lore.org/) began its life as Unreal Revision Control.
    + Compare [Unity Version Control](https://unity.com/features/version-control), formerly Plastic SCM,
      mentioned in passing in [Git Rev News Edition #99](https://git.github.io/rev_news/2023/05/31/edition-99/),
      then in [Edition #101](https://git.github.io/rev_news/2023/07/31/edition-101/).
    + Compare [Ark VCS](https://ark-vcs.com/), a new proprietary version control system for games,
      mentioned in [Git Rev News Edition #134](https://git.github.io/rev_news/2026/04/30/edition-134/).
    + See also [Git for games: current problems and solutions video](https://www.youtube.com/watch?v=K3zOhU3NdWA&list=PL0lo9MOBetEFqBue4vNcTEnkBjgIQU1Q3&index=7) from Git Merge 2019,
      mentioned in [Git Rev News Edition #48](https://git.github.io/rev_news/2019/02/27/edition-48/),
      with a link to the video posted in [Edition #101](https://git.github.io/rev_news/2023/07/31/edition-101/).
+ [Git is forever. I'm building Oak anyways.](https://oak.space/blog#git-is-forever)
  by Zach Geier on the Oak tool blog.<br>
  [Oak](https://oak.space/) intends to be a new type of version control
  designed for how humans and agents build software together.
+ [Beagle the revision control system](https://replicated.wiki/blog/partI.html)
  (part [I](https://replicated.wiki/blog/partI.html),
  [II](https://replicated.wiki/blog/partII.html),
  [III](https://replicated.wiki/blog/partIII.html))
  and [Beagle: git, URIs and all the dirty words](https://replicated.wiki/blog/uris.html).<br>
  [Beagle SCM](https://replicated.wiki/) intends to be a Git-compatible LLM-age source code management system.
+ [Software Is Made Between Commits](https://zed.dev/blog/introducing-deltadb)
  by Nathan Sobo on Zed editor blog,
  about [DeltaDB](https://zed.dev/deltadb), a version control system (in beta)
  built for work with AI agents, that records the work as it unfolds
  and keeps every change connected to the conversation that shaped it.
    + Contrast the [Gram](https://gram.liten.app/) editor,
      which started as a [fork](https://gram.liten.app/why/) of the Zed editor
      without all the AI.<br>
      See the [You Can Now Disable All AI Features in Zed](https://zed.dev/blog/disable-ai-features)
      blog post by Franciska Dethlefsen.
+ [Cursor, GitLab and Zed agree GitHub is breaking. They disagree on how to rebuild it.](https://thenewstack.io/cursor-origin-github-disruption/)
  by Paul Sawers on TheNewStack.
  Mentions Cursor's [Origin](https://cursor.com/origin),
  GitLab's [Project Switch](https://about.gitlab.com/blog/gitlab-transcend-announcements/),
  and Zed's [DeltaDB](https://zed.dev/deltadb).
+ [How to make best use of git and GitHub for AI-assisted software development](https://blog.jonudell.net/2026/06/02/how-to-make-best-use-of-git-and-github-for-ai-assisted-software-development/)
  by Jon Udell on his blog,
  about [Bram](https://github.com/judell/bram) (Bram runs agents mindfully),
  a desktop app that helps you make best use of Git and GitHub
  for AI-assisted software development.


__Light reading__
+ [Grit: rewriting Git in (library-first) Rust with agents](https://blog.gitbutler.com/true-grit)
  by Scott Chacon on Butler's Log.
+ [The World Before Git. How did Git come to be?](https://osshistory.org/p/the-world-before-git)
  by Sarup Banskota on OSS History (2023).
+ [A History of Source Control Systems: SCCS and RCS (Part 1)](https://experimentalworks.net/posts/2024-03-18-a-history-of-vcs-part1/)
  by David Soria Parra on his blog (2024).
+ [Signing is for the bad days](https://nesbitt.io/2026/05/24/signing-is-for-the-bad-days.html)
  by Andrew Nesbitt on his blog, about tools for supply-chain security:
  [TUF (The Update Framework)](https://theupdateframework.io/) - which protects
  the last hop, from the repository to the machine doing the install
  (mentioned in passing in [Git Rev News Edition #104](https://git.github.io/rev_news/2023/10/31/edition-104/));
  [in-toto](https://in-toto.io/) - which protects the build pipeline; and
  [Sigstore](https://www.sigstore.dev/) - which allows to remove long-lived keys
  and for the developer to authenticate with <abbr title="OpenID Connect">OIDC</abbr>
  identities you already have, like GitHub Actions, Google, etc.,
  where [Fulcio](https://github.com/sigstore/fulcio) issues
  a short-lived code-signing certificate bound to that OIDC identity valid for ten minutes,
  and the signature and cert go into [Sigstore Rekor](https://github.com/sigstore/rekor),
  a public append-only transparency log
  (Sigstore was first mentioned in [Git Rev News Edition #91](https://git.github.io/rev_news/2022/09/30/edition-91/)
  and Sigstore Rekor in [Edition #111](https://git.github.io/rev_news/2024/05/31/edition-111/)).
+ [gittuf - a signed log for git refs](https://nesbitt.io/2026/06/04/gittuf-a-signed-log-for-git-refs.html)
  by Andrew Nesbitt on his blog
  ([gittuf](https://gittuf.dev/) was mentioned in
  [Git Rev News Edition #104](https://git.github.io/rev_news/2023/10/31/edition-104/) and
  in [Edition #111](https://git.github.io/rev_news/2024/05/31/edition-111/)).
    + See also the [Securing Git repositories with gittuf](https://lwn.net/Articles/972467/)
      article by Joe Brockmeier on LWN\.net, a report of a talk at OSSNA; video of the talk:
      [Securing Git Repositories with Gittuf - Aditya Sirish A Yelgundhalli & Billy Lynch](https://www.youtube.com/watch?v=eCSeIEdMbCw).
      Mentioned in [Git Rev News Edition #111](https://git.github.io/rev_news/2024/05/31/edition-111/).
+ [Open source security at Astral](https://astral.sh/blog/open-source-security-at-astral)
  by William Woodruff (@woodruffw) on Astral blog.
+ [GitHub Actions is a trap](https://tylercipriani.com/blog/2026/04/24/on-the-software-supply-chain-doom-spiral/)
  by Tyler Cipriani on his blog.
+ [What are git worktrees, and why should I use them?](https://github.blog/ai-and-ml/github-copilot/what-are-git-worktrees-and-why-should-i-use-them/)
  by Cassidy Williams·(@cassidoo) on GitHub Blog, in AI & ML section.
+ [Git Worktree - Practical workflow with a central bare repo](https://nakatechlabs.com/blog/2025/git-worktree/)
  by Aito Nakajima on NakaTechLabs.
+ [Git Worktrees with Bare Repos: A Clean Setup for Modern Development](https://medium.com/@miladpw/git-worktrees-with-bare-repos-a-clean-setup-for-modern-development-c5b251ee7b73)
  by Milad on his Medium-hosted blog.
+ [Git Worktrees Step-By-Step](https://infrequently.org/2021/07/worktrees-step-by-step/)
  by Alex Russel on his Infrequently Noted blog (2011).
+ [One Line Fuzzy Find for Git Worktree](https://www.olafalders.com/2024/06/14/one-line-fuzzy-find-for-git-worktree/)
  using [`fzf`](https://junegunn.github.io/fzf/) (command-line fuzzy finder),
  by Olaf Alders on his blog (2024).
+ [Jujutsu: The Git Upgrade You Didn't Know You Needed](https://www.git-tower.com/blog/jujutsu)
  by Bruno Brito on Git Tower blog.
    + [Jujutsu](https://jj-vcs.dev/) (`jj`) is a Git-compatible version control system
      written in Rust, which was first mentioned in [Git Rev News Edition #85](https://git.github.io/rev_news/2022/03/31/edition-85/),
      and most recently in [Edition #135](https://git.github.io/rev_news/2026/05/31/edition-135/).
+ [Tangled CI runs on microVMs](https://blog.tangled.org/spindle-microvm/):
  How we built spindle's new [QEMU-based microVM](https://www.qemu.org/docs/master/system/i386/microvm.html) engine.
  Written by ptr.pet on Tangled blog.
    + [Tangled](https://tangled.org/) is a decentralized code hosting and collaboration platform,
      built on top of [AT Protocol](https://atproto.com/) (ATProto)
      (powering the [BlueSky](https://bsky.app/) microblogging federated social media service),
      which was first mentioned in [Git Rev News Edition #125](https://git.github.io/rev_news/2025/07/31/edition-125/).
    + See also [introducing spindle](https://blog.tangled.sh/ci),
      mentioned in [Edition #126](https://git.github.io/rev_news/2025/08/31/edition-126/).
+ [Stop Using Conventional Commits](https://sumnerevans.com/posts/software-engineering/stop-using-conventional-commits/)
  by Sumner Evans on his blog, recommending prioritizing scope over change type.
    + Compare [Conventional Commits considered harmful](https://larr.net/p/cc.html)
       rant by Salih Muhammed, mentioned in [Git Rev News Edition #128](https://git.github.io/rev_news/2025/10/31/edition-128/).
    + The [Conventional Commits](https://www.conventionalcommits.org/) specification
      was first mentioned in [Git Rev News Edition #52](https://git.github.io/rev_news/2019/06/28/edition-52/),
      and in many editions since.
+ [Using git's rerere feature to escape recurring conflict hell](https://gist.github.com/skipcloud/f1033afb4fa5681d69fa63458cc95928),
  a Gist by @skipcloud (Skip Gibson).
+ [.gitignore Isn’t the Only Way To Ignore Files in Git](https://nelson.cloud/.gitignore-isnt-the-only-way-to-ignore-files-in-git/)
  by Nelson Figueroa on his blog.
    + See also [The Many Flavors of Ignore Files](https://nesbitt.io/2026/02/12/the-many-flavors-of-ignore-files.html) by Andrew Nesbitt on his blog,
      mentioned in [Git Rev News Edition #132](https://git.github.io/rev_news/2026/02/28/edition-132/).
+ [Git: --fixup --autosquash and GIT\_SEQUENCE\_EDITOR](https://dev.karltryggvason.com/git--fixup--autosquash-and-git_sequence_editor/)
  on Karl Tryggvason's Developer Blog, about the
  `GIT_SEQUENCE_EDITOR=true` trick for a faster interactive rebase
  (by avoiding opening the editor).
+ [Updating Stacked Pull Requests with `git rebase --onto`](https://bd103.dev/blog/2026-06-18-git-rebase-onto/)
  by BD103 on their blog.
+ [Git merges can be better](https://brandondong.github.io/blog/git_merges_can_be_better/),
  on the trick one can use to ensure that the order of branches in the conflict
  is the same in the (tricked-out) merge as it is in rebase.
  Done with the help of a Bash function.
  Written by Brandon Dong on their blog.
+ [Git imerge (interactive merge)](https://wilsonmar.github.io/git-imerge/)
  by Wilson Mar on his blog (2017).
    + [`git-imerge`](https://github.com/mhagger/git-imerge) was first mentioned in passing
      in [Git Rev News Edition #17](https://git.github.io/rev_news/2016/07/20/edition-17/),
      while Edition #34 includes [Developer Spotlight: Michael Haggerty](https://git.github.io/rev_news/2017/12/20/edition-34/#developer-spotlight-michael-haggerty),
      an interview with the author of this tool.
    + See also the [git-imerge: A Practical Introduction](https://softwareswirl.blogspot.com/2013/05/git-imerge-practical-introduction.html) article,
      mentioned in [Git Rev News Edition #118](https://git.github.io/rev_news/2024/12/31/edition-118/).
+ [Best Git Client - for Mac and Windows in 2026](https://www.git-tower.com/blog/best-git-client)
  by Bruno Brito on Git Tower GUI tool blog; with Tower listed first ;-).
+ [Diff Tools on macOS](https://www.git-tower.com/blog/diff-tools-mac)
  by Tobias Günther on Git Tower blog (last updated 2024).
    + The companion piece, [Diff Tools on Windows](https://www.git-tower.com/blog/diff-tools-windows/)
      was mentioned in [Git Rev News Edition #26](https://git.github.io/rev_news/2017/04/19/edition-26/).
+ [Fixing Alembic's Multiple Heads Problem with Git](https://julien.danjou.info/blog/fixing-alembics-multiple-heads-problem-with-git/)
  by Julien Danjou on jd:/dev/blog, about the [alembic-git-revisions](https://github.com/mergifyio/alembic-git-revisions)
  tool for automatic [Alembic](https://alembic.sqlalchemy.org/)
  migration chaining based on Git commit history.
    + [Alembic](https://alembic.sqlalchemy.org/) is a lightweight database migration tool
      for usage with the [SQLAlchemy](https://www.sqlalchemy.org/) Database Toolkit for Python.
+ [Introducing django-linear-migrations](https://adamj.eu/tech/2020/12/10/introducing-django-linear-migrations/)
  by Adam Johnson on his blog (2020).
+ [Goofy Program Files: git-slog](https://www.mcclimon.org/blog/goofy-program-files-git-slog/)
  by Michael McClimon on his blog (2023), about the Perl program he wrote
  to display oneline-like `git log` messages which include a single-character indicator
  to denote whether a commit has a 'Signed-off-by' trailer or not.
+ [Git Submodules vs. Subtrees vs. Monorepos](https://slicker.me/git/submodules-vs-subtrees-vs-monorepos.html).
+ [Costs exposed: Monorepo vs. multirepo](https://jmmv.dev/2023/08/costs-exposed-monorepo-multirepo.html)
  by Julio Manuel Merino Vidal (@jmmv), aka Julio Merino, on jmmv\.dev (2023);
  part 1 of the 3-part [Costs exposed](https://jmmv.dev/series.html#Costs%20exposed) series.
+ [Never use git submodules](https://diziet.dreamwidth.org/14666.html)
	by Ian Jackson on diziet's journal (2023).
+ [How Josh helps Rust manage code across multiple repositories](https://blog.rust-lang.org/inside-rust/2026/06/04/how-josh-helps-rust-manage-code-across-multiple-repositories/)
  by Jakub Beránek and Ralf Jung on Inside Rust Blog.
    + [Josh](https://josh-project.dev/) (Just One Single History)
      was mentioned in [Git Rev News Edition #129](https://git.github.io/rev_news/2025/11/30/edition-129/).
+ [Marimo: A Modern Notebook for Reproducible Data Science](https://codecut.ai/marimo-a-modern-notebook-for-reproducible-data-science/)
  by Khuyen Tran on CodeCut\.AI blog.
    + Alternatives include:
      [nbdev](https://nbdev.fast.ai/) - a tool that creates programming environment out of Jupyter notebooks
      (first mentioned in [Git Rev News Edition #69](https://git.github.io/rev_news/2020/11/27/edition-69/));
      [nbdime](http://nbdime.readthedocs.io/) - a tool for diffing Jupyter notebooks
      (first mentioned in [Edition #37](https://git.github.io/rev_news/2018/03/21/edition-37/));
      [jupytext](https://github.com/mwouts/jupytext) - a tool for bidirectionally converting Jupyter notebooks
      to plain text files as either Markdown files or Python scripts
      (also mentioned in [Edition #69](https://git.github.io/rev_news/2020/11/27/edition-69/));
      [databooks](https://databooks.dev/) - a package and a CLI tool
      to ease the collaboration between data scientists using Jupyter notebooks,
      by reducing the number of Git conflicts between different notebooks
      and resolution of Git conflicts when encountered
      (first mentioned in [Git Rev News Edition #100](https://git.github.io/rev_news/2023/06/30/edition-100/)).
    + See also [Git and Jupyter Notebooks: The Ultimate Guide](https://git.github.io/rev_news/2023/07/31/edition-101/) by ReviewNB,
      mentioned in [Git Rev News Edition #101](https://git.github.io/rev_news/2023/07/31/edition-101/).
+ [The Hidden Git Stash Keys in Emacs VC Directory Mode](https://emacs.dyerdwelling.family/emacs/20260610061920-emacs--the-hidden-git-stash-keys-in-emacs-vc-directory-mode/)
  on Emacs Dwelling.
+ [Using git-annex for Data Archiving](https://changelog.complete.org/archives/10516-using-git-annex-for-data-archiving)
  by John Goerzen on his blog - The ChangeLog (2023).
   + [git-annex](https://git-annex.branchable.com/), which allows managing large files with Git, without storing the file contents in Git,
     was first mentioned in [Git Rev News Edition #3](https://git.github.io/rev_news/2015/05/13/edition-3/).
+ [vcswatch and `git --filter`](https://www.df7cb.de/blog/2024/vcswatch-git-filter.html)
  by Christoph Berg on Myon's Blog (2024).
+ [GitHub and the crime against software](https://eblog.fly.dev/githubbad.html):
  a software article by Efron Licht.
+ [Evaluating new software forges (other than GitHub)](https://notgull.net/finding-a-forge/) by John Nunley on notgull (2023).
+ [Communicating in Pull Requests](https://stolee.dev/2025/12/31/pr-communication)
  by Derric Stolee on Stolee's Dev Blog (2025).

+ [Why Git Has a Variable Named false\_but\_the\_compiler\_does\_not\_know\_it](https://blog.codingconfessions.com/p/false-but-the-compiler-does-not-know-it):
  A small C trick that keeps Clang from flagging valid code as unreachable,
  by Abhinav Upadhyay on Confessions of a Code Addict blog.
+ [The Honest Git Glossary](https://www.git-tower.com/blog/honest-git-glossary) is a fun
  (and honest!) way to learn the most popular Git commands.
  Written by Bruno Brito on Git Tower blog.
    + Compare [gitglossary(7)](https://git-scm.com/docs/gitglossary)
      from the Git documentation.


__Scientific papers__
+ Santiago Torres-Arias, Anil Kumar Ammula, Reza Curtmola, Justin Cappos:
  _"[On Omitting Commits and Committing Omissions: Preventing Git Metadata Tampering That (Re)introduces Software Vulnerabilities](https://www.usenix.org/conference/usenixsecurity16/technical-sessions/presentation/torres-arias)"_
  presented at 25th USENIX Security Symposium,
  August 10-12, 2016, in Austin, Texas, USA:<br>
  [paper](https://www.usenix.org/system/files/conference/usenixsecurity16/sec16_paper_torres-arias.pdf)
  (with [errata](https://www.usenix.org/system/files/conference/usenixsecurity16/sec16_errata2.pdf)),
  [slides](https://www.usenix.org/sites/default/files/conference/protected-files/security16_slides_torres-arias.pdf),
  [video](https://www.youtube.com/watch?v=FVvVoLcj_A0).
+ Aditya Sirish A Yelgundhalli, Patrick Zielinski, Reza Curtmola, Justin Cappos:
  _"[Rethinking Trust in Forge-Based Git Security](https://www.ndss-symposium.org/ndss-paper/rethinking-trust-in-forge-based-git-security/)"_
  presented at The Network and Distributed System Security (NDSS) Symposium,
  February 23-27, 2026, in San Diego, California, USA.
  [DOI:10.14722/ndss.2025.241008](https://dx.doi.org/10.14722/ndss.2025.241008)<br>
  [paper](https://www.ndss-symposium.org/wp-content/uploads/2025-1008-paper.pdf),
  [slides](https://www.ndss-symposium.org/wp-content/uploads/9D-f1008-yelgundhalli.pdf),
  [video](https://youtu.be/FA1gEAKJAR0).


__Easy watching__
+ [Worktrees missing piece](https://www.youtube.com/watch?v=99v51wRl7zE):
  Learn how to create bare repos, and why they're being used with worktrees.
  YouTube video on The Modern Coder channel [5:14].
    + The video author had created [LearnGit.io](https://learngit.io/),
      focusing on how Git actually works, free for students.
      This site was first mentioned in [Git Rev News Edition #127](https://git.github.io/rev_news/2025/09/30/edition-127/).
+ [Recipe for Discovery: Building the Open Source Repository Browser](https://www.youtube.com/watch?v=GXGH_Tf1O3I)
  by Juanita Gomez on CURIOS YouTube channel [30:05].


__Git tools and sites__
+ [Worktrunk](https://worktrunk.dev/) is a CLI for Git worktree management,
  designed for running AI agents in parallel.
  [Written](https://github.com/max-sixty/worktrunk) in Rust,
  dual-licensed under MIT and Apache-2.0 license.
+ [`nt`](https://github.com/allisonmahmood/NT) (short for **navigate tree**)
  is a tiny `zsh` command for hopping around worktrees:
  it spins one up — or jumps to it if it already exists — `cd`s you in,
  and gets out of your way.
  Written as a Zsh script, under MIT license.
+ [`treehouse`](https://github.com/stemps/treehouse) is a CLI tool that
  helps you isolate your development environments when using Git worktrees.
  It assigns a stable number for each worktree, so you can use this number
  to derive per-worktree local configuration like ports, database names, etc.,
  or anything you want isolated per worktree.
  Written in Go, under MIT license.
+ [rift](https://github.com/anomalyco/rift) is an _**experimental**_
  alternative to Git worktrees using copy on write via reflinks or snapshots.
  Written in Rust, no license provided (yet).
+ [gitprofile](https://github.com/meanii/gitprofile) is a tool to help
  manage multiple Git identities — work, personal, open-source — so
  the right name, email, and SSH key are always used without thinking about it.
  It uses Git's built-in [`includeIf` directive](https://git-scm.com/docs/git-config#_conditional_includes).
  Written in Go, under MIT license.
+ [hk](https://hk.jdx.dev/) is a Git hook manager and project linting tool
  with an emphasis on performance.  Provides fast, powerful, and flexible hook management
  for modern development workflows.
  Written in Rust, under MIT license.
+ [GH Desktop Plus](https://github.com/desktop-plus/desktop-plus)
  is a relatively up-to-date fork of [GitHub Desktop](https://desktop.github.com/)
  with additional features and improvements, including:
  searching commits by title, message, tag, or hash;
  support for multiple GitHub, Bitbucket & GitLab accounts;
  Bitbucket and GitLab integration; and more.
  **Note** that it is a community-maintained project, not an official GitHub product.
  It is written in TypeScript as an Electron app, under MIT license.
+ [yadiff](https://github.com/baggiiiie/yadiff), yet another diff viewer,
  is a local web application
  built on [pierrecomputer](https://github.com/pierrecomputer/pierre)'s
  [trees](https://github.com/pierrecomputer/pierre/tree/main/packages/trees) and
  [diffs](https://github.com/pierrecomputer/pierre/tree/main/packages/diffs).
  Written in TypeScript for Node.js, under MIT license.<br>
  Inspired by [DiffsHub](https://diffshub.com/),
  which was mentioned in [Git Rev News #135](https://git.github.io/rev_news/2026/05/31/edition-135/).
+ [`git-pile`](https://github.com/keith/git-pile) is a set of scripts
  for using a [stacked-diff workflow](https://jg.gg/2018/09/29/stacked-diffs-versus-pull-requests) with Git & GitHub.
  There are a lot of different trade-offs for how this can work;
  `git-pile` chooses to be mostly not-magical at the cost of being best
  at handling multiple commits that don't conflict with each other
  instead of chains of pull requests affecting the same code.
  Written in shell and Python, under MIT license.
+ [spr](https://spacedentist.github.io/spr/) (Super Pull Requests)
  for using a [stacked-diff workflow](https://kastiglione.github.io/git/2020/09/11/git-stacked-commits.html)
  with GitHub.
  Written in Rust, under MIT license.
    + Stacked Diffs, also under the name Stacked Pull Requests,
      were mentioned in [Git Rev News Edition #44](https://git.github.io/rev_news/2018/10/24/edition-44/),
      [#105](https://git.github.io/rev_news/2023/11/30/edition-105/),
      [#111](https://git.github.io/rev_news/2024/05/31/edition-111/)
      (with links to other editions with other articles, and to related tools),
      [#115](https://git.github.io/rev_news/2024/09/30/edition-115/).
      [#118](https://git.github.io/rev_news/2024/12/31/edition-118/),
      [#127](https://git.github.io/rev_news/2025/09/30/edition-127/),
      [#128](https://git.github.io/rev_news/2025/10/31/edition-128/),
      [#132](https://git.github.io/rev_news/2026/02/28/edition-132/),
      [#134](https://git.github.io/rev_news/2026/04/30/edition-134/), and
      [#135](https://git.github.io/rev_news/2026/05/31/edition-135/)
      (with links to many articles and tools).
+ [sem](https://ataraxy-labs.github.io/sem/) (Semantic version control)
  is a command line tool that adds semantic understanding of Git changes.
  Instead of lines changed, sem tells you what entities changed:
  functions, methods, classes.
  Provides six subcommands: diff, blame, impact, log, entities, and context.
  Also works outside Git for arbitrary file comparison.
  It parses code with tree-sitter.  Helpful for working with AI agents.
  Written in Rust, under MIT and Apache 2.0 licenses.
    + Part of the [Ataraxy Labs](https://ataraxy-labs.com/) stack — agent-native infrastructure
      for software development. See also:
      [weave](https://ataraxy-labs.com/weave) (entity-level Git merge driver)
      · [inspect](https://github.com/Ataraxy-Labs/inspect) (semantic code review)
      · [opensessions](https://github.com/Ataraxy-Labs/inspect) (tmux sidebar for coding agents).
+ [git-courer](https://github.com/blak0p/git-courer)
  is an [MCP](https://modelcontextprotocol.io/) (Model Context Protocol) server
  that gives AI agents a full, safe interface to Git — not just commits,
  but the whole surface: status, diff, branch, stash, history, and sync.
  Includes 13 MCP tools, with structured JSON in, and structured JSON out.
  Every mutation backs itself up automatically.
  With local Ollama — zero tokens for Git operations.
  Written in Go, under MIT license.
+ [repo-slopscore](https://codeberg.org/polyphony/repo-slopscore)
  is a CLI + web app which gives a "slop score" for any public Git repository
  resolvable via `https://`.  It goes through the entire commit history of a repository
  (upper limit is 5000 commits currently) and detects visible signs of AI/LLM tool usage
  in the commit history and the source tree.  Aggressive caching is used to ensure
  that a repo that has been analyzed before does not need to get fully cloned again.
  Written in Rust, under Mozilla Public License 2.0.
  Used by <https://slopscan.ava.pet/>.
+ [Grit](https://grit-scm.com/) is a "from-scratch", library-based, memory-safe,
  idiomatic Rust reimplementation of Git (created with help of AI agents)
  that passes over 99% of the entire Git test suite.
  The `grit-lib` library is licensed under the MIT License, while
  the `grit-git` binary crate is licensed under GPLv2 (like Git).
+ [Flow Simulator](https://mainline.dev/flow-simulator) by Mainline is a web app
  where you can watch the simulation on how the code flows from idea to production
  under three branching strategies: GitHub flow, Git flow, and trunk-based.
  You can switch modes to compare.
+ [Commit Crimes](https://commitcrimes.dev/) is a joke web app,
  where you can paste any GitHub handle; the app will then pull their permanent record,
  book the user for crimes against version control
  (e.g. unprotected pushes straight to 'main'), and hand down the sentence.

+ [jj\_tui](https://tangled.org/elidowling.com/jj_tui) is a TUI for
  the [Jujutsu](https://jj-vcs.dev/) version control system,
  with focus on performance, interactivity, and being intuive.
  Written in OCaml, under MIT license.
+ [Irmin](https://irmin.org/) is an OCaml library
  for building mergeable, branchable distributed data stores;
  a distributed database built on the same principles as Git.
  Under ISC license.


## Releases

+ Git [2.55.0](https://lore.kernel.org/git/xmqqv7b1w9vr.fsf@gitster.g/),
[2.55.0-rc2](https://lore.kernel.org/git/xmqqv7b9mcfx.fsf@gitster.g/),
[2.55.0-rc1](https://lore.kernel.org/git/xmqqik7hw0ie.fsf@gitster.g/),
[2.55.0-rc0](https://lore.kernel.org/git/xmqqik7pqeiq.fsf@gitster.g/)
+ Git for Windows [v2.55.0(1)](https://github.com/git-for-windows/git/releases/tag/v2.55.0.windows.1),
[v2.55.0-rc2(1)](https://github.com/git-for-windows/git/releases/tag/v2.55.0-rc2.windows.1),
[v2.55.0-rc1(1)](https://github.com/git-for-windows/git/releases/tag/v2.55.0-rc1.windows.1),
[v2.55.0-rc0(1)](https://github.com/git-for-windows/git/releases/tag/v2.55.0-rc0.windows.1)
+ gitoxide [0.55.0](https://github.com/GitoxideLabs/gitoxide/releases/tag/v0.55.0)
+ JGit [7.7.0](https://github.com/eclipse-jgit/jgit/releases/tag/v7.7.0.202606012155-r)
+ Gitea [1.26.4](https://github.com/go-gitea/gitea/releases/tag/v1.26.4),
[1.26.3](https://github.com/go-gitea/gitea/releases/tag/v1.26.3)
+ Gerrit Code Review [3.12.8](https://www.gerritcodereview.com/3.12.html#3128),
[3.13.7](https://www.gerritcodereview.com/3.13.html#3137),
[3.14.1](https://www.gerritcodereview.com/3.14.html#3141)
+ GitHub Enterprise [3.21.2](https://docs.github.com/enterprise-server@3.21/admin/release-notes#3.21.2),
[3.21.1](https://docs.github.com/enterprise-server@3.21/admin/release-notes#3.21.1),
[3.21.0](https://docs.github.com/enterprise-server@3.21/admin/release-notes#3.21.0),
[3.20.4](https://docs.github.com/enterprise-server@3.20/admin/release-notes#3.20.4),
[3.19.8](https://docs.github.com/enterprise-server@3.19/admin/release-notes#3.19.8),
[3.18.11](https://docs.github.com/enterprise-server@3.18/admin/release-notes#3.18.11),
[3.17.17](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.17),
[3.16.20](https://docs.github.com/enterprise-server@3.16/admin/release-notes#3.16.20)
+ GitLab [19.2](https://docs.gitlab.com/releases/19/gitlab-19-2-released/),
[19.1](https://docs.gitlab.com/releases/19/gitlab-19-1-released/),
[19.1.1, 19.0.3, 18.11.6](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-1-1-released/),
[19.0.2, 18.11.5, 18.10.8](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-0-2-released/)
+ GitKraken [12.2.1](https://help.gitkraken.com/gitkraken-desktop/current/),
[12.2.0](https://help.gitkraken.com/gitkraken-desktop/current/)
+ GitHub Desktop [3.6.2](https://desktop.github.com/release-notes/),
[3.6.1](https://desktop.github.com/release-notes/),
[3.6.0](https://desktop.github.com/release-notes/),
[3.5.12](https://desktop.github.com/release-notes/)
+ tig [2.6.1](https://github.com/jonas/tig/releases/tag/tig-2.6.1)
+ lazygit [0.62.2](https://github.com/jesseduffield/lazygit/releases/tag/v0.62.2),
[0.62.1](https://github.com/jesseduffield/lazygit/releases/tag/v0.62.1)
+ GitButler [0.20.4](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.20.4),
[0.20.3](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.20.3)
+ Kinetic Merge [1.15.0](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.15.0)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Toon Claes, Štěpán Němec and Paulo Gomes.
