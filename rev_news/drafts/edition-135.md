---
title: Git Rev News Edition 135 (May 31st, 2026)
layout: default
date: 2026-05-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 135 (May 31st, 2026)

Welcome to the 135th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](https://git.github.io).

This edition covers what happened during the months of April and May 2026.

## Discussions

### General

* [[GSoC] Welcoming our 2026 contributors and thanking our applicants](https://lore.kernel.org/git/CA+ARAto8ZLSu3oFS1QaOqc++Dm+Wb35EqeBo6JUJ5jVG4MZNbg@mail.gmail.com/)

  The Git project was accepted in the
  [Google Summer of Code (GSoC)](https://summerofcode.withgoogle.com/)
  this year again, and 4 applicants were
  [selected](https://summerofcode.withgoogle.com/programs/2026/organizations/git):

  - K Jayatheerth will work on
    [the "Improve the new git repo command" project](https://summerofcode.withgoogle.com/programs/2026/projects/O1nF3zMT)
    mentored by Lucas Oshiro and Justin Tobler.

  - Pablo Sabater will work on
    [the "Complete and extend the remote-object-info command for git cat-file" project](https://summerofcode.withgoogle.com/programs/2026/projects/752yzmwm)
    mentored by Chandra Pratap and Karthik Nayak.

  - Siddharth Shrimali will work on
    [the "Improve Disk Space Recovery for Partial Clones" project](https://summerofcode.withgoogle.com/programs/2026/projects/hs14IFAn)
    mentored by Christian Couder and Siddharth Asthana.

  - Tian Yuchen will work on
    [the "Refactoring in order to reduce Git’s global state" project](https://summerofcode.withgoogle.com/programs/2026/projects/Lx1PmL4k)
    mentored by Ayush Chandekar, Christian Couder and Olamide Caleb Bello

  Congratulations to them, and thanks a lot to all the applicants who
  worked on Git and submitted proposals!

<!---
### Reviews
-->

<!---
### Support
-->

## Developer Spotlight: Matthias Aßhauer

* **Who are you and what do you do?**

  I'm Matthias, a software developer from Germany. I work on Git for Windows
  and occasionally other adjacent projects in my spare time. On Git for Windows,
  I mostly do small contributions in various auxillary repos, maintenance
  related tasks, code review and issue triage.

* **What would you name your most important contribution to Git?**

  I'd say early support of Jean-Noël Avila's translations of the man pages
  is what's probably most widely useful. Most of the things I do are helpful
  to niche uses or fix small bugs, but the man pages are widely used by
  most git users and I love that [git-scm.com can](https://git-scm.com/docs/git)
  offer a nice little language dropdown for them nowadays. I should try to
  find some time to continue that work.

* **What are you doing on the Git project these days, and why?**

  In my [last patch series](https://lore.kernel.org/git/pull.2081.v2.git.1775454330.gitgitgadget@gmail.com/)
  I promised a follow up patch that improves CPU core detection on
  multi-socket-systems on Windows. I need to send that to the mailing list.
  I probably also have some other Windows improvements in Git for Windows
  that I should upstream to git.git.

* **If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?**

  I don't have a big project idea for a decently sized team of the top of
  my head. That said there are a lot of currently ongoing topics that could
  use helping hands. I think `SHA256`<->`SHA1` interop could use some
  helping hands. The new [`git history`](https://git-scm.com/docs/git-history)
  command has a lot of potential and could use a team. We also have a few
  cross-platform portability issues that could do with some very tedious
  cleanup work throughout large parts of the code base.

* **If you could remove something from Git without worrying about
  backwards compatibility, what would it be?**

  The file based refs backend and related filesystem based design choices
  where constraints and quirks of various filesystems hold back things
  that aren't inherently required to stick to those constraints.

* **What is your favorite Git-related tool/library, outside of Git itself?**

  My most used are probably [Sourcetree](https://www.atlassian.com/software/sourcetree)
  and [public inbox](https://public-inbox.org/git/). I mostly use Sourcetree
  for pretty basic stuff (committing, fetching, merging, pulling, pushing)
  and drop into the command line for slightly more advanced things
  (fixup commits, interactive rebase, bisect, `add -p`). One neat thing about
  it is that it allows me to easily stage individual lines instead of just
  hunks like `add -p`.

  I find public inbox ([the software behind](https://github.com/nojb/public-inbox)
  [lore.kernel.org](https://lore.kernel.org/git/)] just clicks a lot nicer
  with me than most other mailing list archive software.

  I also like [`git filter-repo`](https://github.com/newren/git-filter-repo),
  but am quite happy that I rarely need to use it.

* **Do you happen to have any memorable experience w.r.t. contributing to
  the Git project? If yes, could you share it with us?**

  In general, I have fond memories of the contributor summits I've attended
  (both remotely and in person). Putting some faces to the names and talking
  in real time with people you usually only interact with by email is a
  genuine pleasure.

* **What is your toolbox for interacting with the mailing list and for
  development of Git?**

  It's a mess. I used to mostly write and test most of my patches on Linux,
  but currently write most of my patches on Windows, test build them in the
  Git for Windows SDK and then submit them using [GitGitGadget](https://gitgitgadget.github.io/).
  Since my mail provider recently stopped delivering the mailing list traffic
  to my inbox, I tend to read the mailing list on lore.kernel.org, download
  mails as mbox files and reply to them using [alpine](https://alpineapp.email/).
  I have looked at [korgalore](https://korgalore.docs.kernel.org/en/latest/) as
  a way to get the mailing list back into my inbox, but haven't gotten around
  to testing it yet.

* **What is your advice for people who want to start Git development?
  Where and how should they start?**

  Start with something small and try to scratch your own itch. Find something
  about Git that you feel could be improved. (An example in my case could be
  adding a single line mode to `add -p`)

  Take a look at the mailing list archives and the history of the files in
  question for some insights into why that thing you want to improve might
  be the way it currently is.

  Feel free to ask people for help on the mailing list, on [the discord](https://git-scm.com/community#discord)
  or [in IRC](https://git-scm.com/community#irc). Most people are happy to
  help out a beginner, but it might be easy to miss that a patch submitter
  on the mailing list is less familiar with the code base.


## Other News

__Various__


__Light reading__

<!---
__Easy watching__
-->

__Git tools and sites__


## Releases

# Releases

+ libgit2 [1.9.4](https://github.com/libgit2/libgit2/releases/tag/v1.9.4),
[1.9.3](https://github.com/libgit2/libgit2/releases/tag/v1.9.3)
+ go-git [6.0.0-alpha.4](https://github.com/go-git/go-git/releases/tag/v6.0.0-alpha.4),
[6.0.0-alpha.3](https://github.com/go-git/go-git/releases/tag/v6.0.0-alpha.3)
+ gitoxide [0.54.0](https://github.com/GitoxideLabs/gitoxide/releases/tag/v0.54.0)
+ GitLab [19.1](https://docs.gitlab.com/releases/19/gitlab-19-1-released/),
[19.0](https://docs.gitlab.com/releases/19/gitlab-19-0-released/),
[19.0.1, 18.11.4, 18.10.7](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-0-1-released/),
[18.11.3, 18.10.6, 18.9.7](https://docs.gitlab.com/releases/patches/patch-release-gitlab-18-11-3-released/)
+ Gitea [1.26.2](https://github.com/go-gitea/gitea/releases/tag/v1.26.2)
+ Bitbucket Data Center [10.3](https://confluence.atlassian.com/bitbucketserver/release-notes-872139866.html)
+ Gerrit Code Review [3.14.0-rc6](https://www.gerritcodereview.com/3.14.html#3140),
[3.14.0](https://www.gerritcodereview.com/3.14.html#3140)
+ GitHub Enterprise [3.20.3](https://docs.github.com/enterprise-server@3.20/admin/release-notes#3.20.3),
[3.19.7](https://docs.github.com/enterprise-server@3.19/admin/release-notes#3.19.7),
[3.18.10](https://docs.github.com/enterprise-server@3.18/admin/release-notes#3.18.10),
[3.17.16](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.16),
[3.16.19](https://docs.github.com/enterprise-server@3.16/admin/release-notes#3.16.19),
[3.21.0](https://docs.github.com/enterprise-server@3.21/admin/release-notes#3.21.0),
[3.20.2](https://docs.github.com/enterprise-server@3.20/admin/release-notes#3.20.2),
[3.19.6](https://docs.github.com/enterprise-server@3.19/admin/release-notes#3.19.6),
[3.18.9](https://docs.github.com/enterprise-server@3.18/admin/release-notes#3.18.9),
[3.17.15](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.15),
[3.16.18](https://docs.github.com/enterprise-server@3.16/admin/release-notes#3.16.18)
+ GitKraken [12.1.2](https://help.gitkraken.com/gitkraken-desktop/current/),
[12.1.1](https://help.gitkraken.com/gitkraken-desktop/current/),
[12.1.0](https://help.gitkraken.com/gitkraken-desktop/current/)
+ GitHub Desktop [3.5.11](https://desktop.github.com/release-notes/),
[3.5.10](https://desktop.github.com/release-notes/),
[3.5.9](https://desktop.github.com/release-notes/)
+ lazygit [0.62.1](https://github.com/jesseduffield/lazygit/releases/tag/v0.62.1),
[0.62.0](https://github.com/jesseduffield/lazygit/releases/tag/v0.62.0)
+ GitButler [0.19.13](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.19.13),
[0.19.12](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.19.12)
+ Kinetic Merge [1.15.0](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.15.0)
+ git-branchless [0.11.1](https://github.com/arxanas/git-branchless/releases/tag/v0.11.1),
[0.11.0](https://github.com/arxanas/git-branchless/releases/tag/v0.11.0)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
