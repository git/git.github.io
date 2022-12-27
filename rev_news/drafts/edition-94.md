---
title: Git Rev News Edition 94 (December 28th, 2022)
layout: default
date: 2022-12-28 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 94 (December 28th, 2022)

Welcome to the 94th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of November 2022 and December 2022.

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

## Developer Spotlight: ZheNing Hu

* Who are you and what do you do?

  My name is ZheNing Hu, and I am a participant in the GSOC 2021
  Git community. Currently I am interning at Alibaba (China).

* What would you name your most important contribution to Git?

  When I used `git shortlog --author="ZheNing Hu"` to look at the patches
  I contributed, I was ashamed to find that my patches are quite small and
  simple, because I'm more of a Git learner right now 😄

  If I had to pick one, I'd say it's adding the `--trailer` option to git commit.
  It is very convenient to add something like "Signed-off-by", "Reviewed-by"
  at the end of the commit message.

* What are you doing on the Git project these days, and why?

  Recently I've been working on [implementing a `--scope` option for `git diff`](https://lore.kernel.org/git/pull.1398.v3.git.1669723221.gitgitgadget@gmail.com/)
  and other Git commands. It tries to limit the scope of the file path to the
  [sparse specification](https://github.com/git/git/blob/7c2ef319c52c4997256f5807564523dfd4acdfc7/Documentation/technical/sparse-checkout.txt#L73).

  The reason I wanted to implement this feature is that I was researching
  how monorepo collaborates and discovered that `git pull` might download
  Git objects outside of the sparse specification. Meanwhile, Elijah Newren
  is contributing [technical documentation of git-sparse-checkout](https://git-scm.com/docs/sparse-checkout)
  [ [source](https://github.com/git/git/blob/7c2ef319c52c4997256f5807564523dfd4acdfc7/Documentation/technical/sparse-checkout.txt) ],
  the article details how other Git commands should properly recognize
  sparse-checkout, and suggests implementing the `--scope` option, which
  I think will solve the problem I encountered above, so I hope to implement it.

  This patch was put on hold by me for a while, as no one seemed to review it.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  I'd like to have a well-developed concurrency model on the Git server side.
  See ["Question: How to execute git-gc correctly on the git server"](https://lore.kernel.org/git/CAOLTT8Tt3jW2yvm6BRU3yG+EvW1WG9wWFq6PuOcaHNNLQAaGjg@mail.gmail.com/)
  for more details.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  `git checkout`. It can be used to switch branches or restore working tree files,
  I think two functions are somewhat coupled. I don't know if `git switch` and
  `git restore` would be perfect replacements for it.

* What is your favorite Git-related tool/library, outside of
  Git itself?

  [scalar](https://git-scm.com/docs/scalar). Now I really like to use scalar to
  download Git repositories to save time.

* Do you happen to have any memorable experience w.r.t contributing to
  the Git project? If yes, could you share it with us?

  Mainly during GSOC, my mentor Christian Couder and many people in the Git
  community helped me and I learned how to participate in open source for the
  first time. It was a great experience to be brave and discuss technology with
  people from all over the world.

* What is your toolbox for interacting with the mailing list and for
  development of Git?

  GitGitGadget. It has a clean commit process, and it runs GitHub action to
  help me find out if my patch is buggy before committing to the community.

* What is your advice for people who want to start Git development?
  Where and how should they start?

  1. First become its user
  2. Understand its principles through the documentation
  3. Read the source code to understand the general structure of the project
  4. Understand some sub-modules of the project by solving some problems
  5. Learn from others with an open mind

* If there's one tip you would like to share with other Git
  developers, what would it be?

  Stay curious about technology.


## Releases

+ Git [2.39.0](https://public-inbox.org/git/xmqqlencspnl.fsf@gitster.g/),
[2.38.2](https://public-inbox.org/git/xmqqv8miv7qj.fsf@gitster.g/),
[2.39.0-rc2](https://public-inbox.org/git/xmqq7cz59o6y.fsf@gitster.g/),
[2.39.0-rc1](https://public-inbox.org/git/xmqqedtlynq8.fsf@gitster.g/)
+ Git for Windows [2.39.0(2)](https://github.com/git-for-windows/git/releases/tag/v2.39.0.windows.2),
[2.39.0(1)](https://github.com/git-for-windows/git/releases/tag/v2.39.0.windows.1),
[2.39.0-rc2(1)](https://github.com/git-for-windows/git/releases/tag/v2.39.0-rc2.windows.1),
[2.39.0-rc1(1)](https://github.com/git-for-windows/git/releases/tag/v2.39.0-rc1.windows.1)
+ GitHub Enterprise [3.7.2](https://help.github.com/enterprise-server@3.7/admin/release-notes#3.7.2),
[3.6.5](https://help.github.com/enterprise-server@3.6/admin/release-notes#3.6.5),
[3.5.9](https://help.github.com/enterprise-server@3.5/admin/release-notes#3.5.9),
[3.4.12](https://help.github.com/enterprise-server@3.4/admin/release-notes#3.4.12),
[3.3.17](https://help.github.com/enterprise-server@3.3/admin/release-notes#3.3.17)
+ GitLab [15.7](https://about.gitlab.com/releases/2022/12/22/gitlab-15-7-released/)
[15.6.3](https://about.gitlab.com/releases/2022/12/16/gitlab-15-6-3-released/),
[15.5.6](https://about.gitlab.com/releases/2022/12/08/gitlab-15-5-6-released/),
[15.6.2](https://about.gitlab.com/releases/2022/12/02/gitlab-15-6-2-released/),
[15.6.1, 15.5.5 and 15.4.6](https://about.gitlab.com/releases/2022/11/30/security-release-gitlab-15-6-1-released/)
+ GitKraken [9.0.0](https://help.gitkraken.com/gitkraken-client/current/)
+ Sourcetree [4.2.1](https://product-downloads.atlassian.com/software/sourcetree/ReleaseNotes/Sourcetree_4.2.1.html)

## Other News

__Various__


__Light reading__

<!---
__Easy watching__
-->

__Git tools and sites__

* [git-credential-oauth](https://github.com/hickford/git-credential-oauth)
  is a Git credential helper that securely authenticates to GitHub,
  GitLab, BitBucket and other forges using OAuth.

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from ZheNing Hu and Mirth Hickford.
