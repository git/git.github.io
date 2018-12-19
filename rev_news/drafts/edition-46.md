---
title: Git Rev News Edition 46 (December 19th, 2018)
layout: default
date: 2018-12-19 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 46 (December 19th, 2018)

Welcome to the 46th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](https://git.github.io).

This edition covers what happened during the month of November 2018.

## Discussions

<!---
### General
-->

### Reviews

* [[RFC] Introduce two new commands, switch-branch and restore-paths](https://public-inbox.org/git/20181120174554.GA29910@duynguyen.home/)

  Duy Nguyen sent an RFC patch to the mailing list that implemented 2
  new Git commands:

  - `git switch-branch` which "is all about switching branches"
  - `git restore-paths` "for checking out paths"

  The goal is to split `git checkout` into different commands while
  not deprecating it, so that "Old timers will still use
  `git checkout`. But new people should be introduced to the new two
  instead."

  The idea to do that appeared [following a previous patch to print something when checking out paths](https://public-inbox.org/git/20181110133525.17538-1-pclouds@gmail.com/),
  though it has been considered for a long time that `git checkout`
  should not do as many different things as it currently does.

  Thomas Gummerer replied that he liked the idea and had been
  considering working on it. He suggested taking at look at maybe
  changing the behavior of the new command a bit.

  Junio Hamano, the Git maintainer, then started to discuss the naming
  of `git restore-paths` with Duy.

  Ævar Arnfjörð Bjarmason replied to Duy's original message asking
  questions about arguments accepted by `git switch-branch` and
  suggesting a comparison between the new commands and `git checkout`
  or even other source code management tools. He also discussed with
  Duy about eventually deprecating `git checkout`.

  Stefan Beller replied to Ævar and started discussing the names and
  syntax of the command. Junio replied to Stefan telling that he
  thought the names Duy suggested make sense, though `checkout`
  already makes sense and longhands starting with `checkout`, like
  `checkout-branch`, would make sense too.

  Duy then sent a [version 2](https://public-inbox.org/git/20181127165211.24763-1-pclouds@gmail.com/)
  of his initial patch that "breaks down the giant patch in v1 and
  starts adding some changes in these new commands". Especially the
  names were changed to `checkout-branch` and `checkout-files`.

  A first discussion thread started with Junio, Duy, Stefan Beller and
  Stefan Xenos about the name and syntax of the new commands. As no
  clear conclusion appeared though, Duy decided to go back towards the
  original names he had proposed.

  Another discussion thread among the same developers was about using
  "unnamed branch" instead of "detached HEAD".

  These discussions were followed by a [version 3](https://public-inbox.org/git/20181129215850.7278-1-pclouds@gmail.com/)
  where the names of the commands were changed back to `switch-branch`
  and `restore-files` instead of `restore-paths`.

  There were further discussions involving Elijah Newren, Junio, Duy,
  Ævar, Dan Fabulich, Thomas and Eric Sunshine, about a lot of related
  subjects, though Duy decided to wait until the release of Git 2.20
  before sending an updated patch series.

<!---
### Support
-->

<!---
## Developer Spotlight:
-->

## Releases

+ Git [2.20.1](https://public-inbox.org/git/xmqqsgyzbcyy.fsf@gitster-ct.c.googlers.com/),
[2.20.0](https://public-inbox.org/git/xmqq1s6r3xb5.fsf@gitster-ct.c.googlers.com/),
[2.20.0-rc2](https://public-inbox.org/git/xmqq36rhjnts.fsf@gitster-ct.c.googlers.com/),
[2.20.0-rc1](https://public-inbox.org/git/xmqqmuq25ufc.fsf@gitster-ct.c.googlers.com/),
[2.19.2](https://public-inbox.org/git/xmqqtvka5ugt.fsf@gitster-ct.c.googlers.com/)
+ Git for Windows [2.20.1](https://github.com/git-for-windows/git/releases/tag/v2.20.1.windows.1),
[2.20.0](https://github.com/git-for-windows/git/releases/tag/v2.20.0.windows.1),
[2.20.0-rc2](https://github.com/git-for-windows/git/releases/tag/v2.20.0-rc2.windows.1),
[2.20.0-rc1](https://github.com/git-for-windows/git/releases/tag/v2.20.0-rc1.windows.1),
[2.20.0-rc0](https://github.com/git-for-windows/git/releases/tag/v2.20.0-rc0.windows.1)
+ libgit2sharp [0.25.4](https://github.com/libgit2/libgit2sharp/releases/tag/v0.25.4)
+ GitLab [11.6RC7, 11.5.4, 11.4.11 and 11.3.13](https://about.gitlab.com/2018/12/13/critical-security-release-gitlab-11-dot-5-dot-4-released/),
[11.5.3](https://about.gitlab.com/2018/12/06/critical-security-release-gitlab-11-dot-5-dot-3-released/),
[11.4.9](https://about.gitlab.com/2018/12/04/gitlab-11-4-9-released/),
[11.5.2](https://about.gitlab.com/2018/12/04/gitlab-11-5-2-released/),
[11.5.1](https://about.gitlab.com/2018/11/28/security-release-gitlab-11-dot-5-dot-1-released/),
[11.5](https://about.gitlab.com/2018/11/22/gitlab-11-5-released/),
[11.4.7](https://about.gitlab.com/2018/11/21/gitlab-11-4-7-released/),
[11.5.0-rc12, 11.4.6 and 11.3.10](https://about.gitlab.com/2018/11/19/critical-security-release-gitlab-11-dot-4-dot-6-released/)
+ Bitbucket Server [5.16](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ Gerrit Code Review [2.16.1](https://www.gerritcodereview.com/2.16.html#2161)
+ GitHub Enterprise [2.15.4](https://enterprise.github.com/releases/2.15.4/notes),
[2.14.11](https://enterprise.github.com/releases/2.14.11/notes),
[2.13.17](https://enterprise.github.com/releases/2.13.17/notes),
[2.12.25](https://enterprise.github.com/releases/2.12.25/notes),
[2.15.3](https://enterprise.github.com/releases/2.15.3/notes),
[2.14.10](https://enterprise.github.com/releases/2.14.10/notes),
[2.13.16](https://enterprise.github.com/releases/2.13.16/notes),
[2.12.24](https://enterprise.github.com/releases/2.12.24/notes)

## Other News

__Various__

* [Git Contributor Summit Registration, Jan 31, 2019, Brussels](https://public-inbox.org/git/20181206094805.GA1398@sigill.intra.peff.net)
* [Git Merge 2019](https://git-merge.com/) (Jan 31 -- Feb 01) schedule announced, including:
  * A “Git and version control in the enterprise” panel with GitHub, Atlassian, and GitLab
  * A chat with Deb Nicholson from the Software Freedom Conservancy on the future of software
  * Sessions by Google, Microsoft, and Praqma on scaling Git
  * Lighting talks on everything from version control for law to Git for games
* [“The 's' is sad”: 4-year-old submits Linux kernel doc patch](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=690b0543a813b0ecfc51b0374c0ce6c8275435f0) with some assistance (via Hacker Newsletter #429)


__Light reading__

* Ed Thomson's [Git Advent Calendar](https://www.edwardthomson.com/blog/git_tips_and_tricks_advent_calendar.html).
* Samuel Walladge explains [how to use Git with (Neo)Vim](https://vimways.org/2018/vim-and-git/) on Day 6 of the Vimways Advent Calendar.
* Neil Kakkar's [How not to be afraid of Git anymore](https://medium.freecodecamp.org/how-not-to-be-afraid-of-git-anymore-fe1da7415286).
* Will Hay Jr.'s [The Architecture and History of Git: A Distributed Version Control System](https://medium.com/@willhayjr/the-architecture-and-history-of-git-a-distributed-version-control-system-62b17dd37742). See also:
  * [The Git Parable](http://tom.preston-werner.com/2009/05/19/the-git-parable.html), by Tom Preston-Werner (2009) - the ideas behind the architecture of Git; covered in [Git Rev News #30](https://git.github.io/rev_news/2017/08/16/edition-30/)
  * slides from ["Git Chronicles"](https://docs.google.com/file/d/0Bw3FApcOlPDhMFR3UldGSHFGcjQ/view) talk at GitTogether 2008 - early history
* Susan Potter's [Git entry](http://www.aosabook.org/en/git.html) in ["The Architecture of Open Source Applications" book](http://www.aosabook.org/en/index.html), Volume II (2012); there is [chapter on Mercurial](http://www.aosabook.org/en/mercurial.html) in Volume I (2012).
* David Gohberg's [The Biggest Misconception About Git](https://medium.com/@gohberg/the-biggest-misconception-about-git-b2f87d97ed52), that Git is all about storing differences between files.
* Aditya Sridhar's [How to become a Git expert](https://medium.freecodecamp.org/how-to-become-a-git-expert-e7c38bf54826), about amending commits and rebasing
* [Large files with Git: LFS and git-annex](https://lwn.net/Articles/774125) article on LWN.net, contributed by Antoine Beaupré
* [How I changed the law with a GitHub pull request](https://arstechnica.com/tech-policy/2018/11/how-i-changed-the-law-with-a-github-pull-request/) article on Ars Technica, contributed by Joshua Tauberer
* Caitlin Hudon's [Git Your SQL Together (with a Query Library)](https://caitlinhudon.com/2018/11/28/git-sql-together/) recommends tracking SQL queries in Git
* Eric S. Raymond's [SRC, four years later](http://esr.ibiblio.org/?p=8205), about his single-file version control system with modern UI
* Johnathan Swan's [Gradually improving our code quality with Test::Perl::Critic::Progressive](https://medium.com/adzuna-engineering/gradually-improving-our-code-quality-with-test-perl-critic-progressive-a8f98319ac56) together with Git to catch and report _new_ code style policy violations
* Peter Hutterer's [On commit messages](http://who-t.blogspot.com/2009/12/on-commit-messages.html) (2009)

__Git tools and sites__

* [sr.ht](https://sr.ht/) ([https://sr.ht](https://sr.ht/)) is a very
  capable software forge which is already serving the needs of many
  projects in the free & open source software community site.  It is
  100% open source software and includes goodies such as a wiki,
  mailing lists, ticketing, with neat features such as all the pages
  work without Javascript, and it is designed to support an email Git
  workflow. Provided hosting is available for a low cost and
  contributing to the software can get one credit towards hosting.
  It was announced in a
  [sr.ht, the hacker's forge, now open for public alpha](https://drewdevault.com/2018/11/15/sr.ht-general-availability.html)
  blog post.

* [Adobe's `git-server`](https://github.com/adobe/git-server), a [nodegit](https://github.com/nodegit/nodegit)-based application to serve Git repositories via `http://` and `https://`.

* [Git Butler](https://www.gitbutler.com/): Pull Request and Issue Workflow Automation -- an alternative to [GitHub Actions](https://github.com/features/actions) (covered in [Git Rev News #44](https://git.github.io/rev_news/2018/10/24/edition-44/)), allowing to automate Git workflow by creating powerful rules with a simple visual editor

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Gabriel Alcaras &lt;<gabriel.alcaras@telecom-paristech.fr>&gt;
with help from Johannes Schindelin, Kaartic Sivaraam
and Matt Singletary.
