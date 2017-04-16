---
title: Git Rev News Edition 26 (April 19th, 2017)
layout: default
date: 2017-04-19 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 26 (April 19th, 2017)

Welcome to the 26th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of March 2017.

## Discussions


### General

* [Will OpenSSL's license change impact us?](http://public-inbox.org/git/CACBZZX6F47uC9jLxppgkUnwVpGV2jpzzP4kwTuqKgayCevomeA@mail.gmail.com/)

Ævar Arnfjörð Bjarmason sent an email saying that OpenSSL is
[changing its license](https://www.openssl.org/blog/blog/2017/03/22/license/)
to the Apache 2 license, which is
[considered incompatible with the GPL v2](https://www.gnu.org/licenses/license-list.html#apache2)
that Git uses for most of its code.

By default Git uses OpenSSL both for its implementation of the SHA-1
algorithm and in `git imap-send`.

Yves Orton replied by quoting the
[GPL compatibility page on the Apache web site](https://www.apache.org/licenses/GPL-compatibility.html)
which is not very clear about the incompatibilities between the Apache
2 and the different GPL versions.

Theodore Ts'o then chimed in to "suggest that we not play amateur
lawyer on the mailing list" and leave it to the distributions to
decide on their own.

Ævar agreed on that but proposed a new flag to the Makefile to declare
"yes I'm OK with combining AL2 + GPLv2".

Brian Carlson wrote "that most distros don't link against OpenSSL"
already, and suggested using
[Nettle](https://en.wikipedia.org/wiki/Nettle_(cryptographic_library)),
an LGPL crypto library that also has SHA-3 which could be used to
replace SHA-1 in the long run.

But Ævar replied that we also use OpenSSL in `git imap-send` for its
TLS implementation, so it is not enough to use a different SHA-1
implementation.

About that Peff wrote that, when building with NO_OPENSSL, `git imap-send`
uses the curl imap implementation instead of our custom imap
implementation that can optionally use OpenSSL. Curl itself may be
compiled to use either OpenSSL or GnuTLS.

<!---
### Reviews
-->

<!---
### Support
-->

## Releases


## Other News

__Various__


__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt; and
Markus Jansen &lt;<mja@jansen-preisler.de>&gt;
with help from XXX.
