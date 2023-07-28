---
title: Git Rev News Edition 101 (July 26th, 2023)
layout: default
date: 2023-07-26 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 101 (July 26th, 2023)

Welcome to the 101st edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of June 2023 and July 2023.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

<!---
### Support
-->


## Developer Spotlight: Martin Ågren

* Who are you and what do you do?

  I'm Martin Ågren. I live in Sweden, where I spend some of my spare time
  in the garden or tending to the bees to the best of my abilities. I also
  enjoy reading books and listening to music (not at the same time).

* What would you name your most important contribution to Git?

  The number of breathtaking features I've contributed is probably a
  one-digit number ending in a zero. That said, I think I've contributed a
  bit to the documentation by fixing some fairly ugly misrenderings, but
  also by aligning the way it's formatted by the two tools we support,
  asciidoc and asciidoctor. I guess we'll never know this for a fact, but
  there's a chance that I've saved someone's crontab by fixing a bug that
  would eat it. I'm very happy that I fixed that bug before it was ever
  included in a release.

* What are you doing on the Git project these days, and why?

  I'm mostly just tinkering. I very rarely feel like there's something
  actually missing from Git. I'm mostly trying to contribute in order to
  show that gratitude and to help others, without occupying too much
  bandwidth.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  Complete the hash function transition. brian m. carlson has done a
  tremendous job making sure there are these two parallel worlds, if you
  will. What's missing now is making them interoperable. This is not
  necessarily the biggest *problem* in current Git, but it could be
  something that won't be fixed by short-term, this-quarter,
  profit-maximizing actors, so if I could decree a team to work on that
  without having to worry about "return on investment" and such, I'd
  probably go for that.

