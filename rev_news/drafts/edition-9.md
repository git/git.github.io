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

<!---
### Reviews
-->


### Support

* [broken racy detection and performance issues with nanosecond file times](http://thread.gmane.org/gmane.comp.version-control.git/278683)

At the end of last September, Karsten Blees sent an email starting
with the following:

> I think I found a few nasty problems with racy detection, as well as
> performance issues when using git implementations with different file
> time resolutions on the same repository (e.g. git compiled with and
> without USE_NSEC, libgit2 compiled with and without USE_NSEC, JGit
> executed in different Java implementations...).

He then listed and detailed some interesting "Notable file time facts"
about how file time is implemented in Linux, Windows, Java and the
different Git implementations (git, libgit2 and JGit).

After that Karsten described 4 problems he found that are related to
the above facts. The problems are:

- Problem 1: Failure to detect racy files (without USE_NSEC)
- Problem 2: Failure to detect racy files (mixed USE_NSEC)
- Problem 3: Failure to detect racy files with core.checkStat=minima
- Problem 4: Performance issues with mixed file time resolutions

And then Karsten suggests 4 possible solutions with sometimes some
variants like 1a. and 1b. that could address the problems. This was
all very detailed and well written.

Moreover Karsten followed up a few days later with one RFC patch
called "read-cache: fix file time comparisons with different
precisions" to take care of some of the problem he described.

Junio Hamano, the Git maintainer and Johannes Schindelin looked
respectively at the solutions and at the RFC patch proposed by
Karsten. They found it sensible.

Unfortunately it looks like that Karsten's patch has not been merged
yet. Maybe because it has not been submited as a non RFC patch yet.

Hopefully at one point some progress will be made in this area, and
anyway Karsten's detailed emails can serve as a reference for futur
work.

## Releases


## Other News

__Various__


__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt; and Nicola Paolucci &lt;<npaolucci@atlassian.com>&gt;,
with help from XXX.
