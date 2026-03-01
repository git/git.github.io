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

* [Slow git pack-refs --all](https://lore.kernel.org/git/CH3PR12MB9026B5872FD42F031970074BC2B3A%40CH3PR12MB9026.namprd12.prod.outlook.com)

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
  exists. brian also pointed out that NFS was likely a major factor,
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

  Following that discovery, a fix was proposed for JGit in
  [Change 1230152](https://eclipse.gerrithub.io/c/eclipse-jgit/jgit/+/1230152).
  Adithya Chakilam submitted the patch, titled "pack-refs: Add
  sorted/fully-peeled flags," to ensure JGit produces packed-refs
  files that Git can process efficiently.

  This resolution not only fixes the immediate performance issue for
  Gerrit servers but also ensures that any environment using a mix of
  JGit and Git will benefit from reduced lock contention and faster
  reference updates.

<!---
## Developer Spotlight:
-->

## Other News

__Various__
+ [What’s new in Git 2.53.0?](https://about.gitlab.com/blog/whats-new-in-git-2-53-0/)
  by Justin Tobler on GitLab Blog.
  The described changes include
  fixes for geometric repacking (adding support for promisor remotes),
  updates to `git fast-import` commit signature handing options,
  and more data being available in `git repo structure` output.
+ [Git 2.53 Released with New Features and Performance Improvements](https://9to5linux.com/git-2-53-released-with-new-features-and-performance-improvements)
  by Marcus Nestor on 9to5Linux.
+ [Git 2.53 Released With More Optimizations, One Step Closer To Making Rust Mandatory](https://www.phoronix.com/news/Git-2.53-Released)
  by Michael Larabel on Phoronix.
+ Gentoo Linux has kicked off its long transition away from Microsoft's GitHub
  to [Codeberg](https://codeberg.org/gentoo/gentoo), an open-source git-hosting service:
  see the [PC Gamer article](https://www.pcgamer.com/software/linux/after-microsoft-couldnt-keep-its-ai-hands-to-itself-a-notoriously-complex-linux-distro-has-started-its-long-march-away-from-github/)
  by Joshua Wolens, 
  and [Gentoo on Codeberg](https://www.gentoo.org/news/2026/02/16/codeberg.html)
  article in Gentoo Linux News.
+ [Vinyl Cache project (formerly Varnish Cache) has left GitHub](https://vinyl-cache.org/organization/moving.html)
  for the self hosted [Forgejo](https://forgejo.org/)
  instance: <https://code.vinyl-cache.org/vinyl-cache/>
+ [Game of Trees Hub's web interface is live](https://opencollective.com/gothub/updates/web-interface-is-now-enabled-and-we-need-more-subscribers).
    + The [Game of Trees Hub](https://gothub.org/)
	  is a transparently funded Git repository hosting service,
	  with infrastructure on OpenBSD and [Game of Trees (GoT)](https://gameoftrees.org/) VCS,
	  mentioned in the [previous edition](https://git.github.io/rev_news/2026/01/31/edition-131/).
+ [Exploring Solutions to Tackle Low-Quality Contributions on GitHub](https://github.com/orgs/community/discussions/185387)
  by Camilla Moraes (@moraesc) on GitHub Community Discussions.
+ [The Former CEO of GitHub [Thomas Dohmke] Just Agreed: Git Wasn't Built for This [AI-based coding]](https://opzero.sh/blog/github-ceo-agrees-git-dead)
  by Jeff Cameron on OpZero blog,
  following his "interview" with Claude Opus 4.5.
  The idea is to version code, intent, constraints, and reasoning together,
  and to add semantic reasoning layer through a "context graph".
  Thomas Dohmke [has launched](https://thenewstack.io/thomas-dohmke-interview-entire/)
  such an open-source developer platform
  for collaboration between developers and AI agents,
  [Entire](https://entire.io/).
    + One one hand this assumes that AI generated code is a viable path to creating software,
	  and there would be no technical problems like model collapse,
	  or economical problem like cost of training and using LLMs.
	+ On the other hand there exist specialized solutions to help
	  version data (like [DVC](https://dvc.org) or [Pachyderm](https://www.pachyderm.com/)),
	  or to version database schema.


__Light reading__
+ [Evolving Git for the next decade](https://lwn.net/Articles/1057561/)
  by Joe Brockmeier on LWN\.net, reporting about Patrick Steinhardt (@pks-t) talk
  at main-track session at FOSDEM 2026.
  Recording of this talk [is available on FOSDEM site](https://fosdem.org/2026/schedule/event/HTJK33-evolving_git_for_the_next_decade/).
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
+ [How to Save Multiple Drafts in Git: A Guide to Using Git Stash](https://www.freecodecamp.org/news/how-to-save-multiple-drafts-in-git-a-guide-to-using-stash/)
  by Chidiadi Anyanwu on freeCodeCamo.
+ [Git renames are not renames](https://lornajane.net/posts/2026/git-renames-are-not-renames)
  (and where it can cause problems)
  by Lorna Jane Mitchell on LornaJane Blog.
+ [The Many Flavors of Ignore Files](https://nesbitt.io/2026/02/12/the-many-flavors-of-ignore-files.html)
  by Andrew Nesbitt on his blog.
  The post talks about the actual git's semantics for “gitignore syntax”.
    + The author wrote [git-pkgs/gitignore](https://github.com/git-pkgs/gitignore),
      a Go library that fully match how git's gitignore patterns work.
+ [git recent: what branch did I work on?](https://remysharp.com/2026/02/12/git-recent),
  about a simple git alias, by Remy Sharp on his blog.
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
+ [GitHub Actions: The Hidden Billing Trap](https://theexceptioncatcher.com/2026/02/github-billing/),
  on how to avoid unexpected costs with a simple settings adjustment.
  Written by Steven Hicks on TheExceptionCatcher.
+ [Git Worktrees with Claude Code, Laravel, and Herd](https://gause.cz/blog/git-worktrees-with-claude-code-laravel-and-herd/)
  by Jakub Gause on his blog (also published [on DEV\.to](https://dev.to/gause/git-worktrees-with-claude-code-laravel-and-herd-49d1)).
  Describes writing a shell script to help (a [laravel-worktrees Claude skill](https://github.com/gausejakub/claude-skills)).
+ [I Built workz: The Zoxide for Git Worktrees That Finally Fixes .env + node_modules Hell in 2026](https://dev.to/rohansx/i-built-workz-the-zoxide-for-git-worktrees-that-finally-fixes-env-nodemodules-hell-in-2026-2dpj)
  by Rohan Sharma on DEV\.to.
  Describes his [workz](https://github.com/rohansx/workz) tool
  that creates a new worktree, and also automatically symlinks 22+ types of dependency dirs
  (like `node_modules`, `target`, `.venv`), copies env/config patterns,
  and can launch your AI coding agent directly in the new worktree.
+ [Agent Identity for Git Commits](https://justin.poehnelt.com/posts/agent-identity-git-commits/)
  by Justin Poehnelt on his blog,
  about how to set up AI agents to have their commits come from a bot account
  without modifying your local git config.
+ [Your Secrets Aren’t Safe: How the .git Directory Can Leak Data via AI Tools](https://dev.to/yoheiseki/your-secrets-arent-safe-how-the-git-directory-can-leak-data-via-ai-tools-4ioo)
  by Yohei Seki on DEV\.to.
  The problem is that malicious MCP server or Skill
  can access leaked secrets even if they were removed from the project
  (you should treat any committed secret as compromised, and invalidate it;
  using `git filter-repo` or BFG RepoCleaner to rewrite history might be a choice).
  They can also access authentication information if embedded in `.git/config`.
+ [Git in Postgres](https://nesbitt.io/2026/02/26/git-in-postgres.html)
  by Andrew Nesbitt on his blog (following
  [Package managers keep using git as a database, it never works out](https://nesbitt.io/2025/12/24/package-managers-keep-using-git-as-a-database.html),
  mentioned in [Git Rev News Edition #130](https://git.github.io/rev_news/2025/12/31/edition-130/) from December).
  In this post he describes how he created Git backend using relational database:
  [gitgres](https://github.com/andrew/gitgres)
  (implementing the libgit2 `git_odb_backend` and `git_refdb_backend` interfaces
  against PostgreSQL through libpq).
  He acknowledges that right now gitgres is just a neat hack,
  as it does not currently implements delta compression;
  nevertheless it might be good solution for small instances of software forges
  for small projects.
    + Compare with [git-remote-sqlite](https://github.com/chrislloyd/git-remote-sqlite),
	  a Git [remote protocol helper](https://git-scm.com/docs/gitremote-helpers)
	  that helps you store a Git repository in a SQLite database,
	  mentioned in [Git Rev News Edition #127](https://git.github.io/rev_news/2025/09/30/edition-127/).
+ [The nightmare that is squash merge ft GitHub](https://www.narendravardi.com/the-nightmare-that-is-squash-merge-ft-github/)
  by Narendra Vardi on his blog,
  about how to fix merge conflicts cause by squash merge using interactive rebase.
+ [How Poor Git Branching Practices Quietly Damage Software Quality](https://akdevcraft.substack.com/p/how-poor-git-branching-practices)
  by AK DevCraft on Substack (and also [on DEV\.to](https://dev.to/akdevcraft/how-poor-git-branching-practices-quietly-damage-software-quality-nf7)),
  about the Environment-Based Branching antipattern.
    + The [Patterns for Managing Source Code Branches](https://martinfowler.com/articles/branching-patterns.html)
      by Martin Fowler, mentioned first in [Git Rev News Edition #63](https://git.github.io/rev_news/2020/05/28/edition-63/),
	  also talks about this antipattern.
+ [Why [pure] GitOps Doesn't Work at Scale (and What to Do Instead)](https://ctrlplane.dev/blog/why-gitops-doesnt-work-at-scale)
  by Justin Brooks (@jsbrooks) at ctrlplane (also [on DEV\.to](https://dev.to/jsbroks/why-gitops-doesnt-work-at-scale-and-what-to-do-instead-2p91)).
  He writes why for enterprise scale workflows platform-level orchestration is needed.
+ [GitHub Actions Is Slowly Killing Your Engineering Team](https://www.iankduncan.com/engineering/2026-02-05-github-actions-killing-your-team/)
  and [No, Really, Bash Is Not Enough: Why Large-Scale CI Needs an Orchestrator](https://www.iankduncan.com/engineering/2026-02-06-bash-is-not-enough/)
  by Ian Duncan on his blog.
+ [My self-hosted Git workflow with GitGen](https://cybrkyd.com/post/my-self-hosted-git-workflow-with-gitgen/)
  by cybrkyd; it continues [Showcasing my Git repositories on the web](https://cybrkyd.com/post/showcasing-my-git-repositories-on-the-web/)
  from the [previous edition](https://git.github.io/rev_news/2026/01/31/edition-131/).
    + [GitGen](https://git.cybrkyd.com/GitGen/index.html) is a lightweight static website generator
	  for local Git repositories written in Python;
	  similar tools are [Gitmal](https://github.com/antonmedv/gitmal)
	  and [pgit](https://github.com/picosh/pgit), both written in Go.
+ [The bare minimum for syncing Git repos](https://alexwlchan.net/2026/bare-git/)
  by Alex Chan on her blog.
+ [The Disconnected Git Workflow](https://ploum.net/2026-01-31-offline-git-send-email.html)
  by Lionel Dricot (Ploum);
  (sidenote: there exist [git-credential-oauth](https://github.com/hickford/git-credential-oauth),
  that can solve some of the problems with sending a small one-off patch to a GitHub project).
+ [git.usebox.net and bots](https://www.usebox.net/jjm/blog/git-usebox-net-and-bots/)
  by Juan J. Martínez on his Personal Log,
  about his modification of [gitweb](https://git-scm.com/docs/gitweb)
  to block AI crawlers (that do not respect `robots.txt`)
+ [I Built a Tool That Writes Obituaries for Your Deleted Code](https://dev.to/lakshmisravyavedantham/i-built-a-tool-that-writes-obituaries-for-your-deleted-code-235l) and
  [commit-prophet: I Built a Tool That Predicts Buggy Files Using Git History](https://dev.to/lakshmisravyavedantham/commit-prophet-i-built-a-tool-that-predicts-buggy-files-using-git-history-35mk)
  by Lakshmi Sravya Vedantham on DEV\.to.
+ [I Read 9,000 Lines of a Stranger's Mergetool](https://dev.to/ticktockbent/i-read-9000-lines-of-a-strangers-mergetool-5bf0)
  by Wes on DEV\.to, about the [ec (easy-conflict)](https://github.com/chojs23/ec) tool.
  This is first entry in the [Review Bomb series](https://dev.to/ticktockbent/series/36103),
  where Wes finds under-the-radar projects on GitHub, read the code, contribute something,
  and write it up.
+ [Return to GitHub](https://underlap.org/return-to-github/)
  by Glyn Normington on underlap blog;
  the move of [ipc-channel-mux](https://crates.io/crates/ipc-channel-mux)
  from [Codeberg](https://codeberg.org/glyn/ipc-channel-mux) to [GitHub](https://github.com/glyn/ipc-channel-mux)
  was caused by the need for CI on Windows
  (without having to self-host CI runners).
+ [Simplifying Git by Using GitButler](https://blog.gitbutler.com/simplifying-git):
  seeing git state, branching without fear, understanding and using stacked changes,
  better interactive rebase, easier selective staging, recoverability.
  Written by PJ Hagerty on GitButler Blog.
  [Git Butler](https://www.gitbutler.com/) was first mentioned
  in [Git Rev News Edition #46](https://git.github.io/rev_news/2018/12/19/edition-46/).
+ [GitButler CLI Is Really Good](https://matduggan.com/gitbutler-cli-is-really-good/)
  by @matdevdug on matduggan\.com.
+ [Introducing jjq, a local merge queue for jj](https://pauladamsmith.com/blog/2026/02/introducing-jjq-a-local-merge-queue-for-jj.html)
  by Paul Smith on his blog.
  [Jujutsu (`jj`)](https://jj-vcs.dev/) is a Git-compatible
  version control system written in Rust, which was first mentioned
  in [Git Rev News Edition #85](https://git.github.io/rev_news/2022/03/31/edition-85/).

+ [15+ years later, Microsoft morged my diagram](https://nvie.com/posts/15-years-later/)
  by Vincent Driessen, on how Microsoft's Learn portal included
  AI generated diagram with the rough shape of the one in the
  [A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/),
  but with some GenAI glitches (like the text "Bugfixes from rel, branch may be
  **continvoucly** morged back into develop"), and arrows missing
  or pointing in the wrong direction, or missing the node.
  The image has been replaced since then;
  you can see the original compared to Microsoft one
  in the [PC Gamer article about this issue](https://www.pcgamer.com/software/ai/microsoft-uses-plagiarized-ai-slop-flowchart-to-explain-how-github-works-removes-it-after-original-creator-calls-it-out-careless-blatantly-amateuristic-and-lacking-any-ambition-to-put-it-gently/).


__Easy watching__
+ [Evolving Git for the next decade](https://fosdem.org/2026/schedule/event/HTJK33-evolving_git_for_the_next_decade/)
  by Patrick Steinhardt [47:46],
  a main track talk at FOSDEM (Free and Open source Software Developers' European Meeting),
  given on Saturday, 31 January 2026, Brussels.
  See also [the summary of this talk](https://lwn.net/Articles/1057561/)
  by Joe Brockmeier on LWN\.net (mentioned in the "Light reading" section).
+ [Lost Your Commits? Git Reflog Saves You](https://www.youtube.com/watch?v=NN-8kP7nClA)
  by Shakil Alam on the Shakil Tech channel on YouTube [5:55].
+ [Configure your Git](https://www.youtube.com/watch?v=G3NJzFX6XhY)
  by Denis Gruzdev aka @codingjerk
  on the codingjerk channel on YouTube [14:02]:
  a brief review on their personal git config / setup,
  showing some of the most used commands, settings, and aliases.


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
+ [difi](https://github.com/oug-t/difi) is a TUI tool that helps you
  review and refine Git diffs before you push.
  Written in Go, using the [Bubble Tea](https://github.com/charmbracelet/bubbletea) library,
  under MIT license.
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
+ [Diffs](https://diffs.com/), aka [`@pierre/diffs`](https://github.com/pierrecomputer/pierre/tree/main/packages/diffs),
  is an open source diff and file rendering library built on 
  [Shiki](https://shiki.style/) syntax highlighter.
  It supports split (side-by-side) or stacked (unified diff) layout,
  different diff highlight styles, in-line highlighting, wrapping, line numbers.
  Includes annotation framework for injecting comments and annotations, and more.
  Written in TypeScript, under Apache 2.0 license.
  Intended for use in web applications.
  Diffs is in early active development—APIs are subject to change.
    + Compare with [diff2html](https://diff2html.xyz/) ([repo on GitHub](https://github.com/rtfpessoa/diff2html)),
	  a pretty diff to HTML JavaScript library:
	  diff parser and pretty HTML generator.
	  Written in TypeScript, under MIT license.
	  Provides [diff2html-cli](https://github.com/rtfpessoa/diff2html-cli),
	  [used by](https://diff2html.xyz/#users), among others
	  [Ungit](https://github.com/FredrikNoren/ungit),
	  [Diffy](https://diffy.org/), [git-explorer](https://github.com/thescientist13/git-explorer),
	  [Simple Git](https://github.com/mauricioszabo/simple-git),
	  [git-tabular-diff](https://github.com/jstritch/git-tabular-diff).
	  diff2html was first mentioned in [Git Rev News Edition #98](https://git.github.io/rev_news/2023/04/30/edition-98/),
	  and diff2html-cli in [Git Rev News Edition #14](https://git.github.io/rev_news/2016/04/20/edition-14/).
+ [Gitnuro](https://gitnuro.com/) is a multiplatform Git client,
  based on JetBrains Compose and JGit.
  [Written](https://github.com/JetpackDuba/Gitnuro) in Kotlin, under GPL 3.0 license.
+ [RelaGit](https://rela.dev/) - the elegant solution to graphical version control,
  is a multiplatform Git GUI written in TypeScript.  Under LGPL 3.0 license.
  RelaGit is in an early beta stage.
+ [SourceGit](https://github.com/sourcegit-scm/sourcegit) is an opensource Git GUI client
  that supports Windows, macOS, and Linux.
  Includes built-in [conventional commit](https://www.conventionalcommits.org/) message helper,
  and support for using AI to generate commit message.
  Written in C#, using [Avalonia](https://avaloniaui.net) cross-platform UI framework,
  under MIT license.
+ [git-toolbelt](https://github.com/nvie/git-toolbelt) is a suite of useful Git commands
  that aid with scripting or every day command line usage.
  Written in shell, under BSD-3-Clause license.
    + See [Git power tools for daily use](https://nvie.com/posts/git-power-tools/)
	  by Vincent Driessen, the author of git-flow (2018).
+ [sqldef](https://sqldef.github.io/) is a [CLI tool](https://github.com/sqldef/sqldef) for diffing two SQL schemas.
  You can use it to manage the migration of RDBMSs using regular SQL DDLs.
  Supported databases: MySQL, MariaDB, TiDB, PostgreSQL, SQL Server, and SQLite3.
  Written in Go, under MIT license
  (for everything except parser, which is under Apache 2.0 license).
    + Compare with [sqldiff.exe](https://www.sqlite.org/sqldiff.html),
	  a command-line utility program (Windows binary)
	  that displays content differences between two SQLite databases,
	  mentioned in [Git Rev News Edition #87](https://git.github.io/rev_news/2022/05/26/edition-87/).
	+ Compare with [pg-diff](https://michaelsogos.github.io/pg-diff/),
	  a PostgreSQL schema and data comparing tool written in JavaScript,
	  mentioned in [Git Rev News Edition #108](https://git.github.io/rev_news/2024/02/29/edition-108/).
	+ Compare with [git-sqlite](https://github.com/cannadayr/git-sqlite),
	  a custom diff and merge driver for SQLite,
	  mentioned in [Git Rev News Edition #127](https://git.github.io/rev_news/2025/09/30/edition-127/).
+ [Fresh File Explorer](https://github.com/FreHu/vscode-fresh-file-explorer)
  is a VS Code file explorer which shows only recently modified files
  based on a combination of Git history and your pending changes.
  Written in TypeScript, under MIT license.
    + See also [Fresh File Explorer - vscode extension for navigating recent changes](https://dev.to/frehu/fresh-file-explorer-vscode-extension-for-navigating-recent-changes-13c1)
	  by Frederik Hudák on DEV\.to.
+ [Git Remote Color](https://github.com/jpoehnelt/vscode-git-remote-color)
  is a VS Code extension that automatically colors your VS Code workspace
  based on the git remote URL: every repository gets its own unique, consistent color.
  Inspired by [Peacock](https://marketplace.visualstudio.com/items?itemName=johnpapa.vscode-peacock) extension, but fully automatic using a deterministic hash of the git remote.
    + See also [VS Code Git Remote Color](https://justin.poehnelt.com/posts/vscode-git-remote-color/)
	  by Justin Poehnelt on his blog.
+ [commit-prophet](https://github.com/LakshmiSravyaVedantham/commit-prophet)
  is a command line tool that predict which files are more likely to be have bugs,
  using git history patterns and co-change analysis.
  Written in Python, under MIT license.
+ [Majutsu](https://github.com/0WD0/majutsu) provides a [Magit](https://magit.vc/)-style
  interface for [Jujutsu (`jj`)](https://www.jj-vcs.dev/),
  offering an efficient way to interact with JJ repositories from within Emacs.
  Primary project license is GNU GPL v3 or later,
  but it was previously distributed under MIT license terms.
+ [The Missing GitHub Status Page](https://mrshu.github.io/github-statuses/)
  is a third-party service that tracks 90 days uptime;
  created because GitHub stopped updating its [GitHub Status](https://www.githubstatus.com/) page
  with aggregate uptime numbers.


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
