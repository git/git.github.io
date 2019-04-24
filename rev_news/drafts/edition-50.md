---
title: Git Rev News Edition 50 (April 26th, 2019)
layout: default
date: 2019-04-26 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 50 (April 26th, 2019)

Welcome to the 50th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of March 2019.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->


### Support

* [Can't build first git commit](https://public-inbox.org/git/1551729517.4092.1.camel@libero.it/)

Fabio Aiuto asked for support on the Git mailing list as he was trying
to build [the first commit of Git made by Linus in April 2005](https://github.com/git/git/commit/e83c5163316f89bfbde7d9ab23),
but was getting "undefined reference to symbol" errors related to the Openssl library.

Santiago Torres replied suggesting him to use a toolchain from around
the time the commit was made and using an earlier Openssl library.

Fabio replied that he would have liked to "to debug around that simple
version, to understand how everithing works".

Santiago suggested playing with libgit2, that has a smaller code base,
and its python bindings that "abstract the memory management and other
low-level stuff".

Jeff King, alias Peff, suggested linking with -lcrypto instead of
-lssl and also adding -lz to the Makefile or the command line. He said
that: `make LIBS='-lcrypto -lz'` works for him and that he "used
periodically check that Git v1.0 can fetch happily from GitHub".

"asymptosis" chimed in to suggest working through
[the "Git Internals" chapter in the Git Book](https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain)
to understand how Git works. He also pointed to a
[Git re-implementation as simple bash scripts](https://notabug.org/cryptarch/sgit)
he has started to understand that chapter.

Jonathan Nieder recommended reading the
[Hackng Git chapter in the user manual documentation](https://www.kernel.org/pub/software/scm/git/docs/user-manual.html#hacking-git)
that comes with Git.

Peff then reported that he managed again to build Git version 1.0.0
from December 2005 with `make NO_OPENSSL=Nope` and to use it to fetch
from GitHub.

Fabio replied that he also succeeded in building the first commit of
Git made by Linus.

Fabio, Santiago and Peff then discussed the fact that it was still
possible to build a 15 year old codebase with a modern toolchain. Peff
explained that it's possible because "Git has very few external
dependencies", and other than that, Git "just depends on a reasonable
C compiler and a POSIX libc, both of which have been standardized for
decades".

Then Fabio reported a segfault in the version he had built. Peff
reproduced it and showed how to work around it.

Fabio thanked Peff and "asymptosis". He said he would "go on studying
git this way, and follow all the improvements that were made along his
history".


<!---
## Developer Spotlight:
-->

## Releases

+ Bitbucket Server [6.2](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ Gerrit Code Review [2.13.14](https://www.gerritcodereview.com/2.13.html#21314),
[2.14.20](https://www.gerritcodereview.com/2.14.html#21420),
[2.15.13](https://www.gerritcodereview.com/2.15.html#21513)
+ GitHub Enterprise [2.16.6](https://enterprise.github.com/releases/2.16.6/notes),
[2.15.11](https://enterprise.github.com/releases/2.15.11/notes),
[2.14.18](https://enterprise.github.com/releases/2.14.18/notes),
[2.16.5](https://enterprise.github.com/releases/2.16.5/notes),
[2.15.10](https://enterprise.github.com/releases/2.15.10/notes),
[2.14.17](https://enterprise.github.com/releases/2.14.17/notes),
[2.13.23](https://enterprise.github.com/releases/2.13.23/notes)
+ GitLab [11.10](https://about.gitlab.com/2019/04/22/gitlab-11-10-released/),
[11.9.8](https://about.gitlab.com/2019/04/11/gitlab-11-9-8-released/),
[11.9.7](https://about.gitlab.com/2019/04/10/critical-security-release-gitlab-11-dot-9-dot-7-released/),
[11.9.6](https://about.gitlab.com/2019/04/04/gitlab-11-9-6-released/),
[11.9.4](https://about.gitlab.com/2019/04/01/security-release-gitlab-11-dot-9-dot-4-released/),
[11.9.1](https://about.gitlab.com/2019/03/26/gitlab-11-9-1-released/),
[11.9](https://about.gitlab.com/2019/03/22/gitlab-11-9-released/)
+ GitKraken [5.0.4](https://support.gitkraken.com/release-notes/current),
[5.0.3](https://support.gitkraken.com/release-notes/current),
[5.0.2](https://support.gitkraken.com/release-notes/current),
[5.0.1](https://support.gitkraken.com/release-notes/current),
[5.0.0](https://support.gitkraken.com/release-notes/current)

## Other News

__Various__


__Light reading__

* [Sending patches by email with Git](https://flusp.ime.usp.br/git/2019/02/15/sending-patches-by-email-with-git/)
  by Matheus Tavares and [https://git-send-email.io/](https://git-send-email.io/)
  by sourcehut are two articles on how to setup and use Git's send-email
  command.

__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Gabriel Alcaras &lt;<gabriel.alcaras@telecom-paristech.fr>&gt;
with help from Luca Milanesio.
