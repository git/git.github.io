---
title: Git Rev News Edition 4 (June 3rd, 2015)
layout: default
date: 2015-06-03 21:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 4 (June 3rd, 2015)

Welcome to the fourth edition of [Git Rev News](http://git.github.io/rev_news/rev_news.html),
a digest of all things Git. For our goals, the archives, the way we work, how to contribute or to
subscribe see [the Git Rev News page](http://git.github.io/rev_news/rev_news.html) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of May 2015.

## Discussions

### General

* [submitGit for patch submission](http://thread.gmane.org/gmane.comp.version-control.git/269699/)

At the [Git Merge 2015](http://git-merge.com/) during the Contributor
Summit, there were discussions about how to help people send patches
to the Git mailing list.

Properly sending patches to the mailing list is not easy in the first
place because email clients these days tend to heavily reformat the
content they send. This reformating, which can include word-wraping
the text, making it quoted-printable, adding MIME parts or replacing
tabs with spaces, will in most cases prevent any inlined patch sent to
the Git mailing list to be applied or even reviewed.

That's why the SubmittingPatches documentation file has [a long
explanation to help people send patches](https://github.com/git/git/blob/master/Documentation/SubmittingPatches#L137)
which starts with:

> Learn to use format-patch and send-email if possible.  These commands
> are optimized for the workflow of sending patches, avoiding many ways
> your existing e-mail client that is optimized for "multipart/*" mime
> type e-mails to corrupt and render your patches unusable.

[git send-email](http://git-scm.com/docs/git-send-email) is indeed the
best way to send emails to the mailing list once it has been properly
configured. The problem is that it is not very easy to configure to
say the least, especially on Windows.

[A recent discussion on the mailing
list](http://thread.gmane.org/gmane.comp.version-control.git/268000/)
shows how difficult it can be even for developers to find a way to
properly send a patch to the mailing list. Toward the end of the
discussion, Stefan Beller summerized the discussions at the [Git Merge
2015](http://git-merge.com/) this way:

> This workflow discussion was a topic at the GitMerge2015 conference,
> and there are essentially 2 groups, those who know how to send email
> and those who complain about it. A solution was agreed on by nearly all
> of the contributors. It would be awesome to have a git-to-email proxy,
> such that you could do a git push <proxy> master:refs/for/mailinglist
> and this proxy would convert the push into sending patch series to the
> mailing list. It could even convert the following discussion back into
> comments (on Github?) but as a first step we'd want to try out a one
> way proxy.
>
> Unfortunately nobody stepped up to actually do the work, yet :(

A few days later, Roberto Tyley, who is the author of
[the BFG repo-cleaner](https://rtyley.github.io/bfg-repo-cleaner/),
replied to Stefan's email [by announcing submitGit](http://thread.gmane.org/gmane.comp.version-control.git/269699):

> Hello, I'm stepping up to do that work :) Or at least, I'm implementing a
> one-way GitHub PR -> Mailing list tool, called submitGit:
>
> https://submitgit.herokuapp.com/
>
> Here's what a user does:
>
> * create a PR on https://github.com/git/git
> * logs into https://submitgit.herokuapp.com/ with GitHub auth
> * selects their PR on https://submitgit.herokuapp.com/git/git/pulls
> * gets submitGit to email the PR as patches to themselves, in order to
> check it looks ok
> * when they're ready, get submitGit to send it to the mailing list on
> their behalf
>
> All discussion of the patch *stays* on the mailing list - I'm not
> attempting to change anything about the Git community process, other
> than make it easier for a wider group people to submit patches to the
> list.

This announce was met with a lot of enthousiasm from the community,
especially from the [Git for Windows](https://msysgit.github.io/)
developers.

Junio Hamano, the Git maintainer, liked it a lot too and wanted to try
it. Unfortunately he found that the application, which uses GitHub
authentication,
[requires too much authorization](http://thread.gmane.org/gmane.comp.version-control.git/269733).
He thought that as the owner of the official Git repository it would
be irresponsible for him to grant submitGit the authorization it asks
for. Roberto though [fixed this issue](https://github.com/rtyley/submitgit/pull/3) a few days later.


### Reviews

* [sha1_file: pass empty buffer to index empty file](http://thread.gmane.org/gmane.comp.version-control.git/269050)

Jim Hill posted a bug fix patch along with a test case. The bug was
that a NULL pointer was passed instead of an empty string when
filtering an empty file. This generated an error on stderr but `git
add` succeeded anyway.

Junio Hamano acknowledged that it was a good fix, and that by the way
the fact that `git add` succeeded despite the error was another bug.

Jim replied that he has found more than one other bug and provided
more test cases. Junio reviewed the new tests along with Jeff King,
who suggested that clean/smudge filters could be allowed to quit
before reading their input fully. Junio then decided to
[implement this suggestion](http://thread.gmane.org/gmane.comp.version-control.git/269050/focus=269383).

### Support

* [git pack protocol question: sideband responses in case of errors?](http://thread.gmane.org/gmane.comp.version-control.git/268949)

Christian Halstrick said that he sometimes gets "invalid channel 101"
errors when pushing over HTTP using a JGit client.

He had already greatly debugged the problem which appears when quotas
on the filesystem prevent the Git server to store a big packfile. The
server then sends back a packet line "0013error: ..." to the client,
but the client think that sideband communication should still be used,
so it interprets the "e" from "error" as a channel number. The ascii
code of "e", which is 101 in decimal, is the reason why the error is
"invalid channel 101".

Christian asked a few questions to get more information about when
sideband communication should happen and how a server should respond
in case of error.

As Shawn Pearce had developed both the Smart HTTP protocol, which is
now the most commonly used HTTP protocol by Git clients and servers,
and JGit, the implementation of Git in Java, he answered those
questions with a lot of details and further nailed down the problem:

> The bug here is JGit's ReceivePack/BaseReceivePack code not setting
> up the side-band-64k early enough for this failure report to be
> wrapped in it.

And Shawn concluded with the following:

> FWIW I am glad you found this. I have been chasing this bug for
> years but couldn't really pin it down to anything. If its the "pack
> won't fit on local disk due to disk full" condition that narrows
> down the offending section of JGit considerably.

* ["git commit --date" does not behave well?](http://thread.gmane.org/gmane.comp.version-control.git/269832) (*written by Junio C Hamano*)

Bastien Traverse was having trouble lying the date when creating a commit
with the `--date` parameter to `git commit` command.  He tried various
formats, e.g. `git commit --amend --date="2015-05-21 16∶31 +0200"` 
and got the date right but not the hours and minutes.

Peff tried to reproduce it (as the `--date=<string>` parsing was recently
corrected, there was a possibility of regression), but he couldn't. It
turns out that the input Bastien was feeding did not have the right "colon".

> Your "colon" is actually UTF-8 for code point U+2236 ("RATIO"). So git's
> date parser does not recognize it, and punts to approxidate(), which
> does all manner of crazy guessing trying to figure out what you meant.


## Releases

* [git-multimail resurected!]() (*written by Matthieu Moy*)

  [git-multimail](https://github.com/git-multimail/git-multimail) got
  a new co-maintainer, and is active again after a long period of
  inactivity. [A summary of the recent
  activity](http://thread.gmane.org/gmane.comp.version-control.git/270239)
  was posted on the Git mailing-list. A 1.1 release is expected in
  June. Don't hesitate to join the fun and help by reviewing
  pull-requests or submitting new ones!


## Other News

<!---
### Event
-->

<!---
### Media
-->


## Credits
This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt; and Nicola Paolucci &lt;<npaolucci@atlassian.com>&gt;
with help from Junio C Hamano and Matthieu Moy.
