---
title: Git Rev News Edition 140 (October 31st, 2026)
layout: default
date: 2026-10-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 140 (October 31st, 2026)

Welcome to the 140th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](https://git.github.io).

This edition covers what happened during the months of September and October 2026.

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

## Developer Spotlight: Pablo Sabater

_Editor’s note: This edition features a retrospective interview with a
contributor who contributed to Git through a mentoring program. We hope
the reflections shared by the GSoC contributor will provide an
insightful perspective that benefits the community. As always, we
welcome your thoughts and feedback!_

* **Who are you and what do you do?**

  I'm Pablo Sabater, a Computer Science and Engineering undergraduate
  from Spain. I study at the University of Murcia but I'm currently living
  in Lisbon studying at NOVA FCT. I'm into low-level systems programming,
  mostly C. Apart from Git.

  Apart from coding I really enjoy cooking.

  This summer I was a GSoC contributor at Git, mentored by Karthik Nayak
  and Chandra Pratap.

* **How did you initially become interested in contributing to Git, and
  what motivated you to choose it as your GSoC project?**

  Paco told me about GSoC, and Git was one of the organizations that
  caught the most my attention, it's a tool I use every day and I
  wanted to know how it really works. I started contributing around
  March 2026 with small patches (little time for the proposal deadline
  haha).

  [The project](https://summerofcode.withgoogle.com/programs/2026/projects/752yzmwm)
  was completing remote-object-info for `git cat-file --batch-command`.
  It had already gone through Calvin Wan and Eric Ju, same as some
  series that I had merged at the beginning I tried finding the most
  visual output as testing it would be "easier" and I just like
  to see what I have worked on. That's why I've also worked on the
  graph machinery. So, completing a command seemed very interesting
  and visual for me.

* **How do you feel your contribution has impacted the Git community or
  the broader open source ecosystem?**

  Protocol v2 had the server side of object-info since 2021, but no
  client was using it. Now `git cat-file --batch-command` can ask a
  remote for the size and the type of an object without downloading it.
  That's useful for partial clones, large repos, and tools that only
  need metadata.

  However it is not an option that many forges have activated sadly.

  Outside of GSoC, I also [added `--graph-lane-limit`](https://lore.kernel.org/git/20260328001113.1275291-1-pabloosabaterr@gmail.com/)
  and [visual root indentation](https://lore.kernel.org/git/20260714-ps-pre-commit-indent-v12-0-d50938e006df@gmail.com/)
  to `git log --graph` and some tiny fixes. I don't think they have
  huge impact but at least some?

  Maybe the best contribution is that when I've seen someone on the
  `#my-first-contribution` channel [on Discord](https://git-scm.com/community#discord)
  and I tried to review their patches quickly and help them out.

* **Is there any aspect of Git that you now see differently after having
  contributed to it?**

  There is a lot of backward compatibility. Some parts are not very
  pretty to look at and now I get more interested about the commands
  I use.

* **How do you balance your contributions with other responsibilities
  like work or school?**

  Not as good as I'd liked. Luckily I was in summer and I had no classes
  but I tend to let things that I like absorb me. However I still enjoyed
  the summer with my friends, sometimes I worked in advance to not work
  in some days and some other day I brought the laptop to camping.

* **Can you share how GSoC helped enhance your technical and
  non-technical skills (like communication, project management, etc.)?**

  Technically, I learned how Git works internally and Git has some very
  good parts that I have also learned from and helped improve my C coding.

  Non-technically, I improve how to review other people's work.

* **What was your biggest takeaway or learning from GSoC that you now
  apply regularly in your work?**

  I was a frequent user of `git commit -m ""` and after Git I enjoy
  making small commits with their full body and having linear histories
  on my own project (I even try to make my friends to do the same).

* **What was the biggest challenge you faced during your contributions
  to Git, and how did you overcome it?**

  May be fear or repercussion? I know it sounds ridiculous (more after
  meeting a lot of Git contributors). Everyone is so nice. In the beginning,
  though, the mailing list acts like an "evil filter".

  Regarding coding, I think usually things are easier when you start
  from scratch. This time, I was in a huge codebase of code that I
  didn't know and had to pull a series not written by me from scratch.

* **Have you thought about mentoring new GSoC / Outreachy students?**

  Yes, I'd love to. I was planning to mentor Outreachy this year but
  I overestimated my time here in Lisbon and I had to drop out.

  I hope to mentor in the future.

* **If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?**

  I mean, everyone is already doing a lot of things and I still don't
  know a LOT of Git. I like to say that one doesn't know what it lacks
  until they know what it has.

  But I see interesting work on VFS, LFS and I'd love good documentation
  throughout the codebase.

* **If you could remove something from Git without worrying about
  backwards compatibility, what would it be?**

  I don't know, sorry.

* **What upcoming features or changes in Git are you particularly
  excited about?**

  I think that the one I'm most excited for is the [pluggable backends](https://youtu.be/8dFBpblOsZY?si=7WnIUPvA47omFQ5S).
  Even though I don't work on any big corp that would use it, I'm
  sure that I'm going to have fun trying it.

* **What is your favorite Git-related tool/library, outside of Git
  itself?**

  [b4](https://b4.docs.kernel.org/en/latest/), made the work of
  sending things to a mailing list so easy.

* **What is your toolbox for interacting with the mailing list and for
  development of Git?**

  I code on [neovim](https://neovim.io/) and I like to keep most of
  my stuff on the terminal, to review others I download the thread
  as mbox; and then I use [aerc](https://aerc-mail.org/) to answer;
  and to send my work I now use b4.

  One command that I didn't know until recently that Git has on the
  codebase is [`git clang-format --diff`](https://github.com/llvm/llvm-project/blob/main/clang/tools/clang-format/git-clang-format),
  which I don't remember who told me about it sadly. Before knowing
  about it, I always had style complaints on my series.

* **How do you envision your own involvement with Git or other open
  source projects in the future?**

  I want to keep contributing to Git, become better at it and treating
  it as if it is my own project. I want to also involve in other open
  source projects, for example I'm trying with a friend to build a proper
  e-ink simulator on top of open source hardware.

  I see that Git, even though it is a huge project the actual people
  that you see on the mailing list daily is in fact, small. At Git
  Merge everyone knows each other. I want something like that.

  And of course I would love to have an idea that leads into a big
  open source project with community.

* **What is your advice for people who want to start Git development?
  Where and how should they start?**

  I'd say that even if you are lazy, reading documentation will save so
  much time in the long run that it's worth it. The people on the mailing
  list are very nice and to take their time, there is no joy in rushing
  things.

* **Would you recommend other students or contributors to participate in
  the GSoC, Outreachy or other mentoring programs, working on Git? Why?
  Do you have advice for them?**

  Totally, it's one of the best experiences that I've had.

  I want to mention Tian, Jayatheerth and Siddharth the other 3 GSoC
  contributors at Git this summer and of course to Karthik and Chandra
  my mentors.

## Other News

__Various__


__Light reading__

<!---
__Easy watching__
-->

__Git tools and sites__


## Releases

+ Git for Windows [v2.56.0(4)](https://github.com/git-for-windows/git/releases/tag/v2.56.0.windows.4),
[v2.56.0(3)](https://github.com/git-for-windows/git/releases/tag/v2.56.0.windows.3),
[v2.56.0(2)](https://github.com/git-for-windows/git/releases/tag/v2.56.0.windows.2)
+ go-git [6.0.0-beta.1](https://github.com/go-git/go-git/releases/tag/v6.0.0-beta.1)
+ gitoxide [0.61.0](https://github.com/GitoxideLabs/gitoxide/releases/tag/v0.61.0),
[0.60.0](https://github.com/GitoxideLabs/gitoxide/releases/tag/v0.60.0)
+ Grit [0.5.26](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.26),
[0.5.25](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.25),
[0.5.24](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.24),
[0.5.23](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.23),
[0.5.22](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.22),
[0.5.21](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.21),
[0.5.20](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.20),
[0.5.19](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.19),
[0.5.18](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.18),
[0.5.17](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.17),
[0.5.16](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.16),
[0.5.15](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.15),
[0.5.14](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.14),
[0.5.13](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.13),
[0.5.12](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.12),
[0.5.11](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.11),
[0.5.10](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.10),
[0.5.9](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.9),
[0.5.8](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.8),
[0.5.7](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.7),
[0.5.6](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.6),
[0.5.5](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.5),
[0.5.4](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.4),
[0.5.3](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.3),
[0.5.2](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.2),
[0.5.1](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.1)
+ Gitea [28.2.0](https://github.com/go-gitea/gitea/releases/tag/v28.2.0),
[28.1.0](https://github.com/go-gitea/gitea/releases/tag/v28.1.0)
+ Gerrit Code Review [3.14.5](https://www.gerritcodereview.com/3.14.html#3145),
[3.15.0-rc0](https://www.gerritcodereview.com/3.15.html#3150),
[3.15.0-rc1](https://www.gerritcodereview.com/3.15.html#3150),
[3.15.0-rc2](https://www.gerritcodereview.com/3.15.html#3150),
[3.15.0-rc3](https://www.gerritcodereview.com/3.15.html#3150),
[3.15.0-rc4](https://www.gerritcodereview.com/3.15.html#3150)
+ GitHub Enterprise [3.22.2](https://docs.github.com/enterprise-server@3.22/admin/release-notes#3.22.2),
[3.21.7](https://docs.github.com/enterprise-server@3.21/admin/release-notes#3.21.7),
[3.20.9](https://docs.github.com/enterprise-server@3.20/admin/release-notes#3.20.9),
[3.19.13](https://docs.github.com/enterprise-server@3.19/admin/release-notes#3.19.13),
[3.18.16](https://docs.github.com/enterprise-server@3.18/admin/release-notes#3.18.16)
+ GitLab [19.6](https://docs.gitlab.com/releases/19/gitlab-19-6-released/),
[19.5](https://docs.gitlab.com/releases/19/gitlab-19-5-released/)
+ GitKraken [12.6.1](https://help.gitkraken.com/gitkraken-desktop/current/),
[12.6.0](https://help.gitkraken.com/gitkraken-desktop/current/)
+ GitHub Desktop [3.6.10](https://desktop.github.com/release-notes/),
[3.6.9](https://desktop.github.com/release-notes/),
[3.6.8](https://desktop.github.com/release-notes/),
[3.6.7](https://desktop.github.com/release-notes/)
+ lazygit [0.66.2](https://github.com/jesseduffield/lazygit/releases/tag/v0.66.2),
[0.66.1](https://github.com/jesseduffield/lazygit/releases/tag/v0.66.1),
[0.66.0](https://github.com/jesseduffield/lazygit/releases/tag/v0.66.0)
+ GitButler [0.23.1](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.23.1),
[0.23.0](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.23.0)
+ delta [0.20.1](https://github.com/dandavison/delta/releases/tag/0.20.1),
[0.20.0](https://github.com/dandavison/delta/releases/tag/0.20.0)
+ difftastic [0.72.0](https://github.com/Wilfred/difftastic/releases/tag/0.72.0)
+ Kinetic Merge [1.24.0](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.24.0),
[1.23.0](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.23.0),
[1.22.2](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.22.2),
[1.22.1](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.22.1),
[1.22.0](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.22.0),
[1.21.6](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.21.6),
[1.21.5](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.21.5),
[1.21.4](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.21.4),
[1.21.3](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.21.3),
[1.21.2](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.21.2),
[1.21.1](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.21.1),
[1.21.0](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.21.0),
[1.20.0](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.20.0)
+ git-credential-oauth [0.18.0](https://github.com/hickford/git-credential-oauth/releases/tag/v0.18.0)
+ git-lfs [3.8.1](https://github.com/git-lfs/git-lfs/releases/tag/v3.8.1)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
