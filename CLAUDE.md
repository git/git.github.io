# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the Git Developer Pages website (https://git.github.io), a Jekyll-based static site that serves as an information hub for Git developers. The site contains resources about Git development, the Git Rev News newsletter, and information about mentoring programs like Outreachy and Google Summer of Code.

## Development Commands

### Local Development
```bash
# Install dependencies
bundle install

# Serve site locally
bundle exec jekyll serve

# Site will be available at http://localhost:4000
```

### Adding Content
- Newsletter editions are in `_posts/` with filenames following the pattern `YYYY-MM-DD-edition-XX.markdown`
- Each newsletter edition uses Jekyll front matter with title, layout, date, author, and categories
- Regular pages are Markdown files with YAML front matter specifying layout and title
- Static files (CSS, images) are in their respective directories

## Codebase Structure

### Key Directories
- `_posts/` - Git Rev News newsletter editions (published monthly)
- `_layouts/` - HTML templates for page structure
- `_includes/` - Reusable HTML components
- `rev_news/` - Newsletter-specific pages and archives
- Root directory - Main pages like README.md, Hacking-Git.md, mentoring program information

### Important Files
- `Hacking-Git.md` - Core resource for Git developers with links to documentation
- `General-Application-Information.md` - Mentoring program requirements and guidelines
- `_config.yml` - Jekyll configuration
- `Gemfile` - Ruby dependencies

## Architecture

This is a standard Jekyll static site generator setup:
- Markdown content files are processed into static HTML
- Liquid templating engine used for dynamic content inclusion
- Posts in `_posts/` are automatically processed as blog entries
- Custom layouts in `_layouts/` define page structure
- Configuration in `_config.yml` controls site behavior

The site serves multiple purposes:
1. Resource hub for Git developers with documentation links
2. Host for the Git Rev News newsletter
3. Information center for mentoring programs
4. Community resource for Git development practices

## Common Development Tasks

### Adding a Newsletter Edition
1. Create a new file in `_posts/` with the naming convention `YYYY-MM-DD-edition-XX.markdown`
2. Use the standard front matter format (title, layout, date, author, categories)
3. Follow the content structure of previous editions
4. Test locally with `bundle exec jekyll serve`

### Updating Mentoring Program Information
1. Modify the appropriate Markdown files (e.g., `General-Application-Information.md`)
2. Ensure links to external resources are still valid
3. Update any outdated information about application processes
4. Test locally with `bundle exec jekyll serve`

this project is using github claude code action