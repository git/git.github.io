---
title: Git Rev News Edition 124 (June 30th, 2025)
layout: default
date: 2025-06-30 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 124 (June 30th, 2025)

Welcome to the 124th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of May 2025 and June 2025.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

<!---
### Support
-->

## Community Spotlight: Luca Milanesi

_Luca Milanesio is long standing contributor to both JGit and Gerrit
Code Review, an open-source veteran who's been accelerating Git
workflows for 30+ years—from founding GerritHub.io to pioneering
AI-powered repository optimization research._

_This is a continuation of our initiative to interview community
contributors outside of our mailing list. Our previous interviews
were with [VonC in edition 106][vonc] and [Chris Torek in edition 120][torek]._

- **Who are you and what do you do?**

  My name is Luca Milanesio, and I am the CEO of GerritForge Inc.,
  a company I founded 6 years ago, which is fully dedicated to the
  development and support of Git and the Gerrit Code Review ecosystem
  for medium and large enterprises around the globe.

  I am a passionate Open-Source contributor, and I have helped many
  projects grow over my 30+ years of software development career,
  including Jenkins, JGit, GitBlit, Swagger/Open-API, Kibana, Avro,
  and Gerrit Code Review.

  I am a maintainer and release manager of Gerrit Code Review and a
  member of its Engineering Steering Committee and committer of the
  JGit project.

  I introduced GerritHub.io 11 years ago, a free Gerrit Code Review
  service for all public and private projects on GitHub. It has over
  50k subscribers and is currently used by over 300 organisations and
  open-source projects worldwide.

  My latest work is research about using AI, specifically reinforcement
  learning, to dynamically understand and learn how Git repository metrics
  evolve and execute actions to improve their performance by up to 100x.
  The research has been selected for the 50th edition of the [IEEE/ACM
  International Conference on Software Engineering in Ottawa (CA)][3].

- **What would you name your most important contribution to the Git ecosystem?**

  I have introduced a multi-site replication plugin between the Git
  repositories managed by JGit and Gerrit Code Review [[ref][1]].

  Google introduced the multi-site replication concept in JGit from
  the very beginning in 2012, [with the introduction of DFS][2], a
  multi-site distributed storage mechanism for Git. Although DFS was
  a completely abstract interface layer that could have been
  implemented on top of any distributed storage, in practice, it was
  effectively implemented and used only by Google in its internal
  implementation of JGit.

  In the meantime, the rest of the Open-Source community was left with
  the traditional filesystem-based implementation and its extensions
  to work effectively and efficiently with a shared filesystem (e.g., NFS).
  I started using the NFS implementation of JGit on GerritHub.io and
  contributed many patches and improvements over the years. Still, I
  was soon hit with all the quirks and limitations of the NFS protocol
  in trying to mock the “illusion” of a POSIX filesystem over a network
  protocol, including locking, stale file handles, and caching
  inconsistencies. After working for 4 years on the NFS implementation
  of JGit on GerritHub.io on a shared filesystem, I forked the
  [high-availability plugin project][4] and started the
  [multi-site project][1], which has now entered its 6th year of adoption.

  Thanks to the multi-site support, anyone worldwide can use Git
  replication across Gerrit primary nodes without fearing a
  split-brain disaster, as it [historically happened years ago][5]
  on a large-scale Git service.

- **With over 30 years in software development, how have you seen version
  control systems evolve, and what makes Git stand out in this evolution?**
