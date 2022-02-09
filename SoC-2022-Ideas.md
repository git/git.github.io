---
layout: default
title: SoC 2022 Ideas
---

This is the idea page for Summer of Code 2022 for Git.

*Please completely read the [general application information](https://git.github.io/General-Application-Information)
page before reading the idea list below.*

## Summer of code main project ideas

**Students**: Please consider these ideas as starting points for
generating proposals. We are also more than happy to receive proposals
for other ideas related to Git. Make sure you have read the "Note
about refactoring projects versus projects that implement new
features" in the [general application information](https://git.github.io/General-Application-Information)
page though.

### More Sparse Index Integrations

The [spare index feature](https://github.blog/2021-11-10-make-your-monorepo-feel-small-with-gits-sparse-index/)
accelerates Git commands when using
[sparse-checkout in cone mode](https://github.blog/2020-01-17-bring-your-monorepo-down-to-size-with-sparse-checkout/).
This works by modifying the on-disk index file in a way that includes
"sparse directory" entries instead of only file entries. This requires
care when enabling the sparse index for different commands, as custom
logic might be necessary. At minimum, interaction with the sparse index
needs to be carefully tested in the Git test suite when enabling it.

The most-used commands have already been integrated with the sparse
index feature. This process usually takes a few steps:

1. Add tests to [`t1092-sparse-checkout-compatibility.sh`](https://github.com/git/git/blob/master/t/t1092-sparse-checkout-compatibility.sh)
   for the builtin, with a focus on what happens for paths outside of the
   sparse-checkout cone.
2. Disable [the `command_requires_full_index` setting](https://github.com/git/git/blob/master/repository.h#L35)
   in the builtin and ensure the tests pass.
3. If the tests do not pass, then alter the logic to work with the sparse index.
4. Add tests to [check that a sparse index stays sparse](https://github.com/git/git/blob/38062e73e009f27ea192d50481fcb5e7b0e9d6eb/t/t1092-sparse-checkout-compatibility.sh#L873-L939).
5. Add [performance tests](https://github.com/git/git/blob/master/t/perf/p2000-sparse-operations.sh)
   to demonstrate speedup.

Here is a list of builtins that could be integrated with the sparse index.
They are generally organized in order of least-difficult to most-difficult.
This allows the student to gain partial success early in the project and
the student can complete as many as possible in the timeframe (without
expectation that _all_ will be completed during the project).

* `git mv`
* `git rm`
* `git grep`
* `git rev-parse`
* `git fsck`
* `git check-attr`
* `git describe`
* `git diff-files`
* `git diff-index`
* `git diff-tree`
* `git worktree`
* `git write-tree`
* `git apply`
* `git am`
* `git checkout--worker` (for parallel checkout)
* `git merge-index`
* `git rerere`

Project Size: Medium
Languages: C, shell(bash)

Co-Mentors:
* Derrick Stolee `<derrickstolee@github.com>`
* Victoria Dye `<vdye@github.com>`
