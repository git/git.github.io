---
title: Git Rev News Edition 76 (June 27th, 2021)
layout: default
date: 2021-06-27 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 76 (June 27th, 2021)

Welcome to the 76th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of May 2021.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->


### Support

* [[BUG] Unix Builds Requires Pthread Support](https://lore.kernel.org/git/009d01d74b44$9efe8a60$dcfb9f20$@nexbridge.com/)

  Not long after 2.32.0-rc0 was released, Randall S. Becker reported
  to the mailing list that
  [a patch series](https://lore.kernel.org/git/pull.766.v4.git.1613598529.gitgitgadget@gmail.com/)
  from Jeff Hostetler, which introduced a "Simple IPC Mechanism",
  broke the build for the NonStop x86 and ia64 platforms. This build
  defines `NO_PTHREADS`, as supporting pthreads on these platforms is
  considered to cause "a bunch of other issues".

  It seems that Jeff patch series has introduced a file, called
  `ipc-unix-socket.c`, which contains a call to the
  `pthread_sigmask()` function part of the pthreads library which is
  of course not linked to when `NO_PTHREADS` is defined.

  Randall suggested a "simple, but probably wrong fix" which just
  surrounds the call to `pthread_sigmask()` with `#ifndef NO_PTHREADS`
  and `#endif`.

  Peff, alias Jeff King, replied to Randall that usually an "async"
  mechanism is used for tasks that can be performed by several workers
  in parallel, and that underneath this mechanism can be implemented
  both using different processes and using different threads. At build
  time, depending on the availability of pthread, one or the other
  implementation is selected.

  Peff couldn't tell though, if the "async" interface that the IPC
  mechanism defines can actually be implemented using
  processes. Anyway he proposed an improved patch to fix the build by
  just removing the files implementing the mechanism from the build if
  NO_PTHREAD if defined.

  Jeff Hostetler, who had implemented the IPC mechanism, then replied
  to Peff, that the mechanism is heavily threaded and that there was
  no point in trying to "fake it" with processes. So he agreed with
  Peff's patch which removes it from the build.

  Peff replied to Jeff asking if he wanted to pick his patch up from
  there and produce a polished patch before the 2.32.0 release. Jeff
  then agreed to do that, and sent
  [a more elaborate patch](https://lore.kernel.org/git/pull.955.git.1621352192238.gitgitgadget@gmail.com/)
  based on Peff's patch and on some discussions about it that happened
  in the meantime between Peff and Randall.

  Junio reviewed Jeff's patch and made some suggestions, which after
  further discussion were integrated in
  [the version 2 of the patch](https://lore.kernel.org/git/pull.955.v2.git.1621520547726.gitgitgadget@gmail.com/).

  A [version 3](https://lore.kernel.org/git/pull.955.v3.git.1621535291406.gitgitgadget@gmail.com/)
  soon followed to fix the build for people using CMake instead of make.
  This version was merged before 2.32.0-rc1.

<!---
## Developer Spotlight:
-->

## Releases

+ Git [2.32.0](https://public-inbox.org/git/xmqqa6o3xj2e.fsf@gitster.g/),
[2.32.0-rc3](https://public-inbox.org/git/xmqq4kegr7o3.fsf@gitster.g/),
[2.32.0-rc2](https://public-inbox.org/git/xmqq4ken75cv.fsf@gitster.g/)
+ Git for Windows [2.32.0(1)](https://github.com/git-for-windows/git/releases/tag/v2.32.0.windows.1),
[2.32.0-rc3(1)](https://github.com/git-for-windows/git/releases/tag/v2.32.0-rc3.windows.1),
[2.32.0-rc2(1)](https://github.com/git-for-windows/git/releases/tag/v2.32.0-rc2.windows.1)
+ Bitbucket Server [7.14](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ GitHub Enterprise [3.1.2](https://help.github.com/enterprise-server@3.1/admin/release-notes#3.1.2),
[3.0.10](https://help.github.com/enterprise-server@3.0/admin/release-notes#3.0.10),
[2.22.16](https://help.github.com/enterprise-server@2.22/admin/release-notes#2.22.16),
[3.1.1](https://help.github.com/enterprise-server@3.1/admin/release-notes#3.1.1),
[3.0.9](https://help.github.com/enterprise-server@3.0/admin/release-notes#3.0.9),
[2.22.15](https://help.github.com/enterprise-server@2.22/admin/release-notes#2.22.15),
[2.21.23](https://help.github.com/enterprise-server@2.21/admin/release-notes#2.21.23),
[3.1.0](https://help.github.com/enterprise-server@3.1/admin/release-notes#3.1.0)
+ GitLab [14.0.1](https://about.gitlab.com/releases/2021/06/24/gitlab-14-0-1-released/),
[14.0](https://about.gitlab.com/releases/2021/06/22/gitlab-14-0-released/),
[13.12.5](https://about.gitlab.com/releases/2021/06/21/gitlab-13-12-5-released/),
[13.12.4](https://about.gitlab.com/releases/2021/06/14/gitlab-13-12-4-released/),
[13.12.3](https://about.gitlab.com/releases/2021/06/07/gitlab-13-12-3-released/),
[13.12.2, 13.11.5, and 13.10.5](https://about.gitlab.com/releases/2021/06/01/security-release-gitlab-13-12-2-released/)
+ GitHub Desktop [2.9.0](https://desktop.github.com/release-notes/),
[2.8.3](https://desktop.github.com/release-notes/)

## Other News

__Various__


__Light reading__


__Git tools and sites__
* [A Git history visualization page](https://git-history.jpalmer.dev/)
by Jeff Palmer &lt;<jeffrey.palmer@acm.org>&gt; shows "An Interactive Development History" of Git in
three columns: project and contributor statistics, relative cumulative 
contributions by contributor, and aggregated commits by 
contributor by month with milestone annotations. Jeff wrote 
[an associated blog post](https://jpalmer.dev/2021/05/interactive-git-history/) about how
he created the visualization, and he's also looking for
feedback and ideas for milestones or features he could add.


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Jeffrey Palmer.
