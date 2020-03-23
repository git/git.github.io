---
title: Git Rev News Edition 61 (March 25th, 2020)
layout: default
date: 2020-03-25 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 61 (March 25th, 2020)

Welcome to the 61st edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of February 2020.

## Discussions


### General

* [Git Merge 2020 conference](https://git-merge.com/)

  The Git Merge conference happened on March 4, 2020 in Los
  Angeles. It was organized by GitHub and sponsored by GitHub, GitLab
  and the [Software Freedom Conservancy](https://sfconservancy.org/).

  Over 300 people attended. Some people didn't attend and some talks
  had to be changed at the last minute due to coronavirus related
  reasons.

  On the wall [a big timeline](https://photos.google.com/share/AF1QipP764-lYtgUakk-4Kr_Njh6S3GZE0BqdU8V_3j63RyhTygxNR12oO3mY5gSJdSGGA/photo/AF1QipPDidUvdLbTsS9DJKJlAVQ-PEV5zP1MZ4NIkd-x)
  mentioned some important events in Git history.

  There was a party in the evening with
  [a big cake dedicated to Git's 15th anniversary](https://photos.google.com/share/AF1QipP764-lYtgUakk-4Kr_Njh6S3GZE0BqdU8V_3j63RyhTygxNR12oO3mY5gSJdSGGA/photo/AF1QipOXskul_osttaPQuOHkR1wAQQdOJb4j89VO3ipn).

* [Git Contributor Summit](https://lore.kernel.org/git/AC2EB721-2979-43FD-922D-C5076A57F24B@jramsay.com.au/)

  The Git Contributor Summit happened on March 5, 2020 in Los Angeles,
  the day after the Git Merge conference. The event was also organized
  by GitHub.

  There were 26 people attending physically and 5 people attending
  remotely.

  As usual it was an unconference where people wrote topics on a
  whiteboard during the breakfast and then voted on them by putting a
  tick-mark on the board. The topics were then discussed during the
  day roughly from the most voted on to the less voted on.

  [Notes](https://lore.kernel.org/git/AC2EB721-2979-43FD-922D-C5076A57F24B@jramsay.com.au/)
  have been taken collaboratively and sent to the mailing list
  afterwards.

* [AGit-Flow and git-repo](https://git-repo.info/en/2020/03/agit-flow-and-git-repo/) (*written by Jiang Xin*)

  [AGit-Flow and git-repo](https://git-repo.info/en/2020/03/agit-flow-and-git-repo/)
  is a blog post on a missing speech from Git
  Merge 2020. Jiang Xin, a developer at Alibaba China, had planned to
  speak at the Git Merge 2020 conference, but cancelled his flight due
  to a coronavirus outbreak in China. He wrote this blog post about the
  topic he wanted to offer to the conference.

  In this blog post, he introduces a centralized workflow (named AGit-Flow)
  implemented at Alibaba, and an open source command-line tool "git-repo".
  "git-repo" is an open-source software host in GitHub:
  [https://github.com/alibaba/git-repo-go](https://github.com/alibaba/git-repo-go).
  It is not bound to a single protocol or a single server. It is
  extensible and can run on Gerrit, AGit-Flow or other compatible protocols.

  The implementation of AGit-Flow has been contributed to
  [the Git mailing list](https://public-inbox.org/git/20200304113312.34229-1-zhiyou.jx@alibaba-inc.com/),
  and this feature is under code review. Junio states that the name of
  the new hook is inappropriate. Therefore, after a code review of these
  patches, some updates will be made in the blog post.

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

+ Git [2.26.0](https://public-inbox.org/git/xmqqa7477u6j.fsf@gitster.c.googlers.com/),
[2.25.2](https://public-inbox.org/git/xmqqeetqh6fp.fsf@gitster.c.googlers.com/),
[2.26.0-rc2](https://public-inbox.org/git/xmqqa74fj30p.fsf@gitster.c.googlers.com/),
[2.26.0-rc1](https://public-inbox.org/git/xmqqo8t4z29k.fsf@gitster-ct.c.googlers.com/),
[2.26.0-rc0](https://public-inbox.org/git/xmqq5zfi4g0p.fsf@gitster-ct.c.googlers.com/)
+ Git for Windows [2.26.0(1)](https://github.com/git-for-windows/git/releases/tag/v2.26.0.windows.1)
+ Bitbucket Server [7.0](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ Gerrit Code Review [2.16.17](https://www.gerritcodereview.com/2.16.html#21617)
+ GitHub Enterprise [2.20.3](https://enterprise.github.com/releases/2.20.3/notes),
[2.20.2](https://enterprise.github.com/releases/2.20.2/notes),
[2.19.9](https://enterprise.github.com/releases/2.19.9/notes),
[2.18.14](https://enterprise.github.com/releases/2.18.14/notes),
[2.17.20](https://enterprise.github.com/releases/2.17.20/notes),
[2.20.1](https://enterprise.github.com/releases/2.20.1/notes),
[2.19.8](https://enterprise.github.com/releases/2.19.8/notes),
[2.18.13](https://enterprise.github.com/releases/2.18.13/notes),
[2.17.19](https://enterprise.github.com/releases/2.17.19/notes)
+ GitLab [12.9](https://about.gitlab.com/releases/2020/03/22/gitlab-12-9-released/),
[12.8.7](https://about.gitlab.com/releases/2020/03/16/gitlab-12-8-7-released/),
[12.8.6](https://about.gitlab.com/releases/2020/03/11/critical-security-release-gitlab-12-dot-8-dot-6-released/),
[12.8.5](https://about.gitlab.com/releases/2020/03/09/gitlab-12-8-5-released/),
[12.8.2](https://about.gitlab.com/releases/2020/03/04/gitlab-12-dot-8-dot-2-released/),
[12.8.1](https://about.gitlab.com/releases/2020/02/24/gitlab-12-8-1-released/),
[12.8](https://about.gitlab.com/releases/2020/02/22/gitlab-12-8-released/)
+ GitKraken [6.5.4](https://support.gitkraken.com/release-notes/current),
[6.5.3](https://support.gitkraken.com/release-notes/current),
[6.5.2](https://support.gitkraken.com/release-notes/current)

## Other News

__Various__

* [Outreachy](https://www.outreachy.org/) Winter internships
  finished. Both Heba Waly and Miriam Rubio successfully finished
  their Outreachy internships. Miriam posted
  [a final blog post](https://mirucam.gitlab.io/outreachy_blog/post/week13/)
  about it.
* Git has been selected as a
  [Google Summer of Code 2020](https://summerofcode.withgoogle.com/)
  mentor organization. Students willing to participate have until
  March 31 to apply online.

__Light reading__



__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Jiang Xin.
