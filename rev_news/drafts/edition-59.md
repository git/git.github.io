---
title: Git Rev News Edition 59 (January 22nd, 2020)
layout: default
date: 2020-01-22 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 59 (January 22nd, 2020)

Welcome to the 59th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of December 2019.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

### Support

* [Push a ref to a remote with many refs](https://public-inbox.org/git/CH2PR11MB429411CA1288526D21C7AF26CF4C0@CH2PR11MB4294.namprd11.prod.outlook.com/)

  Patrick Marlier sent an email about performance issues when pushing
  from a local repository with a few refs to a remote repository with
  a lot more refs (1000+) and Git objects.

  The local Git client receives the entire list of refs on the remote,
  and then checks in its repository if the objects exist for all the
  remote refs, but in Patrick's case most of the objects are unknown.

  As the local repository is using many alternates, Git will try to
  find each unknown object in all the alternates which amplifies the
  problem. To work around this Patrick showed a patch that skips the
  refs that are not part of the push when looking for objects.

  Jeff King, alias Peff, replied to Patrick that the behavior is
  expected and that not looking at the refs that are not part of the
  push could miss objects that are already in the remote repo, and
  therefore result in pushing more objects than needed.

  Peff proposed an alternative patch that uses an OBJECT_INFO_QUICK
  flag when checking if objects exist. That flag makes the check
  faster but less thorough, which is ok in this case.

  Patrick then thanked Peff for the patch saying that he would try it,
  and later replied with some numbers showing a median time decreasing
  from 7 minutes and 38 seconds to 5 minutes and 40 seconds. Peff
  replied to those numbers suggesting applying the patch to Git 2.21
  or higher, instead of Git 2.19, as a memory cache was introduced in
  2.21 that would further speed up the checks.

  In general it's a good idea to always use the most recent Git version
  for maximum performance as improvements are regularly merged in
  each new version.

  Meanwhile Junio Hamano, the Git maintainer wondered if improvements
  could be made in the different flags that can be used when checking
  objects. Peff replied that these flags have been coming up in
  discussions "about once a month lately" and pointed to
  [a previous analysis made by Jonathan Tan](https://public-inbox.org/git/20191011220822.154063-1-jonathantanmy@google.com/).
  He also suggested some small changes in the flags according to the analysis.

  Jonathan Tan then chimed in to give his opinion about the flag issue
  and mostly agreed with Peff's suggestion. Junio then also agreed
  with Peff's and Jonathan's suggestion.

  Jonathan Nieder reviewed Peff's patch asking a few questions to make
  sure he understood it properly. Peff then answered those questions
  explaining a few more details.

  Peff's patch eventually got merged into the master branch and is
  included in the recent Git 2.25 release.

<!---
## Developer Spotlight:
-->

## Releases

+ Git [2.25.0](https://public-inbox.org/git/xmqqtv4zjgv5.fsf@gitster-ct.c.googlers.com/),
[2.25.0-rc2](https://public-inbox.org/git/xmqq8smh1t3m.fsf@gitster-ct.c.googlers.com/),
[2.25.0-rc1](https://public-inbox.org/git/xmqqpng1cu2c.fsf@gitster-ct.c.googlers.com/),
[2.25.0-rc0](https://public-inbox.org/git/xmqqblrwm65l.fsf@gitster-ct.c.googlers.com/)
+ Git for Windows [2.25.0(1)](https://github.com/git-for-windows/git/releases/tag/v2.25.0.windows.1)
+ GitHub Enterprise [2.19.5](https://enterprise.github.com/releases/2.19.5/notes),
[2.18.10](https://enterprise.github.com/releases/2.18.10/notes),
[2.17.16](https://enterprise.github.com/releases/2.17.16/notes),
[2.16.25](https://enterprise.github.com/releases/2.16.25/notes)
+ GitLab [12.6.4, 12.5.7, and 12.4.8](https://about.gitlab.com/releases/2020/01/13/critical-security-release-gitlab-12-dot-6-dot-4-released/),
[12.6.3](https://about.gitlab.com/releases/2020/01/09/gitlab-12-6-3-released/),
[12.6.2, 12.5.6, and 12.4.7](https://about.gitlab.com/releases/2020/01/02/security-release-gitlab-12-6-2-released/),
[12.6.1](https://about.gitlab.com/releases/2019/12/27/gitlab-12-6-1-released/)
+ Bitbucket Server [6.10](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)

## Other News

__Various__

* Registration for the Git Contributor Summit, on March 5, 2020, at
  Los Angeles is now [opened](https://public-inbox.org/git/20200115200532.GA4101552@coredump.intra.peff.net/).

__Light reading__


__Git tools and sites__

* git-filter-repo v2.25.0 has been [announced](https://public-inbox.org/git/CABPp-BFP38okGPTmyUJ-vVqq4=T0CypuyD05e6ArEfwhq2mdpg@mail.gmail.com/)
  on the mailing list.

* git-cinnabar 0.5.3 has also been [announced](https://public-inbox.org/git/20200118024728.4dugot7nmj3tdkhx@glandium.org/)
  on the mailing list.

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
