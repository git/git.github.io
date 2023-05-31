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

+ [Weird behavior of `git log --before` or `git log --date-order`](https://lore.kernel.org/git/7728e059-d58d-cce7-c011-fbc16eb22fb9@cs.uni-saarland.de/)

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
  and reproduction recipe" and pointed out that the commits that
  appeared to be from before 1980 were "malformed, but only
  slightly". It appeared that their "author" and "committer" headers
  contained something like:

  `Firstname Lastname<firstname.lastname <Firstname Lastname<firstname.lastname@example.com>> 1297247749 +0100`

  instead of simply:

  `Firstname Lastname <firstname.lastname@example.com> 1297247749 +0100`

  that is, with an extra weird set of angle brackets.

  Peff also found that there were two different code paths for commit
  parsing and they behaved differently when there was an extra set of
  angle brackets. One, which was used to fill in the fields of a
  `struct commit`, only parsed the "parents", "tree", and "committer
  timestamp" fields. For that last field, it was using the
  `parse_commit_date()` function which stopped at the first '>' and then
  tried to parse the rest of the line as a timestamp, which failed and
  returned a 0 timestamp if there was a second '>'.

  The other code path, used when the commit was displayed, called the
  `split_ident_line()` function to parse the "author" and "committer"
  headers, but this function was trying to find the last '>' in these
  headers instead of the first one, which yielded the correct timestamp
  when there were two or more '>'.

  Peff then suggested a patch to make `parse_commit_date()` behave like
  `split_ident_line()` and find the last '>' instead of the first
  one. He also discussed other possible ways to fix the issue,
  including doing nothing as the commits were indeed malformed.

  Kristoffer Haugsbakk replied to Peff saying he was using a tool
  called [`git repair`](https://git-repair.branchable.com) to try to fix
  the original repo. But Peff said he wasn't sure `git repair` would be
  able to fix it. He mentioned that
  [`git filter-repo`](https://github.com/newren/git-filter-repo) or other
  tools would be able to fix it, but would require the commit history
  to be rewritten, which might not be "worth it for a minor problem
  like this".

  Kristoffer replied that he gave up with `git repair` as it didn't
  seem to finish, but was actually more interested in seeing if the
  weird `git log` behavior went away to convince others it wasn't a
  bug, rather than fixing the repo.

  Peff suggested carrying on with git-filter-repo's
  `--commit-callback` option, or alternatively piping `git
  fast-export` through `sed`, and then back to `git fast-import`, as he
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
  timestamp was recorded for a commit, this commit would be parsed again, but
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
  parsing bug he found in the same `parse_commit_date()` function.

  Junio reviewed Peff's patches and made a few suggestions, mostly
  about code comments. Peff took them into account and sent
  [a version 2 of his patch series](https://lore.kernel.org/git/20230425055244.GA4014505@coredump.intra.peff.net/)
  which behaved in the same way as the previous one, but had improved
  code comments.

  Phillip Wood then wondered if it would be better to not use
  `strtoumax`(3) to parse timestamps as this standard C library function
  is using the standard `isspace`(3) while we are using our own version
  of `isspace`(3) which is different. Possible issues with strtoumax(3)
  could also be related to different characters being considered
  digits than in our code. This kind of issues come from the fact that
  `strtoumax`(3), like many other standard C library functions, is taking
  the current
  [locale](https://en.wikipedia.org/wiki/Locale_(computer_software))
  into account.

  After some discussions between Peff, Phillip and Junio, Peff sent
  [a version 3 of his patch series](https://lore.kernel.org/git/20230427081330.GA1461786@coredump.intra.peff.net/)
  with small changes. Especially the new version makes sure Git rejects
  timestamps that start with a character that we don't consider a
  whitespace or a digit or the '-' character before using `strtoumax`(3)
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
[15.11.3, 15.10.7, and 15.9.8](https://about.gitlab.com/releases/2023/05/10/security-release-gitlab-15-11-3-released/),
[15.11.2, 15.10.6, and 15.9.7](https://about.gitlab.com/releases/2023/05/05/critical-security-release-gitlab-15-11-2-released/),
[15.11.1, 15.10.5, and 15.9.6](https://about.gitlab.com/releases/2023/05/02/security-release-gitlab-15-11-1-released/)
+ GitKraken [9.4.0](https://help.gitkraken.com/gitkraken-client/current/)
+ GitHub Desktop [3.2.3](https://desktop.github.com/release-notes/)
+ Sourcetree [4.2.3](https://product-downloads.atlassian.com/software/sourcetree/ReleaseNotes/Sourcetree_4.2.3.html)
+ Tower for Mac [9.3, 9.4](https://www.git-tower.com/release-notes/mac?show_tab=release-notes) ([9.4 blog post](https://www.git-tower.com/blog/tower-mac-94/))
+ git-credential-oauth [0.7.0](https://github.com/hickford/git-credential-oauth/releases/tag/v0.7.0)

## Other News

__Various__

* [GitHub code search is generally available](https://github.blog/2023-05-08-github-code-search-is-generally-available/)
  by Colin Merkel on GitHub Blog.
    * See also [A brief history of code search at GitHub](https://github.blog/2021-12-15-a-brief-history-of-code-search-at-github/)
      in [Git Rev News Edition #82](https://git.github.io/rev_news/2021/12/30/edition-82/), and
      [The technology behind GitHub’s new code search](https://github.blog/2023-02-06-the-technology-behind-githubs-new-code-search/)
      in [edition #96](https://git.github.io/rev_news/2023/02/28/edition-96/).
    * [GitHub’s New Code Search is Bad for Finding Code](https://stackdiary.com/githubs-new-code-search-is-bad/)
      by Alex Ivanovs on Stackdiary (complaining about lack of sort by _new_).


__Light reading__

* [Why I prefer trunk-based development](https://trishagee.com/2023/05/29/why-i-prefer-trunk-based-development/)
  by Trisha Gee.
    * This article references [Perceived Barriers to Trunk Based Development](https://www.davefarley.net/?p=269)
      by Dave Farley on his weblog (2018).
    * You can find more about this workflow
      on [Trunk Based Development](https://trunkbaseddevelopment.com/) site,
      first mentioned in [Git Rev News Edition #24](https://git.github.io/rev_news/2017/02/22/edition-24/).
    * Martin Fowler describes advantages and disadvantages of trunk-based development versus feature branches
      in [Patterns for Managing Source Code Branches](https://martinfowler.com/articles/branching-patterns.html)
      (biased towards better support for Continuous Integration),
      mentioned first in [Git Rev News Edition #63](https://git.github.io/rev_news/2020/05/28/edition-63/).
    * For the other side of this discussion, see for example
      [Working with Feature Branches](https://www.git-tower.com/blog/working-with-feature-branches/)
      by Bruno Brito on Tower’s blog, mentioned in
      [Git Rev News Edition #88](https://git.github.io/rev_news/2022/06/30/edition-88/).
* [5 Version-Control Systems that Game Developers Should Know About](https://thenewstack.io/5-version-control-tools-game-developers-should-know-about/)
  by Sharone Zitzman on The New Stack.
  Those 5 VCS are: Git, Perforce, Plastic SCM (now Unity Version Control),
  and [Diversion](https://www.diversion.dev/) (cloud SCM, in beta).
* [9 best GitHub [Android App] alternatives in 2023](https://www.androidpolice.com/best-github-alternatives/)
  by Charnita Fance on Android Police.
* [Undo a [published] commit in Git](https://www.30secondsofcode.org/git/s/undo-commit-without-rewriting-history/)
  by Angelos Chalaris on 30 Seconds of Code.
* [Git Best Practices – A Guide to Version Control for Beginners](https://www.freecodecamp.org/news/how-to-use-git-best-practices-for-beginners/)
  by Adekola Olawale on freeCodeCamp.
* [Creating effective pull requests](https://madhadron.com/programming/effective_pull_requests.html),
  by madhadron (Frederick J. Ross).
* [How to Make your [Python] Code Shine with GitLab CI Pipelines](https://medium.com/semantixbr/how-to-make-your-code-shine-with-gitlab-ci-pipelines-48ade99192d1)
  by fernanda rodríguez on Medium.
* [CI/CD with KiCad and GitLab](https://sschueller.github.io/posts/ci-cd-with-kicad-and-gitlab/)
  by Stefan Schüller on his blog (on GitHub Pages).
* [Code review at the speed of email](https://drewdevault.com/2022/07/25/Code-review-with-aerc.html)
  by Drew DeVault on Drew DeVault's blog (2022).
    * See also for example [The advantages of an email-driven git workflow](https://drewdevault.com/2018/07/02/Email-driven-git.html)
      by Drew DeVault, mentioned in [Git Rev News Edition #41](https://git.github.io/rev_news/2018/07/18/edition-41/).
* [Version Control Your ML (Machine Learning) Model Deployment With Git using Modelbit](https://towardsdatascience.com/version-control-your-ml-model-deployment-with-git-using-modelbit-1b3d76411436)
  by Avi Chawla, published in Towards Data Science, a Medium blog.
* [GitOps - Operations by Pull Request](https://www.weave.works/blog/gitops-operations-by-pull-request) (2017)
  and [What Is GitOps](https://www.weave.works/blog/what-is-gitops-really) (2018)
  by Alex on Weaveworks blog.
    * [Another article](https://www.weave.works/blog/kubernetes-anti-patterns-let-s-do-gitops-not-ciops)
      from Weaveworks about GitOps can be found
      in [Git Rev News Edition #42](https://git.github.io/rev_news/2018/08/22/edition-42/) (2018).
    * You can find more about GitOps / GitDevOps on
      [GitOps.tech](https://www.gitops.tech/) and [OpenGitOps](https://opengitops.dev/) sites,
      first mentioned in [Git Rev News Edition #62](https://git.github.io/rev_news/2020/04/23/edition-62/)
      and [#94](https://git.github.io/rev_news/2022/12/31/edition-94/), respectively.
* [4 Core Principles of GitOps](https://thenewstack.io/4-core-principles-of-gitops/) by Alex Williams, and
  [GitOps as an Evolution of Kubernetes](https://thenewstack.io/gitops-as-an-evolution-of-kubernetes/) by Steven J. Vaughan-Nichols
  on The New Stack.
* [Reproducible Data Dependencies for Python [with Quilt]](https://blog.jupyter.org/reproducible-data-dependencies-for-python-guest-post-d0f68293a99),
  a guest post by Aneesh Karve published in Jupyter Blog (Medium-based blog).
    * [DagsHub](https://dagshub.com/), a web platform for storing, versioning and managing data (data hub),
      similar to [Quilt Data](https://quiltdata.com/) mentioned in this blog post,
      was mentioned in various articles linked to in 
      [Git Rev News Edition #72](https://git.github.io/rev_news/2021/02/27/edition-72/),
      [#85](https://git.github.io/rev_news/2022/03/31/edition-85/),
      [#96](https://git.github.io/rev_news/2023/02/28/edition-96/), and
      tangentially in [#97](https://git.github.io/rev_news/2023/02/28/edition-96/).
    * See also links about data versioning in
      [Git Rev News Edition #96](https://git.github.io/rev_news/2023/02/28/edition-96/).
* [GitHub Copilot X CLI is your new GIT assistant](https://dev.to/this-is-learning/github-copilot-x-cli-is-your-new-git-assistant-1edn)
  by Leonardo Montini for This is Learning, a part 3 in [GitHub Copilot X (5 Part Series)](https://dev.to/balastrong/series/23030)
  on DEV\.to.  Originally published at [leonardomontini.dev](https://leonardomontini.dev/copilot-x-git-cli/).
    * Similar article, [GitHub Copilot for CLI makes Terminal scripting and Git as easy as asking a question](https://dev.to/codepo8/github-copilot-for-cli-makes-terminal-scripting-and-git-as-easy-as-asking-a-question-3m81)
      can be found in [Git Rev News Edition #98](https://git.github.io/rev_news/2023/04/30/edition-98/).
      
<!-- Humor -->
* [BranchGPT: The AI-Powered Solution to Branch Names](https://stateful.com/blog/branchgpt-ai-powered-branch-names)
  by Sebastian Tiedtke on Stateful\.com blog (_Tongue-in-cheek_ over the top take on AI).


__Easy watching and listening__

* [For those who just don’t Git it (The Stack Overflow Podcast | Ep. 573)](https://stackoverflow.blog/2023/05/23/for-those-who-just-dont-git-it-ep-573/)
  where Pierre-Étienne Meunier, creator and lead developer
  of open-source version control system [Pijul](https://pijul.org/)
  (mentioned in [Git Rev News Edition #9](https://git.github.io/rev_news/2015/11/11/edition-9/),
  [#24](https://git.github.io/rev_news/2017/02/22/edition-24/) and
  [#38](https://git.github.io/rev_news/2018/04/18/edition-38/)),
  talks about version control, functional programming, and OCaml.


__Git tools and sites__

* [Bytebase](https://www.bytebase.com/) - database schema change and version control
  (the GitLab for Database DevOps): web-based collaboration workspace to help DBAs
  and developers manage the database development lifecycle.
* [Quilt Data](https://quiltdata.com/) is a self-organizing data hub,
  consisting of a Python API, web catalog, and backend to manage data sets in AWS S3.
  The backend service is based on open-source [Quilt](https://github.com/quiltdata/quilt)
  Python package ([documentation](https://docs.quiltdata.com/).
  The development of [jupyterlab-quilt](https://github.com/quiltdata/jupyterlab)
  extension seems to be stalled, though.
* [GitOps Principles v0.1.0](https://github.com/open-gitops/documents/blob/v0.1.0/PRINCIPLES.md)
  published by [OpenGitOps](https://opengitops.dev/)
* [GIT Web Terminal](https://git-terminal.js.org/) (Git in your browser)
  was created using [isomorphic-git](https://github.com/isomorphic-git/isomorphic-git)
  (a pure JavaScript implementation of git for node and browsers).
  Source code on GitHub: [jcubic/git](https://github.com/jcubic/git).
    * [isomorphic-git](https://isomorphic-git.org/) was first mentioned in
      [Git Rev News Edition #40](https://git.github.io/rev_news/2018/06/20/edition-40/).


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Bruno Brito.
