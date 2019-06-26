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

<!---
## Developer Spotlight:
-->

## Releases

+ Git [2.22.0](https://public-inbox.org/git/xmqq36klozfu.fsf@gitster-ct.c.googlers.com/),
[2.22.0-rc3](https://public-inbox.org/git/xmqqlfyito3a.fsf@gitster-ct.c.googlers.com/),
[2.22.0-rc2](https://public-inbox.org/git/xmqqpnnzws9q.fsf@gitster-ct.c.googlers.com/)
+ Git for Windows [2.22.0(1)](https://github.com/git-for-windows/git/releases/tag/v2.22.0.windows.1)
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
with help from David Pursehouse.
