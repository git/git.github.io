---
title: Git Rev News Edition 118 (December 31st, 2024)
layout: default
date: 2024-12-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 118 (December 31st, 2024)

Welcome to the 118th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of November and December 2024.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

### Support

+ [./configure fails to link test program due to missing dependencies](https://lore.kernel.org/git/GV1PR02MB848925A79A9DD733848182D58D662@GV1PR02MB8489.eurprd02.prod.outlook.com/)

  Last September Henrik Holst reported an issue when trying to compile
  Git 2.44.0 with HTTPS/curl support on LFS 12.1. The 'configure' script
  failed to detect libcurl's dependencies properly when trying to link
  statically.

  The issue occurred because the 'configure' script only used the
  `-lcurl` build flag without running `pkg-config --libs libcurl` to
  add build flags for dependencies like `zstd` that libcurl
  needs. Henrik found that manually setting the LDFLAGS environment
  variable to include build flags for all dependencies (like `-lcurl
  -lssl -lcrypto -lzstd -lbrotlidec -lz`) allowed the build to
  succeed. This sparked a broader discussion about Git's build system
  situation.

  Looking at 'configure.ac', Junio Hamano, the Git maintainer, noted
  that `pkg-config` isn't used at all, instead `curl-config --libs` is
  used to detect curl's flags. Even if the 'configure' script was
  added early in the history of the Git project, Junio said it was an
  afterthought and nobody has considered "upgrading" from
  `curl-config` to `pkg-config` for dependency detection.

  In fact, our own Jakub Narębski
  [initially added the 'configure' script](https://lore.kernel.org/git/200607030156.50455.jnareb@gmail.com/)
  back in 2006 to make it much easier to create RPM spec files when
  compilation follows traditional `configure && make && make install`
  steps.

  brian m. carlson replied to Junio that users shouldn't statically
  link libcurl or OpenSSL at all, as this creates security issues.
  With static linking, security updates to these libraries would
  require recompiling Git to take effect. In contrast, dynamic linking
  allows security updates to be applied as soon as a new Git process
  is spawned.

  Patrick Steinhardt replied to Junio suggesting it might be time to
  reconsider Git's three build systems
  ([GNU Make](https://www.gnu.org/software/make/),
  [Autoconf](https://www.gnu.org/software/autoconf/), and
  [CMake](https://cmake.org/)). He proposed potentially dropping
  Autoconf and making CMake officially supported, or switching to
  [Meson](https://mesonbuild.com/) as an alternative.

  CMake was [added more recently in 2020](https://lore.kernel.org/git/pull.614.git.1587700897.gitgitgadget@gmail.com/)
  by Sibi Siddharthan as a third build system with the main goal of
  improving the build experience for developers on Windows.

  Soon after Patrick's reply, the Git Contributors' Summit happened
  and the
  ["Modern Build System" topic](https://lore.kernel.org/git/Zu2E3vIcTzywWOx3@nand.local/)
  was discussed there. Patrick Steinhardt raised concerns about
  maintaining three different build systems while others were
  concerned about having good platform support and good Windows
  developer experience. This led to an extensive discussion about
  the merits of different build systems in the thread started by
  Henrik.

  Eli Schwartz, the Meson maintainer, made a detailed case for
  preferring Meson over CMake, citing various CMake pain points and
  limitations. Phillip Wood agreed with Patrick about getting rid of
  Autoconf, but raised the importance of Visual Studio integration,
  since CMake was originally added to improve the Windows developer
  experience. Johannes Schindelin, alias Dscho, emphasized that
  CMake's deep Visual Studio integration was crucial for Windows
  developers and cautioned against switching to alternatives that
  would make the Windows experience worse. It appeared that Visual
  Studio has Meson support via plugins though, which alleviated some
  concerns.

  Paul Smith, the GNU Make maintainer, noted that requiring additional
  build tools like Meson, which are not yet often used and require
  some other dependencies, like Python3 for Meson, adds friction,
  though he acknowledged that for Git specifically this may be less of
  a concern given its existing dependencies.

  Junio seemed to agree that adding support for a fourth build system
  would be worth it if it would allow the project to drop all other
  three build systems eventually. He said the new build system would
  have "to be something available widely and easy to learn".

  Patrick came up later in October with a
  [21 patch long RFC series](https://lore.kernel.org/git/cover.1727881164.git.ps@pks.im/)
  to add support for the Meson build system with the goal of
  eventually replacing the current three build systems.

  There were a number of iterations on that series. Among the many
  comments, Taylor Blau asked about the eventual goals of the series
  and plans for CMake support. He noted that CMake support in contrib/
  was in an awkward position, neither fully supported nor properly
  maintained out-of-tree. He was concerned about having to maintain
  three build systems simultaneously during any transition period.

  David Aguilar expressed concerns about Python being a dependency
  through Meson. Eli replied that muon, a C99 implementation of Meson,
  could be used instead and demonstrated it working with Git's build.

  Jeff King, alias Peff, asked about reliability for bisecting and
  whether out-of-source builds would work correctly when moving
  between commits. He also requested better documentation of common
  developer workflows with Meson compared to Make.

  Junio discussed the need to maintain build system compatibility
  during any transition period. He noted that many of the Makefile
  options were added over time for good reasons and dropping support
  for them would need careful consideration.

  A number of other developers participated in the reviews. Ramsay
  Jones tested the patches on various platforms including
  Cygwin. Phillip Wood reviewed CMake-related changes and provided
  technical feedback. Johannes Sixt commented on changes to the
  gitk-git subtree. Eric Sunshine provided technical feedback. Your
  own Christian Couder provided feedback on the documentation.

  Over the iterations, Patrick updated the series to improve
  documentation, fix conflicts with in-flight patches, and address the
  various technical concerns raised during review.

  Eventually the
  [version 11 of the patch series](https://lore.kernel.org/git/20241206-pks-meson-v11-0-525ed4792b88@pks.im/)
  was merged and will be part of Git v2.48.0 that should be released
  in the next few weeks. It should be a properly supported modern
  build system that can be faster and more easily configurable than
  the three existing ones which will hopefully get deprecated over
  time.

  The merged patch series especially adds
  [some documentation](https://lore.kernel.org/git/20241206-pks-meson-v11-24-525ed4792b88@pks.im/#Z31meson.build)
  to help build Git with Meson and
  [a build system comparison](https://lore.kernel.org/git/20241206-pks-meson-v11-23-525ed4792b88@pks.im/#Z31Documentation:technical:build-systems.txt)
  that might be interesting to read.

<!---
## Developer Spotlight:
-->

## Other News

__Various__


__Light reading__

<!---
__Easy watching__
-->

__Git tools and sites__


## Releases

+ Git [2.48.0-rc1](https://public-inbox.org/git/xmqqjzbhxeho.fsf@gitster.g/),
[2.48.0-rc0](https://public-inbox.org/git/xmqqfrmn4hr9.fsf@gitster.g/)
+ Git for Windows [2.48.0-rc0(1)](https://github.com/git-for-windows/git/releases/tag/v2.48.0-rc0.windows.1)
+ libgit2 [1.9.0](https://github.com/libgit2/libgit2/releases/tag/v1.9.0)
+ GitHub Enterprise [3.15.1](https://help.github.com/enterprise-server@3.15/admin/release-notes#3.15.1),
[3.14.6](https://help.github.com/enterprise-server@3.14/admin/release-notes#3.14.6),
[3.13.9](https://help.github.com/enterprise-server@3.13/admin/release-notes#3.13.9),
[3.12.13](https://help.github.com/enterprise-server@3.12/admin/release-notes#3.12.13),
[3.11.19](https://help.github.com/enterprise-server@3.11/admin/release-notes#3.11.19),
[3.15.0](https://help.github.com/enterprise-server@3.15/admin/release-notes#3.15.0),
[3.14.5](https://help.github.com/enterprise-server@3.14/admin/release-notes#3.14.5),
[3.13.8](https://help.github.com/enterprise-server@3.13/admin/release-notes#3.13.8),
[3.12.12](https://help.github.com/enterprise-server@3.12/admin/release-notes#3.12.12),
[3.11.18](https://help.github.com/enterprise-server@3.11/admin/release-notes#3.11.18)
+ GitLab [17.7](https://about.gitlab.com/releases/2024/12/19/gitlab-17-7-released/),
[17.6.2, 17.5.4, 17.4.6](https://about.gitlab.com/releases/2024/12/11/patch-release-gitlab-17-6-2-released/)
+ Gerrit Code Review [3.11.0](https://www.gerritcodereview.com/3.11.html#3110)
+ GitKraken [10.6.0](https://help.gitkraken.com/gitkraken-client/current/)
+ GitHub Desktop [3.4.12](https://desktop.github.com/release-notes/),
[3.4.11](https://desktop.github.com/release-notes/),
[3.4.10](https://desktop.github.com/release-notes/)
+ Garden [1.10.0](https://github.com/garden-rs/garden/releases/tag/v1.10.0)
+ Git Cola [4.10.1](https://github.com/git-cola/git-cola/releases/tag/v4.10.1),
[4.10.0](https://github.com/git-cola/git-cola/releases/tag/v4.10.0)
+ GitButler [0.14.4](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.14.4),
[0.14.3](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.14.3)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
