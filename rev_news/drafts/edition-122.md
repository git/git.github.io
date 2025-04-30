---
title: Git Rev News Edition 122 (April 30th, 2025)
layout: default
date: 2025-04-30 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 122 (April 30th, 2025)

Welcome to the 122nd edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of March 2025 and April 2025.

## Discussions

### General

* [Let's celebrate Git's 20th anniversary this coming Monday!](https://lore.kernel.org/git/89757bec-4d7e-1d90-5697-44651c6128df@gmx.de/)

  Johannes Schindelin (alias Dscho) posted on the mailing list that
  the oldest Git commit was performed on April 7th, 2005. So Monday
  April 7th, 2025 was the 20th anniversary of Git!

  To celebrate this event, Dscho created
  [a channel on Git's Discord, called `#20th-anniversary`](https://discord.gg/UcjvsNQR)
  where everyone is welcome, especially to talk about their encounter
  with Git.

* [[ANNOUNCE] Git Merge 2025, September 29-30, San Francisco, CA](https://lore.kernel.org/git/Z+L3Mt58n18KUNzs@nand.local/)

  Taylor Blau announced a new [Git Merge 2025](https://git-merge.com)
  conference on September 29-30 at GitHub HQ in San Francisco along
  with a Contributor's Summit on September 30.

  Registration and a Call for Proposals, which closes on May 13th, are
  open. Requests for financial assistance with travel costs can be
  sent to the Git PLC at <git@sfconservancy.org>.

<!---
### Reviews
-->

<!---
### Support
-->

<!---
## Developer Spotlight:
-->

## Other News

__Various__

* [Git turns 20: A Q&A with Linus Torvalds](https://github.blog/open-source/git/git-turns-20-a-qa-with-linus-torvalds/)
  by Taylor Blau on GitHub blog.
* [Celebrating Git's 20th anniversary with creator Linus Torvalds](https://about.gitlab.com/blog/2025/04/07/celebrating-gits-20th-anniversary-with-creator-linus-torvalds/)
  by Patrick Steinhardt on GitLab blog.
* [Linus Torvalds built Git in 10 days - and never imagined it would last 20 years](https://www.zdnet.com/article/linus-torvalds-built-git-in-10-days-and-never-imagined-it-would-last-20-years/)
  by Steven Vaughan-Nichols on ZDNet.
* [20 years of Git. Still weird, still wonderful.](https://blog.gitbutler.com/20-years-of-git/)
  by Scott Chacon on Butler's Log (GitButler).
* [Journey through Git's 20-year history](https://about.gitlab.com/blog/2025/04/14/journey-through-gits-20-year-history/)
  by Patrick Steinhardt on GitLab blog.
* [GitHub MCP Server is now available in public preview](https://github.blog/changelog/2025-04-04-github-mcp-server-public-preview/)
  [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction)
  is an AI tool calling standard that give LLMs (Large Language Models)
  a standardized way to call functions, look up data, and interact with the world.


__Light reading__

* [Verifying tricky git rebases with git range-diff](https://andrewlock.net/verifiying-tricky-git-rebases-with-range-diffs/)
  by Andrew Lock on his .NET Escapades blog.
* [Mirroring my git repositories](https://dustri.org/b/mirroring-my-git-repositories.html)
  using [cgit](https://git.zx2c4.com/cgit/about/) for the interface, and nginx as a web server.
  By Julien (jvoisin) Voisin on their7 blog.
* [Mirroring my Repositories from GitHub to GitLab](https://cleberg.net/blog/git-mirror.html),
  including both public and private repositories on GitLab Fre tier.
  By Christian Cleberg on his blog.
* [Documentation as Code with AsciiDoctor, GitLab CI, and GitLab Pages](https://jensknipper.de/blog/gitlab-ci-pages-asciidoc-documentation-as-code/)
  by Jens Knipper on his personal blog.
* [Afraid to Git](https://dammit.nl/afraid-to-git.html):
  a rant by Michiel Scholten about why because of misbehaving AI scrapers
  he is not putting his Gitea instance (his Git server) on the Internet.
* [Fedora change aims for 99% package reproducibility](https://lwn.net/Articles/1014979/)
  by Joe Brockmeier on LWN\.net.


__Easy watching__

* [Two decades of Git: A conversation with creator Linus Torvalds](https://www.youtube.com/watch?v=sCr_gb8rdEI)
  video interview (YouTube, 41:49).


__Git tools and sites__

* [Devlands](https://devlands.com/) is the game that creates immersive experience
  to help learning Git.  Created by Jacob Stopak, the author of [Git-Sim](https://github.com/initialcommit-com/git-sim)
  tool to visualize Git commands directly in your own repo, which was first mentioned
  in [Git Rev News Edition #95](https://git.github.io/rev_news/2023/01/31/edition-95/).
  Described in [I struggled with Git, so I'm making a game to spare others the pain](https://initialcommit.com/blog/im-making-a-git-game)
  article on Initial Commit Blog.
* [Git Game Show](https://justinpaulson.github.io/git_game_show/) is a text interface app
  that transforms your project's Git commit history into a live, multiplayer trivia game.
  One user hosts a session, other players join remotely, and the system rotates
  through rounds of different question-based "mini-games," awarding points
  and declaring a final winner.
* [dgit](https://manpages.debian.org/testing/dgit/dgit.1.en.html) is a tool that
  allows you to treat the Debian archive as if it were a git repository.
  Conversely, it allows Debian to publish the source of its packages as git branches,
  in a format which is directly useable by ordinary people.
    * Note that GitHub's Spokes system that stores multiple distributed copies
	  of Git repositories was once called DGit.  See [Stretching Spokes](https://github.blog/engineering/infrastructure/stretching-spokes/)
	  article by Michael Haggerty on GitHub Blog mentioned in
	  [Git Rev News Edition #14](https://git.github.io/rev_news/2016/04/20/edition-14/).
* [Mega](https://github.com/web3infra-foundation/mega)
  is an unofficial open source implementation of Google Piper (a proprietary, massive,
  centralized version control system that Google uses internally to manage their vast codebase).
  It is a monorepo & monolithic codebase management system that supports Git. 
  More information can be found in [Why Google Stores Billions of Lines of Code in a Single Repository](https://cacm.acm.org/magazines/2016/7/204032-why-google-stores-billions-of-lines-of-code-in-a-single-repository/fulltext).
  Written in Rust and TypeScript.
* [Oshiro's git](https://github.com/lucasoshiro/oshit): VCS written in Haskell
  that tries to be compatible with git.  This is not safe to use,
  and is only meant for learning how git works and how hard it is.
* [codeowner-filter](https://kertal.github.io/codeowner-filter/) is a simple web tool
  that solves the problem of finding just the files your team owns based
  on the contents of [CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) file.
  It will generate search filters for VSCode, scope configration for IDEA IDEs, and a list.
* [CodeOwners Filter](https://github.com/akowalska622/codeowners-filter) is a Visual Studio Code extension
  that gives you a visual representation of the CODEOWNERS file
  and helps you generate glob include patterns for any code owner. 
* [rebuilderd](https://github.com/kpcyrd/rebuilderd)
  is a tool that monitors the package repository
  of a Linux distribution and uses rebuilder backends
  like archlinux-repro to verify the provided binary packages
  can be reproduced from the given source code.
  Written in Rust, under GPL license.
* [reproduce](https://github.com/vltpkg/reproduce) is an open-source tool
  designed to independently verify whether a published npm package
  can be faithfully rebuilt from its declared source.
  It is described in [Reproducibility vs. Provenance: Trusting the JavaScript Supply Chain](https://blog.vlt.sh/blog/reproducibility)
  blog post by Darcy Clarke.
* [Graft](https://graft.rs/) is an open-source transactional storage engine
  designed for efficient data synchronization at the edge.
  It is described in [Stop syncing everything](https://sqlsync.dev/posts/stop-syncing-everything/)
  article by Carl Sverre, his [Storing small things in big places](https://www.youtube.com/watch?v=eRsD8uSAi0s1)
  Vancouver Systems Talk (video on YouTube, 55:04), and
  [Building a serverless database replica with Carl Sverre](https://www.youtube.com/watch?v=dJurdmhPLH411)
  High Performance SQLite Talk (video on YouTube, 1:10:19).
  Written in Rust.


## Releases

+ GitHub Enterprise [3.16.2](https://docs.github.com/enterprise-server@3.16/admin/release-notes#3.16.2),
[3.15.6](https://docs.github.com/enterprise-server@3.15/admin/release-notes#3.15.6),
[3.14.11](https://docs.github.com/enterprise-server@3.14/admin/release-notes#3.14.11),
[3.13.14](https://docs.github.com/enterprise-server@3.13/admin/release-notes#3.13.14)
+ GitLab [17.11.1, 17.10.5, 17.9.7](https://about.gitlab.com/releases/2025/04/23/patch-release-gitlab-17-11-1-released/),
[17.11](https://about.gitlab.com/releases/2025/04/17/gitlab-17-11-released/),
[17.10.4, 17.9.6, 17.8.7](https://about.gitlab.com/releases/2025/04/09/patch-release-gitlab-17-10-4-released/),
[17.10.3](https://about.gitlab.com/releases/2025/04/02/gitlab-17-10-3-released/),
[17.9.5](https://about.gitlab.com/releases/2025/04/02/gitlab-17-9-5-released/)
+ Gerrit Code Review [3.12.0-rc0](https://www.gerritcodereview.com/3.12.html#3120),
[3.12.0-rc1](https://www.gerritcodereview.com/3.12.html#3120),
[3.12.0-rc2](https://www.gerritcodereview.com/3.12.html#3120),
[3.12.0-rc3](https://www.gerritcodereview.com/3.12.html#3120),
[3.12.0-rc4](https://www.gerritcodereview.com/3.12.html#3120)
+ GitHub Desktop [3.4.19](https://desktop.github.com/release-notes/)
+ GitButler [0.14.19](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.14.19),
[0.14.18](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.14.18)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
