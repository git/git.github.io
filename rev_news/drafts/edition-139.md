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

  My first [merged commit in 2018](https://github.com/git/git/commit/1fb20dfd8ed70b4459312918a71444bc79ea6f0b) ([commit](https://lore.kernel.org/git/20180402005248.52418-1-haraldnordgren@gmail.com/))
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


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
