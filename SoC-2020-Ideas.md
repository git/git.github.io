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



