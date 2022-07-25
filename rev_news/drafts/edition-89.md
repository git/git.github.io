---
title: Git Rev News Edition 89 (July 27th, 2022)
layout: default
date: 2022-07-27 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 89 (July 27th, 2022)

Welcome to the 89th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of July 2022.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

<!---
### Support
-->

## Developer Spotlight: Junio C Hamano

* Who are you and what do you do?

I am an open source toolsmith, who works at Open Source Program
Office (OSPO) at Google.  I work as the maintainer of Git.


* How has your journey with Git as its maintainer been so far?

I have worked with many contributors since 2005, and seeing so many
of them grow into excellent developers as they work on this project
was a joy.


* How does your work as the maintainer of the Git project look like?

Unlike earlier days, I no longer have to be in the driving seat to
design or implement a big feature anymore, and luckily there are
multiple groups of people who do excellent job dreaming up and new
ways to use Git and make it a reality.  My best days start by
getting greeted by surprisingly good proposal of a new feature or
optimization of an existing feature, and the entire day is spent on
reviewing them.  It happens less often these days, but they still do
occasionally.

On my normal days, I scan the mailing list for patches and
discussions, and my goal is to at least open every one of incoming
messages, and read carefully at least half of the patches I pick up
to queue on the 'seen' branch, which means that I may be queuing the
other half without carefully reading, trusting the reviews already
done by other members of the community.

I aim to finish picking up new topics, replacing existing topics,
and generally interacting with the mailing list, by around 2pm.
Then I rebuild the 'seen' topic, rewrite the latest draft of "What's
cooking" report (which is used as the guide to choose which topics
will go to the 'next' branch), and push out the first integration
result of the day by 4pm.  After that, I'd merge the topics that
have cooked long enough in 'next' to 'master', and the topics that
have been adequately reviewed to 'next'.  The 'seen' and 'next'
branches are rebuild, the "What's cooking" report is rewritten, and
the second integration result of the day gets pushed out, before I
call it a day.


* If there's anything you would like to say to your past self, what
  would that be?

Study math and algorithms harder, perhaps.  I know them well enough
to get around, but it is primarily because there are so many other
community members who are good at them that I can rely on, so I do
not have to get involved in details that are too deep for me.


* What would you name your most important contribution to Git?

There are too many to list in the design and implementation of the
internals, but in the end, I think what mattered to the project most
was that I was consistently there available to help guide the
project.

It may not be "important contribution", but my most favorite
creation is "git rerere".  It was fun to design, work on, and (most
importantly) name it.


* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

The interoperability between SHA-1 and SHA-256 repositories first
comes to mind.  The ingredients are almost all there, so are rough
design.


* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

I generally think that the hacks to lie to the object layer, like
"grafts" and "replace" mechanisms, and "alternate" object store,
were not great ideas.  There aren't all that many that I would
remove, but there are too many that I wish we could redo entirely
without backward compatibility issues (e.g. path ordering in the
index).


* What is your favorite Git-related tool/library, outside of Git itself?

My recent favorites are Eric's "public-inbox", which powers the
https://lore.kernel.org/git mailing list archive, and Konstantin's
"b4" that helps to interact with the lore archive better.


* What is your advice for people who want to start Git development?
  Where and how should they start?

That depends on why they want to do so.  Do they not like the way
the tool currently works and they want to change it?  Are they happy
with Git but they feel they do not know enough of it and are curious
about how things work?  For the former folks, the usual "scratch
your itch" advice would work well to certain extent.  For the latter
folks, their "itch" can be to try to figure out how one of their
favorite subcommand works, and then perhaps clean up or optimize
the code paths they studied.  Following what our test scripts are
doing to your favorite feature may be a great way to learn them, too.

Either way, while identifying and scratching their "itch", I'd
recommend them to lurk on the mailing list for at least a few weeks,
and starting early is good.  Learn by reading others' patches being
discussed, the kind of things the reviewers are interested in, and
how the development process works.  See who are active and how the
discussion goes.  These social conventions, how our developers work
with others, is just as important as, if not more than, technical
details.  MyFirstContribution document may also be a good place to
start.


* How does your mailing list workflow look like?

I try not to be the first to comment on any new topic (unless the
topic gains no attention from anybody, yet it looks worth commenting
on, which sometimes happens).  This is because other members of the
community may offer interesting viewpoints that I would not hear
(and think of myself) if I spoke first.

