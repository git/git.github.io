---
title: Git Rev News Edition 12 (February 10th, 2016)
layout: default
date: 2016-02-10 21:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 12 (February 10th, 2016)

Welcome to the 12th edition of [Git Rev News](http://git.github.io/rev_news/rev_news.html),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](http://git.github.io/rev_news/rev_news.html) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of January 2016.

## Discussions

<!---
### General
-->

### Reviews

* [refs backend rebase on pu](http://thread.gmane.org/gmane.comp.version-control.git/284036/)

David Turner, who works for Twitter, recently sent new versions of his
work to add a database backend to store Git refs:

- [v1 "LMDB refs backend atop pre-vtable"](http://thread.gmane.org/gmane.comp.version-control.git/281925/)
- [v2 "refs backend reroll"](http://thread.gmane.org/gmane.comp.version-control.git/283739/)
- [v3 "refs backend rebase on pu"](http://thread.gmane.org/gmane.comp.version-control.git/284036/)
- [v4 "refs backend"](http://thread.gmane.org/gmane.comp.version-control.git/285604/)

This work was started a long time ago by Ronnie Sahlberg, working for
Google, and has already been reported about in
[Git Rev News edition 7](http://git.github.io/rev_news/2015/09/09/edition-7/).

These last patch series have again been reviewed or commented on by a
lot of experienced Git developers, like Junio Hamano, Michael
Haggerty, Duy Nguyen, Shawn Pearce, Jonathan Nieder, Eric Sunshine,
David Aguilar, Ronnie Sahlberg, Jeff King, Szeder Gábor, Thomas
Gummerer, Ramsay Jones, and also a bit by Howard Chu the LMDB author.

Some suggestions were about:

- [avoiding "extern" in C source](http://thread.gmane.org/gmane.comp.version-control.git/282020)
- [splitting functions](http://thread.gmane.org/gmane.comp.version-control.git/282924),
- [config options](http://thread.gmane.org/gmane.comp.version-control.git/281925),
- [indenting using tabs instead of spaces](http://thread.gmane.org/gmane.comp.version-control.git/281925),
- [option naming](http://thread.gmane.org/gmane.comp.version-control.git/282934),
- [using argv_array_* functions](http://thread.gmane.org/gmane.comp.version-control.git/282952)
- [using pointers to functions](http://thread.gmane.org/gmane.comp.version-control.git/282923)
- [typedef and pointers](http://thread.gmane.org/gmane.comp.version-control.git/282699)
- [naming call back functions](http://thread.gmane.org/gmane.comp.version-control.git/283936)
- [avoiding strcpy()](http://thread.gmane.org/gmane.comp.version-control.git/284091),
- [strings and memory leaks](http://thread.gmane.org/gmane.comp.version-control.git/284170)

So the interest in this work is still big and makes it likely that it
will bear fruits hopefully soon.

### Support

* [clones over rsync broken?](http://thread.gmane.org/gmane.comp.version-control.git/285099/)

Eric Wong, a long time git developer and the original git-svn author,
reported that he couldn't use the rsync protocol anymore to clone:

> I have not used rsync remotes in ages, but I was working on the
> patch for -4/-6 support and decided to test it against rsync.kernel.org
> 
> Cloning git.git takes forever and failed with:
> 
> $ git clone rsync://rsync.kernel.org/pub/scm/git/git.git
> Checking connectivity... fatal: bad object ecdc6d8612df80e871ed34bb6c3b01b20b0b82e6
> fatal: remote did not send all necessary objects

Jeff King, alias Peff, replied that the "rsync transport blindly pulls
all of the data over, with no idea that it doesn't need most of it",
and as there are "over 95,000 unreachable loose objects consuming a
gigabyte" in the cloned repository. This explains why Eric's clone
took forever.

But it also didn't work for Eric with smaller repositories and with
quite old versions of Git like 1.7.10.4. To that Peff replied that in
the rsync code "we blindly concatenate the list of loose refs and
packed refs" which has never been the right thing to do. And this
explains why the clones always fail with rsync. Peff found that this
has been broken since 2007, which is why it doesn't work even with old
git versions.

Peff also investigated different ways to fix it but concluded:

> ...git-over-rsync is just an awful protocol. Nobody should be
> using it. Having looked at it in more detail, I'm more in favor than
> ever of removing it.

and then sent a patch to "drop support for git-over-rsync". Ths patch,
on top of explaning the above, contains:

> We never made an official deprecation notice in the release
> notes for git's rsync protocol, but the tutorial has marked
> it as such since 914328a (Update tutorial., 2005-08-30).
> And on the mailing list as far back as Oct 2005, we can find
> Junio mentioning it as having "been deprecated for quite
> some time."... So it was old news then; cogito had
> deprecated the transport in July of 2005... (though it did
> come back briefly when Linus broke git-http-pull!).
>
> Of course some people professed their love of rsync through
> 2006, but Linus clarified in his usual gentle manner...:
> 
> > > Thanks!  This is why I still use rsync, even though
> > > everybody and their mother tells me "Linus says rsync is
> > > deprecated."
> > 
> > No. You're using rsync because you're actively doing
> > something _wrong_.
> 
> The deprecation sentiment was reinforced in 2008, with a
> mention that cloning via rsync is broken (with no fix)...
> 
> Even the commit porting rsync over to C from shell (cd547b4)
> lists it as deprecated! So between the 10 years of informal
> warnings, and the fact that it has been severely broken
> since 2007, it's probably safe to simply remove it without
> further deprecation warnings.

## Releases



## Other News

__Various__


__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt; and Nicola Paolucci &lt;<npaolucci@atlassian.com>&gt;,
with help from XXX.
