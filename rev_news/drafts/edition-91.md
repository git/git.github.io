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
+ [New options for controlling the default commit message when merging a pull request](https://github.blog/changelog/2022-08-23-new-options-for-controlling-the-default-commit-message-when-merging-a-pull-request/)
  via web interface in GitHub.


__Light reading__

+ [Enable Gitsign Today and Start Signing your Commits](https://dev.to/erikaheidi/enable-gitsign-today-and-start-signing-your-commits-2gda)
  with so called _keyless signing_, that is signing that relies on ephemeral keys.
  Article by Erika Heidi on DEV\.to.
+ [Switching git back to GPG signing](https://sethmlarson.dev/blog/switching-git-back-to-gpg-signing)
  from SSH key signing, by Seth Michael Larson on his own blog.
    + See also [Signing Git Commits with SSH Keys](https://blog.dbrgn.ch/2021/11/16/git-ssh-signatures/),
      mentioned in [Git Rev News Edition #83](https://git.github.io/rev_news/2022/01/31/edition-83/x).
+ [Merging two GitHub repositories without losing commit history](https://hacks.mozilla.org/2022/08/merging-two-github-repositories-without-losing-commit-history/)
  by Schalk Neethling on Mozilla Hacks blog; a simpler solution might be to use `git subtree`,
  or use `subtree` merge strategy, or `ort` merge strategy with `subtree[=<path>]` strategy option.
+ [.gitignore File – How to Ignore Files and Folders in Git](https://www.freecodecamp.org/news/gitignore-file-how-to-ignore-files-and-folders-in-git/)
  by Dionysia Lemonaki o freeCodeCamp.
+ [SSH Tips and Tricks](https://carlosbecker.com/posts/ssh-tips-and-tricks/)
  by Carlos Alexandro Becker, including how to avoid having to touch Yubikey.
+ [Kaleidoscope + Tower: the perfect Git setup](https://blog.kaleidoscope.app/2022/08/03/kaleidoscope-and-tower/) by Florian Albrecht.
+ [How we built Tower 3 for Windows](https://www.git-tower.com/blog/how-we-built-tower-3-for-windows/) by Kristian Lumme on Tower’s blog.
+ [Mastering Google (for Developers)](https://www.git-tower.com/blog/mastering-google-developers/) by Bruno Brito on Tower's blog.
+ [10 Useful Git Commands You Should Know](https://www.git-tower.com/blog/10-useful-git-commands/) by Bruno Brito on Tower's blog.

<!---
__Easy watching__
-->

__Git tools and sites__

+ [Gitsign](https://github.com/sigstore/gitsign): Keyless Git signing with
  [Sigstore](https://www.sigstore.dev/), with your own GitHub / OIDC identity.
  Written in Go.
+ [`ghq`](https://github.com/x-motemen/ghq) provides a way to organize remote repository clones,
  like `go get` does; for example when cloning it makes a directory under a specific root directory.
  Written in Go.


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
