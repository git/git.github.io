---
title: Git Rev News Edition 10 (December 9th, 2015)
layout: default
date: 2015-12-09 21:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 10 (December 9th, 2015)

Welcome to the 9th edition of [Git Rev News](http://git.github.io/rev_news/rev_news.html),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](http://git.github.io/rev_news/rev_news.html) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of November 2015.

## Discussions

<!---
### General
-->

### Reviews

* [clean: new option --exclude-from](http://thread.gmane.org/gmane.comp.version-control.git/281762)

James Rouzier sent a patch to add a new `--exclude-from=<file>` option
to `git clean`. It looked quite straightforward, but as often Eric
Sunshine found many small things that could be improved upon. James
and Eric then agreed on what should be done, and it looked that a
clear roadmap had been set for this new feature.

That's when Jeff King, alias Peff, wrote the following:

> Lots of commands care about excludes (e.g., "add", "status").
> 
> Should this perhaps be an option to the main "git" to append to the set
> of excludes?
> 
> You can kind-of do this already with:
> 
>   git -c core.excludesfile=/path/to/whatever clean ...
> 
> but of course you might be using core.excludesfile already. I wonder if
> that config option should take multiple values and respect all of them,
> rather than last-one-wins.

This started a discussion between Junio Hamano, the git maintainer,
and Peff about how exclude files should be specified to commands.

It is a complex topic because there are already different ways to pass
an exclude file, for example there is also `.git/info/exclude`. And
there is the question of how the option should be passed to sub
commands.

In the end it appears not clear if the patch will be accepted.

* [remote-http(s): Support SOCKS proxies](http://thread.gmane.org/gmane.comp.version-control.git/280191)

In a patch series called
["Miscellaneous platform-independent patches from Git for Windows"](http://thread.gmane.org/gmane.comp.version-control.git/280190/)
Johannes Schindelin, alias Dscho, sent a patch from Pat Thoyts that adds SOCKS proxies support to Git:

> With this patch we properly support SOCKS proxies, configured e.g. like
> this:
> 
> 	git config http.proxy socks5://192.168.67.1:32767
> 
> Without this patch, Git mistakenly tries to use SOCKS proxies as if they
> were HTTP proxies, resulting in a error message like:
> 
> 	fatal: unable to access 'http://.../': Proxy CONNECT aborted
> 
> This patch was required to work behind a faulty AP and scraped from
> http://stackoverflow.com/questions/15227130/#15228479 and guarded with
> an appropriate cURL version check by Johannes Schindelin.

The last paragraph made Junio Hamano wonder "What is the licensing
status of the original at SO?"

James McCoy answered that [according to Stackoverflow](https://stackoverflow.com/help/licensing)
"all user contributions are licensed under Creative Commons Attribution-Share Alike".

Unfortunately as Junio replied, the Creative Commons Attribution-Share
Alike, alias BY-SA, does not mesh well with GPLv2 tat Git uses. That's
why Dscho asked Pat if he could give his Signed-off-by mention,
which would mean that he agrees to relicense his work under the GPLv2.

Junio after consulting the Git projet lawyers replied that asking Pat
was indeed the best thing to do.

Ten days later Pat eventually gave his Signed-off-by which fixed the
problem.


<!---
### Support
-->

## Releases


## Other News

__Various__


__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt; and Nicola Paolucci &lt;<npaolucci@atlassian.com>&gt;,
with help from XXX.
