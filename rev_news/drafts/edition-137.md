---
title: Git Rev News Edition 137 (July 31st, 2026)
layout: default
date: 2026-07-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 137 (July 31st, 2026)

Welcome to the 137th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](https://git.github.io).

This edition covers what happened during the months of June and July 2026.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

### Support

+ [git-diff in a worktree is an order of magnitude slower?](https://lore.kernel.org/git/CALnO6CADMJSixqYvL1Yo8qKX5rWhKQ+2OoSEuPUh-yoeK9TseQ@mail.gmail.com)

D. Ben Knoble reported what he described as "a serious performance
bug": `git diff --no-ext-diff --quiet` ran about 10 times slower in a
secondary worktree than in the main worktree. He came prepared, with a
reproduction recipe using `git worktree add --detach` on Git's own
repository and `hyperfine` timings showing 3.4ms in the main worktree
against 223.3ms in the linked one. He noted that `--no-ext-diff` and
`--quiet` were probably red herrings, since plain `git diff` was
affected too, while `--cached` was not. He had seen the same thing at
work, where a large repository took about 6ms in one case and about
650ms in the other, and he had noticed it because his Bash prompt runs
`git diff --no-ext-diff --quiet`, making the prompt sluggish in
worktrees.

Ben had also gathered profiling data. `perf report` showed the fast
case spending most of its time in `preload_thread()`,
`threaded_has_symlink_leading_path()` and `lstat_cache()`, while the
slow case spent much more time in `ie_match_stat()`,
`ce_modified_check_fs()`, `ce_compare_data()` and `index_fd()`. `perf
stat` showed the slow case executing roughly 150 times as many
instructions, 3.8 billion against 23 million. He asked whether the
problem was already known and how he could help narrow it down, and
mentioned he had reproduced it as far back as v2.50.0.

### Racy Git, in brief

To understand where this went, it helps to know how Git decides
whether a working tree file has been modified. Rather than reading and
hashing every file, Git stores the result of `lstat(2)` for each path
in the index (size, mtime, inode and so on) and compares that cached
stat information against a fresh `lstat(2)`. If they match, the file
is assumed unchanged and its contents are never read. This is what
makes `git diff` and `git status` fast.

The problem, described in `Documentation/technical/racy-git.adoc`, is
that a file can be modified so quickly after being recorded that its
mtime does not change, leaving the cached stat information matching a
file whose contents differ. Git guards against this by treating any
index entry whose mtime is not strictly older than the index file's
own mtime as "racily clean", and falling back to reading and hashing
the contents of those entries. That fallback is exactly the expensive
path Ben's profile was showing.

### One second of bad luck

Jeff King replied to Ben the same evening with a surprise: on his
machine the effect was *reversed*, with the worktree being 9.43 times
**faster** than the original clone of linux.git. Comparing profiles
with `perf diff` showed the slow side spending its time computing
SHA-1s, which implied stat-dirty entries, and running
`git -C linux update-index --refresh` made both cases take about
20ms. Peff's diagnosis was that this was a racy Git problem: many
files are written in the same second as the index, so they share its
mtime and Git must err on the side of checking their contents. "So it
is not really about worktrees at all, but just 'bad luck' in
generating that initial index (that goes away next time you actually
make an index update that rewrites the whole thing)." He suggested Ben
try building with `USE_NSEC`, betting it would make the problem
disappear entirely. He also gently pointed out that `git shortlog -ns`
is nicer than the pipeline Ben had used to find likely reviewers.

Ben confirmed that `update-index --refresh` fixed his timings too, and
wondered whether `git diff` should refresh the index itself, or
whether creating a worktree should do the equivalent. He also noticed
that the Meson build automatically sets `USE_ST_TIMESPEC` or `NO_NSEC`
but offers no way to turn on `USE_NSEC`, and offered to write that
patch.

Peff replied that `git diff` *does* refresh the index internally,
"that's what takes so long!", and that he had expected the result to
be written back out. He also explained why refreshing right after `git
worktree add` would not help: the trouble is that the index has just
been written, so it *should* be entirely up to date, but some entries
share its timestamp.  What makes an explicit `update-index --refresh`
work is simply that a second has elapsed in between. Run automatically
from the worktree command, it might all still happen within the same
second. And, he noted, this is not specific to worktrees at all: any
checkout can hit it, though initial clones and worktree creation write
the most files. On the build knob, he clarified that `NO_NSEC` is
about whether the nanosecond fields of `struct stat` exist at all,
whereas Git only uses them for stat comparison when `USE_NSEC` is
set. He traced that distinction to c06ff4908b (Record ns-timestamps if
possible, but do not use it without USE_NSEC, 2009-03-04) and mused
that it "ought to be a run-time config, though, and maybe even
something that gets auto-probed by `git init`".

Junio Hamano, the Git maintainer, replied that he had thought about
auto-probing and could not find a clean way to detect whether a
filesystem loses the nanosecond part of `st_mtime` when "metadata is
flushed and later read back in" without unreasonable cost: "I do not
think we want to trigger system-wide sync and/or dropping of buffer
cache ;-)". brian m. carlson suggested a middle ground: let `git
update-index` take options for this the way it already does for
`--untracked-cache`, so that users who know their platform is safe (he
gave Linux with btrfs as his own example) can opt in at runtime,
possibly with a `--test-use-nsec` mode that inspects `uname` and
`statfs` for known-good configurations.

### A conditional that looked dead

Ben came back to the thread a while later having followed Peff's
pointer to `git status`. He found that `cmd_status()` calls
`refresh_index()` and `repo_updated_index_if_able()`, and that the
same pair is wrapped in `refresh_index_quietly()` in `builtin/diff.c`,
but that the call there is guarded by a condition that, on his system,
never fired. The guard dates to aecbf914c4 (git-diff: resurrect the
traditional empty "diff --git" behaviour, 2007-08-31), and Ben's
reading of it was that the double negation of a boolean could never
exceed 1, so he asked: "So… has that conditional been quietly dead all
this time? I can't imagine that's right, but…". He also confirmed that
adding `USE_NSEC` to his build did make the problem go away, and said
he would send the Meson patch anyway "for folks to have the knob",
although it now felt like a band-aid to him.

Junio explained what the guard actually means. The `skip_stat_unmatch`
member of the diff options is not a boolean but a 1-based counter: it is
initialised to 1 when auto-refresh-index is enabled, which is what causes
`diffcore_std()` to call `diffcore_skip_stat_unmatch()` at all, and that
function then increments it once for every path that appeared in the diff
only because it was stat-dirty without an actual content change. So
comparing it against 1 asks "did we find any such ghost changes?", and on
Ben's system the answer was simply no. Junio added that he had initially
suspected "an embarrassing thinko" himself, and that whether such a
dual-purpose counter is a good idea is another matter: "Apparently it
confused both of us in this case ;-)". He followed up with a pointer to
[the 2007 discussion](https://lore.kernel.org/git/20070830063810.GD16312@mellanox.co.il/)
in which that patch was written.

Peff replied that this was the core of the issue, and added the missing
piece: the racily-clean entries *are* dirty in the sense that their mtimes
match the index mtime, so Git double-checks their contents. But
`diffcore_skip_stat_unmatch()` does not count them, so the counter stays
at 1, `git diff` never writes out a refreshed index, "and thus every
subsequent diff repeats the same expensive double-check." He was unsure
where the blame lay: either `diffcore_skip_stat_unmatch()` should count
them, or the index should mark them differently by truncating their cached
size to zero, as the racy-git document describes. Though he noted the
latter would be user-visible, since plumbing like `git diff-files`, which
does not update the index, would then report a spurious diff. To Junio's
remark about the confusing counter he added: "Make that three of us. ;)"

In a follow-up to himself, Peff observed that `diffcore` does not even have
the information it would need, because the racy handling is hidden inside
`ie_match_stat()`, which returns only "changed" flags and so cannot
distinguish "stat matched and the timestamp was not racy" from "the
timestamp was racy, we compared contents, and found nothing". He posted an
experimental patch passing a `DIFF_RACY_IS_MODIFIED` flag down from
`builtin_diff_files()` so those entries are counted as stat-dirty while
still being suppressed from the output. It worked, in that `git diff` then
refreshed the index, but the timings were odd: in a linux.git working tree
with many racy entries the first diff went from about 500ms (repeated
forever) to 1800ms, and about 30ms thereafter. He could account for a
doubling from the from-scratch index refresh, but not the remaining 800ms,
guessing that `diff_filespec_check_stat_unmatch()` is somehow slower than
`ce_modified_check_fs()`. His overall verdict: "This feels like a case we
could do a bit better at, but I wonder how much it matters in practice. As
soon as you do any index-refresh (including `git status`), the racy entries
are cleared and everything is faster. It just seems kind of lame that we
write out the initial working tree with so many racy entries."

### Could nanoseconds just make the problem go away?

Junio picked up that last point with a suggestion: the reason Git does
not simply wait before writing the index is that stalling for a full
second was unacceptable back when sub-second resolution was not used
anywhere, but "with nanosecond resolution timestamps in place, we
could delay writing the index file by 50 milliseconds, nobody notices
the delay, and raciness would go away, perhaps?"

Peff agreed that would require comparing index and file mtimes at
nanosecond precision, and then made a sharper observation: once you
are comparing nanoseconds, no delay is needed at all. Writing out all
of linux.git takes roughly five seconds, so about 20% of the files
share the index's one-second timestamp. With nanosecond resolution,
that collision rate should drop by around a billion, and even an
unlucky single file would not matter. Better still, the comparison
code already exists in `is_racy_stat()`. It is just gated on
`USE_NSEC`. He showed a small patch removing the `#ifdef` (with a
debugging `warning()` thrown in) that made the problem disappear,
while wondering aloud whether he was overlooking whatever concern made
`USE_NSEC` conditional in the first place. Junio's reply to that was
simply "That's cute."

