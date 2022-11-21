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

<!---
### Reviews
-->

<!---
### Support
-->

## Developer Spotlight: Bagas Sanjaya

* Who are you and what do you do?

  I'm Bagas Sanjaya. I'm currently unemployed (due to my autistic condition
  that makes working formally isn't the nice option for me).

* What would you name your most important contribution to Git?

  Adding `INSTALL_STRIP` variable when installing Git from source (with
  help from other Git developers due to lack of coding experience).

* For the benefit of the readers, is it possible for you to elaborate a
  bit on what the `INSTALL_STRIP` variable would help them with ?

  Typically users install Git from binary package provided by the
  distribution. For those who wish to install from source, they can
  install build-time dependencies first, then simply do `make && make install`.
  However, it will install Git binaries with debugging info, which
  can take a lot of space. In addition, many Unix systems have `install(1)`
  that have option to automatically strip debugging info during
  installion. That's why `INSTALL_STRIP` is introduced; if supported,
  users can run `make INSTALL_STRIP=-s install` to install
  stripped binaries.

* What are you doing on the Git project these days, and why?

  I'm mostly translating po strings in recent days. Otherwise I'm hacking
  on Linux kernel documentation.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  As an autistic man, I'd like to meet developers who can accomodate my
  special needs (often different from neurotypical people) so that I
  can thrive my living.

* It is good to know that you would like to meet compassionate developers.
  Is it possible for you expand a bit on what you would like to change /
  enhance in Git when you get a team of such developers for a year ?

  I think more on communication. Sure, communicating with email make life
  easier for autistic developers (less physical interaction). However,
  autistic people have different ways of communicating. For me, I need
  a lot of time to process the information from mailing list and formulate
  the wording (which is due to ADHD comorbid). Thus, the community
  expectation should have been adapted to individual needs, e.g. by being
  more explicit on explanation of code of conduct when a new developer
  is contributing. If he/she doesn't understand the CoC, he/she can
  proactively ask the community about points that don't understand.

  In summary, besides adaptation from the community, there must be
  initiatives from developers themselves.

* What is your favorite Git-related tool/library, outside of Git
  itself?

  Gitea. I deployed the server application to the LXD instance on my
  laptop as repository mirror when I push my favorite repos there.

* You have experience translating for Git. Is there something that
  could be done differently to aid with the translation effort?

  I think we need something like self-hosted Weblate when anyone
  with translation skill can easily submit translated strings. But honestly
  deploying one is tricky; I tried to deploy Weblate but couldn't get strings
  from Git source code to be available for translating on the interface.

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
  in this project, while staying up-to-date with general picture.


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
