---
layout: default
title: SoC 2020 Applicant Microprojects
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

### Add configuration options for some commonly used command-line options

Many have already been added (e.g. "git am -3" in e97a5e7).

Some people always run the command with these options, and would
prefer to be able to activate them by default in ~/.gitconfig.

For some options though, we have made a deliberate choice to not
provide a configuration option. So ask on the mailing list if it's ok
before working on this.

