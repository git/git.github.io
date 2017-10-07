---
title: Git Rev News Edition 32 (October 11th, 2017)
layout: default
date: 2017-10-18 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 32 (October 11th, 2017)

Welcome to the 32nd edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of September 2017.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->


### Support

* [[idea] File history tracking hints](https://public-inbox.org/git/CAOZF3=Ouvk8ccME+fXr_T=GL1j4Gx3Hgj3ao_-GQng-noeOubg@mail.gmail.com/)

Pavel Kretov wrote to the mailing list:

> Git, being "a stupid content tracker", doesn't try to keep an eye on
> operations which happens to individual files; things like file renames
> aren't recorded during commit, but heuristically detected later.

and then stated that it would be "possible not only to do more
accurate 'git blame', but also merge revisions with fewer conflicts"
if Git better tracked what happens to files.

So he suggested adding hints into the commit message like:

>    Tracking-hint: rename git-1.0.ebuild -> git-2.0.ebuild
>    Tracking-hint: recreate LICENSE.txt
>    Tracking-hint: split main.c -> main.c cmdline.c
>    Tracking-hint: merge linalg.py <- vector.py matrix.py

Stefan Beller first replied that this "was discussed a couple of times
on the mailing list (though not recently)" and pointed to
[an old email from Linus Torvalds](https://public-inbox.org/git/Pine.LNX.4.58.0504141102430.7211@ppc970.osdl.org/).

In this email from April 2005, when Git was a few week old, Linus
rejected the idea of Git tracking renames in other places than the
commit message. He wrote things like:

> It's fundamentally the git notion of "content determines objects".

and:

> So, you really need to think of git as a filesystem. You can then
> implement an SCM _on_top_of_it_ ...

and:

> So the git header is an "inode" in the git filesystem, and like an
> inode it has a ctime and an mtime, and pointers to the data.

and he concluded with:

> There are too many messy SCM's out there that do not have a
> "philosophy". Dammit, I'm not interested in creating another
> one. This thing has a mental model, and we keep to that model.
>
> The reason UNIX is beautiful is that it has a mental model of
> processes and files. Git has a mental model of objects and certain
> very very limited relationships. The relationships git cares about
> are encoded in the C files, the "extra crap" (like rename info) is
> just that - stuff that random scripts wrote, and that is just
> informational and not central to the model.

Jacob Keller, alias Jake, replied to Stefan to summarize Linus'
position in the old discussions.

Jeff King replied to Pavel's initial email agreeing that optional
annotations could be useful, but stressing that "there are some
complications" like:

> But of course somebody has to make those annotations. If we had a
> tool to do it automatically, then we could apply the same tool at
> run-time later.

Igor Djordjevic also replied to Pavel pointing him to
[another old email from Linus](https://public-inbox.org/git/Pine.LNX.4.58.0504150753440.7211@ppc970.osdl.org/)
and [a discussion in April this year](https://public-inbox.org/git/xmqqr30qflk9.fsf@gitster.mtv.corp.google.com/)
where Junio Hamano wrote that Linus' email was "one of the most
important message in the list archive".

In this email, from the same discussion as above, Linus concluded
with:

> In other words, I'm right. I'm always right, but sometimes I'm more
> right than other times. And dammit, when I say "files don't matter",
> I'm really really Right(tm).
>
> Please stop this "track files" crap. Git tracks _exactly_ what
> matters, namely "collections of files". Nothing else is relevant,
> and even _thinking_ that it is relevant only limits your
> world-view. Notice how the notion of CVS "annotate" always
> inevitably ends up limiting how people use it. I think it's a
> totally useless piece of crap, and I've described something that I
> think is a million times more useful, and it all fell out _exactly_
> because I'm not limiting my thinking to the wrong model of the
> world.

Philip Oakley also replied directly to Pavel, suggesting him to use
`git interpret-trailers` for standardising his hints locally (in his
team / workplace) "to see how it goes and flesh out what works and
what doesn't".

Johannes Schindelin, alias Dscho, agreed with Philip and Pavel. He
explained that "*everybody* who seriously worked on a massive code
base has seen that rename detection fail in the most inopportune ways"
and gave examples, especially this one:

> when rename detection would matter most, like, really a lot, to lift
> the burden of the human beings in front of the computer pouring over
> hundreds of thousands of files moved from one directory tree to
> another, that's exactly when Git's rename detection says that there
> are too many files, here are my union rights, I am going home, good
> luck to you.

and concluded with:

> So I totally like the idea of introducing hints, possibly as
> trailers in the commit message (or as refs/notes/rename/* or
> whatever) that can be picked up by Git versions that know about
> them, and can be ignored by Git versions that insist on the rename
> detection du jour. With a config option to control the behavior,
> maybe, too.

Philip replied to Dscho suggesting a list of possible hints:

> So the hints could be (by type):
> - template;licence;boiler-plate;standard;reference :: copy
> - word-rename
> - regex for word substitution changes (e.g. which chars are within 'Word-_0`)
> - regex for white-space changes (i.e. which chars are considered whitespace.)
> - move-dir path/glob spec
> - move-file path/glob spec
> (maybe list each 'group' of moves, so that once found the rest of the rename detection follows the group.)

The discussion on this thread continued for a while also involving
Jeff Hostetler, Stefan and Junio who wrote:

> I actually like the idea to have a mechanism where the user can give
> hint to influence, or instruction to dictate, how Git determines
> "this old path moved to this new path" when comparing two trees.

But he stated that "it is a non starter" to have hints "baked in the
log message of a commit object", though "the principle Linus lays out
in the message does not reject such hints stored outside baked-in data
structure, which allows mistakes to be corrected without affecting the
real history".

<!---
## Developer Spotlight:
-->

## Releases


## Other News

__Various__


__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt; and
Markus Jansen &lt;<mja@jansen-preisler.de>&gt;
with help from XXX.
