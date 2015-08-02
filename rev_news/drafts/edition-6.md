---
title: Git Rev News Edition 6 (XXX, 2015)
layout: default
date: 2015-08-05 21:06:51 +0100
author: tfnico
categories: [news]
navbar: false
---

## Git Rev News: Edition 6 (August 5h, 2015)

Welcome to the sixth edition of [Git Rev News](http://git.github.io/rev_news/rev_news.html),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](http://git.github.io/rev_news/rev_news.html) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of July 2015.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

### Support

* [git log fails to show all changes for a file](http://thread.gmane.org/gmane.comp.version-control.git/273937)

Working on the Linux kernel, Olaf Hering wondered why the following
command does not show all the commits that modified a function in the
given file:

```
git log -p -M --stat -- drivers/hv/channel_mgmt.c
```

and asked for a command that could show them all.

John Keeping replied that the change not shown by the above command
was added in an evil merge and suggested the following command, which
adds `--cc`, instead:

```
git log -p -M --stat --cc -- drivers/hv/channel_mgmt.c
```

Olaf thanked John, but said that the output from the above command is
rather useless. Andreas Schwab asked why and explained how to read the
output:

> ```
> - static void init_vp_index(struct vmbus_channel *channel, uuid_le *type_guid)
>  -static u32 get_vp_index(const uuid_le *type_guid)
> ++static void init_vp_index(struct vmbus_channel *channel, const uuid_le *type_guid)
> ```
>
> One branch renamed get_vp_index to init_vp_index, the other branch added
> the const attribute.  This hunk combines both changes.

Then Linus Torvalds explained the situation this way:

> That's not an evil merge. That's just a regular merge. One side had
> changed the argument to "const":
>
>  - 1b9d48f2a579 ("hyper-v: make uuid_le const")
>
> while the other side had renamed the function and added an argument,
> and changed the return type:
>
>  - d3ba720dd58c ("Drivers: hv: Eliminate the channel spinlock in the
> callback path")
>
> an "evil merge" is something that makes changes that came from neither
> side and aren't actually resolving a conflict.

Linus then started a discussion about wether the `-p` option in `git
log` should imply `--cc`:

> That said, I do wonder if we should just make "-p" imply "--cc". Right
> now we have the kind of odd situation that "git log -p" doesn't show
> merge patches, but "git show <cmit>" does show them. And you kind of
> have to know a lot about git to know the "--cc" option.

Linus, Junio and Jeff Kind tried to find a sensible way to improve on
this, but in the end it looks like nothing will be done as the new
behavior might have some drawbacks. Junio concluded the thread with:

> It just is that '-p', that clearly stands for 'patch' but does more
> than 'patch' to produce something that cannot be fed to 'apply' by
> defaulting to '--cc', makes me hesitate.  By making it a lot more
> convenient for experienced people who understand these issues, I
> have this suspicion that it would make the options less orthgonal
> and harder to explain to new people.


* [Git tag: pre-receive hook issue](http://thread.gmane.org/gmane.comp.version-control.git/274095)

Gaurav Chhabra reported that in his company they have [a script
launched by a pre-receive hook](http://pastebin.com/VnMQp5ar) in which
they use the following Git command to check if a given object is a tag
instead of a commit:

```
git describe --exact-match $sha1 2>&1 | grep -o fatal | wc -w
```

If the output of the command is 0, the script considers that $sha1 is
a tag.

Unfortunately it sometimes doesn't work and Gaurav, though
acknowledging that it's a bad implementation, wondered why.

Junio Hamano replied that commits that are pointed to by annotated
tags would be considered as tags, and wondered if that was on purpose
and asked why that would be wanted.

Junio also found something strange in an earlier part of the script
and suggested an alternative implementation.

Jacob Keller, aka Jake, agreed with Junio that it was not clear what
was really needed, and suggested that the problem might come from the
fact that, when the pre-receive hook that launches the script is run,
refs that are received have not yet been accepted, so `git describe`
cannot see them yet.

Agreeing with Jake, Junio replied to Gaurav with the following
description of what happens on the server when it receives a push:

> When you push a branch 'master' and a tag 'v1.0', these things
> happen in order:
>
>  (1) all objects that are necessary to ensure that the receiving
>      repository has everything reachable from 'master' and 'v1.0'
>      are sent to it and stored.  If the receiving end fails to store
>      this correctly, everything below is skipped and the operation
>      fails.
>
>  (2) pre-receive is run.  Notice that at this point, no refs have
>      been updated yet, so "describe" will not know v1.0 tag (if it
>      is a new one) exists.  But this step can assume that all new
>      objects are already accessible using their object name, so
>
>         case "$old" in
>         0000000000000000000000000000000000000000) range=$new ;;
>         *) range=$old..$new ;;
>         esac &&
>         git rev-list $range |
>         while read commit
>         do
>                 check $commit object, e.g.
>                 git cat-file commit $commit | grep FooBarId
>         done
>
>      is expected to work.
>
>  (3) for each ref being updated (in this case, refs/heads/master and
>      refs/tags/v1.0), the following happens:
>
>      (3-1) built-in sanity checks may reject the push to the ref,
>            e.g. refusing to update a checked out branch, refusing to
>            accept a non-fast-forward push that is not forced, etc.
>
>      (3-2) update-hook is run, which may reject the push to this
>            ref.
>
>      (3-3) the ref is updated (unless the push is atomic).
>
>  (4) if the push is atomic, the refs are updated.
>
>  (5) post-receive hook is run.  This is for logging and cannot
>      affect the outcome of the push.
>
>  (6) for each ref that was updated (in this case, refs/heads/master
>      and refs/tags/v1.0), post-update hook is run.  This is for
>      logging and cannot affect the outcome of the push.

and this opinion about the problematic command:

> As your requirement seems to be to validate any and all new commits,
> I think it is totally unnecessary to check if any of them happens to
> have a tag pointing at it in the first place.

Gaurav eventually said that the purpose of the problematic command was
only to check if a ref that is update is a tag. Jake then detailed how
to properly check in the hook that a ref being updated is a tag:

> To check whether the ref being updated is a tag, you need to check the
> 3rd parameter. pre-receive receives in the format
>
> <old-value> <new-value> <ref-name>
>
> so you need to check each line's 3rd value which is the ref-name being
> updated. If it's in refs/tags then it's a tag update. If it's not, you
> can check it as a branch update.

Gaurav thanked Junio and Jake for their support.

## Releases

* Git 2.5 is out! We'll leave it to the project maintainer, Junio C. Hamano, to [tell us what is new](http://git-blame.blogspot.de/2015/07/git-25.html). More elaborate release notes can be found [in the source](https://github.com/git/git/blob/master/Documentation/RelNotes/2.5.0.txt).
* GitLab keeps knocking out new versions, they're recently reached [7.13.2](https://about.gitlab.com/2015/07/28/gitlab-7-dot-13-dot-2-released/) in their stable train on top of the latest [7.13](https://about.gitlab.com/2015/07/22/gitlab-7-13-released/), displaying their new logo. 
* libgit2 v0.23.0 [is out](https://github.com/libgit2/libgit2/releases/tag/v0.23.0) with a wide range of improvements.
* Following the libgit2 release, Rugged was quick to follow suit with their own [v0.23.0](https://github.com/libgit2/rugged/releases/tag/v0.23.0), while objective-git reached [0.8.7](https://github.com/libgit2/objective-git/releases/tag/0.8.7), and pygit2 reached [v0.22.1](https://github.com/libgit2/pygit2/releases/tag/v0.22.1).

 
## Other News

__Light reading__

* A few days ago marked [the 10th anniversary of Junio becoming the maintainer](https://plus.google.com/u/0/+JunioCHamano/posts/EchiBhdBfQa) of the Git project. Congratulations!
* GitHub, probably the biggest Git hosting provider in the world, [raised $ 250 million](http://techcrunch.com/2015/07/29/github-raises-250m-series-b-round-to-take-risks/) in order "to accelerate growth and expand its sales and engineering team" and "to allow us to think bigger and take larger risks".
* For similar sounding reasons, GitLab [raised $ 1.5 million in a seed round](https://about.gitlab.com/2015/07/09/1.5M-raised-in-seed-funding-for-gitlab-to-accelerate-growth-and-expand-operations/) for their open source hosting option.
* We were all shocked to find out that [one in every 600 websites has .git exposed](http://www.jamiembrown.com/blog/one-in-every-600-websites-has-git-exposed/), as shared by Jamie Brown.
* The notorious Git mastermind of StackOverflow, VonC, explains [how to make use of the new `git worktree add` command that arrived with Git 2.5.
* Ilmari Kontulainen of Deveo provides us with a [current rundown of options for storing large files with(out) Git](http://blog.deveo.com/storing-large-binary-files-in-git-repositories/).
* Dealing with Git Merge Revisions, or [Zen and the Art of Git Chainsaw Maintenance](http://blog.jdwyah.com/2015/07/dealing-with-git-merge-revisions.html), by Jeff Dwyer.
* Jim Moore shared a quick tip on [how to view a deleted file in Git](http://blog.mooregreatsoftware.com/2013/12/13/viewing-deleted-git-content/).
* The not so light reading title this month is 'A Case of Computational Thinking: The Subtle Effect of Hidden Dependencies on the User Experience of Version Control', [a research paper from Google](https://static.googleusercontent.com/media/research.google.com/en/us/pubs/archive/42942.pdf) on the usability of version control systems
* We'll never get tired of the awesomeness of `git bisect`, so here is Kruno Knego [giving beginners a fresh introduction](http://krunoknego.com/2015/07/14/git-bisect/).
* Apparently Magit is such a great Git UI, that it's worth switching to Emacs just to get at it. Here's Nathan Willis [explaining what Magit 2.1 is all about](http://lwn.net/Articles/649535/) (to be honest, this section was staged using Vim/fugitive, sorry).
* Another use-case for the under-used Git notes: [marking test suite successes](http://who-t.blogspot.de/2015/07/using-git-notes-for-marking-test-suite.html), by Peter Hutterer.
* Don’t Fear the Rebase: [Git Garbage Collection and You](http://blog.carbonfive.com/2015/07/01/dont-fear-the-rebase-git-garbage-collection-and-you/), Chris Svenningsen helps us roll back after losing changes.
* The most commonly used (citation needed) [git tips and tricks](http://git.io/git-tips)
* Many of us think working with patch files is hard. Alexander Ross shows [why this need not be the case](http://aross.se/2015/06/22/create-and-apply-git-patch-files.html).

__Git tools and sites__

* There aren't enough great visual Git tools around. [Git for DiffPlug](https://www.kickstarter.com/projects/diffplug/git-for-diffplug) is a Kickstarter that aims to change this. Interestingly, it's [based on JGit](http://dev.eclipse.org/mhonarc/lists/jgit-dev/msg02942.html).
* Here's an LWN article on [Gogs](http://lwn.net/Articles/650145/), which claims to be A painless self-hosted Git service.
* [mingit](https://github.com/evansendra/mingit) is an extremely minified alias for git commands with tab completion.
* [AWS CodeCommit](https://aws.amazon.com/blogs/aws/now-available-aws-codecommit/) is Amazon's fresh attempt at providing Git hosting.
* [GitCompound](https://github.com/grzesiek/git_compound) allows you to compose your project using git repositories and Ruby tasks.
* Dan Feldman from Artifactory explains [how to use Artifactory to store Git LFS resources](http://www.jfrog.com/blog/use-the-right-tool-for-the-job-git-lfs-with-artifactory/). Might this be the first non-GitHub company announcing their support for Git LFS?
* Atlassian has relaunched their Git knowledge portal under the motto [Getting Git Right](https://www.atlassian.com/git/).
* [git-bottle](https://github.com/da-x/git-bottle) proposes to be a better stash.
* [gig](https://github.com/hackrslab/gig) is a command-line tool for quickly setting up .gitignore files. See also [gitignore.io](https://www.gitignore.io/).
*

## Credits

This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt; and Nicola Paolucci &lt;<npaolucci@atlassian.com>&gt;.
