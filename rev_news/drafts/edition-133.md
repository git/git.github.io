---
title: Git Rev News Edition 133 (March 31st, 2026)
layout: default
date: 2026-03-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 133 (March 31st, 2026)

Welcome to the 133rd edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](https://git.github.io).

This edition covers what happened during the months of February and March 2026.

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

## Developer Spotlight: Olamide Caleb Bello

_Editor’s note: This edition features a retrospective interview with a
contributor who contributed to Git through a mentoring program.
We hope the reflections shared by the Outreachy contributor will
provide an insightful perspective that benefits the community.
As always, we welcome your thoughts and feedback!_

* **Who are you and what do you do?**

  I’m Olamide Caleb Bello, a software engineer based in Nigeria. I studied
  Economics, but I’ve always been curious about technology and how
  Systems work behind the scenes. That curiosity led me to start teaching
  myself web development, and over time I found myself drawn more
  towards backend and systems-oriented work.

  I became especially interested in understanding how complex tools are
  built and maintained, which led me to open source. I contributed to Git
  as part of the Outreachy program, where I got to work on improving parts
  of Git’s internal workflows.

  These days, I enjoy working on tools that make development smoother
  for others, and I’m particularly interested in open source and
  distributed systems.

* **How did you initially become interested in contributing to Git,
  and what motivated you to choose it as your Outreachy project?**

  I initially saw Git as just a tool I needed to get my work done. For a
  long time, my workflow was basically just `git add`, `git commit`, `git push`,
  and `git pull`, without thinking much about what was happening underneath.
  That started to change when I ran into some particularly messy merge conflicts
  that forced me to slow down and really question how Git was managing
  history and combining changes.

  Around the same time, I was becoming more interested in systems in
  general, thinking about tools like the kernel, systemd, and Git
  itself, and how they work under the hood. That experience pushed me to
  look deeper into Git’s internals, and I quickly realized how much
  depth there was beneath the surface.

  When I came across the Outreachy project, choosing Git felt natural, I
  wanted to challenge myself and contribute to a tool I had used for
  years but didn’t fully understand, while learning from experienced
  maintainers.

* **How do you feel your contribution has impacted the Git community
  or the broader open source ecosystem?**

  [My work](https://cloobtech.hashnode.dev/beginning-my-outreachy-opensource-internship-at-git-overview-and-project-description)
  focused on reducing Git’s reliance on global state by refactoring
  repository-specific variables into a more localized structure. Each repository
  instance now manages its own configuration independently, improving modularity
  and reducing the risk of cross-repository issues.

  Through this work, I came to appreciate how changes at this level contribute to
  Git’s long-term direction, particularly efforts to make it more reusable as a
  library. Even though these changes aren’t directly visible to users, they make
  the system safer and easier to extend.

  Being part of that process gave me a deeper respect for the level of thought
  and the care that goes into maintaining Git.

* **Is there any aspect of Git that you now see differently after
  having contributed to it?**

  Before contributing, I thought Git was just a bunch of commands I
  typed every day. Working on it showed me a whole hidden world,
  how configurations are saved and read, how each repository handles
  its own settings, and what the index is really doing behind the scenes.
  Some of it was so intricate I almost felt like Git was trolling me!

  Seeing all this up close turned what felt like a simple tool into a
  carefully designed system, and it gave me a much deeper appreciation
  for the thought and care behind every command.

* **How do you balance your contributions with other responsibilities
  like work or school?**

  At the moment, I’m not tied to a full-time job or school, but I spend a lot
  of time learning new tech and doing freelance work. I usually dedicate small,
  focused sessions to Git contributions, sometimes just an hour here or there,
  and it’s surprising how much progress you can make that way. This rhythm lets
  me keep learning, experimenting, and contributing without feeling overwhelmed.

* **Can you share how Outreachy helped enhance your technical and
  non-technical skills (like communication, project management,
  etc.)?**

  Outreachy was a huge growth opportunity for me, both technically and personally.
  On the technical side, I deepened my understanding of Git internals, learned to
  work effectively in a large C codebase, and tackled complex refactoring of core
  systems. On the non-technical side, I honed my communication skills by engaging
  actively on the Git mailing list, responding to feedback, and documenting my
  work clearly for others. The experience also helped me improve project
  discipline, learning how to plan and iterate on tasks in a structured way.

* **What was your biggest takeaway or learning from Outreachy that
  you now apply regularly in your work?**

  My biggest takeaway from Outreachy was learning how even small, careful changes
  can have a big impact in a large system like Git. During Outreachy, for even
  the tiniest change, I had to run over 32,000 test cases just to be
  sure it wouldn’t break anything! I approach my work by breaking tasks into
  smaller steps, testing thoroughly, and thinking through the consequences
  before making changes. This mindset has become a regular part of how I work,
  whether I’m contributing to open source or building my own projects.

* **What was the biggest challenge you faced during your contributions
  to Git, and how did you overcome it?**

  The toughest part of contributing to Git was navigating its huge and complex
  C codebase. I had to wrap my head around global variables, repository-specific
  state, and how configs were stored and read. At first, it felt overwhelming,
  and I constantly worried that even a small change might break something.

  I overcame this by tackling one piece at a time, reading the code carefully,
  testing thoroughly, and admittedly, disturbing my mentors quite a bit! 😂 I’m
  especially grateful to Christian Couder and Usman Akinyemi, who guided me
  patiently. Christian taught me how to ask questions properly, showed me how to
  debug effectively, and always encouraged me to think through problems step by
  step. Usman was equally supportive, often checking in and joining coding
  sessions with me. Both helped me understand Git’s internal architecture and
  gave me the confidence to contribute safely and effectively.

* **Have you thought about mentoring new GSoC / Outreachy students?**

  Yes, I have thought about mentoring future GSoC or Outreachy students. Since I’m
  still relatively new to open source myself, I want to focus on contributing and
  learning for now. However, I do hope to co-mentor in the next Outreachy program,
  sharing what I’ve learned and helping others navigate the experience.

* **If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?**

  If I had a team of expert developers working full time on Git for a year, I
  would focus on further improving its modularity and internal architecture.
  My goal would be to make Git easier to embed and reuse as a library, reducing
  reliance on global state and improving the safety of multi-repository
  operations.
 
  This would not only make Git more maintainable for contributors but also open
  up new possibilities for other projects to integrate Git functionality
  more easily.

* **If you could remove something from Git without worrying about
  backwards compatibility, what would it be?**

  If I could remove anything from Git without worrying about backwards
  compatibility, I’d simplify some of the legacy parts of its internal state.
  These older structures can be confusing and tricky to work with, and removing
  them would make Git’s internals cleaner and easier to reason about.

* **What upcoming features or changes in Git are you particularly
  excited about?**

  I’m particularly excited about Git’s ongoing libification efforts, which make
  it easier for other projects to embed and reuse Git functionality. Changes that
  reduce global state and improve repository isolation also excite me, because
  they make multi-repository operations safer and Git’s internals easier to work
  with. I’m curious to see how these improvements will open up new possibilities
  for both contributors and external tools that rely on Git.

* **What is your favorite Git-related tool/library, outside of Git
  itself?**

  I’d say my favorite Git-related tool is `gitingest`. It’s really handy for
  exploring repositories programmatically and testing workflows. I’ve found it
  especially useful while learning Git internals.

* **What is your toolbox for interacting with the mailing list and for
  development of Git?**

  I mainly use `git send-email` to submit patches, read threads on
  [lore.kernel.org/git](https://lore.kernel.org/git), and reply via
  Gmail. This setup helps me follow discussions and iterate on my
  contributions smoothly.

* **How do you envision your own involvement with Git or other open
  source projects in the future?**

  I’m here to stay in open source. I want to keep contributing to Git and other
  projects, learning as I go, taking on bigger challenges, and helping new
  contributors find their footing. Open source has become a big part of how I
  grow as a developer, and I hope to keep giving back for years to come.

* **What is your advice for people who want to start Git development?
  Where and how should they start?**

  My advice for anyone starting Git development is to begin small and be curious.
  A great resource I found helpful is the [MyFirstContribution](https://git-scm.com/docs/MyFirstContribution)
  document. Start by reading the guides, experimenting locally, and submitting
  small patches. Interacting with the mailing list, asking questions, and iterating
  on feedback will help you learn and grow as a contributor.

* **Would you recommend other students or contributors to participate
  in the GSoC, Outreachy or other mentoring programs, working on
  Git? Why? Do you have advice for them?**

  Absolutely, I would recommend programs like GSoC or Outreachy for anyone
  interested in Git or open source. These programs provide structured mentorship,
  exposure to real-world projects, and the chance to learn directly from
  experienced developers. My advice is to start small, be curious, ask questions,
  and don’t be afraid to iterate on feedback. Every contribution, no matter how
  minor it may seem, is a valuable learning experience.


## Other News

__Various__


__Light reading__

<!---
__Easy watching__
-->

__Git tools and sites__


## Releases

+ Git for Windows [v2.52.0(2)](https://github.com/git-for-windows/git/releases/tag/v2.52.0.windows.2),
[v2.51.2(2)](https://github.com/git-for-windows/git/releases/tag/v2.51.2.windows.2),
[v2.53.0(2)](https://github.com/git-for-windows/git/releases/tag/v2.53.0.windows.2)
+ Bitbucket Data Center [10.2](https://confluence.atlassian.com/bitbucketserver/release-notes-872139866.html)
+ Gerrit Code Review [3.11.10](https://www.gerritcodereview.com/3.11.html#31110),
[3.11.9](https://www.gerritcodereview.com/3.11.html#3119),
[3.12.5](https://www.gerritcodereview.com/3.12.html#3125),
[3.12.6](https://www.gerritcodereview.com/3.12.html#3126),
[3.13.4](https://www.gerritcodereview.com/3.13.html#3134),
[3.13.5](https://www.gerritcodereview.com/3.13.html#3135),
[3.14.0-rc0](https://www.gerritcodereview.com/3.14.html#3140)
+ GitHub Enterprise [3.20.0](https://docs.github.com/enterprise-server@3.20/admin/release-notes#3.20.0),
[3.19.4](https://docs.github.com/enterprise-server@3.19/admin/release-notes#3.19.4),
[3.18.7](https://docs.github.com/enterprise-server@3.18/admin/release-notes#3.18.7),
[3.17.13](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.13),
[3.16.16](https://docs.github.com/enterprise-server@3.16/admin/release-notes#3.16.16),
[3.15.20](https://docs.github.com/enterprise-server@3.15/admin/release-notes#3.15.20),
[3.14.25](https://docs.github.com/enterprise-server@3.14/admin/release-notes#3.14.25)
+ GitLab [18.10.1, 18.9.3, 18.8.7](https://about.gitlab.com/releases/2026/03/25/patch-release-gitlab-18-10-1-released/),
[18.10](https://about.gitlab.com/releases/2026/03/19/gitlab-18-10-released/),
[18.9.2, 18.8.6, 18.7.6](https://about.gitlab.com/releases/2026/03/11/patch-release-gitlab-18-9-2-released/)
+ GitKraken [11.10.0](https://help.gitkraken.com/gitkraken-desktop/current/)
+ GitHub Desktop [3.5.6](https://desktop.github.com/release-notes/)
+ Garden [2.6.0](https://github.com/garden-rs/garden/releases/tag/v2.6.0)
+ Git Cola [4.18.2](https://github.com/git-cola/git-cola/releases/tag/v4.18.2),
[4.18.1](https://github.com/git-cola/git-cola/releases/tag/v4.18.1),
[4.18.0](https://github.com/git-cola/git-cola/releases/tag/v4.18.0)
+ GitButler [0.19.6](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.19.6),
[0.19.5](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.19.5)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Olamide Caleb Bello.
