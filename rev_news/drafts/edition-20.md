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


### General

* [Regression: git no longer works with musl libc's regex impl](https://public-inbox.org/git/20161004150848.GA7949@brightrain.aerifal.cx/)

Rich Felker complained that compiling Git with [musl libc](https://www.musl-libc.org/)
no longer works out of the box (that is, without setting the `NO_REGEX`
build configuration variable) after commit [2f895225](https://github.com/git/git/commit/2f8952250a84313b74f96abb7b035874854cf202).
The proposed workaround unfortunately didn't work on Windows, as pointed
out by Jeff King and Johannes Schindelin.

There was a bit of derail about which are main Git platforms, and whether
Git code should be able to rely on POSIX features.  Jakub Narębski reminded
that [CodingGuidelines](https://github.com/git/git/blob/master/Documentation/CodingGuidelines#L4)
specifically state that:

> - Most importantly, we never say "It's in POSIX; we'll happily
>   ignore your needs should your system not conform to it."
>   We live in the real world.
>
> - However, we often say "Let's stay away from that construct,
>   it's not even in POSIX".
>
> - In spite of the above two rules, we sometimes say "Although
>   this is not in POSIX, it (is so convenient | makes the code
>   much more readable | has other good characteristics) and
>   practically all the platforms we care about support it, so
>   let's use it".

The commit in question, making Git require to use regexp engine with
`REG_STARTEND` support, while providing fallback implementation
(turned on with `NO_REGEX`), matches 3rd point in the list above.  This
extension to `regexec()`, introduced by the NetBSD project, is present
in all major regex implementation... though not in musl.

There was yet another proposed fix for the problem, namely adding
padding so that end of mmap-ed file doesn't fall on the page boundary,
if regex implementation doesn't support `REG_STARTEND`.  One one hand,
the workaround relied on undocumented (but sane) assumptions about
operating system behavior, on the other hand it was faster than the
workaround in original patch, that is copying contents to NUL-terminated
buffer.  Nevertheless, any workaround would mean additional code that
needs to be maintained, and it was not accepted.

Also, it turned out that `configure` script detects if regex engine
support `REG_STARTEND` and sets `NO_REGEX` if necessary, it was just
badly described.  It was [since corrected](https://github.com/git/git/commit/842a516cb02a53cf0291ff67ed6f8517966345c0).

Though Git doesn't yet set `NO_REGEX` automatically based on information
from `uname`.


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

* [Git 2.10.1](https://public-inbox.org/git/xmqqvax93w1c.fsf@gitster.mtv.corp.google.com/)
* [Git for Windows 2.10.1](https://github.com/git-for-windows/git/releases/tag/v2.10.1.windows.1)
* [libgit2 v0.24.2 Maintenance Release](https://github.com/libgit2/libgit2/releases/tag/v0.24.2)
* [libgit2/rugged v0.25.0b10](https://github.com/libgit2/rugged/releases/tag/v0.25.0b10)
* [GitLab 8.12](https://about.gitlab.com/2016/09/22/gitlab-8-12-released/) released and patched up to [8.12.7](https://about.gitlab.com/2016/10/17/gitlab-8-dot-12-dot-7-released/)


## Other News

__Various__

* Here is [git-test-repository: A Git repository full of special cases, for testing purposes](https://github.com/book/git-test-repository) - very handy when you're testing out a new Git GUI or repository manager.
* [A Visual Git Reference](http://marklodato.github.io/visual-git-guide/index-en.html) by Mark Lodato
* [Automate Git and Upgrade Your Battle Station With a Custom Peripheral](https://hackaday.com/2016/09/13/automate-git-and-upgrade-your-battle-station-with-a-custom-peripheral/) by Gerrit Coetzee
* [Command equivalents in Git, Mercurial, and Subversion](http://blog.deveo.com/list-of-equivalent-commands-in-git-mercurial-and-svn/) by Antti Kirmanen
* [GitHub Classroom as Textbook and Workbook](https://blog.skilstak.io/github-as-text-book-and-work-book-828ffada9542#.vy1vivkrq) by Rob Muhlestein
* [Gerrit Summit 2016 is coming](https://gitenterprise.me/2016/10/10/gerrit-summit-2016-is-coming/)

__Light reading__

* [What is a "large" Git repository?](http://larsxschneider.github.io/2016/09/21/large-git-repos) by Lars Schneider
* [Purposes, Concepts, Misfits, and a Redesign of Git](http://neverworkintheory.org/2016/09/30/rethinking-git.html) is a research paper, here discussed by Greg Wilson. It lead to a [discussion on the Git mailing list](https://public-inbox.org/git/ce42f934-4a94-fa29-cff0-5ebb0f004eb5@gmail.com/T/#e95875b7940512b432ab2e29b3dd50ca448df9720).
* [Gitless](http://gitless.com/) is the experimental reworking of Git based on the research in the previous link
* [Poking around /usr/lib/git-core](http://kamalmarhubi.com/blog/2016/10/07/git-core/) by Kamal Marhubi
* [Lesser known Git commands](https://hackernoon.com/lesser-known-git-commands-151a1918a60#.jwubgvjwe) by Tim Pettersen


__Git tools and sites__

* [gittup.org](http://gittup.org/gittup/) is a Linux distribution based on Git and Tup
* [git-stacktrace: Easily figure out which git commit caused a given stacktrace](https://github.com/pinterest/git-stacktrace)
* [Legit (Git Workflow for Humans)](http://www.git-legit.org/)
* [Tower for Windows - Public Beta has Started](https://www.git-tower.com/blog/tower-for-windows-public-beta/)
* [Git-Repo The ultimate utility for managing services](http://i.got.nothing.to/code/on/git-repo:_the_utility_for_services/)
* [patchwork](http://jk.ozlabs.org/projects/patchwork/) - a web-based patch tracking system designed to facilitate the contribution and management of contributions to an open-source project.
* [ripgrep](http://blog.burntsushi.net/ripgrep/) is arguably the fastest grep-replacement out there, and it respects your .gitignore files.
* [GitPitch](https://about.gitlab.com/2016/10/03/gitpitch-slideshow-presentations-for-developers-on-gitlab/) from GitLab lets you create slideshow presentations in Markdown and host them in a Git repository.

## Credits

This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt; and
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt;, with help from Jakub Narębski, Johannes Schindelin
and Lars Schneider.
