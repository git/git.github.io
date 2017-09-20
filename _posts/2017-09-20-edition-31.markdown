---
title: Git Rev News Edition 31 (September 20th, 2017)
layout: default
date: 2017-09-20 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 31 (September 20th, 2017)

Welcome to the 31st edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of August 2017.

## Discussions

### General

* [clang-format: outline the git project's coding style](https://public-inbox.org/git/20170808012554.186051-1-bmwill@google.com/)

Brandon Williams posted an RFC patch to add a '.clang-format' file
which "can be used with `clang-format` to auto-format .c and .h files
to conform with Git's style".

Brandon recalled the git-merge conference when he "mentioned how it
would be nice to not have to worry about style when reviewing patches
as that is something mechanical and best left to a machine (for the
most part)", and also pointed [an email from a few years ago](https://public-inbox.org/git/20150121220903.GA10267@peff.net/)
from Jeff King, alias Peff to add a new `git clang-format-diff`
command to properly format patches.

He warned that, as "our code base isn't consistent", it is not
possible "to come up with a config which matches" it, but said that he
wanted to "see how people feel" about this topic.

Johannes Schindelin, alias Dscho, first reacted with:

> Amen.
>
> If I never have to see a review mentioning an unwrapped line, I am quite
> certain I will be quite content.

Stefan Beller replied to Dscho proposing a "thought experiment" to
"take it one step further":

> If the code was formatted perfectly in one style such that a formatter for
> this style would not produce changes when rerun again on the code, then
> each individual could have a clean/smudge filter to work in their preferred
> style, and only the exchange and storage of code is in a mutual agreed
> style. If the mutually agreed style is close to what I prefer, I don't have to
> use clean/smudge filters.

He also suggested improving the documentation to "hint at how to use
this formatting to just affect the patch that is currently worked on
or rather a pre-commit hook".

Brandon later agreed to improve the documentation once his patch
would not be an RFC anymore.

Junio Hamano, the Git maintainer, thanked Brandon for compiling a
sensible set of rules, though he stressed that developers should have
"a shared notion of how these rules are to be used" to avoid
"unpleasant consequences" like:

- "unwanted code churn on existing codebase, only for the sake of
 satisfying the formatting rules"
- "far more style-only critique to patches posted on the list" by
  readers "running the tool to nitpick other people's patches"
- when "human aesthetics judgement" is necessary to overrule
  mechanical rules

Junio also commented the content of the patch especially the
"ColumnLimit: 80" settings to limit code lines to 80 columns where he
repeated that it is "important to give a guideline on what to do when
lines in your code exceed this limit".

Brandon replied to Junio that the unwanted code churn "is an issue
when you have an inconsistent code base such as ours" and that he
"would hope that use of such a tool would eventually completely
eliminate style-only critiques".

He also "would expect some of the penalties would need to be tweaked
over time before we rely too heavily on" the tool to avoid too many
cases where it conflicts with human aesthetics judgement.

Junio and Brandon then further discussed some settings in the content
of the patch. This led Junio to talk about the `checkpatch.pl` script
from the Linux kernel project which he uses to automatically find
problems in patches.

Then Jeff King chimed saying that he stopped pursuing adding a new
`git clang-format-diff` command because he "couldn't find a way to
have it make suggestions for new code without nagging about existing
code". He was also "worried that there would always be suggestions
from the tool that we don't agree with (i.e., where the guiding
principle is "do what is readable")".

Jeff also mentioned `go fmt`, which is used by the Go language
community, stating that "it seems to at least work for them".

Ævar Arnfjörð Bjarmason, Ben Peart, Ramsay Jones, Brian Carlson and
Jonathan Nieder also chimed in at some points to discuss the tools and
how they should be used.

In the end it looks like most of the Git developers are either neutral
or are happy with moving this topic forward, and an updated version of
Brandon's patch has been merged in the "pu" (proposed updates) branch.

### Reviews

