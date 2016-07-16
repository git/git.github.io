---
title: Git Rev News Edition 17 (July 20th, 2016)
layout: default
date: 2016-07-20 21:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 17 (July 20th, 2016)

Welcome to the 17th edition of [Git Rev News](http://git.github.io/rev_news/rev_news.html),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](http://git.github.io/rev_news/rev_news.html) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of June 2016.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

### Support

* [Fwd: what is a snapshot](http://thread.gmane.org/gmane.comp.version-control.git/297701/)

Ovatta Bianca asked:

> I read in every comparison of git vs other version control systems,
> that git does not record differences but takes "snapshots"
> I was wondering what a "snapshot" is? Does git store at every commit
> the entire files which have been modified even if only a few bytes
> were changed out of a large file?

Philip Oakley answered:

> A snaphot is like a tar or zip of all your tracked files. This means it is
> easier to determine (compared to lots of diffs) the current content.
>
> Keeping all the snapshots as separate loose items, when the majority of
> their content is unchanged would be very inefficient, so git then uses, at
> the right time, an efficient (and obviously lossless) compression technique
> to 'zip' all the snapshots together so that the final repository is
> 'packed'. The overall effect is a very efficient storage scheme.

and pointed to [some documentation on Git's web site](https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain)
for "some good explanations".

Jeff King alias Peff explained how the relationship between Git
objects already makes things efficient:

> Each commit is a snapshot in that it points to the sha1 of the root
> tree, which points to the sha1 of other trees and blobs. And following
> that chain gives you the whole state of the tree, without having to care
> about other commits.
>
> And if the next commit changes only a few files, the sha1 for all the
> other files will remain unchanged, and git does not need to store them
> again. So already, before any explicit compression has happened, we get
> de-duplication of identical content from commit to commit, at the file
> and tree level.
>
> And then when a file does change, we store the whole new version, then
> delta compress it during "git gc", etc, as you describe.

And Jakub Narębski detailed the "loose" and the "packed" format.

## Releases


## Other News

__Various__

* [New archives of the Git Mailing list have been announced](http://thread.gmane.org/gmane.comp.version-control.git/299195/) by Eric Wong.
* [An RFC about questions for "Git User's Survey 2016" has been posted](http://thread.gmane.org/gmane.comp.version-control.git/299032/) by Jakub Narębski.

__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt; and Nicola Paolucci &lt;<npaolucci@atlassian.com>&gt;,
with help from XXX.
