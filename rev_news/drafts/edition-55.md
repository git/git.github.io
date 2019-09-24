---
title: Git Rev News Edition 55 (September 25th, 2019)
layout: default
date: 2019-09-25 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 55 (September 25th, 2019)

Welcome to the 55th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of August 2019.

## Discussions

### General

* Google Summer of Code 2019 is over.

  Both students, Rohit Ashiwal and Matheus Tavares, passed their final evaluation
  and posted a final report on their blog. See:

  * [Rohit's report about improving the consistency of sequencer commands](https://rashiwal.me/2019/final-report/)

  * [Matheus' report about making pack access code thread-safe](https://matheustavares.gitlab.io/posts/gsoc-final-report)

* [Virtual Git Contributor Summit](https://public-inbox.org/git/nycvar.QRO.7.76.6.1907031429420.44@tvgsbejvaqbjf.bet/)

  Johannes Schindelin, alias Dscho, organized the first Virtual Git
  Contributor Summit which happened on Thursday September 12 and
  Friday September 13 over a Zoom call.

  [Notes](https://docs.google.com/document/d/1Yp6tz_JgUYjoofTDogtosLsdykwiAyYu9yM42yTuFA4/edit)
  have been taken and are used to organize follow up actions.

* [RFC - Git Developer Blog](https://public-inbox.org/git/20190806014935.GA26909@google.com/)

  Emily Shaffer asked on the mailing list if people would be
  interested in creating a "Git-project-blessed blog written by Git
  contributors". The goal was "to make Git better understood in the
  rest of the world", in a not very formal setting.

  A number of people replied to Emily saying that they thought it was
  a good idea, and sometimes agreeing to submit articles for the new
  blog or to review other people's submissions.

  Jeff King, who manages the git-scm.com web site, suggested hosting it
  at the same place, using blog.git-scm.com, which Emily accepted.

  Following the Virtual Git Contributor Summit
  [a repository](https://gitlab.com/git-scm/blog/)
  has been created for the blog by James Ramsay.

<!---
### Reviews
-->

### Support

* [diff.renames not working?](https://public-inbox.org/git/CAHd499BT35jvPtsuD9gfJB0HJ=NxtzyQOaiD7-=sHJbFYhphpg@mail.gmail.com/)

  Robert Dailey wondered if the `diff.renames` config option worked
  correctly when it's set to `copies`, as `git diff --name-status` and
  `git diff --follow` (which is not documented) showed that one file
  was copied from another when they were passed a path to a file as
  argument, but `git diff` and `git diff -M` didn't.

  Jeff King, alias Peff, replied to Robert explaining how rename
  detection works and what are the current limitations. He also
  suggested some possible improvements.

  Bryan Turner and Peff also noticed that `-M` detects renames, not
  copies.

  Junio agreed with Peff and gave extra historical information and
  also discussed possible improvements.

<!---
## Developer Spotlight:
-->

## Releases

+ Gerrit Code Review [2.16.12](https://www.gerritcodereview.com/2.16.html#21612),
[2.15.17](https://www.gerritcodereview.com/2.15.html#21517),
[3.0.2](https://www.gerritcodereview.com/3.0.html#302)
+ GitHub Enterprise [2.18.2](https://enterprise.github.com/releases/2.18.2/notes),
[2.17.8](https://enterprise.github.com/releases/2.17.8/notes),
[2.16.17](https://enterprise.github.com/releases/2.16.17/notes),
[2.15.22](https://enterprise.github.com/releases/2.15.22/notes),
[2.18.1](https://enterprise.github.com/releases/2.18.1/notes),
[2.17.7](https://enterprise.github.com/releases/2.17.7/notes),
[2.16.16](https://enterprise.github.com/releases/2.16.16/notes),
[2.15.21](https://enterprise.github.com/releases/2.15.21/notes)
+ GitLab [12.3](https://about.gitlab.com/2019/09/22/gitlab-12-3-released/),
[12.1.11](https://about.gitlab.com/2019/09/19/gitlab-12-1-11-released/),
[12.2.5, 12.1.9, and 12.0.9](https://about.gitlab.com/2019/09/10/critical-security-release-gitlab-12-dot-2-dot-5-released/),
[12.2.4](https://about.gitlab.com/2019/09/02/gitlab-12-2-4-released/),
[12.2.3](https://about.gitlab.com/2019/08/29/security-release-gitlab-12-dot-2-dot-3-released/),
[12.2.1](https://about.gitlab.com/2019/08/23/gitlab-12-2-1-released/)
+ Bitbucket Server [6.6](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ GitKraken [6.2.0](https://support.gitkraken.com/release-notes/current),
[6.1.4](https://support.gitkraken.com/release-notes/current),
[6.1.3](https://support.gitkraken.com/release-notes/current),
[6.1.2](https://support.gitkraken.com/release-notes/current),
[6.1.1](https://support.gitkraken.com/release-notes/current),
[6.1.0](https://support.gitkraken.com/release-notes/current),
[6.0.1](https://support.gitkraken.com/release-notes/current),
[6.0.0](https://support.gitkraken.com/release-notes/current)
+ GitHub Desktop [2.1.3](https://desktop.github.com/release-notes/)

## Other News

__Various__


__Light reading__
<br>

__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Gabriel Alcaras &lt;<gabriel.alcaras@telecom-paristech.fr>&gt;
with help from XXX.
