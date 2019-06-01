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

Are you **enjoying** it ?

In many software development teams, a large amount of people do not like writing tests. This doesn't mean they don't write tests, but they treat this activity as a chore and delay it after implementation. As a result the tests that get written are of **lower quality than the production code** they tests.

This is **sad** and has many **downsides**:

- This makes **testing less attractive** to people as the current tests are of lower quality.
- This makes **bugfixing more difficult**, as it's more difficult to step in the test suites, it's a lot harder to write a test case that reproduce the issue.
- All in all, this contributes to **a vicious circle** where writing and maintaining tests is seen as a chore, tests are of poor quality.

For most people, automated tests are seen as a way to reach **quality assurance**. Automated tests are indeed **a net to prevent mistakes and defects**. And it will work not only on what we build now, but also in what we will build in the future to **avoid regressions**.

While this is a very valid reason, this is not the only one reason why I write tests, I will present you the many reasons I write automated tests.

## When tests guide me

Very often when working on a feature or a complex defect to fix, I usually write all use cases I have in mind using a full sentence as a test name and an empty code block as an implementation.

```js
describe("a vacuum cleaner", () => {
  it("starts when pushing the power button if it is not started", () => {});
  it("stops when pushing the power button if it is started", () => {});
  it("changes speed when turning the speed button if it is started", () => {});
  // And so on ...
});
```

This allows me to list all use cases I have in mind when beginning work. It makes the work way less intimidating.

After that I can start implementing each use case one by one, I will at some point add more tests as the initial lists was maybe incomplete. I can then see how much progress I've made so far.

We can indeed see this as a todo list.

## When tests help me to think and design the software I'm building

## When tests document the product I'm building

```js
describe("a tv recorder", () => {
  it(`will record a tv program when pressing on the "record" button if : 
      - there is enough space on device.
      - there is at least one free tuner available on the set-top-box`, () => {});
  it(`will not record a tv program when pressing on the "record" button 
      - if there is not enough space on the hard disk.
      - then the error message "no space left on hard disk" will be shown.`, () => {});
});
```

## When tests make sure I can change what I'm building

## When tests provide quality assurance

## To sum up
