---
title: Git Rev News Edition 30 (August 16th, 2017)
layout: default
date: 2017-08-16 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 30 (August 16th, 2017)

Welcome to the 30th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of July 2017.

## Discussions

<!---
### General
-->

### Reviews

* [reftable: new ref storage format](https://public-inbox.org/git/CAJo=hJtyof=HRy=2sLP0ng0uZ4=S-DpZ5dR1aF+VHVETKG20OQ@mail.gmail.com/)

Shawn Pearce sent an email describing a new format to store refs. The
email started with:

> We've been having scaling problems with insane number of references
> (>866k), so I started thinking a lot about improving ref storage.
>
> I've written a simple approach, and implemented it in JGit.
> Performance is promising:
>
>   - 62M packed-refs compresses to 27M
>   - 42.3 usec lookup

This is not the first time that someone proposes a new format to store
refs, and Shawn summarized a previous attempt by David Turner:

> David Turner proposed [using LMDB](https://public-inbox.org/git/1455772670-21142-26-git-send-email-dturner@twopensource.com/), as LMDB is lightweight
> (64k of runtime code) and is licensed under a GPL-compatible license.
>
> A downside of LMDB is its reliance on a single C implementation. This
> makes embedding inside JGit (a popular reimplementation of Git)
> difficult, and hosting onto virtual storage (for JGit DFS) virtually
> impossible.
>
> A common format that can be supported by all major Git implementations
> (git-core, JGit, libgit2) is strongly preferred.

Shawn also referenced a previous proposal he had worked on:

> [JGit Ketch](https://dev.eclipse.org/mhonarc/lists/jgit-dev/msg03073.html) proposed [RefTree](https://public-inbox.org/git/CAJo=hJvnAPNAdDcAAwAvU9C4RVeQdoS3Ev9WTguHx4fD0V_nOg@mail.gmail.com/), an encoding of
> references inside Git tree objects stored as part of the repository's
> object database.

He describes the reftable format like this:

> A reftable file is a portable binary file format customized for
> reference storage. References are sorted, enabling linear scans,
> binary search lookup, and range scans.
>
> Storage in the file is organized into blocks.  Prefix compression
> is used within a single block to reduce disk space.  Block size is
> tunable by the writer.

There are a lot more details in his email and the proposal looked very
advanced.

Jeff King, alias Peff, was the first to reply to Shawn. He reviewed
the whole email and he summarized what he understood from Shawn's
proposal:

> The reftable file is a sequence of blocks, each of which contains a
> finite set of heavily-compressed refs. You have to read each block
> sequentially, but since they're a fixed size, that's still a
> constant-time operation (I'm ignoring the "restarts" thing for now). You
> find the right block by reading the index.

One of his concern was about updating refs:

> Updates are where things get dicier. It looks like you just write a new
> partial reftable file with your updates. And then if there are N
> reftables present, readers actually have to do a list-merge of the
> results they get from all of them (where the results from reftable.5
> trump ones from reftable.4).

and another one was about reflogs:

> One thing I didn't see is reflogs. They don't strictly have to be part
> of a ref-storage solution. But they do still consume at least one inode
> per ref in the current system.

But overall Peff seemed happy with the performance and the idea.

Stefan Beller replied to Peff. As Stefan works at Google with Shawn,
he had already discussed the proposal and gave more details about some
points Peff had commented on. He also suggested Shawn give "the whole
thing in BNF format from top down" starting with:

>   initial-block
>   content-blocks\*
>   (index-block)
>   footer

Peff replied to Stefan about some points especially regarding gzip
compression and agreed that "a high-level overview of the format would
have been nice".

Eric Wong then suggested using "an intrusive critbit tree" to store
refs as it could save space and speed up searching for a SHA-1.

Shawn replied to Stefan. He agreed about describing the format using
BNF from top down. About gzip compression he showed some numbers and
wrote:

> The reftable format (for 64k block, 256 restart) is within spitting
> distance (432 KB) of a default level gzip of packed-refs. We can get
> fast lookup, and OK compression.

Shawn also replied to Peff's first email. About reflog support, a
short subthread of the discussion started where Dave Borowitz chimed
in. The subthread concluded that the reftable format should indeed try
to support reflog entries.

About updating refs which was Peff's other big concern, Peff replied
to Shawn suggesting that each reftable points to previous
reftables. And then Shawn agreed that it "makes for a very safe atomic
reader view".

Peff eventually suggested to keep the list of reftables in a top-level
pointer file, and to rewrite that pointer file on update.

Johannes Sixt agreed with Peff concerns over updates in Shawn's
initial proposal saying:

> One of the failure modes is that on Windows a file cannot be deleted
> while it is open in any process. It can happen that a compacting updater
> wants to remove a reftable file that is still open in a reader.

Michael Haggerty also replied to Shawn's initial proposal. Michael
first asked if pseudorefs, like `HEAD`, `FETCH_HEAD`, should also be
stored in reftables, or only the references under `refs/`.

Micheal then commented on a lot of details. He suggested an algorithm
so that reference repacking can be done without blocking other
*writers*.

Shawn replied to Michael. He agreed to use what the suggested
algorithm to repack without blocking, but he was not sure about
storing pseudo refs in reftables.

Dave Borowitz and Junio Hamano, the Git maintainer, also commented on
parts of this discussion.

While the discussion was going on with Michael, Shawn posted a
[second version](https://public-inbox.org/git/CAJo=hJtTp2eA3z9wW9cHo-nA7kK40vVThqh6inXpbCcqfdMP9g@mail.gmail.com/)
of his proposal. It started with:

> Biggest changes from the first proposal are:
>
> - reflog is now integrated into reftable
> - block headers slightly different
> - Peff's stack management idea is used
> - Michael's compaction idea is used

The structure of the files was also better documented using the BNF.

Stefan was the first to reply, followed by Junio. Shawn then answered
all of their comments. One point that Stefan and Junio both raised was
how modification time was stored in the reflog.

Initially Shawn had planned to store them as seconds since the epoch
in a 32 bit integer, but that wouldn't have worked after 2038. So
Shawn agreed after also discussing with Michael to have them in an 8
byte field storing microseconds since the epoch which will work
"through year 9999".

Ævar Arnfjörð Bjarmason though chimed in to suggest using 64 bit
nanosecond resolution which would "only be good up until the year
2554", but has other benefits like keeping a one-to-one mapping
between file modification time and reflog entries and standardizing on
fewer time formats.

Shawn then posted [a third version](https://public-inbox.org/git/CAJo=hJvxWg2J-yRiCK3szux=eYM2ThjT0KWo-SFFOOc1RkxXzg@mail.gmail.com/)
of his proposal starting with the following:

> Significant changes from v2:
>
> - efficient lookup by SHA-1 for allow-tip-sha1-in-want.
> - type 0x4 for `FETCH_HEAD`, `MERGE_HEAD`.
> - file size up (27.7 M in v1, 34.4 M in v3)
>
> The file size increase is due to lookup by SHA-1 support. By using
> unique abbreviations its adding about 7 MB to the file size for
> 865,258 objects behind 866,456 refs. Average entry for this direction
> costs 8 bytes, using a 6 byte/12 hex unique abbreviation.

There were more comments from Stefan and Michael, which after short
discussions resulted in improvements. So Shawn posted
[a fourth version](https://public-inbox.org/git/CAJo=hJv7scc1L0_MdRkFeLAJGjYm2UkTFNOgj2e4+9Zj7KSiiQ@mail.gmail.com/)
starting with:

> Significant changes from v3:
>
> - Incorporated Michael Haggerty's update_index concept for reflog.
> - Explicitly documented log-only tables.
> - Magic changed to `'REFT'`
> - Symlinks now use type 0x3 with `"ref: "` prefix.
> - Ref-like files (`FETCH_HEAD`, `MERGE_HEAD`) also use type 0x3.
> - `restart_count` simplified, obj `block_count` simplified

This round led to a lot of discussion. Michael proposed another format
altogether. Junio commented on a few things and was worried about the
impact of the new format on clients were reading a single ref
currently need to open at most 2 files. Dave Borowitz asked about the
`git stash` implementation.

Michael's proposal started a significant subthread where Peff, Junio
and Dave chimed in.

Shawn recently posted [a 5th version](https://public-inbox.org/git/CAJo=hJsOHF0KVmXvbSBiBgxq4zRdt7v7sj_GuKvcpbu8tkujFA@mail.gmail.com/)
with the following changes:

> Significant changes from v4:
>
> - Supported Michael Haggerty's multi-level index.
> - Restart table now appears at start of block, instead of end.
> - The `restart_offset` is now 3-bytes, instead of 4-bytes.
> - Footer stores `obj_id_len` abbreviation used by obj blocks.
> - Clarified log-only files can exist.
> - Clarified use of `position` for byte in file, `offset` for byte in block.
> - Clarified *peeling*, and reference name encoding as bag of bytes.
> - Corrected extensions.reftable value to be `true`.

The comments on this round were mostly about LMDB, as Ævar found a
Java binding that could be used. These discussions involved Peff,
David Turner and Howard Chu, the Chief Architect of OpenLDAP and LMDB
creator.

It turned out that LMDB might not work well on NFS. Also Google (for
which Shawn is working) needs something that can be virtualized onto a
different filesystem in user space, and it looks like LMDB doesn't fit
this requirement.

So Shawn posted [a 6th version](https://public-inbox.org/git/CAJo=hJtg0PAVHT1phbArdra8+4LfnEEuaj3fBid==BXkZghi8g@mail.gmail.com/#r):

> Changes from v5:
>
> - `extensions.refStorage = reftable` is used to select this format.
> - Log records can be explicitly deleted (for refs/stash).
> - Log records may use Michael Haggerty's chained idea to compress before zlib.
>   This saved ~5.8% on one of my example repositories.

There were a few comments by Stefan, Peff and Junio, but it looks like
there is an overall agreement on the design at this point.

<!---
### Support
-->

## Developer Spotlight: Shawn Pearce

* Who are you and what do you do?

I am an open source developer who really loves working on developer
tools. I like making others more happy and productive, making it that
much easier for them to change the world.

* What would you name your most important contribution to Git?

Three things come to mind:  git fast-import, git gui, and the offshoot
projects I started: libgit2, JGit, EGit, Gerrit Code Review. Sorry,
it's hard to choose just one.

git fast-import format became the lingua franca of version control
systems, helping users to move history between CVS, Subversion, Hg,
Bazaar, BitKeeper, and of course Git. I originally created the format
to help Jon Smirl import the Mozilla repository from CVS into Git. It
was so versatile that its adoption has exploded.

git gui has stuck around as a compliment to the awesome gitk, helping
users to manage their working directory. I wound up abandoning the
project due to lack of time, but several others like Pat Thoyts
stepped in and continued fixing bugs. I love open source. :)

I'm most proud of establishing some offshoot projects: JGit, EGit and
Gerrit Code Review. These are 3 separate open source projects in their
own right, with their own communities of contributors and users.
Gerrit Code Review in particular has seen a lot of adoption in the
enterprise, and by only supporting Git, has certainly helped to bring
Git into many organizations.

* What are you doing on the Git project these days, and why?

I spend most of my time on JGit and Gerrit Code Review, but this past
month I started drafting a proposal for a new file format called
reftable, which I hope will replace the existing $GIT_DIR/refs and
$GIT_DIR/packed-refs with a more scalable format.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

This is a trick question! My $DAY_JOB at Google is to manage a team of
developers who work on JGit, Gerrit Code Review, and of course
git-core. Google has been investing in the Git ecosystem for many
years, and we look forward to continuing our contributions.

This year, part of my team has been working on two focus areas: git
submodule improvements (Stefan Beller, Brandon Williams) and lazy
clone (Jonathan Tan, Jonathan Nieder). For the latter project we've
also been working with Ben Peart, and his co-workers at Microsoft.

I'd like to see Git upgrade its hash function. SHA-1 has had a good
run for us, but it's time to start thinking about the next decade.
Jonathan Nieder has written an excellent proposal of how to make the
transition. I think it's a matter of implementation effort at this
point.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

The \!\*@\!\*\! wire protocol. The server speaks first with an ASCII
listing of all of its references is causing scaling bottlenecks for
enterprise uses.

There are plans afoot to fix this. Jeff "Peff" King has some ideas, as
does Jonathan Tan.

* What is your favorite Git-related tool/library, outside of Git itself?

[Gerrit Code Review](https://www.gerritcodereview.com/), of course. :)


## Releases

* Recent security vulnerabilities triggered the releases of [Git v2.14.1, v2.13.5, and others](https://public-inbox.org/git/xmqqh8xf482j.fsf@gitster.mtv.corp.google.com/T/)
* Git for Windows major release [2.14.0](https://github.com/git-for-windows/git/releases/tag/v2.14.0.windows.1) patched to [2.14.1](https://github.com/git-for-windows/git/releases/tag/v2.14.1.windows.1)
* GitLab major release [9.4](https://about.gitlab.com/2017/07/22/gitlab-9-4-released/) plus lots of patches up till the recent [9.4.4, 9.3.10, 9.2.10, 9.1.10, 9.0.13, and 8.17.8 Critical Security Release](https://about.gitlab.com/2017/08/10/gitlab-9-dot-4-dot-4-released/)
* Bitbucket Cloud: [4 new features in 4 weeks](https://blog.bitbucket.org/2017/07/27/4-features-in-4-weeks-heres-whats-new-in-bitbucket-cloud/)
* GitHub: [New function/method navigation](https://github.com/blog/2407-quickly-review-changed-methods-and-functions-in-your-pull-requests)

## Other News

__Various__

* Recurity's recent discovery of the SCM vulnerabilities: [Compromise On Checkout - Vulnerabilities in SCM Tools](http://blog.recurity-labs.com/2017-08-10/scm-vulns)
* Shawn Pearce explains [DFS reftable at Google](http://dev.eclipse.org/mhonarc/lists/jgit-dev/msg03389.html) for the JGit developers
* [Emacs and Magit](https://lwn.net/Articles/727550/), by Jonathan Corbet on LWN
* [Git grep multiline repos at once](https://www.alexkras.com/git-grep-multiline-repos-at-once/), by Alex Kras
* Old, but worth showing again: Interactive online [Learn Git Branching](http://learngitbranching.js.org/), by Peter M. Cottle
* [Drive Refactors with a Git Pre-Push Hook](http://gilesbowkett.blogspot.de/2017/08/drive-refactors-with-git-pre-push-hook.html), by Giles Bowkett
* [Using Advanced Rebase Features for a Clean Repository](https://mtyurt.net/2017/08/08/git-using-advanced-rebase-features-for-a-clean-repository/), by M. Tarık Yurt
* [Why Github can't host the Linux Kernel Community](http://blog.ffwll.ch/2017/08/github-why-cant-host-the-kernel.html), by Daniel Vetter
* [A set of best practices for JavaScript projects: Git](https://github.com/wearehive/project-guidelines#git), from Hive

__Light reading__

* Visual Studio's resources for learning Git: [What is Git? Tutorials and Best Practices](https://www.visualstudio.com/learn-git/)
* [15 Git Branch Command Examples to Create and Manage Branches](http://www.thegeekstuff.com/2017/06/git-branch/), by Ramesh Natarajan
* [Patch review and message brokers](https://rwmj.wordpress.com/2017/07/06/patch-review-and-message-brokers/), by Richard WM Jones: creating multi-machine test framework for emailed patches, using RabbitMQ message broker
* [The Git Parable](http://tom.preston-werner.com/2009/05/19/the-git-parable.html), by Tom Preston-Werner (2009)

__Git tools and sites__

* [remote-branch-housekeeping](https://github.com/hyperia-sk/remote-branch-housekeeping): Simple and efficient way to delete remote branches from git repository.
* [stagit](https://git.codemadness.org/stagit/file/README.html): static git page generator
* [git-books](https://github.com/ghrst/git-books): All books (free and non-free) that have been ever published about Git
* [Email2git](https://www.linux.com/blog/email2git-matching-linux-code-its-mailing-list-discussions): Matching Linux Code with its Mailing List Discussions
* [Data Version Control](https://dataversioncontrol.com/): Make your data science projects reproducible and shareable
  * And a related article: [How to Version Control your Machine Learning task](https://medium.com/towards-data-science/how-to-version-control-your-machine-learning-task-cad74dce44c4), by Kumar Shridhar
* [GitHub & BitBucket HTML Preview](http://htmlpreview.github.io/), given blob URL
* [Pass: The Standard Unix Password Manager](https://www.passwordstore.org/); several commands rely on or provide additional functionality if the password store directory is also a git repository (done with `pass git init`), with commmunity-provided [git credential helper integration](https://github.com/languitar/pass-git-helper)
* [exa - A modern replacement for ls](https://the.exa.website/) in Rust, with `--git` option to list each file's Git status

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt; and
Markus Jansen &lt;<mja@jansen-preisler.de>&gt;
with help from Stefan Beller &lt;<sbeller@google.com>&gt;
and Shawn Pearce &lt;<spearce@spearce.org>&gt;.

