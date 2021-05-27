---
title: Git Rev News Edition 75 (May 27th, 2021)
layout: default
date: 2021-05-27 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 75 (May 27th, 2021)

Welcome to the 75th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of April 2021.

## Discussions

### General

* [Git participates in GSoC (Google Summer of Code) 2021](https://summerofcode.withgoogle.com/organizations/5908380398387200/#projects)

  The following two students have been officially accepted to work on Git
  as part of the [GSoC 2021](https://summerofcode.withgoogle.com/):

  - ZheNing Hu will work on the
    [Use ref-filter formats in `git cat-file`](https://summerofcode.withgoogle.com/projects/#6499923274498048)
    project. He will be co-mentored by Hariom Verma and Christian
    Couder. His first blog post about it [is up](https://adlternative.github.io/GSOC-Git-Blog-1/).

  - Atharva Raykar will work on the
    [Finish converting submodule to builtin](https://summerofcode.withgoogle.com/projects/#4754589292691456)
    project. He will be co-mentored by Shourya Shukla and Christian
    Couder. His first blog posts about it are [also up](https://atharvaraykar.me/gitnotes/).

  Thanks to the students who applied and worked on micro-projects, but
  couldn't be selected! We hope to continue to see you in the
  community!

* [The top 1% of commit trailers](https://lore.kernel.org/git/60ad75ac7ffca_2ae08208b@natae.notmuch/)

  Felipe Contreras posted a fun analysis of how often various commit
  trailers (`reviewed-by`, `tested-by`, etc) appear in the git.git project.
  
  Setting aside `signed-off-by` (which all contributions must include),
  the most common trailers are `acked-by` (1945 occurences) and
  `reviewed-by` (1729 occurences), together accounting for almost half
  of all trailers.
  
  The next 4 most common trailers give a great insight into just how
  much collaboration goes on in the git.git project: `helped-by` (1336),
  `reported-by` (960), `mentored-by` (379), and `suggested-by` (281).
  
  Perhaps most interesting is the long list of trailers that have only
  been seen once, though now that this list is out there we may see more
  of `deemed-obviously-correct-by`, `worriedly-acked-by`, and `cheered-on-by`
  in the future.

  One can also note that this distribution roughly follows
  [Zip's law](https://en.wikipedia.org/wiki/Zipf%27s_law); the 10th most
  popular line ("improved-by") is about 1/10 as popular as the 1st.

  [This script](https://gist.github.com/felipec/ce491d351c88e4acbdbf6bc02a47223d)
  can be used to replicate the analysis.

### Reviews

* [[PATCH] [GSOC] pretty: provide human date format](https://lore.kernel.org/git/pull.939.git.1619195245606.gitgitgadget@gmail.com/)

  ZheNing Hu sent a patch to the mailing list to add the new `%ah` and
  `%ch` formatting options to the "pretty formats". The "pretty
  formats" are the main way for users to customize the output of the
  `git log`, `git show`, `git rev-list`, and `git diff-tree` commands.

  These formats are specified by the
  [`--pretty[=<format>]` or `--format=<format>`](https://git-scm.com/docs/git-log#Documentation/git-log.txt---prettyltformatgt)
  command line flags, where `<format>`is the actual
  ["pretty format"](https://git-scm.com/docs/git-log#_pretty_formats),
  and can be either a "built-in format", like `oneline`, `raw`,
  `short`, `medium`, etc, or `format:<string>`, which is called a
  "format string".

  These format strings work in a similar way to `printf()` formats, as
  they can contain placeholders starting with a `%` character, that
  will be expanded by the command. For example `%H` will be expanded
  to print the commit hash, `%an` the author name, etc.

  A lot of placeholders already exist. For the author date, there are:
  `%ad`, `%aD`, `%ar`, `%at`, `%ai`, `%aI` and `%as`. For the
  committer date, there are the corresponding `%cd`, `%cD`, `%cr`,
  `%ct`, `%ci`, `%cI` and `%cs` ones. Each pair of these placeholders uses
  a different date format. For example, `%aI` and `%cI` use the "strict
  ISO 8601 format".

  Formats `%ad` and `%cd`, though, are special as they use the format specified
  by the `--date=<format>` command line flag, so for example with
  `--date=iso-strict`, `%ad` and `%cd` will behave in the same way as
  `%aI` and `%cI`.

  ZheNing's patch added the new `%ah` and `%ch` placeholders that
  would behave in the same way as `%ad` and `%cd` with
  `--date=human`. The rationale for the patch being that there are
  placeholders corresponding to most of the `--date=<format>` options
  except `--date=human`.

  Taylor Blau was the first to review ZheNing's patch and found it
  "pretty good", as it was similar to a previous patch by René Scharfe
  that added the `%as` and `%cs` placeholders for dates in the "short
  date format". ZheNing acknowledged that he indeed learned from
  René's patch.

  Philip Oakley, though, commented on the documentation part of the
  patch suggesting to add an example similar to `YYYY-MM-DD` for the
  short format. ZheNing replied that in the "human format" a date
  could take many forms, so he said he would rather add links to the
  documentation of the "human format".

  ZheNing then sent a
  [version 2](https://lore.kernel.org/git/pull.939.v2.git.1619275340051.gitgitgadget@gmail.com/)
  of his patch where he had added the links. Philip suggested further
  small superficial changes to the link and the related text added in
  this version though.

  Meanwhile Ævar Arnfjörð Bjarmason sent
  [a small patch series](https://lore.kernel.org/git/cover-0.2-00000000000-20210425T090506Z-avarab@gmail.com/)
  that made a "couple of trivial changes" to the tests related to
  `%aI` and `%cI`, and at the same time suggested ZheNing to make
  similar changes to the tests in his patch.

  ZheNing then sent a
  [version 3](https://lore.kernel.org/git/pull.939.v3.git.1619347306291.gitgitgadget@gmail.com/)
  of his patch, taking Philip's and Ævar's suggestions into account.
  This patch contained a typo, though, so ZheNing sent a
  [version 4](https://lore.kernel.org/git/pull.939.v4.git.1620056221874.gitgitgadget@gmail.com/)
  of his patch.

  As the version 3 of the patch had already been merged to the "next"
  branch before ZheNing sent the version 4, the typo got noticed by
  Martin Ågren who sent
  [a small patch series](https://lore.kernel.org/git/cover.1620551314.git.martin.agren@gmail.com/)
  fixing this typo as well as another unrelated one.

  Eventually both ZheNing's patch and Martin's patches were merged
  into the "master" branch, so that their improvements will appear in
  the soon upcoming Git version v2.32.0.

<!---
### Support
-->

## Developer Spotlight: Patrick Steinhardt

* Who are you and what do you do?

  I'm a software developer working at GitLab, more specifically in the
  team working on Gitaly. Gitaly is our RPC interface to all Git
  repositories, so it is the backbone to all things Git at GitLab.

  In my own free time, I love to tinker with my Gentoo-based systems and
  tailor them to my own needs, which results in occasional drive-by
  patches to all kinds of open source projects to scratch my own itches.

* What would you name your most important contribution to Git?

  To me, this is the introduction of the reference-transaction hook, which
  gets executed whenever a reference is about to be updated. This allows
  tight control over all reference updates happening in a given repository
  in a command-agnostic way. At GitLab, we use this hook to coordinate
  reference updates across multiple replicas of the same repository such
  that we can be sure that all nodes have the same state and move to the
  same state.

  My most important contributions I'd not locate in the Git project itself
  though, but instead in libgit2. While I unfortunately haven't found the
  time to contribute to it lately, I've done a lot more work on libgit2
  than I did on Git. And there it's probably the initial introduction of
  support for worktrees, maintenance of the CMake build system and work on
  the gitconfig subsystem.

* What are you doing on the Git project these days, and why?

  My current work is mostly focussed on tuning performance of some areas
  we have found to be slow for gitlab.com. This has motivated the recent
  introduction of a new `git-rev-list(1)` filter which allows to filter by
  object type via `--filter=object:type=<type>`. This makes it easy to
  find for example all blobs introduced between two revisions.

  And right now I'm trying to devise a new implementation of the object
  connectivity check performed by `git-receive-pack(1)` whenever a push gets
  accepted on the server side. Depending on the repository's shape, the
  current implementation can be a major bottleneck and take dozens of
  seconds to compute even for small pushes. You may have noticed this
  check when it says "Checking connectivity" on a push.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  I'm obviously biased coming from the libgit2 project, but I'd really
  love to further push the libification of Git. There has been great
  progress on this front already to make internal C interfaces look more
  like the typical interfaces you'd see from a linkable library. But my
  dream would be to merge the efforts of Git and libgit2 such that Git
  also provides an official library which can be linked against in your
  own program.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  Tough question. There's many user-facing commands which could benefit
  from a more consistent design, but my take is that these probably could
  provide an improved user interface while still retaining backwards
  compatibility.

  But what I'd really love to get rid of is the file-based reference
  backend. It works reasonably well to represent references as file paths
  in smallish repositories, but even there it imposes limitations which
  are only a result of its implementation. It's also inefficient for
  bigger repositories and does not really allow for atomic modification of
  multiple references at once. There luckily is ongoing work on the
  reftable backend, which fixes many of the shortcomings, but it will
  likely still take some time to land.

* What is your favorite Git-related tool/library, outside of Git itself?

  I guess the answer to that question is going to be obvious by now:
  libgit2.


## Releases

+ Git [2.32.0-rc1](https://public-inbox.org/git/xmqqk0nqq266.fsf@gitster.g/),
[2.32.0-rc0](https://public-inbox.org/git/xmqqh7j13kmc.fsf@gitster.g/)
+ Git for Windows [2.32.0-rc1(1)](https://github.com/git-for-windows/git/releases/tag/v2.32.0-rc1.windows.1),
[2.32.0-rc0(1)](https://github.com/git-for-windows/git/releases/tag/v2.32.0-rc0.windows.1)
+ GitLab [13.12](https://about.gitlab.com/releases/2021/05/22/gitlab-13-12-released/),
[13.11.4](https://about.gitlab.com/releases/2021/05/14/gitlab-13-11-4-released/),
[13.11.3](https://about.gitlab.com/releases/2021/04/30/gitlab-13-11-3-released/),
[13.11.2, 13.10.4, and 13.9.7](https://about.gitlab.com/releases/2021/04/28/security-release-gitlab-13-11-2-released/)
+ Bitbucket Server [7.13](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ Gerrit Code Review [3.4.0](https://www.gerritcodereview.com/3.4.html),
[3.3.4](https://www.gerritcodereview.com/3.3.html#334),
[3.2.10](https://www.gerritcodereview.com/3.2.html#3210),
[3.1.15](https://www.gerritcodereview.com/3.1.html#3115),
[3.2.9](https://www.gerritcodereview.com/3.2.html#329),
[3.1.14](https://www.gerritcodereview.com/3.1.html#3114)
+ GitHub Enterprise [3.0.7](https://help.github.com/enterprise-server@3.0/admin/release-notes#3.0.7),
[2.22.13](https://help.github.com/enterprise-server@2.22/admin/release-notes#2.22.13),
[2.21.21](https://help.github.com/enterprise-server@2.21/admin/release-notes#2.21.21),
[3.1.0](https://help.github.com/enterprise-server@3.1/admin/release-notes#3.1.0),
[3.0.6](https://help.github.com/enterprise-server@3.0/admin/release-notes#3.0.6),
[2.22.12](https://help.github.com/enterprise-server@2.22/admin/release-notes#2.22.12),
[2.21.20](https://help.github.com/enterprise-server@2.21/admin/release-notes#2.21.20)
+ Magit [3.0.0](https://emacsair.me/2021/05/25/magit-3.0)
+ Forge [0.2.0](https://emacsair.me/2021/05/25/forge-0.2)
+ GitKraken [7.6.1](https://support.gitkraken.com/release-notes/current),
[7.6.0](https://support.gitkraken.com/release-notes/current)
+ GitHub Desktop [2.8.1](https://desktop.github.com/release-notes/),
[2.8.0](https://desktop.github.com/release-notes/)

## Other News

__Various__

* Linus Torvalds was [interviewed](https://www.tag1consulting.com/blog/interview-linus-torvalds-linux-and-git)
  on the Tag1 Consulting site about 30 Years Of Linux and
  [about Git](https://www.tag1consulting.com/blog/interview-linus-torvalds-linux-and-git#git-distributed-version-control-).
  A [part 2](https://www.tag1consulting.com/blog/interview-linus-torvalds-open-source-and-beyond-part-2)
  of the interview not related to Git has also been published.
* GitHub announced that [security keys are now supported for SSH Git operations](https://github.blog/2021-05-10-security-keys-supported-ssh-git-operations/) via `ecdsa-sk` and `ed25519-sk` key types.


__Light reading__

* [Scaling monorepo maintenance](https://github.blog/2021-04-29-scaling-monorepo-maintenance/)
  by Taylor Blau on GitHub Blog, with reverse indexes, multi-pack bitmaps, and geometric repacking.
* [Developing a script in small steps](https://dev.to/vkroll/common-misconception-of-beginners-51jb)
  by Volker Kroll on Dev.to.
* [Plotting the source code "TODO" history of the most popular open source projects](https://schleiss.io/plotting-source-code-todos-for-open-source-projects)
  by Martin Schleiss.
* [Git Push to Remote Branch - How to Push a Local Branch to Origin](https://www.freecodecamp.org/news/git-push-to-remote-branch-how-to-push-a-local-branch-to-origin/)
  by John Mosesman on freeCodeCamp.org.
* [Heroku-style deployments with Docker and Git tags](https://ricardoanderegg.com/posts/git-push-deployments-docker-tags/)
  (and `post-receive` hook) by Ricardo Ander-Egg Aguilar.
* [YubiKey for SSH, Login, 2FA, GPG and Git Signing](https://ocramius.github.io/blog/yubikey-for-ssh-gpg-git-and-local-login/) by Marco Pivetta (Ocramius).
* [Diff and merge CSV files in your Git client](https://paulfitz.github.io/2014/07/09/diff-merge-csv.html)
  using [daff](http://paulfitz.github.io/daff/) by Paul Fitz (2014).
* [Visual Studio code editor: Eight tips for using GitLab VS Code](https://about.gitlab.com/blog/2021/05/20/vscode-workflows-for-working-with-gitlab/)
  extension by Tomas Vik on GitLab Blog.
* [Top Ten Git Tips & Tricks](https://www.honeybadger.io/blog/git-tricks/)
  by Julie Kent on Honeybadger blog.


__Git tools and sites__

* [Komit](https://github.com/GitSquared/komit) is a Node.js based small command line
  application providing interactive prompt, designed to be run as a Git hook to
  help follow the [Conventional Commit message standard](https://www.conventionalcommits.org/en/v1.0.0/).
  This standard was mentioned in [Git Rev News Edition #52][rn-52] and [#54][rn-54];
  another tool that helps follow this standard is [Sailr](https://github.com/craicoverflow/sailr)
  (also mentioned in [edition #52][rn-52]).
* [Flat Data](https://octo.github.com/projects/flat-data) explores how to make
  it easy to work with data in Git and GitHub. The Flat Data project
  incorporates three different pieces: the Flat Action (GitHub Action), the Flat Editor
  VS Code extension, and the Flat Viewer website.
* [git-split-diffs](https://github.com/banga/git-split-diffs), a Node.js
  command-line application, provides side-by-side split diffs with syntax
  highlighting in your terminal, and can be used via `core.pager` or `pager.diff`.
* [daff: data diff](http://paulfitz.github.io/daff/) is a library and a tool for
  comparing tables, producing a summary of their differences, and using such a
  summary as a patch file. It is optimized for comparing tables that share a
  common origin, in other words multiple versions of the "same" table. With daff,
  you can also make Git diffs and merges table-aware.
* [github-csv-diff](https://github.com/wy-z/github-csv-diff) and
  [CSVHub](https://github.com/Data-Liberation-Front/csvhub) are both
  Chrome extensions to show CSV diffs on GitHub.
* [Semgrep](https://semgrep.dev/) is a fast, Open Source, static analysis tool
  for finding bugs and enforcing code standards at editor, commit, or CI time;
  rules look like the code you’re searching.


[rn-52]: https://git.github.io/rev_news/2019/06/28/edition-52/
[rn-54]: https://git.github.io/rev_news/2019/08/21/edition-54/

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Patrick Steinhardt, Andrew Ardill,
Felipe Contreras and Jonas Bernoulli.
