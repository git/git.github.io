---
title: Git Rev News Edition 51 (May 22nd, 2019)
layout: default
date: 2019-05-22 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 51 (May 22nd, 2019)

Welcome to the 51st edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of April 2019.

## Discussions


### General

* [GSoC students and mentors 2019](https://public-inbox.org/git/20190508171941.GC2068@hank.intra.tgummerer.com/)

  Two students are going to work on Git during this summer as part of the
  [GSoC (Google Summer of Code)](https://summerofcode.withgoogle.com/):

  - [Matheus Tavares](https://summerofcode.withgoogle.com/projects/#6477677521797120) is going to work on
    [making pack access code thread safe](https://public-inbox.org/git/CAHd-oW7KMrDJ-cyzk63oqW9-QVpag6fKnDp+Mo5bWxg1KfzY3g@mail.gmail.com/).
    He will be mentored by Olga Telezhnaia, a former [Outreachy](https://www.outreachy.org/) intern, and Christian Couder.
    Matheus has prepared [a blog](https://matheustavares.gitlab.io/gsoc) to report about his experience.

  - [Rohit Ashiwal](https://summerofcode.withgoogle.com/projects/#6407042053439488) will work on
    [improving consistency of sequencer commands](https://public-inbox.org/git/20190322151157.9550-1-rohit.ashiwal265@gmail.com/).
    He will be mentored by Thomas Gummerer, a former GSoC student, and Elijah Newren.
    Rohit has also planning prepared [a blog](https://rashiwal.me) to report about his experience.

  It will be the 12th time that the Git project will mentor students
  as part of the GSoC. Rohit and Matheus will be the 28th and 29th
  students mentored since 2007 when Git started participating in the
  GSoC.

  It will be the 15th year of GSoC and to celebrate that Google
  decided to have the [GSoC Mentor Summit 2019](https://sites.google.com/view/gsoc-mentorsummit2019/home)
  in an hotel in Munich, Germany instead of a Google campus in
  California. The Mentor Summit will last 3.5 days (Thursday, October
  17 - Sunday, October 20) instead of the usual 2.5 days. The
  additional day, Friday, October 18, will be "Fun Day Activities for
  attendees to explore Munich and get to know each other before the
  unconference begins".

### Reviews

* [[RFC PATCH] *.h: remove extern from function declarations](https://public-inbox.org/git/3e3b9d6c8e54b326809b95adabd3be39d2d0770f.1555111963.git.liu.denton@gmail.com/)

  Denton Liu sent a big RFC patch that removes "extern" keywords in
  front of function declarations and that affects in big number of
  '.h' header files.

  He said that he used the following command to remove the keywords:

  ```
  $ git ls-files '*.h' | xargs sed -i'' -e 's/^\(\s*\)extern \(.*(\)/\1\2/'
  ```

  And the following one to check the result:

  ```
  $ git grep -w extern '*.h'
  ```

  Jeff King, alias Peff, replied that dropping "extern" should not be
  done on function pointer declarations though, as a function pointer
  is a variable, so its visibility would change if "extern" is removed
  in front of it.

  Junio agreed with Peff and explained that the reason we avoid
  wholesale updates "is because of an unnecessary bug like this one,
  not the one-time conflict resolution load that can be subcontracted
  out to "rerere" once dealt with ;-)".

  Junio also suggested using "a tool more suited for the job
  (e.g. spatch)" as it "raises the confidence level of the end result
  a lot more than a "sed and then eyeball" rewrite", though we then
  have to be careful about possible "bugs in the instructions we give
  to the tool".

  Denton then sent a [second version](https://public-inbox.org/git/cover.1555352526.git.liu.denton@gmail.com/)
  of his work. It was now a 3 patch long patch series.

  The first patch used the `spatch` tool to do most of the "extern"
  keyword removals. The second patch still used `sed` to do it where
  `spatch` didn't work, but it made sure to ignore function
  variables. The third patch used a Coccinelle script to make sure
  that no more "extern" keywords are added to the code base.

  Thomas Gummerer replied to the first patch that it "leaves a bunch
  of oddly indented parameter lists behind", as when a function has a
  larger number of parameters, its declaration often span more than
  one line.

  Denton then send a [third version](https://public-inbox.org/git/cover.1555487380.git.liu.denton@gmail.com/)
  of his work, with an additional patch to "manually align parameter
  lists that were mangled by the tools".

  Peff replied wondering if it was a good thing to modify files in the
  compat/ directory as the code there is often "copied from
  elsewhere". He also wondered if it was worth keeping the Coccinelle
  script as it is expensive to run.

  In the [fourth version](https://public-inbox.org/git/cover.1556062365.git.liu.denton@gmail.com/)
  of his work, Denton decided to keep the Coccinelle script, but
  excluded the compat/ directory from the files where "extern" is
  removed.

  Junio noticed that in a commit message Denton mentioned using:

  ```
  $ git ls-files \*.{c,h} | \
      grep -v ^compat/ | \
      xargs sed -i'' -e 's/^\(\s*\)extern \([^(]*([^*]\)/\1\2/'
  ```

  and then asked him to remove the useless backslashes at the end of
  the first 2 lines above, saying:

  > Your shell knows its own syntax sufficiently well, and when you end
  > a line with a pipe, it knows that you haven't finished speaking to
  > it and waits for you to give the command downstream of the pipe,
  > without being told that you haven't finished with a backslash.

  Unfortunately SZEDER Gábor then found that the Coccinelle script
  failed on 'compat/obstack.h' as it is included in a '.c' file
  checked by Coccinelle scripts.

  Denton replied by proposing to drop the patch that contained his
  Coccinelle script, but Johannes Schindelin, alias Dscho, suggested
  to exclude certain directories or certain files for certain
  Coccinelle scripts.

  There was then a long discussion thread involving Peff, Denton,
  Jacob Keller, Dscho, Junio and Gábor about what was possible to do
  with Coccinelle and spatch and how they are used in the Git
  toolchain. This thread eventually resulted in Peff making a small
  series of
  [patches](https://public-inbox.org/git/20190506234334.GA13296@sigill.intra.peff.net/),
  based on a previous patch by Jacob, that makes it possible to run
  Coccinelle faster on machines with a lot of memory. Peff's patches
  have since been merged into the 'master' branch.

  Denton in the meantime sent a [fifth version](https://public-inbox.org/git/cover.1556526308.git.liu.denton@gmail.com/)
  of his work that drops the patch that contained his Coccinelle
  script, and loses the useless backslashes. This patch series has
  also been merged into the 'master' branch and will be part of Git
  v2.22.0 that should be released at the beginning of June 2019.

<!---
### Support
-->

<!---
## Developer Spotlight:
-->

## Releases

+ Git [2.22.0-rc1](https://public-inbox.org/git/xmqq36la24t1.fsf@gitster-ct.c.googlers.com/),
[2.22.0-rc0](https://public-inbox.org/git/xmqqef52baih.fsf@gitster-ct.c.googlers.com/)
+ Git for Windows [2.22.0-rc1](https://public-inbox.org/git/nycvar.QRO.7.76.6.1905192229360.46@tvgsbejvaqbjf.bet/),
[2.22.0-rc0](https://public-inbox.org/git/nycvar.QRO.7.76.6.1905141056550.44@tvgsbejvaqbjf.bet/)
+ Gerrit Code Review [3.0.0](https://www.gerritcodereview.com/3.0.html)
+ GitHub Enterprise [2.16.8](https://enterprise.github.com/releases/2.16.8/notes),
[2.15.13](https://enterprise.github.com/releases/2.15.13/notes),
[2.14.20](https://enterprise.github.com/releases/2.14.20/notes),
[2.16.7](https://enterprise.github.com/releases/2.16.7/notes),
[2.15.12](https://enterprise.github.com/releases/2.15.12/notes),
[2.14.19](https://enterprise.github.com/releases/2.14.19/notes)
+ GitLab [11.10.4](https://about.gitlab.com/2019/05/01/gitlab-11-10-4-released/),
[11.10.3, 11.9.11, and 11.8.10](https://about.gitlab.com/2019/04/30/security-release-gitlab-11-dot-10-dot-3-released/),
[11.10.2](https://about.gitlab.com/2019/04/29/security-release-gitlab-11-dot-10-dot-2-released/),
[11.10.1](https://about.gitlab.com/2019/04/24/gitlab-11-10-1-released/)
+ Bitbucket Server [6.3](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ GitHub Desktop [1.6.6](https://desktop.github.com/release-notes/)
+ git-cinnabar [0.5.1](https://public-inbox.org/git/20190508221316.otsflud4qlcpwaeb@glandium.org)


## Other News

__Various__

* [Git and the new SHA-1 prefix collision attack](https://public-inbox.org/git/875zqbx5yz.fsf@evledraar.gmail.com/)
  is an email by Ævar Arnfjörð Bjarmason that has information and
  links about a newly published paper about new attacks building on the
  known "SHAttered" attack.

* On April 1st, Ævar sent a two patches long [patch series](https://public-inbox.org/git/20190401101246.21418-1-avarab@gmail.com/)
  to the mailing list. These April fool's day patches were "praise: a
  culturally sensitive wrapper for 'blame'" and "praise: make
  'blameless' cultural enforcement configurable".

* Dave Borowitz, one of the top contributors of Gerrit Code Review,
  [leaves the project](https://groups.google.com/forum/#!topic/repo-discuss/ySP84Q0DHsw) after
  9k reviews, 3.4k commits and 8 years of contributions.

__Light reading__

* [Exploring new frontiers for Git push performance](https://devblogs.microsoft.com/devops/exploring-new-frontiers-for-git-push-performance/)
  includes a description of the new "sparse" push algorithm, enabled
  by the `pack.useSparse` config option.


* [The Developer Homepage of Derrick Stolee](https://stolee.dev/)
  contains a number of interesting articles, presentations and links
  especially about features he developed like the commit-graph.
  
* [The history behind 6 years of development of Gerrit v3.0](https://gitenterprise.me/2019/05/20/gerrit-v3-0-is-here/)
  goes back in time and describes the long path from the original
  green-ish GWT UI until the latest shiny blue Polymer-based user
  experience.

__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Gabriel Alcaras &lt;<gabriel.alcaras@telecom-paristech.fr>&gt;
with help from David Pursehouse.
