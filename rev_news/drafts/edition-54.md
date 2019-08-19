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


## Developer Spotlight: Jean-Noël Avila

* Who are you and what do you do?

  My name is Jean-Noël Avila, father of three daughters and husband of
  an incredibly comprehensive wife. I graduated a long time ago from a
  french engineering school, with a speciality in signal processing,
  not really in computer science .

  Professionally, I work in the R&D team of a
  [small company](https://www.scantech.com) that makes industrial
  online measurement systems, and guess what, we're using Git as an
  ubiquitous revision control system (software, documentation); my
  colleagues know who they should call for any issue. Sadly though, I
  don't work on Git.

* What would you name your most important contribution to Git?

  For the Git project itself, my most important and only contribution
  has been to deliver the french localization of the software
  since... 2013 (gasp!) and occasionally propose some patches to fix
  internationalization issues.

  At the beginning, I proposed some patches to fix glob-pattern
  matching in the `.gitignore` file, but even if it fixed the issue,
  it turned out later that the patch had introduced a performance
  regression. So I chose to stick to a less harmful activity in the
  community (although bad translation can be quite harmful).

  In the Git ecosystem more generally, I've been working on
  translating the Progit book to French and managing with Peff and
  Pedro (@pedrorijo91) the publishing of the translations of the book
  on http://git-scm.com. So, to sum it up, not working on the core,
  but on the public interfaces of the project.

* What are you doing on the Git project these days, and why?

  Following the path of localization, what is a localized application
  worth if the documentation is still an impediment? In this idea, at
  the beginning of this year, I've started an effort to translate the
  manual pages in French and to propose the translation framework put
  in place for this purpose to other languages.

  So far, only two languages have translated content, but I expect to
  have some more soon. The pages are already available at
  http://git-scm.com/docs/ . What is still missing is the packaging
  for other distributions of Git. Maybe when we have more content to
  provide.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  Functionally, we've been bitten by some wrong merges of concurrent
  branches, and I wish Git could have some knowledge in patch algebra
  to better handle these corner cases. I know that it would be quite
  orthogonal to the present design, but even just detecting and
  showing warnings that something nasty is happening would prevent
  surprises (to say the least) of the users in complex histories.

  From a translator's stand point, a project that would not require a
  big expertise while still being useful would be to introduce rules
  and factorize internationalization. This part of Git is still the
  wild west by some aspects with a lot of freedom left to developers
  to choose their own formatting. A sizeable part of these strings are
  almost identical: with or without an ending period, with quoted or
  unquoted `%s`, with uppercase or not. Some strings are very similar:
  "foo and bar are mutually exclusive", and so on. In the end, the
  number of segments to translate in Git amounts to 4674 for v2.23.0,
  which basically bars the entry to new translations.

  As an aside, providing a `po` file for core strings and another one
  for less used strings would also help kickstart translations by
  focusing on more productive work for translators of new languages. I
  understand this kind of task would be Sisyphos' work, but that would
  really help the community grow by giving access to Git to users less
  educated in computer science.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  Translating Git and the manpages gives a good overview of what's
  available and what is being introduced. So far, I haven't
  experienced anything strinkingly bad about a particular feature. At
  the limit, I would make rebasing require a more advanced knowledge
  of Git's internals by not providing such an easy way to shoot in
  one's foot.

* What is your favorite Git-related tool/library, outside of Git itself?

  In fact, in my daily work with Git, I don't use the command line
  that much. I'm an emacs fan, and Magit is really a miraculous tool
  when it comes to interacting with a Git repository from my favorite
  editor.

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
