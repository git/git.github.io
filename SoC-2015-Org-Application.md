---
layout: default
title: SoC 2015 Organization Application
navbar: false
---

This is a draft of git's application to Google's Summer of Code 2015.

## Organization name

Git

## Admin / Backup

peff / ?

## Description

Git is the most widely-used distributed revision control system in Open
Source.  Many large and successful projects use git, including the Linux
Kernel, Perl, Eclipse, Gnome, KDE, Qt, Ruby on Rails, Android,
PostgreSQL, Debian, and X.org.

## Tags

vcs, c, git

## Main license

GPLv2

## Logo URL

![Git Logo](/images/logo.png)

## Ideas list

<https://git.github.io/SoC-2015-Ideas.html>

## Mailing list

git@vger.kernel.org

# Organization website

<http://git-scm.com>

## IRC Channel

<http://git-scm.com/community>

## Blog / Google+ / Twitter / Facebook

We don't have any official versions of these.

## Veteran organization

Yes (we participated before)

## If you chose "veteran" in the organization profile dropdown, please summarize your involvement and the successes and challenges of your participation. Please also list your pass/fail rate for each year.

Git has participated in GSoC every year since 2007, with the exception
of 2013, typically mentoring 2-5 students each year. Our mentors have
always been active contributors within the community. The students
typically did not have a prior relationship with the community, though
in one case we took on a student who had previously contributed patches.

Of the 26 projects we have mentored, 20 have resulted in success. In
many cases, the code has been merged and is in daily use in git. In some
cases, the code was spun off into its own project (e.g., the
git-statistics project in 2008 ended up as a separate project). In other
cases, the implementations, while never merged into mainline git, served
(or continue to serve) as the basis for discussion and advancement of
certain features (e.g., 2008's GitTorrent project and 2009's svn
interaction improvements). The libgit2 project, which has been the
subject of multiple GSoC projects, has gone from being an unusable
skeleton to a thriving ecosystem, with bindings in Objective-C, Python,
Ruby, C#, Lua, and more. While much of the work on libgit2 and its
bindings were not done through GSoC, the GSoC projects were instrumental
in getting the library to a point that attracted outside interest.

But most important has been the development of students into open source
contributors. In almost every project, even those whose ultimate goals
did not end up merged into mainline git, students ended up contributing
related commits to git. Furthermore, we have had success with retaining
members in the community. Close to half of our successful students
continued contributing in the year after their GSoC involvement, and the
student from our 2010 libgit2 project has essentially become the project
maintainer.

One of the biggest challenges has been integrating students into the
public development process, and especially convincing them to produce
and publish work continually throughout the period. While we have had
several students turn into long-term members, just as many disappear
after GSoC. And while many projects have been successful, we often have
difficulty integrating them into mainline git when the results are
dumped on the community at the end.

We took 2013 off from GSoC in order to discuss issues of project scopes,
student selection, and our interaction strategies (the discussion didn't
take all year, of course, but it heated up right around application
time, so we skipped a year rather than rush into an application).
In 2014, we tried a few things:

  1. Reducing the project scope to focus more on interactions rather
     than a flashy project.

  2. Requiring students to complete a "microproject" as part of the
     application process, to get them involved early in the day-to-day
     workings of the community (and also to give us more information on
     them).

The projects for 2014 did seem to go smoothly, with merged code and one
of the students contributing related fixes over the past 6 months. We
did fail one student at the mid-term, but that is because he was
essentially a no-show. We don't consider than an interesting indicator
for how the changes went.

Here is a summary of our completed/failed projects per year, along with
the number of retained contributors (where "retained" is calculated by
finding contributors which continued to participate on the mailing list
a year or more after their GSoC period ended):

 - 2007: 2 success, 1 failure, 1 student retained
 - 2008: 4 success, 2 failure, 3 students retained
 - 2009: 1 success, 1 failure, 0 students retained
 - 2010: 3 success, 1 failure, 3 students retained
 - 2011: 5 success, 0 failure, 4 students retained
 - 2012: 3 success, 0 failure, 2 students retained
 - 2014: 2 success, 1 failure, 1 student retained

