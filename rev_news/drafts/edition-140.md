---
title: Git Rev News Edition 140 (October 31st, 2026)
layout: default
date: 2026-10-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 140 (October 31st, 2026)

Welcome to the 140th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](https://git.github.io).

This edition covers what happened during the months of September and October 2026.

## Discussions

<!---
### General
-->


### Reviews

+ [[PATCH] push: fix --force-if-includes when remote-tracking ref has no reflog](https://lore.kernel.org/git/20260903010547.85469-1-f@lex.la)

Aleksei Sviridkin sent a small patch to the mailing list. It fixed a bug
that made `git push --force-if-includes` reject valid forced pushes.

#### Some background about `--force-if-includes`

A plain `git push --force` overwrites the remote branch whatever it
points to, so it can throw away commits that someone else pushed in
the meantime. `--force-with-lease` is the safer alternative: the push
is refused if the remote branch no longer points to the commit that
the local remote-tracking ref (like `origin/main`) records.

That protection is defeated though when something, for example an
IDE, runs `git fetch` in the background. The remote-tracking ref then
gets updated without the user ever looking at the new commits, and
the lease check passes. To solve this, Srinidhi Kaushik added
`--force-if-includes` in Git 2.30 with commit 99a1f9ae10 (push: add
reflog check for "--force-if-includes", 2020-10-03), after a
[long patch series](https://lore.kernel.org/git/20201003121046.60604-1-shrinidhi.kaushik@gmail.com/).
The `push.useForceIfIncludes` config option enables it by default.

With this option, Git checks that the commit at the tip of the remote
ref has been integrated locally at some point. To do this,
`is_reachable_in_reflog()` walks the reflog of the local branch. It
looks for that commit in the reflog entries, or failing that, for
entries that can reach it. As an optimization, the walk stops at
entries older than the newest entry in the reflog of the
remote-tracking ref, because the local branch could not have been
built on a remote commit before it was fetched.

#### The initial patch

Aleksei explained that the timestamp used for this cut-off is read by
a callback passed to `refs_for_each_reflog_ent_reverse()`. When the
remote-tracking ref has no reflog, the callback never runs, and the
variable holding the timestamp is never initialized.

With the "files" ref backend, a remote-tracking ref created by
`git clone` has no reflog until it moves. On Aleksei's machine
(macOS, arm64) the value left on the stack was bigger than any real
timestamp. So the walk stopped at the very first entry, never reached
the "Created from" entry written when the branch was created, and the
push was rejected with "remote ref updated since checkout", even
though nothing had changed on the remote.

The fix was a one-line change initializing the variable to 0. The
patch also added a test to "t5533-push-cas.sh", which Aleksei warned
could pass "by luck" on other platforms. The patch had an
`Assisted-by: LLM` trailer before the `Signed-off-by:` trailer.

#### An `Assisted-by:` trailer side discussion

Junio Hamano, the Git maintainer, replied that the code change looked
good. He said the sign-off must be the last trailer, because the
author is "fully responsible for whatever LLM emitted", and that
"LLM" on its own gave no useful information. He also suggested
moving `test_when_finished` up, so that cleanup also happens if the
setup commands fail. Junio was surprised that a bug from a six-year-old
change was only being noticed now. Aleksei answered that whether the
bug triggers depends on the build and the stack layout, not really on
the platform.

Aleksei said he had followed the Linux kernel rules for the trailer,
as Git's guidelines didn't cover it. Junio pointed to the AI section
in "Documentation/SubmittingPatches". It says that the project "will
reject anything that looks AI generated" or that senders "don't
understand or cannot explain". Aleksei then cited Christian Brauner's
kernel commit 816d9992d9ed (coding-assistants: simplify attribution).
It replaced model names in the kernel's `Assisted-by:` trailers with
a bare "LLM", because naming models "provides free advertising to
proprietary software companies". He added that his patch had gone
through a router mixing models from three vendors.

Kristoffer Haugsbakk wondered why, when Git's guidelines say nothing,
the "fallback guideline becomes the one for an operating system
kernel". Junio added "We are not the kernel ;-)". He also said he
would rather not have patches with "walls of text" whose origin can't
be known, and that he preferred "human-readable explanations and
known origin". Aleksei dropped the trailer.

Kristoffer later commented on the "uncanny valley" feeling he got from
the LLM-like phrasing in replies to reviewers, and joked that he would
have expected LLM-assisted commit messages "to read more like Jeff
King log messages". After a ";-)" from Junio, Thomas Bachem offered to
ask for that in his next reroll, and Weijie Yuan said he already fed
"a few representative patch series from Peff" to an LLM in his toy
projects.

#### Is zero the right fallback?

Meanwhile, Aleksei sent
[version 2](https://lore.kernel.org/git/20260904124433.12840-1-f@lex.la/)
of the patch, which moved the sign-off last and fixed the test
cleanup.

Junio asked why 0 was a reasonable fallback value, rather than "now"
or "2 weeks ago", and what it means to pretend that the latest
remote-tracking reflog entry dates from 1970. He also suggested a
small rewording of the commit message.

Aleksei then sent
[version 3](https://lore.kernel.org/git/20260905171330.34646-1-f@lex.la/).
Its commit message used Junio's wording, and it argued that without a
reflog there is nothing to base a cut-off on. It said "now" would
bring the bug back, and a fixed age would cut the walk off too early
in some cases. It also dropped the `Assisted-by:` trailer.

A few hours later, Junio suggested that `gc.reflogExpire`, or 90 days
ago, would be "a lot more reasonable than year 1970". Even an old,
enabled reflog normally has no entries older than that, as they get
expired.

Aleksei objected that reflog entries are only expired when `git gc`
or `git reflog expire` runs. He built a scenario where a 90-day
cut-off rejects a push that 0 lets through. Junio thought such
repositories would only exist for those who "consciously disable the
gc", and that 0 would impose a slower full walk on everyone.

Aleksei disagreed again. A plain `git clone` with the "files" backend
creates no remote-tracking reflog, and `git gc --auto` only runs once
there are more than 6700 loose objects (the default `gc.auto` value),
so a quiet repository expires nothing. He also posted timings with
20000 reflog entries. The full walk only took longer, about 0.3s
instead of 0.07s, in a repository still holding entries older than 90
days. Junio found that this showed the gc expiration cut-off never
wasted more time. Aleksei agreed, but pointed out: "The cutoff is
faster than zero only where it gives the wrong answer."

Two weeks later, Tyler Cipriani, who was working on his own
[`--force-if-includes` fixes](https://lore.kernel.org/git/20260904210122.431757-1-tyler@tylercipriani.com/),
said he liked `date=0`. Both values give the right answer in most
cases, but the cut-off can give a wrong one, and "the wrong answer is
worse". He described a simple scenario with default gc settings where
the cut-off fails: clone, start rewriting history, do nothing for 90
days, then finish and force-push. He noted that 0 also avoids having
to choose between `gc.reflogExpire`, per-ref settings or
`gc.reflogExpire=never`. Junio agreed that when a reflog has never
been expired, using all the available information always works better
than using a cut-off.

#### Polishing the commit message and the test

Tyler then reviewed version 3. He said the code looked right, and
that a wrong rejection with advice to pull would push him "(pun
intended)" to drop the config option and the feature altogether.

He measured the cost on linux.git with 2000 reflog entries: 15ms with
a commit-graph, but two minutes without one. That is because each
batched call to `repo_in_merge_bases_many()` walks the history from
scratch. He noted that doubling the batch size after each call
brought this down to 10s, a possible optimization for a separate
patch.

Tyler also found the last paragraph of the commit message hard to
read, and even technically wrong: it suggested that a walk stopped by
the cut-off skips the merge-base check. He found that without the
fix, the test still passed on his Linux x86_64 machine, where the
uninitialized value happened to be 2. It failed reliably only when
built with `make CFLAGS_APPEND=-ftrivial-auto-var-init=pattern`, so CI
would probably not catch a similar regression. He suggested using the
`setup_src_dup_dst` helper in the test, like the surrounding tests.
Junio noted that the patch had trivial textual conflicts in t5533 with
Tyler's topic.

Aleksei sent
[version 4](https://lore.kernel.org/git/20260929091319.86392-1-f@lex.la/)
with a rewritten commit message that fixed the two inaccuracies
Tyler had found. It explained that the record of the last move of the
remote-tracking ref can be "never written, deleted, or expired by
gc". The test now used `setup_src_dup_dst` and expired only the
remote-tracking reflog. Aleksei confirmed that it passed with both
the "files" and "reftable" backends.

Junio found both changes sensible, thanked Aleksei and Tyler, and
said he would mark the patch for 'next'.

#### Conclusion

The fix itself was a single line, but the discussion went well beyond
it. Reviewers asked why zero was the right value, and the patch was
then backed by concrete scenarios and measurements, ending with the
principle that a wrong answer is worse than a slow one. The thread
also showed that bugs caused by uninitialized variables can hide for
years, and that compiler options like `-ftrivial-auto-var-init=pattern`
help to reveal them. It also provided an opportunity to clarify the
project's stance on `Assisted-by:` trailers and AI-assisted
contributions.

The patch was merged into the 'master' branch on October 6, 2026. It
will be part of the upcoming Git 2.98.0 release, and the release notes
say it will later be merged to 'maint' too. Tyler's related
`--force-if-includes` fixes were still in 'seen' at the time of
writing.

<!---
### Support
-->

## Developer Spotlight: Pablo Sabater

_Editor’s note: This edition features a retrospective interview with a
contributor who contributed to Git through a mentoring program. We hope
the reflections shared by the GSoC contributor will provide an
insightful perspective that benefits the community. As always, we
welcome your thoughts and feedback!_

* **Who are you and what do you do?**

  I'm Pablo Sabater, a Computer Science and Engineering undergraduate
  from Spain. I study at the University of Murcia but I'm currently living
  in Lisbon studying at NOVA FCT. I'm into low-level systems programming,
  mostly C, apart from Git.

  Apart from coding I really enjoy cooking.

  This summer I was a GSoC contributor at Git, mentored by Karthik Nayak
  and Chandra Pratap.

* **How did you initially become interested in contributing to Git, and
  what motivated you to choose it as your GSoC project?**

  Paco told me about GSoC, and Git was one of the organizations that
  caught my attention the most, it's a tool I use every day and I
  wanted to know how it really works. I started contributing around
  March 2026 with small patches (little time for the proposal deadline
  haha).

  [The project](https://summerofcode.withgoogle.com/programs/2026/projects/752yzmwm)
  was completing remote-object-info for `git cat-file --batch-command`.
  It had already gone through Calvin Wan and Eric Ju, same as some
  series that I had merged at the beginning I tried finding the most
  visual output as testing it would be "easier" and I just like
  to see what I have worked on. That's why I've also worked on the
  graph machinery. So, completing a command seemed very interesting
  and visual for me.

* **How do you feel your contribution has impacted the Git community or
  the broader open source ecosystem?**

  Protocol v2 had the server side of object-info since 2021, but no
  client was using it. Now `git cat-file --batch-command` can ask a
  remote for the size and the type of an object without downloading it.
  That's useful for partial clones, large repos, and tools that only
  need metadata.

  However it is not an option that many forges have activated sadly.

  Outside of GSoC, I also [added `--graph-lane-limit`](https://lore.kernel.org/git/20260328001113.1275291-1-pabloosabaterr@gmail.com/)
  and [visual root indentation](https://lore.kernel.org/git/20260714-ps-pre-commit-indent-v12-0-d50938e006df@gmail.com/)
  to `git log --graph` and some tiny fixes. I don't think they have
  huge impact but at least some?

  Maybe the best contribution is that when I've seen someone on the
  `#my-first-contribution` channel [on Discord](https://git-scm.com/community#discord),
  I tried to review their patches quickly and help them out.

* **Is there any aspect of Git that you now see differently after having
  contributed to it?**

  There is a lot of backward compatibility. Some parts are not very
  pretty to look at and now I get more interested in the commands
  I use.

* **How do you balance your contributions with other responsibilities
  like work or school?**

  Not as well as I'd have liked. Luckily I was in summer and I had no classes
  but I tend to let things that I like absorb me. However I still enjoyed
  the summer with my friends, sometimes I worked in advance to not work
  in some days and some other day I brought the laptop to camping.

* **Can you share how GSoC helped enhance your technical and
  non-technical skills (like communication, project management, etc.)?**

  Technically, I learned how Git works internally and Git has some very
  good parts that I have also learned from and helped improve my C coding.

  Non-technically, I improved how I review other people's work.

* **What was your biggest takeaway or learning from GSoC that you now
  apply regularly in your work?**

  I was a frequent user of `git commit -m ""` and after Git I enjoy
  making small commits with their full body and having linear histories
  on my own project (I even try to make my friends do the same).

* **What was the biggest challenge you faced during your contributions
  to Git, and how did you overcome it?**

  Maybe fear of repercussions? I know it sounds ridiculous (more after
  meeting a lot of Git contributors). Everyone is so nice. In the beginning,
  though, the mailing list acts like an "evil filter".

  Regarding coding, I think usually things are easier when you start
  from scratch. This time, I was in a huge codebase of code that I
  didn't know and had to pull a series not written by me from scratch.

* **Have you thought about mentoring new GSoC / Outreachy students?**

  Yes, I'd love to. I was planning to mentor Outreachy this year but
  I overestimated my time here in Lisbon and I had to drop out.

  I hope to mentor in the future.

* **If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?**

  I mean, everyone is already doing a lot of things and I still don't
  know a LOT of Git. I like to say that one doesn't know what it lacks
  until they know what it has.

  But I see interesting work on VFS, LFS and I'd love good documentation
  throughout the codebase.

* **If you could remove something from Git without worrying about
  backwards compatibility, what would it be?**

  I don't know, sorry.

* **What upcoming features or changes in Git are you particularly
  excited about?**

  I think that the one I'm most excited for is the [pluggable backends](https://youtu.be/8dFBpblOsZY).
  Even though I don't work at any big corp that would use it, I'm
  sure that I'm going to have fun trying it.

* **What is your favorite Git-related tool/library, outside of Git
  itself?**

  [b4](https://b4.docs.kernel.org/en/latest/), made the work of
  sending things to a mailing list so easy.

* **What is your toolbox for interacting with the mailing list and for
  development of Git?**

  I code on [neovim](https://neovim.io/) and I like to keep most of
  my stuff on the terminal, to review others I download the thread
  as mbox; and then I use [aerc](https://aerc-mail.org/) to answer;
  and to send my work I now use b4.

  One command that I didn't know until recently that Git has on the
  codebase is [`git clang-format --diff`](https://github.com/llvm/llvm-project/blob/main/clang/tools/clang-format/git-clang-format),
  which I don't remember who told me about it sadly. Before knowing
  about it, I always had style complaints on my series.

* **How do you envision your own involvement with Git or other open
  source projects in the future?**

  I want to keep contributing to Git, become better at it and treat
  it as if it is my own project. I also want to get involved in other open
  source projects, for example I'm trying with a friend to build a proper
  e-ink simulator on top of open source hardware.

  I see that Git, even though it is a huge project the actual people
  that you see on the mailing list daily is in fact, small. At Git
  Merge everyone knows each other. I want something like that.

  And of course I would love to have an idea that leads into a big
  open source project with community.

* **What is your advice for people who want to start Git development?
  Where and how should they start?**

  I'd say that even if you are lazy, reading documentation will save so
  much time in the long run that it's worth it. The people on the mailing
  list are very nice and to take their time, there is no joy in rushing
  things.

* **Would you recommend other students or contributors to participate in
  the GSoC, Outreachy or other mentoring programs, working on Git? Why?
  Do you have advice for them?**

  Totally, it's one of the best experiences that I've had.

  I want to mention Tian, Jayatheerth and Siddharth, the other 3 GSoC
  contributors at Git this summer, and of course Karthik and Chandra,
  my mentors.

## Other News

__Various__
+ [JJ Con 2026 Talks are Up](https://blog.gitbutler.com/jj-con-2026-talks)
  by Scott Chacon on Butler's Log (GitButler blog).
  The post includes a quick overview of each of them.
    + GitButler helped host [Git Merge 2026](https://git-merge.com/) in Lisbon,
	  with which JJ Con 2026 was organized alongside (co-located).
	  Other sponsors and hosts included [Google Open Source](https://opensource.google/)
	  and [ERSC](https://ersc.io/) (East River Source Control).
	+ [Jujutsu (`jj`)](https://jj-vcs.github.io/) is a Git-compatible version control system written in Rust,
	  which was first mentioned in [Git Rev News Edition #85](https://git.github.io/rev_news/2022/03/31/edition-85/),
	  and most recently in [Edition #139](https://git.github.io/rev_news/2026/09/30/edition-139/).


__Easy watching__
+ [Git Merge '26](https://www.youtube.com/playlist?list=PLRfSktKnsgUs)
  talks, starting with ["SHA-256 at a Hyperscaler" by Emily Shaffer](https://www.youtube.com/watch?v=eJJp0RE7cd4&list=PLRfSktKnsgUs),
  are available on YouTube, on the [GitButler App channel](https://www.youtube.com/@gitbutlerapp).
    + You can also read [notes about the talks](https://gist.github.com/dscho/9c70e07ee54616bbf401b4e5f40969bf),
	  distilled by Johannes Schindelin, alias Dscho, from the recording and its subtitles,
	  mentioned in [the previous edition of Git Rev News](https://git.github.io/rev_news/2026/09/30/edition-139/).
+ [JJ Con '26](https://www.youtube.com/playlist?list=PLD4pL2IO36cM)
  talks (which was co-located with Git Merge '26),
  starting with ["jj Tool & Config Ecosystem" by André Arko](https://www.youtube.com/watch?v=buLvWZS1P20&list=PLD4pL2IO36cM),
  are available on YouTube, on the [GitButler App channel](https://www.youtube.com/@gitbutlerapp).
    + The above-mentioned [jj Tool & Config Ecosystem - André Arko](https://www.youtube.com/watch?v=buLvWZS1P20) talk [38:37],
	  also available as [Beyond jj: config & tools ecosystem](https://andre.arko.net/2026/09/16/beyond-jj-config-and-tools-ecosystem/) post by the author,
	  and as [slides on SpeakerDeck](https://speakerdeck.com/indirect/beyond-jj-config-and-tools-ecosystem),
	  was also mentioned in [the previous edition of Git Rev News](https://git.github.io/rev_news/2026/09/30/edition-139/).


__Light reading__


__Git tools and sites__


## Releases

+ Git for Windows [v2.56.0(4)](https://github.com/git-for-windows/git/releases/tag/v2.56.0.windows.4),
[v2.56.0(3)](https://github.com/git-for-windows/git/releases/tag/v2.56.0.windows.3),
[v2.56.0(2)](https://github.com/git-for-windows/git/releases/tag/v2.56.0.windows.2)
+ go-git [6.0.0-beta.1](https://github.com/go-git/go-git/releases/tag/v6.0.0-beta.1)
+ gitoxide [0.61.0](https://github.com/GitoxideLabs/gitoxide/releases/tag/v0.61.0),
[0.60.0](https://github.com/GitoxideLabs/gitoxide/releases/tag/v0.60.0)
+ Grit [0.5.26](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.26),
[0.5.25](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.25),
[0.5.24](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.24),
[0.5.23](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.23),
[0.5.22](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.22),
[0.5.21](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.21),
[0.5.20](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.20),
[0.5.19](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.19),
[0.5.18](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.18),
[0.5.17](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.17),
[0.5.16](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.16),
[0.5.15](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.15),
[0.5.14](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.14),
[0.5.13](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.13),
[0.5.12](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.12),
[0.5.11](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.11),
[0.5.10](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.10),
[0.5.9](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.9),
[0.5.8](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.8),
[0.5.7](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.7),
[0.5.6](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.6),
[0.5.5](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.5),
[0.5.4](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.4),
[0.5.3](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.3),
[0.5.2](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.2),
[0.5.1](https://github.com/gitbutlerapp/grit/releases/tag/v0.5.1)
+ Gitea [28.2.0](https://github.com/go-gitea/gitea/releases/tag/v28.2.0),
[28.1.0](https://github.com/go-gitea/gitea/releases/tag/v28.1.0)
+ Gerrit Code Review [3.14.5](https://www.gerritcodereview.com/3.14.html#3145),
[3.15.0-rc0](https://www.gerritcodereview.com/3.15.html#3150),
[3.15.0-rc1](https://www.gerritcodereview.com/3.15.html#3150),
[3.15.0-rc2](https://www.gerritcodereview.com/3.15.html#3150),
[3.15.0-rc3](https://www.gerritcodereview.com/3.15.html#3150),
[3.15.0-rc4](https://www.gerritcodereview.com/3.15.html#3150)
+ GitHub Enterprise [3.22.2](https://docs.github.com/enterprise-server@3.22/admin/release-notes#3.22.2),
[3.21.7](https://docs.github.com/enterprise-server@3.21/admin/release-notes#3.21.7),
[3.20.9](https://docs.github.com/enterprise-server@3.20/admin/release-notes#3.20.9),
[3.19.13](https://docs.github.com/enterprise-server@3.19/admin/release-notes#3.19.13),
[3.18.16](https://docs.github.com/enterprise-server@3.18/admin/release-notes#3.18.16)
+ GitLab [19.6](https://docs.gitlab.com/releases/19/gitlab-19-6-released/),
[19.5](https://docs.gitlab.com/releases/19/gitlab-19-5-released/)
+ GitKraken [12.6.1](https://help.gitkraken.com/gitkraken-desktop/current/),
[12.6.0](https://help.gitkraken.com/gitkraken-desktop/current/)
+ GitHub Desktop [3.6.10](https://desktop.github.com/release-notes/),
[3.6.9](https://desktop.github.com/release-notes/),
[3.6.8](https://desktop.github.com/release-notes/),
[3.6.7](https://desktop.github.com/release-notes/)
+ lazygit [0.66.2](https://github.com/jesseduffield/lazygit/releases/tag/v0.66.2),
[0.66.1](https://github.com/jesseduffield/lazygit/releases/tag/v0.66.1),
[0.66.0](https://github.com/jesseduffield/lazygit/releases/tag/v0.66.0)
+ GitButler [0.23.1](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.23.1),
[0.23.0](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.23.0)
+ delta [0.20.1](https://github.com/dandavison/delta/releases/tag/0.20.1),
[0.20.0](https://github.com/dandavison/delta/releases/tag/0.20.0)
+ difftastic [0.72.0](https://github.com/Wilfred/difftastic/releases/tag/0.72.0)
+ Kinetic Merge [1.24.0](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.24.0),
[1.23.0](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.23.0),
[1.22.2](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.22.2),
[1.22.1](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.22.1),
[1.22.0](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.22.0),
[1.21.6](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.21.6),
[1.21.5](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.21.5),
[1.21.4](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.21.4),
[1.21.3](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.21.3),
[1.21.2](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.21.2),
[1.21.1](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.21.1),
[1.21.0](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.21.0),
[1.20.0](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.20.0)
+ git-credential-oauth [0.18.0](https://github.com/hickford/git-credential-oauth/releases/tag/v0.18.0)
+ git-lfs [3.8.1](https://github.com/git-lfs/git-lfs/releases/tag/v3.8.1)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
