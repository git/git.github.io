---
title: Git Rev News Edition 57 (November 20th, 2019)
layout: default
date: 2019-11-20 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 57 (November 20th, 2019)

Welcome to the 57th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of October 2019.

## Discussions

### General

* [RFC: Moving git-gui development to GitHub](https://public-inbox.org/git/20191023201310.thzpxyoeb3ta55dc@yadavpratyush.com/t/#u)

  Pratyush Yadav, a new maintainer for git-gui, asked about whether it
  is a better idea to use GitHub for development instead of email
  (after [discussion with Dscho](public-inbox.org/git/nycvar.QRO.7.76.6.1910061054470.46@tvgsbejvaqbjf.bet/)),
  stating arguments in favor and against of moving to GitHub.  There
  were some voices for the idea, and some against, describing
  additional advantages and disadvantages.  One idea was to use
  GitHub Issues as a centralized issue / bug tracker
  regardless of where development would take place, which
  [Yadav did](https://github.com/prati0100/git-gui/issues).

  An interesting vote against the idea was that of Elijah Newren, who wrote
  that he had been pondering asking the opposite question for
  [filter-repo](https://github.com/newren/git-filter-repo/), i.e.
  moving its development to git mailing list.


### Reviews

* [[PATCH 0/9] [RFC] New sparse-checkout builtin and "cone" mode](https://public-inbox.org/git/6b461ad3-164d-46ff-4a68-99f8e6562a72@gmail.com)

  Last August, Derrick Stolee, who prefers to be called just "Stolee",
  sent to the mailing list an RFC patch series to "make the
  sparse-checkout more user-friendly" and to increase performance in
  very large repositories.

  The patch series achieves that by introducing a new
  `git sparse-checkout` command with 4 subcommands: `init`, `add`, `list`
  and `disable`. The series also introduces the `--sparse` option to
  `git clone`.

  This helps users manipulate how a sparse-checkout is performed
  compared to [the current way](https://git-scm.com/docs/git-read-tree#_sparse_checkout).

  The performance boost is achieved through a new mode called "cone
  mode" where all the patterns in the sparse-checkout file are "based
  on prefix matches at a directory level". In this mode it can be
  faster to match the patterns to the files and directories that
  should or should not be checked out, because a hashset (a set
  implemented using a hash table) can be used.

  Elijah Newren reviewed Stolee's patches. As Stolee had mentioned
  that some people have created
  [their own helper tools](http://www.marcoyuen.com/articles/2016/06/07/git-sparse.html),
  Elijah first revealed that he also created a "sparsify" script
  specific to his company's internal repository.

  Elijah then was concerned about how the feature worked along with
  [worktrees](https://git-scm.com/docs/git-worktree) and how the `add`
  subcommand and the cone mode worked. He suggested that the
  `core.sparseCheckout` config option could be tri-state to make it
  explicit how the sparse-checkout file should be parsed.

  Eric Sunshine also chimed into the discussion.

  Stolee replied to Elijah that he hadn't considered worktrees and was
  going to take a look at them. He accepted the suggestions about how
  `add` should work and about making `core.sparseCheckout` a tri-state
  and then sent a
  [V2 version of the patch series](https://public-inbox.org/git/pull.316.v2.git.gitgitgadget@gmail.com/)
  with those changes and a few other improvements.

  The `add` subcommand was also replaced with a `set`
  subcommand, and the tri-state was actually implemented by adding a
  new `core.sparseCheckoutCone` config option.

  The discussion continued between Stolee and Elijah, mostly about the
  documentation and commit messages. Then Stolee sent a
  [V3 version of the patch series](https://public-inbox.org/git/pull.316.v3.git.gitgitgadget@gmail.com/)
  with small bug fixes and various improvements, especially in the
  documentation and commit messages according to Elijah's suggestions.

  After another round of review from Elijah, Stolee sent a
  [V4 version of the patch series](https://public-inbox.org/git/pull.316.v4.git.1571147764.gitgitgadget@gmail.com/)
  with only a few small changes.

  Then Gábor Szeder commented on few bugs and small things he had
  found; Jon Simons and Elijah also made a few comments. So Stolee sent a
  [V5 version of the patch series](https://public-inbox.org/git/pull.316.v5.git.1571666186.gitgitgadget@gmail.com/)
  on October 21st addressing the comments.

  Phillip Wood, Stolee and Junio Hamano then discussed another small
  issue. It seems though that the patch series will be merged into the
  next branch soon.

<!---
### Support
-->

## Developer Spotlight: Phillip Wood

* Who are you and what do you do?

  I'm a physicist by training, unfortunately I had to stop working
  some years ago due to a chronic health condition. Since then I've
  spent some time coding and I got into contributing to Git after
  using it on another open source project.

* What would you name your most important contribution to Git?

  That's hard to say. Personally it was getting `rebase -i` to create
  commits without forking `git commit`. I think it was my first big
  contribution, it gave a noticeable performance improvement and
  meant learning the API around commit creation as well as getting to
  grips with the sequencer code that drives cherry-picks and
  interactive rebases.

* What are you doing on the Git project these days, and why?

  I'm still mostly working around the code in the
  sequencer. Interactive rebases are one of the features I like best
  about Git. Being able to rewrite commits in order to polish a
  feature before merging it or posting patches helps make it easier to
  understand and review. I've also contributed to `add -p` and
  `diff --color-moved-ws` as I find those really useful as well.

  I also try to spend some time reviewing patches in the areas I'm
  interested in. One of the great things about contributing to Git is
  the reviews one receives when posting patches, they're always
  friendly and constructive and I try to do the same for others. It's
  also interesting to see what problems other people who use Git are
  facing and how they're solving them.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  Gosh that would be fantastic. I'd probably concentrate on the
  UI. Firstly I'm interested in being able to amend commits more
  easily by providing a simpler interface to `rebase -i` that does not
  involve editing a todo file. I'm currently working on a script that
  lets you amend the commit that created the current line directly
  from an editor and lets you walk backwards and forwards through
  history rewriting it as you go. Being able to say "amend the commit
  responsible for this line" with a single key stroke is really
  convenient.

  There are a number of other UI related projects I'm interested in. I
  use diff-highlight but wish it would work on hunks with different
  numbers of additions and deletions. Adapting it to diff the diff in
  order to highlight the changes would be useful but would need some
  careful heuristics to distinguish between when highlighting the
  changes is useful and when it is just confusing. Another diff
  improvement I'd like to see is implementing `--color=porcelain` for
  `git diff` that would allow apps like `tig` and `magit` to show
  moved lines.

  I'd also like to improve `git push` and `git pull` to extend the idea of
  `--force-with-lease` to support synchronizing between a laptop,
  desktop and remote server by allowing forced updates of the local
  branch when it has not changed since it was last pushed and improve
  `push --force-with-lease` to default to using the hash of the last
  pushed commit.

  If there's still some time left then working on the documentation to
  make it more approachable for new users would be great. At the
  moment the man pages detail the individual commands but there's not
  much documentation introducing high level concepts and ideas. There
  are some other things such as adding a `--reword` option to `commit`
  and improving `add -p` to allow the selection of groups of lines but
  that's probably enough for now.

* If you could remove something from Git without worrying backwards
  compatibility, what would it be?

  Personally I'd like to change the way ignored files are handled so
  that Git never overwrites them (we could add a new category for
  files that are expendable). The relative priority of `.gitignore`
  and `.git/info/excludes` could also be tweaked.

  Standardizing option names across the commands would also help users
  I think.

* What is your favorite Git-related tool/library, outside of Git itself?

  I use `tig` for inspecting history with `log` and `blame`. I also
  use [Public Inbox](https://public-inbox.org/git) a lot for searching
  the mailing list.

## Releases

+ Git [2.24.0](https://public-inbox.org/git/xmqq7e4gyzgt.fsf@gitster-ct.c.googlers.com/),
[2.24.0-rc2](https://public-inbox.org/git/xmqqblty3dtx.fsf@gitster-ct.c.googlers.com/),
[2.24.0-rc1](https://public-inbox.org/git/xmqqeez2fzsy.fsf@gitster-ct.c.googlers.com/)
+ Git for Windows [2.24.0(2)](https://github.com/git-for-windows/git/releases/tag/v2.24.0.windows.2),
[2.24.0(1)](https://github.com/git-for-windows/git/releases/tag/v2.24.0.windows.1)
+ GitLab [12.4.2](https://about.gitlab.com/blog/2019/11/04/gitlab-12-4-2-released/),
[12.4.1](https://about.gitlab.com/blog/2019/10/30/security-release-gitlab-12-dot-4-dot-1-released/)
+ Bitbucket Server [6.8](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ Gerrit Code Review [3.1.0](https://www.gerritcodereview.com/3.1.html),
[3.0.4](https://www.gerritcodereview.com/3.0.html#304),
[2.16.13](https://www.gerritcodereview.com/2.16.html#21613),
[2.15.18](https://www.gerritcodereview.com/2.15.html#21518)
+ GitHub Enterprise [2.19.1](https://enterprise.github.com/releases/2.19.1/notes),
[2.19.0](https://enterprise.github.com/releases/2.19.0/notes),
[2.18.6](https://enterprise.github.com/releases/2.18.6/notes),
[2.17.12](https://enterprise.github.com/releases/2.17.12/notes),
[2.16.21](https://enterprise.github.com/releases/2.16.21/notes),
[2.18.5](https://enterprise.github.com/releases/2.18.5/notes),
[2.17.11](https://enterprise.github.com/releases/2.17.11/notes),
[2.16.20](https://enterprise.github.com/releases/2.16.20/notes)
+ TortoiseGit [2.9.0](https://tortoisegit.org/download/)
+ GitKraken [6.3.1](https://support.gitkraken.com/release-notes/current)
+ GitHub Desktop [2.2.3](https://desktop.github.com/release-notes/),
[2.2.2](https://desktop.github.com/release-notes/)

## Other News

__Various__

* Welcome to Kaartic Sivaraam to the Git Rev News edition team! And
  thanks to Gabriel Alcaras, who leaves the team after contributing to
  the interviews and as the author of the script that scrapes some
  websites to help prepare the "Releases" section.

* Emily Shaffer [announced](https://public-inbox.org/git/20191114194708.GD60198@google.com/)
  the new [git-mentoring@googlegroups.com mailing list](https://groups.google.com/forum/#!forum/git-mentoring) as "a great place
  for those who are new to Git and interested in learning how to
  contribute to ask questions and expect kind, thorough answers out of
  the spotlight of the main Git mailing list".

* GitHub announced [GitHub Archive Program](https://archiveprogram.github.com/),
  intended to preserve open source software for future generations
  in partership with Long Now Foundation, the Internet Archive,
  the Software Heritage Foundation, Arctic World Archive, Microsoft Research,
  the Bodleian Library, and Stanford Libraries.  On **February 2, 2020**,
  GitHub will capture a snapshot of every active public repository,
  to be preserved in the [GitHub Arctic Code Vault](https://archiveprogram.github.com/#arctic-code-vault).
  This data will be stored on 3,500-foot film reels.

* It [looks like](https://public-inbox.org/git/CAP8UFD0WXrG=XbZj9fyo1v0zy8p7yNnGZGVH8bHDqPOLThGD-w@mail.gmail.com/t/#u)
  the [Git Merge](https://git-merge.com/) 2020 conference
  will be in Los Angeles on March 4 2020.


__Light reading__

* [Highlights from Git 2.24](https://github.blog/2019-11-03-highlights-from-git-2-24/)
  on GitHub Blog by Taylor Blau: feature macros, commit graph by default,
  adopting the Contributor Covenant (see [previous Git Rev News](https://git.github.io/rev_news/2019/10/26/edition-56/)),
  recommending new history-rewriting tool: [git-filter-repo](https://github.com/newren/git-filter-repo/)
  (more about which can be found in [Git Rev News #54](https://git.github.io/rev_news/2019/08/21/edition-54/)),
  and other.

* [Updates to the Git Commit Graph Feature](https://devblogs.microsoft.com/devops/updates-to-the-git-commit-graph-feature/) by Derrick Stolee
  describes new commit-graph related changes in Git version 2.24.0:
  new faster algorithm for topological sorting (e.g. for `git log --graph`),
  namely an iterative version of Kahn’s algorithm (making use of generation numbers),
  incremental commit-graph format with adaptive merging,
  new `fetch.writeCommitGraph` setting to update commit-graph after every `git fetch`,
  and having `core.commitGraph` and `gc.writeCommitGraph` on by default.
  See also [this Twitter thread](https://twitter.com/stolee/status/1194242763413438465).

  Previous blog posts in the series about commit-graph were linked to
  in [Git Rev News Edition #41](https://git.github.io/rev_news/2018/07/18/edition-41/), [#45](https://git.github.io/rev_news/2018/11/21/edition-45/) and [#51](https://git.github.io/rev_news/2019/05/22/edition-51/).
  Developing incremental commit-graph was covered in detail in
  [Git Rev News Edition #52](https://git.github.io/rev_news/2019/06/28/edition-52/).
  At the time of writing link to mentioned article was not yet posted
  to [Derrick Stolee developer homepage](https://stolee.dev/).

* [[LWN.net] Next steps for kernel workflow improvement](https://lwn.net/Articles/803619/)
  by Jonathan Corbet: fix attestation with minisig, add base-tree information,
  and going beyond email.

* [[LWN.net] Analyzing kernel email](https://lwn.net/Articles/804511/)
  by Jake Edge, about research which goal is "formalizing and assessing
  the Linux kernel development process".

* [I posted my password / API key on GitHub.  Now what?](https://flaviocopes.com/git-secrets/)
  by Flavio Copes.  There are various tools to detect such situation,
  and/or to safely store secrets in Git repository; some links
  can be found for example in [Git Rev News #39](https://git.github.io/rev_news/2018/05/16/edition-39/).

* [Three Simple Rules for Putting Secrets into Git](https://engineering.udacity.com/three-simple-rules-for-putting-secrets-into-git-d47b207852b9)
  by Jesse Swidler (2018), author of [LockGit](https://github.com/jswidler/lockgit).

* "Stupid git commit-tree tricks" series of blog posts by Raymond Chen, starting with
  [Part 1: Building a commit manually out of a tree](https://devblogs.microsoft.com/oldnewthing/20190506-00/?p=102478).

* [My favourite Git commit](https://fatbusinessman.com/2019/my-favourite-git-commit)
  by David Thompson.

* [How to write a kickass README](https://dev.to/scottydocs/how-to-write-a-kickass-readme-5af9)
  by James.Scott (@scottydocs).

* [What nobody tells you about documentation](https://www.divio.com/blog/documentation/),
  namely that it needs to include and be structured around its four different functions:
  _tutorials_, _how-to guides_, _explanation_ and _technical reference_,
  each of which requires a distinct mode of writing.


__Git tools and sites__

* [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)
  extension for Visual Studio Code -- view a commit graph of your repository,
  and easily perform Git actions from the graph.
* [git-subtrac](https://github.com/apenwarr/git-subtrac) is a helper tool
  that makes it easier to keep track of your git submodule contents.
  It collects the entire contents of the entire history of all your submodules
  (recursively) into a separate git branch, which can be pushed, pulled,
  forked, and merged however you want.
  [Announced as a sequel to git-subtree](https://public-inbox.org/git/CAHqTa-15fKjH-3Z-vHhgNpfx6c1OQXbDXwKJHT9JX6G+7tjGBA@mail.gmail.com/T/#u)
  by Avery Pennarun, creator of git-subtree.
* [myrepos](https://myrepos.branchable.com/) is a tool to manage
  all your version control repositories, for example
  to update them all at once, or push out all your local changes
  (similar to [git-repo](https://gerrit.googlesource.com/git-repo/)
  or [gitslave](http://gitslave.sourceforge.net/) tools).
* [LockGit](https://github.com/jswidler/lockgit) is a CLI tool
  for storing encrypted secrets in a git repo.
* [Onefetch](https://github.com/o2sh/onefetch) is a command line tool
  that displays summary information about your Git repository
  directly on your terminal.
* [USA-Constitution](https://github.com/JesseKPhillips/USA-Constitution)
  repository, with a history of edits to the US Constitution
  as it has been amended.  Written in Markdown to match original formatting.
* [Gitter](https://gitter.im/) is an open-source instant messaging
  and chat room system for developers and users of GitHub repositories,
  similar to Slack.  Gitter is provided as software-as-a-service.
* [.gitignore Generator](https://marketplace.visualstudio.com/items?itemName=piotrpalarz.vscode-gitignore-generator)
  extension for Visual Studio Code -  easily and quickly generate .gitignore
  file for your project. It uses the [gitignore.io](https://gitignore.io/) API.

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Phillip Wood and Andrew Ardill.
