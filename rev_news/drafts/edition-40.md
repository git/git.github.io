---
title: Git Rev News Edition 40 (June 20th, 2018)
layout: default
date: 2018-06-20 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 40 (June 20th, 2018)

Welcome to the 40th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of May 2018.

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

## Developer Spotlight: Nicolas Pitre

* Who are you and what do you do?

I graduated with a software engineering degree from École
Polytechnique de Montréal. I'm currently a software architect on the
OCTO team at Linaro. I spent most of my professional life working on
the Linux kernel for the ARM architecture. And being a code tinkerer
at heart, I am often looking at assembly output from the compiler to
see what it made of my code.

* How did you get involved in Git?

When Linus Torvalds announced that he'd be taking a break from kernel
work to dedicate some time to the creation of a new code management
system of his own then I got intrigued. I expected this new system to
have an impact on my kernel work flow so I wanted to test it early on.
And of course I quickly got annoyed by all the shortcomings Git had in
those early days, so I started making patches and became a regular
contributor for a few years.

* What would you name your most important contribution to Git?

Delta compression, and object packing heuristics. Getting git-repack
to produce smaller packs and do it faster became an obsession of mine
for a while.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

The git pack format version 2. This is something I worked on for a
while, from the format definition to the first proof-of-concept
implementation. The initial pack size reduction over the current
format was really interesting (around 20%) and the potential for
significant runtime speed-ups was there in theory. In practice that
meant reworking most of git's inner core code to benefit from all the
direct object references provided by that pack format. The existing
proof of concept simply implemented backward compatibility with the
rest of git which made it slower than the current pack format. And
because the current format is already quite efficient already, this
project was facing diminishing returns and I could no longer justify
the required time to work on it. But... if I could get a team for a
year...

* As a git user, what functionality would you like to see implemented?

I really get annoyed when fetching a tracked repository and all the
tags from that remote repo are merged with my own tags, or with tags
from another remote repo. We have a separate namespace for remote
branches but not for remote tags. That makes it very hard to know
where a particular tag comes from, and "git remote rm" doesn't get rid
of them either. This also pollutes the git-describe output.

I think remote tags should have separate namespaces by default just
like remote branches, with similar disambiguation rules when referring
to a tag using a partial path. That's something I meant to implement
myself for years now but never got around to it.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

Some of the early choices I made in the delta compression encoding
format. But that format is simply too widely used now to consider
incompatible changes just for the sake of being marginally more
efficient.

* What is your favorite Git-related tool/library, outside of Git itself?

I'm pretty much a pure-git user and never got used to any of the
associated tools. I grew my git usage while I was also a git developer
with a pretty good knowledge of its internals and native capabilities.
Most tools on top of git are meant to provide a different user
experience that always gave me the impression they were in the way of
the actual basic git command I wanted to use.


## Developer Spotlight: Nicolas Pitre

* Who are you and what do you do?

  I graduated with a software engineering degree from École Polytechnique de
  Montréal. I'm currently a software architect on the OCTO team at Linaro.
  I spent most of my professional life working on the Linux kernel for the ARM
  architecture. And being a code tinkerer at heart, I often looking at assembly
  output from the compiler to see what it made of my code.

* How did you get involved in Git?

  When Linus Torvalds announced that he'd be taking a break from kernel work to
  dedicate some time to the creation of a new code management system of his own
  then I got intrigued. I expected this new system to have an impact on my kernel
  work flow so I wanted to test it early on.  And of course I quickly got annoyed
  by all the shortcomings Git had in those early days, so I started making
  patches and became a regular contributor for a few years.

* What would you name your most important contribution to Git?

  Delta compression, and object packing heuristics. Getting git-repack to produce
  smaller packs and do it faster became an obsession of mine for a while.

* If you could get a team of expert developers to work full time on something
  in Git for a full year, what would it be?

  The git pack format version 2. This is something I worked on for a while, from
  the format definition to the first proof-of-concept implementation. The initial
  pack size reduction over the current format was really interesting (around 20%)
  and the potential for significant runtime speed-ups was there in theory. In
  practice that meant reworking most of git's inner core code to benefit from all
  the direct object references provided by that pack format. The existing proof
  of concept simply implemented backward compatibility with the rest of git which
  made it slower than the current pack format. And because the current format is
  already quite efficient already, this project was facing diminishing returns
  and I could no longer justify the required time to work on it. But... if
  I could get a team for a year...

