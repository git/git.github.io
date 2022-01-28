---
title: Git Rev News Edition 83 (January 26th, 2022)
layout: default
date: 2022-01-26 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 83 (January 26th, 2022)

Welcome to the 83rd edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of December 2021.

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

## Other News

__Various__

* [Highlights from Git 2.35](https://github.blog/2022-01-24-highlights-from-git-2-35/)
  by Taylor Blau on GitHub Blog.
* [Linux Foundation launches Open Source Software Development, Linux, and **Git** certification](https://www.zdnet.com/article/linux-foundation-launches-open-source-software-development-linux-git-certification/),
  and three new training courses on the edX platform (including
  [Git for Distributed Software Development (LFD109x)](https://www.edx.org/course/git-for-distributed-development)).
* [Introducing new Git features to Visual Studio 2022](https://devblogs.microsoft.com/visualstudio/introducing-new-git-features-to-visual-studio-2022/)
  by Taysser Gherfal on Microsoft Visual Studio DevBlog.

__Light reading__

* [Signing Git Commits with SSH Keys](https://blog.dbrgn.ch/2021/11/16/git-ssh-signatures/)
  by Danilo Bargen (available since Git version 2.34).
* [Git Overview - Computerphile](https://www.youtube.com/watch?v=92sycL8ij-U),
  a video by dr Max Wilson, filmed and edited by Sean Riley.
* [Awesome Git Aliases](https://davidwalsh.name/awesome-git-aliases) and
  [More Awesome Git Aliases](https://davidwalsh.name/more-awesome-git-aliases)
  by Landon Schropp on Dawid Walsh Blog.
* [Git Organized: A Better Git Flow](https://render.com/blog/git-organized-a-better-git-flow)
  by Annie Sexton on Render.com Blog; though a better solution would be to use interactive rebase,
  as described in [comments for this article on DEV.to](https://dev.to/render/git-organized-a-better-git-flow-56go#comment-subscription).
* [No code reviews by default (to move faster)](https://www.raycast.com/blog/no-code-reviews-by-default/)
  by Thomas Paul Mann of Raycast (and how it works for them).
* [How to Make a Component That Supports Multiple Frameworks in a Monorepo](https://css-tricks.com/make-a-component-multiple-frameworks-in-a-monorepo/)
  by Rob Levin on CSS-Tricks.
* [How Git Works Under the Hood](https://www.freecodecamp.org/news/git-under-the-hood/)
  by Faisal Albasu on freeCodeCamp.
* [Advanced Git Concepts You Should Know](https://dev.to/ruppysuppy/advanced-git-concepts-you-should-know-nle)
  by Tapajyoti Bose on The Practical Dev (also known as DEV\.to).
* [How to Write Better Git Commit Messages – A Step-By-Step Guide](https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/)
  by Natalie Pina on freeCodeCamp; this article talks also about the
  [Conventional Commits](https://www.conventionalcommits.org/) specification,
  first mentioned in [Git Rev News Edition #52](https://git.github.io/rev_news/2019/06/28/edition-52/).
* [How to check commit message and branch name with git hooks without any new installation](https://dev.to/anibalardid/how-to-check-commit-message-and-branch-name-with-git-hooks-without-any-new-installation-n34),
  a short article by Anibal on DEV\.to.
* [How Bad Can It Git? Characterizing Secret Leakage in Public GitHub Repositories](https://www.ndss-symposium.org/ndss-paper/how-bad-can-it-git-characterizing-secret-leakage-in-public-github-repositories/)
  by Michael Meli, Matthew R. McNiece, Bradley Reaves in NDSS 2019;
  via [the morning paper article](https://blog.acolyer.org/2019/04/08/how-bad-can-it-git-characterizing-secret-leakage-in-public-github-repositories/)
  by Adrian Colyer.

__Git tools and sites__

* [git-perl-critic](https://github.com/Ovid/git-critic) - Command-line interface for
  Perl [Git::Critic](https://metacpan.org/pod/Git::Critic) module,
  reporting [Perl::Critic](https://metacpan.org/pod/Perl::Critic) failures
  (code that is contrary to Perl best-practices) only on git changes in the current branch.
  By Curtis "Ovid" Poe.
* [Dura](https://github.com/tkellogg/dura) is a background process that watches
  your Git repositories and commits your uncommitted changes without impacting HEAD,
  the current branch, or the Git index (staged files).  With this tool you should not
  ever lose your work if you're using Git.
  Written in Rust by Tim Kellogg.
* [ResumableGitClone](https://github.com/johnzeng/ResumableGitClone) (2017)
  is a Bash shell script to clone a large repo without retrying again and again,
  by using a deepening shallow clone.
* [git-pull-run](https://www.npmjs.com/package/git-pull-run) is an npm package
  which automatically runs commands like `npm install` when fetching changes from git,
  but only if certain files have changed.  Extended version of script presented in
  [Automatically Install NPM Dependencies on Git Pull](https://dev.to/zirkelc/automatically-install-npm-dependencies-on-git-pull-bg0).
* [Husky.Net](https://github.com/alirezanet/Husky.Net) is git hooks manager for .NET,
  among others making it possible to run linters against staged git files.
  Inspired by [husky](https://github.com/typicode/husky)
  and [lint-staged](https://github.com/okonet/lint-staged)
  and a few other tools, and by [Using C# code in your git hooks](https://kaylumah.nl/2019/09/07/using-csharp-code-your-git-hooks.html)
  article by Max Hamulyák (2019).
   * [lint-staged](https://github.com/okonet/lint-staged) was first mentioned in
     [Git Rev News #45](https://git.github.io/rev_news/2018/11/21/edition-45/)
   * [husky](https://github.com/typicode/husky) was first mentioned in
     [Git Rev News #63](https://git.github.io/rev_news/2020/05/28/edition-63/)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
