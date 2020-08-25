---
title: Git Rev News Edition 66 (August 26th, 2020)
layout: default
date: 2020-08-26 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 66 (August 26th, 2020)

Welcome to the 66th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of July 2020.

## Discussions

<!---
### General
-->


### Reviews

* [git-mv: improve error message for conflicted file](https://lore.kernel.org/git/pull.678.git.1595028293855.gitgitgadget@gmail.com/)

  Chris Torek sent a patch to change the error message from `git mv`
  when it's used on a file that has unresolved conflicts. Previously
  in this special case, `git mv` would error out with the same error
  message as if the file was not managed by Git, that is:

  "fatal: not under version control, src=..."

  This was of course misleading, so Chris' patch was detecting this
  case and then using the new "must resolve merge conflict first"
  error message in this case.

  Eric Sunshine first reviewed the patch suggesting a small code
  improvement in the detection of this case, and a more succinct new
  error message, "conflicted". Eric also commented on the test case
  that Chris' patch added, suggesting a number of small changes that
  would make the test look more modern.

  Junio Hamano, the Git maintainer, commented on the code detecting
  this case. He suggested a less wasteful way to do that.

  Chris then replied to Eric's review saying he will use Junio's
  suggestion for the detection code and Eric's suggestions for the
  error message and the test.

  Chris also asked if he should clean up and modernize other tests in
  the test script that could benefit from Eric's suggestions, but Eric
  replied that the test script, "t7001-mv.sh", has so many old style
  issues that such improvements should happen in a dedicated patch
  series.

  Interestingly Eric listed 17 different old style issues, and for
  each one he described what should be done to fix them, so that his
  email can be read as a guide to modernizing test scripts.

  Elijah Newren replied to Junio's suggestion, pointing to
  [an email from one year ago](https://lore.kernel.org/git/xmqqk1ozb6qy.fsf@gitster-ct.c.googlers.com/),
  where the same issue was already discussed and where Junio suggested
  that `git mv` on a conflicting file could just move the file and
  remove its conflicting status, in the same way as `git rm` and
  `git add` already work on such a file.

  Elijah said that he was still planning to implement what Junio had
  suggested in that email, but that in the meantime fixing the error
  message was perfectly fine.

  Junio replied to Elijah saying that he was not convinced any more
  that what he had suggested one year ago was actually the right thing
  to do, and then describing in details some issues with his old
  suggestion. Junio agreed though that fixing the error message as in
  Chris' patch was a "strict improvement".

  Elijah and Junio then discussed a bit more technical issues related
  to Junio's old proposal.

  Chris sent a version 2 of his patch implementing Junio's and Eric's
  suggestions, including the shortened "conflicted" error message that
  Eric had suggested.

  Junio replied to Chris and discussed a bit the "conflicted" error
  message, but Chris' version 2 patch got merged to the master branch
  as is.

<!---
### Support
-->

<!---
## Developer Spotlight:
-->

## Releases

+ Gerrit Code Review [3.2.3](https://www.gerritcodereview.com/3.2.html#323)
+ GitHub Enterprise [2.21.5](https://enterprise.github.com/releases/2.21.5/notes),
[2.20.14](https://enterprise.github.com/releases/2.20.14/notes),
[2.19.20](https://enterprise.github.com/releases/2.19.20/notes),
[2.18.25](https://enterprise.github.com/releases/2.18.25/notes),
[2.21.4](https://enterprise.github.com/releases/2.21.4/notes),
[2.20.13](https://enterprise.github.com/releases/2.20.13/notes),
[2.19.19](https://enterprise.github.com/releases/2.19.19/notes),
[2.18.24](https://enterprise.github.com/releases/2.18.24/notes)
+ GitLab [13.3](https://about.gitlab.com/releases/2020/08/22/gitlab-13-3-released/),
[13.2.6](https://about.gitlab.com/releases/2020/08/18/critical-security-release-gitlab-13-2-6-released/),
[13.2.5](https://about.gitlab.com/releases/2020/08/18/critical-security-release-gitlab-13-2-5-released/),
[13.2.4](https://about.gitlab.com/releases/2020/08/11/gitlab-13-2-4-released/),
[13.2.3](https://about.gitlab.com/releases/2020/08/05/gitlab-13-2-3-released/),
[13.2.2](https://about.gitlab.com/releases/2020/07/30/gitlab-13-2-2-released/)
+ Bitbucket Server [7.5](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ GitKraken [7.2.0](https://support.gitkraken.com/release-notes/current)
+ GitHub Desktop [2.5.4](https://desktop.github.com/release-notes/)

## Other News

__Various__


__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