`
  I started using RCS on my Unix box for tracking the local version of files
  and avoiding bad surprises, and since then I’ve seen so many so-called
  revolutions of the version control that promised “the moon” but ended up
  creating yet another commercial silos. To name a few, consider
  [Rational ClearCase][clearcase] and [Perforce][perforce], and the legacy
  they have made for the software industry.

  In my experience, version control is the foundation of any Software
  Development Life Cycle (SDLC for short) and should always be thought of
  as an evolving technology: I don’t believe that Git is here to stay
  forever as-is, even though it would be difficult to imagine an
  Open-Source project starting today not using Git as version control.

  But if you roll back to the year 2000s, you could have swapped Microsoft
  with VA Software and Git with Subversion, and asked the same question:
  _`“What version control and hosting site should a new Open-Source project
  use?”_ I believe the answer would differ significantly from the one you
  have today [[ref][6]].

  What makes Git different from its predecessors is its adoption in
  large Open-Source projects unlikely to be discontinued any time soon,
  such as Linux and the Android OS project. With the advent of IoT and
  the extensive adoption of Android OS everywhere, from appliances to
  aerospace and automotive, Git version control has become responsible
  for powering the SDLC of most devices we use daily.

  A second factor that has brought Git to the world stage as the future
  of VCS is its ability to abstract from any vendor bias and be truly
  driven by only its user base: software developers. Git was invented
  by Linus Torvalds because he needed it, not because a company X wanted
  to disrupt the market of the existing version control system Y to
  achieve goal Z.

  A third factor is the growth of other Git-compatible version control
  systems, such as [JJ (aka Jujutsu)][7]. Git is, first of all, a data
  format for versioned directories and BLOBs and a protocol on how this
  data can be safely transferred between peers: no implementation-specific
  quirks, no vendor lock-ins, no silos, just data and protocol.
  This has led other developers, like [Martin Von Zweigbergk][martinvonz]
  (Senior Software Engineer @Google), to create version control systems
  on top of it, assuring interoperability with the existing code and
  innovation simultaneously.

  This is unprecedented and unique in the history of VCSs I have seen
  in my whole 30+ career as a Software Developer. Do I believe that
  Git will continue to exist in its current form in 25 years from
  now? No, I believe it will be very different in the future, but
  its foundations will remain the same, and I see many more
  evolutions similar to Martin’s JJ project.

- **You've been working on comparing Git reftable implementations
  with JGit alternatives. Could you walk us through what motivated
  this research and preview any interesting findings you've
  discovered?**

  Being the Gerrit Code Review release manager comes with many
  responsibilities, including verifying that whatever we release
  is production-ready and always better than what has ever been
  released. That also includes, first and foremost, the Git
  performance, following Shawn Pearce’s (Gerrit Code Review
  project founder, R.I.P.) mantra, “performance is a feature.”

  We have been working in Q1 of 2025 to release and certify
  [Gerrit v3.12][gerrit-3.12], which includes the latest and
  greatest of JGit’s implementation of reftable, which was
  available since 2019 but not used in Gerrit because of the
  lack of support from the C Git project. Some parts of Gerrit
  use the “C Git” implementation for some scripting side
  and replication; therefore, a Git repository with reftable
  would not have been compatible with Gerrit until Git v2.45,
  which was [released last year][8].

  In February 2024, at the time of the release of reftable
  support in Git v2.45, I was busy with my AI research work
  for [optimising Git performance][3], and I immediately
  thought that it was the right time to put JGit and C Git
  implementation of reftable in the arena and see how they
  interoperate and perform during heavy workload.

  The first finding was that reftable has an entirely different
  philosophy from any other ref storage used before by Git.
  Loose refs and packed refs are both based on the concept of
  file-level locking and caching. Both C Git and JGit ensure
  that every update is atomic by carefully creating and releasing
  ref-level or packed-refs-level lock files and using atomic
  filesystem updates to ensure that the concurrency of reads
  and updates does not impact the normal functionality of
  in-flight operations. JGit has a “wait for lock” mechanism
  where the in-flight operation would wait for the lock file
  to be released before acquiring the resource, with an exponential
  backoff mechanism on packed-refs, whilst C Git just fails the
  operation with a lock failure.

  Reftable is different because it is designed to be highly
  scalable and performant, compared to loose refs or packed-refs.
  To prioritise performance and low latency, reftable decides
  to give up thread safety and locking altogether, relying on an
  optimistic locking pattern. In a nutshell, whilst packed-refs
  blocks the file and waits until it is released, reftable allows
  multiple users to access the same data on disk and refer
  directly without locking. The operation is always safe because,
  unlike packed-refs and loose-refs, the reftable files are always
  immutable and therefore safe to be shared concurrently without
  any locks.

  What’s the catch? The concurrent updates of the same refs by
  two different threads or processes will want to update the
  list of reftables simultaneously. Whoever manages to perform
  the update is gaining the “logical lock” and will cause any
  other concurrent threads or processes to fail the whole
  transaction they may have prepared.

  Why is this different from loose-refs and packed-refs? The
  client interaction and compensation behaviour with a reftable
  needs to be substantially different: if with loose-refs or
  packed-refs the client was retrying the operation, or just
  waiting in case of JGit, with reftable the client should
  abort the whole logical operation, destroy the current
  snapshot of the reftable read in memory, and restart the
  whole transaction from scratch.

  The issue here is that the reftable is simply configured
  as a storage format for the refs, and the higher layers
  are currently unprepared to manage the difference in
  behaviour. This is currently causing trouble in the
  JGit world, with [some initial issues reported][9] at the
  API level, like the lack of “auto-refresh” and even more
  problematic [stability problems reported on Gerrit Code Review][10]
  when using reftable from concurrent threads.

  The $1M question about reftable is, *"Is it ready for mainstream
  use in production?”* My answer is obviously a bold yes, but with
  a very important caveat: whoever is using reftable should be aware
  of what it is and how it should be used, and cannot be simply used
  blindly, assuming that it works exactly as a loose-ref or
  packed-refs. Reftable is ready, Git and Gerrit Code Review aren’t
  ready yet to leverage it and I am sure they will soon be adjusted
  to get the best use of it.

