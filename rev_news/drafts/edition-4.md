---
title: Git Rev News Edition 4 (June 3rd, 2015)
layout: default
date: 2015-06-03 21:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 4 (June 3rd, 2015)

Welcome to the fourth edition of [Git Rev News](http://git.github.io/rev_news/rev_news.html),
a digest of all things Git. For our goals, the archives, the way we work, how to contribute or to
subscribe see [the Git Rev News page](http://git.github.io/rev_news/rev_news.html) on http://git.github.io.

This edition covers what happened during the month of May 2015.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->


### Support

* [git pack protocol question: sideband responses in case of errors?](http://thread.gmane.org/gmane.comp.version-control.git/268949)

Christian Halstrick said that he sometimes get "invalid channel 101"
errors when pushing over HTTP using a JGit client.

He had already greatly debugged the problem which appears when quotas
on the filesystem prevent the Git server to store a big packfile. The
server then sends back a packet line "0013error: ..." to the client,
but the client think that sideband communication should still be used,
so it interprets the "e" from "error" as a channel number. The ascii
code of "e", which is 101 in decimal, is the reason why the error is
"invalid channel 101".

Christian asked a few questions to get more information about when
sideband communication should happen and how a server should respond
in case of error.

As Shawn Pearce had developed both the Smart HTTP protocol, which is
now the most commonly used HTTP protocol by Git clients and servers,
and JGit, the implementation of Git in Java, he answered those
questions with a lot of details and further nailed down the problem:

> The bug here is JGit's ReceivePack/BaseReceivePack code not setting
> up the side-band-64k early enough for this failure report to be
> wrapped in it.

And Shawn concluded with the following:

> FWIW I am glad you found this. I have been chasing this bug for
> years but couldn't really pin it down to anything. If its the "pack
> won't fit on local disk due to disk full" condition that narrows
> down the offending section of JGit considerably.

* ["git commit --date" does not behave well?](http://thread.gmane.org/gmane.comp.version-control.git/269832) (*written by Junio C Hamano*)

Bastien Traverse was having trouble lying the date when creating a commit
with the `--date` parameter to `git commit` command.  He tried various
formats, e.g. `git commit --amend --date="2015-05-21 16∶31 +0200"` 
and got the date right but not the hours and minutes.

Peff tried to reproduce it (as the `--date=<string>` parsing was recently
corrected, there was a possibility of regression), but he couldn't. It
turns out that the input Bastien was feeding did not have the right "colon".

> Your "colon" is actually UTF-8 for code point U+2236 ("RATIO"). So git's
> date parser does not recognize it, and punts to approxidate(), which
> does all manner of crazy guessing trying to figure out what you meant.


## Releases

* [git-multimail resurected!]() (*written by Matthieu Moy*)

  [git-multimail](https://github.com/git-multimail/git-multimail) got
  a new co-maintainer, and is active again after a long period of
  inactivity. [A summary of the recent
  activity](http://thread.gmane.org/gmane.comp.version-control.git/270239)
  was posted on the Git mailing-list. A 1.1 release is expected in
  June. Don't hesitate to join the fun and help by reviewing
  pull-requests or submitting new ones!


## Other News

<!---
### Event
-->

<!---
### Media
-->


## Credits

This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt; and Nicola Paolucci &lt;<npaolucci@atlassian.com>&gt;
with help from Junio C Hamano, Matthieu Moy.
