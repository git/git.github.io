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

  Over 300 people attended. Some people didn't attend, and some talks
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
  speak at the Git Merge 2020 conference, but canceled his flight due
  to a coronavirus outbreak in China. He wrote this blog post about the
  topic he wanted to present at the conference.

  In this blog post, he introduces a centralized workflow (named AGit-Flow)
  implemented at Alibaba, and an Open Source command-line tool "git-repo",
  which is hosted on GitHub:
  [https://github.com/alibaba/git-repo-go](https://github.com/alibaba/git-repo-go).
  The tool is not bound to a single protocol or a single server. It is
  extensible and can run on Gerrit, AGit-Flow or other compatible protocols.

  The implementation of AGit-Flow has been contributed to
  [the Git mailing list](https://public-inbox.org/git/20200304113312.34229-1-zhiyou.jx@alibaba-inc.com/),
  and this feature is under code review. Junio stated that the proposed name of
  the new hook was inappropriate. Therefore, after a code review of these
  patches, expect some updates on the blog post.

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

* [Outreachy](https://www.outreachy.org/) winter internships
  finished. Both Heba Waly and Miriam Rubio successfully finished
  their Outreachy internships. Miriam posted
  [a final blog post](https://mirucam.gitlab.io/outreachy_blog/post/week13/)
  about it.
* Git has been selected as a
  [Google Summer of Code 2020](https://summerofcode.withgoogle.com/)
  mentor organization. Students willing to participate need to apply
  online until March 31.
* [Tower for Teachers & Universities](https://www.git-tower.com/education/):
  Teachers and universities get free access to Tower "Pro" Git GUI.

__Light reading__

* Derrick Stolee's slides for his "Git at Scale for Everyone" talk
  during the Git Merge 2020 conference are [available](https://stolee.dev/docs/git-merge-2020.pdf).
* Elijah Newren's slides for his "Scaling the Merge Machinery" talk
  during the Git Merge 2020 conference are [available](https://github.com/newren/presentations/blob/pdfs/merge-performance/merge-performance-slides.pdf)
  in his personal notes and presentations repository.
  Steps to reproduce the speedups he got can be found [here](https://github.com/newren/git/blob/git-merge-2020-demo/README.md).
* [Graph operations in Git, and how to make them faster](https://speakerdeck.com/jnareb/graph-operations-in-git-and-how-to-make-them-faster) presentation slides by Jakub Narębski on SpeakerDeck; also available on [SlideShare](https://www.slideshare.net/JakubNarbski/graph-operations-in-git-version-control-system-how-the-performance-was-improved-for-large-repositories-how-can-it-be-further-improved) and as [PDF file](https://drive.google.com/open?id=1psMBVfcRHcZeJ7AewGpdoymrEfFVdXoK)

* [Git moves to new defaults in 2.26 release](https://devclass.com/2020/03/23/git-moves-to-new-defaults-in-2-26-release/) by Julia Schmidt, about version 2 of the transport protocol, backend used by `git rebase`, etc.
* [How Git Partial Clone lets you fetch only the large file you need](https://about.gitlab.com/blog/2020/03/13/partial-clone-for-massive-repositories/) by James Ramsay on GitLab Blog
* [Make advanced Git tasks simple with Lazygit: 5 ways to harness the power of git with the Lazygit terminal UI](https://opensource.com/article/20/3/lazygit) by Jesse Duffield.
  [Lazygit](https://github.com/jesseduffield/lazygit) was mentioned in [Git Rev News Edition #42 (August 22nd, 2018)](https://git.github.io/rev_news/2018/08/22/edition-42/).
* [Introducing b4 and patch attestation](https://people.kernel.org/monsieuricon/introducing-b4-and-patch-attestation) by Konstantin Ryabitsev.
  The [b4 tool](https://git.kernel.org/pub/scm/utils/b4/b4.git) started out as `get-lore-mbox`;
  the latter was mentioned in [Git Rev News Edition #60 (February 19th, 2020)](https://git.github.io/rev_news/2020/02/19/edition-60/#other-news)
  * [Attestation for kernel patches [LWN.net]](https://lwn.net/Articles/813646/) by Jonathan Corbet
* [Please stop recommending Git Flow!](https://georgestocker.com/2020/03/04/please-stop-recommending-git-flow/) by George Stocker (Git Flow branching model was popularized by blog post entitled [A Successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/))
  * [The problem with Git flow: Learn why Git flow complicates the lifecycle and discover an alternative to streamline development](https://about.gitlab.com/blog/2020/03/05/what-is-gitlab-flow/) by Suri Patel on GitLab Blog
* [A Beginner’s Guide to Git -- How to Write a Good Commit Message](https://www.freecodecamp.org/news/a-beginners-guide-to-git-how-to-write-a-good-commit-message/) by Gaël Thomas
* [10 Git Techniques You Need to Know Before You Join a Team](https://www.sitepoint.com/git-techniques-to-know-before-you-join-a-team/) by Shaumik Daityari on Sitepoint
* [Feature Flags and GitOps. 5 Use Cases to Help You ‘Git’r Done.](https://dev.to/cloudbees/feature-flags-and-gitops-5-use-cases-to-help-you-git-r-done-45ga) by Kristin Baskett of CloudBees.
  The idea of [GitOps](https://www.cloudbees.com/blog/gitops-dev-dash-ops) was mentioned in
  [Git Rev News Edition #42 (August 22nd, 2018)](https://git.github.io/rev_news/2018/08/22/edition-42/) and [#43](https://git.github.io/rev_news/2018/09/19/edition-43/).
* [Microsoft’s Scalar speeds up Git](https://www.infoworld.com/article/3528008/microsofts-scalar-speeds-up-git.html) by Paul Krill in InfoWorld.
  [Scalar](https://github.com/microsoft/scalar/) was mentioned in [Git Rev News Edition #60 (February 19th, 2020)](https://git.github.io/rev_news/2020/02/19/edition-60/)

__Git tools and sites__

* [Scalar](https://github.com/microsoft/scalar/) by Microsoft is a set of tools, settings and extensions for Git to help manage large Git repositories
* [bash-git-prompt](https://github.com/magicmonty/bash-git-prompt): an informative and fancy bash prompt for Git users, a port of the "[Informative git prompt for zsh](https://github.com/olivierverdier/zsh-git-prompt)"
* [showthedocs](http://showthedocs.com/) is a both a syntax highlighter and a documentation browser that finds the relevant docs for your code.  Given code, it parses and highlights it, and makes it possible to jump directly to the place in the docs where an item is explained.  Includes support for [gitconfig](https://git-scm.com/docs/git-config) "language".
* [//grep.app](https://grep.app/): Search across a half million git repos, currently public repositories on GitHub; you can search by regular expression, using the RE2 syntax

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Jiang Xin.
