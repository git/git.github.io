---
layout: default
title: SoC 2014 Ideas
---

This is the idea page for Summer of Code 2014. Please write up any
potential ideas here, and mention:

  1. A general description. What is the idea?

  2. What is the expected deliverable?

  3. What the student needs to know (C? Shell?) and the approximate
     difficulty.

  4. Possible mentors (this should generally be you, if you are
     proposing it. Please add a backup mentor if you can find one).

More guidance is available in the [GSoC FAQ](https://www.google-melange.com/gsoc/document/show/gsoc_program/google/gsoc2013/help_page#3._What_is_an_Ideas_list).

## Pack bitmap support for libgit2

Vicent Martí and Jeff King have open-sourced a patchset that implements JGit's pack-bitmap optimization on Core Git. Ironically enough, even through Vicent is the maintaner of libgit2, this feature is still not available in the library.

The goal of this SoC project would be to bring the imlementation from Core Git back to libgit2 and add new APIs that optimize commonly used operations using bitmaps.

Prospective mentors: Vicent Martí/Jeff King

## Abstracted reference backends in Git

libgit2 supports a C API to customize the way that the library interacts with the reference store when reading and writing references. There is no such abstraction in Core Git, and hence Git is only able to access references that are stored in the default format (either loose or in the packed-refs format).

The packed-refs format has been proven to be both racy and not sufficiently performant for huge repositories with many branches. It is however unfeasible to migrate away from it unless could support both the current packed-refs backend and a prospective new implementation simultaneously, through an abstracted API.

The goal of this SoC project is to refactor the existing references API of Core Git in order to support pluggable reference ackends, with the eventual goal of implementing a race-free reference store (i.e. based off an on-disk database store).

Prospective mentors: Michael Haggerty/Vicent Martí