Junio then articulated the concern. Because the nanosecond part can be
lost when an inode is evicted from the kernel's cache and re-read, a
file and the index could be written within the same millisecond and be
distinguishable at nanosecond resolution. But if only one of the two
loses its sub-second component, the comparison can come out the wrong
way. Peff worked through this carefully and conceded the point: the
index does not store its own mtime, so it is `fstat()`ed fresh at read
time and may show a truncated value, which happens to fail in the safe
direction (the index looks older, so a file looks possibly racy and
gets checked). But he could not rule out truncation in the other
direction, which would require the tracked file to be written, evicted
and re-read all within the same second that the index is written,
while the index inode itself is never evicted.  It's "unlikely but not
impossible". His conclusion: "it's all sufficiently scary that I think
it should stay conditional on `USE_NSEC`", while suspecting `USE_NSEC`
is in fact safe on Linux these days.

Separately, Junio proposed a cleaner alternative to Peff's
flag-passing patch: since `ie_match_stat()` already has access to the
index state, it could set a bit in `struct index_state`, next to
`updated_workdir` and friends, whenever a racy timestamp sends it down
the compare-data path, and the auto-refresh decision could then
consult that bit. Peff thought that "sounds fairly clean", though he
preferred the nanosecond route if it pans out. Junio also wondered, as
a tangent, why `refresh_index_quietly()` is called from the central
code path in `cmd_diff()` at all, since it should not matter when
comparing two tree objects. Peff suggested it could probably move into
`builtin_diff_files()`, and noted that `git diff` does not honour
`--no-optional-locks`, which is currently respected only by `git
status`. When that latter option was added, the idea was that people
would extend it to other commands as they hit the need, and apparently
nobody has for `git diff`.

