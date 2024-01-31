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
+ GitHub has [Copilot](https://github.com/features/copilot),
  GitLab has [Duo Code Suggestions](https://about.gitlab.com/solutions/code-suggestions/);
  now Bitbucket has [integration with Tabnine](https://marketplace.atlassian.com/apps/1227931/tabnine-teams-for-bitbucket-cloud):
  [Accelerate your development process with Tabnine AI and Bitbucket](https://community.atlassian.com/t5/Bitbucket-articles/Accelerate-your-development-process-with-Tabnine-AI-and/ba-p/2576062).


__Light reading__
+ [I Taught GIT to High School Students: My Experience as Linux Day Mentor](https://blog.coluzziandrea.com/git-00-linux-day)
  by Coluzzi Andrea on his blog (and also [on DEV\.to](https://dev.to/coluzziandrea/i-taught-git-to-high-school-students-3a16)).
+ [How Framer Manages Their Codebase with Tower](https://www.git-tower.com/blog/how-framer-uses-tower/)
  by Bruno Brito on Tower’s blog.
+ Julia Evans continues her series articles about Git with
  [Do we think of git commits as diffs, snapshots, and/or histories?](https://jvns.ca/blog/2024/01/05/do-we-think-of-git-commits-as-diffs--snapshots--or-histories/)
  and [Inside .git](https://jvns.ca/blog/2024/01/26/inside-git/)
  (the latter both as comic and a text version).
+ [Minimal contents of a .git folder](https://manuel-strehl.de/minimal_git_folder)
  by Manuel Strehl on A Peculiar Zoo of Thoughts blog.
+ [Git Config Settings I Always Recommend](https://dev.to/bpugh/git-config-settings-i-always-recommend-11fa)
  by Brandon Pugh on DEV\.to (and also [on his blog](https://www.brandonpugh.com/blog/git-config-settings-i-always-recommend/));
  though setting `pull.rebase` to `true` depends on whether project prefers merges or rebases,
  and is very project-dependent.
+ [Git Lesson: How to Use .gitignore and .gitkeep?](https://dev.to/ritaly/git-lesson-how-to-use-gitignore-and-gitkeep-5edm)
  by Rita {FlyNerd} Lyczywek on DEV\.to (translated [from original article in Polish](https://www.flynerd.pl/2024/01/gitignore-i-gitkeep.html)),
+ [Git Prom! My Favorite Git Alias](https://dev.to/technosophos/git-prom-my-favorite-git-alias-2mbd)
  (to update own branch with the latest from the upstream repository)
  by Matt Butcher on DEV\.to.
+ [Integrating DVC and Git LFS via libgit2 filters](https://dvc.ai/blog/dvc-git-lfs)
  by Peter Rowlands on DVC AI Blog. [DVC](https://dvc.org/) (Data Version Control)
  was first mentioned in [Git Rev News Edition #42](https://git.github.io/rev_news/2018/08/22/edition-42/),
  with links to different articles about it in 
  [#42](https://git.github.io/rev_news/2018/08/22/edition-42/),
  [#63](https://git.github.io/rev_news/2020/05/28/edition-63/),
  [#64](https://git.github.io/rev_news/2020/06/25/edition-64/),
  [#72](https://git.github.io/rev_news/2021/02/27/edition-72/),
  and [#100](https://git.github.io/rev_news/2023/06/30/edition-100/).
+ [Version Control for Machine Learning](https://dagshub.com/blog/version-control/)
  by Nikitha Narendra on DagsHub Blog. [DAGsHub](https://dagshub.com/) service was
  first mentioned in [Git Rev News Edition #72](https://git.github.io/rev_news/2021/02/27/edition-72/);
  there also articles about this web platform for dataversion control
  linked in [Edition #85](https://git.github.io/rev_news/2022/03/31/edition-85/),
  [#96](https://git.github.io/rev_news/2023/02/28/edition-96/)
  and [#97](https://git.github.io/rev_news/2023/03/31/edition-97/).
+ [RFC: Bridging GitHub workflows with b4](https://lore.kernel.org/tools/20231213-fluffy-roaring-capuchin-8024ac@meerkat/T/)
  by Konstantin Ryabitsev on Linux kernel tools mailing list via lore.kernel.org
+ [Jujutsu: a new, Git-compatible version control system](https://lwn.net/Articles/958468/)
  by Daroc Alden on LWN\.net ([free link](https://lwn.net/SubscriberLink/958468/09ff53915f2ae020/)).
  Jujutsu was first mentioned in [Git Rev News Edition #85](https://git.github.io/rev_news/2022/03/31/edition-85/);
  there was also [Jujutsu: A Git-Compatible VCS](https://www.youtube.com/watch?v=bx_LGilOuE4)
  talk by Martin von Zweigbergk at Git Merge 2022, mentioned in passing
  in [Git Rev News Edition #91](https://git.github.io/rev_news/2022/09/30/edition-91/).

+ [Praise, Criticism, and Dialogue](https://rhaas.blogspot.com/2023/12/praise-criticism-and-dialogue.html)
  (in open source code review process)
  by Robert Haas (PostgreSQL contributor) on his Blogspot blog.
+ [Being friendly: friendly forks 101](https://github.blog/2022-04-25-the-friend-zone-friendly-forks-101/)
  and [Being friendly: Strategies for friendly fork management](https://github.blog/2022-05-02-friend-zone-strategies-friendly-fork-management/)
  by Lessley Dennington on GitHub Blog (2022).

<!---
__Easy watching__
-->

__Git tools and sites__
+ [Git-RDM](https://github.com/ctjacobs/git-rdm) had intended to be
  a Research Data Management (RDM) plugin for the Git version control system.
  It interfaces Git with data hosting services to manage the curation of version controlled files
  using persistent, citable repositories.  Access to hosting services is managed with
  [PyRDM library](https://pyrdm.readthedocs.io/), which supports Figshare, Zenodo,
  and in limited fashion DSpace-based services using SWORD protocol version 2.
  Written in Python, last released in 2016.
    + See also "[Git-RDM: A research data management plugin for the Git version control system](https://joss.theoj.org/papers/10.21105/joss.00029)"
      article in The Journal of Open Source Software (2016).
+ [GitVision](https://github.com/gaspardIV/gitvision) is a web tool
  designed to visualize Git repositories in virtual, augmented, and 3D reality.
  Developed with Vue 3 in Vite by Kacper Konecki (GaspardIV).
  There is live demo of GitVision at [gitvis.web.app](https://gitvis.web.app/),
  which includes prepared quite a few tiny, small, medium and large example repositories;
  you can also visualize your own repository by uploading data prepared using
  [GitVision script](https://github.com/GaspardIV/gitvision/tree/main/tool)
  (or you can use the tool locally).
    + It provides different type of 3D visualization than much better known
      [Gource](https://gource.io/) visualization tool for source control repositories.
      There the repository is displayed as a tree where the root of the repository is the centre,
      directories are branches and files are leaves. Contributors to the source code
      appear and disappear as they contribute to specific files and directories.
    + Has different purpose than [Git History.xyz](https://githistory.xyz/)
      web app that allows to quickly browse the history of files in any git repo,
      mentioned in [Git Rev News Edition #48](https://git.github.io/rev_news/2019/02/27/edition-48/)
      and [#105](https://git.github.io/rev_news/2023/11/30/edition-105/).
    + See also [VR-Git: Git Repository Visualization and Immersion in Virtual Reality](https://opus-htw-aalen.bsz-bw.de/frontdoor/deliver/index/docId/2472/file/ICSEA22-VRGit_OberhauserCR2.pdf) (PDF)
      paper by Roy Oberhauser (2022).
+ [Visualize Git](http://git-school.github.io/visualizing-git/) web app illustrates what's going on
  underneath the hood when you use common Git operations. You'll see what exactly is happening
  to your commit graph. Powered by D3. Sources on GitHub as [git-school/visualizing-git](https://github.com/git-school/visualizing-git).
    + This web app is quite similar to free playground mode of
      [Visualizing Git Concepts with D3](https://onlywei.github.io/explain-git-with-d3/),
      first mentioned in [Git Rev News #69](https://git.github.io/rev_news/2020/11/27/edition-69/).
    + Compare [Learn Git Branching](https://learngitbranching.js.org/),
      mentioned first in [Git Rev News Editon #30](https://git.github.io/rev_news/2017/08/16/edition-30/).
    + Compare [Git Gud](https://nic-hartley.github.io/git-gud/) visual web-based Git simulator,
      meant to help understand Git better, which got announced by its author Nic Hartley in
      [Git Gud at git](https://dev.to/nichartley/git-gud-at-git-5d9k).
      Mentioned first in [Git Rev News Edition #48](https://git.github.io/rev_news/2019/02/27/edition-48/).
    + Compare [Git Gud](https://github.com/benthayer/git-gud), a command line game
      designed to help you learn how to use the Git version control system.
      Written in Python by Ben Thayer. First mentioned in
      [Git Rev News Edition #72](https://git.github.io/rev_news/2021/02/27/edition-72/).
    + Compare [Oh My Git!](https://ohmygit.org/), an open source game about learning Git,
      written using the Godot game engine ([source](https://github.com/git-learning-game/oh-my-git)).
      There was a lightning talk about this game:
      [Building a Git learning game: A playful approach to version control](https://fosdem.org/2021/schedule/event/git_learning_game/)
      at FOSSDEM 2021. First mentioned in [Git Rev News Edition #72](https://git.github.io/rev_news/2021/02/27/edition-72/).
    + Compare [Git-Sim](https://github.com/initialcommit-com/git-sim) tool (written in Python)
      to visually simulate Git operations in your own repos with a single terminal command.
      Described in [Git-Sim: Visually Simulate Git Operations In Your Own Repos](https://initialcommit.com/blog/git-sim)
      (mentioned in [Git Rev News Edition #95](https://git.github.io/rev_news/2023/01/31/edition-95/))
      and [Git-Sim 3 Month Dev Update: Community Response, New Features, & The Future](https://initialcommit.com/blog/git-sim-3-month-dev-update)
      (mentioned in [Edition #98](https://git.github.io/rev_news/2023/04/30/edition-98/)).
+ [List of git mistakes](https://gist.github.com/jvns/f7d2db163298423751a9d1a823d7c7c1)
  people have listed on Mastodon, gathered by Julia Evans (@b0rk@jvns.ca).
+ [Building Git](https://shop.jcoglan.com/building-git/) book by James Coglan
  presents a deep dive into the internals of the Git version control system
  by rebuilding it in a high-level programming language (in Ruby).<br>
  Free table of contents and a sample chapter; the book costs £36.00.


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
