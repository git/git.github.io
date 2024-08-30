---
title: Git Rev News Edition 114 (August 31st, 2024)
layout: default
date: 2024-08-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 114 (August 31st, 2024)

Welcome to the 114th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of July 2024 and August 2024.

## Discussions

<!---
### General
-->

### Reviews

* [[PATCH] ReviewingGuidelines: encourage positive reviews more](https://lore.kernel.org/git/xmqqsevysdaa.fsf@gitster.g/)

  Junio Hamano, the Git maintainer, sent a patch to the mailing list
  which updated the ReviewingGuidelines.txt documentation with the
  goal of encouraging positive reviews even more.

  The ReviewingGuidelines.txt documentation was
  [created a few years ago](https://lore.kernel.org/git/pull.1348.v2.git.1663614767058.gitgitgadget@gmail.com/)
  by Victoria Dye to provide "consistent definitions for common
  review terminology" and to give advice to reviewers, in a similar
  way as the MyFirstContribution documentation gives advice to
  contributors.

  The few paragraphs that Junio's patch added said that positive
  reviews are highly encouraged, even when the author is a work
  colleague. They show that people other than the author(s) of the
  reviewed patches care about the issue that is addressed.

  When writing positive reviews, reviewers should tell why they
  support the patches, and should show that they understand the issue
  and how the patches address it. They are also encouraged to describe
  how they understand complex parts of the patches.

  Junio's patch also adds a small paragraph saying that "uplifting
  feedback goes a long way towards encouraging contributors to
  participate more actively in the Git community."

  Eric Sunshine then replied to Junio pointing a minor typo in his
  patch. Patrick Steinhardt replied to Junio too. He said that he had
  already guided some of his GitLab colleagues who review patches
  and suggested them to do what Junio describes.

  Derrick Stolee, who prefers to be called Stolee, replied to Patrick
  agreeing with him and saying that it also helps to not have internal
  reviews for experienced contributors. He said that they used to have
  internal reviews at Microsoft but it was overly cautious and "loses
  the benefits of doing reviews in the open".

  Patrick replied to Stolee saying that GitLab also used to have an
  internal review, but it recently became optional and recommended
  only for people who are not yet familiar with the mailing list
  workflow.

  Junio then sent
  [a version 2](https://lore.kernel.org/git/xmqqle1pjwtt.fsf@gitster.g/)
  of the patch fixing small typos. Patrick reviewed this version
  and found it good, so it was later merged into the 'master' branch.

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

+ Gerrit Code Review [3.10.1](https://www.gerritcodereview.com/3.10.html#3101),
[3.8.8](https://www.gerritcodereview.com/3.8.html#388),
[3.9.6](https://www.gerritcodereview.com/3.9.html#396)
+ GitHub Enterprise [3.14.0](https://help.github.com/enterprise-server@3.14/admin/release-notes#3.14.0),
[3.13.3](https://help.github.com/enterprise-server@3.13/admin/release-notes#3.13.3),
[3.12.8](https://help.github.com/enterprise-server@3.12/admin/release-notes#3.12.8),
[3.11.14](https://help.github.com/enterprise-server@3.11/admin/release-notes#3.11.14),
[3.10.16](https://help.github.com/enterprise-server@3.10/admin/release-notes#3.10.16)
+ GitLab [17.3.1, 17.2.4, 17.1.6](https://about.gitlab.com/releases/2024/08/21/patch-release-gitlab-17-3-1-released/)
[17.3](https://about.gitlab.com/releases/2024/08/15/gitlab-17-3-released/),
[17.2.2, 17.1.4, 17.0.6](https://about.gitlab.com/releases/2024/08/07/patch-release-gitlab-17-2-2-released/)
+ GitKraken [10.2.0](https://help.gitkraken.com/gitkraken-client/current/)
+ GitHub Desktop [3.4.3](https://desktop.github.com/release-notes/)
+ git-credential-oauth [0.13.2](https://github.com/hickford/git-credential-oauth/releases/tag/v0.13.2),
[0.13.1](https://github.com/hickford/git-credential-oauth/releases/tag/v0.13.1)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
