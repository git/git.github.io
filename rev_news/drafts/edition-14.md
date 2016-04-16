---
title: Git Rev News Edition 14 (April 20th, 2016)
layout: default
date: 2016-04-20 21:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 14 (April 20th, 2016)

Welcome to the 14th edition of [Git Rev News](http://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](http://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of March 2016 and
also what happened at the Git Contributor Summit on April 4 2016 and
at the Git Merge conference on April 5 2016.

## Discussions

### General

* Discussions at the Git Contributor Summit, part 1, about big repos and big files

The Git Contributor Summit happened on April 4th at the panoramic
rooftop bar of
[the citizenM hotel in New York City, USA](https://www.citizenm.com/destinations/new-york/new-york-times-square).
The whole bar had been reserved by GitHub for the Summit from 10am to
4pm.

Around 20 developers attended. Drinks were provided, and food was
served during the lunch break. Afterwards GitHub also invited
attendants to a diner at a nearby Italian restaurant.

As usual it was an unconference. Attendants interested to discuss a
topic wrote it on a board or voted on the board for it.

The topics that attracted most votes were about performance on big
repositories.

First it was said that it is unfortunate that the performance of many
git commands, like for example `git log`, depends linearly on the
number of refs in the repository.

One possible solution to this problem would be to use some kind of
binary search algorithm to looks up refs, but it's not so easy because
replace refs in 'refs/replace/' should anyway all be read and also
because with the current backend some stat(2) calls are needed to
check if there are loose refs.

This problem should at least partially be solved with the current work
going on to implement other ref backends, especially a
[lmdb](http://symas.com/mdb/) based one.

From there the discussion switched to the case sensitiveness of ref
names and the different problems created by having ref names that
should also be proper filenames: slow filesystems like NTFS, unicode
normalizing filesystems like HFS+, file/directory collisions, reflog
deletion...

It was then mentioned that the tree object lookup could be speed up,
but it would require a more efficient packfile format.

The current effort to implement an `index-helper` daemon to speed up
index reading was also described.

Then some time was spent discussing large objects. There are objects
that can be stored locally, other that cannot. This means that for
example doing something like rsync that manages chunk of files might
not always be possible.

About Git LFS that is now offered by at least GitHub and Microsoft,
there are still a number of problems with it from a user
perspective. First it is not shipped with Git. Another one is that it
is not easy to know which files should go into it.

Also it looks like the filters that are used by git LFS to trigger big
file downloads are executed sequencially which is not good for
performance.

This made people mention potential problems with parallelizing
`git checkout`.

One possibility to improve on Git LFS would be to create another kind
of backend for git objects that would be optimized for large files and
would sit along loose objects and packfiles.

Then the subject switched to possible ways to speed up git status. The
`index-helper` daemon effort was described again, as it can use
[the watchman library](https://facebook.github.io/watchman/) to
efficiently monitor the working tree for changes. The watchman service
must be run manually for now though. And running daemons on Windows
might require some admin rights.

The recently merged effort on improving the untracked cache in the
index was also mentionned.



<!--- ### Reviews -->

<!---
### Support
-->

## Releases


## Other News

__Various__


__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt; and Nicola Paolucci &lt;<npaolucci@atlassian.com>&gt;,
with help from XXX.
