---
title: Git Rev News Edition 121 (March 31st, 2025)
layout: default
date: 2025-03-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 121 (March 31st, 2025)

Welcome to the 121st edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of February 2025 and March 2025.

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

## Developer Spotlight: Peter Krefting

* **Who are you and what do you do?**

  My name is Peter Krefting and I am a software engineer. Hailing from Sweden,
  I moved to Norway for my first job, at Opera Software, mostly working on
  internals such as Unicode support and internal libraries. I ended up staying
  in Norway and am currently working for a small company providing monitoring
  equipment for digital TV.

* **What are you doing on the Git project these days, and why?**

  My answer to these two are the same, I am the maintainer of the
  [Swedish translation of Git](https://github.com/git-l10n/git-po/blob/master/po/sv.po).
  I like having software running in my own language, and sometimes
  you have to take matters in your own hands.

* **If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?**

  I think [`git gui`](https://git-scm.com/docs/git-gui) and
  [`gitk`](https://git-scm.com/docs/gitk) could need some extra love,
  these are my daily drivers, in addition to the command line.

* **Is there something that developers could do to ease the life of
  translators?**

  My main gripe is using library function names as verbs,
  like `cannot fsync`. That's hard to read even in the original
  language, even for a C developer like myself.

* **What is your favorite Git-related tool/library, outside of
  Git itself?**

  I like simple and clean interfaces, so using [cgit](https://wiki.archlinux.org/title/Cgit)
  to visualize history on a web server is very nice.

* **What is your toolbox for interacting with the mailing list and for
  development of Git?**

  I mostly just read the mailing list, and only a small percentage of the
  posts to it; the localization is handled through [GitHub pull requests](https://github.com/git-l10n/git-po/pulls?q=is%3Apr),
  so that's where that work happens. The few patches I have sent to the
  mailing list have been very manual, using `git format-patch` and
  the [Alpine mail client](https://alpineapp.email/).

* **What is your advice for people who want to start Git development?
  Where and how should they start?**

  Find some small part you want to improve, and work on that. Git is a
  fairly complex piece of software, implemented in several different
  languages, making it hard to get an overview. I most definitely do not,
  even if I have read (and translated) most of the user-visible strings.


## Other News

__Various__


__Light reading__

<!---
__Easy watching__
-->

__Git tools and sites__


## Releases

+ Git [2.49.0](https://public-inbox.org/git/xmqqfrjfilc8.fsf@gitster.g/),
[2.49.0-rc2](https://public-inbox.org/git/xmqq34fk958s.fsf@gitster.g/),
[2.49.0-rc1](https://public-inbox.org/git/xmqqjz94r8p0.fsf@gitster.g/)
+ Git for Windows [2.49.0(1)](https://github.com/git-for-windows/git/releases/tag/v2.49.0.windows.1),
[2.49.0-rc2(1)](https://github.com/git-for-windows/git/releases/tag/v2.49.0-rc2.windows.1),
[2.49.0-rc1(1)](https://github.com/git-for-windows/git/releases/tag/v2.49.0-rc1.windows.1)
+ GitLab [17.10.1, 17.9.3, 17.8.6](https://about.gitlab.com/releases/2025/03/26/patch-release-gitlab-17-10-1-released/),
[17.10](https://about.gitlab.com/releases/2025/03/20/gitlab-17-10-released/),
[17.9.2, 17.8.5, 17.7.7](https://about.gitlab.com/releases/2025/03/12/patch-release-gitlab-17-9-2-released/)
+ GitHub Enterprise [3.16.1](https://help.github.com/enterprise-server@3.16/admin/release-notes#3.16.1),
[3.15.5](https://help.github.com/enterprise-server@3.15/admin/release-notes#3.15.5),
[3.14.10](https://help.github.com/enterprise-server@3.14/admin/release-notes#3.14.10),
[3.13.13](https://help.github.com/enterprise-server@3.13/admin/release-notes#3.13.13),
[3.12.17](https://help.github.com/enterprise-server@3.12/admin/release-notes#3.12.17),
[3.16.0](https://help.github.com/enterprise-server@3.16/admin/release-notes#3.16.0),
[3.15.4](https://help.github.com/enterprise-server@3.15/admin/release-notes#3.15.4),
[3.14.9](https://help.github.com/enterprise-server@3.14/admin/release-notes#3.14.9),
[3.13.12](https://help.github.com/enterprise-server@3.13/admin/release-notes#3.13.12),
[3.12.16](https://help.github.com/enterprise-server@3.12/admin/release-notes#3.12.16)
+ GitKraken [10.8.0](https://help.gitkraken.com/gitkraken-client/current/)
+ GitHub Desktop [3.4.18](https://desktop.github.com/release-notes/)
+ git-credential-azure [0.3.1](https://github.com/hickford/git-credential-azure/releases/tag/v0.3.1)
+ git-credential-oauth [0.15.0](https://github.com/hickford/git-credential-oauth/releases/tag/v0.15.0)
+ GitButler [0.14.14](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.14.14),
[0.14.13](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.14.13)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
