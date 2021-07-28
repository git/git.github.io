---
title: Git Rev News Edition 77 (July 28th, 2021)
layout: default
date: 2021-07-28 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 77 (July 28th, 2021)

Welcome to the 77th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of June 2021.

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

+ Git for Windows [2.32.0(2)](https://github.com/git-for-windows/git/releases/tag/v2.32.0.windows.2)
+ libgit2 [1.1.1](https://github.com/libgit2/libgit2/releases/tag/v1.1.1)
+ Gerrit Code Review [3.3.5](https://www.gerritcodereview.com/3.3.html#335),
[3.2.11](https://www.gerritcodereview.com/3.2.html#3211)
+ GitHub Enterprise [3.1.3](https://help.github.com/enterprise-server@3.1/admin/release-notes#3.1.3),
[3.0.11](https://help.github.com/enterprise-server@3.0/admin/release-notes#3.0.11),
[2.22.17](https://help.github.com/enterprise-server@2.22/admin/release-notes#2.22.17)
+ GitLab [14.1.0](https://about.gitlab.com/releases/2021/07/22/gitlab-14-1-released/),
[14.0.6](https://about.gitlab.com/releases/2021/07/20/gitlab-14-0-6-released/),
[14.0.5](https://about.gitlab.com/releases/2021/07/08/gitlab-14-0-5-released/),
[14.0.4, 13.12.8, and 13.11.7](https://about.gitlab.com/releases/2021/07/07/critical-security-release-gitlab-14-0-4-released/),
[14.0.3](https://about.gitlab.com/releases/2021/07/06/gitlab-14-0-3-released/),
[13.12.7](https://about.gitlab.com/releases/2021/07/05/gitlab-13-12-7-released/),
[14.0.2, 13.12.6, and 13.11.6](https://about.gitlab.com/releases/2021/07/01/security-release-gitlab-14-0-2-released/)
+ Bitbucket Server [7.15](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ GitKraken [7.7.0](https://support.gitkraken.com/release-notes/current)

## Other News

__Various__
* [Tower 7 - The New Commit Experience](https://www.git-tower.com/blog/tower-mac-7)

__Light reading__
* [Git quick tips #1: git commit --fixup](https://citizen428.net/blog/git-quick-tips-1-commit-fixup/) and
  [Git quick tips #2: Working with many branches](https://citizen428.net/blog/git-quick-tips-2-working-with-many-branches/)
  by Michael Kohl.

* [Git For Data Engineers](https://towardsdatascience.com/git-for-data-engineers-a8b979d8b2ab)
  by Kovid Rathee: a shortish guide to source control for data engineers,
  data analysts, and data scientists.

* [How to Learn Git Slowly](https://suchdevblog.com/lessons/HowToLearnGit.html)
  by Samuel Faure.

* [On the Evilness of Feature Branching - A Tale of Two Teams](https://thinkinglabs.io/articles/2021/07/14/on-the-evilness-of-feature-branching-a-tale-of-two-teams.html),
  one novice practising [trunk-based development](https://trunkbaseddevelopment.com/),
  the other very experienced using [GitFlow](https://nvie.com/posts/a-successful-git-branching-model/),
  by Thierry de Pauw.

  * See also [Patterns for Managing Source Code Branches](https://martinfowler.com/articles/branching-patterns.html)
    by Martin Fowler, mentioned in [Git Rev News Edition #63](https://git.github.io/rev_news/2020/05/28/edition-63/)

* [Things I wish Git had: Commit groups](http://blog.danieljanus.pl/2021/07/01/commit-groups/)
  by Daniel Janus - to have advantages of topic branch workflow
  when using "rebase and merge" workflow.

* [How Git Branches Work](https://www.freecodecamp.org/news/how-git-branches-work/):
  Git Branches Tutorial, by Beau Carnes, on freeCodeCamp.

* [How NOT to use Git in Practice. Ten Git usages, you should know to avoid.](https://blog.greenroots.info/how-not-to-use-git-in-practice-ten-git-usages-you-should-know-to-avoid)
  by Tapas Adhikary on GreenRoots Blog.

* [Elevate your Git-fu!](https://dev.to/abhaykrishna/elevate-your-git-fu-3ip4)
  by Abhay Krishna Arunachalam on DEV.to

* [git update: the odyssey for a sensible git pull](https://felipec.wordpress.com/2021/07/05/git-update/)
  by Felipe Contreras.


__Git tools and sites__
* [diffsitter](https://github.com/afnanenayet/diffsitter) creates semantically meaningful
  diffs that ignore formatting differences like spacing.  It does so by computing a diff
  on the AST (abstract syntax tree) of a file rather than computing the diff on the text
  contents of the file.  `diffsitter` uses the parsers from
  the [tree-sitter](https://tree-sitter.github.io/tree-sitter) project
  to parse source code.  Written in Rust, it is very much a work in progress.


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
