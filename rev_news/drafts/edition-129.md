---
title: Git Rev News Edition 129 (November 30th, 2025)
layout: default
date: 2025-11-30 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 129 (November 30th, 2025)

Welcome to the 129th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of October and November 2025.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

### Support

+ [[Bug report] git cherry-pick silently ignores error whereas git apply fails for hunk apply](https://lore.kernel.org/git/CAEyHQXWd77_jJachC6FYbWMJ+L=KkKoUqiACQ7z8r-ZwYq8JYw@mail.gmail.com/)

  Bhavik Bavishi filed and sent a bug report to the mailing
  list. Running `git cherry-pick` failed to apply some changes but
  didn't report any error. On the contrrary when creating a patch
  using `git format-patch` from the same commit and applying it using
  `git apply --verbose`, the latter command also failed to apply the
  same changes but errored out. It seemed that there shouldn't be such
  a behavior discrepancy and that `git cherry-pick` should have
  reported an error too.

  Johannes Sixt, suggested using `git apply --3way` to apply the
  patch. He was interested not only on the success or failure of the
  command but also on the end result of applying the patch. Was that
  end result similar as the result from `git cherry-pick` or
  different?

  Bhavik reported back that indeed `git apply --3way` succeeded and
  produced the same end result as `git cherry-pick`. Even if it looked
  like `git cherry-pick` worked as expected, that still seemed a
  strange behavior though.

  Johannes Sixt replied that a merge strategy is used by both
  `git cherry-pick` and `git apply --3way`. Unlike a simple patch
  application, a merge strategy is intelligent enough to detect if a
  change has already been applied. He illustrated this with an example
  where text repeats in a file, but only specific instances are
  modified.

  In the meantime, Chris Torek also replied to Bhavik providing a
  wealth of explanations. He explained that `git apply` works with a
  *patch*, which is essentially a "we expect the file looks like this"
  instruction. If the file doesn't match the expected context lines
  exactly, the patch fails.

  In contrast, `git cherry-pick` performs a *3-way merge*. It locates
  a "common base version" (the ancestor), compares it to "Ours"
  (current branch), and "Theirs" (the commit being picked) . If the
  merge logic sees that "Theirs" introduces a change that "Ours" has
  already made, it silently discards the duplicate change rather than
  erroring out. This confirms that the command was working as
  intended, using the full history to resolve what looked like a
  conflict to the simpler `git apply` tool.

  Bhavik thanked Chris for the helpful explanations.

<!---
## Developer Spotlight:
-->

## Other News

__Various__


__Light reading__
- [Version Control in the Age of AI: The Complete Guide](https://www.git-tower.com/blog/version-control-in-the-age-of-ai)
<!---
__Easy watching__
-->

__Git tools and sites__


## Releases

+ Git [2.52.0](https://lore.kernel.org/git/xmqqh5usmvsd.fsf@gitster.g/),
[2.52.0-rc2](https://lore.kernel.org/git/xmqqzf8rqihh.fsf@gitster.g/),
[2.52.0-rc1](https://lore.kernel.org/git/xmqqqzubhyj9.fsf@gitster.g/),
[2.52.0-rc0](https://lore.kernel.org/git/xmqqwm47t4x3.fsf@gitster.g/)
+ Git for Windows [v2.52.0(1)](https://github.com/git-for-windows/git/releases/tag/v2.52.0.windows.1),
[v2.52.0-rc2(1)](https://github.com/git-for-windows/git/releases/tag/v2.52.0-rc2.windows.1),
[v2.52.0-rc1(1)](https://github.com/git-for-windows/git/releases/tag/v2.52.0-rc1.windows.1),
[v2.52.0-rc0(1)](https://github.com/git-for-windows/git/releases/tag/v2.52.0-rc0.windows.1)
+ GitLab [18.6.1, 18.5.3, 18.4.5](https://about.gitlab.com/releases/2025/11/26/patch-release-gitlab-18-6-1-released/),
[18.6](https://about.gitlab.com/releases/2025/11/20/gitlab-18-6-released/),
[18.5.2, 18.4.4, 18.3.6](https://about.gitlab.com/releases/2025/11/12/patch-release-gitlab-18-5-2-released/)
+ Bitbucket Data Center [10.1](https://confluence.atlassian.com/bitbucketserver/release-notes-872139866.html)
+ Gerrit Code Review [3.10.9](https://www.gerritcodereview.com/3.10.html#3109),
[3.11.6](https://www.gerritcodereview.com/3.11.html#3116),
[3.11.7](https://www.gerritcodereview.com/3.11.html#3117),
[3.12.3](https://www.gerritcodereview.com/3.12.html#3123),
[3.13.0-rc5](https://www.gerritcodereview.com/3.13.html#3130),
[3.13.0](https://www.gerritcodereview.com/3.13.html#3130),
[3.13.1](https://www.gerritcodereview.com/3.13.html#3131)
+ GitHub Enterprise [3.18.1](https://docs.github.com/enterprise-server@3.18/admin/release-notes#3.18.1),
[3.17.7](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.7),
[3.16.10](https://docs.github.com/enterprise-server@3.16/admin/release-notes#3.16.10),
[3.15.14](https://docs.github.com/enterprise-server@3.15/admin/release-notes#3.15.14),
[3.14.19](https://docs.github.com/enterprise-server@3.14/admin/release-notes#3.14.19)
+ GitKraken [11.6.0](https://help.gitkraken.com/gitkraken-desktop/current/)
+ GitHub Desktop [3.5.4](https://desktop.github.com/release-notes/)
+ Git Cola [4.16.1](https://github.com/git-cola/git-cola/releases/tag/v4.16.1)
+ GitButler [0.18.1](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.18.1),
[0.18.0](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.18.0)
+ Kinetic Merge [1.11.2](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.11.2),
[1.11.1](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.11.1),
[1.11.0](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.11.0)
+ Tower for Mac [15](https://www.git-tower.com/blog/tower-mac-15) ([YouTube tour](https://youtu.be/xTrxb2dJP8M))
+ Tower for Windows [10](https://www.git-tower.com/blog/tower-windows-10)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Bruno Brito.
