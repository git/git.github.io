---
title: Git Rev News Edition 42 (August 22nd, 2018)
layout: default
date: 2018-08-22 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 42 (August 22nd, 2018)

Welcome to the 42nd edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of July 2018.

## Discussions

### General

* [SHA-256 has been selected as Git's next-generation hash function](https://public-inbox.org/git/20180725083024.16131-1-avarab@gmail.com/)

[Last month's edition](https://git.github.io/rev_news/2018/07/18/edition-41/#discussions)
discussed the state of NewHash work, i.e. the process of selecting
Git's next-generation hash function. [This discussion has concluded](https://public-inbox.org/git/20180724190136.GA5@0f3cdde9c159/)
with the selection of SHA-256. An
[update to `hash-function-transition.txt` to change `NewHash` to `SHA-256`](https://github.com/git/git/blob/master/Documentation/technical/hash-function-transition.txt)
is queued in the `next` branch.

<!---
### Reviews
-->

### Support

* [Git clone and case sensitivity](https://public-inbox.org/git/24A09B73-B4D4-4C22-BC1B-41B22CB59FE6@gmail.com/)

Paweł Paruzel reported that he found some test files in his repo
appeared modified just after a clone because he had files like
"boolStyle_t_f" and "boolStyle_T_F" that differ only in case and was
cloning on a case-insensitive Mac.

He suggested having `git clone` throw an exception when files that
differ only in case are cloned to a case insensitive system.

Brian Carlson replied that this would make it impossible to clone such
a repository on a case-insensitive system while the current behavior
might still result in a functional repo.

Brian also suggested using something like `test $(git status --porcelain | wc -l) -eq 0`
to check that a repo is unmodified after clone.

Duy Nguyen agreed with Brian and proposed a patch that uses sparse
checkout to hide all the paths that fail to checkout because of the
filesystem. Duy's patch also warns to tell the user what happens.

Jeff King, alias Peff, replied to Duy suggesting just warning and
advising the user. And Duy followed up with a modified patch that does
just that.

Simon Ruderich commented that the advice message in Duy's patch should
list the problematic file names to help users.

Peff agreed with Simon and wondered if it was better to detect at
checkout time if a file already exists on the filesystem rather than
checking before the checkout. Peff also noted that Duy's patch used
strcasecmp() to check if filenames diff only by case, but in some
cases, especially related to utf8 names, a filesystem could use
complex folding rules which we would need to follow.

Brian replied to Peff saying that it was indeed possible to detect the
issue at checkout time, and Duy replied that it was actually what his
patch was doing.

Duy, Peff and Jeff Hostetler then agreed that it would be difficult to
follow complex folding rules that a filesystem might use.

Duy then started sending [a real patch in its own email](https://public-inbox.org/git/20180730152756.15012-1-pclouds@gmail.com/).

Junio Hamano chimed in to suggest a different implementation and a
long discussion thread involving Torsten Bögershausen, Elijah Newren,
Duy, Junio, Peff and Jeff Hostetler followed about how to best find
all the colliding paths.

Duy sent [a version 2 of his patch](https://public-inbox.org/git/20180807190110.16216-1-pclouds@gmail.com/).

The previous long discussion thread continued following this patch though.

Duy sent [a version 3](https://public-inbox.org/git/20180810153608.30051-1-pclouds@gmail.com/)
that actually tries to find all the colliding paths on "UNIXy platforms".

Szeder Gábor found small issues in the patch, so Duy
sent [a version 4](https://public-inbox.org/git/20180812090714.19060-1-pclouds@gmail.com/).

Comments from Torsten started a discussion about clarifying the
documentation of the `core.checkStat` config option which was
addressed by a separate patch from Duy and Junio.

Duy then recently sent [a version 5](https://public-inbox.org/git/20180817161645.28249-1-pclouds@gmail.com/)
which tries to find all the colliding paths on Windows too,
and [a version 6](https://public-inbox.org/git/20180817180039.GA31789@duynguyen.home/)
to address a few more comments from Junio and Torsten.

It looks like the latest version will be merged to the "next" branch soon.


## Developer Spotlight: Derrick Stolee

* Who are you and what do you do?

  I'm a software engineer at Microsoft working on the version control
  client team. My team includes the Git contributors from Microsoft
  as well as most of the developers for VFS for Git (formerly
  GVFS). We also work on other version control clients, such as Team
  Explorer for Visual Studio.

  I joined this team after a couple years on the Git Server team for
  Visual Studio Team Services (VSTS), where I work generally on
  performance features, such as the history algorithm, reachability
  bitmaps, and other scale issues. While I was on the team, we
  onboarded the Windows development group to Git, which was a very
  exciting time to be part of the team. After they were using VSTS,
  the place that needed the most performance improvement was in the
  client experience, so I switched teams.

  Before Microsoft, I was an academic. I got my Ph.D in Mathematics
  and Computer Science from the University of Nebraska and was an
  assistant professor for a few years, working in computational graph
  theory and combinatorics. I found that being a faculty was not
  nearly as much fun as being a graduate student, and I couldn't find
  enough time to write code for my computational experiments. Luckily,
  I was able to find a role at Microsoft that could use some of those
  skills.

* What would you name your most important contribution to Git?

  My most important contribution to Git has been the commit-graph
  feature. This feature enables significant performance boosts for Git
  repos of almost every size. I built a similar feature while
  rewriting the history algorithm for VSTS, and I changed teams from
  server to client so I could contribute this feature to core Git.

* What are you doing on the Git project these days, and why?

  In addition to working on more fallout from the commit-graph feature
  (including speeding up `git log --graph`), I've been working on the
  multi-pack-index feature. This allows indexing a list of objects
  across several packfiles. I'm the first to admit that this feature
  is not as necessary as the commit-graph until you get to incredibly
  large repositories. When `git repack` stops being a realistic
  option, then the multi-pack-index can keep your lookup times sane. I
  hope that there are some more future integrations that are
  beneficial to other repos, such as tying the reachability bitmap to
  the multi-pack-index instead of a single packfile.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  THE INDEX! The `.git/index` file is a linear list of every path
  available in the working directory, even if those files are not
  checked out (due to a sparse-checkout). This is one of the most
  central features to all of Git, and is used in many places with a
  very transparent API.

  The index is the single biggest bottleneck left to tackle for
  super-large repos like the Windows repo. These enormous repos are
  too large for most developers to need the entire thing, so they work
  in a small cone. VFS for Git virtualizes the files until they are
  read or written, and we use the sparse-checkout feature to limit
  Git's interaction to be in that cone. However, we still need to read
  and write the entire index file whenever we interact with the
  staging area. If the index was hierarchical or could prune the list
  for entire subtrees, then we could drastically reduce this cost.

  The biggest problem with this direction is that it requires
  refactoring almost all of the consumers to use a new API that is not
  as coupled to the layout of the index. Only after that change
  happens can we drastically replace the file format. It's a bit of a
  chicken-or-the-egg problem, because we can't refactor the API unless
  we know the behavior the new format can present, but we can't test
  format options until we refactor the API.

  The task is pretty daunting, but I think someone could get there
  with enough focus and determination.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  I would rebuild `revision.c` from scratch. I'm going to need to do a
  lot of replacement to make `git log --graph` use generation numbers,
  but it would be easier if I could start over and add features one at
  a time.

  This is probably a boring answer, but I have found that every single
  command-line option is someone's favorite feature, so I don't want
  to take that away from anyone. One of Git's strengths is that it is
  so flexible for different use cases and different repos.

* What is your favorite Git-related tool/library, outside of Git itself?

  It's rather new, but I've been enjoying using [GitGitGadget](https://github.com/gitgitgadget/gitgitgadget)
  to send patches to the mailing list. Too often I make a mistake
  sending patches upstream, or lose track of which commit I used in
  v2, and things like that. Starting from a GitHub pull request (that
  also ran builds on the code for Windows, Mac, & Linux) is much
  easier (to me) than going through the hoops of `git format-patch`
  and `git send-email`. I think that getting started submitting
  patches via email is one of the biggest barriers to entry for our
  community, and I really believe we are losing quality contributors
  due to that friction. Hopefully, GitGitGadget can be one way that we
  can attract and retain more contributors.


## Releases

+ libgit2 [v0.27.4](https://github.com/libgit2/libgit2/releases/tag/v0.27.4)
+ Gerrit Code Review [v2.15.3](https://www.gerritcodereview.com/releases/2.15.md)
+ GitHub Enterprise [v2.14.2](https://enterprise.github.com/releases/2.14.2),
[v2.13.8](https://enterprise.github.com/releases/2.13.8),
[v2.12.16](https://enterprise.github.com/releases/2.12.16),
[v2.11.22](https://enterprise.github.com/releases/2.11.22),
[v2.14.1](https://enterprise.github.com/releases/2.14.1),
[v2.13.7](https://enterprise.github.com/releases/2.13.7),
[v2.12.15](https://enterprise.github.com/releases/2.12.15),
[v2.11.21](https://enterprise.github.com/releases/2.11.21)
+ GitLab [11.1.4](https://about.gitlab.com/2018/07/31/gitlab-11-1-4-released/),
[11.1.2, 11.0.5, and 10.8.7](https://about.gitlab.com/2018/07/26/security-release-gitlab-11-dot-1-dot-2-released/),
[11.1.1](https://about.gitlab.com/2018/07/24/gitlab-11-1-1-released/),
[11.1.0](https://about.gitlab.com/2018/07/22/gitlab-11-1-released/),
[11.0.4, 10.8.6, and 10.7.7](https://about.gitlab.com/2018/07/17/critical-security-release-gitlab-11-dot-0-dot-4-released/)
+ Bitbucket Server [v5.13](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ GitKraken [v4.0.2](https://support.gitkraken.com/release-notes/current),
[v4.0.1](https://support.gitkraken.com/release-notes/current),
[v4.0.0](https://support.gitkraken.com/release-notes/current)
+ GitHub Desktop [v1.3.3](https://desktop.github.com/release-notes/),
[v1.3.2](https://desktop.github.com/release-notes/),
[v1.3.1](https://desktop.github.com/release-notes/),
[v1.3.0](https://desktop.github.com/release-notes/)
+ tig [v2.4.0](https://public-inbox.org/git/CAFuPQ1LtE2OgsfUOff=a_RDA0Q7B7Xk91kyAEWMnG2EW0TNRuw@mail.gmail.com/)

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
with help from Derrick Stolee and Ævar Arnfjörð Bjarmason.
