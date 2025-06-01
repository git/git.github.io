---
title: Git Rev News Edition 123 (May 31st, 2025)
layout: default
date: 2025-05-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 123 (May 31st, 2025)

Welcome to the 123rd edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of April and May 2025.

## Discussions

<!---
### General
-->


### Reviews

* [[PATCH] git: add --no-hooks global option](https://lore.kernel.org/git/pull.1899.git.1743719888430.gitgitgadget@gmail.com/)

  Derrick Stolee, who prefers to be called just Stolee, sent a patch
  to the mailing list that added a new `--no-hooks` global option and
  an equivalent `GIT_HOOKS` environment variable to Git. The goal was
  to allow users to disable all Git hooks during command execution.

  This could be useful for expert users who would want to bypass
  pre-commit hooks when they have poor performance or perform useless
  checks.

  Switching between enabled and disabled hooks and other workarounds,
  like setting `core.hooksPath` to a "bogus path", did not look
  convenient and very safe.

  brian m. carlson, who spell their name using only lowercase letters,
  replied to Stolee acknowledging the need for this functionality as
  some Jenkins users already set `core.hooksPath` to `/dev/null` for
  security reasons. They warned that disabling hooks could break
  [Git LFS](https://git-lfs.com/) in a way that is "less noticeable
  and detectable" than the current `/dev/null` approach.

  They agreed that certain hooks like pre-commit hooks should be
  optional, for example to make it easy to commit some
  work-in-progress that doesn't meet standards, but saw fewer reasons
  to bypass hooks that could be important for repository integrity.

  Stolee agreed that some hooks are important for integrity, but said
  his intention was on the side of optional hooks.

  Phillip Wood also replied to Stolee's initial email noting that
  there is already `git commit --no-verify` which bypasses the
  pre-commit and commit-msg hooks. He argued that hooks so slow that
  users want to bypass them are self-defeating and that the solution
  should be to fix the hook's performance rather than make it easier
  to skip. About setting `core.hooksPath` to `/dev/null`, he asked why
  it could be unsafe. In general he said he wasn't convinced that
  `--no-hooks` was a good idea, and later asked for "a clearer
  motivation" to better understand its usefulness.

  Stolee agreed that setting `core.hooksPath` to `/dev/null` was safe,
  and said he had forgotten that could be used instead of a bogus
  path.

  Junio Hamano, the Git maintainer, then replied to Phillip thanking
  him for pushing back on the idea, and saying that there should be a
  "compelling reason" to justify a change.

  Also instead of implementing options to disable hooks or
  configuration in some user facing "porcelain" commands, Junio
  advocated for cleaning up and refactoring these commands into new
  stable "plumbing" commands designed to be easily used in scripts.

  In the meantime, Lucas Seiki Oshiro replied to Phillip. Lucas had
  noticed that using `/dev/null` to disable hooks wasn't mentioned in
  the documentation of `core.hooksPath`, even though it was tested in a
  test script. He asked if Stolee's patch should therefore be turned
  into a documentation patch.

  brian agreed with Lucas that documenting how to disable hooks was a
  good idea even if the `--no-hooks` option wasn't implemented.

  D. Ben Knoble also replied to Stolee's initial patch. He supported
  the addition of the `--no-hooks` option, sharing his own
  frustrations with poorly performing or difficult-to-manage hooks. He
  described how a tool re-enables hooks after every `npm install`
  leading him to overuse `--no-verify`, which he considered a worse
  situation. He believed there should be a safe and sane way to
  disable optional client-side hooks and felt that a `--no-hooks`
  option would be useful, potentially encouraging better practices
  like moving certain checks to server-side hooks.

  Stolee then replied to Junio thanking him for deciding about this
  and saying he would follow up with a version 2 of his patch that
  would only document that setting `core.hooksPath` to `/dev/null` was
  the supported mechanism to disable hooks.

  In [the version 2 of his patch](https://lore.kernel.org/git/pull.1899.v2.git.1744818135435.gitgitgadget@gmail.com/),
  Stolee just updated the documentation of the `core.hooksPath`
  configuration option, adding the following small paragraph:

  > You can also disable all hooks entirely by setting `core.hooksPath`
  > to `/dev/null`. This is usually only advisable for expert users and
  > on a per-command basis using configuration parameters of the form
  > `git -c core.hooksPath=/dev/null ...`.

  Lucas replied to that new patch. He suggested rewording the
  documentation to focus on non-expert users rather than
  experts. Stolee disagreed, explaining he intentionally targeted
  expert users as a "there be dragons here" warning about the risks of
  disabling hooks.

  brian supported Stolee's approach, agreeing that this feature should
  be presented as expert-only due to the potential for data loss (like
  missing Git LFS uploads). He appreciated Stolee's gracious pivot
  from code changes to documentation.

  Junio also thanked Stolee for gracefully changing direction and
  ensuring no loose ends were left after abandoning the original
  approach.

<!---
### Support
-->

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

+ Git [2.50.0-rc0](https://public-inbox.org/git/xmqqzfewsml1.fsf@gitster.g/)
+ GitLab [18.0.1, 17.11.3, 17.10.7](https://about.gitlab.com/releases/2025/05/21/patch-release-gitlab-18-0-1-released/),
[18.0](https://about.gitlab.com/releases/2025/05/15/gitlab-18-0-released/),
[17.11.2, 17.10.6, 17.9.8](https://about.gitlab.com/releases/2025/05/07/patch-release-gitlab-17-11-2-released/)
+ Gerrit Code Review [3.10.6](https://www.gerritcodereview.com/3.10.html#3106),
[3.11.3](https://www.gerritcodereview.com/3.11.html#3113),
[3.12.0-rc5](https://www.gerritcodereview.com/3.12.html#3120),
[3.12.0-rc6](https://www.gerritcodereview.com/3.12.html#3120),
[3.12.0](https://www.gerritcodereview.com/3.12.html#3120),
[3.9.11](https://www.gerritcodereview.com/3.9.html#3911)
+ GitHub Enterprise [3.16.3](https://docs.github.com/enterprise-server@3.16/admin/release-notes#3.16.3),
[3.15.7](https://docs.github.com/enterprise-server@3.15/admin/release-notes#3.15.7),
[3.14.12](https://docs.github.com/enterprise-server@3.14/admin/release-notes#3.14.12),
[3.13.15](https://docs.github.com/enterprise-server@3.13/admin/release-notes#3.13.15),
[3.17.0](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.0)
+ GitKraken [11.1.1](https://help.gitkraken.com/gitkraken-client/current/),
[11.1.0](https://help.gitkraken.com/gitkraken-client/current/),
[11.0.0](https://help.gitkraken.com/gitkraken-client/current/)
+ GitHub Desktop [3.4.20](https://desktop.github.com/release-notes/)
+ Garden [2.2.0](https://github.com/garden-rs/garden/releases/tag/v2.2.0)
+ Git Cola [4.13.0](https://github.com/git-cola/git-cola/releases/tag/v4.13.0)
+ GitButler [0.14.26](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.14.26),
[0.14.25](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.14.25)
+ git-credential-oauth [0.15.1](https://github.com/hickford/git-credential-oauth/releases/tag/v0.15.1)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
