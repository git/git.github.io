
## Git Rev News: Edition 2 (April 15, 2015), 10 years of Git & Git Merge 2015!

Welcome to the second edition of [Git Rev News](http://git.github.io/rev_news/rev_news.html),
a digest of all things Git, written collaboratively
on [GitHub](https://github.com/git/git.github.io) by volunteers.

Our goal is to aggregate and communicate
some of the activities on the [Git mailing list](mailto:git@vger.kernel.org)
in a format that the wider tech community can follow
and understand. In addition, we'll link to some of the interesting Git-related
articles, tools and projects we come across.

This special edition covers Git's 10th anniversary and
the [Git Merge 2015](git-merge.com) on April 8th & 9th in Paris, France,
where many Git fans celebrated this anniversary. 

You can contribute to the upcoming edition by sending [pull
requests](https://github.com/git/git.github.io/pulls) or opening
[issues](https://github.com/git/git.github.io/issues).

## Discussions

### General

* [10 years of fun](https://docs.google.com/presentation/d/1sc1xsG9vrRahcckD8WwYeK355SvQH7NSchKH07icJtk/pub)

At the Git Merge 2015, Junio Hamano started the Contributor
Summit by giving a presentation called "10 years of fun with Git" and
saying that he wanted to take advantage of the 10th anniversary to
thank the contributors.

He showed how the first initial revision of Git, created on the 7th of
April 2015 by Linus, looks like, and compared it to a recent
revision. Though its size is around 0.2% of the size of a recent
revision, the initial revision is enough to start using Git.

An interesting question is then "Who made today's Git?" and to answer
that question Junio gave the results of many different queries.

For example to get a commit count sorted by author and excluding merge
commits, one can use:

```
git shortlog --no-merges -n -s v2.4.0-rc0
```

With the results of each such query, Junio gave insights about how we
can interpret the results, told about caveats that might apply, and
also took time to thank the people who appear in these results.

Towards the end of the presentation he also told about people who
didn't appear in the results: bug reporters, feature wishers,
reviewers and mentors, alternative implementors and porters, trainers
and evangelists. And he assigned to this news letter the tasks of
talking about and thanking them all ;-)


### Reviews

### Support

## Releases

## Other News

### Events

* [Git Merge 2015](http://git-merge.com/), The Conference for the Git
Community, took place on April 8th & 9th in Paris, France. The following
resources emerged from the event:
  * TODO: Link to YouTube videos of recorded talks?

### Media


## Credits

This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt;, Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt; and Nicola Paolucci &lt;<npaolucci@atlassian.com>&gt; with help from ???.
