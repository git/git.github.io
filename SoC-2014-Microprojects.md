---
layout: default
title: SoC 2014 Applicant Microprojects
navbar: false
---

## Introduction

It is strongly recommended that students who want to apply to the Git
project for the Summer of Code 2014 submit a small code-related patch
to the Git project as part of their application.  Think of these
microprojects as the "Hello, world" of getting involved with the Git
project; the coding aspect of the change can be almost trivial, but to
make the change the student has to become familiar with many of the
practical aspects of working on the Git project.

*NOTE: Students who plan to work on libgit2, which is also under the
Git umbrella in the Google Summer of Code, should refer to [the
libgit2 list of
projects](https://github.com/libgit2/libgit2/blob/development/PROJECTS.md)
rather than the list below.*

Consider [a sample email
thread](https://public-inbox.org/git/1386590745-4412-1-git-send-email-t.gummerer%40gmail.com/),
which shows how a developer proposed a change and a patch to implement
it.  The problem being solved, the design of the proposed solution,
and the implementation of that design were all reviewed and discussed,
and after several iterations an improved version of the patch was
accepted into our codebase.  As a GSoC student, you will be playing
the role of the developer and engaging in a similar discussion.  Get
familar with the flow, need for clarity on both sides (i.e. you need
to clearly defend your design, and need to ask clarifications when
questions/suggestions you are offered are not clear enough), the pace
at which the discussion takes place, and the general tone of the
discussion, to learn what is expected of you.

To complete a microproject, you will have to go through approximately
the following steps:

* Download the source code: clone the repository using the [Git via
  Git](http://git-scm.com/downloads) instructions and read the
  `README` file.

* Build the source code: this is described in the file `INSTALL`.

* Glance over our coding guidelines in the file
  `Documentation/CodingGuidelines`.  We take things like proper code
  formatting very seriously.

* Read about the process for submitting patches to Git: this is
  described in `Documentation/SubmittingPatches`.

* **Make the actual change.** (Funny, this is the only part they teach
  you about in college.)

* Run the test suite and make sure it passes 100%: this is described
  in the file `t/README`.  (If you have added new functionality, you
  should also add new tests, but most microprojects will not add new
  functionality.)

* Commit your change.  Surprise: we use Git for that, so you will need
  to gain at least
  [a basic familiarity](http://git-scm.com/documentation) with using
  Git.  Make sure to write a good commit message that explains the
  reason for the change and any ramifications.  Remember to make sure
  that you agree with our "Developer's Certificate of Origin" (whose
  text is contained in `Documentation/SubmittingPatches`), and to
  signify your agreement by adding a `Signed-off-by` line.

* Submit your change to the Git mailing list.  For this step you
  probably want to use the commands `git format-patch` and `git
  send-email`.  Make sure that your email is formatted correctly: send
  a test version of the email to yourself and see if you can apply it
  to your repository using `git am`.

* Expect feedback, criticism, suggestions, etc. from the mailing list.

  *Respond to it!* and follow up with improved versions of your
  change.  Even for a trivial patch you shouldn't be surprised if it
  takes two or more iterations before your patch is accepted.  *This
  is the best part of participating in the Git community; it is your
  chance to get personalized instruction from very experienced peers!*

The coding part of the microproject should be very small (say, 10-30
minutes).  We don't require that your patch be accepted into master by
the time of your formal application; we mostly want to see that you
have a basic level of competence and especially the ability to
interact with the other Git developers.

When you submit your patch, please mention that you plan to apply for
the GSoC.  This will ensure that we take special care not to overlook
your application among the large pile of others.

Students: Please attempt only **ONE** microproject.  We want quality,
not quantity!  (Also, it takes work to collect the ideas, and it would
be nice to have enough microprojects for everybody.)  If you've
already done a microproject and are itching to do more, then get
involved in other ways, like finding and fixing other problems in the
code, or improving the documentation or code comments, or helping to
review other people's patches on the mailing list, or answering
questions on the mailing list or in IRC, or writing new tests, etc.,
etc.  In short, start doing things that other Git developers do!

## Ideas for microprojects

The following are just ideas.  Any small code-related change would be
suitable.  Just remember to keep the change small!  It is much better
for you to finish a small but complete change than to try something
too ambitious and not get it done.

1.  <s>Rewrite `git-compat-util.h:skip_prefix()` as a loop, so that it
    doesn't have to scan through the `prefix` string twice.</s>
    **taken**

2.  <s>Change `branch.c:install_branch_config()` to use
    `skip_prefix()`.</s> **taken**

3.  <s>In `branch.c:setup_tracking()`, figure out where the magic
    number `1024 - 7 - 7 - 1` comes from.  (Looking through the commit
    history might help.)  If the check involving the number is still
    necessary, document where the number comes from.  If the check is
    no longer necessary, explain why and delete the check.</s> **taken**

4.  <s>Rewrite `bulk-checkin.c:finish_bulk_checkin()` to use a `strbuf`
    for handling `packname`, and explain why this is useful.  Also
    check if the first argument of
    `pack-write.c:finish_tmp_packfile()` can be made const.</s>
    **taken**

5.  <s>Change `bundle.c:add_to_ref_list()` to use `hashcpy()`.  See if
    you can find other places where `hashcpy()` should be used instead
    of `memcpy()`.</s> **taken**

6.  <s>Change `bundle.c:add_to_ref_list()` to use `ALLOC_GROW()`.  See
    if you can find other places that would benefit from a similar
    change.</s> **taken**

7.  <s>Write a function `strbuf_write_or_die()` and use it instead of
    `write_or_die(fd, buf.buf, buf.len)` in all of the places you can
    find.</s> **taken** (and it turns out that the mailing list didn't
    like this idea)

8.  <s>In `branch.c:install_branch_config()`, can the long chain of `if`
    statements be simplified?  Would it make sense to make the code
    table-driven?  Don't forget that the strangely-named function
    `_()` is used for internationalization and limits the possibility
    of gluing strings together.</s> **taken**

9.  <s>Could `commit.c:commit_graft_pos()` use one of the general-purpose
    bisection functions like `sha1_pos()` or `sha1_entry_pos()`?  Are
    there other places that could do so?</s> **taken**

10. <s>Rewrite `commit.c:record_author_date()` to use `skip_prefix()`.
    Are there other places in this file where `skip_prefix()` would be
    more readable than `starts_with()`?</s> **taken**

11. <s>Find places where we scan a string twice unnecessarily, once with
    `strchr()` and then with `strlen()`, and rewrite these sites using
    `strchrnul()` when appropriate.</s> **taken**

12. <s>Currently in order to disallow the `--[no]-xxx` form of a
    command-line option, we have to initialize the option's full
    `struct option` explicitly.  It'd be nice to have a set of `OPT_*`
    macros with `PARSE_OPT_NONEG` set.  Find and update all `struct
    option []` declarations with the new macros (including ones that
    should never accept `--no-xxx` form, but do anyway).</s> **Not
    recommended.  This is more a milliproject than a microproject, and
    the mailing list wasn't so enthusiastic about the idea anyway.**

13. <s>Rewrite `diff-no-index.c:read_directory()` to use
    `is_dot_or_dotdot()`.  Try to find other sites that can use that
    function.</s> **solved**

14. Change `fetch-pack.c:filter_refs()` to use `starts_with()` instead
    of `memcmp()`.  Try to find other sites that could be rewritten
    similarly.

15. Rewrite `fsck.c:fsck_commit()` to use `starts_with()` and/or
    `skip_prefix()`.

16. <s>Rewrite `builtin/add.c:run_add_interactive()` to use `struct
    argv_array`.</s> **taken**

17. Find one or more bugs, inefficiencies, or unconventional code
    patterns in `builtin/apply.c:fuzzy_matchlines()` and fix them.
    (There are enough microprojects in this function for several
    students.)

18. <s>"VAR=VAL command" is sufficient to run 'command' with environment
    variable VAR set to value VAL without affecting the environment of
    the shell itself.  But the same does not work with a shell
    function (most notably, "test_must_fail").  So, in our test suite,
    we implement subshell invocations in multiple lines like this:

    ```
    ... &&
    (
            VAR=VAL &&
            export VAR &&
            test_must_fail git command
    ) &&
    ...
    ```

    But that could be expressed as

    ```
    ... &&
    test_must_fail env VAR=VAL git command &&
    ...
    ```

    Find and shorten such constructs in existing test scripts.</s> **solved**
