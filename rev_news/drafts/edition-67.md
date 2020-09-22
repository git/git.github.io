---
title: Git Rev News Edition 67 (September 23rd, 2020)
layout: default
date: 2020-09-23 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 67 (September 23rd, 2020)

Welcome to the 67th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of August 2020.

## Discussions

### General

* [GSoC 2020 End](https://summerofcode.withgoogle.com/organizations/4722049416691712/#projects)

  The Google Summer of Code 2020 officially ended on September 8,
  2020. Congratulations to the three students who were mentored by the
  Git community, as they successfully passed all the
  evaluations! Their final reports and code submissions are available:

  * Hariom Verma, who was mentored by Heba Waly and Christian Couder,
    worked on ["Unify ref-filter formats with other --pretty formats"](https://harry-hov.github.io/blogs/posts/the-final-report).

  * Abhishek Kumar, who was mentored by Jakub Narębski and D. Stolee,
    worked on ["Implement Generation Number v2"](https://github.com/abhishekkumar2718/GSoC20/blob/master/README.md).

  * Shourya Shukla, who was mentored by Kaartic Sivaraam and Christian Couder,
    worked on ["Convert submodule to builtin"](https://shouryashukla.blogspot.com/2020/08/the-final-report.html).

### Reviews

* [[RFC PATCH 0/2]extend --abbrev support to diff-patch format](https://lore.kernel.org/git/cover.1596887883.git.congdanhqx@gmail.com/)

  Đoàn Trần Công Danh sent a small RFC patch series that made the diff
  machinery, which is used by `git diff` and similar commands, support
  the `--abbrev` option when it shows a patch.

  The diff machinery can produce 3 different kinds of output. The
  first one is called the "diff-raw" format, and is used when `--raw`
  option is passed. The second one is called the "diff-tree" format,
  and is used by `git diff-tree`. The third one is called the
  "diff-patch" format, and is used when showing regular diffs in a
  similar way as the
  [unified format of the Unix `diff` command](https://en.wikipedia.org/wiki/Diff#Unified_format).

  The `--abbrev` option allowed customizing the length of object names
  displayed in the "diff-raw" and "diff-tree" formats. In these
  formats, object names only appear in header lines like:

  ```
  :100644 100644 86e5411f39 f1b1bc8aa0 M  Makefile
  ```

  In the "diff-patch" format, object names only appear in the index
  line, which looks like:

  ```
  index 4adb9ce124..67d9801da3 100644
  ```

  "diff-patch" was the only format that didn't already support the
  `--abbrev` option, so Đoàn's patch series actually made the diff
  machinery and related git commands like `git diff` more consistent.

  "diff-patch" already supported an option called `--full-index` that
  can be used to display full object names in the index line though.

  In the cover letter of his RFC patch series, Đoàn tried to explain
  how the changes would improve his workflow when dealing with
  patches. But Junio Hamano and Jeff King, alias Peff, replied saying
  that they had trouble understanding the purpose of the series from
  the explanations in the cover letter.

  A discussion followed in which Peff and Junio suggested using
  `--full-index` in Đoàn's workflow. A consensus was reached though
  that Đoàn's patch series was worth moving forward anyway as it
  improved consistency between the diff formats.

  So Đoàn sent a
  [version 2](https://lore.kernel.org/git/cover.1597146478.git.congdanhqx@gmail.com/)
  of his patch series with only changes in the cover letter and in the
  commit message of the second patch.

  Junio replied to the first patch of the series though. This patch
  changed how "--no-abbrev" was dealt with. Junio asked for
  clarifications in the commit message, especially about why the patch
  was necessary.

  So Đoàn sent a
  [version 3](https://lore.kernel.org/git/cover.1597364493.git.congdanhqx@gmail.com/)
  of his patch series with only changes in the commit message of the
  first patch. After further discussion with Junio, it appears that
  the patch was not actually necessary.

  In the meantime though Gábor Szeder found that the tests in the
  second patch were failing when run with
  GIT_TEST_DEFAULT_HASH=sha256. This setting makes Git use the
  [SHA-256 hash algorithm](https://en.wikipedia.org/wiki/SHA-2)
  instead of the usual
  [SHA-1 hash algorithm](https://en.wikipedia.org/wiki/SHA-1)
  for object names.

  A discussion about the best approach to fix this then followed
  between Đoàn, Junio and Brian M. Carlson, who has been working for a
  long time on implementing support for SHA-256 in Git.

  Đoàn eventually sent a
  [version 4](https://lore.kernel.org/git/cover.1597926783.git.congdanhqx@gmail.com/)
  of his patch series, where the first patch of his version 3 had been
  discarded, but a new patch to improve handling of SHA-256 object
  names in the tests replaced it.

  Junio and Đoàn discussed further improvements to the commit messages
  of both patches. Then Đoàn sent a
  [version 5](https://lore.kernel.org/git/cover.1598010556.git.congdanhqx@gmail.com/)
  taking these improvements into account.

  The patch series has since been merged into the 'master' branch.

<!---
### Support
-->

## Developer Spotlight: Đoàn Trần Công Danh

* Who are you and what do you do?

  I'm just another average developer addicted to exotic environment.
  Outside of my $dayjobs, I maintain Git and some other packages for
  VoidLinux.

* What would you name your most important contribution to Git?

  I would consider fixing remaining problems with musl libc my most
  important contributions to Git,  since I mostly stay inside my musl
  box these days.

* What are you doing on the Git project these days, and why?

  I mostly watch for sideline these days, since I'm busy with other
  things. Occasionally, I jump in one or two discussion since that topic
  looks relevant to me. Sometimes, I write a patch or two to support my
  own jobs.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  I don't have anything specific in mind, except the transition into the
  new hash algorithm, brian m. carlson has done a very good job, and
  I understand the transition would require a long transition period,
  testing, a lot of testing.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  The diff to merge-base notation (upstream...fork) of diff family.
  This has been floating in the mailing list for a while, and I won't
  waste this opportunity to not mention it again.

  There's an on-going change from Denton Liu to [support `--merge-base`](https://public-inbox.org/git/cover.1600600823.git.liu.denton@gmail.com/)
  into diff family. Hopefully, people can retrain their brain-muscles to
  use this new option instead.

## Releases

+ GitHub Enterprise [2.22.0](https://enterprise.github.com/releases/2.22.0/notes),
[2.21.7](https://enterprise.github.com/releases/2.21.7/notes),
[2.20.16](https://enterprise.github.com/releases/2.20.16/notes),
[2.19.22](https://enterprise.github.com/releases/2.19.22/notes),
[2.21.6](https://enterprise.github.com/releases/2.21.6/notes),
[2.20.15](https://enterprise.github.com/releases/2.20.15/notes),
[2.19.21](https://enterprise.github.com/releases/2.19.21/notes)
+ GitLab [13.3.6](https://about.gitlab.com/releases/2020/09/14/gitlab-13-3-6-released/),
[13.3.5](https://about.gitlab.com/releases/2020/09/04/gitlab-13-3-5-released/),
[13.3.4](https://about.gitlab.com/releases/2020/09/02/security-release-gitlab-13-3-3-released/),
[13.3.2](https://about.gitlab.com/releases/2020/08/28/gitlab-13-3-2-released/),
[13.3.1](https://about.gitlab.com/releases/2020/08/25/gitlab-13-3-1-released/)
+ Bitbucket Server [7.6](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ GitKraken [7.3.2](https://support.gitkraken.com/release-notes/current),
[7.3.1](https://support.gitkraken.com/release-notes/current),
[7.3.0](https://support.gitkraken.com/release-notes/current)
+ GitHub Desktop [2.5.5](https://desktop.github.com/release-notes/)

## Other News

__Various__


__Light reading__

* Arista Networks, a Fortune 500 company, has rolled out mandatory
  commit signing across their git repositories. Read about their
  journey at
  <https://eos.arista.com/commit-signing-with-git-at-enterprise-scale/>
  and learn about how they:
  * Manage code signing keys across a large company
  * Enforce that all commits are signed
  * Audit git repositories to ensure that no unsigned commits are added

__Git tools and sites__

* [ugit: DIY Git in Python](https://www.leshenko.net/p/ugit/#) is a
  tutorial to help learn about Git internals by building an
  implementation of Git in Python.

* [grokmirror-2.0](https://lore.kernel.org/git/20200921170651.aszbydzvnj7l4y2w@chatter.i7.local/)
  is a Git mirroring software announced by Konstantin Ryabitsev on the
  Git mailing list. It was developed by kernel.org for its own use.

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Ethan Rahn.
