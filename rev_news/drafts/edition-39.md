---
title: Git Rev News Edition 39 (May 16th, 2018)
layout: default
date: 2018-05-16 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 39 (May 16th, 2018)

Welcome to the 39th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of April 2018.

## Discussions


### General

* [GSoC students and mentors in 2018](https://public-inbox.org/git/CAGZ79kbzFGn2-xcrWFi1+ZUgSGGHdUPEQOexu8Lan796LCsvBg@mail.gmail.com/)

  Stefan Beller announced to the mailing list that once again this year
  the Git project will participate in [Google Summer or Code](https://summerofcode.withgoogle.com/)!
  "We'll have [3 students](https://summerofcode.withgoogle.com/organizations/5376866043559936/#projects)
  and 3 mentors, which is more than in recent years."

  * Pratik Karki, who will work on [converting `git rebase` to C](https://summerofcode.withgoogle.com/projects/#4981391490547712)
    and will be mentored by Stefan Beller and Christian Couder, started blogging about his project:

    * [[GSoC] Info: new blog series of my work on Git GSoC '18](https://public-inbox.org/git/20180502033925.6744-1-predatoramigo@gmail.com/) - announcement on the mailing list
    * [(recur code) - posts with "git" category](https://prertik.github.io/categories/git/) - the blog in question 

  * Paul Ungureanu, who will work on [converting `git stash` to C](https://summerofcode.withgoogle.com/projects/#5431410714738688))
    and will be mentored by Johannes Schindelin, alias Dscho, is also starting a blog about it:

    * [[GSoC] A blog about 'git stash' project](https://public-inbox.org/git/7557a20a-a55e-e085-1aaa-3935000f643f@gmail.com) - announcement on the mailing list
    * [Paul's Blog - Google Summer of Code 2018](https://ungps.github.io/) - the blog in question

  * Alban Gruin, who will work on [converting interactive rebase to C](https://summerofcode.withgoogle.com/projects/#4906232314331136)
    and will be mentored by Stefan Beller and Christian Couder, is like the other students starting a blog about it:

    * [[GSoC] Yet another blog series about the GSoC](https://public-inbox.org/git/917621a4-b46a-95aa-dccc-905c0cd32b1d@gmail.com/) - announcement on the mailing list
    * [Mon coin sur l’Internet - posts with "GSoC 2018" category](https://blog.pa1ch.fr/category/gsoc-2018.html) - the blog in question, starting with [GSoC with git, week 1 : community bonding](https://blog.pa1ch.fr/posts/2018/05/05/en/gsoc2018-week-1.html)

<!---
### Reviews
-->


### Support

* [Optimizing writes to unchanged files during merges?](https://public-inbox.org/git/CA+55aFzLZ3UkG5svqZwSnhNk75=fXJRkvU1m_RHBG54NOoaZPA@mail.gmail.com/)

Linus Torvalds emailed the mailing list that after merging XFS code
into the Linux kernel he was surprised "pretty much *everything*" got
recompiled and the test build took 22 minutes instead of about a
minute.

When debugging this, Linus found that a core header file had been
changed by the patch series he had merged, but the changes were
already upstream and got merged away. Nevertheless the core header
file got written out with the same contents it had before the merge,
and as 'make' only looks at modification time, everything got rebuilt.

As he was still busy with the merge window, Linus hoped that someone
could look at making the merging logic optimize things and not even
write out the end result when a file doesn't change.

Junio Hamano soon posted a fix for this issue but it appeared to Linus
that it was not a complete fix, so Linus started debugging further by
himself and updated the mailing list by regularly posting what he had
found. He even started one of his emails with "[ Talking to myself ]"
and the next one with "[ Still talking to myself. Very soothing. ]"

Elijah Newren eventually replied to Linus that he already had a fix
for that in one of his patch series that had been merged into the
master branch, but unfortunately the fix caused some
["impressively awful fireworks"](https://public-inbox.org/git/xmqqefjm3w1h.fsf@gitster-ct.c.googlers.com/),
so the fix had been reverted from master.

Fortunately Elijah wrote that he had already reworked his fix and
added many test cases, so that he would be able to resend his patch
series containing a fully working fix in a few days.

Linus replied by sending an alternative patch relying on "stupid brute
force" to fix his issue. Stefan Beller reviewed the patch and Linus
replied back to Stefan discussing other improvements and different
approaches.

Elijah also replied to Linus' alternative patch by discussing
different approaches. And Junio agreed with the direction Elijah was
taking, though he had not as much time as he would have liked to think
this through at that time.

Junio discussed Linus' alternative patch anyway with Linus and then
Lars Schneider chimed in by suggesting to add a cache to speed up
builds. Ævar Arnfjörð Bjarmason then replied to Lars and they
discussed this idea but concluded that it wouldn't work.

Jacob Keller and Junio also discussed Lars' idea. They suggested
alternative ideas or tools to address the underlying problem. Junio
especially mentioned ccache which had been also suggested by Stefan
Haller.

Phillip Wood replied to Lars by sending a Perl script he has been
using to save and restore mtimes to avoid rebuilds.

Elijah resent [his patch series](https://public-inbox.org/git/20180419175823.7946-1-newren@gmail.com/)
a few days later, and though there were further fixes needed, it
appears that the patch series will be merged in the "next" branch
soon.

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

* Bitbucket Server [5.10](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-5-10-release-notes-948214779.html)
* GitLab [10.7.3](https://about.gitlab.com/2018/05/03/gitlab-10-7-3-released/),
[Security Release 10.7.2, 10.6.5, and 10.5.8](https://about.gitlab.com/2018/04/30/security-release-gitlab-10-dot-7-dot-2-released/),
[10.7.1](https://about.gitlab.com/2018/04/23/gitlab-10-7-1-released/), and
[10.7.0](https://about.gitlab.com/2018/04/22/gitlab-10-7-released/)
* GitHub Enterprise [2.13.2](https://enterprise.github.com/releases/2.13.2),
[2.12.10](https://enterprise.github.com/releases/2.12.10),
[2.11.16](https://enterprise.github.com/releases/2.11.16), and
[2.10.22](https://enterprise.github.com/releases/2.10.22)
* GitKraken [3.6.0](https://support.gitkraken.com/release-notes/current#v3-6-0)

## Other News

__Various__

* GitHub is [hiring a Linux Kernel Engineer](https://boards.greenhouse.io/github/jobs/1121642?gh_src=cadcuf3r1)
to work on supporting [GVFS](https://gvfs.io/) (an extension of Git to support Git at Enterprise Scale).

__Light reading__

* Edward Thomson (co-maintainer of libgit2) talks about
[the branching model of the team developing Visual Studio Team Services](https://blogs.msdn.microsoft.com/devops/2018/04/19/release-flow-how-we-do-branching-on-the-vsts-team/).

__Git tools and sites__

* [Mo Repos, Mo Problems? How We Make Changes Across Many Git Repositories](https://engineering.clever.com/2017/12/11/mo-repos-mo-problems-how-we-make-changes-across-many-git-repositories/) explains how Clever uses a
  [cli tool called microplane](https://github.com/Clever/microplane) they developed to make changes across many repos.

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Gabriel Alcaras &lt;<gabriel.alcaras@telecom-paristech.fr>&gt;
with help from Johannes Schindelin.
