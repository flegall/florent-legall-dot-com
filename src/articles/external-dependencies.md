---
title: Picking and updating external dependencies
description: How should I pick my external dependencies, when you I update those ?
date: 2019-02-24
author: Florent Le Gall
published: false
tags:
  - dependencies
  - tech debt
  - change management
  - versions
  - semver
---

Over the last two decades, most software development projects tend to include more and more open-source dependencies. We sometimes don't fully realize it, but with the availability of so many great open source libraries and tools, we tend to depend a lot on external dependencies.

The use of some libraries is of course questionable: a few years ago the ["left-pad" fiasco](https://www.theregister.co.uk/2016/03/23/npm_left_pad_chaos/) made us realize that a lot of open source tools and libraries were relying indirectly on a tiny library whose sole role was to add missing spaces on the left... Nevertheless, it's becoming rare to build a complete professional project without a single library. And even without libraries we have to rely on the language toolchain which is very often an external dependency.

This raises a first question :
**How should I pick my dependencies ?**

Also, dependencies evolves at a different pace than the project we build. Changes are of many kinds : defects are corrected, security fixes are implemented, new features gets added, new APIs are proposed and sometimes breaking changes happen, some APIs get deprecated.

This raises a second question :
**When should we update the external dependencies ?**

## Choose wisely your dependencies

### Architectural dependencies

It's quite obvious that there are base dependencies derived from your architecture choices :
your toolchain (compiler/builder, test framework, linter), your language sdk, your http / application server, your frontend library or framework, your database.

These dependencies are usually not questionned as the architure defines them.

### Opportunist dependencies

Many dependencies are not always decided upfront. They are usually picked opportunistically. One tool/library seems good at its job, it doesn't seem to cause too much trouble (at least at first).

Some of these choices are harmless as they have little impact on the codebase. Some have more impact.

I've done this mistake of picking opportunist dependencies quite a few times.

### Including checklist

Before including a dependency it's fair to ask yourself a few questions :

- What will it bring ?
  - That's usually the easiest to answer, but that's clearly not enough to take a decision.
- How flexible is it ?
  - In particular, what can I do with it without the need of using it in a hacky way or forking it ?
  - This is the number one turn-off reason for me.
- How much will my code be coupled to it ?
  - It's usually not a turn-off, but a weight to take into account. Libraries and tools are sometimes meant to be totally coupled with your code and that's fine !
  - Keep in mind that if it's the case, the dependency will be way more expensive to replace.
- Are updates/upgrades usually smooth ?
  - This is hard to guess. For that I will look at the changelog, look for breaking changes, look for automated upgrade paths aka [codemods](https://github.com/facebook/codemod). This is a good sign that upgrades will be smooth.
  - Also look if a company is building it and using it for its own products, if they are using it seriously, they probably care more about the upgrade path.

If you feel comfortable with your answers, go ahead and pick it !

## Version your dependencies

Of course you want to version your dependencies, so that everyone working on your project has the same.

There are two ways of doing that :

- Keeping your dependencies source under source control:

  - You do not require an internet connection or a package registry to be up to install your project.
  - The dependencies are guaranted to be identical to those in the original installation.
  - The source control repo will take more space.
  - There can be conflicts when several dependency updates are made on different branches.

- Keeping only your dependencies versions under source control :
  - It usually requires an internet connection and a package registry to be up in order to set up the project
  - There is a list of dependencies and usually a lockfile to ensure the dependencies versions and properly installed.
  - The source repo will take less space.
  - It's usually easier to update dependencies

There is no definite answer to this.

Most teams I've worked with prefer the second option.

Most tools will accept both strategies.
Some tools officially recommend the first one ([cocoapods](https://guides.cocoapods.org/using/using-cocoapods.html), [godep](https://github.com/tools/godep#how-to-use-godep-with-a-new-project)).
Some tools will only accept the latest one ([maven](https://maven.apache.org/) and all its derived products)
Recently Yarn proposed a way to get rid of the node_modules directory : https://yarnpkg.com/en/docs/pnp/

**Choose the one your team and your tools work best with.**

## When to update ?

## Automating your updates
