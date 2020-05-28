---
title: Git Rev News Edition 63 (May 28th, 2020)
layout: default
date: 2020-05-28 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 63 (May 28th, 2020)

Welcome to the 63rd edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of April 2020.

## Discussions

### General

* [GSoC 2020 Students and Projects](https://lore.kernel.org/git/CAP8UFD1iBxiOZ_OA4DbMF9Kx2UHL15TPygoX6x-JrDGuReG1Vw@mail.gmail.com/)

  The following three students have been officially accepted to work on Git
  as part of the [GSoC (Google Summer of Code) 2020](https://summerofcode.withgoogle.com/):

  - Abhishek Kumar will work on
    [Implement Generation Number v2](https://summerofcode.withgoogle.com/projects/#6140278689234944).
    He will be co-mentored by Jakub Narebski and Derrick Stolee.
    More information is available on his
    [proposal](https://lore.kernel.org/git/20200326101520.GA19326@Abhishek-Arch/)
    and [blog](https://abhishekkumar2718.github.io/blog).

  - Hariom Verma  will work on
    [Unify ref-filter formats with other \-\-pretty formats](https://summerofcode.withgoogle.com/projects/#4593212745842688).
    He  will be co-mentored by Heba Waly and Christian Couder.
    More information is available on his
    [proposal](https://lore.kernel.org/git/CA+CkUQ966swTrR7D2vxgQ2ZA3E=Le=u8yvEAopOsphoCWGgDeg@mail.gmail.com/)
    and [blog](https://harry-hov.github.io/blogs/posts/).

  - Shourya Shukla will work on
    [Convert submodule to builtin](https://summerofcode.withgoogle.com/projects/#6451304047575040).
    He will be co-mentored by Kaartic Sivaraam and Christian Couder.
    More information is available on his
    [proposal](https://lore.kernel.org/git/20200325185053.10274-1-shouryashukla.oo@gmail.com/)
    and [blog](https://shouryashukla.blogspot.com/).

  It will be the 13th Summer that the Git project will mentor students
  as part of the GSoC. Shourya, Hariom and Abhishek will be the 30th,
  31st and 32nd students mentored since 2007 when Git started
  participating in the GSoC.

  It will be the 16th year of the GSoC, but unfortunately because of
  the current sanitary situation in the world, there will be no GSoC
  Mentor Summit, and no swag will be sent to participants this year.

### Reviews

* [remote.c: fix handling of push:remote_ref](https://lore.kernel.org/git/20200228172455.1734888-1-damien.olivier.robert+git@gmail.com/)

  Last February Damien Robert sent a patch to change how
  'ref-filter.c' interprets `%(push:remoteref)`.

  Damien had already sent [a patch](https://lore.kernel.org/git/20190417081754.bd27mjxjx7qdxhty@doriath/)
  in April 2019 to fix another bug in 'ref-filter.c'
  related to `%(push:track)`. This patch was incorporated in Git 2.22.

  'ref-filter.c' is some internal API that formats information about
  Git refs or Git objects. It's used by commands like `git branch` and
  `git for-each-ref`.

  The issue Damien wanted to fix was that 'ref-filter.c' didn't take
  into account the [`push.default` config option](https://git-scm.com/docs/git-config#Documentation/git-config.txt-pushdefault)
  which is used when no refspec is specified for the push.

  Peff, alias Jeff King, replied to Damien, and made it clear that it
  was about taking `push.default` into account. He also found that
  Damien's patch wouldn't work in the case where `push.default` was set
  to `upstream` and a branch has been set to track a specific branch
  different than the default one.

  Peff then commented on the code and asked for some tests, saying
  that the current tests were not covering this case and that they
  would wrongly fail if Damien's patch was applied.

  Damien replied to Peff agreeing about the `upstream` case and to add
  more tests. He found that his initial code also wouldn't work when
  `push.default` was set to `nothing`.

  Peff and Damien discussed a bit more some details of the possible
  changes in the code, while Peff proposed a preparatory patch to
  clean up the current code before Damien's changes. Then Damien sent
  a [version 2](https://lore.kernel.org/git/20200303161223.1870298-1-damien.olivier.robert+git@gmail.com/)
  of his patch along with Peff's preparatory patch.

  The version 2 handled all `push.default` cases and added tests for
  them, but Junio Hamano, the Git maintainer, suggested improvements
  in the commit message of the preparatory patch. Peff suggested
  improvements of his own but agreed with Junio's suggestion too.

  Meanwhile Damien found issues in version 2 of his own patch, and
  separately Junio commented on it and suggested some
  improvements. Damien and Junio soon agreed, and then Damien sent a
  [version 3](https://lore.kernel.org/git/20200312164558.2388589-1-damien.olivier.robert+git@gmail.com/)
  of his patch. This version contained only Damien's patch, as Peff's
  patch was merged separately.

  Peff found a memory leak around Damien's patch, but the leak had
  already been there before the patch. Peff also suggested small
  improvements to the tests, and eventually sent
  [his own version](https://public-inbox.org/git/20200328133134.GA1196665@coredump.intra.peff.net/)
  of Damien's patch for him to "to try it out or hack on it further".

  Damien found [an issue](https://public-inbox.org/git/20200416151213.xbo5x6jt477ezwvo@feanor/)
  in Peff's patch though, and, after improving the tests in his patch,
  more existing issues in the current code in case of a
  [triangular workflow](https://public-inbox.org/git/20200406160439.gg5uu6kepnyxpvuc@feanor/).
  Peff commented that these issues could be left for a separate fix
  though.

  Damien then sent a
  [version 6](https://lore.kernel.org/git/20200406175648.25737-1-damien.olivier.robert+git@gmail.com/)
  of his patch, though the title in the cover letter mistakenly
  contains "v4", saying version 4 and version 5 were intermediate
  versions he made but did not send to the mailing list.

  This version contained a preparatory patch to fix the triangular workflow
  issues Damien had found, as well as his updated patch with tests for
  both his fixes in this patch and the triangular workflow fixes. However,
  this patch series was marked as RFC, since its first patch was not very
  polished and did not fix all
  [corner triangular workflow cases](https://lore.kernel.org/git/20200418173651.djzriazxj5kbo6ax@doriath/).

  This led to some [release confusion](https://lore.kernel.org/git/20200416211208.xqnnrkvcl2jw3ejr@doriath/)
  as Junio then had merged the 2 patches to the `next` branch, while
  Damien had sent a
  [version 8](https://lore.kernel.org/git/20200416150355.635436-1-damien.olivier.robert+git@gmail.com/)
  that contained only his patch without the triangular workflow fixes
  and test cases.

  This last version is now merged in the `pu` branch, and is
  likely to find its way to `master`, while hopefully the fixes
  related to triangular workflows will be re-sent separately.

<!---
### Support
-->

<!---
## Developer Spotlight:
-->

## Releases

+ Git [2.27.0-rc2](https://lore.kernel.org/git/xmqqtv02mt2m.fsf@gitster.c.googlers.com/),
[2.27.0-rc1](https://public-inbox.org/git/xmqqsgfuv2ko.fsf@gitster.c.googlers.com/),
[2.27.0-rc0](https://public-inbox.org/git/xmqqy2punll7.fsf@gitster.c.googlers.com/)
+ Git for Windows [2.27.0-rc2](https://github.com/git-for-windows/git/releases/tag/v2.27.0-rc2.windows.1),
[2.27.0-rc1](https://github.com/git-for-windows/git/releases/tag/v2.27.0-rc1.windows.1),
[2.27.0-rc0](https://github.com/git-for-windows/git/releases/tag/v2.27.0-rc0.windows.1)
+ GitHub Enterprise [2.20.8](https://enterprise.github.com/releases/2.20.8/notes),
[2.19.14](https://enterprise.github.com/releases/2.19.14/notes),
[2.18.19](https://enterprise.github.com/releases/2.18.19/notes),
[2.17.25](https://enterprise.github.com/releases/2.17.25/notes),
[2.20.7](https://enterprise.github.com/releases/2.20.7/notes),
[2.19.13](https://enterprise.github.com/releases/2.19.13/notes),
[2.18.18](https://enterprise.github.com/releases/2.18.18/notes),
[2.17.24](https://enterprise.github.com/releases/2.17.24/notes)
+ GitLab [13.0](https://about.gitlab.com/releases/2020/05/06/gitlab-com-13-0-breaking-changes/),
[12.10.6](https://about.gitlab.com/releases/2020/05/15/gitlab-12-10-6-released/),
[12.10.5](https://about.gitlab.com/releases/2020/05/13/gitlab-12-10-5-released/),
[12.10.3](https://about.gitlab.com/releases/2020/05/04/gitlab-12-10-3-released/),
[12.10.2, 12.9.5, 12.8.10](https://about.gitlab.com/releases/2020/04/30/security-release-12-10-2-released/)
+ Bitbucket Server [7.2](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ Gerrit Code Review [2.16.19](https://www.gerritcodereview.com/2.16.html#21619),
[2.16.18](https://www.gerritcodereview.com/2.16.html#21618)
+ GitKraken [7.0.0](https://support.gitkraken.com/release-notes/current)
+ GitHub Desktop [2.5.0](https://desktop.github.com/release-notes/),
[2.4.3](https://desktop.github.com/release-notes/)
+ isomorphic-git [1.0.0](https://isomorphic-git.org/blog/2020/02/25/version-1-0-0)

## Other News

__Various__

* New [git-filter-repo](https://github.com/newren/git-filter-repo) resources:
  a [cheat sheet for converting filter-branch commands](https://github.com/newren/git-filter-repo/blob/master/Documentation/converting-from-filter-branch.md#cheat-sheet-conversion-of-examples-from-the-filter-branch-manpage)
  which shows equivalents for all examples from the filter-branch manpage, and a similar
  [cheat sheet for converting BFG repo cleaner commands](https://github.com/newren/git-filter-repo/blob/master/Documentation/converting-from-bfg-repo-cleaner.md#cheat-sheet-conversion-of-examples-from-bfg)
  which shows equivalents for all the examples from the BFG web page.
* [Java 16: Migration to Git and GitHub gets closer](https://jaxenter.com/java-16-migration-to-git-and-github-jdk-172076.html)
  (from Mercurial).
* [Why AppsFlyer moved from Bitbucket to [self-hosted] GitLab](https://about.gitlab.com/blog/2020/04/27/appsflyer-moves-to-gitlab/).
* [GitHub Codespaces lets you code in your browser without any setup](https://thenextweb.com/dd/2020/05/06/github-codespace-lets-you-code-in-your-browser-without-any-setup/);
  see also [New from Satellite 2020: Start coding in seconds on GitHub with Codespaces](https://github.blog/2020-05-06-new-from-satellite-2020-github-codespaces-github-discussions-securing-code-in-private-repositories-and-more/#codespaces).
* [DVC 3 Years 🎉 and 1.0 Pre-release 🚀](https://dvc.org/blog/dvc-3-years-and-1-0-release);
  [DVC](https://dvc.org) (Data Version Control), an open-source version control
  system for Data Science projects was first mentioned in [Git Rev News #42](https://git.github.io/rev_news/2018/08/22/edition-42/).


__Light reading__

* [Patterns for Managing Source Code Branches](https://martinfowler.com/articles/branching-patterns.html)
  by Martin Fowler (author of the [Refactoring: Improving the Design of Existing Code](https://martinfowler.com/books/refactoring.html) book);
  _note_ that this article is being released in installments,
  and at the time of publishing this edition it finished describing all the patterns but was not yet complete.
* [How LinkedIn handles merging code in high-velocity repositories](https://engineering.linkedin.com/blog/2020/continuous-integration)
  by Niket Parikh.
* [How to Set up the HTTP Git Server for Private Projects](https://thenewstack.io/how-to-set-up-the-http-git-server-for-private-projects/)
  on Ubuntu 18.04 with nginx, by Jack Wallen.
* [Git on Windows](https://code-maven.com/git-on-windows) by Gabor Szabo,
  a video series where you can learn how to use Git on MS Windows
  (half of links to videos are behind a Code Maven paywall).
* [Git Explained: The Basics](https://dev.to/milu_franz/git-explained-the-basics-igc)
  by Milu Franz.
* [Git Explained: An In-Depth Comparison](https://dev.to/milu_franz/git-explained-an-in-depth-comparison-18mk)
  of the commands `revert`, `checkout`, `reset`, `merge`, and `rebase`
  by Milu Franz.
* [The life-changing magic of `git rebase -i`](https://opensource.com/article/20/4/git-rebase-i)
  by Dave Neary.
* [How to resolve a git merge conflict](https://opensource.com/article/20/4/git-merge-conflict)
  by Brian Breniser.
* [Managing Git projects with submodules and subtrees](https://opensource.com/article/20/5/git-submodules-subtrees)
  by Manaswini Das.
* [Improve Git Diffs for Structured Data](https://blog.afoolishmanifesto.com/posts/improve-git-diffs-structured-data/)
  by fREW Schmidt.  The solution uses `.gitattributes` and a custom shell script
  for wrapping the `git diff` command, using `jq` and `sponge` to process JSON files.
* [Comparing Code Quality Meta Tools](https://blog.urth.org/2020/05/08/comparing-code-quality-meta-tools/),
  that is linters and beautifiers operating on the whole project
  (many of those tools being systems for managing Git hooks):
  [tidyall][], [pre-commit][], [lefthook][], [husky][], [overcommit][], and [precious][];
  article by Dave Rolsky.

[tidyall]: https://metacpan.org/pod/distribution/Code-TidyAll/bin/tidyall
[pre-commit]: https://pre-commit.com/
[lefthook]: https://github.com/Arkweid/lefthook
[husky]: https://github.com/typicode/husky
[overcommit]: https://github.com/sds/overcommit
[precious]: https://github.com/houseabsolute/precious


__Git tools and sites__

* [Fork](https://fork.dev/), a fast and friendly proprietary git client for Mac and Windows
  (with free evaluation).
* [Git-Stats](https://gitstats.me/) is an open-source GitHub contribution analyzer
  service written in Node.js.
* [Git Insights](https://www.gitinsights.io/) is an open-source analytics tool
  to give you insights on your software projects and teams, currently supporting
  only GitHub (as GitHub App); support for Bitbucket, GitLab and self-hosted
  repositories is planned.
* [GitSavvy](https://github.com/timbrel/GitSavvy) is an open-source
  Sublime Text 3 plugin providing full Git and GitHub integration.


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Johannes Schindelin, Elijah Newren and
Damien Robert.
