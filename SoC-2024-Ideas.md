---
layout: default
title: SoC 2024 Ideas
navbar: false
---

![git logo >](https://git-scm.com/images/logos/downloads/Git-Logo-2Color.svg)

This is the idea page for Summer of Code 2024 for Git.

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

### Move existing tests to a unit testing framework

Git has a lot of test cases that need to be migrated to use a new unit
testing framework. This typically involves moving code from both:

  - a "t/helper/test-*.c" test helper in C, and
  - a "t/*.sh" test script in shell that invokes the test helper

over to a single "t/unit-tests/t-*.c" in C using the unit testing
framework.

Our Outreachy intern ported some of the unit tests.

**Note**: Owing to additional care needed to convert
reftable unit tests in `t0032-reftable-unittest.sh`,
it is covered as a separate project below.
So, this project solely focuses on unit tests _other than_
the reftable ones.

- See:

  - this discussion <https://lore.kernel.org/git/cover.1692297001.git.steadmon@google.com/>
  - <https://lore.kernel.org/git/20240112102743.1440-1-ach.lumap@gmail.com/>
  - <https://lore.kernel.org/git/20240205162506.1835-1-ach.lumap@gmail.com/>
  - <https://lore.kernel.org/git/20240112102122.1422-1-ach.lumap@gmail.com/>
  - <https://github.com/git/git/blob/master/Documentation/technical/unit-tests.adoc>

Expected Project Size: 175 hours or 350 hours

Difficulty: Medium

Languages: C, shell(bash)

Possible mentors:
* Christian Couder < <christian.couder@gmail.com> >
* Kaartic Sivaraam < <kaartic.sivaraam@gmail.com> >

### Convert reftable unit tests to use the unit testing framework

The "reftable" unit tests in `t0032-reftable-unittest.sh`
predate the unit testing framework that was recently
introduced into Git. These tests should be converted to use
the new framework.

See:

  - this discussion <https://lore.kernel.org/git/cover.1692297001.git.steadmon@google.com/>
  - <https://github.com/git/git/blob/master/Documentation/technical/unit-tests.adoc>
  - <https://git-scm.com/docs/reftable>

Expected Project Size: 175 hours or 350 hours

Difficulty: Low

Languages: C, shell(bash)

Possible mentors:
* Patrick Steinhardt < <ps@pks.im> >
* Karthik Nayak < <karthik.188@gmail.com> >
* Christian Couder < <christian.couder@gmail.com> >

### Implement consistency checks for refs

The git-fsck(1) command is used to check various data
structures for consistency. Notably missing though are
consistency checks for the refdb. While git-fsck(1)
implicitly checks some of the properties of the refdb
because it uses its refs for a connectivity check, these
checks aren't sufficient to properly ensure that all refs
are properly consistent.

The goal of this project would be to introduce consistency
checks that can be implemented by the ref backend. Initially
these checks may only apply to the "files" backend. With the
ongoing efforts to upstream a new "reftable" backend the
effort may be extended.

See:

  - <https://lore.kernel.org/git/6cfee0e4-3285-4f18-91ff-d097da9de737@rd10.de/>
  - <https://lore.kernel.org/git/cover.1706601199.git.ps@pks.im/>
  - <https://git-scm.com/docs/reftable>

Expected Project Size: 175 hours or 350 hours

Difficulty: Medium

Languages: C, shell(bash)

Possible mentors:
* Patrick Steinhardt < <ps@pks.im> >
* Karthik Nayak < <karthik.188@gmail.com> >

### Refactor git-bisect(1) to make its state self-contained

The git-bisect(1) command is used to find a commit in a
range of commits that introduced a specific bug. Starting a
bisection run creates a set of state files into the Git
repository which record various different parameters like
".git/BISECT_START". These files look almost like refs
due to their names being all-uppercase. This has led to
confusion with the new "reftable" backend because it wasn't
quite clear whether those files are in fact refs or not.

As it turns out they are not refs and should never be
treated like one. Overall, it has been concluded that the
way those files are currently stored is not ideal. Instead
of having a proliferation of files in the Git directory, it
was discussed whether the bisect state should be moved into
its own "bisect-state" subdirectory. This would make it more
self-contained and thereby avoid future confusion. It is
also aligned with the sequencer state used by rebases, which
is neatly contained in the "rebase-apply" and "rebase-merge"
directories.

The goal of this project would be to realize this change.
While rearchitecting the layout should be comparatively easy
to do, the harder part will be to hash out how to handle
backwards compatibility.

See:

  - <https://lore.kernel.org/git/Za-gF_Hp_lXViGWw@tanuki/>

Expected Project Size: 175 hours or 350 hours

Difficulty: Medium

Languages: C, shell(bash)

Possible mentors:
* Patrick Steinhardt < <ps@pks.im> >
* Karthik Nayak < <karthik.188@gmail.com> >
* Christian Couder < <christian.couder@gmail.com> >

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

Expected Project Size: 175 hours or 350 hours

Difficulty: Medium

Languages: C, shell(bash)

Possible mentors:
* Patrick Steinhardt < <ps@pks.im> >
* Karthik Nayak < <karthik.188@gmail.com> >
