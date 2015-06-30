---
title: Git Rev News Edition 5 (XXX, 2015)
layout: default
date: 2015-07-03 21:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 5 (XXX, 2015)

Welcome to the fourth edition of [Git Rev News](http://git.github.io/rev_news/rev_news.html),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](http://git.github.io/rev_news/rev_news.html) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of June 2015.

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


## Releases

* [git-multimail](https://github.com/git-multimail/git-multimail) [1.1.0](https://github.com/git-multimail/git-multimail/releases/tag/1.1.0) was released. git-multimail is a tool to send notification emails for pushes to a git repository. It is also available in the `contrib/hooks/multimail/` directory of Git's source tree (version 1.1.0 will be distributed with Git 2.5).

## Other News

__Various__

* As part of a school project, Antoine DELAITE, Remi GALAN ALFONSO, Remi LESPINET, Guillaume PAGES and Louis-Alexandre STUBER, from [Ensimag](http://ensimag.grenoble-inp.fr/), contributed to Git. As a warm-up, they implemented a `am.threeWay` configuration variable to have `git am` use `-3` by default (will be in Git 2.5). Some patch series are being polished to allow `git bisect` to use an arbitrary pair of terms instead of `good` and `bad`, an improved management of list of addresses and aliases in the `--to`, `--cc` and `--bcc` options of `git send-email`, a more verbose output for `git status` when ran during a `rebase -i` session, and a safety feature for `git rebase` to avoid dropping lines by mistake in the todo-list.

__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt; and Nicola Paolucci &lt;<npaolucci@atlassian.com>&gt;
with help from Junio C Hamano and XXX.
