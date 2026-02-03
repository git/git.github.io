---
layout: default
title: SoC 2026 Ideas
---

![git logo >](https://git-scm.com/images/logos/downloads/Git-Logo-2Color.svg)

This is the idea page for Summer of Code 2026 for Git.

*Please completely read the [general application information](https://git.github.io/General-Application-Information)
page before reading the idea list below.*

## Summer of code main project ideas

**Students**: Please consider these ideas as starting points for
generating proposals. We are also more than happy to receive proposals
for other ideas related to Git. Make sure you have read the "Note
about refactoring projects versus projects that implement new
features" in the [general application information](https://git.github.io/General-Application-Information)
page though.

### Note about limit of project selection

Kindly note that considering the bandwidth of available mentors, the
Git project would only mentor up to 3 or 4 contributors this year.

This is not a hard and fast rule. It may change if more community members are
willing to mentor in the coming days. For instance, this may happen when
a new project is proposed and some community member volunteers to mentor
the same.

### Refactoring in order to reduce Git's global state

This project focuses on modernizing Git's environment handling by refactoring
the `environment.c` code to reduce global state. The goal is to move environment
variables and configuration from global scope into more appropriate local
contexts, primarily into the `struct repository` / `struct repository_settings`
structure. This architectural improvement will make the codebase more
maintainable and potentially enable better multi-repository handling in the
future.

The project involves careful refactoring of Git's core environment
handling code, requiring strong C programming skills and attention to
detail. Design discussions on the mailing list to find the best way to
refactor some variables will likely happen.

The contributor will identify global variables that can be moved to
local scope, implement the necessary structural changes, and ensure
all affected code paths continue to work correctly. This includes
updating tests, fixing any regressions, and documenting the
architectural changes.

_Expected Project Size_: 90 or 175 hours or 350 hours

_Difficulty_: Medium

_Languages_: C, shell(bash)

_Possible mentors_:

* Christian Couder < <christian.couder@gmail.com> >
* Karthik Nayak < <karthik.188@gmail.com> >
* Justin Tobler < <jltobler@gmail.com> >
* Ayush Chandekar < <ayu.chandekar@gmail.com> >
* Siddharth Asthana < <siddharthasthana31@gmail.com> >
* Lucas Seiki Oshiro < <lucasseikioshiro@gmail.com> >
* Chandra Pratap < <chandrapratap3519@gmail.com> >

### Improve the new `git repo` command

The `git repo` command now has the `info` and `structure` sub-commands
to retrieve and display information about a repository. A number of
improvements could be made to both of these.

For example `git repo info` could be improved in the following ways:

- remove the dependency on `the_repository` global variable
- use the category as key
- add the path-related values (copied from git-rev-parse "Options for
  Files"):
  - git-dir
  - common-dir
  - toplevel
  - superproject-working-tree
- add more values currently obtained through `git rev-parse --git-path`:
  - grafts file
  - index file
  - objects directory
  - hooks directory
  - git-prefix
  - other paths that are adjusted by `update_common_dir()`

Some work to add path-related values
[has already started](https://github.com/lucasoshiro/git/compare/master...repo-info-path/),
so completing that work might be a good start. It would require a
decision to be made whether relative or absolute paths should be used
though.

For `git repo structure` some functionality from
[git-sizer](https://github.com/github/git-sizer) could be added.

The goal of this project would be to discuss possible improvements to
`git repo` with the community, reach an agreement about the best
potential improvements, and then implement them. It requires the
desire to be involved in design discussions on the mailing list.

_Expected Project Size_: 90 or 175 hours or 350 hours

_Difficulty_: Medium

_Languages_: C, shell(bash)

_Possible mentors_:

* Karthik Nayak < <karthik.188@gmail.com> >
* Justin Tobler < <jltobler@gmail.com> >
* Ayush Chandekar < <ayu.chandekar@gmail.com> >
* Siddharth Asthana < <siddharthasthana31@gmail.com> >
* Lucas Seiki Oshiro < <lucasseikioshiro@gmail.com> >
* Chandra Pratap < <chandrapratap3519@gmail.com> >

### Complete and extend the `remote-object-info` command for `git cat-file`

From around June 2024 to March 2025 some work to add a
`remote-object-info` sub-command to `git cat-file` was undertaken by
Eric Ju (see https://lore.kernel.org/git/20240628190503.67389-1-eric.peijian@gmail.com/).
This client side work uses previous work by Calvin Wan on the server
side that was merged in 2021.

The first goal of this project is to rebase and finalize Eric Ju's
patch series by addressing the remaining feedback, so that the
improved series get merged.

The second goal is to build on top of that work to add support for
object type information (`%(objecttype)`). This supports should be
added both on the server and on the client side.

_Expected Project Size_: 90 or 175 hours or 350 hours

_Difficulty_: Medium

_Languages_: C, shell(bash)

_Possible mentors_:

* Christian Couder < <christian.couder@gmail.com> >
* Karthik Nayak < <karthik.188@gmail.com> >
* Justin Tobler < <jltobler@gmail.com> >
* Ayush Chandekar < <ayu.chandekar@gmail.com> >
* Siddharth Asthana < <siddharthasthana31@gmail.com> >
* Lucas Seiki Oshiro < <lucasseikioshiro@gmail.com> >
* Chandra Pratap < <chandrapratap3519@gmail.com> >


