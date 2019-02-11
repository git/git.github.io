---
layout: default
title: SoC 2019 Ideas
---

This is the idea page for Summer of Code 2019 for Git.

## About applying for SoC with the Git project

*Please read this section completely before reading the idea list
 below.*

It is required that students who want to apply to the Git
project for the Summer of Code 2019 complete a tiny, code-related
"microproject" as part of their application.  Please refer to our
[guidelines and suggestions for microprojects](https://git.github.io/SoC-2019-Microprojects)
for more information. Completing a microproject is not only an important
way for us to get experience with applicants, but it will also help
applicants become familiar with Git's development and submission
process.

A complete GSoC application should include a presentation of yourself
(include any argument that may convince mentors that you are able to
complete the project) and detailed explanations about your project.
Ideas below are just ... ideas! The list is not exhaustive, and more
importantly each idea only includes a summary of what is to be done.
An application must include detailed plans on the design, timeline ...
A typical application takes several pages. You should already have read
[the GSoC Student Guide](http://write.flossmanuals.net/gsocstudentguide/writing-a-proposal/)
by now, but re-read it if needed.

Also, working in Git project is not only about writing your own
patches. Constructively critiquing design and implementation of
patches by other people is also an important skill you need to learn
in order to effectively collaborate with others. So, if you have time
and inclination, it would be beneficial to read and understand other
applicants' patches (or any other patch submitted to the mailing-list),
think if you agree that the problem they are trying to solve is worth
solving, the approach they are taking is the best way (or if you think
of a better way to solve it), etc., and respond to their patches with
the result of your thinking as a review.

Please, include link(s) to the mailing-list discussion(s) related to
your microproject in your application (e.g. linking to
[public-inbox](https://public-inbox.org/git/)). If you
participate in the review of other patches, then you may also include
links to discussions that would support your application.

Students must send drafts of their proposal on the mailing-list before
submitting it officially to GSoC to get feedback from the
community. They are strongly encourraged to publish a draft on the
official GSoC website *and* post it to the mailing list for
discussion.

Getting your proposal right can follow the same process as usual patch
submission for Git, as described in the
[microprojects](https://git.github.io/SoC-2019-Microprojects) page and
in `Documentation/SubmittingPatches` in Git's source code. It is also
expected that you will send several versions of your draft, responding
to comments on the list. Please plan to send the first draft early
enough so that a number of reviews and improvements cycles can happen.

If you are not sure about your proposal, you can discuss that in the
same email where you introduce yourself or in separate emails. Please
use "[GSoC]" at the beginning of such emails.

In summary, all applicants must (not necessarily in this order):

* Complete a [microproject](https://git.github.io/SoC-2019-Microprojects).

* Write a detailed application explaining their project.

* Discuss their project by posting drafts of their application on the
  mailing-list long before the deadline.

In your application, and in the discussions related to projects you
are interested in, it is a good idea to:

* Include link(s) to the mailing-list discussion(s) related to the
  project you chose in your application or you are interested in, for
  example previous discussions or patch series about the topic. There
  might be interesting discussions about the topics that are several
  year old. It is also a good idea to summarize them.

* Include link(s) to the mailing-list discussion(s) related to the
  previous drafts of your application itself.

* Include link(s) to the mailing-list discussion(s) related to your
  microproject. If your microproject patches have been merged, please
  give the merge commits. Otherwise give their branch names and
  current status in the last "What's cooking in git.git" email from
  Junio.

* Include what is suggested in
  [the GSoC Student Guide](http://write.flossmanuals.net/gsocstudentguide/writing-a-proposal/)

([public-inbox](https://public-inbox.org/git/) can be
used for searching the mailing list and linking to previous
discussions.)

## Note about the number of slots

In 2019, the Git organization has very limited mentoring capacity.
These days we usually accept between 0 and 3 students per year.

## Summer of code main project ideas

**Students**: Please consider these ideas as starting points for
generating proposals. We are also more than happy to receive proposals
for other ideas related to Git. Read the note below about refactoring
projects versus projects that implement new features though.

### Unify ref-filter formats with other `--pretty` formats

 - Language: C, shell (bash)
 - Difficulty: medium
 - Possible mentors: Christian Couder, Olga Telezhnaya, Thomas Gummerer

Git has an old problem of duplicated implementations of some
logic. For example, Git had at least 4 different implementations to
format command output for different commands. Our previous GSoC
students and Outreachy interns unified some of the formating logic
into [ref-filter](https://github.com/git/git/blob/master/ref-filter.h)
and got rid of similar logic in some command specific files. Current
task is to continue this work and reuse ref-filter formatting logic in
[pretty](https://github.com/git/git/blob/master/pretty.h).

See discussion in:

<https://public-inbox.org/git/87pnsfkvk1.fsf@0x63.nu/T/#u>

### `git log --oneline` improvements

 - Language: C, shell (bash)
 - Difficulty: medium
 - Possible mentors: Christian Couder, Thomas Gummerer

A number of Git commands, like `git log`, can show commit information
in a configurable way using ["pretty" formats](https://github.com/git/git/blob/master/Documentation/pretty-formats.txt).
Such formats though don't yet support some features that users would
like, for example to display a log like the following:

```
  b9df16a4c (HEAD -> master)
            pathspec: don't error out on all-exclusionary pathspec patterns
  91a491f05 pathspec magic: add '^' as alias for '!'
  c8e05fd6d ls-remote: add "--diff" option to show only refs that differ
  20769079d (tag: v2.12.0-rc2, origin/master, origin/HEAD)
            Git 2.12-rc2
  076c05393 Hopefully the final batch of mini-topics before the final
```

See discussions in:

<https://public-inbox.org/git/xmqqeg42fslw.fsf@gitster.mtv.corp.google.com/T/#t>
<http://public-inbox.org/git/CA+55aFwT2HUBzZO8Gpt9tHoJtdRxv9oe3TDoSH5jcEOixRNBXg@mail.gmail.com/>

### Add support for `stash`ing merge conflicts

 - Language: C, shell (bash)
 - Difficulty: medium
 - Possible mentors: Christian Couder, Thomas Gummerer

`git stash` currently aborts when the current index state contains
conflicts.  The idea here is to allow `stash`ing this conflicted
state, and add an option to `git stash pop` to re-create the
conflict.

See discussion in:

<https://public-inbox.org/git/20190205211736.GD6085@hank.intra.tgummerer.com>

### Convert scripts to builtins

 - Language: C, shell (bash), possibly Perl
 - Difficulty: medium
 - Possible mentors: Christian Couder, Thomas Gummerer

A few components of Git are still in the form of shell and sometimes
Perl scripts. This causes problems in production code – in particular
on multiple platforms, e.g. Windows (think: POSIX-to-Windows path
conversion issues).

The idea of this project is to dive into the Git source code and
convert a couple of shell and/or Perl scripts into portable and
performant C code, making it a so-called "built-in".

(Un)fortunately, the important and easy to port scripts like
`git-pull.sh` are already ported by now. It should still be possible
to start with something small by porting portions of existing
shell-scripts to C using a C helper inside the existing shell-script.

It will be an important part of the project to discuss and find the
most interesting scripts or parts of scripts to be ported.

## Note about refactoring projects versus projects that implement new features

Over the years we have been favoring refactoring projects over
possibly more interesting projects that implement new features.
Refactoring projects are usually easier to do step by step, and to get
code merged step by step which is encouraging.

In general refactoring projects are worthwhile to do even if the
project is not finished at the end of the GSoC and even if the student
stops contributing after that. In those cases it is often a good idea
to later finish the refactoring either by ourselves or by proposing it
to another GSoC student or Outreachy intern. This way the work of both
students and mentors is not likely to be wasted.

With a project that implements a feature, there is a risk, if it's too
complex or too difficult, that the feature will not be finished and
that nothing, or nearly nothing, will have been merged during the
GSoC. There is also the risk that another way to implement the feature
will appear later in the GSoC and all, or nearly all, the work of the
student and mentors will have been mostly wasted. It could also appear
that the use cases the feature was envisioned to be used in, are
better addressed by other improvements or a different workflow.

Another potential issue is that a new feature might be prone to naming
or user interface discussions which could last for a long time or
could not result in clear decisions.

Therefore we think that we should be very careful before proposing to
a student, or accepting, a project that implements a new feature.
People suggesting such a project should at least carefully consider
the above potential issues and see if they can be mitigated before the
project is submitted.

As [suggested by Google](https://google.github.io/gsocguides/mentor/defining-a-project-ideas-list)
we emphasize that a student proposing something original must engage
with the community strongly before and during the application period
to get feedback and guidance to improve the proposal and avoid the
above potential issues.
