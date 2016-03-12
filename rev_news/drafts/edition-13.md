---
title: Git Rev News Edition 13 (March 16th, 2016)
layout: default
date: 2016-03-16 21:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 13 (March 16th, 2016)

Welcome to the 13th edition of [Git Rev News](http://git.github.io/rev_news/rev_news.html),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](http://git.github.io/rev_news/rev_news.html) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of February 2016.

## Discussions

<!---
### General
-->

### Reviews

* [config: add '--show-origin' option to print the origin of a config value](http://thread.gmane.org/gmane.comp.version-control.git/286198/)

For some time Lars Schneider has been sending versions of a short
patch series to make it possible to see where a config option comes
from:

- [v1](http://thread.gmane.org/gmane.comp.version-control.git/285553/)
- [v2](http://thread.gmane.org/gmane.comp.version-control.git/285894/)
- [v3](http://thread.gmane.org/gmane.comp.version-control.git/286110/)
- [v4](http://thread.gmane.org/gmane.comp.version-control.git/286197/)
- [v5](http://thread.gmane.org/gmane.comp.version-control.git/286485/)
- [v6](http://thread.gmane.org/gmane.comp.version-control.git/286672/)

Version 1 was itself based on a previous patch by Jeff King.

The new feature could be useful because config options can be set in
many ways. The usual way is to use one of the config files:

- the ".git/config" file at the root of the working directory,
- the user's "~/.gitconfig" file,
- the user's "~/.config/git/config" file, or
- a system wide "/etc/gitconfig" file.

But the exact paths of the above files depend on how git was compiled
and on the values of at least the GIT_CONFIG, GIT_CONFIG_NOSYSTEM,
GIT_DIR and XDG_CONFIG_HOME environment variables.

Also config values can also be set on the command line using the 'git
-c' option, like `git -c <key>=<value> config ...`. Or they can be
read from another file using the 'config -f' option, like `git config
-f <file> ...`, or from the standard input. They can also be included
from another file by using a "include.path = <path>" directive in a
config file.

As can be seen in the above threads, even if it seems simple, there
are a lot of details to get right. These details include the name of
the option. This was discussed by Sebastian Schuberth, Jeff King,
Ramsay Jones, Mike Rappazzo and Junio Hamano. So the name was changed
to '--show-origin'.

Other details that were discussed are about the format of the output
in special cases, like when the 'git -c' option is used, or when the
'config -f' option is used, or when config is read from the standard
input.

The `git config` option also has a lot of different modes depending on
which options it is passed, so it was discussed with which other
options it is ok to pass '--show-origin'.

Many details in the code and tests where also discussed by Eric
Sunshine, Johannes Schindelin, Johannes Sixt, Jeff, Ramsay and Junio.

One nice outcome of this patch series though is that error messages
when there are problems in the config can now tell more precisely
where the problems come from.

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
