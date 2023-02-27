---
layout: default
title: SoC 2023 Ideas
---

This is the idea page for Summer of Code 2023 for Git.

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

* `git describe`
* `git write-tree`
* `git diff-files`
* `git diff-index`
* `git diff-tree`
* `git worktree`
* `git check-attr`
* `git checkout--worker` (for parallel checkout)
* `git apply`
* `git am`
* `git fsck`
* `git merge-index`
* `git rerere`

Expected Project Size: 175 hours or 350 hours

Difficulty: Medium

Languages: C, shell(bash)

Possible mentor:  Victoria Dye < <vdye@github.com> >

### Unify ref-filter formats with other pretty formats

Git has an old problem of duplicated implementations of some
logic. For example, Git had at least 4 different implementations to
format command output for different commands.

Our previous GSoC students and Outreachy interns unified some of the
formating logic into
[ref-filter](https://github.com/git/git/blob/master/ref-filter.h) and
got rid of similar logic in some command specific files. Current task
is to continue this work and reuse ref-filter formatting logic in
[pretty](https://github.com/git/git/blob/master/pretty.h).

See:

  - this discussion <https://lore.kernel.org/git/87pnsfkvk1.fsf@0x63.nu/T/#u>
  - Hariom Verma's GSoC 2020 final report <https://harry-hov.github.io/blogs/posts/the-final-report>
  - Nsengiyumva Wilberforce's recent work on this <https://lore.kernel.org/git/?q=f%3A+Nsengiyumva+Wilberforce>

Expected Project Size: 175 hours or 350 hours

Difficulty: Medium

Languages: C, shell(bash)

Possible mentors:
* Christian Couder < <christian.couder@gmail.com> >
* Hariom Verma < <hariom18599@gmail.com> >

