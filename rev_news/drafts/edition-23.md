---
title: Git Rev News Edition 23 (January 20th, 2017)
layout: default
date: 2017-01-20 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 23 (January 20th, 2017)

Welcome to the 23rd edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of December 2016.

## Discussions

### General

* [Gitview Shell Injection Vulnerability](https://public-inbox.org/git/20161227082922.8B7A813893D@mail.altsci.com/)

Javantea reported on the list:

> I have found a shell injection vulnerability in contrib/gitview/gitview.

and:

> Gitview executes shell commands using string concatenation with user
> supplied data, filenames and branch names. Running Gitview and
> interacting with the user interface with a malicious filename or
> branch name in the current repository results in malicious commands
> being executed as the current user.

[gitview](https://github.com/git/git/tree/v2.11.0/contrib/gitview) is
a GTK based repository browser for git, according to its
documentation. It is part of the 'contrib' directory of the Git
codebase which contains scripts and utilities that are not maintained
by Junio Hamano and the developers on the Git mailing list. It looked
like its implementation in Python was indeed lacking.

Stefan Beller, while cc'ing Aneesh Kumar, the gitview author, replied:

> Maybe it's time for a spring cleanup and remove some old (dead?)
> projects from contrib?

Jeff King, alias Peff, agreed with Stefan saying that gitview "hasn't
had a substantive commit since 2007", so Stefan sent a patch that
removes gitview from the Git codebase.

Javantea, Peff and Junio all agreed that it was a good solution, but
Peff and Junio wanted to hear first from Aneesh before removing his work.
Aneesh sent his "Acked-by:" to agree with the change.

Following these events, Stefan sent a separate
[patch to remove git-convert-objects from the 'contrib' directory](https://public-inbox.org/git/20161228180205.29213-1-sbeller@google.com/).
This other tool "originally named git-convert-cache, was used in early
2005 to convert to a new repository format, e.g. adding an author
date."

Philip Oakley also recently sent a small
[patch series to update the git-gui and gitk documentation](https://public-inbox.org/git/20170112213240.7972-1-philipoakley@iee.org/)
as this documentation was referencing gitview and needed a few other improvements.

So it looks like a spring cleanup is indeed happening.

<!---
### Reviews
-->

<!---
### Support
-->

## Releases

 * [What's new in Git for Windows 2.11?](https://blogs.msdn.microsoft.com/visualstudioalm/2016/12/01/whats-new-in-git-for-windows-2-11/) (this slipped through the net of RevNews #22)

## Other News
__Events__
 * [Git Merge 2017: the full agenda is now live](https://github.com/blog/2294-git-merge-2017-the-full-agenda-is-now-live)


__Various__


__Light reading__


__Git tools and sites__
 * [qit ql - A git query language](https://github.com/cloudson/gitql)


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt; and
Markus Jansen &lt;<mja@jansen-preisler.de>&gt;
with help from XXX.
