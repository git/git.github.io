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
with help from XXX.
