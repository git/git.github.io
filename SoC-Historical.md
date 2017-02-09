---
layout: default
title: Historical Summer of Code Materials
---

These pages are historical application materials for Summer of Code and
other programs. They are for reference only!

<ul>
{% for node in site.pages reversed %}
  {% if node.navbar == false %}
    {% if node.title contains "SoC" or node.title contains "Outreachy" %}
      <li><a href="{{node.url}}">{{node.title}}</a>
    {% endif %}
  {% endif %}
{% endfor %}
