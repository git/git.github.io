---
layout: default
title: SoC 2017 Ideas
navbar: false
---

This is the idea page for Summer of Code 2017 for Git.

## About applying for SoC with the Git project

*Please read this section completely before reading the idea list
 below.*

It is required that students who want to apply to the Git
project for the Summer of Code 2017 complete a tiny, code-related
"microproject" as part of their application.  Please refer to our
[guidelines and suggestions for microprojects](https://git.github.io/SoC-2017-Microprojects)
for more information. Completing a microproject is not only an important
way for us to get experience with applicants, but it will also help
applicants become familiar with Git's development and submission
process.

A complete GSoC application should include a presentation of yourself
(include any argument that may convince mentors that you are able to
complete the project) and detailed explanations about your project.
Ideas below are just ... ideas! The list is not exhaustive, and more
importantly each idea only includes a summary of what is to be done.
An application must include detailed plans on the design, timeline ...
A typical application takes several pages. You should already have read
[the GSoC Student Guide](http://write.flossmanuals.net/gsocstudentguide/writing-a-proposal/)
by now, but re-read it if needed.

Also, working in Git project is not only about writing your own
patches. Constructively critiquing design and implementation of
patches by other people is also an important skill you need to learn
in order to effectively collaborate with others. So, if you have time
and inclination, it would be beneficial to read and understand other
applicants' patches (or any other patch submitted to the mailing-list),
think if you agree that the problem they are trying to solve is worth
solving, the approach they are taking is the best way (or if you think
of a better way to solve it), etc., and respond to their patches with
the result of your thinking as a review.

Please, include link(s) to the mailing-list discussion(s) related to
your microproject in your application (e.g. linking to
[public-inbox](https://public-inbox.org/git/)). If you
participate in the review of other patches, then you may also include
links to discussions that would support your application.

Students must send drafts of their proposal on the mailing-list before
submitting it officially to GSoC to get feedback from the
community. They are strongly encourraged to publish a draft on the
official GSoC website *and* post it to the mailing list for
discussion.

Getting your proposal right can follow the same process as usual patch
submission for Git, as described in the
[microprojects](https://git.github.io/SoC-2017-Microprojects) page and
in `Documentation/SubmittingPatches` in Git's source code. It is also
expected that you will send several versions of your draft, responding
to comments on the list. If you are not sure about your proposal, you
can discuss that in the same email where you introduce yourself or in
separate emails. Please use "[GSoC]" at the beginning of such emails.

In summary, all applicants must (not necessarily in this order):

* Complete a [microproject](https://git.github.io/SoC-2017-Microprojects).

* Write a detailed application explaining their project.

* Discuss their project by posting drafts of their application on the
  mailing-list long before the deadline.

In your application, and in the discussions related to projects you
are interested in, it is a good idea to:

* Include link(s) to the mailing-list discussion(s) related to the
  project you chose in your application or you are interested in, for
  example previous discussions or patch series about the topic. There
  might be interesting discussions about the topics that are several
  year old. It is also a good idea to summarize them.

* Include link(s) to the mailing-list discussion(s) related to the
  previous drafts of your application itself.

* Include link(s) to the mailing-list discussion(s) related to your
  microproject. If your microproject patches have been merged, please
  give the merge commits. Otherwise give their branch names and
  current status in the last "What's cooking in git.git" email from
  Junio.

* Include what is suggested in
  [the GSoC Student Guide](http://write.flossmanuals.net/gsocstudentguide/writing-a-proposal/)

([public-inbox](https://public-inbox.org/git/) can be
used for searching the mailing list and linking to previous
discussions.)

## Note about the number of slots

In 2017, the Git organization has very limited mentoring capacity.
These days we usually accept between 0 and 2 students per year.

## Summer of code main project ideas

**Students**: Please consider these ideas as starting points for
generating proposals. We are also more than happy to receive proposals
for other ideas related to Git.


### git bisect improvements

 - Language: C, shell (bash)
 - Difficulty: medium
 - Possible mentors: Christian Couder, Johannes Schindelin, Stefan Beller

#### Implement `git bisect --first-parent`.

When your project is strictly "new features are merged into trunk,
never the other way around", it is handy to be able to first find
a merge on the trunk that merged a topic to point fingers at when
a bug appears, instead of having to drill down to the individual
commit on the faulty side branch.

See:

  - <https://public-inbox.org/git/20150304053333.GA9584@peff.net/>
  - <https://public-inbox.org/git/4D3CDDF9.6080405@intel.com/>

Searching the mailing list for "bisect --first-parent" might be
helpful too.

#### Fix some git bisect bugs

In some cases, `git bisect` may test too many merge bases, thus
slowing down the bisection (making it closer to linear than
logarithmic).

See:

  - <https://public-inbox.org/git/alpine.DEB.2.20.1702101241210.3496@virtualbox/>


### Convert scripts to builtins

 - Language: C, shell (bash), possibly Perl
 - Difficulty: hard
 - Possible mentors: Johannes Schindelin, Stefan Beller, Christian Couder

Many components of Git are still in the form of shell and Perl scripts.
While this is an excellent choice as long as the functionality is
improved, it causes problems in production code – in particular on
multiple platforms, e.g. Windows (think: POSIX-to-Windows path
conversion issues).

The idea of this project is to dive into the Git source code and
convert a couple of shell and/or Perl scripts into portable and
performant C code, making it a so-called "built-in".

(Un)fortunately, the easy-to-port scripts like `git-pull.sh` are
already ported by now. It is still possible to start with something
small by porting portions of existing shell-scripts to C using a C
helper inside the existing shell-script.


### Convert interactive rebase to C

 - Language: C, shell (bash)
 - Difficulty: hard
 - Possible mentors: Johannes Schindelin, Stefan Beller, Christian Couder

The goal is to move toward an interactive rebase fully in C as described in
[Dscho 's answer to Jakub](http://public-inbox.org/git/alpine.DEB.2.20.1609021432070.129229@virtualbox/)


### `git log --oneline` improvements

 - Language: C, shell (bash)
 - Difficulty: medium
 - Possible mentors: Christian Couder, Johannes Schindelin, Stefan Beller

See discussions in:

<https://public-inbox.org/git/xmqqeg42fslw.fsf@gitster.mtv.corp.google.com/T/#t>
<http://public-inbox.org/git/CA+55aFwT2HUBzZO8Gpt9tHoJtdRxv9oe3TDoSH5jcEOixRNBXg@mail.gmail.com/>

### Improvements to `git name-rev` or `git for-each-ref` or `git log --stdin --no-walk` or `git cat-file --batch-check`

 - Language: C, shell (bash)
 - Difficulty: medium
 - Possible mentors: Christian Couder, Johannes Schindelin, Stefan Beller

The goal is to better format object related information as discussed in:

<https://public-inbox.org/git/CA+P7+xr4ZNCCJkS0=yR-FNu+MrL60YX-+Wsz9L_5LCNhnY_d=A@mail.gmail.com/>

### Submodule related work:

 - Language: C, shell (bash)
 - Difficulty: medium
 - Possible mentors: Stefan Beller, Christian Couder

* Cleanup our test suite.  Do not use a repo itself as a submodule for itself
  (Search for "`git submodule add ./. <name>`")

* Fix the ./ bug for submodule URL handling.
  (c.f. <https://public-inbox.org/git/20161021235939.20792-4-sbeller@google.com/>)

* Teach "`git -C <submodule-path> status`" in an un-populated submodule
  to report the submodule being un-populated, do not fall back to the
  superproject.

* "`git -C sub add .`" might behave just like "`git add sub`"

* Teach "`git log -- <path/into/submodule/and/further>`" to behave
  like "`git -C <path/into/submodule> log -- <and/further>`"

* git archive(/bundle) to have a `--recurse-submodules` flag to
  include the submodule contents.

* Convert a submodule subcommand to C (c.f. 3604242f080a8,
  submodule: port init from shell to C, 2016-04-15)
  I'd propose to go for "foreach" first, as that will
  have most performance impact and is one of the shortest

* (Advanced datastructure knowledge required?)
  Protect submodule from gc-ing interesting HEADS.
  Given that the the modules file has a ‘branch’ field, we may want checkout
  to have the ability to checkout the branch specified in this ‘branch’ field.
  This can be especially useful when making a brand new branch in the
  superproject which can then make corresponding branches in the submodules.
  Or if we are tracking a particular branch, we can checkout that branch
  (given HEAD of that branch is pointing to the same SHA1 that is checked
  into the superproject).  This may be needed to avoid unintended garbage
  collection of commits in the submodules which aren’t reachable by the
  standard refs/branches.

* (Advanced understanding of usability:)
  Design and implement an "overlay" for .gitmodules as a ref.
  To get submodules to usable state, you need to configure a lot. To aid with
  this the file ".gitmodules" in the repository provides some defaults that
  are copied to the actual config e.g. in "`git submodule init`".
  These defaults are not always the right choice (e.g. when working in a
  large organisation, you may have an internal git mirror site, that
  you rather want to clone/fetch from; This can be helped with by configuring
  e.g. `url."<pattern>".insteadOf`; But generally this is a pain for users; this
  large organisation could provide such a configuration as a ref as well,
  which has higher priority than the .gitmodules file, but lower priority
  than the .git/config file.)

### Discourage pushing annotated tag to a branch ref

 - Language: C, shell (bash)
 - Difficulty: medium
 - Possible mentors: Stefan Beller, Johannes Schindelin, Christian Couder

If I run:

    git push origin v1.0:refs/heads/master

and v1.0 is an annotated tag, then I probably meant v1.0^{commit}, not ^{tag}.

### Speeding up reachability queries: generation numbers

 - Language: C (implementation), any (prototype)
 - Difficulty: medium to hard
 - Possible mentors: Jakub Narębski, possibly Jeff King

The goal is to create a helper structure to hold generation numbers
(also known as node level) or other indices to speed up reachability
queries, that is answering a question whether one commit (or other
object) is reachable from another.  This would make `git log` queries,
such as `git log A..B` faster.

At minimum it would consist of a prototype that would help to find
out how much performance improvement we can get out of this idea,
and what is the cost of maintaining such information.

### Speeding up reachability queries: bitmap indices

 - Language: C (git) or Java (JGit), or any (prototype)
 - Difficulty: medium to hard
 - Possible mentors: Jakub Narębski, possibly Jeff King

Nowadays Git uses bitmap index (if there is one) to speed up
reachability queries, which leads to faster clone and fetch;
you can read more about it at <http://githubengineering.com/counting-objects/>.
It also began to be used to speed up `git log` queries.

The idea of bitmap indices came to Git via JGit, Git
implementation in Java. Both Git and JGit use the same file
format for storing [compressed] bitmaps, but they use different
heuristics (different rules) for selecting revisions which
would have bitmap index. For each object that has associated
bitmap, the bit at i-th position is on if and only if
i-th object is reachable from it.

The goal is to examine various heuristics, and what are
their advantages (better performance) and disadvantages (more
disk space) for different scenarios. One could for example
compare Git and JGit heuristics.
