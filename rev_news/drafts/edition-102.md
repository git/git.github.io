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

<!---
### Support
-->


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
