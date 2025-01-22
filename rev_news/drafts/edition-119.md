---
title: Git Rev News Edition 119 (January 31st, 2025)
layout: default
date: 2025-01-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 119 (January 31st, 2025)

Welcome to the 119th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of December 2024 and January 2025.

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

## Developer Spotlight: Justin Tobler

* Who are you and what do you do?

  My name is Justin Tobler and I am a relatively new contributor to the
  Git project with my first contributions being made this last year. I
  work at GitLab and these days spend my time integrating Git into
  GitLab's data access layer as well as upstreaming Git fixes/features.

* What would you name your most important contribution to Git?

  Most of my contributions thus far have been relatively minor bug fixes,
  but [one bug I found](https://public-inbox.org/git/pull.1683.git.1709669025722.gitgitgadget@gmail.com/)
  particularly interesting was with the table compaction algorithm in the
  new reftable reference backend. There was a theoretical scenario where
  certain Git operations could be performed and new tables written, but
  table compaction would never occur. This was found when tests on certain
  platforms started failing because of file descriptor limits being exceeded.

* What are you doing on the Git project these days, and why?

  One topic I'm currently working on is introducing a way to
  [generate batches of specific blob diffs](https://public-inbox.org/git/20241213042312.2890841-1-jltobler@gmail.com/).
  This is not particularly useful for users, but for Git servers
  it's a nice feature.

  I still have much to learn about the project so I also enjoy looking
  into the inflight topics that pop on the mailing list.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  I don't have anything specific in mind, but it would probably be along
  the lines of changes to make the Git CLI more consistent across its
  various commands.

* What is your favorite Git-related tool/library, outside of
  Git itself?

  For my Git-related workflow, outside of GitLab, I primarily use the Git
  CLI for everything.

* What is your toolbox for interacting with the mailing list and for
  development of Git?

  For interacting with the mailing list my workflow primarily consists of
  using [`neomutt`](https://neomutt.org/guide/gettingstarted.html)
  and `git send-email`, but I have also recently been
  exploring [`b4`](https://github.com/mricon/b4).

  For development, I use [`neovim`](https://neovim.io) as my editor with
  an assortment of plugins.

* What is your advice for people who want to start Git development?
  Where and how should they start?

  If you are unfamiliar with the mailing workflow, [GitGitGadget](https://gitgitgadget.github.io/)
  can help handle formatting patches and sending them off to the mailing
  list. My first couple of patch series used this tool and I found it
  useful to get started without having to be super familiar with
  `git format-patch` and `git send-email`. Other than that, I also
  find it very helpful to observe how other contributors submit
  patches and interact on the mailing list.

* If there's one tip you would like to share with other Git
  developers, what would it be?

  I appreciate when the authors of a patch series provide as much
  background as possible to the change being made. Reading incoming patch
  series is a great way to learn about the project and it is very helpful
  when the required context overhead is minimized.


## Other News

__Various__


__Light reading__

<!---
__Easy watching__
-->

__Git tools and sites__


## Releases


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