* As a git user, what functionality would you like to see implemented?

  I really get annoyed when fetching a tracked repository and all the tags from
  that remote repo are merged with my own tag, or with tags from another remote
  repo. We have a separate namespace for remote branches but not for remote tags.
  That makes it very hard to know where a particular tag comes from, and "git
  remote rm" doesn't get rid of them either. This also pollutes the git-describe
  output.

  I think remote tags should have separate namespaces by default just like remote
  branches, with similar disambiguation rules when referring to a tag using
  a partial path. That's something I meant to implement myself for years now but
  never got around to it.

* If you could remove something from Git without worrying about backwards
  compatibility, what would it be?

  Some of the early choices I made in the delta compression encoding format. But
  that format is simply too widely used now to consider incompatible changes just
  for the sake of being marginally more efficient.

* What is your favorite Git-related tool/library, outside of Git itself?

  I'm pretty much a pure-git user and never got used to any of the associated
  tools. I grew my git usage while I was also a git developer with a pretty good
  knowledge of its internals and native capabilities.  Most tools on top of git
  are meant to provide a different user experience that always gave me the
  impression they were in the way of the actual basic git command I wanted to
  use.

## Releases

+ Git [v2.18.0-rc2](https://public-inbox.org/git/xmqqefha5o9g.fsf@gitster-ct.c.googlers.com/), [v2.18.0-rc1](https://public-inbox.org/git/xmqqwove4pzo.fsf@gitster-ct.c.googlers.com/), [v2.18.0-rc0](https://public-inbox.org/git/xmqqr2lsdam9.fsf@gitster-ct.c.googlers.com/), [v2.17.1, v2.13.7, v2.14.4, v2.15.2 and v2.16.4](https://public-inbox.org/git/xmqqy3g2flb6.fsf@gitster-ct.c.googlers.com/)
+ Git for Windows [v2.17.1(2)](https://github.com/git-for-windows/git/releases/tag/v2.17.1.windows.2), [v2.17.1(1)](https://github.com/git-for-windows/git/releases/tag/v2.17.1.windows.1)
+ libgit2 [v0.27.2](https://github.com/libgit2/libgit2/releases/tag/v0.27.2), [v0.27.1](https://github.com/libgit2/libgit2/releases/tag/v0.27.1)
+ libgit2sharp [v0.25.2](https://github.com/libgit2/libgit2sharp/releases/tag/v0.25.2), [v0.25.1](https://github.com/libgit2/libgit2sharp/releases/tag/v0.25.1)
+ Github Enterprise [v2.13.4](https://enterprise.github.com/releases/2.13.4), [v2.12.12](https://enterprise.github.com/releases/2.12.12), [v2.11.18](https://enterprise.github.com/releases/2.11.18), [v2.10.24](https://enterprise.github.com/releases/2.10.24), [v2.13.3](https://enterprise.github.com/releases/2.13.3), [v2.12.11](https://enterprise.github.com/releases/2.12.11), [v2.11.17](https://enterprise.github.com/releases/2.11.17), [v2.10.23](https://enterprise.github.com/releases/2.10.23)
+ Gitlab [v10.8.4](https://about.gitlab.com/2018/06/07/gitlab-10-8-4-released/), [v10.8.3](https://about.gitlab.com/2018/06/01/gitlab-10-8-3-released/), [v10.8.2, 10.7.5, 10.6.6](https://about.gitlab.com/2018/05/29/security-release-gitlab-10-dot-8-dot-2-released/), [v10.8.1](https://about.gitlab.com/2018/05/24/gitlab-10-8-1-released/), [v10.8](https://about.gitlab.com/2018/05/22/gitlab-10-8-released/), [v10.7.4](https://about.gitlab.com/2018/05/22/gitlab-10-7-4-released/)
+ Bitbucket [v5.1](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-5-10-release-notes-948214779.html)
+ GitKraken [v3.6.3](https://support.gitkraken.com/release-notes/current), [v3.6.2](https://support.gitkraken.com/release-notes/current)
+ Github Desktop [v1.2.3](https://desktop.github.com/), [v1.2.2](https://desktop.github.com/), [v1.2.1](https://desktop.github.com/), [v1.2.0](https://desktop.github.com/)

## Other News

__Various__


__Light reading__


__Git tools and sites__

* [git auto-magic]( https://blog.adamspiers.org/2018/06/14/git-auto-magic/) is a set of four tools developed by Adam Spiers supporting higher-level workflows on top of git: git-splice, git-transplant, git-deps and git-explode.

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Gabriel Alcaras &lt;<gabriel.alcaras@telecom-paristech.fr>&gt;
with help from Adam Spiers and Nicolas Pitre.
