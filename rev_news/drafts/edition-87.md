---
title: Git Rev News Edition 87 (May 25th, 2022)
layout: default
date: 2022-05-25 12:06:51 +0100
author: chriscool
categories: [news]
navbar: false
---

## Git Rev News: Edition 87 (May 25th, 2022)

Welcome to the 87th edition of [Git Rev News](https://git.github.io/rev_news/rev_news/),
a digest of all things Git. For our goals, the archives, the way we work, and how to contribute or to
subscribe, see [the Git Rev News page](https://git.github.io/rev_news/rev_news/) on [git.github.io](http://git.github.io).

This edition covers what happened during the month of May 2022.

## Discussions

### General

* [Git participates in GSoC (Google Summer of Code) 2022](https://summerofcode.withgoogle.com/programs/2022/organizations/git)

  The following three contributors have been officially accepted to
  work on Git as part of the
  [GSoC 2022](https://summerofcode.withgoogle.com/):

  - Abhradeep Chakraborty will work on the
    [Reachability bitmap improvements](https://summerofcode.withgoogle.com/programs/2022/projects/UPtA6qdf)
    project. He will be co-mentored by Kaartic Sivaraam and Taylor Blau.

  - Shaoxuan Yuan will work on the
    [More Sparse Index Integrations](https://summerofcode.withgoogle.com/programs/2022/projects/hz4rcOUB)
    project. He will be co-mentored by Derrick Stolee and Victoria Dye.

  - Jaydeep Das will work on the
    [Unify ref-filters with other pretty formats](https://summerofcode.withgoogle.com/programs/2022/projects/8mYcnerl)
    project. He will be co-mentored by Hariom Verma and Christian
    Couder. His first blog post about it
    [is up](https://jdeep.me/posts/6.d/).

  Congratulations to the selected contributors!

  Thanks also to the students who applied and worked on
  micro-projects, but couldn't be selected! We hope to continue to see
  you in the community!

* [[ANNOUNCE] git-scm.com Heroku credits update](https://lore.kernel.org/git/YkcmtqcFaO7v1jW5@nand.local/)

  Taylor Blau announced that the Heroku credits for
  [git-scm.com](https://git-scm.com), Git project's de-facto homepage,
  would not be provided for free by Heroku anymore.

  The Git project has so far relied on those free credits from Heroku
  and free support from [Cloudflare](https://www.cloudflare.com/) to
  have $0 maintenance cost for the site.

  Taylor suggested different options to deal with the change:

  - convert to a static site, so that we don't rely on Heroku and can
    be hosted elsewhere hopefully for free,

  - try to reduce our Heroku bill by getting rid of some of the
    services we currently use (like database and Ruby on Rails cache),

  - find a cheaper Ruby on Rails host.

  The Heroku credits amount to around $132 per month that are now
  billed to Git's account at
  [Conservancy](https://sfconservancy.org/), as Git is Conservancy
  member, while we "figure out what to do next".

  A few days later, Taylor replied to himself saying that Dan Moore
  from [FusionAuth](https://fusionauth.io/) has offered to help assist
  with our hosting costs, as FusionAuth, his company, "has benefited
  tremendously from Git".

  Git project funds are usually used for things like sponsoring travel
  and lodging for Git Merge attendees who could not otherwise make it
  in person, so helping for hosting costs is welcome.

  Sponsors for the site are listed on the
  [Sponsors section of the about page](https://git-scm.com/site),
  so we would just have to list FusionAuth there along with
  [Cloudflare](https://www.cloudflare.com/) and
  [Bonsai](https://bonsai.io/).

  Dan then replied to Taylor confirming that FusionAuth "would love to
  offer [their] monetary support if it makes sense for the community".

  Both Kaartic Sivaraam and Phillip Wood thanked Dan and his company
  for their offer, and agreed with Taylor that it would be a good
  solution.

  Johannes Schindelin, alias Dscho, also replied to Taylor saying he
  would be in favor of converting the site to a static web
  site. Taylor then replied to Dscho, explaining some tasks, along
  with technical details, that would need to be taken care of for the
  conversion.

  Junio Hamano, Taylor and Christian Couder also discussed the idea of
  proposing such conversion tasks as a future
  [Outreachy](https://www.outreachy.org/) or
  [GSoC](https://summerofcode.withgoogle.com) project.

  For now the Git project accepted
  [FusionAuth](https://fusionauth.io/)'s generous offer and the
  git-scm.com web site will continue to run in the same way.

<!---
### Reviews
-->

<!---
### Support
-->

## Developer Spotlight: Carlo Marcelo Arenas Belón

* Who are you and what do you do?

  I am a peruvian hacker that likes to argue he is also "american" to
  his neighbours and accidental coworkers/friends in the USA, because
  while I flew to get here, and I even crossed an ocean to do so, I
  might as well have walked instead.

  To be honest, my close family and probably most of my friends in Perú
  would instead call me a "characato" but I am starting to worry I am
  getting slightly off-topic here.

  About "what I do", it is a little complicated; I used to call myself a
  "server babysitter" until I had a real human one and realized how
  inaccurate that was. I usually have a lot of computers around me and
  one day realized I might become a cyborg of sorts even if none of them
  is strictly connected to me, because AFAIK nobody has figured out how
  to do that yet, but again I seem to be going off-topic, because I am
  guessing what you really meant is either "what it says in my current
  business card" or "what sort of thing I do to contribute to society
  that is good enough so I have the means to pay the bills"?

  Well; due to either a series of unfortunate misunderstandings or some
  bureaucratic mistake akin to the Vogon Constructor Fleet job that
  destroyed earth in the beginning of the Hitchhiker of the Galaxy, I am
  now open to a lot more opportunities to help you do anything, and MUST
  do it for free.  Hope that is a good answer, but ping me if you would
  like some additional explanation.

* What would you name your most important contribution to Git?

  None.

  I did break Git for macOS once long ago when I was trying to make it
  more useful in Linux. Then, I did the same at least once for
  Windows after I bought an Apple computer to make sure that
  wouldn't happen again and changed my email address so no one would be
  able to connect the dots.

  I might have found one bug in Windows that might have redeemed me from
  that breakage after I bought a Windows computer for similar reasons
  though.

  I did fix Git for Minix after I met Linus Torvalds in a Google
  conference and just in spite of him not understanding a funny joke I
  made (not a fault of his, I am sure, since I have such a thick accent
  I sometimes can't understand myself), but I had yet to upstream the
  patches, so maybe that?

  Eitherway, I am hoping whatever it is, it will be great and might make
  my mom or my son proud, even if it is yet to come.

* What are you doing on the Git project these days, and why?

  scratching itches and learning from the best, aren't you?

* If you could get a team of expert developers to work full time on
  something in Git for a full year, what would it be?

  I'm not sure if it will take a full year, but it would be great to
  have a Git conference to get everyone in a room (obviously not while
  there is a pandemic, of course).

  Something less ambitious but maybe even more effective, would be to get a
  virtual hackathon, eventhough I had to admit realistically a physical
  one would be even better.

  It is a shame they don't do the "Linux cruise" anymore, but it might
  be also a good format at a much smaller scale and I even remember
  reading somewhere that even in a cruise (which usually has terrible
  internet connectivity), Git was still useful since you might as well
  send patches around in USB drives.

  I guess the first thing to implement in that hackaton might be ZMODEM
  transport for git push/pull, and I might be more than happy to make
  sure everyone has a working cable to use if they are still lucky
  enough to get a computer that has a DB9.

* If you could remove something from Git without worrying about
  backwards compatibility, what would it be?

  The bugs, but then even those are fun to have from time to time.

* What is your favorite Git-related tool/library, outside of Git itself?

  I don't have a favorite, but it is because I just don't know enough to have one.
  Luckily you guys have this monthly "magazine" of sorts, so I might be
  able to eventually find one.

  It sort of feels as exciting as when I used to go to one private
  library in my hometown to read about the latest games in the computer
  magazines they had that I might be able to type into that first
  computer my parents got for me, that had an 8-bit CPU and 64KB of RAM
  (not all of it totally addressable though, as it also had a ROM with a
  basic interpreter that I think used half of that), but I am not sure.

* Do you happen to have any memorable experience w.r.t contributing to the
  Git project? If yes, could you share it with us?

  Lots indeed, that is why I sometimes actively try to fix some bugs any
  reasonable person would either ignore or at most report.

  My code might be a mess, but I think it is usually better than a bug,
  and I get the chance to get to work and learn from people that are way
  better than me at fixing them, mostly nicer as well, and especially
  way more patient than I would be.

* How does your mailing list workflow look like?

  What do you mean by workflow?

  (_Editor's note: Here, Carlo jokes about his workflow which according
   to him "is a nightmare that is stitched together with masking tape"_)

* What is your advice for people who want to start Git development?
  Where and how should they start?

  My first contribution was probably a real and annoying bug that I
  couldn't believe was there, so most people I presume would just
  scratch that itch and go away.

  Some might fall in love with the technology, or the community and come
  back like I did.

  Regardless of that, there is a lot of wisdom (and luckily for me,
  incomplete features or minor bugs) which once you realize this tool is
  meant to be used by developers, kind of makes sense.

  The documentation and the list content is pure gold, so take your time
  to read as much of it as you can first, if possible.

  Jump straight at it and make sure all the tests and linters are quiet
  and try to fight the urge to send it out until you can't improve it
  further and let it go.

  Read the feedback you'd get, and try to improve it further based on
  that, and iterate.  Be patient and take your time.

* If there's one tip you would like to share with other Git developers,
  what would it be?

  Don't Panic

## Releases

+ Git [2.36.1](https://public-inbox.org/git/xmqqczgqmv0f.fsf@gitster.g/)
+ Git for Windows [2.36.1(1)](https://github.com/git-for-windows/git/releases/tag/v2.36.1.windows.1)
+ GitLab [15.0](https://about.gitlab.com/releases/2022/05/22/gitlab-15-0-released/)
[14.10.3](https://about.gitlab.com/releases/2022/05/16/gitlab-14-10-3-released/),
[14.10.2](https://about.gitlab.com/releases/2022/05/05/gitlab-14-10-2-released/),
[14.10.1, 14.9.4, and 14.8.6](https://about.gitlab.com/releases/2022/05/02/security-release-gitlab-14-10-1-released/)
+ Gerrit Code Review [3.3.11](https://www.gerritcodereview.com/3.3.html#3311)
+ GitHub Enterprise [3.5.0](https://help.github.com/enterprise-server@3.5/admin/release-notes#3.5.0),
[3.4.3](https://help.github.com/enterprise-server@3.4/admin/release-notes#3.4.3),
[3.3.8](https://help.github.com/enterprise-server@3.3/admin/release-notes#3.3.8),
[3.2.13](https://help.github.com/enterprise-server@3.2/admin/release-notes#3.2.13),
[3.1.21](https://help.github.com/enterprise-server@3.1/admin/release-notes#3.1.21)
+ GitKraken [8.5.0](https://support.gitkraken.com/release-notes/current)
+ Tower for Windows [3.2](https://www.git-tower.com/release-notes/windows)

## Other News

__Various__

+ [Mastering Tower for Mac — 40 Tips in under 10 Minutes](https://youtu.be/OChAwMBLjnY) video by Bruno Brito.

__Light reading__

+ [Mastering Tower (Mac Edition)](https://www.git-tower.com/blog/mastering-tower/) by Bruno Brito on Tower's blog.


__Git tools and sites__


## Credits

This edition of Git Rev News was curated by
Christian Couder &lt;<christian.couder@gmail.com>&gt;,
Jakub Narębski &lt;<jnareb@gmail.com>&gt;,
Markus Jansen &lt;<mja@jansen-preisler.de>&gt; and
Kaartic Sivaraam &lt;<kaartic.sivaraam@gmail.com>&gt;
with help from Bruno Brito.
