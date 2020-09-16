---
layout: default
title: SoC 2020 Ideas
navbar: false
---

This is the idea page for Summer of Code 2020 for Git.

*Please completely read the [general application information](https://git.github.io/General-Application-Information) 
page before reading the idea list below.*

## Summer of code main project ideas

**Students**: Please consider these ideas as starting points for
generating proposals. We are also more than happy to receive proposals
for other ideas related to Git. Make sure you have read the "Note
about refactoring projects versus projects that implement new
features" in the [general application information](https://git.github.io/General-Application-Information)
page though.

### Unify ref-filter formats with other `--pretty` formats

 - Language: C, shell (bash)
 - Difficulty: medium
 - Possible mentors: Christian Couder

Git has an old problem of duplicated implementations of some
logic. For example, Git had at least 4 different implementations to
format command output for different commands. Our previous GSoC
students and Outreachy interns unified some of the formating logic
into [ref-filter](https://github.com/git/git/blob/master/ref-filter.h)
and got rid of similar logic in some command specific files. Current
task is to continue this work and reuse ref-filter formatting logic in
[pretty](https://github.com/git/git/blob/master/pretty.h).

See discussion in:

<https://lore.kernel.org/git/87pnsfkvk1.fsf@0x63.nu/T/#u>

### `git log --oneline` improvements

 - Language: C, shell (bash)
 - Difficulty: medium
 - Possible mentors: Christian Couder

A number of Git commands, like `git log`, can show commit information
in a configurable way using
["pretty" formats](https://github.com/git/git/blob/master/Documentation/pretty-formats.txt).
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

<https://lore.kernel.org/git/xmqqeg42fslw.fsf@gitster.mtv.corp.google.com/T/#t>
<https://lore.kernel.org/git/CA+55aFwT2HUBzZO8Gpt9tHoJtdRxv9oe3TDoSH5jcEOixRNBXg@mail.gmail.com/T/#t>

### Convert scripts to builtins

 - Language: C, shell (bash), possibly Perl
 - Difficulty: medium
 - Possible mentors: Christian Couder

A few components of Git are still in the form of shell and sometimes
Perl scripts. This causes problems in production code – in particular
on multiple platforms, e.g. Windows (think: POSIX-to-Windows path
conversion issues).

The idea of this project is to dive into the Git source code and
convert a couple of shell and/or Perl scripts into portable and
performant C code, making it a so-called "built-in".

It will be an important part of the project to discuss and find the
most interesting scripts or parts of scripts to be ported.

See discussion in:

<https://lore.kernel.org/git/nycvar.QRO.7.76.6.2001301154170.46@tvgsbejvaqbjf.bet/T/#t>

### Commit graph labeling for speeding up git commands

 - Language: C
 - Difficulty: hard
 - Possible mentors: Jakub Narębski
 - Possible co-mentors: Heba Waly, Derrick Stolee

Git uses various clever methods for making operations on very large
repositories faster, from bitmap indices for `git fetch`[[1][]], to generation
numbers (also known as topological levels) in the commit-graph file for
commit graph traversal operations like `git log --graph`[[2][]].

Unfortunately it turned out that we can get worse performance when
using those generation numbers than without them, with using
committerdate as a heuristics[[8][],[3][]] (and for selecting which
commits to walk first).  It can lead to a large increase in number of
commits walked. The example we saw in the Linux kernel repository was
a bug fix created on top of a very old commit, so there was a commit
of low generation with very high commit-date that caused extra
walking.  (See [[9][]] for a detailed description of the data shape in
this case.)

Therefore the need for **generation number v2** was born.  Various
candidates were examined (see e.g. <https://github.com/derrickstolee/gen-test>
for initial list).  New generation number needed to provide good
performance, incremental updates, and (due to unfortunate
problem[[10][],[3][]]) also backward compatibility.

The generation number v2 that fulfills those requirements is 'backward
compatible date ceiling' or 'corrected commit date with monotonically
increasing offsets[[11][],[3][]].  What is stored in the commit-graph
in place of generation number is value of date offset; it is chosen to
be at least 1 more than maximum offsets of the parents of the commit,
while committerdate+offset (corrected commit date) also meets this
condition.

The task would be then to update the generation number to "v2" based
on the referenced definition.  A part of this task would be moving the
`generation` member of `struct commit` into a slab before making it a
64-bit value.  (To learn how to store data on a slab one can see
ongoing work on adding Bloom filter for changed files to the commit
graph [[12][]].)  This part could be done with help of [Coccinelle][]
scripts, like the ones in [`contrib/coccinelle`](https://github.com/git/git/tree/master/contrib/coccinelle).

Another part of this task could be examining performance
improvements, like in <https://github.com/derrickstolee/gen-test>
(perhaps extending it with `--contains`/`--merged` test).

An _alternative_ would be examining other possible improvements that
can make Git even faster than just using generation numbers, like
using min-post **intervals labeling**[[3][]].  The basis of this
labeling is post-visit order of a depth-first search (DFS) traversal
tree of a commit graph, let's call it 'post(v)'.

If for each commit 'v' we would compute and store in the commit-graph
file two numbers: 'post(v)' and the minimum of 'post(u)' for all commits
reachable from 'v', let's call the latter 'min_graph(v)', then the
following condition is true:

> if 'v' can reach 'u', then min_graph(v) <= post(u) <= post(v)

This labeling can be used to quickly find which commits are
unreachable (it is so called negative-cut filter).

If for each commit 'v' we would compute and store in the commit-graph
file two numbers: 'post(v)' and the minimum of 'post(u)' for commits
that were visited during the part of depth-first search that started
from 'v' (which is the minimum of post-order number for subtree of a
spanning tree that starts at 'v'), let's call the later 'min_tree(v)',
then the following condition is true:

> if min_tree(v) <= post(u) <= post(v), then 'v' can reach 'u'

This labeling can be used to quickly find which commits are
reachable, because if they are reachable in the spanning tree for
commit graph, then they are reachable in commit graph itself.  (Such
labeling is called positive-cut filter).

The task would be to implement computing such labeling (or a more
involved variant of it, for example as described in [[4][],[5][],[6][]]), store it
in the commit-graph file, and then use it for speeding up git
commands, such as[[3][]]:

 - `git merge-base --is-ancestor`
 - `git branch --contains`
 - `git tag --contains`
 - `git branch --merged`
 - `git tag --merged`
 - `git merge-base --all`
 - `git log --topo-sort`

Before starting on this task, at the beginning of the GSoC, it might
be good idea to have an exploration period, to determine which methods
brings which performance improvements.  This _could_ be done with the
help of "Reachability labels for version control graphs.ipynb" Jupyter
Notebook on Google Colaboratory[[6][]] (in Python).  This notebook was
created to answer such questions, though the exploration didn't get
finished.  It would be possible with this notebook to at least find
the amount of false negatives for min-post interval labeling in
git.git or Linux kernel repo.  Alternatively this could be done by
creating prototypes and perhaps examining performance in portable and
repeatable way using [trace2 API][api-trace2], like it was done
for [gen-test][] (experimenting with candidates for generation number
v2, see above).

One can start this task with using min-post interval labeling for
making selected single command faster, for example for `--contains`
queries (as it was done for generation numbers).

Next task would be, time permitting, to make it possible to update the
labeling without recomputing it from scratch, and to make it
compatible with incremental update of the commit-graph file[[7][],[3][]].

References:

1. <https://githubengineering.com/counting-objects/>
2. <https://devblogs.microsoft.com/devops/supercharging-the-git-commit-graph-iii-generations/>
3. <https://drive.google.com/open?id=1psMBVfcRHcZeJ7AewGpdoymrEfFVdXoK>
    - <https://www.slideshare.net/JakubNarbski/graph-operations-in-git-version-control-system-how-the-performance-was-improved-for-large-repositories-how-can-it-be-further-improved>
    - <https://speakerdeck.com/jnareb/graph-operations-in-git-slides-2019>
4. <https://arxiv.org/abs/1404.4465>  
   section 3.3 "Pruning Based on DFS Numbering"
5. <https://github.com/steps/Ferrari> and <https://arxiv.org/abs/1211.3375>
6. <https://colab.research.google.com/drive/1V-U7_slu5Z3s5iEEMFKhLXtaxSu5xyzg>
7. <https://devblogs.microsoft.com/devops/updates-to-the-git-commit-graph-feature/>
8. <https://git.github.io/rev_news/2018/11/21/edition-45/#general>
9. <https://lore.kernel.org/git/efa3720fb40638e5d61c6130b55e3348d8e4339e.1535633886.git.gitgitgadget@gmail.com/>
10. <https://git.github.io/rev_news/2019/06/28/edition-52/#reviews>
11. <https://lore.kernel.org/git/86o8ziatb2.fsf_-_@gmail.com/>
12. <https://public-inbox.org/git/pull.497.git.1576879520.gitgitgadget@gmail.com/t/#u>

[1]: https://githubengineering.com/counting-objects/ "Counting Objects | The GitHub Blog"
[2]: https://devblogs.microsoft.com/devops/supercharging-the-git-commit-graph-iii-generations/ "Supercharging the Git Commit Graph III: Generations and Graph Algorithms | Azure DevOps Blog"
[3]: https://drive.google.com/open?id=1psMBVfcRHcZeJ7AewGpdoymrEfFVdXoK "Graph operations in Git version control system (PDF)"
[4]: https://arxiv.org/abs/1404.4465 "[arXiv:1404.4465] PReaCH: A Fast Lightweight Reachability Index using Pruning and Contraction Hierarchies"
[5]: https://arxiv.org/abs/1211.3375 "[arXiv:1211.3375] High-Performance Reachability Query Processing under Index Size Restrictions"
[6]: https://colab.research.google.com/drive/1V-U7_slu5Z3s5iEEMFKhLXtaxSu5xyzg "Reachability labels for version control graphs.ipynb | Colaboratory"
[7]: https://devblogs.microsoft.com/devops/updates-to-the-git-commit-graph-feature/ "Updates to the Git Commit Graph Feature | Azure DevOps Blog"
[8]: https://git.github.io/rev_news/2018/11/21/edition-45/#general "Git Rev News: Edition 45 (November 21st, 2018) :: [RFC] Generation Number v2"
[9]: https://lore.kernel.org/git/efa3720fb40638e5d61c6130b55e3348d8e4339e.1535633886.git.gitgitgadget@gmail.com/ "[PATCH 1/1] commit: don't use generation numbers if not needed"
[10]: https://git.github.io/rev_news/2019/06/28/edition-52/#reviews "Git Rev News: Edition 52 (June 28th, 2019) :: [PATCH 00/17] [RFC] Commit-graph: Write incremental files"
[11]: https://lore.kernel.org/git/86o8ziatb2.fsf_-_@gmail.com/ "[RFC/PATCH] commit-graph: generation v5 (backward compatible date ceiling)"
[12]: https://public-inbox.org/git/pull.497.git.1576879520.gitgitgadget@gmail.com/t/#u "[PATCH 0/9] [RFC] Changed Paths Bloom Filters"

[Coccinelle]: http://coccinelle.lip6.fr/ "Coccinelle: A Program Matching and Transformation Tool for Systems Code"
[api-trace2]: https://git-scm.com/docs/api-trace2 "Trace2 API | Documentation/technical/api-trace2.txt"
[gen-test]: https://github.com/derrickstolee/gen-test "Generation Number Performance Test - Test scripts for testing new versions of generation numbers"

See also discussion in:

<https://public-inbox.org/git/86tvl0zhos.fsf@gmail.com/t/>