### Where it stands

Ben closed out the thread saying he would like to dig further but was not
sure when he would find the time, being "deep in the guts of 2 systems
whose implementation are quite foreign to me — the index and the diff
machinery". He restated his own priority as a user: he is happy to pay for
a slow first prompt if subsequent ones are fast, rather than having to
remember and explain to colleagues that "oh, this is racy git, just run
`git status` to fix it". He identified the two remaining avenues as (1) the
cost of that refreshing diff and (2) limiting racy entries on the initial
index write, understanding the latter to have been settled in favour of
keeping the `USE_NSEC` gate, and pointing readers to the separate Meson
thread discussed below for that part of the story. On the former he noted
that the discussion of how to communicate the necessary bits to the diff
code had not come with updated measurements, and that turning Junio's
suggestions into code would take him some time.

### The build knob that turned into a design question

The one patch that came directly out of this thread was Ben's
[Meson build knob](https://lore.kernel.org/git/c4c5ade901ff95b0f95939ea818870e4f3d59da1.1781971201.git.ben.knoble+github@gmail.com),
sent under the title "meson: wire up USE_NSEC build knob", which observed
that "autotools-style builds permit enabling `USE_NSEC` for cases where
that's desired; the equivalent knob is missing from meson-based builds". It
added a `nanosec` option to `meson_options.txt` and passed `-DUSE_NSEC`
accordingly, so six lines in total, and deliberately no change of defaults.

Junio welcomed it as "a welcome addition to the other side of the world",
while wondering whether `meson setup -Dnanosec=true` was easy to discover,
and said he would queue it. Ben agreed the name was up for debate, and
Patrick Steinhardt reassured them both that Meson options are easy enough
to discover by running `meson setup` in the source directory.

Peff called the patch reasonable, since it only brings Meson to parity with
the Makefile, but reiterated that he was "not still not sure if turning on
`USE_NSEC` is a good idea", quoting the passage of
`Documentation/technical/racy-git.adoc` that explains why: in-core
timestamps can have finer granularity than on-disk ones, so an evicted
inode can come back with a different mtime. That was fixed in Linux 2.6.11,
but only for filesystems with exactly 1ns or 1s resolution, leaving CEPH,
CIFS, NTFS and UDF broken. He called it "the most succinct description of
the problem I've seen", while having "no idea how widely it still applies".

Patrick took that further, and this is where the topic began to shift:
if the mechanism is still subtly broken, "it might even make sense to
remove the build option completely. It doesn't really make sense in my
opinion to have a build option that nobody uses and that is subtly
broken when enabled." Rather than speculate, Peff went and
measured. He proposed a test: `touch` a file, record `ls --full-time`,
drop the kernel caches via `/proc/sys/vm/drop_caches`, and look
again. He then reported that ext4, a loopback ext2 mount and even vfat
all survived it, the last because Linux limits the cached VFS response
to what the underlying filesystem can represent. "So...maybe this is
just a non-issue these days, at least on Linux?" He followed up having
found an [old thread](https://public-inbox.org/git/5605D88A.20104%40gmail.com/)
indicating CEPH, CIFS, NTFS, UFS and FUSE were fixed in kernel 4.3,
tested CIFS himself successfully, and noted with amusement that "FAT
systems were fixed since 2015. ;)". He raised one further subtlety:
implementations with different resolutions, such as JGit using
millisecond APIs, interoperate correctly only as long as each compares
consistently in its own resolution. And a millisecond-resolution
index read by a `USE_NSEC` Git would look entirely stat-dirty, a
performance rather than correctness problem that "nobody may have
noticed, because probably hardly anybody bothers to build with
`USE_NSEC` now." Ben later contributed his own data point, reporting
nanosecond precision surviving a dropped cache on XFS.

brian m. carlson argued for going further still: provide a config knob
and build with `USE_NSEC` by default, since most people are on Linux
with filesystems now known to be fine, with an easy escape hatch and a
possible `statfs`-based check later. Patrick reached a similar place
from the opposite direction. He thought that if correctness depends on
the filesystem, a *build* option is too coarse-grained, because "a
distro wouldn't really be able to ever enable the option, unless it
knew that repositories will only ever exist on a filesystem that
works", and suggested treating it like `core.ignoreCase`: compile
nanosecond support in unconditionally where the platform supports it,
and let users opt in at runtime, ideally with `git init` setting it
automatically.

Junio pushed back partially, noting that build options are not only
for distro packagers aiming at the widest audience, and drawing a
careful distinction: `core.ignoreCase` *must* be set for correct
operation on a case-insensitive filesystem and is "not something you
set by choice", whereas nanosecond timestamps need not be enabled even
where they work perfectly, and must be disabled where precision is
randomly lost. Peff agreed with the general direction anyway saying
"it should be a config flag and not a build option. Run-time flags are
more friendly to users when there is no good reason to avoid them"
while pointing out that auto-detection founders on the need to flush
the kernel's inode cache, which is neither portable nor something to
inflict on every repository creation, and that he had been unable to
make the failure reproduce at all on modern Linux.

Ben, apologising for a delay caused by not watching "What's cooking",
offered to "noodle in that direction" toward a runtime flag, while noting
it means considerably more surgery than exposing the Meson option and that
he was unsure how to write a test for it. He also observed, half-joking,
that the logical conclusion of the discussion would otherwise be to remove
the option from the Makefile too. Patrick replied that no detection
mechanism was strictly needed to start with: keep the current default,
compile nanosecond support in where available, and add a config opt-in.
Peff agreed that "even if we eventually auto-detect, the first step is
adding the config at all", and said he was agnostic about adding
`USE_NSEC` to Meson in the meantime, leaning towards removing it from the
Makefile entirely once a runtime config exists.

At that point Junio drew the conclusion for the topic as a whole:
"the discussion tells me that if we were to pursue this topic further, it
would not primarily be about adding the build knob to meson.build file, but
rather a bit more involved to affect the product for everybody regardless
of the build framework used. So I think it is safe for me
[discard this topic from my tree](https://lore.kernel.org/git/xmqqa4rx9mb5.fsf@gitster.g)
for now, with an invitation to resurrect it as a topic with shifted focus."
Ben [confirmed](https://lore.kernel.org/git/45F2C180-1DE1-4371-869B-BF605B64E01A@gmail.com)
he had been meaning to send a "please discard" message himself "per the new
guidelines ;) been on vacation."

The `dk/meson-enable-use-nsec-build` topic accordingly travelled through
"Waiting for response(s) to review comment(s)" and "Expecting a reroll" to
"Will discard" in the July "What's cooking" reports, and was listed as
"Discarded" in
[What's cooking in git.git (Jul 2026, #08)](https://lore.kernel.org/git/xmqqa4rnpgfk.fsf@gitster.g).
It never reached `next` or `master`, and no successor topic implementing
the runtime configuration has appeared on the list so far.

### Conclusion

No code has landed from either thread, and the one patch that was sent
ended up discarded. Yet both discussions were productive. A report
framed as a worktree performance bug turned out to have nothing to do
with worktrees: it is racy Git, triggered by any operation that writes
many files and then an index within the same second, which is why
fresh clones and new worktrees are the usual victims. Along the way
the participants established that `git diff` refreshes the index but
then throws the work away, because the racily-clean entries it
double-checked are never counted as stat-dirty and so the refreshed
index is never written back, which is why the cost repeats on every
invocation until something else, such as `git status` or
`git update-index --refresh`, rewrites the index. Two concrete designs
were sketched for fixing that: counting racy entries via a diff flag,
or smudging a bit in `struct index_state`.

The more attractive possibility, making racy entries vanishingly rare
by comparing nanosecond timestamps, is where the two threads
converge. What began as a six-line build-system patch became an
investigation into whether the twenty-year-old reason for keeping
`USE_NSEC` off by default still holds. Evidence was gathered from
Peff's cache-dropping experiments on ext4, ext2, vfat and CIFS, Ben's
on XFS, and the kernel history showing the remaining filesystems fixed
by 4.3. It suggests the reason largely does not hold anymore, at least
on Linux. That in turn convinced the participants that a compile-time
switch is the wrong shape for the problem, since correctness depends
on the filesystem a repository happens to live on rather than on how
Git was built, and that a runtime configuration variable is what is
really wanted. Junio discarded the Meson patch not because it was
wrong but because it had been overtaken by that conclusion, explicitly
inviting a resurrection "as a topic with shifted focus". Ben has
offered to attempt it.

So the lasting value here is a clarified problem and a mandate for a better
solution, plus a nice illustration of how a small patch can usefully expose
a design question that outgrows it. For users hitting the slowness today,
the practical advice is unchanged and worth repeating: after a large
checkout, one `git status` or `git update-index --refresh` makes it go
away.

<!---
## Developer Spotlight:
-->

## Other News

__Various__
+ [Git Merge 2026](https://blog.gitbutler.com/git-merge-2026)
  will be coming to Lisbon, September 17 and 18th.
  Written by Scott Chacon on Butler's Log (GitButler Blog).
+ [Researcher Publishes GitLab RCE PoC Letting Authenticated Users Run Commands as Git](https://thehackernews.com/2026/07/researcher-publishes-gitlab-rce-poc.html)
  by Swati Khandelwal on The Hacker News.
+ [GitLab Vulnerabilities Allow Attackers to Execute Remote Code on Default GitLab Installations](https://cybersecuritynews.com/gitlab-vulnerabilities-enable-code-execution/)
  by Guru Baran on Cyber Security News.
+ [Codeberg takes its side in the open-source scene's AI debate by banning vibe-coded projects](https://www.xda-developers.com/codeberg-takes-its-side-in-the-open-source-scenes-ai-debate-by-banning-vibe-coded-projects/)
  by Simon Batt on XDA Developers.
    + One of reactions: [I Regret Migrating to Codeberg](https://xn--gckvb8fzb.com/i-regret-migrating-to-codeberg/)
	  by マリウス (mrusme) on their blog.
+ [GitHub suddenly rejected my SSH key (the fix was a .pub file?!)](https://thorsell.io/2026/07/21/github-ssh-keys.html)
  by Erik Thorsell on their blog.

__Light reading__
+ [Agentic Version Control Benchmarks](https://blog.gitbutler.com/vcbench)
  by Scott Chacon on Butler's Log (GitButler Blog),
  comparing Git, Jujutsu and GitButler.
+ [On Lazy Secrets Management](https://radekmie.dev/blog/on-lazy-secrets-management/)
  by Radosław Miernik on his @radekmie blog.
  Mentions [sops](https://getsops.io/) tool (SOPS: Secrets OPerationS)
  to keep `.env` file in repository but encrypted,
  [age](https://github.com/filosottile/age) secure file encryption tool and Go library,
  and password managers with their API.
+ [`git rebase -i` is not that scary](https://cachebag.sh/journal/interactive-rebasing/)
  by Akrm Al-Hakimi on his blog.
+ [The `git history` command deserves more attention](https://lalitm.com/post/git-history/)
  by Lalit Maganti on his blog.
+ [`--end-of-options`](https://nesbitt.io/2026/07/21/end-of-options.html)
  by Andrew Nesbitt on his blog (explaining its history, and
  why this command line option exists).
+ [How GitHub handles Git LFS](https://www.scottberrevoets.com/2026/07/01/how-github-handles-git-lfs/)
  by Scott Berrevoets on his blog.
  Mentions GitHub charging for both storage and bandwidth,
  the ability to skip downloading certain LFS objects to avoid bandwidth usage,
  and how what's in Git repository can get out of sync with what is stored in Git LFS
  (what happens after removing a tracked file, or after rewriting history).
+ [GitOps at Scale](https://stephennimmo.com/2026/06/09/gitops-at-scale/)
  by Stephen Nimmo on his blog.
   + GitOps evolved from DevOps, the integration and automation of software development operations.
     The core idea of GitOps is having a Git repository that always contains
     declarative descriptions of the infrastructure currently desired in the production environment
	 and an automated process to make the production environment match the described state in the repository.
   + The topic of GitOps was first mentioned in [Git Rev News Edition #42](https://git.github.io/rev_news/2018/08/22/edition-42/),
     and most recently in [Edition #132](https://git.github.io/rev_news/2026/02/28/edition-132/) - the latter with
	 [Why (pure) GitOps Doesn't Work at Scale (and What to Do Instead)](https://ctrlplane.dev/blog/why-gitops-doesnt-work-at-scale).
   + [OpenGitOps](https://opengitops.dev/) and [GitOps.tech](https://www.gitops.tech/)
     sites were first mentioned in [Git Rev News Edition #94](https://git.github.io/rev_news/2022/12/31/edition-94/).
+ [Auto-Optimize Images in a Git Pre-Commit Hook (Local, No Upload)](https://dev.to/orthogonalinfo/auto-optimize-images-in-a-git-pre-commit-hook-local-no-upload-m28)
  by Max on DEV\.to; uses locally installed `pngquant` and `jpegoptim`, and a hook in Bash.
+ [Local Git Runners Using Git Hooks](https://starbreaker.org/thaumaturgy/local-git-runners-using-git-hooks.html)
  by Matthew Thomas Cambion on starbreaker\.org.
+ [Minimal Git CI using hooks](https://mccd.space/posts/26-06-29/simple-git-ci)
  by mccd.
+ [How I log every Git commit to a plain text file](https://flaviocopes.com/log-git-commits-plain-text/)
  with a post-commit hook, by Flavio Copes on their blog.
+ [A Git hook to prevent committing directly to 'main'](https://alexwlchan.net/2026/no-main-hook/)
  by Alex Chan on their blog.
+ [A gentle introduction to Git worktrees](https://humanwhocodes.com/blog/2026/07/introduction-git-worktrees/)
  by Nicholas C. Zakas on Human Who Codes blog.
+ [VC Shuttle: Advice-Based Git Sync for Air-Gapped Emacs](https://emacs.dyerdwelling.family/emacs/20260514140413-emacs--vc-shuttle-advice-based-git-sync-for-air-gapped-emacs/)
  on Emacs Dwelling.
+ [How to add previous commit messages and authors to you Git commit template?](https://talfus-laddus.de/blog/git-commit-wrapper/)
  by Matthias Schaub (~talfus-laddus) on his blog.
  His solution was to change `core.editor` to custom script.
+ [Field Notes: Trunk-Based Development Makes Problems Painfully Visible](https://www.v01.io/posts/2026-trunk-based-development/)
  by Klaus Breyer on his blog.
    + Compare [Patterns for Managing Source Code Branches](https://martinfowler.com/articles/branching-patterns.html)
	  by Martin Fowler (author of the [Refactoring: Improving the Design of Existing Code](https://martinfowler.com/books/refactoring.html) book),
	  which also recommends trunk based development for easier Continuous Integration.
	  It was first mentioned in [Git Rev News Edition #63](https://git.github.io/rev_news/2020/05/28/edition-63/).
	+ See also [Trunk Based Development](https://trunkbaseddevelopment.com/) site,
	  first mentioned in [Git Rev News Edition #24](https://git.github.io/rev_news/2017/02/22/edition-24/).
+ [Malleating Git commit signatures](https://iter.ca/post/git-malleate/)
  by Smitty (loops) on iter\.ca.
  Git hash chain malleability means that given a signed commit A,
  anyone can create a new signed commit A’ that is _identical_ in all respects
  except that it has a different (still valid) signature
  and therefore also a different commit hash.
+ [Why don't people use git properly?](https://deadsimpletech.com/blog/why-dont-people-use-git-properly)
  by Iris Meredith on her deadSimpleTech blog.
+ [An Elegy to Git Push](https://stackdiver.com/posts/an-elegy-to-git-push/)
  by Sun (chuanqisun) on Stack Diver blog,
  a about a 24-hour hackathon done with AI coding agents
  where the agent stalled at `git push`.
+ [Bookmark: This was the first commit via an LLM to git](https://remysharp.com/links/2026-07-12-4e9c9652)
  by Remy Sharp.
+ [Manage Your Claude Code Config with Dotfiles and GNU Stow](https://www.yurikoval.com/blog/manage-ai-config-with-dotfiles.html)
  (in a dotfiles repo), by Yuri Kovalov on their blog.
+ [Caught a `.git/config` crawler](https://bruceediger.com/posts/git-config-spider/)
  by Bruce Ediger on his Information Camouflage blog.
+ [Securing our GitHub Actions workflows with zizmor](https://blog.packagist.com/securing-our-github-actions-workflows-with-zizmor/)
  by Steven Rombauts on Packagist Blog.
  [`zizmor`](https://docs.zizmor.sh/), a static analysis tool for GitHub Actions,
  was first mentioned in [Git Rev News Edition #134](https://git.github.io/rev_news/2026/04/30/edition-134/).
+ [How I Found 3,800+ Leaked Secrets on GitHub Archive Using AI](https://aydinnyunus.github.io/2026/06/30/hunting-leaked-secrets-on-github-archive/)
  by Yunus Aydın on their blog.
+ [GitHub governance reference links I share with teams](https://devopsjournal.io/blog/2026/07/13/github-governance-resource-map)
  by Rob Bos on DevOps Journal.
+ [Make GitHub Actions Do More For You](https://mikemcquaid.com/make-github-actions-do-more-for-you/)
  by Mike McQuaid on his blog.
+ [How to publish to PyPI using GitHub Actions securely](https://snarky.ca/how-to-publish-to-pypi-using-github-actions-securely/)
  by Brett Cannon on Tall, Snarky Canadian blog.
+ [Using `uvx` in GitHub Actions in a cache-friendly way](https://til.simonwillison.net/github-actions/uvx-github-actions-cache)
  in Simon Willison's TILs (Today I've Learned).
  [uv](https://docs.astral.sh/uv/) is an extremely fast Python package and project manager,
  written in Rust; the `uvx` (`uv tool run`) is a command allows to install and run
  a Python tool (like e.g., `pycowsay`) in an ephemeral virtual environment.
+ [Counting Builds with Git Tags](https://onyxmueller.net/2026/07/05/counting-builds-with-git-tags/)
  (and a GitHub action), by Onyx Mueller on his blog.
+ [Dragging my feet leaving GitHub](https://site.sebasmonia.com/posts/2026-07-09-dragging-my-feet-leaving-github.html)
  by Sebastián on his blog.
+ [GitHub under siege](https://jerodsanto.net/2026/06/github-under-siege/)
  by Jerod Santo on his blog.
  Mentions problems with GitHub’s reliability, the defections,
  upcoming "AI agent-native" competitors (like Origin and Entire),
  and proliferation of sovereignty forges.
+ [I built a colleague who lives in my terminal](https://farrant.me/posts/title-tbd/)
  by Josh Farrant on his blog.
  This "colleague" is Coco: a Git repo with markdown files
  (including LLM or AI agent conversation journal),
  a few small servers, and a very long set of instructions.
+ [A deep dive into my Forgejo setup](https://a.l3x.in/blog/welcome-to-my-forge/)
  by Alexander Fortin on their blog.
  [Forgejo](https://forgejo.org/) is a self-hosted lightweight software forge,
  written in Go; nowadays a hard fork of Gitea (which in turn was based on Gogs).
+ [Migrating From Gitlab to Forgejo](https://www.bentasker.co.uk/posts/blog/software-development/migrating-from-gitlab-to-forgejo.html)
  by Ben Tasker on their blog.
+ [How to do releases (in a git project)](https://beyermatthias.de/how-to-do-releases)
  by Matthias Beyer on his musicmatzes blog (2025).
+ [Myth vs. Fact: why is code review so hard?](https://isaaclyman.com/blog/posts/code-review/)
  by Isaac Lyman on their blog.
+ [Re-reviewing a PR after changes: the interdiff problem](https://pyor.review/blog/re-reviewing-pull-requests-interdiff),
  [How to review large pull requests without losing your mind](https://pyor.review/blog/how-to-review-large-pull-requests),
  [How big should a pull request be?](https://pyor.review/blog/how-big-should-a-pull-request-be),
  [Atomic commits make reviewable PRs](https://pyor.review/blog/atomic-commits-reviewable-prs), and
  [Author self-review: the cheapest code review you’re not doing](https://pyor.review/blog/author-self-review)
  by Othman Shareef on Pyor Blog.
  [Pyor.Review](https://pyor.review/) is a service to help with code review,
  available as downloadable Electron app, and a [GitHub App (in browser)](https://app.pyor.review/welcome).
+ [Version-controlled databases using Prolly trees](https://lwn.net/Articles/1068864/)
  about [Dolt](https://github.com/dolthub/dolt) (Git for Data).
  Written by Daroc Alden on LWN\.net.
  Dolt was first mentioned in [Git Rev News Edition #62](https://git.github.io/rev_news/2020/04/23/edition-62/),
  and most recently in [Edition #105](https://git.github.io/rev_news/2023/11/30/edition-105/).
+ [The (Petty) Reason We Didn't End Up Using `jj`](https://blog.gradle.org/the-petty-reason-we-didnt-end-up-using-jj-at-gradle)
  by Laura Kassovic on Gradle Blog.
  [Jujutsu (`jj`)](https://jj-vcs.github.io/) is a Git-compatible
  version control system written in Rust, which was first mentioned
  in [Git Rev News Edition #85](https://git.github.io/rev_news/2022/03/31/edition-85/),
  and most recently in [Edition #136](https://git.github.io/rev_news/2026/06/30/edition-136/).
+ [Plant Your Seeds in the Radicle Garden](https://radicle.dev/2026/06/02/announcing-radicle-garden),
  announcing [radicle.garden](https://radicle.garden/),
  a new service for always-on, hosted Radicle nodes.
  Published by yorgos on Radicle blog.
  [Radicle](https://radicle.xyz) is a peer-to-peer, local-first code collaboration stack
  built on Git, first mentioned in [Git Rev News Edition #49](https://git.github.io/rev_news/2019/03/20/edition-49/),
  and most recently in [Edition #135](https://git.github.io/rev_news/2026/05/31/edition-135/)
+ [Too many words about DIDs](https://steveklabnik.com/writing/too-many-words-about-dids/)
  by Steve Klabnik on his blog.
  DID (“Decentralized Identity” standard) is used by ATproto,
  which in turn is used by [Tangled](https://tangled.org/),
  a decentralized code hosting and collaboration platform,
  first mentioned in [Git Rev News Edition #125](https://git.github.io/rev_news/2025/07/31/edition-125/),
  and most recently in [Edition #136](https://git.github.io/rev_news/2026/06/30/edition-136/).
+ [How to self-host your own tangled git server without Bluesky](https://suranyami.com/how-to-self-host-your-own-tangled-git-server-without-bluesky) and
  [Pushing a repo to your own tangled git server](https://suranyami.com/pushing-a-repo-to-your-own-tangled-git-server)
  by Suranayami on their blog.
+ [Introducing Bobbin: A diskless, API-only AppView for Tangled](https://blog.tangled.org/bobbin/)
  by Lewis (oyster\.cafe) on Tangled Blog.
+ [grok-build-exfil-repro](https://github.com/cereblab/grok-build-exfil-repro)
  is a harness that shows you that xAI's Grok Build CLI uploads your entire
  repository — every tracked file plus full git history — to xAI's cloud,
  independent of what the agent reads, and that turning off "Improve the model"
  does not stop it.

__Easy watching__
+ [Git from the inside out](https://www.youtube.com/watch?v=fCtZWGhQBvo)
  by Mary Rose Cook is a talk that focuses on the graph structure that underpins Git
  and the way the properties of this graph dictate Git’s behavior.
  Video on YouTube (2016), 48:52 in length.<br>
  The essay version of this talk, also titled
  [Git from the inside out](https://maryrosecook.com/blog/post/git-from-the-inside-out);
  was mentioned in [Git Rev News Edition #2](https://git.github.io/rev_news/2015/04/05/edition-2/)
  and [Edition #21](https://git.github.io/rev_news/2016/11/16/edition-21/)
  (slightly different version).

__Scientific papers__
+ Solal Rapaport, Laurent Pautet, Samuel Tardieu, Stefano Zacchiroli, Théo Zimmermann:
  _"Mutating the "Immutable": A Large-Scale Study of Git Tag Alterations"_
  [arXiv:2606.31354](https://arxiv.org/abs/2606.31354) (2026).
  Presented at 2026 ACM Conference on Reproducibility and Replicability,
  July 2026, Delft, Netherlands.
+ Kawsar Ahmed Bhuiyan, Mohamed Bilel Besbes, Rachna Raj, Adam Al Assil, Diego Elias Costa:
  _"Beyond Compliance: A Large Scale Study on the Completeness and Consistency of the GitHub SBOMs"_
  [arXiv:2607.04614](https://arxiv.org/abs/2607.04614) (2026).

__Git tools and sites__
+ [Jujubi](https://juju.bi/) is to be a code forge service (with a free tier)
  where your repos, PRs, and review comments live on your machine,
  and the forge syncs quietly in the background.
  Jujubi aims to provide a GitHub-compatible REST API,
  and provide GitHub-compatible webhook events.
  Currently you can just join the waitlist.
+ [Gitus](https://gituscodeforge.github.io/) is a self-hosted code forge
  that mainly supports the Git.
  No JavaScript - works all major browsers.
  No demo yet.  Written in Go, under GPL-3.0 license.
    + See also [One Year Of Gitus; Random Thoughts](https://sebastian.graphics/blog/one-year-of-gitus.html)
	  by Zetian Lin (Sebastian Zack Tin Lahm-Lee).
+ [GitRoot](https://gitroot.dev/) is a small yet powerfull git forge.
  Download one binary, launch it and you have a forge that can create git repositories,
  and manage who can access to what repositories.  Issues, branch review, etc.,
  are provided with plugins.  Written in Go,
  under EUPL 1.2, and also MIT, CC-BY-SA 4.0, CC0 1.0 licenses. 
+ [Thunderbird Patch Review](https://mccd.space/git/thunderbird-patch-review/file/README.html.html)
  is a Thunderbird Add-on to review git patches from email inside Thunderbird.
  The workflow is to open a patch email, press "Review", comment on hunks,
  send the review as a mailing-list reply, and apply the series to a local repository
  with `git am`.  Under EUPL v. 1.2 license.
+ [gap](https://github.com/cdacamar/gap) is a very simple text GUI diffing utility,
  with side-by-side view.  Can be used as command line tool, or as difftool.
  Written in C++, under MIT license.
+ [Scoped Commits](https://scopedcommits.com/) is a loose standard
  for formatting commit messages that focuses on making the commit log
  quickly understandable to contributors.
    + Compare [Conventional Commits](https://www.conventionalcommits.org/),
	  a specification for adding human and machine readable meaning to commit messages,
	  first mentioned in [Git Rev News Edition #52](https://git.github.io/rev_news/2019/06/28/edition-52/).
+ [OpenFeature](https://openfeature.dev/) is an open specification
  that provides a vendor-agnostic, community-driven API for feature flagging
  that works with your favorite feature flag management tool.
  Feature flags are a software development technique that allows teams
  to enable, disable or change the behavior of certain features or code paths
  in a product or service, without modifying the source code.
+ [Evan's Jujutsu Tutorial](https://evmar.github.io/jjtut/) and
  [Russell’s Starter Guide to Jujutsu](https://rwblickhan.org/newsletters/russells-starter-guide-to-jujutsu/).
  [Jujutsu (`jj`)](https://jj-vcs.github.io/) is a Git-compatible
  version control system written in Rust, which was first mentioned
  in [Git Rev News Edition #85](https://git.github.io/rev_news/2022/03/31/edition-85/),
  and most recently in [Edition #136](https://git.github.io/rev_news/2026/06/30/edition-136/).
  
+ [git-llmfs](https://codeberg.org/TheMikina/git-llmfs) is a **joke** tool:
  a git filter that uses local LLM summaries as a compression mechanism
  for code files to save space in a git repository.
  Bash scripts and LLM prompts, under MIT license.

## Releases

+ Git for Windows [v2.55.0(3)](https://github.com/git-for-windows/git/releases/tag/v2.55.0.windows.3),
[v2.55.0(2)](https://github.com/git-for-windows/git/releases/tag/v2.55.0.windows.2),
[v2.54.0(2)](https://github.com/git-for-windows/git/releases/tag/v2.54.0.windows.2)
+ libgit2 [1.9.6](https://github.com/libgit2/libgit2/releases/tag/v1.9.6),
[1.9.5](https://github.com/libgit2/libgit2/releases/tag/v1.9.5)
+ go-git [6.0.0-alpha.5](https://github.com/go-git/go-git/releases/tag/v6.0.0-alpha.5)
+ gitoxide [0.56.0](https://github.com/GitoxideLabs/gitoxide/releases/tag/v0.56.0)
+ JGit [7.7.1](https://github.com/eclipse-jgit/jgit/releases/tag/v7.7.1.202607240634-r)
+ Bitbucket Data Center [10.4](https://confluence.atlassian.com/bitbucketserver/release-notes-872139866.html)
+ Gerrit Code Review [3.12.9](https://www.gerritcodereview.com/3.12.html#3129),
[3.13.8](https://www.gerritcodereview.com/3.13.html#3138),
[3.14.2](https://www.gerritcodereview.com/3.14.html#3142)
+ GitHub Enterprise [3.21.3](https://docs.github.com/enterprise-server@3.21/admin/release-notes#3.21.3),
[3.20.5](https://docs.github.com/enterprise-server@3.20/admin/release-notes#3.20.5),
[3.19.9](https://docs.github.com/enterprise-server@3.19/admin/release-notes#3.19.9),
[3.18.12](https://docs.github.com/enterprise-server@3.18/admin/release-notes#3.18.12),
[3.17.18](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.18)
+ GitLab [19.3](https://docs.gitlab.com/releases/19/gitlab-19-3-released/),
[19.2](https://docs.gitlab.com/releases/19/gitlab-19-2-released/)
+ Gitea [1.27.1](https://github.com/go-gitea/gitea/releases/tag/v1.27.1),
[1.27.0](https://github.com/go-gitea/gitea/releases/tag/v1.27.0)
+ GitKraken [12.3.1](https://help.gitkraken.com/gitkraken-desktop/current/),
[12.3.0](https://help.gitkraken.com/gitkraken-desktop/current/)
+ GitHub Desktop [3.6.3](https://desktop.github.com/release-notes/),
[3.6.2](https://desktop.github.com/release-notes/)
+ lazygit [0.63.1](https://github.com/jesseduffield/lazygit/releases/tag/v0.63.1),
[0.63.0](https://github.com/jesseduffield/lazygit/releases/tag/v0.63.0)
+ Garden [2.6.1](https://github.com/garden-rs/garden/releases/tag/v2.6.1)
+ Git Cola [4.19.0](https://github.com/git-cola/git-cola/releases/tag/v4.19.0)
+ GitButler [0.22.0](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.22.0),
[0.21.2](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.21.2)
+ Kinetic Merge [1.17.0](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.17.0),
[1.16.0](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.16.0)
+ Tower for Mac [17.0](https://www.git-tower.com/blog/tower-mac-17)
+ Tower for Windows [13](https://www.git-tower.com/blog/tower-windows-13)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
