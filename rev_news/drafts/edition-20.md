---
title: Git Rev News Edition 20 (October 19th, 2016)
layout: default
date: 2016-10-19 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 20 (October 19th, 2016)

Welcome to the 20th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of September 2016.

## Discussions

<!---
### General
-->


### Reviews

* [Prepare the sequencer for the upcoming rebase -i patches](http://public-inbox.org/git/cover.1472457609.git.johannes.schindelin@gmx.de/)

Johannes Schindelin, alias Dscho, is the maintainer of Git for
Windows. He is working for Microsoft and, on top of his maintainer
role, he has been working whenever time allowed since February this
year to speed up interactive rebase (`git rebase -i`).

Since when it was created in 2005, the `git rebase` command has been
implemented using shell scripts that are calling other git commands.

The interactive rebase that Dscho implemented in 2007 calls different
commands than the regular, non interactive, rebase. The regular rebase
uses `git format-patch` to create a patch series from some commits,
and then `git am` to apply this patch series on top of a different
commit, while the interactive rebase calls `git cherry-pick`
repeatedly for the same purpose.

Neither of these approaches has been very efficient though, and the
main reason behind that is that repeatedly calling a git command has a
significant overhead. Even the regular `git rebase` would do that as
`git am` had been implemented by launching `git apply` on each of the
patches.

The overhead is especially big on Windows were creating a new process
is quite slow, but even on other OSes it requires setting up
everything from scratch, then reading the index from disk, and then,
after performing some changes, writing the index back to the disk.

In case of the regular rebase,
[a patch series has been merged recently](https://github.com/git/git/commit/81358dc238372793b1590efa149cc1581d1fbd98)
to the 'master' branch that makes `git am` call `git apply`'s internal
functions without spawning the latter as a separate process. So the
regular rebase will be significantly faster especially on Windows and
for big repositories in the next Git feature release.

Dscho's work achieves the same kind of results for the interactive
rebase. The work, which has been distilled to the mailing list has a
series of patch series, greatly improves and then uses a mechanism
called the sequencer.

The sequencer had been from it's beginning
[in 2008 as a GSoC (Google Summer of Code) project](https://git.wiki.kernel.org/index.php/SoC2008Ideas#Implement_git-sequencer)
envisioned as a low-level patch-application engine written in C that
would "take the 'todo' file format used by git-rebase -i and extend it
to also support applying patches split out of mbox files", so that
"frontends like git-am, git-rebase, etc. can then setup the 'todo'
script and pass it to git-sequencer, which does the actual patch
application, editing, etc."

Of course it was a too much ambitious project for a GSoC project, so
the work that Stephan Beyer, the GSoC student at that time, did to
implement it was not merged. A lot of great related work by Stephan
had been merged though, and the sequencer idea as well as Stephan's
code were still considered valuable, so that in 2011
[another GSoC project was attempted](https://git.wiki.kernel.org/index.php/SoC2011Ideas#git_cherry-pick_--continue.2F--abort.2F--skip_and_git_sequencer)
to further the idea and Stephan's code. This time the goal was to
first use the sequencer to improve cherry-picking, and reverting, many
commits, and Ramkumar Ramachandra, alias Ram, succeeded. The sequencer
code got merged and it was now possible to "continue", "abort" or
"skip" when cherry-picking or reverting many commits.

Despite this success, Dscho has had to improve a lot of things to make
it possible to reuse the sequencer in the interactive rebase. For
example he had to create a git-rebase--helper in C that ported a lot
of the functionality from the git-rebase--interactive.sh shell
script.

As Dscho explains [in an answer to a question by Jakub Narębski](http://public-inbox.org/git/alpine.DEB.2.20.1609021432070.129229@virtualbox/),
who asked about the status of the patch series, 10 of his patch series
had already been accepted, 5 were in flight and 1 had not yet been
submitted at the beginning of September.

These patch series, will speed up the interactive rebase, but are not
enough to fully replace the rebase implementation in shell by one in
C. According to Dscho such a result is "*far, far, far* in the future":

> ...my hope is that the rebase--helper work is only an initial step,
> opening the door for other contributors to tackle independent parts
> of making git-rebase a builtin

Though the patch series have been reviewed by a large number of
experienced Git developers like Junio Hamano, Johannes Sixt, Torsten
Bögershausen, Jeff King, Jakub Narębski, Dennis Kaarsemaker, Eric
Sunshine, Kevin Daudt and Stefan Beller, they are not fully merged
into Git yet. But Dscho already "integrated the whole shebang into Git
for Windows 2.10.0 and 2.10.1" that were released recently, and "it
has been running without complaints (and some quite positive
feedback)".

About the performance improvements, Dscho wrote:

> The end game of this patch series is a git-rebase--helper that makes
> rebase -i 5x faster on Windows (according to t/perf/p3404). Travis says
> that even MacOS X and Linux benefit (4x and 3x, respectively).

Such performance improvements as well as the code consolidations
around the sequencer are of course very nice. It is interesting and
satisfying to see that they are the result of building on top of
previous work over the years by GSoC students, mentors and reviewers.


### Support

* [Why are there multiple ways to get the manual in Git?](https://public-inbox.org/git/CAM_5GX48gDAZSvAWnxO5n8uhYf8vmfAJ88_31_ewsQxyPfF7iA@mail.gmail.com/)

Andrew Johnson asked on the mailing list:

> While reading Pro Git 2nd Ed. I came across these three methods:
>
> $ git help &lt;verb&gt;<br>
> $ git &lt;verb&gt; &dash;&dash;help<br>
> $ man git&dash;&lt;verb&gt;<br>
>
> I tested all three to confirm they were equivalent.
>
> What was the motivation behind the complication, if any? I presume
> most developers would not provide multiple commands that do the same
> thing for absolutely no reason, so I led myself to ask this question.

Fredrik Gustafsson was the first to answer. He first said that the
three commands are not actually equivalent on Windows as:

> $ man git&dash;&lt;verb&gt;
>
> does not work and
>
> $ git help &lt;verb&gt;
>
> opens a webbrowser instead of a man page.

Philip Oakley then answered that the three different methods were
added at different times for different reasons. The man methods was
first added because "historically git was a set of shell scripts named
git-*, so each stood alone".

The &dash;&dash;help was the result from "the modern `git <cmd>` approach, with
every command normally having &dash;h and &dash;&dash;help options for short form
usage and long form man pages". Meanwhile "a `git help <cmd>` command
was created" which "allowed selection of display type, so that on
Unix/Linux man was the norm, while an &dash;&dash;html (or &dash;&dash;web) option is
available for those who like the pretty browser view".

Your own Christian Couder chimed in saying that `git help` makes it
possible to teach people one command that will do something sensible
on every system, and that it also "provides more configurability and
more features like its &dash;a and &dash;g options".

Jakub Narębski added that there are also help pages that are about
"concepts (gitcli, gitrevisions, githooks, gitrepository-layout,
gitglossary), or about files (gitignore, gitattributes, to some extent
githooks)" and they are "only accessible with `git help <concept>` or,
on OS with installed 'man', also `man <gitconcept>`".

Philip replied to the above saying that "`git revisions --help` does
work", but Junio Hamano clarified things by saying that this was a bug
that had been recently fixed.

It would indeed seem wrong to have `git <concept> --help` working, as
concepts are not the same things as commands.

Anyway this shows that it is not so simple to design a good help
system, especially one that is both full featured on different
platforms and looking simple to users.


## Releases


## Other News

__Various__


__Light reading__
* [What is a "large" Git repository?](http://larsxschneider.github.io/2016/09/21/large-git-repos) by Lars Schneider


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt; and
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt;, with help from XXX.
