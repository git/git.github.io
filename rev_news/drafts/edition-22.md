---
title: Git Rev News Edition 22 (December 14th, 2016)
layout: default
date: 2016-12-14 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 22 (December 14th, 2016)

Welcome to the 22th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of November 2016.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->


### Support

* [v2.11 new diff heuristic?](https://public-inbox.org/git/CAHd499AjXh1YnVgBj_8j0fgvOgOn53y+sPBBy6y7mSM-+dCyVw@mail.gmail.com/)

Eight days before the v2.11.0 Git release, Robert Dailey asked on the
mailing list if there would be a new diff heuristic in the new release:

> I dug into the git diff documentation here:
>
> https://git-scm.com/docs/git-diff
>
> It mentions a "--compaction-heuristic" option. Is this the new
> heuristic outlined by the release notes? If not, which is it? Is the
> compaction heuristic compatible with the histogram diff algorithm? Is
> there a config option to turn this on all the time? For that matter,
> is this something I can keep on all the time or is it only useful in
> certain situations?
>
> There's still so much more about this feature I would like to know.

Stefan Beller answered most of Robert's questions saying that indeed
the "--compaction-heuristic" option is the new heuristic, and it is
compatible with the histogram diff algorithm "as the compaction
heuristic is applied after the actual diff is performed".

Stefan also said that 'diff.compactionHeuristic' is the config option
to turn this heuristic on and that "the background story (and what
this new compaction heuristic is doing) is found at
[Michael Haggerty's diff-slider-tools repository](https://github.com/mhagger/diff-slider-tools)".

But Jeff King, alias Peff, who works with Michael for GitHub, replied
that the above 'compaction heuristic' is about "the 'old' attempt at a
similar feature from v2.9. The 'new' one goes by the name
'--indent-heuristic' (and 'diff.indentHeuristic' in the config).

Peff added that "more discussion about how it works" can be found in
the commit message of
[Michael's commit that introduces the 'indent heuristic'](https://github.com/git/git/commit/433860f3d0beb0c6f205290bd16cda413148f098).

This commit message indeed looks impressive and shows that a lot of
work has been going on for a long time to improve the diff
heuristics. It can make one wonder if Git developers are soon going to
use artificial intelligence algorithms to train a neural networks to
give the best possible diffs.

Anyway Jacob Keller also answered saying that the config option is
undocumented and that:

> Currently it is being evaluated and likely we want to make it default
> in the near future once we are certain that it helps and doesn't make
> any difference worse.
>
> So long term you will not need any special knobs to benefit.

Peff agreed that "it is not the default in v2.11, but it probably
will become so in a future version."

Later in the [GitHub blog post about the v2.11 release](https://github.com/blog/2288-git-2-11-has-been-released),
Peff mentioned this new (undocumented but testable) feature.

It's interesting to see that users are interested in better diff
algorithms, and that Git developers provide them with new advanced
options to play with before hopefully improving the default
algorithms.

## Releases


## Other News

__Various__


__Light reading__


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt; and
Markus Jansen &lt;<mja@jansen-preisler.de>&gt;
with help from XXX.
