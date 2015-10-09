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

### Reviews

* [Add Travis CI support](http://git.661346.n2.nabble.com/RFC-PATCH-v1-Add-Travis-CI-support-tt7640334.html)

Lars Schneider wrote that to avoid breaking tests in the future he
configured Travis-CI to run all Git tests including git-p4 and git-lfs
tests on both Ubuntu and MacOS using gcc and clang.

If his config was enabled on https://github.com/git/git then the
status of all official branches and all pull requests could be known
by any contributor for free.

Junio, the Git maintainer, replied that the last time he looked at it,
Travis wanted write access to the repository, and that for security
reason he could not allow that.

Dennis Kaarsemaker replied with the following:

> It does not need write access to the git data, only to auxiliary
> GitHub data: commit status and deployment status (where it can put
> "this commit failed tests"), repository hooks (to set up build
> triggers), team membership (ro) and email addresses (ro).

And then people started discussing if it would be better for Travis to
be configured only on a fork of git/git and about the annoyance that
emails sent by Travis might be.

Roberto Tyley, the author of submitGit, then talked about possible
enhancement to the submitGit workflow if Travis or another CI system
are set up, like enabling sending a patch email to the Git mailing
list only after the test results are available.

And then Matthieu Moy explained the benefits for everyone like this:

> The very nice thing with Travis-CI is that it does not only test the
> repository's branches, but also all pull-requests. So, if it is
> activated on git/git, it will become possible to have a flow like
> 
> 1) User pushes to his own repo, sends a pull-request,
> 
> 2) Travis-CI notices the pull-request and builds it (no action needed
>    from anyone),
> 
> 3) Once the build is finished, the user can use e.g. SubmitGit to
>    actually submit the code.
> 
> This has real benefits for the submitter (know if your code is broken
> early), for the reviewers (things like "you have a def-after-use" would
> be noticed by a computer before human beings start spending time on the
> review), and for you (some issues noticed before a topic enters pu).
> 
> There's no extra work for the user at all compared to the standard
> pull-request flow (nothing to do, just submit a PR), and a one-time
> setup for the project.

This appear to have convinced Junio of the value of a CI tool linked
to git/git, so an interesting way to test patchs will perhaps be
available soon to Git developers.

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
