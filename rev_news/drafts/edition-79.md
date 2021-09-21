---
title: Git Rev News Edition 79 (September 22nd, 2021)
layout: default
date: 2021-09-22 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 79 (September 22nd, 2021)

Welcome to the 79th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of August 2021.

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

## Developer Spotlight: Josh Steadmon

* Who are you and what do you do?

  I'm a Software Engineer at Google, and I work on a team dedicated to
  Git. Outside of work, I'm a husband and a new dad, which doesn't leave
  me much time for anything else :).

  Git is actually my first experience as a professional developer. Up
  until I joined the Git team in 2018, my career had been in system
  administration and reliability engineering.

* What would you name your most important contribution to Git?

  Probably the addition of fuzz tests. Not so much due to impact so far
  (although it has found a few small bugs), but because of the opportunity
  for future work in this area. If I had more time, I'd love to look into
  having a proper fuzz tester for client/server communication, for
  example.

* What are you doing on the Git project these days, and why?

  Until recently, the majority of my work has been internal performance
  monitoring of Git usage by Google developers. Lately I've been winding
  down my work on monitoring and starting to look into improving
  performance and the user experience with submodules. Only the very
  beginnings of that have started to show up on-list so far.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  I think I'd echo my former coworker [Brandon Williams (edition 28)](https://git.github.io/rev_news/2017/06/14/edition-28/#developer-spotlight-brandon-williams),
  and work on cleaning up the global state. For a new-ish developer who
  doesn't have full history on all the various subsystems, it can be
  difficult to follow the logic when there's lots of non-local state being
  modified.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  Not so much to remove as change: I wish it was easier to move away from
  SHA-1 hashes. I'm very happy that brian m. carlson has been working on
  supporting SHA-256.

* What is your favorite Git-related tool/library, outside of Git itself?

  I'm a huge fan of [git-annex](https://git-annex.branchable.com/) and use
  it to keep my ever-growing pile of PDFs and ebooks synced and organized
  across various devices. I also use it to archive primary sources in a
  homebrew personal knowledge base.

## Releases


## Other News

__Various__
* [3 Reasons to Upgrade Git For The First Time Ever](https://dev.to/swyx/3-reasons-to-upgrade-git-2bj3)
  by swyx on DEV.to.
* [Emacs discusses web-based development workflows](https://lwn.net/Articles/867956/)
  by Jake Edge on LWN.net.


__Light reading__
* [Ship / Show / Ask: A modern branching strategy](https://martinfowler.com/articles/ship-show-ask.html)
  by Rouan Wilsenach on martinFowler.com, showing different ways of doing
  Continuous Integration with Pull Request workflow, and explaining when
  to use which method.
* [GitHub merges 'useless garbage' says Linus Torvalds (as new NTFS support added to Linux kernel 5.15)](https://www.theregister.com/2021/09/06/github_merges_useless_garbage_says/)
  by Tim Anderson in The Register.
* [How to Protect Your Private Email Addresses in Git & GitHub?](https://www.geeksforgeeks.org/how-to-protect-your-private-email-addresses-in-git-github/)
  on GeeksforGeeks (GitHub specific with respect to hiding your email while
  still counting your contributions).
* [Advanced Git Workflow Tips](https://blog.jetbrains.com/dotnet/2021/09/13/advanced-git-workflow-tips/)
  by Khalid Abuhakmeh on JetBrains' The .NET Tools Blog, additionally explaining
  how to do the steps from [Rider](https://www.jetbrains.com/rider/)’s .NET IDE UI.
* [Increasing developer happiness with GitHub code scanning](https://github.blog/2021-09-07-increasing-developer-happiness-github-code-scanning/)
  by Sam Partington on the GitHub Blog; the examples use the Go language.
  [GitHub code scanning](https://github.blog/2021-09-07-increasing-developer-happiness-github-code-scanning/)
  uses [CodeQL](https://securitylab.github.com/tools/codeql/) semantic code analysis engine.
* [GitHub Workflow, Merge and Rebase](https://dev.to/aarondski/github-workflow-merge-and-rebase-1cig),
  actually about Git more than about GitHub, by AaronDski on DEV.to.
* [How to Use Git Hooks For Commit Automation](https://www.cloudsavvyit.com/14036/how-to-use-git-hooks-for-commit-automation/)
  by Anthony Heddings on CloudSavvy IT.
* [Run RuboCop on `git commit` with Overcommit Gem](https://prabinpoudel.com.np/articles/run-rubocop-on-git-commit-with-overcommit-gem/)
  by Prabin Poudel on his blog.  [Overcommit gem](https://github.com/sds/overcommit)
  was mentioned in [Git Rev News #63](https://git.github.io/rev_news/2020/05/28/edition-63/),
  along various other hook management tools.


__Git tools and sites__
* [Glean](https://glean.software/): System for collecting, deriving and querying facts about source code.
* [5 JetBrains plugins to upgrade the built-in Git support to the next level!](https://dev.to/anotherdevuser/5-jetbrains-plugins-to-upgrade-the-builtin-git-support-to-the-next-level-3ojf)
  by Thomas Scott on DEV.to.  Similar list for Visual Studio Code was
  presented in [Git Rev News Edition #77](https://git.github.io/rev_news/2021/07/31/edition-77/).
* [GitHub Web Editor: FREE VSCode in the browser](https://dev.to/github/vscode-in-the-browser-for-free-github-web-editor-k4h)
  by Davide 'CoderDave' Benvegnù on DEV.to, about the lightweight code editor,
  based on Visual Studio Code (VSCode), that is a part of [GitHub Codespaces](https://dev.to/github/github-codespaces-ga-any-good-reviewed-and-tested-3e62).
  The GitHub Codespaces project was mentioned in [Git Rev News Edition #63](https://git.github.io/rev_news/2020/05/28/edition-63/).


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
