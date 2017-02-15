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

___Git Merge 2017___

The [Git Merge 2017](http://git-merge.com) conference took place in Brussels on February 2nd (workshops) and 3rd (main conference day). Quite some of the attendees seamlessly joined the [FOSDEM](https://fosdem.org/2017/) think tank right after the Git Merge afterparty. For those interested in the "runtime side of life", the [Config Management Camp](http://cfgmgmtcamp.eu) in Ghent offered yet another 2 days to get exhausted.

Apparently, an increasing number of excellent bloggers attented the conference:

* [Git Merge 2017 recap](https://github.com/blog/2317-git-merge-2017-recap) on GitHub Blog

* [We’ll be at Git Merge 2017!](https://blog.bitbucket.org/2017/02/01/well-git-merge-2017/) on Bitbucket Blog

* [Report from Git Merge 2017](http://www.praqma.com/stories/work-on-git-merge-2017/) by Lars Kruse, _Praqma_

* [Git Merge 2017 – what you missed](https://blog.recast.ai/git-merge-2017/) on Recast.AI Blog

* [Review – Git Merge 2017](http://neoshops.de/2017/02/04/review-git-merge-2017/) - short impressions by Carmen Bremen, Magento freelancer

* [The Git Contributor Summit](https://www.edwardthomson.com/blog/git_contributor_summit.html) - Ed Thomson's impressions

___Git Core Contributor Summit___

While both Lars's and Ed's blogs listed above very nicely express
the great atmosphere at the summit, here are the unconference's agenda items:

* Erik van Zijst presented Atlassian's "clone bundles" approch, which had been
added to Mercurial some years ago, was later included in BitBucket.
    * Atlassian would like to add it to Git, but would like to discuss the approach first.
    * The main motivation for this feature are CPU and I/O usage on the server side.
    * The feature would be good for large collecations fo repos, e.g. the set for Android;
    the Google "repo" tool would be an alternative.
    * One Alternative would be the design of the  Git protocol version 2, with capabilities negotion first.
    * Peff suggested to keep the solution as simple as possible (as an example,
    a sliced history etc. would be nice to have, but things could get quite complicated).
    * At present, the Atlassian client is a script mimicing „git clone“, 
    while a proper solution would involve the Git client.
    * Peff expressed his willingness to help Atlassian on this subject.
    * The solution is experienced as more efficient, but no real statistics / conclusions
    for real world repos are available yet.

* Peff presented a "1 minute version" of the current status of the Software Freedom Conservancy;
financial details available on the mailing list.
    * The SFC acquired git-scm.com, maintained by Peff.
    * Most effort is spent on trademark/policy work.

* Christian Couder and Ævar Bjarmason presented "Big repos".
    * The topic is very related to the „references database“ item below, 
    and deals with improved rebase / staging (split index).
    * The main idea is to make the git client faster for some index related operations (that is, `git status`).
    * Some work on a daemon for file system notifications in the background (inotify) has been done by David Turner,
    and was planned to rework, but the present contributor is at present busy with other things.
    * On Windows, there is no inotify feature available (also applies to some Unix flavours).
    * Some discussion arose whether the Windows journal feature or Watchman was the appropriate road to follow.
    The participants with really large repos shared their experience.

* Stefan Beller presented the `git submodule` state.
    * Instead of `git submodules`, Android with its 1000 Git repos uses the `repo` tool;
    the Android repositories are somewhat unrelated, and most contributors just work in 1 or 2 repos.
    * Regarding submodules, actually the fetch is parallelized, checkout is being worked on, next are worktree and submodules.
    * Inside Git, there is no real module awareness for submodules yet,
    so each and every Git module needs to be made „submodule ready“.
    * At present, one Git process is spawned for each repo, which is quite slow on Windows.
    * The submodules design is considered not to be optimal yet; as an example, subsets are not possible.
    * Within Gerrit, project changes lead to superproject changes, which might collide, and end up in superproject merge conflict mess.
    * David Turner considered merge conflict helpers for submodules.
    * Johannes Schindelin remarked that offloading such issues to tools like Gerrit looks suboptimal.
    * The topic was concluded with a short disucssion on git bisect with submodules.

* Jacob Vosmaer presented the Gitlab soltuion for Gitaly, aka „Git RPC“.
    * Gitlab tries to get away from NFS, and would like to see a LRU disk cache,
    as the NFS cache not good enough for heavy use.
    * The question is how far only Gitlab is affected (vs. the general community).
    * Use case example are bad refs and storing diffs.
    * The work on the Git cache started, but is stalled at present; it will be MIT licensed (uses both Git and Mercurial code).

* Johannes Schindelin presented "Better tools for reviews and contributions".

    * The mailing list currently drops contributions via mailers which produce HTML or mixed code.
    It is too difficult for people to supply patches by mail; the “once tested and then should work" approach
    (“and then everybody failing is stupid”) is considered simply wrong.
    One of the rejected clients is Microsoft Outlook, the other is gmail,
    the main problem being the handling of white space.
    Perhaps some tool might help with transmitting code corrections with white space.
    In general, patches would be better attached to mails than just placed inline.

    * It is problematic to follow long threads (e.g. one thread stalling for 8 months),
    while the state of patches discussed is sometimes unclear.

    * The “what’s cooking” emails are just sent to the mailing list, but not to the people being mentioned in the email.
    At present, the “what’s cooking” email is mostly generated in an automated way from the ToDo branch using a very specialized Scala (?) framework.

    * Is there a way to get from the mail client directly into the mentioned source code?

    * The Git terminology is sometimes strange, the Git glossary is hard to find, and can be improved;
    using terms only the email community uses  does not improve readability for others outside the list “inhabitants”.

    * Johannes regularly submits other peoples’ patches, and would like to see better tool support for this use case.
    Peff asked whether we need different terms, or better concepts?
    Regarding patches, the maintainer decides when an where they are merged / implemented.
    The maintainer workflow may prevent us from just using Github PRs.
    Whether to merge or rebase is then finally a manual decision of the maintainer,
    independently of what the author intended.
    A longer discussion arose around this subject; Stefan Beller mentioned that a similar problem
    appeared in the Linux Kernel world (especially on the Intel side).
    Johannes emphazied his willingness to establish tools which help to improve the situation.
    It was mentioned that code/commit notes should point to mailing list where appropriate.

* Carlos Martín Nieto presented the state of the references database, to get them away from the file system.
    * A recurring problem seems to be that usable databases do not have a Java implementation (e.g. lmdb last tried);
    this would help GitHub but still have the potential  to split the Git coummunity.
    * According to Peff, Git currently reads the whole packref file into memory –
    mmap could help but would need a lot of refactoring.
    * An important question is whether it is a client or a Github hosting problem;
     some workflows could cause unhealthy numbers of refs on a client, too.
    * At present, not all race conditions fixed yet. The final solution should be portable to jgit / libgit2.
    * After the efforts of David Turner, there is now an appropriate ref API within Git.

* Brendan Forster presented the gitignore „spec“.
    * The goal is to be more standardized and robust (that is, understandable).
    * Docs should be more structured.
    * One problem is that different implementations of Git, and other tools use gitignore, but implement the stuff differently.
    * An interesting question would be if we could have a common minimal implementation of gitignore in a generally reusable library.
    * Git attributes has similar problems (reading attributes from files in the Index is a nightmare,
    in some case with read / change / read / change / read sequences (or the like) involved).

* Josh Triplett presented "Git commit refs, tag refs, and compatibility (future of git-series)".
    * Junio has suggested a different type of Git refs (in-tree, like hardlinks).
    * Compatibility: support old clients / libgit either on repo level,
    or unless an operation hits an object type unknown for the old version (the latter being more complicated).
    * Use cases should be implemented as easy as possible.
    * Would be great to disallow the capability per repo.

* Other topics: 

    * Planned Open Source Hackathons in London and New York in April/May
    The intent is to get some stuff in on that day, also recruitment of future contributors.
    Libgit2 should perhaps be included there.
    Appropriate contributors should be on board guiding the process.


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
