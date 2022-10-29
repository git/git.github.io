---
title: Git Rev News Edition 92 (October 26th, 2022)
layout: default
date: 2022-10-26 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 92 (October 26th, 2022)

Welcome to the 92nd edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of October 2022.

## Discussions

### General

* [Git participated in GSoC (Google Summer of Code) 2022](https://summerofcode.withgoogle.com/programs/2022/organizations/git)

  The following contributors have successfully passed their final
  evaluation and published a final report:

  - Shaoxuan Yuan worked on the
    [More Sparse Index Integrations project](https://ffyuanda.github.io/blog/GSoC-final-blog/)
    project. He was co-mentored by Derrick Stolee and Victoria Dye.

  - Abhradeep Chakraborty worked on the
    [Reachability bitmap improvements](https://medium.com/@abhra303/gsoc-final-report-feaaacfae737)
    project. He was co-mentored by Kaartic Sivaraam and Taylor Blau.

  Also Siddharth Asthana successfully participated in GSoC 2022 for
  GitLab (instead of Git) and contributed to Git as part of his work on the
  [Add Support for Mailmap](https://gitlab.com/groups/gitlab-org/-/epics/8765)
  project. He was co-mentored by John Cai and Christian Couder.

  Congratulations to these contributors and their mentors!


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

+ Git [2.38.1 and others](https://public-inbox.org/git/xmqq4jw1uku5.fsf@gitster.g/),
[2.38.0](https://public-inbox.org/git/xmqqmtacu8bw.fsf@gitster.g/)
+ Git for Windows [2.38.1(1)](https://github.com/git-for-windows/git/releases/tag/v2.38.1.windows.1),
[2.38.0(1)](https://github.com/git-for-windows/git/releases/tag/v2.38.0.windows.1)
+ GitHub Enterprise [3.7.0](https://help.github.com/enterprise-server@3.7/admin/release-notes#3.7.0),
[3.6.3](https://help.github.com/enterprise-server@3.6/admin/release-notes#3.6.3),
[3.5.7](https://help.github.com/enterprise-server@3.5/admin/release-notes#3.5.7),
[3.4.10](https://help.github.com/enterprise-server@3.4/admin/release-notes#3.4.10),
[3.3.15](https://help.github.com/enterprise-server@3.3/admin/release-notes#3.3.15),
[3.2.20](https://help.github.com/enterprise-server@3.2/admin/release-notes#3.2.20)
+ GitLab [15.5.1](https://about.gitlab.com/releases/2022/10/24/gitlab-15-5-1-released/)
[15.5](https://about.gitlab.com/releases/2022/10/22/gitlab-15-5-released/),
[15.4.3](https://about.gitlab.com/releases/2022/10/19/gitlab-15-4-3-released/),
[15.4.2](https://about.gitlab.com/releases/2022/10/03/gitlab-15-4-2-released/),
[15.4.1, 15.3.4, and 15.2.5](https://about.gitlab.com/releases/2022/09/29/security-release-gitlab-15-4-1-released/)
+ Bitbucket Server [8.5](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ Gerrit Code Review [3.4.6](https://www.gerritcodereview.com/3.4.html#346),
[3.5.3](https://www.gerritcodereview.com/3.5.html#353),
[3.6.2](https://www.gerritcodereview.com/3.6.html#362)
+ GitHub Desktop [3.1.2](https://desktop.github.com/release-notes/),
[3.1.1](https://desktop.github.com/release-notes/),
[3.1.0](https://desktop.github.com/release-notes/)
+ Tower for Windows [4.0](https://www.git-tower.com/release-notes/windows?show_tab=release-notes) ([blog post](https://www.git-tower.com/blog/tower-windows-4/))

## Other News

__Events__

+ The recorded talks of GitMerge 2022 [are now live](https://www.youtube.com/playlist?list=PL0lo9MOBetEGEAs1D28ExRQONnX-uZ3Wf).
+ The summary of GitMerge 2022 can be found in the
  [Git Merge 2022 – that’s a wrap!](https://github.blog/2022-10-21-git-merge-2022-mission-report/)
  blog post by Lee Reilly on the GitHub Blog.


__Various__

+ [Git security vulnerabilities announced](https://github.blog/2022-10-18-git-security-vulnerabilities-announced/)
  (CVE-2022-39253, and CVE-2022-39260) that affect Git's [`--local` clone optimization](https://git-scm.com/docs/git-clone#Documentation/git-clone.txt---local)
  (important when cloning with `--recurse-submodules` from untrusted repositories)
  and [`git shell`'s interactive command mode](https://git-scm.com/docs/git-shell#_interactive_useA).
  Fixed in Git 2.38.1.
+ [Highlights from Git 2.38](https://github.blog/2022-10-03-highlights-from-git-2-38/)
  by Taylor Blau on GitHub Blog.<br>
  See also [Git 2.38 Adds Microsoft's "Scalar" Repository Management Tool](https://www.phoronix.com/news/Git-2.38-Released)
  by Michael Larabel on Phoronix.
+ [Cybernews research team discovered millions of `.git` folders exposed to public](https://cybernews.com/security/millions-git-folders-exposed/).
+ A [Code Review Handbook](https://www.sledgeworx.io/code-review-handbook/) published by Sledgeworx Software.


__Light reading__

+ [Setting Up GPG on Windows (The Easy Way)](https://www.git-tower.com/blog/setting-up-gpg-windows/) by Bruno Brito on Tower’s blog.
+ [Our Favorite Tower Features](https://blog.kaleidoscope.app/2022/10/18/our-l33t-tower-features/) by Florian Albrecht on Kaleidoscope's blog.
+ [The Story of Scalar](https://github.blog/2022-10-13-the-story-of-scalar/)
  by Derrick Stolee and Victoria Dye on GitHub Blog.
+ Literally the smallest changeset possible created:
  [Fix: remove a ZERO WIDTH NO-BREAK SPACE in front of an inline literal](https://github.com/spyder-ide/spyder-docs/pull/332).
+ [VS Code "Timeline" feature — Your local version control system](https://www.amitmerchant.com/vs-code-timeline-your-local-version-control-system/)
  by Amit Merchant.
+ [Turn around your Git mistakes in 17 ways](https://dev.to/smitterhane/turn-around-your-git-mistakes-in-17-ways-2mn1)
  by Smitter hane on DEV\.to.
+ [GitHub's Missing Merge Option](https://tylercipriani.com/blog/2022/09/30/githubs-missing-merge-option/)
  by Tyler Cipriani, and the conflict between
  team “git log should be clean” vs. team “git log should have an accurate history.”
+ [Take advantage of Git rebase](https://about.gitlab.com/blog/2022/10/06/take-advantage-of-git-rebase/) by Christian Couder on GitLab blog.
+ [Speed up your monorepo workflow in Git](https://about.gitlab.com/blog/2022/09/06/speed-up-your-monorepo-workflow-in-git/) by
  John Cai on GitLab blog.
  + See also [Scaling Git’s garbage collection](https://github.blog/2022-09-13-scaling-gits-garbage-collection/),
    mentioned in [Git Rev News #91](https://git.github.io/rev_news/2022/09/30/edition-91/) and
    [Scaling monorepo maintenance](https://github.blog/2021-04-29-scaling-monorepo-maintenance/), mentioned
    in [Git Rev News #75](https://git.github.io/rev_news/2021/05/27/edition-75/).

<!---
__Easy watching__
-->

__Git tools and sites__

+ [`focus`](https://github.com/twitter/focus) is a tool to manage
  [Git sparse checkouts](https://github.blog/2020-01-17-bring-your-monorepo-down-to-size-with-sparse-checkout/)
  derived from the [Bazel](https://bazel.build/) build graph.
+ Goblet is a Git proxy server that caches repositories for read access,
  which is intended to be used as a library.
  Created at Google as 20% project (with glue code for googlesource.com)
  as [google/goblet](https://github.com/google/goblet),
  and also used in a modified form at Canva
  as [canva-public/goblet](https://github.com/canva-public/goblet).
+ A different [Goblet](https://pythonhosted.org/goblet/)
  _was_ time ago a web frontend for Git repositories in Python,
  using libgit2 and Flask; [seveas/goblet](https://github.com/seveas/goblet)
  repository was archived by the owner.
+ [`nb`](https://xwmx.github.io/nb/) is a command line and local web
  note-taking, bookmarking, archiving, and knowledge base application
  with Git-backed versioning and syncing.
+ [Git Reference](http://git.github.io/git-reference/) site is meant to be a
  quick reference for learning and remembering the most important and commonly
  used Git commands, but it can also be used as a tutorial. Every page will also
  link to more in-depth Git documentation.
+ [email + git = <3: Learn to use email with git!](https://git-send-email.io/)
  is a guide to contributing to email-driven projects like the Linux kernel, PostgreSQL, or Git.
  Covers various operating systems and distributions.


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Johannes Schindelin and Bruno Brito.
