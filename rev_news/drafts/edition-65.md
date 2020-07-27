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


## Other News

__Various__

* Junio Hamano, the Git maintainer has renamed the `pu` branch of
  git.git to `seen`. This has been done to use a more meaningful name
  and make room for topics from those contributors whose two-letter
  name abbreviation needs to be 'pu'. This was announced in
  "[What's cooking in git.git (Jun 2020, #04; Mon, 22)](https://public-inbox.org/git/xmqqimfid2l1.fsf@gitster.c.googlers.com)"

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
with help from XXX.
