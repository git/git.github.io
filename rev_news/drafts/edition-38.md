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


### Reviews

* [branch -l: print useful info whilst rebasing a non-local branch](https://public-inbox.org/git/20180324183844.4565-1-kaartic.sivaraam@gmail.com/)

Kaartic Sivaraam sent a patch to the mailing list that fixed
`git branch -l̀ output when an interactive rebase is performed
and when the interactive rebase was started from a remote branch
or when HEAD was detached.

Eric Sunshine replied to Kaartic that `-l` in `git branch -l̀ is a
shortcut for `--create-reflog` not for `--list`, and suggested some
small improvements among which adding a couple of new tests.

Kaartic then wondered why `git branch -l` prints a list of branch
names when `-l` is not a shorthand for `--list`, and agreed to
implement Eric suggestions.

Jeff King, alias Peff, replied to Kaartic that `-l` just sets the
"reflog" variable to 1, and then, as the command defaults to `--list`
when there is no other command line option, the branch names are
printed which just ignores the "reflog" variable.

Peff also explains that `-l` is probably never used in practice as it
is the default to create a reflog, so it's "historical and quite
unfortunate" that `-l` is a shortcut for `--create-reflog` and not for
`--list`.

Eric then suggested making `-l` mean sometimes `--create-reflog` and
sometimes `--list`, but Peff didn't like that and suggested instead to
either complaining when `-l` is used in list mode or deprecating and
dropping `-l` first and then maybe after a significant amount of time
repurposing it as a shortcut for `--list`.

Then Eric replied to Kaartic with a few small additional suggestions
and with a patch that add the new tests that Eric had previously
suggested.

Meanwhile Kaartic agreed with Peff's suggestions. Those suggestions
were discussed a bit more by Jacob Keller, alias Jake, and Junio
Hamano, the Git maintainer, who agreed with the plan to deprecate
`-l`, then to drop it and eventually to make it shortcut for `--list`.

Peff then sent a patch series [doing all that](https://public-inbox.org/git/20180326072618.GA12530@sigill.intra.peff.net/).
The series was reviewed by Eric and Jake.

Kaartic reworked his original patch to improve `git branch --list̀
output and sent to the mailing list a
[second version of it](https://public-inbox.org/git/3566c82c-114a-ec2d-286c-2851e4b2952d@gmail.com/)
along with Eric's patch adding new tests.

Peff's patch series has been merged into the 'next' branch and
Kaartic's patch series will probably also be merged there too.

<!---
### Support
-->

## Developer Spotlight: Jiang Xin

* Who are you and what do you do?

  I am a Chinese, live in Beijing, China.  Almost at the same time when
  Linus wrote the first line of code for Git, I started to work as a
  self-employed open source consultant. At that time, I didn't know Git
  yet, then I chose SVN, Redmine as the main products to start my consultant
  career.  After working as a Git consultant for Huawei for one year, I
  accepted Huawei's offer at Dec, 2015.

* What would you name your most important contribution to Git?

  As a developer, the most important contribution to Git is interactive
  git clean. One day a guy (reader of my book) lost his work by running
  "git clean -f" and asked me for help. I wanted to do something, so I
  sent patches to Git, and it become this feature: git clean --interactive.

    - http://marc.info/?l=git&m=137217568306354
    - https://github.com/git/git/commit/988f98f6

  As a Huaweier, I also have contributed some fixes for corner cases I met
  at work:

    - [fix on crash of git-receive-pack](https://github.com/git/git/commit/b112b14d)
    - [fix on proxy issue](https://github.com/git/git/commit/d445fda4)

  As a Chinese, the most important work I have done is that I wrote a
  book on Git, and the book was published at 2011. As soon as I received
  the first copy of my book, I sent one to Junio. :)  I open-sourced the
  book in: https://github.com/gotgit/gotgit, and you can read it from:
  http://www.worldhello.net/gotgit/.  Meanwhile, I wrote an e-book for
  GitHub: http://www.worldhello.net/gotgithub; it is also written in
  Chinese, but not published because I feel it is hard to track changes
  of GitHub UI and the book will become obsolte very quickly.

  I became Git l10n coordinator to help Junio for l10n management in
  early 2012. Now there are 11 fully supported language packs for Git,
  and this work is very valuable for those who are not good at English.

* What are you doing on the Git project these days, and why?

  Now I am working in Huawei for the internal Git platform with multiple
  data centers distributed in China. There are many cool features I am
  working on.
  For example: Git central workflow and Git-CDN.

    - Git central workflow is something like Gerrit. No forking before
      sending pull request, no special git hook on client side, no
      "Change-Id" in the commit message, and we use pull request for
      review. We also developped a client side program named "git-mm"
      to help our users to manage multiple git modules, or a single
      git repository.

    - Git-CDN is a reverse proxy for Git. I wrote a program named
      `git-upload-pack-proxy` to handle data syncing and data caching
      across different data-centers.

    - Also we have some enhancement on Git, and I wish I can
      contribute them back to Git one day.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  When I was developing git reverse proxy, I found the git protocol is a
  bit complicated and not very efficient. For example, if a client wants
  to fetch a single branch, the server still needs to send thousands of
  references as refs-advertisement. We can improve it.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  git-gc, I think.  If a repository is as big as 10 GB, git-gc will be
  quite slow.  If we can design a new storage model for Git without
  garbage collection, it will be great.

* What is your favorite Git-related tool/library, outside of Git
  itself?

  - Library: libgit2
  - L10n: Emacs po-mode
  - Git RPC: Gitaly

## Releases

* Git [v2.17.0](https://public-inbox.org/git/xmqq6059z9kz.fsf@gitster-ct.c.googlers.com),
[v2.17.0-rc2](https://public-inbox.org/git/xmqqwoxw6kkk.fsf@gitster-ct.c.googlers.com),
[v2.17.0-rc1](https://public-inbox.org/git/xmqqtvt9nr7p.fsf@gitster-ct.c.googlers.com) and
[v2.16.3](https://public-inbox.org/git/xmqq4ll7lq0r.fsf@gitster-ct.c.googlers.com)
* Git for Windows [2.17.0](https://public-inbox.org/git/20180403123410.13300-1-johannes.schindelin@gmx.de) and
[2.16.3](https://public-inbox.org/git/20180323174044.14612-1-johannes.schindelin@gmx.de)
* GitHub Enterprise [2.13.1](http://enterprise.github.localhost/releases/2.13.1),
[2.12.9](http://enterprise.github.localhost/releases/2.12.9),
[2.11.15](http://enterprise.github.localhost/releases/2.11.15),
[2.10.21](http://enterprise.github.localhost/releases/2.10.21),
[2.13.0](http://enterprise.github.localhost/releases/2.13.0),
[2.12.8](http://enterprise.github.localhost/releases/2.12.8),
[2.11.14](http://enterprise.github.localhost/releases/2.11.14) and
[2.10.20](http://enterprise.github.localhost/releases/2.10.20)
* GitLab [10.5.5](https://about.gitlab.com/2018/03/19/gitlab-10-5-5-released/),
[10.6](https://about.gitlab.com/2018/03/22/gitlab-10-6-released/),
[10.6.1](https://about.gitlab.com/2018/03/28/gitlab-10-6-1-released/),
[10.6.2](https://about.gitlab.com/2018/03/29/gitlab-10-6-2-released/),
[10.6.3, 10.5.7, and 10.4.7](https://about.gitlab.com/2018/04/04/security-release-gitlab-10-dot-6-dot-3-released/) and
[10.6.4](https://about.gitlab.com/2018/04/09/gitlab-10-6-4-released/)
* Bitbucket Server [5.9](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-5-9-release-notes-946029921.html)
* Github Desktop [1.1.1](https://desktop.github.com/release-notes/)
* GitKraken [3.5.0](https://support.gitkraken.com/release-notes/current#v3-5-0) and
[3.5.1](https://support.gitkraken.com/release-notes/current#v3-5-1)
* libgit2 [0.27.0-rc3](https://github.com/libgit2/libgit2/releases/tag/v0.27.0-rc3) and
[0.27.0](https://github.com/libgit2/libgit2/releases/tag/v0.27.0)

## Other News

__Various__

+ The [videos of the 2018 Git Merge talks](https://www.youtube.com/watch?v=MfIi3d7UAhs&list=PLTpLVrHJAlODA3qfvV-x_QBPTZtT5JT5q) have been released.
+ [Git developers contacted by an advanced alien species](https://public-inbox.org/git/CAP8UFD0WZ07EVER_HupcFLw4w-4H2hb2cp8wTaj2i9jOc_+pTA@mail.gmail.com), a 1st of April announce.

__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Gabriel Alcaras &lt;<gabriel.alcaras@telecom-paristech.fr>&gt;
with help from Jiang Xin.
