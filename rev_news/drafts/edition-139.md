---
title: Git Rev News Edition 139 (September 30th, 2026)
layout: default
date: 2026-09-30 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 139 (September 30th, 2026)

Welcome to the 139th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](https://git.github.io).

This edition covers what happened during the months of August and September 2026.

## Discussions

### General

* [Git participated in GSoC (Google Summer of Code) 2026](https://summerofcode.withgoogle.com/programs/2026/organizations/git)

  All the contributors have successfully passed their final evaluation
  and published a final report:

  - Pablo Sabater [worked](https://pablosabater.dev/) on the
    [Add remote-object-info command to git-cat-file(1)](https://summerofcode.withgoogle.com/programs/2026/projects/752yzmwm)
    project, continuing previous work started by Eric Ju and Calvin Wan.
    The project was mentored by [Karthik Nayak](https://gitlab.com/knayakgl)
    and [Chandra Pratap](https://chand-ra.github.io/). The final report can be
    found in [a GitHub gist](https://gist.github.com/pabloosabaterr/6be5932a778854cf0afde995e02e8371).

  - Siddharth Shrimali [worked](https://siddharth.shrimali.info/) on the
    [Improve disk space recovery for partial clones](https://summerofcode.withgoogle.com/programs/2026/projects/hs14IFAn)
    project. The project was mentored by [Christian Couder](https://gitlab.com/chriscool)
    and [Siddharth Asthana](https://gitlab.com/edith007). The final report
    can be found on [the contributor's website](https://siddharth.shrimali.info/#report).

  - K Jayatheerth [worked](https://jayatheerth.com/) on the
    [Improve the new git repo command](https://summerofcode.withgoogle.com/programs/2026/projects/O1nF3zMT)
    project. The project was mentored by [Justin Tobler](https://gitlab.com/justintobler)
    and [Lucas Seiki Oshiro](https://lucasoshiro.github.io/en/). The final
    report can be found on [the contributor's website](https://jayatheerth.com/#/blogs/gsoc/conclusion).

  - Tian Yuchen [worked](https://malon7782.github.io/gsoc-blog-2026/) on the
    [Reduce Git's global state](https://summerofcode.withgoogle.com/programs/2026/projects/Lx1PmL4k)
    project. The project was mentored by [Christian Couder](https://gitlab.com/chriscool),
    [Ayush Chandekar](https://ayu-ch.github.io/) and
    [Bello Caleb Olamide](https://cloobtech.hashnode.dev/). The final report
    can be found on [the contributor's website](https://malon7782.github.io/gsoc-blog-2026/#15).

  Kaartic Sivaraam and Christian Couder were
  ["org admins"](https://developers.google.com/open-source/gsoc/help/oa-tips).

  Congratulations to the contributors, their mentors and the org admins!

* [Git Merge 2026 conference](https://git-merge.com/) and [Contributor's Summit 2026](https://lore.kernel.org/git/5cc325c6-579e-4fed-7071-a3ff98d51ccb@gmx.de/)

  The Git Merge conference happened on September 17th and 18th in
  Lisbon. The first day was the conference day with
  [talks](https://git-merge.com/#schedule-section), and on the second day there
  was [the Contributor's Summit](https://lore.kernel.org/git/5cc325c6-579e-4fed-7071-a3ff98d51ccb@gmx.de/).

  The edited videos of the talks are not yet available on YouTube, but
  [the unedited livestream of the conference day](https://www.youtube.com/watch?v=caA0UBcSBuE)
  can be watched.

  Johannes Schindelin, alias Dscho, posted a
  [summary of the Contributor's Summit notes](https://lore.kernel.org/git/5cc325c6-579e-4fed-7071-a3ff98d51ccb@gmx.de/)
  to the mailing list.

  Dscho also wrote [notes about the talks](https://gist.github.com/dscho/9c70e07ee54616bbf401b4e5f40969bf),
  distilled from the recording and its subtitles. Thanks to Dscho for
  putting them together!

### Reviews

+ [[PATCH] packfile: fix perf regression with many packs](https://lore.kernel.org/git/pull.2202.git.1786561870638.gitgitgadget@gmail.com)

Johannes Schindelin, alias Dscho, sent a patch to the mailing list to
fix a performance regression that appeared in Git 2.53 and that affects
repositories containing a very large number of packfiles.

In the commit message, Dscho explained that since 589127caa7 (packfile:
move list of packs into the packfile store, 2025-10-30), the
`packfile_store_add_pack()` function calls
`packfile_list_remove_internal()` to check whether a packfile is
_already_ in the list of packs, and, if so, to move it to the end of
that list. As this check scans the whole list linearly before every
insertion, loading N new packs has an O(N²) complexity.

In a case reported by a Microsoft Git user in
[a GitHub issue](https://github.com/microsoft/git/issues/970), N was
37,815, and a simple `git rev-parse --short HEAD`, which is regularly
run by `GIT_PS1` to display the current commit in the shell prompt,
went from 0.4 seconds to 4.5 seconds. Dscho also reported that, in a
heavily exercised CI scenario, clone times went from under two minutes
to over half an hour.

The fix consisted of adding a fast path for packfiles known to be new.
Dscho anticipated that readers might wonder why the check was not
simply removed, since `packfile_list_append()` had only one caller
left, which always passes new packs. He explained that there used to be
a second caller in `prepare_midx()` that needed the check, but that it
was removed by 6aff1f25a0 (packfile: always add packfiles to MRU when
adding a pack, 2025-10-30). As the function is declared in a header
file, he preferred to extend its signature with an `is_new` parameter,
to avoid problems with in-flight topics or downstream callers.

The patch also added an "abbreviate with 10,000 packs" test, running
`git rev-parse --short HEAD`, to the `t/perf/p5303-many-packs.sh`
performance test script.

#### Some background

Git stores objects either as individual "loose" files or in packfiles.
Each fetch or push usually creates a new packfile, and maintenance
tasks like `git gc` or `git maintenance` regularly consolidate them
into fewer packs. When maintenance doesn't run, or doesn't complete,
packfiles can accumulate.

To look up objects, Git keeps an in-memory list of the packfiles it
knows about. It also reorders that list to implement a "most recently
used" (MRU) optimization: the pack where an object was last found is
moved to the front, as the next object being looked up is likely to be
in the same pack.

Commit 589127caa7 was part of Patrick Steinhardt's work on refactoring
the object database, so that different storage backends can
eventually be plugged in. It moved the list of packs into a new
"packfile store" structure.

#### Review of the first version

Junio Hamano, the Git maintainer, replied to the patch with a rolling
eyes emoji, noting that "As we grow older, more and more extreme use
cases that we initially thought were simply crazy become reality." He
agreed that, as long as the caller knows that a pack is new, there is
no reason to walk through all the packs trying to remove it, and he
found the fix "Clever and clean."

Jeff King, alias Peff, pointed out that this was a regression of a
problem that had already been dealt with by ec48540fe8 (packfile.c:
speed up loading lots of packfiles, 2019-11-27). He showed that the
regression could even be seen in Git's existing performance test
suite, as the "load 10,000 packs" test went from 0.13 to 0.45 seconds
at commit 589127caa7, a 246% increase. Unfortunately, he noted,
nobody pays close attention to the perf suite, partly because "it's
clunky and expensive to run", and partly because deciding whether a
change is real or just noise often requires human judgment.

Peff found the fix reasonable, but wondered what value the new perf
test added, as it showed the same slowdown as the existing "load
10,000 packs" test.

Patrick replied that GitLab had set up continuous benchmarking with
[Bencher](https://bencher.dev/perf/git/plots). But recent changes to
their CI setup made the results flaky, as jobs seemed to alternate
between two kinds of runners with different specs. He also admitted
that their benchmarks lacked a test with lots of packfiles, which is
why they didn't catch this regression.

Dscho replied to Peff that the new test directly reflects what
`GIT_PS1` runs, and that it exercises a subtly different code path, as
`--short` has to look for a unique abbreviation, while `--verify` can
stop as soon as it has found the object. Peff answered that the
regression was about creating the initial pack list, so it happened
whether each pack was opened or not. He noted, though, that the
existing tests that look at each object only did so with 1, 50 and
1,000 packs, not with 10,000, and in the end he was OK with the
redundancy since the new test isn't expensive.

Dscho also told Junio that he had to take back his claim about the
slower clones in CI, as the patch didn't fix that issue, which was
still being investigated.

#### Why so many packs?

D. Ben Knoble asked whether enabling maintenance on the user's
repository could be an intermediate solution.

Dscho replied that the issue was actually about a _Scalar_ clone, and
more specifically a _Microsoft Git_ Scalar clone. He explained that "a
substantial part of Microsoft Git failed to get upstreamed to core
Git", including the "shared cache repository" feature. With it, a bare
repository is set up as an alternate of the actual clone, and
scheduled fetches go into that shared cache (see the
[commit introducing it](https://github.com/microsoft/git/commit/55226d12ed36)).
Maintenance usually runs on the shared cache, but Dscho suspected that
it often takes too long to finish before machines are shut down for
the day. As a result, "it is still not exactly rare to find setups
with five-digit packfile counts. And since we _can_ handle this more
gracefully, we should ;-)"

Ben clarified that he had meant maintenance would likely help the
local case, like the shell prompt, more than the clones.

#### Naming and design discussions

Patrick reviewed the patch. Besides pointing out a typo in the commit
message, he suggested renaming the `is_new` parameter to
`accept_duplicates`, since the function would then just append the
entry without ensuring that the packfile is unique in the list. He
also sketched an alternative: tracking added packs in a hashmap. This
would also cover `packfile_list_prepend()` and wouldn't require
callers to know about the mechanism. With a doubly-linked list, moving
existing entries to the back or the front, which happens often to
re-sort the list during object lookups, would also become cheap. He
sent a patch implementing this idea, while wondering whether the added
complexity was worth it.

Dscho agreed to fix the typo and drop the claim about CI clones. He
disagreed with the new name though, as the function is _not_
accepting duplicates: the callers know the packfiles cannot be
duplicates. Interestingly, he said that his first reaction had also
been to write a hashmap-based fix, until "the AI assistant pointed out
that no duplicates could possibly exist yet." He agreed that the added
complexity wasn't needed, at least not yet.

Patrick replied that, seen outside the context of its current caller,
the parameter just tells whether packs should be deduplicated. He
considered pursuing his patch anyway, as he thought it would speed up
reordering significantly with 38k packfiles, in which case it would
supersede Dscho's patch. Dscho proposed the `skip_dup_check` name
instead, and pointed out that even a hashset lookup is slower than
skipping the search altogether. Patrick agreed to move forward with
Dscho's patch.

Junio also replied to Patrick's naming suggestion. He had "the same
thought", as the current callers might have been vetted thoroughly,
but future callers or code paths might break the promise that only new
packs are added. He also asked whether it was well understood what bad
things duplicate entries in a pack list could lead to.

Peff replied to Patrick that such a hashmap already exists: since
ec48540fe8, `packfile_store_add_pack()` and `packfile_store_load_pack()`
use one, and that is precisely why the new parameter can be set to
true for the remaining caller. Otherwise, "reprepare" operations would
create duplicates.

Patrick suggested moving that map from the packfile store into the
packfile list, to make it more generally useful. Peff answered that
the map protects more than adding packs to the list, as it avoids
calling `add_packed_git()`, which allocates memory and performs a
number of `stat()` calls. So the existence check would have to happen
much earlier than in `packfile_list_append()`. He added that it would
be easier to see which generalized pattern would be useful if there
were more than one caller of `packfile_list_append()`.

Patrick pointed out that there were other callers of
`packfile_list_prepend()`, which has the same problem. Peff agreed
that `prepend()` calls appear in some hot code paths, including the
MRU adjustment in `find_pack_entry()`, and that this could be a
candidate for the clone slowdown Dscho was still investigating. But he
wouldn't want to pay the cost of hash-based deduplication there, as no
new pack is added. Moving an entry should instead be an O(1) operation
using a doubly-linked list.

Peff also explained that it is harder to build a synthetic test for
prepending, because of pack locality. If two consecutive lookups move
the same pack to the front, the second one finds it there almost
immediately. He showed, though, how to spread a history across many
packs using `git fast-import` with `fastimport.unpackLimit=0` and a
`checkpoint` after each commit. Timing `git rev-list --count` then
showed quadratic growth taking over around 2,000 packs, from 18ms with
500 packs to 6.3 seconds with 16,000 packs. He noted that this didn't
prove much about list management, as looking up objects across packs
is linear anyway, so this situation is inherently quadratic. Still, he
found it "prudent for these MRU updates to use a constant-time
movement within the list, rather than an explicit duplicate check and
removal."

#### Version 2

Meanwhile, Dscho sent a
[version 2](https://lore.kernel.org/git/pull.2202.v2.git.1786633010179.gitgitgadget@gmail.com)
of the patch. It fixed the typo found by Patrick, dropped the claim
that the patch fixed the CI clone regression, and renamed the `is_new`
parameter to `skip_dup_check`.

Patrick said he was happy with this version, and that the other parts
of the discussion could be iterated on after the patch landed. Junio
agreed and marked it for 'next'.

#### Conclusion

A small patch was enough to fix a quadratic slowdown that made shell
prompts noticeably slower in repositories with tens of thousands of
packfiles. The discussion around it showed that this was the
regression of a problem already fixed in 2019, and that the perf test
suite had detected it, but that nobody noticed. Contributors discussed
how to better catch such regressions with continuous benchmarking, and
why some real-world setups, like Microsoft Git's Scalar shared cache,
can accumulate so many packs. Ideas for further improvements, like
constant-time MRU moves in the packfile list, were also put forward
for later.

The patch was merged into the 'master' branch and is part of the Git
2.56.0 release.

<!---
### Support
-->

## Developer Spotlight: Harald Nordgren

* **Who are you and what do you do?**

  I am Harald Nordgren, software developer for 20+ years, most recently
  worked as CTO of [Diet Doctor](https://www.dietdoctor.com/) and have
  been an enthusiastic Git user for many years. I am married to Linda
  and we have 3 young children.

* **What would you name your most important contribution to Git?**

  Most useful is [`status.comparebranches`](https://lore.kernel.org/git/pull.2301.v4.git.git.1779372367317.gitgitgadget@gmail.com/),
  which I see every time I run `git status` and it blows my mind that
  I was able to put it there.

* **What are you doing on the Git project these days, and why?**

  I’m working on [`history squash`](https://lore.kernel.org/git/pull.2337.v15.git.git.1788900119.gitgitgadget@gmail.com/)
  and doing [GitHub CI improvements](https://lore.kernel.org/git/?q=f%3Aharald+s%3Aci).

* **If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?**

  Not sure! Git is very good already.

* **If you could remove something from Git without worrying about
  backwards compatibility, what would it be?**

  Many settings for (like diff.algorithm and branch.sort) should have
  more user friendly defaults, but it requires us to break backwards
  compatibility. Users are not getting a smooth experience and many are
  very afraid to mess with their Git settings. I would love to have a
  setup wizard with this as one possible preset:

  ```git
  branch.sort=-committerdate
  tag.sort=-version:refname
  diff.algorithm=histogram
  diff.colormoved=zebra
  diff.compactionheuristic=true
  ```

* **What is your favorite Git-related tool/library, outside of
  Git itself?**

  GitHub’s official [`gh` tool](https://github.com/cli/cli) is awesome.
  And before it came and took over, I loved using [`mislav/hub`](https://github.com/mislav/hub).

* **Do you happen to have any memorable experience w.r.t. contributing
  to the Git project? If yes, could you share it with us?**

  My first [merged commit in 2018](https://github.com/git/git/commit/1fb20dfd8ed70b4459312918a71444bc79ea6f0b) ([patch](https://lore.kernel.org/git/20180402005248.52418-1-haraldnordgren@gmail.com/))
  was an unreal experience, I couldn’t believe I got to be part of
  this project.

* **What is your toolbox for interacting with the mailing list and for
  development of Git?**

  [GitGitGadget](https://gitgitgadget.github.io/) for submitting patches,
  Gmail for answering emails and VSCode as editor.

  But AI writes the code for me nowadays. I bring the idea and get a
  first draft (if it’s horrible I start over) and when I have something
  that feels sound, I “quick save” by committing/pushing and then
  feedback on the solution until it’s nice. I use one AI session per
  topic, and keep them open for the reviews so it maintains the context.
  It’s incredible to have a sparring partner that never gets tired!

* **What is your advice for people who want to start Git development?
  Where and how should they start?**

  Have an idea for something that you yourself need, something you would
  want in Git that is missing. Don’t focus on getting the credit, focus
  on an actual need and the rest will follow.

  If you don't understand Git well as a user, it will be hard to
  contribute meaningfully, so start by [reading up on Git](https://git-scm.com/learn).
  Back when Stack Overflow was still popular I used to love to
  [read about Git there](https://stackoverflow.com/questions/tagged/git). I still love
  to dig into the [Git documentation](https://git-scm.com/docs) and
  ask AI about some new options, there are many to discover!

* **If there's one tip you would like to share with other Git
  developers, what would it be?**

  Commit early, commit often.

## Other News

__Various__


__Light reading__

<!---
__Easy watching__
-->

__Git tools and sites__


## Releases

+ Git [2.56.0](https://lore.kernel.org/git/xmqqpkxxmgxh.fsf@gitster.g/),
[2.56.0-rc2](https://lore.kernel.org/git/xmqqld8tfea9.fsf@gitster.g/),
[2.56.0-rc1](https://lore.kernel.org/git/xmqqh5jpvzxo.fsf@gitster.g/),
[2.56.0-rc0](https://lore.kernel.org/git/xmqqecf1f2ga.fsf@gitster.g/)
+ Git for Windows [v2.56.0(1)](https://github.com/git-for-windows/git/releases/tag/v2.56.0.windows.1),
[v2.56.0-rc2(1)](https://github.com/git-for-windows/git/releases/tag/v2.56.0-rc2.windows.1),
[v2.56.0-rc1(1)](https://github.com/git-for-windows/git/releases/tag/v2.56.0-rc1.windows.1),
[v2.56.0-rc0(1)](https://github.com/git-for-windows/git/releases/tag/v2.56.0-rc0.windows.1)
+ gitoxide [0.59.0](https://github.com/GitoxideLabs/gitoxide/releases/tag/v0.59.0)
+ JGit [7.8.0](https://github.com/eclipse-jgit/jgit/releases/tag/v7.8.0.202609011348-r)
+ GitLab [19.5](https://docs.gitlab.com/releases/19/gitlab-19-5-released/),
[19.4](https://docs.gitlab.com/releases/19/gitlab-19-4-released/)
+ Bitbucket Data Center [10.5](https://confluence.atlassian.com/bitbucketserver/release-notes-872139866.html)
+ Gerrit Code Review [3.12.10](https://www.gerritcodereview.com/3.12.html#31210),
[3.12.11](https://www.gerritcodereview.com/3.12.html#31211),
[3.13.10](https://www.gerritcodereview.com/3.13.html#31310),
[3.13.9](https://www.gerritcodereview.com/3.13.html#3139),
[3.14.3](https://www.gerritcodereview.com/3.14.html#3143),
[3.14.4](https://www.gerritcodereview.com/3.14.html#3144)
+ GitHub Enterprise [3.22.1](https://docs.github.com/enterprise-server@3.22/admin/release-notes#3.22.1),
[3.21.6](https://docs.github.com/enterprise-server@3.21/admin/release-notes#3.21.6),
[3.20.8](https://docs.github.com/enterprise-server@3.20/admin/release-notes#3.20.8),
[3.19.12](https://docs.github.com/enterprise-server@3.19/admin/release-notes#3.19.12),
[3.18.15](https://docs.github.com/enterprise-server@3.18/admin/release-notes#3.18.15),
[3.17.21](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.21),
[3.22.0](https://docs.github.com/enterprise-server@3.22/admin/release-notes#3.22.0),
[3.21.5](https://docs.github.com/enterprise-server@3.21/admin/release-notes#3.21.5),
[3.20.7](https://docs.github.com/enterprise-server@3.20/admin/release-notes#3.20.7),
[3.19.11](https://docs.github.com/enterprise-server@3.19/admin/release-notes#3.19.11),
[3.18.14](https://docs.github.com/enterprise-server@3.18/admin/release-notes#3.18.14),
[3.17.20](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.20)
+ GitKraken [12.4.1](https://help.gitkraken.com/gitkraken-desktop/current/)
+ GitHub Desktop [3.6.6](https://desktop.github.com/release-notes/),
[3.6.5](https://desktop.github.com/release-notes/)
+ lazygit [0.65.1](https://github.com/jesseduffield/lazygit/releases/tag/v0.65.1),
[0.65.0](https://github.com/jesseduffield/lazygit/releases/tag/v0.65.0)
+ Garden [2.7.0](https://github.com/garden-rs/garden/releases/tag/v2.7.0)
+ Sublime Merge [Build 2132](https://www.sublimemerge.com/download),
[Build 2130](https://www.sublimemerge.com/download)
+ difftastic [0.71.0](https://github.com/Wilfred/difftastic/releases/tag/0.71.0)
+ Kinetic Merge [1.19.0](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.19.0),
[1.18.0](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.18.0)
+ git-bug [0.11.0](https://github.com/git-bug/git-bug/releases/tag/v0.11.0)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