## Why is your organization applying to participate in Google Summer of Code 2015? What do you hope to gain by participating?

With the exception of 2013, Git has participated in GSoC every year
since 2007. We have appreciated not only the code contributions, but
also the increased project visibility and the addition of new long-term
contributors. We also believe strongly in helping students become
comfortable contributing to open source in general, even if they do not
remain involved with Git itself.

## How many potential mentors do you have for this year's program? What criteria did you use to select them?

We have 3 potential mentors this year. This is a smaller number than in
previous years, and we expect to take a correspondingly smaller number
of projects (probably only 1 or 2).

All mentors are volunteers for the specific projects that they can
contribute the most to (i.e., ones that meet their interests and
abilities). All mentors are active contributors within the Git
development community, and well-known to the project leadership.

Active contributors are defined to be those who have submitted and have
had accepted into a shipped release a substantial amount of code, where
substantial is defined to be equal to or larger than what might be
expected of a student working on a Google Summer of Code project.

## What is your plan for dealing with disappearing students?

We think that the most important part of GSoC is integrating the student
into the normal communication channels used by other project
participants. We don't expect regular developers to go silent for 3
months and then dump 10,000 lines of code on us to review, and we don't
want students to do that to us either. The first step in dealing with
disappearing students is to make sure they are engaging with the
community on design and code issues, and reaching small milestones on
the way to the project. Then if they do disappear, we know quickly and
can react, rather than being surprised at the end.

Once they do disappear, we'll obviously try to contact them and find out
what's going on. But ultimately, non-communication is grounds for a
failing evaluation, regardless of any code produced.

## What is your plan for dealing with disappearing mentors?

We plan to take fewer projects than we have as mentors, so that the
remainder can act as backups. Most of our projects can be mentored by
any of the mentors, and by keeping student progress public and reviewed on
the list, there's a good chance that another mentor (or the community at
large) can pick up the slack. We try to keep the "bus factor" high for
regular development, and we should do it for mentors, too.

## What steps will you take to encourage students to interact with your project's community before, and during the program?

Students will be required to join the main development mailiing list and
post their patches for discussion. All current contributors already do
this, so students will be able to see experienced hands performing the
same tasks and learn by example. We also feel that the list-based
discussions will help the student to become and stay a member of the
community.

The traffic on the list is focused around Git feature development. We
expect the students to stay current by at least skimming the messages,
and participating in discussions that are close to their area of work.

Students will also be required to post their work as a Git repository on
a publicly available server so that their works-in-progress will be
available for everyone to review. However, as patch review typically
happens on the mailing list, we expect that to be the main venue for
review of the students' work.

Mentors will also exchange direct email with students on at least a
weekly basis, if not more frequently. Students will be required to
provide weekly progress reports back to their mentors, so that mentors
are aware of the tasks that a student might be stuck on or are having
difficulty with. The intent of the progress reports
is to give the mentors a chance to provide suggestions for problem
resolution back to the student.

Frequent email and IRC interaction with mentors and other developers
will be strongly encouraged by suggesting students post their questions
and ideas to the mailing list, and to discuss them on #git.  Many
developers either already hold "office-hours" on IRC, or have agreed to
do so during the GSoC period.

## What will you do to encourage your accepted students to stick with the project after Google Summer of Code concludes?

Ultimately we have no leverage over the students after they leave, so
the best we can do is to help them form habits of interaction that they
might find rewarding and want to continue with. We specifically don't
want to give the student a "half project" that needs more work after the
GSoC period is done. That's not fair to the student, nor to the project.

Instead, we'd prefer to get the student involved in the day-to-day of
interacting on the mailing list, reviewing code, and commenting on other
people's ideas and problems. Those are things they can continue to do
after GSoC ends, and those discussions can often spur more coding.

## Are you a new organization who has a Googler or other organization to vouch for you? If so, please list their name(s) here.

N/A

## Are you an established or larger organization who would like to vouch for a new organization applying this year? If so, please list their name(s) here.

N/A
