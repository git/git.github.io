---
layout: default
title: SoC 2025 Ideas
navbar: false
---

![git logo >](https://git-scm.com/images/logos/downloads/Git-Logo-2Color.svg)

This is the idea page for Summer of Code 2025 for Git.

*Please completely read the [general application information](https://git.github.io/General-Application-Information)
page before reading the idea list below.*

## Summer of code main project ideas

**Students**: Please consider these ideas as starting points for
generating proposals. We are also more than happy to receive proposals
for other ideas related to Git. Make sure you have read the "Note
about refactoring projects versus projects that implement new
features" in the [general application information](https://git.github.io/General-Application-Information)
page though.

### Note about limit of project selection

Kindly note that considering the bandwidth of available mentors, the
Git project would only mentor up to 3 contributors this year.

This is not a hard and fast rule. It may change if more community members are
willing to mentor in the coming days. For instance, this may happen when
a new project is proposed and some community member volunteers to mentor
the same.


### Consolidate ref-related functionality into git-refs

This project aims to streamline Git's reference management into the existing
`git-refs` command by consolidating functionality currently spread
across multiple commands. The new command will provide subcommands for listing,
getting, checking existence, writing, and optimizing references, replacing the
functionality currently handled by git-update-ref(1), git-for-each-ref(1),
git-show-ref(1), and git-pack-refs(1).

The consolidation work should ensure backward compatibility with existing
commands. The work involves C programming in Git's codebase, creating
comprehensive tests, and updating documentation.

Required skills include C programming, familiarity with Git's codebase, and experience with command-line tool development. The project is expected to take 12 weeks, with existing commands being maintained for backward compatibility while development focuses on the new unified interface.

Getting started: Build Git from source, study the existing ref-related commands, and submit a micro-patch to demonstrate familiarity with the codebase.

_Expected Project Size_: 175 hours or 350 hours

_Difficulty_: Medium

_Languages_: C, shell(bash)

_Possible mentors_:

* Patrick Steinhardt < <ps@pks.im> >
* Jialuo She < <shejialuo@gmail.com> >
* Christian Couder < <christian.couder@gmail.com> >
* Ghanshyam Thakkar < <shyamthakkar001@gmail.com> >


### Refactoring in order to reduce Git's global state

This project focuses on modernizing Git's environment handling by refactoring
the `environment.c` code to reduce global state. The goal is to move environment
variables and configuration from global scope into more appropriate local
contexts, primarily into the `struct repository` / `struct repository_settings`
structure. This architectural improvement will make the codebase more
maintainable and potentially enable better multi-repository handling in the
future. The project involves careful refactoring of Git's core environment
handling code, requiring strong C programming skills and attention to detail.

The student will identify global variables that can be moved to local scope,
implement the necessary structural changes, and ensure all affected code paths
continue to work correctly. This includes updating tests, fixing any
regressions, and documenting the architectural changes. 

_Expected Project Size_: 90 or 175 hours or 350 hours

_Difficulty_: Medium

_Languages_: C, shell(bash)

_Possible mentors_:

* Patrick Steinhardt < <ps@pks.im> >
* Karthik Nayak < <karthik.188@gmail.com> >
* Jialuo She < <shejialuo@gmail.com> >
* Christian Couder < <christian.couder@gmail.com> >
* Ghanshyam Thakkar < <shyamthakkar001@gmail.com> >


### Machine-Readable Repository Information Query Tool

This project aims to create a new Git command dedicated to querying repository
metadata and configuration in a structured, machine-readable format. Currently,
much of this functionality exists within git-rev-parse(1), which has evolved
beyond its original purpose. The new command will provide a cleaner, more
focused interface for programmatically accessing repository information using
JSON output.

The student will design and implement this new command, focusing on identifying
what repository information should be exposed, designing a consistent JSON
schema, and implementing the necessary interfaces to Git's internal APIs. Key
challenges include determining which subset of information from git-rev-parse to
expose via this new command, ensuring backward compatibility, and creating a
clean, well-documented command interface that's useful for scripts and tools.

While this is an exploratory project that hasn't been extensively discussed in
the Git community, it addresses a real need for better programmatic access to
repository information.

_Expected Project Size_: 175 hours or 350 hours

_Difficulty_: Medium

_Languages_: C, shell(bash)

_Possible mentors_:

* Patrick Steinhardt < <ps@pks.im> >
* Karthik Nayak < <karthik.188@gmail.com> >
* Ghanshyam Thakkar < <shyamthakkar001@gmail.com> >


### Implement support for reftables in "dumb" HTTP transport

Fetching Git repositories uses one of two major protocols:

  - The "dumb" protocol works without requiring any kind of
    interactive negotiation like a CGI module. It can thus
    be served by a static web server.

  - The "smart" protocol works by having the client and
    server exchange multiple messages with each other. It is
    more efficient, but requires support for Git in the
    server.

While almost all servers nowadays use the "smart" protocol,
there are still some that use the "dumb" protocol.

The "dumb" protocol cannot serve repositories which use the
"reftable" backend though. While there exists a "info/refs"
file that is supposed to be backend-agnostic, this file does
not contain information about the default branch. Instead,
clients are expected to download the "HEAD" file and derive
the default branch like that. This file is a mere stub in
the "reftable" backend though, which breaks this protocol.

The goal of this project is to implement "reftable" support
for "dumb" fetches.

See:

  - <https://git-scm.com/docs/reftable>

**Note**: While both ideas are valuable, we prioritize the 'Consolidate ref-related
functionality into git-refs' proposal over support for reftables in "dumb" HTTP transport. If we receive applications for both
projects, preference will be given to applications focusing on the git-refs
consolidation work.

_Expected Project Size_: 175 hours or 350 hours

_Difficulty_: Medium

_Languages_: C, shell(bash)

_Possible mentors_:
* Patrick Steinhardt < <ps@pks.im> >
* Karthik Nayak < <karthik.188@gmail.com> >
