---
title: Git Rev News Edition 23 (January 25th, 2017)
layout: default
date: 2017-01-20 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 23 (January 25th, 2017)

Welcome to the 23rd edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of December 2016.

## Discussions

### General

* [Gitview Shell Injection Vulnerability](https://public-inbox.org/git/20161227082922.8B7A813893D@mail.altsci.com/)

Javantea reported on the list:

> I have found a shell injection vulnerability in contrib/gitview/gitview.

and:

> Gitview executes shell commands using string concatenation with user
> supplied data, filenames and branch names. Running Gitview and
> interacting with the user interface with a malicious filename or
> branch name in the current repository results in malicious commands
> being executed as the current user.

[gitview](https://github.com/git/git/tree/v2.11.0/contrib/gitview) is
a GTK based repository browser for git, according to its
documentation. It is part of the 'contrib' directory of the Git
codebase which contains scripts and utilities that are not maintained
by Junio Hamano and the developers on the Git mailing list. It looked
like its implementation in Python was indeed lacking.

Stefan Beller, while cc'ing Aneesh Kumar, the gitview author, replied:

> Maybe it's time for a spring cleanup and remove some old (dead?)
> projects from contrib?

Jeff King, alias Peff, agreed with Stefan saying that gitview "hasn't
had a substantive commit since 2007", so Stefan sent a patch that
removes gitview from the Git codebase.

Javantea, Peff and Junio all agreed that it was a good solution, but
Peff and Junio wanted to hear first from Aneesh before removing his work.
Aneesh sent his "Acked-by:" to agree with the change.

Following these events, Stefan sent a separate
[patch to remove git-convert-objects from the 'contrib' directory](https://public-inbox.org/git/20161228180205.29213-1-sbeller@google.com/).
This other tool "originally named git-convert-cache, was used in early
2005 to convert to a new repository format, e.g. adding an author
date."

Philip Oakley also recently sent a small
[patch series to update the git-gui and gitk documentation](https://public-inbox.org/git/20170112213240.7972-1-philipoakley@iee.org/)
as this documentation was referencing gitview and needed a few other improvements.

So it looks like a spring cleanup is indeed happening.


### Reviews

* [am: add am.signoff add config variable](https://public-inbox.org/git/1482946838-28779-1-git-send-email-ehabkost@redhat.com/)

Eduardo Habkost sent a short patch to add a "am.signoff" configuration
option to `git am`. This option would automatically add a
"Signed-off-by: author name <author_email@address>" line to the end of
the commit message, when `git am` creates a commit.

It looked like a very straightforward thing to do as the `--signoff`
command line option already does that, and many other command line
options like `--message-id` and `--3way` have configuration option to
automatically enable their action.

Stefan Beller agreed that it was a good idea, but asked for
documentation and a test, which Eduardo agreed to provide.

Eduardo indeed sent
[a version 2 of the patch](https://public-inbox.org/git/20161228183501.15068-1-ehabkost@redhat.com/)
with the requested improvements, and this version was then reviewed by
Stefan Beller, Andreas Schwab and Pranit Bauva.

Eduardo followed up with
[a version 3 of the patch](https://public-inbox.org/git/20161228225544.16388-1-ehabkost@redhat.com/).

But in the mean time Eric Wong replied to the original patch:

> I'm not sure this is a good idea.  IANAL, but a sign-off
> has some sort of legal meaning for this project (DCO)
> and that would be better decided on a patch-by-patch basis
> rather than a blanket statement.

By DCO, Eric refers to the [Developer Certificate of Origin](https://github.com/git/git/blob/master/Documentation/SubmittingPatches#L251-L301)
which is the reason why people are adding these "Signed-off-by:"
lines, also called "SoB". The DCO practice originates from the
[Linux kernel development](https://tinylab.gitbooks.io/elinux/content/en/dev_portals/Legal_Issues/Developer_Certificate_Of_Origin/Developer_Certificate_Of_Origin.html)
and is now used by many other projects.

Junio Hamano, the Git maintainer, agreed with Eric's reply, saying he
has been striving to avoid "adding more publicized ways to add SoB
without thinking" as it could be a legal risk for projects.

To the above Eduardo replied:

> This sounds completely reasonable to me. I now see that the
> config option was already proposed in 2011 and the same arguments
> were discussed. Sorry for the noise.

But Stefan replied to Junio saying that there is already the
"format.signOff" configuration to automatically add a SoB when using
`git format-patch` and that "thinking and typing things is orthogonal
(the more you type, doesn't imply that you think harder or even at
all)".

Junio though replied that "format.signOff" was a mistake that should
be corrected in the future.

Stefan then came up with a many steps plan to remove "format.signOff",
while saying he is not fully convinced it is bad, as he finds
"format.signoff" *very* useful.

As there has been no further discussion on this and removing
"format.signOff" does not look simple nor user friendly, the current
situation, which is a bit ackward, may last for a long time.

<!--- ### Support -->

## Releases

 * [What's new in Git for Windows 2.11?](https://blogs.msdn.microsoft.com/visualstudioalm/2016/12/01/whats-new-in-git-for-windows-2-11/) (this slipped through the net of RevNews #22)
* [rugged v0.25.1.1](https://github.com/libgit2/rugged/releases/tag/v0.25.1.1)
* [pygit v0.25.0](https://github.com/libgit2/pygit2/releases/tag/v0.25.0)
* [LibGit2Sharp v0.23.1](https://github.com/libgit2/libgit2sharp/releases/tag/v0.23.1)
* [libgit2 v0.25.1](https://github.com/libgit2/libgit2/releases/tag/v0.25.1)
* [JGit / EGit Release 4.6.0](http://dev.eclipse.org/mhonarc/lists/jgit-dev/msg03245.html)
* [GitLab 8.16 ](https://about.gitlab.com/2017/01/22/gitlab-8-16-released/) through security releases [8.16.1, 8.15.5, 8.14.7, and 8.13.12](https://about.gitlab.com/2017/01/23/gitlab-8-dot-16-dot-1-security-release/)

## Other News

__Events__

 * [Git Merge 2017: the full agenda is now live](https://github.com/blog/2294-git-merge-2017-the-full-agenda-is-now-live)

__Light reading__

* [When to make a Git Commit](https://dev.to/gonedark/when-to-make-a-git-commit)
* [The next billion programmers (won’t use Git)](https://medium.com/@gerstenzang/the-next-billion-programmers-wont-use-git-5e8b0ea57886#.xg5ptwuoe)
* [submodules vs. subtrees](https://andrey.nering.com.br/2016/git-submodules-vs-subtrees/)
* [The Universe of Discourse : Another Git catastrophe cleaned up](http://blog.plover.com/prog/git-tastrophe.html)
* [Your Git Log Should Tell A Story](http://www.mokacoding.com/blog/your-git-log-should-tell-a-story/)
* [How git-mediate made me stop fearing merge conflicts](https://medium.com/@yairchu/how-git-mediate-made-me-stop-fearing-merge-conflicts-and-start-treating-them-like-an-easy-game-of-a2c71b919984#.b52n3ysjw)

__Git tools and sites__

 * [qit ql - A git query language](https://github.com/cloudson/gitql)
 * [Git Repo Analysis - Scripts to identify possible culprits for slow/large repositories](https://github.com/larsxschneider/git-repo-analysis)
 * [git-test - A script for running automated tests across some commits and keeping track of the results](http://public-inbox.org/git/1341c01a-aca7-699c-c53a-28d048614bfe@alum.mit.edu/)
* [git-quick-stats - access various statistics in git repository](https://github.com/arzzen/git-quick-stats/)
* [git-map - execute git commands in multiple Git repositories](https://github.com/icefox/git-map)
* [git-snap-commit - take snapshots of your index.html as it changes from time to time](https://github.com/mnafees/git-snap-commit)
* [git-annex on peer to peer network with tor](https://git-annex.branchable.com/tips/peer_to_peer_network_with_tor/)
* [git-cinnabar - a remote helper to interact with mercurial repositories](https://github.com/glandium/git-cinnabar)
* [truffleHog - searches through git repositories for high entropy strings](https://github.com/dxa4481/truffleHog)
* [Archaeology Tool DeepGit](http://www.syntevo.com/deepgit/)
* [Gitea](https://gitea.io/en-US/) is a community managed fork of Gogs, a lightweight code hosting solution written in Go.

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt; and
Markus Jansen &lt;<mja@jansen-preisler.de>&gt;
with help from Lars Schneider, XXX.
