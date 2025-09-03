---
title: Git Rev News Edition 127 (September 30th, 2025)
layout: default
date: 2025-09-30 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 127 (September 30th, 2025)

Welcome to the 127th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of August and September 2025.

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

<!---
## Developer Spotlight:
-->

## Other News

__Various__


__Light reading__


__Easy watching__

+ Kinetic Merge in action
    + [Merging through a file split](https://youtu.be/JHb9DKK0LIA)
    + [Complex merge demonstration](https://youtu.be/6jry6NKxGJA)
    + [Merging code embedded inside an if-statement](https://www.youtube.com/watch?v=sm4Naq_zJU0&t=2s)


__Git tools and sites__

+ [Kinetic Merge](https://github.com/sageserpent-open/kineticMerge) is a command-line tool that helps you merge a heavily refactored codebase and stay sane.
  Its goals are to:
    + Merge two branches of a Git repository *holistically across the entire codebase*.
    + Take into account the motion of code in either branch due to refactoring.
    + Handle file renames, file splits, file concatenation.
    + Handle code being excised from one place in a file and moved elsewhere in that file or to somewhere within another file, or hived off all by itself in its own new file.
    + Work alongside the usual Git workflows, allowing ordinary Git merge to take over at the end if necessary.
    + Be a simple command line tool that tries to do as much as it can without supervision, and with minimal supervision when complexities are encountered.
  
  Written in Scala, under an MIT license.

## Releases


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
