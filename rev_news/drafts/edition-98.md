---
title: Git Rev News Edition 98 (April 26th, 2023)
layout: default
date: 2023-04-26 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 98 (April 26th, 2023)

Welcome to the 98th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of March 2023 and April 2023.

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

+ Gitea [1.19.1](https://blog.gitea.io/2023/04/gitea-1.19.1-is-released/)


## Other News

__Various__
+ [Git security vulnerabilities announced](https://github.blog/2023-04-25-git-security-vulnerabilities-announced-4/):
  CVE-2023-25652 and CVE-2023-29007,
  and MS Windows specific CVE-2023-25815, CVE-2023-29011, and CVE-2023-29012.
  By Taylor Blau on GitHub Blog. 


__Light reading__
+ [Git and GitHub for Designers](https://www.git-tower.com/blog/git-for-designers/) by Bruno Brito on Tower’s blog.
+ [Git-Sim 3 Month Dev Update: Community Response, New Features, & The Future](https://initialcommit.com/blog/git-sim-3-month-dev-update)
  by Jacob Stopak on Initial Commit.  [Git-Sim](https://github.com/initialcommit-com/git-sim)
  was mentioned in [Git Rev News Edition #95](https://git.github.io/rev_news/2023/01/31/edition-95/).
+ [Smoother rebases with auto-squashing Git commits](https://andrewlock.net/smoother-rebases-with-auto-squashing-git-commits/) and 
  [Super-charging 'git rebase' with 'git absorb'](https://andrewlock.net/super-charging-git-rebase-with-git-absorb/)
  by Andrew Lock on .NET Escapades.
  [git-absorb](https://github.com/tummychow/git-absorb) 
  (a port of Facebook's [hg absorb](https://www.mercurial-scm.org/repo/hg/rev/5111d11b8719) extension for Mercurial)
  was mentioned in passing in [Git Rev News Edition #72](https://git.github.io/rev_news/2021/02/27/edition-72/).
+ [Modeling Git Internals in Alloy, Part 1: Blobs and Trees](https://bytes.zone/posts/modeling-git-internals-in-alloy-part-1-blobs-and-trees/)
  and [Modeling Git Internals in Alloy, Part 2: Commits and Tags](https://bytes.zone/posts/modeling-git-internals-in-alloy-part-2-commits-and-tags/)
  by Brian Hicks on bytes.zone.
  [Alloy](https://bytes.zone/posts/alloy/) is [a tool](http://alloytools.org/)
  (with its own domain-specific programming language)
  used for making and checking models of other software.
+ [Avoiding the merge trap](https://lwn.net/Articles/926240/)
  by Jonathan Corbet on LWN.net ([free preview](https://lwn.net/SubscriberLink/926240/7568dd3f6d66385f/);
  describes how one should explain merges in pull requests sent to Linus Torvalds.
+ [Notes on graphics programming and version control](https://tyler.cafe/graphics-and-versions)
  Tyler Angert on tyler\.cafe blog.
+ [Introducing the Space Git Flow](https://blog.jetbrains.com/space/2023/04/18/space-git-flow/)
  by Evgenia Verbina on JetBrains Blog.  Space Git Flow is a branching strategy
  similar to [Git Flow](https://blog.jetbrains.com/space/2023/04/18/space-git-flow/)
  (first mentioned in [Git Rev News Edition #5](https://git.github.io/rev_news/2015/07/08/edition-5/))
  and specifically [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow),
  used by JetBrains to develop their products including 
  [Space](https://git.github.io/rev_news/2020/03/25/edition-61/) development platform / software forge.<br>
  See also:
    * [Please stop recommending Git Flow!](https://georgestocker.com/2020/03/04/please-stop-recommending-git-flow/)
      by George Stocker, mentioned in [Git Rev News #61](https://git.github.io/rev_news/2020/03/25/edition-61/).
    * [Patterns for Managing Source Code Branches](https://martinfowler.com/articles/branching-patterns.html)
      by Martin Fowler, mentioned first in [Git Rev News #63](https://git.github.io/rev_news/2020/05/28/edition-63/).
+ [Convert git log output to JSON using jq](https://til.simonwillison.net/jq/git-log-json)
  with proper escaping, on Simon Willison’s TILs (Today I've Learned).
+ [Quickly formatting a stack of commits](https://blog.waleedkhan.name/formatting-a-commit-stack/)
  by Waleed Khan on Steno & PL personal blog.
  It uses `git test` command from [git-branchless](https://github.com/arxanas/git-branchless)
  suite of tools, which suite was first mentioned 
  in [Git Rev News Edition #76](https://git.github.io/rev_news/2021/06/27/edition-76/).
+ [How to Install GitQlient on Your Synology NAS](https://mariushosting.com/how-to-install-gitqlient-on-your-synology-nas/)
  by Marius Bogdan Lixandru on his personal blog: Marius Hosting.
+ [Some ~~secret~~ git tricks that come in handy](https://dev.to/atordvairn/some-secret-git-tricks-that-come-in-handy-2k8i)
  by raghav yadav on DEV\.to.
+ [Git banned.h: Why Git's Maintainers Have A List Of Banned Standard C Library Functions](https://initialcommit.com/blog/git-banned-functions)
  by Jacob Stopak on Initial Commit.
+ [GitHub Copilot for CLI makes Terminal scripting and Git as easy as asking a question](https://dev.to/codepo8/github-copilot-for-cli-makes-terminal-scripting-and-git-as-easy-as-asking-a-question-3m81)
  by Christian Heilmann on DEV\.to.

+ [sqlite-history: tracking changes to SQLite tables using triggers](https://simonwillison.net/2023/Apr/15/sqlite-history/)
  by Simon Willison on his Weblog.
+ [SmartCommit: A Graph-Based Interactive Assistant for Activity-Oriented Commits](https://www.cs.cmu.edu/~ckaestne/pdf/fse21_sc.pdf) \[PDF]
  ([DOI:10.1145/3468264.3468551](https://doi.org/10.1145/3468264.3468551)) describes
  graph-partitioning-based interactive tool to help split tangled changeset.
  The paper is accompanied by the [code for core algorithm](https://github.com/Symbolk/SmartCommitCore)
  of SmartCommit, a [demo GUI client](https://github.com/Symbolk/SmartCommit),
  and [dataset and the visualization scripts](https://github.com/Symbolk/SmartCommitEvaluation-Viz)
  used in the article.  There since have been since other similar research conducted,
  like [ComUnt](https://doi.org/10.1145/3545258.3545267)
  and [UTango](https://doi.org/10.1145/3540250.3549171),
  which cite SmartCommit article.

<!---
__Easy watching__
-->

__Git tools and sites__
+ [List of Free Learning Resources (In Many Languages)](https://github.com/EbookFoundation/free-programming-books)
  by the Free Ebook Foundation, includes the list organized by subject,
  where there are [free books about Version Control Systems](https://github.com/EbookFoundation/free-programming-books/blob/main/books/free-programming-books-subjects.md#version-control-systems),
  including Git. Some of those were mentioned in Git Rev News.
  This list was originally a clone of 
  [StackOverflow - List of Freely Available Programming Books](https://web.archive.org/web/20140606191453/http://stackoverflow.com/questions/194812/list-of-freely-available-programming-books/392926).
  Has a dynamic webpage for searching the list at 
  <https://ebookfoundation.github.io/free-programming-books-search/>
+ [GitQlient](https://github.com/francescmm/GitQlient) is a multi-platform Git client written with Qt,
  originally forked from [QGit](https://github.com/tibirna/qgit)
+ [Gut](https://gut-cli.dev/) is a user-friendly Git CLI for Windows, Mac, and GNU/Linux.
  Written in Go, still in alpha stage of development.
+ [srcsnap](http://srcsnap.glitch.me/) ([repository](https://github.com/LingDong-/srcsnap))
  is a screenshot-driven version tracking tool, written using Electron.  It's described in
  [Srcsnap — Screenshot-Driven Version Tracking](https://www.media.mit.edu/projects/srcsnap-screenshot-driven-version-tracking/overview/) post
  on [Future Sketches](https://www.media.mit.edu/groups/future-sketches/overview/)
  MIT Media Lab group blog.
+ [diff2html](https://github.com/rtfpessoa/diff2html) is a JavaScript library
  that generates pretty HTML diffs from git diff or unified diff output.

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
