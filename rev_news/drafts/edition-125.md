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

  On July 26 2005, so 20 years ago, Linus Torvalds announced on
  the mailing list that Junio Hamano accepted the maintainership of
  the Git project and that Junio "was the obvious choice". Linus said
  he wasn't dropping Git but he just preferred working on it as a
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
  for both the Git Mini Summit only and for the Open Source Summit Europe including the Git Mini Summit.


### Reviews

* [[PATCH v4 0/3] send-email: add oauth2 support and fix outlook breaking threads](https://lore.kernel.org/git/PN3PR01MB9597A83D537E3AE96144227EB8BA2@PN3PR01MB9597.INDPRD01.PROD.OUTLOOK.COM/)

  Last April, Aditya Garg sent a patch series containing three main
  changes to `git send-email`. He mentioned that he was sending the
  email series using the very patches he was proposing, via Outlook.

  The first patch, which was a rebased version of
  [an earlier patch by Julian Swagemakers](https://lore.kernel.org/git/20250125190131.48717-1-julian@swagemakers.org/)
  adding support for OAuth2 authentication, which started to be
  required by Microsoft. Julian's patch unfortunately had been waiting
  for review for over a year before Aditya picked it up.

  The second patch fixed thread breaking caused by Outlook's
  proprietary Message-ID handling.

  The final patch added a new option for generating passwords, such as
  OAuth2 tokens, via an external script.

  Junio Hamano, the Git maintainer, reviewed the three patches saying
  he liked the commit messages, documentation and code comments even
  though he suggested a few small style improvements to the code
  style plus a number of grammar and formatting changes to the
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
  needed and was subsequently dropped. Instead, the new version of
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

## Developer Spotlight: Usman Akinyemi

_Editor’s note: This edition features a retrospective interview with a
contributor who contributed to Git through a mentoring program. We hope
the reflections shared by the Outreachy contributor will provide an
insightful perspective that benefits the community. As always, we
welcome your thoughts and feedback!_

* **Who are you and what do you do?**

  I’m Usman Akinyemi, a final-year CS and AI student, and an open-source
  contributor passionate about Linux, distributed systems, and developer
  tools. I’ve contributed to core projects like Git, systemd, LLVM, and
  LibreOffice. During [my Outreachy internship](https://uniqueusman.hashnode.dev/my-outreachy-internship-experience-at-git),
  I improved Git’s v2 protocol by adding OS-level metadata for better
  diagnostics and security.

  Currently, I’m a [Google Summer of Code contributor](https://summerofcode.withgoogle.com/programs/2025/projects/wBCitF8F)
  building a containerized pipeline for medical imaging using Kaapana,
  Kubernetes and Airflow. I am also currently working on creating a
  new subtype for RISC-V assembly instructions through the
  Linux Foundation’s LFX program.

  Outside code, I mentor new contributors, volunteer with DesignIT and
  LEAD and CODE to teach digital skills, and organize a tech webinar for
  Nigerian students. I’ll be [speaking at Git Merge 2025](https://git-merge.com/#usman-akinyemi),
  sharing insights from my open-source journey. I believe in the power of
  community, collaboration, and curiosity to build a career that crosses
  borders.

* **How did you initially become interested in contributing to Git,
  and what motivated you to choose it as your Outreachy project?**

  Though I have been contributing to other projects before applying for
  Outreachy (Dec 2024), I was just a user of the Git project. When it
  comes to the Outreachy contribution period when I had to pick a
  project, I picked both Git and LibreOffice. I picked Git as it is a
  project I use every time, also the thought of contributing to a
  project used by almost all the developers in the whole world was
  definitely a dream coming true. To also maximize my getting selected
  for Outreachy, I picked Git because it is written in C,
  which many other participants are always scared to pick (going for the
  hard thing). The story did not end there as I got selected for both
  LibreOffice and Git and I had to choose one as my Outreachy projects.
  It was a hard decision but I picked it mainly because the Git
  community is a community where it is so easy to communicate with other
  team members, and it is a community where I clearly know who is who and
  what they do in the community. Also Git is more well recognised.

* **How do you feel your contribution has impacted the Git community
  or the broader open source ecosystem?**

  [My contribution](https://lore.kernel.org/git/20250215155130.1756934-1-usmanakinyemi202@gmail.com/)
  makes a fundamental improvement to the Git v2 protocol by enabling
  Git clients to share their operating system information via the user
  agent string. This helps platforms like GitHub, GitLab, and others
  gain visibility into which OS environments are interacting
  with their servers. It significantly improves debugging, security
  auditing, and telemetry, helping maintainers understand usage patterns
  and tailor support or upgrade strategies accordingly. Since this
  change is part of the core Git client, it means it is used by all Git
  users. I’m proud to have contributed something with such
  wide-reaching, foundational impact.

* **Is there any aspect of Git that you now see differently after
  having contributed to it?**

  Before contributing to Git, I saw it as a complex tool that "just
  works". Although I knew Git was different from GitHub, I struggled to
  clearly differentiate between the two. But after contributing, I could
  clearly differentiate between the two and I now see Git as a carefully
  designed software project with a strong emphasis on performance,
  cross-platform compatibility, and community-driven development.

  I’ve come to appreciate the level of thought and care that goes into
  every change, from writing clean patches and commit messages to
  engaging in technical discussions and defending your design decisions.

  Contributing to Git isn’t also about hierarchical review; instead,
  it’s a collaborative process where every contributor is expected to
  take full ownership of their patches, understand the problem they are
  trying to fix, the solution and explain their rationale clearly by
  writing clean patches, commit messages and engaging in technical
  discussions and defending your design decisions. In fact, there have
  been moments when some of my contributions led to insights even long
  time contributors hadn’t considered, including Junio Hamano. That
  boosted my confidence not just in contributing to Git, but to other
  software projects as well i.e I can get my patches accepted anywhere,
  I just need to convince others that it actually solves a problem.

* **How do you balance your contributions with other responsibilities
  like work or school?**

  Seriously, it has not been easy, most of my contributions to all
  open source projects have always been during college. But, I have sort
  of made contributions to open source as one important aspect of my
  life and also as a way to learn new technologies and also practice
  whatever new skills I learnt. Contributing to projects millions of
  people use is also definitely rewarding and satisfying.

* **Can you share how Outreachy helped enhance your technical and
  non-technical skills (like communication, project management, etc.)?**

  Technically, I have been able to improve my C programming and bash
  scripting skills. Also reading and understanding very large codebases
  like Git. Of course now I can call myself an expert in using Git as a
  tool itself.

  To contribute to Git, you must be able to communicate well, as all the
  Git workflows happen remotely and over mailing lists. Most of the time
  in the Git community it is not about the correctness of your code -- it
  is about how well you can communicate your rationale to the community
  before your patches can be accepted. So, over time, as a Git
  contributor, my communication skills in a technical environment have
  really improved.

  I have also learnt to write clean code, organize my changes into well
  formatted patches, and write clear commit messages.

* **What was your biggest takeaway or learning from Outreachy that
  you now apply regularly in your work?**

  I’d say my biggest takeaway from Outreachy is learning how to write
  clear, structured commit messages. Git commits, like those in the
  Linux kernel, follow a thoughtful format: describe the current state,
  the problem, and the fix. From reading most of the commit messages in
  Git, you would have understood and been to visualize what the changes
  will look like. It also makes it easy to track the changes to other
  prerequisite commits. I have been using the Git commit messages format
  in other projects and I really love it.

* **What was the biggest challenge you faced during your contributions
  to Git, and how did you overcome it?**

  I think the challenge which I initially faced is sending patches to
  Git, not really a big challenge though as I was able to make my first
  patch in a few days after joining the community. And the reason is
  that Git does not use GitHub or GitLab, something someone would have
  thought they will be using. Git uses a mailing list just like the
  Linux kernel. While writing this, I remember that I had a challenge
  retrieving patches from the mailing list as my project depended on some
  patches that were sent by my mentor previously. I had to use `git am`,
  something I never used before.  Help from my mentor really helped,
  as well as reading through the "[Hacking Git](https://git.github.io/Hacking-Git/)"
  page.

* **Have you thought about mentoring new GSoC / Outreachy students?**

  Yeah, I am planning to put in as a mentor for the coming Outreachy
  period and hopefully for GSoC also. I will be starting as a co-mentor
  though.

* **If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?**

  Smile, I will definitely say the Rustication of some parts of Git
  which has been going on currently, I think one that has already been
  integrated to Git is [libgit-rs](https://lore.kernel.org/git/cover.1738187176.git.steadmon@google.com/).
  Rust seems to be a language that focuses more on safety/security,
  and safety/security is very important in Git. I am also a Rustacean
  so I should be able to help hopefully if that happens.

* **If you could remove something from Git without worrying about
  backwards compatibility, what would it be?**

  I really do not have anything in mind for now.

* **What upcoming features or changes in Git are you particularly
  excited about?**

  I think it is one of the [GSoC projects by Lucas](https://summerofcode.withgoogle.com/programs/2025/projects/fGgMYHwl).
  I have been passively following the project. It is about introducing
  a new Git sub-command (currently intended to be called `git repo-info`)
  that will centralize data currently retrieved by `git rev-parse` in a
  JSON format.

* **What is your favorite Git-related tool/library, outside of Git
  itself?**

  I think it's both GitHub and GitLab -- if I have to choose one, I will say GitHub.

* **What is your toolbox for interacting with the mailing list and for
  development of Git?**

  I started with [GitGitGadget](https://gitgitgadget.github.io/) initially
  just to get my patches to the mailing list faster but, along the line
  I switched to `git send-email` and really, it is more flexible and easy
  to use than I thought of it. For my machine, I basically use Arch Linux
  and Neovim as my text editor.

* **How do you envision your own involvement with Git or other open
  source projects in the future?**

  As I said earlier, open source has really been part of my life and it
  has really helped me a lot in improving my skills, meeting new people
  and even making some few bucks through internships. After my
  internship at Outreachy, I did send patches to the Git community and I
  planned to keep doing that. After Outreachy, I have contributed to a
  few other projects like RISC-V and OSIPI (through GSoC). I currently
  mentor people who want to start their open source journey, and I plan
  to do more of it. I planned to keep contributing to open source
  projects and hopefully get a job in open source.

* **What is your advice for people who want to start Git development?
  Where and how should they start?**

  I have been in many open source projects and see how their workflows
  are, I will definitely say Git is one of the easiest and most
  interesting projects to contribute to. The community members are
  really supportive. Seriously, it is one of the best open source
  communities I have been to. The best place to start is going through
  the "[Hacking Git](https://git.github.io/Hacking-Git/)" page. It has
  all the information on how to start contributing and you can make
  your first contribution to Git. You should generally start with a
  microproject which aims to introduce you to the Git contribution
  workflow. Everything can be found above. Making your first contribution
  to Git is actually very much easier than you might have thought.
  Also, do not be scared to ask for help, Git developers are always ready to render help.

* **Would you recommend other students or contributors to participate in
  the GSoC, Outreachy or other mentoring programs, working on Git?
  Why? Do you have advice for them?**

  Definitely, Outreachy and GSoC are very much interesting mentoring
  programs to start your open source journey. They both really make it
  easy to start contributing to open source. You get assigned to mentors
  who are experts in open source and the organization. It is a way to get
  skills you will never be able to get in your classroom and skills
  needed to thrive and excel in the software engineering world. Apart
  from skills, it is a way to have proof of work before graduation and
  also gain global recognition. As I have said, Git is a well known and
  recognized software project in the whole world, contributing to it is
  an achievement on its own.

  _Shout session_

  I would like to shout out to all Git contributors, you are doing a
  great job! I would also like to shout out to my Outreachy mentor
  Christian Couder, he was really supportive during my Outreachy
  program! Thanks to the Git Rev teams also!


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
with help from brian m. carlson, Aditya Garg,
Erik-B. Ernst and Bruno Brito.
