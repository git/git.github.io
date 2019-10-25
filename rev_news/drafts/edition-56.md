---
title: Git Rev News Edition 56 (October 26th, 2019)
layout: default
date: 2019-10-26 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 56 (October 26th, 2019)

Welcome to the 56th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of September 2019.

## Discussions

### General

* [Growing the Git community](https://public-inbox.org/git/b6835484-62a4-6f89-b6b1-f43afe794272@iee.email/)

  Derrick Stolee, who prefers to be called Stolee, emailed the mailing
  list after the Virtual Contributor Summit (see [previous edition](/rev_news/2019/09/25/edition-55/#general))
  saying he wanted to further discuss some ideas, that had been shared
  during the Summit, about "Inclusion & Diversity" with the goal of
  making the community more welcoming to new contributors of all
  kinds.

  He listed some possible problems that could prevent new contributors
  entering the community:

  1. Discovering how to contribute to Git is non-obvious.

  2. Submitting to a mailing list is a new experience for most
     developers. This includes the full review and discussion
     process.

  3. The high standards for patch quality are intimidating to new
     contributors.

  4. Some people do not feel comfortable engaging in a community
     without a clear Code of Conduct. This discomfort is significant
     and based on real experiences throughout society.

  5. Since Git development happens in a different place than where
     users acquire the end product, some are not aware that they can
     contribute.

  Then Stolee proposed actions to address the problems:

  1. Improve the documentation for contributing to Git.

  2. Add more pointers to GitGitGadget.

  3. Introduce a new "mentors" mailing list.

  4. Add an official Code of Conduct.

  5. Advertise that Git wants new contributors.

  Each action was explained and justified, sometimes pointing to interesting research like the recent paper
  [""We Don't Do That Here": How Collaborative Editing With Mentors Improves Engagement in Social Q&A Communities"](http://www.chrisparnin.me/pdf/chi18.pdf).

  Stolee also proposed some metrics to be measured between releases to
  monitor how the community are doing:

  1. How many first-time contributors sent a patch?

  2. How many contributors had their first commit accepted into
     the release?

  3. How many contributors started reviewing?

  4. How many total patches/reviews did the list receive?

  His email was very detailed with many suggestions about how to
  implement the actions, and he asked interesting questions to gather
  peoples' opinion.

  Denton Liu replied to Stolee sharing some thoughts as a "relatively
  new contributor (just less than a year)". He said that from his
  experience to get more contributors, we should try to answer the
  "how do we make it more fun to contribute to Git?" question.

  He recalled that most of his time learning to contribute to Git
  "stemmed from the fact that there's a lot of tribal knowledge that's
  not really written down anywhere".

  As Stolee had mentioned
  [the "My First Contribution" document](https://git-scm.com/docs/MyFirstContribution),
  which was recently contributed by Emily Shaffer, Denton said that it
  would have really helped him get started.

  Denton also suggested improving transparency about what happens to
  patches sent to the mailing list.

  Mike Hommey replied to Stolee suggesting an additional problem which
  is that newcomers don't really have any idea what they could
  contribute.

  Johannes Schindelin, alias Dscho, replied to Mike that newcomers
  need experienced developers to validate the ideas they would like
  to implement in Git, before they can be confident enough to work on
  them. And they also need to be shown ideas they could
  implement. Dscho then talked about
  [the GitGitGadget issue list](https://github.com/gitgitgadget/git/issues) which is open and
  "intended to accumulate possible project ideas". Dscho also
  acknowledged [the Chromium Git issue list](https://crbug.com/git) which is another issue tracker
  with a similar purpose.

  Replying to Stolee, Jeff King, alias Peff, who is responsible for
  [the main Git web site](https://git-scm.com), suggested improving
  [the community page](https://git-scm.com/community) to add more
  information for beginners. He said he was open to accepting patches
  or [pull requests](https://github.com/git/git-scm.com).

  Elijah Newren mostly agreed with Stolee's email, but suggested a
  less strongly worded tone when talking about goals and existing
  problems.

  Junio Hamano, the Git maintainer, replied to Stolee about the goal
  of the project and the metrics that we could use with the following:

  > We first should make sure that we serve existing users and
  > existing community members well. So well that other people who
  > are not yet our "existing" users and members would want to become
  > part of us, in order to join the fun and share the benefit. If we
  > cannot serve even the existing members well, we shouldn't be
  > talking about acquiring new members.

  He then proposed to measure "community-member happiness" with metrics
  like "This many percent of total community member population have
  been active this month".

  The discussion involved a number of other Git developers like Jakub
  Narębski, Emily Shaffer, Garima Singh, Pierre Tardy, Philip Oakley
  and Randall S. Becker.

  A number of people commented especially on the subject of adding an
  official Code of Conduct, which will be reported on in a separate
  article below.

  Otherwise it remains to be seen if many actions will be taken to
  make the project more welcoming to new contributors.

* [[PATCH] add a Code of Conduct document](https://public-inbox.org/git/20190924064454.GA30419@sigill.intra.peff.net/)

  Following the Virtual Contributor Summit (see [previous edition](/rev_news/2019/09/25/edition-55/#general)) and
  the discussions about growing the Git community (see the article
  above), Jeff King, alias Peff, decided to send a patch to add a code
  of conduct.

  In his patch he says that "it may be a good time to cement our
  expectations when things are quiet, since it gives everybody some
  distance rather than focusing on a current contentious issue". Many
  people indeed agreed in the previous discussions with that point of
  view, and the idea of a Code of Conduct in the first place.

  Peff says that his patch adapts the Contributor Covenant Code of
  Conduct from
  [https://www.contributor-covenant.org/version/1/4/code-of-conduct.html](https://www.contributor-covenant.org/version/1/4/code-of-conduct.html)
  and that "it's also the same document used by the Git for Windows
  project".

  One of the changes is that for dealing with community issues, the
  document spreads the responsibility to the Project Leadership
  Committee (git@sfconservancy.org) instead of the only maintainer,
  Junio C Hamano.

  Peff also mentioned [a commit](https://github.com/mhagger/git/commit/c6e6196be8fab3d48b12c4e42eceae6937538dee)
  by Michael Haggerty from June 2013 that he found in a previous
  discussion and that has nice set of guidelines about how to review
  code.

  A number of the replies were about the Project Leadership Committee
  as it's not easy to know who is part of it. This was acknowledged by
  Peff who sent
  [a follow-up patch](https://public-inbox.org/git/20190926072046.GB20653@sigill.intra.peff.net/)
  to address the issue by listing the Project Leadership Committee
  members with their email addresses and by saying that they can also
  be contacted individually.

  Even though there was some disagreement, in general most of the people
  taking part in the discussion agreed with Peff's patches. Junio
  later sent a
  [follow-up email](https://public-inbox.org/git/xmqqd0f6n5a4.fsf_-_@gitster-ct.c.googlers.com/)
  with the subject "Raise your hand to Ack jk/code-of-conduct if your
  Ack fell thru cracks" to get more developers to formally agree with the
  final patch, which then several did.

  The commit adding the Code of Conduct has since been merged into the
  master branch.

<!---
### Reviews
-->

<!---
### Support
-->

<!---
## Developer Spotlight:
-->

## Releases

+ Git [2.24.0-rc0](https://public-inbox.org/git/xmqq4l065zx5.fsf@gitster-ct.c.googlers.com/)
+ Git for Windows [2.24.0-rc0](https://public-inbox.org/git/nycvar.QRO.7.76.6.1910220004190.46@tvgsbejvaqbjf.bet/)
+ GitHub Enterprise [2.18.4](https://enterprise.github.com/releases/2.18.4/notes),
[2.17.10](https://enterprise.github.com/releases/2.17.10/notes),
[2.16.19](https://enterprise.github.com/releases/2.16.19/notes),
[2.15.24](https://enterprise.github.com/releases/2.15.24/notes),
[2.18.3](https://enterprise.github.com/releases/2.18.3/notes),
[2.17.9](https://enterprise.github.com/releases/2.17.9/notes),
[2.16.18](https://enterprise.github.com/releases/2.16.18/notes),
[2.15.23](https://enterprise.github.com/releases/2.15.23/notes)
+ GitLab [12.4](https://about.gitlab.com/blog/2019/10/22/gitlab-12-4-released/),
[12.3.5, 12.2.8, and 12.1.14](https://about.gitlab.com/blog/2019/10/07/security-release-gitlab-12-dot-3-dot-5-released/),
[12.3.4](https://about.gitlab.com/blog/2019/10/03/gitlab-12-dot-3-dot-4-released/),
[12.3.3, 12.2.7, and 12.1.13](https://about.gitlab.com/blog/2019/10/02/security-release-gitlab-12-dot-3-dot-3-released/),
[12.3.2, 12.2.6, and 12.1.12](https://about.gitlab.com/blog/2019/09/30/security-release-gitlab-12-dot-3-dot-2-released/),
[12.3.1](https://about.gitlab.com/blog/2019/09/24/gitlab-12-3-1-released/),
[12.3](https://about.gitlab.com/blog/2019/09/22/gitlab-12-3-released/)
+ Bitbucket Server [6.7](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ Gerrit Code Review [3.0.3](https://www.gerritcodereview.com/3.0.html#303)
+ GitKraken [6.3.0](https://support.gitkraken.com/release-notes/current),
[6.2.1](https://support.gitkraken.com/release-notes/current)
+ GitHub Desktop [2.2.1](https://desktop.github.com/release-notes/),
[2.2.0](https://desktop.github.com/release-notes/)

## Other News

__Various__

* A new maintainer for Git-Gui, Pratyush Yadav (@prati0100),
  [came forward](https://public-inbox.org/git/xmqq7e655ryx.fsf@gitster-ct.c.googlers.com/).
  Let's praise and thank him for volunteering.
* The Gerrit User Summit 2019 is going to be [broadcasted on live.gerritforge.com](https://live.gerritforge.com) and will
  include talks about JGit and Gerrit Code Review, including major members of the Git Community, like Jonathan Nieder and Terry Parker.

__Light reading__

* [Commit graph drawing algorithms](https://pvigier.github.io/2019/05/06/commit-graph-drawing-algorithms.html)
  by pvigier (Pierre Vigier), describes algorithms used by various
  tools including one in pvigier's prototype git client called [gitamine](https://github.com/pvigier/gitamine).

* [Git Pathspecs and How to Use Them](https://css-tricks.com/git-pathspecs-and-how-to-use-them/)
  by Adam Giese.

* [GitHub Actions, the missing notes: CMake, Qt and IFW](https://skypjack.github.io/2019-10-23-gh-greets-qt/)
  by Michele 'skypjack' Caini, shows how he uses [GitHub Actions](https://github.com/features/actions)
  in his project.  (GitHub Actions, still in public beta, were first
  covered in [Git Rev News #44](https://git.github.io/rev_news/2018/10/24/edition-44/))

* [An Unintentionally Comprehensive Introduction to GitHub Actions CI](https://dev.to/bnb/an-unintentionally-comprehensive-introduction-to-github-actions-ci-blm)
  by Tierney Cyren -- with example of an application build on top of
  Node.js.

* [Scheduling Jekyll posts with Netlify and GitHub Actions](https://humanwhocodes.com/blog/2019/10/scheduling-jekyll-posts-netlify-github-actions/)
  by Nicholas C. Zakas on his Human Who Codes blog: using a GitHub
  Action cron job to schedule Netlify builds for static site generated
  blog posts (which was previously done [using Netlify and AWS Lambda](https://humanwhocodes.com/blog/2018/03/scheduling-jekyll-posts-netlify/)).

* ["git request-pull" and confusing diffstats [LWN.net]](https://lwn.net/Articles/802797/)
  by Jonathan Corbet talks about what to do if the history to be
  pulled includes merges from outside (e.g. to obtain the dependencies
  for a fix), and why it happens.

* [How Bash completion works](https://tuzz.tech/blog/how-bash-completion-works) and
  [Adding Bash completion to my tool](https://tuzz.tech/blog/adding-bash-completion)
  by Chris Patuzzo; Git's Bash completion can be found in
  [`contrib/completion/git-completion.bash`](https://github.com/git/git/blob/master/contrib/completion/git-completion.bash).


__Git tools and sites__

* [Gollum](https://github.com/gollum/gollum) is a simple, Git-powered
  wiki written in Ruby with a sweet API and local frontend.
* [git_examples.sh](https://bitbucket.org/BitPusher16/dotfiles/raw/49a01d929dcaebcca68bbb1859b4ac1aea93b073/refs/git/git_examples.sh)
  -- 99% of the Git commands you'll need at work,
  demonstrated in a single script.

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Gabriel Alcaras &lt;<gabriel.alcaras@telecom-paristech.fr>&gt;
with help from Emily Shaffer, Luca Milanesio and George Espinoza.
