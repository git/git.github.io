---
title: Git Rev News Edition 52 (June 28th, 2019)
layout: default
date: 2019-06-28 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 52 (June 28th, 2019)

Welcome to the 52nd edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of May 2019.

## Discussions


### General

* [I made a flame graph renderer for git's trace2 output](https://public-inbox.org/git/87zhnuwdkp.fsf@evledraar.gmail.com/)

  Ævar Arnfjörð Bjarmason sent an email saying he developed a script that uses the
  [FlameGraph tool](http://www.brendangregg.com/flamegraphs.html)
  to generate a
  [picture](https://vm.nix.is/~avar/noindex/git-tests.svg) showing
  where Git's test suite spends its time.

  His script also uses the new
  [Git Trace2 API](https://github.com/git/git/blob/master/Documentation/technical/api-trace2.txt)
  which has been developed mostly by Jeff Hostetler
  [starting nearly one year ago](https://public-inbox.org/git/20180713165621.52017-1-git@jeffhostetler.com/)
  and then through different versions:
  [RFC](https://public-inbox.org/git/pull.29.git.gitgitgadget@gmail.com/),
  [V1](https://public-inbox.org/git/pull.108.git.gitgitgadget@gmail.com/),
  [V2](https://public-inbox.org/git/pull.108.v2.git.gitgitgadget@gmail.com/),
  [V3](https://public-inbox.org/git/pull.108.v3.git.gitgitgadget@gmail.com/),
  [V4](https://public-inbox.org/git/pull.108.v4.git.gitgitgadget@gmail.com/),
  [V5](https://public-inbox.org/git/pull.169.v5.git.gitgitgadget@gmail.com/),
  and which has eventually been released in Git v2.22.0 at the beginning of June 2019.

  Ævar added that he plans to improve
  [his script](https://github.com/avar/FlameGraph/commit/7a834718a12ed8b0d897ee90b00e2f654508cabd)
  over time and maybe submit it in a Pull Request to the FlameGraph
  tool, or perhaps integrate it in the Git test suite.

  Derrick Stolee, who prefers to be called just Stolee, replied that
  he liked the idea and sent the commands using Ævar's script that he used to create
  [another picture](https://github.com/derrickstolee/FlameGraph/blob/git-test/git-test.svg)
  from a much smaller test.

  Gábor Szeder commented on Stolee's commands to ask why "GIT_TR2"
  instead of "GIT_TRACE2" was used in the environment variables
  related to the Trace2 API. Gábor refered to Ken Thompson "who
  (allegedly?) later regretted spelling creat()/O_CREAT without the
  'e'..."

  Jeff King, alias Peff, replied to Ævar's initial email asking
  "doesn't `perf record -g make test` already give us that granular
  data?" refering to the [Linux perf tool](https://en.wikipedia.org/wiki/Perf_(Linux))
  which is already supported by the FlameGraph tool. Peff also
  wondered about the usefulness of such a graph:

  > But having generated such a flamegraph, it's not all that helpful. It
  > mainly tells us that we spend a lot of time on fork/exec. Which is no
  > surprise, since the test suite is geared not towards heavy workloads,
  > but lots of tiny functionality tests.

  Though he agreed that it could help in some cases:

  > I think the trace2 flamegraph would be most useful if you were
  > collecting across a broad spectrum of workloads done by a user. You
  > _can_ do that with perf or similar tools, but it can be a bit awkward.

  Ævar replied that his "actual use-case for this is to see what
  production nodes are spending their time on, similar to what
  Microsoft is doing with their use of this facility", and that he
  used the test suite because it is a good way to test his script and
  the Trace2 API as "we're pretty much guaranteed to run all our
  commands, and cover a lot of unusual cases".

  Ævar pointed that his work "shows that we've got a long way to go in
  improving the trace2 facility, i.e. adding region enter/leave for
  some of the things we spend the most time on."

  Jeff Hostetler, who authored the Trace2 API and works for Microsoft
  along with Stolee, then replied "Very Nice !" to Ævar and agreed
  with him about the work still needed to "to get more granular data for
  interesting/problematic things".

  Ævar and Jeff then discussed this future work further in a few
  emails.

  Jeff also replied to Gábor that he was ok to change "TR2" to
  "TRACE2" and Gábor sent
  [two patchs](https://public-inbox.org/git/20190519144309.9597-1-szeder.dev@gmail.com/)
  to make that change. These patchs were agreed on and merged before
  Git v2.22.0 was released on June 7th, 2019.

<!---
### Reviews
-->

<!---
### Support
-->

## Developer Spotlight: Jeff Hostetler

* Who are you and what do you do?

  My name is Jeff Hostetler and I work for Microsoft.
  I've been working on Git and on Git-related technologies
  for the last 5 years.  Primarily focusing on performance
  and scale.

  Prior to joining Microsoft, I worked for [SourceGear](http://www.sourcegear.com/)
  and built the [Veracity](https://en.wikipedia.org/wiki/Veracity_(software)) DVCS
  and the [DiffMerge](http://www.sourcegear.com/diffmerge/) visual
  diff and merge tool.

  A long, long time ago I was Architect for Spyglass Mosaic.

* What would you name your most important contribution to Git?

  I'd have to say the Trace2 facility that is now in v2.22.
  With this in place, it will be much easier to understand
  performance bottlenecks at scale.

  Second to that would be the beginnings of the Partial Clone
  feature.  There's still a lot of work to do in this area, but
  I think long term, it will be central to solving certain
  enterprise-level scale problems.

* What are you doing on the Git project these days, and why?

  I'm currently working on a series of blog posts explaining
  Trace2 and how it can be used to measure and track Git
  performance.

  Within Microsoft we continue to study Trace2 data generated
  by our Windows and Office developers and look for opportunities
  to improve the developer experience, such as making status and
  checkout faster.  And we are using the data to guide how/where
  we should invest our engineering time for future performance
  gains.

  Hopefully, I can encourage others to start using Trace2,
  gather their own data and look for opportunities where they
  can help improve Git.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  Bring together the Partial Clone and Sparse Checkout features
  to scale to large repos.  This includes completing the end-user
  experience, so that it just works and doesn't require any
  wizardry.

  There are several dimensions that have similar, but not
  identical needs.

  For example, a moderately-sized work tree with a few large
  blobs might use Partial Clone with the blob-size filter and
  only demand-fetch large blobs when actually needed.  This could
  be seen as an easier to use solution than LFS.

  Alternatively, a repo with a gigantic tree might use Partial
  Clone with the sparse filter (to get "cones" of the work tree).
  That could be coordinated with the sparse-checkout file to
  populate just the desired parts of the work tree.  For some
  users this would be simpler than using GVFS.

  Let's add new porcelain commands to create, grow, and shrink the
  sparse-checkout file and automatically update the index, so that
  the user doesn't have to manually manipulate it.

  Investigate a bulk pre-fetch command or hook, such as before a
  checkout, to reduce the overhead of individually demand-loading
  missing objects.

  Finally, update Protocol V2 to include whatever verbs we need
  to make all of this work efficiently.

  With this we could probably retire most if not all of GVFS and
  hopefully let our Windows and Office developers use core Git
  and not need a private fork.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  I'd like to revisit the design of the index.  Switch to a sparse
  and hierarchical format, for example.  This is a large task and
  touches everything from the on-disk format to every index-related
  loop in the program.

  [Ben Peart](https://git.github.io/rev_news/2017/09/20/edition-31/)
  and [Derrick Stolee](https://git.github.io/rev_news/2018/08/22/edition-42/)
  both touched upon this in earlier issues.

* What is your favorite Git-related tool/library, outside of Git itself?

  I'm mostly a terminal user, so I don't use very many third-party
  tools.  I do highly recommend
  [GitGitGadget](https://github.com/gitgitgadget/gitgitgadget).
  I use it to run CI builds on all Windows, Mac, and Linux and to send
  patches to the mailing list.

## Releases

+ Git [2.22.0](https://public-inbox.org/git/xmqq36klozfu.fsf@gitster-ct.c.googlers.com/),
[2.22.0-rc3](https://public-inbox.org/git/xmqqlfyito3a.fsf@gitster-ct.c.googlers.com/),
[2.22.0-rc2](https://public-inbox.org/git/xmqqpnnzws9q.fsf@gitster-ct.c.googlers.com/)
+ Git for Windows [2.22.0](https://github.com/git-for-windows/git/releases/tag/v2.22.0.windows.1)
+ libgit2 [0.28.2](https://github.com/libgit2/libgit2/releases/tag/v0.28.2)
+ GitHub Enterprise [2.17.2](https://enterprise.github.com/releases/2.17.2/notes),
[2.16.11](https://enterprise.github.com/releases/2.16.11/notes),
[2.15.16](https://enterprise.github.com/releases/2.15.16/notes),
[2.14.23](https://enterprise.github.com/releases/2.14.23/notes),
[2.17.1](https://enterprise.github.com/releases/2.17.1/notes),
[2.16.10](https://enterprise.github.com/releases/2.16.10/notes),
[2.15.15](https://enterprise.github.com/releases/2.15.15/notes),
[2.14.22](https://enterprise.github.com/releases/2.14.22/notes),
[2.17.0](https://enterprise.github.com/releases/2.17.0/notes),
[2.16.9](https://enterprise.github.com/releases/2.16.9/notes),
[2.15.14](https://enterprise.github.com/releases/2.15.14/notes),
[2.14.21](https://enterprise.github.com/releases/2.14.21/notes)
+ GitLab [12.0.1](https://about.gitlab.com/2019/06/25/gitlab-12-0-1-released/),
[12.0](https://about.gitlab.com/2019/06/22/gitlab-12-0-released/),
[11.11.3](https://about.gitlab.com/2019/06/10/gitlab-11-11-3-released/),
[11.11.2](https://about.gitlab.com/2019/06/05/gitlab-11-11-2-released/),
[11.10.6](https://about.gitlab.com/2019/06/05/gitlab-11-10-6-released/),
[11.11.1, 11.10.5, and 11.9.12](https://about.gitlab.com/2019/06/03/security-release-gitlab-11-dot-11-dot-1-released/),
[11.11](https://about.gitlab.com/2019/05/22/gitlab-11-11-released/)
+ Bitbucket Server [6.4](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ Gerrit Code Review [2.15.14](https://www.gerritcodereview.com/2.15.html#21514),
[2.16.9](https://www.gerritcodereview.com/2.16.html#2169)
+ GitKraken [6.0.0](https://support.gitkraken.com/release-notes/current),
[5.0.4](https://support.gitkraken.com/release-notes/current),
[5.0.3](https://support.gitkraken.com/release-notes/current),
[5.0.2](https://support.gitkraken.com/release-notes/current),
[5.0.1](https://support.gitkraken.com/release-notes/current),
[5.0.0](https://support.gitkraken.com/release-notes/current)
+ GitHub Desktop [2.0.4](https://desktop.github.com/release-notes/),
[2.0.3](https://desktop.github.com/release-notes/),
[2.0.2](https://desktop.github.com/release-notes/),
[2.0.1](https://desktop.github.com/release-notes/),
[2.0.0](https://desktop.github.com/release-notes/)
+ Sourcetree [3.2.1](https://product-downloads.atlassian.com/software/sourcetree/ReleaseNotes/Sourcetree_3.2.1.html),
[3.2](https://product-downloads.atlassian.com/software/sourcetree/ReleaseNotes/Sourcetree_3.2.html)


## Other News

__Various__


__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Gabriel Alcaras &lt;<gabriel.alcaras@telecom-paristech.fr>&gt;
with help from Jeff Hostetler, David Pursehouse and
Johannes Schindelin.
