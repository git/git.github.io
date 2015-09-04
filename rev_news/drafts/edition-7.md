---
title: Git Rev News Edition 7 (September 9th, 2015)
layout: default
date: 2015-09-09 21:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 7 (September 9th, 2015)

Welcome to the 7th edition of [Git Rev News](http://git.github.io/rev_news/rev_news.html),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](http://git.github.io/rev_news/rev_news.html) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of August 2015.

## Discussions

<!---
### General
-->

### Google Summer of code Wrap Up

Both of the Git project Google Summer of Code students, Paul Tan and
Karthik Nayak have passed the final evaluation.

<!-- Would be useful for a Google blog post, but not here.
# Google Summer of Code Wrap up: Git

[Git](http://git-scm.com/) is a distributed version-control system. We
participated in Google Summer of Code (GSoC) for the 8th time in 2015.
-->

#### Projects in 2015

##### Unification of `git for-each-ref`, `git branch` and `git tag`

**Student:** [Karthik Nayak](http://karthiknayak.github.io/),
  mentored by Christian Couder and Matthieu Moy.

With Git, branches and tags are references to a state in history.
Internally, a branch is almost the same as a tag, and both are
particular cases of the concept of references, or "ref" for short.
Still, because the use-cases are different, we had two commands with
different user-interfaces, and different implementations, plus the
command `git for-each-ref` meant to be more flexible and easier to use
in scripts.

A lot of code was moved from the user-interface part of the code to
the core library of Git, and duplicated ref-listing and formatting
code was refactored.

A nice side effect for the user is that features that were available
on one command but not another are now available everywhere. For
example, we had `git for-each-ref --format` but no `git branch
--format`, and had `git branch --contains` but not `git for-each-ref
--contains`.

The biggest contribution is of course that we reduced the code
duplication and made the code internally better.

##### Port `git am` and `git pull` from shell-script to C

**Student:** [Paul Tan](https://github.com/pyokagan), mentored by
Stefan Beller and Johannes Schindelin.

Git was initially implemented as a set of C commands for the core, and
a set of shell-script to provide a user-friendly interface. While
implementing some commands in shell allowed a quick prototyping, the
presence of shell-scripts raises a lot of issues. One is performance:
shell-scripts tend to create a lot of processes, and often manipulate
a lot of temporary files. Another one is portability, especially on
Windows.

Many Git commands written as shell-scripts were later re-written as
builtin C commands. You can still see some of the initial scripts in the
[contrib/examples](https://github.com/git/git/tree/master/contrib/examples)
directory of Git's source tree.

The second project was to port `git am` and `git pull` in C. One
difficulty is that Git has strong requirements on
backward-compatibility.

Both commands have been completely ported, and the result merged to
the master branch.

#### Retrospective

Both projects were really successful (and obviously the students
"passed" in the GSoC jargon). One thing we're happy about is that for
one project, the code is already completely reviewed and merged, and
for the other the reviewing process is almost over (and the student
remains active after the pens down date). This means that the GSoC did
not just bring us initial implementations, but solid, and
well-reviewed patches. The Git codebase is better after the GSoC than
before from the maintainability point of view.

Interestingly, both projects were essentially internal refactoring ones
(the one I mentored last year was, too). Nothing really impressive for
the end-user, but in both cases a substantial contribution to Git's
maintainability.

I'm positively surprised that students chose these topics. They are not
the best subjects to show off with your friends ("see this new command
you love so much, *I* implemented it!"), but are necessary work to make
the codebase healthier.

Not all our past experiences were success. We had failed GSoC for very
promising students, or projects that we considered as "pass" from the
GSoC point of view, but producing code that were never merged or
merged far later after substantial work from the mentor. We actually
took a break from GSoC and did not participate in 2013 because we
thought we were not good enough at mentoring and integrating students
at that time.

This year, we had long private discussions during the selection period
of the GSoC: refactoring projects like these ones have relatively high
risk. The "Wow" effect when it works is not so high, but the "Uh oh"
effect if it breaks is.

Reading the students proposals and resume is rarely sufficient to
really evaluate their skills, which makes the risk particularly hard
to evaluate. Since 2014, we've been using
[microprojects](http://git.github.io/SoC-2015-Microprojects.html) to
select students. This turned out to be very efficient, both at
identifying good (or bad) applicants, but also at giving students a
glimpse of what "contributing to Git" means. Student get an idea of
how the community is organized before starting the project.

We're now happy we took the risk. We've gained a bunch of useful
changes to Git. We've had lively discussions with students and had fun
doing it. And hopefully, these student now feel part of the community
and the fun will continue long after the GSoC :-).

### Reviews

* [t5004: test ZIP archives with many entries](http://thread.gmane.org/gmane.comp.version-control.git/275682/focus=276393)

Johannes Schauer reported that git-archive does not use the zip64
extension and therefore is unable to properly create zip archives with
more than 16k entries.

René Scharfe agreed that there is a problem. It comes from the fact
that without the zip64 extension, the zip field for the number of
entries has only two bytes. The limit is then 65535 entries.

René then sent a patch series to add tests for this problem and then
fix it. The first patch contains the following code, which tests that
a suitable `zipinfo` command is available on the current machine, and
sets the ZIPINFO prerequesite if this is the case:

```
+ZIPINFO=zipinfo
+
+test_lazy_prereq ZIPINFO '
+	n=$("$ZIPINFO" "$TEST_DIRECTORY"/t5004/empty.zip | sed -n "2s/.* //p")
+	test "x$n" = "x0"
+'
```

Eric Sunshine replied that unfortunately the above would work neither
on MacOS X where the `zipinfo` output is different, nor on FreeBSD
where `zipinfo` has been removed in favor of `unzip -Z`.

Eric then discussed in details the possibility of using `unzip -Z`
instead of `zipinfo` to have a portable test, but it appears that this
doesn't work well on files using the zip64 extension on MacOS X and
FreeBSD .

After further discussing this, Eric, René and Junio agreed that it was
good enough that the patch and the above `zipinfo` check work on Linux
as we don't need to test the archive generated by `git archive` on
every platform.

<!---
### Support
-->

## Releases

* Git for Windows 2.5.0 [was released](http://article.gmane.org/gmane.comp.version-control.msysgit/21805). It is the first release based on Git 2.x, the first release based on [MSys2](https://msys.github.io/) and the first release dropping the *-preview* suffix.

## Other News

__Various__


__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt; and Nicola Paolucci &lt;<npaolucci@atlassian.com>&gt;,
with help from XXX.
