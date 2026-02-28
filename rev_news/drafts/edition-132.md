---
title: Git Rev News Edition 132 (February 28th, 2026)
layout: default
date: 2026-02-28 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 132 (February 28th, 2026)

Welcome to the 132nd edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of January and February 2026.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->


### Support

* [Slow git pack-refs --all](https://www.google.com/search?q=https://lore.kernel.org/git/CH3PR12MB9026B5872FD42F031970074BC2B3A%40CH3PR12MB9026.namprd12.prod.outlook.com)

  Martin Fick started the discussion by reporting a significant
  performance issue where `git pack-refs --all` was taking over five
  minutes to complete on a large repository (~3M refs) hosted on an
  NFS filesystem. This delay was particularly problematic for Gerrit
  servers because Git holds the `packed-refs.lock` for nearly the
  entire duration, blocking other reference updates. Martin noted that
  JGit was able to perform the same operation in under 20 seconds on
  the same repository, suggesting the bottleneck was specific to the
  Git implementation.

  The `packed-refs` file is used by Git to store a large number of
  references in a single sorted file to avoid the overhead of many
  small "loose" reference files. However, updating this file requires
  rewriting it entirely, and Git typically verifies that objects exist
  and "peels" tags (finding the underlying object a tag points to)
  during this process.

  brian m. carlson replied to Martin, suggesting that the slowdown
  might be occurring in `should_pack_ref()` because Git needs to
  verify that the object at the end of a reference actually
  exists. Brian also pointed out that NFS was likely a major factor,
  as the network latency involved in opening many pack files and
  checking loose objects can be substantial. He suggested setting
  `receive.unpackLimit` to 1 to reduce the number of loose objects
  created in the first place.

  Peff (alias Jeff King) explained that the `packed-refs` file stores
  "tag-peeling" information, which requires Git to open each object
  for newly written refs via `peel_object()` to read its header and
  determine its type. Peff noted that this logic resides in
  `write_with_updates()` within `packed-backend.c`.

  Martin conducted further testing using `strace` and `drop_caches` to
  eliminate filesystem caching interference. He discovered that while
  the actual `write()` calls were fast, there were long gaps—up to
  four minutes in total—where the program was not making any system
  calls. Martin hypothesized that this "hidden" time was spent by the
  kernel handling page faults for `mmap()`ed memory over NFS.

  Patrick Steinhardt concurred that NFS was frequently a source of
  such performance issues, mentioning that GitLab had eventually
  sunsetted the use of NFS for this reason. Patrick suggested using
  `perf(1)` to generate a flame graph to see exactly where the CPU was
  spending time.

  Martin provided a summary of a flame graph, which showed about
  one-third of the time spent in `_memcmp_sse4_1` and another third in
  `unpack_object_header_buffer()`, both accompanied by high page fault
  rates. He also noticed significant time spent in a function he
  identified as `packed_refs_store_create()`.

  Peff corrected the function name to `packed_ref_store_create()` and
  noted that Git might be performing an extra linear pass through the
  `packed-refs` file if it lacks certain header tags. He discovered
  that JGit-generated files were missing the `sorted` and
  `fully-peeled` traits in the header. Without the `sorted` tag, Git
  reads the entire file linearly to verify its order before it can
  perform binary searches. Peff suggested that JGit should be updated
  to write these markers.

  In a final breakthrough, Martin tested adding these tags
  manually. He found that while the `sorted` tag did not provide a
  major boost, adding the `fully-peeled` tag was the "trigger" that
  dropped the execution time from over five minutes to under four
  seconds. The absence of the `fully-peeled` tag was forcing Git to
  re-peel every reference by looking up the objects in the pack files
  over the slow NFS connection.

  The discussion concluded with the identification of a specific
  interoperability issue between JGit and Git. By identifying that the
  missing `fully-peeled` header was causing redundant, expensive I/O
  operations, Martin was able to plan a fix for JGit that would
  resolve the performance bottleneck on his production servers.

<!---
## Developer Spotlight:
-->

## Other News

__Various__


__Light reading__
- [Exploring the .git Directory – How Git Stores Your Code](https://www.git-tower.com/blog/posts/exploring-the-git-directory)
- [The Ultimate Guide to Git Config: Fine-Tuning Your Git Experience](https://www.git-tower.com/blog/the-ultimate-guide-to-git-config)
  
<!---
__Easy watching__
-->

__Git tools and sites__


## Releases

+ Git [2.53.0](https://lore.kernel.org/git/xmqq4inz13e3.fsf@gitster.g/)
+ Git for Windows [v2.53.0(1)](https://github.com/git-for-windows/git/releases/tag/v2.53.0.windows.1)
+ GitLab [18.9.1, 18.8.5, 18.7.5](https://about.gitlab.com/releases/2026/02/25/patch-release-gitlab-18-9-1-released/),
[18.9](https://about.gitlab.com/releases/2026/02/19/gitlab-18-9-released/),
[18.8.4, 18.7.4, 18.6.6](https://about.gitlab.com/releases/2026/02/10/patch-release-gitlab-18-8-4-released/),
[18.6.2, 18.7.1, 18.8.1](https://about.gitlab.com/releases/2026/02/06/patch-release-gitlab-ai-gateway-18-8-1-released/),
[18.8.3, 18.7.3, 18.6.5](https://about.gitlab.com/releases/2026/02/04/gitlab-18-8-3-released/)
+ Gerrit Code Review [3.11.9](https://www.gerritcodereview.com/3.11.html#3119),
[3.12.5](https://www.gerritcodereview.com/3.12.html#3125),
[3.13.3](https://www.gerritcodereview.com/3.13.html#3133),
[3.13.4](https://www.gerritcodereview.com/3.13.html#3134)
+ GitHub Enterprise [3.20.0](https://docs.github.com/enterprise-server@3.20/admin/release-notes#3.20.0),
[3.19.2](https://docs.github.com/enterprise-server@3.19/admin/release-notes#3.19.2),
[3.18.5](https://docs.github.com/enterprise-server@3.18/admin/release-notes#3.18.5),
[3.17.11](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.11),
[3.16.14](https://docs.github.com/enterprise-server@3.16/admin/release-notes#3.16.14),
[3.15.18](https://docs.github.com/enterprise-server@3.15/admin/release-notes#3.15.18),
[3.14.23](https://docs.github.com/enterprise-server@3.14/admin/release-notes#3.14.23)
+ GitKraken [11.9.0](https://help.gitkraken.com/gitkraken-desktop/current/)
+ GitHub Desktop [3.5.5](https://desktop.github.com/release-notes/)
+ Sourcetree [4.2.17](https://product-downloads.atlassian.com/software/sourcetree/ReleaseNotes/Sourcetree_4.2.17.html)
+ Git Cola [4.17.1](https://github.com/git-cola/git-cola/releases/tag/v4.17.1)
+ GitButler [0.19.3](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.19.3),
[0.19.2](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.19.2)
+ Sublime Merge [Build 2123](https://www.sublimemerge.com/download)
- Tower for Mac [15.1](https://www.git-tower.com/release-notes/mac?show_tab=release-notes)
- Tower for Windows [11](https://www.git-tower.com/blog/tower-windows-11)
- git-flow-next [1.0](https://git-flow.sh/changelog/)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Bruno Brito.
