---
title: Git Rev News Edition 62 (April 23rd, 2020)
layout: default
date: 2020-04-23 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 62 (April 23rd, 2020)

Welcome to the 62nd edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of March 2020.

## Discussions

### General

* [Happy birthday to all of us ;-)](https://lore.kernel.org/git/xmqqzhbmpyh6.fsf@gitster.c.googlers.com/)

  On April 7, Junio Hamano, the Git maintainer, sent a happy birthday
  message to the mailing list to celebrate that "it was today 15 years
  ago that Linus announced the availability of the first tarball of
  Git".

  Junio thanked the contributors and everyone in the ecosystem,
  including people from the [Software Freedom Conservancy](https://sfconservancy.org/)
  and employers of contributors.

  His email ended with "Thanks all, and let's look forward to see the
  next 15 years be as wonderful years for Git as the past 15 years
  ;-)"

  A number of people replied especially thanking Junio for his work as
  the maintainer of the project. Edward Thomson, who is a maintainer
  of [libgit2](https://libgit2.org/), also thanked everyone, on behalf
  of libgit2.

  Let's all also thank Junio, Linus and every contributor in the Git
  ecosystem!

<!---
### Reviews
-->

### Support

* [Regression in v2.26.0-rc0 and Magit](https://lore.kernel.org/git/3091652.KAqcNXvZJ4@cayenne/)

  Jean-Noël Avila reported to the mailing list that git version
  2.26.0-rc0 segfaulted under Magit with auto-revert enabled.

  [Magit](https://magit.vc/) is a popular Emacs interface to Git, and
  the [auto-revert mode](https://magit.vc/manual/magit/Automatic-Reverting-of-File_002dVisiting-Buffers.html)
  lets Emacs revert files that have changed on disk when a Git command
  has been run outside of Emacs.

  Jean-Noël had bisected the issue to a commit that was improving the
  error message which Git issues when it dies due to processing a path 
  outside the repository. This commit though didn't consider the
  case of a bare repo which triggered the segfault.

  Jonathan Nieder replied that the bug was fixed by another commit by
  Emily Shaffer that had not yet made it to the master branch. He
  asked Junio Hamano, the Git maintainer, if the commit could be
  fast-tracked, and Emily if she could add a test to her commit.

  Junio replied suggesting that a few tests should be added, and that
  there were a few days left before v2.26.0-rc2 to add them. The next
  day though Junio replied to himself with a patch adding the tests
  and asking for comments.

  Jonathan Nieder reviewed Junio's tests adding his "Reviewed-by:",
  and said that Emily was out of office so they were well timed.

  Junio replied to himself again discussing one test he wrote that
  tested that both `git log -- ..` and `git ls-files -- ..` fail when
  the current working directory is the `.git` directory.

  He wondered why, if "." instead of ".." is used in the above
  commands, Git should behave as if the current working directory was
  the top-level of the working tree instead of `.git`, and why Magit
  is expecting `cd .git && git ls-files ..` to show the entire working
  tree.

  Kyle Meyer replied to Junio that internally Magit's call which
  triggered the bug is running `git ls-files` from `.git` to ask
  whether the file used to edit a commit message is actually tracked,
  as it makes no distinction between files in .git and in the working
  tree. He said that he would propose a change in Magit to improve
  this.

  Gábor Szeder also replied to Junio's patch suggesting a small
  improvement in the tests which Junio accepted sending an improved
  patch.

  The fix with Emily's code and Junio's tests was then merged into
  v2.26.0-rc2.

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
  very badly broken; the engine it uses misplaces branch joins.  The Git
  devs know it's broken but have stuck to it because of an
  incremental-conversion feature that I think is effectively
  useless. They should scrap it and rewrite the CVS import procedure to
  use cvs-fast-export instead.

* What is your favorite Git-related tool/library, outside of Git itself?

  You mean other than the ones I've written myself?  I don't think I
  have one, sorry.

## Releases

+ Git [2.26.2 and others](https://public-inbox.org/git/xmqq4kterq5s.fsf@gitster.c.googlers.com/),
[2.26.1 and others](https://public-inbox.org/git/xmqqy2qy7xn8.fsf@gitster.c.googlers.com/)
+ Git for Windows [2.26.2(1)](https://github.com/git-for-windows/git/releases/tag/v2.26.2.windows.1),
[2.26.1(1)](https://github.com/git-for-windows/git/releases/tag/v2.26.1.windows.1)
+ libgit2 [1.0.0](https://github.com/libgit2/libgit2/releases/tag/v1.0.0)
+ Gerrit Code Review [3.1.4](https://www.gerritcodereview.com/3.1.html#314),
[3.0.8](https://www.gerritcodereview.com/3.0.html#308)
+ GitHub Enterprise [2.20.5](https://enterprise.github.com/releases/2.20.5/notes),
[2.19.11](https://enterprise.github.com/releases/2.19.11/notes),
[2.18.16](https://enterprise.github.com/releases/2.18.16/notes),
[2.17.22](https://enterprise.github.com/releases/2.17.22/notes),
[2.20.4](https://enterprise.github.com/releases/2.20.4/notes),
[2.19.10](https://enterprise.github.com/releases/2.19.10/notes),
[2.18.15](https://enterprise.github.com/releases/2.18.15/notes),
[2.17.21](https://enterprise.github.com/releases/2.17.21/notes)
+ GitLab GitLab [12.10](https://about.gitlab.com/releases/2020/04/22/gitlab-12-10-released/),
[12.9.4](https://about.gitlab.com/releases/2020/04/20/gitlab-12-9-4-released/),
[12.9.3, 12.8.9, and 12.7.9](https://about.gitlab.com/releases/2020/04/14/critical-security-release-gitlab-12-dot-9-dot-3-released/),
[12.9.2](https://about.gitlab.com/releases/2020/03/31/gitlab-12-9-2-released/),
[12.9.1](https://about.gitlab.com/releases/2020/03/26/security-release-12-dot-9-dot-1-released/)
+ Bitbucket Server [7.1](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ GitHub Desktop [2.4.1](https://desktop.github.com/release-notes/),
[2.4.0](https://desktop.github.com/release-notes/)
+ GitKraken [6.6.0](https://support.gitkraken.com/release-notes/current)

## Other News

__Various__

* [Peff interviewed Junio](https://github.blog/2020-04-07-celebrating-15-years-of-git-an-interview-with-git-maintainer-junio-hamano/)
  on the GitHub Blog to celebrate Git’s 15th anniversary.  
  An interview with Git creator Linus Torvalds on Git's 10th anniversary [can be found](https://www.linux.com/news/10-years-git-interview-git-creator-linus-torvalds/)
  in [Git Rev News #2 (April 15th, 2015)](https://git.github.io/rev_news/2015/04/05/edition-2/).
* [Git credential helper vulnerability announced](https://github.blog/2020-04-14-git-credential-helper-vulnerability-announced/)
  by Taylor Blau on GitHub Blog -- please upgrade to [2.26.2](https://public-inbox.org/git/xmqq4kterq5s.fsf@gitster.c.googlers.com/) which fixes the mentioned vulnerability and yet another related vulnerability.
* [GitHub sharply slashes plan pricing, offers core features for free to all](https://arstechnica.com/gadgets/2020/04/github-sharply-slashes-plan-pricing-offers-core-features-for-free-to-all/).
* [GitLab moves 18 features to open source](https://about.gitlab.com/blog/2020/03/30/new-features-to-core/).

__Light reading__

* [GitLab: Our ultimate guide to Git](https://about.gitlab.com/blog/2020/04/20/ultimate-git-guide/).
  Tagline: "Open source pioneer Git is 15 years old. Here is our guide to making the most of it."
* [15 years of Git: How to get started or learn something new](https://opensource.com/article/20/4/get-started-git)
  by Seth Kenlon (Red Hat) on [Opensource.com](https://opensource.com).
* [4 Git scripts I can't live without](https://opensource.com/article/20/4/git-extras)
  by Vince Power on Opensource.com.  The scripts can be found in the [git-extras](https://github.com/tj/git-extras) project.
* [Optimizing Git For Ryzen CPUs (1.5x Faster)](https://docs.keydb.dev/blog/2020/04/08/blog-post/),
  utilizing Intel's SHA-NI instruction set to speed up SHA-1, by John Sully.
* [Create web tutorials with Reveal.js and Git](https://opensource.com/article/20/4/create-web-tutorial-git) by Eric D. Schabell (Red Hat).
* [Using a self-rewriting README powered by GitHub Actions to track TILs (Today I Learneds)](https://simonwillison.net/2020/Apr/20/self-rewriting-readme/)
  by Simon Willison.
* [GitOps - A Security Perspective (Part 1)](https://dev.to/alcide/gitops-a-security-perspective-part-1-16ci)
  by Gadi Naor of Alcide.  [GitOps](https://www.gitops.tech/) is a paradigm that puts Git
  at the heart of building and operating cloud native applications
  by using Git as the single source of truth.
* [Computer Science Visualized: Useful Git Commands](https://dev.to/lydiahallie/cs-visualized-useful-git-commands-37p1)
  by Lydia Hallie.
* [How To Make Life Easier When Using Git](https://www.smashingmagazine.com/make-life-easier-when-using-git/)
  by Shane Hudson.
* [A Beginner’s Guide to Git — What is a Changelog and How to Generate it](https://www.freecodecamp.org/news/a-beginners-guide-to-git-what-is-a-changelog-and-how-to-generate-it/)
  by Gaël Thomas.
* [Setting Up Git Identities](https://www.micah.soy/posts/setting-up-git-identities/) by Micah Henning,
  with use of a Git alias to switch identities.
* [Maintaining Different Git Identities](https://dev.to/maxlmator/maintaining-different-git-identities)
  by Max Kleucker (2018), with help of Git's "[conditional includes](https://git-scm.com/docs/git-config#_conditional_includes)".
* [The phases of remote adaptation](https://about.gitlab.com/company/culture/all-remote/phases-of-remote-adaptation/)
  is a list of phases for teams switching from a colocated environment to a remote one put together by GitLab.

__Git tools and sites__

* [Git Extras](https://github.com/tj/git-extras): shell Git utilities for repo summary, repl, changelog population, author commit percentages and more, by TJ Holowaychuk.
* [Ovid / git-workflow](https://github.com/Ovid/git-workflow) contains a simplified subset of the git tools used by [All Around the World](https://allaroundtheworld.fr/) organization.
* [Dolt](https://github.com/liquidata-inc/dolt) is Git for data, versioning tables: a database with branches.  
  [DoltHub](https://www.dolthub.com/) is a place on the internet to share Dolt repositories.
* [GitFiend](https://gitfiend.com/) by Toby Suggate is a new Git client for Windows, Mac and Linux,
  deliberately not trying to follow in the footsteps of other Git clients.


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Eric S. Raymond, Junio Hamano and Philip Oakley.
