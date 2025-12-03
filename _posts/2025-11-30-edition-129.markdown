---
title: Git Rev News Edition 129 (November 30th, 2025)
layout: default
date: 2025-11-30 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 129 (November 30th, 2025)

Welcome to the 129th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of October and November 2025.

## Discussions

<!---
### General
-->

<!---
### Reviews
-->

### Support

+ [[Bug report] `git cherry-pick` silently ignores error whereas `git apply` fails for hunk apply](https://lore.kernel.org/git/CAEyHQXWd77_jJachC6FYbWMJ+L=KkKoUqiACQ7z8r-ZwYq8JYw@mail.gmail.com/)

  Bhavik Bavishi filed and sent a bug report to the mailing
  list. Running `git cherry-pick` failed to apply some changes but
  didn't report any error. On the contrary, when creating a patch
  using `git format-patch` from the same commit and applying it using
  `git apply --verbose`, the latter command also failed to apply the
  same changes but errored out. It seemed that there shouldn't be such
  a behavior discrepancy and that `git cherry-pick` should have
  reported an error, too.

  Johannes Sixt suggested using `git apply --3way` to apply the
  patch. He was interested not only in the success or failure of the
  command, but also in the end result of applying the patch. Was that
  end result similar to the result of `git cherry-pick` or
  different?

  Bhavik reported back that indeed `git apply --3way` succeeded and
  produced the same end result as `git cherry-pick`. Even though it looked
  like `git cherry-pick` worked as expected, that still seemed a
  strange behavior.

  Johannes Sixt replied that a merge strategy is used by both
  `git cherry-pick` and `git apply --3way`. Unlike a simple patch
  application, a merge strategy is intelligent enough to detect if a
  change has already been applied. He illustrated this with an example
  where text repeats in a file, but only specific instances are
  modified.

  In the meantime, Chris Torek also replied to Bhavik providing a
  wealth of explanations. He explained that `git apply` works with a
  *patch*, which is essentially a "we expect the file looks like this"
  instruction. If the file doesn't match the expected context lines
  exactly, the patch fails.

  In contrast, `git cherry-pick` performs a *3-way merge*. It locates
  a "common base version" (the ancestor), compares it to "Ours"
  (current branch), and "Theirs" (the commit being picked) . If the
  merge logic sees that "Theirs" introduces a change that "Ours" has
  already made, it silently discards the duplicate change rather than
  erroring out. This confirms that the command was working as
  intended, using the full history to resolve what looked like a
  conflict to the simpler `git apply` tool.

  Bhavik thanked Chris for the helpful explanations.

## Developer Spotlight: Ayush Chandekar

_Editor’s note: This edition features a retrospective interview with a
contributor who contributed to Git through a mentoring program.
We hope the reflections shared by the GSoC contributor will
provide an insightful perspective that benefits the community.
As always, we welcome your thoughts and feedback!_

* **Who are you and what do you do?**

  I am Ayush Chandekar, a GSoC 2025 alumnus under Git, my project was
  titled '[Refactoring in order to reduce Git’s global state](https://summerofcode.withgoogle.com/programs/2025/projects/no7dVMeG)'.
  Currently I am an engineering undergraduate at IIT Roorkee,
  I consider myself to be a jack of all trades, with interests
  ranging from low-level programming to game development,
  cybersecurity, and blockchain. I am also a member of
  [SDSLabs](https://sdslabs.co/), a student run technical club
  at my university which also focuses on making software and
  tech accessible for the campus.

  As a kid I always enjoyed tinkering with computers and would
  spend majority of my time on games, but slowly I started enjoying
  the chance that development gave me to be the one behind the scene,
  controlling and making stuff which works. My approach is driven by
  curiosity and a desire to understand how things really function.
  Whenever I start learning something new, I naturally end up going
  deeper and deeper into the smaller, niche details, not because
  I have to, but because it genuinely fascinates me. I enjoy peeling
  back the layers, figuring out the underlying mechanisms, and
  understanding the “why” behind everything I work on. It’s that
  curiosity that keeps pulling me into new domains and motivates me
  to keep exploring.  Apart from this, for fun, I like to participate
  in hackathons, GameJams and Cyber security Capture-The-Flag(CTF)
  competitions. Outside of tech, I enjoy listening to music, brewing
  coffee, skateboarding, and learning guitar, they help me unwind
  and keep a balance beyond the screen.

* **How did you initially become interested in contributing to Git,
  and what motivated you to choose it as your GSoC project?**

  I wanted to start my journey of contributing to open source projects.
  Before that, I was working on small C projects, and that’s when I
  came across Git. I was immediately drawn to understanding how
  developers actually work on Git itself. The workflow felt new to me,
  kind of old-school in a good way, and it definitely took some time
  to get used to, but I really enjoyed the process. As I dug deeper,
  I realized how Git's internals work, and that made me even more
  curious. The idea that I could learn from such a mature codebase,
  while also improving a tool used globally, was extremely motivating.
  It felt like the perfect place to challenge myself, improve my skills,
  and contribute to a big project.

* **Is there any aspect of Git that you now see differently after
  having contributed to it?**

  It is about how there are so many different commands. Before my GSoC,
  I was only aware of the usual `git push`, `git pull`, `git clone`,
  etc. Now, I know many more commands like `git bisect`, `git range-diff`,
  etc. I even understand how some of them work internally. Contributing
  to Git really opened my eyes to the depth and complexity of the tool.

* **How do you balance your contributions with other responsibilities
  like work or school?**

  Balancing contributions with other responsibilities is a bit
  challenging. As an undergrad student, I’m involved in various
  activities at my university, including sports and other commitments,
  so my schedule gets busy. But whenever I sit down to work or study,
  I get very absorbed in it, and I often end up spending long stretches
  of time without even realizing it. That focus helps me make steady
  progress even with a packed routine.

* **Can you share how GSoC helped enhance your technical and
  non-technical skills (like communication, project management,
  etc.)?**

  GSoC helped me grow in both technical and non-technical areas.
  On the technical side, I became much more comfortable reading
  large codebases, debugging tricky issues, and writing clean,
  well-structured patches. I also learned the importance of clear
  and detailed commit messages. On the non-technical side, GSoC
  improved my communication skills a lot, especially explaining
  my ideas, asking the right questions, and discussing feedback
  with the community. It also taught me how to plan my work, break
  tasks into smaller steps, and manage my time over a long project.
  Overall, it made me more confident in collaborating in an open-source
  environment. I would also like to thank my mentor, Christian, for
  his guidance and patience throughout the project. His feedback
  played a big role in helping me improve.

* **What was your biggest takeaway or learning from GSoC that
  you now apply regularly in your work?**

  My biggest takeaway from GSoC was the importance of writing
  clear and detailed commit messages. Before the program, I
  didn’t pay much attention to how a commit was explained,
  but contributing to Git made me realise how essential it
  is. A good commit message not only describes what changed
  but also why the change was necessary, making it much easier
  for reviewers and future contributors to understand the context.

  Another major learning was understanding how to handle reviews
  from multiple people. In the Git community, different contributors
  often suggest different things, and figuring out how to take in
  all that feedback while still taking ownership of my work was a
  big shift for me. I learned how to look at each suggestion carefully,
  understand the reasoning behind it, and decide what improves the
  patch. It also taught me when to explain my choices and when to
  adjust my approach. This experience helped me become more confident
  in iterating on my work and communicating clearly, while staying
  responsible for the decisions I make.

* **What was the biggest challenge you faced during your contributions
  to Git, and how did you overcome it?**

  There were a few challenges which I faced. Initially, it was
  getting accustomed to the mailing list workflow as it was new to
  me. Most of the challenges were making sure that the community
  accepted your patches. A lot of people reviewed my patches and
  got different responses. Here, I learnt to take ownership of
  my patches.

* **Have you thought about mentoring new GSoC / Outreachy students?**

  Yes, I’ve definitely thought about mentoring future GSoC students,
  most likely as a co-mentor. I feel it would be a great way to
  give back to the community and support newcomers the same way
  I was supported.

* **If you could remove something from Git without worrying about
  backwards compatibility, what would it be?**

  It would be removing the global state from Git, which was my
  GSoC project and is also an ongoing effort in the community
  for the maintainability and modularity of the codebase.

* **What upcoming features or changes in Git are you particularly
  excited about?**

  I've been following Patrick's [patch series on `git history`](https://public-inbox.org/git/20251027-b4-pks-history-builtin-v6-0-407dd3f57ad3@pks.im/).
  I am excited about that feature's release.

* **What is your favorite Git-related tool/library, outside of Git
  itself?**

  I have heard of [Jujutsu](https://jj-vcs.github.io/jj/latest/),
  I haven't tried it yet but it seems cool, other than that
  sticking to my essentials, GitLab and GitHub.

* **What is your toolbox for interacting with the mailing list and for
  development of Git?**

  I just use Gmail to view and reply mails most of the time. But when
  it comes to sending patches, I use the good ol' `git send-email`.
  I had set up [mutt](http://www.mutt.org/) once, but didn't use it
  as much.

* **How do you envision your own involvement with Git or other open
  source projects in the future?**

  I don't have anything planned out in particular but I do really
  admire the way my mentor and other contributors in the organisation
  contribute. Open source is something which basically runs the world,
  organisations like Git and Linux function because of collective and
  voluntary efforts; they are what makes the world as it is today,
  and carrying that forward I want to contribute in a way which makes
  software accessible to everyone and help build up on these
  foundational blocks.

* **What is your advice for people who want to start Git development?
  Where and how should they start?**

  Git is an amazing project to learn all aspects of development.
  It helps you to learn/improve your C and debugging skills. Another
  important thing is how you get to work with different contributors
  in the community. You get reviews from everyone which helps you
  understand different perspectives. To start with, I would suggest
  going through this page called '[Hacking Git](https://git.github.io/Hacking-Git/)'
  and checking different articles mentioned there along with the
  [Contribution Guidelines](https://git-scm.com/docs/MyFirstContribution).
  It is quite difficult to decide what to work on initially, as there
  are no traditional issues as other organizations have. Being active
  on the mailing list, checking out the ongoing topics might help you
  decide what to work on. Everyone on the mailing list and discord is
  very friendly and is always looking forward to help you out, so feel
  free to ask if you have any doubts :)

* **Would you recommend other students or contributors to participate
  in the GSoC, Outreachy or other mentoring programs, working on Git?
  Why? Do you have advice for them?**

  As I answered before, it is sometimes difficult to decide what you
  can work on. I feel that for Git, since projects are already listed
  on the [GSoC and Outreachy pages](https://git.github.io/SoC-2025-Ideas/),
  it takes away the pain of figuring out where to start. You just need
  to pick a project that interests you and then spend some time studying
  it. Other than that, you’re also mentored by someone experienced in
  Git development, and with their guidance you’re able to follow best
  practices and learn a lot of new things. These programs really help
  build confidence, especially when contributing to a large and complex
  codebase. You also get to improve your communication skills through
  discussions, reviews, and patch iterations. And most importantly, it
  opens doors for future contributions, networking, and long-term
  involvement in open source. My advice would be to learn to be patient
  with reviews. A lot of people in the community contribute voluntarily,
  so you may not get reviews on your patches quickly, and that’s
  completely normal.


## Other News

__Various__

- [What’s new in Git 2.52.0?](https://about.gitlab.com/blog/whats-new-in-git-2-52-0/)
  by Christian Couder, Patrick Steinhardt, Toon Claes on GitLab Blog.
  Highlights include `git last-modified` command,
  `git fast-export` and `git fast-import` signature-related improvements,
  new and improved `git maintenance` strategies,
  a new subcommand for the new `git repo` to display repository metrics, etc.
- [Highlights from Git 2.52](https://github.blog/open-source/git/highlights-from-git-2-52/)
  by Taylor Blau on GitHub Blog.
  Mentions the `git last-modified` command for tree-level blame information,
  advanced repository maintenance strategies for `git maintenance`,
  new subcommands added to `git refs`, the experimental `git repo` command, etc.
- [lakeFS Acquires DVC, Uniting Data Version Control Pioneers to Accelerate AI-ready Data](https://lakefs.io/media-mentions/lakefs-acquires-dvc-uniting-data-version-control-pioneers/)
  announcement by lakeFS on their Mentions Media page.
    - [DVC Joins lakeFS: Your Questions Answered!](https://dvc.org/blog/dvc-joins-lakefs-your-questions-answered/)
      by Jeny De Figueiredo on DVC Blog.
    - [A Shared Vision for the Future of DVC](https://dvc.org/blog/a-shared-vision-for-the-future-of-dvc/)
      by Dmitry Petrov on DVC Blog.
	- See also [“Data Management” section of Awesome MLOps](https://github.com/kelvins/awesome-mlops#data-management),
	  mentioned in [Git Rev News Edition #116](https://git.github.io/rev_news/2024/10/31/edition-116/).
	  That edition also includes references to DVC and lakeFS,
	  and other similar tools (though the list there is missing
	  [Meltano](https://meltano.com/) (first mentioned in [Git Rev News Edition #42](https://git.github.io/rev_news/2018/08/22/edition-42/)) and
	  [Pachyderm](https://www.pachyderm.com/) (first mentioned in [Git Rev News Edition #49](https://git.github.io/rev_news/2019/03/20/edition-49/)).
- [20 Years of Git, 2 days at GitHub HQ: Git Merge 2025 highlights 🎉](https://github.blog/open-source/git/20-years-of-git-2-days-at-github-hq-git-merge-2025-highlights/)
  by Lee Reilly on GitHub Blog.
    - See also [the previous edition of Git Rev News](https://git.github.io/rev_news/2025/10/31/edition-128/)
      for more links about Git Merge 2025.


__Light reading__

- [Version Control in the Age of AI: The Complete Guide](https://www.git-tower.com/blog/version-control-in-the-age-of-ai)
  by Bruno Brito on Git Tower blog.
- [Analyzing 10 years of accepted patch series to Git](https://benknoble.github.io/blog/2025/11/14/git-patch-series-length/)
  by D. Ben Knoble on his Junk Drawer personal blog.
- [Mergiraf: syntax-aware merging for Git](https://lwn.net/Articles/1042355/)
  by Daroc Alden on LWN\.net.
    - [Mergiraf](https://mergiraf.org/introduction.html) is a merge-conflict resolver
      that uses a generic algorithm plus a small amount of language-specific knowledge
      to solve conflicts that Git's default strategy cannot.
      It was mentioned in [Git Rev News Edition #117](https://git.github.io/rev_news/2024/11/30/edition-117/).
	- The Mergiraf author recommends using the tool together with
	  [Difftastic](https://difftastic.wilfred.me.uk/), a structural diff tool
	  that understands syntax, mentioned in [Git Rev News Edition #86](https://git.github.io/rev_news/2022/04/30/edition-86/).
- [Should I Switch From Git to Jujutsu](https://etodd.io/2025/10/02/should-i-switch-from-git-to-jujutsu/)
  by Evan Todd on his personal blog.
    - [Jujutsu (`jj`)](https://jj-vcs.github.io/) is a Git-compatible
	  version control system written in Rust, which was first mentioned
	  in [Git Rev News Edition #85](https://git.github.io/rev_news/2022/03/31/edition-85/).
	- See also [Switch to Jujutsu already: a tutorial](https://www.stavros.io/posts/switch-to-jujutsu-already-a-tutorial/)
	  by Stavros on Stavros’ Stuff,
	  mentioned in [the previous edition](https://git.github.io/rev_news/2025/10/31/edition-128/).
- [Why Git is the first tool every new developer needs to learn](https://www.howtogeek.com/beginning-git-what-it-is-and-why-its-crucial/)
  by Graeme Peacock on How-To Geek.
- [Git for Vibe Coders](https://www.kdnuggets.com/git-for-vibe-coders),
  just enough to stop Claude from accidentally deleting your code and database.
  By Abid Ali Awan on KDnuggets.
- [4 advanced git commands you probably haven't heard of](https://www.howtogeek.com/advanced-git-commands-you-probably-havent-heard-of/):
  [`git clean`](https://git-scm.com/docs/git-clean),
  [`git bisect`](https://git-scm.com/docs/git-bisect),
  [`git cherry-pick`](https://git-scm.com/docs/git-cherry-pick),
  [`git revert`](https://git-scm.com/docs/git-revert),
  by Bobby Jack on How-To Geek.
- [Setting File Permissions in Git](https://www.tvaidyan.com/2025/11/13/setting-file-permissions-in-git/)
  by Tom Vaidyan on his personal blog;
  though I wonder why he shows the low-level `git update-index --chmod=+x <file>` "plumbing" command
  first, instead of the corresponding user-facing `git add --chmod=+x <file>` "porcelain" command.
- [Why You Should Be Using Git Worktrees](https://blog.randombits.host/why-you-should-be-using-git-worktrees/)
  by Conor in Quick Tip on their Random Bits personal blog
  (it includes their helper `gwc`, i.e. `git worktree create`, shell script).
- [tree-me: Because git worktrees shouldn't be a chore](https://haacked.com/archive/2025/11/21/tree-me/)
  by Phil Haack on his You've Been Haacked blog.
- [Use skip-worktree to ignore modified files](https://www.brandonpugh.com/til/git/skip-worktree-ignore-modified-files/)
  by Brandon Pugh in the "TIL: Today I learned..." section on his blog.
- [Managing Multiple Projects in One Repository: Submodules, Subtrees, Monorepos & Partial Cloning Explained](https://dev.to/k-kibet/managing-multiple-projects-in-one-repository-submodules-subtrees-monorepos-partial-cloning-21mc)
  by Kibet Korir (K-kibet) for Codespear on DEV\.to.
- [Automatically switching Git Identities and SSH Keys on the same machine](https://dev.to/enbis/automatically-switching-git-identities-and-ssh-keys-on-the-same-machine-75n)
  with the help of `includeIf` directive in the `.gitconfig` file,
  by Enrico Bison (enbis) on DEV\.to.  See also:
    - [Splitting SSH and git configs](https://iamjonfry.com/splitting-ssh-and-git-configs/)
	  mentioned in [Git Rev News Edition #42](https://git.github.io/rev_news/2018/08/22/edition-42/).
	- [How to Use Multiple Git Configs on One Computer](https://www.freecodecamp.org/news/how-to-handle-multiple-git-configurations-in-one-machine/)
	  mentioned in [Git Rev News Edition #71](https://git.github.io/rev_news/2021/01/28/edition-71/).
	- [How I configure my Git identities](https://www.benji.dog/articles/git-config/)
	  mentioned in [Git Rev News Edition #117](https://git.github.io/rev_news/2024/11/30/edition-117/).
	- [One PC, Multiple Git Configs (This Will Save You Time!)](https://medium.com/@matteopampana/one-pc-multiple-git-configs-this-will-save-you-time-f702880744f7)
	  mentioned in [Git Rev News Edition #120](https://git.github.io/rev_news/2025/02/28/edition-120/).
- [Git: Amend any commit](https://ylan.segal-family.com/blog/2025/11/15/git-ammend-any-commit/)
  (scripting around `git commit --amend`, `git commit --fixup`, and `git rebase --autosquash`)
  by Ylan Segal on his "on.code && such" blog.
- [If You Think YOUR Commit Messages Are Bad, Just Wait...](https://dev.to/sylwia-lask/if-you-think-your-commit-messages-are-bad-just-wait-3fgk)
  by Sylwia Laskowska on DEV\.to,
  with others providing more examples in comments.
- [Mistakes I see engineers making in their code reviews](https://www.seangoedecke.com/good-code-reviews/)
  by Sean Goedecke on his blog.
- [Testable Dotfiles Management With Chezmoi](https://shunk031.me/post/testable-dotfiles-management-with-chezmoi/)
  by Shunsuke Kitada (北田俊輔), Ph.D. on shunk031\.me.
- [Backing up my repositories to self-hosted Gitea](https://blog.kulman.sk/self-hosted-gitea-backup/)
  by Igor Kulman on his personal blog.
   - [Gitea](https://about.gitea.com/) is a Go-based software forge,
     a fork of [Gogs](https://gogs.io/).
	 It was first mentioned in [Git Rev News Edition #23](https://git.github.io/rev_news/2017/01/25/edition-23/).
- [Fixing Vercel's 'Git Author Must Have Access' Error](https://www.pavlinbg.com/posts/fix-vercel-git-author-error),
  which was caused by the way how Vercel handles multiple accounts.
  Written by Pavlin Gunov (PavlinBG) on his blog.
- [Running DVC on a SLURM cluster](https://dvc.org/blog/dvc-slurm-cluster-exscientia/)
  by Dom Miketa on DVC Blog (2024).
    - [DVC](https://dvc.org/) (Data Version Control),
      an open-source version control system for data science projects,
	  was first mentioned in [Git Rev News Edition #23](https://git.github.io/rev_news/2017/01/25/edition-23/).


__Easy watching__

- [How to ensure the Git community is and stays healthy: Emily Shaffer / Patrick Steinhardt & guests](https://www.youtube.com/watch?v=vKsOFHNSb4Q)
  on GitButler channel on YouTube [duration: 44:42].


__Git tools and sites__

- [gitlogue](https://github.com/unhappychoice/gitlogue)
  is a cinematic Git commit replay tool for the terminal,
  turning your Git history into a living, animated story;
  with realistic typing animations, syntax highlighting, and file tree transitions,
  transforming code changes into a visual experience.
  Written mainly in Rust, under ISC License.
- [PyDriller](https://github.com/ishepard/pydriller) is a Python framework
  that helps developers in analyzing Git repositories.
  With PyDriller you can easily extract information about
  commits, developers, modified files, diffs, and source code.
  Written in Python, under Apache 2.0 license.
- [tree-me](https://github.com/haacked/dotfiles/blob/main/bin/tree-me)
  is a minimal `git worktree` helper
  that leverages Git's native capabilities.
  It uses Git-like subcommands and follows conventions so you don’t have to think:
  auto-detects the repository name from your Git remote,
  auto-detects the default branch, organizes by repo, provides tab completion, etc.
  Single bash script, part of [haacked dotfiles](https://github.com/haacked/dotfiles).
  No license.
    - See also [Worktree Manager](https://github.com/jarredkenny/worktree-manager) (wtm),
	  a fast, modern CLI tool for managing Git worktrees in bare repositories,
	  mentioned in [Git Rev News Edition #128](https://git.github.io/rev_news/2025/10/31/edition-128/).
- [Spelungit](https://github.com/haacked/spelungit) is a Model Context Protocol (MCP) server
  for exploring Git commit history using semantic search.
  With this tool you can search through commits with natural language commands
  like "Search Git history to find out why this class was added",
  or "search_commits(query="authentication login changes", limit=5)".
  Uses Microsoft's all-MiniLM-L6-v2 embedding model via [sentence-transformers](https://www.sbert.net/),
  or deterministic hash-based embeddings when sentence-transformers is unavailable.
  Written in Python (with a few Bash scripts), under MIT License.
    - See also [Spelungit: When `git log --grep` isn't enough](https://haacked.com/archive/2025/09/29/announcing-spelungit/)
	  by Phil Haack on You've Been Haacked blog.
- [forgit](https://github.com/wfxr/forgit) is a utility tool
  powered by [fzf](https://github.com/junegunn/fzf) (command-line fuzzy finder)
  for using Git interactively.
  Written in shell, under MIT license.
- [gitnr](https://github.com/reemus-dev/gitnr) is a cross-platform CLI utility
  to create `.gitignore` files using one or more templates
  from [TopTal](https://github.com/toptal/gitignore) (<https://gitignore.io>),
  [GitHub](https://github.com/github/gitignore), or your own collection.
  Written in Rust, under MIT License.
- [`mani`](https://manicli.com/) is a CLI tool
  that helps you manage multiple repositories.
  It's useful when you are working with microservices, multi-project systems,
  multiple libraries, or just a collection of repositories,
  and want a central place for pulling all repositories and running commands across them.
  Written in Go, under MIT License.
- [eget](https://github.com/zyedidia/eget) is a command-line tool
  for easily fetching and extracting pre-built binaries from GitHub releases.
  Written in Go, under MIT License.
- [dunk](https://github.com/darrenburns/dunk) is a tool
  to provide prettier Git diffs in the terminal
  by piping `git diff` output into it (`git diff | dunk` or `git diff | dunk | less -R`).
  In very early stages of development.
  Written in Python, under MIT License.
    - See also [git-delta](https://dandavison.github.io/delta/),
	  a syntax-highlighting pager for `git`, `diff`, `grep`, and `git blame` output.
	  It was first mentioned in [Git Rev News Edition #86](https://git.github.io/rev_news/2022/04/30/edition-86/),
	  though there is another [delta](https://github.com/octavore/delta)
	  command-line diff tool which was first mentioned in [edition #9](https://git.github.io/rev_news/2015/11/11/edition-9/).
	- See also [diff-so-fancy](https://github.com/so-fancy/diff-so-fancy) tool,
	  which beside piping `git diff` output to it,
	  can also be used as `core.pager` and `interactive.diffFilter`.
	  It was first mentioned in [Git Rev News Edition #13](https://git.github.io/rev_news/2016/03/16/edition-13/).
	- There is also a [`contrib/diff-highlight`](https://github.com/git/git/tree/master/contrib/diff-highlight)
	  diff pager script in the Git repository, written in Perl.
	  It was mentioned in [Git Rev News Edition #53](https://git.github.io/rev_news/2019/07/24/edition-53/).
- [GitType](https://github.com/unhappychoice/gittype) is a CLI tool
  that turns your own source code into typing challenges.
  Because why practice with boring [lorem ipsum](https://www.lipsum.com/)
  when you can type your beautiful `fn main()` implementations?
  Written in Rust, under MIT License.
- [Serie](https://github.com/lusingander/serie) is a TUI tool that
  provides a rich Git commit graph in your terminal.
  Written in Rust, under MIT License.
    - See also [tig](https://jonas.github.io/tig/),
	  an ncurses-based text-mode interface for Git,
	  first mentioned in [Git Rev News Edition #18](https://git.github.io/rev_news/2016/08/17/edition-18/).
- [prettydiff](https://github.com/prettydiff/prettydiff) is a beautifier and language aware
  code comparison tool for many languages. It also minifies and does a few other things.
  There is a web service showing how the tool works at <https://prettydiff.com/tool.xhtml>.
  Written in TypeScript and HTML,
  under [CC0](https://creativecommons.org/public-domain/cc0/) license.
- [fnox: Fort Knox for your secrets](https://fnox.jdx.dev/)
  is a tool to manage secrets with encryption, or cloud providers, or both.
  Fnox uses a simple TOML config file (`fnox.toml`) that you check into Git;
  secrets are either encrypted inline, or provided as references
  that point to a secret in age, AWS, 1Password, etc.
  Written in Rust, under MIT License.
- [asdf](https://asdf-vm.com/guide/introduction.html) is a tool version manager.
  All tool version definitions are contained within one file (`.tool-versions`)
  which you can check in to your project's Git repository to share with your team,
  ensuring everyone is using the exact same versions of tools.
  Written mainly in Bash and Go, under MIT License.
- [grebedoc.dev](https://grebedoc.dev/) is a service
  that offers static site hosting for Git forges;
  it publishes the `pages` branch in your Git repository as a website on your domain.
  More specifically, it is a public deployment of
  [git-pages](https://codeberg.org/git-pages/git-pages)
  and [Caddy](https://caddyserver.com/), configured to work especially with
  [Codeberg](https://codeberg.org/) but also with other Git forges.
  It is operated by Catherine 'whitequark' and teammates.
    - Compare with [GitHub Pages](https://docs.github.com/en/pages),
	  [GitLab Pages](https://docs.gitlab.com/user/project/pages/),
	  [static websites on Bitbucket Cloud](https://support.atlassian.com/bitbucket-cloud/docs/publishing-a-website-on-bitbucket-cloud/),
	  [Codeberg Pages](https://codeberg.page/) (can't guarantee high availability),
	  [sourcehut pages](https://srht.site/), and
	  [Cloudflare Pages](https://pages.cloudflare.com/) (JAMstack platform), etc.
- [gitsuggest](https://github.com/csurfer/gitsuggest) is a tool
  to suggest GitHub repositories based on the repositories you have shown interest in
  by “starring”. It is using the Latent Dirichlet Allocation (LDA) method.
  There is also a [gitSuggest](http://www.gitsuggest.com/) service (in beta) on Heroku.
  Written on Python, under MIT License.
- [Josh](https://josh-project.github.io/josh/) (Just One Single History)
  ([repo](https://github.com/josh-project/josh))
  is a tool that combines the advantages of monorepos with those of multirepos
  by leveraging a blazingly fast, incremental, and reversible implementation
  of Git history filtering.
  Note that to guarantee filters are reversible
  Josh restricts the kind of filter that can be used.
  Use cases include partial cloning, workspaces, simplified CI/CD;
  this tool also provides a GraphQL API.
  Josh is distributed via [Docker Hub](https://hub.docker.com/r/joshproject/josh-proxy),
  and you can start it with the appropriate `docker run` command.
  See its [Frequently Asked Questions](https://josh-project.github.io/josh/faq.html#frequently-asked-questions)
  for comparison with `git sparse-checkout`, partial clone, submodules, `git subtree`,
  and `git filter-repo`.
  Written mainly in Rust, under MIT License.
- [Furgit](https://villosa.lindenii.org/furgit//repos/furgit/)
  ([GitHub mirror](https://github.com/runxiyu/furgit))
  is a fast Git library in pure Go (and a little bit of optional Go Assembly).
  Written for [Lindenii Villosa](https://villosa.lindenii.org/villosa//repos/villosa/)
  (successor to [Lindenii Forge](https://forge.lindenii.org/forge/-/repos/server/)),
  a software forge primarily designed for self-hosting
  by small organizations and individuals.
  Under AGPL 3.0 license.
- [git-embigenner](https://github.com/veqqq/git-embigenner)
  is a very simple shell script to cheat a high score on GitHub,
  which will spam commits to populate your profile's contribution graph.
    - Compare with [Git Draw](https://github.com/ben174/git-draw),
	  a Chrome extension which will allow you to freely draw on your GitHub heatmap,
	  mentioned in [Git Rev News Edition #12](https://git.github.io/rev_news/2016/02/10/edition-12/)<br>
	  and [gitfiti](https://github.com/gelstudios/gitfiti),
	  a tool for crafting graffiti in a GitHub commit history calendar,
	  mentioned in [Git Rev News Edition #41](https://git.github.io/rev_news/2018/07/18/edition-41/).
    - Contrast [Vigilante Justice on GitHub: GitHub Graffiti](https://trufflesecurity.com/blog/vigilante-justice-on-github) by Dylan Ayrey,
	  mentioned in [Git Rev News Edition #118](https://git.github.io/rev_news/2024/12/31/edition-118/),
	  about how you can paint funny pixel art (graffiti) with fake commit Git histories
	  on spammer/phisher’s GitHub profiles (that is, on their activity heatmap plot).


## Releases

+ Git [2.52.0](https://lore.kernel.org/git/xmqqh5usmvsd.fsf@gitster.g/),
[2.52.0-rc2](https://lore.kernel.org/git/xmqqzf8rqihh.fsf@gitster.g/),
[2.52.0-rc1](https://lore.kernel.org/git/xmqqqzubhyj9.fsf@gitster.g/),
[2.52.0-rc0](https://lore.kernel.org/git/xmqqwm47t4x3.fsf@gitster.g/)
+ Git for Windows [v2.52.0(1)](https://github.com/git-for-windows/git/releases/tag/v2.52.0.windows.1),
[v2.52.0-rc2(1)](https://github.com/git-for-windows/git/releases/tag/v2.52.0-rc2.windows.1),
[v2.52.0-rc1(1)](https://github.com/git-for-windows/git/releases/tag/v2.52.0-rc1.windows.1),
[v2.52.0-rc0(1)](https://github.com/git-for-windows/git/releases/tag/v2.52.0-rc0.windows.1)
+ GitLab [18.6.1, 18.5.3, 18.4.5](https://about.gitlab.com/releases/2025/11/26/patch-release-gitlab-18-6-1-released/),
[18.6](https://about.gitlab.com/releases/2025/11/20/gitlab-18-6-released/),
[18.5.2, 18.4.4, 18.3.6](https://about.gitlab.com/releases/2025/11/12/patch-release-gitlab-18-5-2-released/)
+ Bitbucket Data Center [10.1](https://confluence.atlassian.com/bitbucketserver/release-notes-872139866.html)
+ Gerrit Code Review [3.10.9](https://www.gerritcodereview.com/3.10.html#3109),
[3.11.6](https://www.gerritcodereview.com/3.11.html#3116),
[3.11.7](https://www.gerritcodereview.com/3.11.html#3117),
[3.12.3](https://www.gerritcodereview.com/3.12.html#3123),
[3.13.0-rc5](https://www.gerritcodereview.com/3.13.html#3130),
[3.13.0](https://www.gerritcodereview.com/3.13.html#3130),
[3.13.1](https://www.gerritcodereview.com/3.13.html#3131)
+ GitHub Enterprise [3.18.1](https://docs.github.com/enterprise-server@3.18/admin/release-notes#3.18.1),
[3.17.7](https://docs.github.com/enterprise-server@3.17/admin/release-notes#3.17.7),
[3.16.10](https://docs.github.com/enterprise-server@3.16/admin/release-notes#3.16.10),
[3.15.14](https://docs.github.com/enterprise-server@3.15/admin/release-notes#3.15.14),
[3.14.19](https://docs.github.com/enterprise-server@3.14/admin/release-notes#3.14.19)
+ GitKraken [11.6.0](https://help.gitkraken.com/gitkraken-desktop/current/)
+ GitHub Desktop [3.5.4](https://desktop.github.com/release-notes/)
+ Git Cola [4.16.1](https://github.com/git-cola/git-cola/releases/tag/v4.16.1)
+ GitButler [0.18.1](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.18.1),
[0.18.0](https://github.com/gitbutlerapp/gitbutler/releases/tag/release/0.18.0)
+ Kinetic Merge [1.11.2](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.11.2),
[1.11.1](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.11.1),
[1.11.0](https://github.com/sageserpent-open/kineticMerge/releases/tag/v1.11.0)
+ Tower for Mac [15](https://www.git-tower.com/blog/tower-mac-15) ([YouTube tour](https://youtu.be/xTrxb2dJP8M))
+ Tower for Windows [10](https://www.git-tower.com/blog/tower-windows-10)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Ayush Chandekar, Štěpán Němec,
Bruno Brito and D. Ben Knoble.
