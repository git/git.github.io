---
title: Git Rev News Edition 5 (July 8th, 2015)
layout: default
date: 2015-07-08 21:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 5 (July 8th, 2015)

Welcome to the fifth edition of [Git Rev News](http://git.github.io/rev_news/rev_news.html),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](http://git.github.io/rev_news/rev_news.html) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of June 2015.

## Discussions

<!---
### General
-->



### Reviews

* [Warning when charset conversion did not happen due to iconv compiled out](http://thread.gmane.org/gmane.comp.version-control.git/270952/)

Max Kirillov proposed a patch to warn when a conversion from a
character set to another character set could not happen because iconv
has not been compiled into Git.

Iconv is one of the few C libraries that people can compile either in
or out of Git. Most of the time though they choose to compile it in,
because it makes it possible to convert text, like commit messages,
between character sets, as long, of course, as the requested character
sets are installed on the system.

For example when one uses [git-am](http://git-scm.com/docs/git-am) to
create a commit from a patch sent in an email,
[git-mailinfo](http://git-scm.com/docs/git-mailinfo) is called to
extract from the email the information needed to create the
commit. When doing that git-mailinfo also by default tries to use
iconv to convert the commit message, the author name and the author
email from the email encoding to UTF-8.

Junio replied to Max's patch with:

> I actually am OK if the user gets exactly the same warning between
> the two cases:
>
> - iconv failed to convert in the real reencode_string_len()
>
> - we compiled out iconv() and real conversion was asked.
>
> and this patch is about the latter; I do not think it is reasonable
> to give noise only for the latter but not for the former.

and later he explained:

> After all, if you had to convert between UTF-8 and ISO-2022-JP, the
> latter of which your system does not support, whether you use
> iconv-disabled build of Git or iconv-enabled build of Git, we pass
> the bytestream through, right?  Your patch gives warning for the
> former (which is a good starting point if we want to warn "user
> expected them to be converted, we didn't" case) but does not do
> anything to the latter, even though users of the iconv-disabled
> build is more likely to be aware of the potential issue (and are
> likely to be willing to accept that) than the ones with
> iconv-enabled build that runs on a system that cannot convert the
> specific encoding.

Hopefully Max will send an updated patch that will take Junio's
suggestion into account.

<!---
### Support
-->


## Releases

* [git-multimail](https://github.com/git-multimail/git-multimail) [1.1.0](https://github.com/git-multimail/git-multimail/releases/tag/1.1.0) was released. git-multimail is a tool to send notification emails for pushes to a git repository. It is also available in the `contrib/hooks/multimail/` directory of Git's source tree (version 1.1.0 will be distributed with Git 2.5).

## Other News

__Various__

* As part of a school project, Antoine DELAITE, Remi GALAN ALFONSO, Remi LESPINET, Guillaume PAGES and Louis-Alexandre STUBER, from [Ensimag](http://ensimag.grenoble-inp.fr/), contributed to Git. As a warm-up, they implemented a `am.threeWay` configuration variable to have `git am` use `-3` by default (will be in Git 2.5). Some patch series are being polished to allow `git bisect` to use an arbitrary pair of terms instead of `good` and `bad`, an improved management of list of addresses and aliases in the `--to`, `--cc` and `--bcc` options of `git send-email`, a more verbose output for `git status` when ran during a `rebase -i` session, and a safety feature for `git rebase` to avoid dropping lines by mistake in the todo-list.

* Both of the Git project [Google Summer of Code](http://www.google-melange.com/gsoc/document/show/gsoc_program/google/gsoc2015/about_page)
students, Paul Tan and Karthik Nayak have passed the midterm evaluation and are doing well. Karthik is working on
[unifying the implementations of `git branch -l`, `git tag -l`, and `git for-each-ref`](https://github.com/KarthikNayak/git/commits/ref_filter)
and Paul is working on [porting git-pull from shell to C](https://github.com/pyokagan/git/commits/pt/builtin-pull)
and on [porting git-am from shell to C too](https://github.com/pyokagan/git/commits/pt/builtin-am).

__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt; and Nicola Paolucci &lt;<npaolucci@atlassian.com>&gt;
with help from Junio C Hamano and Matthieu Moy.