- **What's your approach to load testing Git repositories \- which
  tools work best, what key metrics should organizations monitor,
  and what are some interesting findings from your research in
  this area?**

  At GerritForge, we’ve been investing a lot of time and effort
  in testing and improving the performance of Git repositories,
  as demonstrated by the recent research paper published on the
  use of AI to improve repository performance 100x times.

  Over the years, we have developed much experience, successfully
  using the [Gatling framework][11] and extending it to support
  the [Git protocol over HTTPS and SSH][12]. The use of Gatling
  is great because it allows us to create very comprehensive
  scenarios using a  DSL (domain-specific language), which is
  high-level and can replicate real-life user behaviour.
  Replicating real-life traffic is paramount when testing a Git
  repository performance because it allows creating future volumes
  in terms of length of delta-chains, number and distribution of
  refs, and number of packfiles / loose objects, that reflect the
  project lifecycle.

  Another key aspect of generating a workload against a Git repository
  is scaling up the clients and making their requests parametric enough
  to avoid different requests locking each other. With Gatling, you
  have the concept of “user sessions” where different logical users
  can have dynamic variables used in the Git requests that can be used
  for making the operation independent (e.g., branch name fragments,
  or tags) and avoiding them from failing or ending up in a deadlock.

  As part of [our research work][3], I managed to recreate 10 years
  of Git traffic generated by hundreds of users and execute it in
  just 12 hours, thanks to Gatling and the Git-Gatling plugin.

  An interesting finding from the research and experiments is that
  over 95% of the CPU time is spent in serving git-upload-pack
  commands (not really a surprise though), of which 90% of it is
  spent in [the “search-for-reuse” phase][13].

  A second interesting finding is that the presence of a bitmap,
  single or multi-pack, is not a guarantee of fast and effective
  Git operations: the quality of the bitmap also matters a lot.
  A bad bitmap could be so detrimental that removing it could
  make the Git repository much faster, which may sound
  counterintuitive.

- **Based on your testing, what improvements do you think are most
  needed in Git's core implementation?**

  I believe that the Git GC process needs a full revamp: the way
  it is designed today isn’t suitable for large repositories. I
  have presented a simple “role play” demo of what could happen
  to a large mono-repo when you are trying to resolve a production
  slowdown [running a Git GC][14]: in my imaginary scenario, a
  large team of developers is pushing a lot of changes to get the
  latest features through on their product’s mono-repo, not unlike
  what happens when a large developer conference is approaching
  and company ABC wants to launch a new version of their product DEF.
  The operation raises the main metrics of the repository and makes
  the “search-for-reuse” phase explode, causing the complete blockage
  of the CI/CD pipeline. The Git SCM Manager knows what to do … and
  runs a Git GC, causing even more damage than the original problem.

  I believe Git GC needs to be redesigned from the ground up.
  Instead of being a simple sequence of operations, it needs to be
  much more intelligent and adaptive to perform the right operation
  at the right time. This could also be *“do nothing”* as the CPU
  load is too high or the volatility of the repository is diverging.

- **How do you see the relationship between Git and JGit evolving
  in the future?**

  I believe Git and JGit have a wonderful symbiosis of ideas and
  code: many popular features in JGit ended up innovating and
  inspiring similar implementations in Git (e.g., bitmap,
  ref-table, just to name a couple). Also, the other way around
  is happening, with the implementation of MIDX in JGit recently
  merged, thanks to the collaboration of GerritForge and Google.

  I like Git because it makes the language absolutely irrelevant
  to the implementation: extending Git doesn’t mean you have to
  write C code, and you can always start a brand new Git functionality
  in a language XYZ in the future. Git is all about data and protocol
  specification, not language, code, or operating system.

  I believe that should remain the case, and I am looking forward to
  new languages implementing and innovating on Git, like the recent
  [Gitoxide project][15], a pure-native implementation in Rust.

