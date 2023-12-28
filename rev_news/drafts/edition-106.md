---
title: Git Rev News Edition 106 (December 27th, 2023)
layout: default
date: 2023-12-27 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 106 (December 27th, 2023)

Welcome to the 106th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of November 2023 and December 2023.

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

## Community Spotlight: VonC

_[VonC](https://stackoverflow.com/users/6309/vonc) is a
prolific contributor to the Git topic on Stack OVerflow. This edition features an
interview with them. Thanks to our [survey respondants](https://git.github.io/rev_news/2023/06/30/edition-100#some-statistics-about-the-ongoing-first-git-rev-news-readers-survey)
for suggesting to interview, VonC!_

* **Who are you and what do you do?**

  By day, I am information technology consultant working for a computer services
  company in France. By night, I am [VonC on Stack Overflow](https://stackoverflow.com/users/6309),
  and I contribute to various topics since its early days (Sept. 2008).
  I do that [every single day](https://meta.stackexchange.com/q/122976/6309).
  And it includes answering questions about Git: [almost 16K answer](https://stackoverflow.com/search?q=user:6309+[git])
  in 15 years.

* **What would you name your most important contribution to Git?**

  I do not contribute to Git directly, but I report on Stack Overflow
  any interesting [git/git commits](https://github.com/git/git/commits/master)
  which provide a new answer to old questions.

  I started in 2012 with questions like "[Squash the first two commits in Git?](https://stackoverflow.com/a/598788/6309)"
  and "[How do I remove a submodule?](https://stackoverflow.com/a/16162000/6309)".
  Then [1630](https://stackoverflow.com/search?page=33&tab=Newest&pagesize=50&q=user%3a6309%20%22see%20commit%22&searchOn=3)
  commits followed over the next decade.

* **Why answering questions about Git on Stack Overflow?**

  As I mentioned in "[**How to earn a million reputation on Stack Overflow: be of service to others**](https://stackoverflow.blog/2022/10/09/how-to-earn-a-million-reputation-on-stack-overflow-be-of-service-to-others/)",
  by **[Ryan Donovan](https://twitter.com/RThorDonovan)**, this is a way to
  give back to the community, and to learn in the process.

  I actually learn Git itself even before installing it, by answering a few
  questions on Stack Overflow, as I detailed in "[How'd you get started?](https://meta.stackexchange.com/a/367773/6309)".

* **If you could get a team of expert developers to work full time on something in Git for a full year, what would it be?**

  I mentioned in 2013/2016 the issue of [storing large files in Git repositories](https://stackoverflow.com/a/17897705/6309).

  But nowadays, I would work on the workflow side of Git, and how to make
  it easier to use for beginners. I follow [GitButler](https://docs.gitbutler.com/)
  and [Scott Chacon](https://twitter.com/chacon)'s work.

  > GitButler is rethinking everything between when you write code in your
  > editor of choice and when you push that code to GitHub for review. Why
  > are you making 'wip' commits when your SCM should be recording everything
  > for you? Why are everyone's commit messages close to useless? Why is
  > `git blame` the best way to get context on the code your team has written?
  > Why can't you seamlessly transition work between computers?

* **If you could remove something from Git without worrying about backwards compatibility, what would it be?**

  `git checkout`! It is time. As I [explained in 2020](https://stackoverflow.com/questions/58003030/what-is-the-git-restore-command-and-what-is-the-difference-between-git-restor#comment115524702_58003889),
  the `git switch`/`git restore` commands are "[experimental](https://github.com/git/git/commit/4e43b7ff1ea4b6f16b93a432b6718e9ab38749bd)"
  in name only, and are here to stay.


* **What is one of your most favorite features of Git?**

  Coming from CVS/SVN, one of my favorite features of Git is its powerful
  branching and merging capabilities. Branches in Git are lightweight and
  switching between them is fast, making it convenient to manage multiple
  streams of work simultaneously (and you have [`git worktree`](https://stackoverflow.com/a/30185564/6309)
  if you want to preserve your current working tree).

  I use those branches and merges with ["gitworkflow" (one word)](https://stackoverflow.com/a/57175304/6309),
  using long-lived integration branches (like "`master`/`main`/`release`"),
  and "ephemeral" integration branches (like "`public`/`next`/`devel`",
  created for a specific release cycle, then deleted and recreated for the
  next release cycle). See more at "[gitworkflow workflow](https://stackoverflow.com/a/53405887/6309)"
  and "[Handle Git branching for test and production](https://stackoverflow.com/a/44470240/6309)".

* **What is your favorite Git-related tool/library, outside of Git itself?**

  I often used [github.com/github/gitignore](https://github.com/github/gitignore)
  ("**A collection of .gitignore templates**"). I have also used and promoted
  [`git filter-repo`](https://github.com/newren/git-filter-repo), to
  [remove large files from a Git repository](https://stackoverflow.com/a/76300821/6309).

* **Could you brief a bit about one of your most memorable experience with Git?**

  As mentioned in "[How to earn a million reputation on Stack Overflow: be of service to others](https://stackoverflow.blog/2022/10/09/how-to-earn-a-million-reputation-on-stack-overflow-be-of-service-to-others/)",
  at the time I stumbled upon Git (2008/2009), I was managing big Rational
  ClearCase repositories of terabytes of data. The idea of cloning a *full* (Git)
  repository on my laptop was... incongruous, to say the least!

  I am aware of the all debate around monorepo vs. multirepo (which sometimes
  goes in hand with the debate around monolith vs. microservices), but I found
  in the subsequent years that working with multiple small Git repositories was
  much more manageable than working with a single large one, as I used to do
  before, using huge [ClearCase Vobs](https://www.ibm.com/docs/en/rational-clearcase/9.0.0?topic=clearcase-about-vobs-versioned-objects).

* **What is your advice for people who want to start using Git? Where and how should they start?**

  Start with understanding Git **branching**, and operations around branches
  (switch, merge, rebase, cherry-pick)

  For that, I always redirect people to "[Learn Git Branching](learngitbranching.js.org)"
  (`learngitbranching.js.org`): nothing to install, all exercices are done
  directly in the browser, and it is very visual.

  I also discourage people to blindly follow "[Git Branching Model](https://nvie.com/posts/a-successful-git-branching-model/)",
  where an integration branch like `develop` are merged to another integration
  one like `master`. See the links above for "gitworkflow" where I explain
  why one should merge to an integration branch, not from it: merging *from*
  it means you are merging *everything* currently integrated in that branch.
  If you want to "exclude" some of those integrated commits, that becomes a
  nightmare to manage.

* **There's a common conception that "Git is confusing". What are your thoughts about the same?**

  Right... you mean [XKCD 1597, Oct. 2015, "Git"](https://explainxkcd.com/wiki/index.php/1597:_Git)

  The level of integration of Git in IDEs (like Eclipse, IntelliJ, VSCode, ...)
  has made Git more accessible to beginners. I often redirect them to a combo
  VSCode + [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens),
  and that is enough to get them started.

  As long as the workflow is clearly defined, and the rebase is understood,
  for [managing pull request](https://stackoverflow.com/a/44672221/6309)
  (you rebase your local feature branch on top of the target branch,
  before force pushing it to the remote repository, [with lease](https://stackoverflow.com/a/52937476/6309)
  or [if-includes](https://stackoverflow.com/a/64627761/6309)), the users
  manage to get by. The bulk of my training is about that PR (Pull Request)
  workflow, which involves `git rebase` (`--onto`), and
  `git push --force-with-lease `or `--force-if-includes`.

  But clarifying *why* Git exist, where it comes from (I have younglings
  who have no idea who [Linux Torvalds](https://en.wikipedia.org/wiki/Linus_Torvalds)
  is, and his role in the [creation of Git](https://en.wikipedia.org/wiki/Git#History))
  can help. Git comes with a certain vision of how a VCS should work, and
  it has a lot to do with the way the Linux kernel is developed.

* **If there’s one tip you would like to share with other users of Git, what would it be?**

  Stop using `git checkout`, start using `git switch`/`git restore` instead!

_Editor's note: We hope you enjoyed this interview. We'll explore if we could
interview other such contributors who don't directly pariticipate in the mailing
list. If you have any suggestions, you're most welcome to share them with us through
[our issue tracker](https://github.com/git/git.github.io/issues) or by writing an
email to &lt;<kaartic.sivaraam@gmail.com>&gt;._

## Other News

__Various__


__Light reading__

<!---
__Easy watching__
-->

__Git tools and sites__


## Releases


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
