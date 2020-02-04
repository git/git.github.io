---
layout: default
title: SoC 2019 Ideas
navbar: false
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
community. They are strongly encouraged to publish a draft on the
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

### Improve consistency of sequencer commands

 - Language: C, shell (bash)
 - Difficulty: medium
 - Possible mentors: Elijah Newren, Christian Couder, Thomas Gummerer

This would consist in taking care of the following issues:

* The suggestion to fix an interrupted rebase-i or cherry-pick due to
  a commit that became empty via `git reset HEAD` (in
  builtin/commit.c) instead of `git rebase --skip` or
  `git cherry-pick --skip` ranges from annoying to confusing.
  (Especially since other interrupted am's and rebases both point to
  am/rebase --skip.). Note that `git cherry-pick --skip` is not yet
  implemented, so that would have to be added first.

* There are a handful of flags that am-based rebases support that are
  not available to interactive/merge-based rebases; it'd be nice to
  implement them for the interactive machinery.  (There are also
  numerous flags that only the interactive machinery supports that are
  unavailable to am-based rebases, but we don't care; we want to
  deprecate am-based rebases.)

  * `--ignore-whitespace` (transliterate to `-Xignore-space-change`?)
  * `--whitespace=...`
  * `--committer-date-is-author-date`/`--ignore-date`
  * `-C4`

* [There's also some empty handling (from "Behavioral Differences" in
  Documentation/git-rebase.txt) that would be nice to address, though
  that might be contentious and we might try to tackle that piece
  before GSoC gets rolling...]

* Bonus: Make a flag to allow rebase to rewrite commit messages that
  refer to older commits that were also rebased.  (i.e. if rebasing
  commits A and B, and commit B says `This reverts commit <sha-of-A>`,
  then rewritten B's commit message should say
  `This reverts commit <sha-of-rewritten-A>`.)
  Do this for both sha1sums and sha1sum abbreviations in commit messages.

### `git revert --drop` and `git commit --reword`

 - Language: C, shell (bash)
 - Difficulty: medium
 - Possible mentors: Thomas Gummerer

The interactive rebase already supports the special oneline prefixes
`fixup!` and `squash!` in the `--autosquash` mode; these commits will
be reordered in the todo list and their `pick` commands adjusted
accordingly.

These commits can be crafted conveniently via the `--fixup` and
`--squash` options of `git commit`.

The idea of this project is to add two more actions, `drop!` and
`reword!`:

* The `drop!` action (for convenience, `git revert --drop <commit>`)
  would not only revert the commit, but a subsequent `git rebase -i
  --autosquash` would reorder the `drop!` commit directly after the
  matching commit, then change the matching commit's `pick` to `drop`
  and comment out the `drop!` one.

* The `reword!` action (for convenience, `git commit --reword <commit>`)
  would let the user edit the commit message of the referenced commit,
  and add an "empty" commit (i.e. a commit that does not modify any
  files) with that commit message, prefixed with the `reword!` oneline.
  The next `git rebase -i --autosquash` would then not only reorder
  that commit after verifying that it is indeed an empty commit, it
  would then also replace the `pick` command with an appropriate new
  command (say, by extending the `squash` command to accept a `--reword`
  option).

This project will need to begin by implementing test cases to define
the expected outcome, and then implement the actual functionality.

### Teach `git stash` to handle unmerged index entries

 - Language: C, shell (bash)
 - Difficulty: medium
 - Possible mentors: Thomas Gummerer

When the index is unmerged, `git stash` refuses to do anything. That is
unnecessary, though, as it could easily craft e.g. an octopus merge
of the various stages. A subsequent `git stash apply` can detect that
octopus and re-generate the unmerged index.

See also the discussion in [this Git mailing list
thread](https://public-inbox.org/git/nycvar.QRO.7.76.6.1902072023250.41@tvgsbejvaqbjf.bet/).

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
