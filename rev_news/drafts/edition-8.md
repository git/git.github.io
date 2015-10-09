---
title: Git Rev News Edition 8 (October 14th, 2015)
layout: default
date: 2015-10-14 21:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 8 (October 14th, 2015)

Welcome to the 8th edition of [Git Rev News](http://git.github.io/rev_news/rev_news.html),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](http://git.github.io/rev_news/rev_news.html) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of September 2015.

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

## Developer Spotlight: Luke Diamand

Q. Who are you, and what do you do?

A. I've been writing software since my uncle got me hooked with a TI-56
calculator and a TRS-80 model 2. Right now, I'm working for Roku,
(making cool new video streaming hardware :-) which currently involves
a lot of fairly low-level digging around in SoC software.

Q. What would you name your most important contribution to Git?

A. My fix to git-p4, to make it stream commits into fast-import,
rather than buffer them all up in memory first. I did it out of
desperation.

At the time, I'd just been working for a tiny startup which was also
making video streaming products, but sadly not making any
profits. While there, I'd become hooked on git after watching "those"
videos.

So when I found myself at Broadcom in about 2008, and started trying
to use Perforce, almost the first thing I did was try to use
git-p4. But at the time, it read everything into memory using an
O(n^2) algorithm, which meant it would use up all of the swap space
available (no matter how much you had) and then crash after a couple
of days.

These days of course, if you've got a problem the answer is on
stackoverflow (if you can think of it, it's already been done) but
back then, we had nothing like that. Eventually I found a patch from
Andrew Oakley which hinted at the solution. Inspired by this, I taught
git-p4 to stream commits at fast-import (as the writers of fast-import
presumably intended) and suddenly I could use git at work. Which was
completely awesome!

With a good deal of help from Pete Wyckoff and Junio I then got it
submitted; that process itself was a massive eye opener as to how to
_really_ review code (and how to write shell script as well).

I spent the next few years trying to encourage everyone else in the
office to use git and submitted a few more patches to git-p4 along the
way. We finally switched over, and then the office was closed down!

Which is how it is I now find myself working side-by-side with the
very same Andrew Oakley who wrote that original patch - he's now at
Roku as well!

Q. What are you doing on the Git project these days, and why?

A. It's all git-p4 related. I've got a tiny fix that lets you work on
a detached head; that's just waiting for a bit of bandwidth.

After that, there's a few things I've thought about. It would be very
handy to be able to turn a P4 shelved changelist into a git commit
(and vice-versa). And I think it ought to be possible to teach git-p4
to act in a "daemon" mode, whereby it gets notified of changes and
automatically pushes them into Perforce, and pulls Perforce changes
back into git. I've had something like that going in the past but it
was an ugly hack.

A. If you could get a team of expert developers to work full time on
something in Git for a full year, what would it be?

Performance on big repos would be nice. Quite a few people have tried
in the past so maybe it's just impossible, but for example, I did
wonder if more could be done with cache prefetching (pld instruction
on ARM) to slurp data into the cache faster. Since I'm pretty much
completely ignorant of the internals of git, I'm able to be free of
the boring constraints of reality :-)

And I'd really like a way to painlessly teach people to use git who
only know about traditional revision control systems (e.g. Perforce).

Q. If you could remove something from Git without worrying about
backwards compatibility, what would it be?

I think Junio already removed it. That "feature" where git push would
push all of the branches rather than just HEAD. It had me completely
confused when I was first starting.

Q. What is your favorite Git-related tool/library, outside of Git
itself?

I really like Gerrit, although the prolog configuration makes my head
hurt. And of course Github has to get a mention - it's making git (and
hence sane version control) ubiquitous. There was a question about it
the other day on a mountain bike forum I follow!

Q. What is your favourite new feature in git?

`git commit --fixup`

I only found this recently, it's just brilliant. Thank you, whoever it was put that in!


## Releases


## Other News

__Various__


__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt; and Nicola Paolucci &lt;<npaolucci@atlassian.com>&gt;,
with help from Luke Diamand.
