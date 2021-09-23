---
layout: default
title: Outreachy Winter 2021-2022 Applicant Microprojects
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

### Replace a run_command*() call by direct calls to C functions

See for example what Junio did in
[ffcb4e94d3](https://github.com/git/git/commit/ffcb4e94d3) (bisect: do
not run show-branch just to show the current commit, 2021-07-27).

If you can't find one please tell us, along with the command you used
to search, so that we can remove this microproject idea.

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

### Add --no-sort option for git-for-each-ref

In "git for-each-ref", `ref_array_sort()` is used to sort ref_array with
sorting options. Even if the user does not provide any `--sort` option,
`ref_default_sorting()` will also provide the default sorting options with
the sort key "refname".

But it turns out that the ref_array we get through `filter_refs()` is
already sorted by "refname". So providing a `--no-sort` option may
improve the performance of git for-each-ref when we don't provide any
sorting options on the command line. [thread](https://lore.kernel.org/git/YTNpeH+jO0zQgAVT@coredump.intra.peff.net/),
[thread](https://lore.kernel.org/git/YTTARcEvpXWSDfYW@coredump.intra.peff.net/)

But the `--no-sort` option seems to be disabled in "git for-each-ref",
see "NEEDWORK" hint in `parse_opt_ref_sorting()`. You may need a new
list api to replace the original linked list implementation for ref_sorting.
You can refer to the implementation of this patch:
[thread](https://lore.kernel.org/git/e68635cda515a9cd504c1d7366e9c353ab2adb2e.1629882532.git.gitgitgadget@gmail.com/)

You can use t/perf for performance testing between upstream and your patches.
[t/perf/README](https://github.com/git/git/blob/master/t/perf/README)