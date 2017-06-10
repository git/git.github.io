---
title: Git Rev News Edition 28 (June 14th, 2017)
layout: default
date: 2017-06-14 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 28 (June 14th, 2017)

Welcome to the 28th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of May 2017.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->


### Support

* [git push recurse.submodules behavior changed in 2.13](http://public-inbox.org/git/CAE5=+KX57KM+6n9NpePw9KYPXFy7UH-WRgSwaJDnvRofYFXm7Q@mail.gmail.com/)

John Shahid sent an email saying:

> Currently with 2.13 you cannot run `git push --recurse-submodules=on-demand`
> if the parent repo is on a different branch than the sub repos, e.g. parent
> repo is on "develop" and sub-repo on "master".

John pointed to [a test case he had created](https://gist.github.com/jvshahid/b778702cc3d825c6887d2707e866a9c8)
to show the problem, and he also had bisected it to
[a recent commit by Brandon Williams](https://github.com/git/git/commit/06bf4ad1db92c32af38e16d9b7f928edbd647780)
that teaches `git push --recurse-submodules` to recursively propagate
the remote and refspec it is passed to the pushes performed in the
submodules.

Junio Hamano, the Git maintainer, couldn't tell from the report if the
new behavior was a regression or a good thing, so he asked Brandon
about his opinion on this.

Stefan Beller then explained that before Brandon's patch, Git "just
invoked `git push` in the submodule, assuming the user had setup a
remote tracking branch and a push strategy such that `git push` would
do the right thing".

John then described in more details the previous behavior:

> We have a parent repo on a branch called "develop" and a submodule on
> a branch called "master". Prior to git version 2.13 if we had an
> unpushed commit in the submodule and ran `git push origin develop --recurse-submodules=on-demand"
> git would happily push the "develop" branch of the parent repo and the
> "master" branch of the submodule

and the new one:

> After the change mentioned in my previous email, git would propagate
> the refspec from the parent repo to the submodule, i.e. it would try
> to push a branch called "develop" in the submodule which would error
> since no branch with that name exist in the submodule.

Brandon replied that:

> Yeah my patches would definitely break that kind of workflow because
> they assumed that if you actually provided a refspec + --recurse that
> you would want it propagated down.

Jonathan Nieder then replied to John's original email by explaining in
details the context of Brandon's patch, the goal of many of the recent
submodule patch series from Brandon and others being "to allow
thinking of a repository as a single unit, including submodules, most
of the time".

Jonathan also asked John:

> Can you say more about how this change affects you? Would you be able
> to push without a refspec, or do you e.g. have scripting that was
> relying on the existing loose behavior?

John replied that he "loves the idea of having tools treat the repo as
a unit", but he "thinks propagating the refspec when no refspec is
passed on the CLI is very surprising action that should be corrected".

He also wrote that pushing without a refspec would work for him (if no
refspec is propagated).

Unfortunately after that email at the end of May, it looks like not
much happened, so recently John replied to his own mail:

> bump. it's been a while and I'm still not clear what the next steps
> are. I'm happy to send a patch but I would like to get a consensus
> first.

## Releases


## Other News

__Various__


__Light reading__

* [The largest Git repo on the planet](https://blogs.msdn.microsoft.com/bharry/2017/05/24/the-largest-git-repo-on-the-planet/)
* [Beyond GVFS: more details on optimizing Git for large repositories](https://blogs.msdn.microsoft.com/visualstudioalm/2017/05/30/optimizing-git-beyond-gvfs/)
* [Git’er done: SCM system keeps developers and projects on track](http://sdtimes.com/giter-done-scm-system-keeps-developers-projects-track/)
  an SDTimes article

__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt; and
Markus Jansen &lt;<mja@jansen-preisler.de>&gt;
with help from XXX.
