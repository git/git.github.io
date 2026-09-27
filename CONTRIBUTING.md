# Contributing to Git Developer Pages

Thank you for your interest in contributing to [git.github.io](https://git.github.io),
the community website for Git development, home to the
[Git Rev News newsletter](https://git.github.io/rev_news/),
[Hacking Git](https://git.github.io/Hacking-Git/), and mentoring program
information.

---

## Table of Contents

- [Ways to Contribute](#ways-to-contribute)
- [Submitting Changes via Pull Request](#submitting-changes-via-pull-request)
- [Submitting Changes via Email](#submitting-changes-via-email)
- [Running the Site Locally](#running-the-site-locally)
- [Writing Guidelines](#writing-guidelines)
- [Code Style](#code-style)
- [Git Rev News Newsletter](#git-rev-news-newsletter)
- [Reporting Issues](#reporting-issues)

---

## Ways to Contribute

In general we accept all kind of contributions to all the pages on
this website, but here are some suggestions along with a few
guidelines:

- Fix typos, broken links, or outdated information across the site
  (except for already published editions of Git Rev News, which are
  kept as historical archives). If possible, open a Pull Request (PR)
  to submit your changes.
- Improve or add content to sections of the website such as the
  Links page, Mentoring pages, or general documentation (opening a PR
  is preferred for these as well).
- Add entries or articles to the upcoming edition of the Git Rev News
  newsletter (see [below](#git-rev-news-newsletter)).
- Improve site infrastructure (CSS, JavaScript, Jekyll layouts, or
  plugins). Before starting work on major improvements, please check
  [existing issues](https://github.com/git/git.github.io/issues) and
  open a new issue for discussion first.
- Participate in community discussions by sharing opinions on
  [open issues](https://github.com/git/git.github.io/issues) or
  reviewing [open Pull Requests](https://github.com/git/git.github.io/pulls).
- Report bugs, broken links, or suggestions via
  [GitHub Issues](https://github.com/git/git.github.io/issues).

---

## Submitting Changes via Pull Request

1. **Fork** this repository on GitHub.
2. **Clone** your fork locally:
   ```sh
   git clone https://github.com/<your-username>/git.github.io.git
   cd git.github.io
   ```
3. **Create a branch** for your changes:
   ```sh
   git checkout -b my-fix
   ```
4. **Make your changes**, following the [Writing Guidelines](#writing-guidelines)
   below.
5. **Test locally** if needed by [running the site](#running-the-site-locally)
   and verifying your changes look correct. (Note: this is not required
   for newsletter contributions or small changes like typofixes.)
6. **Commit** with a clear, descriptive message:
   ```sh
   git add .
   git commit -m "Brief description of the change"
   ```
   For Git Rev News contributions, use the `rn-XXX: ` prefix for your
   commit subject (e.g. `rn-114: Add link to new Git tutorial`).
7. **Push** to your fork and open a Pull Request against the `master`
   branch of this repository.

> **Note:** Keep PRs focused on a single topic. Avoid mixing unrelated
> changes (such as infrastructure changes with content updates).

---

## Submitting Changes via Email

If you prefer not to use GitHub, you can send patches by email to the
maintainers:

- **Christian Couder**: <christian.couder@gmail.com>
- **Kaartic Sivaraam**: <kaartic.sivaraam+git@gmail.com>

You may also CC the Git mailing list at <git@vger.kernel.org> if
appropriate.

---

## Running the Site Locally

This site is built with [Jekyll](https://jekyllrb.com/) and hosted via
GitHub Pages.

Note: Running the site locally is helpful when working on layouts,
styles, or general pages, but it is **not required** when submitting
content for Git Rev News editions or sending typofixes and similar
small changes.

### Prerequisites

- Ruby (2.x or later) with development packages
- Bundler

### Steps

```sh
# Install system dependency (Ubuntu/Debian)
sudo apt-get install zlib1g-dev

# Install Bundler gem
sudo gem install bundler

# Clone the repo and install dependencies
git clone https://github.com/git/git.github.io.git
cd git.github.io
bundle install

# Start the local server
bundle exec jekyll serve
```

Then open your browser at <http://localhost:4000>.

See [GitHub Pages documentation](https://help.github.com/articles/using-jekyll-with-pages/)
for more details.

---

## Writing Guidelines

- Use clear, concise language suitable for a developer audience.
- Write content in **Markdown** (`.md` or `.markdown` files).
- Keep lines wrapped at around 72 characters when possible.
- Use relative links within the site where possible.
- When adding code examples, use fenced code blocks with a language
  tag:
  ````
  ```sh
  git log --oneline
  ```
  ````
  Supported languages for syntax highlighting include: `sh`/`bash`,
  `c`, `diff`, `go`, `ini`, `python`, `ruby`, `yaml`, and others.
- Avoid adding unnecessary dependencies or large binary assets.

---

## Code Style

- **JavaScript / CSS:** Keep changes minimal and consistent with the
  existing style in `script/` and `css/`.
- **Jekyll Layouts & Plugins:** Changes to `_layouts/`, `_includes/`, or
  `_plugins/` should be well-tested locally before submitting.
- **Gemfile:** Do **not** modify the `Gemfile` unless there is a
  clear, necessary reason, as it is shared and affects all
  contributors' environments.
- **Whitespace:** Prefer Unix line endings (LF). Avoid trailing
  whitespace.

---

## Git Rev News Newsletter

The [Git Rev News](https://git.github.io/rev_news/) newsletter is
published monthly.

### How to Contribute Content

Before being published, an upcoming edition is prepared in advance
as a draft Markdown file under `rev_news/drafts/` (e.g.
`rev_news/drafts/edition-XXX.md`). When an edition is published, its
file is moved under `_posts/` and renamed (e.g.
`_posts/YYYY-MM-DD-edition-XXX.markdown`).

You can contribute in several ways:
- **Share entries in the edition issue:** A dedicated GitHub Issue is
  opened for every upcoming edition, titled `"Any comment about
  upcoming Git Rev News edition XXX"` (where `XXX` is the edition
  number; for example, see [Issue #860](https://github.com/git/git.github.io/issues/860)).
  You can comment directly on that issue with links, articles,
  tools, or news you would like included.
- **Submit a Pull Request:** Add your entry directly to the draft file
  under `rev_news/drafts/` for the upcoming edition. Common entries
  include:
  - Links and short descriptions for tutorials, articles, or blog posts.
  - Recent Git-related releases, tools, or projects.
  - Discussions from the Git mailing list.
  - Lighthearted Git-related content.
- **Submission guidelines:** Check the
  [news sources](https://git.github.io/rev_news/news_sources/) page for
  more suggestions on finding news items.
- **Email:** Contact the maintainers via email (see
  [above](#submitting-changes-via-email)).

### Newsletter Guidelines

- **Do not edit past editions:** Already published editions are
  archived historical records and should not be modified.
- **No local testing required:** You do not need to install Ruby or
  build the site locally when submitting newsletter entries.
- **Commit prefix:** Format your commit message subject starting with
  `rn-XXX: ` where `XXX` is the edition number (e.g.
  `rn-114: Add link to Git tutorial`).

---

## Reporting Issues

Found a bug, broken link, or outdated content? Please
[open an issue](https://github.com/git/git.github.io/issues/new) on
GitHub with:

- A clear title describing the problem.
- The URL of the affected page (if applicable).
- Steps to reproduce or a description of what you expected vs. what
  you saw.

---

We appreciate every contribution, big or small. Thank you for helping
improve the Git community website!
