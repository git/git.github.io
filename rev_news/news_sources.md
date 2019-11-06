---
layout: default
title: Git Rev News Sources
---

# Sources

Some ideas on where we can go to gather Git Rev News material.

## Mailing lists

* [Git mailing list](https://public-inbox.org/git/)
* [Git for Windows](https://groups.google.com/forum/#!forum/msysgit)
* [JGit](https://dev.eclipse.org/mailman/listinfo/jgit-dev)
* [libgit2](https://libgit2.github.com/) (and [friends](https://github.com/libgit2))
* ...

## Blogs (the RSS-feeds can be aggregated into one shared resource)

* [Junio's blog](http://git-blame.blogspot.com/)
* Company blogs of [GitHub](https://github.com/blog), [BitBucket](https://blog.bitbucket.org/),
  [GitLab](https://about.gitlab.com/blog/), etc.
* ...

## Forums/news

* [Hacker News](https://news.ycombinator.com/) (can be monitored using Google Alerts or searched
  [here](https://hn.algolia.com/?query=git&sort=byPopularity&prefix=false&page=0&dateRange=last24h&type=story) or
  [here](http://newscombinator.com/))
* [Reddit/git](http://www.reddit.com/r/git) (offers RSS)
* [The Changelog/Git](https://changelog.com/topic/git/)
* ...

# Process

For every upcoming edition, do the following:

* Create a new edition-[number].md file in some draft directory.
* Post a mail/thread to the Git dev list asking if
  there's anything anyone wants included in the upcoming edition.
* Post an issue in this GitHub repository asking for
  comments/contributions - anyone can comment on this, or send pull-
  requests for editing the edition.md file.
* When the time comes to release the edition, move the edition.md file
  into some designated publishing directory, so it appears in
  the feed on git.github.io/rev_news/.
* Announce the edition to the Git mailing list plus any social media channels you prefer.
* Send the newsletter email (manual process using Mailchimp) -
  basically just copying the edition into MailChimp for publishing.
  Everyone from the editor team should have account access.

Links can be handily collected using a browser extension like [diigo](https://www.diigo.com/user/Tfnico/gitrevnews),
but note that popular links may be duplicated by other contributors.

When adding links, this is a great tool: [chitsaou/copy-as-markdown](https://github.com/chitsaou/copy-as-markdown/)
