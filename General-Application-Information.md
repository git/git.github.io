---
layout: default
title: General Application Information
---

This is the page where people who want to apply to the Git project for
the Google Summer of Code (GSoC), Outreachy, or other such mentoring
programs can get information about what the Git project would like to
see in an application.

*Please read this page completely before focusing on a project or a
 microproject ideas, or microproject general information.*


## Microproject (required)

It is required that applicants who want to apply to the Git
project for the GSoC or Outreachy complete a tiny, code-related
"microproject" as part of their application. Please refer to our
[general guidelines and suggestions for microprojects](https://git.github.io/General-Microproject-Information)
for more information. Completing a microproject is not only an important
way for us to get experience with applicants, but it will also help
applicants become familiar with Git's development and submission
process.

## Reviewing (not required but appreciated)

Also, working in Git project is not only about writing your own
patches. Constructively critiquing design and implementation of
patches by other people is also an important skill you need to learn
in order to effectively collaborate with others. So, if you have time
and inclination, it would be beneficial to read and understand other
applicants' patches (or any other patch submitted to the mailing-list),
think if you agree that the problem they are trying to solve is worth
solving, the approach they are taking is the best way (or if you think
of a better way to solve it), etc., and respond to their patches with
the result of your thinking as a review.

## Application (required)

A complete application should include a presentation of yourself
(include any argument that may convince mentors that you are able to
complete the project) and detailed explanations about your project.

Project ideas are just ... ideas! The list we provide is not
exhaustive, and more importantly each idea only includes a summary of
what is to be done. An application must include detailed plans on the
design, timeline ...  A typical application takes several pages.

If you are applying for the GSoC, you should already have read
[the GSoC Student Guide](http://write.flossmanuals.net/gsocstudentguide/writing-a-proposal/)
by now, but re-read it if needed.

If you are applying for Outreachy there is very likely similar
documentation on their web site that you should follow.

Please, include link(s) to the mailing-list discussion(s) related to
your microproject in your application (e.g. linking to
[lore.kernel.org](https://lore.kernel.org/git/)). If you
participate in the review of other patches, then you may also include
links to discussions that would support your application.

Applicants must send drafts of their proposal on the mailing-list
before submitting it officially to GSoC or Outreachy to get feedback
from the community. They are strongly encouraged to publish a draft on
the official GSoC or Outreachy website *and* post it to the mailing
list for discussion.

Getting your proposal right can follow the same process as usual patch
submission for Git, as described in the
[microprojects](https://git.github.io/SoC-2020-Microprojects) page and
in `Documentation/SubmittingPatches` in Git's source code. It is also
expected that you will send several versions of your draft, responding
to comments on the list. Please plan to send the first draft early
enough so that a number of reviews and improvements cycles can happen.

If you are not sure about your proposal, you can discuss that in the
same email where you introduce yourself or in separate emails. Please
use "[GSoC]" or "[Outreachy]" at the beginning of the subject of such
emails.

## Summary

In summary, all applicants must (not necessarily in this order):

* Complete a [microproject](https://git.github.io/SoC-2020-Microprojects).

* Write a detailed application explaining their project.

* Discuss their project by posting drafts of their application on the
  mailing-list long before the deadline.

In your application, and in the discussions related to projects you
are interested in, it is a good idea to:

* Include link(s) to the mailing-list discussion(s) related to the
  project you chose in your application or you are interested in, for
  example previous discussions or patch series about the topic. There
  might be interesting discussions about the topics that are several
  year old. It is also a good idea to summarize them.

* Include link(s) to the mailing-list discussion(s) related to the
  previous drafts of your application itself.

* Include link(s) to the mailing-list discussion(s) related to your
  microproject. If your microproject patches have been merged, please
  give the merge commits. Otherwise give their branch names and
  current status in the last "What's cooking in git.git" email from
  Junio.

* Include what is suggested in
  [the GSoC Student Guide](http://write.flossmanuals.net/gsocstudentguide/writing-a-proposal/)
  or the equivalent guidelines for Outreachy.

([lore.kernel.org](https://lore.kernel.org/git/) can be
used for searching the mailing list and linking to previous
discussions.)

## Note about the number of slots

The Git organization usually has very limited mentoring capacity.
These days we usually accept between 0 and 3 students per season
(Winter or Summer).

## Note about refactoring projects versus projects that implement new features

Over the years we have been favoring refactoring projects over
possibly more interesting projects that implement new features.
Refactoring projects are usually easier to do step by step, and to get
code merged step by step which is encouraging.

In general refactoring projects are worthwhile to do even if the
project is not finished at the end of the GSoC and even if the student
stops contributing after that. In those cases it is often a good idea
to later finish the refactoring either by ourselves or by proposing it
to another GSoC student or Outreachy intern. This way the work of both
students and mentors is not likely to be wasted.

With a project that implements a feature, there is a risk, if it's too
complex or too difficult, that the feature will not be finished and
that nothing, or nearly nothing, will have been merged during the GSoC
or Outreachy internship. There is also the risk that another way to
implement the feature will appear later in the GSoC or Outreachy
internship, and all, or nearly all, the work of the student and
mentors will have been mostly wasted. It could also appear that the
use cases the feature was envisioned to be used in, are better
addressed by other improvements or a different workflow.

Another potential issue is that a new feature might be prone to naming
or user interface discussions which could last for a long time or
could not result in clear decisions.

Therefore we think that we should be very careful before proposing to
a student, or accepting, a project that implements a new feature.
People suggesting such a project should at least carefully consider
the above potential issues and see if they can be mitigated before the
project is submitted.

As [suggested by Google](https://google.github.io/gsocguides/mentor/defining-a-project-ideas-list)
(but this is true for Outreachy internships too), we emphasize that a
student proposing something original must engage with the community
strongly before and during the application period to get feedback and
guidance to improve the proposal and avoid the above potential issues.

