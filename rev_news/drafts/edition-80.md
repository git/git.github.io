---
title: Git Rev News Edition 80 (October 27th, 2021)
layout: default
date: 2021-10-27 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 80 (October 27th, 2021)

Welcome to the 80th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of September 2021.

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

<!---
## Developer Spotlight:
-->

## Releases

+ Git [2.33.1](https://public-inbox.org/git/xmqqczo922vm.fsf@gitster.g/)
+ Git for Windows [2.33.1(1)](https://github.com/git-for-windows/git/releases/tag/v2.33.1.windows.1)
+ libgit2 [1.3.0](https://github.com/libgit2/libgit2/releases/tag/v1.3.0)
+ Gerrit Code Review [3.3.7](https://www.gerritcodereview.com/3.3.html#337),
[3.2.13](https://www.gerritcodereview.com/3.2.html#3213)
+ Bitbucket Server [7.17](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ GitHub Enterprise [3.2.1](https://help.github.com/enterprise-server@3.2/admin/release-notes#3.2.1),
[3.1.9](https://help.github.com/enterprise-server@3.1/admin/release-notes#3.1.9),
[3.0.17](https://help.github.com/enterprise-server@3.0/admin/release-notes#3.0.17)
+ GitLab [14.4](https://about.gitlab.com/releases/2021/10/22/gitlab-14-4-released/),
[14.3.3](https://about.gitlab.com/releases/2021/10/12/gitlab-14-3-3-released/),
[14.3.2](https://about.gitlab.com/releases/2021/10/01/gitlab-14-3-2-released/),
[14.3.1, 14.2.5, and 14.1.7](https://about.gitlab.com/releases/2021/09/30/security-release-gitlab-14-3-1-released/),
[14.0.11](https://about.gitlab.com/releases/2021/09/27/gitlab-14-0-11-released/),
[14.1.6](https://about.gitlab.com/releases/2021/09/27/gitlab-14-1-6-released/)
+ GitKraken [8.1.0](https://support.gitkraken.com/release-notes/current),
[8.0.1](https://support.gitkraken.com/release-notes/current)
+ GitHub Desktop [2.9.4](https://desktop.github.com/release-notes/)

## Other News

__Various__

* [Notes from the Git Contributors' Summit 2021, virtual, Oct 19/20](https://public-inbox.org/git/nycvar.QRO.7.76.6.2110221202430.62@tvgsbejvaqbjf.bet/t/),
  a thread by Johannes Schindelin.
  * One of the topics was having public "Git chalk talks", which idea 
    [has now it's own thread](https://public-inbox.org/git/nycvar.QRO.7.76.6.2110220950020.62@tvgsbejvaqbjf.bet/t/#u)


__Light reading__

* [A 16 Year History Of The Git Init Command](https://initialcommit.com/blog/history-git-init-command)
  by Jacob Stopak on Initial Commit.
* [Clean Conventional Commits](https://dev.to/sublimegeek/clean-conventional-commits-40l8)
  by Jonathan Irvin on DEV.to.
  * The [Conventional Commit message standard](https://www.conventionalcommits.org/)
    was first mentioned in [Git Rev News Edition #52](https://git.github.io/rev_news/2019/06/28/edition-52/).
* [How to Remove Git Version Tracking from a Folder](https://www.cloudsavvyit.com/14500/how-to-remove-git-version-tracking-from-a-folder/) and
  [How to Delete Git Branches On Local and Remote Repositories](https://www.cloudsavvyit.com/14289/how-to-delete-git-branches-on-local-and-remote-repositories/)
  by Anthony Heddings on Cloud Savvy IT.
* [Git: Moving from Master to Main](https://www.jumpingrivers.com/blog/git-moving-master-to-main/)
  (as the name of the default branch), challenges faced by Jumping Rivers company;
  note however that they got the origin history of Git using 'master' wrong in this article.
* [Branching Strategies in Git](https://css-tricks.com/branching-strategies-in-git/)
  by Tobias Günther on CSS Tricks is a part two post in the “Advanced Git” series.
  * See also [Patterns for Managing Source Code Branches](https://martinfowler.com/articles/branching-patterns.html) in [#73](https://git.github.io/rev_news/2021/03/27/edition-73/)
    and [Ship / Show / Ask: A modern branching strategy](https://martinfowler.com/articles/ship-show-ask.html) in [#79](https://git.github.io/rev_news/2021/09/30/edition-79/).
* [Code Review from the Command Line](https://blog.jez.io/cli-code-review/)
  by Jake Zimmerman (2018)
* [The Thing About Git](https://tomayko.com/blog/2008/the-thing-about-git)
  by Ryan Tomayko (2008).


__Git tools and sites__

* [git-autofixup](https://github.com/torbiak/git-autofixup) automatically
  creates fixup commits for topic branches.
* [git-foresta](https://github.com/takaaki-kasai/git-foresta) is a text-based git log graph viewer,
  written in Perl, using Unicode for drawing.
  It is a modified version of `git-forest` (written in Perl by Jan Engelhardt), see below.
* [hxtools](http://inai.de/projects/hxtools/) by Jan Engelhardt
  is a collection of small tools and scripts, which include 
  `git-author-stat` (commit author statistics of a git repository),
  `git-blame-stat` (per-line author statistics),
  `git-revert-stats` (reverting statistics), and
  `git-forest` (display the commit graph).
* [Lab](https://github.com/zaquestion/lab) is a tool that wraps Git,
  making it simple to clone, fork, and interact with repositories
  [on GitLab](https://gitlab.com/gitlab-org/ecosystem-stage/lab),
  including seamless workflows for creating merge requests, issues and snippets.
  It was inspired by and is similar to the [hub](https://github.com/github/hub)
  tool that does the same for GitHub.
  * [GLab](https://glab.readthedocs.io/) for GitLab, and
    [gh](https://github.com/cli/cli) for GitHub are more interactive
    command line tools, that do not aim to be familiar to a `git` and to leverage it.
* [The Advanced Git Kit](https://www.git-tower.com/learn/git/advanced-git-kit)
  is a 10 part video course for free from makers of the [Tower](https://www.git-tower.com/) Git client
* [GoGit](https://github.com/opencodeiiita/GoGit) is a project under OpenCode'21
  that aims to improve the Git and GitHub skills of the contributors by completing some tasks.
  The tasks are be specified in the issue section of the project's GitHub repo.
* [GitHub Minesweeper](https://profy.dev/project/github-minesweeper) by Profy
  is a GitHub bot to learn a professional Git and GitHub workflow.


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Johannes Altmanninger.
