---
title: Git Rev News Edition 35 (January 17th, 2018)
layout: default
date: 2018-01-17 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 35 (January 17th, 2018)

Welcome to the 35th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of December 2017.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

### Support

* [Need help migrating workflow from svn to git](https://public-inbox.org/git/20171214130933.GA18542@raven.inka.de/)

Josef Wolf first described his current workflow which uses Subversion
(SVN).

Josef has a number of machines that all have a working copy of the
same repository in a specific directory. A cron job updates the
working copies and then run scripts contained in the working copies.

When using `svn update` to update those copies, the changes made
locally on the machines are automatically merged with the upstream
changes, usually without conflicts.

Then Josef explained what would happen with Git:

> With git, by contrast, this won't work. Git will refuse to pull
> anything as long as there are ANY local modifications. The cron job
> would need to
> ```
> git stash
> git pull
> git stash pop
> ```
> But this will temporarily remove my local modifications. If I happen
> to do a test run at this time, the test run would NOT contain the
> local modifications which I was about to test.

Randall S. Becker suggested using `git fetch` instead of `git pull` to
be able to first tell if changes from upstream have to be applied to
the local copy, and also using a branch for each machine to better
track local changes and merge them with upstream changes.

Josef replied to Randall by asking for a way to "properly check
whether a merge is actually needed" as it looks like `git status` or
`git diff` are not very well suited for that purpose.

Igor Djordjevic, alias Buga, wondered about the possibility, in the
original workflow, of running scripts that are being worked on. Buga
also said that using `git stash` would probably have other issues, so
he suggested the "(scripted) creation of a temporary branch at fetched
remote branch position, and using something like
`git checkout --merge <temp_branch>` to merge ... local modifications
to latest changes fetched from remote".

In a later email Buga alternatively suggested "using
`git worktree add <temp_copy_path>` to create a temporary working tree
... alongside a temporary branch" and deleting those after having
committed, merged and pushed the local changes made there.

Josef replied to Buga that some potential issues Buga worried about
are not relevant when using SVN because of the specifics of his work,
while others are indeed relevant when using Git.

About the solutions Buga had suggested, Josef and Buga started to
discuss them, but at this point Junio Hamano, the Git maintainer,
suggested using just:

> ```
> git fetch <remote> <branch>
> git checkout -m -B <master> FETCH_HEAD
> ```

with:

> ```
> <remote> <branch>: the branch at the remote you are pulling from
> <master>: whatever branch you are using
> ```

After some tests and further discussion, Josef agreed that this was a
good solution. Buga also suggested using `git add -u` and `git reset`
after or before the above commands to avoid failures in case the
script runs many times and there are conflicts.


<!---
## Developer Spotlight:
-->

## Releases

* [Git v2.16.0-rc2](https://public-inbox.org/git/xmqqwp0nwwc6.fsf@gitster.mtv.corp.google.com/)
* [Git v2.16.0-rc1](https://public-inbox.org/git/xmqqbmi7ano1.fsf@gitster.mtv.corp.google.com/)
* [Git v2.16.0-rc0](https://public-inbox.org/git/xmqqfu7ui2af.fsf@gitster.mtv.corp.google.com/)
* [Git for Windows v2.16.0-rc2](https://public-inbox.org/git/nycvar.QRO.7.76.6.1801131931550.31@ZVAVAG-6OXH6DA.rhebcr.pbec.zvpebfbsg.pbz/)
* [GitHub Enterprise 2.12.2](https://enterprise.github.com/releases/2.12.2), [2.11.8](https://enterprise.github.com/releases/2.11.8), [2.10.14](https://enterprise.github.com/releases/2.10.14) and [2.9.19](https://enterprise.github.com/releases/2.9.19)
* [GitLab 10.3](https://about.gitlab.com//2017/12/22/gitlab-10-3-released/) and then [10.3.1](https://about.gitlab.com//2017/12/27/gitlab-10-3-1-released/), [10.3.2](https://about.gitlab.com//2017/12/28/gitlab-10-3-2-released/) and [10.3.3](https://about.gitlab.com//2018/01/02/gitlab-10-3-3-released/)
* [Bitbucket Server 5.7](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-5-7-release-notes-939918798.html)

## Other News

__Various__

* [Git London User Group: 16 January 2018](https://public-inbox.org/git/CA+WKDT3uKyEfzGvnkRUG7SEKy4ypz+Aa223UaVE8vyktcmgSvw@mail.gmail.com/): Edward Thomson announces the formation of the [Git London User Group](http://londongit.org/) and their first meeting on 16 January 2018.


__Light reading__

* Federico Kauffman blogs about [using git hooks to improve your day-to-day workflow](https://wyeworks.com/blog/2018/1/3/using-git-hooks-to-improve-your-day-to-day-workflow/).
* A short post for Emacs users who want to [narrow the author column in Magit](https://scripter.co/narrowing-the-author-column-in-magit/).
* [Master the Rebase (and the Other Way Around)](https://blog.algolia.com/master-git-rebase/) by Anthony Seure introduces `rebase` both as an alternative to `merge` and as a history rewriting tool. 
* A security write-up on [Git and escape sequences](https://www.twistlock.com/2017/12/13/hiding-content-git-escape-sequence-twistlock-labs-experiment/) by Ariel Zelivansky.
* Dan Palmer explains [how and why they teach non-engineers to use GitHub at Thread](https://thread.engineering/teaching-non-engineers-how-to-contribute-code-2e85411ab464).


__Git tools and sites__

* [GitPlex](https://www.gitplex.com/) is a tool to "browse code in git repository like in IDE".
* [FAC](https://github.com/mkchoi212/fac), a command line tool to fix merge conflicts, has been [discussed on Hacker News](https://news.ycombinator.com/item?id=16056271).
* [Git exercises](https://gitexercises.fracz.com/) helps you "learn and practice Git" with exercises to "rapidly become a Git Master". It has also [been discussed on Hacker News](https://news.ycombinator.com/item?id=16107981).
* [git-dissect: DIStributed biSECT](https://github.com/talshorer/git-dissect) is "an alternative to `git bisect` that allows running tests on multiple hosts in order to bisect faster".
* [git-pisect: Parallel regression finder](https://github.com/hoelzro/git-pisect) is "an alternative to `git bisect run` that uses multiple concurrent tests to try to finish a bisect more quickly", with an [explanatory blog post](https://hoelz.ro/blog/git-pisect).
* [go-git v4 was announced](https://blog.sourced.tech/post/go-git-v4/). [go-git](https://github.com/src-d/go-git) is "a highly extensible Git implementation in pure Go".
* [Real-world Git](https://trevordmiller.com/courses/real-world-git) is an hour-long video free course on Git basics.

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Gabriel Alcaras &lt;<gabriel.alcaras@telecom-paristech.fr>&gt;.
