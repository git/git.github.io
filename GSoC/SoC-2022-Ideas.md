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

Expected Project Size: 175 hours or 350 hours

Difficulty: Medium

Languages: C, shell(bash)

Possible mentors:
* Derrick Stolee < <derrickstolee@github.com> >
* Victoria Dye < <vdye@github.com> >

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

Expected Project Size: 175 hours or 350 hours

Difficulty: Medium

Languages: C, shell(bash)

Possible mentors:
* Christian Couder < <christian.couder@gmail.com> >
* Hariom Verma < <hariom18599@gmail.com> >

### Reachability bitmap improvements

[Reachability bitmaps][vmg-bitmaps] allow Git to quickly answer queries about
which objects are reachable from a given commit. Instead of a commits parents
and its root tree recursively, we can use a precomputed set of objects encoded
as a bit-string and stored in a `.bitmap` file to answer the query near
instantaneously.

There are a couple of areas where bitmap performance itself could be improved:

  - Individual bitmaps are stored compressed (with [EWAH][ewah]), but we have
    some sense that it can be slow to decompress individual bitmaps (which we
    have to do in order to read them, but also to do things like negate them, OR
    and AND them together, etc).

    One possible project could be to explore using an alternative compression
    scheme (like the more modern [Roaring+Run][roaring-run] technique) to see if
    we can improve overall bitmap performance by reducing the amount of time it
    takes to read an individual bitmap.

    This project would entail designing a suite of performance tests, along with
    any necessary changes to the `.bitmap` format necessary to accommodate the
    new compression scheme, making those changes, and then running the
    performance tests to measure the resulting speed-up.

  - Loading a `.bitmap` file can be slow for large bitmaps. This is because we
    have to read the file sequentially in order to discover the offset of each
    bitmap within the file.

    It should be possible to shave off some time from this step by including a
    small "table of contents" that indicates which commits have bitmaps, and
    where to find them in the `.bitmap` file. In the past [some efforts have
    been made][ttaylorr-commit-table] to do this. But we should undertake more
    performance testing to prove whether this is or isn't a good idea before
    submitting a patch series in this area.

  - [Recent changes][ttaylorr-bitmaps] have made it possible to repack a
    repository's objects into a sequence of packs whose object count forms a
    geometric progression (e.g., if the first pack has `N` objects, the next
    pack will have at least `2N` objects, then `4N` objects and so on).

    But even when repacking a repository in this way, regenerating its bitmaps
    can still take a long time. One possible approach to this would be a new
    mode of generating bitmaps that is more "incremental" in nature. In other
    words, a mode which only adds new bitmaps for commits introduced between
    successive bitmap generations.

    Because of how individual bitmaps are generated, this will result in only
    having to traverse objects between the new bitmap tips and old ones,
    resulting in overall faster bitmap generation.

    Like the above, this project would involve designing a set of performance
    tests, implementing the changes required to introduce this new type of
    bitmap generation, and then running those tests against your new code.

  - Other (larger, longer-term) ideas include: rethinking how we select which
    commits receive bitmaps (and/or having bitmaps represent multiple commits
    instead of just one to "summarize" small sets of commits), or improving how
    we handle queries that use a bitmap but do not have complete coverage.
    GSoC students should consider these projects more advanced, and thus they
    are not explained in as much detail here. Instead, this point serves to
    illustrate that there are opportunities to explore larger projects should we
    decide they are more interesting than the above or we have time to take them
    on.

This project will give GSoC students a broad overview of reachability bitmaps,
with the goal of improving their performance in some way or another. Students
can expect hands-on mentorship, but will have the agency to pick one or more of
the above sub-projects (or create their own!) that interests them most.

Expected Project Size: 175 hours or 350 hours

Difficulty: Medium

Languages: C, shell

Possible mentors:
* Taylor Blau < <me@ttaylorr.com> >
* Kaartic Sivaraam < <kaartic.sivaraam@gmail.com> >

[vmg-bitmaps]: https://github.blog/2015-09-22-counting-objects/
[ewah]: https://arxiv.org/abs/0901.3751
[roaring-run]: https://roaringbitmap.org/about/
[ttaylorr-commit-table]: https://lore.kernel.org/git/YNuiM8TR5evSeNsN@nand.local/
[ttaylorr-bitmaps]: https://github.blog/2021-04-29-scaling-monorepo-maintenance/
