---
title: Git Rev News Edition 86 (April 30th, 2022)
layout: default
date: 2022-04-30 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 86 (April 30th, 2022)

Welcome to the 86th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of March 2022.

## Discussions

<!---
### General
-->

### Reviews

* [[PATCH 0/5] Separate `--skip-refresh` from `--quiet` in `reset`, use `--quiet` internally in `stash`](https://lore.kernel.org/git/pull.1170.git.1647043729.gitgitgadget@gmail.com/)

  Victoria Dye sent a 5 patch long series to improve the following:

    - the way the `--quiet` command line options work in `git reset`,
    - the way index refreshing is handled in `git reset`, and
    - the way the `--quiet` and `--index` command line option work in
    `git stash`.

  She had discovered issues with these features when she was working
  on tests for the `git stash` sparse index integration. (See Victoria's
  interview in last month's
  [Git Rev News Edition #85](https://git.github.io/rev_news/2022/03/31/edition-85/)
  for information on Victoria's current work.) She found that
  `--quiet` in `git stash` does not suppress all non-error output when
  used with `--index`, and that this comes from `reset_head()` being
  called without the internal flag corresponding to `--quiet`.

  When calling `reset_head()` with the flag set though, the index
  is not refreshed, while `git stash` needs the index to be refreshed.
  The underlying issue was that the internal flags related to
  `--quiet` and refreshing the index were not independent.

  So the first goal with her patch series was to decouple these
  behaviors, and the second goal was to allow `git stash` to
  internally use `reset_head()` with the internal flag corresponding
  to `--quiet` and to still refresh the index.

  To decouple the behaviors one of her patches introduced the
  `--[no-]refresh` option and the corresponding `reset.refresh` config
  setting to `git reset`. Derrick Stolee, who prefers to be called
  just Stolee, reviewed the patch series and agreed that the changes
  in that patch were "well motivated", and otherwise he found that the
  "code looks great", and he mostly suggested improvements to the
  tests.

  Junio Hamano, the Git maintainer, also agreed that it was a good
  idea to separate refreshing from `--quiet`.

  Victoria then sent [a version 2](https://lore.kernel.org/git/pull.1170.v2.git.1647274230.gitgitgadget@gmail.com/)
  of her patch series, with improvements to the tests, some commit
  messages and the cover letter title.

  Junio then reviewed the patch series and mostly suggested further
  improvements to the tests saying that otherwise "everything looked
  good", while Stolee was happy with the series as it took into
  account all his previous suggestions.

  Victoria then sent [a version 3](https://lore.kernel.org/git/pull.1170.v3.git.1647308982.gitgitgadget@gmail.com/)
  of her patch series that added a few more tests and improved some
  others.

  Junio and Victoria then discussed the tests a bit more, and Junio
  agreed with Victoria's approach.

  Phillip Wood though chimed in a few days later saying that the
  approach taken by the patch series, which consisted in still not
  refreshing the index by default when `--quiet` was given, was maybe
  not the best. He considered that it was a "hack" that had been
  introduced for performance reasons before the sparse index feature
  was introduced, and that we should take the opportunity to get rid of
  it and go back to the original behavior of refreshing the index when
  `--quiet` was given.

  Junio agreed with Phillip saying that "he would very much prefer to
  see `--quiet` not making a contribution to the decision to refresh or
  not in the longer term".  He suggested introducing `--no-refresh` to
  `git reset` and said he thought `reset.refresh` wasn't a good idea
  as it could lead to issues for people using `git reset` in scripts.

  Victoria replied that she agreed with them but wanted to preserve as
  much backward compatibility as possible. She said she would gladly
  make the change if backwards-compatibility wasn't an issue. She also
  asked if `reset.quiet` should be kept as it could also harm people
  using `git reset` in scripts.

  As her patch series had already been merged into the `next` branch,
  she would send a new series on top deprecating `reset.refresh` and
  `reset.quiet`, and making refreshing the default for all modes of `git
  reset`.

  Later she indeed sent the first version of
  [a 4 patch long series](https://lore.kernel.org/git/pull.1184.git.1647894889.gitgitgadget@gmail.com/)
  removing all instances of skipping index refresh in `git reset`
  except for `--no-refresh` itself, and removing both `reset.refresh`
  and `reset.quiet`.

  Phillip reviewed her new patch series suggesting to allow both
  `--no-refresh` and `--refresh` as one patch of the series removed
  the latter. He said that `--refresh` could be used to countermand a
  previous `--no-refresh` typically when using an alias that includes
  `--no-refresh`. He also discussed possible improvements to the
  documentation of `--refresh` and to commit messages.

  Victoria then sent
  [a version 2 of this new patch series](https://lore.kernel.org/git/pull.1184.v2.git.1648059480.gitgitgadget@gmail.com/)
  taking into account Phillip's suggestions.

  Junio liked the changes and agreed to merge the series. Later
  though, Phillip suggested that the short help sentence given by `git
  reset -h` should be about `--no-refresh` instead of `--refresh` as this
  was "the form that users will want most of the time".

  Junio agreed with Phillip's suggestion. He had already merged the
  series to `next` though, so he proposed another patch on top
  implementing Phillip's suggestion. Victoria tested the patch and
  agreed with it. Junio replied he would merge it then.

  All these patches were indeed merged into the master branch before
  the recent release of the latest Git 2.36.0, so that in this new Git
  version `git reset` and `git stash` handle some of their options in
  a much better way.

<!---
### Support
-->

<!---
## Developer Spotlight:
-->

## Releases

+ Git [2.36.0](https://public-inbox.org/git/xmqqh76qz791.fsf@gitster.g/),
[2.35.3 and below as a usability fix](https://public-inbox.org/git/xmqq1qy04iqa.fsf@gitster.g/),
[2.36.0-rc2](https://public-inbox.org/git/xmqqfsmib5el.fsf@gitster.g/),
[2.35.2 and below for CVE-2022-24765 and CVE-2022-24767](https://public-inbox.org/git/xmqqv8veb5i6.fsf@gitster.g/),
[2.36.0-rc1](https://public-inbox.org/git/xmqqy20fjgpy.fsf@gitster.g/),
[2.36.0-rc0](https://public-inbox.org/git/xmqqo81gpokn.fsf@gitster.g/)
+ Git for Windows [2.36.0(1)](https://github.com/git-for-windows/git/releases/tag/v2.36.0.windows.1),
[2.36.0-rc2(1)](https://github.com/git-for-windows/git/releases/tag/v2.36.0-rc2.windows.1),
[2.36.0-rc1(1)](https://github.com/git-for-windows/git/releases/tag/v2.36.0-rc1.windows.1),
[2.36.0-rc0(1)](https://github.com/git-for-windows/git/releases/tag/v2.36.0-rc0.windows.1),
[2.35.3(1)](https://github.com/git-for-windows/git/releases/tag/v2.35.3.windows.1),
[2.35.2(1)](https://github.com/git-for-windows/git/releases/tag/v2.35.2.windows.1)
+ libgit2 [1.4.3](https://github.com/libgit2/libgit2/releases/tag/v1.4.3)
+ GitHub Enterprise [3.4.2](https://help.github.com/enterprise-server@3.4/admin/release-notes#3.4.2),
[3.3.7](https://help.github.com/enterprise-server@3.3/admin/release-notes#3.3.7),
[3.2.12](https://help.github.com/enterprise-server@3.2/admin/release-notes#3.2.12),
[3.1.20](https://help.github.com/enterprise-server@3.1/admin/release-notes#3.1.20),
[3.4.1](https://help.github.com/enterprise-server@3.4/admin/release-notes#3.4.1),
[3.3.6](https://help.github.com/enterprise-server@3.3/admin/release-notes#3.3.6),
[3.2.11](https://help.github.com/enterprise-server@3.2/admin/release-notes#3.2.11),
[3.1.19](https://help.github.com/enterprise-server@3.1/admin/release-notes#3.1.19)
+ GitLab [14.10](https://about.gitlab.com/releases/2022/04/22/gitlab-14-10-released/)
[14.9.3](https://about.gitlab.com/releases/2022/04/12/gitlab-14-9-3-released/),
[14.6.7](https://about.gitlab.com/releases/2022/04/01/gitlab-14-6-7-released/),
[14.9.2, 14.8.5, and 14.7.7](https://about.gitlab.com/releases/2022/03/31/critical-security-release-gitlab-14-9-2-released/)
+ GitKraken [8.4.0](https://support.gitkraken.com/release-notes/current)
+ GitHub Desktop [3.0.0](https://desktop.github.com/release-notes/),
[2.9.15](https://desktop.github.com/release-notes/),
[2.9.14](https://desktop.github.com/release-notes/),
[2.9.13](https://desktop.github.com/release-notes/)

## Other News

__Various__

+ [Git security vulnerability announced](https://github.blog/2022-04-12-git-security-vulnerability-announced/)
  by Taylor Blau.
    + [The risks of embedded bare repositories in Git](https://lwn.net/Articles/892755/)
      by Jake Edge on LWN ([free link for non-subscribers](https://lwn.net/SubscriberLink/892755/a087f0c8092e873e/)).
+ [Highlights from Git 2.36](https://github.blog/2022-04-18-highlights-from-git-2-36/)
  by Taylor Blau.
+ [Public open source projects are eligible for Ultimate [GitLab] tier features](https://about.gitlab.com/blog/2022/02/04/ultimate-perks-for-open-source-projects/)
  by Orit Golowinski on GitLab blog.
+ [GitHub can now auto-block commits containing API keys, auth tokens](https://www.bleepingcomputer.com/news/security/github-can-now-auto-block-commits-containing-api-keys-auth-tokens/)
  by Sergiu Gatlan.


__April Fool's__

+ [Make a cup of coffee with Git](https://opensource.com/article/22/4/brew-coffee-git-command)
  by Moshe Zadka on opensource\.com.
+ [Announcing git snail-mail](https://drewdevault.com/2022/04/01/git-snail-mail.html)
  on Drew DeVault's blog... which almost got created for real (though without `git scan-mail` it would require).


__Light reading__

+ [Securing Developer Tools: Git Integrations](https://blog.sonarsource.com/securing-developer-tools-git-integrations)
  by Thomas Chauchefoin on SonarSource blog.
+ [Mac Dev Survey 2022 Results](https://www.git-tower.com/blog/mac-dev-survey-2022-results/) by Kristian Lumme on Tower's blog.
+ [Setting Up Git on Windows Subsystem for Linux](https://www.git-tower.com/blog/git-wsl/) by Bruno Brito on Tower's blog.
+ [How to Clean Up Fully Merged Feature Branches](https://www.git-tower.com/blog/how-to-clean-up-merged-feature-branches/) by Bruno Brito on Tower's blog.
+ [How to Use the Git Stash Command](https://www.freecodecamp.org/news/git-stash-commands/)
  by Preethi on freeCodeCamp.
+ [Git Credential Manager: authentication for everyone](https://github.blog/2022-04-07-git-credential-manager-authentication-for-everyone/)
  by Matthew John Cheetham on GitHub blog, in [Engineering](https://github.blog/category/engineering/).
+ [The friend zone: friendly forks 101](https://github.blog/2022-04-25-the-friend-zone-friendly-forks-101/)
  by Lessley Dennington on GitHub blog, in [Engineering](https://github.blog/category/engineering/) and [Open Source](https://github.blog/category/open-source/).
+ [Handling messy pull-request diffstats](https://lwn.net/Articles/889760/)
  by Jonathan Corbet on LWN ([free link for non-subscribers](https://lwn.net/SubscriberLink/889760/1b10fc1d270a0874/)).
    + Present in the Linux kernel documentation as [maintainer/messy-diffstat.rst](https://github.com/torvalds/linux/blob/master/Documentation/maintainer/messy-diffstat.rst).
+ [Radicle: a Decentralized Alternative to GitHub for Web3](https://thenewstack.io/radicle-a-decentralized-alternative-to-github-for-web3/)
  by Jake Ludington on The New Stack. [Radicle](https://radicle.xyz/) was previously mentioned in
  [Git Rev News Edition #49](https://git.github.io/rev_news/2019/03/20/edition-49/) and [#70](https://git.github.io/rev_news/2020/12/26/edition-70/).
+ [Explaining Git branches with a LEGO analogy](https://opensource.com/article/22/4/git-branches)
  by Seth Kenlon on opensource\.com.
+ [Make your own Git subcommands](https://opensource.com/article/22/4/customize-git-subcommands)
  by Seth Kenlon on opensource\.com.
+ [How I use the Git `for-each-ref` command for DevOps](https://opensource.com/article/22/4/git-each-ref-command)
  by Evan "Hippy" Slatis on opensource\.com.
+ [My guide to understanding Git `rebase -i`](https://opensource.com/article/22/4/manage-git-commits-rebase-i-command)
  by Vaishnavi R on opensource\.com.
+ [How to "Undo" Pushed Commits with Git](https://dev.to/github/how-to-undo-pushed-commits-with-git-2pe6)
  by Rizèl Scarlett for GitHub on DEV.
+ [5 resources to get your Monorepo off the ground](https://dev.to/mbarzeev/5-resources-to-get-your-monorepo-off-the-ground-3mlp)
  by Matti Bar-Zeev on DEV; 
    + first mention of monorepos in Git Rev News can be found in [edition #4](https://git.github.io/rev_news/2015/06/03/edition-4/),
    + most recent mention is the [Monorepo.tools](https://monorepo.tools/) site in [edition #84](https://git.github.io/rev_news/2022/02/28/edition-84/).
+ [Use Git tactically](https://stackoverflow.blog/2022/04/06/use-git-tactically/):
  How you can use micro-commits to effectively apply the [Strangler Fig pattern](https://martinfowler.com/bliki/StranglerFigApplication.html),
  by Mark Seeman on The Overflow (Stack Overflow blog).
+ [The Programmer's Brain](https://www.infoq.com/presentations/reading-code/) by Felienne Hermans: Why we should be taught to 'read code'.
+ [Working on two git branches at once with git worktree](https://andrewlock.net/working-on-two-git-branches-at-once-with-git-worktree)
  by Andrew Lock on andrewlock\.net.

__Git tools and sites__

+ [Building Software Together](https://buildtogether.tech/) is a free online book by Greg Wilson
  which aims to teach you how to be a _compassionate programmer_;
  it includes two chapters about Git:
    + [Chapter 7: Using Git On Your Own](https://buildtogether.tech/git-solo/)
    + [Chapter 8: Using Git Together](https://buildtogether.tech/git-team/)
+ [Version Control with Git](https://swcarpentry.github.io/git-novice/index.html)
  is a tutorial by the Software Carpentry Foundation.
+ [git-backup](https://github.com/ChappIO/git-backup) is a command-line tool
  to pull all your GitHub and GitLab repositories for backup purposes; it doesn't require Git.
+ [gitquickbranch.c](https://dianne.skoll.ca/hacks/gitquickbranch.c)
  by Dianne Skoll is a small program in C to quickly find the current branch name.
+ [delta](https://github.com/dandavison/delta) is a syntax-highlighting pager
  for git, diff, and grep output.
    + It is one of the tools on [Modern Unix tools](https://github.com/ibraheemdev/modern-unix) list,
      which is a collection of modern/faster/saner alternatives to common unix commands.
+ [Difftastic](https://github.com/Wilfred/difftastic)
  is an experimental diff tool that compares files based on their syntax.
  The [manual](https://difftastic.wilfred.me.uk/) includes list of
  [some other tree diffing tools available](https://difftastic.wilfred.me.uk/tree_diffing.html).
+ [Vershd](https://vershd.io/) is an [Electron-based](https://www.electronjs.org/apps?q=git)
  multi-platform Git GUI, with separate views of branches and their commits, pending files and stashes,
  and the ability to show in advance what's going to happen when actions are taken.
  Free for, among others, personal use and educational institutions.
  If only it's marketing was less <abbr title="Fear, uncertainty, and doubt">FUD</abbr>-ish
  _("Git [...] can easily destroy days of work in just seconds and requires thousands of keyboard commands and parameters")_...
+ [Git for Professionals – Free Version Control Course](https://www.freecodecamp.org/news/git-for-professionals/):
  freeCodeCamp intro by Tobias Günther with follow-on more 'Advanced Git Tutorial' sessions, all on YouTube. Plenty of useful tidbits.


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Bruno Brito, Brandon Pugh,
Carlo Marcelo Arenas Belón and Philip Oakley.
