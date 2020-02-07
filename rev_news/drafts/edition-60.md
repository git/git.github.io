---
title: Git Rev News Edition 60 (February 19th, 2020)
layout: default
date: 2020-02-19 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 60 (February 19th, 2020)

Welcome to the 60th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of January 2020.

## The Pros and Cons of Reposurgeon (*written by [Eric S. Raymond](http://www.catb.org/~esr/)*)

On January 12th 2020, the history of the GNU Compiler Collection was
lifted from Subversion to Git. At 280K commits, with a history
containing traces of two previous version-control systems (CVS and
RCS) this was the largest and most complex repository conversion of an
open-source project ever. It swamped the previous record-holder -
Emacs's move from Bazaar to Git back in 2011 - by an order of magnitude.

Both those conversions were done by [reposurgeon](https://gitlab.com/esr/reposurgeon).
Neither of them could practically have been performed by any other
conversion tool available. This article will explain why that is, and
under what circumstances you might consider using reposurgeon
yourself.

Let's start with a brief description of what reposurgeon actually
does. When you use it, you start by reading in a version-control
repository...but actually, that's not quite right. What reposurgeon
actually does is read in a git fast-import stream. It looks like it
reads repositories because it knows how to call front ends that use
exporters such as git-fast-export and cvs-fast-export to serialize a
repository for it.

Actually, that's not quite right either. Subversion doesn't have an
exporter - there is no svn-fast-export (well, not one that works for
more than trivial cases, anyway). Instead, reposurgeon reads the
native serialization produced by Subversion's svnadmin dump
tool. Internally, this is massaged into the equivalent of a git
fast-import stream and represented as one inside reposurgeon.

There are reposurgeon-compatible exporters for RCS, CVS, bzr, hg, SRC,
bk, and of course git itself. With a little extra work using sccs2rcs
it's possible to reach all the way back to collections of SCCS files.

Now that you've caught your repository, what can you do with it?

I observed earlier that what you have, internally, is a deserialized
version of a git fast-input stream. A productive way to think about
what reposurgeon does is to remember that this is basically just a DAG
(directed acyclic graph) with text attached to the nodes. Now think of
reposurgeon as an editor for this graph and its nodes. Then, think of
it as a DSL (domain-specific language) designed to be *scripted* -
that is, designed to reproducibly apply editing procedures to this
graph.

So the general answer to "what can you do with it" is "anything you
want to". I enjoy thinking about and implementing DSLs, and once I had
the basic design idea it was pretty much inevitable that I was going
to write the most general set of primitives I could imagine - and I
have a very fertile imagination.

Elijah Newren's aside on reposurgeon in [Git Rev News 54](https://git.github.io/rev_news/2019/08/21/edition-54/)
described it as “GDB for history rewriting”. That's a pretty good
analogy, actually. Better than even I knew until recently, because it
turns out the Python Cmd library I originally used to write its
command interpreter was designed to emulate the interface style of gdb
and earlier symbolic debuggers.

Accordingly, you can immediately use reposurgeon for a lot of
relatively simple tasks like (1) removing extremely bulky content that
shouldn't have been checked in, (2) partitioning and merging
repositories, (3) transcoding Latin-1 metadata to UTF-8, (4)
debubbling an unnecessary complex history to make reading it easier.

Often, though, those things can be done with other tools like his
git-filter-repo. It's repository conversions for which you are likely
to actually *need* the full power of a domain-specific language
designed for repository surgery.

Which brings us to how you write out your graph as a live
repository. Reposurgeon doesn't do that directly either. When it needs
to write out a repository, it hands a git fast-import stream to an
importer back end. That could be git fast-import itself, or the
corresponding importers for hg, bzr, darcs, bk, RCS, or SRC.

Here's what reading in and immediately converting a small Subversion
dump would look like:

```shell
$ reposurgeon
reposurgeon% read <foo.svn
23 svn revisions (0K/s)
* foo
reposurgeon% prefer git
git is the preferred type.
reposurgeon% rebuild bar
reposurgeon: rebuild is complete.
reposurgeon: no preservations.
reposurgeon% 
```

In theory you now have a Git repository named "bar" in your current
directory that is a perfect translation of foo. In practice, for any
nontrivial repository, you probably have a bit of a mess on your
hands.

If you had read in any Git repository and written it out again, you'd
get a perfect copy. But when you're moving histories between
*different* version-control systems, you have to deal with the
mismatch between the source system's model of version control and the
target's.

A good example of this is the fact that Subversion doesn't have
anything directly corresponding to a Git tag. A Subversion tag is
actually a directory copy operation with a target under the tags/
directory. The copy operation leaves a commit in place which, if moved
literally to gitspace, would just be junk. What you want is to move
the metadata of that commit to an annotated tag.

Many attempts at importers silently botch this in practice, but least
it handled automatically in theory - and reposurgeon does that. The
mess you're likely to have on your hands anyway is due to Subversion
operator errors, scar tissue for a previous conversion out of CVS, and
use of git-svn as a live gateway to the repository.

The most common symptom of all these error sources is misplaced branch
joins; in extreme cases you may even have disconnected
branches. Reposurgeon enables you audit for and repair this kind of
defect. Here are a few examples of that kind of repair done on the GCC
repository:

```
# /branches/GC_5_0_ALPHA_1
<27855>|<27860> reparent --use-order
# /branches/apple-200511-release-branch
<105446>|<105574> reparent --use-order
# /branches/apple-gcc_os_35-branch
<90334>|<90607> reparent --use-order
# /branches/apple-tiger-release-branch
<96593>|<96595> reparent --use-order
```

The GCC conversion was pretty hairy - 343 lines of DSL scripting - but
there are whole new levels of complexity when, as still sometimes
happens, you need to recover history from pre-version-controlled
sources to stitch the repository together.

In [one extreme case](http://esr.ibiblio.org/?p=2491), I ended up
stitching together material from 18 different release tarballs, 11
unreleased snapshot tarballs, one release tarball I could reconstruct,
one release tarball mined out of an obsolete Red Hat source RPM, two
shar archives, a pax archive, five published patches, two zip files, a
darcs archive, and a partial RCS history,

But reposurgeon can handle this, because it make conversion
experiments easy. The workflow it's designed for is carefully building
a script that assembles your source repository and other data into a
simulacrum of what a Git repository tracking your project from the
beginning of time would have looked like.

Almost never will you get this right the first time. It takes testing,
polishing, tripping over assumptions you didn't know you and your
tools were making, and correcting for those assumptions. In the GCC
case it took many hours of work to locate and develop fixes for the
misplaced branch joins.

A subtle but important point is that I didn't do that work
myself. That kind of thing is not a job for reposurgeon's maintainer,
it's a job for a "Mr. Inside" who knows the project's history
intimately - in this case it was actually the GCC project lead, Joseph
Myers. One of reposurgeon's requirements is that it has to be a tool
that a "Mr. Inside" can learn to use with minimum friction.

And generally it is, if you're being driven to it by the kind of
problem it was designed to solve - it's like gdb that way. I've been
taken to task about the tool having no intro documentation; this is
not because I'm lazy, it's because there's
[no plausible way to write any](http://esr.ibiblio.org/?p=8551), any
more than there is for gdb. You're ready to learn reposurgeon, as
Joseph Myers did, when you're stuck into a conversion or editing
problem so deep that the *very* complete
[reposurgeon command reference](http://www.catb.org/~esr/reposurgeon/reposurgeon.html)
starts to make sense to you.

You can find more about conversions with reposurgeon
[here](http://www.catb.org/~esr/reposurgeon/dvcs-migration-guide.html).

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

* [The History of Git: The Road to Domination in Software Version Control](https://www.welcometothejungle.com/en/articles/btc-history-git)

<!---
### Support
-->

<!---
## Developer Spotlight:
-->

## Releases

* [git-cinnabar 0.5.4](https://github.com/glandium/git-cinnabar/releases/tag/0.5.4)

## Other News

__Various__


__Light reading__


__Git tools and sites__

* [git-repo](https://github.com/aliyun/git-repo-go) is a
  reimplementation in Golang by [Alibaba Cloud](https://github.com/aliyun) of the
  [Android repo tool](https://source.android.com/setup/develop/repo).

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Eric S. Raymond.