My ideal is that a topic gets discussed without me for a few rounds
and by the time I feel like taking a look myself, it is already
quite ready, thanks to the help from competent reviewers (which
happens quite often).  Then I can pick it up and queue almost
directly to 'next' (in practice, I'd first merge it to 'seen' to
ensure that there is no funny interactions with existing topics in
the first integration cycle of the day that happens before 2pm, and
then merge it down to 'next' in the second integration cycle of the
day, or perhaps the day after).

As I cannot keep track of all the things said in the discussion on
all topics, I make heavy use of the lore archive and use the draft
of "What's cooking" report to take notes on each topic's current
status.  So, the workflow is

 (1) to notice a new topic, whose merit is either obvious to see or
     others reviews helped to highlight, and queue it to 'seen',
     while sending comments to them,

 (2) record the topic in the "What's cooking" draft,

 (3) to observe the discussion on the topic, perhaps taking a reroll
     and replacing the copy I have,

 (4) send out an updated "What's cooking", possibly the topic marked
     for promotion,

 (5) go back to (3)

until each topic graduates to 'master'.


* If there's one tip you would like to share with other Git
  developers, what would it be?

It is very easy to be too strongly married to your initial solution
to become blind to the merits of other approaches suggested in the
discussion, or accept a possible reframing of the original problem
to solve a wider problem.

In the very early days of Git, before Linus passed the project's
maintainership to me, I also had a "competitive" manner in a bad
way.  There were plenty of problems to be solved, and it felt as if
people competed to be the first to offer a solution to each of them.
When I had an idea to solve a problem that others are also
interested to see solved, sometimes it felt like I had to "beat"
them, which meant that I had to send out patches that weren't well
reasoned and well explained enough.  Luckily, being maintainer means
I do not have to compete the others.  Instead I can set the pace of
the project.  After having lived in such a "competitive" way for a
few months and saw its downside, I learned to give contributors time
to think things through and wait long enough for counter-proposals.

So, one "tip" is to take things slowly.  Be ready to step back, take
a deep breath and take time to rethink the problem, together with
those in the discussion.  You'd end up working well with the others
that way.


## Releases


## Other News

__Various__


__Light reading__
+ [Introduction to Git Ops](https://www.codeproject.com/Articles/5334970/Introduction-to-GitOps) Some useful background to the Git - DevOps approach in this sponsored article.
+ [git rebase --fork-point considered harmful (by 'me')](https://commaok.xyz/post/fork-point/) The reflog lookup heuristics aren't what you thought, are they? A UX report.
+ [Git Delete Branch How-To, for Both Local and Remote](https://www.cloudbees.com/blog/git-delete-branch-how-to-for-both-local-and-remote) with pictures, Also includes deleting branches on Github..
+ [Git - Subtree](https://www.geeksforgeeks.org/git-subtree/) A short overview of the common replacement for Git submodule.
+ [Managing Git projects with submodules and subtrees](https://opensource.com/article/20/5/git-submodules-subtrees) (2020)
  More choices. This was previously mentioned in [Git Rev News Edition #63](https://git.github.io/rev_news/2020/05/28/edition-63/).
+ ['Turn off merge fast-forward by default'](https://betterdev.blog/turn-off-git-fast-forward-merge/) An alternative viewpoint (from Git for Windows [#3858](https://github.com/git-for-windows/git/issues/3858))

__Easy watching__
+ [Git Internals - The BLOB](https://www.youtube.com/watch?v=_wj4MGuvcjc) 'A shot of code' looks at the internals of the .git folder to see exactly what goes on under the hood.
+ [Getting Comfortable with GIT](https://www.youtube.com/watch?v=aXXXiynr-4A) looking to get a deeper understanding of Git, and hopefully feeling a lot more comfortable when performing some of the more scary Git operations.. says 'A shot of code'.
+ [It's Impossible to Know If You're a Good Programmer](https://www.youtube.com/watch?v=Ax4EfY9LrF4) The imposter syndrome and irrelavent code challenges.

__Git tools and sites__
+[Git Signing](https://wilsonmar.github.io/git-signing/) All the details for signing commits and tags (for non-repudiation) in GitHub using GPG, Vault, Yubikey, Keybase!

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Philip Oakley, and XXX.
