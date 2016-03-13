---
title: Git Rev News Edition 13 (March 16th, 2016)
layout: default
date: 2016-03-16 21:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 13 (March 16th, 2016)

Welcome to the 13th edition of [Git Rev News](http://git.github.io/rev_news/rev_news.html),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](http://git.github.io/rev_news/rev_news.html) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of February 2016.

## Discussions

### General

* [RFC: Resumable clone based on hybrid "smart" and "dumb" HTTP](http://thread.gmane.org/gmane.comp.version-control.git/285921/)

It is a well known problem that `git clone` is not resumable. If the
connection comes down during a clone, the clone has to be restarted
from scratch.

A work around that is often suggested is to use `git bundle` first, then
to rsync that bundle and eventually to clone using the rsync'ed bundle. Some
tools [like gitolite](http://thread.gmane.org/gmane.comp.version-control.git/235040/) have even been making it easier to support that.

There was also at one point in 2011
[a patch series](http://thread.gmane.org/gmane.comp.version-control.git/185196/)
to improve the support of this kind of clone workflow internally.

And for some time this was thought of as just a small manpower problem. A
few month of dedicated work by anyone could probably fix that. It was
even proposed as a Google Summer of Code (GSoC) project.

Over time though Git developers realized that it was not so easy
because some very careful design was needed, and it was removed from
the list of possible GSoC projects.

So it was very exciting to see a number of new proposals pop up on the
list during the last few months.

It started on February 5 with
[a "Resumable clone revisited, proof of concept" patch series by Duy Nguyen](http://thread.gmane.org/gmane.comp.version-control.git/that/)
where he wrote:

> I was reminded by LWN about this. Annoyed in fact because it's
> called a bug while it looks more like an elephant.

and pointing to [a LWN.net article](https://lwn.net/Articles/674392/)
that reports about
[Sarah Sharp speaking at the SCALE 14x conference](https://www.socallinuxexpo.org/scale/14x/presentations/improving-diversity-maslows-hierarchy-needs):
"she noted that Git still does not support interrupting and resuming
download operations, which is an important bug to fix."

Then on February 10 Shawn Pearce sent
[an 'RFC: Resumable clone based on hybrid "smart" and "dumb" HTTP' proposal](http://thread.gmane.org/gmane.comp.version-control.git/285921/)
that he had discussed internally with other people at Google where he works.

This was followed on March 2 by
[an email called "Resumable git clone?"](thread.gmane.org/gmane.comp.version-control.git/288088/)
from Josh Triplett, a well known Linux Kernel developer, who asked:

> In a discussion elsewhere, Al Viro suggested taking the partial pack
> received so far, repairing any truncation, indexing the objects it
> contains, and then re-running clone and not having to fetch those
> objects.  This may also require extending receive-pack's protocol for
> determining objects the recipient already has, as the partial pack may
> not have a consistent set of reachable objects.
>
> Before starting down the path of developing patches for this, does the
> approach seem potentially reasonable?

Josh talks about Al Viro who is another well known Linux Kernel
developer, and it's interesting to see Linux Kernel developers
interested again in taking part in Git development. It reminds some
old timers about the "good old time".

All these proposals have been discussed by many important Git
developers and reviewers like Stefan Beller, Junio Hamano, Johannes
Schindelin, Jonathan Nieder, Eric Sunshine, Jeff King, Elia Pinto.

About Shawn's proposal there was also an interesting potential
security issue called out by Blake Burkhart. And other people like
Bhavik Bavishi and Konstantin Ryabitsev also took part of the
discussion following Josh's email.

From the last discussions about Josh's email, it appeared that Git
developers favored Shawn's proposal over others, and maybe that
Shawn's proposal was going to be worked on soon.

Then on March 5 Kevin Wern sent
[an email called "Resumable clone"](thread.gmane.org/gmane.comp.version-control.git/288306/),
where he said he began looking at relevant code to start working on it, and he asked:

> Is someone working on this currently?  Are there any things I should
> know moving forward?  Is there a certain way I should break
> down/organize the feature when writing patches?

Duy answered that "Resumable clone is happening." And pointed to
[some preparation work](http://thread.gmane.org/gmane.comp.version-control.git/288205/focus=288222)
by Junio Hamano [going on](http://thread.gmane.org/gmane.comp.version-control.git/288080/focus=288150).
Junio by the way answered with
[a very long email](http://thread.gmane.org/gmane.comp.version-control.git/288306/focus=288317)
that contains "a rough and still slushy outline" of what remains to be
done. This was then discussed and explained further.

It is not clear if Shawn's proposal and Josh's email were inspired by
Sarah Sharp's remark, and LWN.net's report about it, but anyway it
looks like hopefully this old and annoying problem is going to be
fixed not too far away into the future.

### Reviews

* [config: add '--show-origin' option to print the origin of a config value](http://thread.gmane.org/gmane.comp.version-control.git/286198/)

For some time Lars Schneider has been sending versions of a short
patch series to make it possible to see where a config option comes
from:

- [v1](http://thread.gmane.org/gmane.comp.version-control.git/285553/)
- [v2](http://thread.gmane.org/gmane.comp.version-control.git/285894/)
- [v3](http://thread.gmane.org/gmane.comp.version-control.git/286110/)
- [v4](http://thread.gmane.org/gmane.comp.version-control.git/286197/)
- [v5](http://thread.gmane.org/gmane.comp.version-control.git/286485/)
- [v6](http://thread.gmane.org/gmane.comp.version-control.git/286672/)

Version 1 was itself based on a previous patch by Jeff King.

The new feature could be useful because config options can be set in
many ways. The usual way is to use one of the config files:

- the ".git/config" file at the root of the working directory,
- the user's "~/.gitconfig" file,
- the user's "~/.config/git/config" file, or
- a system wide "/etc/gitconfig" file.

But the exact paths of the above files depend on how git was compiled
and on the values of at least the GIT_CONFIG, GIT_CONFIG_NOSYSTEM,
GIT_DIR and XDG_CONFIG_HOME environment variables.

Also config values can also be set on the command line using the 'git
-c' option, like `git -c <key>=<value> config ...`. Or they can be
read from another file using the 'config -f' option, like `git config
-f <file> ...`, or from the standard input. They can also be included
from another file by using a "include.path = <path>" directive in a
config file.

As can be seen in the above threads, even if it seems simple, there
are a lot of details to get right. These details include the name of
the option. This was discussed by Sebastian Schuberth, Jeff King,
Ramsay Jones, Mike Rappazzo and Junio Hamano. So the name was changed
to '--show-origin'.

Other details that were discussed are about the format of the output
in special cases, like when the 'git -c' option is used, or when the
'config -f' option is used, or when config is read from the standard
input.

The `git config` option also has a lot of different modes depending on
which options it is passed, so it was discussed with which other
options it is ok to pass '--show-origin'.

Many details in the code and tests where also discussed by Eric
Sunshine, Johannes Schindelin, Johannes Sixt, Jeff, Ramsay and Junio.

One nice outcome of this patch series though is that error messages
when there are problems in the config can now tell more precisely
where the problems come from.

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
