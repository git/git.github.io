---
title: Git Rev News Edition 79 (September 30th, 2021)
layout: default
date: 2021-09-30 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 79 (September 30th, 2021)

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

### Support

* [bug in `git fsck`?](https://public-inbox.org/git/60DF1C22020000A100042225@gwsmtp.uni-regensburg.de/)

  Last July, Ulrich Windl asked the mailing list whether `git fsck`
  should be able to cleanup orphaned branches. He pointed to
  [a question he asked on StackOverflow](https://stackoverflow.com/questions/68226081/how-to-recover-head-problems-in-filtered-repository)
  as he wanted to get rid of obsolete branches after filtering a repo.

  `git fsck` was complaining about a branch called `bitmap-generic`
  saying `notice: HEAD points to an unborn branch (bitmap-generic)`,
  because that branch was pointing to a commit that didn't exist
  anymore after filtering the repo, and he couldn't delete that branch
  as `git branch -d` errored out with `fatal: Couldn't look up commit
  object for HEAD`.

  Junio Hamano replied to Ulrich that "HEAD pointing at an unborn
  branch is not even a corruption", as that's what happen to the
  default branch when a repo is initialized.

  Ulrich replied that he might have been confused by `git fsck` and
  suggested updating the documentation to explain what "unborn"
  means. Ævar Arnfjörð Bjarmason then agreed with Ulrich that "fsck's
  error messages/reporting is pretty bad". He said that he had been
  working on it though.

  Meanwhile René Scharfe replied to Junio saying that `git branch -D`
  (`-D` is a shortcut for `--delete --force`) should delete a branch
  pointing to an unexisting commit, instead of requiring users to
  first reset the branch to some known commit using
  `git branch --force` and then to delete it with `git branch --delete`.
  In this reply René even provided a patch called `branch: allow deleting
  dangling branches with --force` that implemented what he suggested.

  Ulrich and René then discussed how to actually force a branch in a way
  that it can then be deleted. The issue was that Ulrich tried to
  force the dangling branch, using `git branch --force bitmap-generic`
  when the current branch wasn't a valid one, so the dangling branch
  wasn't restored to a valid commit.

  To René's patch, Junio replied that he felt the filtering process
  Ulrich used shouldn't have left dangling branches hanging around in
  the first place. He agreed though that it should be easy to recover
  from "such a deliberate repository corruption".

  René's patch then fell through the cracks for several weeks, until
  the end of August when
  [René resent it](https://public-inbox.org/git/7894f736-4681-7656-e2d4-5945d2c71d31@web.de/).

  Junio replied that the test in René's patch went "against the
  spirit" of a recently merged patch series by Han-Wen Nienhuys that
  was preparing tests for the new `reftable` ref backend.

  The [reftable backend](https://www.git-scm.com/docs/reftable) was
  initially [proposed and developed](https://lore.kernel.org/git/CAJo=hJtyof=HRy=2sLP0ng0uZ4=S-DpZ5dR1aF+VHVETKG20OQ@mail.gmail.com/)
  in 2017 by Shawn Pearce. An implementation of it has then been integrated in
  [JGit](https://git.eclipse.org/r/plugins/gitiles/jgit/jgit/+/refs/heads/master/Documentation/technical/reftable.md),
  and Han-Wen has been working for some time on versions of this backend
  for Git and libgit2.

  Junio suggested to change parts of the test that were creating or
  testing refs to use higher functions to manipulate refs, instead of
  directly manipulating loose ref files like
  `.git/refs/heads/dangling`.

  Junio, Ævar, Han-Wen, Ulrich and René then discussed different ways
  to change the test, like using the `REFFILES` test
  prerequisite. They wondered if such a dangling ref could also happen
  with the reftable backend, and it seemed that this could indeed
  happen.

  Han-Wen suggested the ref-store test-helper's `update-ref` command
  to manipulate refs instead. Ulrich proposed implementing a new
  `--disarm-safety-belt` option to disable checks for testing
  purposes. Ævar suggested a workaround using an alternate object
  directory.

  Meanwhile Ævar commented a bit on René's resent patch. And René
  replied to the comments, especially noting that `git tag -d` would
  delete a dangling tag even without `--force`.

  René then sent [a version 2](https://public-inbox.org/git/325d64e9-8a31-6ba0-73f2-5e9d67b8682f@web.de/)
  of his resent patch with an updated test that was now
  independent from any ref backend.

  Junio, Ævar and René discussed the patch a bit more, after which René sent
  [a version 3](https://public-inbox.org/git/c192f438-2eaf-c098-9fe4-c03a9d36cbd0@web.de/)
  with a few more improvements to the test.

  As this version of the patch has since been merged into the master
  branch, Git will soon allow to delete dangling branches more easily.

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

+ libgit2 [1.2.0](https://github.com/libgit2/libgit2/releases/tag/v1.2.0)
+ GitLab [13.12.12](https://about.gitlab.com/releases/2021/09/22/gitlab-13-12-12-released/),
[14.3](https://about.gitlab.com/releases/2021/09/22/gitlab-14-3-released/),
[14.2.4](https://about.gitlab.com/releases/2021/09/17/gitlab-14-2-4-released/),
[13.12.11](https://about.gitlab.com/releases/2021/09/02/gitlab-13-12-11-released/),
[14.0.10](https://about.gitlab.com/releases/2021/09/02/gitlab-14-0-10-released/),
[14.2.3](https://about.gitlab.com/releases/2021/09/01/gitlab-14-2-3-released/),
[14.2.2, 14.1.4, and 14.0.9](https://about.gitlab.com/releases/2021/08/31/security-release-gitlab-14-2-2-released/)
+ Bitbucket Server [7.16](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ GitHub Enterprise [3.1.8](https://help.github.com/enterprise-server@3.1/admin/release-notes#3.1.8),
[3.0.16](https://help.github.com/enterprise-server@3.0/admin/release-notes#3.0.16),
[2.22.22](https://help.github.com/enterprise-server@2.22/admin/release-notes#2.22.22),
[3.2.0](https://help.github.com/enterprise-server@3.2/admin/release-notes#3.2.0),
[3.1.7](https://help.github.com/enterprise-server@3.1/admin/release-notes#3.1.7),
[3.0.15](https://help.github.com/enterprise-server@3.0/admin/release-notes#3.0.15),
[2.22.21](https://help.github.com/enterprise-server@2.22/admin/release-notes#2.22.21)
+ GitKraken [8.0.0](https://support.gitkraken.com/release-notes/current)
+ GitHub Desktop [2.9.3](https://desktop.github.com/release-notes/)

## Other News

__Various__
* [3 Reasons to Upgrade Git For The First Time Ever](https://dev.to/swyx/3-reasons-to-upgrade-git-2bj3)
  by swyx on DEV.to.
* [Emacs discusses web-based development workflows](https://lwn.net/Articles/867956/)
  by Jake Edge on LWN.net.


__Light reading__
* [Optimizing Git’s Merge Machinery, Part VI](https://blog.palantir.com/optimizing-gits-merge-machinery-6-7bf887a131d8) by Elijah Newren on Palantir Blog, the final in the series.
* [Ship / Show / Ask: A modern branching strategy](https://martinfowler.com/articles/ship-show-ask.html)
  by Rouan Wilsenach on martinFowler.com, showing different ways of doing
  Continuous Integration with a Pull Request workflow, and explaining when
  to use which method.
* [GitHub merges 'useless garbage' says Linus Torvalds (as new NTFS support added to Linux kernel 5.15)](https://www.theregister.com/2021/09/06/github_merges_useless_garbage_says/)
  by Tim Anderson in The Register.
* [How to Protect Your Private Email Addresses in Git & GitHub?](https://www.geeksforgeeks.org/how-to-protect-your-private-email-addresses-in-git-github/)
  on GeeksforGeeks (GitHub specific with respect to hiding your email while
  still counting your contributions).
* [Advanced Git Workflow Tips](https://blog.jetbrains.com/dotnet/2021/09/13/advanced-git-workflow-tips/)
  by Khalid Abuhakmeh on JetBrains' The .NET Tools Blog, additionally explaining
  how to perform the actions from [Rider](https://www.jetbrains.com/rider/)’s .NET IDE UI.
* [Increasing developer happiness with GitHub code scanning](https://github.blog/2021-09-07-increasing-developer-happiness-github-code-scanning/)
  by Sam Partington on the GitHub Blog; the examples use the Go language.
  [GitHub code scanning](https://github.blog/2021-09-07-increasing-developer-happiness-github-code-scanning/)
  uses the [CodeQL](https://securitylab.github.com/tools/codeql/) semantic code analysis engine.
* [GitHub Workflow, Merge and Rebase](https://dev.to/aarondski/github-workflow-merge-and-rebase-1cig),
  actually more about Git than about GitHub, by AaronDski on DEV.to.
* [How to Use Git Hooks For Commit Automation](https://www.cloudsavvyit.com/14036/how-to-use-git-hooks-for-commit-automation/)
  by Anthony Heddings on CloudSavvy IT.
* [Run RuboCop on `git commit` with Overcommit Gem](https://prabinpoudel.com.np/articles/run-rubocop-on-git-commit-with-overcommit-gem/)
  by Prabin Poudel on his blog.  [Overcommit gem](https://github.com/sds/overcommit)
  was mentioned in [Git Rev News #63](https://git.github.io/rev_news/2020/05/28/edition-63/),
  along various other hook management tools.


__Git tools and sites__
* [Glean](https://glean.software/): System for collecting, deriving and querying facts about source code.
* [5 JetBrains plugins to upgrade the built-in Git support to the next level!](https://dev.to/anotherdevuser/5-jetbrains-plugins-to-upgrade-the-builtin-git-support-to-the-next-level-3ojf)
  by Thomas Scott on DEV.to.  A similar list for Visual Studio Code was
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
with help from Josh Steadmon and Elijah Newren.
