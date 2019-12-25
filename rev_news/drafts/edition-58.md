---
title: Git Rev News Edition 58 (December 25th, 2019)
layout: default
date: 2019-12-25 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 58 (December 25th, 2019)

Welcome to the 58th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of November 2019.

## Discussions


### General

* Two [Outreachy interns](https://www.outreachy.org/alums/) have been accepted to work on Git this winter

  * Heba W. from New Zealand will be mentored by Emily Shaffer and
    Jonathan Tan to work on the '*Add "Did you mean?" hints*'
    project. Heba started [blogging about her
    internship](https://medium.com/@heba.waly).

  * Miriam Rubio from Barcelona, Spain will be mentored by Christian
    Couder to work on the '*Finish converting "git bisect" from shell to
    C*' project. Miriam also started [blogging about her internship](https://mirucam.gitlab.io/outreachy_blog/).


### Reviews

* [[RFC] xl command for visualizing recent history](https://public-inbox.org/git/20191029003023.122196-1-matvore@google.com/)

  Matthew DeVore sent an RFC patch implementing a `git xl` command
  that would show "a graph of recent history, including all existing
  branches (unless flagged with a config option) and their upstream
  counterparts".

  In practice the command would show graph like this one, where the
  XXXXXXXX would be the beginning of a commit hash:

  ```
  XXXXXXXX  *  1   committer@example.com  [HEAD branch3]
            | baz
            |
  XXXXXXXX  | *  2   committer@example.com  [branch2]
            |/  bar
            |
  XXXXXXXX  *  3   committer@example.com
              foo
  ```

  The command would also associate refs with all visible
  commits. These refs would have names in the form of `h/#` where # is
  an incrementing count.

  It would by default show only what has not been pushed upstream yet,
  and the branches with their commits would be shown as a graph.

  Emily Shaffer first replied to Matthew, making suggestions to
  improve the name of the command as well as the commit subject and
  the commit message.

  Johannes Schindelin, alias Dscho, replied to Emily's reply. He
  agreed with her that the name of the command was not a good one and
  suggested instead to make this functionality a mode of an existing
  command, like `git show-branch --unpushed` or `git branch --show-unpushed`.

  About the `h/#` refs, that he called "ephemeral refs", Dscho
  suggested implementing them in a separate patch, using `^<counter>`
  instead of "h/#" for their syntax, and making them only available for
  a "reasonably short time" by default, and then offering a config
  setting to change this time.

  He also suggested implementing an option to show those "ephemeral
  refs" in other commands too.

  Phillip Wood agreed with Dscho about the "ephemeral refs", especially 
  "having them as a feature of the rev listing machinery rather than
  specific to a particular command".
  He also suggested to use `getsid()` rather than `getppid()` to tie them
  to a terminal, and expressed his uncertainty how this should be done
  on Windows and whether a split was also necessary/wanted per worktree.
 
  Dscho also commented on Matthew's initial RFC patch. He suggested
  commit message improvements. He reiterated some of the suggestions
  he made in his reply to Emily, and reviewed the code suggesting many
  changes there too. He wrote though that he loved the main ideas
  proposed by Matthew.

<!---
### Support
-->

<!---
## Developer Spotlight:
-->

## Releases

+ Git [2.24.1 and others](https://public-inbox.org/git/xmqqr21cqcn9.fsf@gitster-ct.c.googlers.com/)
+ Git for Windows [2.24.1(2)](https://github.com/git-for-windows/git/releases/tag/v2.24.1.windows.2)
+ libgit2 [0.28.4](https://github.com/libgit2/libgit2/releases/tag/v0.28.4)
+ libgit2sharp [0.26.2](https://github.com/libgit2/libgit2sharp/releases/tag/v0.26.2)
+ Bitbucket Server [6.9](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ Gerrit Code Review [3.1.2](https://www.gerritcodereview.com/3.1.html#312),
[3.0.6](https://www.gerritcodereview.com/3.0.html#306),
[2.16.15](https://www.gerritcodereview.com/2.16.html#21615),
[3.1.1](https://www.gerritcodereview.com/3.1.html#311),
[3.0.5](https://www.gerritcodereview.com/3.0.html#305),
[2.16.14](https://www.gerritcodereview.com/2.16.html#21614)
+ GitHub Enterprise [2.19.4](https://enterprise.github.com/releases/2.19.4/notes),
[2.18.9](https://enterprise.github.com/releases/2.18.9/notes),
[2.17.15](https://enterprise.github.com/releases/2.17.15/notes),
[2.16.24](https://enterprise.github.com/releases/2.16.24/notes),
[2.19.3](https://enterprise.github.com/releases/2.19.3/notes),
[2.18.8](https://enterprise.github.com/releases/2.18.8/notes),
[2.17.14](https://enterprise.github.com/releases/2.17.14/notes),
[2.16.23](https://enterprise.github.com/releases/2.16.23/notes),
[2.19.2](https://enterprise.github.com/releases/2.19.2/notes),
[2.18.7](https://enterprise.github.com/releases/2.18.7/notes),
[2.17.13](https://enterprise.github.com/releases/2.17.13/notes),
[2.16.22](https://enterprise.github.com/releases/2.16.22/notes)
+ GitLab [12.6](https://about.gitlab.com/blog/2019/12/22/gitlab-12-6-released/),
[12.5.5](https://about.gitlab.com/blog/2019/12/17/gitlab-12-5-5-released/),
[12.0.12, 12.1.17, and 12.2.12](https://about.gitlab.com/blog/2019/12/16/gitlab-12-2-12-release/),
[12.5.4, 12.4.6, and 12.3.9](https://about.gitlab.com/blog/2019/12/10/critical-security-release-gitlab-12-5-4-released/),
[12.5.3](https://about.gitlab.com/blog/2019/12/03/gitlab-12-5-3-released/),
[12.5.1](https://about.gitlab.com/blog/2019/11/27/security-release-gitlab-12-5-1-released/),
[12.5.2](https://about.gitlab.com/blog/2019/11/27/security-release-gitlab-12-5-2-released/),
[12.5](https://about.gitlab.com/blog/2019/11/22/gitlab-12-5-released/),
[12.4.3](https://about.gitlab.com/blog/2019/11/18/gitlab-12-4-3-released/)
+ GitKraken [6.4.1](https://support.gitkraken.com/release-notes/current),
[6.4.0](https://support.gitkraken.com/release-notes/current)
+ GitHub Desktop [2.2.4](https://desktop.github.com/release-notes/)

## Other News

__Various__

* The latest [Git releases](https://lore.kernel.org/git/xmqqr21cqcn9.fsf@gitster-ct.c.googlers.com/) and
  [Git for Windows releases](https://github.com/git-for-windows/git/releases/tag/v2.24.1.windows.2)
  are security releases. They fix a significant number of serious
  security issues. Upgrading to one of these new versions is highly
  recommended.

* The [Git Merge Contributor's Summit](https://lore.kernel.org/git/20191213050038.GA75792@coredump.intra.peff.net/)
  has been announced. It will happen on March 5, 2020, in Los Angeles,
  the day after the [Git Merge](https://git-merge.com/).

__Light reading__

* [What are git objects under the hood](https://blog.alexlai.xyz/what-are-git-objects-under-the-hood/)
  is a blog post about Git objects.

* [Git Repository Transfer Keeping All History](https://itnext.io/git-repository-transfer-keeping-all-history-670fe04cd5e4)
  by Nassos Michas explains "how to replicate your Git repo and keep
  all previous commits, branches, and tags".

__Git tools and sites__

* [GitVine](https://insanesharpness.gitlab.io/GitVine/),
  an application to better visualise git commits has been
  [announced on the mailing list](https://public-inbox.org/git/CAMNO-Ba0-Me67qEEfHoJyBoWg0X_x7=qmmZ1D8ZK9S_0Tk=J5Q@mail.gmail.com/).

* [git-cpcover](https://public-inbox.org/git/20191203201233.661696-1-mst@redhat.com/),
  a script to copy cover letters, has been announced on the mailing list.

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Emily Shaffer, Pratyush Yadav and Phillip Wood.
