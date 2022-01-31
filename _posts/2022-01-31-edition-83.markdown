---
title: Git Rev News Edition 83 (January 31st, 2022)
layout: default
date: 2022-01-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 83 (January 31st, 2022)

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

### Support

* [Custom subcommand help handlers](https://lore.kernel.org/git/CABceR4ZW4rRWZnH0ZBkWty_H84Z4CmXque_LO+1edETEWrO8PQ@mail.gmail.com/)

  Sean Allred wrote to the mailing list saying that in his company he
  is distributing a Git subcommand he named `git-foo`, which can
  display its own help, but he was struggling to make this work.

  Running `git foo --help` doesn't pass `--help` to `git-foo`, but
  instead it is rewritten internally in Git to `git help foo`, which
  tries to find and then display a help page for `git-foo`. This
  could have worked if Sean could install such a page for `git-foo`
  along with the help pages for regular Git commands.

  On Windows, though, by default help pages are displayed in HTML
  format instead of the 'man' or 'info' formats, and these pages
  are expected to be in a Git for Windows controlled installation
  directory that he'd rather not touch.

  One solution he suggested would be to not rewrite `git foo --help`
  to `git help foo` if the `foo` command is not a builtin.

  Ævar Arnfjörð Bjarmason replied to this suggestion that this might
  not please everyone, as `git send-email --help` and
  `git annex --help` were currently expected to show the manual, even
  though these commands are not builtins.

  Dscho, alias Johannes Schindelin, also replied to Sean saying that just
  looking whether the command is a builtin or not might not be enough,
  as Git also installs scripts or executables, and provided some
  example code implementing an `is_in_git_exec_path()` function.

  Ævar and Dscho then discussed a bit if such a function was needed as
  Ævar pointed that we already have a way to dump builtins, other known
  commands and commands unknown to Git, using respectively:

    - `git --list-cmds=builtins`
    - `git --list-cmds=main`
    - `git --list-cmds=others`

  Meanwhile Erik Cervin Edin replied to Ævar's initial reply to Sean
  saying that when a Git alias is configured for `foo` and it's used with
  `--help`, the user is told that `foo` is an alias for another
  command, and the help page for the other command is displayed. So he
  suggested doing something similar for non-builtin commands that are
  missing help pages.

  Erik also mentioned that using `git-foo --help` directly or
  `git foo -h`, instead of `git foo --help`, would allow `git-foo` to
  handle everything.

  brian m. carlson replied to Erik that for man pages it might not be
  possible to distinguish a missing page from another error. He then
  wondered if there is a similar environment variable as `MANPATH` for
  HTML pages, as `MANPATH` on Unix systems instructs `man` to search
  for pages in the directories specified in this variable. He also
  suggested installing the HTML documentation alongside Git's, as it's
  expected on Unix systems to have all man pages installed into the
  same place.

  Junio Hamano, the Git maintainer, then agreed to this suggestion.

  Erik replied to brian and Junio that there was no standard or
  convention around HTML documentation, and talked about the
  `help.htmlPath` configuration variable that could be used to tell Git
  where to look for HTML pages. He also suggested falling back to
  searching a missing HTML page starting at the path of the command.

  The discussion continued for some time between Erik, Junio, Philip
  Oakley and Dscho, especially around the topic of aliases.

  Then Junio spotted the `GIT_HTML_PATH` environment variable in the
  code, and noticed that it can currently be used to specify just
  one directory for HTML pages, while `MANPATH` can be a
  colon-separated list of directories. So he suggested changing the
  code to allow `GIT_HTML_PATH` to also be a colon-separated list of
  directories. This would allow people to install HTML pages in
  directories without the need of administrator rights.

  It looks like no one has yet started working on this though.

<!---
## Developer Spotlight:
-->

## Releases

+ Git [2.35.0](https://public-inbox.org/git/xmqqee4x3pij.fsf@gitster.g/),
[2.35.0-rc2](https://public-inbox.org/git/xmqqwniui6wd.fsf@gitster.g/),
[2.35.0-rc1](https://public-inbox.org/git/xmqq35lp68rw.fsf@gitster.g/),
[2.35.0-rc0](https://public-inbox.org/git/xmqq7db7xfgn.fsf@gitster.g/)
+ Git for Windows [2.35.0(1)](https://github.com/git-for-windows/git/releases/tag/v2.35.0.windows.1),
[2.35.0-rc2(1)](https://github.com/git-for-windows/git/releases/tag/v2.35.0-rc2.windows.1),
[2.35.0-rc1(1)](https://github.com/git-for-windows/git/releases/tag/v2.35.0-rc1.windows.1),
[2.35.0-rc0(1)](https://github.com/git-for-windows/git/releases/tag/v2.35.0-rc0.windows.1)
+ GitLab [14.7](https://about.gitlab.com/releases/2022/01/22/gitlab-14-7-released/)
[14.6.3](https://about.gitlab.com/releases/2022/01/17/gitlab-14-6-3-released/),
[14.6.2, 14.5.3, and 14.4.5](https://about.gitlab.com/releases/2022/01/11/security-release-gitlab-14-6-2-released/),
[14.6.1](https://about.gitlab.com/releases/2022/01/04/gitlab-14-6-1-released/)
+ GitHub Enterprise [3.3.2](https://help.github.com/enterprise-server@3.3/admin/release-notes#3.3.2),
[3.2.7](https://help.github.com/enterprise-server@3.2/admin/release-notes#3.2.7),
[3.1.15](https://help.github.com/enterprise-server@3.1/admin/release-notes#3.1.15),
[3.0.23](https://help.github.com/enterprise-server@3.0/admin/release-notes#3.0.23)

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
* [The Pull Request Paradox: Merge Faster by Promoting Your PR](https://dzone.com/articles/the-pull-request-paradox-merge-faster-by-promoting)
  Adding more context to our Pull Requests got them merged two days faster. Here's how it works. By Dan Lines.
* [What's in a Good Error Message?](https://www.morling.dev/blog/whats-in-a-good-error-message/)
  Some thoughts on ensuring error messages are useful to the reader. By Gunnar Morling.
* [Let's Talk about Error Messages](https://www.codeproject.com/Articles/5322503/Lets-talk-about-Error-Messages)
  More thoughts on error messages, by Brien King.

__Git tools and sites__

* [git-perl-critic](https://github.com/Ovid/git-critic) - Command-line interface for the
  Perl [Git::Critic](https://metacpan.org/pod/Git::Critic) module,
  reporting [Perl::Critic](https://metacpan.org/pod/Perl::Critic) failures
  (that is, code violating Perl best practices) only on lines changed in the current Git branch.
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
  which automatically runs commands like `npm install` when fetching changes from Git,
  but only if certain files have changed.  Extended version of the script presented in
  [Automatically Install NPM Dependencies on Git Pull](https://dev.to/zirkelc/automatically-install-npm-dependencies-on-git-pull-bg0).
* [Husky.Net](https://github.com/alirezanet/Husky.Net) is a Git hooks manager for .NET,
  among others making it possible to run linters against staged Git files.
  Inspired by [husky](https://github.com/typicode/husky),
  [lint-staged](https://github.com/okonet/lint-staged),
  a few other tools, and by [Using C# code in your git hooks](https://kaylumah.nl/2019/09/07/using-csharp-code-your-git-hooks.html)
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
with help from Philip Oakley.