* [pkt-line: re-'static'-ify buffer in packet_write_fmt_1()](https://public-inbox.org/git/20170827073732.546-1-martin.agren@gmail.com/)

Martin Ågren sent a patch saying that a previous patch from October
2016 had silently dropped static-ness of a buffer, so that we allocate
and leak a buffer each time we call `packet_write_fmt_gently()`.

Jeff King, alias Peff, replied:

> Ouch. So this means that git since v2.11 is basically leaking every
> non-byte pack sent by upload-pack (so all of the ref advertisement and
> want/have negotiation).

Peff then agreed that Martin's patch "is a good fix for now as it
takes as back to the pre-bug state".

Lars Schneider also agreed with Martin's fix and asked him how he
found the leak.

Martin replied "Valgrind found it for me", and later explained that he
had patched the Valgrind script that can be used in the test suite to
run tests under Valgrind, so that Valgrind is launched with the added
`--leak-check=yes` option. Then he had slowly run the tests one after
another under Valgrind adding items in a suppression list until he
found the leak.

Peff then took a look at finding and fixing some leaks, too. He
especially posted [a patch to use a static lock_file in the config](https://public-inbox.org/git/20170829185850.tfmjoa5u5sfuwpgi@sigill.intra.peff.net/)
which started another thread about the limitations of the tempfile code.

Stefan Beller and Junio Hamano also took part in the discussion. In
the end it looks like the discussion at least started some effort to
make it easier to check for and to fix memory leaks.

<!---
### Support
-->

## Developer Spotlight: Ben Peart

* Who are you and what do you do?

I started programming professionally while completing my degree in Computer Science back in 1988.  I joined a startup for 6 years out of college and then joined Microsoft where I've been for the past 21 years.  All my professional programming has been in C/C++.  I've been an engineer, a lead, dev manager, PUM, GM and Architect.  About 10 years ago I went back to my first love of writing great software as an engineer/architect.

I've had the opportunity to work on many interesting projects before git.  I spent a number of years working on Windows.  I was Architect for the Xbox One system OS for a few years and many other projects in between.  For the past 20 months or so I have been working on the Git Virtual File System (GVFS) which enables git to scale to the size of repos we have in our Windows and Office teams as well as many of our enterprise customers.

* What would you name your most important contribution to Git?

Probably delivering GVFS successfully and proving that git can be made to scale to huge repos.  Others had attempted this and given up so I'm pretty proud of this achievement.

* What are you doing on the Git project these days, and why?

For pragmatic reasons, we delivered GVFS via a separate process, file system filter driver and a fork of the git code (all open sourced but still a fork).  Our goal has been and continues to be that we take the core capabilities currently delivered via GVFS and make them integral features of git itself.  Ultimately, we'd like to get all of the scale enabling features into core git and no longer need a private fork.  I'm working on delivering that goal now.

* If you could get a team of expert developers to work full time on something in Git for a full year, what would it be?

Scale, scale, scale!  Too many git operations are either O(size of repo) or O(size of working directory).  That simply doesn't scale as things grow.  We need to push more and more for git to scale to O(size of what I care about).  For many operations that means O(# of modified files). 

* If you could remove something from Git without worrying about backwards compatibility, what would it be?

I'd replace the current index data structure with something more scalable.  Something sparse, hierarchical.  Something that can be incrementally read/written.  I'd probably split the "cache" features from the "staging" features as well.

* What is your favorite Git-related tool/library, outside of Git itself?

I'm a hard core command line interface guy so don't use much Git related beyond Git itself.  That said, I use Visual Studio as my editor/debugger, PerfView as my profiler, and Beyond Compare as my visual diff tool.  I also love using Visual Studio Online to review/approve pull requests.  


## Releases

* [nodegit v0.20.2](https://github.com/nodegit/nodegit/releases/tag/v0.20.2)
* [Git LFS 2.3.0](https://github.com/blog/2432-git-lfs-2-3-0-released)
* [GitHub Enterprise 2.11](https://github.com/blog/2429-introducing-github-enterprise-2-11)
* [GitLab 9.5](https://about.gitlab.com/2017/08/22/gitlab-9-5-released/) and patches [9.5.4, 9.4.6, and 9.3.11](https://about.gitlab.com/2017/09/07/gitlab-9-dot-5-dot-4-security-release/)

## Other News

__Various__

* [Gerrit User Summit 2017, 2-3 Oct, London](https://gitenterprise.me/2017/09/07/gerrit-user-summit-2017-2-3-oct-london/)
* [Why you should stop using Git rebase](https://medium.com/@fredrikmorken/why-you-should-stop-using-git-rebase-5552bee4fed1), by Fredrik V. Mørken
* [You're using git wrong](https://dpc.pw/blog/2017/08/youre-using-git-wrong/), by Dawid Ciężarkiewicz

__Light reading__

* [Tweak your Terminal for Git](https://dev.to/gonedark/tweak-your-terminal-for-git), by Jason McCreary
* [Developer accidentally deletes 3 months of work with Visual Studio Code](https://news.ycombinator.com/item?id=15044264), interesting discussion from HackerNews
* [How to recover dropped data from stash](https://opensource.com/article/17/8/recover-dropped-data-stash), by Jose Guilherme Vanz
* [Mentoring: Your path to immortality.](https://opensource.com/article/17/8/mentoring-your-path-immortality) Secure your open source project's survival with these four tips for encouraging strong, active contributors.

__Git tools and sites__

* [Magit](https://magit.vc), currently at [version 2.11](https://emacsair.me/2017/09/13/magit-2.11/),
  is a Git user interface that is implemented as an Emacs package. It
  is very popular among Emacs users and often considered to be one of
  its killer features. Jonas Bernoulli, its maintainer, is currently
  running a
  [Kickstarter campaign](https://www.kickstarter.com/projects/1681258897/its-magit-the-magical-git-client?ref=bnkptt)
  to support his work for a year. One of the goals is to make
  it more accessible to non-Emacs users. Many of the
  [articles that he has published](https://emacsair.me/2017/09/01/campaign-articles)
  when he launched the campaign are specifically for
  non-Emacs users.
* [Working Copy](https://workingcopyapp.com/) is a Git client for iOS
* [GitHub for Unity](https://unity.github.com/) is an extension for the Unity game engine editor. They just released version [0.19-alpha](https://github.com/blog/2426-github-for-unity-0-19-alpha-released).
* [tsrc](https://tankerapp.github.io/tsrc/) is a command-line tool that helps you manage several git repositories.
* [How to Integrate Git into Your Linux Desktop](https://www.linux.com/learn/intro-to-linux/2017/8/how-integrate-git-your-linux-desktop), by Jack Wallen

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt; and
Markus Jansen &lt;<mja@jansen-preisler.de>&gt;,
with help from Jonas Bernoulli and Ben Peart.
