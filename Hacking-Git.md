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

* ["`INSTALL`"](https://github.com/git/git/blob/master/INSTALL) to build using [Make](https://www.gnu.org/software/make/).

* ["`meson.build`"](https://github.com/git/git/blob/master/meson.build) to build using [Meson](https://mesonbuild.com/).

* ["Installing from Source"](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git#_installing_from_source) in the Pro Git book

* [The top of the Makefile](https://github.com/git/git/blob/master/Makefile), for special "Makefile knobs"

## Understanding the Git code base

* ["A birds-eye view of Git’s source code"](https://git-scm.com/docs/user-manual#birdview-on-the-source-code) in the Git User’s Manual

* [Fabien Sanglar's Git Source Code Review](https://fabiensanglard.net/git_code_review/architecture.php)

* [Boost Your Programming Skills by Reading Git's Code](https://www.freecodecamp.org/news/boost-programming-skills-read-git-code/)

## Getting started hacking and contributing

* ["My First Contribution"](https://git-scm.com/docs/MyFirstContribution)

* ["My First Object Walk"](https://github.com/git/git/blob/master/Documentation/MyFirstObjectWalk.adoc)

* [Matheus' tutorial](https://matheustavares.gitlab.io/posts/first-steps-contributing-to-git)

* [Eric Ju's "Contribute-to-Git: A beginner's Guide" wiki](https://gitlab.com/gitlab-org/git/-/wikis/Contribute-to-Git:-A-beginner's-Guide)

* ["Hacking Git"](https://git-scm.com/docs/user-manual#hacking-git) in the Git User's Manual

* ["`Documentation/technical`"](https://github.com/git/git/tree/master/Documentation/technical), technical documentation (also viewable at `https://git-scm.com/docs/<file-name-without-.txt>`)

* [Our General Microproject Information](https://git.github.io/General-Microproject-Information/) can help understand the process of contributing and find issues to work on.

## Conventions and processes

* ["`CodingGuidelines`"](https://github.com/git/git/blob/master/Documentation/CodingGuidelines)

* ["`SubmittingPatches`"](https://git-scm.com/docs/SubmittingPatches/)

* [Git for Windows' "Good commits"](https://gitforwindows.org/good-commits)

## Process related tools and sites

* [GitGitGadget](https://gitgitgadget.github.io/) makes it easy to send patches to the mailing list.

* [Sending patches by email with git](https://flusp.ime.usp.br/git/sending-patches-by-email-with-git/) is Matheus' git send-email tutorial.

* [lore.kernel.org/git](https://lore.kernel.org/git/) is our preferred mailing list archive.

* [public-inbox](https://public-inbox.org/README.html) is the software behind lore.kernel.org.

* [lore+lei](https://people.kernel.org/monsieuricon/lore-lei-part-1-getting-started) helps take advantage of lore/public-inbox.

* [b4](https://people.kernel.org/monsieuricon/introducing-b4-and-patch-attestation) helps work with patches posted on lore/public-inbox.

* [git-series](https://github.com/git-series/git-series) helps manage patch series.

* [git-publish](https://github.com/stefanha/git-publish) helps manage patch series.

* [git-related](https://github.com/felipec/git-related) finds people who might be interested in a patch.

* [git-phoenix](https://github.com/yaitskov/git-phoenix) does repository recovery.


## Development status, news and events

* [Junio's "What's cooking in git.git" emails](https://lore.kernel.org/git/?q=s%3A%22What%27s+cooking+in+git.git%22) list the status of various development topics.

* [Git's release calendar](https://tinyurl.com/gitCal) shows the planned release cycles, the maintainer's planned offline time, and possibly other events.

* [Git Rev News](https://git.github.io/rev_news/archive/) newsletter.

* [Git Merge conference](https://git-merge.com/).

* [Discussions about Contributor(s) Summits on the list](https://lore.kernel.org/git/?q=s%3AContributor*+Summit)

## Branching workflow

* ["A note from the maintainer"](https://github.com/git/git/blob/todo/MaintNotes)

* ["Large-Merging Workflows"](https://git-scm.com/book/en/v2/Distributed-Git-Maintaining-a-Project#_large_merging_workflows) in the Pro Git book

* [`gitworkflows`](https://git-scm.com/docs/gitworkflows) manual page

* ["How to maintain Git"](https://github.com/git/git/blob/master/Documentation/howto/maintain-git.adoc)

* ["How the Creators of Git do Branching"](https://hackernoon.com/how-the-creators-of-git-do-branches-e6fcc57270fb), and the associated [gitworkflow](https://github.com/rocketraman/gitworkflow) repository

## Debugging

* [Git for Windows' Debugging Git](https://gitforwindows.org/debugging-git)

* [Launching GDB explanations in CodingGuidelines](https://github.com/git/git/blob/v2.27.0/Documentation/CodingGuidelines#L441-L445)

* [Philippe Blain's "Debugging Git" Gist](https://gist.github.com/phil-blain/17c67740bd26e66f4851fe0c07230ea4)

* [Debugging test failure using gdb example](https://public-inbox.org/git/CAP8UFD3Bd4Af1XZ00VyuHnQs=MFrdUufKeePO1tyedWoReRjwQ@mail.gmail.com/)

## Tests

* ["`t/README`"](https://github.com/git/git/blob/master/t/README)

* ["`t/perf/README`"](https://github.com/git/git/blob/master/t/perf/README)

## Community, getting help, mentoring

* [git-scm community page](https://git-scm.com/community)

* [web interface to #git-devel IRC channel on Libera Chat](https://web.libera.chat/#git-devel)

* [#git-devel IRC channel archive](https://colabti.org/irclogger/irclogger_logs/git-devel)

* [Git Community Discord Server](https://discord.gg/NKY7fFue)

* [git-mentoring mailing list](https://groups.google.com/forum/#!forum/git-mentoring)

* ["A note from the maintainer"](https://github.com/git/git/blob/todo/MaintNotes)

## Mentoring programs

* [Google Summer of Code](https://summerofcode.withgoogle.com/)

* [Outreachy](https://www.outreachy.org/)

* [General Application Information](https://git.github.io/General-Application-Information/)
