---
title: Git Rev News Edition 91 (September 28th, 2022)
layout: default
date: 2022-09-28 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 91 (September 28th, 2022)

Welcome to the 91st edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of September 2022.

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
+ Tower for Mac [9.0](https://www.git-tower.com/release-notes/mac) ([What’s New in Tower 9 video](https://youtu.be/CuCCGSlBkis))
+ Tower for Windows [3.4](https://www.git-tower.com/release-notes/windows?show_tab=release-notes) 

## Other News

__Various__

+ [SSH commit verification now supported](https://github.blog/changelog/2022-08-23-ssh-commit-verification-now-supported/)
  in GitHub.
+ [1Password now allows you to set up and use SSH keys to sign Git commits](https://blog.1password.com/git-commit-signing/).
    + See also [SSH and Git, meet 1Password](https://blog.1password.com/1password-ssh-agent/),
      mentioned in [Git Rev News Edition #85](https://git.github.io/rev_news/2022/03/31/edition-85/).
+ [New options for controlling the default commit message when merging a pull request](https://github.blog/changelog/2022-08-23-new-options-for-controlling-the-default-commit-message-when-merging-a-pull-request/)
  via web interface in GitHub.
+ [Merge commits now created using the merge-ort strategy](https://github.blog/changelog/2022-09-12-merge-commits-now-created-using-the-merge-ort-strategy/)
  on GitHub.
+ [35,000 code repos not hacked—but clones flood GitHub to serve malware](https://www.bleepingcomputer.com/news/security/35-000-code-repos-not-hacked-but-clones-flood-github-to-serve-malware/),
  and [GitHub blighted by “researcher” who created thousands of malicious projects](https://nakedsecurity.sophos.com/2022/08/04/github-blighted-by-researcher-who-created-thousands-of-malicious-projects/).


__Light reading__

+ [Scaling Git's garbage collection](https://github.blog/2022-09-13-scaling-gits-garbage-collection/)
  by Taylor Blau on GitHub Blog: a tour of recent work to re-engineer Git's garbage collection process
  to scale to GitHub's largest and most active repositories.
+ [A primer on Roaring bitmaps: what they are and how they work](https://vikramoberoi.com/a-primer-on-roaring-bitmaps-what-they-are-and-how-they-work/)
  by Vikram Oberoi.
    + Adding support for [Roaring Bitmaps](https://roaringbitmap.org/) to Git was a part of
      [Reachability bitmap improvements](https://summerofcode.withgoogle.com/programs/2022/projects/UPtA6qdf)
      Google Summer of Code 2022 project by Abhradeep Chakraborty, see for example their
      [GSoC Final Report](https://medium.com/@abhra303/gsoc-final-report-feaaacfae737) on their Medium blog.
+ [Enable Gitsign Today and Start Signing your Commits](https://dev.to/erikaheidi/enable-gitsign-today-and-start-signing-your-commits-2gda)
  with so called _keyless signing_, that is signing that relies on ephemeral keys.
  Article by Erika Heidi on DEV\.to.
+ [Switching git back to GPG signing](https://sethmlarson.dev/blog/switching-git-back-to-gpg-signing)
  from SSH key signing, by Seth Michael Larson on his own blog.
    + See also [Signing Git Commits with SSH Keys](https://blog.dbrgn.ch/2021/11/16/git-ssh-signatures/),
      mentioned in [Git Rev News Edition #83](https://git.github.io/rev_news/2022/01/31/edition-83/).
+ [Git signatures with SSH certificates](https://mjg59.dreamwidth.org/60916.html)
  by Matthew Garrett on his Dreamwidth journal.
+ [Merging two GitHub repositories without losing commit history](https://hacks.mozilla.org/2022/08/merging-two-github-repositories-without-losing-commit-history/)
  by Schalk Neethling on Mozilla Hacks blog; a simpler solution might be to use the `git subtree` command,
  or use the `subtree` merge strategy, or the `ort` merge strategy with `subtree[=<path>]` strategy option.
+ [.gitignore File – How to Ignore Files and Folders in Git](https://www.freecodecamp.org/news/gitignore-file-how-to-ignore-files-and-folders-in-git/)
  by Dionysia Lemonaki on freeCodeCamp.
+ [SSH Tips and Tricks](https://carlosbecker.com/posts/ssh-tips-and-tricks/)
  by Carlos Alexandro Becker, including how to avoid having to touch Yubikey.
+ [Do (not) Self-Host your repos](https://weblog.masukomi.org/2022/09/24/do-and-dont-self-host-your-repos/)
  by Kay Rhodes (@masukomi), explaining pros and cons of self hosting, with a simple suggestion on what to do.
+ [The Git Commands I Use Every Day](https://dev.to/wadecodez/the-git-commands-i-use-every-day-5g17)
  by Wade Zimmerman on DEV\.to,
  originally [published at devmap.org](https://devmap.org/the-git-commands-i-use-every-day-5277f90ab743), a Medium blog.
+ [Git Best Practices – How to Write Meaningful Commits, Effective Pull Requests, and Code Reviews](https://www.freecodecamp.org/news/git-best-practices-commits-and-code-reviews/)
  by Grant Weatherston on freeCodeCamp.
+ [Error: src refspec master does not match any – How to Fix in Git](https://www.freecodecamp.org/news/error-src-refspec-master-does-not-match-any-how-to-fix-in-git/)
  by Dillion Megida on freeCodeCamp.
+ [Rewrite your git history in 4 friendly commands](https://whitep4nth3r.com/blog/rewrite-git-history/),
  making the git history of a demo project to start (again) with an _"Initial commit"_.
  By Salma Alam-Naylor on whitep4nth3r.com (also [on DEV\.to](https://dev.to/whitep4nth3r/rewrite-your-git-history-in-4-friendly-commands-an9)).
+ [Fixing Some Bugs in My GitHub Profile Generator](https://blog.urth.org/2022/08/14/fixing-some-bugs-in-my-github-profile-generator/)
  by Dave Rolsky on his House Absolute(ly Pointless) blog,
  among others on how to use [`linguist-generated` gitattribute](https://github.com/github/linguist/blob/master/docs/overrides.md)
  to exclude generated files from languages statistics.
+ [Things I wish everyone knew about Git (Part I)](https://blog.plover.com/prog/git/tips.html)
  and [(Part II)](https://blog.plover.com/prog/git/tips-2.html)
  by Mark Dominus (陶敏修) on The Universe of Discourse blog.
+ [Why We Built an Open Source ML (Machine Learning) Model Registry with git](https://thenewstack.io/why-we-built-an-open-source-ml-model-registry-with-git/)
  by Dmitry Petrov of [Iterative.AI](https://iterative.ai/) (authors of DVC, CML and MLEM)
  on The New Stack.
    + See [Git-backed Machine Learning Model Registry to bring order to chaos](https://iterative.ai/blog/iterative-studio-model-registry),
      mentioned in [Git Rev News Edition #89](https://git.github.io/rev_news/2022/07/31/edition-89/).
+ [Git – Comparing Visual Studio 2022 with MeGit/EGit and SourceTree](https://www.codeproject.com/Articles/5338960/Git-Comparing-Visual-Studio-2022-with-MeGit-EGit-a)
  by Mark Pelf on CodeProject.
+ [Kaleidoscope + Tower: the perfect Git setup](https://blog.kaleidoscope.app/2022/08/03/kaleidoscope-and-tower/) by Florian Albrecht.
+ [How we built Tower 3 for Windows](https://www.git-tower.com/blog/how-we-built-tower-3-for-windows/) by Kristian Lumme on Tower’s blog.
+ [Mastering Google (for Developers)](https://www.git-tower.com/blog/mastering-google-developers/) by Bruno Brito on Tower's blog.
+ [10 Useful Git Commands You Should Know](https://www.git-tower.com/blog/10-useful-git-commands/) by Bruno Brito on Tower's blog.
+ [Git Interview Questions - The essential list, including answers](https://www.git-tower.com/learn/git/faq/git-interview-questions),
  a part of Git Tower's [Git FAQ](https://www.git-tower.com/learn/git/faq)
  (with tips for the Tower Git client).
+ [Semantic Diff for SQL](https://github.com/tobymao/sqlglot/blob/main/posts/sql_diff.md) by Iaroslav Zeigerman;
  implementation discussed in this post is now a part of the [SQLGlot](https://github.com/tobymao/sqlglot/) library.
  

<!---
__Easy watching__
-->

__Git tools and sites__

+ [Gitsign](https://github.com/sigstore/gitsign): Keyless Git signing with
  [Sigstore](https://www.sigstore.dev/), with your own GitHub / OIDC (OpenID Connect) identity.
  Written in Go.
+ [`ghq`](https://github.com/x-motemen/ghq) provides a way to organize remote repository clones,
  like `go get` does; for example when cloning it makes a directory under a specific root directory.
  Written in Go.
+ [Revup](https://github.com/Skydio/revup) provides command-line tools that allow developers
  to iterate faster on parallel changes and reduce the overhead of creating and maintaining code reviews;
  it creates multiple independent chains of branches for you in the background
  and then creates and manages github pull requests for all those branches.
  Written in Python.
+ [`git-of-theseus`](https://github.com/erikbern/git-of-theseus) is a set of scripts to
  analyze how a Git repo grows over time.
    + See [The half-life of code & the ship of Theseus](https://erikbern.com/2016/12/05/the-half-life-of-code.html)
      by Erik Bernhardsson (2016).
+ [git_dash](https://github.com/darul75/git_dash) is a command-line shell script
  for generating a Git metrics dashboard directly in terminal.
+ [GitHub does dotfiles](https://dotfiles.github.io/): Your unofficial guide to dotfiles on GitHub.


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
