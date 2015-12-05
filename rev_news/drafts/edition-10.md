---
title: Git Rev News Edition 10 (December 9th, 2015)
layout: default
date: 2015-12-09 21:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 10 (December 9th, 2015)

Welcome to the 9th edition of [Git Rev News](http://git.github.io/rev_news/rev_news.html),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](http://git.github.io/rev_news/rev_news.html) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of November 2015.

## Discussions

<!---
### General
-->

### Reviews

* [clean: new option --exclude-from](http://thread.gmane.org/gmane.comp.version-control.git/281762)

James Rouzier sent a patch to add a new `--exclude-from=<file>` option
to `git clean`. It looked quite straightforward, but as often Eric
Sunshine found many small things that could be improved upon. James
and Eric then agreed on what should be done, and it looked that a
clear roadmap had been set for this new feature.

That's when Jeff King, alias Peff, wrote the following:

> Lots of commands care about excludes (e.g., "add", "status").
> 
> Should this perhaps be an option to the main "git" to append to the set
> of excludes?
> 
> You can kind-of do this already with:
> 
>   git -c core.excludesfile=/path/to/whatever clean ...
> 
> but of course you might be using core.excludesfile already. I wonder if
> that config option should take multiple values and respect all of them,
> rather than last-one-wins.

This started a discussion between Junio Hamano, the git maintainer,
and Peff about how exclude files should be specified to commands.

It is a complex topic because there are already different ways to pass
an exclude file, for example there is also `.git/info/exclude`.

<!---
### Support
-->

## Releases


## Other News

__Various__


__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt; and Nicola Paolucci &lt;<npaolucci@atlassian.com>&gt;,
with help from XXX.