- **If you could get a team of expert developers to work full-time
  on something in Git for a full year, what would it be?**

  I may repeat myself, but I would redesign the Git GC command from
  the ground up.

- **If you could remove something from Git without worrying about
  backwards compatibility, what would it be?**

  Well, I would get rid of SHA-1 altogether immediately, forget
  about the legacy, and force everyone to use SHA-256 … but
  change requires time.

- **What is one of your most favourite features of Git?**

  I thank all the Git developers every single day for the
  interactive rebase. I use it as my bread and butter every
  morning.

- **What is your favorite Git-related tool/library, outside of Git itself?**

  I am shamelessly admitting that I love Git command line and
  I do not feel I need anything else as a tool or library to
  interact with it. Many people find it confusing, and I agree
  that some syntax could be misleading. Nevertheless, it is worth
  using it, proposing changes, and improving how it works and is
  perceived by the developers.

  A tool that requires other tools is a symptom of a problem.

- **Could you brief a bit about one of your most memorable experience
  with Git?**

  As you haven’t mentioned if the experience should be positive or
  negative, I always mention the world-stage attention I got from
  force-pushing hundreds of Git repositories on the Jenkins CI
  organisation [over 12 years ago][16]. It was bad and good at
  the same time, because despite the panic caused in hundreds of
  Jenkins CI projects, it demonstrated that force pushing isn’t
  a destructive operation, and all the BLOBs were easily recovered,
  and the refs pointed again to the expected SHA1.

  Also, my unfortunate mistake highlighted the resilience of the
  Git repository model, where there isn’t a “single source of truth”
  and GitHub’s repository is just “one of the repositories peers”
  around the globe. You can always recover from any type of damage
  with Git, at least from what I’ve seen in my 15 years of
  contributing and using it with real-life large-scale repositories
  and customers.

- **What is your advice for people who want to start using Git?
  Where and how should they start?**

  This could have been a valid question 15 years ago, when Git was
  still “quite recent” and not widely adopted yet. Nowadays, Git is
  taught at school and universities and has become the de facto
  standard of any Open-Source project around the globe. I was also
  pleasantly surprised to learn that my 10-year-old son was
  introduced to Git by his Computer Science teacher at primary school.

- **There's a common conception that "Git is confusing". What are your
  thoughts about the same?**

  I believe the most confusing part of Git is the working copy and the
  staging area. That’s the reason why [JJ][7] gets rid of it altogether
  and introduces the concept of “unnamed” commit. That’s genius from
  Martin Von Zweigbergk, if you think about it: you just stage files
  because you’d like to create a commit. So the stage is the
  “next commit you’re about to write”, therefore the unnamed commit.

- **If there’s one tip you would like to share with other users of Git,
  what would it be?**

  Never use an IDE to manage your Git repository and commits: always
  stay in control of what happens and learn something every day by using
  the Git command line.

- **If there’s one tip you would like to share with other Git developers,
  what would it be?**

  I am not currently contributing to C Git, so my tip would be more for
  JGit developers instead. I would love to see more end-to-end JGit
  features and protocols testing using tools like [Gatling][11]
  and the [Git-Gatling plugin][12].

- **Anything else that you'd like to share with us?**

  In the future, I’d like to see Git become just one standard feature
  of each operating system: anyone should version a file on their
  system, regardless of whether that file is source code, a document,
  a video, or a drawing. Maybe it is not a random event that the father
  of Linux is also the creator of the Git version control system,
  isn’t it?

  Thanks for allowing me to share my experience with Git and my history
  of being a JGit contributor and committer.

