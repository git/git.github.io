---
title: Git Rev News Edition 116 (October 31st, 2024)
layout: default
date: 2024-10-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 116 (October 31st, 2024)

Welcome to the 116th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of September 2024 and October 2024.

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


## Developer Spotlight: Chandra Pratap

_Editor's note: Just like in our previous edition, we return with another
 GSoC retrospective interview in this issue. We hope the reflections shared
 by GSoC students will provide an insightful perspective that benefits
 the community. As always, we welcome your thoughts and feedback!_

* Who are you and what do you do?

  Hey! I am Chandra Pratap (prefer going by Chand) and I am an
  undergraduate student of Mathematics at SVNIT, Surat, India. I have
  a passion for everything computing and like to solve leetcode-styled
  problems in my free time or contribute to open-source software.

* How did you initially become interested in contributing to Git, and
  what motivated you to choose it as your GSoC project?

  C was the first programming language that I learnt, and I wanted to
  try working on a non-trivial software project. I watched a YouTube
  video on open-source and that’s where I got the idea of looking for
  open-source projects to contribute to. Git and VLC were the only
  open-source C-written software that I was familiar with and used in
  day-to-day life, so I decided to start contributing to Git out of the two.
  By the time GSoC came around, Git was the only open-source
  community that I was familiar with, so I decided to choose it as my
  GSoC organization.

* How do you feel your contribution has impacted the Git community
  or the broader open-source ecosystem?

  [My project](https://summerofcode.withgoogle.com/programs/2024/projects/tlh611d7)
  was about moving and improving reftable tests, so I think
  my contributions made life somewhat easier for other Git hackers,
  especially those that frequent the reftable sub-project. My project
  didn’t really affect any user-facing aspect of Git, so I don’t think it had
  a huge impact on the broader open-source ecosystem, besides the
  fact that it gained another lifelong contributor.

* Is there any aspect of Git that you now see differently after having
  contributed to it?

  Everything, to be honest. Working on and with Git for the duration of
  my project completely changed my mental model for the tool. Before
  GSoC, Git was a clunky tool reserved for software development work
  but post-Git, I know the most frequent commands like the back of my
  hand, and I’ve already used Git to version control many of my non
  software files. I feel like I’ve learnt enough Git to last my entire career.

* How do you balance your contributions with other responsibilities like
  work or school?

  I had summer vacation for the entire duration of GSoC and no other work
  commitments, so I had no problems finding time for my GSoC project.

* Can you share how GSoC helped enhance your technical and non
  technical skills (like communication, project management, etc.)?

  In terms of technical skills, I think my C and Git skills saw the biggest jump.
  I am a lot more comfortable working with those two tools than when I
  was pre-GSoC. Besides that, I’m a lot less scared of the command line
  now. In terms of non-technical skills, I believe I’ve gotten a lot better at
  composing mails and communicating with other professionals. I’ve learnt
  to write with the right amount of professionalism, so I don’t appear too
  uptight or too lax, the right way to respond to constructive feedback, how
  to time my schedule to fit with others’, especially those living in other
  parts of the globe, and how to ask good questions.

* What was your biggest takeaway or learning from GSoC that you now
  apply regularly in your work?

  I’d say the biggest takeaway from GSoC for me was that it is normal for
  everyone to face difficulties when trying to learn a new codebase, tool, etc,
  or even a different part of the same codebase. It is important to persevere
  and not be afraid of asking questions to achieve the desired results. Other
  than that, I’ve learnt a lot about good practices in software development,
  like appropriately splitting commits and writing good commit messages,
  that I subconsciously incorporate in my work now.

* What was the biggest challenge you faced during your contributions
  to Git, and how did you overcome it?

  The biggest challenge in contributing to Git was the initial phase of
  getting involved. I remember starting out working on a small patch for
  about 2 months with a lot of help from other contributors before it got
  accepted into Git’s upstream. After a few initial contributions, I grew more
  confident and could steadily find things to work on and produce
  acceptable results. The key to overcoming this challenge was to be
  persistent and patient, and not being afraid of asking silly questions.

* Have you thought about mentoring new GSoC students?

  I’m not sure about being a full-on mentor, but I’d love to co-mentor
  any future GSoC student(s) interested in working on the reftable
  project.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  The [Git GUI](https://git-scm.com/docs/git-gui) tool. I believe that
  would make Git far more accessible than it currently is and get it
  incorporated in a lot more people’s day-to-day works.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  The packed-refs format for refs seems redundant to me now that
  reftable is a core part of Git.

* What is your favourite Git-related tool/library, outside of Git itself?

  [GitGitGadget](https://gitgitgadget.github.io/) was a lifesaver when
  I had just started contributing to Git, so that is probably my favourite
  Git related tool.

* What is your toolbox for interacting with the mailing list and for
  development of Git?

  I used git’s `send-email` to send patches to the mailing list (especially
  the `--compose` and `--annotate` flags) and Gmail’s online client to
  convey non-patch mails. For developing Git, I used Vim as the editor
  on an Ubuntu machine and Git as the version control software (duh).

* How do you envision your own involvement with Git or other
  open-source projects in the future?

  I plan on making small contributions to Git from time to time, since I
  cannot find enough time for larger patches. Other than that, I’ll try to
  volunteer as a Git mentor for future GSoC or Outreachy cohorts.
  Regarding other open-source projects, I’ll try contributing to them when
  I learn a new technology and want a real-world experience.

* What is your advice for people who want to start Git development?
  Where and how should they start?

  Go through Git’s [‘My First Contribution tutorial’](https://git-scm.com/docs/MyFirstContribution)
  for the initial setup and to get an idea of what’s it like
  to work on Git. Then work on a few ‘microprojects’ ([more information on
  the Git Developer's website](https://git.github.io/General-Microproject-Information/) )
  to dip your toes in the Git Development community. From there, you
  can figure out interesting stuff to work on by yourself.

* Would you recommend other students or contributors to participate in
  the GSoC, or other mentoring programs, working on Git? Why? Do you
  have advice for them?

  Yes. I believe that Git is a tool that every working professional can find
  useful regardless of whether they work in the software industry or not
  and working on Git through an open-source program is an excellent way
  to get good at it in a short period of time. There’s also the added benefit
  of joining a large and active community of amazingly experienced
  developers who can teach you a lot about writing software, and the
  software development workflow in general.

  I think the key to getting selected as a participant in GSoC or other
  mentoring programs is getting involved as early as possible. The more
  time you allow yourself to get familiar with Git’s codebase and
  development workflow, the easier it becomes to find an apt project and
  write a reasonable proposal for it. Also, the initial phase of contributions is
  the most difficult part of getting involved with an open-source project, so it
  is better to allow yourself ample time to tackle that initial hurdle.


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
