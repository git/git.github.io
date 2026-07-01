---
title: Git Rev News Edition 136 (June 30th, 2026)
layout: default
date: 2026-06-30 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 136 (June 30th, 2026)

Welcome to the 136th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](https://git.github.io).

This edition covers what happened during the months of May and June 2026.

## Discussions

<!---
### General
-->


### Reviews

+ [[PATCH 0/3] Batch prefetching](https://lore.kernel.org/git/pull.2089.git.1776379694.gitgitgadget@gmail.com)

  Elijah Newren sent a 3 patch series to improve the performance of a
  couple of commands in [partial clones](https://git-scm.com/docs/partial-clone).
  The work was spurred by a real-world report where `git cherry` jobs were each
  doing hundreds of single-blob fetches, at a cost of around 3 seconds
  each, so that batching those downloads should dramatically speed up
  such jobs. As Elijah put it, he "decided to fix up git grep
  similarly while at it". The series also corrected a small
  documentation typo he had noticed in `patch-ids.h` (a missing
  trailing parenthesis in a comment), as a preparatory fixup.

  For readers unfamiliar with the trade-off, partial clones let users
  avoid downloading blobs upfront, at the expense of needing to
  download them later as they run other commands. That trade-off can
  sometimes be more painful than expected: when the needed blobs are
  discovered one at a time as they are accessed, each one triggers a
  separate network round-trip. Some commands like `checkout`, `diff`,
  and `merge` already mitigate this by doing batch prefetches of the
  blobs they will need, which dramatically reduces the cost of
  on-demand loading. The aim of this series was to extend that ability
  to two more commands, `git cherry` and `git grep`.

  The interesting part for `git cherry` is how to figure out,
  *without* fetching anything yet, which blobs will eventually be
  needed. As Elijah explained, `git cherry` works in two phases: it
  first computes header-only patch IDs (based on file paths and
  modes), and only falls back to full content-based IDs when the
  header-only IDs collide. Those full IDs are what require reading
  blob content, and the comparison is driven by a hashmap whose
  comparison function, `patch_id_neq()`, is exactly what triggers the
  on-demand fetches. To enumerate the colliding blobs ahead of time,
  the patch temporarily swaps the hashmap's comparison function for a
  trivial `always_match()` function, walks the entries that would
  collide to collect their blob OIDs into an `oidset`, restores the
  original comparison function, and then fetches everything in a
  single batch via `promisor_remote_get_direct()`. A helper,
  `collect_diff_blob_oids()`, lists the blob OIDs touched by a
  commit's diff. It leaves out files that are explicitly marked as
  binary in the userdiff configuration, because for those files
  patch-ID just hashes the OID with `oid_to_hex()` instead of
  reading the blob, so there is no point downloading it.

  While git cherry relies on hashmap comparisons, the `git grep` patch
  takes an analogous but simpler approach: it adds a preliminary walk
  over the tree (similar to `grep_tree()`) that collects the blobs of
  interest and prefetches them in one go.

  Junio Hamano, the Git maintainer, took a first look and immediately
  spotted something that did not belong: the series added a 210-line
  `investigations/cherry-prefetch-design-spec.md` file to the
  project. He pointed out that, as a document describing how
  `git cherry` works, "it is vastly lacking", that much of its content
  is the sort of material that would normally go in a commit message,
  and that he was "not sure how others would benefit from being able
  to read it" once the series landed. Elijah's reply was short and to
  the point: "Ugh, no, sorry." That stray file had been committed by
  mistake.

  Elijah quickly sent [version 2](https://lore.kernel.org/git/pull.2089.v2.git.1776472347.gitgitgadget@gmail.com),
  whose only change compared to v1 was to remove that stray file,
  noting it was "So embarrassing that I didn't catch that before
  submitting."

  Phillip Wood reviewed v2 and made an interesting connection:
  `git rebase` without `--reapply-cherry-picks` suffers from the same
  problem, since it does the equivalent of `git log --cherry-pick`. He
  asked whether `prefetch_cherry_blobs()` could be shared with the
  cherry-pick detection in `revision.c`. Elijah agreed the connection
  was correct, explaining that `git rebase` (without
  `--reapply-cherry-picks`) and `git log --cherry-pick` both go
  through `cherry_pick_list()` in `revision.c`, which has the same
  shape as the loop in `cmd_cherry()` and triggers fetches from the
  same `patch_id_neq()` callback. He even sketched what sharing the
  code would look like.

  However, he preferred to leave that out of the current series,
  expressing reservations about expanding partial-clone support
  further into this area: `git cherry`, `git log --cherry-pick`, and
  the default cherry-pick detection in `git rebase` all exist to
  answer "has this patch already landed upstream?", a question that,
  in repositories large enough to need partial clones, he felt "is
  rarely worth the cost of computing patch-ids across arbitrary
  amounts of history." His honest guidance for users on a large
  repository would be to pass `--reapply-cherry-picks` (with rebase)
  and skip the detection entirely, or to narrow the range under
  consideration. He noted that the omission of a
  `--no-reapply-cherry-picks` option in `git replay` had been a
  deliberate choice rather than an oversight. He had only implemented
  the `git cherry` fix because of a specific customer whose tooling
  had already baked in the operation, and prefetching at least made
  the worst case tolerable. He added that he would happily review a
  patch from anyone wanting to carry the shared code forward.

  Phillip continued the exchange with several good questions, asking
  whether patch IDs are computed for every upstream commit or just the
  ones modifying the same paths, and remarking that it "is a shame
  that we don't have a config setting for `--reapply-cherry-picks` as
  it is easy to forget to pass that option" (a setting made awkward
  because the apply backend does not support that option). He was also
  "a bit surprised customers aren't complaining about tools that use
  `git rebase` being slow."

  Elijah replied that determining which upstream commits modify the
  same paths still requires walking the upstream commits and doing a
  tree-diff for each, and that in the biggest repositories "even a
  merge-base operation can start to feel expensive." On the surprise
  about rebase, he answered "Are you sure they aren't complaining?",
  explaining that the merging parts of a rebase already do batch
  prefetching, but the cherry-pick-detection part does not. He also
  noted that the customer in question was using `git replay` rather
  than `git rebase`, probably because early versions of `git replay`
  lacked the drop-commits-that-become-empty logic that Phillip later
  added (he thanked Phillip again for that), and that the prefetch
  patch lets things stay fast even if they keep their `git cherry`
  calls.

  Derrick Stolee then reviewed v2, reading both the `git cherry` and
  `git grep` patches together. He worried that
  `collect_diff_blob_oids()` being "hidden in builtin/log.c may not be
  the right long-term home", anticipating more and more cases where
  Git would want to prefetch blobs, and wondered whether the logic
  could take advantage of, or live alongside, the existing
  `diff_queued_diff_prefetch()` within `diffcore_std()` in
  `diff.c`. He framed the `git cherry` patch as caring about a diff
  and the `git grep` patch as caring about a "scan prep", suggesting
  `git archive` as a closer analog for the latter than `checkout`. He
  was careful to add that he did not mean to complicate the series and
  was "most interested in having this logic be more reusable in the
  future without needing to move code across files."

  Junio, seeing that Stolee's two review messages had gone unanswered
  for a while, asked whether he should keep the patches in his tree
  "hoping that responses may come some day", and said he would mark
  the topic as expecting review responses in the draft "What's
  cooking" report for the time being. Elijah apologized for the delay,
  explaining he had been pulled into firefighting and remediation
  duties after a number of incidents at work, and suggested marking
  the series as expecting a re-roll since Stolee had asked for an
  additional test.

  Elijah then answered Stolee's reusability question in detail. He
  read the patch differently: `collect_diff_blob_oids()` already leans
  on the diff library at the per-commit level (`diff_tree_oid()` plus
  `diffcore_std()`), and the real value of the series lives *above*
  the diff library, in the accumulation across many commits.

  Concretely, the motivating case was a patch touching a few files
  where upstream had tens of thousands of commits in the relevant
  range, several hundred of which modified the same set of files: a
  per-diff prefetch like `diff.c` uses would turn that into hundreds
  of small fetches, "what this series gives you is one fetch." He
  pointed out two further `git cherry`-specific filters that he felt
  did not belong in the diff library: most commits are skipped before
  patch-ID is even computed (so prefetching for them would be wasted),
  and content for binary files is skipped because patch-ID uses
  `oid_to_hex()` for them. To check Stolee's idea concretely, he
  reviewed all of the existing `promisor_remote_get_direct()` call
  sites and concluded that none of them shared the "diff two trees and
  harvest OIDs" shape, so there was no natural shared layer above the
  `promisor_remote_get_direct()` primitive itself. He agreed
  `git archive` would be the closest analog if it ever grew prefetch
  logic, and proposed factoring out a tree-walk helper only when a
  second caller actually wanted one.

  For the `git grep` patch, Stolee asked for a test that exercises a
  pathspec filter, with files like `matches.txt`, `nomatch.txt`, and
  `matches.md`, so that `git grep -c "needle" HEAD -- *.txt` would
  download only the matching subset. This turned out to be more
  valuable than a simple test improvement: Elijah replied "Yes,
  absolutely", and discovered that while he was handling pathspecs
  correctly, he was unconditionally requesting whatever objects
  matched the pathspecs even when those blobs were already present
  locally. He promised to send a fix along with the updated test.

  That fix arrived in [version 3](https://lore.kernel.org/git/pull.2089.v3.git.1778775928.gitgitgadget@gmail.com),
  which made three changes compared to v2:

  - the final patch's test case was updated, as Stolee had suggested,
    to exercise a pathspec,

  - the last two patches were modified to avoid re-downloading blobs
    already present locally (checking with
    `odb_read_object_info_extended()` and `OBJECT_INFO_FOR_PREFETCH`
    on the `git cherry` side, and `odb_has_object()` on the `git grep`
    side), with the tests adjusted to verify it, and

  - a new first patch was inserted documenting the filtering contract
    of `promisor_remote_get_direct()`.

  That documentation patch explains that the function does not filter
  out OIDs already present locally on its happy path, so callers are
  responsible for filtering and deduplicating themselves. Elijah
  candidly noted in the commit message that he "missed this originally
  and wrote two problematic callers". He also mentioned that he had
  not pursued Stolee's code-sharing suggestion, since it appeared to
  be based on a misunderstanding that the `git cherry` patch was about
  a diff.

  Stolee reviewed v3 and declared it "good to go", graciously adding
  that Elijah's detailed responses in the v2 thread "helped me
  understand that my thought was misguided" and gave him "extra
  confidence" in the approach. Junio agreed the series was "in a good
  shape" and marked the topic for the `next` branch. Elijah thanked
  Stolee one more time, noting that the comments on the `git grep`
  patch in particular "led me to what would have been a rather
  annoying bug", so calling out the test improvement had been time
  well spent.

  In the end, the series was merged into the `master` branch and is part
  of the recent v2.55.0 release. A concrete customer pain point led to
  extending Git's existing batch-prefetching habit to two more
  commands, `git cherry` and `git grep`, as well as a bug fix and
  improved documentation. The thread also clarified the boundaries of
  partial-clone friendliness for cherry-pick detection, leaving the
  door open for sharing the new code with `git rebase` and
  `git log --cherry-pick` should someone wish to carry that work
  forward.

<!---
### Support
-->

<!---
## Developer Spotlight:
-->

## Other News

__Various__


__Light reading__
+ [Signing is for the bad days](https://nesbitt.io/2026/05/24/signing-is-for-the-bad-days.html)
  by Andrew Nesbitt on his blog, about tools for supply-chain security:
  [TUF (The Update Framework)](https://theupdateframework.io/) - which protects
  the last hop, from the repository to the machine doing the install
  (mentioned in passing in [Git Rev News Edition #104](https://git.github.io/rev_news/2023/10/31/edition-104/));
  [in-toto](https://in-toto.io/) - which protects the build pipeline; and
  [Sigstore](https://www.sigstore.dev/) - which allows to remove long-lived keys
  and for the developer to authenticate with <abbr title="OpenID Connect">OIDC</abbr>
  identity you already have, GitHub Actions or Google, etc.,
  where [Fulcio](https://github.com/sigstore/fulcio) issues
  a short-lived code-signing certificate bound to that OIDC identity valid for ten minutes,
  and the signature and cert go into [Sigstore Rekor](https://github.com/sigstore/rekor),
  a public append-only transparency log
  (Sigstore was first mentioned in [Git Rev News Edition #91](https://git.github.io/rev_news/2022/09/30/edition-91/)
  and Sigstore Rector in [Edition #111](https://git.github.io/rev_news/2024/05/31/edition-111/)).
+ [gittuf - a signed log for git refs](https://nesbitt.io/2026/06/04/gittuf-a-signed-log-for-git-refs.html)
  by Andrew Nesbitt on his blog
  ([gittuf](https://gittuf.dev/) was mentioned in
  [Git Rev News Edition #104](https://git.github.io/rev_news/2023/10/31/edition-104/) and
  in [Edition #111](https://git.github.io/rev_news/2024/05/31/edition-111/)).
    + See also [Securing Git repositories with gittuf](https://lwn.net/Articles/972467/)
      article by by Joe Brockmeier on LWN\.net, a report of a talk at OSSNA; video of the talk:
      [Securing Git Repositories with Gittuf - Aditya Sirish A Yelgundhalli & Billy Lynch](https://www.youtube.com/watch?v=eCSeIEdMbCw).
      Mentioned in [Git Rev News Edition #111](https://git.github.io/rev_news/2024/05/31/edition-111/)
+ [Git Worktree - Practical workflow with a central bare repo](https://nakatechlabs.com/blog/2025/git-worktree/)
  by Aito Nakajima on NakaTechLabs.
+ [Git Worktrees with Bare Repos: A Clean Setup for Modern Development](https://medium.com/@miladpw/git-worktrees-with-bare-repos-a-clean-setup-for-modern-development-c5b251ee7b73)
  by Milad on his Medium-hosted blog.
+ [Git Worktrees Step-By-Step](https://infrequently.org/2021/07/worktrees-step-by-step/)
  by Alex Russel on his Infrequently Noted blog (2011).


__Scientific papers__
+ Santiago Torres-Arias, Anil Kumar Ammula, Reza Curtmola, Justin Cappos:
  _"[On Omitting Commits and Committing Omissions: Preventing Git Metadata Tampering That (Re)introduces Software Vulnerabilities](https://www.usenix.org/conference/usenixsecurity16/technical-sessions/presentation/torres-arias)"_
  presented at 25th USENIX Security Symposium,
  August 10-12, 2016, in Austin, Texas, USA:<br>
  [paper](https://www.usenix.org/system/files/conference/usenixsecurity16/sec16_paper_torres-arias.pdf)
  (with [errata](https://www.usenix.org/system/files/conference/usenixsecurity16/sec16_errata2.pdf)),
  [slides](https://www.usenix.org/sites/default/files/conference/protected-files/security16_slides_torres-arias.pdf),
  [video](https://www.youtube.com/watch?v=FVvVoLcj_A0).
+ Aditya Sirish A Yelgundhalli, Patrick Zielinski, Reza Curtmola, Justin Cappos:
  _"[Rethinking Trust in Forge-Based Git Security](https://www.ndss-symposium.org/ndss-paper/rethinking-trust-in-forge-based-git-security/)"_
  presented at The Network and Distributed System Security (NDSS) Symposium,
  February 23-27, 2026, in San Diego, California, USA.
  [DOI:10.14722/ndss.2025.241008](https://dx.doi.org/10.14722/ndss.2025.241008)<br>
  [paper](https://www.ndss-symposium.org/wp-content/uploads/2025-1008-paper.pdf),
  [slides](https://www.ndss-symposium.org/wp-content/uploads/9D-f1008-yelgundhalli.pdf),
  [video](https://youtu.be/FA1gEAKJAR0).


__Easy watching__
+ [Worktrees missing piece](https://www.youtube.com/watch?v=99v51wRl7zE):
  Learn how to create bare repos, and why they're being used with worktrees.
  YouTube video on The Modern Coder channel [5:14].
    + The video author had created [LearnGit.io](https://learngit.io/),
      focusing on how Git actually works, free for students.
      This site was first mentioned in [Git Rev News Edition #127](https://git.github.io/rev_news/2025/09/30/edition-127/).


__Git tools and sites__
+ [Worktrunk](https://worktrunk.dev/) is a CLI for git worktree management,
  designed for running AI agents in parallel.
  [Written](https://github.com/max-sixty/worktrunk) in Rust,
  dual-licensed under MIT and Apache-2.0 license.


## Releases

+ Git [2.55.0-rc2](https://lore.kernel.org/git/xmqqv7b9mcfx.fsf@gitster.g/),
[2.55.0-rc1](https://lore.kernel.org/git/xmqqik7hw0ie.fsf@gitster.g/),
[2.55.0-rc0](https://lore.kernel.org/git/xmqqik7pqeiq.fsf@gitster.g/)
+ Git for Windows [v2.55.0-rc2(1)](https://github.com/git-for-windows/git/releases/tag/v2.55.0-rc2.windows.1),
[v2.55.0-rc1(1)](https://github.com/git-for-windows/git/releases/tag/v2.55.0-rc1.windows.1),
[v2.55.0-rc0(1)](https://github.com/git-for-windows/git/releases/tag/v2.55.0-rc0.windows.1)
+ gitoxide [0.55.0](https://github.com/GitoxideLabs/gitoxide/releases/tag/v0.55.0)
+ JGit [7.7.0](https://github.com/eclipse-jgit/jgit/releases/tag/v7.7.0.202606012155-r)
+ Gitea [1.26.4](https://github.com/go-gitea/gitea/releases/tag/v1.26.4),
[1.26.3](https://github.com/go-gitea/gitea/releases/tag/v1.26.3)
+ Gerrit Code Review [3.12.8](https://www.gerritcodereview.com/3.12.html#3128),
[3.13.7](https://www.gerritcodereview.com/3.13.html#3137),
[3.14.1](https://www.gerritcodereview.com/3.14.html#3141)
+ GitHub Enterprise [3.21.1](https://docs.github.com/enterprise-server@3.21/admin/release-notes#3.21.1),
[3.21.0](https://docs.github.com/enterprise-server@3.21/admin/release-notes#3.21.0)
+ GitLab [19.2](https://docs.gitlab.com/releases/19/gitlab-19-2-released/),
[19.1](https://docs.gitlab.com/releases/19/gitlab-19-1-released/),
[19.1.1, 19.0.3, 18.11.6](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-1-1-released/),
[19.0.2, 18.11.5, 18.10.8](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-0-2-released/)
+ GitKraken [12.2.1](https://help.gitkraken.com/gitkraken-desktop/current/),
[12.2.0](https://help.gitkraken.com/gitkraken-desktop/current/)
+ GitHub Desktop [3.6.1](https://desktop.github.com/release-notes/),
[3.6.0](https://desktop.github.com/release-notes/),
[3.5.12](https://desktop.github.com/release-notes/)
+ tig [2.6.1](https://github.com/jonas/tig/releases/tag/tig-2.6.1)
+ lazygit [0.62.2](https://github.com/jesseduffield/lazygit/releases/tag/v0.62.2),
[0.62.1](https://github.com/jesseduffield/lazygit/releases/tag/v0.62.1)
+ GitButler [0.20.4](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.20.4),
[0.20.3](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.20.3)
+ Kinetic Merge [1.15.0](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.15.0)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Toon Claes and Paulo Gomes.
