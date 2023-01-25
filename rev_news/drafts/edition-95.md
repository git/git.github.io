---
title: Git Rev News Edition 95 (January 25th, 2023)
layout: default
date: 2023-01-25 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 95 (January 25th, 2023)

Welcome to the 95th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of November 2022 and December 2022.

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

<!---
## Developer Spotlight:
-->

## Releases


## Other News

__Various__

* [Git security vulnerabilities announced](https://github.blog/2023-01-17-git-security-vulnerabilities-announced-2/)
  that affect versions 2.39 and older.
    * Two of three vulnerabilities were found as part of an audit of the Git codebase
      conducted by [X41](https://x41-dsec.de/). This audit was sponsored by the
      [Open Source Technology Improvement Fund (OSTIF)](https://ostif.org/).
      X41 have also published information about this
      [Security Audit of Git](https://x41-dsec.de/security/research/news/2023/01/17/git-security-audit-ostif/).
    * [This Week In Security: Git Deep Dive, Mailchimp, And SPF](https://hackaday.com/2023/01/20/this-week-in-security-git-deep-dive-mailchimp-and-spf)
      by Jonathan Bennett on Hackaday.
* [GitHub Sponsors will stop supporting PayPal](https://github.blog/changelog/2023-01-23-github-sponsors-will-stop-supporting-paypal/),
  starting on February 23, 2023.
* GitHub is [sunsetting Subversion support](https://github.blog/2023-01-20-sunsetting-subversion-support/).
  On January 8, 2024, GitHub will remove support for Subversion.


__Light reading__

* [Beyond Git: The other version control systems developers use](https://stackoverflow.blog/2023/01/09/beyond-git-the-other-version-control-systems-developers-use/)
  by Ryan Donovan on The Overflow (StackOverflow\.Blog).
* [Never write a commit message again (with the help of GPT-3)](https://zura.wiki/post/never-write-a-commit-message-again-with-the-help-of-gpt-3/)
  by Roger Zurawicki on his blog _(though read proposed commit message before accepting it, please)_.
<!-- Tutorials, guides, and how-tos -->
* [Mastering the Art of Writing Effective Git Commit Messages](https://dev.to/ashishxcode/mastering-the-art-of-writing-effective-github-commit-messages-5d2p)
  by Ashish Patel on DEV\.to.
* [How to Checkout a Remote Git Branch](https://www.howtogeek.com/864263/how-to-checkout-a-remote-git-branch/)
  by Dave McKay on Hot-To Geek;
  though the article missed <abbr title="Do What I Mean">DWIM</abbr> `git checkout <remote-branch>` trick,
  and do not mention newer `git switch <branch>` command as alternative to `git checkout <branch>`.

<!---
__Easy watching__
-->

__Git tools and sites__

* [Git-Sim: Visually Simulate Git Operations In Your Own Repos](https://initialcommit.com/blog/git-sim).
  Run a one-liner git-sim command in the terminal,
  for example `git-sim reset HEAD^` or `git-sim merge dev`, 
  to generate a custom Git command visualization (.jpg, .mp4) from your repository.
* [heatwave](https://github.com/james-stoup/heatwave)
  is a tool to visualize your git commits with a heat map in the terminal,
  similar to how GitHub's heat map looks.
* [git-stats](https://github.com/IonicaBizau/git-stats) is a similar tool
  to visualize local git statistics, including GitHub-like contributions calendars.
    * Note that [Git-Stats](https://gitstats.me/), also known as GitStats\.me
      is an unrelated open-source GitHub contribution analyzer as a web service,
      which was mentioned in [Git Rev News Edition #63](https://git.github.io/rev_news/2020/05/28/edition-63/).
* [scmrepo](https://github.com/iterative/scmrepo) by Iterative
  is a SCM wrapper and [fsspec][] filesystem for Git for use in [DVC][].
  Works with multiple backends: pygit2 (libgit2), Dulwich, and GitPython.
    * [DVC (Data Version Control)][DVC] was first mentioned in
      [Git Rev News Edition #42](https://git.github.io/rev_news/2018/08/22/edition-42/).
  [fsspec]: https://filesystem-spec.readthedocs.io/ "fsspec: Filesystem interfaces for Python"
  [DVC]: https://dvc.org/ "Data Version Control · DVC"
* [gptcommit](https://github.com/zurawiki/gptcommit) is a
  git prepare-commit-msg [hook](https://git-scm.com/docs/githooks)
  for authoring commit messages with GPT-3 language model.
  Note: you need to ensure you have sufficient credits in your OpenAI account to use it.

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
