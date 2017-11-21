---
title: Git Rev News Edition 33 (XXX, 2017)
layout: default
date: 2017-11-15 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 33 (XXX, 2017)

Welcome to the 33rd edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of October 2017.

## Discussions

<!---
### General
-->


### Reviews

* [rebase: exec leaks GIT_DIR to environment](https://public-inbox.org/git/20171028000152.2760-1-jacob.e.keller@intel.com/)

Jacob Keller sent a patch adding a test that fails. He wrote in the
commit message that the git rebase interactive mode causes "exec"
commands to be run with GIT_DIR set. And that now running a git
command in a subdirectory fails because GIT_DIR=".git". He suspected
the regression was introduced in some recent rebase--helper changes to
speed up the interactive rebase and convert some shell scripts to C
code.

Johannes Schindelin, alias Dscho, replied to Jacob and suggested a fix
as well as a number of improvements in Jacob's patch. He also asked if
Jacob could take care of creating a proper patch for the fix. Jacob
agreed with Dscho's comments and to create a proper patch.

Phillip Wood then chimed to say that Dscho's suggested fix might not
be right:

> Just clearing GIT_DIR does not match the behavior of the shell version
> (tested by passing -p to avoid rebase--helper) as that passes GIT_DIR to
> exec commands if it has been explicitly set. I think that users that set
> GIT_DIR on the command line would expect it to be propagated to exec
> commands.

At that point Junio Hamano, the Git maintainer, Jacob and Phillip
started discussing the possible impact of the bug and if it was worth
delaying the release to get a chance to properly test a fix for some
time.

Then Dscho gave an explanation about where the bug could come
from:

> when you look at git_dir_init in git-sh-setup, you will see that
> Unix shell scripts explicitly get their GIT_DIR turned into an
> absolute path.

He then suggested a fix in the rebase--helper code in C that has
replaced the shell code in git-sh-setup. The fix is about turning the
content of the GIT_DIR environment variable into an absolute path
before running the exec command.

Jacob agreed again to create a proper patch from Dscho's fix and then
sent [a patch with Dscho's fix](https://public-inbox.org/git/20171031230733.18949-1-jacob.e.keller@intel.com/).
The patch has since been merged into the master branch.


### Support

* [Consequences of CRLF in index?](https://public-inbox.org/git/D0A67AD8-2D63-4683-9F2A-20B0E8E65D4B@gmail.com/)

Lars Schneider realized after migrating a large repository to Git that
"all text files in the index of the repo have CRLF line endings". He
then asked:

> In general this seems not to be a problem  as the project is developed exclusively on Windows.
>
> However, I wonder if there are any "hidden consequences" of this setup?

Jonathan Nieder answered:

> There are no hidden consequences that I'm aware of. If you later
> decide that you want to become a cross-platform project, then you may
> want to switch to LF endings, in which case I suggest the "single
> fixup commit" strategy.

He suggested though to declare explicitely all the files as non text
files in .gitattributes using the "-text" flag, so that Git will not be
tempted to change line endings.

Torsten Bögershausen agreed with Jonathan saying:

> If you don't specify .gitattributes, then all people who have
> core.autocrlf=true will suffer from a runtime penalty.

because:

> At each checkout Git needs to figure out that the file has CRLF in
> the repo, so that there is no conversion done.

and also:

> Those who have "core.autocrlf=false" would produce commits with CRLF
> for new files, and those developpers who have core.autocrlf=true would
> produce files with LF in the index and CRLF in the worktree.  This may
> (most probably will) cause confusion later, when things are pushed and
> pulled.

Lars thanked Jonathan for the idea of using the "-text" flag but
wondered about its implications saying:

> For whatever reason I always thought this is the way to tell
> Git that a particular file is binary with the implication that
> Git should not attempt to diff it.

To this Jonathan replied:

> No other implications.  You're thinking of "-diff".  There is also a
> shortcut "binary" which simply means "-text -diff".

Jonathan in his first email also asked his own related question:

> I'd be interested to hear what happens when diff-ing across a line
> ending fixup commit.  Is this an area where Git needs some
> improvement?  "git merge" knows an -Xrenormalize option to deal with a
> related problem --- it's possible that "git diff" needs to learn a
> similar trick.

To that, Torsten replied:

> That is a tricky thing.
> Sometimes you want to see the CLRF - LF as a diff, (represented as "^M"),
> and sometimes not.

Junio Hamano then also gave his "knee-jerk reaction" on this, saying
that "the end user definitely wants to see preimage and postimage
lines are different in such a commit by default, one side has and the
other side lacks ^M at the end" and also that when one does not want
to see those changes "one of the 'whitespace ignoring' options [...]
may suffice, but if not, it should be easy to invent a new one".

Junio then posted a sample patch to implement "--ignore-cr-at-eol".

Stefan Beller reviewed this patch which was further improved by Junio
and then discussed a few times, so that this new flag is likely to
appear is the next Git release.

A sub thread of the discussion started about making big changes to the
xdiff code that was originally "borrowed" from a separate open source
project. There was no clear result from this discussion though.

Johannes Sixt also replied directly to Lars' first email:

> I've been working on a project with CRLF in every source file for a
> decade now. It's C++ source, and it isn't even Windows-only: when
> checked out on Linux, there are CRs in the files, with no bad
> consequences so far. GCC is happy with them.

To that Johannes Schindelin, alias Dscho, replied:

> I envy you for the blessing of such a clean C++ source that you do
> not have any, say, Unix shell script in it.

and posted an example showing "Unix shell not handling CR/LF gracefully".

In a separate reply to Torsten's first email, Dscho also confirmed
that completely switching off line ending conversions can give "around
5-15% speed improvement".

A discussion then started about the merits of having an entry like
"*.sh text eol=lf" in the .gitattributes for shell scripts, compared
to having Git change strictly no file. In the end it looks like such an
entry could help, though there could be shell scripts that don't use the
".sh" extension.


## Developer Spotlight: Torsten Bögershausen

* Who are you and what do you do?

Originally a hardware developer, these days are filled with software
development for embedded systems.

* What would you name your most important contribution to Git?

The precomposeunicode feature for Mac Os was an important thing to go
cross-platform, but the Git users may have a different point of view.

* What are you doing on the Git project these days, and why?

The last years it was CRLF handling, also known as EOL or line ending.
Mainly because I am using it myself.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

The Git code base is in a pretty good shape.
Improve the on-disk or even over-the-wire protocol to include
information if a file is binary or text with CRLF. (2 bits).
Please let me know, when you have the team.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

`git checkout -b` is certainly good for experienced people,
hard to understand for beginners.
`git add -A` or `-all` is certainly my favorite thing to be removed...
Don't accept commit messages which are not unicode any more.
Remove the `core.autocrlf` from the code base, demand that people
set up a `.gitattributes` file on Windows.

* What is your favorite Git-related tool/library, outside of Git itself?

Probably Gerrit, even if I like the pull-request workflow which allows
people to collaborate.

## Releases

* Git [v2.15.0](https://public-inbox.org/git/xmqq60ax5fab.fsf@gitster.mtv.corp.google.com/)
* Git for Windows [2.15.0](https://github.com/git-for-windows/git/releases/tag/v2.15.0.windows.1) and [v2.14.3](https://github.com/git-for-windows/git/releases/tag/v2.14.3)
* nodegit [v0.20.3](https://github.com/nodegit/nodegit/releases/tag/v0.20.3)
* Gerrit [2.15](https://gitenterprise.me/2017/11/15/gerrit-user-summit-whats-new-in-2-15/) a summary from the recent Gerrit User Summit
* GitLab [10.1.4](https://about.gitlab.com/2017/11/15/gitlab-10-dot-1-dot-4-released/)

## Other News


__Various__

* Olga Telezhnaia's "Unifying Git's format languages" project has been accepted as part of the [December 2017 to March 2018 Outreachy internship round](https://www.outreachy.org/alums/). Olga will be mentored by Jeff King and Christian Couder.
* A useful ["pre-flight list" for Git](https://github.com/k88hudson/git-flight-rules)
* Microsoft and GitHub [cooperate on GVFS support](https://blogs.msdn.microsoft.com/devops/2017/11/15/updates-to-gvfs/) to help Git scale up to very large repositories.
* A lot of Microsoft's documentation (including MSDN) moved to `docs.microsoft.com`, [accepting contributions via Pull Requests on GitHub](https://docs.microsoft.com/en-us/contribute/help-crr/help-content/contribute/contribute-how-to-write-workflows-minor).
* 2 new episodes of the podcast All Things Git: [Git for Teams with Emma Jane Hogbin Westby](http://www.allthingsgit.com/episodes/git_for_teams_with_emma_jane_hogbin_westby.html) and [Learning Git and Human Factors with Sara Ford](http://www.allthingsgit.com/episodes/learning_git_and_human_factors_with_sara_ford.html)
* [Git Magic](https://crypto.stanford.edu/~blynn/gitmagic/) is an extensive and great guide on Git by Ben Lynn. Also on his site, you'll find the interesting article...
* [The git index race condition](http://www-cs-students.stanford.edu/~blynn/gg/race.html), also by Ben Lynn
* [Gerrit User Summit 2017 Talks going published on YouTube](http://tv.gerritforge.com), to allow everyone to stay up-to-date on what's new and what's coming on Gerrit in 2018.

__Light reading__

* Bloomberg recently hosted a [Git hackathon over a week-end in London](https://www.techatbloomberg.com/blog/git-sprint-weekend-bloomberg-london/)
* Two noteworthy tweets about Git: [even John McCormack struggles with Git](https://twitter.com/ID_AA_Carmack/status/929389759624916992?s=09), and [a suggestion that "Git is hard" should not be accepted as status quo](https://twitter.com/mcclure111/status/929408829485473792?s=09)
* [Welp, there go my Git signatures](http://karl.kornel.us/2017/10/welp-there-go-my-git-signatures/) due to the recently famous RoCa vulnerability, by Karl Kornel
* [Exploding Git Repositories](https://kate.io/blog/git-bomb/) is a neat and interesting experiment by Kate Murphy
* [Squash-merging and other problems with GitHub](https://blog.adamspiers.org/2017/08/16/squash-merging-and-other-problems-with-github/) by Adam Spiers

__Git tools and sites__

* [vimagit](https://github.com/jreybert/vimagit/) is a vim plugin
  "inspired from magnificent emacs
  [Magit](https://github.com/magit/magit) plugin".

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt; and
Markus Jansen &lt;<mja@jansen-preisler.de>&gt;
with help from Torsten Bögershausen, Johannes Schindelin,
Luca Milanesio and Jérôme Reybert.
