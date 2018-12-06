---
layout: default
title: SoC 2016 Ideas
navbar: false
---

This is the idea page for Summer of Code 2016 for Git and libgit2.

## About applying for SoC with the Git project

*Please read this section completely before reading the idea list
 below.*

It is required that students who want to apply to the Git
project for the Summer of Code 2016 complete a tiny, code-related
"microproject" as part of their application.  Please refer to our
[guidelines and suggestions for microprojects](https://git.github.io/SoC-2016-Microprojects)
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
[gmane](http://news.gmane.org/gmane.comp.version-control.git)). If you
participate in the review of other patches, then you may also include
links to discussions that would support your application.

Students must send drafts of their proposal on the mailing-list before
submitting it officially to GSoC to get feedback from the
community. They are strongly encourraged to publish a draft on the
official GSoC website *and* post it to the mailing list for
discussion.

Getting your proposal right can follow the same process as usual patch
submission for Git, as described in the
[microprojects](https://git.github.io/SoC-2016-Microprojects) page and
in `Documentation/SubmittingPatches` in Git's source code. It is also
expected that you will send several versions of your draft, responding
to comments on the list. If you are not sure about your proposal, you
can discuss that in the same email where you introduce yourself or in
separate emails. Please use "[GSoC]" at the beginning of such emails.

In summary, all applicants must (not necessarily in this order):

* Complete a [microproject](https://git.github.io/SoC-2016-Microprojects).

* Write a detailed application explaining their project.

* Discuss their project by posting drafts of their application on the
  mailing-list long before the deadline.

In your application, it is a good idea to:

* Include link(s) to the mailing-list discussion(s) related to the
  project you chose in your application, for example previous
  discussions or patch series about the topic. There might be
  interesting discussions about the topics that are several year old.
  It is also a good idea to summarize them.

* Include link(s) to the mailing-list discussion(s) related to the
  previous drafts of your application itself.

* Include link(s) to the mailing-list discussion(s) related to your
  microproject.

* Include what is suggested in
  [the GSoC Student Guide](http://write.flossmanuals.net/gsocstudentguide/writing-a-proposal/)

([gmane](http://news.gmane.org/gmane.comp.version-control.git) can be
used for searching the mailing list and linking to previous
discussions.)

## Note about the number of slots

In 2016, the Git organization has very limited mentoring capacity.
These days we usually accept between 0 and 2 students per year.

## Summer of code main project ideas

**Students**: Please consider these ideas as starting points for
generating proposals. We are also more than happy to receive proposals
for other ideas related to Git or libgit2. For libgit2, see the bottom
of the list and
[the libgit2 list of projects](https://github.com/libgit2/libgit2/blob/master/PROJECTS.md).

### Tighten configuration and hook execution based on the file ownership.

In addition to what we discussed, I think files named by include.path
should be honored without checking the ownership.  Cf. <http://article.gmane.org/gmane.comp.version-control.git/243628>

### Implement `git apply --fix-mta-corruption`

Takes eol attributes into account to correct lossage/addition of CR at
the end of line, with updates to "am".  Cf. <https://public-inbox.org/git/xmqqoau6gguz.fsf%40gitster.dls.corp.google.com/>

### git bisect improvements

 - Language: C, shell (bash)
 - Difficulty: medium
 - Possible mentors: Matthieu Moy, Christian Couder

#### Implement `git bisect --first-parent`.

When your project is strictly "new features are merged into trunk,
never the other way around", it is handy to be able to first find
a merge on the trunk that merged a topic to point fingers at when
a bug appears, instead of having to drill down to the individual
commit on the faulty side branch. Cf.  <http://thread.gmane.org/gmane.comp.version-control.git/264661/focus=264720>

#### Improve `git bisect terms`

"git bisect" is initially meant to find regressions (i.e. the new code
is bad, and the old one used to work). The opposite may happen too:
look for the commit which fixed a bug. This is why "git bisect terms"
was added in Git 2.7. Still, when starting the bisection, the user has
to know which behavior is the "new" one and which is the "old" one.
This may not be obvious when comparing two commits which have no
direct ancestry relation.

For example, commit A is 'fast', commit B is 'slow'. If neither commit
is an ancestor of the other, then Git will test the common ancestor
(say, C) of A and B. If C is 'fast' then we now know that we're
looking for a transition from 'fast' to 'slow' between C and B. If C
is 'slow', then we are looking for a transition from 'slow' to 'fast'
between C and A. Currently, in this situation, Git will stop with an
error message if 'fast' is the new term, 'slow' the old one, and if C
is 'fast'. Instead of failing, it could offer the user to reverse the
terms and continue the bisection.

See discussion on the subject [here](https://public-inbox.org/git/1435337896-20709-1-git-send-email-Matthieu.Moy%40imag.fr/).

The change is controversial, hence a substantial part of the project
would be to define what is the right behavior (should it be activated
by default? what should be configurable and how? ...). Technically,
the project is probably less than what would be expected for a GSoC
hence it should be grouped with another one (typically another
bisect-related idea).

#### Convert "git-bisect.sh" to a builtin

"git-bisect.sh" is already using `git bisect--helper` for some
functionality. More features could be moved one by one into `git
bisect--helper` by porting them from shell to C until both
"git-bisect.sh" and "builtin/bisect--helper.c" could be fully replaced
by "builtin/bisect.c".

### "git rebase" improvements

#### "git status" during non-interactive rebase

Since 84e6fb9 (status: give more information during rebase -i,
2015-07-06), "git status" gives some useful information like
previously applied and next commits when an interactive rebase is
stopped. The same could be done for non-interactive rebase.

This is a small project that can be a used as a warm-up (perhaps:
"extended warm-up"?) before tackling another one.

#### Port parts of "git rebase" to a C helper

Some pieces of code are currently duplicated between `wt-status.c` and
`git-rebase--interactive.sh` (read_rebase_todolist/abbrev_sha1_in_line
in C and expand_todo_ids/collapse_todo_ids in shell). It would be nice
to let the shell version use directly the C version through a C helper
to reduce code duplication and increase consistency (we've already
been hit by subtle difference between different versions of a
`git-rebase-todo` file ...).

This would need:

* libification of read_rebase_todolist/abbrev_sha1_in_line

* Introduction of a new internal command like `git-rebase--helper` (see
  `bisect--helper` for a prior example) that call it

* Use it from `git-rebase--interactive.sh`

This would open the door to other uses of C within "rebase -i", and
possibly a step-by-step port of the shell code to C in the long run.

This is a relatively small project that should be combined with
another one to give a proper GSoC project.

### `git config --unset` improvement

"git config", when removing the last variable in a section, leaves an
empty section header behind. Anybody who wants to improve this needs
to consider ramifications of leaving or removing comments.
Cf. <https://public-inbox.org/git/20130329195155.GA19994%40sigill.intra.peff.net/>

### Introduce threading to checkout codepath, possibly helping Windows folks.

Cf. <https://public-inbox.org/git/CAHOQ7J_ZZ%3D7j-5ULd7Tdvbiqg4inhwi%2Bfue_w6WAtNRkvZSwsg%40mail.gmail.com/>

### Be nicer to the user on tracked/untracked merge conflicts

When merging a commit which has tracked files with the same name as
local untracked files, Git refuses to proceed. It could be nice to:

 - Accept the situation without conflict when the tracked file has the
   exact same content as the local untracked file (which would become
   tracked). No data is lost, nothing can be committed accidentally.

 - Possibly, for fast-forward merges, if a local files belongs to the
   index but not to the last commit, attempt a merge between the
   upstream version and the local one (resulting in the same content
   as if the file had just been committed, but without introducing an
   extra commit).

Recent versions SVN do something similar: on update, it considers
added but not committed files like normal tracked files, and attempts
a merge of the upstream version with the local one (which always
succeeds when the files have identical content). Attempting a merge
for non-fast forward cases would probably not make sense: it would mix
changes coming from the merge with other changes that do not come from
a commit.

One difficulty with this project is to identify uncontroversial cases
(where Git should merge without complaining) and all the possible
corner-cases.

### Convert scripts to builtins

Many components of Git are still in the form of shell and Perl scripts.
While this is an excellent choice as long as the functionality is
improved, it causes problems in production code – in particular on
multiple platforms, e.g. Windows (think: POSIX-to-Windows path
conversion issues).

The idea of this project is to dive into the Git source code and
convert a couple of shell and/or Perl scripts into portable and
performant C code, making it a so-called "built-in".

(Un)fortunately, the easy-to-port scripts like `git-pull.sh` are
already ported by now. It is still possible to start with something
small by porting portions of existing shell-scripts to C using a C
helper inside the existing shell-script.

### Port packfile creation optimisations to libgit2

Libgit2 has an implementation of pack-objects (copied from git) which
does support multi-threading but not some of the other capabilities
which the git implementation does like re-using deltas or copying
compressed data from one packfile to another.

This would involve looking at the code in git to copy over
optimisations as well as figuring out what parts of libgit2 should be
changed to accomodate these new capabilities.

- Language: C
- Difficulty: medium
- Possible mentors: Carlos Martín / Ed Thomson

### Git server framework in libgit2

Libgit2 has support for the client side of the negotiation, but it's
missing server-side capabilities. We wouldn't want to simply
reimplement `upload-pack` or `receive-pack` as function calls, but
instead create the framework that takes care of the protocol details
and calls to user code for

 * pushing bytes to and from the network
 * deciding which references to advertise
 * deciding whether an update is acceptable
 * possibly more

which would allow e.g. limiting which references are shown to a particular user or
make decisions about updates in callbacks instead of script hooks.

- Language: C
- Difficulty: medium
- Possible mentors: Carlos Martín / Ed Thomson

### Git Beginner

Git is an incredible powerful tool with lots of different commands that 
offer a variety of ways to approach source control management. Naturally
every way has advantages and disadvantages which a seasoned user can
carefully consider and out weight against each other. However, many new
users of Git are unable to cope with this variety, at least initially.
If they run into a problem they likely search the Internet and find
a StackOverflow answer instructing them to run a certain Git commands
to solve their problems. A rushed user (aren't we all?) might run these
commands without reading the docs which might makes the problem worse.

The core of this project is to evaluate with a running prototype
if it is possible to implement a "Git Beginner Mode". The mode shall be
activated with the config "core.isbeginner" by Git users who prefer
this safety net (default should be false).

If this mode is enabled then Git shall print a warning message before
running a potentially destructive command. In addition to the warning
Git shall print a command that would reverse the operation if possible.
Most of the information to reverse an operation is already available
via git reflog. However, the task here is to make this information 
more easily accessible to Git beginners.

The following commands should be guarded with this mechanism:

```
git rebase
git reset --hard
git clean -f
git gc --prune=now --aggressive
git push -f
```

This list can and should be extended by the student.

Note that this project is not technically difficult, it requires a
deep understanding of Git: how each command is meant to be used, what
are the potential dangers, ... Reaching a solution that effectively
protects beginners without harming anyone is much harder than it
seems. See for example [this
thread](https://public-inbox.org/git/vpqoabox66p.fsf%40anie.imag.fr/)
for example potential objections. If chosen, this project should be
discussed in depth on the list before and after the student
application.

- Language: C, shell (bash)
- Difficulty: hard
- Possible mentors: Lars Schneider

### Git remote whitelist/blacklist

Git beginners are easily confused by the distributed nature of Git.
One source of confusion are Git remotes, especially if there are 
multiple ones. This is a potentially big threat to cooperations
as Git beginners might push changes to a public remote such as
github.com instead of the private company Git server.

This project is about to implement a Git remote whitelist
and blacklist using Git config.

Whitelist example:

```
[remote]
    default = deny
    message = "Are you sure you're not pushing company code?"
    allowed = http://whitelisted-hosting.org
    allowed = http://git-hosting.org/whitelisted-org
    allowed = http://git-hosting.org/org/whitelisted-repo
```

Blacklist example:

```
[remote]
    default = allow    
    denied = http://denied-hosting.com
```

If a user wants to push changes to a blacklisted remote then the `push`
command would print a generic error. If a `remote.message` is defined
then this message would be shown in addition.

- Language: C, shell (bash)
- Difficulty: medium
- Possible mentors: Lars Schneider
