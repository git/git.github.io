---
title: Git Rev News Edition 102 (August 30th, 2023)
layout: default
date: 2023-08-30 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 102 (August 30th, 2023)

Welcome to the 102nd edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of July 2023 and August 2023.

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


## Developer Spotlight: Calvin Wan

* Who are you and what do you do?

  My name is Calvin Wan and I'm a Software Engineer on the Git Core team
  at Google.

* What would you name your most important contribution to Git?

  I'm hoping my in-flight [series for a Git Standard Library](https://public-inbox.org/git/20230810163346.274132-1-calvinwan@google.com/)
  will become my most important contribution to Git...at least for now 😄

* What are you doing on the Git project these days, and why?

  Currently working on getting Git Standard Library merged -- to
  summarize it will serve as the foundation for other libraries in Git
  to be built off of. When we first embarked on this journey towards
  libification, we had many reasons for doing so, most of which Emily
  captured in the [initial proposal](https://lore.kernel.org/git/CAJoAoZ=Cig_kLocxKGax31sU7Xe4==BGzC__Bg2_pr7krNq6MA@mail.gmail.com/).

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  Old style submodules. Submodule development is already difficult to
  work on and having extra bits and pieces in the codebase that exist
  for the sole purpose of not breaking old style submodules added an
  extra layer of complexity I wish I didn't have to reason about.

* Do you happen to have any memorable experience w.r.t contributing to
  the Git project? If yes, could you share it with us?

  Attending Git Merge 2022! I enjoyed meeting the people I had been
  interacting with on list -- putting a face to the name was
  particularly exciting. I also enjoyed the discussions at the
  Contributor Summit and the talks that followed.

* What is your toolbox for interacting with the mailing list and for
  development of Git?

  I develop using VSCode and send my patches with `git format-patch` and
  `git send-email`. For patches upstream, I use `b4 am` + `git am` to
  test locally. When I reply to patches I use a script I modified from
  Jonathan Tan to set up the replies for `git send-email`. For simple
  replies and emails, I use Gmail's plaintext mode.

* What is your advice for people who want to start Git development?
  Where and how should they start?

  I think there are plenty of good resources out there that others have
  probably mentioned before ([Pro Git book](https://git-scm.com/book/en/v2),
  [MyFirstContribution](https://git-scm.com/docs/MyFirstContribution),
  [git-mentoring list](https://groups.google.com/g/git-mentoring/about)),
  but the one suggestion I would have is spend less time worrying about
  getting the right setup and spend more time getting your patches to list!


## Other News

__Various__
+ [Highlights from Git 2.42](https://github.blog/2023-08-21-highlights-from-git-2-42/)
  by Taylor Blau on GitHub Blog.  Those include
  faster object traversals with reachability bitmaps,
  exclude references by pattern in `git for-each-ref`,
  preserving precious objects from garbage collection via `gc.recentObjectsHook`,
  and other changes.
+ [Git 2.42 Released With Less Warnings For SHA-256 Usage](https://www.phoronix.com/news/Git-2.42-Released)
  by Michael Larabel on Phoronix.
+ [Sourceware 25 Roadmap](https://sourceware.org/sourceware-25-roadmap.html):
  roadmap for the next 25 years on \[almost] the 25th anniversary
  (Sourceware came online on 6 September 1998).
    + [Sourceware](https://sourceware.org/) service was first mentioned in
      [Git Rev News Edition #88](https://git.github.io/rev_news/2022/06/30/edition-88/)
+ [Lazygit Turns 5: Musings on Git, TUIs, and Open Source](https://jesseduffield.com/Lazygit-5-Years-On/)
  by Jesse Duffield on his Pursuit Of Laziness blog.
    + [lazygit](https://github.com/jesseduffield/lazygit) is simple [windowed] terminal UI for Git,
      written in Go.  It was first mentioned in [Git Rev News Edition #42](https://git.github.io/rev_news/2018/08/22/edition-42/);
      you can find links to other articles about this tool in [Edition #61](https://git.github.io/rev_news/2020/03/25/edition-61/)
      and [#81](https://git.github.io/rev_news/2021/11/29/edition-81/).


__Light reading__
+ [7 Git Mistakes a Developer Should Avoid](https://www.git-tower.com/blog/7-git-mistakes-a-developer-should-avoid/)
  by Bruno Brito on Tower Blog, describing why:
    + commiting unrelated changes together,
    + writing bad commit messages,
    + not using `.gitignore`,
    + leaving outdated merged-in branches,
    + using force push in shared repository,
    + storing API keys and other secrets in repository,
    + and storing large binary files
  are a problem, and how to prevent them
  (often how to do it with the help of the Tower Git client).
+ [Simplified: 8 Guidelines for Commit Message](https://dev.to/titusnjuguna/simplified-8-guidelines-for-commit-message-536g)
  by Tito (titusnjuguna) on DEV\.to.
+ [Security in Code Reviews: Ensuring Secure and Robust Software Development](https://dev.to/documatic/security-in-code-reviews-ensuring-secure-and-robust-software-development-17kp)
  by Jatin Sharma for Documatic, lists some common security vulnearabilities,
  presentss few examples of real-world incidents, and explains how to
  incorporate security into the code review process (and what are the challenges).
+ [One Git Trick for Perfect Commits](https://0ro.github.io/posts/one-git-trick-for-perfect-commits/)
  by Raman Nikitsenka (0ro) on his blog (and [also on DEV\.to](https://dev.to/0ro/one-git-trick-for-perfect-commits-3728)).
  The trick to avoid "fix: ..." commits littering history
  is to use `git commit --fixup` and `git rebase --interactive --autosquash`
  (before submitting changes).
+ [Git Config Articles: Pragmatic Suggestions for Customizing Your Git Setup from Karl Stolley](https://medium.com/pragmatic-programmers/git-config-articles-beec83c82b91)
  by Margaret Eldridge in The Pragmatic Programmers on Medium.
  It is a list of Git Config articles written by [Karl Stolley](https://medium.com/u/b6139288f4b6)
  for The Pragmatic Programmers.
+ [Simplify Your Workflow 📈: A Guide to Standardizing Commit Messages with Husky 🐶 in Monorepos 📦](https://dev.to/harithzainudin/simplify-your-workflow-a-guide-to-standardizing-commit-messages-with-husky-in-monorepos-542l)
  by Muhammad Harith Zainudin on DEV\.to.
    + [Husky](https://github.com/typicode/husky), a Git hook management tool, was first mentioned in
      [Git Rev News Edition #63](https://git.github.io/rev_news/2020/05/28/edition-63/);
      you can find links to other articles talking about it in
      [#87](https://git.github.io/rev_news/2022/05/26/edition-87/) and
      [#89](https://git.github.io/rev_news/2022/07/31/edition-89/)
    + The idea of Monorepos (using a single repository for the whole codebase)
      was first mentioned in [Git Rev News Edition #4](https://git.github.io/rev_news/2015/06/03/edition-4/).
      You can find links to articles advocating for and against monorepos
      in [Git Rev News Edition #47](https://git.github.io/rev_news/2019/01/23/edition-47/),
      and list of pros and cons of monorepos in
      [Edition #81](https://git.github.io/rev_news/2021/11/29/edition-81/).
      [monorepo.tools](https://monorepo.tools/) is a place where you can find
      information about monorepos and tools for handling them
      (this site was first mentioned in [Git Rev News Edition #84](https://git.g
ithub.io/rev_news/2022/02/28/edition-84/)).
+ [You won’t believe how much time you will save with this Git pre-push hook](https://www.ivanmorgillo.com/2023/07/23/you-wont-believe-how-much-time-you-will-save-with-this-git-pre-push-hook/)
  by Ivan Morgillo on his blog,
  about integrating [Git hooks](https://git-scm.com/docs/githooks) with static code analysis tools,
  such as [Detekt](https://detekt.dev/) (a static code analyzer for Kotlin),
  for Android projects.
+ [Git advanced (text) diff: .odt, .pdf, .doc, .xls, .ppt](https://medium.com/@mbrehin/git-advanced-diff-odt-pdf-doc-xls-ppt-25afbf4f1105)
  by Maxime Bréhin on Medium (2016)
  describes how to configure [`textconv` gitattribute](https://www.git-scm.com/docs/gitattributes#_performing_text_diffs_of_binary_files)
  for those files.
+ [IAMbic: Bridging the Gap Between IAM (Identity and Access Management) Changes and Version Control](https://www.noq.dev/blog/iambic-bridging-the-gap-between-iam-changes-and-version-control)
  by Curtis Castrapel on Noq company blog.  IAMbic detects IAM changes,
  whether you're using Terraform, Cloudformation,
  or directly making changes via the AWS Management Console,
  and creates Git commit to represents the exact state of your IAM
  in a Git repository.
+ [Delta: A new git diff tool to rock your productivity](https://dev.to/cloudx/delta-a-new-git-diff-tool-to-rock-your-productivity-2773)
  by Axel Navarro for Cloud(x); on DEV\.to
  (posted on 16 Jul 2020, updated on 22 May 2022).
    + [Delta](https://dandavison.github.io/delta/),
      a syntax-highlighting pager for git, diff, and grep output,
      was first mentioned in [Git Rev News Edition #86](https://git.github.io/rev_news/2022/04/30/edition-86/).

+ [Git Files Hidden In Plain Sight 🫥](https://tylercipriani.com/blog/2023/07/31/git-files-hidden-in-plain-sight/)
  by Tyler Cipriani on his blog,
  about some wonderful bad ideas,
  like storing data in a repository in such way that GitHub thinks it is empty.


__Easy watching__
+ [Git Hidden Gems - Enrico Campidoglio - NDC Oslo 2023](https://www.youtube.com/watch?v=WtUCZYyv-_w)
  (length: 59:11).  Talks about
  [04:15](https://www.youtube.com/watch?v=WtUCZYyv-_w&t=255s) pretty logs,
  [08:23](https://www.youtube.com/watch?v=WtUCZYyv-_w&t=503s) pretty diffs,
  [10:24](https://www.youtube.com/watch?v=WtUCZYyv-_w&t=624s) staging,
  [18:57](https://www.youtube.com/watch?v=WtUCZYyv-_w&t=1137s) searching,
  [22:27](https://www.youtube.com/watch?v=WtUCZYyv-_w&t=1347s) automation,
  [28:48](https://www.youtube.com/watch?v=WtUCZYyv-_w&t=1728s) dot notation,
  [33:20](https://www.youtube.com/watch?v=WtUCZYyv-_w&t=2000s) rebase onto,
  [38:24](https://www.youtube.com/watch?v=WtUCZYyv-_w&t=2304s) reflog, and
  [45:44](https://www.youtube.com/watch?v=WtUCZYyv-_w&t=2744s) rerere.
+ [Pijul: Version-Control Post-Git • Pierre-Étienne Meunier • GOTO 2023](https://www.youtube.com/watch?v=7MpdZkGj5AI):
  the presentation recorded at GOTO Aarhus 2023 (length: 50:10).
  [Pijul](https://pijul.org/) was first mentioned in
  [Git Rev News Edition #9](https://git.github.io/rev_news/2015/11/11/edition-9/).


__Git tools and sites__
+ [Git Tag Ops](https://github.com/iterative/gto) by Iterative\.AI
  turns your Git repository into an Artifact Registry.
  Together with [DVC](https://dvc.org/) (Data Version Control),
  GTO serves as a backbone for Git-based [Iterative Studio Model Registry](https://dvc.org/doc/studio/user-guide/model-registry/what-is-a-model-registry).
  GTO works by creating annotated Git tags in a standard format.
  Written in Python.
    + [DVC](https://dvc.org/) and GitOps were first mentioned in
      [Git Rev News Edition #42](https://git.github.io/rev_news/2018/08/22/edition-42/).
+ [Turtle](https://gitlab.gnome.org/philippun1/turtle)
  is a graphical interface for version control intended to run on GNOME and Nautilus file manager.
  Written in Python using GTK4 and libadwaita for GUI,
  and [pygit2](https://www.pygit2.org/) for interacting with Git,
  with Nautilus plugin support.
    + See [TortoiseGit](https://tortoisegit.org/),
      Windows Shell interface to Git,
      providing overlay icons showing the file status,
      and a powerful context menu for Git in a file manager.
      Tracked since [Git Rev News Edition #57](https://git.github.io/rev_news/2019/11/20/edition-57/#releases).
    + _Turtles_, _tortoises_, and _terrapins_ are common names
      used for animals from a taxonomical order of reptiles named Testudines.
+ [Commit](https://github.com/m1guelpf/commit)
  is a command palette-style Git client for blazing-fast commits.
  You open it with a keyboard shortcut, write your commit,
  and Commit will automatically detect which repo you've been working on.
  Written using [Tauri](https://tauri.app/) toolkit
  in TypeScript and Node.js for UI, and Rust for backend.
  Inspired by [TailwindUI's Commit template](https://tailwindui.com/templates/commit).
+ [GitButler](https://docs.gitbutler.com/) (currently in _alpha_ phase)
  is intended to be a Source Code Management system designed to manage your branches,
  record and backup your work, be your Git client, help with your code, etc.;
  focusing on everything after writing code in your editor and before sharing it on GitHub.
+ [GQL](https://amrdeveloper.github.io/GQL/) (Git Query Language)
  is a query language with a syntax very similar to SQL,
  with a tiny engine to perform queries on Git repositories
  on the fly without the need to create database files
  or convert `.git` files into any other format.
  Written in Rust.
    + [Gitana](https://github.com/SOM-Research/Gitana),
      [first mentioned](https://livablesoftware.com/gitana-sql-git-repository-inspector/)
      in [Git Rev News Edition #7](https://git.github.io/rev_news/2015/09/09/edition-7/),
      exports the data contained in one or more Git repositories to a relational database,
      relying on an incremental propagation mechanism that refreshes the database content
      with the latest modifications in Git repositories.
      Gitana has been archived in September 2022 and is not maintained anymore.
      Written in Python.
    + [gitbase](https://github.com/src-d/gitbase),
      [first mentioned](https://www.youtube.com/watch?v=f_G1vwynxTg)
      in [Git Rev News Edition #48](https://git.github.io/rev_news/2019/02/27/edition-48/),
      is a SQL database interface to Git repositories (on the fly),
      implementing the MySQL wire protocol.
      It can be used to perform SQL queries about the Git history
      and about the Universal AST (Abstract Syntax Tree) of the code itself.
      Was a part of now defunct [source{d} Community Edition](https://sourced.tech/products/community-edition/),
      still in _alpha_ phase.
      Written in Go.
    + [MergeStat](https://github.com/mergestat/mergestat) ([demo](https://www.mergestat.com/demo))
      enables SQL queries for data in Git repositories (and related sources, such as the GitHub API).
      It allows you to ask questions about the history and contents of your source code.
      Written in TypeScript, can use Docker Compose to run locally.<br>
      [mergestat-lite](https://github.com/mergestat/mergestat-lite)
      is a command-line version of the tool, which runs SQL queries against local git repositories.
      Written in Go.<br>
      MergeStat was included in _"SQL for querying Git repos"_ tools list
      in [Git Rev News Edition #82](https://git.github.io/rev_news/2021/12/30/edition-82/).
    + [World of Code](https://worldofcode.org/)
      is an infrastructure for study of software supply chains,
      utilizing Tokyo Cabinet, custom binary storage, MongoDB, and Clickhouse
      to store data, and which provides shell API
      and (limited) Python API for querying data
      from 173 million Git repositories on their infrastructure.
      Described in [article on arXiv from 2020](https://arxiv.org/abs/2010.16196).
+ [git-com](https://github.com/masukomi/masuconfigs/blob/master/bin/git-scripts/git-com)
  by masukomi is an interactive CLI tool to help you create commit messages
  that are not only readable, but follow a standardized format.
  Described in [this Mastodon thread](https://fosstodon.org/@masukomi@connectified.com/110808660504633258).
  Written in Bash.
+ [git-identity](https://github.com/cookiengineer/git-identity) (in Go) and
  [GitID](https://github.com/InderdeepBajwa/gitid) (in TypeScript, uses Node.js)
  are both tools that provide a convenient command-line interface
  to manage and switch between multiple identities on a single user account.


## Releases

+ Git [2.42.0](https://public-inbox.org/git/xmqqr0nwp8mv.fsf@gitster.g/),
[2.42.0-rc2](https://public-inbox.org/git/xmqqwmxwgfvr.fsf@gitster.g/),
[2.42.0-rc1](https://public-inbox.org/git/xmqqpm3ug824.fsf@gitster.g/),
[2.42.0-rc0](https://public-inbox.org/git/xmqq5y5uli4t.fsf@gitster.g/)
+ Git for Windows [2.42.0(1)](https://github.com/git-for-windows/git/releases/tag/v2.42.0.windows.1),
[2.42.0-rc2(1)](https://github.com/git-for-windows/git/releases/tag/v2.42.0-rc2.windows.1),
[2.42.0-rc1(1)](https://github.com/git-for-windows/git/releases/tag/v2.42.0-rc1.windows.1),
[2.42.0-rc0(1)](https://github.com/git-for-windows/git/releases/tag/v2.42.0-rc0.windows.1)
+ libgit2 [1.7.1](https://github.com/libgit2/libgit2/releases/tag/v1.7.1)
+ Bitbucket Server [8.13](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ GitHub Enterprise [3.9.4](https://help.github.com/enterprise-server@3.9/admin/release-notes#3.9.4),
[3.8.9](https://help.github.com/enterprise-server@3.8/admin/release-notes#3.8.9),
[3.7.16](https://help.github.com/enterprise-server@3.7/admin/release-notes#3.7.16),
[3.6.18](https://help.github.com/enterprise-server@3.6/admin/release-notes#3.6.18),
[3.9.3](https://help.github.com/enterprise-server@3.9/admin/release-notes#3.9.3),
[3.8.8](https://help.github.com/enterprise-server@3.8/admin/release-notes#3.8.8),
[3.7.15](https://help.github.com/enterprise-server@3.7/admin/release-notes#3.7.15),
[3.6.17](https://help.github.com/enterprise-server@3.6/admin/release-notes#3.6.17),
[3.10.0](https://help.github.com/enterprise-server@3.10/admin/release-notes#3.10.0)
+ GitLab [16.3](https://about.gitlab.com/releases/2023/08/22/gitlab-16-3-released/)
[16.2.4](https://about.gitlab.com/releases/2023/08/11/gitlab-16-2-4-released/),
[16.1.4](https://about.gitlab.com/releases/2023/08/03/gitlab-16-1-4-released/),
[16.2.3](https://about.gitlab.com/releases/2023/08/03/gitlab-16-2-3-released/),
[16.2.2, 16.1.3, and 16.0.8](https://about.gitlab.com/releases/2023/08/01/security-release-gitlab-16-2-2-released/)
+ GitKraken [9.7.1](https://help.gitkraken.com/gitkraken-client/current/),
[9.7.0](https://help.gitkraken.com/gitkraken-client/current/),
[9.6.1](https://help.gitkraken.com/gitkraken-client/current/)
+ GitHub Desktop [3.2.9](https://desktop.github.com/release-notes/),
[3.2.8](https://desktop.github.com/release-notes/)
+ git-credential-azure [0.2.2](https://github.com/hickford/git-credential-azure/releases/tag/v0.2.2),
[0.2.1](https://github.com/hickford/git-credential-azure/releases/tag/v0.2.1),
[0.2.0](https://github.com/hickford/git-credential-azure/releases/tag/v0.2.0),
[0.1.0](https://github.com/hickford/git-credential-azure/releases/tag/v0.1.0)
+ git-credential-oauth [0.10.0](https://github.com/hickford/git-credential-oauth/releases/tag/v0.10.0)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
