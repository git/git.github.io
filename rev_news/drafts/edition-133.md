---
title: Git Rev News Edition 133 (March 31st, 2026)
layout: default
date: 2026-03-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 133 (March 31st, 2026)

Welcome to the 133rd edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](https://git.github.io).

This edition covers what happened during the months of February and March 2026.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

### Support

+ [git-am applies commit message diffs](https://lore.kernel.org/git/bcqvh7ahjjgzpgxwnr4kh3hfkksfruf54refyry3ha7qk7dldf@fij5calmscvm)

On February 6, 2026, Matthias Beyer forwarded to the Git mailing list a
surprising warning that had just circulated on Mastodon:

> PSA: Did you know that it's **unsafe** to put code diffs into your
> commit messages?
>
> Such diffs will be applied by patch(1) (also git-am(1)) as part of
> the code change!
>
> This is how a sleep(1) made it into i3 4.25-2 in Debian unstable.

The incident had originated in the i3 window manager project, where a
commit message contained an unindented diff for illustration purposes.
When Debian packagers later applied the patch using `patch(1)`, the diff
in the commit message was applied as actual code, sneaking a spurious
`sleep(1)` call into the Debian unstable package. Matthias asked the
list whether this was a known issue and whether it could be an attack
vector.

To understand why this happens, it helps to know how `git-am` parses
its input. When processing a patch email, it must split the stream into
two parts: the commit message and the actual patch to apply. It does
this by treating the first occurrence of any of the following lines as
the boundary between the two:

- a line consisting of only three dashes (`---`),
- a line beginning with `diff -`, or
- a line beginning with `Index: `.

Everything before that boundary becomes the commit message; everything
after is fed to the patch application machinery. Crucially, `git-am`
scans from the top of the email, so the very first such line it
encounters terminates the commit message regardless of whether that
line was meant to be part of the message text.

This design dates back to the tool's origins. As Jeff King (also known
as "Peff") quickly explained in reply to Matthias, `git-am` was
originally designed to handle patches sent by all kinds of people, not
just Git users. A contributor might have generated a diff with plain
GNU `diff` and typed the rest of the email by hand, without any `---`
separator. The tool was therefore intentionally permissive: it would
find a `diff -` line anywhere in the email and treat it as the start
of the patch. Peff demonstrated this with a live example. He fed `git
am` a hand-typed email containing a GNU diff, and it produced the
expected commit.

This historical context also explained why `git-am` is notoriously
hard to fix: "I don't think there is a way to unambiguously parse the
single-stream output that format-patch produces," Peff wrote, noting
that he could find at least three earlier discussions of the same
problem (in 2015, 2022, and 2024). The stream is simply ambiguous by
design. Even the `---` marker itself cannot be used to robustly split
things, since `---` on a line by itself is a valid diff hunk line
indicating that the string `--` was removed from a file.

Matthias proposed parsing from the end of the email rather than from
the top. Peff replied that this would still be ambiguous for the same
reasons, and would introduce new corner cases.

Jacob Keller noted early on that the issue was certainly surprising but
that he was unsure it constituted a security attack vector, since
someone should be reading the commit message before applying. But
Matthias pushed back: the whole point was that nobody realized the
behavior was there. He called it "sheer luck" that it was only a
`sleep(1)` and not something more malicious crafted as a diff in the
commit message.

Florian Weimer wondered whether the `git-format-patch` output was
really ambiguous, given that the patch section is normally preceded by
a diffstat block. Peff replied that the diffstat is optional and is not
even parsed by the receiving side at all.

Jakob Haufe added an important nuance: even if `git-am` were fixed to
require indented diffs, it would only partially mitigate the problem,
because `patch(1)` (which many distributions use to apply upstream
fixes to packages) is even more permissive. It will strip a consistent
level of indentation from diffs before applying them. He quoted the
`patch(1)` manual page: "If the entire diff is indented by a
consistent amount, [...] this is taken into account." The i3 incident
had in fact been triggered by `patch(1)`, not `git-am`.

Kristoffer Haugsbakk synthesized this into a clear summary of the
situation and immediately proposed documenting it.

Matthias also highlighted the broader applicability beyond email
workflows: Linux distributions like NixOS routinely fetch patches
directly from upstream Git repositories and apply them to packages
using `patch(1)`. He noted that even after 15 years of using Git and
being comfortable with email patch workflows, he himself had not known
about this behavior.

Several directions were then explored to look for solutions.

Peff observed the irony that `git-format-patch` does have a `--attach`
option which puts the message and the patch in separate MIME parts —
making them unambiguous in principle. However, `git-mailinfo` (which
powers `git-am` under the hood) decodes both parts into a single
stream and still treats a `diff` line in the message part as the start
of a patch. Fixing this would require careful surgery to avoid
breaking the existing forgiving handling of patches received as a
single attachment.

Patrick Steinhardt suggested that even if parsing cannot be made
unambiguous, `git-am` could at least detect the ambiguity and bail by
default with an `--accept-ambiguous-patch` override. Jacob Keller
proposed going further: a new "unambiguous mode" where
`git-format-patch` would produce output that new versions of `git-am`
could distinguish unambiguously, while old versions would still handle
the common case the same way as before.

Jacob had also sketched a concrete scheme: add a new unambiguous
marker after the `---` separator, so that old versions of `git-am`
would still cut at the `---` and ignore everything up to the diff, while
new versions would wait for the new marker and correctly ignore any
diff appearing before it. Since the new marker would come after `---`,
it would not be inserted into the commit message when applied.

Peff replied that this was trickier than it sounded: the new marker
would have to be something that could never appear legitimately in a
commit message, and both sides would need to complain if they saw
multiple markers. He explored further options: reversible quoting of
`---` and `diff` lines in the commit message (analogous to the `>From`
quoting used in mbox files), applied only when the message would
otherwise be ambiguous. This way, if an older `git-am` received the
mail, the worst case would be visible quoting in the commit message —
ugly but readable. Junio Hamano, the Git maintainer, added another
thought: refusing to accept unsigned patches at all.

Peff also proposed a simpler receiver-side improvement: a
`git am --strict` mode that would always require a `---` separator
before the diff, on the assumption that well-formatted patches from Git
always have one. This would not help with diffs that legitimately
appear before the `---`, but would eliminate the most common accidental
cases.

None of these ideas led to an immediate implementation, as they all
involve backward compatibility tradeoffs that would need careful
thought.

On February 8, Kristoffer sent a documentation patch titled "doc: add
caveat about roundtripping format-patch" which introduced a new
`Documentation/format-patch-caveats.adoc` file explaining the
behavior. The caveat was designed to be included in the documentation
for `git-am`, `git-format-patch`, and `git-send-email`.

Junio reviewed
[version 1](https://lore.kernel.org/git/format-patch_caveats.281@msgid.xyz)
and offered a correction to the wording: rather than saying that an
unindented diff in the commit message "will not only cut the message
short but cause that very diff to be applied, along with the patch in
the patch section," Junio noted that the outcome is not so
deterministic. The diff in the commit message might get applied, or
the patch machinery might trip on something and fail outright. He also
flagged that the space after the `---` in the cover letter was
inconsistent with the project's conventions.

Phillip Wood reviewed the patch and found the mention of
`git-send-email` a bit distracting, since that command merely runs
`git-format-patch` and does not do any formatting itself. He also
suggested wording improvements: replacing "One might want to use [...]
patch(1)" with "Given these limitations, one might be tempted to [...]".

Kristoffer incorporated all of this in
[version 2](https://lore.kernel.org/git/V2_format-patch_caveats.34b@msgid.xyz),
which dropped the `git-send-email` mention from the introductory
paragraph (while keeping the CAVEATS section in its documentation, for
users who encounter it there), removed example code blocks in favor of
clearer prose, and used the list of message-terminating patterns
already present in `git-am`'s documentation. Junio reviewed it and
queued it with the comment "Nicely written."

A third version,
[version 3](https://lore.kernel.org/git/V3_format-patch_caveats.354@msgid.xyz),
was submitted and received Junio's approval to go to `next`.

Meanwhile, Phillip had observed that since the parsing cannot be fixed,
"perhaps we should update our sample `commit-msg` hook to reject
messages that will cause problems." On February 7, he sent a 3-patch
series titled "commit-msg.sample: reject messages that would confuse
`git am`". The series:

1. Added a `.gitattributes` rule for sample hooks (which are shell
   scripts but have `.sample` extensions).
2. Extended the sample `commit-msg` hook to scan the body of the commit
   message for unindented `diff -` and `Index: ` lines and reject the
   commit with a helpful error message.
3. Added a further check to detect `---` separator lines in the message
   body, which would cause `git-am` to silently truncate the commit
   message.

Peff reacted with measured skepticism to patch 3 in
[version 1](https://lore.kernel.org/git/cover.1770476279.git.phillip.wood@dunelm.org.uk):
he and Junio both pointed out that they themselves sometimes use `---`
intentionally in commit messages to add notes that will appear in the
formatted patch email but not end up in the final commit message when
applied. Junio explained the trick: "when I know what I want to write
below the three-dash lines, I would commit with `---` and additional
notes below it, so that I do not forget during format-patch. When the
commit is turned into a patch email [...] `am` cuts at the first one,
and `apply` knows that the garbage lines at front, including
three-dash lines, do not matter until it sees `^diff`, this works out
perfectly well."

Peff confirmed he used the same trick. Phillip, acknowledging that at
least three developers relied on this behavior, decided to drop patch 3
entirely, reducing the series from three patches to two, in
[version 2](https://lore.kernel.org/git/cover.1770993281.git.phillip.wood@dunelm.org.uk).
He also refined the diff detection in the body: the v2 correctly skips
the first paragraph of the message (which becomes the email Subject
header and so does not go through the patch boundary detection), skips
lines below a scissors line, and handles the `core.commentChar` and
`core.commentString` configuration options for determining which lines
are comments. Junio reviewed version 2 with detailed questions about
the scissors-line logic.

Kristoffer verified that version 2 worked with `git commit
--cleanup=scissors --verbose` and was satisfied.

The discussion did not lead to a fundamental fix to the ambiguous
parsing in `git-am`, which remains an open problem with no obvious
backward-compatible solution. But it produced two concrete
improvements that were accepted and are now in `master`: a CAVEATS
section in the documentation for `git-am`, `git-format-patch`, and
`git-send-email` spelling out exactly how commit messages can
inadvertently interfere with patch application, and an enhanced sample
`commit-msg` hook that rejects messages containing unindented diffs.

The thread also served as a useful reminder that this problem is not
limited to email workflows: any project that generates patches from
Git commits using `git-format-patch` and applies them with `patch(1)`
or `git-am` is exposed to it. The practical advice for authors is
simple: if you include diffs in commit messages for illustrative
purposes, make sure to indent them consistently, and be aware that
even that does not protect you from `patch(1)`.

## Developer Spotlight: Olamide Caleb Bello

_Editor’s note: This edition features a retrospective interview with a
contributor who contributed to Git through a mentoring program.
We hope the reflections shared by the Outreachy contributor will
provide an insightful perspective that benefits the community.
As always, we welcome your thoughts and feedback!_

* **Who are you and what do you do?**

  I’m Olamide Caleb Bello, a software engineer based in Nigeria. I studied
  Economics, but I’ve always been curious about technology and how
  Systems work behind the scenes. That curiosity led me to start teaching
  myself web development, and over time I found myself drawn more
  towards backend and systems-oriented work.

  I became especially interested in understanding how complex tools are
  built and maintained, which led me to open source. I contributed to Git
  as part of the Outreachy program, where I got to work on improving parts
  of Git’s internal workflows.

  These days, I enjoy working on tools that make development smoother
  for others, and I’m particularly interested in open source and
  distributed systems.

* **How did you initially become interested in contributing to Git,
  and what motivated you to choose it as your Outreachy project?**

  I initially saw Git as just a tool I needed to get my work done. For a
  long time, my workflow was basically just `git add`, `git commit`, `git push`,
  and `git pull`, without thinking much about what was happening underneath.
  That started to change when I ran into some particularly messy merge conflicts
  that forced me to slow down and really question how Git was managing
  history and combining changes.

  Around the same time, I was becoming more interested in systems in
  general, thinking about tools like the kernel, systemd, and Git
  itself, and how they work under the hood. That experience pushed me to
  look deeper into Git’s internals, and I quickly realized how much
  depth there was beneath the surface.

  When I came across the Outreachy project, choosing Git felt natural, I
  wanted to challenge myself and contribute to a tool I had used for
  years but didn’t fully understand, while learning from experienced
  maintainers.

* **How do you feel your contribution has impacted the Git community
  or the broader open source ecosystem?**

  [My work](https://cloobtech.hashnode.dev/beginning-my-outreachy-opensource-internship-at-git-overview-and-project-description)
  focused on reducing Git’s reliance on global state by refactoring
  repository-specific variables into a more localized structure. Each repository
  instance now manages its own configuration independently, improving modularity
  and reducing the risk of cross-repository issues.

  Through this work, I came to appreciate how changes at this level contribute to
  Git’s long-term direction, particularly efforts to make it more reusable as a
  library. Even though these changes aren’t directly visible to users, they make
  the system safer and easier to extend.

  Being part of that process gave me a deeper respect for the level of thought
  and the care that goes into maintaining Git.

* **Is there any aspect of Git that you now see differently after
  having contributed to it?**

  Before contributing, I thought Git was just a bunch of commands I
  typed every day. Working on it showed me a whole hidden world,
  how configurations are saved and read, how each repository handles
  its own settings, and what the index is really doing behind the scenes.
  Some of it was so intricate I almost felt like Git was trolling me!

  Seeing all this up close turned what felt like a simple tool into a
  carefully designed system, and it gave me a much deeper appreciation
  for the thought and care behind every command.

* **How do you balance your contributions with other responsibilities
  like work or school?**

  At the moment, I’m not tied to a full-time job or school, but I spend a lot
  of time learning new tech and doing freelance work. I usually dedicate small,
  focused sessions to Git contributions, sometimes just an hour here or there,
  and it’s surprising how much progress you can make that way. This rhythm lets
  me keep learning, experimenting, and contributing without feeling overwhelmed.

* **Can you share how Outreachy helped enhance your technical and
  non-technical skills (like communication, project management,
  etc.)?**

  Outreachy was a huge growth opportunity for me, both technically and personally.
  On the technical side, I deepened my understanding of Git internals, learned to
  work effectively in a large C codebase, and tackled complex refactoring of core
  systems. On the non-technical side, I honed my communication skills by engaging
  actively on the Git mailing list, responding to feedback, and documenting my
  work clearly for others. The experience also helped me improve project
  discipline, learning how to plan and iterate on tasks in a structured way.

* **What was your biggest takeaway or learning from Outreachy that
  you now apply regularly in your work?**

  My biggest takeaway from Outreachy was learning how even small, careful changes
  can have a big impact in a large system like Git. During Outreachy, for even
  the tiniest change, I had to run over 32,000 test cases just to be
  sure it wouldn’t break anything! I approach my work by breaking tasks into
  smaller steps, testing thoroughly, and thinking through the consequences
  before making changes. This mindset has become a regular part of how I work,
  whether I’m contributing to open source or building my own projects.

* **What was the biggest challenge you faced during your contributions
  to Git, and how did you overcome it?**

  The toughest part of contributing to Git was navigating its huge and complex
  C codebase. I had to wrap my head around global variables, repository-specific
  state, and how configs were stored and read. At first, it felt overwhelming,
  and I constantly worried that even a small change might break something.

  I overcame this by tackling one piece at a time, reading the code carefully,
  testing thoroughly, and admittedly, disturbing my mentors quite a bit! 😂 I’m
  especially grateful to Christian Couder and Usman Akinyemi, who guided me
  patiently. Christian taught me how to ask questions properly, showed me how to
  debug effectively, and always encouraged me to think through problems step by
  step. Usman was equally supportive, often checking in and joining coding
  sessions with me. Both helped me understand Git’s internal architecture and
  gave me the confidence to contribute safely and effectively.

* **Have you thought about mentoring new GSoC / Outreachy students?**

  Yes, I have thought about mentoring future GSoC or Outreachy students. Since I’m
  still relatively new to open source myself, I want to focus on contributing and
  learning for now. However, I do hope to co-mentor in the next Outreachy program,
  sharing what I’ve learned and helping others navigate the experience.

* **If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?**

  If I had a team of expert developers working full time on Git for a year, I
  would focus on further improving its modularity and internal architecture.
  My goal would be to make Git easier to embed and reuse as a library, reducing
  reliance on global state and improving the safety of multi-repository
  operations.
 
  This would not only make Git more maintainable for contributors but also open
  up new possibilities for other projects to integrate Git functionality
  more easily.

* **If you could remove something from Git without worrying about
  backwards compatibility, what would it be?**

  If I could remove anything from Git without worrying about backwards
  compatibility, I’d simplify some of the legacy parts of its internal state.
  These older structures can be confusing and tricky to work with, and removing
  them would make Git’s internals cleaner and easier to reason about.

* **What upcoming features or changes in Git are you particularly
  excited about?**

  I’m particularly excited about Git’s ongoing libification efforts, which make
  it easier for other projects to embed and reuse Git functionality. Changes that
  reduce global state and improve repository isolation also excite me, because
  they make multi-repository operations safer and Git’s internals easier to work
  with. I’m curious to see how these improvements will open up new possibilities
  for both contributors and external tools that rely on Git.

* **What is your favorite Git-related tool/library, outside of Git
  itself?**

  I’d say my favorite Git-related tool is `gitingest`. It’s really handy for
  exploring repositories programmatically and testing workflows. I’ve found it
  especially useful while learning Git internals.

* **What is your toolbox for interacting with the mailing list and for
  development of Git?**

  I mainly use `git send-email` to submit patches, read threads on
  [lore.kernel.org/git](https://lore.kernel.org/git), and reply via
  Gmail. This setup helps me follow discussions and iterate on my
  contributions smoothly.

* **How do you envision your own involvement with Git or other open
  source projects in the future?**

  I’m here to stay in open source. I want to keep contributing to Git and other
  projects, learning as I go, taking on bigger challenges, and helping new
  contributors find their footing. Open source has become a big part of how I
  grow as a developer, and I hope to keep giving back for years to come.

* **What is your advice for people who want to start Git development?
  Where and how should they start?**

  My advice for anyone starting Git development is to begin small and be curious.
  A great resource I found helpful is the [MyFirstContribution](https://git-scm.com/docs/MyFirstContribution)
  document. Start by reading the guides, experimenting locally, and submitting
  small patches. Interacting with the mailing list, asking questions, and iterating
  on feedback will help you learn and grow as a contributor.

* **Would you recommend other students or contributors to participate
  in the GSoC, Outreachy or other mentoring programs, working on
  Git? Why? Do you have advice for them?**

  Absolutely, I would recommend programs like GSoC or Outreachy for anyone
  interested in Git or open source. These programs provide structured mentorship,
  exposure to real-world projects, and the chance to learn directly from
  experienced developers. My advice is to start small, be curious, ask questions,
  and don’t be afraid to iterate on feedback. Every contribution, no matter how
  minor it may seem, is a valuable learning experience.


## Other News

__Various__


__Light reading__

+ Automate Your Code with GitHub Actions ([Part 1](https://www.git-tower.com/blog/github-actions-fundamentals) and [Part 2](https://www.git-tower.com/blog/github-actions-events-and-triggers)) by Bas Steins on Tower's Blog.

<!---
__Easy watching__
-->

__Git tools and sites__


## Releases

+ Git for Windows [v2.52.0(2)](https://github.com/git-for-windows/git/releases/tag/v2.52.0.windows.2),
[v2.51.2(2)](https://github.com/git-for-windows/git/releases/tag/v2.51.2.windows.2),
[v2.53.0(2)](https://github.com/git-for-windows/git/releases/tag/v2.53.0.windows.2)
+ Bitbucket Data Center [10.2](https://confluence.atlassian.com/bitbucketserver/release-notes-872139866.html)
+ Gerrit Code Review [3.11.10](https://www.gerritcodereview.com/3.11.html#31110),
[3.11.9](https://www.gerritcodereview.com/3.11.html#3119),
[3.12.5](https://www.gerritcodereview.com/3.12.html#3125),
[3.12.6](https://www.gerritcodereview.com/3.12.html#3126),
[3.13.4](https://www.gerritcodereview.com/3.13.html#3134),
[3.13.5](https://www.gerritcodereview.com/3.13.html#3135),
[3.14.0-rc0](https://www.gerritcodereview.com/3.14.html#3140)
+ GitHub Enterprise [3.20.0](https://docs.github.com/enterprise-server@3.20/admin/release-notes#3.20.0),
[3.19.4](https://docs.github.com/enterprise-server@3.19/admin/release-notes#3.19.4),
[3.18.7](https://docs.github.com/enterprise-server@3.18/admin/release-notes#3.18.7),
[3.17.13](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.13),
[3.16.16](https://docs.github.com/enterprise-server@3.16/admin/release-notes#3.16.16),
[3.15.20](https://docs.github.com/enterprise-server@3.15/admin/release-notes#3.15.20),
[3.14.25](https://docs.github.com/enterprise-server@3.14/admin/release-notes#3.14.25)
+ GitLab [18.10.1, 18.9.3, 18.8.7](https://about.gitlab.com/releases/2026/03/25/patch-release-gitlab-18-10-1-released/),
[18.10](https://about.gitlab.com/releases/2026/03/19/gitlab-18-10-released/),
[18.9.2, 18.8.6, 18.7.6](https://about.gitlab.com/releases/2026/03/11/patch-release-gitlab-18-9-2-released/)
+ GitKraken [11.10.0](https://help.gitkraken.com/gitkraken-desktop/current/)
+ GitHub Desktop [3.5.6](https://desktop.github.com/release-notes/)
+ Garden [2.6.0](https://github.com/garden-rs/garden/releases/tag/v2.6.0)
+ Git Cola [4.18.2](https://github.com/git-cola/git-cola/releases/tag/v4.18.2),
[4.18.1](https://github.com/git-cola/git-cola/releases/tag/v4.18.1),
[4.18.0](https://github.com/git-cola/git-cola/releases/tag/v4.18.0)
+ GitButler [0.19.6](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.19.6),
[0.19.5](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.19.5)
+ Tower for Mac [16.0 (Beta)](https://www.git-tower.com/blog/tower-mac-16)
+ Tower for Windows [11.2](https://www.git-tower.com/release-notes?show_tab=release-notes)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Olamide Caleb Bello.
