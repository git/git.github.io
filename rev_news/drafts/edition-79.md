---
title: Git Rev News Edition 79 (September 22nd, 2021)
layout: default
date: 2021-09-22 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 79 (September 22nd, 2021)

Welcome to the 79th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of August 2021.

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

## Developer Spotlight: Josh Steadmon

* Who are you and what do you do?

  I'm a Software Engineer at Google, and I work on a team dedicated to
  Git. Outside of work, I'm a husband and a new dad, which doesn't leave
  me much time for anything else :).

  Git is actually my first experience as a professional developer. Up
  until I joined the Git team in 2018, my career had been in system
  administration and reliability engineering.

* What would you name your most important contribution to Git?

  Probably the addition of fuzz tests. Not so much due to impact so far
  (although it has found a few small bugs), but because of the opportunity
  for future work in this area. If I had more time, I'd love to look into
  having a proper fuzz tester for client/server communication, for
  example.

* What are you doing on the Git project these days, and why?

  Until recently, the majority of my work has been internal performance
  monitoring of Git usage by Google developers. Lately I've been winding
  down my work on monitoring and starting to look into improving
  performance and the user experience with submodules. Only the very
  beginnings of that have started to show up on-list so far.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  I think I'd echo my former coworker [Brandon Williams (edition 28)](https://git.github.io/rev_news/2017/06/14/edition-28/#developer-spotlight-brandon-williams),
  and work on cleaning up the global state. For a new-ish developer who
  doesn't have full history on all the various subsystems, it can be
  difficult to follow the logic when there's lots of non-local state being
  modified.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  Not so much to remove as change: I wish it was easier to move away from
  SHA-1 hashes. I'm very happy that brian m. carlson has been working on
  supporting SHA-256.

* What is your favorite Git-related tool/library, outside of Git itself?

  I'm a huge fan of [git-annex](https://git-annex.branchable.com/) and use
  it to keep my ever-growing pile of PDFs and ebooks synced and organized
  across various devices. I also use it to archive primary sources in a
  homebrew personal knowledge base.

## Releases


## Other News

__Various__


__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
