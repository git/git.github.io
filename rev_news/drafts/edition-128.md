---
title: Git Rev News Edition 128 (October 31st, 2025)
layout: default
date: 2025-10-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 128 (October 31st, 2025)

Welcome to the 128th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of September and October 2025.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->


### Support

+ [[Change] Git build issue on NonStop](https://lore.kernel.org/git/01c101dc2842$38903640$a9b0a2c0$@nexbridge.com/)

  Randall S. Becker reported on the mailing list that CI tests on the
  NonStop x86 platform were broken after the `uintptr_t` type started
  to be used in [clar](https://github.com/clar-test/clar) tests when
  displaying error messages in test failures (when pointer comparisons
  fail).

  Peff, alias Jeff King, replied to Randall that `uintptr_t` was
  already used in many places in the regular code, and guessed the
  issue might come from how clar defined that type. He noted though
  that the line in the clar test where `uintptr_t` appeared also
  contained `PRIxPTR` which is a macro that is not used in the regular
  code. So he wondered if just replacing that macro with `PRIuMAX`
  (which is often used) would be enough to fix the issue.

  `PRIxPTR`, `PRIuMAX` and similar macros are format specifier macros
  from the C standard library (defined in `<inttypes.h>`) that provide
  portable ways to print integer types using functions like `printf()`
  across different platforms. They are all named in the same way, with
  `PRI` meaning `printf`, the next letter indicating the format, like
  `x` for hexadecimal and `u` for unsigned decimal, and the last part
  indicating the type, like `PTR` for pointer-sized integers, `MAX`
  for maximum-width integers, `64` for 64-bit, etc.

  Randall replied to Peff that replacing `PRIxPTR` with `PRIuMAX`
  would work, and that he was going to try it.

  Patrick Steinhardt also replied to Randall and Peff saying it would
  work, and asked Peff if he wanted to send that change.

  Peff replied to Patrick that he'd be happy if Patrick sent the
  change, but noted that using `PRIxMAX` might be better than
  `PRIuMAX` as the code wanted to print hexadecimal values.

  Patrick then reported to Peff that Peff's suggestion to use the
  `PRIxMAX` or `PRIuMAX` format specifier macros didn't work on 32 bit
  systems, because casting a pointer to an integer of different size
  (the pointer is 32 bits, but `uintmax_t` is 64 bits) fails.

  Patrick proposed using `%p` as a format specifier saying it might be
  a better trade-off. The downside was that the output format would be
  unpredictable across platforms as `%p` doesn't have a standardized
  output format. So tests that validated the exact error message
  format would have to be dropped. But at least `%p` would work
  everywhere and produce stable output.

  Junio Hamano, the Git maintainer, agreed with Patrick that `%p` was
  "the most appropriate solution".

  Randall then confirmed that `%p` worked on NonStop x86 even if the
  man pages warned to the contrary.

  The `%p` solution was eventually merged to the 'master' branch.

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

+ Git [2.51.2](https://lore.kernel.org/git/xmqqo6psjq2n.fsf@gitster.g/),
[2.51.1](https://lore.kernel.org/git/xmqqa51suhh5.fsf@gitster.g/)
+ Git for Windows [v2.51.2(1)](https://github.com/git-for-windows/git/releases/tag/v2.51.2.windows.1),
[v2.51.1(1)](https://github.com/git-for-windows/git/releases/tag/v2.51.1.windows.1),
[v2.51.0(2)](https://github.com/git-for-windows/git/releases/tag/v2.51.0.windows.2)
+ GitHub Enterprise [3.18.0](https://docs.github.com/enterprise-server@3.18/admin/release-notes#3.18.0)
+ GitLab [18.5.1, 18.4.3, 18.3.5](https://about.gitlab.com/releases/2025/10/22/patch-release-gitlab-18-5-1-released/),
[18.5](https://about.gitlab.com/releases/2025/10/16/gitlab-18-5-released/),
[18.4.2, 18.3.4, 18.2.8](https://about.gitlab.com/releases/2025/10/08/patch-release-gitlab-18-4-2-released/)
+ Gerrit Code Review [3.10.9](https://www.gerritcodereview.com/3.10.html#3109),
[3.13.0-rc0](https://www.gerritcodereview.com/3.13.html#3130),
[3.13.0-rc1](https://www.gerritcodereview.com/3.13.html#3130),
[3.13.0-rc2](https://www.gerritcodereview.com/3.13.html#3130),
[3.13.0-rc3](https://www.gerritcodereview.com/3.13.html#3130),
[3.13.0-rc4](https://www.gerritcodereview.com/3.13.html#3130),
[3.13.0-rc5](https://www.gerritcodereview.com/3.13.html#3130)
+ GitKraken [11.5.1](https://help.gitkraken.com/gitkraken-desktop/current/),
[11.5.0](https://help.gitkraken.com/gitkraken-desktop/current/)
+ GitHub Desktop [3.5.3](https://desktop.github.com/release-notes/)
+ Git Cola [4.16.0](https://github.com/git-cola/git-cola/releases/tag/v4.16.0)
+ GitButler [0.16.10](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.16.10),
[0.16.9](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.16.9)
+ Kinetic Merge [1.10.0](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.10.0),
[1.9.1](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.9.1)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
