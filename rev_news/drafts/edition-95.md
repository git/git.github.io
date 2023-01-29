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

### Support

* [Question: How to execute git-gc correctly on the git server](https://lore.kernel.org/git/CAOLTT8Tt3jW2yvm6BRU3yG+EvW1WG9wWFq6PuOcaHNNLQAaGjg@mail.gmail.com/)

  ZheNing Hu asked about how he could run `git gc` correctly on his
  own Git server. He seemed to be afraid by
  [the `git gc` documentation](https://git-scm.com/docs/git-gc)
  saying that there is a risk of failures and repository corruption
  when the command is run concurrently with other Git processes.

  He said that he
  [read about `git gc --cruft`](https://github.blog/2022-09-13-scaling-gits-garbage-collection/)
  which could overcome these issues, but that he was still using Git
  v2.35 on his server while `--cruft` was introduced in v2.38.

  He also wondered if before v2.38 a repository level lock blocking
  some Git operations was needed and what any Git command run when the
  lock is taken should do and report.

  Ævar Arnfjörð Bjarmason replied that running `git gc` on a "live"
  repo was always racy, but the odds of corrupting the repo were
  becoming very small when the value of the `gc.pruneExpire` config
  option was increased. He said that the default setting for this
  option, 2 weeks, was "more than enough for even the most paranoid
  user".

  About `--cruft`, Ævar thought that its purpose was not only to avoid
  possible repo corruption, but also to allow more aggressive gc
  (garbage collection).

  He also wondered if this question was about large hosting sites like
  GitHub, and GitLab where `git gc` is run on live repos, and
  suggested not to worry in this case, but to take backups.

  Jeff King, alias Peff, replied to Ævar saying he was "a bit less
  optimistic" about the corruption risk decreasing when
  `gc.pruneExpire` is increased because there was no atomic view of
  the ref namespace. So renaming a branch for example was risky
  because it could be seen as removing a branch and adding a different
  one by any concurrent process. Such a process could be another push,
  not just a gc.

  Peff also said that using `--cruft` was not so much about avoiding
  corruption, but about keeping cruft objects out of the main pack to
  reduce the cost of lookups and bitmaps, and about avoiding to
  explode a lot of old objects into loose objects, which could be very
  bad for performance.

  Ævar replied to Peff discussing further when corruption was likely
  or not to happen, which issues `--cruft` could help with, and a
  patch he sent in the past to reduce possible corruption. He also
  suggested running `git gc` on the least busy hours of the day.

  Later Taylor Blau replied to Ævar and Peff discussing `--cruft` in
  the context of single-pack bitmaps or multi-pack (MIDX) bitmaps, and
  in the context of GitHub.

  In the meantime, Michal Suchánek replied to Ævar's first email
  asking what the 2 week default expiration time applied to. He also
  said that he got corrupted repos with less than 100 users "and some
  scripting" which went away when gc was disabled.

  Peff replied to Michal, saying that the expiration time applied to
  the `mtime` on the object file (or the pack containing it), and
  confirmed that it was "far from a complete race-free solution".

  ZheNing also replied to Michal saying that he prefered "no error at
  all" rather than a "small probability of error".

  Michal replied to Peff listing some workflows that are more likely
  to lead to a corrupt repo, like deleting branches but pushing other
  branches that are variant of these branches, and different people
  pushing files from the same external source.

  Peff confirmed that these workflows were indeed risky, and detailed
  a bit further how the race conditions can happen.

  ZheNing then replied to Peff asking if there was a way like a lock
  on the repository to avoid for example concurrent push and gc
  processes.

  Ævar replied that there was no such way but that we should have
  one. He explained that it could perhaps be done using hooks,
  [like 'pre-receive' and 'post-receive'](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks),
  when we are sure that all relevant operations are going through
  these hooks. (For example no local branch deletion should be
  possible.)

  ZheNing and Michal, discussed a bit further the details related to
  how a repo corruption can happen with concurrent push and gc
  processes, and how that could possibly be avoided.

<!---
## Developer Spotlight:
-->

## Releases

+ Git [2.39.1 and others](https://public-inbox.org/git/xmqq7cxl9h0i.fsf@gitster.g/)
+ Git for Windows [2.39.1(1)](https://github.com/git-for-windows/git/releases/tag/v2.39.1.windows.1)
+ libgit2 [1.5.1](https://github.com/libgit2/libgit2/releases/tag/v1.5.1)
+ GitLab [15.8](https://about.gitlab.com/releases/2023/01/22/gitlab-15-8-released/)
[15.7.5, 15.6.6, and 15.5.9](https://about.gitlab.com/releases/2023/01/17/critical-security-release-gitlab-15-7-5-released/),
[15.7.3](https://about.gitlab.com/releases/2023/01/11/gitlab-15-7-3-released/),
[15.7.2](https://about.gitlab.com/releases/2023/01/09/security-release-gitlab-15-7-2-released/),
[15.7.1](https://about.gitlab.com/releases/2023/01/05/gitlab-15-7-1-released/)
+ Bitbucket Server [8.7](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ GitHub Enterprise [3.7.4](https://help.github.com/enterprise-server@3.7/admin/release-notes#3.7.4),
[3.6.7](https://help.github.com/enterprise-server@3.6/admin/release-notes#3.6.7),
[3.5.11](https://help.github.com/enterprise-server@3.5/admin/release-notes#3.5.11),
[3.4.14](https://help.github.com/enterprise-server@3.4/admin/release-notes#3.4.14),
[3.3.19](https://help.github.com/enterprise-server@3.3/admin/release-notes#3.3.19),
[3.7.3](https://help.github.com/enterprise-server@3.7/admin/release-notes#3.7.3),
[3.6.6](https://help.github.com/enterprise-server@3.6/admin/release-notes#3.6.6),
[3.5.10](https://help.github.com/enterprise-server@3.5/admin/release-notes#3.5.10),
[3.4.13](https://help.github.com/enterprise-server@3.4/admin/release-notes#3.4.13),
[3.3.18](https://help.github.com/enterprise-server@3.3/admin/release-notes#3.3.18)
+ GitKraken [9.0.1](https://help.gitkraken.com/gitkraken-client/current/)
+ GitHub Desktop [3.1.5](https://desktop.github.com/release-notes/),
[3.1.4](https://desktop.github.com/release-notes/)

## Other News

__Various__

* [Git security vulnerabilities announced](https://github.blog/2023-01-17-git-security-vulnerabilities-announced-2/)
  that affect versions 2.39 and older.  Fixes were authored by engineers from
  the [GitLab Security Research Team](https://about.gitlab.com/handbook/security/threat-management/security-research/),
  as well as GitHub Engineers, and members of the git-security mailing list.
    * Two of three vulnerabilities were found as part of an audit of the Git codebase
      conducted by [X41](https://x41-dsec.de/). This audit was sponsored by the
      [Open Source Technology Improvement Fund (OSTIF)](https://ostif.org/).
      X41 have also published information about this
      [Security Audit of Git](https://x41-dsec.de/security/research/news/2023/01/17/git-security-audit-ostif/).
    * [Git security audit: Inside the hunt for - and discovery of - CVEs](https://about.gitlab.com/blog/2023/01/24/git-security-audit/)
      by Joern Schneeweisz on GitLab Blog.
    * [This Week In Security: Git Deep Dive, Mailchimp, And SPF](https://hackaday.com/2023/01/20/this-week-in-security-git-deep-dive-mailchimp-and-spf)
      by Jonathan Bennett on Hackaday, and
      [A security audit of Git](https://lwn.net/Articles/921067/) brief on LWN\.net.
* [GitHub Sponsors will stop supporting PayPal](https://github.blog/changelog/2023-01-23-github-sponsors-will-stop-supporting-paypal/),
  starting on February 23, 2023.
* GitHub is [sunsetting Subversion support](https://github.blog/2023-01-20-sunsetting-subversion-support/).
  On January 8, 2024, GitHub will remove support for Subversion.
* [XetHub raises $7.5M for its Git-based data collaboration platform](https://techcrunch.com/2023/01/09/xethub-raises-7-5m-for-its-git-based-data-collaboration-platform/)
  by Frederic Lardinois on TechCrunch.


__Light reading__

* [Beyond Git: The other version control systems developers use](https://stackoverflow.blog/2023/01/09/beyond-git-the-other-version-control-systems-developers-use/)
  by Ryan Donovan on The Overflow (StackOverflow\.Blog).
* [Never write a commit message again (with the help of GPT-3)](https://zura.wiki/post/never-write-a-commit-message-again-with-the-help-of-gpt-3/)
  by Roger Zurawicki on his blog _(though read proposed commit message before accepting it, please)_.
* [Sending a kernel patch with b4 (part 1)](https://people.kernel.org/monsieuricon/sending-a-kernel-patch-with-b4-part-1)
  by Konstantin Ryabitsev (sending patch with [b4](https://git.kernel.org/pub/scm/utils/b4/b4.git)
  is described in [Contributor overview](https://b4.docs.kernel.org/en/stable-0.11.y/contributor/overview.html)
  section of the tool documentation).
    * [Introducing b4 and patch attestation](https://people.kernel.org/monsieuricon/introducing-b4-and-patch-attestation)
      was mentioned in [Git Rev News Edition #61](https://git.github.io/rev_news/2020/03/25/edition-61/).
* [The GitHub Silverware Drawer Dilemma, Or: Finding Active Repository Forks](https://hackaday.com/2023/01/08/the-github-silverware-drawer-dilemma-or-finding-active-repository-forks/)
  by Maya Posch on Hackaday points to projects that help to find the most active fork.
* [7 Git articles every open source practitioner should read](https://opensource.com/article/23/1/git-articles)
  by AmyJune Hineline from RedHat on OpenSource\.com.
* [Understanding Git through images](https://dev.to/nopenoshishi/understanding-git-through-images-4an1)
  by kataoka_nopeNoshishi on DEV\.to.
* [Querying the GitHub archive with the ClickHouse Playground](https://til.simonwillison.net/clickhouse/github-explorer)
  by Simon Willison on Simon Willison’s TILs (Today I've Learned).
<!-- Tutorials, guides, and how-tos -->
* [7 tips for improving your productivity with Git](https://blog.genezini.com/p/7-tips-for-improving-your-productivity-with-git/)
  by Daniel Genezini on his "It works on my machine" blog
  (also [on DEV\.to](https://dev.to/dgenezini/7-tips-for-improving-your-productivity-with-git-ajg)).
* [Fix that damn Git Unsafe Repository](https://weblog.west-wind.com/posts/2023/Jan/05/Fix-that-damn-Git-Unsafe-Repository)
  by Rick Strahl on Rick Strahl's Weblog.
* [Mastering the Art of Writing Effective Git Commit Messages](https://dev.to/ashishxcode/mastering-the-art-of-writing-effective-github-commit-messages-5d2p)
  by Ashish Patel on DEV\.to.
* [11 tips for writing a good Git commit message](https://opensource.com/article/22/12/git-commit-message)
  by AmyJune Hineline from RedHat on OpenSource\.com.
* [20 Git Commands you (probably) didn't know about](https://dev.to/lissy93/20-git-commands-you-probably-didnt-know-about-4j4o)
  by Alicia Sykes on DEV\.to.
* [How to Checkout a Remote Git Branch](https://www.howtogeek.com/864263/how-to-checkout-a-remote-git-branch/)
  by Dave McKay on How-To Geek;
  though the article missed <abbr title="Do What I Mean">DWIM</abbr> `git checkout <remote-branch>` trick,
  and do not mention newer `git switch <branch>` command as alternative to `git checkout <branch>`.
* [Git tutorials - understanding of rebase and merge](https://dev.to/bitethecode/git-tutorials-understanding-of-rebase-and-merge-2cg4)
  by Joonhyeok Ahn (Joon) on DEV\.to is the final part in 4 part
  [Git Cookbook](https://dev.to/bitethecode/series/20767) series.
<!-- Humor, or tangentially related -->
* [Golang (and thus `git-lfs`) is evil on shitty networks](https://withinboredom.info/blog/2022/12/29/golang-is-evil-on-shitty-networks/)
  on Somewhere Within Boredom blog _(may be fixed by the time you are reading this)_.

<!---
__Easy watching__
-->

__Git tools and sites__

* [Git-Sim: Visually Simulate Git Operations In Your Own Repos](https://initialcommit.com/blog/git-sim).
  Run a one-liner git-sim command in the terminal,
  for example `git-sim reset HEAD^` or `git-sim merge dev`, 
  to generate a custom Git command visualization (.jpg, .mp4) from your repository.
  Written in Python, available as [package on PyPI](https://pypi.org/project/git-sim/).
* [heatwave](https://github.com/james-stoup/heatwave)
  is a tool to visualize your git commits with a heat map in the terminal,
  similar to how GitHub's heat map looks.
  Written in Python, also available as [package on PyPI](https://pypi.org/project/heatwave/).
* [git-stats](https://github.com/IonicaBizau/git-stats) is a similar tool
  to visualize local git statistics, including GitHub-like contributions calendars.
  Written in JavaScript + HTML, available as [npm.js package](https://www.npmjs.com/package/git-stats).
    * Note that [Git-Stats](https://gitstats.me/), also known as GitStats\.me
      is an unrelated open-source GitHub contribution analyzer as a web service,
      which was mentioned in [Git Rev News Edition #63](https://git.github.io/rev_news/2020/05/28/edition-63/).
* [scmrepo](https://github.com/iterative/scmrepo) by Iterative
  is a SCM wrapper and [fsspec](https://filesystem-spec.readthedocs.io/ "fsspec: Filesystem interfaces for Python") filesystem for Git for use in [DVC](https://dvc.org/ "Data Version Control · DVC").
  Works with multiple backends: pygit2 (libgit2), Dulwich, and GitPython.
    * DVC (Data Version Control) was first mentioned in
      [Git Rev News Edition #42](https://git.github.io/rev_news/2018/08/22/edition-42/).
* [gptcommit](https://github.com/zurawiki/gptcommit) is a
  git prepare-commit-msg [hook](https://git-scm.com/docs/githooks)
  for authoring commit messages with GPT-3 language model.  Written in Rust.<br />
  Note: you need to ensure you have sufficient credits in your OpenAI account to use it.
* There are a few software forges working on implementing ForgeFed and/or ActivityPub federation.
  [ForgeFed](https://notabug.org/peers/forgefed) (formerly GitPub) is a federation protocol
  for forge services, first mentioned in [Git Rev News Edition #69](https://git.github.io/rev_news/2020/11/27/edition-69/) in 2020.
    * [Vervis](https://vervis.peers.community/repos/WvWbo/source) is a project hosting
      and management application, with a focus on software projects and decentralization.
      Self-hosted on <https://vervis.peers.community> instance.  Supports Git and Darcs,
      and [ForgeFed/ActivityPub federation](https://vervis.peers.community/repos/WvWbo/source/FEDERATION.md).
      It is currently very much a work in progress.  Written in Haskell.
    * [ForgeFlux](https://forgeflux.org/) is [API-space software forge](https://github.com/forgeflux-org/website/blob/master/content/about/index.md)
      federation with ForgeFed for Gitea, Sourcehut, GitLab, and GitHub.
      Repositories are (also) [hosted on GitHub](https://github.com/forgeflux-org).
      Note: project homepage on <https://forgeflux.org/> seems to be down at the time of writing.
    * [Forgefriends](https://forgefriends.org/) is a [self-hosted](https://lab.forgefriends.org/forgefriends/forgefriends)
      forge federation project, which purpose is to allow every Free Software developer
      to use their favorite forge to contribute to software projects hosted on other forges.
      Forgefriends is written in Go to share code with Gitea, 
      and synchronization is done via the W3C ActivityPub protocol.
      It is currently in pre-alpha stage.

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
