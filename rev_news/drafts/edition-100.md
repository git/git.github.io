---
title: Git Rev News Edition 100 (June 28th, 2023)
layout: default
date: 2023-06-28 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 100 (June 28th, 2023)

Welcome to the 100th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of May 2023 and June 2023.

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


## Developer Spotlight: John Cai

* Who are you and what do you do?

  My name is John Cai, and I started to contribute to the project back in 2021. I
  also lead the Git team at GitLab, where we aim to improve Git and add features
  that will make the lives of GitLab users and Git users better.

* What would you name your most important contribution to Git?

  Adding a `--batch-command` mode to `cat-file` was the first feature that I
  contributed to Git. It allows a single long running process to handle different
  cat-file queries. Most developers wouldn't take advantage of this, but for Git
  servers it's a nice feature.

* What are you doing on the Git project these days, and why?

  Things like documentation improvements, as well as working on some small features
  that will optimize the server side of things. At GitLab we are currently
  developing a system that will contain many ephemeral refs, so we recently added
  options to `git-pack-refs(1)` that allow the caller to specify refs to exclude
  from the packed refs file.

  I still consider myself a bit of a newbie, but I love contributing however I can
  since Git is such an impactful project. Further, since our team interfaces with
  Git so much, I often notice opportunities for incremental improvements. Other
  times, we have explicit needs to add a feature or enhancement to support
  improvements to our Git data access layer in GitLab.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  Transition the project to a new refs backend! There have been plenty of great
  discussion around this--whether to go with the reftables backend or a new
  format of the packed-refs file. Swapping out the refs backend would be a huge
  undertaking, but well worth it, in my opinion.

* What is your favorite Git-related tool/library, outside of
  Git itself?

  When reviewing code, I've been using [meld](https://github.com/GNOME/meld).
  I overall like the UI.

* What is your toolbox for interacting with the mailing list and for
  development of Git?

  I use GitGitGadget mostly, but also [b4](https://people.kernel.org/monsieuricon/introducing-b4-and-patch-attestation)
  is great for trying out patches locally.

* What is your advice for people who want to start Git development?
  Where and how should they start?

  It can definitely be intimidating since the codebase is so storied and
  technically deep. My suggestion is to just dive in and get started with
  something small--whether that be a documentation improvement or a code cleanup
  marked with TODO. Also, keep an eye out for bug reports on the mailing list.
  Fixing bugs also gives you experience with different parts of the code base.

  Part of my intimidation is not knowing how people on the mailing list would
  respond to my contributions. Experiencing how hepful people were, and the
  overall warmth of the community removed a lot of the emotional barrier of
  contributing.

  Also, it's easy to read into tone in text-only communication, but the mailing
  list is full of people who genuinely want to help. Don't let the fear prevent
  you from contributing! You'll learn incrementally each time you send something
  to the list.

* If there's one tip you would like to share with other Git
  developers, what would it be?

  Spend more time than you think you need to on crafting commit messages. It goes
  a long way to clearly state the need, and how the patch addresses the need.

  Also, look for existing APIs in the codebase 😄


## Releases


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
