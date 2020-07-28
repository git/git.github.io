---
title: Git Rev News Edition 65 (July 29th, 2020)
layout: default
date: 2020-07-29 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 65 (July 29th, 2020)

Welcome to the 65th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of June 2020.

## Discussions

### General

* The history of `master` in Git (*written by Andrew Ardill*)
  
  Admidst [all the discussion](https://lore.kernel.org/git/CAOAHyQwyXC1Z3v7BZAC+Bq6JBaM7FvBenA-1fcqeDV==apdWDg@mail.gmail.com/)
  around changing the default branch from `master` to something else,
  many people have asked why `master` was chosen in the first place.
  As master has a few different meanings in English, just which
  meaning was intended?
  
  [Konstantin Ryabitsev](https://lore.kernel.org/git/20200504174548.r3zaftqcq52yhd2u@chatter.i7.local/)
  was the first to discuss the meaning of `master`, saying
  > Git doesn't use "master-slave" terminology -- the "master" comes
  from the concept of having a "master" from which copies (branches) are made
  
  [This post from the GNOME mailing list](https://mail.gnome.org/archives/desktop-devel-list/2019-May/msg00066.html)
  was then [linked by Simon Pieters](https://lore.kernel.org/git/CAOAHyQx=+fM1FpAv+g3M+j7j4MgLJA03=MGFmXLvZcfJKAEpGg@mail.gmail.com/)
  with the claim that
  > Git's `master` is in fact a reference to master/slave
  
  That post points out that the first use of `master` was in
  [a CVS helper script](https://github.com/git/git/commit/3e91311ae750af9bf2e3517b1e701288ac3066b9),
  links that to BitKeeper (the version control system used to manage
  Linux development when Linus Torvalds first wrote Git), and claims
  BitKeeper used the "master and slave" meaning of master.
  
  Many people considered `master` to mean a "master copy", so this
  connection to slavery was very surprising.
  
  [Andrew Ardill investigated the BitKeeper source code](https://lore.kernel.org/git/a34e4244-835e-976a-8fb4-7fc766d100bd@gmail.com/T/#m9589009ba3b6663ca38c2ef19c18c933e46c253a)
  and came to the conclusion that "the overwhelming majority of
  \[the usages of master in BitKeeper\] are of the "Master Copy"
  variant", or as [Michal Suchánek said](https://lore.kernel.org/git/20200616085004.GB21462@kitsune.suse.cz/)
  "even in BitKeeper the use of master/slave is the exception rather
  than the norm."
  
  Off the list discussions were ongoing, and
  [Petr Baudis wrote on twitter about naming the `master` branch in Git](https://twitter.com/xpasky/status/1271477451756056577)
  > I picked the names "master" (and "origin") in the early Git tooling back in 2005.
  >
  > (this probably means you shouldn't give much weight to my name preferences :) )
  >
  > I have wished many times I would have named them "main" (and "upstream") instead.
  >
  > Glad it's happenning @natfriedman
  
  Asked which meaning of master was intended,
  [Petr replied](https://twitter.com/xpasky/status/1272280760280637441)
  > "master" as in e.g. "master recording". Perhaps you could say the
  original, but viewed from the production process perspective.
  >
  > A clueless Central European youngster whose command of English
  was mostly illusory came up with the term, which is why it isn't
  very obvious...
  
  In [a follow-up to that original GNOME mailing list post](https://mail.gnome.org/archives/desktop-devel-list/2020-June/msg00023.html),
  Bastien Nocera retracted their claims from the original post, saying
  > I emailed Linus Torvalds recently... and he told me that it was
  unlikely that the "Git master" branch name was influenced by
  BitKeeper, and that "master" was "fairly standard naming" for this
  sort of thing and "more likely to be influenced by the
  CVS master repository"
  
  Going on, Bastien discusses Petr Baudis' tweets and then concludes
  "it doesn't matter where the name comes from... The fact that it has
  bad connotations, or inspires dread for individuals and whole
  communities, is reason enough to change it."
  
  This is something that
  [Brian M. Carlson had also pointed out on the Git mailing list](https://lore.kernel.org/git/20200505231641.GH6530@camp.crustytoothpaste.net/),
  saying
  > "master", even though from a different origin, brings the idea of
  human bondage and suffering to mind for a non-trivial number of
  people, which of course was not the intention and is undesirable.
  I suspect if we were making the decision today, we'd pick another
  name, since that's not what we want people to think of when they use Git.
  
  Brian goes on to lay out changes required in Git to rename `master`
  as the default, suggesting that there is a decent amount of work and
  that due to compatibility concerns "we'd probably want to make it in
  a \[Git version\] 3.0".
  
  Around the web the discussion about renaming `master` continues.
  The incorrect claims around the history of `master` persist, even in
  our own [Git Rev News: Edition 64](https://git.github.io/rev_news/2020/06/25/edition-64/#other-news),
  but seem to be quickly corrected where possible such as on
  [GitLab's discussion on the topic](https://gitlab.com/gitlab-org/gitlab/-/issues/221164#note_372560473).
  
### Reviews

* [More commit-graph/Bloom filter improvements](https://lore.kernel.org/git/pull.659.git.1592252093.gitgitgadget@gmail.com/)

  Derrick Stolee, who prefers to be called Stolee, sent a patch series
  to the mailing list, based on a
  [previous experimental patch series](https://lore.kernel.org/git/20200529085038.26008-1-szeder.dev@gmail.com/)
  sent a few weeks earlier by Gábor Szeder.

  When he sent his patch series, Gábor said that his work was a proof
  of concept started more than a year ago, that he had no time to
  finish until recently. He was motivated to finish it when he
  recently took a look at the current bloom filter
  implementation. This implementation was developed for a long time
  mainly by Garima Singh and was merged at the beginning of May. He
  saw that it had some of the same issues that he had stumbled upon,
  and that it missed some optimization opportunities.

  Gábor listed a lot of very interesting benefits from his work, but
  also a lot of drawbacks that would prevent it from being merged as
  is. Many reviewers like Stolee, Taylor Blau, Johannes Schindelin and
  Junio Hamano, were disapointed that Gábor was not trying to
  contribute to the current implementation. It looked like though that
  a number of Gábor's 34 patches and ideas could be applied on top of
  the current implementation.

  That's what Stolee did by first sending
  [10 patches from Gábor's series](https://lore.kernel.org/git/pull.650.git.1591362032.gitgitgadget@gmail.com/)
  at the beginning of June. This patches series required a bit of
  work, but Stolee left out what would have been more difficult to
  apply to the current code. René Scharfe, Stolee, Gábor and Junio
  commented a bit on it, but didn't found anything that would require
  a new version of this patch series. So it is now "cooking" in the
  'next' branch.

  Stolee's next patch series called
  ["More commit-graph/Bloom filter improvements"](https://lore.kernel.org/git/pull.659.git.1592252093.gitgitgadget@gmail.com/)
  was about adding a few extra improvements, several of which are
  rooted in Gábor's original series, even though Gábor's patches did
  not apply or cherry-pick at all. Stolee still credited Gábor as the
  author of 4 patches out of 8.

  Anyway this new series contained 2 changes that improve the
  false-positive rate which significantly increase performance, and
  one change that improves usability. René and Taylor
  suggested improvements and bug fixes. Taylor even sent a patch.

  Stolee then sent [a version 2](https://lore.kernel.org/git/pull.659.v2.git.1592934430.gitgitgadget@gmail.com/)
  of the series, taking into account the feedback and adding the patch
  from Taylor to the series. René, Gábor, Junio and Stolee discussed a
  few more points.

  That led to Stolee sending
  [a version 3](https://lore.kernel.org/git/pull.659.v3.git.1593174636.gitgitgadget@gmail.com/)
  in which Gábor reported a bug that Stolee subsequently fixed.

  So Stolee sent
  [a version 4](https://lore.kernel.org/git/pull.659.v4.git.1593610050.gitgitgadget@gmail.com/)
  which is now cooking in the 'next' branch, along with the first
  batch that has 10 patches from Gábor. Hopefully both will be merged
  in the 'master' branch after the release of Git 2.28.0 which should
  happen soon.

<!---
### Support
-->

## Developer Spotlight: Jonathan Tan

* Who are you and what do you do?

  I'm a Software Engineer at Google who works on Git. I also contribute
  to [JGit](https://www.eclipse.org/jgit/) (a Java implementation of Git) as one of its committers.

* What would you name your most important contribution to Git?

  I would say "[partial clone](https://git-scm.com/docs/partial-clone)" - the
  ability to clone a repository, but not necessarily have all of
  that repository's objects (accumulated throughout its history) in
  your clone. Quite a few articles have been written about it, but in
  summary, it improves Git performance especially for large repositories.

* What are you doing on the Git project these days, and why?

  The thing that immediately comes to mind is "partial clone".  The
  fundamentals are there, but some Git commands still operate under the
  assumption that objects are only a disk read away (instead of a
  network fetch - in a partial clone, if an object is needed but
  missing, it is automatically fetched). I'm improving those commands to
  be more cognizant of this fact - typically, this means batching the
  fetch of all the objects it will need once it realizes that it does
  not have some of them, instead of "I need this object, so go fetch it;
  OK let me process it; oops I need another one, so go fetch that".

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  Along the lines of "partial clone" and large repositories, I would
  like them to investigate the feasibility of having Git servers be able
  to serve results of computations (thus, not just objects). One case is
  `git blame` - if a Git client could ask a Git server to send the
  results of such a command, it could offload most of the computation to
  the server, only needing to build upon the server's results with the
  locally-created objects that the server does not know about. This is
  especially useful with partial clone, because the client does not even
  have most of the objects needed and would have to fetch them
  otherwise.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  One small thing that I can think of: remove the ability of `git reset`
  to update the working tree and the objects staged in the index. The
  [`git restore`](https://git-scm.com/docs/git-restore) command,
  relatively recently introduced, does this with more beginner-friendly
  parameter names (`--worktree` and `--staged`, respectively, instead of
  the `--hard`, `--mixed`, and `--soft` of `git reset`). This change
  would make it easier, for example, to read scripts written by other
  people - I would no longer need to think so much about what that
  `reset` in the script would do.

## Releases

+ Git [2.28.0-rc2](https://public-inbox.org/git/xmqqblk75uel.fsf@gitster.c.googlers.com/),
[2.28.0-rc1](https://public-inbox.org/git/xmqqv9ildh46.fsf@gitster.c.googlers.com/),
[2.28.0-rc0](https://public-inbox.org/git/xmqqh7ugwen6.fsf@gitster.c.googlers.com/)
+ Git for Windows [2.28.0-rc2](https://public-inbox.org/git/20200722195905.6540-1-johannes.schindelin@gmx.de),
[2.28.0-rc1](https://public-inbox.org/git/20200718011007.6808-1-johannes.schindelin@gmx.de),
[2.28.0-rc0](https://public-inbox.org/git/20200710135935.6416-1-johannes.schindelin@gmx.de)
+ Bitbucket Server [7.4](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ Gerrit Code Review [3.1.8](https://www.gerritcodereview.com/3.1.html#318),
[3.0.12](https://www.gerritcodereview.com/3.0.html#3012),
[2.16.22](https://www.gerritcodereview.com/2.16.html#21622)
+ GitHub Enterprise [2.21.3](https://enterprise.github.com/releases/2.21.3/notes),
[2.20.12](https://enterprise.github.com/releases/2.20.12/notes),
[2.19.18](https://enterprise.github.com/releases/2.19.18/notes),
[2.18.23](https://enterprise.github.com/releases/2.18.23/notes),
[2.21.2](https://enterprise.github.com/releases/2.21.2/notes),
[2.20.11](https://enterprise.github.com/releases/2.20.11/notes),
[2.19.17](https://enterprise.github.com/releases/2.19.17/notes),
[2.18.22](https://enterprise.github.com/releases/2.18.22/notes)
+ GitLab [13.1.5](https://about.gitlab.com/releases/2020/07/24/gitlab-13-1-5-released/),
[13.2.1](https://about.gitlab.com/releases/2020/07/24/gitlab-13-2-1-released/),
[13.2](https://about.gitlab.com/releases/2020/07/22/gitlab-13-2-released/),
[13.0.10](https://about.gitlab.com/releases/2020/07/09/gitlab-13-0-10-released/),
[13.1.4](https://about.gitlab.com/releases/2020/07/09/gitlab-13-1-4-released/),
[13.1.3, 13.0.9 and 12.10.14](https://about.gitlab.com/releases/2020/07/06/critical-security-release-gitlab-13-1-3-released/),
[13.1.2, 13.0.8 and 12.10.13](https://about.gitlab.com/releases/2020/07/01/security-release-13-1-2-release/)
+ GitKraken [7.1.0](https://support.gitkraken.com/release-notes/current)
+ GitHub Desktop [2.5.3](https://desktop.github.com/release-notes/)

## Other News

__Various__

* Carmen Andoh, who works for Google, and Jonathan Nieder’s team at
  Google have volunteered to organize a
  [Git Inclusion Summit](https://lore.kernel.org/git/CA+TwhoKBYwUKmtQTyiocPWJD=KeZQryS+6Q8JKxKgLEy0qJwAw@mail.gmail.com/).
  It would be a virtual contributor summit with the purpose of
  engaging core Git contributors as active participants in diversity
  and inclusion initiatives for the Git project. Interested Git
  contributors can vote on their preferred summit duration and times
  on [a whenisgood pool](http://whenisgood.net/9z2diyy) by Thursday,
  July 30th.

* Junio Hamano, the Git maintainer, has renamed the `pu` branch of
  git.git to `seen`. This has been done to use a more meaningful name
  and make room for topics from those contributors whose two-letter
  name abbreviation needs to be 'pu'. This was announced in
  "[What's cooking in git.git (Jun 2020, #04; Mon, 22)](https://public-inbox.org/git/xmqqimfid2l1.fsf@gitster.c.googlers.com)"

* The Git Project Leadership Committee has been briefly interviewed by
  email by [Elizabeth Landau](https://en.wikipedia.org/wiki/Elizabeth_Landau)
  for an [article](https://www.wired.com/story/tech-confronts-use-labels-master-slave/)
  in [Wired](https://www.wired.com/) about current changes to Git's
  default name for the initial branch.

__Light reading__

* [Git Rebase - A Complete Guide](https://www.alchemists.io/articles/git_rebase) by Brooke Kuhlmann at Alchemists.

__Git tools and sites__

* [Git Lint](https://www.alchemists.io/projects/git-lint) - A command line interface for analyzing Git commit quality and consistency for yourself and/or team. Can be used as a Git Hook and/or wired into your continuous integration build system.

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Andrew Ardill, Jonathan Tan,
Brooke Kuhlmann and Eric Sunshine.
