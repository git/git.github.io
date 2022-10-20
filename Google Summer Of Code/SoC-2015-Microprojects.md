---
layout: default
title: SoC 2015 Applicant Microprojects
navbar: false
---

## Introduction

It is strongly recommended that students who want to apply to the Git
project for the Summer of Code 2015 submit a small code-related patch
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
thread](http://thread.gmane.org/gmane.comp.version-control.git/239068),
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

### Make "git -C '' cmd" not to barf.

Instead, make it just like "cd ''", which is a no-op that silently
succeeds.  Cf. $gmane/258109

### Allow "-" as a short-hand for "@{-1}" in more places.

Pick one command that operates on branch names.  Teach it the "-"
shorthand that stands for "the branch we were previously on", like we
did for "git merge -" sometime after we introduced "git checkout -".
Cf. $gmane/230828

### Use unsigned integral type for collection of bits.

Pick one field of a structure that (1) is of signed integral type and (2) is
used as a collection of multiple bits. Discuss if there is a good reason
why it has to be a signed integral field and change it to an unsigned
type otherwise.  Cf. $gmane/263751

### Make "git diff --no-index $directory $file" DWIM better.

"git diff --no-index $directory $directory/$file" is obviously what
the user wanted.

### Forbid "log --graph --no-walk"

Because --graph is about connected history while --no-walk is about
discrete points.  Cf. $gmane/216083

### Move ~/.git-credentials and ~/.git-credential-cache to ~/.config/git

Most of git dotfiles can be located, at the user's option, in
~/.<file> or in ~/.config/git/<file>, following the [XDG
standard](http://standards.freedesktop.org/basedir-spec/basedir-spec-latest.html).
~/.git-credentials and ~/.git-credential-cache are still hardcoded as
~/.<file>, and should allow using the XDG directory layout too
(~/.git-credentials could be allowed as ~/.config/git/credential and
~/.git-credential-cache could be allowed as ~/.cache/git/credential,
possibly modified by $XDG_CONFIG_HOME and $XDG_CACHE_HOME).

Each of these files can be a microproject of its own. The suggested
approach is:

* See how XDG was implemented for other files (run "git log --grep
  XDG" in Git's source code) and read the XDG specification.

* Implement and test the new behavior, without breaking compatibility
  with the old behavior.

* Update the documentation

Even though the amount of code to write is small, these projects
involve a lot of prior work to understand the specification and deal
with all potential corner-cases.

### Add configuration options for some commonly used command-line options

This includes:

* git am -3

Some people always run the command with these options, and would
prefer to be able to activate them by default in ~/.gitconfig.

### Add more builtin patterns for userdiff

"git diff" shows the function name corresponding to each hunk after
the @@ ... @@ line. For common languages (C, HTML, Ada, Matlab, ...),
the way to find the function name is built-in Git's source code as
regular expressions (see userdiff.c). A few languages are common
enough to deserve a built-in driver, but are not yet recognized. For
example, CSS, shell.

This project requires a very good knowledge of regular expressions.
