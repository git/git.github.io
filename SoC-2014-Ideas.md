---
layout: default
title: SoC 2014 Ideas
---

This is the idea page for Summer of Code 2014.

**Students**: Please consider these ideas as a starting point for
generating a proposal. However, we are also happy to receive proposals
for independent ideas related to Git.

## Pack bitmap support for libgit2

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

## Abstracted reference backends in Git

libgit2 supports a C API to customize the way that the library interacts
with the reference store when reading and writing references. There is
no such abstraction in Core Git, and hence Git is only able to access
references that are stored in the default format (either loose or in the
packed-refs format).

The packed-refs format has many problems, including race conditions,
lack of transactional semantics, and performance issues on repositories
with many refs.  It is however unfeasible to migrate away from it unless
we could support both the current packed-refs backend and a prospective
new implementation simultaneously, through an abstracted API.

The goal of this SoC project is to refactor the existing references API
of Core Git in order to support pluggable reference backends, with the
eventual goal of implementing a race-free reference store (e.g., based
off an on-disk database store).

 - Language: C
 - Difficulty: medium
 - Prospective mentors: Michael Haggerty / Vicent Martí

## Replace object loading/writing layer by libgit2

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

## Invent new conflict style

As an alternative to the diff3 conflict style, invent a conflict style
that shows the original unpatched segment along with the raw patch text.
The user can then apply the patch by hand.

 - Language: C
 - Difficulty: hard
 - Possible mentors: Ramkumar Ramachandra

## Improve triangular workflow support

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

## Refactor tempfile handling

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

## `git-bisect` improvements

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

## Unifying `git branch -l`, `git tag -l`, and `git for-each-ref`

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
