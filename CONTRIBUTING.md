# Contributing to Git Developer Pages

Thank you for your interest in contributing to [git.github.io](https://git.github.io) — the community website for Git development, home to the [Git Rev News newsletter](https://git.github.io/rev_news/), [Hacking Git](https://git.github.io/Hacking-Git/), and mentoring program information.

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

- Fix typos, broken links, or outdated information
- Improve or add pages under `links/`, `rev_news/`, or other sections
- Add entries to the Git Rev News newsletter
- Improve site infrastructure (CSS, JavaScript, Jekyll layouts/plugins)
- Report issues via [GitHub Issues](https://github.com/git/git.github.io/issues)

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
4. **Make your changes**, following the [Writing Guidelines](#writing-guidelines) below.
5. **Test locally** by [running the site](#running-the-site-locally) and verifying your changes look correct.
6. **Commit** with a clear, descriptive message:
   ```sh
   git add .
   git commit -m "Brief description of the change"
   ```
7. **Push** to your fork and open a Pull Request against the `master` branch of this repository.

> **Note:** Keep PRs focused on a single topic. Avoid mixing unrelated changes (e.g., infrastructure changes with content updates).

---

## Submitting Changes via Email

If you prefer not to use GitHub, you can send patches by email to the maintainers:

- **Christian Couder** — <christian.couder@gmail.com>
- **Kaartic Sivaraam** — <kaartic.sivaraam+git@gmail.com>

You may also CC the Git mailing list at <git@vger.kernel.org> if appropriate.

---

## Running the Site Locally

This site is built with [Jekyll](https://jekyllrb.com/) and hosted via GitHub Pages.

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

See [GitHub Pages documentation](https://help.github.com/articles/using-jekyll-with-pages/) for more details.

---

## Writing Guidelines

- Use clear, concise language suitable for a developer audience.
- Write content in **Markdown** (`.md` or `.markdown` files).
- Use relative links within the site where possible.
- When adding code examples, use fenced code blocks with a language tag:
  ````
  ```sh
  git log --oneline
  ```
  ````
  Supported languages for syntax highlighting include: `sh`/`bash`, `c`, `diff`, `go`, `ini`, `python`, `ruby`, `yaml`, and others.
- Avoid adding unnecessary dependencies or large binary assets.

---

## Code Style

- **JavaScript / CSS:** Keep changes minimal and consistent with the existing style in `script/` and `css/`.
- **Jekyll Layouts & Plugins:** Changes to `_layouts/`, `_includes/`, or `_plugins/` should be well-tested locally before submitting.
- **Gemfile:** Do **not** modify the `Gemfile` unless there is a clear, necessary reason — it is shared and affects all contributors' environments.
- **Whitespace:** Prefer Unix line endings (LF). Avoid trailing whitespace.

---

## Git Rev News Newsletter

The [Git Rev News](https://git.github.io/rev_news/) newsletter is published monthly. Each edition is a Markdown file under `_posts/`.

If you want to contribute to a newsletter edition:
- Check the [news sources](https://git.github.io/rev_news/news_sources/) page for submission guidelines.
- Contact the maintainers via email (see [above](#submitting-changes-via-email)).

---

## Reporting Issues

Found a bug, broken link, or outdated content? Please [open an issue](https://github.com/git/git.github.io/issues/new) on GitHub with:

- A clear title describing the problem.
- The URL of the affected page (if applicable).
- Steps to reproduce or a description of what you expected vs. what you saw.

---

We appreciate every contribution, big or small. Thank you for helping improve the Git community website!
