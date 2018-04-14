---
title: Git Rev News Edition 38 (XXX, 2018)
layout: default
date: 2018-04-18 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 38 (XXX, 2018)

Welcome to the 38th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of March 2018.

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

## Developer Spotlight: Jiang Xin

* Who are you and what do you do?

I am a Chinese, live in Beijing, China.  Almost at the same time when
Linus wrote the first line of code for Git, I started to work as a
self employed open source consultant. At that time, I didn't know Git,
but chose SVN, Redmine as the main products to start my consultant
career.  After working as a Git consultant for Huawei for one year, I
accepted Huawei's offer at Dec, 2015.

* What would you name your most important contribution to Git?

One guy (reader of my book) lost his work by running "git clean -f"
and asked me for help. I wanted to do something, so I sent patches to
Git, and it become this feature: git clean --interactive.

    - https://github.com/git/git/commit/9f93e461
    - http://marc.info/?l=git&m=137217568306354

I also have contributed some fixes which maybe only important under
certain corner case:

  * [fix on crash of git-receive-pack](https://github.com/git/git/commit/b112b14d)
  * [fix on proxy issue](https://github.com/git/git/commit/d445fda4)

For Chinese, the most important work I have done is that I wrote a
book on Git in Chinese, and the book was published at 2011. As soon as
I received the first copy of my book, I sent one to Junio. :)  I open
source the book in: https://github.com/gotgit/gotgit, and you can read
it from: http://www.worldhello.net/gotgit/, if you are Chinese. ;)
And I also wrote an e-book on GitHub:
http://www.worldhello.net/gotgithub; it is also written in Chinese,
but not published because I am not satisfied with it, only the
appendix maybe useful.

At the end of 2011, when I found Git already had infrastructure for
i18n and l10n, I sent the first Git dialect (Chinese l10n) to Junio.
Even though Junio is from Japan, he could not read most of them. After
some discussion, I become the volunteer for Git l10n coordinate.

* What are you doing on the Git project these days, and why?

Now I am working in Huawei for the internal Git platform with multiple
data centers distributed in China. There are many cool features I am
working on.
For example: Git central workflow and Git-CDN.

    * Git central workflow is something like Gerrit. No forking before
      sending pull request and no "Change-Id" in the commit message,
      and we use pull request for review.

    * Git-CDN is a reverse proxy for Git. I wrote a program named
      `git-upload-pack-proxy` to handle data syncing across different
      data-centers.

    * Also we have some enhancement on Git, and I wish I can
      contribute them back to Git one day.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

When I was developing git reverse proxy, I found the git protocol is a
bit complicated and not very efficient.  Maybe we can improve it.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

git-gc, I think.  If a repository is as big as 10 GB, git-gc will be
quite slow.  If we can design a new storage solution for Git without
garbage collection, it will be great.

* What is your favorite Git-related tool/library, outside of Git
  itself?

Library: libgit2
L10n: Emacs po-mode
Git RPC: Gitaly

## Releases


## Other News

__Various__

+ The [videos of the 2018 Git Merge talks](https://www.youtube.com/watch?v=MfIi3d7UAhs&list=PLTpLVrHJAlODA3qfvV-x_QBPTZtT5JT5q) have been released.

__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Gabriel Alcaras &lt;<gabriel.alcaras@telecom-paristech.fr>&gt;
with help from XXX.
