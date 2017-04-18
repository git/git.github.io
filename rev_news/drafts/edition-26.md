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

About that Jeff King, alias Peff, wrote that, when building with
NO_OPENSSL, `git imap-send` uses the curl imap implementation instead
of our custom imap implementation that can optionally use
OpenSSL. Curl itself may be compiled to use either OpenSSL or GnuTLS.

<!---
### Reviews
-->


### Support

* [Stable GnuPG interface, git should use libgpgme](http://public-inbox.org/git/201703101100.15214.bernhard.reiter@intevation.de)

Bernhard Reiter emailed the Git mailing list, with the gnupg-devel
mailing list in Cc, to suggest using libgpgme for interfacing to
GnuPG, instead of using "an pipe-and-exec approach to running a GnuPG
binary".

He refered to the
[documentation of the "gpg.program" config option](https://github.com/git/git/blob/3bc53220cb2dcf709f7a027a3f526befd021d858/Documentation/config.txt#L1572-L1581)
and warned that "the gpg command-line interface is not considered an
official API to GnuPG by the GnuPG-devs and thus potentially
unstable", though "Git is only using a small part of the interface, so
the risk when keeping the current way is small."

Bernhard, who is involved in GnuPG development, anyway wrote that "using
libgpgme is the way what GnuPG-devs would recommend" as can be seen on
the [GPGME API web page](https://wiki.gnupg.org/APIs).

He also reported a problem with `gpg2` vs `gpg`. He has both gpg and
gpg2 installed, but his ".gnupg" configuration file is gpg2 specific,
and Git by default uses `gpg` for signing, which fails with his
".gnupg".

Ævar Arnfjörð Bjarmason asked for more information about the actual
bug and the versions of gpg and gpg2 involved, hoping that it could
be possible to write patches to fix compatibility problems.

To that Michael J Gruber later replied:

> The problem is the "difficult" upgrade path and mixed installations with
> gpg and gpg2.1+ that some distributions force upon you...

and after describing possible problems:

> In short: Users will run into problems anyway; git provides the quick
> way out (git config gpg.program gpg2), users won't be as lucky with
> other things that require gpg.

Michael also wrote that "while - technically speaking - the command
line is not a stable API for gpg, it does work across versions of gpg",
though maybe this will change with gpg 2.2.

Linus Torvalds replied to Bernhard with:

> Quite frankly, I will NAK this just based on previous bad experiences
> with using "helpful" libraries.

and then explained what "the problems with libraries in this context
tend to be". For each problem: "hard to personalize", "existing
configuration", "UI" and "library versioning", he gave interesting
explanations and examples.

He concluded with:

> Of course, maybe pgpme is a world first, and actually does read your
> .gnupg/config file trivially, and has all the gpg agent integration
> that it picks up automatically, and allows various per-user
> configurations, and all my worries are bogus.
>
> But that would literally be the first time I've ever seen that.

About the "library versioning", Linus wrote:

> I don't know why, but I've never *ever* met a library developer who
> realized that libraries were all about stable API's, and the library
> users don't want to fight different versions.

but Ted Ts'o replied to the above:

> Actually, you have.  (Raises hand :-)
>
> libext2fs has a stable API *and* ABI.  We add new functions instead of
> changing function parameters (so ext2fs_block_iterate2() is
> implemented in terms of ext2fs_block_iterate3(), and so on).  And
> structures have magic numbers that have served as versioning signal.

and:

> I do have to agree with your general point, that most developers tend
> to be *incredibly* sloppy with their interfaces.  That being said, not
> all library developers are as bad as GNOME.  :-)

Brian Carlson also replied to Bernhard, asking "whether gpgme supports
[gpgsm](https://linux.die.net/man/1/gpgsm)", and wondering "what
happens to the git verify-* --raw output" as this output can be used
when scripting signature verification.

Brian further explained his concerns with:

> This is not an idle consideration; we have automated systems at work
> that update software automatically and submit it for human review,
> including verifying signatures and hashes. This saves hundreds of hours
> of staff time and results in better security.

The possibilities to write a wrapper script around gpg, to mimic the gpg
API, and to filter the gpg output worried him too.

Following all the above discussions Bernhard replied first to
AEvar. He gave the requested information about the versions he has
been using, and the error messages displayed when gpg accessed his
"~/.gnupg/gpg.conf" that contains gpg2-only config options.

Bernhard suggested using a "~/.gnupg/gpg.conf-2" config file, or Git
to "try `gpg2` first and then fall back to `gpg` or `gpgv` in case
only these versions are available" as workarounds, but he still thought
that it is was worth using libgpgme.

To Linus, Bernhard wrote that "it is too early to say that libgpgme
would be right choice for git", but "it should be seriously
considered", and:

> Grateful that you have written down some of your concern, let me try
> to give you some pointers.

Bernhard then replied to each of the points Linus had raised. About
"library versioning" his reply was:

> In my experience Werner (the lead GnuPG developers) is quite reasonable about
> keeping APIs stable (he often goes out of his way to keep even the command
> line version stable, maybe he shouldn't do that to the command line options
> so you are more motivated to go to this official API gpgme. >:) )

and he concluded with:

> Your concerns are understandable, I've seen similiar problems with "library vs
> program" and the unix tools box approach gives a number of lessons on how to
> losely couple components. Thanks again for taking the time and writing them
> down. I've given you some pointers why gpgme indeed could be different and
> may be an improvement for git (or other applications). I guess one of the
> next steps would be for someone to look for specific points or try gpgme for
> git purposes. Me and gnupg-devel@ are happy to take your questions or get
> feedback.

Bernhard also replied to Brian and Michael, addressing at least some
of their concerns.

But Jeff King, alias Peff, in turn replied to Bernhard, stressing that
"the existing config option will have to stay" to avoid breaking
existing "exotic" setups.

Bernhard, Michael as well as Christian Neukirchen, Peter Lebbing and
Werner Koch, the lead GnuPG developer, further discussed some points,
but in the end it doesn't look like things will change much in this
area for the foreseeable future.


## Releases

* Git [v2.12.2](http://public-inbox.org/git/xmqqa88a74pg.fsf@gitster.mtv.corp.google.com/)
* Git for Windows [2.12.2](https://github.com/git-for-windows/git/releases/tag/v2.12.2.windows.1) and [2.12.2(2)](https://github.com/git-for-windows/git/releases/tag/v2.12.2.windows.2)
* GitLab released a major [9.0](https://about.gitlab.com/2017/03/22/gitlab-9-0-released/) along with patches [9.0.4, 8.17.5, and 8.16.9](https://about.gitlab.com/2017/04/05/gitlab-9-dot-0-dot-4-security-release/)
* [JGit / EGit Release 4.7](http://dev.eclipse.org/mhonarc/lists/jgit-dev/msg03332.html) and [v4.5.2](http://dev.eclipse.org/mhonarc/lists/jgit-dev/msg03333.html)
* ObjectiveGit [0.13.0](https://github.com/libgit2/objective-git/releases/tag/0.13.0)

## Other News

__Various__

* Stefan Beller sent
  ["[RFC PATCH] git-news: obtain latest news for your favorite VCS"](http://public-inbox.org/git/20170331235947.20010-1-sbeller@google.com/)
  on April 1st :-)
* Microsoft is [Shutting down CodePlex](https://blogs.msdn.microsoft.com/bharry/2017/03/31/shutting-down-codeplex/)
* [New novel: “git commit murder”](https://blather.michaelwlucas.com/archives/2913), by Michael Lucas
* [Reinventing Git interface](http://tonsky.me/blog/reinventing-git-interface/), by Nikita Prokopov

__Light reading__

* [The beginning of Git supporting other hash algorithms](https://news.ycombinator.com/item?id=13906804), as discussed on Hacker News
* [Better Git configuration](https://blog.scottnonnenberg.com/better-git-configuration/), by Scott Nonnenberg
* [Using git bisect](https://dev.to/gonedark/using-git-bisect), by Jason McCreary
* Longest answer for a Git question I've seen on StackOverflow here: [How to change the starting point of a branch?](http://stackoverflow.com/questions/38427050/how-to-change-the-starting-point-of-a-branch/38430972#38430972)
* [How To Host Your Own Private Git Repositories](https://eklitzke.org/how-to-how-your-own-private-git-repositories), by Evan Klitzke
* [Configure Git Pairs with Magit](http://www.danieldeaguiar.com/git-pair/), by Daniel De Aguiar

__Git tools and sites__

* [git-ssb: Decentralized git repo hosting and issue tracking on secure-scuttlebutt (SSB).](https://github.com/clehner/git-ssb)
* [git-reverse.sh: Bash script to reverse a git repo.](https://github.com/gsylvie/git-reverse.sh)
* [rebase-editor: Simple terminal based sequence editor for git interactive rebase.](https://github.com/sjurba/rebase-editor)
* [git_local: A lightweight git command line wrapper in Ruby](https://github.com/GalvanizeOpenSource/git_local)
* [git forget: cleanup your local git branches](https://tomschlick.com/2017/03/20/git-forget)
* [omgf: Use Git Flow with ease](https://github.com/InternetGuru/omgf/)
* [GitFinder - Git client for macOS with Finder integration](https://www.reddit.com/r/git/comments/5z73w3/gitfinder_git_client_for_macos_with_finder/)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt; and
Markus Jansen &lt;<mja@jansen-preisler.de>&gt;
with help from XXX.
