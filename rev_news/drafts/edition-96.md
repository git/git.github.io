---
title: Git Rev News Edition 96 (February 22nd, 2023)
layout: default
date: 2023-02-22 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 96 (February 22nd, 2023)

Welcome to the 96th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of February 2023 and January 2023.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->


### Support

* [bug?: ORIG_HEAD incorrect after reset during git-rebase -i](https://lore.kernel.org/git/CA+JQ7M-ynq1cLN-3ZodXae=x-H5k7Ab6uPBwUFhG+kgtOvCgtA@mail.gmail.com/)

  Erik Cervin Edin sent an email to the mailing list with steps to
  reproduce a behavior that he didn't like. The steps consisted in an
  interactive rebase during which a commit was edited and a reset was
  performed while editing the commit.

  After editing, `git rebase --continue` finished the rebase. But then
  Erik expected `ORIG_HEAD` to point to the tip
  of the rebased branch before the rebase, while instead it pointed to
  the HEAD before the reset.

  `ORIG_HEAD` is one of the pseudo-references that some Git commands
  use, like `FETCH_HEAD`, `MERGE_HEAD` and a few others.

  Phillip Wood replied to Erik saying that it was expected that `git
  reset` would change `ORIG_HEAD` to `HEAD` just before it was
  performed. He suggested using the reflog with something like
  `branch-name@{1}` where `branch-name` is the branch that was
  rebased and the `@{1}` part indicates the previous entry in the
  reflog for the branch.

  Erik replied that he knew about the reflog but just expected
  `ORIG_HEAD` to be reset to `.git/rebase-merge/orig-head` at the end of
  the rebase. `.git/rebase-merge/orig-head` is an internal file that
  stores the tip of the branch before it was rebased.

  Philippe Blain replied to Erik that he just hit the same bug. He
  also said that he was confused by the rebase documentation and gave
  the series of commands he used to get hit.

  Phillip Wood replied to both Erik and Philippe Blain that if we
  changed the behavior to make `ORIG_HEAD` point to the tip of the
  branch before it was rebased, some people might not be happy as they
  might expect `git reset` to have changed `ORIG_HEAD`. Other people
  might expect on the contrary that `ORIG_HEAD` was always set to the
  tip of the branch before the rebase when the rebase stoped, which
  would mean that `git rebase --continue` would always need to make
  sure `ORIG_HEAD` fulfills that expectation.

  Phillip said he thought the situation was confusing and he didn't
  see a way to make it clearer.

  Philippe Blain agreed that some people might rely on the current
  behavior and said he would send documentation updates to make things
  clearer.

  He then sent
  [a patch series](https://lore.kernel.org/git/pull.1456.git.1673120359.gitgitgadget@gmail.com/)
  consisting of small changes to the documentation of a number of
  commands: `cherry-pick`, `merge`, `rebase` and `reset`, as well as
  in the [documentation about Git revisions](https://git-scm.com/docs/gitrevisions).

  Junio Hamano, the Git maintainer, commented on some wordings which
  after short discussions led Philippe to send
  [a version 2 of his series](https://lore.kernel.org/git/pull.1456.v2.git.1673356521.gitgitgadget@gmail.com/)
  with very few changes.

  This version was accepted and later merged into the master branch.

<!---
## Developer Spotlight:
-->

## Releases

+ Git [2.40.0-rc0](https://public-inbox.org/git/xmqq7cw6yfpt.fsf@gitster.g/),
[2.39.2 and friends](https://public-inbox.org/git/xmqqr0us5dio.fsf@gitster.g/)
+ Git for Windows [2.39.2(1)](https://github.com/git-for-windows/git/releases/tag/v2.39.2.windows.1)
+ libgit2 [1.6.1](https://github.com/libgit2/libgit2/releases/tag/v1.6.1),
[1.5.2](https://github.com/libgit2/libgit2/releases/tag/v1.5.2)
+ Bitbucket Server [8.8](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ Gerrit Code Review [3.5.5](https://www.gerritcodereview.com/3.5.html#355),
[3.6.4](https://www.gerritcodereview.com/3.6.html#364),
[3.7.1](https://www.gerritcodereview.com/3.7.html#371)
+ GitHub Enterprise [3.7.6](https://help.github.com/enterprise-server@3.7/admin/release-notes#3.7.6),
[3.6.9](https://help.github.com/enterprise-server@3.6/admin/release-notes#3.6.9),
[3.5.13](https://help.github.com/enterprise-server@3.5/admin/release-notes#3.5.13),
[3.4.16](https://help.github.com/enterprise-server@3.4/admin/release-notes#3.4.16),
[3.8.0](https://help.github.com/enterprise-server@3.8/admin/release-notes#3.8.0),
[3.7.5](https://help.github.com/enterprise-server@3.7/admin/release-notes#3.7.5),
[3.6.8](https://help.github.com/enterprise-server@3.6/admin/release-notes#3.6.8),
[3.5.12](https://help.github.com/enterprise-server@3.5/admin/release-notes#3.5.12),
[3.4.15](https://help.github.com/enterprise-server@3.4/admin/release-notes#3.4.15)
+ GitLab [15.9.1](https://about.gitlab.com/releases/2023/02/24/gitlab-15-9-1-released/)
[15.9](https://about.gitlab.com/releases/2023/02/22/gitlab-15-9-released/),
[15.8.2, 15.7.7 and 15.6.8](https://about.gitlab.com/releases/2023/02/14/critical-security-release-gitlab-15-8-2-released/),
[15.8.3](https://about.gitlab.com/releases/2023/02/14/gitlab-15-8-3-released/),
[15.8.1](https://about.gitlab.com/releases/2023/01/31/security-release-gitlab-15-8-1-released/)
+ GitKraken [9.1.1](https://help.gitkraken.com/gitkraken-client/current/),
[9.1.0](https://help.gitkraken.com/gitkraken-client/current/)
+ GitHub Desktop [3.1.8](https://desktop.github.com/release-notes/),
[3.1.7](https://desktop.github.com/release-notes/),
[3.1.6](https://desktop.github.com/release-notes/)
+ tig [2.5.8](https://github.com/jonas/tig/releases/tag/tig-2.5.8)
+ Tower for Mac [9.2](https://www.git-tower.com/release-notes/mac?show_tab=release-notes)
+ Tower for Windows [4.2](https://www.git-tower.com/release-notes/windows?show_tab=release-notes) ([blog post](https://www.git-tower.com/blog/tower-win-4-2/))

## Other News

__Various__


__Light reading__

<!---
__Easy watching__
-->

__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
