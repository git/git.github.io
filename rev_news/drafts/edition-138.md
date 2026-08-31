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
is forced to drain nearly the whole graph before it can convince itself
that it is done. Any merge that introduces a low-generation commit
never painted by the other side has the same effect.

The key observation, and the whole idea behind the series, is that a
new merge-base candidate can only be discovered when exclusive
`PARENT1` and `PARENT2` paint meet. In the initial numbers Kristofer
reported, this turned a 4.293 second `git merge-base --all` across the
import into 8 milliseconds, a 537x improvement, and a 5.345 second
`git merge-tree` into 13 milliseconds.

## Some background on the paint walk and generation numbers

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

## The first round of review

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
`paint_queue_get()` should return NULL when it detects that no further
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

## Measuring the walk instead of the clock

[Version 2](https://lore.kernel.org/git/pull.2149.v2.git.1782303254.gitgitgadget@gmail.com)
reordered the series so that the documentation came first, describing
the algorithm as it already existed, and the tests came before the code
changes so they could be shown passing with the old logic. The
`ahead_behind()` patch was dropped, the new struct was renamed from
`paint_queue` to `paint_state`, and all termination conditions moved
into `paint_queue_get()` as Stolee had asked.

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

## A self-reported breakage, and a rename

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

## Growing scope: a test helper and an eight-year-old workaround

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
commit-graphs, which store topological levels rather than corrected
commit dates, could make `git merge-base v4.8 v4.9` on the Linux
kernel walk 636k commits instead of 167k. Side exhaustion solves the
same problem far better. Kristofer measured the step count for that
query dropping to 5,725 on a v1 graph and 3,887 on a v2 graph. And
removing the fallback means the queue is always generation-ordered, so
every termination condition can rely on a single invariant. He noted
that if this patch were kept, his separate
`kk/commit-reach-find-all-fix` topic would become unnecessary.

## Waiting for reviewers

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

## Naming the region

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

## Conclusion

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
Kristofer had normalised some double spaces after periods in the
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
algorithm that had never been written down, trace2 step-count
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


__Light reading__

<!---
__Easy watching__
-->

__Git tools and sites__


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
with help from XXX.
