---
title: Git Rev News Edition 135 (May 31st, 2026)
layout: default
date: 2026-05-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 135 (May 31st, 2026)

Welcome to the 135th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](https://git.github.io).

This edition covers what happened during the months of April and May 2026.

## Discussions

### General

* [[GSoC] Welcoming our 2026 contributors and thanking our applicants](https://lore.kernel.org/git/CA+ARAto8ZLSu3oFS1QaOqc++Dm+Wb35EqeBo6JUJ5jVG4MZNbg@mail.gmail.com/)

  The Git project was accepted in the
  [Google Summer of Code (GSoC)](https://summerofcode.withgoogle.com/)
  this year again, and 4 applicants were
  [selected](https://summerofcode.withgoogle.com/programs/2026/organizations/git):

  - K Jayatheerth will work on
    [the "Improve the new git repo command" project](https://summerofcode.withgoogle.com/programs/2026/projects/O1nF3zMT)
    mentored by Lucas Oshiro and Justin Tobler.

  - Pablo Sabater will work on
    [the "Complete and extend the remote-object-info command for git cat-file" project](https://summerofcode.withgoogle.com/programs/2026/projects/752yzmwm)
    mentored by Chandra Pratap and Karthik Nayak.

  - Siddharth Shrimali will work on
    [the "Improve Disk Space Recovery for Partial Clones" project](https://summerofcode.withgoogle.com/programs/2026/projects/hs14IFAn)
    mentored by Christian Couder and Siddharth Asthana.

  - Tian Yuchen will work on
    [the "Refactoring in order to reduce Git’s global state" project](https://summerofcode.withgoogle.com/programs/2026/projects/Lx1PmL4k)
    mentored by Ayush Chandekar, Christian Couder and Olamide Caleb Bello

  Congratulations to them, and thanks a lot to all the applicants who
  worked on Git and submitted proposals!

<!---
### Reviews
-->

### Support

+ [MIDX woes, was Re: [ANNOUNCE] Git v2.54.0-rc2](https://lore.kernel.org/git/8c1def10-9039-aecd-4ce4-fb4676b47e9b@gmx.de)

  Shortly after the `v2.54.0-rc2` release candidate was announced,
  Johannes Schindelin, the Git for Windows maintainer who is usually
  called Dscho, wrote a follow-up to the announcement, retitled "MIDX
  woes", to report an unpleasant discovery: fetching with
  `v2.54.0-rc2` into an existing repository made that repository
  unusable for Git `v2.53.0`, which would now bail out with:

  ```
  fatal: multi-pack-index version 2 not recognized
  ```

  Dscho asked whether `v2.54.0-rc2` was forcefully writing a brand-new
  MIDX version that the immediately preceding release could not even
  read. He pointed out that, if so, this would cause "substantial
  problems" in setups where libgit2 or JGit is used interchangeably
  with Git, when users need to downgrade Git, or when several Git
  versions live side by side on the same system, for instance through
  GitHub Desktop, which bundles its own copy of Git.

  The multi-pack-index (MIDX) is an on-disk file at
  `.git/objects/pack/multi-pack-index` (and possibly chained files)
  that indexes objects across several pack files at once. It is meant
  to be a purely optional acceleration layer: when present and
  readable, lookups can avoid scanning each pack's own `.idx` index
  file; when absent or unreadable, Git is supposed to fall back to the
  underlying `.idx` files. Several high-impact features (auto
  maintenance, `git multi-pack-index`, reachability bitmaps, geometric
  repack, etc.)  build on top of it, and modern Git distributions
  write or update it as part of routine operations, including the
  maintenance step that runs after a `git fetch`.

  The "version 2 not recognized" error came from `b2ec8e90c2` (`midx:
  do not require packs to be sorted in lexicographic order`,
  2026-02-24).  That commit relaxed an internal ordering constraint
  and, because the relaxation makes the on-disk file unreadable by
  other tools that still expect the older invariant, guarded the new
  behaviour behind a bump in the MIDX on-disk format version (from v1
  to v2). The commit message explicitly justified the bump by claiming
  that "older versions of Git know how to gracefully degrade and
  ignore any MIDX(s) they consider corrupt". As the discussion would
  reveal, this assumption turned out to be too optimistic.

  Junio Hamano, the Git maintainer, picked up the thread and pointed
  directly at `b2ec8e90c2` as the likely culprit. Reading the commit
  message back to itself, he observed that the format-version bump
  "seems to be doing more harm to 'older versions of Git' that 'know
  how to gracefully degrade' by not allowing them to degrade", and he
  asked Taylor Blau (the author of the MIDX v2 work and the area's
  principal maintainer) whether the release notes should at least
  carry recovery instructions, such as `rm -f .git/objects/pack/*.midx`.

  Jeff King, alias Peff, replied within hours with a deeper
  diagnosis. The MIDX *should* be optional, he wrote. If loading the
  file returns an error, callers should silently fall back to the
  regular `.idx` files, but that property is not actually held by the
  load path, which contains a few `die()` calls instead. He
  demonstrated by applying a small patch on top of v2.53.0 that
  replaces the two relevant `die()` calls in
  `load_multi_pack_index_one()` (one for the signature mismatch, one
  for the unknown version) with `error()` plus a `goto cleanup_fail`,
  producing the desired behaviour: the user sees `version 2 not
  recognized` printed once and then everything works anyway. "But of
  course we can't go back in time now to fix it (and earlier
  versions)", he noted.

  Peff also surveyed the third-party implementations Dscho had worried
  about:

    - JGit, on inspection of its source, throws an exception that is
      apparently caught and handled correctly (he verified with the
      `jgit` CLI on hand).
    - libgit2 returns from a helper called `midx_error()` when the
      signature or version do not match. Reading the code, Peff
      believed it would quietly fall back to the underlying packs.

  His conclusion: "it really is just our old versions that are the
  problem".

  He then asked the natural follow-up question: how hard would it be
  to revert the default written MIDX version back to v1? In a second
  message a few minutes later he answered himself with a
  near-one-liner in `midx-write.c` changing the default initializer of
  `write_midx_context.version` from `MIDX_VERSION_V2` to
  `MIDX_VERSION_V1`, plus minor adjustments to the test suite: in
  `t/t5319-multi-pack-index.sh`, the expected header would once again
  say "header: ... 1 ..." rather than "header: ... 2 ..."; and in
  `t/t5335-compact-multi-pack-index.sh`, since MIDX compaction
  *requires* the v2 format, the test would now opt back into v2
  explicitly via `git config --global midx.version 2`. Peff observed
  that an existing `midx.version` config knob lets users opt into v2
  manually, and he left the strategic decision to Taylor.

  Derrick Stolee underlined the part of Dscho's report that he
  considered most striking: the bad file is written automatically as
  part of normal maintenance after a fetch, so removing the broken
  MIDX by hand "will not keep the repo in a good state". The next
  fetch will simply regenerate it. He agreed that a graceful fallback
  (with a visible warning) belongs in Git too, and that the immediate
  fix should be to stop writing v2 by default so that a 2.53/2.54
  mixed deployment stops poisoning the repository at every fetch.

  Junio, after asking Derrick to clarify the "good state" sentence (he
  initially read it as "the MIDX is no longer optional"), eventually
  agreed: defaulting back to v1 *and* leaving the more thorough
  graceful-degradation work for later was the right split for the
  remaining rc window. In a later round of the same sub-thread,
  Derrick clarified that what he had meant was that the deletion was
  not a *durable* fix on its own. The maintenance step would keep
  regenerating the v2 file unless the default version was also lowered
  (or `midx.version` set to `1`).

  Taylor Blau then weighed in, apologetic about the "trouble here", and
  laid out a clean three-step plan for the project:

    1. **Immediate (before 2.54)**: revert the default MIDX format to
       V1, so a 2.54.0 release does not regress the case where multiple
       Git versions are used against the same repository.
    2. **Medium term (after 2.54)**: implement the graceful-degradation
       idea Peff sketched in `load_multi_pack_index_one()`, so that
       unknown versions cause Git to ignore the MIDX instead of dying.
       This won't help current 2.53 and earlier users, but it would
       make a future flip from V1 to V2 by default truly painless from
       2.55 onward.
    3. **Long term (2.56 or later)**: make V2 the default once enough
       versions in the field can already cope with it.

  Peff acknowledged the plan, only adding a caveat: two releases may
  be "not very long, especially for people who are using OS packages",
  e.g. people moving across Debian stable releases. But that could be
  sorted out later.

  To make sure something concrete was in the rc, Junio took Peff's
  near-one-liner, polished the commit message, and proposed
  [a first version](https://lore.kernel.org/git/xmqq8qam217m.fsf_-_@gitster.g)
  titled "MIDX: keep the default version to MIDX v1" (later renamed
  "MIDX: revert the default version to v1"). The patch simply
  initialised `write_midx_context.version` to `MIDX_VERSION_V1`, fixed
  up the expected on-disk header in `t/t5319-multi-pack-index.sh`, and
  opted `t/t5335-compact-multi-pack-index.sh` into V2 explicitly via
  `git config --global midx.version 2` so the compaction tests
  continued to exercise the new format.

  In parallel, Junio also floated
  [a second patch](https://lore.kernel.org/git/xmqqh5pa22h0.fsf@gitster.g)
  that would have weakened the two `die()` calls in
  `load_multi_pack_index_one()` to `error()` + `goto cleanup_fail`,
  implementing Peff's earlier suggestion. He himself was unsure about
  that one, though, observing that doing so during the rc period would
  effectively promise that the MIDX is forever an optional component,
  and that the error messages should at least be reworded to make
  clear that they mean "we are ignoring this corrupt file" rather than
  "this is a fatal corruption". After a follow-up exchange with Peff
  about how dense the rest of `load_multi_pack_index_one()` is with
  `die()` calls (Peff confessed he had not actually looked past the
  two lines he had touched, and Junio confessed he had not either
  until he had to reply), they agreed that the right fix is *at the
  caller side*. The loader function genuinely is reporting "this MIDX
  is broken", and it is the caller's responsibility to decide whether
  to continue without it. The reword-and-soften idea was put aside as
  "an issue for much later".

  Peff replied to Junio's first patch with a small but elegant
  counter-proposal: rather than defaulting to V1 *always* (which would
  force users of the new `git multi-pack-index compact` feature to set
  `midx.version=2` manually), make `write_midx_internal()` pick V1 by
  default but switch to V2 automatically when the caller has set the
  `MIDX_WRITE_COMPACT` flag. Concretely, in
  [his refined version of the patch](https://lore.kernel.org/git/20260416200659.GB1887222@coredump.intra.peff.net),
  he removed the V2 initialiser from the `write_midx_context`
  declaration, and inserted the following just below, and just above
  the existing
  `repo_config_get_int(ctx.repo, "midx.version", &ctx.version)`
  lookup that lets a user override the choice:

  ```
  ctx.version = opts->flags & MIDX_WRITE_COMPACT ?
          MIDX_VERSION_V2 :
          MIDX_VERSION_V1;
  ```

  The companion documentation update in
  `Documentation/git-multi-pack-index.adoc` adds a single sentence to
  the `compact::` description noting that compaction "requires writing
  a version-2 midx that cannot be read by versions of Git prior to
  v2.54", and the only test fallout is in
  `t/t5319-multi-pack-index.sh`, where the expected header version
  flips back from `2` to `1`. Notably,
  `t/t5335-compact-multi-pack-index.sh` needs no change. Compaction
  continues to "just work" because the new auto-select picks V2 for
  it.

  Peff also confessed there are probably some gaps in V2 testing in
  `t5319` left behind by this flip (the bulk of those tests now
  exercise V1 again), but argued that filling them in could be done
  post-release.

  Junio said he had already merged the original "revert" version into
  his `jch` and `next` integration branches, but had not pushed `next`
  out for external testing yet, so he chucked the original and applied
  this version instead, agreeing that "compact is the only thing that
  needs v2" was a better workaround.

  The only remaining nit was stylistic: Junio preferred writing the
  ternary as

  ```
  ctx.version = ((opts->flags & MIDX_WRITE_COMPACT)
                 ? MIDX_VERSION_V2
                 : MIDX_VERSION_V1);
  ```

  so that the extra parentheses make the precedence of `&` vs `?:`
  obvious, and so that a multi-line ternary is easier to spot when `?`
  and `:` are aligned at the start of the line. Peff replied that he
  liked keeping the `?` at the end of the first line, because then it
  is clear from the first line alone that it is a conditional rather
  than a direct assignment, but said he did not strongly care and that
  Junio could mark it up while applying. By the time Peff fetched
  `next` to send that reply, Junio had already done exactly that.

  Taylor reviewed Peff's refined patch in parallel: he acked the
  short- and medium-term plan ("sorry again for the mess here"),
  suggested a small wording tweak ("Git 2.53 and earlier" rather than
  "Git 2.53" in the log message), and noted that he found the
  "auto-select V2 only when the feature requires it" behaviour a
  little "magical", though "less magical and more 'do the sensible
  thing by default'" once you remember that anyone running compaction
  already knows the trade-offs. Peff agreed about the wording but
  noted that the patch had already been pushed to `next`. They also
  exchanged a short note about extending the V2-specific coverage in
  `t5319` going forward, which Peff suggested Taylor could pick up
  post-2.54.

  The next day, Junio
  [announced an update to `master`](https://lore.kernel.org/git/xmqq5x5py5ql.fsf@gitster.g),
  containing Peff's "MIDX: revert the default version to v1", along
  with a batch of documentation typo and grammar fixes from Elijah
  Newren and a CodeQL CI bump from Dscho. He also announced that 2.54
  final would be tagged on Monday, April 20th, and that he would be
  offline for a week or two afterwards. Elijah replied to flag a
  separate pair of bugs (NULL pointer dereference and read past end of
  string in the diffstat code path) that had just come up in
  [a separate thread](https://lore.kernel.org/git/pull.2093.git.1776443163041.gitgitgadget@gmail.com/),
  in case Junio wanted to consider squeezing the fix into the release
  or holding it for 2.54.1.

  The story of v2.54 thus closed with a near-miss compatibility break
  caught before release, fixed in a way that keeps the new
  infrastructure available to those who actually need it, and
  documented for everyone who will read the release notes later.

## Developer Spotlight: Matthias Aßhauer

* **Who are you and what do you do?**

  I'm Matthias, a software developer from Germany. I work on Git for Windows
  and occasionally other adjacent projects in my spare time. On Git for Windows,
  I mostly do small contributions in various auxillary repos, maintenance
  related tasks, code review and issue triage.

* **What would you name your most important contribution to Git?**

  I'd say early support of Jean-Noël Avila's translations of the man pages
  is what's probably most widely useful. Most of the things I do are helpful
  to niche uses or fix small bugs, but the man pages are widely used by
  most git users and I love that [git-scm.com](https://git-scm.com/docs/git) can
  offer a nice little language dropdown for them nowadays. I should try to
  find some time to continue that work.

* **What are you doing on the Git project these days, and why?**

  In my [last patch series](https://lore.kernel.org/git/pull.2081.v2.git.1775454330.gitgitgadget@gmail.com/),
  I promised a follow up patch that improves CPU core detection on
  multi-socket-systems on Windows. I need to send that to the mailing list.
  I probably also have some other Windows improvements in Git for Windows
  that I should upstream to git.git.

* **If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?**

  I don't have a big project idea for a decently sized team of the top of
  my head. That said there are a lot of currently ongoing topics that could
  use helping hands. I think `SHA256`<->`SHA1` interop could use some
  helping hands. The new [`git history`](https://git-scm.com/docs/git-history)
  command has a lot of potential and could use a team. We also have a few
  cross-platform portability issues that could do with some very tedious
  cleanup work throughout large parts of the code base.

* **If you could remove something from Git without worrying about
  backwards compatibility, what would it be?**

  The file based refs backend and related filesystem based design choices
  where constraints and quirks of various filesystems hold back things
  that aren't inherently required to stick to those constraints.

* **What is your favorite Git-related tool/library, outside of Git itself?**

  My most used are probably [Sourcetree](https://www.atlassian.com/software/sourcetree)
  and [public inbox](https://public-inbox.org/git/). I mostly use Sourcetree
  for pretty basic stuff (committing, fetching, merging, pulling, pushing)
  and drop into the command line for slightly more advanced things
  (fixup commits, interactive rebase, bisect, `add -p`). One neat thing about
  it is that it allows me to easily stage individual lines instead of just
  hunks like `add -p`.

  I find public inbox ([the software behind](https://github.com/nojb/public-inbox)
  [lore.kernel.org](https://lore.kernel.org/git/)] just clicks a lot nicer
  with me than most other mailing list archive software.

  I also like [`git filter-repo`](https://github.com/newren/git-filter-repo),
  but am quite happy that I rarely need to use it.

* **Do you happen to have any memorable experience w.r.t. contributing to
  the Git project? If yes, could you share it with us?**

  In general, I have fond memories of the contributor summits I've attended
  (both remotely and in person). Putting some faces to the names and talking
  in real time with people you usually only interact with by email is a
  genuine pleasure.

* **What is your toolbox for interacting with the mailing list and for
  development of Git?**

  It's a mess. I used to mostly write and test most of my patches on Linux,
  but currently write most of my patches on Windows, test build them in the
  Git for Windows SDK and then submit them using [GitGitGadget](https://gitgitgadget.github.io/).
  Since my mail provider recently stopped delivering the mailing list traffic
  to my inbox, I tend to read the mailing list on lore.kernel.org, download
  mails as mbox files and reply to them using [alpine](https://alpineapp.email/).
  I have looked at [korgalore](https://korgalore.docs.kernel.org/en/latest/) as
  a way to get the mailing list back into my inbox, but haven't gotten around
  to testing it yet.

* **What is your advice for people who want to start Git development?
  Where and how should they start?**

  Start with something small and try to scratch your own itch. Find something
  about Git that you feel could be improved. (An example in my case could be
  adding a single line mode to `add -p`)

  Take a look at the mailing list archives and the history of the files in
  question for some insights into why that thing you want to improve might
  be the way it currently is.

  Feel free to ask people for help on the mailing list, on [the discord](https://git-scm.com/community#discord)
  or [in IRC](https://git-scm.com/community#irc). Most people are happy to
  help out a beginner, but it might be easy to miss that a patch submitter
  on the mailing list is less familiar with the code base.

* **If there's one tip you would like to share with other Git developers,
  what would it be?**

  Most of them are more experienced with git development than I am. They could
  probably give me better advice than I could offer them.


## Other News

__Various__


__Light reading__

<!---
__Easy watching__
-->

__Git tools and sites__


## Releases

# Releases

+ libgit2 [1.9.4](https://github.com/libgit2/libgit2/releases/tag/v1.9.4),
[1.9.3](https://github.com/libgit2/libgit2/releases/tag/v1.9.3)
+ go-git [6.0.0-alpha.4](https://github.com/go-git/go-git/releases/tag/v6.0.0-alpha.4),
[6.0.0-alpha.3](https://github.com/go-git/go-git/releases/tag/v6.0.0-alpha.3)
+ gitoxide [0.54.0](https://github.com/GitoxideLabs/gitoxide/releases/tag/v0.54.0)
+ GitLab [19.1](https://docs.gitlab.com/releases/19/gitlab-19-1-released/),
[19.0](https://docs.gitlab.com/releases/19/gitlab-19-0-released/),
[19.0.1, 18.11.4, 18.10.7](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-0-1-released/),
[18.11.3, 18.10.6, 18.9.7](https://docs.gitlab.com/releases/patches/patch-release-gitlab-18-11-3-released/)
+ Gitea [1.26.2](https://github.com/go-gitea/gitea/releases/tag/v1.26.2)
+ Bitbucket Data Center [10.3](https://confluence.atlassian.com/bitbucketserver/release-notes-872139866.html)
+ Gerrit Code Review [3.14.0-rc6](https://www.gerritcodereview.com/3.14.html#3140),
[3.14.0](https://www.gerritcodereview.com/3.14.html#3140)
+ GitHub Enterprise [3.20.3](https://docs.github.com/enterprise-server@3.20/admin/release-notes#3.20.3),
[3.19.7](https://docs.github.com/enterprise-server@3.19/admin/release-notes#3.19.7),
[3.18.10](https://docs.github.com/enterprise-server@3.18/admin/release-notes#3.18.10),
[3.17.16](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.16),
[3.16.19](https://docs.github.com/enterprise-server@3.16/admin/release-notes#3.16.19),
[3.21.0](https://docs.github.com/enterprise-server@3.21/admin/release-notes#3.21.0),
[3.20.2](https://docs.github.com/enterprise-server@3.20/admin/release-notes#3.20.2),
[3.19.6](https://docs.github.com/enterprise-server@3.19/admin/release-notes#3.19.6),
[3.18.9](https://docs.github.com/enterprise-server@3.18/admin/release-notes#3.18.9),
[3.17.15](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.15),
[3.16.18](https://docs.github.com/enterprise-server@3.16/admin/release-notes#3.16.18)
+ GitKraken [12.1.2](https://help.gitkraken.com/gitkraken-desktop/current/),
[12.1.1](https://help.gitkraken.com/gitkraken-desktop/current/),
[12.1.0](https://help.gitkraken.com/gitkraken-desktop/current/)
+ GitHub Desktop [3.5.11](https://desktop.github.com/release-notes/),
[3.5.10](https://desktop.github.com/release-notes/),
[3.5.9](https://desktop.github.com/release-notes/)
+ lazygit [0.62.1](https://github.com/jesseduffield/lazygit/releases/tag/v0.62.1),
[0.62.0](https://github.com/jesseduffield/lazygit/releases/tag/v0.62.0)
+ GitButler [0.19.13](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.19.13),
[0.19.12](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.19.12)
+ Kinetic Merge [1.15.0](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.15.0)
+ git-branchless [0.11.1](https://github.com/arxanas/git-branchless/releases/tag/v0.11.1),
[0.11.0](https://github.com/arxanas/git-branchless/releases/tag/v0.11.0)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
