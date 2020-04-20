---
title: Git Rev News Edition 62 (April 22nd, 2020)
layout: default
date: 2020-04-22 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 62 (April 22nd, 2020)

Welcome to the 62nd edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of March 2020.

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

## Developer Spotlight: Eric S. Raymond
* Who are you and what do you do?

  I've been an open-source hacker since long before that term was coined.
  Back around the turn of the century I wrote "The Cathedral and the
  Bazaar", which helped reinvent the movement and gained it mainstream
  acceptance.  I'm also the author of "The Art of Unix
  Programming".  More recently I've headed the
  [GPSD](https://gpsd.gitlab.io/gpsd/index.html) and
  [NTPsec](https://www.ntpsec.org/) projects.  My most Git-relevant work
  is [reposugeon](http://www.catb.org/esr/reposurgeon/).

* You've recently gifted us with an [article about reposurgeon on Git
  Rev News edition 60](https://git.github.io/rev_news/2020/02/19/edition-60/#the-pros-and-cons-of-reposurgeon-written-by-eric-s-raymond),
  is there something you would like to add about reposurgeon,
  its history, or the article?

  Probably the most interesting additional thing I can say is that I
  discovered a fundamental strategy for designing good DSLs
  (Domain-Specific Languages) while working on reposurgeon.

  Here it is: Whatever domain you're trying to capture, first develop
  a way to do that capture in a declarative markup.  Then write an
  editor for that markup, and you will implicitly have a DSL that
  spans the domain.  It's rather like the mathematical concept
  of a functor.

  In reposurgeon's case, the domain is Git repositories and the
  declarative markup is fast-import streams.  Reposurgeon is all
  about exploiting that equivalence.

* You used reposurgeon to migrate the GCC repository, which has about
  280K commits, from SVN to Git. Can you tell us a bit more about the
  context in which such migrations happen. Like what are the timelines,
  goals, tools, people, etc involved in such migrations?

  I've already written about this in some detail
  [here](http://www.catb.org/~esr/reposurgeon/dvcs-migration-guide.html).
  I'm going to be reworking that over the next couple of weeks based in
  part on the GCC experience and in part to reflect the unfortunate
  fact that Mercurial isn't really a contender any more.

  One thing that has been on my mind recently is the importance of
  having a "Mr. Inside".  The ideal team to do a major conversion pairs
  a reposurgeon expert (Mr. Outside) with a project member who knows the
  history of the repository intimately, can make policy decisions, and
  is willing to learn enough about reposurgeon to edit the recipe.

  On GCC we had the ideal situation - the project lead chose to be
  Mr. Inside.  And a good thing, too - this conversion was *difficult*.

* Can you describe how Git is related to reposurgeon, other software you
  have been working on and your work in general?

  Reposurgeon depends on the leverage offered by git fast-import streams.
  It uses them as an interchange format between different version-control
  streams.  Conversely, Reposurgeon (and a front-end I also maintain,
  cvs-fast-export) enables higher-quality migrations from older VCSes
  than anyone has ever been able to do before.

  As for how it relates to my other work, there is
  [cvs-fast-export](http://www.catb.org/esr/cvs-fast-export/).  I didn't
  write the crucial analysis parts of cvs-fast-export myself; Keith
  Packard of X fame did that, it used to be called cvsparse.  I did
  rescue it and give it the ability to emit a fast-import stream,
  because reposurgeon needed a better CVS importer than I could find
  elsewhere.

  More generally, I love writing DSLs and will take pretty much any
  opportunity to do that. I have especially enjoyed inventing and
  working on reposurgeon because - well, I used to be a mathematician.
  I *like* working on things where graph theory and abstract algebra are
  important.  Reposurgeon scratches that itch.

* What is something about Git or its ecosystem that you admire?

  How freaking *comprehensive* it is.  Pretty much anything you can
  imagine wanting to do with a version-control history there is tool
  support for somewhere.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  That's easy. I'd port it to Go and toss out the C code. C still has
  its uses, but for anything without hard latency requirements C is now
  obsolete.  Not something I would have said even three years ago, but
  times change.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  There's a weird feature I've forgotten the name of where you can pass
  around binary pack files rather than MRs or patches.  Ah, git bundles,
  that's it.  Having worked with it once, I hate the lack of
  transparency, that you can't easily eyeball a bundle before you apply
  it.  I'd shoot that feature through the head in a heartbeat.

  If I pick one thing to *fix* rather than remove without worrying about
  backwards compatibility, it would be git-cvsimport.  That thing is
  very badly broken; the engine it uses misplaces branch joins.  The git
  devs know it's broken but have stuck to it because of an
  incremental-conversion feature that I think is effectively
  useless. They should scrap it and rewrite the CVS import procedure to
  use cvs-fast-export instead.

* What is your favorite Git-related tool/library, outside of Git itself?

  You mean other than the ones I've written myself?  I don't think I
  have one, sorry.

## Releases


## Other News

__Various__


__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
