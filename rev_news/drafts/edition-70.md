---
title: Git Rev News Edition 70 (December 23rd, 2020)
layout: default
date: 2020-12-23 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 70 (December 23rd, 2020)

Welcome to the 70th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of November 2020.

## Discussions


### General

* Three [Outreachy interns](https://www.outreachy.org/alums/) have
  been accepted to work on Git this winter:

  * Sangeeta from India will be mentored by Kaartic Sivaraam and
    Christian Couder to work on the '*Accelerate rename detection and
    the "range-diff" command in Git*' project. Sangeeta started
    [blogging about her internship](https://sangu09.github.io/).

  * Joey Salazar from Costa Rica will be mentored by Emily Shaffer and
    Jonathan Nieder to work on the '*Add Git protocol support to
    Wireshark*' project. Joey also started
    [blogging](https://jsal.home.blog/blog/).

  * Charvi Mendiratta from Faridabad, Haryana, India will be mentored
    by Phillip Wood and Christian Couder to work on on the '*Improve
    droping and rewording commits in Git interactive rebase*'
    project. Charvi also started
    [blogging](https://charvi-077.github.io/).

<!---
### Reviews
-->

<!---
### Support
-->

<!---
## Developer Spotlight:
-->

## Releases

+ Git [2.30.0-rc1](https://public-inbox.org/git/xmqqsg82qur4.fsf@gitster.c.googlers.com/),
[2.30.0-rc0](https://public-inbox.org/git/xmqq7dpkdup6.fsf@gitster.c.googlers.com/)
+ Git for Windows [2.29.2(3)](https://github.com/git-for-windows/git/releases/tag/v2.29.2.windows.3)
+ Gerrit Code Review [3.3.0](https://www.gerritcodereview.com/3.3.html)
+ GitHub Enterprise [2.22.6](https://enterprise.github.com/releases/2.22.6/notes),
[2.21.14](https://enterprise.github.com/releases/2.21.14/notes),
[2.20.23](https://enterprise.github.com/releases/2.20.23/notes),
[2.22.5](https://enterprise.github.com/releases/2.22.5/notes),
[2.21.13](https://enterprise.github.com/releases/2.21.13/notes),
[2.20.22](https://enterprise.github.com/releases/2.20.22/notes)
+ GitLab [13.6.3](https://about.gitlab.com/releases/2020/12/10/gitlab-13-6-3-released/)
[13.6.2](https://about.gitlab.com/releases/2020/12/07/security-release-gitlab-13-6-2-released/)
+ GitKraken [7.4.1](https://support.gitkraken.com/release-notes/current)
+ GitHub Desktop [2.6.1](https://desktop.github.com/release-notes/)

## Other News

__Various__


__Light reading__

- [Use the Git History to Identify Pain Points in Any Project](https://preslav.me/2020/03/01/use-the-git-history/)
  "basic idea - files that change often (with some exceptions) tend to be the ones where most issues occur" - let's go find them with this useful command. Includes useful follow on reading about your code crimes..
- [Commits are snapshots, not diffs](https://github.blog/2020-12-17-commits-are-snapshots-not-diffs/)
  by Derrick Stolee on GitHub Blog
- [Get up to speed with partial clone and shallow clone](https://github.blog/2020-12-21-get-up-to-speed-with-partial-clone-and-shallow-clone/)
  by Derrick Stolee on GitHub Blog
- [Optimize your monorepo experience - GitHub Universe 2020](https://www.youtube.com/watch?v=RcqLV1lU408):
  video of presentation by Derrick Stolee, Staff Software Engineer, GitHub
- [The Philosophy of Scalar](https://github.com/microsoft/scalar/blob/main/docs/philosophy.md),
  a part of [Scalar](https://github.com/microsoft/scalar/) docs; the tool itself,
  intended to provide  settings and extensions for Git to help manage large Git repositories,
  was introduced in [Git Rev News #60](https://git.github.io/rev_news/2020/02/19/edition-60/)
  and further mentioned in [Git Rev News #61](https://git.github.io/rev_news/2020/03/25/edition-61/).
- [How to Make Your Code Reviewer Fall in Love with You](https://mtlynch.io/code-review-love/)
  by Michael Lynch; a good counterpart to [The Gentle Art Of Patch Review](https://sage.thesharps.us/2014/09/01/the-gentle-art-of-patch-review/)
  by Sage Sharp from 2014.
- [8 Git aliases that make me more efficient](https://opensource.com/article/20/11/git-aliases)
  by Ricardo Gerardi on OpenSource.com.  Use aliases to create shortcuts
  for your most-used or complex Git commands.
- [10 Git Anti Patterns You Should be Aware of](https://speakerdeck.com/lemiorhan/10-git-anti-patterns-you-should-be-aware-of),
  slide deck presented by Lemi Orhan Ergin at ITAKE UnConf 2018;
  though one should take it and especially proposed solution with critical eye.
- [Regular Expression Matching with a Trigram Index, or How Google Code Search Worked](https://swtch.com/~rsc/regexp/regexp4.html)
  by Russ Cox (2012).

__Git tools and sites__

- [Radicle](https://radicle.xyz/) intends to be a peer-to-peer stack for building software together,
  based on Git and Radicle Link peer-to-peer protocol.  
  Compare with [ForgeFed](https://notabug.org/peers/forgefed) (formerly GitPub),
  a federation protocol for software forges, mentioned in 
  [previous Git Rev News](https://git.github.io/rev_news/2020/11/27/edition-69/).
- [git-smartlist](https://github.com/felipec/git-smartlist) by Felipe Contreras;
  a tool to help create typical revisions (e.g. `master..@`) by generic name,
  so that you don’t have to.

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Felipe Contreras and Philip Oakley.
