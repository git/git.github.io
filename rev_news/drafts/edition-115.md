---
title: Git Rev News Edition 115 (September 30th, 2024)
layout: default
date: 2024-09-30 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 115 (September 30th, 2024)

Welcome to the 115th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of August and September 2024.

## Discussions

### General

* [Git Merge 2024 conference](https://git-merge.com/) and [Contributor's Summit 2024](https://lore.kernel.org/git/Zu2DmS30E0kKug2a@nand.local/)

  The Git Merge conference happened on
  [September 19th and 20th](https://github.com/git/git-merge) in
  Berlin, hosted by [GitButler](https://gitbutler.com/) and
  [GitHub](https://github.com/).

  The first day consisted of
  [talks](https://github.com/git/git-merge#day-one-talks) and an
  afterparty in the evening sponsored by
  [GerritForge](https://www.gerritforge.com/).

  On the [second day](https://github.com/git/git-merge?tab=readme-ov-file#day-two-unconference),
  there was [the Contributor's Summit](https://lore.kernel.org/git/Zu2DmS30E0kKug2a@nand.local/) in parallel
  with [breakout unconference sessions](https://github.com/git/git-merge/tree/main/breakouts).

* [Git participated in GSoC (Google Summer of Code) 2024](https://summerofcode.withgoogle.com/programs/2024/organizations/git)

  All the contributors have successfully passed their final evaluation
  and published a final report:

  - Jialuo She [worked](https://luolibrary.com/) on the
    [Implement consistency check for refs](https://summerofcode.withgoogle.com/programs/2024/projects/ukm4PTEF)
    project. He was mentored by Karthik Nayak and Patrick Steinhardt. The final
    report can be found on
	[his website](https://luolibrary.com/2024/08/25/GSoC-Final-Report/).

  - Chandra Pratap [worked](https://chand-ra.github.io/) on the
    [Move and improve reftable tests in the unit testing framework](https://summerofcode.withgoogle.com/programs/2024/projects/tlh611d7)
    project. He was mentored by Patrick Steinhardt and Christian Couder. The final
    report can be found on
	[his website](https://chand-ra.github.io/2024/08/24/GSoC-Final-Report.html).

  - Ghanshyam Thakkar [worked](https://spectre10.github.io/posts/) on the
    [Move existing tests to a unit testing framework](https://summerofcode.withgoogle.com/programs/2024/projects/e9C4rhrv)
    project. He was mentored by Christian Couder and Kaartic Sivaraam. The final
    report can be found on [his website](https://spectre10.github.io/posts/gsoc_final_report/).

  Congratulations to the contributors and their mentors!

* Git will [participate in the next Outreachy round](https://www.outreachy.org/communities/cfp/git/)

  Git applied to participate in the next
  [Outreachy](https://www.outreachy.org/) round from December 2024 to
  March 2025 and was accepted.
  [Two projects](https://www.outreachy.org/apply/project-selection/#git)
  are proposed:

   - "Convert unit tests to use the clar testing framework" which will
     be mentored by Patrick Steinhardt and Phillip Wood.

   - "Finish adding a 'os-version' capability to Git protocol v2"
     which will be mentored by Christian Couder.

  See this [Outreachy webpage](https://www.outreachy.org/docs/applicant/),
  for more information about the application process for contributors.

<!---
### Reviews
-->

<!---
### Support
-->

## Developer Spotlight: Jialuo She

_Editor's note: We're starting a new initiative in Git Rev News where
 we interview recent GSoC/Outreachy students to get their reflections
 on completing their projects. Feel free to share any thoughts or
 feedback you might have!_

* Who are you and what do you do?

  My name is Jialuo She. I find it quite challenging to select an English
  name for myself, so I decide to leave it as is. However, you can simply
  call me "Luo(/lwɔː/)". I am currently employed at NVIDIA as a Tegra
  System Architect. In this role, I am responsible for developing the
  verification infrastructure for complex full-chip features, such as
  CPU-GPU cache coherency. So my daily job is unrelated to Git. In my
  spare time, I continue my GSoC work to
  [implement consistency checks for refs](https://summerofcode.withgoogle.com/programs/2024/projects/ukm4PTEF).

* How did you initially become interested in contributing to Git,
  and what motivated you to choose it as your GSoC project?

  When I was a student, I read [the book "Pro Git"](https://git-scm.com/book/en/v2)
  to learn how to use Git in my daily development process. One day, I
  found [a tutorial](https://www.leshenko.net/p/ugit/) that teaches
  how to write a mini Git step by step, and I really appreciated the
  design of Git.

  As I was approaching my graduate school graduation, I hoped to use the
  opportunity provided by GSoC to do something meaningful for the long
  term. Since I felt that I had an understanding of Git's internal
  principles, believing that my chances of being selected would be much
  higher. When I saw the "Implement consistency check for refs" project,
  I became very interested and resolutely chose Git.

* How do you balance your contributions with other responsibilities
  like work or school?

  As a newcomer, contributing to Git can be particularly time-consuming
  due to unfamiliarity with the overall codebase. I would dedicate an
  evening to responding to review feedback, which forces me to think
  about how to make improvements, and then I would code over the weekend.
  Of course, if there were urgent situations at work or life, I would have
  to postpone my contributions to Git. I feel there's no need to think
  about balancing because it happens naturally.

* What was your biggest takeaway or learning from GSoC that you now
  apply regularly in your work?

  After participating in GSoC, I begin to consider whether my commit
  sequence is clear and understandable when writing code at work. I also
  become more stringent with myself regarding commit messages, ensuring
  they clearly explain the background, motivation, and implementation
  details.

* What was the biggest challenge you faced during your contributions
   to Git, and how did you overcome it?

  When building the ref consistency check infrastructure, I encountered
  an exceptionally long review process that lasted about three months.
  It was quite frustrating because there was no positive feedback compared
  with other participants. Then I reflected on myself, wondering why I
  was always comparing myself to others instead of focusing on what I was
  doing. So, I adjusted my mindset.

* Have you thought about mentoring new GSoC students?

  If I have the opportunity and time, I would definitely mentor GSoC
  students. I am very grateful to my mentors, Patrick and Karthik, for
  introducing me to the Git community and enabling me to continue
  contributing after completing GSoC. I hope that one day I can also
  ignite the passion in others.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  The write and read support for symlink symrefs.

* What is your favorite Git-related tool/library, outside of Git
  itself?

  I very like [GitLens tool](https://gitlens.amod.io/) when using
  VSCode. By using this tool, I hardly use the bare `git blame` command.

* What is your toolbox for interacting with the mailing list and for
  development of Git?

  When reviewing patches, I will firstly use [`b4`](https://b4.docs.kernel.org/en/latest/)
  or simply fetch the branch stored in the Junio's tree and then I will
  see the diffs just in the VSCode. To reply to a patch, I download the
  raw email and use [`mutt`](http://www.mutt.org/) to write contents.
  When sending patches, I still use `mutt` to make the environment as
  simple as possible to improve efficiency.

  I develop Git using VSCode and the [clangd](https://clangd.llvm.org/)
  language server. I generate the `compile_commands.json` file using
  `compiledb make`. I believe this is one of the best development
  approaches available today, offering excellent code suggestions,
  completions, and static analysis.

* How do you envision your own involvement with Git or other open
  source projects in the future?

  I hope to complete the implementation of all ref consistency checks.
  Additionally, I aim to further familiarize myself with the Git codebase
  related to refs, follow the development of the reftable backend, and
  participate in more reviews.

* What is your advice for people who want to start Git development?
  Where and how should they start?

  In my opinion, the barrier to starting contributions to Git is relatively
  high because Git doesn't have something like "good first issue" labels.
  Therefore, I believe the best approach is to participate in mentoring
  programs or continue work from certain mentoring programs as a student.

* Would you recommend other students or contributors to participate in
  the GSoC, or other mentoring programs, working on Git? Why? Do you
  have advice for them?

  I highly recommend that students integrate into the Git community
  through mentoring programs. These programs provide basic ideas to help you
  get started and contribute to Git. Working on Git is an amazing experience,
  allowing you to be guided by many experienced contributors, improve your
  code quality standards, and enhance your communication skills.

  As for advice to participants, I believe the most important thing is not to
  think of the project merely as a resume booster. Instead, let your passion
  shine through and stay at the community after mentoring programs.


## Other News

__Various__


__Light reading__

<!---
__Easy watching__
-->

__Git tools and sites__


## Releases

+ Git [2.47.0-rc0](https://public-inbox.org/git/xmqqv7yijq33.fsf@gitster.g/),
[2.46.2](https://public-inbox.org/git/xmqqa5fyytg0.fsf@gitster.g/),
[2.46.1](https://public-inbox.org/git/xmqqikuytbxd.fsf@gitster.g/)
+ Git for Windows [2.47.0-rc0(1)](https://github.com/git-for-windows/git/releases/tag/v2.47.0-rc0.windows.1),
[2.46.2(1)](https://github.com/git-for-windows/git/releases/tag/v2.46.2.windows.1),
[2.46.1(1)](https://github.com/git-for-windows/git/releases/tag/v2.46.1.windows.1)
+ GitHub Enterprise [3.14.1](https://help.github.com/enterprise-server@3.14/admin/release-notes#3.14.1),
[3.13.4](https://help.github.com/enterprise-server@3.13/admin/release-notes#3.13.4),
[3.12.9](https://help.github.com/enterprise-server@3.12/admin/release-notes#3.12.9),
[3.11.15](https://help.github.com/enterprise-server@3.11/admin/release-notes#3.11.15),
[3.10.17](https://help.github.com/enterprise-server@3.10/admin/release-notes#3.10.17)
+ GitLab [16.10.10, 16.9.11, 16.8.10, 16.7.10, 16.6.10, 16.5.10, 16.4.7, 16.3.9, 16.2.11, 16.1.8, 16.0.10](https://about.gitlab.com/releases/2024/09/25/patch-release-gitlab-16-10-10-released/),
[17.4.1, 17.3.4, 17.2.8](https://about.gitlab.com/releases/2024/09/25/patch-release-gitlab-17-4-1-released/),
[17.4](https://about.gitlab.com/releases/2024/09/19/gitlab-17-4-released/),
[17.3.3, 17.2.7, 17.1.8, 17.0.8, 16.11.10](https://about.gitlab.com/releases/2024/09/17/patch-release-gitlab-17-3-3-released/),
[16.11.9](https://about.gitlab.com/releases/2024/09/11/gitlab-16-11-9-released/),
[17.0.7](https://about.gitlab.com/releases/2024/09/11/gitlab-17-0-7-released/),
[17.3.2, 17.2.5, 17.1.7](https://about.gitlab.com/releases/2024/09/11/patch-release-gitlab-17-3-2-released/)
+ GitKraken [10.3.0](https://help.gitkraken.com/gitkraken-client/current/)
+ GitHub Desktop [3.4.5](https://desktop.github.com/release-notes/),
[3.4.4](https://desktop.github.com/release-notes/)
+ Garden [1.8.0](https://github.com/garden-rs/garden/releases/tag/v1.8.0)
+ Git Cola [4.8.2](https://github.com/git-cola/git-cola/releases/tag/v4.8.2)
+ GitButler [0.12.26](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.12.26),
[0.12.25](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.12.25)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Jialuo She.
