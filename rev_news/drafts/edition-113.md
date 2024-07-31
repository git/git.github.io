---
title: Git Rev News Edition 113 (July 31st, 2024)
layout: default
date: 2024-07-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 113 (July 31st, 2024)

Welcome to the 113th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of June and July 2024.

## Discussions


### General

* [[ANNOUNCE] Tickets available for Git Merge 2024](https://lore.kernel.org/git/ZpU0WwsrXCF8BC1f@nand.local/)

  Taylor Blau announced that [tickets for Git Merge 2024, Berlin, September 19th and 20th](https://git-merge.com)
  are now on sale. People who would like to come but need financial
  assistance with travel costs can contact the Git PLC or Scott
  Chacon directly.

* [[ANNOUNCE] Git Merge 2024 CFP deadline extended](https://lore.kernel.org/git/ZqkHxvDx7dlh0RX6@nand.local/)

  Taylor Blau announced that the Git Merge 2024 CFP (Call For
  Proposals) limit has been extended by a week from August 1 to August 8.
  So there are a few more days left to propose talks.

* [[ANNOUNCE] Berlin Git Meetup on August 14th, 6pm CEST](https://lore.kernel.org/git/ZqoQcuKz_ynYaBNM@tanuki/)

  Patrick Steinhardt announced that some Git developers are trying to
  revive the Git user group in Berlin and will host their first
  session together with GitButler soon.

<!---
### Reviews
-->

### Support

* [[BUG] "git clean -df ." silently doesn't delete folders with stale .nfs* files](https://lore.kernel.org/git/ae862adb-1475-48e9-bd50-0c07dc42a520@rawbw.com/)

  Yuri reported that `git clean -df .`, which was supposed to delete a
  directory and all its contents, didn't work when there were files
  named '.nfsXXXXXXXXXXX' managed by NFS in that directory. He
  expected that `git clean -df .` would warn or error out when it
  cannot remove such a file, instead of ignoring the fact that it
  could not remove the file and the containing directory and
  terminating with a success exit code.

  Junio Hamano, the Git maintainer, replied to Yuri saying that it's
  expected that directories that were not empty were not removed.

  Yuri replied that he expected the '.nfsXXXXXXXXXXX' files to be
  removed as they were untracked, so not added nor part of the repo,
  and the command is expected to remove such untracked files.

  Junio replied that the '.nfsXXXXXXXXXXX' files were "a limitation"
  of NFS that applications, including Git, couldn't and weren't
  supposed to remove. He pointed to some documentation which explained
  what these special NFS files are, and which said that they are the
  result of "silly rename" operations.

  Yuri replied that Git should still complain when it cannot remove
  such files, or that there should be a verbosity option that should
  make it complain in such cases.

  Randall S. Becker replied to Yuri that he tried to reproduce the
  issue without using NFS and couldn't. So he asked Yuri if he could
  share "a reproducible set of commands" and said that it was probably
  caused by NFS.

  Junio replied to Randall and Yuri that removing a '.nfsXXXXXXXXXXX'
  files under a real NFSv3 client would likely result in the file
  being automatically resurrected, and that failure to remove a file
  should indeed be reported as Git does when it cannot remove a
  regular file.

  Yuri replied to Randall listing a series of instructions to
  reproduce the issue. He agreed that Git reported failures when it
  couldn't remove a file because of "permissions and special flags
  reasons", but he repeated that it should also do it in the case of
  such NFS files.

  Randall replied to Yuri saying he thought that Git didn't even see
  the NFS files. He asked if a second `git clean -df .` removed the
  NFS files and put new ones, with different names, in place.

  Yuri replied that it wasn't the case and there seemed to be a single
  NFS file.

  Chris Torek then chimed into the discussion replying to Yuri. He
  explained in details how "NFS silly renames" work, and listed some
  cases which could result in NFS lying to Git by reporting that an
  unlink(2) operation succeeded when in fact the file was renamed but
  not deleted. In such a case Git could not report that it couldn't
  remove a file. It could report that it couldn't remove the
  containing directory though.

  Chris finished his explanations saying "Anyway, that's the OS view
  of this mess. I leave the work on Git itself to others. :-)"

  Jeff King, alias Peff, replied to Yuri's email that contained a
  series of instructions to reproduce the issue. He said he got the
  following warning when trying to reproduce:

  "warning: failed to remove xx/.nfs0000000002c8197f00000002: Device or resource busy"

  So Peff thought Git worked properly on his system and then detailed
  elements of the OS and NFS mount he used.

  Yuri replied by giving information about his system. He also said
  that when using `rm -rf` to remove the NFS file, he got a "Device or
  resource busy" error message, but not when using Git.

  Randall replied to Peff that doing a self-mount to reproduce as Peff
  did was perhaps not the best, as the NFS client might be aware of
  the self-mount and things might not behave the same as in a regular
  mount.

  Yuri suggested using a virtual machine to avoid a self-mount.

  Gabor Gombas replied to Yuri reporting the results of his tests. He
  got a "Directory not empty", or a "Device or resource busy" error
  message when he used `git clean -dfx`, but he also got no error
  message when using `git clean -df`.

  This led Yuri to reply that with `-dfx` Git indeed warns about NFS
  files on his machine, but with `-df` it doesn't, because the NFS
  files are in the ignore list.

  It is indeed expected that ignored files are not deleted and are
  just ignored without the `x` option.


## Developer Spotlight: Rubén Justo

* Who are you and what do you do?

  My name is Rubén, and that's how it's spelled correctly.  However,
  some old friends call me Ruben because when we were kids changing
  names was a sign of friendship.  Changing the accent from "ben" to
  "ru", makes the letter 'e' lose its tilde when writing my name.

  My $dayjob is not related to Git, but I use it quite often during the
  workday.  Using it sometimes gives me an itch that I often can't
  resist trying to scratch.

* What would you name your most important contribution to Git?

  I can't think of any worth mentioning.  But I'll say something in the
  other direction;  contributing to Git has not only meant solving some
  itches, but it has clearly made me improve my overall work style.
  I'm grateful for that.

* What are you doing on the Git project these days, and why?

  This can be read at any time: polishing up some itches that has come
  up for me or a colleague.

  Lately, though, I find myself exploring more and more side issues
  that arise during iterations of the changes I was originally
  interested in.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  I'll say a feasible one: something _in Git_ that allows me to avoid
  writing shortcuts like `@{-1}`, `@{1}`, `@{...`

  At least on my keyboard, it's a pain to type `@`, `{...}`.  And I
  tend to type those shortcuts a lot.

  Perhaps too easy for the experts and they'll have a lot of spare time
  during the year?

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  I think that backwards compatibility is overrated most of the time.
  It's usually a matter of getting on with it and time;  sometimes a lot
  of time, I admit.

  The steps being taken towards Git 3.0 seem very interesting to me
  [[ref 1](https://public-inbox.org/git/xmqqa5l2y6aa.fsf_-_@gitster.g/)]
  [[ref 2](https://public-inbox.org/git/cover.1718345026.git.ps@pks.im/)].
  Perhaps there is an opportunity to do some breaking changes.  I don't
  have any in mind, though.

 * What is your favorite Git-related tool/library, outside of
   Git itself?

   Definitely: ["tig"](https://jonas.github.io/tig/).

* Do you happen to have any memorable experience w.r.t. contributing
  to the Git project? If yes, could you share it with us?

  Nope.

* What is your toolbox for interacting with the mailing list and for
  development of Git?

  To interact with the list, I mainly use ["lei"](https://people.kernel.org/monsieuricon/lore-lei-part-1-getting-started),
  ["mutt"](http://www.mutt.org/) and ["thunderbird"](https://www.thunderbird.net/en-US/)
  in a rather makeshift way.  Maybe someday I'll finally configure
  [git send-email](https://git-send-email.io/).

  In fact, more often than not, when I send a patch, I have the feeling
  that someone is going to come along and say: "Come on, Rubén.  That
  User-Agent?  Set up a decent environment to send this properly".

  To develop, I mainly use vanilla Vim.

* What is your advice for people who want to start Git development?
  Where and how should they start?

  Perhaps I would say that writing and reading code are not the most
  important skills in a project like Git.  Empathy and the development
  of effective arguments to convey ideas or intentions are much more
  crucial.

  Realizing and internalizing that, is a solid starting point, I think.

* If there's one tip you would like to share with other Git
  developers, what would it be?

  Keep in mind that reviewing code is much harder than writing it, but
  writing a good message for the commit is even harder.


## Other News

__Various__

+ [Highlights from Git 2.46](https://github.blog/open-source/git/highlights-from-git-2-46/)
  by Taylor Blau on GitHub Blog.  Those include pseudo-merge reachability bitmaps,
  subcommands in [git-config](https://git-scm.com/docs/git-config/2.46.0) (like `git config list`),
  enhanced credential helper protocol, and improving still experimental reftable support.
+ [What’s new in Git 2.46.0?](https://about.gitlab.com/blog/2024/07/29/whats-new-in-git-2-46-0/)
  by Justin Tobler on GitLab Blog.  Highlights include tooling to migrate reference backends
  (from files backend to reftables), symref update instructions for `git update-ref --stdin`,
  `git config` interface improvements (mentioned in the previous article linked), and bundle URI fixes.
+ [Anyone can Access Deleted and Private Repository Data on GitHub](https://trufflesecurity.com/blog/anyone-can-access-deleted-and-private-repo-data-github)
  via Cross Fork Object Reference (CFOR) from another [public] fork.
  Any code committed to a public repository may be accessible forever
  as long as there is at least one public fork of that repository.
  This is intentional design decision by GitHub; see [the documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/what-happens-to-forks-when-a-repository-is-deleted-or-changes-visibility).
  There is though a separate fork network for public and for private versions
  of the same repository.<br>
  Posted on Truffle Security blog.
+ [Debian debate over tag2upload reaches compromise](https://lwn.net/Articles/978324/)
  by Joe Brockmeier on LWN\.net.  The [tag2upload service](https://salsa.debian.org/dgit-team/dgit/-/blob/master/TAG2UPLOAD-DESIGN.txt)
  promises a streamlined way for Debian developers using Git to upload packages to
  the [Debian Archive](https://wiki.debian.org/Services/Debian%20Archive).


__Light reading__

+ [A Git story: Not so fun this time](https://blog.brachiosoft.com/en/posts/git/)
  on Brachiosoft Blog.  The title refers to the ["Just for Fun"](https://www.amazon.com/Just-Fun-Story-Accidental-Revolutionary/dp/0066620732/)
  book, the 2001 autobiography of Linux kernel creator Linus Torvalds,
  and how the Git origin story wasn't so much fun, at least for Linus.
  The article provides list of references.  Includes new material
  not seen in earlier retellings of the Git history, like the ones linked in
  [Git Rev News Edition #2](https://git.github.io/rev_news/2015/04/05/edition-2/) (on 10 years of Git),
  [Edition #52](https://git.github.io/rev_news/2019/06/28/edition-52/),
  [Edition #62](https://git.github.io/rev_news/2020/04/23/edition-62/) (on 15 years of Git),
  [Edition #105](https://git.github.io/rev_news/2023/11/30/edition-105/)
  and [Edition #112](https://git.github.io/rev_news/2024/06/30/edition-112/)
  (among others).
+ [Why Facebook doesn’t use Git](https://graphite.dev/blog/why-facebook-doesnt-use-git)
  by Greg Foster on Graphite Blog.
    + See also [Scaling Mercurial at Facebook](https://code.facebook.com/posts/218678814984400/scaling-mercurial-at-facebook/),
      mentioned in [Git Rev News Edition #24](https://git.github.io/rev_news/2017/02/22/edition-24/).
+ [Pull requests via git push](https://blog.sesse.net/blog/tech/2024-07-15-13-04_pull_requests_via_git_push.html)
  and a specially crafted `pre-receive` hook (and `git-http-backend` configured
  to allow anonymous push) that turns `git push` into series of patch emails.
  (Though this approach has some limitations.)  Written by Steinar H. Gunderson on his blog.
    + See also [git-pr](https://pr.pico.sh/) in "Git tools and sites" section.
+ [How I Use Git Worktrees](https://matklad.github.io/2024/07/25/git-worktrees.html)
  by Alex Kladov (matklad) on his GitHub Pages-based blog.
  TL;DR: consider using worktrees not as a replacement for branches,
  but as a means to manage concurrency in your tasks (for example: view, work, review, fuzz, scratch).
+ [Git autocorrect needs more marketing](https://dev.to/cloudx/git-autocorrect-needs-more-marketing-20gg)
  by Axel Navarro for Cloud(x); on DEV\.to.
    + See also [thefuck](https://github.com/nvbn/thefuck), a command line application
      which corrects your previous console command (for example Git command)
      if you made an error (like typos in command name), and it _didn't_ do what you wanted;
      the tool was first mentioned in 
      [Git Rev News Edition #101](https://git.github.io/rev_news/2023/07/31/edition-101/).
+ [commit messages are optional](https://schpet.com/note/git-commit-messages-are-optional)
  by Peter Schilling in schpet’s notebook (though for some of the mentioned uses,
  commits with empty commit messages are better replaced with `git commit --fixup`).
+ [Git-ifying SVN: How I Brought Modern Version Control to an Age-Old System](https://ionixjunior.dev/en/gitifying-svn-how-i-brought-modern-version-control-to-an-ageold-system/)
  by Ione Souza Junior on his blog; also available [on DEV.to](https://dev.to/ionixjunior/git-ifying-svn-how-i-brought-modern-version-control-to-an-age-old-system-4o3e)
  as a last part of the [mastering-git series](https://dev.to/ionixjunior/series/26070).
  Another article from this series was mentioned in [Git Rev News Edition #112](https://git.github.io/rev_news/2024/06/30/edition-112/).
+ [Benchmarking the Modern Development Experience across Versioning Tools: S3, DVC, Git LFS, and XetHub](https://about.xethub.com/blog/benchmarking-the-modern-development-experience)
  by Ann Huang on XetHub blog.
    + [XetHub](https://about.xethub.com/) is a development platform for datasets and models,
      which automatically versions and tracks assets across the Machine Learning stack
      to guarantee reproducibility.  Mentioned in passing in [Git Rev News Edition #95](https://git.github.io/rev_news/2023/01/31/edition-95/).
    + The comparison does not include [DagsHub's Direct Data Access / Data Streaming](https://dagshub.com/docs/feature_guide/dagshub_storage/data_streaming/),
      which was [announced](https://dagshub.com/blog/launching-data-streaming-and-upload/) in 2022.
      [DagsHub](https://dagshub.com/), a web platform for storing, versioning and managing data (data hub),
      was first mentioned in [Git Rev News Edition #72](https://git.github.io/rev_news/2021/02/27/edition-72/)
+ [The visualization and analysis of git commit statistics for IT team leaders.](https://dev.to/responsivecrocodile/the-visualization-and-analysis-of-git-commit-statistics-for-it-team-leaders-2pof)
  by Aleksei Bakhirev (Responsive Crocodile) on DEV\.to.  Uses the [Assayo](https://github.com/bakhirev/assayo)
  tool written by the author for plots (see also the [assayo.online](https://assayo.online/) webpage).<br>
  But beware the [Goodhart's law](https://en.wikipedia.org/wiki/Goodhart%27s_law):
  _"When a measure becomes a target, it ceases to be a good measure"_.
  For examples from IT, see Joel on Software "[Measurement](https://www.joelonsoftware.com/2002/07/15/20020715/)" (2002).
+ [Reorient GitHub Pull Requests Around Changesets](https://mitchellh.com/writing/github-changesets)
  from one giant mutable changeset, by Mitchell Hashimoto on his blog (2023).
+ [A Note About Git Commit Messages](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
  (2008) by Tim Pope on tbaggery blog; it also explains some of the reasoning behind recommendations.


&nbsp;

+ git good (My Hero Academia fanfiction, humor/horror) - Izuku's quirk is Git, 
  the version control software (some artistic license taken in order to make a good story).
  By Unknownlight. Available [on Archive of Our Own](https://archiveofourown.org/works/55773742/chapters/141591955),
  [on FanFiction.net](https://www.fanfiction.net/s/14369888/1/git-good) (not recommended by the author),
  and [on SpaceBattles](https://forums.spacebattles.com/threads/git-good-my-hero-academia-izukus-quirk-is-git-the-version-control-software.1163142/).<br>
  Summary:
  > Reality shattered like broken glass. The firmament that separated the real world from the eldritch beyond had broken. Two timelines had collided in the center of the street—an incongruous synthesis of two different chains of events. A building collapsed, and it did not. An explosion devastated the surroundings, and it did not. Screaming faces and laughs of joy overlapped each other as if viewed through a kaleidoscopic prism.
  >
  > The crowd looked on in horror and awe. Who was responsible for tearing apart the fabric of reality?
  >
  > Izuku groaned. _'Great, another merge conflict'_, he thought. _'What a pain'_.


__Easy watching__

+ [I was wrong about `git stash`...](https://www.youtube.com/watch?v=ntM7utSjeVU)
  (or rather, how one can use `git worktree`), by Philomatics on YouTube [5:18].


__Git tools and sites__

+ [pico/git-pr](https://pr.pico.sh/) (Patch Requests) is a new Git collaboration service,
  where you send and retrieve patches not via email but via SSH to a `git-pr` server:
  ```bash
  # Contributor submits his/her changes:
  git format-patch origin/main --stdout | ssh pr.pico.sh pr create test
  # > Patch Request has been created (ID: 1)

  # Owner can apply those changes via patch request:
  ssh pr.pico.sh pr print 1 | git am -3
  ```
  Can be self-hosted.  Written in Go, MIT licensed.
+ [eza](https://github.com/eza-community/eza) is a modern replacement
  for the venerable file-listing command-line program `ls`.  It knows about symlinks,
  extended attributes, and Git (like file status in Git repo, Git repo status,
  or ignoring files mentioned in `.gitignore`).  Written in Rust, MIT licensed.
  See the [documentation](https://eza.rocks/).
+ [BlenderBIM](https://blenderbim.org/) is an add-on for detailed and
  data-rich [OpenBIM](https://www.buildingsmart.org/about/openbim/)
  (Building Information Modeling) with Blender.
  BlenderBIM supports [tracking the development of your IFC files with Git](https://docs.blenderbim.org/users/git_support.html)
  (Industry Foundation Classes, or IFC, is an international standard for BIM).
  Note that merging requires the [ifcmerge](https://github.com/brunopostle/ifcmerge)
  tool to be installed (`ifcmerge` is written in Perl, and uses the GPLv3 license).
+ [_diff-pdf_](https://vslavik.github.io/diff-pdf/) is a tool for visually comparing two PDFs,
  which can produces a PDF file with visually highlighted differences.
  Note that [the repository](https://github.com/vslavik/diff-pdf) states that
  the code is not being actively developed.  Written in C++, GPLv2 licensed.
    + See also [pdf-diff](https://github.com/JoshData/pdf-diff) in Python, CC0-1.0 licensed;
      another [pdf-diff](https://github.com/serhack/pdf-diff) in Go, MIT licensed;
      and [diff-pdf-visually](https://github.com/bgeron/diff-pdf-visually) in Python,
      dual licensed under both MIT License and Apache License, Version 2.0 - with
      a slightly different goal.
+ [vdm: A General-Purpose Versioned-Dependency Manager](https://github.com/opensourcecorp/vdm)
  is an alternative to e.g. git submodules for managing arbitrary external dependencies.
  Written in Go, MIT licensed.
    + Contrast [Gil (git links) tool](https://github.com/chronoxor/gil)
      to manage complex recursive repository dependencies with cross references and cycles,
      mentioned in [Git Rev News Edition #110](https://git.github.io/rev_news/2024/04/30/edition-110/).
+ [Bit-Booster is an Offline Commit Graph Drawing Tool](https://bit-booster.com/graph.html),
  using HTML and SVG, generating graphs by pasting the result of running
  `git log --all --date-order --pretty="%h|%p|%d"` into a textarea.
    + It is also an [add-on for Atlassian Bitbucket Server](https://bit-booster.com/graph.html)
    + The webpage includes [comparison with other various commit graph add-ons](https://bit-booster.com/best.html) (2016)

&nbsp;

+ [How To Rotate](https://howtorotate.com/) is an open-source collection
  of API Key Rotation tutorials for different SaaS providers.
+ [Act](https://github.com/nektos/act) is a command line tool
  to run your GitHub Actions locally, using Docker Engine API.  Written in Go.
  Please look at the [`act` user guide](https://nektosact.com/) for more documentation.
    + There is also [Act runner](https://gitea.com/gitea/act_runner),
      a runner for Gitea based on the Gitea fork of `act`.


## Releases

+ Git [2.46.0](https://public-inbox.org/git/xmqqzfq0i0qa.fsf@gitster.g/),
[2.46.0-rc2](https://public-inbox.org/git/xmqq7cdavgqa.fsf@gitster.g/),
[2.46.0-rc1](https://public-inbox.org/git/xmqqwmlivcdp.fsf@gitster.g/),
[2.46.0-rc0](https://public-inbox.org/git/xmqqjzhqmt22.fsf@gitster.g/)
+ Git for Windows [2.46.0(1)](https://github.com/git-for-windows/git/releases/tag/v2.46.0.windows.1),
[2.46.0-rc2(1)](https://github.com/git-for-windows/git/releases/tag/v2.46.0-rc2.windows.1),
[2.46.0-rc1(1)](https://github.com/git-for-windows/git/releases/tag/v2.46.0-rc1.windows.1),
[2.46.0-rc0(1)](https://github.com/git-for-windows/git/releases/tag/v2.46.0-rc0.windows.1)
+ GitLab [17.2.1, 17.1.3, 17.0.5](https://about.gitlab.com/releases/2024/07/24/patch-release-gitlab-17-2-1-released/),
[17.2](https://about.gitlab.com/releases/2024/07/18/gitlab-17-2-released/),
[17.1.2, 17.0.4, 16.11.6](https://about.gitlab.com/releases/2024/07/10/patch-release-gitlab-17-1-2-released/)
+ GitHub Enterprise [3.13.2](https://help.github.com/enterprise-server@3.13/admin/release-notes#3.13.2),
[3.12.7](https://help.github.com/enterprise-server@3.12/admin/release-notes#3.12.7),
[3.11.13](https://help.github.com/enterprise-server@3.11/admin/release-notes#3.11.13),
[3.10.15](https://help.github.com/enterprise-server@3.10/admin/release-notes#3.10.15),
[3.9.18](https://help.github.com/enterprise-server@3.9/admin/release-notes#3.9.18)
+ GitKraken [10.1.1](https://help.gitkraken.com/gitkraken-client/current/),
[10.1.0](https://help.gitkraken.com/gitkraken-client/current/)
+ Garden [1.7.0](https://github.com/garden-rs/garden/releases/tag/v1.7.0)
+ Git Cola [4.8.1](https://github.com/git-cola/git-cola/releases/tag/v4.8.1)
+ git-credential-oauth [0.13.0](https://github.com/hickford/git-credential-oauth/releases/tag/v0.13.0)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