* If you could provide users of Git with one piece of advise,
  what would it be?

  The one thought I would like to somehow convey to everyone using Git is
  to commit early, commit often. Whatever crap you have ever had in your
  working tree, there's an object containing it. Use `git reset --hard`,
  `git rebase`, `git cherry-pick`, whatever floats your boat, you will be
  able to bring it back and polish it up into a git history that looks
  like you knew what you were doing all along.

  I think this is really the point about Git: it teaches you how to
  pretend to be a good programmer, and once you start thinking of shaping
  your work like that, you actually might turn into one. Not because "fake
  it till you make it", that's just bullshit, but because you actually
  spend time approaching problems the right way and start thinking about
  how you present your solution.

  Your "solution" is then not just the state of the working tree ("look!
  it compiles and all the tests pass, so it must be good!"), but also how
  you got there, as a series of well-motivated incremental changes.

* What is your favorite Git-related tool/library, outside of
  Git itself?

  I'm a big fan of `tig`, especially `tig blame`. I simply never use `git
  blame`.  If I'm allowed to count `git/contrib` as "outside of Git
  itself", I'll be more than happy to recommend `git jump`. It's not
  especially sexy, but I probably use it every single day and I find it
  extremely helpful.

* Do you happen to have any memorable experience w.r.t contributing to
  the Git project? If yes, could you share it with us?

  I still sometimes think back to when I posted my first patch series to
  the list. Peff wrote "[...] I'm very impressed with the attention to
  detail for a first-time contributor.", to which Junio replied "Yes.".
  Of course, a part of even remembering that is vanity on my part, but I
  do think those two sentences are fairly representative of each of their
  communication styles. They also capture perfectly well the kind of
  review style that I wish a lot more projects used. You know, it is
  allowed to not just point out something that is wrong or could be
  better.

* What is your toolbox for interacting with the mailing list and for
  development of Git?

  For the list, it's gmail.com, lore.kernel.org/git, `git am`, `git format-patch`,
  `git send-email`. I keep thinking I should set up something
  more advanced, but for the limited volumes I'm handling, it's fine. For
  development of Git [and other stuff], it's Vim, `git diff`, `git add -p`,
  `git commit --amend`, `git rebase -i`, `git range-diff`, `tig blame`,
  `git jump` (grep,merge,diff) and ... maybe that's about it. Well, `git show`
  and `git log` of course. Please note the `-p` in `git add -p`. I would like
  to live in a world where no-one blindly does `git add . && git commit`.

* What is your advice for people who want to start Git development?
  Where and how should they start?

  Do something you enjoy doing. Of all the people born any given year, not
  even one of them, on average, will ever become president of the United
  States.  Don't do open source because it could land you a nice job
  somewhere, sometime.  Don't do Git development because it seems like a
  good investment. Do open source because you believe in it and see some
  random thing that you want to contribute to. If you don't see that,
  plant a flower instead and watch it grow.

  This obviously comes from someone who is privileged enough to be able to
  say "don't worry, be happy" and talk in metaphors about gardening. That
  said, I do think there's a difference in keeping bees and tending to
  them. You shouldn't want to keep them, you should want to help them do
  their thing. And if you want to help Git do its thing, great!

  Start by lurking on the mailing list to get a feel for how it works.
  Then do some small improvement, and avoid growing the scope too much.
  Sleep on your patch, review it yourself and iterate that process a few
  times before actually sending it off.


## Other News

__Various__
- A [Git community](https://programming.dev/c/git) has been created in the programming.dev Lemmy instance.

__Light reading__

<!---
__Easy watching__
-->

__Git tools and sites__


## Releases

+ Git for Windows [2.41.0(3)](https://github.com/git-for-windows/git/releases/tag/v2.41.0.windows.3),
[2.41.0(2)](https://github.com/git-for-windows/git/releases/tag/v2.41.0.windows.2)
+ libgit2 [1.7.0](https://github.com/libgit2/libgit2/releases/tag/v1.7.0)
+ GitLab [15.11.13](https://about.gitlab.com/releases/2023/07/27/gitlab-15-11-13-released/)
[16.2.1](https://about.gitlab.com/releases/2023/07/25/gitlab-16-2-1-released/),
[16.2](https://about.gitlab.com/releases/2023/07/22/gitlab-16-2-released/),
[15.11.12](https://about.gitlab.com/releases/2023/07/17/gitlab-15-11-12-released/),
[16.1.2, 16.0.7, and 15.11.11](https://about.gitlab.com/releases/2023/07/05/security-release-gitlab-16-1-2-released/),
[16.1.1, 16.0.6, and 15.11.10](https://about.gitlab.com/releases/2023/06/29/security-release-gitlab-16-1-1-released/)
+ Bitbucket Server [8.12](https://confluence.atlassian.com/bitbucketserver/bitbucket-server-release-notes-872139866.html)
+ Gerrit Code Review [3.6.6](https://www.gerritcodereview.com/3.6.html#366),
[3.7.4](https://www.gerritcodereview.com/3.7.html#374),
[3.8.1](https://www.gerritcodereview.com/3.8.html#381)
+ GitHub Enterprise [3.9.1](https://help.github.com/enterprise-server@3.9/admin/release-notes#3.9.1),
[3.8.6](https://help.github.com/enterprise-server@3.8/admin/release-notes#3.8.6),
[3.7.13](https://help.github.com/enterprise-server@3.7/admin/release-notes#3.7.13),
[3.6.16](https://help.github.com/enterprise-server@3.6/admin/release-notes#3.6.16),
[3.9.0](https://help.github.com/enterprise-server@3.9/admin/release-notes#3.9.0)
+ GitKraken [9.6.0](https://help.gitkraken.com/gitkraken-client/current/)
+ GitHub Desktop [3.2.7](https://desktop.github.com/release-notes/)
+ Tower for Mac [10.1](https://www.git-tower.com/release-notes/mac?show_tab=release-notes)
+ git-credential-oauth [0.9.1](https://github.com/hickford/git-credential-oauth/releases/tag/v0.9.1),
[0.9.0](https://github.com/hickford/git-credential-oauth/releases/tag/v0.9.0)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Bruno Brito.
