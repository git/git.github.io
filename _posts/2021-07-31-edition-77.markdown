---
title: Git Rev News Edition 77 (July 31st, 2021)
layout: default
date: 2021-07-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 77 (July 31st, 2021)

Welcome to the 77th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of June 2021.

## Discussions

<!---
### General
-->

### Reviews

* [[PATCH] builtins + test helpers: use return instead of exit() in cmd_\*](https://lore.kernel.org/git/patch-1.1-61d7e6e079-20210607T111008Z-avarab@gmail.com/)

  Ævar Arnfjörð Bjarmason sent a patch to the mailing list that
  changed some `cmd_*()` functions so that they use a `return` statement
  instead of `exit()`. He further said that it is legitimate for the
  SunCC compiler on Solaris to complain about the exit() calls, as
  they would skip any cleanup made after them.

  The `cmd_*()` functions are important in the architecture of Git, as
  there is one such function for each Git "builtin" command, and the
  function is called by `run_builtin()` in `git.c` to perform the
  command. For example when `git log` is launched, the `cmd_log()`
  function is called by `run_builtin()`.

  Felipe Contreras reviewed the patch and found it obviously correct.

  Peff, alias Jeff King, also said that it looked like simple and
  obvious conversions, but he wondered what was SunCC complaining
  about, especially if it didn't know about `NORETURN`, and would
  complain about many other `exit()` calls.

  `NORETURN` is a special statement to tell the compiler that a
  function doesn't return, but instead uses a function like `exit()`
  to stop the current process.

  Phillip Wood also wondered if SunCC would complain about `die()`
  calls, which use `exit()` underneath.

  Ævar then sent
  [a version 2](https://lore.kernel.org/git/patch-1.1-f225b78e01-20210608T104454Z-avarab@gmail.com/)
  of his patch, with no code change but explaining that SunCC actually
  complains when there's no `NORETURN` while we declare a `cmd_*()`
  function to return an `int`. He replied to Peff with the same
  explanation and added that around half of SunCC warnings are
  legitimate, and that he had already been sending miscellaneous fixes
  for 15-20 of them.

  Junio Hamano, the Git maintainer, replied to the version 2 patch.
  He especially had an issue with the part in the commit message that
  said that directly `exit()`-ing would skip the cleanups `git.c` would
  otherwise do, like closing file descriptors and issuing errors if it
  failed. He considered that it was "not a crime" for the functions to
  exit themselves as file descriptors are closed when we exit and "if
  we do have clean-ups that are truly important, we would have
  arranged them to happen in the `atexit()` handler".

  Junio anyway thought that the patch was still "a good idea because
  it encourages good code hygiene".

  Ævar replied to Junio that file descriptors are indeed closed when we
  exit, but the errors we could get when closing them would not be
  reported. He pointed to previous commits that had been merged back
  in 2007 to make sure IO errors were properly reported after the
  `cmd_*()` functions return, and said that "the `atexit()` handlers
  cannot modify the exit code (both per the C standard, and POSIX)".
  He also discussed a bit how glibc allows `atexit()` handlers to
  munge the exit code though it's not portable behavior.

  Junio replied that Ævar was right and that "we leave a final clean-up
  for normal returns (i.e. when `cmd_foo()` intends to return or exit
  with 0) to be done by the caller".

  The patch was later merged into the master branch and the next
  version of Git will better signal IO errors, thanks to SunCC and
  people running it to compile Git on Solaris machines.

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
* [NO\_COLOR](https://no-color.org/) is a proposed universal standard of
  disabling colored text output in command-line software programs. The website
  also documents which software has adopted this standard and when support was
  added, and for projects that did not adopt this standard it tries to document
  how to otherwise disable color.


__Light reading__
* [How to Get Better with Git](https://www.anavela.dev/how-to-get-better-with-git)
  by Ana Vela provides a list of free and paid resources to help you boost your
  Git know-how.
* [Git quick tips #1: git commit --fixup](https://citizen428.net/blog/git-quick-tips-1-commit-fixup/) and
  [Git quick tips #2: Working with many branches](https://citizen428.net/blog/git-quick-tips-2-working-with-many-branches/)
  by Michael Kohl.
* [Git For Data Engineers](https://towardsdatascience.com/git-for-data-engineers-a8b979d8b2ab)
  by Kovid Rathee: a shortish guide to source control for data engineers,
  data analysts, and data scientists.
* [How to Learn Git Slowly](https://suchdevblog.com/lessons/HowToLearnGit.html)
  by Samuel Faure.
* [How NOT to use Git in Practice. Ten Git usages, you should know to avoid.](https://blog.greenroots.info/how-not-to-use-git-in-practice-ten-git-usages-you-should-know-to-avoid)
  by Tapas Adhikary on GreenRoots Blog.
* [Elevate your Git-fu!](https://dev.to/abhaykrishna/elevate-your-git-fu-3ip4)
  by Abhay Krishna Arunachalam on DEV.to.
* [How to Collaborate on Components across Projects with Bit](https://dev.to/giteden/how-to-collaborate-on-components-across-projects-with-bit-29c3)
  by Eden Ella on DEV.to. The [Bit](https://github.com/teambit/bit) project was
  mentioned in [Git Rev News Edition #45](https://git.github.io/rev_news/2018/11/21/edition-45/).
* [On the Evilness of Feature Branching - A Tale of Two Teams](https://thinkinglabs.io/articles/2021/07/14/on-the-evilness-of-feature-branching-a-tale-of-two-teams.html),
  one novice practising [trunk-based development](https://trunkbaseddevelopment.com/),
  the other very experienced using [GitFlow](https://nvie.com/posts/a-successful-git-branching-model/),
  by Thierry de Pauw.
  * See also [Patterns for Managing Source Code Branches](https://martinfowler.com/articles/branching-patterns.html)
    by Martin Fowler, mentioned in [Git Rev News Edition #63](https://git.github.io/rev_news/2020/05/28/edition-63/).
* [Things I wish Git had: Commit groups](http://blog.danieljanus.pl/2021/07/01/commit-groups/)
  by Daniel Janus - to have advantages of topic branch workflow
  when using "rebase and merge" workflow.
* [Git Squash Simplified](https://dev.to/pb/git-squash-simplified-3ba1)
  by Pawel Borkar on DEV.to.
* [How Git Branches Work](https://www.freecodecamp.org/news/how-git-branches-work/):
  Git Branches Tutorial, by Beau Carnes, on freeCodeCamp.
* [git update: the odyssey for a sensible git pull](https://felipec.wordpress.com/2021/07/05/git-update/)
  by Felipe Contreras.
* [Optimizing Git’s Merge Machinery, Part IV](https://palantir.medium.com/optimizing-gits-merge-machinery-part-iv-5bbc4703d050)
  by Elijah Newren on Palantir Blog.

__Git tools and sites__
* [diffsitter](https://github.com/afnanenayet/diffsitter) creates semantically meaningful
  diffs that ignore formatting differences like spacing.  It does so by computing a diff
  on the AST (abstract syntax tree) of a file rather than computing the diff on the text
  contents of the file.  `diffsitter` uses the parsers from
  the [tree-sitter](https://tree-sitter.github.io/tree-sitter) project
  to parse source code.  Written in Rust, it is very much a work in progress.

* [The best 6 VS Code extensions to supercharge Git](https://dev.to/jamieswift90/the-best-vs-code-extensions-to-supercharge-git-yes-there-s-more-than-gitlens-4588)
  by Jamie Swift on DEV.to.
* [GitLive](https://marketplace.visualstudio.com/items?itemName=TeamHub.teamhub)
  is a Visual Studio Code extension [to see which branch your teammates are on in VS Code](https://dev.to/gitlive/how-to-see-which-branch-your-teammates-are-on-in-vs-code-cb1).

* [Git Immersion](https://gitimmersion.com/index.html) provides a guided tour
  that walks through the fundamentals of Git, inspired by the premise that to
  know a thing is to do it.  Another [variant of Git Immersion](http://jce-il.github.io/git-immersion/index.html)
  was mentioned in [Git Rev News Edition #38](https://git.github.io/rev_news/2018/04/18/edition-38/).

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt; with help from Elijah Newren.
