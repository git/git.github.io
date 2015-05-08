## Git Rev News: Edition 3 (May 13, 2015)

Welcome to the third edition of [Git Rev News](http://git.github.io/rev_news/rev_news.html),
a digest of all things Git. For our goals, the archives, the way we work, how to contribute or to
subscribe see [the Git Rev News page](http://git.github.io/rev_news/rev_news.html) on http://git.github.io.

This edition still covers Git's 10th year of existence, as well as the
[Git Merge](http://git-merge.com) conference held on April 8th & 9th in Paris,
France, and also some discussions since the end of March.

## Discussions

### General


### Reviews


### Support

* [gitk won't show notes?](http://thread.gmane.org/gmane.comp.version-control.git/266662/)

Phillip Susi had trouble getting gitk to show notes. Michael J. Gruber
tried to help him, but it didn't work when adding a note while gitk is
running even when using F5 or Shift-F5 that should refresh the
display. Michael found that:

> Apparently, gitk rereads the refs but not commits it has read already -
> and the commit reading includes the notes lookup.

and decided to `cc the master`. The master is Paulus aka Paul
Mackerras who created gitk ten years ago and has been maintaining
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

## Releases

* [Git v2.4.0](http://article.gmane.org/gmane.linux.kernel/1941812), April 30th
* [git-extras 3.0.0](https://github.com/tj/git-extras/releases/tag/3.0.0), April 27th
* [JGit and EGit 3.7.1](https://dev.eclipse.org/mhonarc/lists/egit-dev/msg03865.html), April 27th
* [GitLab 7.10](https://about.gitlab.com/2015/04/22/gitlab-7-10-released/), April 22nd 


## Other News

### Job Offer

Booking.com is willing to pay a Git developer on a contract basis to
work on Git scalability issues. If you are interested please contact
Ævar Arnfjörð Bjarmason &lt;<avarab@gmail.com>&gt;.

### Event

[GSoC 2015: 2 accepted proposals](http://thread.gmane.org/gmane.comp.version-control.git/267878)

For a long time Git has been participating in [the Google Summer of Code](http://www.google-melange.com/gsoc/document/show/gsoc_program/google/gsoc2015/about_page).
This summer 2 students mentored by some Git developers will work on improving Git and will receive a stipend from Google.


### Media

* [Git Resources for Visual Learners](https://changelog.com/git-resources-for-visual-learners/)
* [--force considered harmful; understanding git's --force-with-lease](https://developer.atlassian.com/blog/2015/04/force-with-lease/) by Steve Smith at Atlassian
* Refer to a future commit sha1 in your commit message using [git-time-travel](https://github.com/hundt/git-time-travel)
* [Legit](http://www.git-legit.org/) is a complementary command-line interface for Git, optimized for workflow simplicity.
* [What's coming in Git 2.4.0](https://lwn.net/Articles/639582/?), by Nathan Willis at LWN.net
* [first aid git](http://ricardofilipe.com/projects/firstaidgit/), a searchable collection of the most frequently asked Git questions
* [libgit2 got rid of the OpenSSL binding on OSX](https://github.com/libgit2/libgit2/pull/2997)
* [7 Pro Tips For Using Git from Fedora Developers](http://www.linux.com/news/featured-blogs/200-libby-clark/825032-7-pro-tips-for-using-git-from-fedora-developers), by Libby Clark at linux.com
* [A cryptic crossword themed around Git](http://thorehusfeldt.net/2015/04/03/conflicting-git-merge-runs-for-several-minutes-35/), by Thore Husfeld
* [Notes from Git Contributor Summit (Git Merge 2015)](https://developer.atlassian.com/blog/2015/04/git-merge-2015-wrap/) from our own editor Nicola (at Atlassian)
* [Git Merge 2015 Reviewed](https://netguru.co/blog/git-merge-2015-review), by Jakub Naliwajek at netguru

## Credits

This edition of Git Rev News was curated by Christian Couder &lt;<christian.couder@gmail.com>&gt;, Thomas Ferris Nicolaisen &lt;<tfnico@gmail.com>&gt; and Nicola Paolucci &lt;<npaolucci@atlassian.com>&gt; with help from ???.
