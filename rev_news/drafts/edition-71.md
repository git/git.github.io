---
title: Git Rev News Edition 71 (January 28th, 2021)
layout: default
date: 2021-01-28 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 71 (January 28th, 2021)

Welcome to the 71st edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of December 2020.

## Discussions

<!---
### General
-->

### Reviews

* [[PATCH 00/26] git-log: implement new --diff-merge options](https://lore.kernel.org/git/20201101193330.24775-1-sorganov@gmail.com/)

  Last November Sergey Organov sent a 26 patch long series to the
  mailing list. This series added a number of new modes to
  `git log --diff-merges=<mode>`.

  Before this patch series, there would be no diff for merge commits
  unless one of `-m`, `-c` or `--cc` was given. And in case one of
  these options was given, then `--diff-merges=off`, or its
  `--no-diff-merges` synonym, could be used to remove that diff output
  for merge commits. This was the only possible use of
  `--diff-merges=<mode>`.

  Sergey's patch series introduced four new modes. Three of them,
  "separate", "combined" and "dense-combined" do not generate new diff
  output. They are just synonyms of `-m`, `-c` and `--cc`
  respectively.

  The fourth new mode, called "first-parent", though allows to get the
  same output as `-p --first-parent`, but "without the changes in
  history traversal that the `--first-parent` option causes".

  Sergey's patch series also refactored some code and fixed a small
  issue. In a follow up email Sergey asked questions related to
  further possible issues related to how `-m`, `-c` and `--cc`
  interact with `--oneline`.

  Elijah Newren replied to Sergey's questions, and a long discussion
  involving Junio Hamano, the Git maintainer, started about different
  technical topics, especially the interactions between `-p` and the
  `-m`, `-c` and `--cc` options.

  Elijah and Philip Oakley also commented on small issues in a few
  patches.

  Sergey then sent a new version, that he named v1, of his patch
  series with 27 patches, so one more than in the original series. The
  changes were mostly typo and documentation fixes.

  Elijah and Junio commented on the patch series. Elijah and Sergey
  discussed some new `--remerge-diff` and `--remerge-diff-only`
  options Elijah had been working on, and how there could also be a
  related `--diff-merges=remerge` mode.

  Junio found a few issues and suggested some renaming and test
  improvements.

  Sergey sent a new v2 version of his patch series with 33 patches, so
  6 more than in v1. One change compared to the previous version was
  that the diff output for the new `--diff-merges` options didn't affect
  non-merge commits. Another change was that short mnemonics
  `--diff-merges=(1|m|c|cc)` were provided on top of long mode
  names. A lot of smaller changes addressed Elijah's and Junio's
  reviews.

  Elijah and Sergey then discussed further improvements especially to
  the documentation. Felipe Contreras and Junio sometimes also chimed
  in with further explanations or suggestions.

  Sergey sent a new v3 version, with 32 patches, one less than in v2.
  The changes were mostly following reviewers' suggestions. Felipe
  commented positively on one patch, and Junio said he didn't spot
  anything objectionable in the series and was OK to start merging it
  to the next branch.

<!---
### Support
-->

## Developer Spotlight: Sergey Organov

* Who are you and what do you do?

  I'm a software engineer and system architect at JAVAD GNSS, working in their
  Moscow Research Center, in Russia. We design (and manufacture) high-end
  GNSS receivers, both hardware and software. Design and implementation of
  receiver firmware is my primary job for about 25 years already. I'm
  also responsible for the development tools our team is using, and that's
  where GNU/Linux and then Git come to the picture.

  Graduated from "Moscow Engineering Physics Institute" back in 1989 and
  qualified in "Experimental Methods in Nuclear Physics", I was always
  interested in computing. I then worked for about 10 years in "Kurchatov
  Institute" in the field of computer modeling of nuclear radiation and
  detectors, as well as in advanced processing of experimental results.
  Then, a few years later, I started to work for JAVAD as well, in parallel.
  A few more years later, I left Kurchatov and entirely focused on
  working for JAVAD full-time, which is my current job.

  Real-time embedded applications, also using Linux on the targets, is my
  primary field of expertise nowadays.

* What would you name your most important contribution to Git?

  I didn't contribute much. I'd name the method of rebasing of merge
  commits, that has been [covered in the Git Rev News](https://git.github.io/rev_news/2018/04/18/edition-38#general)
  some time ago, as the most important one.

* What are you doing on the Git project these days, and why?

  Right now I'm working on `--diff-merges` options for `git log`. The
  original stimulus was very surprising output of `git log -p -m` that
  made me mad the first time I encountered it. After finishing initial
  implementation of the `--diff-merges` options, I now aim at finally giving
  `git log -m` natural meaning of printing the diff for merge commits with
  respect to the first parent only.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  Actually, I have 2 favorites:

  1. Designing support for explicit commits grouping, somewhat similar to
     grouping objects in graphical editors, likely implemented as a container
     commit capturing a particular part of the DAG. It'd be then seen as a
     single commit by default, unless the user specifically asks to look inside.
     If we had it, our typical history would be more linear, feature branches
     essentially becoming single (group) commits, that'd make history simpler
     to traverse and to reason about.

     Right now the only poor-man approximation for that is a branch that is merged
     back to its origin (the true-non-evil merge, as I call it), which results in a
     history that looks like a sequence of bubbles, but it lacks direct
     support which the specific grouping feature would have.

  2. Designing a new history editor that will aim at being the ultimate
     replacement for both `git rebase` and `git cherry-pick`, which are
     essentially the same thing at fundamental level. As useful as these
     existing features are, they have wide opportunities for improvements
     that apparently don't fit into the current design, and their history of
     incremental adaptations to different needs made quite a mess of them.

     Covering all the functionality of `rebase` and `cherry-pick`, the two most
     important new features I'd like to see are:

     - Ensuring, by design, one of the primary features of any reasonable
       editing tool: carefully preserve the content if no actual editing has
       been made or requested. This should be ensured even if the tool is
       forced to do the full job of re-creating the history according to the
       instructions. I.e., the cycle: load/mark-as-modified/save should result in
       the original result by default.

     - Better replacement for to-do lists. Carefully designed format for
       describing the DAG in a text form convenient for humans and for editing with
       a text editor, with simple yet strictly defined syntax and semantics,
       preferably supporting generic programming language features. For
       example, it could be based on some existing language, say, Tcl. Yet it
       should take the best features of the current format and look familiar
       enough to be immediately useful without a significant learning cycle.

  [That said, do we need two teams of expert developers for that, or one
  would suffice, I wonder?]

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  Support for octopus merges. Multiple (back) references could then be
  reused for more useful things, like keeping history of rebasing, and/or
  for commits grouping (see above).

* If you could add something to Git without worrying about
  backwards compatibility, what would it be?

  I'd add a simple model behind the Git command-line options, so that their
  design came from the model rather than entirely from the use cases, as
  it happens to be now. It'd play a similar positive role in UI design as
  the Git core data model plays in the features design.

  Then, I sometimes think about the addition of a single NULL-commit, the
  ultimate parent of all the Git commits all over the world. I'm not sure
  it has enough value in simplifying corner cases in Git's implementation,
  but it fits so nice into the elegant Git data model!

* What is your favorite Git-related tool/library, outside of Git
  itself?

  Emacs and the Magit, its interface to Git, in particular, as well as a
  few parts of Emacs generic VC interface that features Git among others.
  The Magit got to the point already where I rarely find myself using the Git
  command-line directly, and then mostly for some batch-processing, or on
  hosts where Emacs is not readily available.

## Releases

+ Git [2.30.0](https://public-inbox.org/git/xmqqk0t1g326.fsf@gitster.c.googlers.com/)
+ Git for Windows [2.30.0(2)](https://github.com/git-for-windows/git/releases/tag/v2.30.0.windows.2),
[2.30.0(1)](https://github.com/git-for-windows/git/releases/tag/v2.30.0.windows.1)
+ GitHub Enterprise [3.0.0](https://help.github.com/enterprise-server@3.0/admin/release-notes#3.0.0.rc1)
+ GitLab [13.8](https://about.gitlab.com/releases/2021/01/22/gitlab-13-8-released/)
[13.7.4, 13.6.5 and 13.5.7](https://about.gitlab.com/releases/2021/01/14/critical-security-release-gitlab-13-7-4-released/),
[13.7.3](https://about.gitlab.com/releases/2021/01/08/gitlab-13-7-3-released/),
[13.7.2, 13.6.4, and 13.5.6](https://about.gitlab.com/releases/2021/01/07/security-release-gitlab-13-7-2-released/)
+ Bitbucket Server [7.9](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ Gerrit Code Review [3.3.1](https://www.gerritcodereview.com/3.3.html#331),
[3.2.6](https://www.gerritcodereview.com/3.2.html#326),
[3.1.11](https://www.gerritcodereview.com/3.1.html#3111)
+ GitKraken [7.5.0](https://support.gitkraken.com/release-notes/current)
+ GitHub Desktop [2.6.2](https://desktop.github.com/release-notes/)

## Other News

__Various__

* [Meet Praefect: The traffic manager making your Git data highly available](https://about.gitlab.com/blog/2021/01/21/high-availability-git-storage-with-praefect/):
  How GitLab scales Git and makes it highly available.
* [Git your updates now: Version control system hits 2.30, preps for main switch](https://devclass.com/2021/01/04/git-2_30-version-control/)
  by Julia Schmidt.

__Light reading__

* [Git clone: a data-driven study on cloning behaviors](https://github.blog/2020-12-22-git-clone-a-data-driven-study-on-cloning-behaviors/)
  by Solmaz Abbaspoursani on GitHub blog continues where 
  [Derrick Stolee's article on `git clone` options](https://github.blog/2020-12-21-get-up-to-speed-with-partial-clone-and-shallow-clone/),
  mentioned in the [previous edition](https://git.github.io/rev_news/2020/12/26/edition-70/), left off.
* [Git Metadata Cloning](https://www.alchemists.io/articles/git_metadata_cloning) - Learn about the
  performance impacts of cloning repository metadata.
* [MAINTAINERS truth and fiction](https://lwn.net/Articles/842415/)
  article by Jonathan Corbet on LWN.net
  describes how one can analyze Git history of the Linux kernel
  for insights to be gleaned from comparing MAINTAINERS entries
  against activity in the real world.
* [How to Use Multiple Git Configs on One Computer](https://www.freecodecamp.org/news/how-to-handle-multiple-git-configurations-in-one-machine/)
  with the help of `includeIf` directive,
  by Dhruv Barochiya on freeCodeCamp.
* [Keeping Git Commit Messages Consistent with a Custom Template](https://dev.to/timmybytes/keeping-git-commit-messages-consistent-with-a-custom-template-1jkm)
  by Timothy Merritt on DEV.to.
* [Conflict resolution in various mergetools](https://www.eseth.org/2020/mergetools.html)
  by Seth House was [previously an appeal to mergetools authors to stop doing three-way merges from scratch](https://github.com/whiteinge/eseth/blob/e993b4b9c5f7e5d2c83890bcb7cd218abe867afd/2020/mergetools.md),
  but now describes the effect of [patches by Felipe Contreras and several other people](https://lore.kernel.org/git/5fe4bec2da21a_19c92085f@natae.notmuch/T/#t)
  that changed the default behaviour of `git mergetool` (this can be controlled
  with the new `mergetool.autoMerge` and `mergetool.<tool>.autoMerge` config options).
* [10 things to love about Git](https://opensource.com/article/20/12/git) by Joshua Allen Holm
  lists OpenSource.com readers' favorite Git articles of the year 2020.

__Git tools and sites__

* [code-compass](https://github.com/ag91/code-compass) is a package that is intended
  to guide you in your software development within Emacs.  For example, you can
  [let history show you which files to edit next](https://ag91.github.io/blog/2021/01/12/emacs-as-your-code-compass-let-history-show-you-which-files-to-edit-next/) or
  [examine how files are historically related to each other](https://ag91.github.io/blog/2021/01/07/emacs-as-your-code-compass-how-related-are-these-modules/).
* [Crev](https://github.com/crev-dev/crev) is a Scalable, social,
  Code REView and recommendation system (rather than _change_ review system);
  currently [Crev for Rust/cargo](https://github.com/crev-dev/cargo-crev)
  is ready and working.

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Sergey Organov and Brooke Kuhlmann.
