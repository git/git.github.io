---
title: Git Rev News Edition 97 (March 29th, 2023)
layout: default
date: 2023-03-29 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 97 (March 29th, 2023)

Welcome to the 97th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of February 2023 and March 2023.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

### Support

* [bug report: symbolic-ref --short command echos the wrong text while use Chinese language](https://lore.kernel.org/git/CAGF3oAcCi+fG12j-1U0hcrWwkF5K_9WhOi6ZPHBzUUzfkrZDxA@mail.gmail.com/)

  Mengzi Yi (孟子易) sent a bug report to the mailing list saying that
  when a Chinese name like 测试-加-增加-加-增加 was given to a branch,
  then using `git symbolic-ref --short HEAD` on that branch didn't
  give the right output (for example 测试-� instead of maybe 测试-加).

  Peff, alias Jeff King, replied saying that he couldn't reproduce the
  issue on Linux and wondered if it was related to using MacOS as its
  HFS+ filesystem might do some unicode normalization. He said that it
  might alternatively be related to the shortening code in
  `shorten_unambiguous_ref()` treating the names as bytes instead of
  characters. Another possibility he mentioned was that the shortening
  code, which used `scanf()`, was assuming that the resulting string
  could not be longer than the input, but that this might be wrong
  when some unicode normalization and locale are used.

  Eric Sunshine replied to Peff saying he was able to reproduce the
  bug on MacOS 10.13 (while Mengzi used MacOS 13.2), but that it
  didn't appear to be related to HFS+ unicode normalization as the on
  disk bytes of the branch name he got were the same as what Peff got
  on Linux.

  Peff replied to Eric asking if he could test a patch that would add
  debug output and allocate twice as much memory for the shortened
  name that would store the output from `scanf()` than for the input
  of that function. Peff said the debug output on his Linux machine
  showed that the input was 39 bytes long while the output was 28.

  Eric tested Peff's patch and initially reported 39 and 9 for the
  input and output respectively. When setting `LANG=zh-CN.UTF-8`, he
  got the same input and output lengths as Peff though, which pointed
  to `scanf()` being indeed the culprit.

  Junio Hamano, the Git maintainer, replied to Eric's findings saying
  "Well, that's ... criminal." and wondering if setting `LANG` to
  `$ANY_VALID_ONE.UTF-8` would work the same way.

  This made Eric realize that the `zh-CN` language code he used was
  invalid (it should have been `zh_CN`, so with an underscore
  character instead of a dash). Eric anyway found out that using valid
  LANG codes like `en_US`, `fr_FR`, `de_DE`, `ru_RU` and `zh_CN` gave
  the 测试-? truncated output, while using `LANG=C` gave the correct
  测试-加-增加-加-增加 output.

  Junio, Peff and Eric discussed these results further wondering what
  `scanf()` on MacOS could be doing wrong. Then Peff suggested
  replacing the call to this function with some manual parsing, and
  sent a sample in-email patch to do that.

  Eric tested Peff's patch and reported that it looked correct, worked
  nicely and fixed the issue. He also agreed with the approach of
  getting rid of `scanf()` calls in general.

  Peff then sent
  [a regular small patch series](https://lore.kernel.org/git/Y+vVFFCRem6t4IGM@coredump.intra.peff.net/)
  based on his previous patch which fixed a leak and made the changes
  easier to follow.

  Junio and Eric reviewed the series and then discussed with Peff a bug
  Junio found in it. Then Peff sent
  [a version 2](https://lore.kernel.org/git/Y+z3MtgayoXsxaHA@coredump.intra.peff.net/)
  of the patch series that fixed the bug and added tests.

  Torsten Bögershausen in the meantime tried to reproduce the original
  bug and discussed how to do that with Eric. He also commented on the
  new tests in the version 2 of the patch series as he found that it
  wasn't clear in which context the bug could appear. Junio suggested
  some clarifications that were approved by others. The resulting
  patches were merged and included in the recent Git v2.40.0 release.

<!---
## Developer Spotlight:
-->

## Releases

+ Git [2.40.0](https://public-inbox.org/git/xmqqjzzkv8xz.fsf@gitster.g/),
[2.40.0-rc2](https://public-inbox.org/git/xmqqy1o8wdgi.fsf@gitster.g/),
[2.40.0-rc1](https://public-inbox.org/git/xmqqilfknzen.fsf@gitster.g/)
+ Git for Windows [2.40.0(1)](https://github.com/git-for-windows/git/releases/tag/v2.40.0.windows.1),
[2.40.0-rc2(1)](https://github.com/git-for-windows/git/releases/tag/v2.40.0-rc2.windows.1),
[2.40.0-rc1(1)](https://github.com/git-for-windows/git/releases/tag/v2.40.0-rc1.windows.1),
[2.40.0-rc0(1)](https://github.com/git-for-windows/git/releases/tag/v2.40.0-rc0.windows.1)
+ libgit2 [1.6.3](https://github.com/libgit2/libgit2/releases/tag/v1.6.3),
[1.6.2](https://github.com/libgit2/libgit2/releases/tag/v1.6.2)
+ GitHub Enterprise [3.8.1](https://help.github.com/enterprise-server@3.8/admin/release-notes#3.8.1),
[3.7.8](https://help.github.com/enterprise-server@3.7/admin/release-notes#3.7.8),
[3.6.11](https://help.github.com/enterprise-server@3.6/admin/release-notes#3.6.11),
[3.5.15](https://help.github.com/enterprise-server@3.5/admin/release-notes#3.5.15),
[3.4.18](https://help.github.com/enterprise-server@3.4/admin/release-notes#3.4.18),
[3.8.0](https://help.github.com/enterprise-server@3.8/admin/release-notes#3.8.0),
[3.7.7](https://help.github.com/enterprise-server@3.7/admin/release-notes#3.7.7),
[3.6.10](https://help.github.com/enterprise-server@3.6/admin/release-notes#3.6.10),
[3.5.14](https://help.github.com/enterprise-server@3.5/admin/release-notes#3.5.14),
[3.4.17](https://help.github.com/enterprise-server@3.4/admin/release-notes#3.4.17)
+ GitLab [15.10](https://about.gitlab.com/releases/2023/03/22/gitlab-15-10-released/)
[15.9.3](https://about.gitlab.com/releases/2023/03/09/gitlab-15-9-3-released/),
[15.9.2, 15.8.4, and 15.7.8](https://about.gitlab.com/releases/2023/03/02/security-release-gitlab-15-9-2-released/)
+ Gitea [1.19.0](https://blog.gitea.io/2023/03/gitea-1.19.0-is-released/)
+ Gerrit Code Review [3.7.2](https://www.gerritcodereview.com/3.7.html#372)
+ GitKraken [9.2.1](https://help.gitkraken.com/gitkraken-client/current/),
[9.2.0](https://help.gitkraken.com/gitkraken-client/current/)
+ GitHub Desktop [3.2.0](https://desktop.github.com/release-notes/)
+ Sourcetree [4.2.2](https://product-downloads.atlassian.com/software/sourcetree/ReleaseNotes/Sourcetree_4.2.2.html)
+ Tower for Windows [4.3](https://www.git-tower.com/release-notes/windows?show_tab=release-notes)

## Other News

__Various__

+ [Highlights from Git 2.40](https://github.blog/2023-03-13-highlights-from-git-2-40/)
  by Taylor Blau on GitHub Blog.
+ [public-inbox.org/git to be downgraded](https://public-inbox.org/git/20230313225507.M626677@dcvr/T/)
  to a cheaper VPS.
    + There is https://lore.kernel.org/git/ if there are problems with public-inbox\.org instance.
+ [Unleash your potential with GitHub Octernships: a path to a thriving tech career](https://github.blog/2023-03-06-unleash-your-potential-with-github-octernships-a-path-to-a-thriving-tech-career/)
  by Arkodyuti Saha on GitHub Blog.
+ [Future-proofing Git repository maintenance](https://about.gitlab.com/blog/2023/03/20/scaling-repository-maintenance/)
  by Patrick Steinhardt on GitLab blog.

__Light reading__

+ [How to Improve Performance in Git: The Complete Guide](https://www.git-tower.com/blog/git-performance/) by Bruno Brito on Tower’s blog.
+ [Integrating 1Password SSH with Git (and Tower!)](https://www.git-tower.com/blog/1password-ssh-tower/) by Bruno Brito on Tower’s blog.
+ [Slice, Dice, and Squash Your Git Commit History](https://webdeveloperdiary.substack.com/p/slice-dice-and-squash-your-git-commit)
  by Anthony Fung on _Diary of a Web Developer_ Substack and 
  [on DEV.to](https://dev.to/ant_f_dev/slice-dice-and-squash-your-git-commit-history-2dk3)
  is 3rd part in [The Secret of Tidy Git Repositories Series](https://dev.to/ant_f_dev/series/22124).
+ [Git fundamentals, a complete guide](https://dev.to/leandronsp/git-fundamentals-a-complete-guide-do7)
  by Leandro Proença on DEV\.to.<br>
  See also:
    + [Git from the Bottom Up](https://jwiegley.github.io/git-from-the-bottom-up/) by John Wiegley,
      mentioned in [Git Rev News Edition #2](https://git.github.io/rev_news/2015/04/05/edition-2/),
    + [Git for Computer Scientists](https://eagain.net/articles/git-for-computer-scientists/) by Tommi Virtanen,
    + and maybe also [Think Like (a) Git: a guide for the perplexed](https://think-like-a-git.net/) by Sam Livingston-Gray.
+ [Options to close pull requests on GitHub](https://dev.to/zdybit/3-options-to-close-pull-requests-on-github-what-2j3n) and
  [Merge, squash & rebase on GitHub - pros & cons](https://dev.to/zdybit/when-to-use-particular-options-to-close-pull-requests-on-github-3ce8)
  by Kacper Rychel on DEV\.to.
+ [How to Reset a File or Commit in Git](https://www.freecodecamp.org/news/git-revert-how-to-reset-a-file-or-commit/)
  by Ihechikara Vincent Abba on freeCodeCamp.
+ [How atomic Git commits dramatically increased my productivity - and will increase yours too](https://dev.to/samuelfaure/how-atomic-git-commits-dramatically-increased-my-productivity-and-will-increase-yours-too-4a84)
  by Samuel Faure on DEV\.to and [on Such Dev Blog](https://suchdevblog.com/lessons/AtomicGitCommits.html).
+ [Working with Git in JetBrains' Rider IDE](https://andrewlock.net/working-with-git-in-jetbrains-rider/)
  by Andrew Lock on his .NET Escapades blog.
+ [GitHub Desktop 3.2 adds pull request preview – but is a GUI needed for Git?](https://devclass.com/2023/03/06/github-desktop-3-2-adds-pull-request-preview-but-is-a-gui-needed-for-git/)
  by Tim Anderson on Dev Class.
+ [Best 8 Data Version Control Tools for Machine Learning 2023](https://dagshub.com/blog/best-data-version-control-tools/)
  by Zoumana Keita on DagsHub Blog.
    + See also links about data versioning
      in [previous Git Rev News](https://git.github.io/rev_news/2023/02/28/edition-96/).
+ [A better git workflow?](https://discourse.julialang.org/t/a-better-git-workflow/95248)
  proposal by uje on Julia Language Discourse forum.
+ [Code Commit Guidelines using Conventional Commits](https://proandroiddev.com/code-commit-guidelines-using-conventional-commits-379321ce3785)
  by Pragnesh Ghoda on ProAndroidDev, a Medium blog.
  The [Conventional Commits](https://www.conventionalcommits.org) specification
  was first mentioned in [Git Rev News Edition #52](https://git.github.io/rev_news/2019/06/28/edition-52/).

<!-- Only tangentially related to Git -->
+ [Empowering weak primitives: file truncation to code execution with Git](https://www.sonarsource.com/blog/empowering-weak-primitives-file-truncation-to-code-execution-with-git/)
  by Thomas Chauchefoin on Sonar(Source) Blog
  (note that it is not about vulnerability in Git).<br>
  References [Securing Developer Tools: Git Integrations](https://www.sonarsource.com/blog/securing-developer-tools-git-integrations/)
  blog post.

<!---
__Easy watching__
-->

__Git tools and sites__

+ There are a few tools that use GPT-3 / ChatGPT Large Language Model (LLM) to
  help write commit messages. Please read the proposed commit message before
  accepting it, especially for more complex changes. Those tools, as far as I
  understand it, do not take information from an issue tracker, or from
  code review comments attached to a pull request (or contained in a specialized
  tool such as Gerrit) - so they cannot add this information to the proposed
  commit message, they can only halucinate it.
    + [OpenCommit](https://github.com/di-sukharev/opencommit)
      is GPT CLI to auto-generate impressive commits in 1 second;
      needs API key from [OpenAI](https://platform.openai.com/account/api-keys).
      Uses [Conventional Commits](https://www.conventionalcommits.org),
      can use [GitMoji](https://gitmoji.dev/).
      Written as Node\.js CLI app.
        + See also [OpenCommit: GPT generates impressive commits in 1 second (open-source)](https://dev.to/disukharev/opencommit-gpt-cli-to-auto-generate-impressive-commits-in-1-second-46dh)
          by Dima Sukharev on DEV\.to.
    + [AI Commits](https://github.com/Nutlope/aicommits)
      is a CLI app that writes your git commit messages for you with AI,
      that can also be used as [`prepare-commit-msg` hook](https://git-scm.com/docs/githooks#_prepare_commit_msg).
      Requires [API key from OpenAI](https://platform.openai.com/account/api-keys).
      Written as Node\.js v14+ CLI app.
        + See also [AI generated git commit messages](https://dev.to/bdougieyo/ai-generated-git-commit-messages-4j7g)
          by Brian Douglas on DEV\.to.
    + [AI-Commit](https://github.com/nguyenvanduocit/ai-commit)
      is a command line tool that uses [OpenAI](https://openai.com/)'s
      language generation capabilities to generate
      [conventional commit](https://www.conventionalcommits.org)
      messages for your Git repositories.  Written in Go.
    + [gptcommit](https://github.com/zurawiki/gptcommit) is
      a git prepare-commit-msg [hook](https://git-scm.com/docs/githooks)
      for authoring commit messages with the [OpenAI](https://openai.com/)'s GPT-3 language model.
      Written in Rust.
        + Mentioned in [Git Rev News Edition #95](https://git.github.io/rev_news/2023/01/31/edition-95/);
          see also [an article](https://zura.wiki/post/never-write-a-commit-message-again-with-the-help-of-gpt-3/)
          about this tool there.

+ [Planar](https://www.useplanar.com/) is a Chrome extension
  that adds features used internally by big tech to GitHub code review.
    + See also [Planar - Add 10x features to GitHub code review](https://www.ycombinator.com/launches/ICU-planar-add-10x-features-to-github-code-review)
      by Eshan Agarwal on Y Combinator (Launch YC).
+ [Git for Computer Scientists](https://eagain.net/articles/git-for-computer-scientists/)
  by Tommi Virtanen is a quick introduction to git internals for people
  who are not scared by words like Directed Acyclic Graph.
+ [Think Like (a) Git: a guide for the perplexed](https://think-like-a-git.net/)
  by Sam Livingston-Gray, intended for "advanced beginners" with Git
  to help them achieve some level of _Git enlightenment_.


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Bruno Brito.
