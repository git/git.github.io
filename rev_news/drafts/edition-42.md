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

<!---
### General
-->

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
strcasecmp() to check if filemanes diff only by case, but in some
cases, especially related to utf8 names, a filesystem could use
complex folding rules which we would need to follow.

Brian replied to Peff saying that it was indeed possible to detect the
issue at checkout time, and Duy replied that it was actually what his
patch was doing.

Duy, Peff and Jeff Hostetler then agreed that it would be difficult to
follow complex folding rules that a filesystem might use.

Duy then started sending [a real patch in its own email](https://public-inbox.org/git/20180730152756.15012-1-pclouds@gmail.com/).

Junio Hamano chimed in to suggest a different implementation and a
long discussion thread followed about how to best find all the
colliding paths.

Duy sent [a version 2 of his patch](https://public-inbox.org/git/20180807190110.16216-1-pclouds@gmail.com/).

The previous long discussion thread continued following this patch though.

Duy sent [a version 3](https://public-inbox.org/git/20180810153608.30051-1-pclouds@gmail.com/)
that actually tries to find all the colliding paths on "UNIXy platforms"
and then [a version 4](https://public-inbox.org/git/20180812090714.19060-1-pclouds@gmail.com/).

A discussion and a patch about clarifying the documentation of the
`core.checkStat` config option followed.

Duy then recently sent [a version 5](https://public-inbox.org/git/20180817161645.28249-1-pclouds@gmail.com/)
which tries to find all the colliding paths on Windows too,
and [a version 6](https://public-inbox.org/git/20180817180039.GA31789@duynguyen.home/)
to address a few more comments.

It looks like the latest version will be merged to the "next" branch soon.

<!---
## Developer Spotlight:
-->

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
with help from XXX.
