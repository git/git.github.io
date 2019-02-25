---
title: Git Rev News Edition 48 (February 27st, 2019)
layout: default
date: 2019-02-27 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 48 (February 27st, 2019)

Welcome to the 48th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of January
2019. This edition also covers the Git Contributor Summit and the Git
Merge conference that happened on January 31th and February 1st.

## Discussions

<!---
### General
-->


### Reviews

* [Add a new "sparse" tree walk algorithm](https://public-inbox.org/git/pull.89.git.gitgitgadget@gmail.com/)

Last November Derrick Stolee, who prefers to be called just Stolee,
sent a patch series to the mailing list to speed up `git push`
operations by implementing and using a new "sparse" tree walk
algorithm.

Stefan Beller wondered how users can know about this new algorithm and
if it should be turned on by default for users. Stolee replied that
indeed "we should actually make the config setting true by default,
and recommend that servers opt-out"

Junio Hamano, the Git maintainer, disagreed saying that we should wait
until "enough users complain that they have to turn it on" before we
turn it on by default.

Stolee later sent a [version 2 of the patch series](https://public-inbox.org/git/pull.89.v2.git.gitgitgadget@gmail.com/)
improving the tests, then a [version 3](https://public-inbox.org/git/pull.89.v3.git.gitgitgadget@gmail.com/)
improving the documentation, and a [version 4](https://public-inbox.org/git/pull.89.v4.git.gitgitgadget@gmail.com/)
with a few code and commit message improvements.

Junio and Stolee discussed how the mark_trees_uninteresting_sparse()
function is implemented in the first patch, and how a variable is
named in this function.

They also discussed the purpose of patches 2 and 3 and agreed that
they should be merged and what the related tests should do.

And Junio suggested a number of small code improvements in the last
patch. Especially he suggested to get rid of a global variable that
was unused. Ramsay Jones, who regularly uses the `sparse` tool and his
own `static-check.pl` script on the Git code base to find errors, had
also found this unused variable separately.

Ævar Arnfjörð Bjarmason chimed in to ask for a clarification about
which step the patch speeds up, and if a progress bar should be added
while the user is waiting during this step, and how this step should
be named on the command line interface. It seems though that some
preliminary work would be needed to untangle the steps during which a
progress bar is already displayed.

Stolee eventually sent a [version 5 of the patch series](https://public-inbox.org/git/pull.89.v5.git.gitgitgadget@gmail.com/)
on January 16th which has since been merged and is in the recently
released Git v2.21.0.

<!---
### Support
-->

<!---
## Developer Spotlight:
-->

## Releases

+ Git [2.21.0-rc2](https://public-inbox.org/git/xmqq8sybz7b2.fsf@gitster-ct.c.googlers.com/),
[2.21.0-rc1](https://public-inbox.org/git/xmqq8syj9h9b.fsf@gitster-ct.c.googlers.com/),
[2.21.0-rc0](https://public-inbox.org/git/xmqqh8dgqcqn.fsf@gitster-ct.c.googlers.com/)
+ libgit2 [0.28.1](https://github.com/libgit2/libgit2/releases/tag/v0.28.1),
[0.28.0](https://github.com/libgit2/libgit2/releases/tag/v0.28.0),
[0.27.8](https://github.com/libgit2/libgit2/releases/tag/v0.27.8)
+ libgit2sharp [0.26](https://github.com/libgit2/libgit2sharp/releases/tag/v0.26)
+ GitHub Enterprise [2.16.2](https://enterprise.github.com/releases/2.16.2/notes),
[2.15.7](https://enterprise.github.com/releases/2.15.7/notes),
[2.14.14](https://enterprise.github.com/releases/2.14.14/notes),
[2.13.20](https://enterprise.github.com/releases/2.13.20/notes),
[2.16.1](https://enterprise.github.com/releases/2.16.1/notes),
[2.15.6](https://enterprise.github.com/releases/2.15.6/notes),
[2.14.13](https://enterprise.github.com/releases/2.14.13/notes),
[2.13.19](https://enterprise.github.com/releases/2.13.19/notes)
+ GitLab [11.8](https://about.gitlab.com/2019/02/22/gitlab-11-8-released/),
[11.7.5](https://about.gitlab.com/2019/02/07/gitlab-11-7-5-released/),
[11.7.4](https://about.gitlab.com/2019/02/05/critical-security-release-gitlab-11-dot-7-dot-4-released/),
[11.7.3](https://about.gitlab.com/2019/01/31/security-release-gitlab-11-dot-7-dot-3-released/)
+ Bitbucket Server [6.0](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ Gerrit Code Review [2.15.10](https://www.gerritcodereview.com/2.15.html#21510)
and [2.16.5](https://www.gerritcodereview.com/2.16.html#2165)
+ GitKraken [4.2.2](https://support.gitkraken.com/release-notes/current),
[4.2.1](https://support.gitkraken.com/release-notes/current),
[4.2.0](https://support.gitkraken.com/release-notes/current),
[4.1.1](https://support.gitkraken.com/release-notes/current),
[4.1.0](https://support.gitkraken.com/release-notes/current),
[4.0.6](https://support.gitkraken.com/release-notes/current),
[4.0.5](https://support.gitkraken.com/release-notes/current),
[4.0.4](https://support.gitkraken.com/release-notes/current),
[4.0.3](https://support.gitkraken.com/release-notes/current),
[4.0.2](https://support.gitkraken.com/release-notes/current),
[4.0.1](https://support.gitkraken.com/release-notes/current),
[4.0.0](https://support.gitkraken.com/release-notes/current)
+ GitHub Desktop [1.6.2](https://desktop.github.com/release-notes/)
+ Sourcetree [3.1](https://product-downloads.atlassian.com/software/sourcetree/ReleaseNotes/Sourcetree_3.1.html)

## Other News

__Various__

* [GSoC 2019: Git's application submitted](https://public-inbox.org/git/20190204215251.GB6085@hank.intra.tgummerer.com/T/);
  ideas for project proposals [published](https://git.github.io/SoC-2019-Ideas/)

* The Git Contributor Summit 2019 happened on January 30th in Brussels. Elijah
  Newren took some [notes](https://public-inbox.org/git/CABPp-BGfSRy-NT+f39gSumD9haYZPAnpNPY-VnanioCbdYFoEQ@mail.gmail.com/).
  A video stream of the event was broadcast and recorded, but is not
  yet available for download.

* The [Git Merge Conference 2019](https://git-merge.com/) happened on
  February 1st in Brussels. Videos of the presentations are not yet
  available. The GitHub team expects them to be available
  [before the end of this month](https://public-inbox.org/git/20190221082218.GA3335@sigill.intra.peff.net/).

__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Gabriel Alcaras &lt;<gabriel.alcaras@telecom-paristech.fr>&gt;
with help from XXX.
