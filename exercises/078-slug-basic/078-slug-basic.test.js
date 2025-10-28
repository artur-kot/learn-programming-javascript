import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  basicSlug,
  createBlogPostUrl,
  convertToSlug
} from './078-slug-basic.js';

test('URL Slug Generator - Basic Conversion', async (t) => {
  
  await t.test('basicSlug converts title to lowercase', () => {
    assert.equal(basicSlug("HELLO"), "hello");
    assert.equal(basicSlug("JavaScript"), "javascript");
  });

  await t.test('basicSlug replaces single space with hyphen', () => {
    assert.equal(basicSlug("hello world"), "hello-world");
    assert.equal(basicSlug("Web Design"), "web-design");
  });

  await t.test('basicSlug replaces multiple spaces with hyphens', () => {
    assert.equal(basicSlug("Learn JavaScript Basics"), "learn-javascript-basics");
    assert.equal(basicSlug("Web Development for Beginners"), "web-development-for-beginners");
  });

  await t.test('basicSlug handles mixed case', () => {
    assert.equal(basicSlug("LaRgE AnD sMaLl"), "large-and-small");
    assert.equal(basicSlug("Python Programming"), "python-programming");
  });

  await t.test('basicSlug handles single words', () => {
    assert.equal(basicSlug("hello"), "hello");
    assert.equal(basicSlug("WORLD"), "world");
  });

  await t.test('basicSlug handles titles with numbers', () => {
    assert.equal(basicSlug("Learn JavaScript in 30 Days"), "learn-javascript-in-30-days");
    assert.equal(basicSlug("Top 10 Tips"), "top-10-tips");
  });

  await t.test('createBlogPostUrl creates full URL with slug', () => {
    assert.equal(
      createBlogPostUrl("Learn JavaScript Basics"),
      "https://myblog.com/posts/learn-javascript-basics"
    );
  });

  await t.test('createBlogPostUrl works with various titles', () => {
    assert.equal(
      createBlogPostUrl("Web Development for Beginners"),
      "https://myblog.com/posts/web-development-for-beginners"
    );
    assert.equal(
      createBlogPostUrl("Getting Started"),
      "https://myblog.com/posts/getting-started"
    );
  });

  await t.test('convertToSlug works identically to basicSlug', () => {
    assert.equal(convertToSlug("Hello World"), "hello-world");
    assert.equal(convertToSlug("JavaScript Tips"), "javascript-tips");
    assert.equal(convertToSlug("Python Programming"), "python-programming");
  });

  await t.test('functions do not modify original input', () => {
    const original = "Hello World";
    basicSlug(original);
    assert.equal(original, "Hello World");
  });

});
