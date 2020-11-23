---
title: Git Rev News Edition 69 (November 25th, 2020)
layout: default
date: 2020-11-25 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 69 (November 25th, 2020)

Welcome to the 69th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of October 2020.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

<!---
### Support
-->

## Developer Spotlight: Philippe Blain

* Who are you and what do you do?

  I'm a scientist at the Canadian Center for Meteorological and
  Environmental Prediction, in Montréal, Québec, Canada. I'm part of the
  development team for the numerical model we use to predict the movement,
  growth and melt of sea-ice, the frozen parts of the Arctic and Antarctic
  oceans. Like most computer models in the field of weather forecasting,
  this software is written in good old Fortran, and runs on our
  supercomputers. We use Git extensively to track changes across all
  layers of our technological stack, and I quickly developed an interest
  in Git's inner workings.

* What would you name your most important contribution to Git?

  Since I started contributing to the project a little more than one year
  ago, I've mostly been trying to fix the bugs I encounter in the course
  of my daily work. So I'm not sure which one of my topics has had the
  biggest impact on other users. However, I can say that the contribution
  I'm most proud of is [fixing `git checkout --recurse-submodules`](https://github.com/git/git/compare/d0654dc308b0ba76dd8ed7bbb33c8d8f7aacd783...846f34d3514b81764dea7c2a4851f6187ab31aad)
  to correctly switch between branches when one branch has nested
  submodules and the other branch has no submodules at all. I learned
  enormously during the process of developing this fix, not only about how
  Git ["unpack trees"](https://github.com/git/git/blob/master/unpack-trees.c)
  to keep the index, working directory and HEAD consistent, but also how
  [`fork` and `exec`](https://en.wikipedia.org/wiki/Fork%E2%80%93exec)
  calls work and especially how to debug such spawned process using GDB
  and LLDB.

* What are you doing on the Git project these days, and why?

  Right now I'm working on a fix to prevent `git checkout
  --recurse-submodules` from losing uncommitted work in submodules.
  Although the documentation says this shouldn't happen, I've found a few
  cases where it does, and since it's never a nice experience to lose
  work, I'd like to fix that.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  Apart from rewriting the whole thing in C++, you mean? Jokes aside, I
  would like for more work to be put towards better submodule support.
  There was a colossal effort a couple of years ago to add
  `--recurse-submodules` flags to several Git commands, so that submodules
  worktrees stay up to date when switching between superproject commits.
  Unfortunately this effort has died off due to core contributors to the
  submodule code changing jobs, and some porcelain commands still lack
  that capability.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  I think it's unfortunate that the dot-dot vs. dot-dot-dot syntax mean
  different things in `git diff` than in the rest of Git commands. It's
  another one of those tricky things that users have to remember. The fact
  that `checkout` and `reset` have so many different modes of operation
  also make them confusing for beginners. The introduction of `git switch`
  and `git restore` should help with that, though.

* What is your favorite Git-related tool/library, outside of Git itself?

  Since I've heard of it I've been using
  [`diff-so-fancy`](https://github.com/so-fancy/diff-so-fancy#readme) as a
  way to make Git diffs more easily readable. Apart from that I mostly
  stick to the Git command line. Recently I discovered
  [`git-crecord`](https://github.com/andrewshadura/git-crecord#readme), an
  ncurses interface for, among other features, interactive line-by-line
  staging.

## Releases


## Other News

__Various__


__Light reading__

* [Git before GitHub](https://tarunbatra.com/blog/x/git-before-github/)
by Tarun Batra is a beginner-friendly article explaining how to submit
patches using git's built-in tools without using a platform like GitHub.


__Git tools and sites__

* [repositorch](https://github.com/kirnosenko/Repositorch) is a VCS repository analysis 
  engine written in C#, which supports Git. It allows to get some basic and advanced 
  statistics including LOCs, Burndown, Code ownership, Defect density and more.
  

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Semyon Kirnosenko and Tarun Batra.
