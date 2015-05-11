## Git Rev News: Edition 3 (May 13, 2015)

Welcome to the third edition of [Git Rev News](http://git.github.io/rev_news/rev_news.html),
a digest of all things Git. For our goals, the archives, the way we work, how to contribute or to
subscribe see [the Git Rev News page](http://git.github.io/rev_news/rev_news.html) on http://git.github.io.

This edition still covers Git's 10th year of existence, as well as the
[Git Merge](http://git-merge.com) conference held on April 8th & 9th in Paris,
France, and also some discussions since the end of March.

## Discussions

### General

* [Teaching People Git](https://speakerdeck.com/emmajane/teaching-people-git)

At the [Git Merge 2015](http://git-merge.com) Emma Jane Hogbin Westby
gave a presentation about her experience teaching Git to adults. As a
long time version control teacher, she has found that the usual ways to
teach people Git don't work well.

One of the reason is that Git is complex, so people have to learn a
lot before a simple "Hello world!" with Git makes sense. Also people
use Git to support their work, Git is not what they do. Another reason
is that it is difficult for adults to learn because of all the other
pressures which are put on them by life. Learning is a bit terrifying
for them.

There are ways to make it easier for them to learn though. The theory
about adult education called
[andragogy](http://en.wikipedia.org/wiki/Andragogy) gives six insights
about how to motivate them. Based on these insights and other theories
like constructivism and Bloom's taxonomy, Emma Jane developed new ways
of teaching Git and version control.

She found that a good way is to start by trying to solve the
learner's own real problems using ideas, not Git commands or tools
first. As a lot of problems around version control are social
anyway, it is useful to teach teamwork first.

So she starts by asking people to describe their role in the
organisation, who they are working with and how, what are their tasks,
their workflows, how they manage branches, what are their tools,
infrastructure and constrains. This can be done using pens, papers and
colors.

When people have finished documenting everything, which is anyway a
good thing, then Git commands can be introduced in the context in
which they are useful. For example as people are drawing boxes and
arrows on diagrams, they can be teached the `git clone`, `git push`
and other Git commands that can be associated with the code sharing
arrows.

Teaching this way makes people 'build' their knowledge, talk to each
other about their workflows and visualy document their use of
Git.

This whole process makes Git more accessible and friendly, which is
Emma Jane's goal.

She shares this goal in articles, like
[this one which is an article version of her talk](http://24ways.org/2013/git-for-grownups/), in
videos, blog posts and other materials available from her
[Git for Teams web site](http://gitforteams.com/) or her
[gitforteams GitHub repo](https://github.com/emmajane/gitforteams), and also in an
[upcoming Git for Teams of One or More book](http://gitforteams.com/books/).

* [Git + Software Freedom Conservancy Overview](http://thread.gmane.org/gmane.comp.version-control.git/267077/)

At the Contributor Summit that was part of the [Git Merge 2015](http://git-merge.com),
Jeff King, aka Peff, gave a presentation about the status of Git as a
[Software Freedom Conservancy (SFC)](https://sfconservancy.org/) project.

Git is a [member project of the SFC since 2010](http://thread.gmane.org/gmane.comp.version-control.git/159722/).
This gives some legal status to "The Git Project" and makes it possible for it
to handle money (around $19,000), hold domain names (git-scm.com, git-scm.org) and
[the "Git" trademark](https://git-scm.com/trademark), and own a Mac!

The decisions related to those assets and The Git Project itself are
made by agreement of the benevolent-committee-for-life, made of Junio
Hamano, Jeff King and Shawn Pearce. The committee is limited because The
Git Project does not own any copyright on the code and has no power
over the technical side of the project. Also the decisions must
support FLOSS aspects of the project.

Ideas about how to use the assets or make changes to The Git Project
should be discussed on the list because the committee wants to represent
the will of the community. That's why after the Contributor Summit Peff
posted the source code of his slides on the list, asking for suggestions
about what to do, like he did after his presentation at the Summit.

One question is: what should The Project do with its money? The money
comes from donations on the web site, the Google Summer of Code (GSoC),
Amazon affiliate links and book royalties. Some of this money goes to
helping developers travel to the GSoC mentor summit, and a few other
things.

Peff talked a bit about what he calls "half baked ideas" he has to
spend the money, like participating in the
[Outreach Program for Women, now known as Outreachy](https://www.gnome.org/outreachy/)
or giving it to the SFC or other organisations.

At the Summit after Peff's presentation, Git developers mostly talked about
how to make it possible for companies to fund developers working on Git,
and since the Summit, there has not been much discussion on the mailing list
about possible changes to the current situation.

### Reviews

* ["cat-file --allow-unknown-type"](http://thread.gmane.org/gmane.comp.version-control.git/268262)

Karthik Nayak, a Google Summer of Code student, has been working for
some months on developing the `--allow-unknown-type` option for `git cat-file`.

He has been helped by Eric Sunshine, Ramsay Jones, Phil Hord, Charles Bailey, David Turner, Duy Nguyen,
Jeff King and Junio Hamano, and, along the development, improving the test script led
to a [discovery and fix of a bug](http://thread.gmane.org/gmane.comp.version-control.git/268306)
in "hash-object --literally".

The 10th iteration of his patch series was merged to the 'next' branch,
so the new option will probably appear in the next git release.

* ["git help" reorganisation](http://thread.gmane.org/gmane.comp.version-control.git/268348)

Sébastien Guimmara started working on improving the output of `git help`.

The current output lists "the most commonly used git commands" in
alphabetical order. For a long time people have been saying that it is
probably not the best way to help users find the git command they
need, and that it would be better to group commands by topic. So
Sébastien's work is very welcome.

Unfortunately git developers can have different views on how to group
commands together. So it can be difficult for them to agree on such
kind of changes. Long discussions because of small personnal
preferences - we call that bikesheedding - can sometimes go on for a
while.

In the case of Sébastien's patch series, many developers helped or got
involved in the discussions: Eric Sunshine, Junio Hamano, Stefan
Beller, Matthieu Moy, Johannes Schindelin, Johannes Sixt. Emma Jane Hogbin Westby
also [weighed in](http://thread.gmane.org/gmane.comp.version-control.git/268348/focus=268525)
with her experience in teaching Git to people, which is a valuable
piece of input.

We will see how it goes and if some improvements are merged.


### Support

* [gitk won't show notes?](http://thread.gmane.org/gmane.comp.version-control.git/266662/)

Phillip Susi had trouble getting gitk to show notes. Michael J. Gruber
tried to help him, but it didn't work when adding a note while gitk is
running even when using F5 or Shift-F5 that should refresh the
display. Michael found that:

> Apparently, gitk rereads the refs but not commits it has read already -
> and the commit reading includes the notes lookup.

and decided to "cc the master". The master is Paulus aka Paul
Mackerras who created gitk ten years ago and has been maintaining it
since that time.

Paul agreed that indeed works need to be done to fix this problem. He
asked if `git notes list` is the best way to find out all the current
notes, and Johan Herland who developed `git notes` answered yes.

* [git ls-files wildcard behavior considered harmful](http://thread.gmane.org/gmane.comp.version-control.git/266486/)

Joey Hess who is developing [git-annex](https://git-annex.branchable.com/) was surprised by how
`git ls-files` expands wildcard characters like `*[]` and the fact that escaping these characters
using a backslash character `\` makes it impossible to only list files in a directory:

```
While normally ls-files would recurse, slash-escaped wildcard characters in the
directory name prevent recursion.

joey@darkstar:~/tmp/aaa>git ls-files 'foo[d]'
foo[d]/subfile
food
joey@darkstar:~/tmp/aaa>git ls-files 'foo\[d\]'
joey@darkstar:~/tmp/aaa>

The above example shows a case where it's impossible to get ls-files
to only list files in a directory and not other files that match the
wildcard. This seems like it must be a bug, and it means it's impossible
to reliably work around the wildcard expansion behavior.
```

Duy Nguyen, Jeff King and Jonathan Nieder replied that there are ways
to tell Git to interpret no character as a wildcard. The
`--literal-pathspecs` option and the `GIT_LITERAL_PATHSPECS`
environment variable have been created especially for this purpose and
it is a good idea to use them in script or tools, like GitHub is doing
on their servers.

* [No longer builds with NO_IPV6?](http://thread.gmane.org/gmane.comp.version-control.git/268406)

Eduardo Espejo found that Git does not compile anymore when using the
NO_IPV6 configuration switch. And it is not the first time that
[someone finds out that Git such a NO_IPV6 breakage](http://thread.gmane.org/gmane.comp.version-control.git/28033/).

This time Junio Hamano, the Git maintainer, fixed the breakage in
"daemon.c", but more importantly found that NO_CURL and NO_EXPAT
configurations did not to pass the test suite.
So helped by Jeff King [he quickly fixed that too](http://thread.gmane.org/gmane.comp.version-control.git/268467/).
And now he has a nightly cron job to try building
and testing a few selected configurations.

## Releases

* [Gerrit 2.11](https://gerrit-documentation.storage.googleapis.com/ReleaseNotes/ReleaseNotes-2.11.html), April 17th
* [GitLab 7.10](https://about.gitlab.com/2015/04/22/gitlab-7-10-released/), April 22nd
* [objective-git 0.8.1](https://github.com/libgit2/objective-git/releases/tag/0.8.1), April 23rd
* [git-extras 3.0.0](https://github.com/tj/git-extras/releases/tag/3.0.0), April 27th
* [JGit and EGit 3.7.1](https://dev.eclipse.org/mhonarc/lists/egit-dev/msg03865.html), April 27th
* [Git v2.4.0](http://article.gmane.org/gmane.linux.kernel/1941812), April 30th
* [nodegit v0.4.0](https://github.com/nodegit/nodegit/releases/tag/v0.4.0), May 7th


## Other News

### Job Offer

Booking.com is willing to pay a Git developer on a contract basis to
work on Git scalability issues. If you are interested please contact
Ævar Arnfjörð Bjarmason &lt;<avarab@gmail.com>&gt;.

### Event

[GSoC 2015: 2 accepted proposals](http://thread.gmane.org/gmane.comp.version-control.git/267878)

For a long time Git has been participating in [the Google Summer of Code](http://www.google-melange.com/gsoc/document/show/gsoc_program/google/gsoc2015/about_page).
This summer two students, Paul Tan and Karthik Nayak, mentored by four experienced Git developers, Johannes Schindelin, Stefan Beller, Matthieu Moy and Christian Couder, will work on improving Git and will receive a stipend from Google.


### Media

__Related to Git 2.4__

* [What's coming in Git 2.4.0](https://lwn.net/Articles/639582/?), by Nathan Willis at LWN.net
* [Git 2.4 — atomic pushes, push to deploy, and more](https://github.com/blog/1994-git-2-4-atomic-pushes-push-to-deploy-and-more), a great explanation by GitHub's Michael Haggerty

__In the aftermath of Git-Merge 2015__

* [Git Merge 2015 Reviewed](https://netguru.co/blog/git-merge-2015-review), by Jakub Naliwajek at netguru
* [GitMinutes #35: Git Merge 2015 Part 1](http://episodes.gitminutes.com/2015/05/gitminutes-35-git-merge-2015-part-1.html), the first of five podcast episodes from Git-Merge
* [Notes from Git Contributor Summit (Git Merge 2015)](https://developer.atlassian.com/blog/2015/04/git-merge-2015-wrap/) from our own editor Nicola (at Atlassian)

__Various__

* [Fun with failing cherry-pick](http://git-blame.blogspot.com/2015/04/fun-with-failing-cherry-pick.html), by Git's maintainer, Junio C Hamano
* [libgit2 got rid of the OpenSSL binding on OSX](https://github.com/libgit2/libgit2/pull/2997)
* [Git Resources for Visual Learners](https://changelog.com/git-resources-for-visual-learners/), neat collection from TheChangelog
* [--force considered harmful; understanding git's --force-with-lease](https://developer.atlassian.com/blog/2015/04/force-with-lease/) by Steve Smith at Atlassian
* [7 Pro Tips For Using Git from Fedora Developers](http://www.linux.com/news/featured-blogs/200-libby-clark/825032-7-pro-tips-for-using-git-from-fedora-developers), by Libby Clark at linux.com
* [A cryptic crossword themed around Git](http://thorehusfeldt.net/2015/04/03/conflicting-git-merge-runs-for-several-minutes-35/), by Thore Husfeld
* [Be aware of your git stashes](http://depressiverobot.com/2015/05/08/stash-aware.html), pro-tip by Marvin Frommhold
* [Git Commits are Not Transactions](http://godd2.blogspot.de/2015/05/git-commits-are-not-transactions.html), blogpost by Dominic Muller
* [A git horror story: faking provenance with a loose nonce](https://developer.atlassian.com/blog/2015/05/git-horror-story-loose-nonces/), by Tim Pettersen at Atlassian
* [The Elements of Commit Style](http://mcandre.gitbooks.io/elements-of-commit-style/), a tiny "Git-book" for improving commit style, by Andrew Pennebaker
* [Protected branches in Deveo 2.9.0](http://blog.deveo.com/protected-branches-in-devo-2-9-0/), from Ilmari Kontulainen on their company blog

__Git tools and sites__

* [Gerrit is now available in Docker containers](http://gitenterprise.me/2015/04/30/no-more-tears-with-gerrit-code-review-thanks-to-docker/) from GerritForge/GitEnterprise
* [first aid git](http://ricardofilipe.com/projects/firstaidgit/), a searchable collection of the most frequently asked Git questions
* [Legit](http://www.git-legit.org/) is a complementary command-line interface for Git, optimized for workflow simplicity.
* [multi-commit](https://github.com/jonathanewerner/multi-commit), a python tool for staging hunks and assigning them to multiple future commits
* [cig](https://github.com/stevenjack/cig) checks all your git repos, reporting if any of them have changes or need to be pushed
* Similarly: [checkgit](https://github.com/ga7g08/CheckGit) is a gtk-based script to provide visual status of Git repositories
* Refer to a future commit sha1 in your commit message using [git-time-travel](https://github.com/hundt/git-time-travel)
* [The Ubuntu-related forge Launchpad is now offering Git hosting](http://blog.launchpad.net/general/git-code-hosting-beta)
* [GitHub Extension for Visual Studio](https://visualstudio.github.com/)


## Credits

This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt; and Nicola Paolucci &lt;<npaolucci@atlassian.com>&gt;
with help from Junio Hamano, Emma Jane Hogbin Westby and Jeff King.
