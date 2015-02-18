---
layout: default
title: SoC 2015 Ideas
---

This is the idea page for Summer of Code 2015 for Git and libgit2.

## About applying for SoC with the Git project

It is required that students who want to apply to the Git
project for the Summer of Code 2015 complete a tiny, code-related
"microproject" as part of their application.  Please refer to our
[guidelines and suggestions for microprojects](http://git.github.io/SoC-2015-Microprojects.html)
for more information. Completing a microproject is not only an important
way for us to get experience with applicants, but it will also help
applicants become familiar with Git's development and submission
process.

## Summer of code main project ideas

**Students**: Please consider these ideas as starting points for
generating proposals.  We are also more than happy to receive
proposals for other ideas related to Git or libgit2.

**TODO** add entries :)

### Tighten configuration and hook execution based on the file ownership.

In addition to what we discussed, I think files named by include.path
should be honored without checking the ownership.  Cf. $gmane/243628

### "git apply --fix-mta-corruption".

Takes eol attributes into account to correct lossage/addition of CR at
the end of line, with updates to "am".  Cf. $gmane/257445

### "git bisect --first-parent".

When your project is strictly "new features are merged into trunk,
never the other way around", it is handy to be able to first find
a merge on the trunk that merged a topic to point fingers at when
a bug appears, instead of having to drill down to the individual
commit on the faulty side branch.

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
Cf. $gmane/219524

### "git fetch --deepen"?

Cf. $gmane/213180 $gmane/212950

### Introduce threading to checkout codepath, possibly helping Windows folks.

Cf. $gmane/235874
