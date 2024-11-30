---
title: Git Rev News Edition 117 (November 30th, 2024)
layout: default
date: 2024-11-30 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 117 (November 30th, 2024)

Welcome to the 117th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of October and November 2024.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

### Support

+ [Bug report: v2.47.0 cannot fetch version 1 pack indexes](https://lore.kernel.org/git/BA07EFA0-0793-420D-BED9-ACD7CEBE0112@townlong-yak.com/)

  Someone called 'fox' reported that when upgrading Git to v2.47.0
  from v2.46.2 or a previous version, cloning from their website,
  which uses the old "dumb HTTP" protocol, stopped working. With
  v2.47.0 there is an error message indicating that some index files
  "differ in contents".

  Using `git bisect` fox found the commit that introduced the
  issue. That commit implemented a check that verified that the index
  file downloaded from the remote was byte-for-byte identical with the
  index file generated locally from the Git objects downloaded as part
  of the clone.

  That check failed because the remote had an index in the version 1
  format, while the locally generated index was in a more recent
  format. And fox wondered if this was intentional.

  Eric Sunshine replied to fox that he could reproduce the problem.

  Jeff King, alias Peff, also replied to fox saying that the breakage
  was not intended. He thought that it was better to rely on the
  locally generated index, but that there should be no guarantee for
  it to be identical to the one downloaded.

  Peff proposed a draft patch that discarded the downloaded version
  before generating an index, but said it was hacky and didn't check
  that the content was the same. So he suggested a better solution.

  He then proposed an improved draft patch, which implemented the
  better solution he had suggested by marking the downloaded index as
  temporary and then discarding it after a new one is generated.

  Taylor Blau, who was the temporary Git maintainer while Junio
  Hamano, the usual maintainer, had some time off, replied to Eric and
  fox in the meantime confirming it was an unintentional breakage, and
  saying he was going to look at Peff's patches.

  Taylor then discussed with Peff the first draft patch and agreed
  with Peff that the solution implemented in the improved draft patch
  was better.

  So Taylor reviewed Peff's improved draft patch. He made some
  comments but found it good, and asked Peff to add a test and to
  propose it as a regular patch.

  Peff replied to Taylor's comments, proposed a draft test, and said
  he was going to work on a proper patch as well as some cleanups and
  refactors in the dumb HTTP code.

  Taylor found Peff's draft test "beautifully written".

  Peff then sent
  [a series made of 11 patches](https://lore.kernel.org/git/20241025064148.GA2110169@coredump.intra.peff.net/)
  to fix the issue, cleanup the dumb HTTP code and fix a couple of
  other bugs or potential bugs he found in the process.

  Taylor reviewed the patch series and discussed a few technical
  details with Peff. Overall he found the series good to go and
  eventually merged it.

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

+ Git [2.47.1](https://public-inbox.org/git/xmqq5xob6coo.fsf@gitster.g/)
+ Git for Windows [2.47.1(1)](https://github.com/git-for-windows/git/releases/tag/v2.47.1.windows.1)
+ libgit2 [1.8.4](https://github.com/libgit2/libgit2/releases/tag/v1.8.4)
+ Gerrit Code Review [3.10.3](https://www.gerritcodereview.com/3.10.html#3103),
[3.8.10](https://www.gerritcodereview.com/3.8.html#3810),
[3.9.8](https://www.gerritcodereview.com/3.9.html#398)
+ GitHub Enterprise [3.15.0](https://help.github.com/enterprise-server@3.15/admin/release-notes#3.15.0)
+ GitLab [17.6.1](https://about.gitlab.com/releases/2024/11/26/patch-release-gitlab-17-6-1-released/),
[17.6](https://about.gitlab.com/releases/2024/11/21/gitlab-17-6-released/),
[17.5.2](https://about.gitlab.com/releases/2024/11/13/patch-release-gitlab-17-5-2-released/)
+ GitKraken [10.5.0](https://help.gitkraken.com/gitkraken-client/current/)
+ GitHub Desktop [3.4.9](https://desktop.github.com/release-notes/)
+ Sourcetree [4.2.10](https://product-downloads.atlassian.com/software/sourcetree/ReleaseNotes/Sourcetree_4.2.10.html),
[4.2.9](https://product-downloads.atlassian.com/software/sourcetree/ReleaseNotes/Sourcetree_4.2.9.html)
+ Garden [1.9.1](https://github.com/garden-rs/garden/releases/tag/v1.9.1)
+ Git Cola [4.9.0](https://github.com/git-cola/git-cola/releases/tag/v4.9.0)
+ git-credential-oauth [0.13.4](https://github.com/hickford/git-credential-oauth/releases/tag/v0.13.4)
+ GitButler [0.14.0](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.14.0),
[0.13.17](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.13.17)
+ Tower for Windows [8.0](https://www.git-tower.com/release-notes/windows?show_tab=release-notes), [8.1](https://www.git-tower.com/release-notes/windows?show_tab=release-notes) ([Release blog post](https://www.git-tower.com/blog/tower-windows-8/))
+ Tower for Mac [12.3](https://www.git-tower.com/release-notes/mac?show_tab=release-notes)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Bruno Brito.
