---
title: Git Rev News Edition 90 (August 31st, 2022)
layout: default
date: 2022-08-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 90 (August 31st, 2022)

Welcome to the 90th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of July 2022.

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


## Developer Spotlight: Glen Choo

* Who are you and what do you do?

  I'm a Software Engineer at Google on a team that works on Git. My prior
  experience is comprised solely of different flavours of proprietary web
  apps, so I'm constantly grateful for the opportunity to work on the
  polar opposite of that :)

  The only interesting thing I do outside of work is rock climbing.
  Sometimes, I wish I spent as much time rock climbing as I do working,
  which probably means that I should figure out how to do both
  simultaneously.

* What would you name your most important contribution to Git?

  Hm, I've only been contributing for a short while, so it's hard for me
  to call any of them important per se. The most user-visible one is
  safe.bareRepository, but I don't think many users will use it in its
  current form. If I had more time, I'd expand it into a safer default for
  everyone.

* What are you doing on the Git project these days, and why?

  Most of my work has been focused on getting submodules to work with
  branches as well as general submodule cleanup work. I get a kick out of
  searching "git submodule bad", nodding my head at every single complaint
  and dreaming about the day I get accurate search results for "git
  submodule good".

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  I'd probably find a different way to structure the test suite so that we
  can share far less state between tests, or maybe come up with a way to
  visualize the setup for each test case. It would be nice to be able to
  read just a single test case to understand what's happening.

  If I had 5 teams of experts and 10 years I'd lib-ify all of Git's
  internals and have the Git CLI call the Git library in the same way
  everyone else calls libgit2.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  I'd remove nearly all of the CLI flags and replace them with more
  consistent, mnemonic flags. It's fun to be able to throw Git CLI trivia
  at friends, but at some point, maybe it would be better for them to
  be able to remember it themselves.

* What is your favorite Git-related tool/library, outside of Git itself?

  I owe almost everything I know about Git to [Magit](https://magit.vc/)
  (the Emacs plugin). When I was much much newer to Git, it was a safer,
  friendlier, more discoverable entry point than the Git CLI. These days, it's
  still an essential part of my toolbox since it vastly reduces the number of
  keystrokes (I'm a really bad typist) and it gives an amazing interface
  for modifying and applying diffs (I still have not touched "git add -p"
  and at this point, I think it's too late to start).

  Honourable mention goes to [git-branchless](https://github.com/arxanas/git-branchless).
  It does so many amazing things that I've grown to rely on, like
  anonymous branches, obsolescence tracking, history manipulation.

* Do you happen to have any memorable experience w.r.t contributing to
  the Git project? If yes, could you share it with us?

  Jeff King, one of the most prolific contributors, took a break from the
  Git project last year. I was probably one of the first people to realise
  when he came back from the break because his first email on the mailing
  list was a bug report comment on a bug that I created :')

* Could you describe your Git development toolbox?

  For reading email, I've configured an email folder for the mailing list,
  which gets pulled down by [offlineimap](http://www.offlineimap.org/) + [notmuch](https://notmuchmail.org/).
  I read email using notmuch-emacs, which claims to be a frontend to
  notmuch, but is actually also a full-fledged MUA (just like how Emacs
  claims to be a text editor, but is actually an OS).

  For reviewing patches, I apply the patches to a dedicated worktree using
  [b4](https://github.com/mricon/b4). "b4 shazam" is as close to painless
  as I can imagine.

  For sending patches, I wrote a bunch of scripts around "git
  format-patch" and "git send-email" and organised my branches so that I
  could keep track of each version I sent out. Then one day I tried
  GitGitGadget, realised that it does nearly all of those things for me
  for free, and those scripts have remained virtually unused since :) I
  will probably never use them again once GGG learns how to base
  topics on topics.

* What is your advice for people who want to start Git development?
  Where and how should they start?

  The best place to start is to get acquainted with the mailing list and
  the community. Reading the mailing list and sending a low-stakes patch
  (like a doc fix or usage string fix) are pretty good ways to do this.
  Folks on the mailing list tend to communicate in a distinctive style -
  it's often direct, and silence can have a different meaning from what
  you're used to. I'm guessing that for most people, learning how to
  communicate effectively on the mailing list is harder than the actual
  technical aspects of Git development.

  I'd also recommend that newcomers fight the urge to make their v1
  patches absolutely perfect. The community is pretty accommodating to new
  contributors, so once you're convinced that the codebase is better off
  with your change than without, it's fine to send it out! Far more often
  than not, it will lead to a positive interaction.

* If there's one tip you would like to share with other Git developers,
  what would it be?

  Assume good intent from the people you interact with. I think the
  mailing list can be intimidating at times (especially to newcomers), but
  if you assume good intent, then everyone suddenly seems friendlier and
  feedback becomes easier to receive. And of course, remember to pay it
  forward by acting with good intent.


## Releases

+ Git [2.37.2](https://public-inbox.org/git/xmqqedxmfyhe.fsf@gitster.g/)
+ Git for Windows [2.37.2(2)](https://github.com/git-for-windows/git/releases/tag/v2.37.2.windows.2),
[2.37.2(1)](https://github.com/git-for-windows/git/releases/tag/v2.37.2.windows.1)
+ GitLab [15.3.1](https://about.gitlab.com/releases/2022/08/22/critical-security-release-gitlab-15-3-1-released/)
[15.3](https://about.gitlab.com/releases/2022/08/22/gitlab-15-3-released/),
[15.2.2](https://about.gitlab.com/releases/2022/08/01/gitlab-15-2-2-released/)
+ Bitbucket Server [8.3](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ GitHub Enterprise [3.5.4](https://help.github.com/enterprise-server@3.5/admin/release-notes#3.5.4),
[3.4.7](https://help.github.com/enterprise-server@3.4/admin/release-notes#3.4.7),
[3.3.12](https://help.github.com/enterprise-server@3.3/admin/release-notes#3.3.12),
[3.2.17](https://help.github.com/enterprise-server@3.2/admin/release-notes#3.2.17)
+ GitHub Desktop [3.0.6](https://desktop.github.com/release-notes/)

## Other News

__Various__


__Light reading__

<!---
__Easy watching__
-->

__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
