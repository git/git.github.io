---
title: Git Rev News Edition 19 (September 14th, 2016)
layout: default
date: 2016-09-14 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 19 (September 14th, 2016)

Welcome to the 19th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of August 2016.

## Discussions

### General

* [git-series presentation at the LinuxCon North America](https://www.youtube.com/watch?v=68XsuXlWiWU&index=23&list=PLGeM09tlguZQyemL0Y5CdpEFrBs-hGGM8)

There were a significant number of Git related presentations at the
[LinuxCon North America 2016 in Toronto](http://events.linuxfoundation.org/events/linuxcon-north-america)
from August 22 to August 24, and they happened to be recorded:

  - [Who Authored the Kernel? Recovering Token-Level Authorship Information from Git by Daniel German](https://www.youtube.com/watch?v=iXZV5uAYMJI&index=4&list=PLGeM09tlguZQyemL0Y5CdpEFrBs-hGGM8), see also the [LWN article](http://lwn.net/Articles/698425/).
  - [Versions All the Way Down: Versioning Commits and Patches with Git-Series by Josh Triplett, Intel](https://www.youtube.com/watch?v=68XsuXlWiWU&index=23&list=PLGeM09tlguZQyemL0Y5CdpEFrBs-hGGM8).
  - [Tracking Huge Files with Git LFS by Tim Pettersen, Atlassian](https://www.youtube.com/watch?v=yuKAV5cCcTw&list=PLGeM09tlguZQyemL0Y5CdpEFrBs-hGGM8&index=24).
  - [Terrible Ideas in Git by Corey Quinn, FutureAdvisor](https://www.youtube.com/watch?v=Wr7ulql0Exo&index=25&list=PLGeM09tlguZQyemL0Y5CdpEFrBs-hGGM8).
  - [Git and Testing by your own Christian Couder](https://www.youtube.com/watch?v=TcgyVWBg8EQ&list=PLGeM09tlguZQyemL0Y5CdpEFrBs-hGGM8&index=26)

One of the most attended was Josh's presentation
([slides](http://events.linuxfoundation.org/sites/events/files/slides/git-series.pdf),
[video](https://www.youtube.com/watch?v=68XsuXlWiWU&index=23&list=PLGeM09tlguZQyemL0Y5CdpEFrBs-hGGM8))
about git-series. Josh had already
[announced git-series on the mailing list](https://public-inbox.org/git/20160729064055.GB25331@x/)
which had generated some amount of dicussion about how the different
efforts to store more data and metadata related to patch series using
git itself could collaborate.

In his talk Josh started by explaining the problems with the current
way of handling a patch series.

One problem is that when you get feedback, you have to rework your
patch series, so you create another version of your patch series. But
then what happens to the previous version of the series?

You have to keep it, because people can tell you that they liked
better what your previous version did, and because some people are
actually interested in the real history of your code.

You could use the reflog to keep it, but it is effemeral by default
and it is not easy to push or pull. You could also dig an email from
your sent-mail folder or a mailing list archive.

So a fundamental problem is that Git tracks only curated history
but we need more than that, we need the history of history.

`git submodule` could be used to track that but people generally have
a bad experience with `git submodule`. It's also possible to manage
patches outside Git. There are tools like for example quilt that can
be used for this purpose, but then you loose the power of working with
Git.

Another possibility is to use branches with version names like
feature-v1, feature-v2 and so on. But soon you could have names like
feature-v8-rebased-on-3-4-alice-fix and then "everybody who worked in
a corporate environment would feel right at home".

Such solutions anyway don't solve the problem of managing the cover
letter and the base commit which is the commit you started your patch
series from.

They also don't solve the problem of collaboration. One rule of
collaboration is to never rewrite published history, but then how do
you collaborate on history that needs rewritting?

Emailing patches back and forth is not a good solution for some kinds
of work like backporting a feature, preparing a distribution package,
rebasing stacks of patches sitting on top of upstream code.

'git-series' has been developed to fix all those problems. It tracks
the history of a patch series, and also tracks its cover letter and its
base.

Then josh gave a demo.

To create a series called "feature" based on v4.7, you would run for
example:

```
git series start feature
-> HEAD is now detached at fa8410b Linux 4.8-rc3
git checkout v4.7
-> HEAD is now at 523d939... Linux 4.7
git series base v4.7
-> Set patch series base to 523d939 Linux 4.7
vim README
git commit -a -m 'Change A'
vim README
git commit -a -m 'Change B'
git series status
-> On series feature
->
-> Initial series commit
-> Changes not staged for commit:
->   (use "git series add <file>..." to update what will be commited)
->
->         Added:         base
->         Added:         base
->
-> no changes added to commit (use "git series add" or "git series commit -a")
git series add series
git series add base
git series commit
-> [feature 5eca363] Initial version of feature
git series cover
-> Updated cover letter
git series commit -a -m "Add cover letter"
```

The following commands were also part of Josh's demo:

  - `git series log`
  - `git series rebase -i`
  - `git series rebase v4.8-rc3`
  - `git series format`                                   # to format patches like `git format-patch`
  - `git series req ~/remote-location/linux feature`      # to send a pull request like `git request-pull`
  - `git series checkout another-feature`                 # to work on another patch series

Then Josh went back to the presentation to talk about how git-series
works.

The internals are described in INTERNALS.md in the git-series repo.

After reviewing the Git objects (blobs, trees, commits, tags) and
refs, Josh noticed that trees can refer to commits and such an entry
in a tree is called a "gitlink". Gitlinks are already used by git
submodule. git-series uses them to track the series and the base.

One of the requirements for git-series was that every object
referenced by git-series has to be reachable by Git, otherwise it
might get deleted, and you want to be able to push and pull the
objects, but you can do this only if they are reachable.

The way git-series is implemented is that a series is like a branch
prefixed with 'git-series', for example:

  refs/heads/git-series/feature

This branch points to a commit for example called series-v2, that
itself has commit series-v1 as its first parent.

The tree pointed to by these commit has the following entries:

  - series:  a gitlink pointing to the top commit of the series
  - base:    a gitlink pointing to the base commit of the series
  - cover:   a blob containing the cover letter

The problem with this is that Git by default doesn't follow gitlinks
for reachability or push/pulls.

To fix that, an extra parent commit is added to the series-v1 and
series-v2 commits for reachability. git-series ignore that parent when
traversing the commits.

Josh then gave more "minor details" about how it works.

Your current branch is refered by HEAD and the current series is
refered by refs/SHEAD, in which 'refs/' is needed for reachability.

The working and staged states are respectively in:

  - refs/git-series-internals/working/feature
  - refs/git-series-internals/staged/feature

which both points to temporary commits. This is needed for
reachability of a not yet commited cover letter.

Then Josh talked about his experience designing and developing
git-series.

He found on multiple occasions that avoiding to need big errors
messages was a good strategy. Often a long and complex error messages
suggested he migth have a design flaw, so he redesigned to make the
error impossible.

One example of that is what happens when we detach from a series or
check out a new series with uncommited changes. First he had designed
git-series to use only one staged and working version for a
repository, so in this case he would have needed an error message to
explain that you could loose some data and perhaps something like
`git series checkout --force` to checkout anyway.

Then he realized that if each series had its own working and staged
version there would be no need for such an error message and for a
force option.

Another example is what happens when you have created a new series and
made some change to it, but have not yet commited anything, and you
want to detach from it or checkout a new series.

Git has the notion of an "unborn branch", as, when you create a repo,
the "master" is created and HEAD points to it, but "master" doesn't
point to anything. This means many special cases.

Instead of having to write error messages when we detach from a series
or when we checkout another one, as soon as you start a series the
working and staged versions are created and a message says: "new no
commit yet". So unlike git you can create new series with nothing on
them yet.

Josh then explained that `git series rebase` was interesting to
implement because libgit2, which was used to implement git-series, has
no support for rebase.

Git saves state when it fails in the middle of a rebase and you have
to use `git rebase --continue` to continue when the problem has been
fixed.

So a temporary measure Josh used, while working on implementing rebase
in libgit2, is to write out all the necessary state that Git would
save if it failed, and then exec `git rebase --continue`. This way Git
resumes a rebase that it never started.

The last things Josh talked about are the tools he used to build
git-series. Josh used Rust and libgit2 with its Rust bindings. He
highly recommends libgit2 and Rust. He said libgit2 was essential and
is really effective to play with a repository.

git-series has been the project he used to learn how to use Rust. As
it is still a very young language, he had to submit patches to the
libgit2 Rust bindings and to a few other Rust libraries to make them
do what he needed. But it was really fun experience especially because
he didn't have to deal with memory management.

Next year the "LinuxCon" will be renamed "Open Source Summit" and in
North America it will happen in Los Angeles, September 11-13. Perhaps
the name change hints that it could become an even more relevant place
for Git related presentations.

<!---
### Reviews
-->

<!---
### Support
-->

## Releases


## Other News

__Various__


__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt; and
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt;, with help from XXX.
