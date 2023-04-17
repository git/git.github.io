## Git Developer Pages

- This is a website for information on Git development. If you stumbled into this by mistake, you may want:
  - Information on running Git and links to download the latest version from [HERE](https://git-scm.com/)
  - Wiki that has historically contained developer information from [HERE](https://git.wiki.kernel.org/index.php/Main_Page)

- These pages are intended to collect information useful to Git developers. This is also the web home of:
  - the [Hacking Git](https://git.github.io/Hacking-Git/) page,
  - the [Git Rev News newsletter](https://git.github.io/rev_news/),
  - the [involvement of the Git project in mentoring programs](https://git.github.io/General-Application-Information/) like [Outreachy](https://www.outreachy.org/) and the [GSoC (Google Summer of Code)](https://summerofcode.withgoogle.com/)
  
- These pages are intended to be edited collaboratively (i.e., it is an alternative to us having a wiki, but one that is edited entirely via Git pushes).

  You could also send your changes as patches by email to Christian Couder < <christian.couder@gmail.com> > / Kaartic Sivaraam < <kaartic.sivaraam+git@gmail.com> > (and feel free to cc git@vger.kernel.org if appropriate).


### Development

If you wish to spin up the site locally, you could follow the steps below.

* Make sure you've got ruby2 with dev-packages installed
* `sudo gem install bundler`
* Clone this repo
* `sudo apt-get install zlib1g-dev` # [
  [ref](http://www.nokogiri.org/tutorials/installing_nokogiri.html#ubuntu___debian)
  ]
* `bundle install`
* `bundle exec jekyll serve`
* browse the site on http://localhost:4000

Based on https://help.github.com/articles/using-jekyll-with-pages/


<br>

![Github Repo Size](https://img.shields.io/github/repo-size/git/git.github.io?style=for-the-badge&color=yellow)

<br>

<details> <summary><h2> See our Contributors 😄 </h2></summary>

<a href="https://github.com/git/git.github.io/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=git/git.github.io" />
</a>

</details>
