---
layout: default
title: SoC 2015 Ideas
navbar: false
---

This is the idea page for Summer of Code 2015 for Git and libgit2.

## About applying for SoC with the Git project

It is required that students who want to apply to the Git
project for the Summer of Code 2015 complete a tiny, code-related
"microproject" as part of their application.  Please refer to our
[guidelines and suggestions for microprojects](https://git.github.io/SoC-2015-Microprojects.html)
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

In 2015, the Git organization has very limited mentoring capacity.
We will probably be able to accept 2 students only this year.

## Summer of code main project ideas

**Students**: Please consider these ideas as starting points for
generating proposals.  We are also more than happy to receive
proposals for other ideas related to Git or libgit2.

### Tighten configuration and hook execution based on the file ownership.

In addition to what we discussed, I think files named by include.path
should be honored without checking the ownership.  Cf. <https://public-inbox.org/git/20140307210403.GA6790%40sigill.intra.peff.net/>

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
commit on the faulty side branch. Cf.  <https://public-inbox.org/git/CAMo-WNYNeShbbhNfG455o7krGfY7_9zVU3dMpJ7b4Smh_AiATg%40mail.gmail.com/>

#### "git bisect fixed/unfixed"

"git bisect" is initially meant to find regressions (i.e. the new code
is bad, and the old one used to work). The opposite may happen too:
look for the commit which fixed a bug. It is already possible using
"git bisect", but the user has to type "good" to mean "the bug is
there" and "bad" to mean "the bug is fixed", which isn't convenient.

It would be nice to allow the user to explicitely say "git bisect
fixed" and "git bisect unfixed" instead. It is actually much harder
than defining "fixed"/"unfixed" as aliases for "bad"/"good".

A patch for this feature was sent to the mailing list in this thread a
few years ago by Dscho:
<https://public-inbox.org/git/alpine.DEB.1.00.0806241515460.9925%40racer/>

Unfortunately there were some problems with the patch and no one tried
to fix them. So the same problem/suggestion is often reported on the
mailing list, for example:

 - <https://public-inbox.org/git/855249CA-A006-475C-8F96-EFD614795064%40gmail.com/>
 - <https://public-inbox.org/git/AANLkTinQ0rCw2ydisHra779r6_iSOxqRwOStpJrNbx7h%40mail.gmail.com/>
 - <https://public-inbox.org/git/20110929142027.GA4936%40zelva.suse.cz/>

A patch series to let "old/new" be used instead of "good/bad" was
started here:

<https://public-inbox.org/git/1339466625-17461-1-git-send-email-Valentin.Duperray%40ensimag.imag.fr/>

There is still work to be done to complete it.

Note than another feature with the name "git bisect fix" was suggested
to do something else:

<https://lore.kernel.org/lkml/200312231416.58998.kernel%40kolivas.org/>

Since there have already been discussions and patches, the remaining
work is probably less than a GSoC, so this project should be grouped
with another one (like git bisect --first-parent) to make a full GSoC
proposal.

### Unifying `git branch -l`, `git tag -l`, and `git for-each-ref`

These three commands are all about selecting a subset of a repository's
refs, and then printing the result. However, the implementations are not
shared. Some commands know selection options the others do not
(e.g., `--contains`, `--merged`), and others know formatting options the
others do not (e.g., `for-each-ref`'s `--format`).

There have been experimental patches to unify the selection process, and
some discussion on unifying the formatting. Based on this previous work,
factor out a common library which can cleanly handle both selection and
formatting, and use it consistently in the three commands.

 - Language: C
 - Difficulty: medium
 - Possible mentors: Jeff King


### "git config --unset" improvement

"git config", when removing the last variable in a section, leaves an
empty section header behind. Anybody who wants to improve this needs
to consider ramifications of leaving or removing comments.
Cf. <https://lore.kernel.org/lkml/40FFBC8B.5050407%40cox.net/>

### "git fetch --deepen"?

Cf. <https://public-inbox.org/git/7vk3rkcocy.fsf%40alter.siamese.dyndns.org/> <https://public-inbox.org/git/7vobh0f5nc.fsf%40alter.siamese.dyndns.org/>

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

The plan is to start with something small, such as `git-pull.sh` to
get into the groove, and then advance to more complex scripts.
