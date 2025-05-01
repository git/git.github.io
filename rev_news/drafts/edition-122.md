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

This edition covers what happened during the months of March and April 2025.

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

* [Patch (apply) vs. Pull](https://lore.kernel.org/git/1119284365.3926.15.camel@localhost.localdomain/)

  To celebrate Git's 20th anniversary in our own way let's talk about
  a discussion on the Git mailing list that happened nearly 20 years
  ago.

  On June 20, 2005, Darrin Thompson sent an email about a discrepancy
  he was perceiving between his mental model of how Git worked and a
  common practice he observed on mailing lists.

  He understood that on one hand Git was about people duplicating
  locally the remote history they were interested in, which provided
  common points in history that enabled "intelligent merging", while
  on the other hand mailing lists were filled with emailed patches.

  He asked how the patches were created and handled to ensure they
  could be properly dealt with by the receivers and those who would
  later pull from those initial receivers.

  He was basically trying to reconcile the patch-based workflow on
  mailing lists with Git's design, especially its merging philosophy
  based on a common history.

  Junio Hamano, who would later become the Git maintainer, then
  replied to Darrin acknowledging that emailed patches were essentially
  "out of band" communications. Merges could still work if the same
  patch had been applied independently. Even if that wasn't ideal, it
  was "manageable".

  Junio then described his workflow, which consisted of regularly
  pulling from Linus, discarding his HEAD, using Linus' HEAD instead,
  and reapplying onto it some patches that Linus had rejected but he
  still considered good. Then he would work on new changes and commit
  them on top.

  Darrin, questioning this approach, asked for ways to manage patches
  as a series of commits, and wondered if that would still allow
  cherry-picking patches.

  Then Daniel Barkalow and Catalin Marinas chimed into the discussion
  to talk about [StGit (Stacked Git)](https://stacked-git.github.io/)
  which helps manage Git commits as a stack of patches. Catalin
  Marinas was the creator of StGit, which seems to still be developed
  these days as there was a 2.5.0 release in January 2025.

  Daniel suggested integrating functionality similar to StGit into Git
  to help with applying patches and bridging the gap between the
  patch-based workflow and Git's commit-based model in general, even
  though he thought that commits were "fundamentally resistant to
  cherry-picking".

  Catalin over the course of the discussion provided specific details
  about how StGit could address Junio's workflow. For example, StGit
  would automatically detect when a patch was already merged upstream
  and warn the user. It could also handle conflicts during the
  reapplication process using `diff3`.

  Catalin also mentioned that StGit would soon support pulling changes
  from a remote tree along with patch series information, making it
  easier to apply patches from different branches.

  Meanwhile, Linus also replied to the email where Junio described his
  workflow, proposing "a different kind of merge logic" to automate
  some of the steps, as individual developers often want to move their
  work forward to the current tip, instead of merging it. The new
  script would "try to re-base all the local commits from the common
  parent onwards on top of the new remote head".

  Linus showed some steps that the script would perform, some of them
  using a new `git-cherry-pick` script that "basically takes an old
  commit ID, and tries to re-apply it as a patch (with author data and
  commit messages, of course) on top of the current head".

  Then Linus, Junio and Daniel discussed how to implement this. One
  problem appeared to be how to automatically detect patches that had
  already been merged even where there were small changes, like typo
  fixes or whitespace changes, in the patches.

  Daniel suggested that authors could give an ID that would be
  preserved across various later modifications to each of their
  patches. Linus didn't like this idea because he thought that they
  could be useful for specific projects but should be tracked outside
  of Git. Inside Git, he thought they could create confusion as it
  wouldn't be clear if a patch has been modified or not.

  Daniel then asked Linus if he actually modified patches before
  applying them. Linus replied that he very often did modify them and
  that he absolutely didn't want to apply them first and then modify
  them as he didn't want "crap" in his code. He further elaborated
  that his `git-apply` tool was strict and refused to apply patches
  with any 'fuzz' (mismatched context lines), only allowing patches
  that matched exactly, potentially after adjusting for line number
  offsets. He said:

  "So I want things to be cleaned up before they hit the tree, rather
  than have a really dirty history. A dirty history just makes it
  harder to read, and I don't believe in a second that it's 'closer to
  reality' like some people claim."

  "I don't believe anybody wants to see the 'true' history. If they
  did, we'd be logging keystrokes, and sending all of that
  around. Nope, people want (and need, in order to be able to follow
  it) an 'idealized' history."

  Martin Langhoff also contributed to the discussion, noting that
  rebasing and replaying local history was an approach he had used
  successfully with [Arch](https://en.wikipedia.org/wiki/GNU_arch). He
  suggested that the rebasing process should be restartable after
  encountering a failed cherry-pick, and proposed adding features like
  a "skip list" for patches already merged upstream and a `--stop-at`
  option to handle batches of commits incrementally.

  Daniel and Linus continued to discuss practical ways to identify and
  manage patches across repositories. Linus proposed hashing the
  actual changes in a patch, ignoring line numbers and whitespaces,
  rather than relying on explicit IDs or commit metadata. He
  implemented this idea in the form of a `git-patch-id` and tested it
  on the Linux kernel repository where it found 15 duplicate patches
  in the kernel history and processed around 2788 patches in under a
  minute with no false positives.

  Junio replied with a series of three patches to the email where
  Linus had suggested some steps that the script to re-base all the
  local commits would perform. The cover letter of his series was
  named "Rebasing for 'individual developer' usage".

  The first patch added a `-m` flag to the `git-commit-script` which
  allowed committing using the commit message and author information
  from an existing commit.

  The second patch implemented a new `git-cherry` script to find
  commits that are in the current branch but not in another branch, so
  it can help find commits that haven't been merged upstream.

  The third patch implemented a new `git-rebase-script` that used the
  functionality from the two previous patches to actually implement
  rebasing.

<!---
### Reviews
-->

<!---
### Support
-->

## Community interview

_Editor note: For Git's 20th anniversary, we are doing an exclusive collaborative
community interview and curating answers from various community members. Also,
there's a short Q&A with our zealous, inclusive and tireless maintainer that
follows below._

TODO

### Short Q&A with our maintainer, Junio C Hamano

- **Looking back over ~20 years of maintaining Git, what has been the
  most surprising or unexpected evolution in the project — technically
  or community-wise?**

  Technically, one of the things I found surprising is how many lines
  from Linus's original version still survive in today's codebase. The
  [initial version of Git](https://github.com/git/git/commit/e83c5163316f89bfbde7d9ab23ca2e25604af290)
  was 1244 lines spread across 11 files, which is miniscule compared
  to 300+ thousands of lines in 4600+ files in v2.49.0, but it is not
  fair to say Linus's original genius is less than 0.3% of what we have.
  If you try running `git blame` in reverse, you'll see that about 10%
  of lines we have in our tree came from the original version Linus
  released 20 years ago. You can check out a
  [little script called "Linus"](https://git.kernel.org/pub/scm/git/git.git/tree/Linus?h=todo)
  out of my "todo" branch and run it to see for yourself.

  Community-wise, there weren't many things that surprised me. I
  expected a bit more developers who are interested in the core part of
  system to stick around, say for more than 10 years, and I hoped that
  some of them would be from younger generations who have never seen any
  version control system other than Git, but how many among the active
  contributors we see on the list every week fall into that category? We
  have long-timers who are respected in the community, but we want to
  grow that pool by say 5 every year or so, some of them ready to stick
  around for another 10 years. In [a recent interview](https://github.blog/open-source/git/git-turns-20-a-qa-with-linus-torvalds/),
  Linus said he wanted somebody with good taste who sticks around, and
  I do believe it is essential to have a sufficient number of long-timers
  who can guide new folks into the community.

  So that is a bit of surprise that makes me a little sad, but at the
  same time, I think what is happening is that a development community
  of an extremely popular and successful system that is mature with
  friendly atmosphere has attracted many aspiring new folks, they
  scratch their own itches and have fun, but then they find more
  interesting things to do and go back to be happy end-users, which is
  totally expected and natural thing.

- **What are your thoughts about AI-assisted development tools in the
  context of Git? Do you see a place for Git itself to become more
  "intelligent"?**

  I've kept saying that
  <https://lore.kernel.org/git/Pine.LNX.4.58.0504150753440.7211@ppc970.osdl.org/>
  is one of the most important design discussion in the early days of
  Git. In that article, Linus outlines how his "ideal" SCM tool would
  let you follow the historyz of a single function in today's codebase
  backwards, notice that at certain revision the function appeared, but
  the tool finds five functions disappeared in the same revision, all
  looking very similar to the function we are interested in that was
  added there, and the tool can explain that the commit consolidated
  duplicated reimplementations done in various subdirectories into a
  single common function and adjusted the existing callers of them to
  the SCM user (if you want to learn more details, go to the original
  and read it twice, I'll wait).

  We can do `git log -S<the-body-of-that-function>` repeatedly to drill
  down the history to find the revision that introduced that new
  (possibly consolidated) function.  In fact, the `-S<pickaxe>` feature
  was invented exactly for the purpose of serving as the first step of
  Linus's "ideal" SCM tool described in the article. But "finding
  similar existing (and possibly getting lost) code in the same or
  possibly nearby revisions" have been nebulous. I do not think anybody
  in the Git circle tried it yet. I wonder, after 20 years, perhaps we
  can feed a project's codebase to LLMs and let them figure out such a
  fact?

- **What's your boldest prediction about how version control might look in
  another 20 years?**

  I do not even foresee what software development in 20 years would look
  like. I am not an insight kind of person.

- **What advice would you give to someone who might one day step into your
  role as Git maintainer?**

  Be original. I didn't aim to duplicate the style Linus ran his tree
  during the first four months of the project. My successor does not
  have to duplicate my style of running the project, either. Having said
  that, personally I would like to see more distribution of
  responsibility. The maintainer may play a role of the final arbiter,
  but it would be great if we can come up with a mechanism to allow list
  participants to bear more of the burden of picking and choosing good
  direction to go, deciding if a particular change is worth doing or the
  are better ways to do the same thing, etc. I've been trying to nudge
  the list discussions in that direction for the past few years, but
  without much success, I think.


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
* [GitHub MCP Server is now available in public preview](https://github.blog/changelog/2025-04-04-github-mcp-server-public-preview/).
  [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction)
  is an AI tool calling standard that give LLMs (Large Language Models)
  a standardized way to call functions, look up data, and interact with the world.


__Light reading__

* [Verifying tricky git rebases with git range-diff](https://andrewlock.net/verifiying-tricky-git-rebases-with-range-diffs/)
  by Andrew Lock on his .NET Escapades blog.
* [Mirroring my git repositories](https://dustri.org/b/mirroring-my-git-repositories.html)
  using [cgit](https://git.zx2c4.com/cgit/about/) for the interface and nginx as a web server.
  By Julien (jvoisin) Voisin on their7 blog.
* [Mirroring my Repositories from GitHub to GitLab](https://cleberg.net/blog/git-mirror.html),
  including both public and private repositories on GitLab Free tier.
  By Christian Cleberg on his blog.
* [Documentation as Code with AsciiDoctor, GitLab CI, and GitLab Pages](https://jensknipper.de/blog/gitlab-ci-pages-asciidoc-documentation-as-code/)
  by Jens Knipper on his personal blog.
* [Afraid to Git](https://dammit.nl/afraid-to-git.html):
  a rant by Michiel Scholten on his dammIT blog, explaining how misbehaving AI scrapers
  cause him not to put his Gitea instance (his Git server) on the Internet,
  and force others - like [Linux' kernel.org](https://git.kernel.org/) - to use tools like [Anubis](https://github.com/TecharoHQ/anubis).
* [Fedora change aims for 99% package reproducibility](https://lwn.net/Articles/1014979/)
  by Joe Brockmeier on LWN\.net.
* [How to Exclude Commits from Git Blame](https://www.git-tower.com/blog/how-to-exclude-commits-from-git-blame) by Bruno Brito on Tower's blog.


__Easy watching__

* [Two decades of Git: A conversation with creator Linus Torvalds](https://www.youtube.com/watch?v=sCr_gb8rdEI)
  video interview (YouTube, 41:49).


__Git tools and sites__

* [Devlands](https://devlands.com/) is the game that creates immersive experience
  to help learning Git.  Created by Jacob Stopak, the author of the [Git-Sim](https://github.com/initialcommit-com/git-sim)
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
  allows you to treat the Debian archive as if it was a Git repository.
  Conversely, it allows Debian to publish the source of its packages as Git branches,
  in a format which is directly useable by ordinary people.
    * Note that GitHub's Spokes system that stores multiple distributed copies
	  of Git repositories was once called DGit.  See the [Stretching Spokes](https://github.blog/engineering/infrastructure/stretching-spokes/)
	  article by Michael Haggerty on GitHub Blog mentioned in
	  [Git Rev News Edition #14](https://git.github.io/rev_news/2016/04/20/edition-14/).
* [Mega](https://github.com/web3infra-foundation/mega)
  is an unofficial open source implementation of Google Piper (a proprietary, massive,
  centralized version control system that Google uses internally to manage their vast codebase).
  It is a monorepo & monolithic codebase management system that supports Git. 
  More information can be found in [Why Google Stores Billions of Lines of Code in a Single Repository](https://cacm.acm.org/magazines/2016/7/204032-why-google-stores-billions-of-lines-of-code-in-a-single-repository/fulltext).
  Written in Rust and TypeScript.
* [Oshit aka Oshiro's git](https://github.com/lucasoshiro/oshit): VCS written in Haskell
  that tries to be compatible with Git.  This is not safe to use,
  and is only meant for learning how Git works and how hard it is.
* [codeowner-filter](https://kertal.github.io/codeowner-filter/) is a simple web tool
  that solves the problem of finding just the files your team owns based
  on the contents of [CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) file.
  It will generate search filters for VSCode, scope configuration for IDEA IDEs, and a list.
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
  It is described in the [Reproducibility vs. Provenance: Trusting the JavaScript Supply Chain](https://blog.vlt.sh/blog/reproducibility)
  blog post by Darcy Clarke.
* [Graft](https://graft.rs/) is an open-source transactional storage engine
  designed for efficient data synchronization at the edge.
  It is described in the [Stop syncing everything](https://sqlsync.dev/posts/stop-syncing-everything/)
  article by Carl Sverre, his [Storing small things in big places](https://www.youtube.com/watch?v=eRsD8uSAi0s1)
  Vancouver Systems talk (video on YouTube, 55:04), and his
  [Building a serverless database replica with Carl Sverre](https://www.youtube.com/watch?v=dJurdmhPLH411)
  High Performance SQLite talk (video on YouTube, 1:10:19).
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
+ Tower for Mac [13.0 (BETA)](https://www.git-tower.com/beta) ([Release blog post](https://www.git-tower.com/blog/tower-mac-13/))


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Bruno Brito.
