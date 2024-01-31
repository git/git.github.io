---
layout: default
title: SoC 2024 Ideas
---

This is the idea page for Summer of Code 2024 for Git.

*Please completely read the [general application information](https://git.github.io/General-Application-Information)
page before reading the idea list below.*

## Summer of code main project ideas

**Students**: Please consider these ideas as starting points for
generating proposals. We are also more than happy to receive proposals
for other ideas related to Git. Make sure you have read the "Note
about refactoring projects versus projects that implement new
features" in the [general application information](https://git.github.io/General-Application-Information)
page though.

### Move existing tests to a unit testing framework

Git has a lot of test cases that need to migrated to use a
new unit testing framework. This typically involves moving
t/helper/test-foo.c + a sh test to invoke test-foo over to
using the unit testing framework.

Our previous Outreachy intern ported some of the unit tests

See:

  - this discussion <https://lore.kernel.org/git/cover.1692297001.git.steadmon@google.com/>
  - Hariom Verma's GSoC 2020 final report <https://harry-hov.github.io/blogs/posts/the-final-report>
  - Nsengiyumva Wilberforce's recent work on this <https://lore.kernel.org/git/?q=f%3A+Nsengiyumva+Wilberforce>

Expected Project Size: 175 hours or 350 hours

Difficulty: Medium

Languages: C, shell(bash)

Possible mentors:
* Christian Couder < <christian.couder@gmail.com> >

