---
title: Git Rev News Edition 104 (October 25th, 2023)
layout: default
date: 2023-10-25 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 104 (October 25th, 2023)

Welcome to the 104th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of September 2023 and October 2023.

## Discussions

### General

+ [Git Virtual Contributor’s Summit 2023](https://docs.google.com/document/d/1GKoYtVhpdr_N2BAonYsxVTpPToP1CgCS9um0K7Gx9gQ)

  A virtual summit happened on September 26th and 27th where the
  contributors discussed
  [topics that they had previously voted on](https://docs.google.com/spreadsheets/d/1EnhmTeEqRBlEI2pMAO3oZ4rO1xEwBzYp2vS4CMtvge8).
  Taylor Blau, who organized the summit, polished and then sent
  [the notes that were taken during the summit](https://lore.kernel.org/git/ZRregi3JJXFs4Msb@nand.local/#r)
  to the mailing list.


### Reviews

+ [[PATCH] diff --stat: add config option to limit filename width](https://lore.kernel.org/git/87badb12f040d1c66cd9b89074d3de5015a45983.1694446743.git.dsimic@manjaro.org/)

  Dragan Simic sent a patch to the mailing list that added a new
  `diff.statNameWidth=<width>` configuration option. The goal with
  this option was to make it possible to limit the width of the
  filepath part of the "stat" output of diff commands.

  The "stat" output of a diff command contains lines like for example:

  ```
  path/to/file.txt                         | 11 +++++++--
  ```

  where the "filepath" part, also called "name" or "filename" part, of
  that output is `path/to/file.txt` and the "graph" part is
  `11 +++++++--`.

  There were already a `diff.statGraphWidth=<width>` configuration
  option to limit the width of the graph part, and
  `--stat-name-width=<width>` and `--stat-graph-width=<width>` command
  line options to limit the width of the name and graph part
  respectively. So it was logical to add the missing configuration
  option.

  These options are especially useful for people using very large
  terminals, to prevent stat output from using a lot of columns.

  The new `diff.statNameWidth=<width>` was designed to be ignored by
  `git format-patch`, in the same way as
  `diff.statGraphWidth=<width>`, because that command already respects
  the traditional 80-column standard.

  Before sending this patch, Dragan had sent
  [an RFC email](https://lore.kernel.org/git/eb8f524eca3975f086715ec32a8a1fbb@manjaro.org/)
  asking if such a patch would be accepted which led to an interesting
  discussion between him and Junio Hamano, the Git maintainer, about
  the fact that we often cannot promise anything about an hypothetical
  patch before actually seeing it on the mailing list.

  Junio reviewed the actual patch and wondered if it would be possible
  to specify contradictory values for the whole width on one side and
  the "name" and "graph" width on the other side. He also suggested
  creating a helper function to initialize all the variables that
  contain the values of the configuration options for the different
  parts, as the code initializing those variables was duplicated in
  the code of many Git commands.

  Dragan replied that the diff code already performed "a reasonable
  amount of sanity checks and value adjustments". He wondered if
  warnings should be emitted in case of contradictory settings though.

  Dragan then agreed that refactoring the code that initialized the
  variables would be nice, but he proposed to do it after the current
  patch would have been merged.

  Junio and Dragan agreed with doing the refactoring later and
  discussed a bit more if more changes were needed in this patch, but
  it appeared that it could be merged as is, and so it was.

  A few days later Dragan sent
  [a patch to refactor the code that initialized the variables](https://lore.kernel.org/git/166396f0a98e248fc3d1236757632c5d648ddc0b.1695364961.git.dsimic@manjaro.org/)
  Junio reviewed it and suggested some improvements which Dragan
  implemented in [a second version of the patch](https://lore.kernel.org/git/d45d1dac1a20699e370905b88b6fd0ec296751e7.1695441501.git.dsimic@manjaro.org/).

  This second version was also reviewed by Junio and then merged.

<!---
### Support
-->

<!---
## Developer Spotlight:
-->

## Other News

__Various__
* [New book “Boost Your Git DX”](https://adamchainz.gumroad.com/l/bygdx) by Git contributor Adam Johnson, covering tools and configuration to improve your command line workflow.

__Light reading__
+ [Investigating Git History](https://www.git-tower.com/blog/investigating-git-history/) by Kristian Lumme on Tower’s blog.
<!---
__Easy watching__
-->

__Git tools and sites__


## Releases

+ GitHub Enterprise [3.10.3](https://help.github.com/enterprise-server@3.10/admin/release-notes#3.10.3),
[3.9.6](https://help.github.com/enterprise-server@3.9/admin/release-notes#3.9.6),
[3.8.11](https://help.github.com/enterprise-server@3.8/admin/release-notes#3.8.11),
[3.7.18](https://help.github.com/enterprise-server@3.7/admin/release-notes#3.7.18)
+ GitLab [16.5](https://about.gitlab.com/releases/2023/10/22/gitlab-16-5-released/)
+ Bitbucket Server [8.15](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ GitKraken [9.9.2](https://help.gitkraken.com/gitkraken-client/current/),
[9.9.1](https://help.gitkraken.com/gitkraken-client/current/),
[9.9.0](https://help.gitkraken.com/gitkraken-client/current/)
+ GitHub Desktop [3.3.4](https://desktop.github.com/release-notes/)
+ TortoiseGit [2.15.0](https://tortoisegit.org/download/)
+ git-credential-oauth [0.11.0](https://github.com/hickford/git-credential-oauth/releases/tag/v0.11.0)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Bruno Brito, Adam Johnson and Sven Strickroth.
