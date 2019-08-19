---
title: Git Rev News Edition 54 (August 21st, 2019)
layout: default
date: 2019-08-21 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 54 (August 21st, 2019)

Welcome to the 54th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of July 2019.

## Discussions

<!---
### General
-->

### Reviews

* [[RFC/PATCH] CodingGuidelines: spell out post-C89 rules](https://public-inbox.org/git/xmqq4l3l520f.fsf_-_@gitster-ct.c.googlers.com/)

  Carlo Arenas recently [commented on a patch by Emily Shaffer](https://public-inbox.org/git/CAPUEspgjSAqHUP2vsCCjqG8b0QkWdgoAByh4XdqsThQMt=V38w@mail.gmail.com/)
  that moving a declaration out of a "for" loop would allow building on
  a Centos 6 box.

  Junio Hamano, the Git maintainer, replied to Carlo that we indeed
  "still reject variable definition in for loop control" even if "for
  past several years we've been experimenting with a bit more modern
  features".

  Junio then sent a patch to update the Documentation/CodingGuidelines
  file. This file describes which coding conventions are, and should
  be, used by developers working on the Git codebase.

  One very important part of these conventions are the C language
  features that the developers are allowed or disallowed to use.

  For a very long time, to be compatible with as many systems as
  possible, only features part of the
  [C89 standard](https://en.wikipedia.org/wiki/ANSI_C) were
  allowed. Since 2012 though features part of the C99 standard have
  been very slowly introduced.

  When these new features were introduced, they were introduced in
  "weather balloons" patches, which are very limited changes that are
  easy to undo in case someone complains.

  Fortunately in most cases, though not in the "for" loop case, since
  the patches have been merged, no one has complained that they
  couldn't compile Git's code due to these patches, which means that
  code using these new features can now be more widely accepted.

  The goal of Junio's patch was to document that fact and these new
  features at the same time.

  One of the new feature is allowing an enum definition whose last
  element is followed by a comma. Jonathan Nieder replied to Junio
  that someone complained about that in [2010](https://public-inbox.org/git/20100311163235.GC7877@thor.il.thewrittenword.com/),
  but, as it has not happened since 2012 when the feature was
  reintroduced in the code base, it is ok.

  Jonathan even suggested that we "say that the last element should
  always be followed by a comma, for ease of later patching", and
  Junio found this idea interesting.

  A few more comments were made by Jonathan and Bryan Turner about
  small possible improvements to Junio's patch. Junio then sent an
  updated version of the patch which has since been merged to the
  master branch.

<!---
### Support
-->

<!---
## Developer Spotlight:
-->

## Releases

+ Git [2.23.0](https://public-inbox.org/git/xmqqy2zszuz7.fsf@gitster-ct.c.googlers.com/),
[2.22.1](https://public-inbox.org/git/xmqqh86m9npi.fsf@gitster-ct.c.googlers.com/),
[2.23.0-rc2](https://public-inbox.org/git/xmqqk1bmcf3q.fsf@gitster-ct.c.googlers.com/),
[2.23.0-rc1](https://public-inbox.org/git/xmqq36ijjk8i.fsf@gitster-ct.c.googlers.com/),
[2.23.0-rc0](https://public-inbox.org/git/xmqqh874tssp.fsf@gitster-ct.c.googlers.com/)
+ libgit2 [0.28.3](https://github.com/libgit2/libgit2/releases/tag/v0.28.3)
+ libgit2sharp [0.26.1](https://github.com/libgit2/libgit2sharp/releases/tag/v0.26.1)
+ Bitbucket Server [6.5](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ Gerrit Code Review [2.15.15](https://www.gerritcodereview.com/2.15.html#21515),
[2.16.11](https://www.gerritcodereview.com/2.16.html#21611)
+ GitHub Enterprise [2.17.6](https://enterprise.github.com/releases/2.17.6/notes),
[2.16.15](https://enterprise.github.com/releases/2.16.15/notes),
[2.15.20](https://enterprise.github.com/releases/2.15.20/notes)
+ GitLab [12.1.6](https://about.gitlab.com/2019/08/12/critical-security-release-gitlab-12-dot-1-dot-6-released/),
[12.1.4](https://about.gitlab.com/2019/08/06/gitlab-12-1-4-released/),
[12.1.3](https://about.gitlab.com/2019/07/31/gitlab-12-1-3-released/),
[12.1.2](https://about.gitlab.com/2019/07/29/security-release-gitlab-12-dot-1-dot-2-released/),
[12.1.1](https://about.gitlab.com/2019/07/24/gitlab-12-1-1-released/)
+ GitKraken [6.1.3](https://support.gitkraken.com/release-notes/current),
[6.1.2](https://support.gitkraken.com/release-notes/current),
[6.1.1](https://support.gitkraken.com/release-notes/current),
[6.1.0](https://support.gitkraken.com/release-notes/current)
+ GitHub Desktop [2.1.1](https://desktop.github.com/release-notes/)

## Other News

__Various__

* The first translations of manpages are finally hitting git-scm.com. The project was kicked off and [announced](https://public-inbox.org/git/1992944.NOdEsaAZKb@cayenne/) in january 2019. It was decided to hold the translation outside the main git repository and use a converter from the original asciidoc format to gettext po. After some more work on tooling and [more people](https://public-inbox.org/git/CAHtYWY4g4BYDr_z7pfS-p=aX_YkVo4HzGR1Dsytn4RkzBo0GjA@mail.gmail.com/) joining the project, the toolchain to allow publishing on git-scm.com is in place and you can already see [some results](https://git-scm.com/docs/git-add/pt_BR). There are presently 9 languages of which 2 have several complete translated manpages. The upcoming tasks are to direct prioritary translators to most viewed content and generate packages for distribution along git itself.

__Light reading__

* [A Deep Dive into Git Performance using Trace2](https://devblogs.microsoft.com/devops/a-deep-dive-into-git-performance-using-trace2/)
  by Jeff Hostetler explains everything about the Trace2 logging framework which was released in Git 2.22.0.

__Git tools and sites__

* [Game of Trees (Got)](https://gameoftrees.org/index.html) is a
  version control system developed by and for OpenBSD developers which
  prioritizes ease of use and simplicity over flexibility. Got wants
  to remain on-disk compatible with bare Git repositories.

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Gabriel Alcaras &lt;<gabriel.alcaras@telecom-paristech.fr>&gt;
with help from Jean-Noël Avila.
