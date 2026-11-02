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

+ [[PATCH] push: fix `--force-if-includes` when remote-tracking ref has no reflog](https://lore.kernel.org/git/20260903010547.85469-1-f@lex.la)

Aleksei Sviridkin sent a small patch to the mailing list. It fixed a bug
that made `git push --force-if-includes` reject valid forced pushes.

#### Some background about `--force-if-includes`

A plain `git push --force` overwrites the remote branch whatever it
points to, so it can throw away commits that someone else pushed in
the meantime. Option `--force-with-lease` is the safer alternative: the push
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
known origin".  As a consequence, Aleksei dropped the trailer.

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

Junio asked why `0` was a reasonable fallback value, rather than "now"
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
cut-off rejects a push that `0` lets through. Junio thought such
repositories would only exist for those who "consciously disable the
gc", and that `0` would impose a slower full walk on everyone.

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
days, then finish and force-push. He noted that `0` also avoids having
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
  was completing remote-object-info for the `git cat-file --batch-command`.
  It had already gone through Calvin Wan and Eric Ju, same as some
  series that I had merged at the beginning when I tried finding the best
  visual output as testing it would be "easier", and I just like
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

  However, sadly it is not an option that many forges have activated.

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

  Not as well as I'd have liked. Luckily I was in summer and I had no classes,
  but I tend to let things that I like absorb me. However I still enjoyed
  the summer with my friends, sometimes I worked in advance to not work
  in some days, and some other day I brought the laptop to camping.

* **Can you share how GSoC helped enhance your technical and
  non-technical skills (like communication, project management, etc.)?**

  Technically, I learned how Git works internally, and Git has some very
  good parts that I have also learned from and helped improve my C coding.

  Non-technically, I improved how I review other people's work.

* **What was your biggest takeaway or learning from GSoC that you now
  apply regularly in your work?**

  I was a frequent user of `git commit -m ""`, and after GSoC I enjoy
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

  I mean, everyone is already doing a lot of things, and I still don't
  know a LOT of Git. I like to say that one doesn't know what it lacks
  until they know what it has.

  But I see interesting work on VFS and LFS, and I'd love good documentation
  throughout the codebase.

* **If you could remove something from Git without worrying about
  backwards compatibility, what would it be?**

  I don't know, sorry.

* **What upcoming features or changes in Git are you particularly
  excited about?**

  I think that the one I'm most excited of is the [pluggable backends](https://youtu.be/8dFBpblOsZY).
  Even though I don't work at any big corp that would use it, I'm
  sure that I'm going to have fun trying it.

* **What is your favorite Git-related tool/library, outside of Git
  itself?**

  [b4](https://b4.docs.kernel.org/en/latest/), as it made the work of
  sending things to a mailing list so easy.

* **What is your toolbox for interacting with the mailing list and for
  development of Git?**

  I code on [neovim](https://neovim.io/) as I like to keep most of
  my stuff on the terminal; to review others, I download the thread
  as `mbox` and then use [aerc](https://aerc-mail.org/) to answer;
  to send my work I now use b4.

  One command that I didn't know until recently that Git has on its
  codebase is [`git clang-format --diff`](https://github.com/llvm/llvm-project/blob/main/clang/tools/clang-format/git-clang-format),
  for which I sadly don't remember who told me about it. Before knowing
  about it, I always had style complaints on my series.

* **How do you envision your own involvement with Git or other open
  source projects in the future?**

  I want to keep contributing to Git, become better at it and treat
  it as if it was my own project. I also want to get involved in other open
  source projects, for example I'm trying with a friend to build a proper
  e-ink simulator on top of open source hardware.

  I see that Git, even though it is a huge project, the actual number of people
  that you see daily on the mailing list is in fact small. At Git
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
  contributors to Git this summer, and of course Karthik and Chandra,
  my mentors.


## Other News

__Various__
+ [Apple's git still trusts the compromised eMudhra certificates](https://emudhra.we-have-a-problem.com/apple.html)
  (as of 28th October) by Dennis Jackson.  The article provides workarounds for the problem.
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
+ [Redesigning source control at Anthropic](https://www.anthropic.com/research/redesigning-source-control)
  about Scion, their in-house version control system.
+ [Anthropic’s Scion is heavily inspired by Mononoke](https://sunshowers.io/posts/anthropic-mononoke/)
  and [More on Anthropic’s Scion ripping off Mononoke](https://sunshowers.io/posts/anthropic-mononoke-2/)
  by Rain on their Sunshowers blog.
  Since then, [sufficient attribution](https://www.anthropic.com/engineering/redesigning-source-control#footnote-2)
  has been added to Anthropic’s blog post.
    + [Mononoke](https://github.com/meta/sapling/tree/main/eden/mononoke) is the server
	  built for Meta's [Sapling Source Control System](https://sapling-scm.com/),
	  meant to scale up to accepting thousands of commits every hour across millions of files.
	  Sapling was first mentioned in [Git Rev News Edition #93](https://git.github.io/rev_news/2022/11/30/edition-93/).
+ [Anthropic Threw Away Git. What Broke First Is the Part I Can’t Stop Thinking About.](https://jackiechen.blog/2026/10/22/anthropic-threw-away-git-what-broke-first-is-the-part-i-cant-stop-thinking-about/)
  by Jackie Chen on their blog (Jackie Chen's IT Workshop).
+ [A Git Forge Without a Center](https://entire.com/blog/a-git-forge-without-a-center)
  by Georg Friedrich on Entire's Blog,
  about launching Entire, which is a Git forge for agent-human collaboration.
+ [Everyone is doing Git on S3 wrong](https://enroute.sh/blog/everyone-is-doing-git-on-s3-wrong)
  by Enroute (where they build highly performant Git server,
  written in Rust and backed by object storage).
+ [We want you to build the next Git platform on Cloudflare](https://blog.cloudflare.com/next-git-platform-on-cloudflare/)
  by Dina Kozlov, Dillon Mulroy, and Zebulon Piasecki:
  a followup to [Artifacts: versioned storage that speaks Git](https://blog.cloudflare.com/artifacts-git-for-agents-beta/).
+ [So long, Spokes: GitHub rewrites storage to restore reliability, just in time for agentic hordes](https://www.theregister.com/devops/2026/10/09/so-long-spokes-github-rewrites-storage-to-restore-reliability-just-in-time-for-agentic-hordes/5302148)
  by Joab Jackson in The Register.
+ [Migrate your site to the new git-pages backed Codeberg Pages now. We're sunsetting Codeberg Pages v2](https://blog.codeberg.org/migrate-your-site-to-the-new-git-pages-backed-codeberg-pages-now-were-sunsetting-codeberg-pages-v2.html),
  announcement by Andreas Shimokawa (Codeberg e. V.).
  Codeberg Pages v2 will be shut off completely on 2026-12-31.
+ [GhostAction Compromises About 1,900 GitHub Accounts, Targets Over 30,000 Repositories](https://thehackernews.com/2026/10/ghostaction-compromises-about-1900.html)
  by Ravie Lakshmanan on The Hacker News.
+ [GitHub Actions workflow lockfiles in public preview](https://github.blog/changelog/2026-10-14-github-actions-workflow-lockfiles-in-public-preview/).
+ [GitLab warns of max severity code execution vulnerability](https://www.bleepingcomputer.com/news/security/gitlab-warns-of-max-severity-rce-flaw-in-regex-compiler-engine/)
  by Sergiu Gatlan on Bleeping Computer.


__Newsletters__
+ [This Week in Source Control: 28 October 2026](https://nesbitt.io/2026/10/28/this-week-in-source-control.html)
  by Andrew Nesbitt.<br>
  This first issue covers the fortnight since 11 October.


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
+ [Git 3.0's upcoming SHA-256 default will be a costly mistake](https://blog.gitbutler.com/git-3-sha-256)
  by Scott Chacon on Butler's Log (GitButler blog).
  The article cites [Linus Torvalds, who said in 2005](https://lore.kernel.org/git/Pine.LNX.4.58.0504291221250.18901@ppc970.osdl.org/):
  _"I really think people should not consider the sha1 the "security". The real security is in distribution."_
  It mentions problems with submodules, with existing links, and with external libraries
  (go-git, libgit2, JGit, Dulwich, gitoxide / gix) not being SHA256-ready,
  and instead proposes independent tree hash headers in tag objects
  (like Colin Waters' [git-evtag](https://github.com/cgwalters/git-evtag),
  which was mentioned in [Git Rev News Edition #60](https://git.github.io/rev_news/2020/02/19/edition-60/)).<br>
  See also:
    + [Looking forward to Git 2.56 — and 3.0](https://lwn.net/Articles/1094575/)
	  by Jonathan Corbet on LWN\.net, where switch to SHA-256 in Git 3.0 is mentioned
	  (that article was mentioned in [Git Rev News Edition #139](https://git.github.io/rev_news/2026/09/30/edition-139/)).
	+ [SHA-256 at a Hyperscaler - Emily Shaffer](https://www.youtube.com/watch?v=eJJp0RE7cd4)
	  talk from Git Merge '26.
	+ Johannes Schindelin's (Dscho's) [summary of the Git Contributors' Summit 2026](https://lore.kernel.org/git/5cc325c6-579e-4fed-7071-a3ff98d51ccb@gmx.de/)
	  (also mentioned in [previous edition](https://git.github.io/rev_news/2026/09/30/edition-139/))
	  talks about SHA-256 support across the ecosystem being a blocker
	  for v3.0 release, and SHA-1/SHA-256 interoperability work not being on the list.
	+ [Breaking Changes: Git 3.0](https://git-scm.com/docs/BreakingChanges#_git_3_0)
	  documentation.
+ [Migrating Git repos to SHA-256](https://exa.y2k.diy/garden/git-sha256/)
  by Exa Skye on their personal website: Exa's Corner.
+ [I got targeted](https://frankwiles.com/posts/i-got-targeted/)
  (in a project inquiry, with Markdown files provided via Dropbox folder...
  with `.git` directory and active [`post-checkout`](https://git-scm.com/docs/githooks#_post_checkout) [hook](https://githooks.com/),
  to trigger when switching branch as suggested),
  by Frank Wiles on FrankWiles\.com.
+ [Making git hooks visible: A terminal prompt technique for zsh to see the status of git hooks.](https://nedbatchelder.com/blog/202610/making_git_hooks_visible)
  by Ned Batchelder on his blog.  Inspired by Frank Wiles' post linked above.
+ [Making git hooks visible in fish shell](https://offby1.website/posts/making-git-hooks-visible-in-fish-shell.html)
  by Chris Rose on his Off By 1 blog.  Inspired by Ned Batchelder's post.
+ [Git is still awful](https://lukeplant.me.uk/blog/posts/git-is-still-awful/),
  a rant (mainly) about Git error messages by Luke Plant.
+ [Scanning 7.25 Million Public Repositories on China's Largest Git Platform (Gitee) for Secrets](https://www.mongodb.com/company/blog/technical/scanning-7-point-25-million-public-repositories-chinas-largest-git-platform-for-secrets)
  using both [TruffleHog](https://trufflesecurity.com/trufflehog) by TruffleSecurity
  and [Kingfisher](https://github.com/mongodb/kingfisher) by MongoDB.
  By Ben Zimmermann, Independent Security Researcher, on MongoDB Builder Blog.
+ [Editing changelogs so people can actually use them](https://dev.to/nataliakovac/editing-changelogs-so-people-can-actually-use-them-3aio)
  by Natália Kováč on DEV\.to, talks about what needs to be extracted from `git log`,
  and recommends a way of of structuring it, following the
  [Keep a Changelog](https://keepachangelog.com/) convention
  (which was mentioned in [Git Rev News Edition #42](https://git.github.io/rev_news/2018/08/22/edition-42/)).
+ [Make git worktrees cheap for agents](https://stanislav.blog/make-git-worktrees-cheap-for-agents/)
  by Stanislav Panferov on his blog.
+ [Git worktrees using too much disk space? Copy-on-write can help.](https://dev.to/kale_myrk/git-worktrees-using-too-much-disk-space-copy-on-write-can-help-m34)
  by Kale Myrk on DEV\.to, about [Parhel](https://github.com/myrk-kale/parhel),
  a small Git extension in Rust that creates worktrees using copy-on-write (CoW).
    + Compare [Riftri](https://riftri.dev/) - Lightweight Git workspaces for parallel development,
	  using native copy-on-write backends, also written in Rust.
	  It was mentioned in [Git Rev News Edition #139]().
	+ Compare [Copy-on-write git worktrees](https://commaok.xyz/post/git-cow-worktrees/) by Josh Bleecher Snyder,
	  about creating `git-cow-worktree`, a drop-in replacement for `git worktree add`
	  that uses copy-on-write for the worktrees.  Written in Go.
	  It was mentioned in [Git Rev News Edition #135](https://git.github.io/rev_news/2026/05/31/edition-135/).
	+ See also [Zit](https://getzit.org/), a git extension
	  for many developers and coding agents changing one repository at the same time,
	  with copy-on-write workspaces instead of worktrees,
	  changes checked against what landed meanwhile, and each change's reason kept.
	+ But please note that [Git worktrees are not an isolation boundary for coding agents](https://fletch.sh/blog/git-worktrees-vs-clones-for-ai-agents/),
	  as written by by Alex Chaplinsky on Fletch Blog, mentioned in [Git Rev News Edition #138](https://git.github.io/rev_news/2026/08/31/edition-138/),
	  and the article below.
+ [Worktrees do not remove the collision. They move it to merge time.](https://foremerge.com/blog/worktrees-move-the-collision-to-merge-time/)
  by Nick Woodhead on Foremerge Blog.
+ [Ship Now, Finish Later: `gh stack` Kills Branch Gymnastics](https://dev.to/gioboa/ship-now-finish-later-gh-stack-kills-branch-gymnastics-4pk7)
  by Giorgio Boa on DEV\.to.<br>
  The [`gh stack` extension](https://github.github.com/gh-stack/) was first mentioned
  in [Git Rev News Edition #134](https://git.github.io/rev_news/2026/04/30/edition-134/),
  then as private preview.
+ [A Missing Git{Lab,Hub} Feature](https://zacps.nz/blog/grouped-prs/):
  'grouped PRs', a cousin to the recent 'stacked PRs' feature.
  By Zac Pullar-Strecker on their blog.
+ [What's Wrong with GitHub](https://www.gnu.org/philosophy/whats-wrong-with-github.html)
  by Jacob Bachmeyer and Richard Stallman.
+ [Spin up your own git forge with Mochi](https://jeremy.magland.org/posts/2026-09-26-spin-up-your-own-git-forge-with-mochi/)
  by Jeremy Magland on his blog.
+ [Pros and Cons of Self-hosting a Public Git Forge](https://joshtronic.com/2026/10/11/pros-cons-self-hosted-git/)
  by Josh Sherman on Joshtronic, his personal website.
+ [The federated code forge](https://tangled.org/blog/forge/)
  by Anirudh on Tangled Blog.<br>
  [Tangled.sh](https://tangled.org) is a new social-enabled Git collaboration platform
  built on top of AT Protocol / ATProto (which powers BlueSky),
  first mentioned in [Git Rev News Edition #125](https://git.github.io/rev_news/2025/07/31/edition-125/),
  and most recently in [Edition #138](https://git.github.io/rev_news/2026/08/31/edition-138/).
+ [Manage Your Dotfiles with Nothing but Git](https://terminal.ninja/guides/manage-dotfiles/),
  a guide from [terminal ninja](https://terminal.ninja/) website.
+ [Using multiple git remotes for true distributed version control](https://optimizedbyotto.com/post/multiple-git-remotes/)
  by Otto Kekäläinen on Optimized by Otto blog.
+ [On Git Refs](https://matklad.github.io/2026/10/07/git-ref.html)
  by  Alex Kladov (matklad), on improving his mental model of Git.
+ [Maybe a better way to track the release history of a Git repo](https://blog.plover.com/prog/git/history-proposal.html)
  by Mark Dominus (陶敏修) on The Universe of Discourse blog.
+ [55,181 Commits in 7 Days: Why We Moved Health Checks Out of Git](https://www.syntasso.io/post/55-181-commits-in-7-days-why-we-moved-health-checks-out-of-git)
  by Derik Evangelista on Syntasso Blog.
  Sometimes there’s such a thing as too much of GitOps.
+ [How big is a Git commit?](https://ratfactor.com/cards/git-commit-size)
  by Dave Gauer, a card in Dave's Virtual Box of Cards.
  Short answer: It depends (checked with some little experiments).
+ [Is There Life Outside of Git?](https://dpaletti.com/posts/life_outside_git/)
  by Daniele Paletti.  Mentions Jujutsu (`jj`), Google's Piper,
  Meta's [Sapling](https://sapling-scm.com/), and Antropic's Scion.
+ [You Can Hide Languages From GitHub's Languages Bar](https://nelson.cloud/you-can-hide-languages-from-githubs-languages-bar/)
  with `linguist-detectable` gitattribute.
  by Nelson Figueroa on his blog.
+ [Using Codeberg's git-pages deployment with git lfs](https://tzovar.as/codeberg-git-pages-with-lfs/)
  by Bastian Greshake Tzovaras on his blog.
  Mentions [Codeberg shutting down its old Codeberg Pages server](https://blog.codeberg.org/migrate-your-site-to-the-new-git-pages-backed-codeberg-pages-now-were-sunsetting-codeberg-pages-v2.html)
  and [migrating](https://docs.codeberg.org/codeberg-pages/migrating-from-pages-v2/)
  to [`git pages`](https://codeberg.org/git-pages/git-pages)-based alternative.
+ [The GitHub wiki is an anti-pattern](https://michaelheap.com/github-wiki-is-an-antipattern/)
  (2022) by Michael Heap (@mheap) on his blog.

+ [Rare Git Hashes: Seeking alpha in the git log](https://engineering.finchlegal.com/blog/rare-git-hashes)
  by Dean Keinan on Finch Engineering blog.
  Examines the question of how rare are (in Git repositories) SHA-1 hashes that embed
  English words, repeated characters, repeated sequences of characters,
  palindromes, and ascending and descending sequences.<br>
  **Warning:** includes live service, takes large amount of memory.
    + See also [Git hash prefix or cellphone number?  What is the probability of getting an all-numbers Git hash prefix?](https://tonisagrista.com/blog/2026/git-hash-prefix-numbers/),
	  mentioned in [Git Rev News #139](https://git.github.io/rev_news/2026/09/30/edition-139/).
+ [lgit: source control for the AI era](https://nicobrenner.github.io/lossy-git/),
  about a version control system where the storage medium is a neural network
  (replacing the storage layer with an MLP (Multi-Layer Perceptron)).
  By Nico Brenner (with [code](https://github.com/nicobrenner/lossy-git)).
  Parttly an experiment, partly a joke.
    + Compare and contrast to a joke tool: 
	  [git-llmfs](https://codeberg.org/TheMikina/git-llmfs) - a Git filter
	  that uses local LLM summaries as a compression mechanism for code files
	  to save space in a Git repository
	  (mentioned in [Git Rev News Edition #137](https://git.github.io/rev_news/2026/07/31/edition-137/)).
+ [git-afterlife: I Held a Séance for the Original flask.py](https://dev.to/paulopnun/git-afterlife-i-held-a-seance-for-the-original-flaskpy-36o5)
  by Pau López Núñez on DEV\.to.
  The article talks about a small command-line tool,
  created for [Hacktoberfest Open-Source AI Challenge Week 4: Ghost in the Machine](https://dev.to/challenges/hacktoberfest-week4-2026-10-26)
  that digs every deleted file out of a repository's history,
  writes some statistics about its history and epitaph and last words for the file,
  the latter written by an open-weight model (Gemma 3).


__Scientific preprints__
+ Vedant Shah et al.: ["GitSwarm: Decentralized Compounding Inference"](https://veds12.github.io/git-swarm/).
  Many agents, one shared repository, and work that keeps building on itself.
  [arXiv:2610.04862](https://arxiv.org/abs/2610.04862).


__Git tools and sites__
+ [LearnGit.io v2 is here](https://learngit.io/posts/learngit-v2-is-here).
  A rethink of LearnGit from the ground that makes progression easier & more intuitive.
  [LearnGit.io](https://learngit.io/) teaches Git
  with animated visualizations of Git internals, added quizzes,
  step-by-step interactive scenarios, and type-it-yourself exercises
  with a terminal emulator showing real commands and a visualization of the full Git tree,
  including branch pointers and commits.
  The first two modules are [open to anyone](https://app.learngit.io/home/) without an account.
  LearnGit.io is free for students & educators.<br>
  [LearnGit.io](https://learngit.io/) was mentioned in [Git Rev News Edition #108](https://git.github.io/rev_news/2024/02/29/edition-108/),
  [#127](https://git.github.io/rev_news/2025/09/30/edition-127/),
  and [#136](https://git.github.io/rev_news/2026/06/30/edition-136/) (in passing).
    + Created by Jack Lot of [The Modern Coder](https://www.youtube.com/@themoderncoder) YouTube channel.
+ [FluxGit Git School](https://fluxgit.com/learn/) is a free set
  of nine guided Git exercises and a playground, available in eleven languages.
  It uses an in-memory simulated repository, without accessing local files
  or connecting to real Git remotes. Exercises cover misplaced commits,
  reset recovery, deleted branches, detached HEAD, conflicts and divergent
  branches. The simulator supports a subset of Git commands.
  No account or installation is needed to practise.
  Each exercise connects to the relevant written guide where one exists;
  existing video tutorials are linked alongside them.
+ [Git-ing Over It](https://git-ing-over-it.vercel.app/) is a browser-based
  game that hands you a real broken repo and makes you figure out what to run,
  the way you actually learn git at work.  Built by Ketuman Vishwakarma.
  Progress lives only in the browser; it never syncs or leaves your device.
    + Compare, for example, [git-game](https://github.com/git-game/git-game) and [git-game-v2](https://github.com/git-game/git-game-v2):
	  a terminal game designed to test your knowledge of git commands
	  (mentioned in [Git Rev News Edition #5](https://git.github.io/rev_news/2015/07/08/edition-5/)),
	  [Learn Git Branching](https://learngitbranching.js.org/):
	  also a browser-based visual and interactive way to learn Git on the web
	  (first mentioned in [Git Rev News Edition #30](https://git.github.io/rev_news/2017/08/16/edition-30/)), and
	  [Oh My Git!](https://ohmygit.org/): an open source game about learning Git,
	  written using the Godot game engine
      (first mentioned in [Git Rev News Edition #72](https://git.github.io/rev_news/2021/02/27/edition-72/)).
+ [Git Game](https://gitgame.online/): a multiplayer card game whose rules are Git.
  Ship commits to a shared `main`. Pull before you push, blame the bugs you can't see,
  and survive `git push --force`. Free, in your browser, with nothing to sign up for.
  You can play against the bot, or in a room with your friends.
+ [Gitualize](https://gitualize.com/) is a web app to help you learn git visually.
  Every Git command is animated step by step on the same small project — so you see
  what it really does to your files, your history and your remote.
+ [The Animated Git Cheat Sheet](https://initialcommit.com/learn/git/animated-cheat-sheet)
  is a website that uses [git-sim](https://initialcommit.com/tools/git-sim)
  to build an animated Git cheat sheet you can customize,
  with just the commands you need.<br>
  Git Sim was first mentioned in [Git Rev News Edition #95](https://git.github.io/rev_news/2023/01/31/edition-95/).
+ [fremforge](https://www.frem.sh/) is an European alternative to GitHub and GitLab:
  Git hosting and CI/CD on one platform. One flat price, per seat, in EUR.
  Hosted in Germany, uses [Forgejo](https://forgejo.org/).
    + See also other software forges hosted in Europe (and advertising it):
	  [Gitoro](https://gitoro.com/) (mentioned in [Git Rev News Edition #138](https://git.github.io/rev_news/2026/08/31/edition-138/)),
	  [Pushin.eu](https://pushin.eu/) in invite-only beta and
	  [CodeFloe](https://codefloe.com/) with free functionality gated by quotas
	  (both mentioned in [Edition #139](https://git.github.io/rev_news/2026/09/30/edition-139/)).
+ [Haxy](https://try.haxy.net/haxy:haxy) is a self-hosted git forge
  that is local-first and text-based. Haxy has a text user interface (TUI)
  that you can view in your terminal or on the web.
  It stores project metadata (issues, pull requests, and discussions) in the repo,
  and provide a TUI that is served over SSH, in addition to a web UI.
  Written in Zig, under MIT license (Expat).<br>
  See also [Haxy.net is live! — HAXY (git forge) devlog](https://www.youtube.com/watch?v=89yAiqYEwKg)
  [7:31] video on YouTube.
+ [Mochi Forge](https://github.com/magland/mochiforge) is a self-hosted git forge,
  GitHub-shaped: repository browsing, in-browser editing, issues, pull requests,
  releases, Actions-style workflows, static sites, and Git LFS.
  One Node process, no database, nothing installed beside it but git.
  Written in TypeScript, under Apache 2.0 license.
+ [walgitgub](https://github.com/rgodha24/walgithub)
  is walgit with a GitHub Enterprise Server facade — a git server
  that is one binary in front of an object store (e.g., S3 or GCS bucket).
  Written in Rust, under MIT license.
+ [grubby](https://git.btxx.org/grubby/) is a static site generator for Git repos
  written in Ruby.  Under GPL 3.0 license.  This project is in an alpha state.
+ [NeoLeaf](https://neoleaf.science/) is the online collaborative LaTeX editor
  that charges you absolutely nothing.
  Unlimited real-time collaboration, native version control (Git) on GitHub or Codeberg,
  and compilation on your own machine (with WASM / _WebAssembly_),
  with no waiting queues, no artificial timeout limits, and no monthly fees.
    + Compare with [Aldine](https://aldine.dev/), a _self-hosted_,
	  open-source LaTeX collaboration platform,
	  an [Overleaf](http://overleaf.com/) alternative built for speed and simplicity
	  (mentioned in [Git Rev News #139](https://git.github.io/rev_news/2026/09/30/edition-139/)).
+ [Promptuaria](https://promptuaria.com/about) is a place
  to write, publish and reuse software specifications as Markdown.
  Each published version is immutable and has a permanent address;
  Drafts stay private to their author until published.<br>
  Promptuaria is an early public service. Expect rough edges.<br>
    + Somewhat related: [Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) (2025)
	  by Birgitta Böckeler on martinFowler\.com, a part of the
	  [Exploring Gen AI](https://martinfowler.com/articles/exploring-gen-ai.html) series.<br>
	  Beside [Kiro](https://kiro.dev/) by Amazon,
	  [Spec Kit](https://github.github.com/spec-kit/) by GitHub, and
	  [Tessl](https://tessl.io/) by Tessl AI Ltd, mentioned in this article,
	  there are now also [spec-coding](https://spec-coding.dev/) website,
	  [OpenSpec](https://openspec.dev/) framework by Fission AI,
	  [specs.md](https://specs.md/) framework by fabriqua\.ai,
	  [SpecDeck](https://specdeck.ai/) service, and probably more...
+ [memsaga](https://memsaga.grimmer.io/): version control and two-way sync
  for your AI coding agent's files, starting with Claude Code:
  what it remembers, how you configure it, and anything else you choose.
  Written in Rust, under MIT license.
+ [ADRs4AI](https://adrs.systems/) (Architectural Deliberation Records for Artificial Inteligence)
  is [the template (repository starter)](https://github.com/ADRs4AI/human-ai-collaboration-template-A),
  [a VS Code extension](https://marketplace.visualstudio.com/items?itemName=jlumbroso.adrs4ai),
  and [Awesome ADRs4AI](https://github.com/ADRs4AI/awesome-adrs4ai) list.
  The idea is to keep the thinking, the most valuable byproduct
  of the collaboration between a human and an AI.
    + But see [git reset –\-hard](https://isaacpatternproject.com/blog/posts/2026-09-24_git-reset-hard.html),
	  about restarts and learning from failure: keeping what it learned but “cleaning head”,
	  mentioned in [Git Rev News Edition #139](https://git.github.io/rev_news/2026/09/30/edition-139/).
+ [Mnemosyne](https://nabzx.github.io/mnemosyne/)
  is a version control for AI agent memory.
  Mnemosyne gives agent memory what Git gives code:
  commits, branches, merge, blame and bisect.
  Written in Rust and Python, under Apache 2.0 license.
+ [Git for Global Law](https://github.com/lexifina/global-law) by Lexifina:
  the law of every country as one git history, each country's record a submodule,
  every commit one law taking effect.
  An expansion of the same [for the the US Code](https://lexifina.com/blog/git-for-the-us-code).
  Semantic, searchable law on a global scale.
+ [Words To Data](https://www.wordstodata.com/) is a tool
  that let's you and your agents manage the The U.S. Code, the laws that change it,
  and the court opinions that cite it, as one dataset.
  `words_to_data` is a Rust command and library.
  It builds a SQLite dataset from public sources,
  and it answers questions about that dataset.
  [SLEUTH-pi](https://github.com/wordstodata/sleuth-pi) is the official agent.
  It runs in the [pi](https://github.com/earendil-works/pi) coding agent.
  Under MIT or Apache-2.0 license, at your option (dual-licensed).
+ [Crenox](https://crenoxhq.github.io/crenox/) is a statically compiled, zero-dependency
  Git pre-commit secret scanner and credentials detector written in Go, under AGPL 3.0 license.
  It automatically blocks commits of API keys, SSH private keys, cloud credentials,
  database connection strings, and other sensitive material
  before they are recorded in version control history.
  An alternative to [Gitleaks](https://gitleaks.io/) (first mentioned in [Git Rev News Edition #36](https://git.github.io/rev_news/2018/02/21/edition-36/)),
  [truffleHog](https://trufflesecurity.com/trufflehog) (first mentioned in [Edition #23](https://git.github.io/rev_news/2017/01/25/edition-23/)),
  [betterleaks](https://betterleaks.com/),
  and [git-secrets](https://github.com/awslabs/git-secrets) (first mentioned in [Edition #25](https://git.github.io/rev_news/2017/03/15/edition-25/)),
  focusing on lower resource utilization and local workflow integration.
+ [Gitby](https://gitby.dev/) is a real-time coordination layer around Git.
  It shows who is working on which file (after claiming it),
  so your team can hand files over before two people edit the same one.
  A file someone else holds is read-only in every editor, so nobody changes it by accident.
  Gitby runs in your terminal (as TUI tool) and on the website.  Supports GitHub.
  Paid service, with 3 teammates per team in a free tier.
    + Compare with [GitLive](https://git.live/) extension
	  for Visual Studio Code, JetBrain IDEs, Cursor, Windsurf, Trae, Antigravity, etc.
	  It provides preemptive merge conflict detection, 
	  with gutter indicators in the editor
	  showing the lines that have been changed on other branches,
	  while the repository view compares your branch against all others
	  without needing to fetch.<br>
	  GitLive is free for open-source projects; there is also a free plan
	  with merge conflict detection limited to the 5 most recent branches, and
	  no real-time sharing (you can share snapshots of your working tree changes),
	  as compared to premium plan.<br>
	  GitLive was first mentioned in [Git Rev News Edition #77](https://git.github.io/rev_news/2021/07/31/edition-77/) (as then a Visual Studio Code extension),
	  and then in [Edition #82](https://git.github.io/rev_news/2021/12/30/edition-82/).
+ [AngKorGit](https://angkorgit.app/) is a native Git client
  for everyday work, with support for macOS, Windows and Linux.
  The engine is libgit2 through Rust, the window is the webview (not full web browser).
  Written in TypeScript and Rust, using the [Tauri](https://v2.tauri.app/) framework, 
  under MIT license.
+ [Diffy](https://diffy.run/) is a native Git diff viewer built in Rust with GPUI Kit.
  Review live changes, keep worktrees together,
  and read GitHub pull requests without checking out a branch.
  macOS is in beta; Windows and Linux are early alphas with limited hardware testing.
  Under MIT license.<br>
  Mentioned in passing in [Git Rev News Edition #132](https://git.github.io/rev_news/2026/02/28/edition-132/).
+ [gitst](https://snoigt.com/gitst): a real-time, glanceable git status monitor for the terminal.
  Gitst shows in real-time what is happening to a git repository (local as well as remote)
  as it happens: changed files, commits, pushes, fetches, merges, and rebases.
  It typically sits in one pane of a multi-pane terminal setup
  (using tools like Dantty, tmux, screen, herdr, WezTerm, iTerm2, etc.).
  Written in Rust, under MIT license.
+ [uhegit](https://github.com/tabrejansary/uhegit) provides Git status
  for your entire workspace — see what's uncommitted, what's unpushed,
  and what task to do next across all your projects.
  Written in Rust, under MIT license.
+ [git-found](https://github.com/advaith334/git-found) is a Git [credential helper](https://git-scm.com/docs/gitcredentials)
  for people with more than one GitHub account.
  It checks which of your accounts can reach a repo and gives Git that account's token.
  Written as Bash shell script, under MIT license.
+ [gsw — Git Smart Switch](https://github.com/donghyuklee1/gsw)
  is an [fzf](https://junegunn.github.io/fzf/)-powered branch picker
  sorted by recent commits, with live log preview, remote toggle, and safe delete.
  A single Bash script, under MIT license.
+ [git-dupe](https://github.com/BrianWeiHaoMa/git-dupe) is a CLI tool
  to manage second Git repository for the files in a checkout
  that are yours and not the project's:
  notes, plans, scratch scripts, editor settings,
  the instructions and skills you keep for a coding agent.
  The files stay where their tools expect them in the working tree.
  Their history lives in a repository of their own.
  Written in Rust, under MIT license.
+ [grip](https://guilyx.github.io/grip/) is a `per-push` git hook
  that won't let you push code you can't explain.
  It quizzes you on your own diff before allowing the push.
  Works with Claude Code, Codex, Cursor.
  Written in Python, under BSD-3-Clause license.
+ pretty-git-tree is [a tool](https://github.com/hmillerbakewell/pretty-git-tree)
  and [a service](https://hmillerbakewell.github.io/pretty-git-tree/)
  (with [examples](https://hmillerbakewell.github.io/pretty-git-tree/#view=gallery))
  that turns a slice of git history into different types of diagrams:
  arches, delta, Feynman diagram (particles), qubits, etc.
  Written in TypeScript, under MIT license.
+ [Phloem](https://phloem.thales.sh/) is an on-line service
  where you can watch a repository grow like a slime mold.
  Paste a public GitHub repository (optionally providing a GitHub token),
  or upload a git log instead (with specified invocation):
  folders become junctions, files become food, and every commit feeds the network.
  [Written](https://github.com/thcp/phloem) in TypeScript, under MIT license.
+ [StateTrack](https://github.com/premtonx/statetrack) provides
  Infrastructure Change Intelligence — git history for live servers.
  A config edit, a package upgrade, a stopped IIS app pool,
  or a row flipped in `settings_db` is captured as a reviewable diff
  with an actor attached, seconds after it happens.
  Dashboard for GitDevOps.  Written in Go, under Apache 2.0 license.
+ [monolog](https://github.com/maksmas/monolog) is a keyboard-driven personal backlog
  that lives in a git repo you own — no cloud, no account, plain-text data.
  Written in Go, under MIT license.
+ [Hold My Docs (HMD)](https://hmd.sool.dev/) is a browser-based place
  to write, find and share documentation: a personal knowledge base,
  a team's internal guides or a public docs site.
  Pages are Markdown files in a Git repository,
  so you can back them up or edit them with other tools.
  Written in Go, under MIT license.


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
with help from Pablo Sabater, Okhuomon Ajayi, and XXX.
