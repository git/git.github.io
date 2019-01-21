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

SZEDER Gábor also replied to Ævar saying that the `%h (%s, %ad)` is
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

* [Outreachy](https://www.outreachy.org/) interns working on Git have been blogging about their internship:
  - [Tanushree Tumane's blog](http://tanu1596.blogspot.com/)
  - [Slavica Đukić's blog](https://slavicadj.github.io/blog/)
* AsciiDoc, the markup language used by [Git's manual and other documentation](https://git-scm.com/docs),
  will get [an official specification under the Eclipse Foundation](https://asciidoctor.org/news/2019/01/07/asciidoc-spec-proposal/).

__Light reading__


__Git tools and sites__

* [OneDev](https://onedev.io) Open source git server with unique features such as language aware code search and navigation, source/diff annotation for code discussion and comprehension, customizable issue field and workflow, write protection for branches/tags/files, etc.

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Gabriel Alcaras &lt;<gabriel.alcaras@telecom-paristech.fr>&gt;
with help from Johannes Schindelin and Robin Shen.
