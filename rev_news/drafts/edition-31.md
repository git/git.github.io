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
command to properly format patchs.

He warned that, as "our code base isn't consistent", it is not
possible "to come up with a config which matches" it, but said that he
wants to "see how people feel" about this topic.

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

Brandon later agreed with improving the documentation once his patch
would not be an RFC anymore.

Junio Hamano, the Git maintainer, thanked Brandon for compiling a
sensible set of rule, though he stressed that developers should have
"a shared notion of how these rules are to be used" to avoid
"unpleasant consequences" like:

    - "unwanted code churn on existing codebase, only for the sake of
     satisfying the formatting rules"

    - "far more style-only critique to patches posted on the list" by
      readers "running the tool to nitpick other people's patches"

    - when "human aesthetics judgement" is necessary to overrule
      mechanical rule

Junio also commented the content of the patch especially the
"ColumnLimit: 80" settings to limit code lines to 80 columns where he
repeated that it is "important to give a guideline on what to do when
lines in your code goes over this limit".

Brandon replied to Junio that the unwanted code churn "is an issue
when you have an inconsistent code base such as ours" and that he
"would hope that use of such a tool would eventually completely
eliminate style-only critiques".

He also "would expect some of the penalties would need to be tweaked
overtime before we rely too heavily on" the tool to avoid too many
cases where it conflicts with human aesthetics judgement.

Junio and Brandon then further discussed some settings in the content
of the patch. This led Junio to talk about the checkpatch.pl script
from the Linux kernel project that he uses to automatically find
problems in patches.

Then Jeff King chimed saying that he stopped pursuing adding a new
`git clang-format-diff` command because he "couldn't find a way to
have it make suggestions for new code without nagging about existing
code". He was also "worried that there would always be suggestions
from the tool that we don't agree with (i.e., where the guiding
principle is "do what is readable")".

Jeff also mentioned "go fmt", which is used by the go language
community, saying that "it seems to at least work for them".

Ævar Arnfjörð Bjarmason, Ben Peart, Ramsay Jones, Brian Carlson and
Jonathan Nieder also chimed in at some points to discuss the tools and
how they should be used.

In the end it looks like most of the Git developers are either neutral
or are happy with moving this topic forward, and an updated version of
Brandon's patch has been merged in the "pu" (proposed updates) branch.

<!---
### Reviews
-->

<!---
### Support
-->

<!---
## Developer Spotlight:
-->

## Releases


## Other News

__Various__


__Light reading__


__Git tools and sites__

* [How to Integrate Git into Your Linux Desktop](https://www.linux.com/learn/intro-to-linux/2017/8/how-integrate-git-your-linux-desktop)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt; and
Markus Jansen &lt;<mja@jansen-preisler.de>&gt;
with help from XXX.
