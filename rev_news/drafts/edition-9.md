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


## Other News

__Various__


__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt; and Nicola Paolucci &lt;<npaolucci@atlassian.com>&gt;,
with help from XXX.
