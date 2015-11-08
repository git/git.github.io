# About

This homepage is maintained by editing files in the
[git/git.github.io](https://github.com/git/git.github.io) repository on
GitHub.

It is meant to be edited collaboratively like a wiki, except that
instead of a web form, you get to use a text editor and git. What could
be better?

If you want push access, contact peff@peff.net and provide your GitHub
username. You may also send patches by mail (and feel free to cc
git@vger.kernel.org if appropriate).


# Development

* Make sure you've got ruby2 with dev-packages installed
* `sudo gem install bundler`
* Clone this repo
* `sudo apt-get install zlib1g-dev` # ref [1]
* `bundle install`
* `bundle exec jekyll serve`
* browse the site on http://localhost:4000

Based on https://help.github.com/articles/using-jekyll-with-pages/

[1] http://www.nokogiri.org/tutorials/installing_nokogiri.html#ubuntu___debian

