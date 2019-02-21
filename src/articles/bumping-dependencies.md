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

The use of some libraries is of course questionable: a few years ago the "left-pad" fiasco made us realize that a lot of open source tools and libraries were relying indirectly on a tiny library whose sole role was to add missing spaces on the left...

Nevertheless, it's becoming rare to build a complete professional project without a single library, and even without libraries, we have to rely on the language toolchain which is an external dependency. And by external, this often means that the library evolves as its own pace.

And very often, the libraries and toolchain change during the life of our project. Changes are of many kinds : defects are corrected, security fixes are implemented, new features gets added, new APIs are proposed and sometimes breaking changes happen some APIs get deprecated.

## Libraries and versions

In order to deal with
