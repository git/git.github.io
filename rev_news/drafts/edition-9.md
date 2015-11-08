---
title: Git Rev News Edition 9 (November 11th, 2015)
layout: default
date: 2015-11-09 21:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 9 (November 11th, 2015)

Welcome to the 9th edition of [Git Rev News](http://git.github.io/rev_news/rev_news.html),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](http://git.github.io/rev_news/rev_news.html) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of October 2015.

## Discussions

<!---
### General
-->

### Reviews

* [Expose the submodule parallelism to the user](http://thread.gmane.org/gmane.comp.version-control.git/280284)

Stefan Beller started posting patch series to "finish the on going
efforts of parallelizing submodule network traffic".

This followed
[previous work by Stefan](http://thread.gmane.org/gmane.comp.version-control.git/277705/)
to make it possible to launch many git submodule fetches in parallel.

What is interesting is that a few weeks before posting the first
version of his patch series, Stefan had been involved in a
[discussion](http://thread.gmane.org/gmane.comp.version-control.git/279712/)
that was started by Kannan Goundan who asked if it would be possible
to "Make 'git checkout' automatically update submodules?".

In this previous discussion Stefan pointed Kannan to [a wiki
that contains a lot of information about submodule implementation](https://github.com/jlehmann/git-submod-enhancements/wiki)
including pointers to some current developments that have not been
posted to the mailing list yet. This wiki had indeed been maintained
since September 2010 by Jens Lehmann and Heiko Voigt who have been
working for a long time on git submodule.

When Stefan posted his patch series, it attracted the attention of
many reviewers like Eric Sunshine, Ramsay Jones, Jonathan Nieder and
Junio Hamano. As usual the reviewers made sensible suggestions and
Stefan soon posted another version of his patch series.

Hopefully the tremendous work by Stefan and the reviewers will soon
make it possible to have improved submodule performance.

### Support

* [broken racy detection and performance issues with nanosecond file times](http://thread.gmane.org/gmane.comp.version-control.git/278683)

At the end of last September, Karsten Blees sent an email starting
with the following:

> I think I found a few nasty problems with racy detection, as well as
> performance issues when using git implementations with different file
> time resolutions on the same repository (e.g. git compiled with and
> without USE_NSEC, libgit2 compiled with and without USE_NSEC, JGit
> executed in different Java implementations...).

He listed and detailed some interesting "Notable file time facts"
about how file time is implemented in Linux, Windows, Java and the
different Git implementations (git, libgit2 and JGit).

Karsten noted 4 problems related to the above facts. These are:

- 1: Failure to detect racy files (without USE_NSEC)
- 2: Failure to detect racy files (mixed USE_NSEC)
- 3: Failure to detect racy files with core.checkStat=minima
- 4: Performance issues with mixed file time resolutions

Kartsen proceeded to suggest several possible solutions for these, all
detailed and well written. A few days later he followed up with an 
RFC patch
called "read-cache: fix file time comparisons with different
precisions" to take care of some of the problem he described.

Junio Hamano and Johannes Schindelin both reviewed the
suggested solutions as well as the RFC patch, and found it all sensible.

There is still some way to go, as the patch has not been merged
yet. Hopefully some progress will be made in this area soon, using
Karsten's detailed emails as a reference for future work.

## Releases

* Git, following some intermediate releases, is now at [2.6.3](http://article.gmane.org/gmane.comp.version-control.git/280947/)
* Git for Windows, similarly is now at [2.6.2](https://groups.google.com/d/msg/git-for-windows/R4xTgOfFu3Q/vex656-JBQAJ)
* GitLab shipped several times in the last month, leaving their latest version at
  [8.1.3](https://about.gitlab.com/2015/11/06/gitlab-8-dot-1-dot-3-released/), after the major
  [8.1](https://about.gitlab.com/2015/10/22/gitlab-8-1-released/) release. They also celebrated their
  [millionth download](https://about.gitlab.com/2015/10/29/one-million-downloads-of-gitlab/).
* GitHub shipped the [2.4](https://github.com/blog/2076-github-enterprise-2-4-is-now-available) version of their Enterprise software.

## Other News

__Light reading__

* [Fun with recreating an evil merge](http://git-blame.blogspot.de/2015/10/fun-with-recreating-evil-merge.html), by Junio Hamano
* [Git Concurrency in GitHub Desktop](http://githubengineering.com/git-concurrency-in-github-desktop/), by Amy Palamountain
* [Monorepos in Git](https://developer.atlassian.com/blog/2015/10/monorepos-in-git/?p), by Stefan Saasen
* [Monotone, Git, Linus and Marty McFly](http://webiphany.com/2015/10/21/monotone-git-linus-and-marty-mcfly.html), by Chris Dawson
* [Git Back to the Future](https://fifthsurprise.wordpress.com/2014/02/19/git-back-to-the-future/), by Kevin Chang
* [GitHub’s Large File Storage is no panacea for Open Source](https://medium.com/@megastep/github-s-large-file-storage-is-no-panacea-for-open-source-quite-the-opposite-12c0e16a9a91), by Stéphane Peter
* [Six cool features of the Git 2.x series](https://developer.atlassian.com/blog/2015/10/cool-features-git-2.x/), by our own Nicola Paolucci
* [Git freebase](http://ericrie.se/blog/git-freebase/), by Eric Riese
* [The git's guide to git: Bisect](http://rkoutnik.com/articles/The-gits-guide-to-git-Bisect.html), by Randall Koutnik
* [Don't include configs in your git repos](http://blog.eatonphil.com/2015-10-27/dont-include-configs-in-your-git-repos) by Phil Eaton
* [Using Git to Manage Todos](http://jezenthomas.com/using-git-to-manage-todos/), by Jezen Thomas
* [Fixing Stupid Mistakes in Git Pull Requests](http://developer.telerik.com/featured/fixing-stupid-mistakes-in-git-pull-requests/), by TJ VanToll

__Git tools and sites__

* [Git Extras](https://github.com/tj/git-extras) - a set of extra command line Git utilities.
* [Delta](http://delta.octavore.com/) - a command-line utility for text diffs.
* [Pijul](https://pijul.org/) - actually a competing VCS! But still interesting.
* [ParallelGit](http://beijunyi.github.io/ParallelGit) - wraps JGit to provide "a more friendly API".
* [Git Dependency Manager](http://git-dependency-manager.info/) - a language-agnostic "dependency manager". It aims to serve as a submodules replacement and provides advanced options for managing versions of nested Git repositories.
* [Quack](https://github.com/Autodesk/quack) - another Git-based dependency manager.
* [git-svnsync](http://git-svnsync.gforge.inria.fr/) - a bi-directional server-side synchronisation tool between a git and a subversion repository
 
## Credits

This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt; and Nicola Paolucci &lt;<npaolucci@atlassian.com>&gt;,
with help from XXX.
