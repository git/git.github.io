---
title: Git Rev News Edition 27 (May 17th, 2017)
layout: default
date: 2017-05-17 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 27 (May 17th, 2017)

Welcome to the 27th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of April 2017.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->


### Support

* [Index files autocompletion too slow in big repositories (w / suggestion for improvement)](http://public-inbox.org/git/CAELgYhf1s43p62t6W14S=nDt-O247cPqsPMUDfye1OTnDND3Gg@mail.gmail.com/)

Carlos Pita sent an email to the Git mailing list starting with:

> I'm currently using 'git annex' to manage my entire file collection
> (including tons of music and books) and I noticed how slow
> autocompletion has become for files in the index (say for git add).

Then Carlos showed some changes to the `__git_index_files()` function in
"git-completion.bash" that appear to speed up this function from 0.83
seconds to 0.35 seconds in his repository.

In a latter email he suggested a further change that reduce the time
further to only 0.08 seconds, that is 10 times faster than the
original time.

The changes he showed use `sed` instead of "a while-read-case-echo
bash loop" though, and Carlos wondered if the Git developers wanted to
avoid depending on `sed`.

Ævar Arnfjörð Bjarmason replied:

> It's fine to depend on sed, these shell-scripts are POSIX compatible,
> and so is sed, we use sed in a lot of the built-in shell scripts.

and then encouraged Carlos to submit a patch with his improvements.

Jacob Keller, alias Jake, seconded Ævar's opinion. Junio Hamano, the
Git maintainer, agreed too "as long as the use of `sed` is in line
with POSIX.1". Junio then suggested using sed's `-e` option instead of
its `-r` to improve portability.

Johannes Sixt, alias Hannes, though replied to Carlos that:

> This is about command line completion. We go a long way to avoid forking
> processes there. What is 10x faster on Linux despite of forking a
> process may not be so on Windows.

Jake then suggested using different implementations on Windows and
Linux to get the best speed on each platform, while Junio replied that
the speed of the different implementation also depends on how many
paths have to be processed which depends on the repository size:

> If there are only a few paths, the loop in shell would beat a pipe
> into sed even on Linux, I suspect, and if there are tons of paths, at
> some number, loop in shell would become slower than a single spawning
> of sed on platforms with slower fork, no?

Hannes agreed with Junio saying:

> Absolutely. I just want to make sure a suggested change takes into
> account the situation on Windows, not only the "YESSSS!" and "VERY
> WELL!" votes of Linux users ;)

The discussion stopped at that point, but hopefully it will lead to
some auto completion improvements soon.

## Releases

* [Git v2.13.0](https://github.com/git/git/blob/v2.13.0/Documentation/RelNotes/2.13.0.txt) (and [v2.12.3](https://github.com/git/git/blob/v2.12.3/Documentation/RelNotes/2.12.3.txt), [v2.11.2](https://github.com/git/git/blob/v2.11.2/Documentation/RelNotes/2.11.2.txt), [v2.10.3](https://github.com/git/git/blob/v2.10.3/Documentation/RelNotes/2.10.3.txt), [v2.9.4](https://github.com/git/git/blob/v2.9.4/Documentation/RelNotes/2.9.4.txt), [v2.8.5](https://github.com/git/git/blob/v2.8.5/Documentation/RelNotes/2.8.5.txt), [v2.7.5](https://github.com/git/git/blob/v2.7.5/Documentation/RelNotes/2.7.5.txt), [v2.6.7](https://github.com/git/git/blob/v2.6.7/Documentation/RelNotes/2.6.7.txt), [v2.5.6](https://github.com/git/git/blob/v2.5.6/Documentation/RelNotes/2.5.6.txt), and [v2.4.12](https://github.com/git/git/blob/v2.4.12/Documentation/RelNotes/2.4.12.txt)).
* [Git for Windows v2.13.0](https://github.com/git-for-windows/git/releases/tag/v2.13.0.windows.1)
* [tig 2.2.2](https://public-inbox.org/git/CAFuPQ1KSfKT+UKEdjcQ60sWL-yBGPWUZxhAAQ1AdrAr=VMdGfQ@mail.gmail.com/t/#u)

## Other News

__Various__

* Prathamesh Chavan's ["Incremental rewrite of git-submodules" project](http://public-inbox.org/git/CAME+mvXtA6iZNfErTX5tYB-o-5xa1yesAG5h=iP_Z2_zL_kOnQ@mail.gmail.com/) has been accepted as part of the [Google Summer of Code 2017](https://developers.google.com/open-source/gsoc/). Prathamesh will be mentored by Stefan Beller and Christian Couder.
* [Videos of the Git Merge 2017 presentations](https://www.youtube.com/playlist?list=PL0lo9MOBetEGRAJzoTCdco_fOKDfhqaOY) are now online.
* [Dugite](https://github.com/desktop/dugite) - node.js bindings for Git

__Light reading__

* [How the Creators of Git do Branching](https://hackernoon.com/how-the-creators-of-git-do-branches-e6fcc57270fb), by Raman Gupta

__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt; and
Markus Jansen &lt;<mja@jansen-preisler.de>&gt;
with help from XXX.
