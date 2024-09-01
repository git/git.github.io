---
title: Git Rev News Edition 114 (August 31st, 2024)
layout: default
date: 2024-08-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 114 (August 31st, 2024)

Welcome to the 114th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of July and August 2024.

## Discussions

<!---
### General
-->

### Reviews

* [[PATCH] ReviewingGuidelines: encourage positive reviews more](https://lore.kernel.org/git/xmqqsevysdaa.fsf@gitster.g/)

  Junio Hamano, the Git maintainer, sent a patch to the mailing list
  which updated the 'ReviewingGuidelines.txt' documentation with the
  goal of encouraging positive reviews even more.

  The 'ReviewingGuidelines.txt' documentation was
  [created a few years ago](https://lore.kernel.org/git/pull.1348.v2.git.1663614767058.gitgitgadget@gmail.com/)
  by Victoria Dye to provide "consistent definitions for common
  review terminology" and to give advice to reviewers, in a similar
  way as the MyFirstContribution documentation gives advice to
  contributors.

  The few paragraphs that Junio's patch added said that positive
  reviews are highly encouraged, even when the author is a work
  colleague. They show that people other than the author(s) of the
  reviewed patches care about the issue that is addressed.

  When writing positive reviews, reviewers should tell why they
  support the patches, and should show that they understand the issue
  and how the patches address it. They are also encouraged to describe
  how they understand complex parts of the patches.

  Junio's patch also adds a small paragraph saying that "uplifting
  feedback goes a long way towards encouraging contributors to
  participate more actively in the Git community."

  Eric Sunshine then replied to Junio pointing out a minor typo in his
  patch. Patrick Steinhardt replied to Junio too. He said that he had
  already guided some of his GitLab colleagues who review patches
  and suggested them to do what Junio describes.

  Derrick Stolee, who prefers to be called Stolee, replied to Patrick
  agreeing with him and saying that it also helps to not have internal
  reviews for experienced contributors. He said that they used to have
  internal reviews at Microsoft but it was overly cautious and "loses
  the benefits of doing reviews in the open".

  Patrick replied to Stolee saying that GitLab also used to have an
  internal review, but it recently became optional and recommended
  only for people who are not yet familiar with the mailing list
  workflow.

  Junio then sent
  [a version 2](https://lore.kernel.org/git/xmqqle1pjwtt.fsf@gitster.g/)
  of the patch fixing small typos. Patrick reviewed this version
  and found it good, so it was later merged into the 'master' branch.

<!---
### Support
-->

<!---
## Developer Spotlight:
-->

## Other News

__Various__
+ [GitLab now supports SHA256 repositories](https://about.gitlab.com/blog/2024/08/19/gitlab-now-supports-sha256-repositories/)
  by John Cai on GitLab Blog (in Bulletin Board category).
+ [Forgejo v8.0 is available](https://forgejo.org/2024-07-release-v8-0/).
    + [Forgejo](https://forgejo.org/) is a self-hosted lightweight software forge,
      written in Go; nowadays a hard fork of Gitea (which in turn was based on Gogs).
      It was mentioned in passing in [Git Rev News Edition #103](https://git.github.io/rev_news/2023/09/30/edition-103/),
      as one of the forges working on implementing the [ForgeFed](https://forgefed.org/)
      federation protocol for forge services.
+ Packt recently published the second edition of the “Mastering Git” book
  by Jakub Narębski, one of the Git Rev News editors.
  The book is available [on PacktPub](https://www.packtpub.com/en-us/product/mastering-git-9781835086070)
  and [on Amazon](https://www.amazon.com/Mastering-Git-expert-level-proficiency-distributed-ebook/dp/B0D98BR1T7).
  The first edition of the book was mentioned in [Git Rev News Edition #16](https://git.github.io/rev_news/2016/06/15/edition-16/);
  you can find the interview with Jakub Narębski in [Edition #17](https://git.github.io/rev_news/2016/07/20/edition-17/).

__Light reading__
+ [Different ways to use `--patch` in Git](https://tekin.co.uk/2024/08/the-many-uses-for-git-patch)
  by Tekin Süleyman on his blog.  It describes selectively stashing changes,
  selectively discarding changes, and selectively restoring changes.
  This article expands on the
  "[interactively stage changes with \-\-patch](https://tekin.co.uk/2017/03/git-tips-you-possibly-did-not-know-you-needed#3-interactively-stage-changes-with---patch)" advice
  in [Git Tips you (Possibly) Didn't Know You Needed](https://tekin.co.uk/2017/03/git-tips-you-possibly-did-not-know-you-needed).
+ [Tracing the evolution of a Python function with git log](https://nerderati.com/tracing-the-evolution-of-a-python-function-with-git-log/)
  by Joël Perras on his Nerderati blog.  It shows a detailed example on using `git log -L`
  (and the `diff=python` gitattribute) to diagnose a real-life bug that was ostensibly
  caused by an upgrade to Authlib.
    + This technique is also described in the
      [See the History of a Method with `git log -L`](https://calebhearth.com/git-method-history) article,
      mentioned in [Git Rev News Edition #105](https://git.github.io/rev_news/2023/11/30/edition-105/).
+ [Optimize your workflow with Git stash](https://developer.mozilla.org/en-US/blog/optimize-your-workflow-git-stash/)
  by Toon Claes (from GitLab) at MDN Blog.
+ [Seriously, You Need to Learn Git](https://blog.derlin.ch/seriously-you-need-to-learn-git)
  by Lucy Linder on her blog (also available [on DEV\.to](https://dev.to/derlin/seriously-you-need-to-learn-git-1n8j)).  The article defines various levels of Git knowledge,
  and explains how knowing Git might improve one's development process.
+ [Tips for creating merge commits](https://www.brandonpugh.com/blog/tips-for-creating-merge-commits/)
  by Brandon Pugh on his blog.
+ [Back-dating Git commits based on file modification dates](https://til.simonwillison.net/git/backdate-git-commits)
  by Simon Willison in his [TILs on Git](https://til.simonwillison.net/git)
  (Today I’ve Learned).
    + It was used by the author to create the [1991-WWW-NeXT-Implementation](https://github.com/simonw/1991-WWW-NeXT-Implementation)
      repository out of [the archive](https://www.w3.org/History/1991-WWW-NeXT/Implementation/)
      of Tim Berner-Lee's original code for the WorldWideWeb application for NeXT.
      This endeavor was described in a short blog post, [1991-WWW-NeXT-Implementation on GitHub](https://simonwillison.net/2024/Aug/1/www-next-implementation-on-github/).
+ [Store Code Discussions in Git using Git Notes](https://wouterj.nl/2024/08/git-notes)
  by Wouter de Jong on his blog.  The article includes some code (in PHP)
  that uses the GitHub API to fetch the pull request comments and store them
  in notes (under the `github-comments` notes reference).
+ [Attaching notes to git branches](https://dev.to/pinotattari/attaching-notes-to-git-branches-503k)
  by Riccardo Bernardini on DEV\.to.  The article describes why this feature is useful
  and how `git branch --edit-description` and `git notes` fall short; this led to
  the creation of the [git-branchnotes](https://gitlab.com/mockturtle/git-branchnotes) tool.
+ [This developer tool is 40 years old: can it be improved?](https://stackoverflow.blog/2024/08/05/this-developer-tool-is-40-years-old-can-it-be-improved)
  by Bill Harding (CEO at GitClear) on StackOverflow Blog.
  The article describes how GitClear's "Commit Cruncher" diff algorithm works,
  which was created with the goal of making code reviews easier.
  Note that the Myers diff algorithm (created by Eugene Myers in his
  [seminal work](http://www.xmailserver.org/diff2.pdf) in 1986)
  is not the only one available in [`git diff`](https://git-scm.com/docs/git-diff):
  there are also `minimal`, `patience` and `histogram` diff algorithms available
  (via the `--diff-algorithm` option);
  this is not stated in the article.
+ [How Different Are Different diff Algorithms in Git?](https://cs.paperswithcode.com/paper/how-different-are-different-diff-algorithms):
  a paper with code by Yusuf Sulistyo Nugroho, Hideaki Hata, Kenichi Matsumoto
  from 2019.
+ [Git Things: A grab bag of less frequently talked about git adjacent points](https://matklad.github.io/2023/12/31/git-things.html)
  by Alex Kladov (matklad) on his GitHub Pages-based blog, from 2023.
+ [Unified Versus Split Diff](https://matklad.github.io/2023/10/23/unified-vs-split-diff.html):
  a discussion what is better for code reviews (and what the author uses)
  by Alex Kladov (matklad) on his GitHub Pages-based blog, from 2023.
+ [How Does Git Store Files?](https://blog.git-init.com/how-does-git-store-files/)
  — from a conceptual point of view.  An article by by Alexis Määttä Vinkler
  on [The Pragmatic Git](https://blog.git-init.com/) blog, from 2023.

<!-- -->

+ [Code review antipatterns](https://www.chiark.greenend.org.uk/~sgtatham/quasiblog/code-review-antipatterns/)
  for the dark side developers, a joke article by Simon Tatham
  (don’t do any of the things described in this article).

<!---
__Easy watching__
-->

__Git tools and sites__
+ [The Pragmatic Git](https://blog.git-init.com/) blog;
  note that some articles are paid members only.  Powered by Ghost.
+ [Carapace-bin](https://github.com/carapace-sh/carapace-bin) provides argument completion
  for multiple CLI commands ([full list](https://carapace-sh.github.io/carapace-bin/completers.html)
  including Git, [git-extras](https://github.com/tj/git-extras), `gh` GitHub CLI, `glab` GitLab CLI,
  `tea` Gitea CLI, etc.), and works across multiple POSIX and non-POSIX shells.
  Details about the Git completion support can be found in issue [#99](https://github.com/carapace-sh/carapace-bin/issues/99).
  Written in Go under the MIT license.<br>
  Carapace-bin is a part of the [Carapace](https://carapace.sh/) multi-shell completion library and binary.
  A high-level overview of Carapace itself is available at <https://pixi.carapace.sh>.
+ [git-random](https://git-random.olets.dev/): quickly build random-content Git
  graphs with a specified shape.
  This is a tool that can work as an aid for learning and experimenting with Git.
  Source code available [on GitHub](https://github.com/olets/git-random/).
  Written as a single-file Bash script under a custom
  CC BY-NC-SA 4.0 license with Hippocratic License v3 ethical requirements.
    + The author mentions that this tool was inspired by seeing Lorna Jane Mitchell
      use Matthew J. McCullough's [generaterandomchanges](https://github.com/matthewmccullough/scripts/blob/master/generaterandomchanges)
      in her talk _"[Advanced Git for Developers](https://www.youtube.com/watch?v=duqBHik7nRo)"_
      at Laracon EU 2015.
+ [git-branchnotes](https://gitlab.com/mockturtle/git-branchnotes) is a command-line tool
  (that can be run as a git external command) that allows you to add notes to a branch and manage them.
  Written in Ruby.

+ [w2vgrep - Semantic Grep](https://github.com/arunsupe/semantic-grep)
  is a command-line tool, with the interface similar to that of `grep`,
  that performs semantic searches on text input using word embeddings (word2vec).
  It's designed to find semantically similar matches to the query,
  going beyond simple string matching.  Supports multiple languages.
  Written in Go under the MIT license.
+ [Collective Code Construction Contract](https://rfc.zeromq.org/spec/42/) (C4)
  is an evolution of the github.com [Fork + Pull Model](https://help.github.com/articles/about-pull-requests/),
  aimed at providing an optimal collaboration model for free software projects.
    + Compare with [Ship / Show / Ask: A modern branching strategy](https://martinfowler.com/articles/ship-show-ask.html) model,
      mentioned in [Git Rev News #79](https://git.github.io/rev_news/2021/09/30/edition-79/).

## Releases

+ Gerrit Code Review [3.10.1](https://www.gerritcodereview.com/3.10.html#3101),
[3.8.8](https://www.gerritcodereview.com/3.8.html#388),
[3.9.6](https://www.gerritcodereview.com/3.9.html#396)
+ GitHub Enterprise [3.14.0](https://help.github.com/enterprise-server@3.14/admin/release-notes#3.14.0),
[3.13.3](https://help.github.com/enterprise-server@3.13/admin/release-notes#3.13.3),
[3.12.8](https://help.github.com/enterprise-server@3.12/admin/release-notes#3.12.8),
[3.11.14](https://help.github.com/enterprise-server@3.11/admin/release-notes#3.11.14),
[3.10.16](https://help.github.com/enterprise-server@3.10/admin/release-notes#3.10.16)
+ GitLab [17.3.1, 17.2.4, 17.1.6](https://about.gitlab.com/releases/2024/08/21/patch-release-gitlab-17-3-1-released/),
[17.3](https://about.gitlab.com/releases/2024/08/15/gitlab-17-3-released/),
[17.2.2, 17.1.4, 17.0.6](https://about.gitlab.com/releases/2024/08/07/patch-release-gitlab-17-2-2-released/)
+ GitKraken [10.2.0](https://help.gitkraken.com/gitkraken-client/current/)
+ GitHub Desktop [3.4.3](https://desktop.github.com/release-notes/)
+ git-credential-oauth [0.13.2](https://github.com/hickford/git-credential-oauth/releases/tag/v0.13.2),
[0.13.1](https://github.com/hickford/git-credential-oauth/releases/tag/v0.13.1)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Štěpán Němec, Brandon Pugh, Ralf Steube
and Toon Claes.
