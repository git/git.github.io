---
title: Git Rev News Edition 110 (April 30th, 2024)
layout: default
date: 2024-04-30 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 110 (April 30th, 2024)

Welcome to the 110th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of March 2024 and April 2024.

## Discussions

### General

* [What's cooking in git.git (Mar 2024, #05; Tue, 19)](https://lore.kernel.org/git/xmqqil1iqi37.fsf@gitster.g/)

  Last March, Junio Hamano, the Git maintainer, sent one of the usual
  "What's cooking in git.git" emails that describe the current state
  of the patch series that might be merged into the development
  branches (mostly "master", "next" and "seen").

  The patch series are listed in these emails along with some related
  information using a custom format. That format consists in the
  following elements:

    - a title line, for example:

    > * bl/cherry-pick-empty (2024-03-11) 7 commits

	where `bl` are the initials of the author, and `cherry-pick-empty`
    an actual title,

	- a patch list, for example:

    >  - cherry-pick: add `--empty` for more robust redundant commit handling
    >  - cherry-pick: enforce `--keep-redundant-commits` incompatibility
    >  - sequencer: do not require `allow_empty` for redundant commit options
    >  - sequencer: treat error reading HEAD as unborn branch
    >  - rebase: update `--empty=ask` to `--empty=stop`
    >  - docs: clean up `--empty` formatting in git-rebase(1) and git-am (1)
    >  - docs: address inaccurate `--empty` default with `--exec`

	- a description, for example:

	>  "cherry-pick" told to keep redundant commits needs to be allowed to
    >  create empty commits to do its job, but it required the user to
    >  give the --allow-empty option, which was unnecessary.  Its UI has
    >  also been tweaked a bit.

    - a status, for example:

    >  Comments?

	- a source, for example:

    >  source: <20240119060721.3734775-2-brianmlyles@gmail.com>

  Some of the above elements, like the description, are also
  automatically used to create the release notes that Junio prepares
  and sends when he creates a new release.

  Brian Lyles, replied to Junio that the description of the patch
  series used as an example above, which Brian had sent, was "a little
  out-of-date". He suggested a different wording for it, and said that
  he was going to send a version 4 of the series.

  Junio replied that the wording suggestion for the description was
  very much appreciated, and wondered if the project could adopt a
  better workflow where contributors could write a short description
  at the top of the cover letter of their patch series and that
  description could be packed up automatically by some tools to appear
  in Junio's "What's cooking in git.git" emails.

  Brian Lyles replied that he agreed improving the process could be a
  good idea. He mentioned a strategy used by other projects which
  consists in adding an entry in a "CHANGELOG.NEXT.md" file in each
  important enough commit. At release time all the entries in that
  file would be moved into a standard "CHANGELOG.md" file. He then
  showed how the entry in the "CHANGELOG.NEXT.md" file would look like
  for his series as an example.

  Junio replied by summarizing the current process related to these
  descriptions and pointing to the
  ["Documentation/howto/maintain-git.txt" file](https://github.com/git/git/blob/master/Documentation/howto/maintain-git.txt)
  which describes his workflow and says that maintaining these topic
  descriptions is his responsibility as the project maintainer. He
  then mentioned some downsides of giving that responsibility to the
  patch series authors.

  One downside is that the description might be harder to read because
  the authors "inevitably are biased by the importance of their own
  work ;-)". Another one is that the description might not be as
  consistent as when they are all written by the same person. Coming
  up with some description is also "a good opportunity" for the
  maintainer to find what is still unclear after reading the patches
  and cover letter. Junio agreed that "the distribution of burden is
  certainly attractive" though.

  Brain replied that he thought the author should still write
  something and that at least he was willing to do it. He also
  suggested having guidelines, like for commit messages, to help
  authors and reviewers standardize the style of these descriptions.

  In the meantime, in a separate email, Junio also replied that a
  "CHANGELOG.NEXT.md" file would make merges more difficult compared
  to having the description in the cover letter.

  To that Brian agreed, and proposed writing a patch to the
  "Documentation/SubmittingPatches" file to document that the
  description can be written in the cover letter.

  Junio replied by proposing a patch to that file himself. Brian
  commented that the description might need "some specific heading,
  phrase, or other structured text" to mark the description and make
  it easy to notice and extract.

  Dragan Simic chimed into the discussion saying that writing the
  description should not be a strict requirement and then agreed with
  Junio's patch. Max Gautier also chimed in, agreeing with Brian and
  Dragan about using a format to mark the description. Dragan replied
  that adding an example of such a formatted description in the patch
  Junio suggested would be good.

  Junio replied to Brian that he preferred starting "with a
  lightweight process that does not burden participants with too much
  red tape", so something like "When the first paragraph of the
  message looks like an entry in the Release Notes, it is used as
  such", as he thought that the Release Notes style was "distinct
  enough" as to "not require any further marking".

  As Junio's patch was then merged, it's now
  [officially possible to write a short description](https://github.com/git/git/blob/v2.45.0-rc1/Documentation/SubmittingPatches#L462-L472)
  in patches or cover letters. This description might then be used
  as-is in the "What's cooking in git.git" emails and in the release
  notes.

<!---
### Reviews
-->

<!---
### Support
-->

<!---
## Developer Spotlight:
-->

## Other News

__Various__

* Adam Johnson’s book “Boost Your Git DX”
  [has been updated](https://adamj.eu/tech/2024/04/04/bygdx-update/) with ten
  new pages of content. This book was mentioned in
  [Git Rev News Edition #104](https://git.github.io/rev_news/2023/10/31/edition-104/).

__Light reading__

<!---
__Easy watching__
-->

__Git tools and sites__


## Releases

+ Git [2.45.0-rc1](https://public-inbox.org/git/xmqq4jbqzo3j.fsf@gitster.g/),
[2.45.0-rc0](https://public-inbox.org/git/xmqqcyqljmuu.fsf@gitster.g/)
+ Git for Windows [2.45.0-rc1(1)](https://github.com/git-for-windows/git/releases/tag/v2.45.0-rc1.windows.1),
[2.45.0-rc0(1)](https://github.com/git-for-windows/git/releases/tag/v2.45.0-rc0.windows.1)
+ GitHub Enterprise [3.12.2](https://help.github.com/enterprise-server@3.12/admin/release-notes#3.12.2),
[3.11.8](https://help.github.com/enterprise-server@3.11/admin/release-notes#3.11.8),
[3.10.10](https://help.github.com/enterprise-server@3.10/admin/release-notes#3.10.10),
[3.9.13](https://help.github.com/enterprise-server@3.9/admin/release-notes#3.9.13)
+ GitLab [16.11.1, 16.10.4, 16.9.6](https://about.gitlab.com/releases/2024/04/24/patch-release-gitlab-16-11-1-released/)
[16.11](https://about.gitlab.com/releases/2024/04/18/gitlab-16-11-released/),
[16.10.3, 16.9.5, 16.8.7](https://about.gitlab.com/releases/2024/04/15/gitlab-16-10-3-released/),
[16.10.2, 16.9.4, 16.8.6](https://about.gitlab.com/releases/2024/04/10/patch-release-gitlab-16-10-2-released/)
+ Gerrit Code Review [3.8.5](https://www.gerritcodereview.com/3.8.html#385),
[3.9.3](https://www.gerritcodereview.com/3.9.html#393),
[3.9.4](https://www.gerritcodereview.com/3.9.html#394)
+ GitHub Desktop [3.3.14](https://desktop.github.com/release-notes/),
[3.3.13](https://desktop.github.com/release-notes/)
+ tig [2.5.9](https://github.com/jonas/tig/releases/tag/tig-2.5.9)
+ git-credential-oauth [0.11.2](https://github.com/hickford/git-credential-oauth/releases/tag/v0.11.2)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Junio Hamano and Adam Johnson.
