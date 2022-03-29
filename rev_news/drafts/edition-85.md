---
title: Git Rev News Edition 85 (March 30th, 2022)
layout: default
date: 2022-03-30 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 85 (March 30th, 2022)

Welcome to the 85th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of February 2022.

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


## Developer Spotlight: Victoria Dye

* Who are you and what do you do?

  Hi! My name is Victoria Dye, and I work as a software developer at GitHub. I
  spend a lot of my time contributing to Git & some of its downstream forks
  (Git for Windows and `microsoft/git`), and _occasionally_ Git Credential
  Manager (although it's been a while). I really enjoy solving tough
  performance problems in software, so I'm hoping to do more of that in Git in
  the not-so-distant future!

* What would you name your most important contribution to Git?

  I haven't been contributing to Git for all that long, so it's hard to judge
  the importance of anything I've done. That said, I'm pretty proud of the
  work I've done around sparse index and `sparse-checkout`. It's been exciting
  to contribute and see those features mature so rapidly over the past couple
  months, and I hope it continues to gain traction with users looking for
  better performance in Git!

* What are you doing on the Git project these days, and why?

  My focus pretty much since I started working on Git has been on integrating
  commands with sparse index. Most recently that's been `git stash`, which not
  only requires its own integration, but also the integration of all the
  commands it shells out to (`update-index`, `read-tree`, etc.). The goal of
  these initial sparse index integrations (including those by Derrick Stolee &
  Lessley Dennington) is to cover the most popular commands as reported by
  users at $DAYJOB (`git add`, `git reset`, etc.), so the theoretical
  performance gains of the sparse index can turn into a real improvement to
  user experience.

  Beyond my own work, I'm looking forward to mentoring a GSoC contributor in
  _more_ sparse index integration! It's an admittedly complicated topic, but -
  based on my own experience - working on it can give new contributors an
  incredible depth of knowledge in Git that's hard to get elsewhere. Plus, I
  love mentoring developers and creating a positive environment for them, so
  I'm excited to have the chance to do that here!

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  It would be great to see the shell script-based test suite rewritten into a
  unit/integration/end-to-end testing stack. The tests we have are almost
  exclusively end-to-end (excepting hackery with `test-tool` or `trace2` logs
  exposing internal functions to test them), so we often have incomplete
  coverage of some of the trickier code paths (e.g., `unpack_trees`). And,
  especially for developers that like test-driven development, it can be a
  _lot_ easier working with code that has a robust unit testing suite.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  In general, I don't think there's a _feature_ that I'd want to completely
  remove. Git is a fantastic tool in that it lets developers structure their
  work in whatever way works best for them; something I personally don't have
  a great experience with (looking at you, _submodules_) might just happen to
  be someone else's favorite tool.

  However, I would absolutely remove an implementation pattern in Git itself:
  shell script builtins and Git commands shelling out to other Git commands.
  They're prone to bugs, difficult to troubleshoot, and can almost always be
  implemented more efficiently by commonizing the code they're trying to get
  out of another command.

* What is your favorite Git-related tool/library, outside of Git itself?

  I really, really like my current setup of VSCode +
  [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens).
  I used to have a bit of a "text editor is for editing text, Git command line
  is for source control" attitude and avoided using any integrations between
  the two, but recently I gave in and installed GitLens. I tend to heavily use
  the commit history when investigating bugs & learning a new area of the
  code, so the inline 'blame' and commit-message-on-hover in particular make
  that process about as fast it could be.

* What does your mailing list workflow look like?

  For submissions, I use [GitGitGadget](https://github.com/gitgitgadget/git).
  It really simplifies the process of submitting to Git (especially re-rolls)
  and, if anything, it prevents me from making silly mistakes with
  `git send-email`.

  For everything else, I have two email inbox folders: things addressed to me
  directly (submission feedback, patches I've been CC'd on) and "everything
  else". For direct feedback/CCs, I try to respond within a couple days if I
  think I can contribute something valuable to the discussion. The "everything
  else" folder is set to "automatically mark as read" to avoid a distracting
  barrage of "unread"s in my inbox, so I typically scan it a couple times a
  day to stay up-to-date and check whether there's anything I can help with or
  review.

* Do you think contributing to Git has a high entry barrier? If yes, do
  you have any suggestions to improve the experience for new contributors?

  In my experience, not really (at least, not so high that it excludes
  would-be contributors). But I think it might seem that way because the
  mailing list can be super intimidating when you're looking to get started.

  The mailing list is constantly active with complex patches and lots of
  experienced developers iterating on complicated feedback, so it can be easy
  to feel as though you can't contribute much to it or that your code won't
  meet the project's standards. There have been efforts in the past to guide
  new contributors and help them technically learn the project, but it
  ultimately comes down to the first interactions someone has with the rest of
  the mailing that that determines whether or not they stick with it.

  In terms of suggestions for improvement, I think it's important for
  reviewers to maintain a supportive tone in even highly constructive reviews.
  A lot can get lost in text communication, so sometimes it's worth explicitly
  calling out your appreciation for a contribution. This is _especially_ true
  for new contributors, but is just as applicable to any reviews.

  Another (more concrete) suggestion would be to make it easier for new
  contributors to find appropriate "starter" features/bugs of different sizes.
  Other open source projects have issue trackers with a "good first project"
  tag (and, as a new contributor on other projects, I've definitely
  appreciated them). Although there have been discussions about creating
  public issue trackers outside the mailing list, to my knowledge nothing like
  that exists yet for Git, let alone a subset for new contributors.

* What is your advice for people who want to start Git development?
  Where and how should they start?

  If you're not coming in with a clear project or bugfix in mind, it can be
  really difficult to figure out where to start. If you're in that position,
  something that has helped me in the past has been to just start testing
  things until they break. Read up on a command you find interesting, look for
  scenarios (e.g. options, sequences) that aren't well-tested in our existing
  tests, and start experimenting! Worst case, you can improve test coverage
  and help us avoid issues in the future; a lot of times, though, you'll find
  a bug or an opportunity to add a new option. In any event, the experience
  will teach you a ton about Git and make you more comfortable with
  contributing.

  And once you have a working change, don't be afraid to submit it out of fear
  that it's not "good enough." The goal we all share is to make Git as good as
  it can possibly be, so your contribution - no matter how small or trivial
  you think it is - is a valuable part of what makes this project succeed.

* If there's one tip you would like to share with other Git developers,
  what would it be?

  Keep learning and trying new things! The Git development community has a
  vast range of experience across its members - from people who worked on it
  since the beginning to people making their first open source contribution
  ever. But it's also an easy place to get stuck in "your niche" (if you're
  lucky, you get stuck with a couple of other people so you can review each
  others' work).

  Of course, none of us have infinite time to spend on Git. But every once in
  a while, take a minute to read a contribution from someone you don't know on
  a topic you're not familiar with. Or investigate a bug report on a command
  you've never worked on! Or share your idea for a process we could try (like
  the Git Review Club)! Not only will you learn something new and improve
  yourself as a developer, but the collaboration you foster will help all of
  us improve Git in the long term.


## Releases

+ libgit2 [1.4.2](https://github.com/libgit2/libgit2/releases/tag/v1.4.2)
+ GitLab [14.9.1](https://about.gitlab.com/releases/2022/03/23/gitlab-14-9-1-released/),
[14.9](https://about.gitlab.com/releases/2022/03/22/gitlab-14-9-released/),
[14.8.4](https://about.gitlab.com/releases/2022/03/16/gitlab-14-8-4-released/),
[14.8.3](https://about.gitlab.com/releases/2022/03/15/gitlab-14-8-3-released/),
[14.7.6](https://about.gitlab.com/releases/2022/03/24/gitlab-14-7-6-released/),
[14.7.5](https://about.gitlab.com/releases/2022/03/09/gitlab-14-7-5-released/),
[14.6.6](https://about.gitlab.com/releases/2022/03/02/gitlab-14-6-6-released/)
+ Gerrit Code Review [3.5.1](https://www.gerritcodereview.com/3.5.html#351),
[3.4.4](https://www.gerritcodereview.com/3.4.html#344),
[3.3.10](https://www.gerritcodereview.com/3.3.html#3310),
+ GitHub Enterprise [3.4.0](https://help.github.com/enterprise-server@3.4/admin/release-notes#3.4.0),
[3.3.5](https://help.github.com/enterprise-server@3.3/admin/release-notes#3.3.5),
[3.2.10](https://help.github.com/enterprise-server@3.2/admin/release-notes#3.2.10),
[3.1.18](https://help.github.com/enterprise-server@3.1/admin/release-notes#3.1.18)
+ GitKraken [8.3.3](https://support.gitkraken.com/release-notes/current),
[8.3.2](https://support.gitkraken.com/release-notes/current),
[8.3.1](https://support.gitkraken.com/release-notes/current)
+ GitHub Desktop [2.9.12](https://desktop.github.com/release-notes/),
[2.9.11](https://desktop.github.com/release-notes/)
+ Tower for Windows [3.1](https://www.git-tower.com/release-notes/windows) ([What's New in Tower 3.1 for Windows blog post](https://www.git-tower.com/blog/gpg-windows/))
+ Tower for Mac [8.1](https://www.git-tower.com/release-notes/mac)

## Other News

__Various__


__Light reading__
- [How to Really Use Git: 10 Rules to Make Git More Useful](https://hackernoon.com/how-to-really-use-git-10-rules-to-make-git-more-useful) by Bruno Brito on HackerNoon.
- [Git and GitHub for Marketing Teams](https://www.git-tower.com/blog/git-for-marketing-teams/) by Bruno Brito on Tower's blog.

__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Bruno Brito.
