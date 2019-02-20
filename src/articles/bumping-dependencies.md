---
title: Updating dependencies
description: How often should I update my external project dependencies ?
date: 2019-02-16
author: Florent Le Gall
published: false
tags:
  - dependencies
  - tech debt
  - change management
---

Over the last two decades, most software development projects tend to include more and more project dependencies. We sometimes don't fully realize it, but with the availability of so many open source libraries and tools, our projects tend to depend a lot on external dependencies.

The use of some libraries is of course questionable: a few years ago the "left-pad" fiasco made us realize that a lot of open source tools and libraries were relying indirectly on a tiny library whose sole role was to pad spaces on the left... Nevertheless, it's rare to build a complete project without open-source tools or open-source software libraries, even when writing in pure C.

## Libraries and versions
