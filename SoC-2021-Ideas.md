---
layout: default
title: SoC 2021 Ideas
---

This is the idea page for Summer of Code 2021 for Git.

*Please completely read the [general application information](https://git.github.io/General-Application-Information) 
page before reading the idea list below.*

## Summer of code main project ideas

**Students**: Please consider these ideas as starting points for
generating proposals. We are also more than happy to receive proposals
for other ideas related to Git. Make sure you have read the "Note
about refactoring projects versus projects that implement new
features" in the [general application information](https://git.github.io/General-Application-Information)
page though.

### Use ref-filter formats in `git cat-file`

 - Language: C, shell (bash)
 - Difficulty: medium
 - Possible mentors: Hariom Verma, Christian Couder

`git cat-file` has options `--batch[=<format>]` and
`--batch-check[=<format>]` that can take a `<format>`. It would be nice
if the implementation of this `<format>` would use the as much as
possible the same code and syntax as the ref-filter formats.

Git used to have an old problem of duplicated implementations of some
logic. For example, Git had at least 4 different implementations to
format command output for different commands. Our previous GSoC
students and Outreachy interns unified some of the formating logic
into [ref-filter](https://github.com/git/git/blob/master/ref-filter.h)
and got rid of similar logic in some command specific files.

Current task is to continue this work, especially Olga's work (see
<https://medium.com/@olyatelezhnaya>) and reuse ref-filter formatting
logic in `git cat-file`.

### Finish convert `git submodule` script to builtin

 - Language: C, shell (bash)
 - Difficulty: medium
 - Possible mentors: Christian Couder, Shourya Shukla

A few components of Git, like `git-submodule.sh`, are still in the
form of shell scripts. This causes problems in production code – in
particular on multiple platforms, e.g. Windows (think:
POSIX-to-Windows path conversion issues).

The idea of this project is to dive into the Git source code and
finish converting `git-submodule.sh` into portable and performant C
code, making it a so-called "built-in".

Shourya Shukla is the latest GSoC student to have been working on
this.

See: <https://lore.kernel.org/git/20201214231939.644175-1-periperidip@gmail.com/>



