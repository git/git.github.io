---
title: Git Rev News Edition 9 (November 11th, 2015)
layout: default
date: 2015-11-09 21:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 9 (November 11th, 2015)

Welcome to the 9th edition of [Git Rev News](http://git.github.io/rev_news/rev_news.html),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](http://git.github.io/rev_news/rev_news.html) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of October 2015.

## Discussions

<!---
### General
-->

### Reviews

* [Expose the submodule parallelism to the user](http://thread.gmane.org/gmane.comp.version-control.git/280284)

Stefan Beller started posting patch series to "finish the on going
efforts of parallelizing submodule network traffic".

This followed
[previous work by Stefan](http://thread.gmane.org/gmane.comp.version-control.git/277705/)
to make it possible to launch many git submodule fetches in parallel.

What is interesting is that a few weeks before posting the first
version of his patch series, Stefan had been involved in a
[discussion](http://thread.gmane.org/gmane.comp.version-control.git/279712/)
that was started by Kannan Goundan who asked if it would be possible
to "Make 'git checkout' automatically update submodules?".

In this previous discussion Stefan pointed Kannan to the following wiki:

https://github.com/jlehmann/git-submod-enhancements/wiki

that contains a lot of information about submodule implementation
including pointers to some current developments that have not been
posted to the mailing list yet. This wiki had indeed been maintained
since September 2010 by Jens Lehmann and Heiko Voigt who have been
working for a long time on git submodule.

When Stefan posted his patch series, it attracted the attention of
many reviewers like Eric Sunshine, Ramsay Jones, Jonathan Nieder and
Junio Hamano. As usual the reviewers made sensible suggestions and
Stefan soon posted another version of his patch series.

Hopefully the tremendous work by Stefan and the reviewers will soon
make it possible to have improved submodule performance.

### Support

* [broken racy detection and performance issues with nanosecond file times](http://thread.gmane.org/gmane.comp.version-control.git/278683)

At the end of last September, Karsten Blees sent an email starting
with the following:

> I think I found a few nasty problems with racy detection, as well as
> performance issues when using git implementations with different file
> time resolutions on the same repository (e.g. git compiled with and
> without USE_NSEC, libgit2 compiled with and without USE_NSEC, JGit
> executed in different Java implementations...).

He then listed and detailed some interesting "Notable file time facts"
about how file time is implemented in Linux, Windows, Java and the
different Git implementations (git, libgit2 and JGit).

After that Karsten described 4 problems he found that are related to
the above facts. The problems are:

- Problem 1: Failure to detect racy files (without USE_NSEC)
- Problem 2: Failure to detect racy files (mixed USE_NSEC)
- Problem 3: Failure to detect racy files with core.checkStat=minima
- Problem 4: Performance issues with mixed file time resolutions

And then Karsten suggests 4 possible solutions with sometimes some
variants like 1a. and 1b. that could address the problems. This was
all very detailed and well written.

Moreover Karsten followed up a few days later with one RFC patch
called "read-cache: fix file time comparisons with different
precisions" to take care of some of the problem he described.

Junio Hamano, the Git maintainer and Johannes Schindelin looked
respectively at the solutions and at the RFC patch proposed by
Karsten. They found it sensible.

Unfortunately it looks like that Karsten's patch has not been merged
yet. Maybe because it has not been submited as a non RFC patch yet.

Hopefully at one point some progress will be made in this area, and
anyway Karsten's detailed emails can serve as a reference for futur
work.

## Developer Spotlight: Matthieu Moy

Q: Who are you, and what do you do?

A: I'm an occasional contributor to Git, and I maintain several Git-related
tools like
[git-multimail](https://github.com/git-multimail/git-multimail),
[git-latexdiff](https://gitlab.com/git-latexdiff/git-latexdiff) and
to some extent [Git-Mediawiki](https://github.com/moy/Git-Mediawiki/wiki). I also teach
Git (to student at [Ensimag](http://ensimag.grenoble-inp.fr/) and
[lifelong learning](http://formation-continue.grenoble-inp.fr/)). In
2014 and 2015, I mentored
[GSoC](https://developers.google.com/open-source/gsoc/) projects for the
Git organization, and I've been co-administrator for Git in 2015.

Q: How did you start getting involved with Git?

A: My first non-trivial contribution to free software was on
version-control, before Git existed. I got involved in GNU Arch, then
its fork Bazaar 1.x. And then GNU Arch and Bazaar 1.x died, and I
moved on to something else. At the same time, I started teaching
version-control, hated centralized systems enough to migrate to Git.
Teaching Git in 2009 was a funny experience: the tool was starting to
get a decent user-interface, but was lacking a lot of polishing. One
of my favorite examples is what happens when you push to a remote that
has commits that you don't have locally. Initially, users were getting
a message like:

    ! [rejected]        master -> master (non-fast-forward)

I wrote a rather straightforward patch to change it to:

    ! [rejected]        master -> master (non-fast-forward)
    To prevent you from losing history, non-fast-forward updates were rejected.
    Merge the remote changes before pushing again.
    See 'non-fast forward' section of 'git push --help' for details.

The students went from "Huh?" to "Wow, a 3-lines long message, that's
long. What shall I do now (given that reading the actual doc is not an
option)?". Then, I added an explicit mention of "git pull" in the
message, and the situation became manageable for most students. Many
of my contributions to Git follow this principle: see what users have
difficulties with, and try to improve the tool to help them. In many
cases, a staightforward patch to improve the error message was
sufficient: in case of error, explain what's going on to the user, and
give the way out ("did you mean: ...?" or "use ... to ...").

Q: What would you name your most important contribution to Git?

A: In general, most of my contributions are to be found in the
user-interface and in the documentation. To define which is the most
important, we'd have to define "important" first.

In terms of impact on Git's usability, my biggest contribution is
probably my involvement in the change of the default value of
`push.default` from `matching` to `simple` (i.e. roughly "push only
the current branch by default"). I was not alone in the discussion,
and this was really more a teamwork than a personal contribution, but
I think I played an important role in the discussion to understand
what the default new behavior should be, defining the migration path
(this was a backward incompatible change, which Git avoids as much as
possible, and we had to find a way to do this without hurting users).

In terms of amount of work, my biggest contribution is certainly to
supervise students. Both as a teacher, as I offer my students a
"contribute to free software" project every year, and as a GSoC mentor.
The most visible change done by my students is probably the advice in
the output of `git status` (like "You are currently bisecting", ...).

Q: What are you doing on the Git project these days, and why?

A: These days, I'm taking a break after having spent a lot of time
contributing to Git and git-multimail. I'm continuing my Git activities
by following the mailing-list, occasionally helping users and reviewing
code when I get time, but I'm limited by this old good "days have only
24h" issue ;-).

I hope to get more time to work on git-multimail. Since I became the
maintainer after discussing with Michael Haggerty at [Git
Merge](http://git-merge.com/), I'm happy I managed to merge or close all
the pending pull-requests, set up a better test-suite, port to Python 3,
... The
[todo-list](https://github.com/git-multimail/git-multimail/issues) is
still long, and there are a lot more funny things to write!

Q: If you could get a team of expert developers to work full time on
something in Git for a full year, what would it be?

A: For my personal use of Git, the tool is already good enough. Still, I
could use the help of a team of expert to help Git. I would probably ask
them to work in priority on scalability (yes, we went from "Git is crazy
fast" when Linus wrote the initial version 10 years ago to "What makes
Git so slow?" given the size of projects people use it on), and on
gathering some Git forks and related tools in the same codebase.
Currently, `git.git` and `libgit2` are two separate projects, and I
think they would benefit from more code sharing. There are forks of Git
in several companies, and tools like
[repo](https://code.google.com/p/git-repo/) which were designed partly
to compensate some weaknesses of Git, but having these features directly
in Git would be better both for the community and for users IMHO.

Q: If you could remove something from Git without worrying about
backwards compatibility, what would it be?

A: I'm geek enough to like tools that have too many features ;-). But I'd
remove any instance of "cache" or "cached" referring to the Git index in
the user-interface and documentation. "index" is not such a good term in
my opinion, but it's already much better than "cache" (which suggests
that it's a performance improvement that doesn't change the
functionality, while it's not).

Q: What is your favourite Git-related tool/library, outside of Git itself?

A: That would be [Magit](https://github.com/magit/magit). I've stayed away
from Emacs Git interface for a while because I wanted to force myself to
use the command-line for two reasons: as a Git contributor, to see the
drawbacks of the cli and get a chance to improve it, and as a teacher,
to put myself in the same position as my students. Still, I like Emacs,
and I like using a VCS from within Emacs (once upon a time, I was even
the maintainer of an [Emacs interface for GNU
Arch](https://gna.org/projects/xtla-el/), memories, sweet memories...).
I recently started to use Magit, and I really like it. It doesn't
try to hide Git from me, but gives me a lot of shortcuts and interactive
features on top of it.

## Releases


## Other News

__Various__


__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt; and Nicola Paolucci &lt;<npaolucci@atlassian.com>&gt;,
with help from XXX.
