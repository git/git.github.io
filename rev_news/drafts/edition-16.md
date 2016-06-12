---
title: Git Rev News Edition 16 (June 15th, 2016)
layout: default
date: 2016-06-15 21:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 16 (June 15th, 2016)

Welcome to the 16th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](https://git.github.io).

This edition covers what happened during the month of May 2016.

## Discussions

### General

* [proposal for extending smudge/clean filters with raw file access](http://thread.gmane.org/gmane.comp.version-control.git/294425)

Joey Hess, who is the [git-annex](https://git-annex.branchable.com/)
main developer and maintainer, sent an email with some suggestions to
extend smudge/clean filters.

Smudge/clean filters can be used to automatically perform
transformations on the content when it is checked into Git or out of
it. This can be used for example to perform keyword substitution like
Subversion or CVS allows with keywords named '$Id$', '$Rev$' or
'$Author$'.

The idea is that these filters would call git-annex automatically and
git-annex could decide, when a file is added, if its content should
indeed by handled regularly by the Git repo or if it should be handled
by git-annex. In a similar way when a file is checked out, git-annex
would be called and could get the file content it by itself if it is
managing the file.

Joey's suggestions on the mailing list were the following:

```
I'm using smudge/clean filters in git-annex now, and it's not been an
entirely smooth fit between the interface and what git-annex wants
to do.

...

So I propose extending the filter driver with two more optional
commands. Call them raw-clean and raw-smudge for now.

raw-clean would be like clean, but rather than being fed the whole
content of a large file on stdin, it would be passed the filename, and
can access the file itself. Like the clean filter, it outputs the
cleaned version on stdout.

raw-smudge would be like smudge, but rather than needing to output the
whole content of a large file on stdout, it would be passed a filename,
and can create that file itself.
```

After discussing those new commands with Junio Hamano, the Git
maintainer, it looks like patches to add them could be accepted. The
names "clean-from-fs" and "smudge-to-fs" have been suggested for them.

<!---
### Reviews
-->

<!---
### Support
-->

## Releases

* git-multimail [1.3.0](https://github.com/git-multimail/git-multimail/releases/tag/1.3.0) and
  [1.3.1](https://github.com/git-multimail/git-multimail/releases/tag/1.3.1) were released,
  with a focus on options to customize emails, more documentation and
  a few SMTP-related improvements.

## Other News

__Various__


__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt; and Nicola Paolucci &lt;<npaolucci@atlassian.com>&gt;,
with help from Matthieu Moy.
