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

**Getting started:** Build Git from source, study the `environment.c` file
and its global variables, understand how `struct repository` and
`struct repository_settings` work, and submit a micro-patch to demonstrate
familiarity with the codebase. Review recent mailing list discussions about
reducing global state.

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

### Improve the new `git repo` command

The `git repo` command was introduced as part of GSoC 2025 (released in Git 2.52.0)
to provide a cleaner interface for querying repository metadata and configuration.
The command currently has two sub-commands: `git repo info` for retrieving repository
information in machine-readable formats, and `git repo structure` for displaying
repository statistics.

See the [mailing list discussion](https://public-inbox.org/git/20250610152117.14826-1-lucasseikioshiro@gmail.com/t/#u)
introducing the command and the [official documentation](https://git-scm.com/docs/git-repo)
for current functionality.

A number of improvements could be made to both sub-commands:

**For `git repo info`**, potential improvements include:

- Remove the dependency on `the_repository` global variable
- Use the category as key (e.g., `git repo info layout` would return all layout-related values)
- Add path-related values currently obtained through `git rev-parse` (see "Options for Files" in git-rev-parse documentation):
  - git-dir
  - common-dir
  - toplevel
  - superproject-working-tree
- Add more values currently obtained through `git rev-parse --git-path`:
  - grafts file
  - index file
  - objects directory
  - hooks directory
  - git-prefix
  - other paths adjusted by `update_common_dir()`

Some work to add path-related values
[has already started](https://github.com/lucasoshiro/git/compare/master...repo-info-path/),
so completing that work might be a good starting point. A major design decision
will need to be made on whether to use relative or absolute paths.

**For `git repo structure`**, functionality from
[git-sizer](https://github.com/github/git-sizer) could be added to provide
more detailed repository analysis and statistics.

The goal of this project is to discuss possible improvements to
`git repo` with the community, reach an agreement about the best
potential improvements, and then implement them. It requires the
desire to be involved in design discussions on the mailing list.

**Getting started:** Build Git from source, experiment with `git repo info` and
`git repo structure` commands, study the implementation in `builtin/repo.c`,
review the initial GSoC proposal and discussions, compare functionality with
`git rev-parse` and identify gaps, and submit a micro-patch to demonstrate
familiarity with the codebase.

**Resources:**
- [Initial implementation discussion](https://public-inbox.org/git/20250610152117.14826-1-lucasseikioshiro@gmail.com/t/#u)
- [Official git-repo documentation](https://git-scm.com/docs/git-repo)
- [git-rev-parse documentation](https://git-scm.com/docs/git-rev-parse)
- [git-sizer tool](https://github.com/github/git-sizer)
- [Work-in-progress branch for path-related values](https://github.com/lucasoshiro/git/compare/master...repo-info-path/)

_Expected Project Size_: 90 or 175 hours or 350 hours

_Difficulty_: Medium

_Languages_: C, shell(bash)

_Possible mentors_:

* Karthik Nayak < <karthik.188@gmail.com> >
* Justin Tobler < <jltobler@gmail.com> >
* Ayush Chandekar < <ayu.chandekar@gmail.com> >
* Siddharth Asthana < <siddharthasthana31@gmail.com> >
* Lucas Seiki Oshiro < <lucasseikioshiro@gmail.com> >

### Complete and extend the `remote-object-info` command for `git cat-file`

From around June 2024 to March 2025, work was undertaken by Eric Ju to add a
`remote-object-info` sub-command to `git cat-file`. This client-side work
builds upon previous server-side work by Calvin Wan that was merged in 2021.
The feature allows clients to request information about objects from a remote
repository without downloading the full object content, which can be especially
useful for partial clones and large repositories.

See the [initial patch series](https://lore.kernel.org/git/20240628190503.67389-1-eric.peijian@gmail.com/)
for the original proposal and discussion.

**The first goal** of this project is to rebase and finalize Eric Ju's
patch series by addressing the remaining feedback from the community review,
so that the improved series can be merged into Git.

**The second goal** is to build on top of that work to add support for
object type information (`%(objecttype)`). This support should be
added both on the server side and on the client side, extending the
protocol to include this metadata and making it available to users.

This project involves both protocol design and implementation work, requiring
careful attention to backward compatibility and performance considerations.

**Getting started:** Build Git from source, study the existing `git cat-file`
command and its batch modes (particularly `--batch` and `--batch-check`),
review Eric Ju's patch series and the community feedback in detail, understand
Calvin Wan's merged server-side work from 2021, study the object-info protocol
extension in `Documentation/gitprotocol-v2.txt`, and submit a micro-patch to
demonstrate familiarity with the codebase.

**Resources:**
- [Eric Ju's patch series (June 2024)](https://lore.kernel.org/git/20240628190503.67389-1-eric.peijian@gmail.com/)
- [git-cat-file documentation](https://git-scm.com/docs/git-cat-file)
- [Git Protocol v2 documentation](https://git-scm.com/docs/gitprotocol-v2)
- Calvin Wan's server-side work (2021) - search Git mailing list archives

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
