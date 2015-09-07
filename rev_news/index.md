---
layout: default
title: Git Rev News
---

# Latest edition

{% for post in site.posts limit:1 %}
  {% include news_item.html %}
{% endfor %}

