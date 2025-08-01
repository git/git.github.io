---
title: Git Rev News Edition 125 (July 31st, 2025)
layout: default
date: 2025-07-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 125 (July 31st, 2025)

Welcome to the 125th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of June and July 2025.

## Discussions


### General

* 20 years ago: [Meet the new maintainer..](https://lore.kernel.org/git/Pine.LNX.4.58.0507262004320.3227@g5.osdl.org/)

  On July 26 Jul 2005, so 20 years ago, Linus Torvalds announced on
  the mailing list that Junio Hamano accepted the maintainership of
  the Git project and that Junio "was the obvious choice". Linus said
  he wasn't dropping Git but he just prefered working on it as a
  contributor.

  Junio replied with an [A note from the new GIT maintainer](https://lore.kernel.org/git/7vmzo8ss2l.fsf@assigned-by-dhcp.cox.net/)
  email where he acknowledged his new role as Git maintainer, thanked
  the community for their support and collaboration, and promised to
  take a more careful and deliberate approach in shepherding the
  project. He also said he would post his own patches to the mailing
  list for review before including them in the repository, and
  encouraged community feedback.

* [[ANNOUNCE] Git Mini Summit at Open Source Summit Europe, Amsterdam, August 28th](https://lore.kernel.org/git/aGwHt9HCd86hVuKh@pks.im/)

  Patrick Steinhardt announced a Git Mini Summit co-located with the
  [Open Source Summit Europe](https://events.linuxfoundation.org/open-source-summit-europe/)
  in Amsterdam on August 28th 2025.

  There will be lightning talks and some time for people to
  connect. Proposals for the lightning talks should be sent to
  Patrick, while the possibility to have remote talks is still
  investigated.

  [Registration is open](https://events.linuxfoundation.org/open-source-summit-europe/features/co-located-events/#git-mini-summit-2025)
  for only the Git Mini Summit and for the Open Source Summit Europe including the Git Mini Summit.


### Reviews

* [[PATCH v4 0/3] send-email: add oauth2 support and fix outlook breaking threads](https://lore.kernel.org/git/PN3PR01MB9597A83D537E3AE96144227EB8BA2@PN3PR01MB9597.INDPRD01.PROD.OUTLOOK.COM/)

  Last April, Aditya Garg sent a patch series containing three main
  changes to `git send-email`. He mentioned that he was sending the
  email series using the very patches he is proposing, via Outlook.

  The first patch, which was a rebased version of
  [an earlier patch by Julian Swagemakers](https://lore.kernel.org/git/20250125190131.48717-1-julian@swagemakers.org/)
  added support for OAuth2 authentication, which started to be
  required by Microsoft. Julian's patch unfortunately had been waiting
  for review for over a year before Aditya picked it up.

  The second patch fixed thread breaking caused by Outlook's
  proprietary Message-ID handling.

  The final patch added a new option for generating passwords, such as
  OAuth2 tokens, via an external script.

  Junio Hamano, the Git maintainer, reviewed the three patches saying
  he liked the commit messages, documentation and code comments even
  though he suggested a few small style improvements to the code
  style, and a number of grammar and formatting changes to the
  documentation.

  He also asked for reviews from others as he said he was not familiar
  with the `Authen::SASL` library.

  Aditya replied to Junio's review acknowledging the need for more
  reviews and saying that OAuth2 was a significant and more secure
  technology. He then took the initiative to Cc Greg Kroah-Hartman,
  who wrote a precursor of `git send-email` for the Linux kernel.

  M Hickford also replied to Aditya expressing enthusiasm for the work
  but wondering why the v4 version of the patch series was sent in a
  new email thread rather than as a reply to the previous version.

  brian m. carlson commented on the second patch saying that replacing
  message IDs like Outlook does is technically allowed by
  standards. They raised concerns about hardcoding only two Outlook
  server hostnames, and suggested adding configuration options for
  Message-ID generation modes.

  Julian Swagemakers then pointed out that the goal of the third patch
  could already be achieved using Git's existing custom credential
  helper mechanism. Aditya confirmed this worked and said he was
  unaware of this feature, which led to the decision to drop the third
  patch. Recognizing that the existing feature was poorly
  discoverable, the discussion led to improvements in Git's
  documentation, adding clearer examples of using credential helpers
  for OAuth2 tokens.

  Erik Huelsmann, the maintainer of the `Authen::SASL` Perl module,
  joined the conversation after Aditya emailed him directly
  referencing a GitHub issue about the lack of OAuth2 support in
  `Authen::SASL`. In that issue Erik had
  [commented that he would be happy to support XOAUTH2](https://github.com/gbarr/perl-authen-sasl/issues/18#issuecomment-2453040190),
  but needed a patch and a way to test it.

  Aditya and Julian then worked together, with guidance from Erik, to
  add the necessary XOAUTH2 and OAUTHBEARER support directly into
  `Authen::SASL`. Shortly after, a new version of the `Authen::SASL`
  module was officially released with this new functionality. This
  successful collaboration meant the first patch in the series, which
  was a workaround for the missing library support, was no longer
  needed and was subsequently dropped. Instead the new version of
  `Authen::SASL` started to benefit all Perl users.

  Greg Kroah-Hartman echoed what brian had suggested about using a
  configurable solution in the second patch. Greg noted that the
  initial approach would not cover company-hosted Outlook servers. Yao
  Zi also contributed to this discussion, noting that Tencent's mail
  service had similar issues, further reinforcing the need for a
  flexible solution beyond just hardcoding specific server names.

  That suggestion was then refined by Junio Hamano, who proposed a
  concrete implementation for the new option by providing an example
  patch. The final `--[no-]outlook-id-fix` option auto-detects known
  Outlook servers but allows manual override for other deployments.

  After several iterations on its name and behavior, with Eric
  Sunshine helping refine the user-facing documentation, Aditya
  submitted a final, simplified patch series (v6). It now contained
  only the single, refined patch to fix Outlook thread breaking, with
  the other two patches having been made obsolete by the
  `Authen::SASL` library update and the use of existing Git features.

  Aditya's patch was merged and released as part of Git v2.50.0.

<!---
### Support
-->

<!---
## Developer Spotlight:
-->

## Other News

__Various__


__Light reading__

<!---
__Easy watching__
-->

__Git tools and sites__

- [git-phoenix](https://github.com/yaitskov/git-phoenix) does repository recovery.

## Releases

+ Git [2.50.1 and friends](https://lore.kernel.org/git/xmqq5xg2wrd1.fsf@gitster.g/)
+ Git for Windows [2.50.1(1)](https://github.com/git-for-windows/git/releases/tag/v2.50.1.windows.1),
[2.50.0(2)](https://github.com/git-for-windows/git/releases/tag/v2.50.0.windows.2),
[2.49.1](https://github.com/git-for-windows/git/releases/tag/v2.49.1.windows.1)
+ GitHub Enterprise [3.17.4](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.4),
[3.16.7](https://docs.github.com/enterprise-server@3.16/admin/release-notes#3.16.7),
[3.15.11](https://docs.github.com/enterprise-server@3.15/admin/release-notes#3.15.11),
[3.14.16](https://docs.github.com/enterprise-server@3.14/admin/release-notes#3.14.16),
[3.17.3](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.3),
[3.16.6](https://docs.github.com/enterprise-server@3.16/admin/release-notes#3.16.6),
[3.15.10](https://docs.github.com/enterprise-server@3.15/admin/release-notes#3.15.10),
[3.14.15](https://docs.github.com/enterprise-server@3.14/admin/release-notes#3.14.15),
[3.17.2](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.2),
[3.16.5](https://docs.github.com/enterprise-server@3.16/admin/release-notes#3.16.5),
[3.15.9](https://docs.github.com/enterprise-server@3.15/admin/release-notes#3.15.9),
[3.14.14](https://docs.github.com/enterprise-server@3.14/admin/release-notes#3.14.14)
+ GitLab [18.2.1, 18.1.3, 18.0.5](https://about.gitlab.com/releases/2025/07/23/patch-release-gitlab-18-2-1-released/),
[18.2](https://about.gitlab.com/releases/2025/07/17/gitlab-18-2-released/),
[18.1.2, 18.0.4, 17.11.6](https://about.gitlab.com/releases/2025/07/09/patch-release-gitlab-18-1-2-released/)
+ Gerrit Code Review [3.10.7](https://www.gerritcodereview.com/3.10.html#3107),
[3.11.4](https://www.gerritcodereview.com/3.11.html#3114),
[3.12.1](https://www.gerritcodereview.com/3.12.html#3121)
+ GitKraken [11.2.1](https://help.gitkraken.com/gitkraken-client/current/),
[11.2.0](https://help.gitkraken.com/gitkraken-client/current/),
[11.1.1](https://help.gitkraken.com/gitkraken-client/current/),
[11.1.0](https://help.gitkraken.com/gitkraken-client/current/),
[11.0.0](https://help.gitkraken.com/gitkraken-client/current/)
+ GitHub Desktop [3.5.2](https://desktop.github.com/release-notes/),
[3.5.1](https://desktop.github.com/release-notes/)
+ Sourcetree [4.2.13](https://product-downloads.atlassian.com/software/sourcetree/ReleaseNotes/Sourcetree_4.2.13.html)
+ GitButler [0.15.8](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.15.8),
[0.15.7](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.15.7)
+ Sublime Merge [Build 2110](https://www.sublimemerge.com/download)
+ Tower for Mac [13.1](https://www.git-tower.com/release-notes/mac?show_tab=release-notes)
+ Tower for Windows [9.1](https://www.git-tower.com/release-notes/windows?show_tab=release-notes) - [YT video](https://youtu.be/4pNRUz0bNIU)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
