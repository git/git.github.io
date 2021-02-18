---
layout: default
title: Outreachy Winter 2020-2021 Applicant Microprojects
navbar: false
---

## Introduction

First make sure you read and understand
[our general guidelines and suggestions for microprojects](https://git.github.io/General-Microproject-Information).

There are some suggestions on how you can find some microprojects on your own in the document.

## Ideas for microprojects

### Add more builtin patterns for userdiff

"git diff" shows the function name corresponding to each hunk after
the @@ ... @@ line. For common languages (C, HTML, Ada, Matlab, ...),
the way to find the function name is built-in Git's source code as
regular expressions (see userdiff.c). A few languages are common
enough to deserve a built-in driver, but are not yet recognized. For
example, shell.

This project requires a very good knowledge of regular expressions.

It is easy though to find examples of how this can be done by
searching the code base and the mailing list archive, as this has
already been done for a number of languages.

### Use `test_path_is_*` functions in test scripts

Find one test script that verifies the presence/absence of
files/directories with 'test -(e|f|d|...)' and replace them with the
appropriate `test_path_is_file`, `test_path_is_dir`, etc. helper
functions.

If you can't find one please tell us, along with the command you used
to search, so that we can remove this microproject idea.

### Avoid pipes in git related commands in test scripts

See the commit
[c6f44e1da5](https://github.com/git/git/commit/c6f44e1da5e88e34)
for example, and then do the same thing in one other test script.

The git command should be on the left side of the pipe.

If you can't find one please tell us, along with the command you used
to search, so that we can remove this microproject idea.

### Use unsigned integral type for collection of bits.

Pick one field of a structure that (1) is of signed integral type and (2) is
used as a collection of multiple bits. Discuss if there is a good reason
why it has to be a signed integral field and change it to an unsigned
type otherwise.  [[thread](https://public-inbox.org/git/xmqqsiebrlez.fsf@gitster.dls.corp.google.com)]

Even though the amount of code to write is small, these projects
involve a lot of prior work to understand the specification and deal
with all potential corner-cases.

### Modernize a test script

A number of our test scripts have been written a long time ago in a
style that is now outdated.

In the following email it is explained in details how to modernize and
clean up the t7001 test script:

<https://lore.kernel.org/git/CAPig+cQpUu2UO-+jWn1nTaDykWnxwuEitzVB7PnW2SS_b7V8Hg@mail.gmail.com/>

t7001 is not the only test script where similar changes could be made
though.

Find one test script that needs some of the same changes and make
them. Please make sure that the test script is not already being
worked on by asking on the mailing list before starting to work on it.

There should be only one kind of change per commit. For example if one
of your commits indents test bodies with TABs, instead of spaces, then
this should be the only kind of change in this commit.

### Unify the meaning of `-dirty` between `diff` and `describe`

`git diff` reports a submodule directory, whose tracked contents match
the commit at the `HEAD` in the submodule, as `-dirty` when there is an
untracked file in the submodule directory.  This is inconsistent with
what `git describe --dirty` says when run in the submodule directory in
that state.

Fix `git diff` to use the same definition of dirtyness for such a
submodule directory (or the other way around).
[[cf](https://lore.kernel.org/git/xmqqo8m1k542.fsf@gitster.c.googlers.com)]
