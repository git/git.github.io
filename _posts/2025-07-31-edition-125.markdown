---
title: Git Rev News Edition 125 (July 31st, 2025)
layout: default
date: 2025-07-31 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 125 (July 31st, 2025)

Welcome to the 125th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of June and July 2025.

## Discussions


### General

* 20 years ago: [Meet the new maintainer..](https://lore.kernel.org/git/Pine.LNX.4.58.0507262004320.3227@g5.osdl.org/)

  On July 26 2005, so 20 years ago, Linus Torvalds announced on
  the mailing list that Junio Hamano accepted the maintainership of
  the Git project and that Junio "was the obvious choice". Linus said
  he wasn't dropping Git but he just preferred working on it as a
  contributor.

  Junio replied with an [A note from the new GIT maintainer](https://lore.kernel.org/git/7vmzo8ss2l.fsf@assigned-by-dhcp.cox.net/)
  email where he acknowledged his new role as Git maintainer, thanked
  the community for their support and collaboration, and promised to
  take a more careful and deliberate approach in shepherding the
  project. He also said he would post his own patches to the mailing
  list for review before including them in the repository, and
  encouraged community feedback.

* [[ANNOUNCE] Git Mini Summit at Open Source Summit Europe, Amsterdam, August 28th](https://lore.kernel.org/git/aGwHt9HCd86hVuKh@pks.im/)

  Patrick Steinhardt announced a Git Mini Summit co-located with the
  [Open Source Summit Europe](https://events.linuxfoundation.org/open-source-summit-europe/)
  in Amsterdam on August 28th 2025.

  There will be lightning talks and some time for people to
  connect. Proposals for the lightning talks should be sent to
  Patrick, while the possibility to have remote talks is still
  investigated.

  [Registration is open](https://events.linuxfoundation.org/open-source-summit-europe/features/co-located-events/#git-mini-summit-2025)
  for both the Git Mini Summit only and for the Open Source Summit Europe including the Git Mini Summit.


### Reviews

* [[PATCH v4 0/3] send-email: add oauth2 support and fix outlook breaking threads](https://lore.kernel.org/git/PN3PR01MB9597A83D537E3AE96144227EB8BA2@PN3PR01MB9597.INDPRD01.PROD.OUTLOOK.COM/)

  Last April, Aditya Garg sent a patch series containing three main
  changes to `git send-email`. He mentioned that he was sending the
  email series using the very patches he was proposing, via Outlook.

  The first patch was a rebased version of
  [an earlier patch by Julian Swagemakers](https://lore.kernel.org/git/20250125190131.48717-1-julian@swagemakers.org/)
  adding support for OAuth2 authentication, which started to be
  required by Microsoft. Julian's patch unfortunately had been waiting
  for review for over a year before Aditya picked it up.

  The second patch fixed thread breaking caused by Outlook's
  proprietary Message-ID handling.

  The final patch added a new option for generating passwords, such as
  OAuth2 tokens, via an external script.

  Junio Hamano, the Git maintainer, reviewed the three patches saying
  he liked the commit messages, documentation and code comments even
  though he suggested a few small style improvements to the code
  style plus a number of grammar and formatting changes to the
  documentation.

  He also asked for reviews from others as he said he was not familiar
  with the `Authen::SASL` library.

  Aditya replied to Junio's review acknowledging the need for more
  reviews and saying that OAuth2 was a significant and more secure
  technology. He then took the initiative to Cc Greg Kroah-Hartman,
  who wrote a precursor of `git send-email` for the Linux kernel.

  M Hickford also replied to Aditya expressing enthusiasm for the work
  but wondering why the v4 version of the patch series was sent in a
  new email thread rather than as a reply to the previous version.

  brian m. carlson commented on the second patch saying that replacing
  message IDs like Outlook does is technically allowed by
  standards. They raised concerns about hardcoding only two Outlook
  server hostnames, and suggested adding configuration options for
  Message-ID generation modes.

  Julian Swagemakers then pointed out that the goal of the third patch
  could already be achieved using Git's existing custom credential
  helper mechanism. Aditya confirmed this worked and said he was
  unaware of this feature, which led to the decision to drop the third
  patch. Recognizing that the existing feature was poorly
  discoverable, the discussion led to improvements in Git's
  documentation, adding clearer examples of using credential helpers
  for OAuth2 tokens.

  Erik Huelsmann, the maintainer of the `Authen::SASL` Perl module,
  joined the conversation after Aditya emailed him directly
  referencing a GitHub issue about the lack of OAuth2 support in
  `Authen::SASL`. In that issue Erik had
  [commented that he would be happy to support XOAUTH2](https://github.com/gbarr/perl-authen-sasl/issues/18#issuecomment-2453040190),
  but needed a patch and a way to test it.

  Aditya and Julian then worked together, with guidance from Erik, to
  add the necessary XOAUTH2 and OAUTHBEARER support directly into
  `Authen::SASL`. Shortly after, a new version of the `Authen::SASL`
  module was officially released with this new functionality. This
  successful collaboration meant the first patch in the series, which
  was a workaround for the missing library support, was no longer
  needed and was subsequently dropped. Instead, the new version of
  `Authen::SASL` started to benefit all Perl users.

  Greg Kroah-Hartman echoed what brian had suggested about using a
  configurable solution in the second patch. Greg noted that the
  initial approach would not cover company-hosted Outlook servers. Yao
  Zi also contributed to this discussion, noting that Tencent's mail
  service had similar issues, further reinforcing the need for a
  flexible solution beyond just hardcoding specific server names.

  That suggestion was then refined by Junio Hamano, who proposed a
  concrete implementation for the new option by providing an example
  patch. The final `--[no-]outlook-id-fix` option auto-detects known
  Outlook servers but allows manual override for other deployments.

  After several iterations on its name and behavior, with Eric
  Sunshine helping refine the user-facing documentation, Aditya
  submitted a final, simplified patch series (v6). It now contained
  only the single, refined patch to fix Outlook thread breaking, with
  the other two patches having been made obsolete by the
  `Authen::SASL` library update and the use of existing Git features.

  Aditya's patch was merged and released as part of Git v2.50.0.

<!---
### Support
-->

## Developer Spotlight: Usman Akinyemi

_Editor’s note: This edition features a retrospective interview with a
contributor who contributed to Git through a mentoring program. We hope
the reflections shared by the Outreachy contributor will provide an
insightful perspective that benefits the community. As always, we
welcome your thoughts and feedback!_

* **Who are you and what do you do?**

  I’m Usman Akinyemi, a final-year CS and AI student, and an open-source
  contributor passionate about Linux, distributed systems, and developer
  tools. I’ve contributed to core projects like Git, systemd, LLVM, and
  LibreOffice. During [my Outreachy internship](https://uniqueusman.hashnode.dev/my-outreachy-internship-experience-at-git),
  I improved Git’s v2 protocol by adding OS-level metadata for better
  diagnostics and security.

  Currently, I’m a [Google Summer of Code contributor](https://summerofcode.withgoogle.com/programs/2025/projects/wBCitF8F)
  building a containerized pipeline for medical imaging using Kaapana,
  Kubernetes and Airflow. I am also currently working on creating a
  new subtype for RISC-V assembly instructions through the
  Linux Foundation’s LFX program.

  Outside code, I mentor new contributors, volunteer with DesignIT and
  LEAD and CODE to teach digital skills, and organize a tech webinar for
  Nigerian students. I’ll be [speaking at Git Merge 2025](https://git-merge.com/#usman-akinyemi),
  sharing insights from my open-source journey. I believe in the power of
  community, collaboration, and curiosity to build a career that crosses
  borders.

* **How did you initially become interested in contributing to Git,
  and what motivated you to choose it as your Outreachy project?**

  Though I have been contributing to other projects before applying for
  Outreachy (Dec 2024), I was just a user of the Git project. When it
  comes to the Outreachy contribution period when I had to pick a
  project, I picked both Git and LibreOffice. I picked Git as it is a
  project I use every time, also the thought of contributing to a
  project used by almost all the developers in the whole world was
  definitely a dream coming true. To also maximize my getting selected
  for Outreachy, I picked Git because it is written in C,
  which many other participants are always scared to pick (going for the
  hard thing). The story did not end there as I got selected for both
  LibreOffice and Git and I had to choose one as my Outreachy projects.
  It was a hard decision but I picked it mainly because the Git
  community is a community where it is so easy to communicate with other
  team members, and it is a community where I clearly know who is who and
  what they do in the community. Also Git is more well recognised.

* **How do you feel your contribution has impacted the Git community
  or the broader open source ecosystem?**

  [My contribution](https://lore.kernel.org/git/20250215155130.1756934-1-usmanakinyemi202@gmail.com/)
  makes a fundamental improvement to the Git v2 protocol by enabling
  Git clients to share their operating system information via the user
  agent string. This helps platforms like GitHub, GitLab, and others
  gain visibility into which OS environments are interacting
  with their servers. It significantly improves debugging, security
  auditing, and telemetry, helping maintainers understand usage patterns
  and tailor support or upgrade strategies accordingly. Since this
  change is part of the core Git client, it means it is used by all Git
  users. I’m proud to have contributed something with such
  wide-reaching, foundational impact.

* **Is there any aspect of Git that you now see differently after
  having contributed to it?**

  Before contributing to Git, I saw it as a complex tool that "just
  works". Although I knew Git was different from GitHub, I struggled to
  clearly differentiate between the two. But after contributing, I could
  clearly differentiate between the two and I now see Git as a carefully
  designed software project with a strong emphasis on performance,
  cross-platform compatibility, and community-driven development.

  I’ve come to appreciate the level of thought and care that goes into
  every change, from writing clean patches and commit messages to
  engaging in technical discussions and defending your design decisions.

  Contributing to Git isn’t also about hierarchical review; instead,
  it’s a collaborative process where every contributor is expected to
  take full ownership of their patches, understand the problem they are
  trying to fix, the solution and explain their rationale clearly by
  writing clean patches, commit messages and engaging in technical
  discussions and defending your design decisions. In fact, there have
  been moments when some of my contributions led to insights even long
  time contributors hadn’t considered, including Junio Hamano. That
  boosted my confidence not just in contributing to Git, but to other
  software projects as well, i.e., I can get my patches accepted anywhere,
  I just need to convince others that it actually solves a problem.

* **How do you balance your contributions with other responsibilities
  like work or school?**

  Seriously, it has not been easy, most of my contributions to all
  open source projects have always been during college. But, I have sort
  of made contributions to open source as one important aspect of my
  life and also as a way to learn new technologies and also practice
  whatever new skills I learnt. Contributing to projects millions of
  people use is also definitely rewarding and satisfying.

* **Can you share how Outreachy helped enhance your technical and
  non-technical skills (like communication, project management, etc.)?**

  Technically, I have been able to improve my C programming and bash
  scripting skills. Also reading and understanding very large codebases
  like Git. Of course now I can call myself an expert in using Git as a
  tool itself.

  To contribute to Git, you must be able to communicate well, as all the
  Git workflows happen remotely and over mailing lists. Most of the time
  in the Git community it is not about the correctness of your code -- it
  is about how well you can communicate your rationale to the community
  before your patches can be accepted. So, over time, as a Git
  contributor, my communication skills in a technical environment have
  really improved.

  I have also learnt to write clean code, organize my changes into well
  formatted patches, and write clear commit messages.

* **What was your biggest takeaway or learning from Outreachy that
  you now apply regularly in your work?**

  I’d say my biggest takeaway from Outreachy is learning how to write
  clear, structured commit messages. Git commits, like those in the
  Linux kernel, follow a thoughtful format: describe the current state,
  the problem, and the fix. From reading most of the commit messages in
  Git, you would have understood and been able to visualize what the changes
  will look like. It also makes it easy to track the changes to other
  prerequisite commits. I have been using the Git commit messages format
  in other projects and I really love it.

* **What was the biggest challenge you faced during your contributions
  to Git, and how did you overcome it?**

  I think the challenge which I initially faced is sending patches to
  Git, not really a big challenge though as I was able to make my first
  patch in a few days after joining the community. And the reason is
  that Git does not use GitHub or GitLab, something someone would have
  thought they will be using. Git uses a mailing list just like the
  Linux kernel. While writing this, I remember that I had a challenge
  retrieving patches from the mailing list as my project depended on some
  patches that were sent by my mentor previously. I had to use `git am`,
  something I never used before.  Help from my mentor really helped,
  as well as reading through the "[Hacking Git](https://git.github.io/Hacking-Git/)"
  page.

* **Have you thought about mentoring new GSoC / Outreachy students?**

  Yeah, I am planning to put in as a mentor for the coming Outreachy
  period and hopefully for GSoC also. I will be starting as a co-mentor
  though.

* **If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?**

  Smile, I will definitely say the Rustication of some parts of Git
  which has been going on currently, I think one that has already been
  integrated to Git is [libgit-rs](https://lore.kernel.org/git/cover.1738187176.git.steadmon@google.com/).
  Rust seems to be a language that focuses more on safety/security,
  and safety/security is very important in Git. I am also a Rustacean
  so I should be able to help hopefully if that happens.

* **If you could remove something from Git without worrying about
  backwards compatibility, what would it be?**

  I really do not have anything in mind for now.

* **What upcoming features or changes in Git are you particularly
  excited about?**

  I think it is one of the [GSoC projects by Lucas](https://summerofcode.withgoogle.com/programs/2025/projects/fGgMYHwl).
  I have been passively following the project. It is about introducing
  a new Git sub-command (currently intended to be called `git repo-info`)
  that will centralize data currently retrieved by `git rev-parse` in a
  JSON format.

* **What is your favorite Git-related tool/library, outside of Git
  itself?**

  I think it's both GitHub and GitLab -- if I have to choose one, I will say GitHub.

* **What is your toolbox for interacting with the mailing list and for
  development of Git?**

  I started with [GitGitGadget](https://gitgitgadget.github.io/) initially
  just to get my patches to the mailing list faster but, along the line
  I switched to `git send-email` and really, it is more flexible and easy
  to use than I thought of it. For my machine, I basically use Arch Linux
  and Neovim as my text editor.

* **How do you envision your own involvement with Git or other open
  source projects in the future?**

  As I said earlier, open source has really been part of my life and it
  has really helped me a lot in improving my skills, meeting new people
  and even making some few bucks through internships. After my
  internship at Outreachy, I did send patches to the Git community and I
  planned to keep doing that. After Outreachy, I have contributed to a
  few other projects like RISC-V and OSIPI (through GSoC). I currently
  mentor people who want to start their open source journey, and I plan
  to do more of it. I planned to keep contributing to open source
  projects and hopefully get a job in open source.

* **What is your advice for people who want to start Git development?
  Where and how should they start?**

  I have been in many open source projects and see how their workflows
  are, I will definitely say Git is one of the easiest and most
  interesting projects to contribute to. The community members are
  really supportive. Seriously, it is one of the best open source
  communities I have been to. The best place to start is going through
  the "[Hacking Git](https://git.github.io/Hacking-Git/)" page. It has
  all the information on how to start contributing and you can make
  your first contribution to Git. You should generally start with a
  microproject which aims to introduce you to the Git contribution
  workflow. Everything can be found above. Making your first contribution
  to Git is actually very much easier than you might have thought.
  Also, do not be scared to ask for help, Git developers are always ready to render help.

* **Would you recommend other students or contributors to participate in
  the GSoC, Outreachy or other mentoring programs, working on Git?
  Why? Do you have advice for them?**

  Definitely, Outreachy and GSoC are very much interesting mentoring
  programs to start your open source journey. They both really make it
  easy to start contributing to open source. You get assigned to mentors
  who are experts in open source and the organization. It is a way to get
  skills you will never be able to get in your classroom and skills
  needed to thrive and excel in the software engineering world. Apart
  from skills, it is a way to have proof of work before graduation and
  also gain global recognition. As I have said, Git is a well known and
  recognized software project in the whole world, contributing to it is
  an achievement on its own.

  _Shout session_

  I would like to shout out to all Git contributors, you are doing a
  great job! I would also like to shout out to my Outreachy mentor
  Christian Couder, he was really supportive during my Outreachy
  program! Thanks to the Git Rev teams also!


## Other News

__Various__

+ [[LWN.net] A set of Git security-fix releases](https://lwn.net/Articles/1029182/)
  by Jonathan Corbet on LWN\.net, and<br>
  [Multiple vulnerabilities fixed in Git](https://www.openwall.com/lists/oss-security/2025/07/08/4)
  by Taylor Blau on oss-security mailing list.
+ [[ANNOUNCE] Git v2.50.1 and friends](https://public-inbox.org/git/xmqqzfdevcov.fsf@gitster.g/t/#u)
  by Junio C Hamano on the Git mailing list.
+ [Launchpad](https://launchpad.net/) is [phasing out Bazaar code hosting](https://discourse.ubuntu.com/t/phasing-out-bazaar-code-hosting/62189).
  This post provides a link to the [Migrate a Repository From Bazaar to Git](https://jugmac00.github.io/blog/migrate-a-repository-from-bazaar-to-git/) article.


__Light reading__

+ [Artisanal Handcrafted Git Repositories](https://drew.silcock.dev/blog/artisanal-git/)
  by Drew Silcock on drew's dev blog.
  This article talks about how to handmake your Git repositories without using `git` commands.
  You might also learn a bit more about how Git works under the hood during the process.
+ [How to use git worktree effectively with Python projects](https://www.andreagrandi.it/posts/how-to-use-git-worktree-effectively-with-python-projects/)
  (with the help of a simple [git-add-worktree.sh](https://gist.github.com/andreagrandi/542b438bf0017d93aff2b640037e3ce1) Bash script)
  by Andrea Grandi on his blog.
+ [Managing Multiple Claude Code Sessions Without Worktrees](https://blog.gitbutler.com/parallel-claude-code/)
  by Scott Chacon on Butler's Log (GitButler Blog).
  With [Claude Code](https://www.anthropic.com/claude-code)'s new [lifecycle hooks](https://docs.anthropic.com/en/docs/claude-code/hooks),
  [GitButler](https://gitbutler.com/) Git client auto-sorts simultaneous AI coding into separate branches,
  without manual [use of `git worktree`](https://www.anthropic.com/engineering/claude-code-best-practices#c-use-git-worktrees).
  With this feature you can write three features, and get three clean branches.
+ [wtp: A Better Git Worktree CLI Tool](https://dev.to/satococoa/wtp-a-better-git-worktree-cli-tool-4i8l)
  by Satoshi Ebisawa on DEV\.to.
  The [wtp](https://github.com/satococoa/wtp) tool was created to make
  working with multiple tasks in parallel using [Claude Code](https://www.anthropic.com/claude-code)
  easier than with `git worktree`.
+ [Automated repo maintenance via GitHub Copilot coding agent](https://blog.pamelafox.org/2025/07/automated-repo-maintenance-with-github.html)
  by Pamela Fox on her Blogger-based blog.
+ [Git Worktrees: Git Done Right](https://www.nickyt.co/blog/git-worktrees-git-done-right-2p7f/)
  by Nick Taylor on Just Some Dev blog (and also [on DEV\.to](https://dev.to/nickytonline/git-worktrees-git-done-right-2p7f)).
+ [I Lost My Git Stash, So I Built a Tool (VS Code Extension) to Share It](https://dev.to/karandeepsingh7070/i-lost-my-git-stash-so-i-built-a-tool-to-share-it-27bn)
  by Karandeep Singh on DEV\.to.
+ [Git: share a full repository as a file with `git fast-export`](https://adamj.eu/tech/2025/07/15/git-share-fast-export/)
  by Adam Johnson on his blog
  (for some reason the post does not mention the alternative of using
  [`git bundle`](https://git-scm.com/docs/git-bundle)).
    + Adam Johnson is the author of "[Boost Your Git DX](https://adamchainz.gumroad.com/l/bygdx)" book,
	  first mentioned in [Git Rev News Edition #104](https://git.github.io/rev_news/2023/10/31/edition-104/),
	  then its updates in [#110](https://git.github.io/rev_news/2024/04/30/edition-110/)
	  and [#119](https://git.github.io/rev_news/2025/01/31/edition-119/).
+ [Conventional Commits makes me sad](https://srazkvt.codeberg.page/posts/2025-07-06-conventional-commits-makes-me-sad.html)
  by Sarah Mathey on her Codeberg Pages powered Sarah's Website blog.<br>
  The [Conventional Commits](https://www.conventionalcommits.org/) specification
  was first mentioned in [Git Rev News Edition #52](https://git.github.io/rev_news/2019/06/28/edition-52/).
+ [Git experts should try Jujutsu](https://pksunkara.com/thoughts/git-experts-should-try-jujutsu/)
  by Pavan Sunkara on his personal blog.<br>
  [Jujutsu (`jj`)](https://github.com/martinvonz/jj) is a version control system
  first mentioned in [Git Rev News Edition #85](https://git.github.io/rev_news/2022/03/31/edition-85/).
+ [Jujutsu For Busy Devs](https://maddie.wtf/posts/2025-07-21-jujutsu-for-busy-devs) and
  by Madeleine Mortensen on her personal blog.
+ [Using Radicle CI for Development](https://radicle.xyz/2025/07/23/using-radicle-ci-for-development)
  by Lars Wirzenius on Radicle Blog.<br>
  [Radicle](https://radicle.xyz/) is the distributed git hosting system,
  first mentioned in [Git Rev News Edition #49](https://git.github.io/rev_news/2019/03/20/edition-49/).
+ [Cutting GitHub out of the loop](https://www.circusscientist.com/2025/07/23/cutting-github-out-of-the-loop/)
  (by deploying to a VPS with Git and SSH).
  Written by tomjuggler on The Circus Scientist Site.
+ [Super Easy* 2-Stage Git Deployment](https://ratfactor.com/cards/super-easy-2-stage-git-deployment)
  by Dave Gauer on Dave's Virtual Box of Cards.
+ [Guest Post: How I Scanned all of GitHub’s “Oops Commits” for Leaked Secrets](https://trufflesecurity.com/blog/guest-post-how-i-scanned-all-of-github-s-oops-commits-for-leaked-secrets)
  by Sharon Brizinov on The Dig, the Truffle Security blog.
+ [Top 17 Essential Git Tools for Enhanced Developer Productivity](https://dev.to/vaib/top-17-essential-git-tools-for-enhanced-developer-productivity-7f3)
  by vAlber on DEV\.to.


<!---
__Easy watching__
-->

__Git tools and sites__

+ [DiffX - Next-Generation Extensible Diff Format](https://diffx.org/):
  describes problem with Unified Diff format, and proposes as a solution
  a new file format specification for Extensible Diffs,
  fully backwards-compatible with existing tools,
  while also being future-proof and remaining human-readable.
+ [git-phoenix](https://github.com/yaitskov/git-phoenix) is a command line tool
  that does repository recovery after accidental removal or file system failure,
  using [photorec](https://www.cgsecurity.org/wiki/PhotoRec) (or similar tool).
  Written in Haskell, under 3-clause BSD license.
+ [wtp (Worktree Plus)](https://github.com/satococoa/wtp) is a Git worktree management tool
  that extends git's worktree functionality with
  automated setup, branch tracking, and project-specific hooks.
  Written in Go, under the MIT license.
+ [GitNifty](https://gitnifty.js.org/index.html) is a robust and promise-based Git utility for Node.js,
  offering developers smart, automation-ready commands for common Git operations.
  Created for building CLI tools, automation scripts, or custom Git workflows.
  Written in TypeScript, and released under the Apache License.
+ [difit](https://github.com/yoshiko-pg/difit) is a CLI tool
  that lets you view and review local git diffs with a GitHub-style viewer
  (in a browser).  Written in TypeScript, under MIT license.<br>
  See [difit: Preview GitHub-like diffs locally before you push](https://dev.to/unhappychoice/difit-preview-github-like-diffs-locally-before-you-push-37gc)
  by Yuji Ueki on DEV\.to.
+ [Flint](https://flintable.com/docs/flint/) is a Git-integrated code formatter
  that lets each developer work in their preferred style locally,
  while maintaining a consistent style remotely.
  By automatically applying “local” and “remote” formatting passes during pull and push operations,
  Flint prevents formatting noise in commits and code reviews.
  It is currently in _alpha_ and is available exclusively on npm.
  Written in Bash, under MIT license.
+ [DotProj](https://dotproj.ac-jr.com/) is a developer-centric CLI tool
  designed to manage project-specific configuration files with Git versioning.
  It helps keep your development environment settings organized, versioned, and synchronized
  across multiple machines and projects.
  DotProj uses Git commands (commit, push, pull, clone) making it intuitive for developers.
  Written as a Bash shell script, under MIT license.
+ [git-remote-sqlite](https://github.com/chrislloyd/git-remote-sqlite)
  is a [Git protocol helper](https://git-scm.com/docs/gitremote-helpers)
  that helps you store a Git repository in a SQLite database.
  Written in Zig, under MIT license.
+ [Backlog.md](https://backlog.md/) is a tool that turns any folder with a Git repo
  into a self-contained project board, powered by plain Markdown files
  and a zero-config CLI.  Written in TypeScript, under MIT license.  AI ready.
+ [git-resolve.sh](https://elixir.bootlin.com/linux/v6.16-rc3/source/scripts/git-resolve.sh)
  is a Bash script that resolves a short git commit ID to its full SHA-1 hash,
  which is particularly useful for fixing references in commit messages.
  Under GPL-2.0 license.
+ [GitHub Trends](https://www.githubtrends.io/) is a service that
  uses the GitHub API to bring you insightful metrics on your contributions,
  broken by repository and language.
+ [DeepWiki](https://deepwiki.com/): AI-generated docs for any repo.
  This service turns any public GitHub repo into up-to-date documentation you can talk to
  (see for example [DeepWiki: git/git](https://deepwiki.com/git/git).
  DeepWiki is the free public version of [Devin Wiki](https://docs.devin.ai/work-with-devin/devin-wiki) and [Devin Search](https://docs.devin.ai/work-with-devin/devin-search).<br>
  There are a few similar projects, like
  [Open Source DeepWiki](https://github.com/AsyncFuncAI/deepwiki-open) and
  [OpenDeepWiki](https://github.com/AIDotNet/OpenDeepWiki).
+ [GitHub Repository Maintenance Agent](https://github.com/pamelafox/github-repo-maintainer-agent/)
  is an AI-powered agent for triaging failed [Dependabot](https://docs.github.com/en/code-security/getting-started/dependabot-quickstart-guide) pull requests
  across one's GitHub repositories. The agent uses [Pydantic AI](https://ai.pydantic.dev/)
  for LLM-based decisions and the GitHub API for repository, PR, and issue management.
  Written in Python, under MIT license.
+ [tangled](https://tangled.sh/) is a new social-enabled git collaboration platform
  built on the [AT Protocol](https://atproto.com/) (that powers the Bluesky social network).
  Written in Go, under MIT license; note that it is in alpha stage of development.<br>
  Compare with:
    + [Radicle](https://radicle.xyz/), a peer-to-peer, local-first code collaboration stack built on Git
	  (first mentioned in [Git Rev News Edition #49](https://git.github.io/rev_news/2019/03/20/edition-49/)).
	+ [ForgeFed](https://forgefed.org/) (formerly GitPub), a federation protocol for software forges
	  (first mentioned in [Git Rev News Edition #69](https://git.github.io/rev_news/2020/11/27/edition-69/)).
    + [`git-ssb`](https://scuttlebot.io/apis/community/git-ssb.html)
      (see the [git-ssb-intro](https://github.com/hackergrrl/git-ssb-intro) guide), a
      decentralized Git repo hosting and issue tracking on [Secure-ScuttleButt (SSB)](https://www.scuttlebutt.nz/)
      (first mentioned in [Git Rev News Edition #26](https://git.github.io/rev_news/2017/04/19/edition-26/).
	+ [gitstr (`git str`)](https://github.com/fiatjaf/gitstr),
	  a tool to send and receive Git patches
      over [Nostr](https://nostr.com/), using [NIP-34](https://github.com/nostr-protocol/nips/pull/997)
      (first mentioned in [Git Rev News Edition #109](https://git.github.io/rev_news/2024/03/31/edition-109/)).
+ [Git With Me](https://sr.ht/~meejah/git-withme/) is a tool for
  peer-to-peer, encrypted, ephemeral Git collaboration.
  `git withme` provides a way for a single host to invite numerous peers
   with short, one-time secure codes. The peers connect directly via
   [Dilated Magic Wormhole channels](https://meejah.ca/blog/fow-wormhole-forward),
   allowing collaborators to `git clone git://localhost/<repo-name>`.
+ [Radicle Desktop](https://desktop.radicle.xyz/) is a desktop application
  that lets you interact with [Radicle](https://radicle.xyz/),
  a peer-to-peer code collaboration and publishing stack.
  Written in TypeScript for Node.js and Rust, using the Tauri framework.
  Under GPLv3 license.
+ [GitBug: Git Learning Simulator](https://github.com/dvig14/gitbug)
  is a CLI app that teaches Git through hands-on bug fixing.
  It uses a realistic merge conflict scenario with visual feedback at every step.
  The goal of the app is to help you learn by doing, not just reading.
  Written in Python, under MIT license, in early stage (alpha).<br>
  Compare with:
    + [Learn Git Branching](https://learngitbranching.js.org/),
      mentioned first in [Git Rev News Edition #30](https://git.github.io/rev_news/2017/08/16/edition-30/).
    + [Git Gud](https://nic-hartley.github.io/git-gud/), a visual web-based Git simulator,
      meant to help understand Git better, announced by its author Nic Hartley in
      [Git Gud at git](https://dev.to/nichartley/git-gud-at-git-5d9k).
      First mentioned in [Git Rev News Edition #48](https://git.github.io/rev_news/2019/02/27/edition-48/).
    + [Git Gud](https://github.com/benthayer/git-gud), a command line game
      designed to help you learn how to use the Git version control system.
      Written in Python by Ben Thayer. First mentioned in
      [Git Rev News Edition #72](https://git.github.io/rev_news/2021/02/27/edition-72/).
    + [Oh My Git!](https://ohmygit.org/), an open source game about learning Git,
      written using the Godot game engine ([source](https://github.com/git-learning-game/oh-my-git)).
      There was a lightning talk about this game at FOSDEM 2021:
      [Building a Git learning game: A playful approach to version control](https://fosdem.org/2021/schedule/event/git_learning_game/).
      First mentioned in [Git Rev News Edition #72](https://git.github.io/rev_news/2021/02/27/edition-72/).
    + [Git-Sim](https://github.com/initialcommit-com/git-sim) tool (written in Python)
      to visually simulate Git operations in your own repos with a single terminal command.
      Described in [Git-Sim: Visually Simulate Git Operations In Your Own Repos](https://initialcommit.com/blog/git-sim)
      (mentioned in [Git Rev News Edition #95](https://git.github.io/rev_news/2023/01/31/edition-95/))
      and [Git-Sim 3 Month Dev Update: Community Response, New Features, & The Future](https://initialcommit.com/blog/git-sim-3-month-dev-update)
      (mentioned in [Edition #98](https://git.github.io/rev_news/2023/04/30/edition-98/)).
    + [Visualize Git](http://git-school.github.io/visualizing-git/) web app
	  that illustrates what's going on under the hood when you use common Git operations,
	  first mentioned in [Git Rev News Edition #107](https://git.github.io/rev_news/2024/01/31/edition-107/).
    + [Devlands](https://devlands.com/), which is the game that creates
	  immersive experience to help learning Git.
	  First mentioned in [Git Rev News Edition #122](https://git.github.io/rev_news/2025/04/30/edition-122/).
+ [Ferriby](https://github.com/dawedawe/ferriby) is a CLI game
  where you try to keep Ferrises alive and happy
  by feeding them commits in your repositories.
  Written in Rust, under MIT license.
+ [Pride Versioning](https://pridever.org/),
  a [joking take](https://mastodon.online/@nikitonsky/113691789641950263)
  on [Semantic Versioning (SemVer)](https://semver.org/).


## Releases

+ Git [2.50.1 and friends](https://lore.kernel.org/git/xmqq5xg2wrd1.fsf@gitster.g/)
+ Git for Windows [2.50.1(1)](https://github.com/git-for-windows/git/releases/tag/v2.50.1.windows.1),
[2.50.0(2)](https://github.com/git-for-windows/git/releases/tag/v2.50.0.windows.2),
[2.49.1](https://github.com/git-for-windows/git/releases/tag/v2.49.1.windows.1)
+ GitHub Enterprise [3.17.4](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.4),
[3.16.7](https://docs.github.com/enterprise-server@3.16/admin/release-notes#3.16.7),
[3.15.11](https://docs.github.com/enterprise-server@3.15/admin/release-notes#3.15.11),
[3.14.16](https://docs.github.com/enterprise-server@3.14/admin/release-notes#3.14.16),
[3.17.3](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.3),
[3.16.6](https://docs.github.com/enterprise-server@3.16/admin/release-notes#3.16.6),
[3.15.10](https://docs.github.com/enterprise-server@3.15/admin/release-notes#3.15.10),
[3.14.15](https://docs.github.com/enterprise-server@3.14/admin/release-notes#3.14.15),
[3.17.2](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.2),
[3.16.5](https://docs.github.com/enterprise-server@3.16/admin/release-notes#3.16.5),
[3.15.9](https://docs.github.com/enterprise-server@3.15/admin/release-notes#3.15.9),
[3.14.14](https://docs.github.com/enterprise-server@3.14/admin/release-notes#3.14.14)
+ GitLab [18.2.1, 18.1.3, 18.0.5](https://about.gitlab.com/releases/2025/07/23/patch-release-gitlab-18-2-1-released/),
[18.2](https://about.gitlab.com/releases/2025/07/17/gitlab-18-2-released/),
[18.1.2, 18.0.4, 17.11.6](https://about.gitlab.com/releases/2025/07/09/patch-release-gitlab-18-1-2-released/)
+ Gerrit Code Review [3.10.7](https://www.gerritcodereview.com/3.10.html#3107),
[3.11.4](https://www.gerritcodereview.com/3.11.html#3114),
[3.12.1](https://www.gerritcodereview.com/3.12.html#3121)
+ GitKraken [11.2.1](https://help.gitkraken.com/gitkraken-client/current/),
[11.2.0](https://help.gitkraken.com/gitkraken-client/current/),
[11.1.1](https://help.gitkraken.com/gitkraken-client/current/),
[11.1.0](https://help.gitkraken.com/gitkraken-client/current/),
[11.0.0](https://help.gitkraken.com/gitkraken-client/current/)
+ GitHub Desktop [3.5.2](https://desktop.github.com/release-notes/),
[3.5.1](https://desktop.github.com/release-notes/)
+ Sourcetree [4.2.13](https://product-downloads.atlassian.com/software/sourcetree/ReleaseNotes/Sourcetree_4.2.13.html)
+ GitButler [0.15.8](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.15.8),
[0.15.7](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.15.7)
+ Sublime Merge [Build 2110](https://www.sublimemerge.com/download)
+ Tower for Mac [13.1](https://www.git-tower.com/release-notes/mac?show_tab=release-notes)
+ Tower for Windows [9.1](https://www.git-tower.com/release-notes/windows?show_tab=release-notes) - [YT video](https://youtu.be/4pNRUz0bNIU)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Usman Akinyemi, brian m. carlson, Aditya Garg,
Erik-B. Ernst, Bruno Brito and Štěpán Němec.
