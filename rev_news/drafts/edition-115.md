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

This edition covers what happened during the months of August 2024 and September 2024.

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


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
