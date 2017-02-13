---
title: Git Rev News Edition 24 (XXX, 2017)
layout: default
date: 2017-02-15 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 24 (XXX, 2017)

Welcome to the 24th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of January 2017 and
the Git Merge conference that happenend on February 2nd and 3rd 2017.

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

## Developer Spotlight: Michael J Gruber

* Who are you and what do you do?

I am a mathematical physicist - I do research on mathematical problems
in quantum physics, and I teach mathematics as a lecturer. Sharing and
free exchange of knowledge are fundamental for that. Consequently, being
involved in open source software projects feels like just another side
of the same medal.

* How did your introduction to Git come about?

For a larger project with multiple moving parts (habilitation thesis) I
had used Subversion (that thesis started before git). It made two things
clear: I could not have done this without a version control system; and
I needed something else (a vcs with actual merges, to say the least).

Git had some geek appeal, but I couldn't get it to compile on my first
attempts (`configure && make...`, on a system with libs without headers,
no root). So I went with Mercurial since I was getting into Python
anyway. Only to be confused by hg's mantra "to clone is to branch and to
branch is to clone" when there were two commands "clone" and "branch"
which did something completely different and - in the case of the latter -
not very useful, it appeared to me. (hg has the more useful
"bookmarks" these days.)

In the end, it was the branch concept and the tone on the respective
mailing lists at that time that drove me to Git. I had learned not to
use "configure" for Git by now, and have been compiling it happily ever
after.

* What would you name your most important contribution to Git?

There is no single big topic. Mostly, I try to make Git easier and less
surprising to use by doing stuff here and there. The rev-list options
"--min-parent", "--max-parent" and "--cherry-mark" were fun to do. I
also consider "--textconv" a killer feature and was very successful in
getting Peff to do most things in that area that I wanted to have, and
did a few things "myself" - which is really the wrong term, given how
collaborative our development on git.git is.

Strangely, I was involved in several gpg-related things. I do not use
signed tags nor signed commits myself, but I care about gpg and about
git making the right calls when it comes to notions like "trust" etc.

* What are you doing on the Git project these days, and why?

What: almost nothing; why: work

During term breaks, I try to follow up an lingering topics and to
participate more actively in the Git mailing list.

* If you could get a team of expert developers to work full time on
something in Git for a full year, what would it be?

  - refs namespace: have tags, notes, replace etc. under
    `remotes/<remote>` with proper merging so that those features learn
    to fly; requires a transition plan

  - rework the UI and make it less surprising: e.g. unify short option
    names, introduce pseudorefs for the index and worktree and the
    like; requires a transition plan

* If you could remove something from Git without worrying about
backwards compatibility, what would it be?

I would do the above without the need for a transition plan :)

* What is your favorite Git-related tool/library, outside of Git itself?

Anything that makes textconv fly (unoconv, pdftotext); tig when
`log --graph` is ambiguous; I should use tig more ;)

## Releases


## Other News

__Events__
* [Git Merge 2017 recap](https://github.com/blog/2317-git-merge-2017-recap) on GitHub Blog
* [We’ll be at Git Merge 2017!](https://blog.bitbucket.org/2017/02/01/well-git-merge-2017/) on Bitbucket Blog
* [Report from Git Merge 2017](http://www.praqma.com/stories/work-on-git-merge-2017/) by Lars Kruse, _Praqma_
* [Git Merge 2017 – what you missed](https://blog.recast.ai/git-merge-2017/) on Recast.AI Blog
* [Review – Git Merge 2017](http://neoshops.de/2017/02/04/review-git-merge-2017/) - short impressions by Carmen Bremen, Magento freelancer

__Various__


__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt; and
Markus Jansen &lt;<mja@jansen-preisler.de>&gt;
with help from Michael J Gruber.
