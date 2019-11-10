---
layout: default
title: Outreachy Round 17 (September 2018)
navbar: false
---

# Outreachy Round 17: September 2018

Git is participating in Round 17 of Outreachy, an internship program
that gives people from under-represented groups the opportunity to work
on Free and Open Source Software projects. You can find out more about
the program, including eligibility, at its
[homepage](https://www.outreachy.org/).

This is the landing page for Git's participation in Round 17 of
Outreachy, which will run from December 2018 to March 2019. Applications
must be received by October 23rd; the
[full schedule and application instructions](https://www.outreachy.org/apply/)
are available at the Outreachy site.

If you're considering applying for the internship, please look over the
project list below, and get in touch with the community! Most
communication happens via the mailing list, but you may also find people
on IRC. Details for both can be found on our
[community page](http://git-scm.com/community).

You can email mentors directly if you want to discuss a potential
project, but we encourage cc-ing the mailing list so that the
community can benefit from the discussion.

## Mentors

 - Johannes Schindelin &lt;<Johannes.Schindelin@gmx.de>&gt;
 - Christian Couder &lt;<christian.couder@gmail.com>&gt;

## Requirements

All the projects require good knowledge of Git and of the C and shell
(Bash) languages and related tools (gdb, valgrind, make, gcc,
terminal, ...) It's still possible to succeed without knowing all
these tools well, but this makes the projects significantly harder and
require interns to be ready and willing to ask for help soon about
this and to learn fast.

## Project Ideas

Note that this is just a list of suggested projects; we are happy to
hear proposals for new projects. If you would like to propose an idea,
please make sure to solicit feedback from the mailing list and mentors.

### Improve `git bisect`

 - Language: C, shell (bash)
 - Difficulty: medium
 - Possible mentors: Christian Couder, Johannes Schindelin

This consists in working on the following tasks:

#### Finish converting `git bisect` from shell to C

This is about finishing Pranit Bauva's GSoC work on converting
`git bisect` from shell to C.

See the status of the pb/bisect-helper-2 branch in Junio's "What's
cooking in git.git" emails.

See also:

  - <https://public-inbox.org/git/0102015f5e5ee171-f30f4868-886f-47a1-a4e4-b4936afc545d-000000@eu-west-1.amazonses.com/>

#### Fix how `git bisect` handle many merge bases

In some cases, `git bisect` may test too many merge bases, thus
slowing down the bisection (making it closer to linear than
logarithmic).

See:

  - <https://public-inbox.org/git/alpine.DEB.2.20.1702101241210.3496@virtualbox/>

### Convert interactive `git add` to C

 - Language: C, Perl, shell (bash)
 - Difficulty: hard
 - Possible mentors: Johannes Schindelin, Christian Couder

The goal is to move toward an interactive `git add` fully in C by converting
parts of the
[git-add--interactive.perl](https://github.com/git/git/blob/master/git-add--interactive.perl)
script into C.

### Improve `git log --oneline`

 - Language: C, shell (bash)
 - Difficulty: medium
 - Possible mentors: Christian Couder, Johannes Schindelin

See discussions in:

<https://public-inbox.org/git/xmqqeg42fslw.fsf@gitster.mtv.corp.google.com/T/#t>
<http://public-inbox.org/git/CA+55aFwT2HUBzZO8Gpt9tHoJtdRxv9oe3TDoSH5jcEOixRNBXg@mail.gmail.com/>

