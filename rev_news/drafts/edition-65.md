---
title: Git Rev News Edition 65 (July 29th, 2020)
layout: default
date: 2020-07-29 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 65 (July 29th, 2020)

Welcome to the 65th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of June 2020.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

<!---
### Support
-->

## Developer Spotlight: Jonathan Tan

* Who are you and what do you do?

  I'm a Software Engineer at Google who works on Git. I also contribute
  to JGit (a Java implementation of Git) as one of its committers.

* What would you name your most important contribution to Git?

  I would say "[partial clone](https://git-scm.com/docs/partial-clone)" - the
  ability to clone a repository, but not necessarily have all of
  that repository's objects (accumulatedthroughout its history) in
  your clone. Quite a few articles have been written about it, but in
  summary, it improves Git performance especially for large repositories.

* What are you doing on the Git project these days, and why?

  The thing that immediately comes to mind is "partial clone".  The
  fundamentals are there, but some Git commands still operate under the
  assumption that objects are only a disk read away (instead of a
  network fetch - in a partial clone, if an object is needed but
  missing, it is automatically fetched). I'm improving those commands to
  be more cognizant of this fact - typically, this means batching the
  fetch of all the objects it will need once it realizes that it does
  not have some of them, instead of "I need this object, so go fetch it;
  OK let me process it; oops I need another one, so go fetch that".

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  Along the lines of "partial clone" and large repositories, I would
  like them to investigate the feasibility of having Git servers be able
  to serve results of computations (thus, not just objects). One case is
  `git blame` - if a Git client could ask a Git server to send the
  results of such a command, it could offload most of the computation to
  the server, only needing to build upon the server's results with the
  locally-created objects that the server does not know about. This is
  especially useful with partial clone, because the client does not even
  have most of the objects needed and would have to fetch them
  otherwise.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  One small thing that I can think of: remove the ability of `git reset`
  to update the working tree and the objects staged in the index. The
  [`git restore`](https://git-scm.com/docs/git-restore) command,
  relatively recently introduced, does this with more beginner-friendly
  parameter names (`--worktree` and `--staged`, respectively, instead of
  the `--hard`, `--mixed`, and `--soft` of `git reset`). This change
  would make it easier, for example, to read scripts written by other
  people - I would no longer need to think so much about what that
  `reset` in the script would do.

## Releases

+ Git [2.28.0-rc2](https://public-inbox.org/git/xmqqblk75uel.fsf@gitster.c.googlers.com/),
[2.28.0-rc1](https://public-inbox.org/git/xmqqv9ildh46.fsf@gitster.c.googlers.com/),
[2.28.0-rc0](https://public-inbox.org/git/xmqqh7ugwen6.fsf@gitster.c.googlers.com/)
+ Git for Windows [2.28.0-rc2](https://public-inbox.org/git/20200722195905.6540-1-johannes.schindelin@gmx.de),
[2.28.0-rc1](https://public-inbox.org/git/20200718011007.6808-1-johannes.schindelin@gmx.de),
[2.28.0-rc0](https://public-inbox.org/git/20200710135935.6416-1-johannes.schindelin@gmx.de)
+ Bitbucket Server [7.4](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ Gerrit Code Review [3.1.8](https://www.gerritcodereview.com/3.1.html#318),
[3.0.12](https://www.gerritcodereview.com/3.0.html#3012),
[2.16.22](https://www.gerritcodereview.com/2.16.html#21622)
+ GitHub Enterprise [2.21.3](https://enterprise.github.com/releases/2.21.3/notes),
[2.20.12](https://enterprise.github.com/releases/2.20.12/notes),
[2.19.18](https://enterprise.github.com/releases/2.19.18/notes),
[2.18.23](https://enterprise.github.com/releases/2.18.23/notes),
[2.21.2](https://enterprise.github.com/releases/2.21.2/notes),
[2.20.11](https://enterprise.github.com/releases/2.20.11/notes),
[2.19.17](https://enterprise.github.com/releases/2.19.17/notes),
[2.18.22](https://enterprise.github.com/releases/2.18.22/notes)
+ GitLab [13.1.5](https://about.gitlab.com/releases/2020/07/24/gitlab-13-1-5-released/),
[13.2.1](https://about.gitlab.com/releases/2020/07/24/gitlab-13-2-1-released/),
[13.2](https://about.gitlab.com/releases/2020/07/22/gitlab-13-2-released/),
[13.0.10](https://about.gitlab.com/releases/2020/07/09/gitlab-13-0-10-released/),
[13.1.4](https://about.gitlab.com/releases/2020/07/09/gitlab-13-1-4-released/),
[13.1.3, 13.0.9 and 12.10.14](https://about.gitlab.com/releases/2020/07/06/critical-security-release-gitlab-13-1-3-released/),
[13.1.2, 13.0.8 and 12.10.13](https://about.gitlab.com/releases/2020/07/01/security-release-13-1-2-release/)
+ GitKraken [7.1.0](https://support.gitkraken.com/release-notes/current)
+ GitHub Desktop [2.5.3](https://desktop.github.com/release-notes/)

## Other News

__Various__

* Carmen Andoh, who works for Google, and Jonathan Nieder’s team at
  Google have volunteered to organize a
  [Git Inclusion Summit](https://lore.kernel.org/git/CA+TwhoKBYwUKmtQTyiocPWJD=KeZQryS+6Q8JKxKgLEy0qJwAw@mail.gmail.com/).
  It would be a virtual contributor summit with the purpose of
  engaging core Git contributors as active participants in diversity
  and inclusion initiatives for the Git project. Interested Git
  contributors can vote on their preferred summit duration and times
  on [a whenisgood pool](http://whenisgood.net/9z2diyy) by Thursday,
  July 30th.

* Junio Hamano, the Git maintainer has renamed the `pu` branch of
  git.git to `seen`. This has been done to use a more meaningful name
  and make room for topics from those contributors whose two-letter
  name abbreviation needs to be 'pu'. This was announced in
  "[What's cooking in git.git (Jun 2020, #04; Mon, 22)](https://public-inbox.org/git/xmqqimfid2l1.fsf@gitster.c.googlers.com)"

* The Git Project Leadership Committee has been briefly interviewed by
  email by [Elizabeth Landau](https://en.wikipedia.org/wiki/Elizabeth_Landau)
  for an [article](https://www.wired.com/story/tech-confronts-use-labels-master-slave/)
  in [Wired](https://www.wired.com/) about current changes to Git's
  default name for the initial branch.

__Light reading__

* [Git Rebase - A Complete Guide](https://www.alchemists.io/articles/git_rebase) by Brooke Kuhlmann at Alchemists.

__Git tools and sites__

* [Git Lint](https://www.alchemists.io/projects/git-lint) - A command line interface for analyzing Git commit quality and consistency for yourself and/or team. Can be used as a Git Hook and/or wired into your continuous integration build system.

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Jonathan Tan and Brooke Kuhlmann.
