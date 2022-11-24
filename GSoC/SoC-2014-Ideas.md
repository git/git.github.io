---
layout: default
title: SoC 2014 Ideas
navbar: false
---

This is the idea page for Summer of Code 2014 for Git and libgit2.

## About applying for SoC with the Git project

It is strongly recommended that students who want to apply to the Git
project for the Summer of Code 2014 complete a tiny, code-related
"microproject" as part of their application.  Please refer to our
[guidelines and suggestions for microprojects](https://git.github.io/SoC-2014-Microprojects.html)
for more information.  Completing a microproject is not a strict
requirement, but we will definitely give more attention to applicants
who do so.  Doing a microproject will also help get you started in
the Git project and help you judge whether *you* want to work with
*us*.

## Summer of code main project ideas

**Students**: Please consider these ideas as starting points for
generating proposals.  We are also more than happy to receive
proposals for other ideas related to Git or libgit2.

### Pack bitmap support for libgit2

Vicent Martí and Jeff King have open-sourced a patchset that implements
JGit's pack-bitmap optimization on Core Git. Ironically enough, even
through Vicent is the maintainer of libgit2, this feature is still not
available in the library.

The goal of this SoC project would be to bring the implementation from
Core Git back to libgit2 and add new APIs that optimize commonly used
operations using bitmaps.

 - Language: C
 - Difficulty: medium
 - Prospective mentors: Vicent Martí / Jeff King

### Abstracted reference backends in Git

**Removed**.  Michael Haggerty is already working on this.

### Replace object loading/writing layer by libgit2

Git reads objects from storage (loose and packed) through functions in
`sha1_file.c`.  Most commands only require very simple, opaque read and
write access to the object storage.  As a weatherballoon, show that it
is feasible to use libgit2 `git_odb_*` routines for these simple callers.

Aim for passing the git test suite using `git_odb_*` object storage
access, except for tests that verify behavior in the face of storage
corruption, replacement objects, alternate storage locations, and
similar quirks.  Of course it is even better if you pass the test suite
without exception.

 - Language: C
 - Difficulty: hard
 - Possible mentors: Thomas Rast and Vicent Martí

### Invent new conflict style

As an alternative to the diff3 conflict style, invent a conflict style
that shows the original unpatched segment along with the raw patch text.
The user can then apply the patch by hand.

 - Language: C
 - Difficulty: hard
 - Possible mentors: Ramkumar Ramachandra

### Improve triangular workflow support

It is common in the git world to have a "triangular" workflow in which
commits are fetched from an upstream repository to the local
repository, and then pushed up to a personal publishing point. This
workflow is missing some convenience features, and there are many
possible projects in this area.

For example, `@{publish}` is a feature like `@{upstream}`, showing the
state of the publish-point in the case of triangular workflows.
Implement this while sharing code with git-push, and polish it until the
prompt shows publish-state.

 - Language: C, Shell
 - Difficulty: medium
 - Possible mentors: Jeff King / Ramkumar Ramachandra

### Refactor tempfile handling

When performing operations that fail, git typically writes to a
temporary file and then atomically moves it into place. During failures,
some of these temporary files may be left in place. This is convenient
for forensics, but inconvenient when the files are very large
(especially if the operation failed due to running out of disk space).
Refactor the handling of temporary packs and object files so that they
can optionally be cleaned up automatically. The implementation should be
shared with other files that are cleaned automatically, like lockfiles.

 - Language: C
 - Difficulty: easy
 - Possible mentors: Jeff King

### `git-bisect` improvements

The student will become familiar with the `git-bisect` command and
implement many small-to-medium fixes. Two examples:

  - an oft-requested feature is for `bisect` to swap the `good` and
    `bad` labels or to give them alternate names (for finding a fix
    rather than a regression). While this seems simple at the outset,
    there are many subtleties. The student will need to read and
    understand previous proposals in this area.

  - in some cases, `git bisect` may test too many merge bases, thus
    slowing down the bisection (making it closer to linear than
    logarithmic).

Students proposing projects in this area will be expected to communicate
with the Git community and include specific projects in their proposal.

 - Language: C, Shell
 - Difficulty: easy
 - Possible mentors: Christian Couder

### Unifying `git branch -l`, `git tag -l`, and `git for-each-ref`

These three commands are all about selecting a subset of a repository's
refs, and then printing the result. However, the implementations are not
shared. Some commands know selection options the others do not
(e.g., `--contains`, `--merged`), and others know formatting options the
others do not (e.g., `for-each-ref`'s `--format`).

There have been experimental patches to unify the selection process, and
some discussion on unifying the formatting. Based on this previous work,
factor out a common library which can cleanly handle both selection and
formatting, and use it consistently in the three commands.

 - Language: C
 - Difficulty: medium
 - Possible mentors: Jeff King
 
### Git server framework in libgit2

Libgit2 has support for the client side of the negotiation, but it's missing
server-side capabilities. We wouldn't want to simply reimplement `upload-pack`
or `receive-pack` but instead create the framework that takes care of the protocol
details and calls to user code for

- listing references
- deciding whether an update is acceptable
- possibly more

which would allow e.g. limiting which references are shown to a particular user or
make decisions about updates in the callbacks instead of script hooks.

- Language: C
- Difficulty: medium
- Possible mentors: Carlos Martín / Ed Thomson

### History repair tools

Sometimes git objects contain malformed or undesirable data. E.g.,
broken author emails, skewed dates, trees with duplicate filenames are
all malformed from git's perspective. Something like non-valid or
non-normalized UTF-8 in pathnames is not an error, but may violate
project policy.

Because git's data model is additive, fixing these problems requires
rewriting history to create new objects. Doing this with the current
toolset is possible, but requires a high degree of specialized
knowledge, and often requires running the slow and arcane `git
filter-branch`.

There are several possible improvements that can be made in this area,
including:

 - increase `git fsck` coverage of git data errors
 - teach `git fsck` to optionally note policy problems (like UTF8)
 - teach `hash-object` to perform stricter, fsck-like checks
 - write a tool to convert `fsck` errors into fixed `git replace` objects
 - write a tool to rewrite history based on `git replace`, cementing
   replacement objects into place

A successful project would not have to hit each of these points, but
should aim for producing a coherent workflow for non-experts to diagnose
and repair broken history.

 - Language: C, optional choice of scripting language
 - Difficulty: medium
 - Possible mentors: Jeff King / Michael Haggerty

### Line options for `git rebase --interactive`

One of the more powerful features in Git is the command `git rebase
--interactive`, which allows recent commits to be reordered, squashed
together, or even revised completely.  The command creates a todo list
and opens it in an editor.  The original todo list might look like:

    pick deadbee Implement feature XXX
    pick c0ffeee The oneline of the next commit
    pick 01a01a0 This change is questionable
    pick f1a5c00 Fix to feature XXX
    pick deadbab The oneline of the commit after

The user can edit the list to make changes to the history, for example
to

    pick deadbee Implement feature XXX
    squash f1a5c00 Fix to feature XXX
    exec make
    edit c0ffeee The oneline of the next commit
    pick deadbab The oneline of the commit after

This would cause commits `deadbee` and `f1a5c00` to be squashed
together into one commit followed by running `make` to test-compile
the results, delete commit `01a01a0` altogether, and stop after
committing commit `c0ffeee` to allow the user to make changes.

It would be nice to support more flexibility in the todo-list commands
by allowing the commands to take options.  Maybe

* Convert a commit into a merge commit:

  ```
  pick -p c0ffeee -p e1ee712 deadbab The oneline of the commit after
  ```

* After squashing two commits, add a "Signed-off-by" line to the
  commit log message:

  ```
  pick deadbee Implement feature XXX
  squash --signoff f1a5c00 Fix to feature XXX
  ```

  or GPG-sign a commit:

  ```
  pick --gpg-sign=<keyid> deadbee Implement feature XXX
  ```

* Reset the author of the commit to the current user or a specified
  user:

  ```
  pick --reset-author deadbee Implement feature XXX
  pick --author="A U Thor <author@example.com>" deadbab The oneline of the commit after
  ```

See [this
discussion](https://public-inbox.org/git/530DA00E.4090402%40alum.mit.edu/)
on the mailing list for more related ideas.

The goal of this project would be (1) to add the infrastructure for
handling options on todo-list lines, and (2) implement some concrete
options.  A big part of the difficulty of this project is that `git
rebase --interactive` is implemented via a sparsely-commented shell
script.  Adding comments and cleaning up the script as you go would be
very welcome.

 - Language: sh
 - Difficulty: medium
 - Possible mentors: Michael Haggerty

### git configuration API improvements

There are many places in Git that need to read a configuration value.
Currently, each such site calls `git_config()`, which reads and parses
the configuration files every time that it is called.  This is
wasteful, because it results in the configuration files being
processed multiple times during a single `git` invocation.  It also
prevents the implementation of potential new features, like adding
syntax to allow a configuration file to unset a previously-set value.

This goal of this project is to make configuration work as follows:

* Read the configuration from files once and cache the results in an
  appropriate data structure in memory.

* Change `git_config()` to iterate through the pre-read values in
  memory rather than re-reading the configuration files.  This
  function should remain backwards-compatible with the old
  implementation so that callers don't have to all be rewritten at
  once.

* Add new API functions that allow the cache to be inquired easily and
  efficiently.  Add helper functions to retrieve configuration values
  of various types (string, integer, boolean, etc.) from the cache by
  name.

* Rewrite callers to use the new API wherever possible.

You will need to consider how to handle other config API entry points
like `git_config_early()` and `git_config_from_file()`, as well as how
to invalidate the cache correctly in the case that the configuration
is changed while `git` is executing.

See [this mailing list
thread](https://public-inbox.org/git/53108650.2020708%40alum.mit.edu/)
and [this
email](https://public-inbox.org/git/20140306194654.GA28203%40sigill.intra.peff.net/)
for some discussion about this and related ideas.

 - Language: C
 - Difficulty: medium
 - Possible mentors: Michael Haggerty, Matthieu Moy, Jeff King
