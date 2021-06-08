---
layout: default
title: Hacking Git
---

The goal of this document is not to be a tutorial, but rather to
point to interesting material that has already been written.

The goal is also not to list all the articles about Git or its
internals. There are a lot of good resources, including free
[books](http://git-scm.com/book/en/v2/), about that elsewhere.

Contributions are welcome though! Please contact us on the Git Mailing
list (at [git@vger.kernel.org](mailto:git@vger.kernel.org)) or open an
issue or a pull request on our
[GitHub repo](https://github.com/git/git.github.io/) to discuss or
suggest improvements. Thanks!

## Building Git

* ["`INSTALL`"](https://github.com/git/git/blob/master/INSTALL)

* ["Installing from Source"](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git#_installing_from_source) in the Pro Git book

* [The top of the Makefile](https://github.com/git/git/blob/master/Makefile), for special "Makefile knobs"

## Understanding the Git code base

* ["A birds-eye view of Git’s source code"](https://git-scm.com/docs/user-manual#birdview-on-the-source-code) in the Git User’s Manual

* [Fabien Sanglar's Git Source Code Review](https://fabiensanglard.net/git_code_review/architecture.php)

* [Boost Your Programming Skills by Reading Git's Code](https://www.freecodecamp.org/news/boost-programming-skills-read-git-code/)

## Getting started hacking and contributing

* ["My First Contribution"](https://git-scm.com/docs/MyFirstContribution)

* ["My First Object Walk"](https://github.com/git/git/blob/master/Documentation/MyFirstObjectWalk.txt)

* [Matheus' tutorial](https://matheustavares.gitlab.io/posts/first-steps-contributing-to-git)

* ["Hacking Git"](https://git-scm.com/docs/user-manual#hacking-git) in the Git User's Manual

* ["`Documentation/technical`"](https://github.com/git/git/tree/master/Documentation/technical), technical documentation (also viewable at `https://git-scm.com/docs/<file-name-without-.txt>`)

* [Our General Microproject Information](https://git.github.io/General-Microproject-Information/) can help understand the process of contributing and find issues to work on.

## Conventions and processes

* ["`CodingGuidelines`"](https://github.com/git/git/blob/master/Documentation/CodingGuidelines)

* ["`SubmittingPatches`"](https://git-scm.com/docs/SubmittingPatches/)

* [Git for Windows' "Good commits"](https://github.com/git-for-windows/git/wiki/Good-commits)

## Development status

* [Junio's "What's cooking in git.git" emails](https://lore.kernel.org/git/?q=s%3A%22What%27s+cooking+in+git.git%22) list the status of various development topics.

* [Git's release calendar](https://tinyurl.com/gitCal) shows the planned release cycles, and the maintainer's planned offline time.

## Branching workflow

* ["A note from the maintainer"](https://github.com/git/git/blob/todo/MaintNotes)

* ["Large-Merging Workflows"](https://git-scm.com/book/en/v2/Distributed-Git-Maintaining-a-Project#_large_merging_workflows) in the Pro Git book

* [`gitworkflows`](https://git-scm.com/docs/gitworkflows) manual page

* ["How to maintain Git"](https://github.com/git/git/blob/master/Documentation/howto/maintain-git.txt)

* ["How the Creators of Git do Branching"](https://hackernoon.com/how-the-creators-of-git-do-branches-e6fcc57270fb), and the associated [gitworkflow](https://github.com/rocketraman/gitworkflow) repository

## Debugging

* [Git for Windows' Debugging Git](https://github.com/git-for-windows/git/wiki/Debugging-Git)

* [Launching GDB explanations in CodingGuidelines](https://github.com/git/git/blob/v2.27.0/Documentation/CodingGuidelines#L441-L445)

* [Philippe Blain's "Debugging Git" Gist](https://gist.github.com/phil-blain/17c67740bd26e66f4851fe0c07230ea4)

## Tests

* ["`t/README`"](https://github.com/git/git/blob/master/t/README)

* ["`t/perf/README`"](https://github.com/git/git/blob/master/t/perf/README)

## Community, getting help, mentoring

* [git-scm community page](https://git-scm.com/community)

* [web interface to #git-devel IRC channel on Libera Chat](https://web.libera.chat/#git-devel)

* [#git-devel IRC channel archive](https://colabti.org/irclogger/irclogger_logs/git-devel)

* [git-mentoring mailing list](https://groups.google.com/forum/#!forum/git-mentoring)

## Mentoring programs

* [Google Summer of Code](https://summerofcode.withgoogle.com/)

* [Outreachy](https://www.outreachy.org/)

* [General Application Information](https://git.github.io/General-Application-Information/)
