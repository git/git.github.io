---
title: Git Rev News Edition 139 (September 30th, 2026)
layout: default
date: 2026-09-30 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 139 (September 30th, 2026)

Welcome to the 139th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](https://git.github.io).

This edition covers what happened during the months of August and September 2026.

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

## Developer Spotlight: Harald Nordgren

* **Who are you and what do you do?**

  I am Harald Nordgren, software developer for 20+ years, most recently
  worked as CTO of [Diet Doctor](https://www.dietdoctor.com/) and have
  been an enthusiastic Git user for many years. I am married to Linda
  and we have 3 young children.

* **What would you name your most important contribution to Git?**

  Most useful is [`status.comparebranches`](https://lore.kernel.org/git/pull.2301.v4.git.git.1779372367317.gitgitgadget@gmail.com/),
  which I see every time I run `git status` and it blows my mind that
  I was able to put it there.

* **What are you doing on the Git project these days, and why?**

  I’m working on [`history squash`](https://lore.kernel.org/git/pull.2337.v15.git.git.1788900119.gitgitgadget@gmail.com/)
  and doing [GitHub CI improvements](https://lore.kernel.org/git/?q=f%3Aharald+s%3Aci).

* **If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?**

  Not sure! Git is very good already.

* **If you could remove something from Git without worrying about
  backwards compatibility, what would it be?**

  Many settings for (like diff.algorithm and branch.sort) should have
  more user friendly defaults, but it requires us to break backwards
  compatibility. Users are not getting a smooth experience and many are
  very afraid to mess with their Git settings. I would love to have a
  setup wizard with this as one possible preset:

  ```git
  branch.sort=-committerdate
  tag.sort=-version:refname
  diff.algorithm=histogram
  diff.colormoved=zebra
  diff.compactionheuristic=true
  ```

* **What is your favorite Git-related tool/library, outside of
  Git itself?**

  GitHub’s official [`gh` tool](https://github.com/cli/cli) is awesome.
  And before it came and took over, I loved using [`mislav/hub`](https://github.com/mislav/hub).

* **Do you happen to have any memorable experience w.r.t. contributing
  to the Git project? If yes, could you share it with us?**

  My first [merged commit in 2018](https://github.com/git/git/commit/1fb20dfd8ed70b4459312918a71444bc79ea6f0b) ([patch](https://lore.kernel.org/git/20180402005248.52418-1-haraldnordgren@gmail.com/))
  was an unreal experience, I couldn’t believe I got to be part of
  this project.

* **What is your toolbox for interacting with the mailing list and for
  development of Git?**

  [GitGitGadget](https://gitgitgadget.github.io/) for submitting patches,
  Gmail for answering emails and VSCode as editor.

  But AI writes the code for me nowadays. I bring the idea and get a
  first draft (if it’s horrible I start over) and when I have something
  that feels sound, I “quick save” by committing/pushing and then
  feedback on the solution until it’s nice. I use one AI session per
  topic, and keep them open for the reviews so it maintains the context.
  It’s incredible to have a sparring partner that never gets tired!

* **What is your advice for people who want to start Git development?
  Where and how should they start?**

  Have an idea for something that you yourself need, something you would
  want in Git that is missing. Don’t focus on getting the credit, focus
  on an actual need and the rest will follow.

  If you don't understand Git well as a user, it will be hard to
  contribute meaningfully, so start by [reading up on Git](https://git-scm.com/learn).
  Back when Stack Overflow was still popular I used to love to
  [read about Git there](https://stackoverflow.com/questions/tagged/git). I still love
  to dig into the [Git documentation](https://git-scm.com/docs) and
  ask AI about some new options, there are many to discover!

* **If there's one tip you would like to share with other Git
  developers, what would it be?**

  Commit early, commit often.

## Other News

__Various__


__Light reading__

<!---
__Easy watching__
-->

__Git tools and sites__


## Releases

+ Git [2.56.0](https://lore.kernel.org/git/xmqqpkxxmgxh.fsf@gitster.g/),
[2.56.0-rc2](https://lore.kernel.org/git/xmqqld8tfea9.fsf@gitster.g/),
[2.56.0-rc1](https://lore.kernel.org/git/xmqqh5jpvzxo.fsf@gitster.g/),
[2.56.0-rc0](https://lore.kernel.org/git/xmqqecf1f2ga.fsf@gitster.g/)
+ Git for Windows [v2.56.0(1)](https://github.com/git-for-windows/git/releases/tag/v2.56.0.windows.1),
[v2.56.0-rc2(1)](https://github.com/git-for-windows/git/releases/tag/v2.56.0-rc2.windows.1),
[v2.56.0-rc1(1)](https://github.com/git-for-windows/git/releases/tag/v2.56.0-rc1.windows.1),
[v2.56.0-rc0(1)](https://github.com/git-for-windows/git/releases/tag/v2.56.0-rc0.windows.1)
+ gitoxide [0.59.0](https://github.com/GitoxideLabs/gitoxide/releases/tag/v0.59.0)
+ JGit [7.8.0](https://github.com/eclipse-jgit/jgit/releases/tag/v7.8.0.202609011348-r)
+ GitLab [19.5](https://docs.gitlab.com/releases/19/gitlab-19-5-released/),
[19.4](https://docs.gitlab.com/releases/19/gitlab-19-4-released/)
+ Bitbucket Data Center [10.5](https://confluence.atlassian.com/bitbucketserver/release-notes-872139866.html)
+ Gerrit Code Review [3.12.10](https://www.gerritcodereview.com/3.12.html#31210),
[3.12.11](https://www.gerritcodereview.com/3.12.html#31211),
[3.13.10](https://www.gerritcodereview.com/3.13.html#31310),
[3.13.9](https://www.gerritcodereview.com/3.13.html#3139),
[3.14.3](https://www.gerritcodereview.com/3.14.html#3143),
[3.14.4](https://www.gerritcodereview.com/3.14.html#3144)
+ GitHub Enterprise [3.22.1](https://docs.github.com/enterprise-server@3.22/admin/release-notes#3.22.1),
[3.21.6](https://docs.github.com/enterprise-server@3.21/admin/release-notes#3.21.6),
[3.20.8](https://docs.github.com/enterprise-server@3.20/admin/release-notes#3.20.8),
[3.19.12](https://docs.github.com/enterprise-server@3.19/admin/release-notes#3.19.12),
[3.18.15](https://docs.github.com/enterprise-server@3.18/admin/release-notes#3.18.15),
[3.17.21](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.21),
[3.22.0](https://docs.github.com/enterprise-server@3.22/admin/release-notes#3.22.0),
[3.21.5](https://docs.github.com/enterprise-server@3.21/admin/release-notes#3.21.5),
[3.20.7](https://docs.github.com/enterprise-server@3.20/admin/release-notes#3.20.7),
[3.19.11](https://docs.github.com/enterprise-server@3.19/admin/release-notes#3.19.11),
[3.18.14](https://docs.github.com/enterprise-server@3.18/admin/release-notes#3.18.14),
[3.17.20](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.20)
+ GitKraken [12.4.1](https://help.gitkraken.com/gitkraken-desktop/current/)
+ GitHub Desktop [3.6.6](https://desktop.github.com/release-notes/),
[3.6.5](https://desktop.github.com/release-notes/)
+ lazygit [0.65.1](https://github.com/jesseduffield/lazygit/releases/tag/v0.65.1),
[0.65.0](https://github.com/jesseduffield/lazygit/releases/tag/v0.65.0)
+ Garden [2.7.0](https://github.com/garden-rs/garden/releases/tag/v2.7.0)
+ Sublime Merge [Build 2132](https://www.sublimemerge.com/download),
[Build 2130](https://www.sublimemerge.com/download)
+ difftastic [0.71.0](https://github.com/Wilfred/difftastic/releases/tag/0.71.0)
+ Kinetic Merge [1.19.0](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.19.0),
[1.18.0](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.18.0)
+ git-bug [0.11.0](https://github.com/git-bug/git-bug/releases/tag/v0.11.0)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
