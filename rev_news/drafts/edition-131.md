---
title: Git Rev News Edition 131 (January 31st, 2026)
layout: default
date: 2026-01-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 131 (January 31st, 2026)

Welcome to the 131st edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of December 2025 and January 2026.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

### Support

* [Would it make sense to add a commit.signOff config?](https://lore.kernel.org/git/86c5d40d-5a06-4a69-90d8-a737685b0536%40haller-berlin.de)

  Stefan Haller started the discussion by asking if it would be
  appropriate to add a `commit.signoff` configuration variable. He
  observed that while many Git commands, such as `merge`,
  `cherry-pick`, and `revert`, accept the `--signoff` argument, only
  `format-patch` has a corresponding configuration to enable it for
  all invocations. Stefan found it reasonable for users to want a
  "Signed-off-by" trailer added automatically to every commit they
  make. This question was prompted by his work on the `lazygit`
  project, which already includes such a configuration and had
  received a feature request to extend its behavior to the `revert`
  command.

  The "Signed-off-by" trailer is a formal certification that the
  contributor has the right to submit the work under the project's
  license, often associated with a Developer Certificate of Origin
  (DCO). While widely used in open-source projects to maintain a legal
  paper trail, its use in closed-source environments is less common.

  Carlo Marcelo Arenas Belón replied to Stefan, noting that a similar
  topic was
  [discussed recently](https://lore.kernel.org/git/xmqq4iwvfx8s.fsf@gitster.g/)
  where it was argued that sign-offs should be given explicitly rather
  than automated. Junio Hamano, the Git maintainer, agreed and
  suggested resurrecting a
  [proposal from 2020](https://lore.kernel.org/git/xmqqpnfw8gyn.fsf@gitster-ct.c.googlers.com/)
  to explicitly document why Git intentionally lacks this
  configuration. Junio expressed a desire to "save time from potential
  contributors" who might otherwise put effort into a patch that the
  community has already reached a consensus against.

  Collin Funk supported the idea of documenting the consensus and
  recommended using the full phrase "Signed-off-by" instead of the
  abbreviation "SoB" to ensure clarity for all readers. brian
  m. carlson suggested that the explanation could be placed in the Git
  FAQ, the manual pages, or both. brian also provided a minor
  grammatical correction to the initial text proposal.

  Junio submitted
  [version 1](https://lore.kernel.org/git/xmqqldj48pyl.fsf%40gitster.g)
  of a patch to document the decision. The proposed text explained
  that automation makes it harder to defend a sign-off's validity in
  court, as a person could claim the trailer "was done by inertia
  without person X really intending to certify what DCO says". The
  patch also acknowledged that while `format.signoff` exists, it is
  considered a "historical mistake" that should not be emulated by
  other commands.

  Elijah Newren found the initial draft somewhat difficult to parse
  and suggested an alternative version with more sentence
  breaks. Elijah’s draft emphasized that Git avoids automatic
  sign-offs specifically to "protect the legal and intentional
  significance of a sign-off". He also recommended a shorter version
  for the manual pages that would point users toward a more detailed
  entry in the FAQ. Johannes Sixt agreed that Elijah’s version was
  much easier to read and suggested a minor shortening of the final
  sentences to maintain impact. Johannes also emphasized the
  importance of leaving a pointer in the manual pages, as users
  looking for automation features are more likely to check
  documentation for specific commands rather than the general FAQ.

  Junio provided
  [version 2](https://lore.kernel.org/git/xmqqv7i62r6w.fsf%40gitster.g)
  of the patch, which incorporated Elijah's and Johannes's
  refinements. During the final review, Johannes suggested changing
  the phrase "pile on more mistakes" to "add more mistakes" to be
  clearer for non-native English speakers. Junio adopted this change,
  noting it would be clear for everyone. Kristoffer Haugsbakk also
  contributed a final polish by suggesting the use of a proper
  `linkgit:gitfaq[7]` reference in the manual page. Elijah and brian
  both confirmed they were satisfied with the final result.

  During the discussion there was a clear consensus that Git will not
  add a global `commit.signoff` configuration. The creation of
  permanent documentation in the Git FAQ and manual pages to explain
  the legal reasoning behind this decision will prevent future
  contributors from wasting time on a feature that would be rejected.

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

+ Git [2.53.0-rc2](https://lore.kernel.org/git/xmqqpl6vezt3.fsf@gitster.g/),
[2.53.0-rc1](https://lore.kernel.org/git/xmqq8qdqvqgq.fsf@gitster.g/),
[2.53.0-rc0](https://lore.kernel.org/git/xmqqv7h2bwy6.fsf@gitster.g/)
+ Git for Windows [v2.53.0-rc2(1)](https://github.com/git-for-windows/git/releases/tag/v2.53.0-rc2.windows.1),
[v2.53.0-rc1(1)](https://github.com/git-for-windows/git/releases/tag/v2.53.0-rc1.windows.1),
[v2.53.0-rc0(1)](https://github.com/git-for-windows/git/releases/tag/v2.53.0-rc0.windows.1)
+ GitHub Enterprise [3.19.1](https://docs.github.com/enterprise-server@3.19/admin/release-notes#3.19.1),
[3.18.4](https://docs.github.com/enterprise-server@3.18/admin/release-notes#3.18.4),
[3.17.10](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.10),
[3.16.13](https://docs.github.com/enterprise-server@3.16/admin/release-notes#3.16.13),
[3.15.17](https://docs.github.com/enterprise-server@3.15/admin/release-notes#3.15.17),
[3.14.22](https://docs.github.com/enterprise-server@3.14/admin/release-notes#3.14.22)
+ GitLab [18.8.2, 18.7.2, 18.6.4](https://about.gitlab.com/releases/2026/01/21/patch-release-gitlab-18-8-2-released/),
[18.8.1](https://about.gitlab.com/releases/2026/01/19/gitlab-18-8-1-released/),
[18.8](https://about.gitlab.com/releases/2026/01/15/gitlab-18-8-released/),
[18.7.1, 18.6.3, 18.5.5](https://about.gitlab.com/releases/2026/01/07/patch-release-gitlab-18-7-1-released/)
+ Gerrit Code Review [3.11.8](https://www.gerritcodereview.com/3.11.html#3118),
[3.12.4](https://www.gerritcodereview.com/3.12.html#3124),
[3.13.2](https://www.gerritcodereview.com/3.13.html#3132)
+ GitKraken [11.8.0](https://help.gitkraken.com/gitkraken-desktop/current/)
+ Sourcetree [4.2.16](https://product-downloads.atlassian.com/software/sourcetree/ReleaseNotes/Sourcetree_4.2.16.html)
+ Garden [2.5.1](https://github.com/garden-rs/garden/releases/tag/v2.5.1),
[2.5.0](https://github.com/garden-rs/garden/releases/tag/v2.5.0)
+ Git Cola [4.17.0](https://github.com/git-cola/git-cola/releases/tag/v4.17.0)
+ GitButler [0.18.7](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.18.7),
[0.18.6](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.18.6)
+ Kinetic Merge [1.14.0](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.14.0)
+ git-credential-oauth [0.17.2](https://github.com/hickford/git-credential-oauth/releases/tag/v0.17.2),
[0.17.1](https://github.com/hickford/git-credential-oauth/releases/tag/v0.17.1),
[0.17.0](https://github.com/hickford/git-credential-oauth/releases/tag/v0.17.0)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
