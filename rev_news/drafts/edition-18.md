---
title: Git Rev News Edition 18 (August 17th, 2016)
layout: default
date: 2016-08-17 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 18 (August 17th, 2016)

Welcome to the 18th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of July 2016.

## Discussions

<!---
### General
-->


### Reviews

* [Git filter protocol](https://public-inbox.org/git/20160810130411.12419-1-larsxschneider%40gmail.com/)

Lars Schneider recently sent version 5 of his "Git filter protocol"
patch series. The goal of this series is to avoid launching a new
clean/smudge filter process for each file that should be filtered.

Only one filter process per Git command should be launched, and this
process should communicate with the Git command using Lars' new filter
protocol.

This would make Git faster when a large number of files have to
be filtered and when the startup time of a filter process is not
insignificant.

Lars wants especially to speed up Git-LFS, as Git-LFS works using a
clean/smudge filter to send or get the large files to and from the
special Git-LFS storage, so he also wrote
[a pull request that implements a filter process for Git-LFS](https://github.com/github/git-lfs/pull/1382)
and that uses his new filter protocol.

On this pull request, Lars reports the following results when
switching branches on OSX with 12,000 Git LFS files:

```
Default Git and Git LFS:                      6m2.979s + 0m1.310s = 364s
Git and Git LFS with filter protocol support: 0m2.528s + 0m2.280s = 5s
```

He says that with his filter protocol the operation is almost 70 times
faster in this particular use case and that he expects "even more dramatic
results on Windows", as launching a new process is usually slower on Windows.

When he started working on this, Lars first sent emails to the mailing
list to get information about
[filter driver code](https://public-inbox.org/git/67D9AC88-550E-4549-9AFD-2401B70B363B%40gmail.com/)
and explanations about
[the fact that clean filter is executed 12 times for 3 files](https://public-inbox.org/git/1469134747-26785-1-git-send-email-larsxschneider%40gmail.com/).

The discussion following his first email involved Junio Hamano, Jeff
King alias Peff, Torsten Bögershausen and Jakub Narębski, and led to
explanations and then interesting design discussions.

The discussion following Lars' second email prompted Peff to send
[a patch to fix some useless clean filter invocations](https://public-inbox.org/git/20160722152753.GA6859%40sigill.intra.peff.net/).

Following those discussions Lars sent the following versions of his patch series:

- [v1](https://public-inbox.org/git/20160722154900.19477-1-larsxschneider%40gmail.com/),
- [v2](https://public-inbox.org/git/20160727000605.49982-1-larsxschneider%40gmail.com/),
- [v3](https://public-inbox.org/git/20160729233801.82844-1-larsxschneider%40gmail.com/),
- [v4](https://public-inbox.org/git/20160803164225.46355-1-larsxschneider%40gmail.com/),
- [v5](https://public-inbox.org/git/20160810130411.12419-1-larsxschneider%40gmail.com/)

These series were reviewed or involved a large number of Git
developers, like Ramsay Jones, Remi Galan Alfonso, Eric Wong, Duy
Nguyen, Johannes Sixt, Stefan Beller, Junio, Peff, Torsten, Jakub.

One especially interesting sub thread was started by Jakub with
[a long email about "Designing the filter process protocol"](https://public-inbox.org/git/607c07fe-5b6f-fd67-13e1-705020c267ee%40gmail.com/).

Hopefully all this work will eventually be merged and result in great
improvements for some important Git use cases.

### Support

* [Find a topic branch containing a commit](https://public-inbox.org/git/CACsJy8CMnywB8AdmLxB8LnsznHrMTieoezhaQS=2r1pnM8ONZA@mail.gmail.com/)

Duy asked on the mailing list:

> Before I start doing anything silly because I don't know it can
> already be done without waving my C wand like a mad man...
>
> I often do this: find a commit of interest, the commit itself is not
> enough so I need a full patch series to figure out what's going, so I
> fire up "git log --graph --oneline" and manually search that commit
> and trace back to the merge point, then I can "git log --patch". Is
> there an automatic way to accomplish that? Something like "git branch
> --contains" (or "git merge --contains")?
>
> PS. Sometimes I wish we could optionally save cover letter in the
> merge commit. Sometimes the "big plan" is hard to see by reading
> individual commit messages.

Saving the cover letter of a patch series - which is patch 0 in the
series, but is not a real patch, so is not applied - is by the way a
different topic that
[reappeared on the list recently](https://public-inbox.org/git/CA+P7+xpHDGY5RTR8ntrABdxqM6b4V9dndS68=kV1+1Ym1N6YKw@mail.gmail.com/)
and was also discussed following the
[announcement by Josh Triplett of his new git-series tool](https://public-inbox.org/git/20160729064055.GB25331@x/).

To the main question about finding the topic branch containing a
commit, Stefan Beller suggested using
[Michael Haggerty's git-when-merged](https://github.com/mhagger/git-when-merged).

Duy was happy with this tool, but would have liked an option to show
all the commits in a topic branch, for example something that would do
a `git log` from the merge base to the merge point. He also asked
Michael if he had any plan to port it to C and integrate it into Git.

Michael replied the next day that he had made
[a pull request, which has since be merged, for the new option](https://github.com/mhagger/git-when-merged/pull/13),
but that he had no plan to port it to C and integrate it into Git.

Junio also suggested a way to get a more human readable result for
example by running `git show` on the merge commit.

## Developer Spotlight: Lars Schneider

* Who are you and what do you do?

I am a software engineer living in Berlin, Germany. Currently, I am the technical
lead for a team that helps 4000+ Autodesk engineers adopt Git as their main
source control system. This is a challenging but also very interesting task as
I am constantly confronted with all kinds of problems that Git users run into.
Fortunately, Autodesk allows me to spend part of my time addressing these problems
and contributing possible solutions back to the community.

* What would you name your most important contribution to Git?

Autodesk has lots and lots of Perforce repositories with 20+ years of history.
We are gradually moving them to Git and during this process I try to constantly
improve the "git-p4" migration tool. I managed to get quite a number of patches
upstream already but there are still more in my local queue :-)

However, I am most proud of an indirect contribution to Git. I helped the
Git community set up Git [CI builds for OSX and Linux on Travis CI](https://travis-ci.org/git/git/branches). This makes
it really easy to ensure that new patches build without errors and cause no
test failures on all major platforms and compilers. Casual contributors can
create Pull Requests containing their patches against https://github.com/git/git
and 20min later they would know if their patches pass all checks. This way a
contributor can ensure that no precious reviewer time is wasted with broken
patches.

* What are you doing on the Git project these days, and why?

I am working on an improved Git filter protocol. Git filters are a great
mechanism to transparently modify repository content on commit and checkout.
Amongst other things it is used to adjust platform specific line endings, to
cleanup tab/whitespaces issues, to encrypt content, and to handle large files
outside of the Git repository (e.g. via
[git-annex](https://git-annex.branchable.com/) or
[Git LFS](https://git-lfs.github.com/)).

The problem with the current protocol is that a filter process is invoked for
each individual file. If you have a large number of files, then you start an equally
large number of processes. This gets slow quickly and therefore I am working
on a patch series that reuses a single filter process for all files in the lifetime of a
Git process.

* If you could get a team of expert developers to work full time on
something in Git for a full year, what would it be?

First, we would improve the Travis CI setup and add Windows to the platforms
that are constantly tested. Afterwards we would join forces with David Turner,
Ben Peart, and Duy Nguyen and improve the Git performance for repositories
that contain a very large number of files.

* If you could remove something from Git without worrying about
backwards compatibility, what would it be?

I would not remove anything, but I would try to improve the UX. Unfortunately,
modifying the UX of Git core commands is incredible hard as these commands are
also used in a lot of scripts that we cannot break.

* What is your favorite Git-related tool/library, outside of Git itself?

A couple of years ago I wrote [ShowInGitHub](https://github.com/larsxschneider/ShowInGitHub),
a plugin that helps you to jump from a specific line of code in Xcode to the
same line on Github. It was my favorite Git tool during my iOS developer days.

More recently I got really excited about [Git LFS](https://git-lfs.github.com/).
Granted, Git LFS breaks one of Git's core features as LFS repositories are by default
not distributed anymore. However, Git LFS is a pragmatic solution to a huge problem
that many Git users face if they need to store large media assets or integration test
data along with their source code.

## Releases


* Jonas Fonseca [announced tig 2.2](https://public-inbox.org/git/CAFuPQ1%2Bi6BFRH%3D6HUWzDgM7J%2BhL_3hUNv5-4mjjGm%3Dh-YWVuzg%40mail.gmail.com/), see also the [release page](https://github.com/jonas/tig/releases/tag/tig-2.2)
* [GitLab 8.10](https://about.gitlab.com/2016/07/22/gitlab-8-10-released/) through [8.10.3](https://about.gitlab.com/2016/08/01/gitlab-8-dot-10-dot-3-released/)
* [GitHub Enterprise 2.7](https://github.com/blog/2214-github-enterprise-2-7-is-now-available-with-enhanced-security-and-more-powerful-apis)

## Other News

__Various__

* A ["Reedited" version](https://github.com/nobozo/progit2) of [*Pro Git 2nd Edition*](https://github.com/progit/progit2) by Jon Forrest
* Author of [git-annex](https://git-annex.branchable.com/), Joey Hess has [launched a Patreon page to support continued development on his open source projects](https://www.patreon.com/joeyh)

__Light reading__

* A [slightly delayed write-up of Git Merge 2016](https://www.theguardian.com/info/developer-blog/2016/jul/02/git-merge-2016) by Roberto Tyley of the Guardian
* [Mango: Git completely decentralised](https://medium.com/@alexberegszaszi/mango-git-completely-decentralised-7aef8bcbcfe6) by Alex Beregszaszi
* Max Heiber explains [How I Messed Up Our Repo and Ideas for Improving Git UX](https://medium.com/@maxheiber/how-i-messed-up-our-repo-and-ideas-for-improving-git-ux-e248d9e27e79#.hb10x5w10)
* [Demystifying Git internals](https://medium.com/@pawan_rawal/demystifying-git-internals-a004f0425a70#.l34w4zy60), by Pawan Rawal
* [Version control: Effective use, issues and thoughts, from a gamedev perspective](http://www.what-could-possibly-go-wrong.com/version-control/), by Ashley Davis
* [Setup Keybase.io, GPG & Git to sign commits on GitHub](https://github.com/pstadler/keybase-gpg-github) (and for Git), a gist by Patrick Stadler

__Git tools and sites__

* Gmane (a mailing list archive that was used heavily by some Git developers)
[shut down its web site](https://lars.ingebrigtsen.no/2016/07/28/the-end-of-gmane/comment-page-1/#comment-13502).  This issue was covered in the ["Ingebrigtsen: The End of Gmane?"](https://lwn.net/Articles/695695/) short note on LWN.net, which got included in the  ["Announcements" section of LWN.net Weekly Edition for August 4, 2016](http://lwn.net/Articles/695980/); comments there mention that threaded view in Gmane web interface had no equal in other mail archive sites.  There is also [Alternatives to mid.gmane.org?](https://public-inbox.org/git/%3C481D1EE2-6A66-418F-AB28-95947BBF3680@gmail.com%3E/) thread, listing among others [MARC.info](https://marc.info/?l=git) and public-inbox.  [A note from the maintainer](https://public-inbox.org/git/%3Cxmqq1t1twymf.fsf@gitster.mtv.corp.google.com%3E/) got updated in light of this change.
* [public-inbox](https://public-inbox.org/), which is under heavy developement by Eric Wong, has
[a git archive](https://public-inbox.org/git/) that is now used a lot instead of Gmane.
[It allows](https://public-inbox.org/design_www.html) looking up
existing Gmane links using their Gmane id with URLs like
`http://public-inbox.org/git/?q=gmane:123456`.
* Josh Triplett [announced](https://public-inbox.org/git/20160729064055.GB25331@x/) a new git tool, [git-series](https://github.com/git-series/git-series/), to manage patch series with git, tracking the "history of history". git series tracks changes to the patch series over time, including rebases and other non-fast-forwarding changes. git series also tracks a cover letter for the patch series, formats the series for email, and prepares pull requests. This makes it easier to collaborate on a patch series, distribution package, backport, or any other development process that includes rebasing or non-fast-forward development. Josh plans to give a [presentation about git-series at LinuxCon North America](http://sched.co/7JVs).
* GitSense looks like an interesting service to provide [Git Analytics and Search](https://gitsense.com/insight?c=bitbucket:gitsense/contexts:gs_contexts::default.ccf)
* [git-confirm](https://github.com/pimterry/git-confirm) is a nice little Git hook to catch placeholders and temporary changes
* [git-time-metric](https://github.com/git-time-metric/gtm): Simple, seamless, lightweight time tracking for Git
* Resolve git conflicts within Atom using the package [merge-conflicts](https://atom.io/packages/merge-conflicts)

## Credits

This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt; and
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt;, with help from Lars Schneider,
Johannes Schindelin, Roberto Tyley and Josh Triplett.
