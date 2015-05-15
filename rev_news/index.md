---
layout: default
title: Git Rev News Archive
---

Here you can see all the previous editions. See [Git Rev News](/rev_news/rev_news.html) for ways you can subscribe.

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>

# Latest edition
{% for post in site.posts limit:1 %}
  {% include news_item.html %}
{% endfor %}

