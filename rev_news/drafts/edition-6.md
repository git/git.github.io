---
title: Git Rev News Edition 6 (XXX, 2015)
layout: default
date: 2015-07-08 21:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 6 (XXX, 2015)

Welcome to the sixth edition of [Git Rev News](http://git.github.io/rev_news/rev_news.html),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](http://git.github.io/rev_news/rev_news.html) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of July 2015.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

### Support

* [Git tag: pre-receive hook issue](http://thread.gmane.org/gmane.comp.version-control.git/274095)

Gaurav Chhabra reported that in his company they have [a script
launched by a pre-receive hook](http://pastebin.com/VnMQp5ar) in which
they use the following Git command to check if a given object is a tag
instead of a commit:

```
git describe --exact-match $sha1 2>&1 | grep -o fatal | wc -w
```

If the output of the command is 0, the script considers that $sha1 is
a tag.

Unfortunately it sometimes doesn't work and Gaurav, though
acknowledging that it's a bad implementation, wondered why.

Junio Hamano replied that commits that are pointed to by annotated
tags would be considered as tags, and wondered if that was on purpose
and asked why that would be wanted.

Junio also found something strange in an earlier part of the script
and suggested an alternative implementation.

Jacob Keller, aka Jake, agreed with Junio that it was not clear what
was really needed, and suggested that the problem might come from the
fact that, when the pre-receive hook that launches the script is run,
refs that are received have not yet been accepted, so `git describe`
cannot see them yet.

Agreeing with Jake, Junio replied to Gaurav with the following
description of what happens on the server when it receives a push:

> When you push a branch 'master' and a tag 'v1.0', these things
> happen in order:
>
>  (1) all objects that are necessary to ensure that the receiving
>      repository has everything reachable from 'master' and 'v1.0'
>      are sent to it and stored.  If the receiving end fails to store
>      this correctly, everything below is skipped and the operation
>      fails.
>
>  (2) pre-receive is run.  Notice that at this point, no refs have
>      been updated yet, so "describe" will not know v1.0 tag (if it
>      is a new one) exists.  But this step can assume that all new
>      objects are already accessible using their object name, so
>
>         case "$old" in
>         0000000000000000000000000000000000000000) range=$new ;;
>         *) range=$old..$new ;;
>         esac &&
>         git rev-list $range |
>         while read commit
>         do
>                 check $commit object, e.g.
>                 git cat-file commit $commit | grep FooBarId
>         done
>
>      is expected to work.
>
>  (3) for each ref being updated (in this case, refs/heads/master and
>      refs/tags/v1.0), the following happens:
>
>      (3-1) built-in sanity checks may reject the push to the ref,
>            e.g. refusing to update a checked out branch, refusing to
>            accept a non-fast-forward push that is not forced, etc.
>
>      (3-2) update-hook is run, which may reject the push to this
>            ref.
>
>      (3-3) the ref is updated (unless the push is atomic).
>
>  (4) if the push is atomic, the refs are updated.
>
>  (5) post-receive hook is run.  This is for logging and cannot
>      affect the outcome of the push.
>
>  (6) for each ref that was updated (in this case, refs/heads/master
>      and refs/tags/v1.0), post-update hook is run.  This is for
>      logging and cannot affect the outcome of the push.

and this opinion about the problematic command:

> As your requirement seems to be to validate any and all new commits,
> I think it is totally unnecessary to check if any of them happens to
> have a tag pointing at it in the first place.

Gaurav eventually said that the purpose of the problematic command was
only to check if a ref that is update is a tag. Jake then detailed how
to properly check in the hook that a ref being updated is a tag:

> To check whether the ref being updated is a tag, you need to check the
> 3rd parameter. pre-receive receives in the format
>
> <old-value> <new-value> <ref-name>
>
> so you need to check each line's 3rd value which is the ref-name being
> updated. If it's in refs/tags then it's a tag update. If it's not, you
> can check it as a branch update.

Gaurav thanked Junio and Jake for their support.

## Releases

 
## Other News

__Various__


__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt; and Nicola Paolucci &lt;<npaolucci@atlassian.com>&gt;,
with help from XXX.
