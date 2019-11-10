---
layout: default
title: Outreachy Round 15 (September 2017)
navbar: false
---

# Outreachy Round 15: September 2017

Git is participating in Round 15 of Outreachy, an internship program
that gives people from under-represented groups the opportunity to work
on Free and Open Source Software projects. You can find out more about
the program, including eligibility, at its
[homepage](https://www.outreachy.org/).

This is the landing page for Git's participation in Round 15 of
Outreachy, which will run from December 2017 to March 2018. Applications
must be received by October 23rd; the [full schedule and application
instructions](https://www.outreachy.org/apply/) are available at the
Outreachy site.

If you're considering applying for the internship, please look over the
project list below, and get in touch with the community! Most
communication happens via the mailing list, but you may also find people
on IRC. Details for both can be found on our [community
page](http://git-scm.com/community). You can email mentors directly if
you want to discuss a potential project, but we encourage cc-ing the
mailing list so that the community can benefit from the discussion.

## Mentors

 - Jeff King &lt;<peff@peff.net>&gt;
 - Christian Couder &lt;<christian.couder@gmail.com>&gt;

## Project Ideas

Note that this is just a list of suggested projects; we are happy to
hear proposals for new projects. If you would like to propose an idea,
please make sure to solicit feedback from the mailing list and mentors.

### Speeding up history traversals with caches

 - Language: C
 - Difficulty: medium to hard
 - Possible mentors: Jeff King

Git frequently has to walk the graph of commits in order to show `git
log` output, compute merge bases, find which tags contain which commits,
and so on. It does so by inflating and parsing each commit object from
disk.

By caching the graph data in an efficient, pre-parsed form, we can speed
up these traversals. Moreover, we can pre-compute properties of each
commit (such as its generation number in the graph) to allow further
optimizations.

### Unifying Git's format languages

 - Language: C
 - Difficulty: medium
 - Possible mentors: Jeff King

Many Git commands take a `--format` option to allow you to specify a
custom output format, but there are at least three distinct formats:

  - `git log` output of commits
  - `git for-each-ref` output of refs (and commits they point to)
  - `git cat-file --batch-check` output of arbitrary objects

It would be less confusing if these all accepted the same syntax, and
where possible provided access to the same items.

### Open Source Grab Bag

Most people don't start to work on open source with an ambitious
three-month project. They work on small changes and get involved in the
community by triaging incoming bug reports and requests, fixing bugs,
and reviewing other people's code.

Rather than a large code project, the mentor would work with the intern
to:

  - learn to interact with the community and identify smaller projects
    worth working on
  - complete a series of small projects, both from the list below and
    from bugs and ideas that come up on the mailing list

Some of the current "small bits" that could be worked on are below. Note
that because these are smaller, some of them may be completed by others
by the time the internship period begins. They're meant only as a
representative sample:

  - handling %(trailer:options) in for-each-ref
  - `git-config` interface improvements (`--default` and `--stdin` options)
  - measure impacts of `pack_release_memory` (and possibly do away with it)

You may find more by [searching for the "leftoverbits" tag](https://public-inbox.org/git/?q=leftoverbits) in the mailing list archive.

### git bisect improvements

 - Language: C, shell (bash)
 - Difficulty: medium
 - Possible mentors: Christian Couder

#### Implement `git bisect --first-parent`.

When your project is strictly "new features are merged into trunk,
never the other way around", it is handy to be able to first find
a merge on the trunk that merged a topic to point fingers at when
a bug appears, instead of having to drill down to the individual
commit on the faulty side branch.

See:

  - <https://public-inbox.org/git/20150304053333.GA9584@peff.net/>
  - <https://public-inbox.org/git/4D3CDDF9.6080405@intel.com/>

Searching the mailing list for "bisect \-\-first-parent" might be
helpful too.

#### Fix some git bisect bugs

In some cases, `git bisect` may test too many merge bases, thus
slowing down the bisection (making it closer to linear than
logarithmic).

See:

  - <https://public-inbox.org/git/alpine.DEB.2.20.1702101241210.3496@virtualbox/>
