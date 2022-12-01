---
title: Git Rev News Edition 93 (November 23rd, 2022)
layout: default
date: 2022-11-23 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 93 (November 23rd, 2022)

Welcome to the 93rd edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of October 2022.

## Discussions

<!---
### General
-->

### Reviews

* [[PATCH] archive: add --recurse-submodules to git-archive command](https://lore.kernel.org/git/pull.1359.git.git.1665597148042.gitgitgadget@gmail.com/)

  Heather Lapointe sent a patch to the mailing list that
  enabled `git archive` to also include submodule contents in the
  archives it produces.

  She said she was inspired by
  [a GitHub issue more than 160 upvotes](https://github.com/dear-github/dear-github/issues/214)
  and thought the implementation wouldn't be too difficult as most of
  the plumbing was already in place.

  One of the trickier parts was changing the `read_tree()` function to
  support other repos than the current one by not using the
  `the_repository` global variable.

  Heather soon sent
  [a version 2 patch series](https://lore.kernel.org/git/pull.1359.v2.git.git.1665660960.gitgitgadget@gmail.com/).
  This patch series contained only 2 patches. The first one was
  identical to the one previously sent, while the second one fixed a
  submodule traversal bug in `read_tree()` introduced by the first
  patch.

  René Scharfe replied to Heather, noticing that the cover letter of
  the patch series had a TODO list with a number of items, most of
  which seemingly already addressed. As the stats in the cover letter
  showed 16 files changed, 269 insertions, and 96 deletions, he said it
  was a bit much for a few patches, and suggested splitting them.

  Heather replied to René that the TODO list came from GitGitGadget.
  And René found that this tool was using an
  [HTML-to-text converter](https://github.com/html-to-text/node-html-to-text)
  that [doesn't handle checkboxes nicely by default](https://github.com/html-to-text/node-html-to-text/issues/260).
  René and Heather then discussed how to split the patches, and a bit
  how the first patch was implemented.

  Heather then sent
  [a version 3 of her patch series](https://lore.kernel.org/git/pull.1359.v3.git.git.1665973401.gitgitgadget@gmail.com/)
  that split her previous patch series into 8 patches.

  Junio Hamano, the Git maintainer, along with Glen Choo, Jonathan
  Tan, Phillip Wood and Ævar Arnfjörð Bjarmason all commented on some
  of the patches in this series and suggested small improvements.

  The Review Club [selected this patch series](https://lore.kernel.org/git/kl6l35bbsubq.fsf@chooglen-macbookpro.roam.corp.google.com/)
  to be reviewed by participants on Wednesday October 26, and
  participants generally agreed that "this is a really well-structured
  and easy-to-follow series :)" and that "as far as new contributions go,
  this is really good".

  Unfortunately it looks like Heather has been swamped with her own
  work and didn't have time to send a new version yet. Hopefully
  though we will get this very requested feature soon.

  As a side effect of the discussion, [GitGitGadget formats checkboxes nicely now](https://github.com/gitgitgadget/gitgitgadget/pull/1128).

<!---
### Support
-->

## Developer Spotlight: Bagas Sanjaya

* Who are you and what do you do?

  I'm Bagas Sanjaya. I'm currently unemployed (due to my autistic condition
  that makes working formally isn't the nice option for me).

* What would you name your most important contribution to Git?

  Adding the `INSTALL_STRIP` variable when installing Git from source (with
  help from other Git developers due to lack of coding experience).

* For the benefit of the readers, is it possible for you to elaborate a
  bit on what the `INSTALL_STRIP` variable would help them with?

  Typically users install Git from binary package provided by the
  distribution. For those who wish to install from source, they can
  install build-time dependencies first, then simply do `make && make install`.
  However, it will install Git binaries with debugging info, which
  can take a lot of space. In addition, many Unix systems have `install(1)`
  that has an option to automatically strip debugging info during
  installation. That's why `INSTALL_STRIP` is introduced; if supported,
  users can run `make INSTALL_STRIP=-s install` to install
  stripped binaries.

* What are you doing on the Git project these days, and why?

  I'm mostly translating po strings in recent days. Otherwise I'm hacking
  on Linux kernel documentation.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  As an autistic man, I'd like to meet developers who can accommodate my
  special needs (often different from neurotypical people) so that I
  can thrive my living.

* It is good to know that you would like to meet compassionate developers.
  Is it possible for you expand a bit on what you would like to change /
  enhance in Git when you get a team of such developers for a year?

  I think more on communication. Sure, communicating with email makes life
  easier for autistic developers (less physical interaction). However,
  autistic people have different ways of communicating. For me, I need
  a lot of time to process the information from a mailing list and formulate
  the wording (which is due to comorbid ADHD). Thus, the community
  expectation should have been adapted to individual needs, e.g. by being
  more explicit on explanation of code of conduct when a new developer
  is contributing. If he/she doesn't understand the CoC, he/she can
  proactively ask the community about points that he/she doesn't understand.

  In summary, besides adaptation from the community, there must be
  initiatives from developers themselves.

* What is your favorite Git-related tool/library, outside of Git
  itself?

  Gitea. I deployed the server application to the LXD instance on my
  laptop as repository mirror when I push my favorite repos there.

* You have experience translating for Git. Is there something that
  could be done differently to aid with the translation effort?

  I think we need something like self-hosted Weblate to enable anyone
  with translation skills to easily submit translated strings. But honestly
  deploying one is tricky; I tried to deploy Weblate but couldn't get strings
  from Git source code to be available for translation on the interface.

* How does your mailing list workflow look like?

  Simplicistic. After configuring `git send-email` to send through outgoing
  relay of your mail provider and your email clients to send plain text
  email, unaltered (no line wrapping, intact tabs and spaces), you can
  contribute by sending patches with the former and reviewing with the
  latter.

* What is your advice for people who want to start Git development?
  Where and how should they start?

  You need to find a joy in application development. If it doesn't makes
  you enjoy, you may need to take a break or find something else.

* If there's one tip you would like to share with other Git
  developers, what would it be?

  As autistic, special interest fascinates me. You need to find one
  in this project, while staying up-to-date with the general picture.


## Releases

+ Git [2.39.0-rc0](https://public-inbox.org/git/xmqqr0xum8tn.fsf@gitster.g/)
+ Git for Windows [2.39.0-rc0(1)](https://github.com/git-for-windows/git/releases/tag/v2.39.0-rc0.windows.1)
+ GitLab [15.6](https://about.gitlab.com/releases/2022/11/22/gitlab-15-6-released/)
[15.5.4](https://about.gitlab.com/releases/2022/11/14/gitlab-15-5-4-released/),
[15.4.5](https://about.gitlab.com/releases/2022/11/14/gitlab-15-4-5-released/),
[15.5.3](https://about.gitlab.com/releases/2022/11/08/gitlab-15-5-3-released/),
[15.5.2, 15.4.4, and 15.3.5](https://about.gitlab.com/releases/2022/11/02/security-release-gitlab-15-5-2-released/)
+ Bitbucket Server [8.6](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ Gerrit Code Review [3.4.7](https://www.gerritcodereview.com/3.4.html#347),
[3.4.8](https://www.gerritcodereview.com/3.4.html#348),
[3.5.4](https://www.gerritcodereview.com/3.5.html#354),
[3.6.3](https://www.gerritcodereview.com/3.6.html#363),
[3.7.0](https://www.gerritcodereview.com/3.7.html#370)
+ GitHub Enterprise [3.7.1](https://help.github.com/enterprise-server@3.7/admin/release-notes#3.7.1),
[3.6.4](https://help.github.com/enterprise-server@3.6/admin/release-notes#3.6.4),
[3.5.8](https://help.github.com/enterprise-server@3.5/admin/release-notes#3.5.8),
[3.4.11](https://help.github.com/enterprise-server@3.4/admin/release-notes#3.4.11),
[3.3.16](https://help.github.com/enterprise-server@3.3/admin/release-notes#3.3.16),
[3.7.0](https://help.github.com/enterprise-server@3.7/admin/release-notes#3.7.0)
+ GitKraken [8.10.3](https://help.gitkraken.com/gitkraken-client/current/#version-8-10-3),
[8.10.2](https://help.gitkraken.com/gitkraken-client/current/#version-8-10-2)
+ Tower for Mac [9.1](https://www.git-tower.com/release-notes/mac?show_tab=release-notes)

## Other News

__Various__

+ Shaoxuan Yuan,
  [who participated in the GSoC 2022](https://ffyuanda.github.io/blog/GSoC-final-blog/),
  is looking for a full time internship from mid-June 2023 to October
  2023 or a part-time one starting now. See
  [his resume](https://github.com/git/git.github.io/files/9995808/Resume_Shaoxuan_Yuan.pdf)
  for more information.

__Light reading__

+ [Working with stacked branches in Git is easier with `--update-refs`](https://andrewlock.net/working-with-stacked-branches-in-git-is-easier-with-update-refs/)
  (an option which was included in Git 2.38, in October 2022)
  by Andrew Lock on his blog, \.NET Escapades.
+ [Bringing revsets to Git](https://blog.waleedkhan.name/bringing-revsets-to-git/)
  by Waleed Khan (@arxanas) describes how one can use the
  [git-branchless](https://github.com/arxanas/git-branchless) suite of tools
  (mentioned in [Git Rev News Edition #76](https://git.github.io/rev_news/2021/06/27/edition-76/)
  and [#90](https://git.github.io/rev_news/2022/08/31/edition-90/))
  and [Mercurial's revset notation](https://www.mercurial-scm.org/repo/hg/help/revsets)
  to form complex queries about a repo, display their results (for example in a graph view),
  rebase changes using "patch-stack" workflow, and improve testing.
+ [Sapling: Source control that’s user-friendly and scalable](https://engineering.fb.com/2022/11/15/open-source/sapling-source-control-scalable/)
  by Durham Goode on Engineering at Meta (Facebook) blog.
  At this point, only the client side of the system has been released.<br>
  You can find some comments about it at:
    + [Meta's Sapling source-code management system](https://lwn.net/Articles/915104/) on LWN.net.
    + [Sapling: A new source control system with Git-compatible client](https://news.ycombinator.com/item?id=33612410&utm_term=comment) on Hacker News.
+ [Git evolve: tracking changes to changes](https://lwn.net/Articles/914041/)
  ([free preview link](https://lwn.net/SubscriberLink/914041/fcffc20089b907b0/))
  by Jonathan Corbet on LWN.net.
+ [Using gitStream for 'Continuous Merge': automatically approving safe PRs,
   assigning reviewers, estimating review time, and more](https://blog.jakelee.co.uk/using-gitstream-to-improve-pr-workflow/)
  by Jake Lee on his blog.
+ [My favorite Git tools](https://opensource.com/article/22/11/git-tools)
  by Dwayne McDaniel on Opensource\.com.
+ [Git concepts in less than 10 minutes](https://opensource.com/article/22/11/git-concepts)
  by Dwayne McDaniel on Opensource\.com.
+ [#gitPanic - Interactive Rebase](https://dev.to/abbeyperini/gitpanic-interactive-rebase-48fe)
  by Abbey Perini on DEV\.to (part of the [gitPanic series](https://dev.to/abbeyperini/series/20421)).
+ [Top 12 Advanced Git Commands To Know](https://blog.openreplay.com/top-dozen-advanced-git-commands-to-know/)
  by El-Glory Oriabure on OpenReplay blog, with admittedly some pretty basic commands
  in there.
+ [Light Git repository checkout](https://github.polettix.it/ETOOBUSY/2022/10/26/light-git-pwc/)
  with [`git sparse-checkout`](https://www.git-scm.com/docs/git-sparse-checkout)
  by Flavio Poletti (@polletix) on his ETOOBUSY blog.
+ [The Perfect Commit](https://simonwillison.net/2022/Oct/29/the-perfect-commit/)
  by Simon Willison on his Weblog.
+ [New Git guidelines: We have switched to Conventional Commits](https://happy-coding.visuellverstehen.de/posts/new-git-guidelines-we-have-switched-to-conventional-commits-1p0c)
  by Malte Riechmann for visuellverstehen on the Happy Coding blog.
  (post is also available on [DEV.to](https://dev.to/visuellverstehen/new-git-guidelines-we-have-switched-to-conventional-commits-1p0c)).
  The [Conventional Commits](https://www.conventionalcommits.org/) specification
  was first mentioned in [Git Rev News Edition #52](https://git.github.io/rev_news/2019/06/28/edition-52/).
+ [How to Write the Perfect Commit Message](https://www.git-tower.com/blog/how-to-write-the-perfect-commit-message/) by Bruno Brito on Tower’s blog.
+ [Why You Should Use a Git Client](https://dev.to/brunobrito/why-you-should-use-a-git-client-2dpe) by Bruno Brito on dev.to.
+ Jakub Kozłowski [tweeted](https://twitter.com/kubukoz/status/1590135952886075393)
  that Git conflict markers are parsed as valid Scala code, though you need to add some
  appropriate [definitions](https://gist.github.com/kubukoz/894b049b5c1747f17c1e052754640b32),
  now available as a [scala-git-markers library](https://github.com/polyvariant/scala-git-markers),
  for it to run ;-).  Explained in more detail in his [video on YouTube](https://www.youtube.com/watch?v=rSk_mea4U1E).
  
__Easy watching__
+ [Understanding Git Flow](https://www.youtube.com/watch?v=HrA_BbWUKRk): A look at the operations of Git Flow through the Flying Logic visualisation of the branches and release process. The channel also has Git visualisations of Collaboration, merge and rebase, detached HEAD, and 'What's a DAG'.

__Git tools and sites__

+ [Sapling SCM](https://sapling-scm.com/) is a scalable, user-friendly
  source control system that supports cloning and interacting with Git repositories,
  and can be used by individual developers to work with GitHub
  and other Git hosting services.
+ [Stacked Git](https://stacked-git.github.io/), **StGit** for short,
  is an application for managing Git commits as a stack of patches
  (with its first release in 2005, it is almost as old as Git itself).
  StGit was mentioned by Yann Dirson in the [Git Rev News Edition #74](https://git.github.io/rev_news/2021/04/30/edition-74/)
  developer spotlight.
+ [Mergify](https://github.com/brooksdavis/mergify) is a tool
  to merge changes from a branch one commit at a time,
  most useful when merging changes to a highly diverged fork of a project.
    + Note that there is also [Mergify.com](https://mergify.com/), mentioned in
      [Git Rev News Edition #87](https://git.github.io/rev_news/2022/05/26/edition-87/),
      a web service free for open-source projects for automatizing pull requests
      and securing the code merge using a merge queue.
+ [git-mergify-rebase](https://github.com/CTSRD-CHERI/git-mergify-rebase)
  is a replacement for mergify, written using `git rebase` for better performance,
  supporting most of features of the original.
+ [Nx](https://nx.dev/) is a next generation build system for Node\.js,
  with first class monorepo support and various integrations.
  Listed in the tools section of [monorepo.tools](https://monorepo.tools/),
  a site mentioned in [Git Rev News Edition #84](https://git.github.io/rev_news/2022/02/28/edition-84/).
+ [gitStream](https://gitstream.cm/) by LinearB is a GitHub app
  that aims to improve the pull request review process.
+ [tweets](https://github.com/diracdeltas/tweets)
  is @bcrypt's janky twitter "replacement",
  using Git commit messages and GitHub for "microblogging";
  see the [announcement on Twitter](https://twitter.com/bcrypt/status/1588416861552582657) ;-).
  Written as set of Bash scripts and a Makefile.


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Bagas Sanjaya, Bruno Brito, Glen Choo and René Scharfe.
