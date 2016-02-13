---
layout: default
title: SoC 2016 Ideas
---

This is the idea page for Summer of Code 2016 for Git and libgit2.

## About applying for SoC with the Git project

It is required that students who want to apply to the Git
project for the Summer of Code 2016 complete a tiny, code-related
"microproject" as part of their application.  Please refer to our
[guidelines and suggestions for microprojects](http://git.github.io/SoC-2016-Microprojects.html)
for more information. Completing a microproject is not only an important
way for us to get experience with applicants, but it will also help
applicants become familiar with Git's development and submission
process.

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

## Note about the number of slots

In 2016, the Git organization has very limited mentoring capacity.
We will probably be able to accept 2 students only this year.

## Summer of code main project ideas

**Students**: Please consider these ideas as starting points for
generating proposals.  We are also more than happy to receive
proposals for other ideas related to Git or libgit2.

### Tighten configuration and hook execution based on the file ownership.

In addition to what we discussed, I think files named by include.path
should be honored without checking the ownership.  Cf. <http://article.gmane.org/gmane.comp.version-control.git/243628>

### "git apply --fix-mta-corruption".

Takes eol attributes into account to correct lossage/addition of CR at
the end of line, with updates to "am".  Cf. <http://article.gmane.org/gmane.comp.version-control.git/257445>

### git bisect improvements

 - Language: C, shell (bash)
 - Difficulty: medium
 - Possible mentors: Matthieu Moy, Christian Couder

#### "git bisect --first-parent".

When your project is strictly "new features are merged into trunk,
never the other way around", it is handy to be able to first find
a merge on the trunk that merged a topic to point fingers at when
a bug appears, instead of having to drill down to the individual
commit on the faulty side branch. Cf.  <http://thread.gmane.org/gmane.comp.version-control.git/264661/focus=264720>

#### Improve "git bisect terms"

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

See discussion on the subject here:
http://thread.gmane.org/gmane.comp.version-control.git/272792/focus=272869

The change is controversial, hence a substantial part of the project
would be to define what is the right behavior (should it be activated
by default? what should be configurable and how? ...). Technically,
the project is probably less than what would be expected for a GSoC
hence it should be grouped with another one (typically another
bisect-related idea).

### "git config --unset" improvement

"git config", when removing the last variable in a section, leaves an
empty section header behind. Anybody who wants to improve this needs
to consider ramifications of leaving or removing comments.
Cf. <http://article.gmane.org/gmane.comp.version-control.git/219524>

### "git fetch --deepen"?

Cf. <http://article.gmane.org/gmane.comp.version-control.git/213180> <http://article.gmane.org/gmane.comp.version-control.git/212950>

### Introduce threading to checkout codepath, possibly helping Windows folks.

Cf. <http://article.gmane.org/gmane.comp.version-control.git/235874>

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

The plan is to start with something small, such as `git-pull.sh` to
get into the groove, and then advance to more complex scripts.
