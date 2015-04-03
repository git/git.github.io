---
layout: default
title: Git Rev News Archive
---

Here you can see all the previous editions.

{% for post in site.posts %}
  {% include news_item.html %}
{% endfor %}

