---
title: Git Rev News Edition 34 (December 20th, 2017)
layout: default
date: 2017-12-20 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 34 (December 20th, 2017)

Welcome to the 34th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of November 2017.

## Discussions

### General

* Thank you Thomas and call for help!

From the beginning in March 2015, Thomas Ferris Nicolaisen very
actively contributed to many aspects of Git Rev News. He especially
was the main contributor and editor of the [Other News](#other news)
and [Releases](#releases) sections. He also reviewed and merged a
large number of pull requests and did a lot to improve Git Rev News in
general.

Unfortunately, as his daily work has been focusing on higher level
things like agile and DevOps for some time, he asked to be
de-installed from being an editor.

As there is more and more to do to have a relevant, vibrant and
entertaining news letter for the Git Community, we are thanking Thomas
for his huge contribution, and looking for other people to join our
small Git Rev News editor team.

There is no need to even know Git well for that. It's possible to
participate by just gathering articles about Git, or just checking
which are the latest releases for example. Please contact us (see our
emails [at the bottom](#credits)) if you are interested.

### Reviews

* [[PATCH] config: added --expiry-date type support](https://public-inbox.org/git/0102015fb02bb5be-02c77f83-5a20-4ca1-8bab-5e9519cbd758-000000@eu-west-1.amazonses.com/)

During the [Bloomberg hackathon in London November 11 - 12](https://www.techatbloomberg.com/blog/git-sprint-weekend-bloomberg-london/)
Haaris Mehmood prepared a patch to add an `--expiry-date` option to
`git config`, and then sent it to the mailing list.

Kevin Daudt replied with usual advice to newcomers and the
suggestion to look at the
[SubmittingPatches documentation](https://github.com/git/git/blob/master/Documentation/SubmittingPatches).
Kevin also noticed that a commit message that should explain the
motivation for the patch was missing.

Jeff King, alias Peff, replied to both Kevin and Haaris. Peff
explained to the mailing list that the patch had been made to complete
a task that was proposed during the hackathon, and that the patch has
been submitted using [submitGit](https://submitgit.herokuapp.com/),
and that there were explanations on the
[merge request](https://github.com/git/git/pull/433) that Haaris had
created to use submitGit.

Peff also suggested more ways to improve the patch, and described the
motivation for such a patch:

> We do parse expiration dates from config in a few places, like
> gc.reflogexpire, etc. There's no way for a script using git-config to do
> the same (either adding an option specific to the script, or trying to
> do some analysis on gc.reflogexpire)..

Haaris replied to Peff saying about the hackathon "It was a pleasure
meeting everyone and a great experience!", and discussing the
suggestions to improve the patch.

He then came up a few days later with a version 2 of the patch. A few
more suggestions to improve it were discussed by Junio Hamano, Marc
Branchaud and Christian Couder.

Haaris sent a version 3 a few days later which was reviewed again by
Junio who eventually agreed to queue the version 4 which has now been
merged into the master branch.

A discussion between Peff, Stefan Beller and Heiko Voigt followed for
some time though. This was about clarifying why it is not a good idea,
as Junio had told Haaris, for functions that parse config files to die
in case of errors.

It appears that those functions are also use to parse .gitmodules
files and that these files are often commited into git repositories,
so that these files are not always easy to fix if they are malformed.

### Support

* [imap-send with gmail: curl_easy_perform() failed: URL using bad/illegal format or missing URL](https://public-inbox.org/git/20171129171301.l3coiflkfyy533yz@NUC.localdomain/)

Doron Behar asked for help about `git imap-send` which errored out
when he tried to use it with Gmail:

```
Password for 'imaps://doron.behar@gmail.com@imap.gmail.com':
sending 3 messages
curl_easy_perform() failed: URL using bad/illegal format or missing URL
```

Doron thought that it would work better with `imap.user = doron.behar`
instead of `imap.user = doron.behar@gmail.com` in his config file, but
the error was the same.

Replying to Doron Jonathan Nieder asked him a few questions, suggested that
[a recent commit that makes Git use curl by default for imap](https://github.com/git/git/commit/dbba42bb32f2e896a5413d401c61a0022652fe2b)
might be responsible for the regression, and put Nicolas Morey-Chaisemartin, the commit author, in CC.

Jeff King, alias Peff, followed up by suggesting `--no-curl` as a
possible work-around and `GIT_TRACE_CURL=1` to get more debug
information.

Peff warned that the trace output enabled by `GIT_TRACE_CURL=1` will
contain the imap password though. He then sent a patch to redact auth
information from the trace output, but wrote that the patch ended up
being "a lot more complicated" than he would have liked.

Nicolas Morey-Chaisemartin replied to Jonathan saying that Doron's
`imap.folder = "[Gmail]/Drafts"` config option was causing the problem
as it appeared to work when he used `%5BGmail%5D/Drafts` instead of
`"[Gmail]/Drafts"`.

He further explained:

> curl is doing some fancy handling with brackets and braces. It make
> sense for multiple FTP downloads like
> ftp://ftp.numericals.com/file[1-100].txt, not in our case.  The curl
> command line has a --globoff argument to disable this "regexp" support
> and it seems to fix the gmail case.  However I couldn't find a way to
> change this value through the API...

Daniel Stenberg, the curl maintainer, replied to Nicolas that globbing
isn't part of libcurl which 'actually "just" expects a plain old URL':

> But with the risk of falling through the cracks into the rathole that
> is "what is a URL" (I've blogged about the topic several times in the
> past and I will surely do it again in the future):
>
> A "legal" URL (as per RFC 3986) does not contain brackets, such
> symbols should be used URL encoded: %5B and %5D.
>
> This said: I don't know exactly why brackets cause a problem in this
> case. It could still be worth digging into and see if libcurl could
> deal with them better here...

Nicolas replied that "It would make sense to have a way to ask libcurl
to URI encode for us". But Daniel responded that using the existing
curl_easy_escape() function, which URL encodes a string, would not
work "on an entire existing URL or path since it would then also
encode the slashes etc". Daniel suggested:

> You want to encode the relevant pieces and then put them together
> appropriately into the final URL...

Nicolas recently sent [a patch](https://public-inbox.org/git/18c9478b-19fc-69f2-229f-67c05a42d4f5@suse.com/)
to "URI encode the server folder string before passing it to libcurl".

Eric Sunshine replied that the commit message could be expended to
include information like the error message and "legal" URL not
containing brackets. Junio Hamano agreed with Eric, but it looks like
Nicolas has not sent an updated patch yet.

<!---
## Developer Spotlight:
-->

## Releases


## Other News

__Various__

* [The next Git Merge conference] will be on March 8 in Barcelona,
  Spain. Hopefully there will be a contributor summit on March 7 at
  the same venue.
* [Discussions on Hacker News](https://news.ycombinator.com/item?id=15819033)
  about [the hash transition plan](https://github.com/git/git/blob/master/Documentation/technical/hash-function-transition.txt).

__Light reading__

* Olga Telezhnaia, an [Outreachy](https://www.outreachy.org/) intern working on Git,
  [is blogging about her experience](https://medium.com/@olyatelezhnaya).

__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt; and
Markus Jansen &lt;<mja@jansen-preisler.de>&gt;
with help from XXX.
