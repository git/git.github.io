---
title: Git Rev News Edition 78 (August 25th, 2021)
layout: default
date: 2021-08-25 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 78 (August 25th, 2021)

Welcome to the 78th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of July 2021.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

<!---
### Support
-->

<!---
## Developer Spotlight:
-->

## Releases


## Other News

__Various__
* [Highlights from Git 2.33](https://github.blog/2021-08-16-highlights-from-git-2-33/)
  by Taylor Blau on GitHub Blog.
* [Treeverse raises $23M to bring Git-like version control to data lakes](https://venturebeat.com/2021/07/28/treeverse-raises-23m-to-bring-git-like-version-control-to-data-lakes/):
  [LakeFS](https://lakefs.io/).
* [GitHub has shut down its Git password authentication on August 13, 2021](https://github.blog/changelog/2021-08-12-git-password-authentication-is-shutting-down/);
  you should use instead [token-based authentication](https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/).


__Light reading__
* [How to write release notes](https://drewdevault.com/2021/05/19/How-to-write-release-notes.html)
  by Drew DeVault.
* [From a Single Repo, to Multi-Repos, to Monorepo, to Multi-Monorepo](https://css-tricks.com/from-a-single-repo-to-multi-repos-to-monorepo-to-multi-monorepo/)
  by Leonardo Losoviz on CSS-Tricks.
  * The idea of monorepos was first mentioned by this name in [Git Rev News Edition #4](https://git.github.io/rev_news/2015/06/03/edition-4/),
    with [Edition #47](https://git.github.io/rev_news/2019/01/23/edition-47/)
	including many links to discussions about their advantages and disadvantages. 
* [Visualizing a codebase](https://next.github.com/projects/repo-visualization):
  how can we automatically “fingerprint” a codebase to see its structure at a glance,
  by Amelia Wattenberger on GitHub Next.
* [The History Behind Git](https://ahmedgouda.hashnode.dev/the-history-behind-git)
  by Ahmed Gouda (also [on DEV.to](https://dev.to/ahmedgouda/the-history-behind-git-53ag)).
* [Getting geeky with Git](https://wanago.io/courses/getting-geeky-with-git/),
  an 11 part series by Marcin Wanago.
* [New in Git: switch and restore](https://www.banterly.net/2021/07/31/new-in-git-switch-and-restore/)
  by Dragos Barosan (new for the author; [`git switch`](https://git-scm.com/docs/git-switch)
  and [`git restore`](https://git-scm.com/docs/git-restore) appeared in Git 2.23 in 2019).
* [A Guide to Git Stash](https://dev.to/pragativerma18/a-guide-to-git-stash-2h5d)
  by Pragati Verma on DEV.to.
* [How to Fix, Edit, or Undo Git Commits (Changing Git History)](https://www.cloudsavvyit.com/13067/how-to-fix-edit-or-undo-git-commits-changing-git-history/)
  by Anthony Heddings on CloudSavvy IT.
* [5 Ways to Undo Mistakes with Git](https://www.sitepoint.com/5-ways-to-undo-mistakes-with-git)
  by Tobias Günther on SitePoint.
* [5 Git Tricks Every Developer Should Know](https://dev.to/shadid12/5-git-tricks-every-developer-should-know-1201)
  by Shadid Haque on DEV.to.
* [Git for Managing Small Projects](https://thenewstack.io/git-for-managing-small-projects/)
  by Rob "drtorq" Reilly on The New Stack, the first part in a planned series of tutorials on Git.


__Git tools and sites__
* [lakeFS](https://lakefs.io/) is an open source tool that transforms your
  object storage into a Git-like repository. It enables you to manage your
  [data lake](https://aws.amazon.com/big-data/datalakes-and-analytics/what-is-a-data-lake/)
  (storing _unprocessed_ data) the way you manage your code. Supports AWS S3,
  Azure Blob Storage and Google Cloud Storage; works seamlessly with all
  modern data frameworks such as Spark, Hive, AWS Athena, Presto, etc.
  * Existing products comparable to LakeFS include tools such as
    [DVC](https://dvc.org/) (first mentioned in [Git Rev News Edition #42](https://git.github.io/rev_news/2018/08/22/edition-42/)),
	[Pachyderm](https://www.pachyderm.com/) (first mentioned in [Git Rev News Edition #49](https://git.github.io/rev_news/2019/03/20/edition-49/)), and
	[Meltano](https://meltano.com/) (first mentioned in [Git Rev News Edition #42](https://git.github.io/rev_news/2018/08/22/edition-42/)).

* [`CITATION.cff`](https://citation-file-format.github.io/) files,
  which use Citation File Format (CFF), are plain text files with
  human- and machine-readable citation information for software (and datasets).
  Code developers can include them in their repositories to let others know
  how to correctly cite their software.  Supported by GitHub, Zenodo and Zotero.

* [GitUI](https://github.com/extrawurst/gitui) is a blazing fast terminal-ui for Git
  written in Rust, meant to work reliably even on large repositories.
  Similar to [tig](https://jonas.github.io/tig/).


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
