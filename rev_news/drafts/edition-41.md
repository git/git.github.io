---
title: Git Rev News Edition 41 (July 18th, 2018)
layout: default
date: 2018-07-18 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 41 (July 18th, 2018)

Welcome to the 41st edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of June 2018.

## Discussions


### General

* [State of NewHash work, future directions, and discussion](https://public-inbox.org/git/87fu1vwt11.fsf@evledraar.gmail.com)

Brian Carlson, who has been working for a long time on improving Git
code to make it easier to support replacing SHA-1 with a new hash
function, recently posted an update and invited people to discuss the
future steps in this area.

As the new hash function is still undecided (see below), it is called
"NewHash" by everyone for now. It is expected though that it will be a
256-bit hash algorithm while SHA-1 is 128-bit, and this change alone
has required a lot of internal work.

With Brian's latest patches Git would work using NewHash, including
passing the test suite, though it would be incompatible with current
Git.

As the [hash function transition plan](https://github.com/git/git/blob/master/Documentation/technical/hash-function-transition.txt)
tells that a Git using NewHash should be able to communicate through
fetching and pushing with a Git using SHA-1, the next step is to
implement such kind of communication and that's what Brian started to
do.

Technically the work consists in porting everything to use a variable
called `the_hash_algo` that will store information about the current
hash algorithm.

After describing other technical details related to his work and
recommending ways to make current developments compatible with it,
Brian suggested resuming the discussion about what NewHash should
actually be, as he will need to actually use a new hash when writing
objects to disk.

Brian then proposed to send to the list an analysis he made on
"availability of implementations, performance, and other attributes
described in the transition plan".

Ævar Arnfjörð Bjarmason, Jonathan Nieder and Duy Nguyen all replied
separately to Brian to congratulate him for his work, to discuss a few
technical details, and to welcome his analysis of the possible hash
functions.

Brian replied to them by sending his [Hash algorithm analysis](https://public-inbox.org/git/20180609224913.GC38834@genre.crustytoothpaste.net/)
to the mailing list. The conclusion from this document is that the
best is one of SHA-256, SHA-3-256 and BLAKE2b depending on the goals
(security, performance, availability).

Jonathan replied to this analysis by asking technical questions and
summarizing the previous discussions. He said that Yves Orton and
Linus Torvalds
[prefer](https://public-inbox.org/git/CA+55aFwUn0KibpDQK2ZrxzXKOk8-aAub2nJZQqKCpq1ddhDcMQ@mail.gmail.com/)
SHA-3 over SHA-2 because of how it is constructed, though a number of
knowledgeable people suggested K12 instead of SHA-3 for performance
reasons, while Johannes Schindelin, alias Dscho, strongly
[prefers](https://public-inbox.org/git/alpine.DEB.2.21.1.1706151122180.4200@virtualbox/)
SHA-256 because it is well known, widely available and fast.

Linus replied to this summary by explaining that "SHA-2 has the exact
same weak inter-block state attack" as SHA-1, and it would be crazy to
"go with a crypto choice that has that known weakness". About
performance he thinks that "'256-bit hashes are bigger' is going to be
the more noticeable performance issue" and that K12 "should be a
front-runner" as it was suggested by the Keccak people.

There were further discussions involving Ævar, Linus, David Lang,
Brian, Dscho and also Gilles Van Assche who co-created Keccak which
then became SHA-3, but there was still no consensus and no decision
has been made.

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

+ Git [v2.18.0](https://public-inbox.org/git/xmqqbmc4szxc.fsf@gitster-ct.c.googlers.com/)
+ Git for Windows [2.18.0](https://public-inbox.org/git/20180622115913.14184-1-johannes.schindelin@gmx.de)
+ libgit2 [v0.27.3](https://github.com/libgit2/libgit2/releases/tag/v0.27.3)
+ Bitbucket Server [v5.12](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ GitHub Enterprise [v2.14.0](https://enterprise.github.com/releases/2.14.0),
[v2.13.6](https://enterprise.github.com/releases/2.13.6),
[v2.12.14](https://enterprise.github.com/releases/2.12.14),
[v2.11.20](https://enterprise.github.com/releases/2.11.20),
[v2.13.5](https://enterprise.github.com/releases/2.13.5),
[v2.12.13](https://enterprise.github.com/releases/2.12.13),
[v2.11.19](https://enterprise.github.com/releases/2.11.19)
+ GitLab [11.0.3](https://about.gitlab.com/2018/07/05/gitlab-11-0-3-released/),
[11.0.2](https://about.gitlab.com/2018/06/27/gitlab-11-0-2-released/),
[11.0.1, 10.8.5, 10.7.6](https://about.gitlab.com/2018/06/25/security-release-gitlab-11-dot-0-dot-1-released/),
[11.0.0](https://about.gitlab.com/2018/06/22/gitlab-11-0-released/)
+ GitKraken [v3.6.6](https://support.gitkraken.com/release-notes/current),
[v3.6.4](https://support.gitkraken.com/release-notes/current)
+ GitHub Desktop [v1.2.6](https://desktop.github.com/release-notes/),
[v1.2.5](https://desktop.github.com/release-notes/),
[v1.2.4](https://desktop.github.com/release-notes/)
+ Gerrit Code Review [v2.14.10](https://www.gerritcodereview.com/releases/2.14.md)

## Other News

__Various__

* A [Git standup on IRC](https://public-inbox.org/git/20180713170018.GA139708@aiede.svl.corp.google.com/)
  every two weeks at 17:00-17:30 UTC has been announced by Jonathan Nieder.

* Derrick Stolee has written about Commit Graph on [Microsoft DevOps Blog](https://blogs.msdn.microsoft.com/devops/):

  - [Supercharging the Git Commit Graph](https://blogs.msdn.microsoft.com/devops/2018/06/25/supercharging-the-git-commit-graph/)
  - [Supercharging the Git Commit Graph II: File Format](https://blogs.msdn.microsoft.com/devops/2018/07/02/supercharging-the-git-commit-graph-ii-file-format/)
  - [Supercharging the Git Commit Graph III: Generations and Graph Algorithms](https://blogs.msdn.microsoft.com/devops/2018/07/09/supercharging-the-git-commit-graph-iii-generations/)
  - [Supercharing the Git Commit Graph IV: Bloom Filters](https://blogs.msdn.microsoft.com/devops/2018/07/16/super-charging-the-git-commit-graph-iv-bloom-filters/)

__Light reading__

* [The advantages of an email-driven git workflow](https://drewdevault.com/2018/07/02/Email-driven-git.html)
* [Git Syncing tutorial](https://www.atlassian.com/git/tutorials/syncing) from Atlassian

__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Gabriel Alcaras &lt;<gabriel.alcaras@telecom-paristech.fr>&gt;
with help from Luca Milanesio.
