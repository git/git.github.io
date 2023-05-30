---
title: Git Rev News Edition 99 (May 31st, 2023)
layout: default
date: 2023-05-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 99 (May 31st, 2023)

Welcome to the 99th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of April 2023 and May 2023.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

### Support

+ [Weird behavior of 'git log --before' or 'git log --date-order'](https://lore.kernel.org/git/7728e059-d58d-cce7-c011-fbc16eb22fb9@cs.uni-saarland.de/)

  Thomas Bock reported an issue in
  [a LibreOffice repository](https://github.com/LibreOffice/core)
  where some commits from around 2010 were treated by `git log` as if
  they had been created before 1980.

  Commands like `git log --before="1980-01-01"` or `git log
  --date-order` both show or list some commits with an author date and
  a commit date from around 2010 as if they were from before 1980.

  Thomas looked at the timestamps of the author and committer dates in
  these commits, but they didn't appear to be broken, so he suspected a
  Git bug.

  Peff, alias Jeff King, thanked Thomas "for providing a clear example
  and reproduction recipe", and pointed out that the commits that
  appear to be from before 1980 were "malformed, but only
  slightly". It appeared that their "author" and "committer" headers
  contained something like:

  `Firstname Lastname<firstname.lastname <Firstname Lastname<firstname.lastname@example.com>> 1297247749 +0100`

  instead of simply:

  `Firstname Lastname<firstname.lastname@example.com> 1297247749 +0100`

  so with an extra weird set of angle brackets.

  Peff also found that there were two different code paths for commit
  parsing and they behaved differently when there was an extra set of
  angle brackets. One, which is used to fill in the fields of a
  `struct commit`, only parses the "parents", "tree", and "committer
  timestamp" fields. For that last field, it's using the
  parse_commit_date() function which stops at the first `>` and then
  tries to parse the rest of the line as a timestamp, which fails and
  returns a 0 timestamp if there is a second `>`.

  The other code path, used when the commit is displayed, calls the
  split_ident_line() function to parse the "author" and "committer"
  headers, but this function is trying to find the last '>' in these
  headers instead of the first one, which yields the correct timestamp
  when there are two or more '>'.

  Peff then suggested a patch to make parse_commit_date() behave like
  split_ident_line() and find the last '>' instead of the first
  one. He also discussed other possible ways to fix the issue,
  including doing nothing as the commits are indeed malformed.

  Kristoffer Haugsbakk replied to Peff saying he was using a tool
  called [git repair](https://git-repair.branchable.com) to try to fix
  the original repo. But Peff said he wasn't sure git repair would be
  able to fix it. He mentioned that
  [git filter-repo](https://github.com/newren/git-filter-repo) or other
  tools would be able to fix it, but would require the commit history
  to be rewritten, which might not be "worth it for a minor problem
  like this".

  Kristoffer replied that he gave up with `git repair` as it didn't
  seem to finish, but was actually more interested in seeing if the
  weird `git log` behavior went away to convince others it wasn't a
  bug, rather than fixing the repo.

  Peff suggested carrying on with git-filter-repo's
  `--commit-callback` option, or alternatively piping `git
  fast-export` through sed, and then back to `git fast-import`, as he
  was almost certain `git log` would properly work if the repo was
  fixed.

  A few weeks later Kristoffer sent the URL of a repaired repo. He
  said he couldn't use `git filter-repo`, but "`git commit-tree` +
  `git replace` + `git filter-repo --force` worked".

  In the meantime, Junio Hamano, the Git maintainer, replied to Peff's
  initial findings wondering which commit parsing function was used to
  populate the commit-graph files where commit data is cached, as it
  wouldn't be good to record broken timestamps there.

  Peff replied to Junio saying the commit-graph files are written from
  the parsed "struct commit" objects which is good as we want those
  cache files to always match the code that is used when they are not
  available. If Peff's patch was applied to fix the parsing though,
  that would mean that existing commit-graph files would need to be
  manually removed, so that the fixed parsing could be used instead of
  broken values stored in those files.

  Peff also discussed modifying the commit-graph code so that when a 0
  timestamp is recorded for a commit, this commit is parsed again, but
  thought it might not be worth the effort. Derrick Stolee discussed
  this idea too, but agreed with Peff saying "this seems like quite a
  big hammer for a small case".

  Thomas then thanked everyone for "clarifying this mystery" as the
  explanations given "already helped a lot". He said that it would be
  very useful to fix the parsing of the broken commits, but, if that
  was considered to be too small a problem, he would like some kind of
  error handling to be introduced for commits with 0 timestamps
  instead of them being listed in the wrong time period.

  Peff then sent
  [a first version of a small patch series](https://lore.kernel.org/git/20230422134150.GA3516940@coredump.intra.peff.net/)
  to properly fix the parsing of the broken commits and to fix another
  parsing bug he found in the same parse_commit_date() function.

  Junio reviewed Peff's patches and made a few suggestions, mostly
  about code comments. Peff took them into account and sent
  [a version 2 of his patch series](https://lore.kernel.org/git/20230425055244.GA4014505@coredump.intra.peff.net/)
  which behaved in the same way as the previous one, but had improved
  code comments.

  Phillip Wood then wondered if it would be better to not use
  strtoumax(3) to parse timestamps as this standard C library function
  is using the standard isspace(3) while we are using our own version
  of isspace(3) which is different. Possible issues with strtoumax(3)
  could also be related to different characters being considered
  digits than in our code. This kind of issues come from the fact that
  strtoumax(3), like many other standard C library function is taking
  the current
  [locale](https://en.wikipedia.org/wiki/Locale_(computer_software))
  into account.

  After some discussions between Peff, Phillip and Junio, Peff sent
  [a version 3 of his patch series](https://lore.kernel.org/git/20230427081330.GA1461786@coredump.intra.peff.net/)
  with small changes. Especially the new version makes sure we reject
  timestamps that start with a character that we don't consider a
  whitespace or a digit or the `-` character before using strtoumax(3)
  as this was considered enough to avoid issues related to this
  function.

  Phillip, Junio and Peff discussed this version a little bit more but
  found it good, so it was merged and these changes will be in Git
  v2.41.0 which will be released soon.

<!---
## Developer Spotlight:
-->

## Releases

+ Git [2.41.0-rc2](https://public-inbox.org/git/xmqqedn5fluv.fsf@gitster.g/),
[2.41.0-rc1](https://public-inbox.org/git/xmqqedncqkzf.fsf@gitster.g/),
[2.41.0-rc0](https://public-inbox.org/git/xmqqbkilvt63.fsf@gitster.g/)
+ Git for Windows [2.41.0-rc2(1)](https://github.com/git-for-windows/git/releases/tag/v2.41.0-rc2.windows.1),
[2.41.0-rc1(1)](https://github.com/git-for-windows/git/releases/tag/v2.41.0-rc1.windows.1),
[2.41.0-rc0(1)](https://github.com/git-for-windows/git/releases/tag/v2.41.0-rc0.windows.1)
+ Bitbucket Server [8.10](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ Gerrit Code Review [3.5.6](https://www.gerritcodereview.com/3.5.html#356),
[3.6.5](https://www.gerritcodereview.com/3.6.html#365),
[3.7.3](https://www.gerritcodereview.com/3.7.html#373),
[3.8.0](https://www.gerritcodereview.com/3.8.html#380)
+ GitHub Enterprise [3.8.3](https://help.github.com/enterprise-server@3.8/admin/release-notes#3.8.3),
[3.7.10](https://help.github.com/enterprise-server@3.7/admin/release-notes#3.7.10),
[3.6.13](https://help.github.com/enterprise-server@3.6/admin/release-notes#3.6.13),
[3.5.17](https://help.github.com/enterprise-server@3.5/admin/release-notes#3.5.17)
+ GitLab [15.11.6](https://about.gitlab.com/releases/2023/05/24/gitlab-15-11-6-released/)
[16.0.1](https://about.gitlab.com/releases/2023/05/23/critical-security-release-gitlab-16-0-1-released/),
[16.0](https://about.gitlab.com/releases/2023/05/22/gitlab-16-0-released/),
[15.11.5](https://about.gitlab.com/releases/2023/05/19/gitlab-15-11-5-released/),
[15.11.4](https://about.gitlab.com/releases/2023/05/17/gitlab-15-11-4-released/),
[15.11.3, 15.10.7, 15.9.8](https://about.gitlab.com/releases/2023/05/10/security-release-gitlab-15-11-3-released/),
[15.11.2, 15.10.6, and 15.9.7](https://about.gitlab.com/releases/2023/05/05/critical-security-release-gitlab-15-11-2-released/),
[15.11.1, 15.10.5, and 15.9.6](https://about.gitlab.com/releases/2023/05/02/security-release-gitlab-15-11-1-released/)
+ GitKraken [9.4.0](https://help.gitkraken.com/gitkraken-client/current/)
+ GitHub Desktop [3.2.3](https://desktop.github.com/release-notes/)
+ Sourcetree [4.2.3](https://product-downloads.atlassian.com/software/sourcetree/ReleaseNotes/Sourcetree_4.2.3.html)
+ Tower for Mac [9.3, 9.4](https://www.git-tower.com/release-notes/mac?show_tab=release-notes) ([9.4 blog post](https://www.git-tower.com/blog/tower-mac-94/))
+ git-credential-oauth [0.7.0](https://github.com/hickford/git-credential-oauth/releases/tag/v0.7.0)

## Other News

__Various__


__Light reading__

<!---
__Easy watching__
-->

__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Bruno Brito.
