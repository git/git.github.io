---
title: Git Rev News Edition 105 (November 29th, 2023)
layout: default
date: 2023-11-29 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 105 (November 29th, 2023)

Welcome to the 105th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of October 2023 and November 2023.

## Discussions

### General

- Git participates in [Outreachy's December 2023 to March 2024 round](https://www.outreachy.org/alums/2023-12/)

  Achu Luma will work on the "Move existing tests to a unit testing
  framework" project. They will be mentored by Christian Couder.

  Congratulations to Luma for being selected!

  Thanks also to the other contributors who applied and worked on
  micro-projects, but couldn’t be selected! We hope to continue to see
  you in the community!


<!---
### Reviews
-->

<!---
### Support
-->

## Developer Spotlight: Alexander Shopov

* Who are you and what do you do?

  I am Alexander Shopov - a backend engineer in the Amsterdam office of
  Uber working on money related systems. I am a long time translator of
  FOSS software in Bulgarian - I am coordinating translations of GNOME,
  Translation Project and many GNU modules. Bulgarian is an Eastern
  South Slavic language written in the Cyrillic alphabet.

* What would you name your most important contribution to Git?

  I made and now maintain the Bulgarian translation of the text
  interface of Git, Gitk and Git Gui.

* What is the typical workflow of a contributor contributor engaged
  in translation for Git?

  There are 19 translations of the text interface of Git and only 13 of
  them are above 80% so I am not sure about "typical". It is a fairly
  standard workflow for a FOSS project.

  Generally one needs to do the following:

  1. Read the translator-targeted README.md in the po directory
  2. Sync pace with the [calendar of git releases](https://tinyurl.com/gitcal)
  3. Use the [l10n coordinator repository](https://github.com/git-l10n/git-po)
     maintained by Jiang Xin who makes sure translations get integrated upstream.

  Currently the translation is a bit above 5500 messages which is about
  40k words, 250k of characters or about 150 pages of text. It can be
  intimidating for a new translator. But you can definitely make it: be
  patient and translate some messages every release, merge, publish and
  repeat. Even better though harder is getting more than one person
  translating.

* Do you contribute to Git in ways other than providing translation?
  If so, could you elaborate about them?

  Sadly not that much. On rare occasions I improve messages and mark
  strings for translations. Perhaps that will be the way I contribute
  unless I find a mentor and something that I find particularly
  interesting and important for me. So if anyone is willing to mentor
  me, especially in making large repos faster - [ping me](mailto:ash@kambanaria.org).
  I can be a competent tester at least.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  Due to its enormous success, Git is being used on humongous code bases
  with a crazy number of files, directories, commits and branches.
  Working with repos larger than 10GB can be a bit slow. Improving the
  experience will be a great thing.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  Backwards compatibility is massively important and I am thankful
  developers and users are all invested in this.

  If we treat this as a hypothetical question: there are 3 things to Git:
  - The command-line interface;
  - The wire protocol;
  - The storage format;

  The command-line interface is gradually being improved. The wire
  protocol is also a place where there are workarounds for versioning.
  The storage format however is another (quite conservative and public)
  API. I would remove the old versions and try to design it targeting
  projects that are 10-100 times larger than the linux kernel first. In
  for a penny, in for a pound. If we break things, let us break them so
  hard that bards will sing songs about us!

* What is your favorite Git-related tool/library, outside of Git itself?

  I mainly use commandline git plus gitk and git-gui. I do like using
  the meld diff tool when I work on translations.

* Do you happen to have any memorable experience w.r.t contributing
  to the Git project? If yes, could you share it with us?

  The initial getting to 100% translated messages was a challenge. I
  decided that I should translate Git around December 2013. That was
  around 2200 messages at that time and it took me about 3 releases of
  Git to reach 100%. Getting to 100% was immensely hard, rewarding and
  memorable. Afterwards keeping the translation at 100% was much easier.

* Is there something you feel that could be done to ease the life of
  translators?

  The terminology glossary of Git is much larger than 7 years ago and we
  (the translators) should actually update git://repo.or.cz/git-gui.git::po/glossary
  and merge it in Git.

* What is your advice for people who want to start Git development?
  Where and how should they start?

  I don't know to be honest. If I knew I may have started already.

* If there's one tip you would like to share with other Git
  developers, what would it be?

  That would be the tip of master two years in the future. On a more
  serious note - perhaps more tools for migration out of the still
  existing proprietary version control systems will be helpful.


## Other News

__Various__


__Light reading__

<!---
__Easy watching__
-->

__Git tools and sites__


## Releases

+ Git [2.43.0](https://public-inbox.org/git/xmqqzfz8l5or.fsf@gitster.g/),
[2.43.0-rc2](https://public-inbox.org/git/xmqqo7fwxn4s.fsf@gitster.g/),
[2.43.0-rc1](https://public-inbox.org/git/xmqq8r785ev1.fsf@gitster.g/),
[2.43.0-rc0](https://public-inbox.org/git/xmqqy1fgkqg1.fsf@gitster.g/),
[2.42.1](https://public-inbox.org/git/xmqq4ji4m50l.fsf@gitster.g/)
+ Git for Windows [2.43.0(1)](https://github.com/git-for-windows/git/releases/tag/v2.43.0.windows.1),
[2.43.0-rc2(1)](https://github.com/git-for-windows/git/releases/tag/v2.43.0-rc2.windows.1),
[2.43.0-rc1(1)](https://github.com/git-for-windows/git/releases/tag/v2.43.0-rc1.windows.1),
[2.43.0-rc0(1)](https://github.com/git-for-windows/git/releases/tag/v2.43.0-rc0.windows.1)
+ GitLab [16.6](https://about.gitlab.com/releases/2023/11/16/gitlab-16-6-released/)
[16.5.2](https://about.gitlab.com/releases/2023/11/14/gitlab-16-5-2-released/),
[16.5.1, 16.4.2, 16.3.6](https://about.gitlab.com/releases/2023/10/31/security-release-gitlab-16-5-1-16-4-2-16-3-6-released/)
+ Gerrit Code Review [3.6.8](https://www.gerritcodereview.com/3.6.html#368),
[3.7.6](https://www.gerritcodereview.com/3.7.html#376),
[3.8.3](https://www.gerritcodereview.com/3.8.html#383),
[3.9.0](https://www.gerritcodereview.com/3.9.html#390)
+ GitHub Enterprise [3.11.0](https://help.github.com/enterprise-server@3.11/admin/release-notes#3.11.0)
+ GitKraken [9.10.0](https://help.gitkraken.com/gitkraken-client/current/)
+ GitHub Desktop [3.3.5](https://desktop.github.com/release-notes/)
+ Tower for Windows [5.2](https://www.git-tower.com/blog/tower-windows-52/)
+ Tower for Mac [10.2](https://www.git-tower.com/blog/tower-mac-102/)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Bruno Brito.
