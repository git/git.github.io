---
title: Git Rev News Edition 130 (December 31st, 2025)
layout: default
date: 2025-12-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 130 (December 31st, 2025)

Welcome to the 130th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of November and December 2025.

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

## Developer Spotlight: Lucas Seiki Oshiro

* **Who are you and what do you do?**

  My name is Lucas Oshiro, I'm one of the three
  GSoC '25 participants working on Git. I'm from São Paulo, Brazil
  and I'm a bachelor and master in Computer Science from the
  [University of São Paulo](https://www5.usp.br/#english). I don't
  have only one specific interest in programming topics, I enjoy
  several different topics, like: lower-lever C code (like we do for Git),
  FP languages (especially Haskell), play with network simulators, data
  analysis, operating systems, databases and so on.

* **How did you initially become interested in contributing to Git,
  and what motivated you to choose it as your GSoC project?**

  Well, it's a long story... I think that it dates back to 2017, in a
  Computer Networks assignment at my university. My partner in that
  assignment was [Matheus Tavares](https://matheustavares.gitlab.io/posts/gsoc-final-report),
  who participated in [GSoC '19 on Git](https://summerofcode.withgoogle.com/archive/2019/projects/4787791739748352).
  At the time, we needed to study a vulnerability and how it was fixed.
  We chose [CVE-2017-1000117](https://nvd.nist.gov/vuln/detail/cve-2017-1000117),
  which was vulnerability in Git. That was my first time reading Git
  source code.

  Two years later, I was a member of [group focused on contributing to Free/Open-Source software](https://flusp.ime.usp.br)
  at my University. I sent a patch to Git at the time, but I needed to
  focus on other stuff and I couldn't finish it.

  After that, I started to work as a back-end software engineer and I
  witnessed several Git-related problems. My two previous experiences with
  Git's source code made me want to understand what was happening and
  delving into its internals, so I could help other developers from my
  company when something unexpected happened with Git.

  This way, Git always felt like the right choice.

* **How do you feel your contribution has impacted the Git community
  or the broader open source ecosystem?**

  My GSoC project was to create the new command [`git repo info`](https://summerofcode.withgoogle.com/archive/2025/projects/fGgMYHwl)).
  It was released in Git 2.52.0 and, like many other new Git features, I
  expect it will take some time to be widely adopted, since it's only
  available in bleeding-edge repositories. But I expect that it will be
  useful for forges, CIs, local tools, scripts, and other tools that
  depend on Git.

* **Is there any aspect of Git that you now see differently after
  having contributed to it?**

  I can't think of anything that I see differently after GSoC, but my
  previous contacts with Git's source code made me realize the importance
  of having a good commit history with good commit messages. It also made
  me understand how powerful Git is as a debugging and searching tool.

* **How do you balance your contributions with other responsibilities
  like work or school?**

  This year, I was more focused on finishing my master's research and I
  didn't have too many conflicts with GSoC, so I could focus on my
  master's when my patches were under review. However, I must admit that
  one of the reasons that I didn't apply to GSoC before was that, here
  in Brazil, we typically have final exams in June, which makes it hard
  to balance them with something else.

* **Can you share how GSoC helped enhance your technical and
  non-technical skills (like communication, project management,
  etc.)?**

  I see Git as a product created by developers, for developers, and I
  think that here we sometimes need to do the work that in other contexts
  would be done by product owners and designers. I felt that especially
  during code reviews, which were often more focused on product and design
  decisions rather than the code itself. I had to learn how to discuss
  these kinds of decisions, always aiming to do what is best for Git
  and its users.

* **What was the biggest challenge you faced during your contributions
  to Git, and how did you overcome it?**

  I think that the biggest challenge was the complete redesigns of
  `git repo info` during the GSoC period, which made me re-write it from
  scratch several times. I think this was a consequence of my previous
  answer and that this challenge was solved itself.

* **Have you thought about mentoring new GSoC / Outreachy students?**

  Yes, it would be very nice!

* **If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?**

  Git is amazing and I think we all agree that it makes the programmers'
  lives easier. It would be great if we had a GUI wrapping Git but
  targeting non-technical users.

* **If you could remove something from Git without worrying about
  backwards compatibility, what would it be?**

  Perhaps commands that accumulate responsibilities, like `git checkout`,
  `git reset` and `git rev-parse`. They make sense from the Git
  perspective, but I think they are confusing from the users
  perspective.

* **What upcoming features or changes in Git are you particularly
  excited about?**

  Some that come to my mind are:

  - Patrick Steinhardt's new [`git history`](https://lore.kernel.org/git/20250819-b4-pks-history-builtin-v1-0-9b77c32688fe@pks.im/)
    command: rewriting history is essential to keep the repository sane
    and useful as a data storage, if done correctly. Currently we do that
    through interactive rebase but I think it can be intimidating for less
    experienced users. Jujutsu proposes a more straightforward way to do
    that and it's nice to see Patrick bringing it to Git.

  - Justin Tobler's [new `git repo structure` command](https://public-inbox.org/git/20251217175404.37963-1-jltobler@gmail.com/):
    of course I'm interested in this subcommand since it is the sibling of
    my GSoC project.  But it's not only because of that: a Git repository is
    a very rich source of information and `git repo structure` will be a
    powerful tool to retrieve it.

  - Julia Evans's [contributions to documentation](https://public-inbox.org/git/?q=f%3A%22Julia+Evans%22&r=):
    Julia has been producing high-quality content about several programming
    topics for years. I'm happy to see Git being documented by someone so
    committed to spreading knowledge and who knows how to explain advanced
    concepts using a simple language.

* **What is your favorite Git-related tool/library, outside of Git
  itself?**

  I use [delta](https://github.com/dandavison/delta) a lot, I like the way
  it highlights diffs. Other tools that I find interesting are [Jujutsu](https://docs.jj-vcs.dev/latest/)
  and [Magit](https://magit.vc/), but I don't use them too much.

* **What is your toolbox for interacting with the mailing list and for
  development of Git?**

  I like desktop mail clients, but I don't have a strong preference. On
  Linux, I use Thunderbird. On Mac, I use Apple Mail. I also have some
  GMail filters for classifying the messages (patches, What's Cooking and
  Rev News announcements).

  However, those mail clients don't have code syntax highlighting and it's
  hard to read the patches inside them. For that purpose, I use
  [patch-hub](https://github.com/kworkflow/patch-hub), a TUI for reviewing
  patches from kernel mailing lists (including Git).

* **How do you envision your own involvement with Git or other open
  source projects in the future?**

  There are some things I want to finish in `git repo info` and I
  still send patches for it. I enjoyed contributing to Git and I
  don't want to stop here.

  Outside Git development, I'll give an advanced course on Git next
  month. It will be a great opportunity to share what I've learned here
  with other people.

* **What is your advice for people who want to start Git development?
  Where and how should they start?**

  Read the [Git Internals chapter from Pro Git](https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain),
  follow everything described in [Hacking Git](https://git.github.io/Hacking-Git/),
  and work on a [microproject](https://git.github.io/SoC-2025-Microprojects/).

* **Would you recommend other students or contributors to participate
  in the GSoC, Outreachy or other mentoring programs, working on Git?
  Why? Do you have advice for them?**

  Yes. I mean, I've already recommended some people from my university to
  apply to GSoC or Outreachy on Git and gave some tips to them. Some of
  them have already sent patches that were accepted.


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
