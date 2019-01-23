---
title: Git Rev News Edition 47 (January 23rd, 2019)
layout: default
date: 2019-01-23 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 47 (January 23rd, 2019)

Welcome to the 47th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of December 2018.

## Discussions


### General

* [Referring to commits in commit messages](https://public-inbox.org/git/877eg5fwd5.fsf@evledraar.gmail.com/)

  Ævar Arnfjörð Bjarmason replied to a
  [patch](https://public-inbox.org/git/20181217165957.GA60293@google.com/)
  that Jonathan Nieder had sent to the mailing list. He suggested using
  the [standard commit-reference format documented in SubmittingPatches](https://github.com/git/git/blob/16a465bc018d09e9d7bbbdc5f40a7fb99c21f8ef/Documentation/SubmittingPatches#L143-L158) in the commit message of the patch.

  Using the standard format would have produced:

  ```
  92068ae8bf ("stripspace: respect repository config", 2016-11-21)
  ```

  while Jonathan's patch contained:

  ```
  v2.11.0-rc3~3^2~1 (stripspace: respect repository config, 2016-11-21)
  ```

  The main difference is that the former starts with an abbreviated
  object id, while the latter starts with an output from `git describe`.

  Ævar gave an example of him previously looking for a commit using
  `git log --grep=0386dd37b1` and not finding it because Jonathan had
  not used the standard format.

  Ævar also wondered if "we should have some mode where
  `--grep=<commitish>` will be combined with some mode where we try to
  find various forms of `<commitish>` in commit messages, then normalize
  & match them..."

  Duy Nguyen replied to that by suggesting we use email style trailers
  like `In-Reply-To: ...` or even `Fixes: ...` to refer
  to related commits, which could make sense as we already use
  [`Signed-off-by: User <email>` trailers](https://github.com/git/git/blob/master/Documentation/SubmittingPatches#L306-L347)
  and some other similar trailers in commit messages.

  Gábor Szeder also replied to Ævar saying that the `%h (%s, %ad)` is
  even better and more widely used than the standard `%h ("%s", %ad)` as
  the former avoids useless double quotes around the commit title.

  Jeff King, alias Peff, then commented to Ævar's suggestion about a new
  mode for `--grep=<commitish>`. He gave examples of other tools that
  work better with the standard format:

  - web interfaces like GitHub have learned to replace an abbreviated
    object id with a link to a page displaying the object,

  - terminals makes it easy to select object ids, but don't understand
    output from `git describe`.

  Peff acknowledged that the format with an output from `git describe`
  has some benefits:

  > As far as I can tell, the main advantage of using `v2.11.0-rc3~3^2~1`
  > over its hex id is that it gives a better sense in time of which Git
  > version we're talking about. The date in the parentheses does something
  > similar for wall-clock time, but it's left to the reader to map that to
  > a Git version if they choose.

  But he thought that they were not worth the disadvantages "as in the
  rare instance that I care about the containing version, it's not a big
  deal to use `git tag --contains`".

  He suggested anyway using something like:

  ```
  1234abcd (the subject line, 2016-01-01, v2.11.0)
  ```

  which adds a version after the date, "if we really want to convey that
  information". And he proposed some reasonable rules for this new
  format.

  Jonathan replied to Peff's suggestion by discussing the possible
  ambiguities in what the tag name is referring to. This led Jonathan to
  prefer using trailers like `Fixes: ...` as Duy had suggested,
  saying they have been working well for the Linux kernel project.

  In a separate reply to Duy's email, Jonathan copied relevant
  [documentation from the Linux kernel project](https://github.com/torvalds/linux/blob/ae67ee6c5e1d5b6acdb0d51fddde651834096d75/Documentation/process/submitting-patches.rst)
  where they specify a trailer that looks like:

  ```
  Fixes: e21d2170f366 ("video: remove unnecessary platform_set_drvdata()")
  ```

  Jonathan then proposed a patch to the Git Documentation that would
  make the Git project adopt a similar policy.

  Peff replied to Jonathan that using `Fixes: ...` trailers is a good
  idea but that "there are many other reasons to refer to another commit
  in prose (or even outside of a commit message entirely)".

  Jonathan, Peff and Ævar discussed a bit more, and Jacob Keller chimed
  in, but in the end it doesn't look like any change has been decided.

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

+ JGit [4.5.5](https://projects.eclipse.org/projects/technology.jgit/releases/4.5.5),
[4.7.7](https://projects.eclipse.org/projects/technology.jgit/releases/4.7.7),
[4.9.8](https://projects.eclipse.org/projects/technology.jgit/releases/4.9.8),
[4.11.6](https://projects.eclipse.org/projects/technology.jgit/releases/4.11.6),
[5.1.5](https://projects.eclipse.org/projects/technology.jgit/releases/5.1.5),
[5.2.1](https://projects.eclipse.org/projects/technology.jgit/releases/5.2.1)
+ Gerrit Code Review [2.9.5](https://www.gerritcodereview.com/2.9.html#295),
[2.10.8](https://www.gerritcodereview.com/2.10.html#2108),
[2.11.12](https://www.gerritcodereview.com/2.11.html#21112),
[2.12.9](https://www.gerritcodereview.com/2.12.html#2129),
[2.13.12](https://www.gerritcodereview.com/2.13.html#21312),
[2.14.18](https://www.gerritcodereview.com/2.14.html#21418),
[2.15.8](https://www.gerritcodereview.com/2.15.html#2158),
[2.16.2](https://www.gerritcodereview.com/2.16.html#2162),
[2.16.3](https://www.gerritcodereview.com/2.16.html#2163)
+ GitHub Enterprise [2.15.5](https://enterprise.github.com/releases/2.15.5/notes),
[2.14.12](https://enterprise.github.com/releases/2.14.12/notes),
[2.13.18](https://enterprise.github.com/releases/2.13.18/notes)
+ GitLab [11.6.5](https://about.gitlab.com/2019/01/17/gitlab-11-6-5-released/),
[11.6.4, 11.5.7 and 11.4.14](https://about.gitlab.com/2019/01/16/critical-security-release-gitlab-11-dot-6-dot-4-released/),
[11.6.3](https://about.gitlab.com/2019/01/05/gitlab-11-6-3-released/),
[11.6.2](https://about.gitlab.com/2019/01/03/gitlab-11-6-2-released/),
[11.6.1, 11.5.6 and 11.4.13](https://about.gitlab.com/2018/12/31/security-release-gitlab-11-dot-6-dot-1-released/),
[11.6](https://about.gitlab.com/2018/12/22/gitlab-11-6-released/)
+ GitKraken [4.2.0](https://support.gitkraken.com/release-notes/current)
+ GitHub Desktop [1.6.0](https://desktop.github.com/release-notes/)

## Other News

__Various__
* Security vulnerabilities in JGit and Gerrit:
  - [Gerrit issue 10201](https://bugs.chromium.org/p/gerrit/issues/detail?id=10201):
    When protocol v2 was enabled and used, Gerrit would make all refs visible to the
    calling user. Support for protocol v2 was removed in Gerrit 2.16.2, and the issue
    was fixed in JGit versions 5.1.5 and 5.2.1.
  - [Gerrit issue 10262](https://bugs.chromium.org/p/gerrit/issues/detail?id=10262):
    In protocol v0 stateless transport, it was possible to fetch anything that is
    pointed to by any ref (using fetch-by-sha1), as long as the attacker could guess
    the object name. The issue was fixed in JGit versions 4.5.5, 4.7.7, 4.9.8, 4.11.6,
    5.1.5 and 5.2.1, which were included in Gerrit versions 2.9.5, 2.10.8, 2.11.12,
    2.12.9, 2.13.12, 2.14.18, 2.15.8 and 2.16.3.
* [Outreachy](https://www.outreachy.org/) interns working on Git have been blogging about their internship:
  - [Tanushree Tumane's blog](http://tanu1596.blogspot.com/)
  - [Slavica Đukić's blog](https://slavicadj.github.io/blog/)
* AsciiDoc, the markup language used by [Git's manual and other documentation](https://git-scm.com/docs),
  will get [an official specification under the Eclipse Foundation](https://asciidoctor.org/news/2019/01/07/asciidoc-spec-proposal/).
* Google is [seeking open source projects for Google Summer of Code 2019](https://opensource.googleblog.com/2019/01/seeking-projects-for-gsoc-2019.html).
  The deadline to apply is February 6 at 20:00 UTC, chosen
  organizations will be announced on February 26.
  Git Development Community [is interested](https://public-inbox.org/git/CAP8UFD3Kt3dreMnfAdLiP2yc47kBLoVYCk-2yDw67OkujVY=Ew@mail.gmail.com/T/#m5568b147f03c0b2e9dc96843dc13e85f5b2f187f).
* [GitLab Serverless launched Dec. 22](https://about.gitlab.com/2018/12/11/introducing-gitlab-serverless/).
* [New year, new GitHub: Announcing unlimited free private repos and unified Enterprise offering](https://github.blog/2019-01-07-new-year-new-github/) (the former with up to three collaborators per repository).

__Light reading__
* [Git explained: Git Concepts and Workflows](https://docs.google.com/presentation/d/1IQCRPHEIX-qKo7QFxsD3V62yhyGA9_5YsYXFOiBpgkk/edit?usp=sharing) by Edwin Kempin
* [Gerrit explained: Gerrit Concepts and Workflows](https://docs.google.com/presentation/d/1C73UgQdzZDw0gzpaEqIC6SPujZJhqamyqO1XOHjH-uk/edit?usp=sharing) by Edwin Kempin
* [A tale of 132 e's](https://linuxwit.ch/blog/2018/12/e98e/) and [the [E]nd of eeeee](https://linuxwit.ch/blog/2018/12/everything-that-lives-is-designed-to-end/) by Iliana Weller, about [e30e/e98e](https://github.com/eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee) GitHub repository and its history
* [How to teach Git](https://rachelcarmena.github.io/2018/12/12/how-to-teach-git.html) by Rachel M. Carmena
* [How To Use Git: A Reference Guide](https://dev.to/digitalocean/how-to-use-git-a-reference-guide-6b6) by Lisa Tagliaferri from DigitalOcean
* [8 Productivity Tips for GitHub](https://dev.to/_darrenburns/8-productivity-tips-for-github-44kn) by Darren Burns
* [Something Someone Somewhere Uses... Sometimes](https://dev.to/benjaminadk/something-someone-somewhere-uses-sometimes-1kab) by benjaminadk, about [gitmoji](https://gitmoji.carloscuesta.me/)
* [A new free-software forge: sr.ht [LWN.net]](https://lwn.net/Articles/775963/) by Jake Edge; this service was covered in [previous edition of Git Rev News](https://git.github.io/rev_news/2018/12/19/edition-46/#other-news)
* [Monorepos: Please don’t!](https://medium.com/@mattklein123/monorepos-please-dont-e9a279be011b) by Matt Klein
  - [Monorepo: please do!](https://medium.com/@adamhjk/monorepo-please-do-3657e08a4b70), response by Adam Jacob
  - see also
    [Advantages of Monolithic Version Control](http://danluu.com/monorepo/) by Dan Luu
    ([Git Rev News: Edition #4](https://git.github.io/rev_news/2015/06/03/edition-4/)) and
    [Monorepos in Git](https://developer.atlassian.com/blog/2015/10/monorepos-in-git/?p) by Stefan Saasen
    ([Git Rev News: Edition #9](https://git.github.io/rev_news/2015/11/11/edition-9/))
  - and also [splitsh/lite](https://github.com/splitsh/lite) ([Git Rev News: Edition #16](https://git.github.io/rev_news/2016/06/15/edition-16/)) and
    [Lerna](https://lernajs.io/) ([Git Rev News: Edition #43](https://git.github.io/rev_news/2018/09/19/edition-43/)) tools for monorepos
* [Writing Good Commit Messages](https://medium.com/compass-true-north/writing-good-commit-messages-fc33af9d6321) by Ben Hoyt (2018)
* [Useful Tips for writing better Git commit messages](https://code.likeagirl.io/useful-tips-for-writing-better-git-commit-messages-808770609503) by Egwuenu Gift (2018)
* [1296: Git Commit -- explain xkcd](https://www.explainxkcd.com/wiki/index.php/1296:_Git_Commit) (2013)
* [How to manage binary blobs with Git](https://opensource.com/life/16/8/how-manage-binary-blobs-git-part-7) by Seth Kenlon (2016)
* [Migrating Internet Archive to Kubernetes](https://archive.org/~tracey/slides/kubecon/#/) -- slides from presentation at KubeCon 2018; slides [#35](https://archive.org/~tracey/slides/kubecon/#/35) and later are about how Git is used at [archive.org](https://archive.org/)

__Git tools and sites__

* [OneDev](https://onedev.io) Open source git server with unique features such as language aware code search and navigation, source/diff annotation for code discussion and comprehension, customizable issue field and workflow, write protection for branches/tags/files, etc.
* [gitmoji -- An emoji guide for your commit messages](https://gitmoji.carloscuesta.me/)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Gabriel Alcaras &lt;<gabriel.alcaras@telecom-paristech.fr>&gt;
with help from Johannes Schindelin, Robin Shen and David Pursehouse.
