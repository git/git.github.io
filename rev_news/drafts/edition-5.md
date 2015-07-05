---
title: Git Rev News Edition 5 (July 8th, 2015)
layout: default
date: 2015-07-08 21:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 5 (July 8th, 2015)

Welcome to the fifth edition of [Git Rev News](http://git.github.io/rev_news/rev_news.html),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](http://git.github.io/rev_news/rev_news.html) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of June 2015.

## Discussions

<!---
### General
-->



### Reviews

* [Warning when charset conversion did not happen due to iconv compiled out](http://thread.gmane.org/gmane.comp.version-control.git/270952/)

Max Kirillov proposed a patch to warn when a conversion from a
character set to another character set could not happen because iconv
has not been compiled into Git.

Iconv is one of the few C libraries that people can compile either in
or out of Git. Most of the time though they choose to compile it in,
because it makes it possible to convert text, like commit messages,
between character sets, as long, of course, as the requested character
sets are installed on the system.

For example when one uses [git-am](http://git-scm.com/docs/git-am) to
create a commit from a patch sent in an email,
[git-mailinfo](http://git-scm.com/docs/git-mailinfo) is called to
extract from the email the information needed to create the
commit. When doing that git-mailinfo also by default tries to use
iconv to convert the commit message, the author name and the author
email from the email encoding to UTF-8.

Junio Hamano, the Git maintainer, replied to Max's patch with:

> I actually am OK if the user gets exactly the same warning between
> the two cases:
>
> - iconv failed to convert in the real reencode_string_len()
>
> - we compiled out iconv() and real conversion was asked.
>
> and this patch is about the latter; I do not think it is reasonable
> to give noise only for the latter but not for the former.

and later Junio explained:

> After all, if you had to convert between UTF-8 and ISO-2022-JP, the
> latter of which your system does not support, whether you use
> iconv-disabled build of Git or iconv-enabled build of Git, we pass
> the bytestream through, right?  Your patch gives warning for the
> former (which is a good starting point if we want to warn "user
> expected them to be converted, we didn't" case) but does not do
> anything to the latter, even though users of the iconv-disabled
> build is more likely to be aware of the potential issue (and are
> likely to be willing to accept that) than the ones with
> iconv-enabled build that runs on a system that cannot convert the
> specific encoding.

Hopefully Max will send an updated patch that will take Junio's
suggestion into account.


### Support

* [Visualizing merge conflicts after the fact](http://thread.gmane.org/gmane.comp.version-control.git/271738)

Eric Raible reported the following:

> Upon returning from a vacation, I was looking at what people had been
> up to, and discovered on merge in which a colleague had resolved a merge
> incorrectly.  It turns out that he has pushed *many* merges over the past
> year which had conflicts in my code, and now I don't trust any of them.
>
> So naturally I want to check each of them for correctness.
>
> I know about "git log -p -cc SHA -- path", but it really doesn't
> show just the conflicts so there's just too much noise in that output.
>
> I use kdiff3 to resolve conflicts, so I'm looking for a way to
> visualize these already-resolved conflicts with that tool.

Johannes Schindelin, aka Dscho, suggested the following shell script
to recreate the merge conflicts and then compare the resulting commit
with the existing one:

```bash
mergecommit=$1

# probably should verify that the working directory is clean, yadda yadda

# recreate merge conflicts on an unnamed branch (Git speak: detached HEAD)
git checkout $mergecommit^
git merge $mergecommit^2 ||
die "This merge did not have any problem!"

# compare to the actual resolution as per the merge commit
git diff $mergecommit
```

Michael J Gruber replied to Dscho that, as we often get this type of
request, it might be a good idea to better support the above.

Junio Hamano then pointed to
[a patch series from last September by Thomas Rast](http://thread.gmane.org/gmane.comp.version-control.git/256591)
that implements a new `--remerge-diff` option for `git log` to show
what a conflict resolution changed. Unfortunately, though the feature
looks promising at least to Michael, it looks like some more work is
needed to properly integrate this feature into Git.

Dscho, when he originally replied to Eric, also suggested the
following command to list all the merge commits created by one
colleague in the current branch:

```bash
git rev-list --author="My Colleague" --parents HEAD |
sed -n 's/ .* .*//p'
```

And Michael noticed that using the `--merges` option would be better
than using `sed` to filter the merge commits. Something like the
following could do it:

```bash
git rev-list --author="My Colleague" --parents --merges HEAD
```


* [Several date related issues](http://thread.gmane.org/gmane.comp.version-control.git/272658)

Right now `git log` supports the following date related options:

```
--date-order

--author-date-order

--date=(relative|local|default|iso|iso-strict|rfc|short|raw)
```

But H.Merijn Brand noticed two problems with those options.

First he found that dates shown by `git log --date=local` do not
respect the LC_TIME locale configuration.

Jeff King, aka Peff, replied:

> Right, we use our own routines for formatting the dates, and not
> strftime. And it probably should stay that way in general, as git's
> output is often meant to be parsed.
>
> That being said, I do not think it would be wrong to have a date-mode
> that just showed strftime("%c"), or some other arbitrary strftime
> string. You could then set log.date as appropriate for human
> consumption.

To that H.Merijn suggested the implementation of the following options
`--date=lc`, `--date=lc_time` and `--date=locale`.

The second issue H.Merijn reported was that `git log` with either
`--date-order` or `--author-date-order` does not order the commit by
date.

To that Peff replied:

> Correct. The documentation says:
>
>    --date-order
>      Show no parents before all of its children are shown, but otherwise
>      show commits in the commit timestamp order.
>
> [...]
>
> There is not a simple way to show commits in arbitrary order without
> respect to parentage. I think you'd have to do something like:
>
>   git log --format='%at %H' |
>   sort -rn |
>   cut -d' ' -f2 |
>   git log --stdin --no-walk

And H.Merijn said that the option names are misleading, and suggested
a gitk option for Peff's script.

It looks like no gitk option has been developed yet for the above, but
Peff sent [a patch series](http://thread.gmane.org/gmane.comp.version-control.git/272695)
to implement `--date=format:...` which can produce the same output as the
`--date=...` options H.Merijn suggested about his first issue.

As Peff's patch series uses [strftime()](http://pubs.opengroup.org/onlinepubs/007908799/xsh/strftime.html)
to process the format passed in `--date=format:...`, a discussion
about how to manage a potential strftime() failure when it is passed a
bogus format ensued.


* [New `git worktree` command](http://thread.gmane.org/gmane.comp.version-control.git/272949) (*written by Eric Sunshine*)

The linked-worktree facility allows multiple working directories to share a
single repository, with (typically) a different branch checked out in each
worktree. Introduced more than half a year ago to provide integrated and
platform-agnostic support for similar functionality long supplied by the
Unix-only and somewhat fragile `contrib/git-new-workdir` script,
linked-worktrees recently migrated to the *master* branch, but is not
yet part of any release.

Creation of linked-worktrees is accomplished via `git checkout --to <path>
<branch>`, and cleanup of leftover administrative files, after `<path>` is
deleted, is done with `git prune --worktrees`. However, a recent unrelated
change to `git prune` led to a
[discussion](http://thread.gmane.org/gmane.comp.version-control.git/272447/focus=272546)
that concluded that worktree-related maintenance functionality doesn't
belong in `git prune`.

Consequently, Nguyá»…n ThÃ¡i Ngá»c Duy submitted a
[patch](http://thread.gmane.org/gmane.comp.version-control.git/272949)
which introduces a new `git worktree` command, and relocates `git prune
--worktrees` functionality to `git worktree prune`.

Eric Sunshine then further fleshed out `git worktree` with a
[patch](http://article.gmane.org/gmane.comp.version-control.git/273032)
which relocates `git checkout --to` functionality to `git worktree new`.
A lengthy
[discussion](http://thread.gmane.org/gmane.comp.version-control.git/273032)
ensued, which eventually led to a second version, consisting of [23
patches](http://thread.gmane.org/gmane.comp.version-control.git/273316),
and which names the command `git worktree add`, rather than `git worktree
new`, and gives the documentation some needed attention.

Aside from documentation updates, several other user-visible changes arrive
with the second version. For instance, while preparing worktree-creation
functionality for the move from `git checkout` to `git worktree`, Eric
discovered and fixed a bug where `git checkout --to <path> HEAD~1` would
instead incorrectly checkout `HEAD~2` at `<path>`.

The second version also introduces convenience enhancements.  In
particular, the `<branch>` in `git worktree add <path> <branch>`, is now
optional. When omitted, a new branch is created automatically based upon
`<path>`, as if `-b $(basename <path>)` had been provided (where `-b
<new-branch>` creates a new branch). For example, given `git worktree add
../hotfix`, a new branch named *hotfix* is created and checked out into new
worktree `../hotfix`, as if `git worktree -b hotfix ../hotfix HEAD` had
been specified.

Finally, the question was
[raised](http://article.gmane.org/gmane.comp.version-control.git/273107)
whether `git checkout --ignore-other-worktrees` should be retired and `git
checkout --force` overloaded to subsume its duties, however, Junio was [not
thrilled](http://article.gmane.org/gmane.comp.version-control.git/273108)
by the idea.


## Releases

* [git-multimail](https://github.com/git-multimail/git-multimail) [1.1.0](https://github.com/git-multimail/git-multimail/releases/tag/1.1.0) was released. git-multimail is a tool to send notification emails for pushes to a git repository. It is also available in the `contrib/hooks/multimail/` directory of Git's source tree (version 1.1.0 will be distributed with Git 2.5).

* [Git for Windows 2.4.4.2 Release Notes](https://github.com/git-for-windows/build-extra/blob/fd821c12f/installer/ReleaseNotes.md)
* [Git for Windows 2.4.5.1 Release Notes](https://github.com/git-for-windows/build-extra/blob/125ac3d8e/installer/ReleaseNotes.md)
* [Git 2.4.5](http://git-blame.blogspot.de/2015/06/git-245.html)
* [Git 2.5-rc0 early preview](http://git-blame.blogspot.de/2015/06/git-25-rc0-early-preview.html)
* [jgit 4.0.0](http://dev.eclipse.org/mhonarc/lists/jgit-dev/msg02914.html)
* [jgit 4.0.1](http://dev.eclipse.org/mhonarc/lists/jgit-dev/msg02915.html)
* [libgit v.0.22.3](https://github.com/libgit2/libgit2/releases/tag/v0.22.3)
* [libgit v0.23.0-rc1](https://github.com/libgit2/libgit2/releases/tag/v0.23.0-rc1)
* [libgit v0.23.0-rc2](https://github.com/libgit2/libgit2/releases/tag/v0.23.0-rc2 )
* [objective-git from 0.8.2 till 0.8.5](https://github.com/libgit2/objective-git/releases/tag/0.8.2 )
* [rugged v0.23.0b4](https://github.com/libgit2/rugged/releases/tag/v0.23.0b4 )

 
## Other News

__Various__

* As part of a school project, Antoine DELAITE, Remi GALAN ALFONSO, Remi LESPINET, Guillaume PAGES and Louis-Alexandre STUBER, from [Ensimag](http://ensimag.grenoble-inp.fr/), contributed to Git. As a warm-up, they implemented a `am.threeWay` configuration variable to have `git am` use `-3` by default (will be in Git 2.5). Some patch series are being polished to allow `git bisect` to use an arbitrary pair of terms instead of `good` and `bad`, an improved management of list of addresses and aliases in the `--to`, `--cc` and `--bcc` options of `git send-email`, a more verbose output for `git status` when ran during a `rebase -i` session, and a safety feature for `git rebase` to avoid dropping lines by mistake in the todo-list.

* Both of the Git project [Google Summer of Code](http://www.google-melange.com/gsoc/document/show/gsoc_program/google/gsoc2015/about_page)
students, Paul Tan and Karthik Nayak have passed the midterm evaluation and are doing well. Karthik is working on
[unifying the implementations of `git branch -l`, `git tag -l`, and `git for-each-ref`](https://github.com/KarthikNayak/git/commits/ref_filter)
and Paul is working on [porting git-pull from shell to C](https://github.com/pyokagan/git/commits/pt/builtin-pull)
and on [porting git-am from shell to C too](https://github.com/pyokagan/git/commits/pt/builtin-am).


* [This Git repository contains the ~300 metro stations from Paris, by Vincent Barbaresi](https://github.com/vbarbaresi/MetroGit )
* [In this presentation Christian Couder will use examples from the development of IPFS, a new hypermedia protocol, and Git itself to show how to take advantage of all the test related features and techniques that Git provides and develops.](http://lccocc2015.sched.org/event/4c3e8531fd6cdd920807df23c5277400 )
* [Second version of the terminal based game that teaches users git commands](https://github.com/git-game/git-game-v2 )
* [YouTube talk by Richard Hipp - Git: Just Say No. A critical view from the competition.](https://www.youtube.com/watch?feature=player_detailpage&v=ghtpJnrdgbo#t=119 )


__Light reading__

* [Fun with "git blame -s"](http://git-blame.blogspot.de/2015/06/fun-with-git-blame-s.html)
* [Keeping a clean git history, by Mat McLoughlin](http://mat-mcloughlin.net/2015/06/27/keeping-a-clean-git-history/)
* [Improving on Git Flow: Code Reviews, by Doug Turnbull](http://opensourceconnections.com/blog/2015/06/29/improving-on-git-flow-code-reviews/)
* [What to know before transitioning your team to Git, an interview with Emma Jane Hogbin Westby by Rikki Endsley](http://opensource.com/business/15/7/interview-emma-jane-hogbin-westby-git)
* [A git choose-your-own-adventure! by Seth Robertson](https://sethrobertson.github.io/GitFixUm/fixup.html)
* [Utter Disregard for Git Commit History, by Zach Holman](http://zachholman.com/posts/git-commit-history/)
* [How to undo (almost) anything with Git, by Joshua Wehner](https://github.com/blog/2019-how-to-undo-almost-anything-with-git)
* [Ask HN: How do you version control your microservices?](https://news.ycombinator.com/item?id=9705098)
* [Auto-squashing Git Commits, by George Brocklehurst ](https://robots.thoughtbot.com/autosquashing-git-commits)
* [Unpacking Git packfiles, by Aditya Mukerjee (OK, maybe not _that_ light reading, this one)](https://codewords.recurse.com/issues/three/unpacking-git-packfiles/)
* [How to manage Git workflow and stay sane, by Armağan Amcalar](https://medium.com/@dashersw/how-to-manage-git-workflow-and-stay-sane-e32405e9dbf0)
* [GitHub takes a closer look at Europe ](https://github.com/blog/2023-a-closer-look-at-europe)

__Git tools and sites__

* [GitKraken is an "intuitive git client that doesn't suck"](http://www.gitkraken.com/)
* ["The Git interface you've been missingall your life"](http://gitup.co/)
* [An all new, unified GitHub desktop (not released at the time of writing)](https://desktop.github.com/)
* [ASFMirror is a collection of, and a guide for projects that are move from SourceForge to GitHub.](https://a-sf-mirror.github.io/)
* [Rewind: A small library of handy git analysis scripts roughly inspired by Gary Bernhardt's Destroy All Software screencasts](https://github.com/gilesbowkett/rewind)
* [Run meld or any git difftool to interactively stage changes. git-meld-index runs meld -- or any other git difftool (kdiff3, diffuse, etc.) -- to allow you to interactively stage changes to the git index (also known as the git staging area).](https://github.com/jjlee/git-meld-index)
* [Gogs(Go Git Service) is a painless self-hosted Git Service written in Go.](http://gogs.io/docs/intro/)
* [Integrating GIT commit flow with your own editor with ease. FastCommit focuses on the commit flow for improving the development cycle.](https://github.com/c9s/FastCommit)
* ['git inject' is a git alias (see code at the bottom). It is similar to 'git commit --amend', but it allows you to 'inject' your changes into commits further back in history (using 'rebase').](https://news.ycombinator.com/item?id=9705690)
* [Shell library to test your Unix tools like Git does ](http://mlafeldt.github.com/sharness)
* [With Eclipse Mars, there is now support for Git Flow directly from Eclipse.](http://eclipsesource.com/blogs/2015/06/22/git-flow-top-eclipse-mars-feature-3/)
* [New Git repositories hosting features on the Google Cloud Platform](https://cloud.google.com/tools/cloud-repositories/)
* [Gitgo provides Go functions for interacting with Git repositories. Unlike libgit2, which is written in C, Gitgo is written in pure Go,](https://github.com/ChimeraCoder/gitgo/)
* [Gkv is a simple git wrapper that allows you to use it as a kv store](https://github.com/ybur-yug/gkv)
* [Minimalistic git log based chat](https://github.com/oflisback/gitlogchat)
* [Gipeda the Git Performance Dashboard](https://github.com/nomeata/gipeda)
* [Handling large files in git via symlinks](https://github.com/cdunn2001/git-sym)
* [Pulla lets you pull code into all folder containing git projects ](https://github.com/shubhamchaudhary/pulla)


## Credits

This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt; and Nicola Paolucci &lt;<npaolucci@atlassian.com>&gt;,
with help from Eric Sunshine &lt;<sunshine@sunshineco.com>&gt;, Junio C Hamano, Matthieu Moy and Johannes Schindelin.
