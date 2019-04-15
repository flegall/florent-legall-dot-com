---
title: Why do I write tests ?
description: The many reasons I write tests.
date: 2019-04-14
author: Florent Le Gall
published: false
tags:
  - testing
  - living documentation
  - automated tests
  - experimentations
---

**Do you write automated tests ?**

Are you enjoying it ?

In many software development teams, a large amount of people don't like writing tests. This doesn't mean they don't write tests, but they treat this activity as a chore. As a result the tests that get written are of **lower quality than the production code** they tests.

This is **sad** and has many **downsides**:

- This makes **testing less attractive** to people as the current tests are of lower quality.
- This makes **bugfixing more difficult**, as it's more difficult to step in the test suites, understand how the application gets tested and reproduce issues.
- All in all, this contributes to **a vicious circle** where writing and maintaining tests is seen as a chore.

For most people, automated tests are seen as a way to reach **quality assurance**. Automated tests are indeed **a net to prevent mistakes and defects**. And it will work not only on what we build now, but also in what we will build in the future to **avoid regressions**.

While this is a very valid reason, this is not the only one reason why I write tests, I will show you why I write automated tests.

## When tests guide me

Very often when working on a feature or on a defect to fix, I usually write all use cases I have in mind using a full sentence and an empty code block.

```js
describe("a vacuum cleaner", () => {
  it("should start when pushing the power button", () => {});
  it(`should stop when:
      - the vacuum cleaner is started
      - pushing the power button`, () => {});
});
```

## When tests document the product I'm building

## When tests provide quality assurance

## To sum up
