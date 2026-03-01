---
title: Git Rev News Edition 132 (February 28th, 2026)
layout: default
date: 2026-02-28 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 132 (February 28th, 2026)

Welcome to the 132nd edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of January and February 2026.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->


### Support

* [Slow git pack-refs --all](https://www.google.com/search?q=https://lore.kernel.org/git/CH3PR12MB9026B5872FD42F031970074BC2B3A%40CH3PR12MB9026.namprd12.prod.outlook.com)

  Martin Fick started the discussion by reporting a significant
  performance issue where `git pack-refs --all` was taking over five
  minutes to complete on a large repository (~3M refs) hosted on an
  NFS filesystem. This delay was particularly problematic for Gerrit
  servers because Git holds the `packed-refs.lock` for nearly the
  entire duration, blocking other reference updates. Martin noted that
  JGit was able to perform the same operation in under 20 seconds on
  the same repository, suggesting the bottleneck was specific to the
  Git implementation.

  The `packed-refs` file is used by Git to store a large number of
  references in a single sorted file to avoid the overhead of many
  small "loose" reference files. However, updating this file requires
  rewriting it entirely, and Git typically verifies that objects exist
  and "peels" tags (finding the underlying object a tag points to)
  during this process.

  brian m. carlson replied to Martin, suggesting that the slowdown
  might be occurring in `should_pack_ref()` because Git needs to
  verify that the object at the end of a reference actually
  exists. Brian also pointed out that NFS was likely a major factor,
  as the network latency involved in opening many pack files and
  checking loose objects can be substantial. He suggested setting
  `receive.unpackLimit` to 1 to reduce the number of loose objects
  created in the first place.

  Peff (alias Jeff King) explained that the `packed-refs` file stores
  "tag-peeling" information, which requires Git to open each object
  for newly written refs via `peel_object()` to read its header and
  determine its type. Peff noted that this logic resides in
  `write_with_updates()` within `packed-backend.c`.

  Martin conducted further testing using `strace` and `drop_caches` to
  eliminate filesystem caching interference. He discovered that while
  the actual `write()` calls were fast, there were long gaps—up to
  four minutes in total—where the program was not making any system
  calls. Martin hypothesized that this "hidden" time was spent by the
  kernel handling page faults for `mmap()`ed memory over NFS.

  Patrick Steinhardt concurred that NFS was frequently a source of
  such performance issues, mentioning that GitLab had eventually
  sunsetted the use of NFS for this reason. Patrick suggested using
  `perf(1)` to generate a flame graph to see exactly where the CPU was
  spending time.

  Martin provided a summary of a flame graph, which showed about
  one-third of the time spent in `_memcmp_sse4_1` and another third in
  `unpack_object_header_buffer()`, both accompanied by high page fault
  rates. He also noticed significant time spent in a function he
  identified as `packed_refs_store_create()`.

  Peff corrected the function name to `packed_ref_store_create()` and
  noted that Git might be performing an extra linear pass through the
  `packed-refs` file if it lacks certain header tags. He discovered
  that JGit-generated files were missing the `sorted` and
  `fully-peeled` traits in the header. Without the `sorted` tag, Git
  reads the entire file linearly to verify its order before it can
  perform binary searches. Peff suggested that JGit should be updated
  to write these markers.

  In a final breakthrough, Martin tested adding these tags
  manually. He found that while the `sorted` tag did not provide a
  major boost, adding the `fully-peeled` tag was the "trigger" that
  dropped the execution time from over five minutes to under four
  seconds. The absence of the `fully-peeled` tag was forcing Git to
  re-peel every reference by looking up the objects in the pack files
  over the slow NFS connection.

  The discussion concluded with the identification of a specific
  interoperability issue between JGit and Git. By identifying that the
  missing `fully-peeled` header was causing redundant, expensive I/O
  operations, Martin was able to plan a fix for JGit that would
  resolve the performance bottleneck on his production servers.

<!---
## Developer Spotlight:
-->

## Other News

__Various__
+ [Git 2.53 Released with New Features and Performance Improvements](https://9to5linux.com/git-2-53-released-with-new-features-and-performance-improvements)
  by Marcus Nestor on 9to5Linux.
+ [The Former CEO of GitHub [Thomas Dohmke] Just Agreed: Git Wasn't Built for This [AI-based coding]](https://opzero.sh/blog/github-ceo-agrees-git-dead)
  by Jeff Cameron on OpZero blog,
  following his "interview" with Claude Opus 4.5.
  The idea is to version code, intent, constraints, and reasoning together,
  and to add semantic reasoning layer through a "context graph".
    + One one hand this assumes that AI generated code is a viable path to creating software,
	  and there would be no technical problems like model collapse,
	  or economical problem like cost of training and using LLMs.
	+ On the other hand there exist specialized solutions to help
	  version data (like [DVC](https://dvc.org) or [Pachyderm]((https://www.pachyderm.com/)),
	  or to version database schema.


__Light reading__
+ [Exploring the .git Directory – How Git Stores Your Code](https://www.git-tower.com/blog/posts/exploring-the-git-directory)
  by Bruno Brito on Tower's Blog.
+ [The Ultimate Guide to Git Config: Fine-Tuning Your Git Experience](https://www.git-tower.com/blog/the-ultimate-guide-to-git-config)
  by Bruno Brito on Tower's Blog.
+ [TIL that pathnames in git configs can be optional](https://neverready.app/blog/2026/02-git-blame-ignore/)
  by Anh Tuan Le on his blog.
  It mentions the fact that as of git 2.52 (Nov 2025),
  you can mark config file paths as optional using the `:(optional)` prefix;
  see the ['pathname' entry in "Values" section of `git config` manpage](https://git-scm.com/docs/git-config#Documentation/git-config.txt-pathname).
+ [Git Reflog Explained: Recover Deleted Commits & Lost Work](https://dev.to/itxshakil/git-reflog-explained-recover-deleted-commits-lost-work-i4n)
  by Shakil Alam on DEV\.to.  Has a video version.
+ [I Hate GitHub Actions with Passion](https://xlii.space/eng/i-hate-github-actions-with-passion/)
  by Przemysław Alexander Kamiński on his xlii.space blog.
    + The main problem is with trying to debug [GitHub Actions](https://github.com/features/actions) problems when the action fails;
      [Act](https://github.com/nektos/act), a command line tool
      to run your GitHub Actions locally using the Docker Engine API, could help there.
      Act was first mentioned in [Git Rev News Edition #113](https://git.github.io/rev_news/2024/07/31/edition-113/).
	+ There is also [WRKFLW](https://github.com/bahdotsh/wrkflw),
	  a command-line tool for validating and executing GitHub Actions workflows locally,
      without requiring a full GitHub environment.
      WRKFLW was mentioned in [Git Rev News Edition #126](https://git.github.io/rev_news/2025/08/31/edition-126/).
+ [Git Worktrees with Claude Code, Laravel, and Herd](https://gause.cz/blog/git-worktrees-with-claude-code-laravel-and-herd/)
  by Jakub Gause on his blog (also published [on DEV\.to](https://dev.to/gause/git-worktrees-with-claude-code-laravel-and-herd-49d1)).
  Describes writing a shell script to help (a [laravel-worktrees Claude skill](https://github.com/gausejakub/claude-skills)).
+ [I Built workz: The Zoxide for Git Worktrees That Finally Fixes .env + node_modules Hell in 2026](https://dev.to/rohansx/i-built-workz-the-zoxide-for-git-worktrees-that-finally-fixes-env-nodemodules-hell-in-2026-2dpj)
  by Rohan Sharma on DEV\.to.
  Describes his [workz](https://github.com/rohansx/workz) tool
  that creates a new worktree, and also automatically symlinks 22+ types of dependency dirs
  (like `node_modules`, `target`, `.venv`), copies env/config patterns,
  and can launch your AI coding agent directly in the new worktree.
+ [My self-hosted Git workflow with GitGen](https://cybrkyd.com/post/my-self-hosted-git-workflow-with-gitgen/)
  by cybrkyd; it continues [Showcasing my Git repositories on the web](https://cybrkyd.com/post/showcasing-my-git-repositories-on-the-web/)
  from the [previous edition](https://git.github.io/rev_news/2026/01/31/edition-131/).
    + [GitGen](https://git.cybrkyd.com/GitGen/index.html) is a lightweight static website generator
	  for local Git repositories written in Python;
	  similar tools are [Gitmal](https://github.com/antonmedv/gitmal)
	  and [pgit](https://github.com/picosh/pgit), both written in Go.
+ [I Built a Tool That Writes Obituaries for Your Deleted Code](https://dev.to/lakshmisravyavedantham/i-built-a-tool-that-writes-obituaries-for-your-deleted-code-235l) and
  [commit-prophet: I Built a Tool That Predicts Buggy Files Using Git History](https://dev.to/lakshmisravyavedantham/commit-prophet-i-built-a-tool-that-predicts-buggy-files-using-git-history-35mk)
  by Lakshmi Sravya Vedantham on DEV\.to.
+ [I Read 9,000 Lines of a Stranger's Mergetool](https://dev.to/ticktockbent/i-read-9000-lines-of-a-strangers-mergetool-5bf0)
  by Wes on DEV\.to, about the [ec (easy-conflict)](https://github.com/chojs23/ec) tool.
  This is first entry in the [Review Bomb series](https://dev.to/ticktockbent/series/36103),
  where Wes finds under-the-radar projects on GitHub, read the code, contribute something,
  and write it up.
+ [Simplifying Git by Using GitButler](https://blog.gitbutler.com/simplifying-git):
  seeing git state, branching without fear, understanding and using stacked changes,
  better interactive rebase, easier selective staging, recoverability.
  Written by PJ Hagerty on GitButler Blog.
  [Git Butler](https://www.gitbutler.com/) was first mentioned
  in [Git Rev News Edition #46](https://git.github.io/rev_news/2018/12/19/edition-46/).
  

__Easy watching__
+ [Lost Your Commits? Git Reflog Saves You](https://www.youtube.com/watch?v=NN-8kP7nClA)
  by Shakil Alam on the Shakil Tech channel on YouTube [5:55].


__Git tools and sites__
+ [mise-en-place](https://github.com/jdx/mise) or `mise`, a CLI tool that is
  the front-end to your dev env
  (managing dev tools like node, python, cmake, terraform, etc; and
   managing tasks used to build and test projects),
  [introduced monorepo tasks](https://github.com/jdx/mise/discussions/6564),
  allowing you to manage tasks across multiple projects in a single repository,
  with each project maintaining its own tools, environment variables, and tasks.
    + A monorepo is a software-development strategy
	  in which the code for a number of projects is stored in the same repository.
	  See for example [monorepo.tools](https://monorepo.tools/) site,
	  first mentioned in [Git Rev News Edition #84]().
+ [deff](https://github.com/flamestro/deff) is a TUI tool providing
  interactive, side-by-side file review for git diffs
  with per-file navigation, vertical and horizontal scrolling,
  syntax highlighting, and added/deleted line tinting.
  Written in Rust, under MIT license.
+ [ec (easy-conflict)](https://github.com/chojs23/ec) is a terminal Git mergetool
  with a 3-way TUI and Neovim integration.
  Written in Go, under MIT license.
+ [Maiao](https://github.com/adevinta/maiao): Gerrit-style code review workflow for GitHub.
  Maiao brings the power of stacked pull requests to GitHub,
  enabling you to break large features into small, reviewable commits
  where each commit becomes its own PR.  Provides `git review` command.
  Written in Go, under MIT license.
   + Stacked Pull Requests, also under the name Stacked Diffs,
     were mentioned in [Git Rev News Edition #44](https://git.github.io/rev_news/2018/10/24/edition-44/),
	 [#105](https://git.github.io/rev_news/2023/11/30/edition-105/),
	 [#111](https://git.github.io/rev_news/2024/05/31/edition-111/)
	 (with links to other editions with other articles, and to related tools),
	 [#115](https://git.github.io/rev_news/2024/09/30/edition-115/).
	 [#118](https://git.github.io/rev_news/2024/12/31/edition-118/),
     [#127](https://git.github.io/rev_news/2025/09/30/edition-127/),
	 and [#128](https://git.github.io/rev_news/2025/10/31/edition-128/).
   + Compare with [`av`](https://github.com/aviator-co/av),
     a command-line tool that helps you manage your stacked PRs on GitHub.
	 It was mentioned in [Git Rev News Edition #115](https://git.github.io/rev_news/2024/09/30/edition-115/).
   + [GitButler](https://docs.gitbutler.com/), a Source Code Management system
     designed to manage your branches,
	 [also supports stacked branches](https://blog.gitbutler.com/stacked-branches-with-gitbutler),
	 which was mentioned in [Git Rev News Edition #118](https://git.github.io/rev_news/2024/12/31/edition-118/).
+ [Fresh File Explorer](https://github.com/FreHu/vscode-fresh-file-explorer)
  is a VS Code file explorer which shows only recently modified files
  based on a combination of Git history and your pending changes.
  Written in TypeScript, under MIT license.
    + See also [Fresh File Explorer - vscode extension for navigating recent changes](https://dev.to/frehu/fresh-file-explorer-vscode-extension-for-navigating-recent-changes-13c1)
	  by Frederik Hudák on DEV\.to.
+ [commit-prophet](https://github.com/LakshmiSravyaVedantham/commit-prophet)
  is a command line tool that predict which files are more likely to be have bugs,
  using git history patterns and co-change analysis.
  Written in Python, under MIT license.


## Releases

+ Git [2.53.0](https://lore.kernel.org/git/xmqq4inz13e3.fsf@gitster.g/)
+ Git for Windows [v2.53.0(1)](https://github.com/git-for-windows/git/releases/tag/v2.53.0.windows.1)
+ GitLab [18.9.1, 18.8.5, 18.7.5](https://about.gitlab.com/releases/2026/02/25/patch-release-gitlab-18-9-1-released/),
[18.9](https://about.gitlab.com/releases/2026/02/19/gitlab-18-9-released/),
[18.8.4, 18.7.4, 18.6.6](https://about.gitlab.com/releases/2026/02/10/patch-release-gitlab-18-8-4-released/),
[18.6.2, 18.7.1, 18.8.1](https://about.gitlab.com/releases/2026/02/06/patch-release-gitlab-ai-gateway-18-8-1-released/),
[18.8.3, 18.7.3, 18.6.5](https://about.gitlab.com/releases/2026/02/04/gitlab-18-8-3-released/)
+ Gerrit Code Review [3.11.9](https://www.gerritcodereview.com/3.11.html#3119),
[3.12.5](https://www.gerritcodereview.com/3.12.html#3125),
[3.13.3](https://www.gerritcodereview.com/3.13.html#3133),
[3.13.4](https://www.gerritcodereview.com/3.13.html#3134)
+ GitHub Enterprise [3.20.0](https://docs.github.com/enterprise-server@3.20/admin/release-notes#3.20.0),
[3.19.2](https://docs.github.com/enterprise-server@3.19/admin/release-notes#3.19.2),
[3.18.5](https://docs.github.com/enterprise-server@3.18/admin/release-notes#3.18.5),
[3.17.11](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.11),
[3.16.14](https://docs.github.com/enterprise-server@3.16/admin/release-notes#3.16.14),
[3.15.18](https://docs.github.com/enterprise-server@3.15/admin/release-notes#3.15.18),
[3.14.23](https://docs.github.com/enterprise-server@3.14/admin/release-notes#3.14.23)
+ GitKraken [11.9.0](https://help.gitkraken.com/gitkraken-desktop/current/)
+ GitHub Desktop [3.5.5](https://desktop.github.com/release-notes/)
+ Sourcetree [4.2.17](https://product-downloads.atlassian.com/software/sourcetree/ReleaseNotes/Sourcetree_4.2.17.html)
+ Git Cola [4.17.1](https://github.com/git-cola/git-cola/releases/tag/v4.17.1)
+ GitButler [0.19.3](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.19.3),
[0.19.2](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.19.2)
+ Sublime Merge [Build 2123](https://www.sublimemerge.com/download)
- Tower for Mac [15.1](https://www.git-tower.com/release-notes/mac?show_tab=release-notes)
- Tower for Windows [11](https://www.git-tower.com/blog/tower-windows-11)
- git-flow-next [1.0](https://git-flow.sh/changelog/)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Bruno Brito.
