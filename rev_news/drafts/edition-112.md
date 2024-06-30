---
title: Git Rev News Edition 112 (June 30th, 2024)
layout: default
date: 2024-06-30 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 112 (June 30th, 2024)

Welcome to the 112th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of May 2024 and June 2024.

## Discussions

<!---
### General
-->

### Reviews

* [[RFC PATCH] docs: document upcoming breaking changes](https://lore.kernel.org/git/fc1a9fa03de7330f79dc56b0f2712834cb236b5a.1715070296.git.ps@pks.im/)

  Patrick Steinhardt sent an RFC patch to the mailing list that
  created a new "UpcomingBreakingChanges.md" document. The goal of the
  document was to inform users and developers of deprecations and
  breaking changes, and to encourage discussion of the direction of
  the project regarding these topics in advance.

  Patrick noted that the changes listed in the document, along with
  links to mailing list threads where they had been discussed, were a
  work in progress with controversial and missing items, and that he
  didn't want to push for a Git 3.0 release with the listed changes
  soon.

  The idea for that new document had been discussed previously
  [in a thread about a patch series from Patrick](https://lore.kernel.org/git/ZjiL7vu5kCVwpsLd@tanuki/)
  that introduced subcommands like `get`, `set`, etc, in `git config`.
  In that thread, after Patrick asked if we wanted to introduce a
  document to keep track of upcoming removals for a potential Git 3.0
  release, Junio Hamano, the Git maintainer, replied to Patrick that
  in a few of his ["What's cooking" emails](https://lore.kernel.org/git/?q=s%3A%22What%27s+cooking+in+git.git%22)
  before the Git 2.44.0 release, he wrote:

  > It may not be a bad idea to reflect on what technical debt and UI
  > warts we have accumulated so far to see if we have enough of them to
  > start planning for a breaking Git 3.0 release (or, of course, keep
  > incrementally improve the system, which is much more preferable --
  > continuity and stability is good).

  So Junio was happy that "somebody has bit it ;-)" and suggested a
  number of topics that could be added to the document Patrick wanted
  to create. This started a discussion about deprecating or not some
  features like the `restore`, `switch`, `submodules` and `worktrees`
  subcommands.

  In the RFC patch to add the document, Patrick mentioned some of the
  topics suggested by Junio, but not others that seemed controversial
  in the previous discussion.

  Johannes Schindelin, alias Dscho, replied to Patrick's RFC patch
  saying he loved it. Dscho also gave his opinion about the topics,
  and suggested to deprecate or remove additional rarely used
  features.

  Junio replied to Patrick's patch suggesting to add features that we
  don't want to drop and why, and to mention that we deprecate but,
  for backward compatibility, rarely remove old ways to do things.
  Patrick agreed to Junio's suggestion and proposed a "superseded"
  section for the features we don't want to drop.

  Dragan Simic, who participated in the previous discussions in the
  `git config` thread, repeated that he didn't want to see neither
  `git restore`, `git switch` or `git checkout` deprecated, which
  Patrick agreed shouldn't be done.

  Phillip Wood, replying to Patrick's patch, asked if the document
  should track the progress of some unfinished work, like the config
  based hooks implementation, but Patrick said he was planning on
  creating a separate document for long running projects, projects
  already discussed and perhaps also small or micro projects to help
  newcomers looking for something to work on too.

  Justin Tobler also replied to Patrick's patch suggesting adding the
  removal of double dot and triple dot syntax (".." and "...") from
  `git diff` to the document. This was discussed by Junio and Patrick
  but, as it would need a lot more work, Patrick decided to not add it
  to the document for now.

  Patrick then sent a
  [version 2 of his patch](https://lore.kernel.org/git/2ef53ff98b12fe9373a15ec3a795235f040d9049.1715667067.git.ps@pks.im/)
  which added section about features "that are _not_ to be
  deprecated". Some features were also added while deprecating the
  hook directory was removed for now.

  Karthik Nayak replied to the version 2 patch listing a number of
  commands not mentioned in the document that do similar things which
  might indicate that some of them could be deprecated too. Patrick,
  Junio and Dragan discussed these commands, but decided that only
  `git pickaxe`, which is an alias for `git blame` could be removed
  for now.

  So Patrick sent a
  [version 3 of his patch](https://lore.kernel.org/git/84c01f1b0a2d24d7de912606f548623601c0d715.1716555034.git.ps@pks.im/)
  which only added the removal of `git pickaxe`.

  Junio replied to this version 3 with a lot of comments to discuss
  how each item was justified and how we could improve on justifying
  items in general. Patrick then agreed on ways to improve the
  document.

  Patrick sent a
  [version 4](https://lore.kernel.org/git/cover.1717141598.git.ps@pks.im/)
  where the single patch had been broken down into 4 patches. In the
  process a lot of the proposed deprecation from the previous version
  were removed and the document name was changed from
  "UpcomingBreakingChanges.md" to "BreakingChanges.md" as some changes
  listed in the "Superseded features that will not be deprecated"
  section should not be considered as upcoming.

  The goal was to introduce the document in a skeletal form in the
  first patch and then add only one item to each of the three sections
  in the following patches. This way each of the last 3 patches should
  be an example of how other items should later be added to the
  document.

  Junio, Patrick and Todd Zullinger then discussed relatively small
  improvements to the form and content of the document.

  Patrick sent a
  [version 5 of the patch series](https://lore.kernel.org/git/cover.1717402497.git.ps@pks.im/)

  where the main change was that the document was converted to
  AsciiDoc instead of MarkDown and renamed from "BreakingChanges.md"
  to "BreakingChanges.txt" for format compatibility with most other
  documents in the codebase.

  Junio, Phillip Wood and Patrick discussed other small improvements
  which Patrick integrated into the
  [version 6 of the patch series](https://lore.kernel.org/git/cover.1717504292.git.ps@pks.im/).

  Junio then suggested a few more small improvements which Patrick
  integrated into the
  [version 6 of the patch series](https://lore.kernel.org/git/cover.1718345026.git.ps@pks.im/)
  which was later merged into the 'master' branch.

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

+ Git [2.45.2 and friends to unbreak "git lfs" and others](https://public-inbox.org/git/xmqqr0dheuw5.fsf@gitster.g/)
+ Git for Windows [2.45.2(1)](https://github.com/git-for-windows/git/releases/tag/v2.45.2.windows.1)
+ GitHub Enterprise [3.13.0](https://help.github.com/enterprise-server@3.13/admin/release-notes#3.13.0),
[3.12.5](https://help.github.com/enterprise-server@3.12/admin/release-notes#3.12.5),
[3.11.11](https://help.github.com/enterprise-server@3.11/admin/release-notes#3.11.11),
[3.10.13](https://help.github.com/enterprise-server@3.10/admin/release-notes#3.10.13),
[3.9.16](https://help.github.com/enterprise-server@3.9/admin/release-notes#3.9.16)
+ GitLab [17.1.1, 17.0.3, 16.11.5](https://about.gitlab.com/releases/2024/06/26/patch-release-gitlab-17-1-1-released/),
[17.1](https://about.gitlab.com/releases/2024/06/20/gitlab-17-1-released/),
[17.0.2, 16.11.4, 16.10.7](https://about.gitlab.com/releases/2024/06/12/patch-release-gitlab-17-0-2-released/)
+ GitKraken [10.0.2](https://help.gitkraken.com/gitkraken-client/current/)
+ GitHub Desktop [3.4.2](https://desktop.github.com/release-notes/),
[3.4.1](https://desktop.github.com/release-notes/)
+ Tower for Mac 12.0 (BETA) — [Release blog post](https://www.git-tower.com/blog/tower-mac-12/)
+ garden [1.7.0](https://github.com/garden-rs/garden/releases/tag/v1.7.0),
[1.6.0](https://github.com/garden-rs/garden/releases/tag/v1.6.0)
+ git-cola [4.8.0](https://github.com/git-cola/git-cola/releases/tag/v4.8.0)
+ git-credential-oauth [0.12.1](https://github.com/hickford/git-credential-oauth/releases/tag/v0.12.1),
[0.12.0](https://github.com/hickford/git-credential-oauth/releases/tag/v0.12.0)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Bruno Brito, David Aguilar and Dragan Simic.
