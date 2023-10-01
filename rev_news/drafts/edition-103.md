---
title: Git Rev News Edition 103 (September 30th, 2023)
layout: default
date: 2023-09-30 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 103 (September 30th, 2023)

Welcome to the 103rd edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of August 2023 and September 2023.

## Discussions

### General

* [Git participated in GSoC (Google Summer of Code) 2023](https://summerofcode.withgoogle.com/programs/2023/organizations/git)

  The following contributors have successfully passed their final
  evaluation and published a final report:

  - Shuqi Liang worked on the
    [More Sparse Index Integrations](https://summerofcode.withgoogle.com/programs/2023/projects/Rkbc1Abe)
    project. She was mentored by Victoria Dye. The final
    report can be found on [her website](https://cheskaqiqi.github.io/2023/08/22/Final/).

  - Kousik Sanagavarapu worked on the
    [Unify ref-filter formats with other --pretty formats](https://summerofcode.withgoogle.com/programs/2023/projects/rck3kmq2)
    project. He was co-mentored by Christian Couder and Hariom Verma.
    The final report can be found on [his website](https://five-sh.github.io/2023/08/26/the-final-report).

  Congratulations to these contributors and their mentors!

<!---
### Reviews
-->

### Support

* [Fetching too many tags?](https://lore.kernel.org/git/274ec1a2152b0fd53b35c1591f5177e0b0713430@rjp.ie/)

  Ronan Pigott noticed that when he fetched from some repos, for
  example from the
  ["Linux Stable" repo](https://git.kernel.org/pub/scm/linux/kernel/git/stable/linux)
  on [kernel.org](https://git.kernel.org/), most of the time seemed to
  be spent transferring tags from the remote to the client.

  When his local repo was up-to-date and `git fetch` was used with
  `--no-tags` (or its `-n` shortcut), it took less than 0.4 seconds
  versus more than 1.7 seconds without it.

  He asked if there was a reason for this seemingly useless transfer of
  tags even when the remote didn't have to send any commit.

  Peff, alias Jeff King, replied that "this is how the Git protocol
  works". He explained that the server only lists all the refs it
  knows about, and expects the client to select the refs it wants
  among them. "Only the client knows what it already has." For
  example, there could be new tags on the server pointing to commits
  that the client already has.

  Peff also mentioned that in recent Git versions an extension of the
  Git protocol allows clients to list only the refs they are
  interested in, so that the server can send "a much smaller ref
  advertisement".

  Ronan asked if Peff was talking about the `--negotiation-tip`
  option, as some tests using this option didn't result in better
  performance.

  Peff replied that `--negotiation-tip` was only useful when there are
  commits that should be transferred. When histories on the client and
  the server have diverged, this option helps them find a common
  commit that can be the base for the commits that will be
  transferred.

  Peff said the extension of the Git protocol he was talking about are
  "ref-prefix" lines in Git's "v2" protocol, which is the default
  protocol since Git v2.29. This protocol allows the client to speak
  first and specify which ref prefixes it's interested in with these
  "ref-prefix" lines.

  Setting the `GIT_TRACE_PACKET` to `1` allows one to see the packets
  exchanged between the client and the server, especially the
  "ref-prefix" lines when for example `git fetch --no-tags origin
  master` is launched using a recent Git, or the "have" and "want"
  lines when client and server have to negotiate a common commit.

  Ronan tested Peff's suggestions and thanked him as he then
  understood why the tag advertisement was useful.

<!---
## Developer Spotlight:
-->

## Other News

__Various__

* [Critical GitHub Vulnerability Exposes 4,000+ Repositories to Repojacking Attack](https://thehackernews.com/2023/09/critical-github-vulnerability-exposes.html)
  on The Hacker News.  The vulnerability was caused by a race condition
  within GitHub's repository creation and username renaming operations.
* [Nx lands $16M to build ‘monorepo’ tools for software devs](https://techcrunch.com/2023/09/25/nx-lands-16m-to-build-monorepo-tools-for-software-devs/)
  by Kyle Wiggers on TechCrunch.  The funding will be used to expand
  [Nx](https://nx.dev/)’s fully managed product,
  [Nx Cloud](https://nx.dev/nx-cloud/intro/what-is-nx-cloud),
  a replacement for existing continuous integration tools, such as Jenkins,
  with first class [monorepo](https://monorepo.tools/) support.
* [Harness launches Gitness, an open-source GitHub competitor](https://techcrunch.com/2023/09/21/oh-gitness-harness-launches-gitness-an-open-source-github-competitor/)
  by Frederic Lardinois on TechCrunch.


__Light reading__

* [In a git repository, where do your files live?](https://jvns.ca/blog/2023/09/14/in-a-git-repository--where-do-your-files-live-/)
  by Julia Evans on her blog.
* [Don’t create `.gitkeep` files, use `.gitignore` instead](https://adamj.eu/tech/2023/09/18/git-dont-create-gitkeep/) by Adam Johnson.
* [Signing Commits in Git, Explained](https://blog.gitbutler.com/signing-commits-in-git-explained/)
  by Scott Chacon on [GitButler](https://gitbutler.com/) Blog.
* [Selecting the Right Git Merging Strategy: Merge Commit, Squash and Merge, or Rebase and Merge](https://akashrajpurohit.com/blog/selecting-the-right-git-merging-strategy-merge-commit-squash-and-merge-or-rebase-and-merge/)
  by Akash Rajpurohit on his blog.
* [Drop git pull for fetch and rebase](https://developers.redhat.com/articles/2023/09/07/drop-git-pull-fetch-and-rebase)
  by Yftach Herzog on RedHat Developer Blog, arguing that `git fetch` followed
  by `git rebase` is a safer alternative (with a feature branch workflow).
* [Advanced Git Commands and Workflows: A Comprehensive Guide for Developers](https://dev.to/documatic/advanced-git-commands-and-workflows-a-comprehensive-guide-for-developers-5865)
  by Matías Hernández Arellano for Documatic on DEV\.to;
  covers interactive rebase, cherry-picking, `git bisect`, reflog, `git blame`,
  and various Git collaboration workflows.
* [Git Delta is a Syntax Highlighting Pager for git, diff, and grep output](https://laravel-news.com/git-delta)
  by Paul Redmond on Laravel News blog.  [Delta](https://dandavison.github.io/delta/)
  was first mentioned in [Git Rev News Edition #86](https://git.github.io/rev_news/2022/04/30/edition-86/);
  there is a link to [another article about Delta](https://dev.to/cloudx/delta-a-new-git-diff-tool-to-rock-your-productivity-2773)
  in [Edition #102](https://git.github.io/rev_news/2023/08/31/edition-102/).
    * There is also a [Delta](https://github.com/octavore/delta) command-line diff tool
      implemented in Go, with a [dead homepage](http://delta.octavore.com/)
      ([archive](https://web.archive.org/web/20201108092055/http://delta.octavore.com/)),
      mentioned in [Git Rev News Edition #9](https://git.github.io/rev_news/2015/11/11/edition-9/).
* [Git-Based Software Development Life-Cycle](https://nordstroem.ch/posts/2023-09-10-git-sdlc.html)
  by Kris considers whether tools like 
  [git-appraise](https://github.com/google/git-appraise),
  [git-issue](https://github.com/dspinellis/git-issue), and
  [git-bug](https://github.com/MichaelMure/git-bug)
  that store their information, history, and artifacts directly in the repository
  can replace development tools such as 
  Jira (planning, issue tracking),
  Confluence (wiki, documentation platform),
  Bamboo (CI/CD server),
  Artifactory (storing Docker images and CI/CD artifacts), and
  Gerrit (code review).
    * [Git Rev News Edition #43](https://git.github.io/rev_news/2018/09/19/edition-43/)
      includes a list of similar tools and links related to them.
    * [git-appraise](https://github.com/google/git-appraise) was first mentioned
      in [Git Rev News Edition #11](https://git.github.io/rev_news/2016/01/13/edition-11/).
* [Delving Deeper into Gitamic: Power and Flexibility Beyond Statamic's Built-In Git Features](https://laravel-news.com/gitamic)
  by Eric L. Barnes on Laravel News blog.
  [Gitamic](https://marketplace.anystack.sh/item/gitamic) is a premium
  [Statamic CMS](https://statamic.com/) add-on that allows you
  to take full control of your Git workflow from within your CMS.
* [GitLab CI: 10+ Best Practices to Avoid Widespread Anti-patterns](https://dev.to/zenika/gitlab-ci-10-best-practices-to-avoid-widespread-anti-patterns-2mb5)
  by Benoit COUETIL for Zenika on DEV\.to.
* [Fossil Versus Git](https://www.fossil-scm.org/home/doc/trunk/www/fossil-v-git.wiki)
  on Fossil Wiki.



__Easy watching__

* [The Git Parable: a different approach to understanding Git](https://www.youtube.com/watch?v=ANNboouhNHE),
  a talk by Johan Herland for Tweag, based on Tom Preston-Werner's
  [essay of the same name](https://tom.preston-werner.com/2009/05/19/the-git-parable.html) (2009)
  covered in [Git Rev News #30](https://git.github.io/rev_news/2017/08/16/edition-30/).


__Git tools and sites__

* [git-credential-azure](https://github.com/hickford/git-credential-azure) is a credential helper
  that authenticates to [Azure Repos](https://azure.microsoft.com/en-us/products/devops/repos).
* [git-vain](https://git.anna.lgbt/anna/git-vain) is a tool to generate
  vanity hashes quickly; it can be used for example to make SHA-1 hash
  of the HEAD begin with `c0ffee`.  Written in Rust.  Other similar tools:
    * [git-vanity-sha](https://github.com/mattbaker/git-vanity-sha), written in Ruby,
      mentioned in [Git Rev News Edition #39](https://git.github.io/rev_news/2018/05/16/edition-39/).
    * ~~[git-sham](https://bitbucket.org/tpettersen/git-sham)~~
      (no longer available); first mentioned in
      [Git Rev News Edition #4](https://git.github.io/rev_news/2015/06/03/edition-4/).
* [git-issue](https://github.com/dspinellis/git-issue) is a minimalist
  decentralized issue management system based on Git,
  offering (optional) bidirectional integration with GitHub and GitLab issue management.
  Written as set of shell scripts.
    * Similarly named [git-issues](https://github.com/duplys/git-issues), written in Python,
      was mentioned in [Git Rev News Edition #43](https://git.github.io/rev_news/2018/09/19/edition-43/).
* [Cup](https://cup.flipt.io/) is an extensible server for building automation
  around introspection and contributions to Git and SCMs like GitHub.
  It is an active experiment into the benefits of managing an API over Git.
  Written in Go by [Flipt](https://www.flipt.io/) - the open source, self-hosted
  feature flag solution.
    * [Flipt](https://www.flipt.io/) itself was mentioned in
      [Git Rev News Edition #96](https://git.github.io/rev_news/2023/02/28/edition-96/).
* [Gitness](https://gitness.com/) by [Harness](https://www.harness.io/)
  is an open-source code hosting and pipeline engine,
  with source control management, Continuous Integration and Continuous Delivery,
  that can be easily installed using Docker.  Written in Go.
  Can be considered the next generation of [Drone](https://www.drone.io/).
* [Gitopia](https://docs.gitopia.com) is the next-generation
  Decentralized Code Collaboration Platform
  fueled by a decentralized network and interactive token economy.
  It is designed to optimize the software development process through collaboration,
  transparency, and open source incentivization.
  You need to have a [supported wallet](https://docs.gitopia.com/wallet-overview)
  with sufficient LORE tokens to use Gitopia's services.
  Pushing changes to Gitopia is done with the help of `git-remote-gitopia` helper.
    * Compare with [git-ssb](https://scuttlebot.io/apis/community/git-ssb.html)
      (see [git-ssb-intro](https://github.com/hackergrrl/git-ssb-intro) guide):
      decentralized git repo hosting and issue tracking on secure-scuttlebutt (SSB),
      mentioned in [Git Rev News Edition #26](https://git.github.io/rev_news/2017/04/19/edition-26/)
      and [#40](https://git.github.io/rev_news/2018/06/20/edition-40/).
    * Contrast with [ForgeFed](https://forgefed.org/) (formerly GitPub),
      a federation protocol for forge services (ActivityPub extension), mentioned in 
      [Git Rev News Edition #69](https://git.github.io/rev_news/2020/11/27/edition-69/)
      and [#95](https://git.github.io/rev_news/2023/01/31/edition-95/),
      and various projects in different stages of development that implement it:
      [Vervis](https://vervis.peers.community/), [Forgejo](https://forgejo.org/),
      [ForgeFlux](https://forgeflux.org/), and [Forgefriends](https://forgefriends.org/).
* [Mermaid](https://mermaid.js.org/), a JavaScript-based diagramming and charting tool
  that can be embedded in Markdown documents 
  (which [is supported on GitHub](https://github.blog/2022-02-14-include-diagrams-markdown-files-mermaid/)),
  now supports [Gitgraph Diagrams](https://mermaid.js.org/syntax/gitgraph.html).


## Releases

+ Git for Windows [2.42.0(2)](https://github.com/git-for-windows/git/releases/tag/v2.42.0.windows.2)
+ Gerrit Code Review [3.6.7](https://www.gerritcodereview.com/3.6.html#367),
[3.7.5](https://www.gerritcodereview.com/3.7.html#375),
[3.8.2](https://www.gerritcodereview.com/3.8.html#382)
+ GitHub Enterprise [3.10.2](https://help.github.com/enterprise-server@3.10/admin/release-notes#3.10.2),
[3.10.1](https://help.github.com/enterprise-server@3.10/admin/release-notes#3.10.1),
[3.9.5](https://help.github.com/enterprise-server@3.9/admin/release-notes#3.9.5),
[3.8.10](https://help.github.com/enterprise-server@3.8/admin/release-notes#3.8.10),
[3.7.17](https://help.github.com/enterprise-server@3.7/admin/release-notes#3.7.17),
[3.6.19](https://help.github.com/enterprise-server@3.6/admin/release-notes#3.6.19),
[3.10.0](https://help.github.com/enterprise-server@3.10/admin/release-notes#3.10.0),
[3.9.4](https://help.github.com/enterprise-server@3.9/admin/release-notes#3.9.4),
[3.8.9](https://help.github.com/enterprise-server@3.8/admin/release-notes#3.8.9),
[3.7.16](https://help.github.com/enterprise-server@3.7/admin/release-notes#3.7.16),
[3.6.18](https://help.github.com/enterprise-server@3.6/admin/release-notes#3.6.18)
+ GitLab [16.4](https://about.gitlab.com/releases/2023/09/22/gitlab-16-4-released/)
[16.3.4 and 16.2.7](https://about.gitlab.com/releases/2023/09/18/security-release-gitlab-16-3-4-released/),
[16.2.6](https://about.gitlab.com/releases/2023/09/12/gitlab-16-2-6-released/),
[16.3.3](https://about.gitlab.com/releases/2023/09/12/gitlab-16-3-3-released/),
[16.3.2](https://about.gitlab.com/releases/2023/09/05/gitlab-16-3-2-released/),
[16.3.1, 16.2.5, and 16.1.5](https://about.gitlab.com/releases/2023/08/31/security-release-gitlab-16-3-1-released/)
+ Bitbucket Server [8.14](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ GitKraken [9.8.2](https://help.gitkraken.com/gitkraken-client/current/),
[9.8.1](https://help.gitkraken.com/gitkraken-client/current/),
[9.8.0](https://help.gitkraken.com/gitkraken-client/current/)
+ GitHub Desktop [3.3.3](https://desktop.github.com/release-notes/),
[3.3.2](https://desktop.github.com/release-notes/),
[3.3.1](https://desktop.github.com/release-notes/),
[3.3.0](https://desktop.github.com/release-notes/)
+ Tower for Windows [5.1](https://www.git-tower.com/release-notes/windows?show_tab=release-notes)
+ git-credential-azure [0.2.3](https://github.com/hickford/git-credential-azure/releases/tag/v0.2.3)
+ git-credential-oauth [0.10.1](https://github.com/hickford/git-credential-oauth/releases/tag/v0.10.1)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Adam Johnson, Bruno Brito, Mirth Hickford
and Štěpán Němec.
