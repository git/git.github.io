---
title: Git Rev News Edition 141 (November 30th, 2026)
layout: default
date: 2026-11-30 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 141 (November 30th, 2026)

Welcome to the 141st edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](https://git.github.io).

This edition covers what happened during the months of October and November 2026.

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

## Developer Spotlight: Tian Yuchen

_Editor’s note: This edition features a retrospective interview with a
contributor who contributed to Git through a mentoring program. We hope
the reflections shared by the GSoC contributor will provide an
insightful perspective that benefits the community. As always, we
welcome your thoughts and feedback!_

* **Who are you and what do you do?**

  My name is Tian Yuchen, and I am currently an undergraduate student
  at [Nanyang Technological University](https://www.ntu.edu.sg/) in
  Singapore, majoring in
  [Electrical and Electronic Engineering](https://www.ntu.edu.sg/eee).

  I'm the kind of person who fits the stereotype of an "EE student who
  taught himself computer science" — in other words, I like tinkering
  with Linux, low-level programming, and C. Lately, I've been exploring
  [Golang](https://go.dev/).

  This summer I contributed code to Git as part of the
  [Google Summer of Code](https://summerofcode.withgoogle.com/)
  program, and I really enjoyed it!

* **How did you initially become interested in contributing to Git,
  and what motivated you to choose it as your GSoC project?**

  I don't think anyone would say it's not cool to help develop a tool
  that everyone uses, right? Considering Git's status in the
  open-source community, it's like when your friend is drinking a
  Coke, and you walk up to him and say, "Hey man, you know what, I
  invented Coke..."

  Jokes aside, Git was developed through the collective efforts of
  many people, and its success is the result of everyone's hard work.
  What I've contributed doesn't really amount to much for the
  community. On the other hand, it probably means more to me
  personally. I'd heard for a long time that the Git community has a
  rigorous code review process, so naturally I wanted to take on the
  challenge and hone my skills.

  My project is
  "[Refactor in order to eliminate Git's global state](https://summerofcode.withgoogle.com/programs/2026/projects/Lx1PmL4k)".
  Earlier this year, when I was browsing the
  [idea list](https://git.github.io/SoC-2026-Ideas/), I felt this would
  be a great way to practice my fundamental skills...

* **How do you feel your contribution has impacted the Git community
  or the broader open source ecosystem?**

  I've actually been quietly following the mailing list all along and
  keeping an eye on the work being done on my project... When I saw
  [this](https://lore.kernel.org/git/at9HOXZhVcl53CGX@pks.im/), it
  would be a lie to say I wasn't discouraged.

  But I soon realized that with architectural adjustments like this,
  there are always dead ends and what I did wasn't meaningless. At the
  very least, I demonstrated through my actions that a certain
  refactoring path wasn't worth the effort at that moment, which will
  undoubtedly benefit future developers.

* **Is there any aspect of Git that you now see differently after
  having contributed to it?**

  I used to think Git was just a small tool with a very limited set of
  features, but as I've explored it further, I've discovered a lot of
  amazing advanced features. It's really cool.

* **How do you balance your contributions with other responsibilities
  like work or school?**

  Actually, GSoC happens to coincide perfectly with my summer
  vacation, so there's really nothing to balance...?

  However, there have still been some very personal matters that have
  thrown off my rhythm, which I'd rather not mention here. All in all,
  I think things were going pretty well.

* **What was your biggest takeaway or learning from GSoC that you now
  apply regularly in your work?**

  It's definitely
  [`git rebase -i`](https://git-scm.com/docs/git-rebase#_interactive_mode).
  I hardly ever used this feature before, but now I'm blown away by
  how powerful it is. (Of course, if you really want to compare, it's
  definitely not as intuitive as
  [LazyGit](https://github.com/jesseduffield/lazygit), but it wins out
  in terms of handiness and simplicity.)

* **What was the biggest challenge you faced during your contributions
  to Git, and how did you overcome it?**

  Time difference. I'm not the type of person who likes to drag things
  out. Having to wait until the next morning to see a reply (or
  possibly not seeing one at all) is really frustrating for me.
  However, I later learned to work on multiple tasks simultaneously,
  which helped a lot. Thanks, Christian!

* **Have you thought about mentoring new GSoC / Outreachy students?**

  Maybe. Maybe I can help out just a little bit. :P

* **If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?**

  I'd like to continue cleaning up the global state and working on
  libification-related tasks. In that case, I should join Patrick's
  team... though I still need to work on my technical skills!

* **What is your favorite Git-related tool/library, outside of Git
  itself?**

  This is a little script I wrote myself. Just enter a link, and it
  pulls the discussion thread into Thunderbird and periodically
  deletes local emails that haven't been updated in two weeks. It's
  very simple, but I use it all the time!

* **What is your toolbox for interacting with the mailing list and for
  development of Git?**

  [Thunderbird](https://www.thunderbird.net/) +
  [Vim](https://www.vim.org/), that's all! The only Git-related
  plugins in Vim are LazyGit
  and [vim-gitgutter](https://github.com/airblade/vim-gitgutter), but
  I don't think either of them is particularly useful...

* **What is your advice for people who want to start Git development?
  Where and how should they start?**

  Don't just focus on yourself! Pay more attention to what others are
  doing and what those who came before you have already done! It's
  unwise to repeat the same mistakes on a given topic. Yes, I'm the
  one who made the same mistake again, and I've learned a valuable
  lesson from it!

* **Would you recommend other students or contributors to participate
  in the GSoC, Outreachy or other mentoring programs, working on Git?
  Why? Do you have advice for them?**

  Absolutely. For anyone looking to improve their skills, the growth
  GSoC provides is truly meteoric. When I'm working on my personal
  projects, I find myself instinctively reviewing my own code from the
  perspective of a reviewer in the Git community; my grasp of
  architecture has also improved significantly. It's definitely worth
  it!

## Other News

__Various__


__Light reading__
+ [Git Recover Lost Commits: 12 Fixes for Common Mistakes](https://devtoolhub.com/git-recover-lost-commits/)
  by Amaresh Pelleti on DevToolHub.
  Twelve common Git mistakes, each fixed and verified on Git 2.56.0 in
  throwaway repositories: `reflog` after `reset --hard`, deleted
  branches, detached-HEAD commits, `ORIG_HEAD` after a merge or rebase,
  dropped stashes, and `git fsck --lost-found` for staged work.
  It lists what was not tested.

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
