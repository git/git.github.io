---
title: Git Rev News Edition 113 (July 31st, 2024)
layout: default
date: 2024-07-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 113 (July 31st, 2024)

Welcome to the 113th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of June 2024 and July 2024.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

<!---
### Support
-->


## Developer Spotlight: Rubén Justo

* Who are you and what do you do?

  My name is Rubén, and that's how it's spelled correctly.  However,
  some old friends call me Ruben because when we were kids changing
  names was a sign of friendship.  Changing the accent from "ben" to
  "ru", makes the letter 'e' lose its tilde when writing my name.

  My $dayjob is not related to Git, but I use it quite often during the
  workday.  Using it sometimes gives me an itch that I often can't
  resist trying to scratch.

* What would you name your most important contribution to Git?

  I can't think of any worth mentioning.  But I'll say something in the
  other direction;  contributing to Git has not only meant solving some
  itches, but it has clearly made me improve my overall work style.
  I'm grateful for that.

* What are you doing on the Git project these days, and why?

  This can be read at any time: polishing up some itches that has come
  up for me or a colleague.

  Lately, though, I find myself exploring more and more side issues
  that arise during iterations of the changes I was originally
  interested in.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  I'll say a feasible one: something _in Git_ that allows me to avoid
  writing shortcuts like `@{-1}`, `@{1}`, `@{...`

  At least on my keyboard, it's a pain to type `@`, `{...}`.  And I
  tend to type those shortcuts a lot.

  Perhaps too easy for the experts and they'll have a lot of spare time
  during the year?

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  I think that backwards compatibility is overrated most of the time.
  It's usually a matter of getting on with it and time;  sometimes a lot
  of time, I admit.

  The steps being taken towards Git 3.0 seem very interesting to me
  [[ref 1](https://public-inbox.org/git/xmqqa5l2y6aa.fsf_-_@gitster.g/)]
  [[ref 2](https://public-inbox.org/git/cover.1718345026.git.ps@pks.im/)].
  Perhaps there is an opportunity to do some breaking changes.  I don't
  have any in mind, though.

 * What is your favorite Git-related tool/library, outside of
   Git itself?

   Definitely: ["tig"](https://jonas.github.io/tig/).

* Do you happen to have any memorable experience w.r.t. contributing
  to the Git project? If yes, could you share it with us?

  Nope.

* What is your toolbox for interacting with the mailing list and for
  development of Git?

  To interact with the list, I mainly use ["lei"](https://people.kernel.org/monsieuricon/lore-lei-part-1-getting-started),
  ["mutt"](http://www.mutt.org/) and ["thunderbird"](https://www.thunderbird.net/en-US/)
  in a rather makeshift way.  Maybe someday I'll finally configure
  [git send-email](https://git-send-email.io/).

  In fact, more often than not, when I send a patch, I have the feeling
  that someone is going to come along and say: "Come on, Rubén.  That
  User-Agent?  Set up a decent environment to send this properly".

  To develop, I use Vim (without any additional plugins).

* What is your advice for people who want to start Git development?
  Where and how should they start?

  Perhaps I would say that writing and reading code are not the most
  important skills in a project like Git.  Empathy and the development
  of effective arguments to convey ideas or intentions are much more
  crucial.

  Realizing and internalizing that, is a solid starting point, I think.

* If there's one tip you would like to share with other Git
  developers, what would it be?

  Keep in mind that reviewing code is much harder than writing it, but
  writing a good message for the commit is even harder.


## Other News

__Various__


__Light reading__

<!---
__Easy watching__
-->

__Git tools and sites__


## Releases

+ Git [2.46.0](https://public-inbox.org/git/xmqqzfq0i0qa.fsf@gitster.g/),
[2.46.0-rc2](https://public-inbox.org/git/xmqq7cdavgqa.fsf@gitster.g/),
[2.46.0-rc1](https://public-inbox.org/git/xmqqwmlivcdp.fsf@gitster.g/),
[2.46.0-rc0](https://public-inbox.org/git/xmqqjzhqmt22.fsf@gitster.g/)
+ Git for Windows [2.46.0(1)](https://github.com/git-for-windows/git/releases/tag/v2.46.0.windows.1),
[2.46.0-rc2(1)](https://github.com/git-for-windows/git/releases/tag/v2.46.0-rc2.windows.1),
[2.46.0-rc1(1)](https://github.com/git-for-windows/git/releases/tag/v2.46.0-rc1.windows.1),
[2.46.0-rc0(1)](https://github.com/git-for-windows/git/releases/tag/v2.46.0-rc0.windows.1)
+ GitLab [17.2.1, 17.1.3, 17.0.5](https://about.gitlab.com/releases/2024/07/24/patch-release-gitlab-17-2-1-released/),
[17.2](https://about.gitlab.com/releases/2024/07/18/gitlab-17-2-released/),
[17.1.2, 17.0.4, 16.11.6](https://about.gitlab.com/releases/2024/07/10/patch-release-gitlab-17-1-2-released/)
+ GitHub Enterprise [3.13.2](https://help.github.com/enterprise-server@3.13/admin/release-notes#3.13.2),
[3.12.7](https://help.github.com/enterprise-server@3.12/admin/release-notes#3.12.7),
[3.11.13](https://help.github.com/enterprise-server@3.11/admin/release-notes#3.11.13),
[3.10.15](https://help.github.com/enterprise-server@3.10/admin/release-notes#3.10.15),
[3.9.18](https://help.github.com/enterprise-server@3.9/admin/release-notes#3.9.18)
+ GitKraken [10.1.1](https://help.gitkraken.com/gitkraken-client/current/),
[10.1.0](https://help.gitkraken.com/gitkraken-client/current/)
+ Garden [1.7.0](https://github.com/garden-rs/garden/releases/tag/v1.7.0)
+ Git Cola [4.8.1](https://github.com/git-cola/git-cola/releases/tag/v4.8.1)
+ git-credential-oauth [0.13.0](https://github.com/hickford/git-credential-oauth/releases/tag/v0.13.0)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
