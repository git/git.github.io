---
title: Git Rev News Edition 17 (July 20th, 2016)
layout: default
date: 2016-07-20 21:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 17 (July 20th, 2016)

Welcome to the 17th edition of [Git Rev News](http://git.github.io/rev_news/rev_news.html),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](http://git.github.io/rev_news/rev_news.html) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of June 2016.

## Discussions

<!---
### General
-->


### Reviews

* [contrib/subtree: Remove --annotate](http://thread.gmane.org/gmane.comp.version-control.git/283340/)

Last January David Greene, who maintains git-subtree.sh, sent
[a patch series](http://thread.gmane.org/gmane.comp.version-control.git/283268/)
to remove the `--annotate` option from `git subtree` and then
[a version 2 of this patch series](http://thread.gmane.org/gmane.comp.version-control.git/283340/).

This came after previous work to add `--unannotate` some years ago
[in 2012](http://thread.gmane.org/gmane.comp.version-control.git/207341/) and
[in 2013](http://thread.gmane.org/gmane.comp.version-control.git/212954/focus=212961).

The reason why adding `--unannotate` has not been pursued is that it
is "difficult to define due to the numerous ways one might want to
specify how to edit commit messages". And `--annotate` is now
considered not well suited to rewriting commit messages compared to
other existing tools like `filter-branch`, `rebase -i` and
`commit --amend` that can be used afterwards.

Junio replied that the above is usually not a good enough reason to
remove a feature unless it can be shown that nobody is using it.

David then explained that he doesn't know how much `--annotate` is
used, but that he is willing to first deprecate it and then after some
time remove it.

He also explained that he is also working on a few other things "that
will involve slight semantic changes" and that he has a plan to move
`git subtree` out of the `contrib` subdirectory of the Git source tree
where it is currently and into the main area where there are all the
non contrib Git commands.

This change would possibly in the end move some of the maintenance
burden of `git subtree` from David to all the Git developers and
ultimately Junio, but David said that the changes he was planning
would remove some maintainance burden.

Junio agreed to the removal of `--annotate` and in another mail
detailed the historical purpose of the `contrib` area and what is
expected from code in this area:

> The contrib/ area was created back when Git was still young and we
> felt that it would be beneficial for building the community if
> contributions to non-core part were also included, encouraging
> developers whose strength are not necessarily in the core part to
> participate in various design-level discussions to grow the
> community faster.  Back then, we felt that an obscure standalone
> project outside Git that would help the Git-life of users have a
> much better chance of surviving (and eventually be polished) if we
> had them bundled, even if the code quality and stability were
> sub-par.
>
> Those young days are long gone.  A standalone tool that aims to help
> users' Git-life would not just survive but flourish with much more
> certainty, as long as the tool is good.  We have enough Git users to
> rely on words-of-mouth these days to ensure their success.
>
> That is why I am very hesitant to add new things to contrib/ these
> days.  It is very welcome thought that you are working on improving
> subtree, and eventually moving it out of contrib/.  From the point
> of view of the project, either moving up (to be part of the git core
> proper) or moving out (to become an independent project) is far more
> preferreable than the status quo so far that was staying in contrib/
> (without seeing much changes and slowly but steadily bitrotting).
>
> If the aspiration is to move up to exit, then the quality and
> stability expectation is basically the same as stuff in core, and we
> need to strive to keep it stable and high quality.

Recently David replied to the above:

> This is the strategy I was planning to pursue.  After extensive
> experience with git-subtree and some local enhancements I have in
> real-world work, I am convinced it is a great complementary tool to
> git-submodule.  It seems odd to me to have one in core and one not.

And David also detailled some of the work he plans to do on `git
subtree`.

### Support

* [Fwd: what is a snapshot](http://thread.gmane.org/gmane.comp.version-control.git/297701/)

Ovatta Bianca asked:

> I read in every comparison of git vs other version control systems,
> that git does not record differences but takes "snapshots"
> I was wondering what a "snapshot" is? Does git store at every commit
> the entire files which have been modified even if only a few bytes
> were changed out of a large file?

Philip Oakley answered:

> A snaphot is like a tar or zip of all your tracked files. This means it is
> easier to determine (compared to lots of diffs) the current content.
>
> Keeping all the snapshots as separate loose items, when the majority of
> their content is unchanged would be very inefficient, so git then uses, at
> the right time, an efficient (and obviously lossless) compression technique
> to 'zip' all the snapshots together so that the final repository is
> 'packed'. The overall effect is a very efficient storage scheme.

and pointed to [some documentation on Git's web site](https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain)
for "some good explanations".

Jeff King alias Peff explained how the relationship between Git
objects already makes things efficient:

> Each commit is a snapshot in that it points to the sha1 of the root
> tree, which points to the sha1 of other trees and blobs. And following
> that chain gives you the whole state of the tree, without having to care
> about other commits.
>
> And if the next commit changes only a few files, the sha1 for all the
> other files will remain unchanged, and git does not need to store them
> again. So already, before any explicit compression has happened, we get
> de-duplication of identical content from commit to commit, at the file
> and tree level.
>
> And then when a file does change, we store the whole new version, then
> delta compress it during "git gc", etc, as you describe.

And Jakub Narębski detailed the "loose" and the "packed" format.

## Releases

* Git [2.9.1](http://article.gmane.org/gmane.linux.kernel/2263540) (major release), followed by Git [2.9.2](http://article.gmane.org/gmane.linux.kernel/2267451) that fixes a regression on 32-bit and on Windows.
* Git for Windows [2.9.2](http://article.gmane.org/gmane.comp.version-control.git/299684) (major release, skipping 2.9.1).
* [nodegit/nodegit v0.15.1](https://github.com/nodegit/nodegit/releases/tag/v0.15.1)
* [libgit2/pygit2 v0.24.1](https://github.com/libgit2/pygit2/releases/tag/v0.24.1)
* [JGit/EGit Release 4.4.1](http://dev.eclipse.org/mhonarc/lists/jgit-dev/msg03176.html)
* [GitLab 8.9](https://about.gitlab.com/2016/06/22/gitlab-8-9-released/) and patches until [8.9.6](https://about.gitlab.com/2016/07/11/gitlab-8-dot-9-dot-6-released/)


## Other News

__Various__

* [New archives of the Git Mailing list have been announced](http://thread.gmane.org/gmane.comp.version-control.git/299195/) by Eric Wong.
* [An RFC about questions for "Git User's Survey 2016" has been posted](http://thread.gmane.org/gmane.comp.version-control.git/299032/) by Jakub Narębski.

__Light reading__

* [You should not blindly copy/paste `git clone` instructions from random websites](http://thejh.net/misc/website-terminal-copy-paste) by Jann Horn.
* [To push, to pull- to fetch, perchance to commit. Aye, there's the rub](https://github.com/ipfs/js-ipfs-examples/issues/1#issuecomment-229005498) by Richard Littauer.
* [A tutorial on how to use git submodule to share a model across multiple applications](https://github.com/NebuPookins/git-submodule-tutorial) by NebuPookins.
* [The Power of Git - Forge'it](https://blog.4ge.it/the-power-of-git/) by Caner Candan.
* [twenty years of free software -- part 7 git-annex](http://joeyh.name/blog/entry/twenty_years_of_free_software_--_part_7_git-annex/) a note from Joey Hess.
* [On the Matter of Beautiful git Diffs](http://nathanleclaire.com/blog/2016/06/28/on-the-matter-of-beautiful-git-diffs/) by Nathan LeClaire.
* [git fixup: --amend for older commits](https://blog.filippo.io/git-fixup-amending-an-older-commit/) by Filippo Valsorda.
* [Why Google Stores Billions of Lines of Code in a Single Repository](http://m.cacm.acm.org/magazines/2016/7/204032-why-google-stores-billions-of-lines-of-code-in-a-single-repository/fulltext) by Rachel Potvin and Josh Levenberg.
* [Parallelize Development Using Git Worktrees](https://spin.atomicobject.com/2016/06/26/parallelize-development-git-worktrees/) by Brian Vanderwal.
* [Permanently Remove Any Record of a File From git](https://chrisshort.net/permanently-remove-any-record-of-a-file-from-git/) by Chris Short.
* [Common Git Scenarios"](http://www.masukomi.org/talks/git_tips_talk/#/step-1) an interactive presentation by Masukomi A.K.A. Kay Rhodes.
* [Making open source data more available](https://github.com/blog/2201-making-open-source-data-more-available) by Arfon Smith for GitHub.


__Git tools and sites__

* [Cycligent GIT TOOL](https://www.cycligent.com/git-tool)
* [Mango: Git completely decentralised — Medium](https://medium.com/@alexberegszaszi/mango-git-completely-decentralised-7aef8bcbcfe6#.g2shzuxlp)
* [karandesai-96/yolog: Beautify your Git Logs](https://github.com/karandesai-96/yolog)

## Credits

This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt; and Nicola Paolucci &lt;<npaolucci@atlassian.com>&gt;,
with help from Jakub Narębski and Johannes Schindelin.
