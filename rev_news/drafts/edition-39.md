---
title: Git Rev News Edition 39 (XXX, 2018)
layout: default
date: 2018-05-16 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 39 (XXX, 2018)

Welcome to the 39th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of April 2018.

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


## Developer Spotlight: Johannes Schindelin (alias Dscho)

* Who are you and what do you do?

That is a broad question ;-)

Professionally, I got a diploma (not a measly MSc) in mathematics
(specialty: number theory), graduated as a geneticist, dabbled with
psychology as a post-doc, then got heavily involved in scientific image
processing and light sheet microscopy. Nowadays, I work proudly as
software developer at Microsoft.

From Git's perspective, I am the maintainer of
[Git for Windows](https://gitforwindows.org), the "friendly fork" of
Git whose purpose in life is to bring Git to the platform with the
largest market share among professional software developers. As
maintainer, my goals are 1) to improve the Git user experience,
primarily on Windows, 2) to make the contribution process more
inclusive and friendly, and 3) to collaborate as effectively with the
Git project as I can muster.

* What would you name your most important contribution to Git?

That is really hard to answer, because it depends on your perspective
which of my contributions you might consider the most important.

From the Git project's point of view, it is probably that I started
porting Git to Windows, and that I started packaging end-user facing
installers after
[Johannes Sixt](https://git.github.io/rev_news/2016/04/20/edition-14/#developer-spotlight-johannes-sixt)
finished the initial port. Windows *is* the OS most professional software
developers use, after all, and at the same time it is the OS least well
supported by Git.

From the perspective of power users, I guess the
[interactive rebase](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History#_changing_multiple)
is what most would deem my contribution with the highest impact.

Speaking for myself, I would deem my tenacity my most important
contribution, i.e. that I keep improving Git (both the software as well as
the project) and that I continue to care about the user experience, the
project and the code.

* What are you doing on the Git project these days, and why?

I am [working](https://github.com/git/git/pull/447) on teaching the
interactive rebase a mode where it recreates branch structure by rebasing
merge commits, too, rather than dropping them. Kind of a `git rebase -p`
Done Right.

Why? Because I need it to maintain Git for Windows (and
[GVFS Git](https://github.com/Microsoft/git/commits/gvfs) and Git for Windows'
[fork of the MSYS2/Cygwin runtime](https://github.com/git-for-windows/msys2-runtime/),
and of [BusyBox-w32](https://github.com/git-for-windows/busybox-w32/)).
Simply rebasing a linear branch of ~500 patches is simply not good
enough for a big project like Git for Windows.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

[Technical debt](https://xkcd.com/844/). We have several metric tons of
that. I get that a mostly volunteer-driven project such as Git has a lot
of technical debt: who wants to work on technical debt, really?

One blatant example of our technical debt is the absence of a consistent
API. We have something we call libgit.a, but even that is pretty
inconsistent, and organically grown, and it is specifically intended only
for use by Git's own commands (which is a shame, because it forces every
application using Git through the essentially ASCII-based command-line
stdin/stdout/stderr).

Another example is that so many central operations are still implemented
as Unix shell scripts (with the corresponding lack of performance, safe
error handling and portability). Some scripts are Perl scripts, which is
better from the performance and safe error handling perspective, but it
increases the number of languages you have to speak to contribute to Git,
and it still is not particularly portable.

We have a test suite where debugging a regression may mean that you *have*
to run 98 test cases before the failing one every single time in the
edit/compile/debug cycle, because the 99th test case may depend on a side
effect of at least one of the preceding test cases. Git's test suite is so
not [21st century best practices](https://www.slideshare.net/BuckHodges/lessons-learned-doing-devops-at-scale-at-microsoft).

We spawn many, many processes (e.g. `pack-refs`, `reflog`, `repack`,
`pack-objects`, `prune`, `worktree` and `rerere` in `git gc`, or
`remote-https`, `receive-pack`, `index-pack`, `unpack-objects` in
`git fetch`); It is sometimes really challenging to identify *which*
process is the culprit of segmentation faults, file locking issues, or
even "BUG:" messages. Sometimes even Unix shell scripts are involved,
so you may very well end up having to go old-school by adding debug
statements (because modern techniques such as single-stepping are not
an option).

A lot of error code paths end in calls to die(). That might have seemed
convenient to the developer who used that, but every piece of useful code
will sooner or later be reused, and then such a sloppy "let's just exit()
and not bother with releasing memory or closing file handles" mentality
really hurts. Of course, C's lack of a `finally` construct makes proper
error handling quite a bit bothersome.

We use Asciidoc for our documentation. Worse: even after the rest of the
world settled safely on Markdown for pretty much everything new, we
decided that it would be a splendid idea to convert some ASCII document to
Asciidoc. This hinders fruitful exchanges with all kinds of user
documentation, say, in GitHub wikis.

Git assumes that filesystems are case-sensitive. That is true for Linux.
It is incorrect for Windows and macOS. And then we use the filesystem as a
backend e.g. for loose refs.

The Git index file was designed as a flat file with variable-size items,
intended to be read sequentially. The index' purpose, however, is more
like a filesystem, where ideally random-access, concurrent reads and
writes should be possible, but the flat file nature prevents that. When
your idea of a large project looks like linux.git, that may seem a
reasonable design. Even going to the size of gcc.git puts a dent into that
impression, though. Most commercial software projects have larger
repositories. Sometimes by
[a large margin](https://blogs.msdn.microsoft.com/bharry/2017/05/24/the-largest-git-repo-on-the-planet/).

There is a lot of technical debt in Git.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

Submodules.

Their premise is that they can be treated essentially as if they were
files, which is a laughable notion after even a cursory consideration.
Files can be untracked, ignored, tracked (clean, modified, deleted).
Submodules can have combinations of those. Like, a submodule can be up to
date *and* have untracked files. Oh, and try to detect renames on
submodules (including the case where a submodule was modified). I'll be
waiting.

* What is your favorite Git-related tool/library, outside of Git
  itself?

[Git garden shears](https://github.com/git-for-windows/build-extra/blob/master/shears.sh)
(i.e. the Unix shell script that will hopefully be mostly replaced by
`git rebase --interactive --rebase-merges` before long). I am biased, of
course, as I wrote it myself. It is a major time saver for me, though.

I dibble-dabbled with many a Git-related tool from time to time, but at
the end of the day I often end up enhancing Git proper to my needs, or use
Git aliases or shell scripts (yes, I use shell scripts myself... Unix
shell scripting has its uses... although I find myself writing and using
[node.js](https://nodejs.org/) more and more, as it makes it a lot easier
to use object-oriented abstraction and exception-based error handling, not
to mention that it is waaaaaaaaay faster than shell script interpreters).
I do try to automate as much of my daily work as possible, and many
Git-related tools or libraries simply are not all that automatable.


## Releases


## Other News

__Various__

* GitHub is [hiring a Linux Kernel Engineer](https://boards.greenhouse.io/github/jobs/1121642?gh_src=cadcuf3r1) to work on supporting [GVFS](https://gvfs.io/) (an extension of Git to support Git at Enterprise Scale).

__Light reading__

* Joe Neeman posted [a series](https://jneem.github.io/merging/) of [blog posts](https://jneem.github.io/pijul/) about patch theory and [pijul](https://pijul.com/) (yet another animal in the Version Control System zoo). Read this if you are interested in merge algorithms.
* Edward Thomson (co-maintainer of libgit2) talks about [the branching model of the team developing Visual Studio Team Services](https://blogs.msdn.microsoft.com/devops/2018/04/19/release-flow-how-we-do-branching-on-the-vsts-team/).
* Pratik Karti, who is working on a Google Summer of Code project to convert `git-rebase.sh` into a builtin [started blogging about his project](https://prertik.github.io/categories/git).

__Git tools and sites__

* [Mo Repos, Mo Problems? How We Make Changes Across Many Git Repositories] explains how Clever uses a
  [cli tool called microplane](https://github.com/Clever/microplane) they developed to make changes across many repos.

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Gabriel Alcaras &lt;<gabriel.alcaras@telecom-paristech.fr>&gt;
with help from Johannes Schindelin.
