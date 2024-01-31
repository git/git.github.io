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

  Jeremy Pridmore reported an issue to the Git mailing list. He used
  [`git bugreport`](https://git-scm.com/docs/git-bugreport), so his
  message looks like a filled out form with questions and answers.

  He was trying to cherry-pick changes from one repo A to another B,
  while both A and B came from the same original TFS server but with
  different set of changes. He was disappointed though because some
  files that had been moved in repo A were matched up by the rename
  detection mechanism to files other than what he expected in repo B,
  and he wondered if the reason for this was the new 'ort' merge
  strategy described in a
  [blog post by Elijah Newren](https://blog.palantir.com/optimizing-gits-merge-machinery-1-127ceb0ef2a1).

  While not obvious at first, Jeremy's primary problem specifically
  centered around cases where there were multiple files with 100%
  identical content.  Perhaps an example would help.  There could have
  originally been an `orig/foo.txt` file, while one side of history
  does not have that file anymore but instead has both a
  `dir2/foo.txt` and a `dir3/foo.txt`; further, both of the new
  foo.txt files are identical to the original `orig/foo.txt`.  So, Git
  has to figure out which foo.txt file the `orig/foo.txt` was renamed
  to, whether to `dir2/foo.txt` or `dir3/foo.txt`.

  Elijah replied to Jeremy explaining extensively how rename detection
  works in Git.  Elijah pointed out that Jeremy's problem, as
  described, did not involve directory rename detection (despite
  looking kind of like a directory rename detection problem).  Also,
  since Jeremy pointed out that the contents of the "mis-detected"
  renames had identical contents to what they were paired with, that
  meant that only exact renames were involved.  Because of these two
  factors, Elijah said that the new 'ort' merge strategy, which he
  implemented, and which replaced the old 'recursive' strategy, should
  use the same rename detection rules as that old strategy for
  Jeremy's problem. Elijah suggested adding the `-s recursive` option
  to the cherry-pick command to verify this and check if it worked
  differently using the old 'recursive' strategy.

  Elijah also pointed out that for exact renames in a setup like this,
  other than Git giving a preference to files with the same basename,
  if there are multiple choices with identical content then it will
  just pick one essentially at random.

  Jeremy replied to Elijah saying that this sounded like what he was
  observing. He gave some more examples, showing that when there are
  multiple 100% matches, Git didn't always match up the files that he
  wanted but matched files differently.  Jeremy suggested that
  filename similarity (beyond just basename matching) be added as a
  secondary criteria to content similarity for rename detection, since
  it would help in his case.

  Elijah replied that he had tried a few filename similarity ideas,
  and added a "same basename" criteria for inexact renames in the
  `ort` merge strategy along these lines.  However, he said other
  filename similarity measurements he tried didn't work out so well.
  He mentioned that they risk being repository-specific (in a way
  where they help with merges in some repositories but actually hurt
  in others).  He also mentioned a rather counter-intuitive result
  that filename comparisons could rival the cost of content
  comparisons, which means such measurements could adversely affect
  performance and possibly even throw a monkey wrench in multiple of
  the existing performance optimizations in the current merge
  algorithm.

  The thread also involved additional explanations about various facts
  involving rename detection.  This included details about how renames
  are just a help for developers as they are not recorded, but are
  instead computed from scratch in response to user commands. It also
  included details about what things like "added by both" means
  (namely that both sides added the same filename but with different
  contents), why you never see "deleted by both" as a conflict status
  (there is no conflict; the file can just be deleted), and other
  minor points.

  Elijah also brought up a slightly more common case that mirrors the
  problems Jeremy saw, where users could be surprised by the per-file
  content similarity matching that Git does.  This more general case
  arises from having multiple copies of a versioned library.  For
  example, you may have a "base" version with a directory named
  "library-x-1.7/", and a "stable" version has many changes in that
  directory, while a "development" branch has removed that directory
  but has added both a "library-x-1.8/" and a "library-x-1.9/"
  directory which both have changes compared to "library-x-1.7/".  In
  such a case, if you are trying to cherry-pick a commit involving
  several files modified under "library-x-1.7/", where do the changes
  get applied?  Some users might expect the changes in that commit to
  get applied to "library-x-1.8/", while others might expect them to
  get applied to "library-x-1.9/".  In practice, though, it would not
  be uncommon for Git to apply the changes from some of the files in
  the commit to "library-x-1.8/" and changes from other files in the
  commit to "library-x-1.9/".  Elijah explained why this happens and
  suggested a hack for users dealing with this particular kind of case
  to workaround rename detection.

  Philip Oakley then chimed into the discussion to suggest using
  "BLOBSAME" for exact renames in the same way as "TREESAME" is used
  in `git log` for history simplification.  Elijah replied to Philip
  that he thinks that 'exact rename' already works.  Junio C Hamano,
  the Git maintainer, then chimed into the discussion saying that
  "TREESAME" is a property of commits, not trees. So he suggested
  using different words than "BLOBSAME" and "TREESAME" in the context
  of rename detection.

  Philip and Elijah discussed terminology at more length, agreeing
  that good terminology can sometimes help people coming from an "old
  centralised VCS" make the mind shift to understand Git's model, but
  didn't find anything that would help in this case though.

  Finally, Philip requested more information about how Git computes
  file content similarity (for inexact rename detection), referencing
  Elijah's mention of "spanhash representation".  Elijah explained the
  internal data structure in detail, and supported his earlier claim
  that "comparison of filenames can rival cost of file content
  similarity".

<!---
## Developer Spotlight:
-->

## Other News

__Various__
+ [The contributions GitLab's Git team made to the Git 2.43 release](https://about.gitlab.com/blog/2024/01/11/the-contributions-we-made-to-the-git-2-43-release/)
  by John Cai on GitLab Blog.
    + See also [Highlights from Git 2.43](https://github.blog/2023-11-20-highlights-from-git-2-43/)
      by Taylor Blau on GitHub Blog, covering different changes,
      included in [Git Rev News Edition #105](https://git.github.io/rev_news/2023/11/30/edition-105/).
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
with help from Elijah Newren, Bruno Brito and Brandon Pugh.
