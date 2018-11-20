---
title: Git Rev News Edition 45 (November 21st, 2018)
layout: default
date: 2018-11-21 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 45 (November 21st, 2018)

Welcome to the 45th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of October 2018.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

### Support

* [commit-graph is cool](https://public-inbox.org/git/CABPp-BECpSOxudovjbDG_3W9wus102RW+E+qPmd4g3Qyd-QDKQ@mail.gmail.com/)

  Elijah Newren sent an email to the mailing list that started with:

  > Just wanted to give a shout-out for the commit-graph work and how
  > impressive it is.

  He then describes a user with a repo where pushing a commit takes
  more than one minute. The repo was quite "unusual" as it had a lots
  of tag and the push.followTags config option was set to true. Elijah
  found that most of the time was spent in a add_missing_tags()
  function which called in_merge_bases_many() once per tag, which
  "seemed rather suboptimal", as in_merge_bases_many() does a commit
  traversal which is not cheap.

  Instead of optimizing this Elijah tried a development version of the
  commit-graph feature. The commit-graph feature itself is a quite
  recent feature in Git that was developed by Derrick Stolee, alias
  Stolee, who blogged about it:

    - [Supercharging the Git Commit Graph](https://blogs.msdn.microsoft.com/devops/2018/06/25/supercharging-the-git-commit-graph/)
    - [Supercharging the Git Commit Graph II: File Format](https://blogs.msdn.microsoft.com/devops/2018/07/02/supercharging-the-git-commit-graph-ii-file-format/)
    - [Supercharging the Git Commit Graph III: Generations and Graph Algorithms](https://blogs.msdn.microsoft.com/devops/2018/07/09/supercharging-the-git-commit-graph-iii-generations/)
    - [Supercharing the Git Commit Graph IV: Bloom Filters](https://blogs.msdn.microsoft.com/devops/2018/07/16/super-charging-the-git-commit-graph-iv-bloom-filters/)

  (These links were already provided in [Git Rev News edition 41 last July](https://git.github.io/rev_news/2018/07/18/edition-41/).
  Stolee has been interviewed in [Git Rev News edition 42 last August](https://git.github.io/rev_news/2018/08/22/edition-42/).)

  Elijah found that the commit-graph feature reduced the time of a
  `git push --dry-run` by a factor of over 100, from over a minute to
  sub-second, though this speed up came from making all the
  in_merge_bases_many() calls much faster, not from reducing the
  number of calls to this function.

  Stolee replied that the generation numbers feature in the
  commit-graph file is likely what makes the calls much faster, as it
  can often avoid commit traversals altogether.

  Jeff King, alias Peff, also replied to Elijah suggesting
  implementing an "all-points" traversal instead of many commit
  traversals. Peff also noticed that generation numbers might give a
  better answer in some cases as commit traversals are "susceptible to
  wrong answers due to clock skew".

  Stolee a few weeks later sent
  [a small patch series](https://public-inbox.org/git/pull.60.git.gitgitgadget@gmail.com/)
  to fix the behavior of the add_missing_tags() function by
  implementing a new get_reachable_subset() function which does "a
  many-to-many reachability test" and performs only one commit
  traversal.

  Junio Hamano, the Git maintainer, and Elijah then reviewed the patch
  series and discussed the implementation with Stolee.

  Elijah reported that the patch series indeed improved the time of a
  dry-run push from around 1 minutes and 20 seconds to around 3
  seconds, but that it seemed that now the push was a little bit
  faster without the commit-graph feature. After discussing this with
  Stolee and other tests though Elijah reported that he had made a
  mistake in testing Stolee's patch series and that using the
  commit-graph feature was still faster even with the patch series.

  Ævar Arnfjörð Bjarmason also replied to Elijah's initial email to
  say that users can set the fetch.pruneTags config option to true to
  avoid accumulating local-only tags. Elijah then thanked Ævar for the
  suggestion.

  A few days later Stolee sent
  [a slightly improved version of his small patch series](https://public-inbox.org/git/pull.60.v2.git.gitgitgadget@gmail.com/).
  This version has recently been merged into the master branch, so it
  should be in the upcoming v2.20.0 Git release
  [scheduled for the beginning of December](https://tinyurl.com/gitCal).

## Developer Spotlight: Elijah Newren

* Who are you and what do you do?

  Big question; I'll answer in three parts, and see if I can use a
  little humor to offset the lengthy answer.

  Personally, I'm a husband to the most amazing woman in the world, and
  a father to one son and six daughters.  My wife is expecting again, so
  next spring my son will get something he's never had before: a seventh
  sister!  I'm a devout member of
  [The Church of Jesus Christ of Latter-day Saints](https://www.lds.org).
  I received a PhD in mathematics from the
  [University of Utah](http://www.math.utah.edu/~newren/), which
  aside from meaning I've forgotten more math than most people will
  ever know, comes with one primary benefit: when my kids need a
  "doctor's note", it's often the case that someone has overlooked
  specifying that the note needs to come from a medical doctor.
  Sadly, my wife has vetoed me writing these notes myself, which just
  goes to show that a doctorate isn't all it's cracked up to be.

  In the open source world, in addition to my contributions to Git in
  more recent years, I was once upon a time heavily involved in the
  Gnome community; a
  [behind the scenes interview](https://thegnomejournal.wordpress.com/2006/04/21/behind-the-scenes-elijah-newren/)
  I did with them may still be interesting, particularly the
  travelling tips.

  Professionally, I worked at [Sandia National Labs](https://www.sandia.gov/)
  for about six years, transitioning during that time from working on
  fluid dynamics codes to working on tools to make other developers more
  productive. Palantir lured me away in early 2013 with a cool
  [mission](https://www.palantir.com/about/) (especially
  intriguing to me at the time was the results they were getting in
  [fighting child exploitation and recovering missing children](https://www.palantir.com/philanthropy-engineering/annual-report/2017/ncmec.html)),
  and an understanding that I would get to work on open source stuff
  like Gerrit and Git. The underlying mission has remained cool (despite
  some contrary claims in the media these days), but between managerial
  turnover and the short-term focus of a startup, it took a long time
  before I actually had the opportunity to work on Git even part time.

* What would you name your most important contribution to Git?

  I've contributed to a few different places in Git, but most of my
  contributions have been around merging. I've put a lot of work into
  addressing edge and corner cases; possibly too much: Junio has named
  some of my patch series things like
  `en/t6042-insane-merge-rename-testcases`.  Part of the reason for
  addressing edge and corner cases, though, dovetails with my other
  work towards fixing, documenting, testing, and restructuring the
  recursive merge machinery with an eye towards changing out the
  [basic implementation strategy](https://public-inbox.org/git/xmqqd147kpdm.fsf@gitster.mtv.corp.google.com/).

  A while ago I found a bug in merge-recursive.c and traced it back to
  code introduced years ago by myself, but then found that the original
  bug was only an issue because of some other problem created years
  ago...that also traced back to me. Sometimes merge-recursive.c feels
  like it's all my fault other than the original implementation
  design. So, not only have I mostly worked on stuff that few people
  will ever notice, but once I change the implementation underpinnings,
  merge problems can be entirely my fault too.  :-)

  The most notable thing I've contributed that users are likely to
  notice is directory rename detection in the merge machinery. An
  amusing bit of trivia about that feature is that GitHub highlighted
  this feature in their
  [Highlights from Git 2.19](https://blog.github.com/2018-09-10-highlights-from-git-2-19/#directory-rename-detection),
  even though this was a feature added in Git 2.18. (I'm not
  complaining since this meant more exposure to my pet feature, I just
  found it humorous.)

* What are you doing on the Git project these days, and why?

  I'm currently creating a replacement for `git filter-branch` that I'm
  provisionally naming [git repo-filter](https://github.com/newren/git-repo-filter/).
  My goal is to address what I perceive to be a few glaring
  deficiencies of the otherwise versatile and cool filter-branch
  tool. It's not ready for external consumption at all yet (one
  problem of many is that it depends on Git patches which I just
  recently posted to the list). I'll submit repo-filter to the list
  when it's closer to ready.

  I've done some work to document inconsistencies and incompatible
  flag pairs in rebase, due to its multiple different backends. I'm
  slowly doing some ongoing work to make that behavior more uniform. One
  particular difference that ties into my other work concerns directory
  rename detection: I want that capability for rebases as well as merges
  and cherry-picks. However, directory rename detection in rebase is
  [backend dependent, and the default backend lacks this ability](https://public-inbox.org/git/xmqqh8jeh1id.fsf@gitster-ct.c.googlers.com/).
  Dscho has some performance concerns with switching the default backend
  (fewer than he used to now that the various rebase-in-C rewrites have
  merged), so fixing that issue might depend on some more merge work
  first.

  I will also soon get back to my
  [rewrite of the implementation strategy from merge-recursive](https://public-inbox.org/git/xmqqk1ydkbx0.fsf@gitster.mtv.corp.google.com/).
  While that may not sound too exciting to most users, I think it
  could net some nice maintainability wins, improve performance (thus
  perhaps allowing the rebase switchover), fix a variety of
  edge/corner cases we currently fail, and make some new features
  easier to implement (e.g. merges in bare repos, cherry-picking to an
  un-checked-out branch, remerge-diff capability, and tree-based
  trivial merges).

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  I'd be happy if I could be allowed to work full time on Git
  myself. Getting a full time team?  Well...

  * Work on all the stuff I mentioned above (including the features
    I think my current work would enable)

  * Upstream or at least release and open source our snowflake report
    tool, to help other groups (if there are any) that also weirdly
    support way too many customer-specific branches and want a better
    way to determine what changes have already been ported back to the
    main development branch.

  * Improve performance on large repositories (in particular, storing
    and using a partial index that includes some tree entries and
    omits files underneath, used together with partial clones and
    sparse checkouts)

  * Add a couple alternative forms of binary storage.

  * Create a better webby merge review tool. One which treats commits
    as the unit of review and branches as the unit of merging,
    possibly based on or taking advantage of range-diff. One which
    encourages writing clean history that is easy for future readers
    to follow. (This includes making commit messages a fundamental
    part of what is reviewed, expecting and working with multiple
    commits as separate small atomic steps, avoiding fixup commits in
    the final while also not doing user-hostile history-destroying
    squash merges, and if it wasn't clear already from the previous
    requirements it needs to work reasonably with and not be hostile
    to rebases). Also, it shouldn't botch commit order (I understand
    that merges may be difficult and some form of linearization may be
    in order, but messing up the topology of a linear history is
    unforgivable; doubly so when you document it as intended), and it
    shouldn't use magic refnames. There are probably other issues
    from the various systems I have used that I could add into the
    above requirements, but the list already rules out all existing
    tools that I know of. Git's (and Linux's) email based workflow is
    the only one I know of to get all these things right; however, the
    problems with getting an email workflow running make it a
    non-starter for many groups. I wish there were something better
    than the current offerings to point people to, or that one of the
    existing offerings would transform into this tool.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  Perhaps just make checkout and reset do just one thing each?

* What is your favorite Git-related tool/library, outside of Git itself?

  I would have said tbdiff, but now range-diff is built in. I could
  mention various repository management and code review tools
  (particularly a few that bundle these capabilities together), but
  it's hard to pick a "favorite" as the ones I know all tend to be
  strong in some area(s) and extremely weak in others.

  I'm not sure if public-inbox.org/git qualifies as a "Git-related
  tool or library", but it's been very helpful. I also use Dscho's
  apply-from-public-inbox.sh script to apply submitted patch series
  locally.

## Releases

+ StGit [0.19](https://public-inbox.org/git/1541522776.3963181.1567641696.46EFA2E6@webmail.messagingengine.com)
+ libgit2 [0.27.7](https://github.com/libgit2/libgit2/releases/tag/v0.27.7),
[0.27.6](https://github.com/libgit2/libgit2/releases/tag/v0.27.6)
+ GitHub Enterprise [2.15.2](https://enterprise.github.com/releases/2.15.2/notes),
[2.14.9](https://enterprise.github.com/releases/2.14.9/notes),
[2.13.15](https://enterprise.github.com/releases/2.13.15/notes),
[2.12.23](https://enterprise.github.com/releases/2.12.23/notes),
[2.15.1](https://enterprise.github.com/releases/2.15.1/notes),
[2.14.8](https://enterprise.github.com/releases/2.14.8/notes),
[2.13.14](https://enterprise.github.com/releases/2.13.14/notes),
[2.12.22](https://enterprise.github.com/releases/2.12.22/notes)
+ GitLab [11.4.5](https://about.gitlab.com/2018/11/05/gitlab-11-4-5-released/),
[11.4.4](https://about.gitlab.com/2018/11/01/critical-security-release-gitlab-11-dot-4-dot-4-released/),
[11.4.3](https://about.gitlab.com/2018/10/29/security-release-gitlab-11-dot-4-dot-3-released/),
[11.4.0](https://about.gitlab.com/2018/10/22/gitlab-11-4-released/)
+ Gerrit Code Review [2.16](https://www.gerritcodereview.com/2.16.html),
[2.15.7](https://www.gerritcodereview.com/2.15.html#2157),
[2.14.17](https://www.gerritcodereview.com/2.14.html#21417)
+ GitKraken [4.1.1](https://support.gitkraken.com/release-notes/current),
[4.1.0](https://support.gitkraken.com/release-notes/current)
+ GitHub Desktop [1.5.0](https://desktop.github.com/release-notes/)
+ Sourcetree [3.0](https://product-downloads.atlassian.com/software/sourcetree/ReleaseNotes/Sourcetree_3.0.html)

## Other News

__Various__

* [Git Merge Contributor's Summit Jan 31, 2019, Brussels](https://public-inbox.org/git/20181109104202.GA8717@sigill.intra.peff.net)
  has been announced on the mailing list. All contributors to Git or related projects in the Git ecosystem are invited.

* [Outreachy interns](https://www.outreachy.org/alums/) for the
  December 2018 to March 2019 round have been announced. Two Outreachy
  interns will work on Git. Slavica Đukić mentored by Johannes
  Schindelin will work on turning `git add -i` into a built-in, while
  Tanushree Tumane co-mentored by Christian Couder and Johannes
  Schindelin will work on improving `git bisect`. GitHub will sponsor
  these internships.

* [Gerrit User Summit 2018, Summary Report](https://gitenterprise.me/2018/11/18/gerrit-user-summit-2018-2/) has been published.
  The Gerrit User Summit 2018 at Cloudera in Palo Alto has ended with
  over 80+ participants coming from all over the world. Main topics
  have been the release of Gerrit v2.16, support for Git protocol v2,
  Gerrit DevOps Analytics & Insights and the support for Kubernetes.

__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Gabriel Alcaras &lt;<gabriel.alcaras@telecom-paristech.fr>&gt;
with help from Luca Milanesio.
