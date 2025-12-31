---
title: Git Rev News Edition 130 (December 31st, 2025)
layout: default
date: 2025-12-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 130 (December 31st, 2025)

Welcome to the 130th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of November and December 2025.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

### Support

* [git-2.51.0: Fetching tags does not work](https://lore.kernel.org/git/CAB9xhmPcHnB2%2Bi6WeA3doAinv7RAeGs04%2Bn0fHLGToJq%3DUKUNw%40mail.gmail.com)

  Last September, David Bohman reported a regression in Git 2.51.0
  where `git fetch --tags` failed to update tags in a bare
  repository. He noted that the command output indicated tags would be
  updated, but they were not actually added to the
  repository. Reverting to version 2.50.1 resolved the issue.

  Junio Hamano, the Git maintainer, attempted to reproduce the issue
  using a simple bare clone setup but was unsuccessful, suggesting
  that David needed to narrow down the specific conditions.

  In early November, David returned to the thread reporting that the
  issue persisted in Git 2.51.2. He provided a specific reproduction
  case involving a bare clone of the [`bind9` source repository](https://gitlab.isc.org/isc-projects/bind9).
  The output showed that one
  tag update was rejected (with a `would clobber existing tag` error),
  and consequently, all other valid new tags (`v9.18.41`, etc.)
  failed to appear in the repository, despite being listed as "new
  tag" in the output. The command exited with status code 1.

  Randall S. Becker suggested using `git fetch --tags --force` to
  clear the situation. David Bohman replied that while he could
  reproduce it locally, the key behavioral change was that prior to
  version 2.51, Git would fail regarding the conflicting tag but still insert the
  non-conflicting ones.

  Chris Torek identified the new reference transaction system
  introduced in recent versions as the root cause. He noted that the
  behavior had shifted to "all or nothing" (either all tags get
  updated, or none do) and questioned which behavior was actually
  buggy. David Bohman argued that this was a risky change for a mature
  tool and noted that the diagnostic messages were misleading because
  they reported success for tags that were not actually inserted.

  Karthik Nayak confirmed he could reproduce the issue and attributed
  it to transaction reference updates.

  Karthik submitted
  [version 1](https://lore.kernel.org/git/20251103-fix-tags-not-fetching-v1-1-e63caeb6c113%40gmail.com)
  of a patch to fix the issue. He explained that commit `0e358de64a`
  (fetch: use batched reference updates, 2025-05-19) introduced
  batched reference updates for `git fetch`. When fetching references,
  updates are added to a transaction. However, specifically when
  fetching tags, if a conflict occurs, the function
  `fetch_and_consume_refs()` returns an error code immediately. This
  caused the code to jump to the cleanup section, skipping the commit
  of the transaction entirely, and thus discarding even valid updates.

  The proposed fix involved extracting the transaction commit logic
  into a new function, `commit_ref_transaction()`, and ensuring it is
  called even when an error code is returned, provided the fetch is
  not atomic.

  Eric Sunshine reviewed the patch, asking why the test code was
  wrapped in subshells and suggesting that `!` should be replaced with
  `test_must_fail`. Karthik agreed to these changes.

  Justin Tobler reviewed the code, agreeing with the logic. He
  suggested adding a comment to `commit_ref_transaction()` to
  distinguish it from `ref_transaction_commit()` and asked if the
  return value of this new function should be checked.

  Karthik submitted
  [version 2](https://lore.kernel.org/git/20251106-fix-tags-not-fetching-v2-1-610cb4b0e7c8%40gmail.com)
  of the patch. This version added comments, removed subshells from
  tests, and extended the fix to the `backfill_tags()` function.

  Patrick Steinhardt reviewed version 2. He questioned the commit
  message's mention of the deprecated "branches/" format in relation
  to tag backfilling. Karthik replied, clarifying that after
  re-reading the code, he understood that backfilling happens when the
  user does not specify `--tags` or `--no-tags`, confirming Patrick's
  understanding.

  Patrick noted that the code now had three different call sites
  committing the transaction and felt it was "somewhat fragile."
  Justin pointed out that the return code of
  `commit_ref_transaction()` was being ignored in the new
  implementation. Karthik agreed to check the return value.

  Karthik submitted
  [version 3](https://lore.kernel.org/git/20251108-fix-tags-not-fetching-v3-0-a12ab6c4daef%40gmail.com)
  of the series. He split the changes into two commits: one for
  extracting the logic and one for the fix. He also moved the commit
  logic into the cleanup section to avoid calling it at every failure
  point.

  Patrick reviewed version 3. He suggested using `goto out` in
  `commit_ref_transaction()` for better readability. He also asked for
  clarification on why the condition `retcode > 0` was safe in the
  cleanup section, specifically regarding `prune_refs()`. Karthik
  replied, explaining that `prune_refs()` creates its own internal
  transaction, but later realized he was mistaken about the timing and
  promised to verify.

  Karthik submitted
  [version 4](https://lore.kernel.org/git/20251111-fix-tags-not-fetching-v4-0-185d836ec62a%40gmail.com).
  This version simplified the code and changed the check from
  `retcode > 0` to just `retcode`.

  Patrick pointed out that the commit message regarding `prune_refs()`
  behavior change seemed incorrect because no transaction exists at
  that stage. Karthik verified this and confirmed there is no change
  for `prune_refs()`.

  Karthik submitted
  [version 5](https://lore.kernel.org/git/20251113-fix-tags-not-fetching-v5-0-371ea7ec638d%40gmail.com)
  with corrected commit messages and better test cleanup.

  Junio reviewed version 5 and identified a remaining
  issue. He noted that while the patch fixed the transaction commit,
  jumping to the cleanup label early meant that subsequent operations
  (specifically `commit_fetch_head()`, `set_upstream()`, and setting
  remote HEADs) were still being skipped when errors occurred. He
  argued that in non-atomic fetches, these should still run. Karthik
  agreed and proposed a fix to only jump to cleanup if `--atomic` was
  used.

  Karthik submitted
  [version 6](https://lore.kernel.org/git/20251118-fix-tags-not-fetching-v6-0-2a2f15fc137e%40gmail.com),
  adding a third commit to the series to address the skipped
  operations regression identified by Junio.

  Junio reviewed version 6. He liked the tests but warned
  against using `touch` to create files due to timestamp issues and
  noted a missing test case for `--set-upstream` on a successful
  fetch. Karthik agreed to fix these.

  Karthik submitted
  [version 7](https://lore.kernel.org/git/20251119-fix-tags-not-fetching-v7-0-0c8f9fb1f287%40gmail.com),
  removing `touch` and adjusting the test prerequisites.

  Eric reviewed the tests in version 7, asking if `! test -f` should
  be `test_path_is_missing`. Junio suggested using `rm -f FETCH_HEAD`
  before the test to ensure it is actually created during the run, and
  inspecting the file content to verify what was recorded. Karthik
  agreed.

  Karthik submitted
  [version 8](https://lore.kernel.org/git/20251121-fix-tags-not-fetching-v8-0-23b53a8a8334%40gmail.com).
  This version verified the content of `FETCH_HEAD` and used
  `test_path_is_missing`.

  Junio commented that the series looked good. Patrick pointed out a
  tiny grammar nit ("eventhough") and asked if the shell syntax
  `>file` used in the test was compatible with all systems, noting
  `: >file` is more typical. Karthik replied that existing tests use
  the shorter syntax, so it should be fine.

  The small patch series was eventually merged, and should be part of
  Git 2.53.0 that should be released at the latest towards the
  beginning of February 2026. With this version, not only the transaction logic
  will be fixed, but related regressions regarding post-fetch
  operations (like updating `FETCH_HEAD`) will also have been
  identified and resolved.


## Developer Spotlight: Lucas Seiki Oshiro

* **Who are you and what do you do?**

  My name is Lucas Oshiro, I'm one of the three
  GSoC '25 participants working on Git. I'm from São Paulo, Brazil,
  and I hold bachelor and master degrees in Computer Science from the
  [University of São Paulo](https://www5.usp.br/#english). I don't
  have only one specific interest in programming topics, I enjoy
  several different topics, like lower-lever C code (like we do for Git),
  FP languages (especially Haskell), play with network simulators, data
  analysis, operating systems, databases and so on.

* **How did you initially become interested in contributing to Git,
  and what motivated you to choose it as your GSoC project?**

  Well, it's a long story... I think that it dates back to 2017, in a
  Computer Networks assignment at my university. My partner in that
  assignment was [Matheus Tavares](https://matheustavares.gitlab.io/posts/gsoc-final-report),
  who participated in [GSoC '19 on Git](https://summerofcode.withgoogle.com/archive/2019/projects/4787791739748352).
  At the time, we needed to study a vulnerability and how it was fixed.
  We chose [CVE-2017-1000117](https://nvd.nist.gov/vuln/detail/cve-2017-1000117),
  which was a vulnerability in Git. That was my first time reading Git
  source code.

  Two years later, I was a member of a [group focused on contributing to Free/Open-Source software](https://flusp.ime.usp.br)
  at my University. I sent a patch to Git at the time, but I needed to
  focus on other stuff and I couldn't finish it.

  After that, I started to work as a back-end software engineer and
  witnessed several Git-related problems. My two previous experiences with
  Git's source code made me want to understand what was happening and
  delving into its internals, so I could help other developers from my
  company when something unexpected happened with Git.

  This way, Git always felt like the right choice.

* **How do you feel your contribution has impacted the Git community
  or the broader open source ecosystem?**

  My GSoC project was to create the new command [`git repo info`](https://summerofcode.withgoogle.com/archive/2025/projects/fGgMYHwl)).
  It was released in Git 2.52.0 and, like many other new Git features, I
  expect it will take some time to be widely adopted, since it's only
  available in bleeding-edge repositories. But I expect that it will be
  useful for forges, CIs, local tools, scripts, and other tools that
  depend on Git.

* **Is there any aspect of Git that you now see differently after
  having contributed to it?**

  I can't think of anything that I see differently after GSoC, but my
  previous contacts with Git's source code made me realize the importance
  of having a good commit history with good commit messages. It also made
  me understand how powerful Git is as a debugging and searching tool.

* **How do you balance your contributions with other responsibilities
  like work or school?**

  This year, I was more focused on finishing my master's research and I
  didn't have too many conflicts with GSoC, so I could focus on my
  master's when my patches were under review. However, I must admit that
  one of the reasons that I didn't apply to GSoC before was that, here
  in Brazil, we typically have final exams in June, which makes it hard
  to balance them with something else.

* **Can you share how GSoC helped enhance your technical and
  non-technical skills (like communication, project management,
  etc.)?**

  I see Git as a product created by developers, for developers, and I
  think that here we sometimes need to do the work that in other contexts
  would be done by product owners and designers. I felt that especially
  during code reviews, which were often more focused on product and design
  decisions rather than the code itself. I had to learn how to discuss
  these kinds of decisions, always aiming to do what is best for Git
  and its users.

* **What was the biggest challenge you faced during your contributions
  to Git, and how did you overcome it?**

  I think that the biggest challenge was the complete redesign of
  `git repo info` during the GSoC period, which made me re-write it from
  scratch several times. I think this was a consequence of my previous
  answer and that this challenge was solved itself.

* **Have you thought about mentoring new GSoC / Outreachy students?**

  Yes, it would be very nice!

* **If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?**

  Git is amazing and I think we all agree that it makes the programmers'
  lives easier. It would be great if we had a GUI wrapping Git but
  targeting non-technical users.

* **If you could remove something from Git without worrying about
  backwards compatibility, what would it be?**

  Perhaps commands that accumulate responsibilities, like `git checkout`,
  `git reset` and `git rev-parse`. They make sense from the Git
  perspective, but I think they are confusing from the users'
  perspective.

* **What upcoming features or changes in Git are you particularly
  excited about?**

  Some that come to my mind are:

  - Patrick Steinhardt's new [`git history`](https://lore.kernel.org/git/20250819-b4-pks-history-builtin-v1-0-9b77c32688fe@pks.im/)
    command: rewriting history is essential to keep the repository sane
    and useful as a data storage, if done correctly. Currently we do that
    through interactive rebase but I think it can be intimidating for less
    experienced users. Jujutsu proposes a more straightforward way to do
    that, and it's nice to see Patrick bringing it to Git.

  - Justin Tobler's [new `git repo structure` command](https://public-inbox.org/git/20251217175404.37963-1-jltobler@gmail.com/):
    of course I'm interested in this subcommand since it is the sibling of
    my GSoC project.  But it's not only because of that: a Git repository is
    a very rich source of information and `git repo structure` will be a
    powerful tool to retrieve it.

  - Julia Evans's [contributions to documentation](https://public-inbox.org/git/?q=f%3A%22Julia+Evans%22&r=):
    Julia has been producing high-quality content about several programming
    topics for years. I'm happy to see Git being documented by someone so
    committed to spreading knowledge and who knows how to explain advanced
    concepts using a simple language.

* **What is your favorite Git-related tool/library, outside of Git
  itself?**

  I use [delta](https://github.com/dandavison/delta) a lot, I like the way
  it highlights diffs. Other tools that I find interesting are [Jujutsu](https://docs.jj-vcs.dev/latest/)
  and [Magit](https://magit.vc/), but I don't use them too much.

* **What is your toolbox for interacting with the mailing list and for
  development of Git?**

  I like desktop mail clients, but I don't have a strong preference. On
  Linux, I use Thunderbird. On Mac, I use Apple Mail. I also have some
  GMail filters for classifying the messages (patches, What's Cooking and
  Rev News announcements).

  However, those mail clients don't have code syntax highlighting, and it's
  hard to read the patches inside them. For that purpose, I use
  [patch-hub](https://github.com/kworkflow/patch-hub), a TUI for reviewing
  patches from kernel mailing lists (including Git).

* **How do you envision your own involvement with Git or other open
  source projects in the future?**

  There are some things I want to finish in `git repo info`, and I
  still send patches for it. I enjoyed contributing to Git and I
  don't want to stop here.

  Outside Git development, I'll give an advanced course on Git next
  month. It will be a great opportunity to share what I've learned here
  with other people.

* **What is your advice for people who want to start Git development?
  Where and how should they start?**

  Read the [Git Internals chapter from Pro Git](https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain),
  follow everything described in [Hacking Git](https://git.github.io/Hacking-Git/),
  and work on a [microproject](https://git.github.io/SoC-2025-Microprojects/).

* **Would you recommend other students or contributors to participate
  in the GSoC, Outreachy or other mentoring programs, working on Git?
  Why? Do you have advice for them?**

  Yes. I mean, I've already recommended some people from my university to
  apply to GSoC or Outreachy on Git and gave some tips to them. Some of
  them have already sent patches that were accepted.


## Other News

__Various__


__Light reading__

<!---
__Easy watching__
-->

__Git tools and sites__


## Releases

+ libgit2 [1.9.2](https://github.com/libgit2/libgit2/releases/tag/v1.9.2)
+ GitHub Enterprise [3.19.0](https://docs.github.com/enterprise-server@3.19/admin/release-notes#3.19.0),
[3.18.3](https://docs.github.com/enterprise-server@3.18/admin/release-notes#3.18.3),
[3.17.9](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.9),
[3.16.12](https://docs.github.com/enterprise-server@3.16/admin/release-notes#3.16.12),
[3.15.16](https://docs.github.com/enterprise-server@3.15/admin/release-notes#3.15.16),
[3.14.21](https://docs.github.com/enterprise-server@3.14/admin/release-notes#3.14.21),
[3.18.2](https://docs.github.com/enterprise-server@3.18/admin/release-notes#3.18.2),
[3.17.8](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.8),
[3.16.11](https://docs.github.com/enterprise-server@3.16/admin/release-notes#3.16.11),
[3.15.15](https://docs.github.com/enterprise-server@3.15/admin/release-notes#3.15.15),
[3.14.20](https://docs.github.com/enterprise-server@3.14/admin/release-notes#3.14.20)
+ GitLab [18.7](https://about.gitlab.com/releases/2025/12/18/gitlab-18-7-released/),
[18.6.2, 18.5.4, 18.4.6](https://about.gitlab.com/releases/2025/12/10/patch-release-gitlab-18-6-2-released/)
+ GitKraken [11.7.0](https://help.gitkraken.com/gitkraken-desktop/current/)
+ Sourcetree [4.2.15](https://product-downloads.atlassian.com/software/sourcetree/ReleaseNotes/Sourcetree_4.2.15.html)
+ Garden [2.4.0](https://github.com/garden-rs/garden/releases/tag/v2.4.0)
+ GitButler [0.18.3](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.18.3),
[0.18.2](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.18.2)
+ Sublime Merge [Build 2121](https://www.sublimemerge.com/download)
+ Kinetic Merge [1.13.2](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.13.2),
[1.13.1](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.13.1),
[1.13.0](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.13.0),
[1.12.2](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.12.2),
[1.12.1](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.12.1),
[1.12.0](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.12.0)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
