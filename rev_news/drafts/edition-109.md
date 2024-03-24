---
title: Git Rev News Edition 109 (March 27th, 2024)
layout: default
date: 2024-03-27 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 109 (March 27th, 2024)

Welcome to the 109th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the months of February 2024 and March 2024.

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

## Developer Spotlight: Linus Arver

* Who are you and what do you do?

  I'm one of those so-called "self-taught" developers. My educational
  background is in English and tax law (I know, boring right?). Over a
  decade ago I thought I would be a corporate attorney, but in law
  school I discovered programming and fell completely in love with the
  craft, and never looked back! In hindsight it was the second-best
  decision I've made in life (the first being getting married to my
  lovely wife four years ago).

  I said that I fell into programming during law school. But actually my
  original journey started in 7th grade when I tried to pick up C++. I
  remember learning control flow, structs and pointers in the first few
  chapters of the book I was using, but when it came to the chapter on
  OOP and classes, I could not understand why OOP was necessary.
  The book I was using just explained why OOP was great, and not
  why it would ever be bad.

  Of course, years later I realized that OOP is one of several
  paradigms, so perhaps my instinct to question OOP as a panacea was
  onto something.  In high school and university I remember tinkering
  with HTML and websites before smartphones became popular. What a
  simpler time it was, back then!

  Fast forward to law school, where I had the idea of writing class
  notes using plaintext. Soon after I had the idea of converting these
  plaintext notes to prettified outlines, so I needed a way to convert
  them to HTML. For better or worse, all this happened before I
  discovered Emacs and Orgmode (or even Markdown).

  Anyway I first wrote a plaintext-to-HTML converter in Ruby. Then I
  rewrote it in C just for fun. Then again in Haskell (using a minimal
  subset of Orgmode syntax). As you can see I sort of got carried away,
  haha.

  I would go on to write dozens of pet projects (rudimentary chess
  engine, game modding tools, etc) where I got to write tons of code.
  I've had the "ugh, did I really write this?" moment too many times to
  count. I like to believe that I did the tech industry a favor by not
  entering it until I was well versed in fundamental programming and
  architectural concepts. 😉

  Since those law school days I've taken an interest in learning more
  languages/ecosystems (e.g., Elixir and Rust). Recently, I've taken a
  renewed interest in Literate Programming. I'm toying with the idea of
  using it in a somewhat large scale in a future project. It takes a ton
  of work to do LP right, but in many ways it's the best possible way to
  document code (case in point, the absolutely stellar documentation
  standards of the TeX community, such as the glorious TikZ user
  manual).

  And I believe that readability is the most important attribute when it
  comes to code --- even before correctness! Because at least if the
  intent of the author is clear, we can have a fairly (easy) way to fix
  things to make it correct. The other way around (correct, but
  unreadable code) suffers from stagnation because people become afraid
  of touching it, because it's hard to understand. It becomes harder to
  extend and grow, which is required of any software worth maintaining
  (we call it _soft_ ware for a reason).

  Going back to the question (sorry for rambling a bit there), in my
  $DAYJOB I work on microservices, APIs, and backend systems.
  Professionally I've always been a backend/infra engineer. In my spare
  time I contribute to this wonderful community!

* What would you name your most important contribution to Git?

  I would say my contributions to the documentation come out on top.
  At the end of the day, Git is meant for human consumption.
  So getting a bit more polish here and there for user-facing docs is
  well worth the trouble, and I am most proud of my work in this area so
  far.

  If I had more time I would overhaul the documentation to make things
  easier to understand. Truly, Git has a very simple conceptual model
  (thanks to the brilliance of its original author). You just have to
  understand that commits come from one or more other commits (sort of
  like family trees). That's it! But sadly we have a reputation of
  having absolutely terrible user-facing docs, so much so that it pushed
  people away to Mercurial and other more friendly VCSs. We need to fix
  that.

