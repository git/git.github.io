---
layout: default
title: SoC 2019 Ideas
---

This is the idea page for Summer of Code 2019 for Git.

## About applying for SoC with the Git project

*Please read this section completely before reading the idea list
 below.*

It is required that students who want to apply to the Git
project for the Summer of Code 2019 complete a tiny, code-related
"microproject" as part of their application.  Please refer to our
[guidelines and suggestions for microprojects](https://git.github.io/SoC-2019-Microprojects)
for more information. Completing a microproject is not only an important
way for us to get experience with applicants, but it will also help
applicants become familiar with Git's development and submission
process.

A complete GSoC application should include a presentation of yourself
(include any argument that may convince mentors that you are able to
complete the project) and detailed explanations about your project.
Ideas below are just ... ideas! The list is not exhaustive, and more
importantly each idea only includes a summary of what is to be done.
An application must include detailed plans on the design, timeline ...
A typical application takes several pages. You should already have read
[the GSoC Student Guide](http://write.flossmanuals.net/gsocstudentguide/writing-a-proposal/)
by now, but re-read it if needed.

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

Please, include link(s) to the mailing-list discussion(s) related to
your microproject in your application (e.g. linking to
[public-inbox](https://public-inbox.org/git/)). If you
participate in the review of other patches, then you may also include
links to discussions that would support your application.

Students must send drafts of their proposal on the mailing-list before
submitting it officially to GSoC to get feedback from the
community. They are strongly encourraged to publish a draft on the
official GSoC website *and* post it to the mailing list for
discussion.

Getting your proposal right can follow the same process as usual patch
submission for Git, as described in the
[microprojects](https://git.github.io/SoC-2019-Microprojects) page and
in `Documentation/SubmittingPatches` in Git's source code. It is also
expected that you will send several versions of your draft, responding
to comments on the list. Please plan to send the first draft early
enough so that a number of reviews and improvements cycles can happen.

If you are not sure about your proposal, you can discuss that in the
same email where you introduce yourself or in separate emails. Please
use "[GSoC]" at the beginning of such emails.

In summary, all applicants must (not necessarily in this order):

* Complete a [microproject](https://git.github.io/SoC-2019-Microprojects).

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

([public-inbox](https://public-inbox.org/git/) can be
used for searching the mailing list and linking to previous
discussions.)

## Note about the number of slots

In 2019, the Git organization has very limited mentoring capacity.
These days we usually accept between 0 and 3 students per year.

## Summer of code main project ideas

**Students**: Please consider these ideas as starting points for
generating proposals. We are also more than happy to receive proposals
for other ideas related to Git.

### Unify ref-filter formats with other `--pretty` formats

 - Language: C, shell (bash)
 - Difficulty: medium
 - Possible mentors: Christian Couder, Оля Тележная (Olga Telezhnaya), Thomas Gummerer

See discussion in:

<https://public-inbox.org/git/87pnsfkvk1.fsf@0x63.nu/T/#u>

### `git log --oneline` improvements

 - Language: C, shell (bash)
 - Difficulty: medium
 - Possible mentors: Christian Couder, Оля Тележная (Olga Telezhnaya), Thomas Gummerer

See discussions in:

<https://public-inbox.org/git/xmqqeg42fslw.fsf@gitster.mtv.corp.google.com/T/#t>
<http://public-inbox.org/git/CA+55aFwT2HUBzZO8Gpt9tHoJtdRxv9oe3TDoSH5jcEOixRNBXg@mail.gmail.com/>

