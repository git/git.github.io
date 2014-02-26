---
layout: default
title: SoC 2014 Applicant Microprojects
---

## Introduction

It is strongly recommended that students who want to apply to the Git
project for the Summer of Code 2014 should submit a small code-related
patch to the Git project as part of their application.  Think of these
microprojects as the "Hello, world" of getting involved with the Git
project; the coding aspect of the change can be almost trivial, but to
make the change the student has to become familiar with many of the
practical aspects of working on the Git project:

* Downloading the source code: clone the repository using the
  [Git via Git](http://git-scm.com/downloads) instructions and read
  the `README` file.

* Build the source code: this is described in the file `INSTALL`.

* Glance over our coding guidelines in the file
  `Documentation/CodingGuidelines`.  We take things like proper code
  formatting very seriously.

* Read about the process for submitting patches to Git: this is
  described in `Documentation/SubmittingPatches`.

* Making the actual change.

* Run the test suite: this is described in the file `t/README`.  (If
  you have added new functionality, you should also add tests, but
  most microprojects will not add new functionality.)

* Commit your change.  Surprise: we use Git for that, so you will need
  to gain at least
  [a basic familiarity](http://git-scm.com/documentation) with using
  Git.  Make sure to write a good commit message that explains the
  reason for the change and any ramifications.  Remember to add a
  Signed-off-by line (see the coding guidelines for more information).

* Submit your change to the Git mailing list.  For this step you
  probably want to use the commands `git format-patch` and `git
  send-email`.

* Expect feedback, criticism, suggestions, etc. from the mailing list.

  *Respond to it!* and follow up with improved versions of your
  change.  Even for a trivial patch you shouldn't be surprised if it
  takes two or more iterations before your patch is accepted.  *This
  is the best part of the Git community; it is your chance to get
  personalized instruction from very experienced peers!*

The coding part of the microproject should be very small (say, 10-30
minutes).  We don't require that your patch be accepted into master by
the time of your formal application; we mostly want to see that you
have a basic level of competence and especially the ability to
interact with the other Git developers.

When you submit your patch, please mention that you plan to apply for
the GSoC.  This will ensure that we take special care not to overlook
your application among the large pile of others.

## Ideas for microprojects

The following are just ideas.  Any small code-related change would be
suitable.  Just remember to keep the change small!  It is much better
to finish a small but complete patch than to try something too
ambitious and not get it done.

