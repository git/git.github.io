---
title: Git Rev News Edition 82 (December 30th, 2021)
layout: default
date: 2021-12-30 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 82 (December 30th, 2021)

Welcome to the 82nd edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of November 2021.

## Discussions

### General

* [Peff is taking a break from Git](https://public-inbox.org/git/YboaAe4LWySOoAe7@coredump.intra.peff.net/)

  Peff, alias Jeff King, announced on the mailing list that he is
  going to take a five months break from Git starting at the end of
  December. He is also steping down from Git's PLC (Project Leadership
  Committee), the entity that represents Git within
  [Software Freedom Conservancy](https://sfconservancy.org/).

  Peff has been involved in the project for 15 years, and has
  contributed a huge number of patches, and an enormous amount of
  reviews, support and discussions.

  He also used to maintain [git-scm.com](https://git-scm.com/), the main site of the
  project. It looks like Taylor Blau, who has been working at GitHub
  with Peff will take over maintaining this site.

  Along with others on the mailing list, let's thank Peff for his
  contributions to Git and Git Development Community!

<!---
### Reviews
-->

### Support

* [misleading message printed when worktree add fails](https://lore.kernel.org/git/CA+34VNLj6VB1kCkA=MfM7TZR+6HgqNi5-UaziAoCXacSVkch4A@mail.gmail.com/)

  Baruch Burstein posted a bug report on the mailing list saying that
  he ran `git worktree add <path> <branch>`, where <branch> is an
  already checked-out branch, and saw a message that seemed to
  indicate that the command was a success, when in fact it was not.

  Eric Sunshine replied to him asking if he saw something similar as:

  ```sh
  % git worktree add ../foo bar
  Preparing worktree (checking out 'bar')
  fatal: 'bar' is already checked out at '.../wherever'
  ```

  Baruch replied that he actually saw the messages emitted by Git in a
  different order:

  ```sh
  fatal: 'master' is already checked out at 'C:/Users/bmbur/temp'
  Preparing worktree (checking out 'master')
  ```

  Eric then diagnosed the following:

  > Okay, that's happening because the 'Preparing' message is sent to
  > stdout, whereas the 'fatal' error is sent to stderr, and the streams
  > are being flushed on Windows in a different order than what we
  > typically see on Unix platforms even though the 'Preparing' message is
  > actually output first by the code.

  He then proposed to have the die() function, which is emitting the
  'fatal' error, or the vreportf(), which is used by die() to emit the
  'fatal' error, flush stdout before emitting an error. This would fix
  not only the issue Baruch saw, but also other similar issues in
  other parts of the code.

  Randall S. Becker replied to Eric that his proposed fix was
  "probably a good idea" as "there is no guarantee even in Unix
  regarding stream buffer flushing".

  Eric posted [an RFC patch](https://lore.kernel.org/git/20211130043946.19987-1-sunshine@sunshineco.com/)
  implementing his proposed fix. The patch added a call to
  `fflush(stdout)` in vreportf() just before this function calls
  `fflush(stderr)` and before it actually writes a message on stderr.

  Junio Hamano, the Git maintainer replied to the patch wondering if
  flushing stdout when it is going to a pipe talking to another
  process could cause issues. He noticed that the HTTP backend code
  uses vreportf() in this way, though he said that any code using
  stdio "cannot precisely control when the buffered contents are
  flushed anyway" so the patch might be OK.

  Jeff King, alias Peff, then started a discussion about the
  possibility of some flushing causing some code to block which might
  create a deadlock as some other code might be waiting for something
  from the now blocking code. Eric suggested that this could be
  addressed by flushing stdout only if stdout is attached to a
  terminal, though he thought this would be "rather ugly".

  Ævar Arnfjörð Bjarmason chimed in to ask about the warning() and
  error() functions that also call vreportf(), but Peff replied that
  they were probably OK.

  Meanwhile Peff also replied to Eric's patch wondering if "status
  messages like this go to stderr anyway". He said:

  > in general our approach in Git is more "if it is the main
  > output of the program, it goes to stdout; if it is
  > chatter or progress for the user, it goes to stderr".

  He also explained that it works consistently on glibc as "stdout to
  a terminal is line buffered by default, so the 'Preparing' line is
  flushed immediately". But even on Linux, without a terminal, like
  when both stdout and stderr are redirected to the same file, for
  example with `git worktree add ../foo bar >out 2>&1`, the output to
  stderr appears before the one to stdout.

  Eric replied to Peff saying he had considered emitting the
  'Preparing' line on stderr instead of stdout, as Peff suggests, but
  he thought that it's not documented and not very consistent that
  this kind of output from Git should go to stderr, and also that it
  could be a regression if people relied on that. He suggested adding
  a fflush(stdout) to git-worktree's code and "live with that
  localized ugliness".

  Peff agreed that Git has not been very consistent, but he said that
  more careful reviews and "laying out guidelines could help". He also
  pointed to [a previous discussion](https://lore.kernel.org/git/20110907215716.GJ13364@sigill.intra.peff.net/)
  from 10 years ago where he "laid out his mental model" about this topic.

  He also noticed that the 'Preparing' line was marked for
  translation, so "not reliably machine-readable anyway". He also
  pointed to [a previous commit](https://github.com/git/git/commit/68b939b2f0)
  that moved some `git clone` output from stdout to stderr for similar
  reasons.

  Eric then agreed with Peff about sending a different patch to move
  the 'Preparing' line output to stderr and another patch to improve
  documentation about this topic. Eric also noticed that this output
  had been changed significantly 3 years ago without any complaints.

  He then sent [a patch](https://lore.kernel.org/git/20211201053214.2902-1-sunshine@sunshineco.com/)
  to improve our documentation about this. A second version of this
  patch was eventually merged to the master branch after Eric took
  into account some reviews by Fabian Stelzer, Junio, Peff and Philip
  Oakley to improve some wordings.

  Ævar and Junio discussed a bit further the "you shouldn't write
  anything that isn't an error" view of the world, and Ævar cited the
  ["chronic" utility](https://manpages.debian.org/jessie/moreutils/chronic.1.en.html).

  Eric also sent [a small patch series](https://lore.kernel.org/git/20211203034420.47447-1-sunshine@sunshineco.com/)
  that moved the 'Preparing' line output to stderr and fixed a minor
  problem in the `git worktree` documentation he noticed along the
  way.

  This patch series started a small inconclusive discussion between
  Ævar, Eric, Peff and Junio about automating the synopsys and maybe
  other parts of the documentation from the code or other ways to
  avoid duplication and mismatches.

  The patch series was eventually merged as is to the master branch
  though.

## Developer Spotlight: Randall S. Becker

* Who are you and what do you do?

  I am Randall S. Becker, president of Nexbridge Inc. I have been a
  software developer and architect for many decades. Aside from the
  obvious SCM domain knowledge, my interests are around data structures,
  performance, computability, and languages. About 10 years ago, I joined
  the ITUGLIB Technical Committee, which is an Open-Source group that
  maintains code for the HPE Nonstop community - the platform was
  originally called Tandem Computers Inc.

* What would you name your most important contribution to Git?

  I have been maintaining the code associated with the HPE NonStop
  platform for the past six years and was key to its successful port to
  both the x86 and ia64 variants of the platform. In addition, I keep an
  eye out for changes that may put the port at risk and run the CI/CD
  environment that builds and tests Git on the platform.

* What are you doing on the Git project these days, and why?

  I am currently working on the `.git/config` `includeIf` function for
  worktrees, planning a threaded version of the port, which is challenging
  considering the nature of the platform and community. We have to
  maintain compatibility with some old versions of the operating systems
  that lack some more modern capabilities. The platform is an MPP
  architecture without kernel level threads (yet) and the port to POSIX
  threads is very messy with the operating system wrappers we have to use.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  There are really three areas where I would want to work. The first, most
  important, is improving multi-level signing capabilities in Git to
  support the software supply chain. I could leave it at that, but the
  full set of requirements in various countries are not yet fully fleshed
  out. Another two, purely to support the NonStop community is converting
  the code written in Go (Git LFS) into C and making it part of the standard
  product. The other is migrating the interpretive code to a c99-standard
  code base.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  I would move directly to SHA-384 or SHA-512 and toss both SHA-1 and
  SHA-256 as soon as possible. The same applies to any signing
  capabilities to support 8K or higher key sizes in defense against future
  hacking using the capabilities quantum computers.

* What is your favorite Git-related tool/library, outside of Git
  itself?

  This is a bit of self-promotion for my company and, I apologise for that.
  We build façade-style interface facilities that allow legacy platforms,
  including HPE NonStop and IBM's TSO/ISPF environments to have full Git
  experiences despite the native file systems not supporting POSIX-like
  hierarchies. These are Git clients that map file system attributes and
  structures to and from what Git can understand. Our NonStop product was
  recently added to the HPE price book. These products allow older
  codebases to share in the benefits of real DevOps capabilities without
  having to rely on proprietary knowledge and processes. I am the chief
  architect of those products.

* Do you happen to have any memorable experience with respect to contributing
  to the Git project? If yes, could you share it with us?

  I think the most satisfying experience was the few months it took to
  contribute all the code associated with the NonStop port. It was a huge
  pain to maintain the separate fork even with Git's awesome merge
  capabilities. Being allowed to be lazy is a dream of many developers and
  cutting down the time and effort spent on each release to a simple push
  of the Jenkins "Build Now" button frees up a lot of time.

* What is your advice for people who want to start Git development?
  Where and how should they start?

  Learn about Merkel Trees and general data structures.

  I am still learning when it comes to general functional contributions.
  Watching how others contribute is really crucial if you have any hope of
  your contribution being accepted.

* If there's one tip you would like to share with other Git developers,
  what would it be?

  For every change you make, think about the security implications.
  Think about what a hacker might do to compromise Git or an organisation
  using Git before you move forward, no matter how good an idea it might
  seem. The last thing you want is to have your contribution show up as a
  Critical Vulnerability Exposure on the NIST database.

## Releases

+ Git [2.34.1](https://public-inbox.org/git/xmqq7dcx1ent.fsf@gitster.g/)
+ Git for Windows [2.34.1(1)](https://github.com/git-for-windows/git/releases/tag/v2.34.1.windows.1)
+ GitHub Enterprise [3.3.1](https://help.github.com/enterprise-server@3.3/admin/release-notes#3.3.1),
[3.2.6](https://help.github.com/enterprise-server@3.2/admin/release-notes#3.2.6),
[3.1.14](https://help.github.com/enterprise-server@3.1/admin/release-notes#3.1.14),
[3.0.22](https://help.github.com/enterprise-server@3.0/admin/release-notes#3.0.22),
[3.3.0](https://help.github.com/enterprise-server@3.3/admin/release-notes#3.3.0),
[3.2.5](https://help.github.com/enterprise-server@3.2/admin/release-notes#3.2.5),
[3.1.13](https://help.github.com/enterprise-server@3.1/admin/release-notes#3.1.13),
[3.0.21](https://help.github.com/enterprise-server@3.0/admin/release-notes#3.0.21),
[3.2.4](https://help.github.com/enterprise-server@3.2/admin/release-notes#3.2.4),
[3.1.12](https://help.github.com/enterprise-server@3.1/admin/release-notes#3.1.12),
[3.0.20](https://help.github.com/enterprise-server@3.0/admin/release-notes#3.0.20)
+ GitLab [14.6](https://about.gitlab.com/releases/2021/12/22/gitlab-14-6-released/)
[14.5.2, 14.4.4, and 14.3.6](https://about.gitlab.com/releases/2021/12/06/security-release-gitlab-14-5-2-released/),
[14.5.1](https://about.gitlab.com/releases/2021/12/01/gitlab-14-5-1-released/),
[14.4.3](https://about.gitlab.com/releases/2021/12/01/gitlab-14-4-3-released/),
[14.3.5](https://about.gitlab.com/releases/2021/11/26/gitlab-14-3-5-released/),
[14.2.7](https://about.gitlab.com/releases/2021/11/26/gitlab-14-2-7-released/)
+ Bitbucket Server [7.19](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ Gerrit Code Review [3.5.0](https://www.gerritcodereview.com/3.5.html#350)
+ GitKraken [8.2.1](https://support.gitkraken.com/release-notes/current),
[8.2.0](https://support.gitkraken.com/release-notes/current)
+ GitHub Desktop [2.9.6](https://desktop.github.com/release-notes/),
[2.9.5](https://desktop.github.com/release-notes/)

## Other News

__Various__


__Light reading__

* [GSoC 2022](https://opensource.googleblog.com/2021/11/expanding-google-summer-of-code-in-2022.html)
  is expanding to everyone 18 years or older, to different project sizes and to flexible timelines.

__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Randall S. Becker.
