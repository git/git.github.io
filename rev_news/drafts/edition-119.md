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

* Adam Johnson’s book “Boost Your Git DX”
  [has been updated](https://adamj.eu/tech/2025/01/28/bygdx-second-update/)
  with 28 new pages of content. This book was first mentioned in
  [Git Rev News Edition #104](https://git.github.io/rev_news/2023/10/31/edition-104/).

__Light reading__

<!---
__Easy watching__
-->

__Git tools and sites__


## Releases

+ Git [2.48.1 and friends](https://public-inbox.org/git/xmqq5xmh46oc.fsf@gitster.g/),
[2.48.0](https://public-inbox.org/git/xmqqplku7cvm.fsf@gitster.g/),
[2.48.0-rc2](https://public-inbox.org/git/xmqqbjwjyalr.fsf@gitster.g/)
+ Git for Windows [2.48.0-rc2(1)](https://github.com/git-for-windows/git/releases/tag/v2.48.0-rc2.windows.1)
+ GitLab [17.8.1](https://about.gitlab.com/releases/2025/01/22/patch-release-gitlab-17-8-1-released/),
[17.8](https://about.gitlab.com/releases/2025/01/16/gitlab-17-8-released/),
[17.7.2](https://about.gitlab.com/releases/2025/01/15/gitlab-17-7-2-released/),
[17.7.1](https://about.gitlab.com/releases/2025/01/08/patch-release-gitlab-17-7-1-released/)
+ Gerrit Code Review [3.10.4](https://www.gerritcodereview.com/3.10.html#3104),
[3.11.1](https://www.gerritcodereview.com/3.11.html#3111),
[3.9.9](https://www.gerritcodereview.com/3.9.html#399)
+ GitHub Enterprise [3.15.2](https://help.github.com/enterprise-server@3.15/admin/release-notes#3.15.2),
[3.14.7](https://help.github.com/enterprise-server@3.14/admin/release-notes#3.14.7),
[3.13.10](https://help.github.com/enterprise-server@3.13/admin/release-notes#3.13.10),
[3.12.14](https://help.github.com/enterprise-server@3.12/admin/release-notes#3.12.14)
+ GitKraken [10.6.3](https://help.gitkraken.com/gitkraken-client/current/),
[10.6.2](https://help.gitkraken.com/gitkraken-client/current/),
[10.6.1](https://help.gitkraken.com/gitkraken-client/current/)
+ GitHub Desktop [3.4.15](https://desktop.github.com/release-notes/),
[3.4.14](https://desktop.github.com/release-notes/),
[3.4.13](https://desktop.github.com/release-notes/)
+ Garden [2.0.0](https://github.com/garden-rs/garden/releases/tag/v2.0.0),
[1.10.1](https://github.com/garden-rs/garden/releases/tag/v1.10.1)
+ Git Cola [4.11.0](https://github.com/git-cola/git-cola/releases/tag/v4.11.0)
+ GitButler [0.14.6](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.14.6),
[0.14.5](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.14.5)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Justin Tobler.
