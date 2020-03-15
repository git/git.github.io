---
layout: default
title: SoC 2020 Ideas
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
 - Possible co-mentors: Heba Waly

Git uses various clever methods for making operations on very large
repositories faster, from bitmap indices for `git fetch`[1], to generation
numbers (also known as topological levels) in the commit-graph file for
commit graph traversal operations like `git log --graph`[2].

One possible improvement that can make Git even faster is using min-post
intervals labeling[3].  The basis of this labeling is post-visit order of
a depth-first search (DFS) traversal tree of a commit graph, let's call it
'post(v)'.

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
involved variant of it, for example as described in [4,5,6]), store it
in the commit-graph file, and then use it for speeding up git
commands, such as[3]:

 - `git merge-base --is-ancestor`
 - `git branch --contains`
 - `git tag --contains`
 - `git branch --merged`
 - `git tag --merged`
 - `git merge-base --all`
 - `git log --topo-sort`

One can start with using this labeling for making selected single
command faster, for example `--contains` queries (as it was done for
generation numbers).

Next task would be, time permitting, to make it possible to update the
labeling without recomputing it from scratch, and to make it
compatible with incremental update of the commit-graph file[7].

References:

1. <https://githubengineering.com/counting-objects/>
2. <https://devblogs.microsoft.com/devops/supercharging-the-git-commit-graph-iii-generations/>
3. <https://drive.google.com/open?id=1psMBVfcRHcZeJ7AewGpdoymrEfFVdXoK>
4. <https://arxiv.org/abs/1404.4465>  
   section 3.3 "Pruning Based on DFS Numbering"
5. <https://github.com/steps/Ferrari> and <https://arxiv.org/abs/1211.3375>
6. <https://colab.research.google.com/drive/1V-U7_slu5Z3s5iEEMFKhLXtaxSu5xyzg>
7. <https://devblogs.microsoft.com/devops/updates-to-the-git-commit-graph-feature/>

See also discussion in:

<https://public-inbox.org/git/86tvl0zhos.fsf@gmail.com/t/>


