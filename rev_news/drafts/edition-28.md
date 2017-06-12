---
title: Git Rev News Edition 28 (June 14th, 2017)
layout: default
date: 2017-06-14 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 28 (June 14th, 2017)

Welcome to the 28th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of May 2017.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->


### Support

* [git push recurse.submodules behavior changed in 2.13](http://public-inbox.org/git/CAE5=+KX57KM+6n9NpePw9KYPXFy7UH-WRgSwaJDnvRofYFXm7Q@mail.gmail.com/)

John Shahid sent an email saying:

> Currently with 2.13 you cannot run `git push --recurse-submodules=on-demand`
> if the parent repo is on a different branch than the sub repos, e.g. parent
> repo is on "develop" and sub-repo on "master".

John pointed to [a test case he had created](https://gist.github.com/jvshahid/b778702cc3d825c6887d2707e866a9c8)
to show the problem, and he also had bisected it to
[a recent commit by Brandon Williams](https://github.com/git/git/commit/06bf4ad1db92c32af38e16d9b7f928edbd647780)
that teaches `git push --recurse-submodules` to recursively propagate
the remote and refspec it is passed to the pushes performed in the
submodules.

Junio Hamano, the Git maintainer, couldn't tell from the report if the
new behavior was a regression or a good thing, so he asked Brandon
about his opinion on this.

Stefan Beller then explained that before Brandon's patch, Git "just
invoked `git push` in the submodule, assuming the user had setup a
remote tracking branch and a push strategy such that `git push` would
do the right thing".

John then described in more details the previous behavior:

> We have a parent repo on a branch called "develop" and a submodule on
> a branch called "master". Prior to git version 2.13 if we had an
> unpushed commit in the submodule and ran `git push origin develop --recurse-submodules=on-demand"
> git would happily push the "develop" branch of the parent repo and the
> "master" branch of the submodule

and the new one:

> After the change mentioned in my previous email, git would propagate
> the refspec from the parent repo to the submodule, i.e. it would try
> to push a branch called "develop" in the submodule which would error
> since no branch with that name exist in the submodule.

Brandon replied that:

> Yeah my patches would definitely break that kind of workflow because
> they assumed that if you actually provided a refspec + --recurse that
> you would want it propagated down.

Jonathan Nieder then replied to John's original email by explaining in
details the context of Brandon's patch, the goal of many of the recent
submodule patch series from Brandon and others being "to allow
thinking of a repository as a single unit, including submodules, most
of the time".

Jonathan also asked John:

> Can you say more about how this change affects you? Would you be able
> to push without a refspec, or do you e.g. have scripting that was
> relying on the existing loose behavior?

John replied that he "loves the idea of having tools treat the repo as
a unit", but he "thinks propagating the refspec when no refspec is
passed on the CLI is very surprising action that should be corrected".

He also wrote that pushing without a refspec would work for him (if no
refspec is propagated).

Unfortunately after that email at the end of May, it looks like not
much happened, so recently John replied to his own mail:

> bump. it's been a while and I'm still not clear what the next steps
> are. I'm happy to send a patch but I would like to get a consensus
> first.

* [git rebase regression: cannot pass a shell expression directly to --exec](http://public-inbox.org/git/CA+zRj8X3OoejQVhUHD9wvv60jpTEZy06qa0y7TtodfBa1q5bnA@mail.gmail.com/)

Eric Rannaud emailed the mailing list:

> It used to be possible to run a sequence like:
>
>   foo() { echo X; }
>   export -f foo
>   git rebase --exec foo HEAD~10
>
> Since upgrading to 2.13.0, I had to update my scripts to run:
>
>   git rebase --exec "bash -c foo" HEAD~10

Eric had bisected this to a commit that switched
[the interactive rebase to use the rebase--helper builtin](https://github.com/git/git/commit/18633e1a22a68bbe8e6311a1039d13ebbf6fd041).

An interactive rebase is usually a rebase that is passed the `-i` or
`--interactive` option, though the `--exec` option automatically
switches on an interactive rebase too.

The interactive rebase used to be implemented with a
"git-rebase--interactive.sh" shell script, but, since the commit that
Eric found, in most cases the interactive rebase would use the `git
rebase--helper` builtin command.

The `git rebase--helper` builtin command had been made by porting
shell code from "git-rebase--interactive.sh" to C.

Jeff King, alias Peff, replied to Eric that a `git rebase --exec STRING`
command still uses a shell to run STRING, but that the behavior change
may come from an optimization that was made in the prepare_shell_cmd()
function in "run-command.c" to skip shell invocations for "simple"
commands.

So Peff asked Eric to add an extraneous semi-colon in the STRING part
to confirm that the problem comes from the optimization, as, with a
semi-colon in it, the STRING part would not be considered a "simple"
command.

Peff then explained that the optimization in prepare_shell_cmd() is
quite old, but it affects `git rebase --exec` only now because it is
now using C code. And this optimization fails only when people are
using exported functions which is not so common, as not all shells
support them.

Peff also suggested, and later sent a patch, to look for BASH_FUNC_*
in the environment and disable the optimization in this case, though
that wouldn't work in all cases.

Junio Hamano replied to Peff, describing Peff's analysis as
"brilliant" and suggesting documenting the semi-colon trick.

Peff agreed with Junio on documenting it along with the optimization
to skip shell invocations for "simple" commands, if it was decided not
to try to fix the problem.

Meanwhile Johannes Schindelin, alias Dscho, who authored the patch
that made the interactive rebase use the rebase--helper builtin,
replied to Eric, saying that relying on exported functions to work in
`git rebase --exec` was relying on an implementation detail.

But Peff later disagreed with Dscho saying that the user "expected the
user-provided `--exec` command to be run by a shell, which seems like
a reasonable thing for Git to promise (and we already make a similar
promise for most user-provided commands that we run)".

Dscho also sent a long reply to Junio about the reason he has been
working on porting shell scripts like "git-rebase--interactive.sh" to
C, which contained the following:

> But the real truth is: shell scripting is not portable.
>
> Shell scripting is never only shell scripting, of course. A quite
> undocumented set of utilities is expected to be present for our scripts to
> run, too: sed, awk, tr, cat, expr, just to name a few.
>
> It does not end there. For example, sed is not equal to sed. BSD sed has
> different semantics than GNU sed, and we jump through hoops to try to
> ensure that our shell scripts run with both versions.

Eric then replied to Peff to "clarify if there was any doubt, the
semicolon trick does indeed work fine". He also asked for consistency
writing that with an exported foo function the current behavior was:

```
  git bisect run foo  # works
  git bisect run 'foo;'  # doesn't work

  git rebase --exec foo master^^  # fails
  git rebase --exec 'foo;' master^^  # OK
  git rebase --exec 'foo 1' master^^  # OK
```

In the meantime Jonathan Nieder, Brandon Williams and then Kevin Daudt
chimed in to discuss with Peff and Eric a suggestion by Peff to
"speculatively run `foo` without the shell, and if execve fails to
find it, then fall back to running the shell". They also discussed a
bit Peff's suggestion to look for BASH_FUNC_* in the environment, but
it was clear that both of these solutions had a number of problems.

Then Linus Torvalds chimed in too. He suggested to just lookup in
$PATH for the first word passed in the `--exec` string, as this test
is better than looking for special characters like semi-colons, to
decide if we can avoid calling a shell.

He also suggested using vfork() instead of fork() if we "really want
to optimize the code that executes an external program (whether in
shell or directly)".

It looks like Linus' suggestions might be the best indeed, but it
doesn't look like much has been done to implement them yet.

## Releases


## Other News

__Various__


__Light reading__

* [The largest Git repo on the planet](https://blogs.msdn.microsoft.com/bharry/2017/05/24/the-largest-git-repo-on-the-planet/)
* [Beyond GVFS: more details on optimizing Git for large repositories](https://blogs.msdn.microsoft.com/visualstudioalm/2017/05/30/optimizing-git-beyond-gvfs/)
* [Git’er done: SCM system keeps developers and projects on track](http://sdtimes.com/giter-done-scm-system-keeps-developers-projects-track/)
  an SDTimes article

__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt; and
Markus Jansen &lt;<mja@jansen-preisler.de>&gt;
with help from XXX.