* What are you doing on the Git project these days, and why?

  Last year I started trying to add unit tests to the (perhaps obscure)
  `git interpret-trailers` command, but this effort has morphed into
  "let's also overhaul the entire subsystem around how trailers are
  handled, with the aim of creating a reusable C library around it".

  I'm afraid I've bitten off more than I can chew, but I do have a
  backlog of about 60 patches that I need to get sent up for review. Not
  all at once, of course haha. Hopefully I can get these sent up and
  merged over the coming months. The review process can be lengthy you
  see, but for good reason --- we take time to try to make sure things
  are right the first time.

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  At the risk of being unoriginal, it would be libification (see
  [Calvin Wan's interview](https://git.github.io/rev_news/2023/08/31/edition-102/#developer-spotlight-calvin-wan)
  from edition 102). But to be more precise, it would be the complete
  banning of "shelling out" which we do in many places (where Git
  spawns another Git process to do something). Instead we could
  (and should) be using libraries internally inside Git's own codebase.
  I believe that once we can get Git to start treating itself
  as a library, that external library consumption will soon follow.

  There are many others interested in this area as Git has a massive
  footprint in our industry. I hope that the many large companies that
  benefit from Git can grow their roster of Git contributors.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  `git checkout`. I believe `git switch` and `git restore` replaced the
  need to have `git checkout`. I believe in the "there should be only
  one way to do the right thing" camp when it comes to the CLI, so I don't
  like how we have multiple commands with a lot of overlap.

  I say this even though personally I've been using Git for over 15
  years and have always used `git checkout` (even after the introduction
  of `git {switch,restore}`). Simplicity matters!

* What is your favorite Git-related tool/library, outside of
  Git itself?

  [tig](https://jonas.github.io/tig/). I use it all the time, every
  suday. It's so good that I basically never use `git log`, unless I'm
  piping it through to search it.

  Every time I see someone proudly showing off their latest "git-log"
  incantation (with all its bells and whistles), I think to myself "I
  guess they've never heard of tig".

  Being an Emacs user, I tried to get into [Magit](https://magit.vc/)
  but could not get used to the keybindings that conflicted with my
  Vim-styled bindings. (Yes, I use Evil mode if you're into that sort
  of thing.) OTOH I get so much done with the basic git-* commands and
  tig that I'm rather happy with my workflow.

* Do you happen to have any memorable experience w.r.t contributing to
  the Git project? If yes, could you share it with us?

  Nine years ago, I contributed my first patch series. I was so proud of
  this work that I wrote [a blog post](https://funloop.org/post/2014-09-09-my-first-contribution-to-git.html)
  about it.

  The TL;DR of that post is that anyone can contribute to Git, and
  really we are a welcoming community. Junio goes out of his way to
  accommodate new contributors (I admire his patience), so please, feel
  free to join us!

* What is your toolbox for interacting with the mailing list and for
  development of Git?

  So my first contribution 9 years ago was via (the traditional)
  `git send-email` command. These days there is this very neat service
  called [GitGitGadget](https://gitgitgadget.github.io/) that allows
  you to create pull requests on GitHub and does all the housekeeping
  work of keeping mailing list discussions in sync (you'll get comments
  on your PR which come from mailing list responses). Plus you can get
  previews of your patch series (exactly how they'll look like on the
  list) before you submit it, which is always nice.

  For local Git development, honestly I don't do anything special or
  unusual. One window for Emacs, one window for (re)compiling Git and
  running tests, and maybe one more for tig. From Emacs I use [notmuch](https://wiki.archlinux.org/title/Notmuch)
  to browse the mailing list emails (which I sync to Gmail with
  [lieer](https://github.com/gauteh/lieer).

  I use Orgmode in Emacs heavily for organizing code snippets and ideas.

  Lastly but not least, I use tmux to organize terminal windows and
  nagivate quickly across them, even if I'm not using SSH.

* What is your advice for people who want to start Git development?
  Where and how should they start?

  The hard part is figuring out which area you want to work on. Git has
  a large codebase, so I recommend starting out with documentation
  changes to familiarize yourself with the current state of things.
  There's always a typo or grammofix hiding in there!

  Many of our manpages read like dictionaries, when they should read
  more like user guides. Some manpages have helpful "EXAMPLES" sections
  to show you how to actually use various options and commands, so if
  you can think of additional examples, that would be most welcome.
  Getting familiar with how things work with user-facing docs should
  help you understand the intent behind the large C codebase we have.

  Try to make your contributions as small as possible, but make an
  effort to write good commit messages. Copy the style of veterans like
  Junio, Peff (Jeff King), Christian Couder, and others I am forgetting
  (sorry!) who've been doing this for a long time.

  Once your change is submitted, nag people weekly to get things moving
  (yes, we need prodding occasionally). But also don't get offended if
  there are a lot of review comments for seemingly small things ---
  we're just trying to maintain a certain level of quality. Git is used
  by almost everyone in the software industry, so it's important for us
  to keep a high bar for quality, that's all.

* If there's one tip you would like to share with other Git
  developers, what would it be?

  Junio has been our maintainer for over a decade. It's a tough job and
  somehow he's kept going at it all this time. Still, let's do our best
  to help make his job easier, because honestly we are truly lucky to
  have someone of his caliber lead our project.

  More concretely, this means helping out with code reviews. If you're
  not sure which ones to review, see the "What's Cooking" emails that
  Junio sends out regularly to look for patches that need help from
  reviewers. They are commented as "Needs review" or "Comments?", so
  they're easy enough to spot.


## Other News

__Various__


__Light reading__

<!---
__Easy watching__
-->

__Git tools and sites__


## Releases
+ Tower for Windows [6.0](https://www.git-tower.com/release-notes/windows?show_tab=release-notes) ([Release blog post](https://www.git-tower.com/blog/tower-windows-6/))
+ Tower for Mac [10.5](https://www.git-tower.com/release-notes/mac?show_tab=release-notes)

## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from XXX.
