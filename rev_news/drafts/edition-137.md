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

<!---
### Support
-->

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
+ [LearnGit.io](https://learngit.io/) teaches Git with animated visualizations of Git internals,
  and has been improved: adding quizzes, step-by-step interactive scenarios, and type-it-yourself exercises
  with a terminal emulator showing real commands and a visualization of the full Git tree,
  including branch pointers and commits.
  The first two modules are [open to anyone](https://app.learngit.io/home/) without an account.
  LearnGit.io is free for students & educators.
    + Created by Jack Lot of [The Modern Coder](https://www.youtube.com/@themoderncoder) YouTube channel.
      First mentioned in [Git Rev News Edition #108](https://git.github.io/rev_news/2024/02/29/edition-108/), and most recently [Edition #127](https://git.github.io/rev_news/2025/09/30/edition-127/).

## Releases


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
