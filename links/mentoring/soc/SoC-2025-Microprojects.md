---
layout: default
title: SoC 2025 Applicant Microprojects
navbar: false
---

## Introduction

First make sure you read and understand
[our general guidelines and suggestions for microprojects](https://git.github.io/General-Microproject-Information).

There are some suggestions on how you can find some microprojects on your own in the document.

## Ideas for microprojects

### Modernize Test Path Checking in Git's Test Suite

Help improve Git's test suite by converting old-style path checks to use modern
helper functions. We'll be replacing basic shell test commands like `test -f`
with Git's dedicated test helpers like `test_path_is_file`.

#### Steps to Complete
1. Find a test script using old-style path checks:
   ```sh
   git grep "test -[efd]" t/
   ```

2. Look for patterns like:
   ```sh
   test -f path/to/file      # old way
   test_path_is_file path/to/file    # new way

   test -d some/directory    # old way
   test_path_is_dir some/directory   # new way
   ```

3. Important: Only replace checks that are actually testing for conditions, not
   those used in flow control. For example:
   ```sh
   # DON'T change this - it's flow control
   if test -e "file.txt"; then
       do_something
   fi

   # DO change this - it's a test assertion
   test -e "file.txt" || error "file.txt should exist"
   ```

#### Notes
- Start small: Pick a test file with just a few instances to convert
- Run the test suite after your changes to ensure nothing breaks
- Follow Git's commit message style
- Include which command you used to find the instances in your commit message

#### Need Help?
- Reference [this discussion](https://public-inbox.org/git/CAPig+cRfO8t1tdCL6MB4b9XopF3HkZ==hU83AFZ38b-2zsXDjQ@mail.gmail.com/)
  for detailed examples.
- If you can't find any instances to fix, let us know what search command you
  used


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

### Avoid suppressing `git`'s exit code in test scripts

The Git project uses a large collection of integration tests written in
Shell to guard against regressions when adding new features or fixing
bugs. The scripts in question can be found in the `t` directory
[here][git-t].

While it is perfectly OK to use [pipes][wikipedia-pipes] when writing
integration tests, we must be careful to avoid writing a pipeline that
suppresses the exit code of a Git process, like so:

```
git <subcommand> | <some other command>
```

...since the exit code of `git <subcommand>` would be suppressed by the
pipe. If `git <subcommand>` crashed, we would not catch it in the above
example when running the integration suite.

Other examples to avoid include:

```
# bad:
<some command> $(git <subcommand>)

# also bad:
<some command> <<EOF
... some text ...
$(git <subcommand>)
EOF
```

...since the exit code of `git <subcommand>` is hidden behind the
subshell in both instances.

On the other hand, both of the following examples are OK, since neither
hides the exit code of running `git <subcommand>`:

```
# good:
var=$(git <subcommand>)

# also good:
<some command> | <some other command> | git <subcommand>
```

(provided that neither `<some command>` or `<some other command>` are
`git`).

See the commit
[c6f44e1da5](https://github.com/git/git/commit/c6f44e1da5e88e34)
for example, and then do the same thing in one other test script.

If you can't find one please tell us, along with the command you used
to search, so that we can remove this microproject idea.

[git-t]: https://github.com/git/git/tree/master/t
[wikipedia-pipes]: https://en.wikipedia.org/wiki/Pipeline_(Unix)

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

#### Notes
- only work on `t/t????-*.sh` scripts.
- pick just one script (so as to avoid exhausting the pool for other candidates).
- When converting `test -[def]` to use `test_path_exists()` and cousins
  only convert instances which semantically are assertions (i.e. used as part
  of a &&-chain).
