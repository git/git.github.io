---
title: Git Rev News Edition 45 (November 21st, 2018)
layout: default
date: 2018-11-21 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 45 (November 21st, 2018)

Welcome to the 45th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of October 2018.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

### Support

* [commit-graph is cool](https://public-inbox.org/git/CABPp-BECpSOxudovjbDG_3W9wus102RW+E+qPmd4g3Qyd-QDKQ@mail.gmail.com/)

  Elijah Newren sent an email to the mailing list that started with:

  > Just wanted to give a shout-out for the commit-graph work and how
  > impressive it is.

  He then describes a user with a repo where pushing a commit takes
  more than one minute. The repo was quite "unusual" as it had a lots
  of tag and the push.followTags config option was set to true. Elijah
  found that most of the time was spent in a add_missing_tags()
  function which called in_merge_bases_many() once per tag, which
  "seemed rather suboptimal", as in_merge_bases_many() does a commit
  traversal which is not cheap.

  Instead of optimizing this Elijah tried a development version of the
  commit-graph feature. The commit-graph feature itself is a quite
  recent feature in Git that was developed by Derrick Stolee, alias
  Stolee, who blogged about it:

    - [Supercharging the Git Commit Graph](https://blogs.msdn.microsoft.com/devops/2018/06/25/supercharging-the-git-commit-graph/)
    - [Supercharging the Git Commit Graph II: File Format](https://blogs.msdn.microsoft.com/devops/2018/07/02/supercharging-the-git-commit-graph-ii-file-format/)
    - [Supercharging the Git Commit Graph III: Generations and Graph Algorithms](https://blogs.msdn.microsoft.com/devops/2018/07/09/supercharging-the-git-commit-graph-iii-generations/)
    - [Supercharing the Git Commit Graph IV: Bloom Filters](https://blogs.msdn.microsoft.com/devops/2018/07/16/super-charging-the-git-commit-graph-iv-bloom-filters/)

  (These links were already provided in [Git Rev News edition 41 last July](https://git.github.io/rev_news/2018/07/18/edition-41/).
  Stolee has been interviewed in [Git Rev News edition 42 last August](https://git.github.io/rev_news/2018/08/22/edition-42/).)

  Elijah found that the commit-graph feature reduced the time of a
  `git push --dry-run` by a factor of over 100, from over a minute to
  sub-second, though this speed up came from making all the
  in_merge_bases_many() calls much faster, not from reducing the
  number of calls to this function.

  Stolee replied that the generation numbers feature in the
  commit-graph file is likely what makes the calls much faster, as it
  can often avoid commit traversals altogether.

  Jeff King, alias Peff, also replied to Elijah suggesting
  implementing an "all-points" traversal instead of many commit
  traversals. Peff also noticed that generation numbers might give a
  better answer in some cases as commit traversals are "susceptible to
  wrong answers due to clock skew".

  Stolee a few weeks later sent
  [a small patch series](https://public-inbox.org/git/pull.60.git.gitgitgadget@gmail.com/)
  to fix the behavior of the add_missing_tags() function by
  implementing a new get_reachable_subset() function which does "a
  many-to-many reachability test" and performs only one commit
  traversal.

  Junio Hamano, the Git maintainer, and Elijah then reviewed the patch
  series and discussed the implementation with Stolee.

  Elijah reported that the path series indeed improved the time of a
  dry-run push from around 1 minutes and 20 seconds to around 3
  seconds, but that it seemed that now the push was a little bit
  faster without the commit-graph feature. After discussing this with
  Stolee and other tests though Elijah reported that he had made a
  mistake in testing Stolee's patch series and that using the
  commit-graph feature was still faster even with the patch series.

  Ævar Arnfjörð Bjarmason also replied to Elijah's initial email to
  say that users can set the fetch.pruneTags config option to true to
  avoid accumulating local-only tags. Elijah then thanked Ævar for the
  suggestion.

  A few days later Stolee sent
  [a slightly improved version of his small patch series](https://public-inbox.org/git/pull.60.v2.git.gitgitgadget@gmail.com/).
  This version has recently been merged into the master branch, so it
  should be in the upcoming v2.20.0 Git release
  [scheduled for the beginning of December](https://tinyurl.com/gitCal).

<!---
## Developer Spotlight:
-->

## Releases

+ StGit [0.19](https://public-inbox.org/git/1541522776.3963181.1567641696.46EFA2E6@webmail.messagingengine.com)
+ libgit2 [0.27.7](https://github.com/libgit2/libgit2/releases/tag/v0.27.7),
[0.27.6](https://github.com/libgit2/libgit2/releases/tag/v0.27.6)
+ GitHub Enterprise [2.15.2](https://enterprise.github.com/releases/2.15.2/notes),
[2.14.9](https://enterprise.github.com/releases/2.14.9/notes),
[2.13.15](https://enterprise.github.com/releases/2.13.15/notes),
[2.12.23](https://enterprise.github.com/releases/2.12.23/notes),
[2.15.1](https://enterprise.github.com/releases/2.15.1/notes),
[2.14.8](https://enterprise.github.com/releases/2.14.8/notes),
[2.13.14](https://enterprise.github.com/releases/2.13.14/notes),
[2.12.22](https://enterprise.github.com/releases/2.12.22/notes)
+ GitLab [11.4.5](https://about.gitlab.com/2018/11/05/gitlab-11-4-5-released/),
[11.4.4](https://about.gitlab.com/2018/11/01/critical-security-release-gitlab-11-dot-4-dot-4-released/),
[11.4.3](https://about.gitlab.com/2018/10/29/security-release-gitlab-11-dot-4-dot-3-released/),
[11.4.0](https://about.gitlab.com/2018/10/22/gitlab-11-4-released/)
+ Gerrit Code Review [2.16](https://www.gerritcodereview.com/2.16.html),
[2.15.7](https://www.gerritcodereview.com/2.15.html#2157),
[2.14.17](https://www.gerritcodereview.com/2.14.html#21417)
+ GitKraken [4.1.1](https://support.gitkraken.com/release-notes/current),
[4.1.0](https://support.gitkraken.com/release-notes/current)
+ GitHub Desktop [1.5.0](https://desktop.github.com/release-notes/)
+ Sourcetree [3.0](https://product-downloads.atlassian.com/software/sourcetree/ReleaseNotes/Sourcetree_3.0.html)

## Other News

__Various__

* [Git Merge Contributor's Summit Jan 31, 2019, Brussels](https://public-inbox.org/git/20181109104202.GA8717@sigill.intra.peff.net)
  has been announced on the mailing list. All contributors to Git or related projects in the Git ecosystem are invited.

* [Outreachy interns](https://www.outreachy.org/alums/) for the
  December 2018 to March 2019 round have been announced. Two Outreachy
  interns will work on Git. Slavica Đukić mentored by Johannes
  Schindelin will work on turning `git add -i` into a built-in, while
  Tanushree Tumane co-mentored by Christian Couder and Johannes
  Schindelin will work on improving `git bisect`. GitHub will sponsor
  these internships.

* [Gerrit User Summit 2018, Summary Report](https://gitenterprise.me/2018/11/18/gerrit-user-summit-2018-2/) has been published.
  The Gerrit User Summit 2018 at Cloudera in Palo Alto has ended with
  over 80+ participants coming from all over the world. Main topics
  have been the release of Gerrit v2.16, support for Git protocol v2,
  Gerrit DevOps Analytics & Insights and the support for Kubernetes.

__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Gabriel Alcaras &lt;<gabriel.alcaras@telecom-paristech.fr>&gt;
with help from Luca Milanesio.
