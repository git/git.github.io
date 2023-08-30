---
title: Git Rev News Edition 102 (August 30th, 2023)
layout: default
date: 2023-08-30 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 102 (August 30th, 2023)

Welcome to the 102nd edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of July 2023 and August 2023.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

### Support

+ [Git Privacy](https://public-inbox.org/git/CTZ9RD9RQ5UO.3OIJX50PKMIR0@anonymous/)

  Nick, alias Nicholas Johnson, asked on the Git mailing list if it
  would be possible to implement an integrated feature in Git, perhaps
  a config option, to obfuscate the committer and author timestamps
  that are stored in commits when they are created.

  Nick is the creator of [Git Privacy](https://git.nicholasjohnson.ch/git-privacy/)
  which is a repository containing
  [instructions in a README.md file](https://git.nicholasjohnson.ch/git-privacy/tree/README.md)
  that already helps developers obfuscate Git timestamps, and also
  explains why it can be a good idea to do so.

  The instructions suggest setting the `GIT_AUTHOR_DATE` and
  `GIT_COMMITTER_DATE` environment variables when committing, so that
  the timestamps in these variables are recorded instead of the
  current date, time and timezone.

  Nick thought that using such environment variables or other not
  fully integrated mechanisms like Git hooks was too cumbersome and
  asked for ideas or feedback about how to do it.

  Junio Hamano, the Git maintainer, replied to Nick, saying that his
  opinion was that it might not be worth implementing an integrated
  feature, as using such a feature removed "half the value of keeping
  your work in source code management system". Especially it would
  make it harder to refute possible claims that the source code
  contains stolen proprietary IP (Intellectual Property).

  Nick replied that he conceded it might not be worth it to implement
  his original suggestion. He said that having Git automatically
  converting local time to UTC in the timestamps it records could still
  be useful to avoid leaking the developer's time zone. He pointed to
  [a Gerrit issue](https://git.issues.gerritcodereview.com/issues/40000039)
  about this.

  Junio replied that he still thought it wasn't worth the effort as
  there was not enough reason to go against Git's initial design to
  store the timezone.

  Nick replied to Junio saying that storing the timezone revealed
  private information about developers without much gain, and that a
  config option could let users decide about doing this or not.

  This led to a separate sub-thread where Nick and Jason Pyeron
  started to design a `--privacy=option1,option2` with corresponding
  config variables to change the timezone, specify a date precision,
  etc. brian m. carlson said he would support timezone and timestamp
  tweeking options and made some technical suggestions too.

  René Scharfe also in the main sub-thread chimed in saying that
  "timezone and timestamps are personal data, which may only be
  collected and processed for a lawful purpose according to the GDPR",
  referring to the European Union's
  [General Data Protection Regulation](https://gdpr-info.eu/).
  So he thought that the user should be able to control if that data
  should be stored or not, and it was a usability issue if he could
  not easily do that. He also noticed that `git commit` already has a
  `--date=<date>` option to change the author date and a `--signoff`
  option for adding `Signed-off-by: Author Name <author@example.com>`
  trailers. He concluded by saying "adding config options for
  controlling timestamp granularity is hard to say no to".

  Nick replied that he was asking for this feature for moral reasons
  not for legal ones. He took the example of the
  [I2P project](https://geti2p.net/en/) which is a layer on top of
  Internet to protect people's activity and location, saying that most
  developers of the project don't want their timezones leaked as they
  are known only under pseudonyms

  Junio replied to René saying that the `--date=<date>` option had
  good reasons to exist. For example, the committer might be relaying
  somebody else's changes, or a system clock might have an issue. He
  also thought that the existing two environment variables are the
  right place to draw the line, as Git developers shouldn't be
  pretending to be security engineers and invent their own time
  obfuscating mechanisms.

  In another email, Junio explained in more detail why it's more
  important to be able to tweek the author timestamp than the
  committer timestamp. He also repeated that two environment variables
  were a good place for other security minded people to build on a
  quality "privacy enhancing `date` command" that could also be used
  outside the Git context.

  Junio replied to himself saying that a "--useless-time" option, or a
  "core.uselesstime" configuration variable to make timestamps only
  use UTC and be otherwise nearly meaningless could be Ok though, as
  they wouldn't have "privacy" in their name and wouldn't pretend to be
  a quality privacy feature. He laid out how such a feature could
  work, and noticed that features like `git log --since=...` wouldn't
  then be expected to properly work.

  Nick agreed that such a feature shouldn't use "privacy" in its name,
  and said that Junio's proposed feature would satisfy the privacy use
  case he was interested in, and that he didn't want more than that.

  Theodore Ts'o then chimed in to point out that "someone still might
  be able to figure out information from when a branch gets pushed to
  a git repo". He mentioned that for example GitHub, GitHub actions
  and integration systems could also leak information about when users
  are active.

  Nick replied to Ted saying that protecting privacy had to start
  somewhere, even if not all the tools were already doing it.

  Future will tell if someone will actually implement something along
  the lines that have been discussed, and whether it will be a quality
  "privacy enhancing `date` command" usable outside the Git context,
  or an option integrated into Git.

## Developer Spotlight: Calvin Wan

* Who are you and what do you do?

  My name is Calvin Wan and I'm a Software Engineer on the Git Core team
  at Google.

* What would you name your most important contribution to Git?

  I'm hoping my in-flight [series for a Git Standard Library](https://public-inbox.org/git/20230810163346.274132-1-calvinwan@google.com/)
  will become my most important contribution to Git...at least for now 😄

* What are you doing on the Git project these days, and why?

  Currently working on getting Git Standard Library merged -- to
  summarize it will serve as the foundation for other libraries in Git
  to be built off of. When we first embarked on this journey towards
  libification, we had many reasons for doing so, most of which Emily
  captured in the [initial proposal](https://lore.kernel.org/git/CAJoAoZ=Cig_kLocxKGax31sU7Xe4==BGzC__Bg2_pr7krNq6MA@mail.gmail.com/).

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  Old style submodules. Submodule development is already difficult to
  work on and having extra bits and pieces in the codebase that exist
  for the sole purpose of not breaking old style submodules added an
  extra layer of complexity I wish I didn't have to reason about.

* Do you happen to have any memorable experience w.r.t contributing to
  the Git project? If yes, could you share it with us?

  Attending Git Merge 2022! I enjoyed meeting the people I had been
  interacting with on list -- putting a face to the name was
  particularly exciting. I also enjoyed the discussions at the
  Contributor Summit and the talks that followed.

* What is your toolbox for interacting with the mailing list and for
  development of Git?

  I develop using VSCode and send my patches with `git format-patch` and
  `git send-email`. For patches upstream, I use `b4 am` + `git am` to
  test locally. When I reply to patches I use a script I modified from
  Jonathan Tan to set up the replies for `git send-email`. For simple
  replies and emails, I use Gmail's plaintext mode.

* What is your advice for people who want to start Git development?
  Where and how should they start?

  I think there are plenty of good resources out there that others have
  probably mentioned before ([Pro Git book](https://git-scm.com/book/en/v2),
  [MyFirstContribution](https://git-scm.com/docs/MyFirstContribution),
  [git-mentoring list](https://groups.google.com/g/git-mentoring/about)),
  but the one suggestion I would have is spend less time worrying about
  getting the right setup and spend more time getting your patches to list!


## Other News

__Various__


__Light reading__

<!---
__Easy watching__
-->

__Git tools and sites__


## Releases

+ Git [2.42.0](https://public-inbox.org/git/xmqqr0nwp8mv.fsf@gitster.g/),
[2.42.0-rc2](https://public-inbox.org/git/xmqqwmxwgfvr.fsf@gitster.g/),
[2.42.0-rc1](https://public-inbox.org/git/xmqqpm3ug824.fsf@gitster.g/),
[2.42.0-rc0](https://public-inbox.org/git/xmqq5y5uli4t.fsf@gitster.g/)
+ Git for Windows [2.42.0(1)](https://github.com/git-for-windows/git/releases/tag/v2.42.0.windows.1),
[2.42.0-rc2(1)](https://github.com/git-for-windows/git/releases/tag/v2.42.0-rc2.windows.1),
[2.42.0-rc1(1)](https://github.com/git-for-windows/git/releases/tag/v2.42.0-rc1.windows.1),
[2.42.0-rc0(1)](https://github.com/git-for-windows/git/releases/tag/v2.42.0-rc0.windows.1)
+ libgit2 [1.7.1](https://github.com/libgit2/libgit2/releases/tag/v1.7.1)
+ Bitbucket Server [8.13](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ GitHub Enterprise [3.9.4](https://help.github.com/enterprise-server@3.9/admin/release-notes#3.9.4),
[3.8.9](https://help.github.com/enterprise-server@3.8/admin/release-notes#3.8.9),
[3.7.16](https://help.github.com/enterprise-server@3.7/admin/release-notes#3.7.16),
[3.6.18](https://help.github.com/enterprise-server@3.6/admin/release-notes#3.6.18),
[3.9.3](https://help.github.com/enterprise-server@3.9/admin/release-notes#3.9.3),
[3.8.8](https://help.github.com/enterprise-server@3.8/admin/release-notes#3.8.8),
[3.7.15](https://help.github.com/enterprise-server@3.7/admin/release-notes#3.7.15),
[3.6.17](https://help.github.com/enterprise-server@3.6/admin/release-notes#3.6.17),
[3.10.0](https://help.github.com/enterprise-server@3.10/admin/release-notes#3.10.0)
+ GitLab [16.3](https://about.gitlab.com/releases/2023/08/22/gitlab-16-3-released/)
[16.2.4](https://about.gitlab.com/releases/2023/08/11/gitlab-16-2-4-released/),
[16.1.4](https://about.gitlab.com/releases/2023/08/03/gitlab-16-1-4-released/),
[16.2.3](https://about.gitlab.com/releases/2023/08/03/gitlab-16-2-3-released/),
[16.2.2, 16.1.3, and 16.0.8](https://about.gitlab.com/releases/2023/08/01/security-release-gitlab-16-2-2-released/)
+ GitKraken [9.7.1](https://help.gitkraken.com/gitkraken-client/current/),
[9.7.0](https://help.gitkraken.com/gitkraken-client/current/),
[9.6.1](https://help.gitkraken.com/gitkraken-client/current/)
+ GitHub Desktop [3.2.9](https://desktop.github.com/release-notes/),
[3.2.8](https://desktop.github.com/release-notes/)
+ git-credential-azure [0.2.2](https://github.com/hickford/git-credential-azure/releases/tag/v0.2.2),
[0.2.1](https://github.com/hickford/git-credential-azure/releases/tag/v0.2.1),
[0.2.0](https://github.com/hickford/git-credential-azure/releases/tag/v0.2.0),
[0.1.0](https://github.com/hickford/git-credential-azure/releases/tag/v0.1.0)
+ git-credential-oauth [0.10.0](https://github.com/hickford/git-credential-oauth/releases/tag/v0.10.0)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
