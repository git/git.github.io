---
title: Git Rev News Edition 72 (February 24th, 2021)
layout: default
date: 2021-02-24 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 72 (February 24th, 2021)

Welcome to the 72nd edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of January 2021.

## Discussions

<!---
### General
-->

### Reviews

* [[PATCH 0/5] Support for commits signed by multiple algorithms](https://lore.kernel.org/git/20210111003740.1319996-1-sandals@crustytoothpaste.net/)

  Brian M Carlson sent a patch series to allow verifying signed
  commits and tags when using multiple hash algorithms. This is a
  follow up from Brian's multi-year work on supporting the SHA-256
  hash algorithm in Git, to deal with the fact that the original SHA-1
  algorithm is becoming more and more outdated and insecure.

  One of the trickiest part in supporting a new hash algorithm is that
  when Git objects (except blobs) are converted to the new hash, their
  contents changes, because the hashes they contain (to reference
  other Git objects) are converted too. So old signatures they contain
  become invalid.

  A way to overcome this issue is to add a new signature, that signs
  the converted object, to each signed object that is converted. This
  way such object would have 2 signatures, and can always be verified
  using one of them, even if it gets converted back and forth.

  Brian's patch series addressed the issue that for SHA-256 tags it
  was initially planned to have the signature in a Git object header
  (which is called a header signature), instead of at the end of the
  tag message (which is called a trailing signature), but
  unfortunately the patch implementing that got lost. So we use
  trailing signatures.

  Brian then explained "We can't change this now, because otherwise it
  would be ambiguous whether the trailing signature on a SHA-256
  object was for the SHA-256 contents or whether the contents were a
  rewritten SHA-1 object with no SHA-256 signature at all." So the
  solution he implemented was to "use the trailing signature for the
  preferred hash algorithm and use a header for the other variant".

  Brian thinks this solution is the best we can do in the current
  situation, as it still allows converting back and forth between
  hashes, and verifying signatures created with older versions of Git,
  though tags signed with multiple algorithms can't be verified with
  older versions of Git.

  For commits, Brian patch series fixes the bug that old header
  signatures weren't stripped off before verifying new signatures, so
  verifications always failed.

  The result of his series is then that signing both commits and tags
  can now be round-tripped through both SHA-1 and SHA-256 conversions.

  Junio Hamano, the Git maintainer, replied to a patch in the series
  suggesting using the `size_t` type for byte lengths, instead of
  `unsigned long`, as `unsigned long` was breaking 32-bit builds.

  Brian agreed and sent a
  [version 2](https://lore.kernel.org/git/20210111035840.2437737-1-sandals@crustytoothpaste.net/)
  of the series with Junio's fix.

  Junio replied to the cover letter of this series asking "How widely
  are SHA-256 tags in use in the real world, though?", and if it was really
  too late to use a header signature for tags, as was originaly
  planned.

  Brian replied:

  > I don't know. I don't know of any major hosting platform that
    supports them, but of course many people may be using them
    independently on self-hosted instances.

  He also explained why he thought the solution didn't matter much,
  because he'd just noticed that old Git versions don't properly strip
  header signatures, so wouldn't anyway be able to verify tags or
  commits with multiple signatures.

  He ended his reply saying "there's a lot more prep work (surprise)
  before we get to anything interesting." To which Junio replied:
  "Uncomfortably excited to hear this ;-)"

  Brian [replied with an interesting summary of his in progress work](https://lore.kernel.org/git/X%2F0IaVkxqbYxKJBf@camp.crustytoothpaste.net/).

  Gábor Szeder then reported a Clang warning, while Junio suggested
  more `unsigned long` to `size_t` changes.

  Brian then sent a
  [version 3](https://lore.kernel.org/git/20210118234915.2036197-1-sandals@crustytoothpaste.net/)
  of his patch series with fixes for the issues reported by Gábor and
  Junio, and then a few weeks later
  [version 4](https://lore.kernel.org/git/20210211020806.288523-1-sandals@crustytoothpaste.net/)
  to fix another small issue.

  This patch series is scheduled to be merged in the `master` branch
  soon.

<!---
### Support
-->


## Developer Spotlight: Taylor Blau

* Who are you and what do you do?

  I am Taylor. I work at GitHub, where I spend most of my time
  contributing to the Git project.

* What would you name your most important contribution to Git?

  I'm still submitting many of the patches, but I think
  [multi-pack reachability bitmaps](https://lore.kernel.org/git/e64504bad6e181522946a8f234e12f569bede89e.1612998106.git.me@ttaylorr.com/)
  will be my most important contribution to Git so far.

  If they work, they'll allow hosting providers who rely on reachability
  bitmaps more flexibility to control when and how they repack their
  repository. If you want to use bitmaps, you have no choice but to
  repack your repository into one enormous pack. Multi-pack reachability
  bitmaps mean that you won't have to, and can instead repack your
  repository however you want.

  If I'm limited to things that I have finished, I would say that the
  [on-disk reverse index](https://lore.kernel.org/git/cover.1610129989.git.me@ttaylorr.com)
  is another good one. But that's kind of cheating, since it's related
  to multi-pack bitmaps ;).

* What are you doing on the Git project these days, and why?

  Most of my time is spent working on multi-pack bitmaps. There are a lot
  of different topics in [my fork](https://github.com/ttaylorr/git) that
  all need to get merged in order to  make this feature work. So, I'm
  spending my time in all of the usual ways: submitting patches, responding
  to review, submitting more patches, and so on.

  When I'm not doing that, I enjoy to read and review patches from other
  folks on the list. I feel like there is a lot of exciting work going on
  recently, and so I'm always interested.

  Every release or so I have the pleasure of writing a
  ["release highlights" blog post](https://github.blog/author/ttaylorr/)
  that GitHub publishes. We're still a few weeks away from a release
  (at the time of writing), so it's not something that I'm working on yet,
  but it will come up soon enough.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  I'm not sure :). I care a lot about performance on large repositories,
  so I think that if I were in charge of such a team, that I would just
  set them loose to explore the boundaries of what's possible, and push
  them further.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  Gosh, I would love to get rid of `.keep` packs, or at least the
  distinction between in-core and on-disk ones. They're incredibly useful,
  but they are subtly different, in ways that are sort of hard to reason
  about.

* What is your favorite Git-related tool/library, outside of Git itself?

  I use [`tig`](https://jonas.github.io/tig/) often, particularly its
  blame and log view. Michael Haggerty's [`git when-merged`](https://github.com/mhagger/git-when-merged)
  is another indispensable tool in my workflow.

  I'm curious to try Stephen Jung's [`git absorb`](https://github.com/tummychow/git-absorb)
  tool, but I haven't gotten to it yet.


## Releases

+ Git [2.30.1](https://public-inbox.org/git/xmqqsg662k8p.fsf@gitster.c.googlers.com/)
+ Git for Windows [2.30.1(1)](https://github.com/git-for-windows/git/releases/tag/v2.30.1.windows.1)
+ GitLab [13.9](https://about.gitlab.com/releases/2021/02/22/gitlab-13-9-released/),
[13.8.4, 13.7.7 and 13.6.7](https://about.gitlab.com/releases/2021/02/11/security-release-gitlab-13-8-4-released/),
[13.8.3](https://about.gitlab.com/releases/2021/02/05/gitlab-13-8-3-released/),
[13.8.2, 13.7.6 and 13.6.6](https://about.gitlab.com/releases/2021/02/01/security-release-gitlab-13-8-2-released/),
[13.8.1](https://about.gitlab.com/releases/2021/01/26/gitlab-13-8-1-released/),
[13.7.5](https://about.gitlab.com/releases/2021/01/25/gitlab-13-7-5-released/)
+ Bitbucket Server [7.10](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ Gerrit Code Review [3.3.2](https://www.gerritcodereview.com/3.3.html#332),
[3.2.7](https://www.gerritcodereview.com/3.2.html#327),
[3.1.12](https://www.gerritcodereview.com/3.1.html#3112),
[3.0.16](https://www.gerritcodereview.com/3.0.html#3016),
[2.16.27](https://www.gerritcodereview.com/2.16.html#21627),
[2.15.22](https://www.gerritcodereview.com/2.15.html#21522)
+ GitKraken [7.5.1](https://support.gitkraken.com/release-notes/current)
+ GitHub Desktop [2.6.3](https://desktop.github.com/release-notes/)

## Other News

__Various__


__Light reading__

* In [Getting The Most Out Of Git](https://www.smashingmagazine.com/2021/02/getting-the-most-out-of-git/)
  article in Smashing Magazine, the author Tobias Günther explores some of
  the less known but very useful features in Git: how to recover deleted commits,
  clean up your commit history, use submodules to manage third-party code
  and compose commits with precision.
* [How to Use Branches in Git – the Ultimate Cheatsheet](https://www.freecodecamp.org/news/how-to-use-branches-in-git/)
  by Tobias Günther on freeCodeCamp describes how to create, rename, switch,
  publish, track, delete, merge, rebase and compare branches.
* [How to Collaborate on Data Science Projects with DAGsHub](https://www.freecodecamp.org/news/collaborate-on-data-science-projects-with-dagshub/)
  (and [DVC](https://dvc.org) (Data Version Control)), by Linda Ikechukwu
  on freeCodeCamp.  DVC was first mentioned
  in [Git Rev News Edition #42](https://git.github.io/rev_news/2018/08/22/edition-42/).
* [RefinementCodeReview](https://martinfowler.com/bliki/RefinementCodeReview.html)
  post by Martin Fowler describes an alternative to [PullRequest](https://martinfowler.com/bliki/PullRequest.html)
  mechanism for code review, namely one that is triggered each time
  the code is looked at rather than when the code is added to the codebase.
* In [Monorepos](https://css-tricks.com/monorepo/) Chris Coyier explains the reasoning,
  pros and cons for them, moving back toward a monorepo at [CodePen](https://codepen.io/).
  You can find links to articles advocating for and against monorepos,
  among others, in [Git Rev News Edition #47](https://git.github.io/rev_news/2019/01/23/edition-47/).
* [Rewriting your git history, removing files permanently - cheatsheet & guide](https://blog.gitguardian.com/rewriting-git-history-cheatsheet/)
  by Don Goodman-Wilson on GitGuardian blog.
* [2020 Version control best practices: Five easy ways to enhance team collaboration](https://learn.gitlab.com/version-control/version-control-best-practice)
  (PDF) -- a booklet by GitLab.


__Git tools and sites__

* [DAGsHub Storage](https://dagshub.com/docs/reference/dagshub_storage/)
  is an alternative (and free-to-use) [DVC](https://dvc.org) remote
  that requires zero configuration.
* [Commitizen](http://commitizen.github.io/cz-cli/) is an open source project
  that helps contributors be good open source citizens. It accomplishes this
  by prompting them to follow commit message conventions at commit time,
  asking the user fill in any required fields and automatically formatting
  the commit message according to selected convention.


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Taylor Blau.