[vonc]: https://git.github.io/rev_news/2023/12/31/edition-106/#community-spotlight-vonc
[torek]: https://git.github.io/rev_news/2025/02/28/edition-120/#community-spotlight-chris-torek
[clearcase]: https://en.wikipedia.org/wiki/IBM_DevOps_Code_ClearCase
[perforce]: https://www.perforce.com/
[martinvonz]: https://github.com/martinvonz
[gerrit-3.12]: https://www.gerritcodereview.com/3.12.html
[1]: https://gerrit.googlesource.com/plugins/multi-site/+/refs/heads/master/DESIGN.md
[2]: https://review.gerrithub.io/c/eclipse-jgit/jgit/+/3930
[3]: https://conf.researchr.org/home/icse-2025
[4]: https://gerrit.googlesource.com/plugins/high-availability
[5]: https://github.blog/news-insights/company-news/oct21-post-incident-analysis/
[6]: https://en.wikipedia.org/wiki/SourceForge
[7]: https://jj-vcs.github.io/jj/latest/
[8]: https://github.com/git/git/blob/master/Documentation/RelNotes/2.45.0.adoc
[9]: https://github.com/eclipse-jgit/jgit/issues/102
[10]: https://github.com/eclipse-jgit/jgit/issues/130
[11]: https://gatling.io/
[12]: https://docs.gatling.io/reference/script/third-parties/
[13]: https://github.com/eclipse-jgit/jgit/blob/46d0d1b40b147e4282043a6c404947166c71be93/org.eclipse.jgit/src/org/eclipse/jgit/internal/storage/pack/PackWriter.java#L1452
[14]: https://youtu.be/xhxrGxvChU0?t=395
[15]: https://github.com/GitoxideLabs/gitoxide
[16]: https://www.infoq.com/news/2013/11/use-the-force/


## Other News

__Various__


__Light reading__
+ [How to Install Gitea (with SQLite3 and HTTPS!) on a VPS](https://www.git-tower.com/blog/how-to-install-gitea)

<!---
__Easy watching__
-->

__Git tools and sites__


## Releases

+ Git [2.50.0](https://public-inbox.org/git/xmqq1prj1umb.fsf@gitster.g/),
[2.50.0-rc2](https://public-inbox.org/git/xmqqfrg8surr.fsf@gitster.g/),
[2.50.0-rc1](https://public-inbox.org/git/xmqqsekgn4gk.fsf@gitster.g/)
+ Git for Windows [2.50.0.windows.1](https://github.com/git-for-windows/git/releases/tag/v2.50.0.windows.1),
[2.50.0-rc2.windows.1 (pre-release)](https://github.com/git-for-windows/git/releases/tag/v2.50.0-rc2.windows.1),
[2.50.0-rc1.windows.1 (pre-release)](https://github.com/git-for-windows/git/releases/tag/v2.50.0-rc1.windows.1),
[2.50.0-rc0.windows.1 (pre-release)](https://github.com/git-for-windows/git/releases/tag/v2.50.0-rc0.windows.1)
+ libgit2 [1.9.1](https://github.com/libgit2/libgit2/releases/tag/v1.9.1)
+ GitLab [18.1.1, 18.0.3, 17.11.5](https://about.gitlab.com/releases/2025/06/25/patch-release-gitlab-18-1-1-released/),
[18.1](https://about.gitlab.com/releases/2025/06/19/gitlab-18-1-released/),
[18.0.2, 17.11.4, 17.10.8](https://about.gitlab.com/releases/2025/06/11/patch-release-gitlab-18-0-2-released/)
+ GitHub Enterprise [3.17.1](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.1),
[3.16.4](https://docs.github.com/enterprise-server@3.16/admin/release-notes#3.16.4),
[3.15.8](https://docs.github.com/enterprise-server@3.15/admin/release-notes#3.15.8),
[3.14.13](https://docs.github.com/enterprise-server@3.14/admin/release-notes#3.14.13),
[3.13.16](https://docs.github.com/enterprise-server@3.13/admin/release-notes#3.13.16),
[3.17.0](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.0)
+ GitKraken [11.2.0](https://help.gitkraken.com/gitkraken-client/current/),
[11.1.1](https://help.gitkraken.com/gitkraken-client/current/),
[11.1.0](https://help.gitkraken.com/gitkraken-client/current/),
[11.0.0](https://help.gitkraken.com/gitkraken-client/current/)
+ GitHub Desktop [3.5.0](https://desktop.github.com/release-notes/),
[3.4.21](https://desktop.github.com/release-notes/)
+ GitButler [0.14.35](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.14.35),
[0.14.34](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.14.34)
+ Tower for Mac [13](https://www.git-tower.com/release-notes/mac) - [Release Blog Post](https://www.git-tower.com/blog/posts/tower-mac-13) / [YouTube video](https://youtu.be/2hjLn9mq9fY)
+ Tower for Windows [9.1](https://www.git-tower.com/beta/windows) (Beta) - [Release Blog Post](https://www.git-tower.com/blog/posts/tower-windows-91)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
