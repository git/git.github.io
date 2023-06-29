---
title: Git Rev News Edition 100 (June 28th, 2023)
layout: default
date: 2023-06-28 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 100 (June 28th, 2023)

Welcome to the 100th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of May 2023 and June 2023.

## Discussions


### General

- [Git participates in GSoC (Google Summer of Code) 2023](https://summerofcode.withgoogle.com/programs/2023/organizations/git)

  The following two contributors have been officially accepted to work on Git
  as part of the [GSoC 2023](https://summerofcode.withgoogle.com/):

    - Kousik Sanagavarapu will work on the "[Unify ref-filter formats with other pretty formats](https://summerofcode.withgoogle.com/programs/2023/projects/rck3kmq2)"
      project. Kousik will be co-mentored by Hariom Verma and Christian Couder.
      Some details about his work on the project could be found in [his blog](https://five-sh.github.io/blog).

    - Shuqi Liang will work on the "[More Sparse Index Integrations](https://summerofcode.withgoogle.com/programs/2023/projects/Rkbc1Abe)"
      project. Shuqi will be mentored by Victoria Dye. Further details about
      the project and updates on progress can be found on [Shuqi's blog](https://cheskaqiqi.github.io/tags/GSoC/).

  Congratulations to the accepted contributors!

  Thanks also to the other contributors who applied and worked on micro-projects,
  but couldn’t be selected! We hope to continue to see you in the community!



### Reviews

* [[PATCH 0/6] strbuf cleanups](https://lore.kernel.org/git/20230502211454.1673000-1-calvinwan@google.com/)

  Calvin Wan sent a 6 patch long series to clean up `strbuf` related
  code. `strbuf` is a basic structure along with related functions,
  implemented mostly in the "strbuf.c" and "strbuf.h" files, that is
  used to manipulate character strings.

  The issue was that over time some functions with dependencies to
  other code had been added into those files, and Calvin's series
  wanted to get rid of these dependencies "with the goal of eventually
  being able to stand up `strbuf` as a library".

  Most of the patches moved some functions to other files that were
  using them, and one of them removed the use of environment
  variables.

  Junio Hamano, the Git maintainer, suggested that some functions that
  were moved to other files should be renamed so that they don't start
  with "strbuf_" anymore, as they were not really string manipulating
  functions.

  The series was also reviewed by Jeff King, Elijah Newren and Felipe
  Contreras, who overall liked it. They commented on some patches
  mostly to add some historical context or to ask for some
  clarifications.

  Calvin sent
  [a version 2 of the series](https://lore.kernel.org/git/20230503184849.1809304-1-calvinwan@google.com/)
  that added a new patch at the beginning of the series to clarify the
  purpose of the `strbuf` functions at the top of "strbuf.h". The other
  changes in this version were small clarifications in the commit
  messages of some patches or in code comments.

  Junio commented on the last patch of the series though. This patch
  was supposed to remove the use of environment variables according to
  its subject, but was in fact removing the dependencies of `strbuf`
  functions on the `comment_line_char` global variable and adding a
  new parameter to those functions instead.

  Calvin sent
  [a new version of this patch](https://lore.kernel.org/git/20230503194201.2360016-1-calvinwan@google.com/)
  calling it a v3 even though the other patches in the series were not
  resent. Elijah reviewed this v2/v3 patch series and suggested some minor
  changes in some commit messages.

  Calvin then sent
  [a version 4 of the series](https://lore.kernel.org/git/20230508165728.525603-1-calvinwan@google.com/)
  with the commit message changes suggested by Elijah and Junio.

  Both Eric Sunshine and Phillip Wood chimed in to comment on this
  version. Eric suggested moving the comment added by the first patch
  of the series further up in "strbuf.h" and making it clear that this
  comment is for developers instead of mere users of the `strbuf`
  functions. Phillip suggested simplifying the parameters of a
  function where a new parameter was added by the last patch of the
  series.

  Calvin then sent
  [a version 5 of the series](https://lore.kernel.org/git/20230511194446.1492907-1-calvinwan@google.com/)
  which included the suggestions made by Eric and Phillip. Eric replied
  with some further small comments about the first and last patches of
  the series.

  Calvin then sent
  [a version 6 of the series](https://lore.kernel.org/git/20230512171429.2202982-1-calvinwan@google.com/)
  with Eric's suggestions, and a few weeks later
  [a version 7 of the series](https://lore.kernel.org/git/20230606194720.2053551-1-calvinwan@google.com/)
  to fix a few minor issues related to the release of Git v2.41.0 in
  the meantime. It looks like this series will be merged to the
  'master' branch soon though.

<!---
### Support
-->


## Developer Spotlight: John Cai

* Who are you and what do you do?

  My name is John Cai, and I started to contribute to the project back in 2021. I
  also lead the Git team at GitLab, where we aim to improve Git and add features
  that will make the lives of GitLab users and Git users better.

* What would you name your most important contribution to Git?

  Adding a `--batch-command` mode to `cat-file` was the first feature that I
  contributed to Git. It allows a single long running process to handle different
  cat-file queries. Most developers wouldn't take advantage of this, but for Git
  servers it's a nice feature.

* What are you doing on the Git project these days, and why?

  Things like documentation improvements, as well as working on some small features
  that will optimize the server side of things. At GitLab we are currently
  developing a system that will contain many ephemeral refs, so we recently added
  options to `git-pack-refs(1)` that allow the caller to specify refs to exclude
  from the packed refs file.

  I still consider myself a bit of a newbie, but I love contributing however I can
  since Git is such an impactful project. Further, since our team interfaces with
  Git so much, I often notice opportunities for incremental improvements. Other
  times, we have explicit needs to add a feature or enhancement to support
  improvements to our Git data access layer in GitLab.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  Transition the project to a new refs backend! There have been plenty of great
  discussions around this -- whether to go with the reftables backend or a new
  format of the packed-refs file. Swapping out the refs backend would be a huge
  undertaking, but well worth it, in my opinion.

* What is your favorite Git-related tool/library, outside of
  Git itself?

  When reviewing code, I've been using [meld](https://github.com/GNOME/meld).
  I overall like the UI.

* What is your toolbox for interacting with the mailing list and for
  development of Git?

  I use GitGitGadget mostly, but also [b4](https://people.kernel.org/monsieuricon/introducing-b4-and-patch-attestation)
  is great for trying out patches locally.

* What is your advice for people who want to start Git development?
  Where and how should they start?

  It can definitely be intimidating since the codebase is so storied and
  technically deep. My suggestion is to just dive in and get started with
  something small -- whether that be a documentation improvement or a code cleanup
  marked with TODO. Also, keep an eye out for bug reports on the mailing list.
  Fixing bugs also gives you experience with different parts of the code base.

  Part of my intimidation is not knowing how people on the mailing list would
  respond to my contributions. Experiencing how helpful people were, and the
  overall warmth of the community removed a lot of the emotional barrier of
  contributing.

  Also, it's easy to read into tone in text-only communication, but the mailing
  list is full of people who genuinely want to help. Don't let the fear prevent
  you from contributing! You'll learn incrementally each time you send something
  to the list.

* If there's one tip you would like to share with other Git
  developers, what would it be?

  Spend more time than you think you need to on crafting commit messages. It goes
  a long way to clearly state the need, and how the patch addresses the need.

  Also, look for existing APIs in the codebase 😄.


## Releases

+ Git [2.41.0](https://public-inbox.org/git/xmqqleh3a3wm.fsf@gitster.g/)
+ Git for Windows [2.41.0(1)](https://github.com/git-for-windows/git/releases/tag/v2.41.0.windows.1)
+ GitHub Enterprise [3.8.5](https://help.github.com/enterprise-server@3.8/admin/release-notes#3.8.5),
[3.7.12](https://help.github.com/enterprise-server@3.7/admin/release-notes#3.7.12),
[3.6.15](https://help.github.com/enterprise-server@3.6/admin/release-notes#3.6.15),
[3.5.19](https://help.github.com/enterprise-server@3.5/admin/release-notes#3.5.19),
[3.9.0](https://help.github.com/enterprise-server@3.9/admin/release-notes#3.9.0),
[3.8.4](https://help.github.com/enterprise-server@3.8/admin/release-notes#3.8.4),
[3.7.11](https://help.github.com/enterprise-server@3.7/admin/release-notes#3.7.11),
[3.6.14](https://help.github.com/enterprise-server@3.6/admin/release-notes#3.6.14),
[3.5.18](https://help.github.com/enterprise-server@3.5/admin/release-notes#3.5.18)
+ GitLab [16.1](https://about.gitlab.com/releases/2023/06/22/gitlab-16-1-released/)
[16.0.5](https://about.gitlab.com/releases/2023/06/16/gitlab-16-0-5-released/),
[15.11.9](https://about.gitlab.com/releases/2023/06/15/gitlab-15-11-9-released/),
[16.0.4](https://about.gitlab.com/releases/2023/06/08/gitlab-16-0-4-released/),
[16.0.3](https://about.gitlab.com/releases/2023/06/07/gitlab-16-0-3-released/),
[15.11.8](https://about.gitlab.com/releases/2023/06/07/gitlab-15-11-8-released/),
[16.0.2](https://about.gitlab.com/releases/2023/06/05/security-release-gitlab-16-0-2-released/)
+ Bitbucket Server [8.11](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ GitKraken [9.5.1](https://help.gitkraken.com/gitkraken-client/current/),
[9.5.0](https://help.gitkraken.com/gitkraken-client/current/)
+ GitHub Desktop [3.2.6](https://desktop.github.com/release-notes/),
[3.2.5](https://desktop.github.com/release-notes/),
[3.2.4](https://desktop.github.com/release-notes/)
+ Tower for Windows [5.0](https://www.git-tower.com/release-notes/windows?show_tab=release-notes) ([blog post](https://www.git-tower.com/blog/tower-windows-5/))
+ git-credential-oauth [0.8.0](https://github.com/hickford/git-credential-oauth/releases/tag/v0.8.0)

## Other News

__Various__


__Light reading__
+ [Setting Up SSH for Commit Signing](https://www.git-tower.com/blog/setting-up-ssh-for-commit-signing/) by Bruno Brito on Tower’s blog.
+ [Coming Up on Tower's Roadmap (2023)](https://www.git-tower.com/blog/coming-up-on-the-roadmap-2023/) by Bruno Brito on Tower’s blog.
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
with help from Bruno Brito.
