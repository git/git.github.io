---
title: Git Rev News Edition 107 (January 31st, 2024)
layout: default
date: 2024-01-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 107 (January 31st, 2024)

Welcome to the 107th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of December 2023 and January 2024.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

### Support

* [Git Rename Detection Bug](https://public-inbox.org/git/LO6P265MB6736043BE8FB607DB671D21EFAAAA@LO6P265MB6736.GBRP265.PROD.OUTLOOK.COM/)

  Jeremy Pridmore reported a bug to the Git mailing list. He used
  [`git bugreport`](https://git-scm.com/docs/git-bugreport), so his
  message looks like a filled out form with questions and answers.

  He was trying to cherry-pick changes from one repo A to another B,
  while both A and B came from the same original TFS server but with
  different set of changes. He was disappointed though because some
  files that had been moved in repo A weren't matched by the rename
  detection mechanism to the original files in repo B, and he wondered
  if the reason for this was the new 'ort' merge strategy described in
  a [blog post by Elijah Newren](https://blog.palantir.com/optimizing-gits-merge-machinery-1-127ceb0ef2a1).

  Elijah replied to Jeremy explaining extensively how rename detection
  works in Git. He said that the new 'ort' merge strategy, which he
  implemented, and which replaced the old 'recursive' strategy, uses
  the same rename detection rules as that old strategy. He suggested
  adding the `-s recursive` option to the cherry-pick command to check
  if it worked differently using the old 'recursive' strategy.

  Elijah mentioned especially that "exact renames" are detected first
  when performing rename detection, and if files have different names
  they are matched randomly as renames.

  Jeremy replied to Elijah saying that he observed a similar
  behavior. He gave examples of some issues he was seeing, and he
  suggested to match files using a "difference value" between the paths
  and filenames of the different files. He also said he wrote a script
  to help him resolve conflicts.

  Elijah replied to Jeremy with further explanations about the fact
  that renames are just a help for developers as they are not
  recorded but computed from scratch in response to user commands. He
  also asked for clarification about some points, and suggested that
  some files Jeremy had issues with had been added in both repos A
  and B, which created conflicts but were not rename issues.
  Similarly, when a file has been removed in both repo A and B, there is
  no rename issue. The file should just be deleted.

  About the idea of matching files using a "difference value" between
  the paths and filenames of the different files, Elijah replied that
  he had tried similar ideas, but found that in practice it could take
  significant time and would not provide much benefit.

  Elijah also discussed the case of having a "base" version with a
  directory named "library-x-1.7/", while a "stable" version has many
  changes in that directory and a "development" branch has removed
  that directory but has added both a "library-x-1.8/" and a
  "library-x-1.9/" directory with many changes compared to
  "library-x-1.7/". This case would be somewhat similar to Jeremy's
  case, and Elijah suggested a hack to workaround rename detection in
  such cases.

  Philip Oakley then chimed into the discussion to suggest using
  "BLOBSAME" for exact renames in the same way as "TREESAME" is used
  in `git log` for history simplification.

  Elijah replied to Philip that he thinks that 'exact rename' already
  works. He then discussed the possible simplifications in the rename
  detection algorithm that can be made when 'exact rename' happens for
  a file or a directory.

  Junio C Hamano, the Git maintainer, then chimed into the discussion
  saying that "TREESAME" is a property of commits, not trees. So he
  suggested using different words than "BLOBSAME" and "TREESAME" in
  the context of rename detection.

  Philip and Elijah discussed terminology again, agreeing that a good
  one could help people coming from an "old centralised VCS" make the
  mind shift to understand Git's model. They didn't find something
  better than 'exact rename' to help in this case though.

  As Elijah used the "spanhash representation" words, Philip asked for
  more information about this way of computing file content
  similarity. As for rename detection, Elijah explained it
  comprehensively and supported with a number of arguments his claim
  that "comparison of filenames can rival cost of file content
  similarity".

<!---
## Developer Spotlight:
-->

## Other News

__Various__


__Light reading__
+ [How Framer Manages Their Codebase with Tower](https://www.git-tower.com/blog/how-framer-uses-tower/) by Bruno Brito on Tower’s blog.
+ [Git Config Settings I Always Recommend](https://dev.to/bpugh/git-config-settings-i-always-recommend-11fa) by Brandon Pugh on DEV.to.
<!---
__Easy watching__
-->

__Git tools and sites__


## Releases

+ GitHub Enterprise [3.11.3](https://help.github.com/enterprise-server@3.11/admin/release-notes#3.11.3),
[3.10.5](https://help.github.com/enterprise-server@3.10/admin/release-notes#3.10.5),
[3.9.8](https://help.github.com/enterprise-server@3.9/admin/release-notes#3.9.8),
[3.8.13](https://help.github.com/enterprise-server@3.8/admin/release-notes#3.8.13)
+ GitLab [16.8.1, 16.7.4, 16.6.6, 16.5.8](https://about.gitlab.com/releases/2024/01/25/critical-security-release-gitlab-16-8-1-released/)
[16.8](https://about.gitlab.com/releases/2024/01/18/gitlab-16-8-released/),
[16.7.3](https://about.gitlab.com/releases/2024/01/12/gitlab-16-7-3-released/),
[16.7.2, 16.6.4, 16.5.6](https://about.gitlab.com/releases/2024/01/11/critical-security-release-gitlab-16-7-2-released/)
+ Bitbucket Server [8.17](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ GitKraken [9.11.1](https://help.gitkraken.com/gitkraken-client/current/)
+ GitHub Desktop [3.3.8](https://desktop.github.com/release-notes/),
[3.3.7](https://desktop.github.com/release-notes/)
+ Tower for Mac [10.3](https://www.git-tower.com/release-notes?show_tab=release-notes)
+ Tower for Windows [5.5](https://www.git-tower.com/release-notes/windows?show_tab=release-notes)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Bruno Brito and Brandon Pugh.
