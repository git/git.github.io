---
title: Git Rev News Edition 21 (November 16th, 2016)
layout: default
date: 2016-11-16 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 21 (November 16th, 2016)

Welcome to the 21th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of October 2016.

## Discussions

### General

* [Git related discussions at the Google Summer of Code Mentor Summit](https://sites.google.com/site/2016gsocmentorsummit/home)

There were a number of Git related discussions at the Google Summer of
Code (GSoC) Mentor Summit that took place in Google offices in
Sunnyvale California from October 29th to October 30th.

298 mentors from 149 organizations attended the event. There were some
talks that had been planned by the GSoC team at Google to talk mostly
about the past GSoC and the future one. But most of the event was
orginized in an "unconference" style by the mentors who were there.

The first "unconference" style Git related talk was led by
[Brendan Forster](https://github.com/shiftkey) and
[Parker Moore](https://github.com/parkr) from GitHub.
Their goal was to get input from mentors about what they like and
don't like about GitHub.

Most of the GitHub features discussed were related to GitHub pages and
to discussion threads in issues and pull requests. Parker, who is also
the [Jekyll](http://jekyllrb.com/) maintainer, said that GitHub was
planning to release a number of new features in those areas soon, but
he said he was not allowed to talk about those features and when they
would be released in more details.

Some people specifically asked if it would be possible to have a
better integration between email and discussion threads in issues and
pull requests. Discussions about this subject often happen on the Git
mailing list, for example there was a long one last August under the
title ["Working with public-inbox.org"](http://public-inbox.org/git/CAGZ79kasebzJb=b2n=JQiVMrSfJKaVfZaaoaVJFkXWuqKjfYKw@mail.gmail.com/).
But it looks like it is complex and sensitive subject and it is not
likely that good solutions will appear soon.

Ironically the next unconference talk, led by Martin Braun from
[GNU Radio](http://gnuradio.org/) in the same room, called
"The Closed-Source Proliferation", was about the fact that many open
source projects now use and depend on closed source tools like GitHub
and Slack.

A number of mentors said that they are using GitHub because of the
network effect and also because they don't want to spend time, and
maybe money, managing their own servers and a number of different
tools on them.

Some people replied that it should be possible to have projects hosted
by university related organizations like
[OSU Open Source Lab](http://osuosl.org/) using open source tools. It
also appears that Canadian universities are now required to host their
software on servers located in Canada, which excludes GitHub, so some
universities there have started to setup solutions.

People mentioned that [GitLab-CE](https://gitlab.com/gitlab-org/gitlab-ce),
the GitLab Community Edition, was a good solution for them, but others
were not happy that there is [GitLab-EE](https://gitlab.com/gitlab-org/gitlab-ee/),
the GitLab Enterprise Edition, which is not open source.

The last Git related talk called "Git/Gerrit" had been planned by the
Google team and was given by Shawn Pearce. Shawn used to work on Git a
lot, and has created JGit, EGit and [Gerrit](https://www.gerritcodereview.com/).
He is now leading a four people team at Google working on version
control related things. Stefan Beller and Jonathan Nieder, who have
been contributing to Git for a long time, as well as Jonathan Tan, who
started contributing more recently, are part of his team.

In his talk, Shawn described how Git has been developing a big test
suite since it's beginning in 2005 and that it's "worth its weight
when you have 1438 contributors". It has helped Junio set a
"consistent bar about quality" and has been a "huge success" that has
"prevented too many regressions to be counted".

On the contrary Shawn said that he started Gerrit in 2008, but they
didn't really test its REST API until 2013, and didn't do any UI tests
until 2016, "shame on me".

For a long time Gerrit tests rellied on "monkeys testing everything"
and there were a lot of regressions. It was hard to get confidence on
releases.

There are 284 contributors, and now 1847 junit tests and 524 polymer
tests. The tests give confidence in the quality of the new
releases. They are run on every commit which is easy to do with Gerrit
as it can be linked with tools like Travis CI, Circle CI or Jenkins
and the result of the tests can be displayed in the interface along
with the review of each commit.

He said though that automation has its limits as it difficult to test
all configurations.


<!---
### Reviews
-->

<!---
### Support
-->


## Developer Spotlight: Jacob Keller, alias Jake

* Who are you and what do you do?

My name is Jake, I'm an avid contributor to various open source
projects. I currently work for Intel doing Linux network programming
for their 10GbE/40GbE Ethernet networking driver. I have contributed
to Git to help resolve specific issues I've had in the past, and
continue to contribute as I like to give back to the communities that
I depend on as a software developer.

* What would you name your most important contribution to Git?

I would say my most important contribution was modifying the refspec
globs for fetching to allow globbing past / (slash) boundaries.
However, the largest contribution is probably the diff
--submodule=inline-diff format for displaying the full diff between a
submodule change.

* What are you doing on the Git project these days, and why?

Currently I have mostly spent time trying to find areas where my
review could be helpful. There are a few projects I wouldn't mind
working on, but as my employer has not hired me directly to work on
Git, that limits the amount of time that I spend during work hours.
I'm certainly open to new opportunities to contribute in the future.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

Hmm. This is a tough question. I think the biggest things I would work
towards is implementing something like git-series as a core part of
git, at the very least providing the tools needed to make storing the
meta-history easier. For example, using git series today is pretty
good, but I often mess up and use regular git commands to look at
branches or status, and it can tend to make the experience very
brittle. Additionally there is the effort to implement gitrefs for
storing reach ability information about objects. Having this sort of
tool built into git would allow more commands and areas to recognize
them easily, making the entire experience much smoother.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

Honestly? I would re-write much of the interface to be more
consistent, removing aspects which aren't consistent with some of our
more modern design. A good example, was a colleague of mine who is not
very fluent in git recently tried to checkout a new branch from our
main remote, and ended up doing something like:

```
$ git branch -a
# copy the "remotes/origin/branch"
$ git checkout <copied text>
```

which unfortunately didn't actually end up doing what she had
intended. She then accidentally included commits into a release tag
without realizing they weren't on that particular branch. These sort
of pain points exist in a lot of places. Most of the time, they exist
because the tool provides additional express ability and power at some
expense of cost. It may also be simply a documentation issue.

However, there are many warts on the user interface that I would love
to be able to deprecate and remove as they cause issues for co-workers
who are new to Git. I love using Git, and I think the extra tools that
we have created are very beneficial, but I have many coworkers who
haven't gotten over that initial road block.

* What is your favorite Git-related tool/library, outside of Git itself?

I think right now it is git-series. I have also extensively used
Stacked Git in the past. Both of these tools help to manage a patch
series, and this is something that I think core git is currently
lacking in.

* What are your favorite Git features?

Definitely interactive addition, and the ability to rebase local
history. Ever since I realized that I could re-write history, I have
changed my development model to develop and commit fast, then re-write
to look good later. Additionally, I aim to make my work easily
bisectable, since I have used git-bisect "run" to varying degrees of
success. The number of times that I've tried to do some history
archeology and ended up on a "Import from CVS" commit that meant
nothing to my issue, has led me to heavily make use of tools to make
my history as presentable as possible.

* What is your preferred Git development model?

I think pull-requests, with avid local rebasing and squashing of
commits. Followed shortly by the use of a tool like Gerrit or a
mailing list for review.

* How did you get involved in the Git project?

So, at my job, we used to use CVS to store our project history. We
have a lot of tooling around this history, including build servers. We
eventually migrated to Git, but one of the funny things that we did
carried over. When you have to compare to "versions" in  CVS, the only
reasonable way to do so is to tag, since tags are the only thing
combining multiple files together.

So, the people who migrated tools for Git decided that Git builds
would create the same style of tags of the form
"tag_<YYMMDD>_<HHMMSS>, which are these ridiculous tags that we need
for CVS comparing of different build versions.

I tried to make them change the tool, but they refused. I found out
that I could exclude certain refs when fetching, by not fetching tags
and instead fetching specific "refs/tags/*". However, this would still
fetch all these tags I didn't care about. So I modified Git to allow
using * with less than a full section, so I could say fetch
"refs/tags/driver-*" which would fetch human readable tags that were
meaningful without fetching hundreds of tags created by nightly
builds.

## Releases


## Other News

__Various__


__Light reading__
 
* A poem [written in Git](https://mobile.twitter.com/craig552uk/status/793131545989087232)
([repo URL](https://github.com/craig552uk/git-poem)).

__Git tools and sites__


## Credits

This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt;
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt; and Jakub Narębski &lt;<jnareb@gmail.com>&gt;
with help from Jacob Keller.
