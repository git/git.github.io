---
title: Git Rev News Edition 127 (September 30th, 2025)
layout: default
date: 2025-09-30 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 127 (September 30th, 2025)

Welcome to the 127th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of August and September 2025.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

<!---
### Support
-->

## Developer Spotlight: Toon Claes

* **Who are you and what do you do?**

  I'm Toon from Belgium. My name is pronounced like "tone" (rhymes with
  "bone"), and not like the "toon" in "cartoon", but usually I'm already
  happy if people remember my name 😉

  I'm employed by GitLab for more than 8 years, and since late 2024 I've
  been part of the Git team, contributing to the Git project. I've started
  my professional career in 2008 building software for a payment terminal
  running embedded GNU/Linux using C & C++. Later I've transitioned into
  doing web and mobile development for a while. And now recently, I've
  been circling back to more lower-level programming, contributing to Git
  using C.

* **What would you name your most important contribution to Git?**

  I'm fairly new in the Git community, but recently I've been working on
  adding [`git last-modified`(1)](https://git.github.io/htmldocs/git-last-modified.html).
  It's a sub-command that will be released in Git v2.52. This command
  finds the commit that last modified each path in a tree. This can
  be used on forges (like GitLab, GitHub, Codeberg), to show commit
  data in a tree view.

* **What are you doing on the Git project these days, and why?**

  The subcommand [`git last-modified`(1)](https://git.github.io/htmldocs/git-last-modified.html)
  was recently merged in the 'master'. But there's more work to be
  done to improve it's performance.

* **If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?**

  Once data is committed to Git, and it's made part of the history (i.e.
  committed or merged into the default branch), it's trapped forever. This
  is a core principle of Git: you cannot rewrite history without changing
  commit hashes. This is very powerful, but also problematic in some
  scenarios.

  For example, at my $DAYJOB we receive commonly the request from
  customers to remove confidential or sensitive information from a Git
  repository. This is not possible without rewriting history. Or when, by
  accident, large files are committed to Git, you cannot get them out
  (without rewriting history). Or people might want to remove/change
  their personal information in a repository, for example when they
  transition genders.

  Can we (and should we?) build something that removes and overwrites
  pieces of history, without changing commit hashes? It's a slippery
  slope, because from experience I know Git users are very creative and
  might use this feature in ways that were not intended for.

* **If you could remove something from Git without worrying about
  backwards compatibility, what would it be?**

  The use of the double `..` and triple `...` dot notation in
  [`gitrevisions(7)`](https://git-scm.com/docs/gitrevisions#_dotted_range_notations)
  and `git diff(1)`. I even once ranted about it in [a video](https://www.youtube.com/watch?v=phThP8DwJVs).

* **What is your favorite Git-related tool/library, outside of
  Git itself?**

  I'm a big fan of [Magit][1]. It's arguably the best tool to interact
  with Git and I also learned a lot from it. I consider myself an
  advanced Git user, but I wouldn't be able to split up changes in
  several commits without [Magit][1].

[1]: https://magit.vc/

* **Do you happen to have any memorable experience w.r.t. contributing
  to the Git project? If yes, could you share it with us?**

  One of my earliest contributions to Git was a bug fix in the code used
  by `git bundle create`. We noticed sometimes references didn't end up in
  the bundle. After a lot of digging I submitted a patch that removed
  about 30 lines of code written way back in 2007. The code from 2007,
  caused references to be skipped if they were modified while the
  `git bundle create` process is running. But it wasn't needed anymore
  due some changes made in 2013, although no one ever realized that.
  You can read more about it [in the patch][2].

  It was really satisfying to submit a patch that was nothing more than
  code deletion of really old code (and adding some tests). And it taught
  me to write a good commit message, which I was praised for by
  [the maintainer][3]. It was a very nice experience as a newcomer in the
  community.

[2]: https://lore.kernel.org/git/20241211-fix-bundle-create-race-v3-1-0587f6f9db1b@iotcl.com/
[3]: https://lore.kernel.org/git/xmqqzfl4l22t.fsf@gitster.g/

* **What is your toolbox for interacting with the mailing list and for
  development of Git?**

  I mostly live in Emacs and my terminal (zsh). I consume email in Emacs
  using [notmuch][4]. To submit patches I use [b4][5], which I also
  sometimes use to pull in patches. But I also sometimes pull in
  the branches from [Junio's fork][6] or the fork shared across
  my colleagues.

  In Git, I compile and unit test changes using Meson. It's use was
  introduced in the Git project around the [end of 2024][7]. It's
  reliable, because it prevents me from forgetting to recompile
  before running tests; it's fast, because it parallelizes compilation
  by default and automatically [uses Ccache][8]; it allows out-of-tree
  builds, which is really convenient if you want to benchmark various
  revisions of Git.

[4]: https://notmuchmail.org/doc/latest/notmuch-emacs.html
[5]: https://github.com/mricon/b4
[6]: https://github.com/gitster/git
[7]: https://lore.kernel.org/git/20241206-pks-meson-v11-0-525ed4792b88@pks.im/
[8]: https://mesonbuild.com/Feature-autodetection.html#ccache

* **What is your advice for people who want to start Git development?
  Where and how should they start?**

  Learn to navigate [the mailing list archive][9]. It lacks structure so
  things can be hard to find, but there's so much information up there. If
  you're interested in a topic, or you think you've found the bug, start digging.
  Use [`git blame(1)`][10] to find the commit that introduced the changes
  and look up the conversation around it in the mailing list archive.
  This will help you understand why some decisions are made. Also it
  familiarizes you with the people in the community, how they think,
  how they communicate, and what's expected from you. Having the
  knowledge from those conversations can help you build a strong case
  whenever you're submitting a feature change or bug fix.

[9]: https://lore.kernel.org/git
[10]: https://git-scm.com/docs/git-blame


## Other News

__Various__


__Light reading__

<!---
__Easy watching__
-->

__Git tools and sites__


## Releases


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
