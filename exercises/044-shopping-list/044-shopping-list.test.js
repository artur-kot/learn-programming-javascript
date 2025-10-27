import { test } from 'node:test';
import assert from 'node:assert';
import { addItem, getItem, addToList, getList, clearList } from './044-shopping-list.js';

test('addToList adds item to list', () => {
  clearList();
  addToList('milk');
  assert.deepStrictEqual(getList(), ['milk']);
});

test('addToList adds multiple items', () => {
  clearList();
  addToList('milk');
  addToList('bread');
  addToList('eggs');
  assert.deepStrictEqual(getList(), ['milk', 'bread', 'eggs']);
});

test('addToList allows duplicate items', () => {
  clearList();
  addToList('milk');
  addToList('milk');
  assert.deepStrictEqual(getList(), ['milk', 'milk']);
});

test('getList returns array', () => {
  clearList();
  assert.ok(Array.isArray(getList()));
});

test('clearList removes all items', () => {
  clearList();
  addToList('item1');
  addToList('item2');
  clearList();
  assert.deepStrictEqual(getList(), []);
});

test('clearList on empty list', () => {
  clearList();
  clearList();
  assert.deepStrictEqual(getList(), []);
});

test('previous functions still work', () => {
  addItem('single');
  assert.strictEqual(getItem(), 'single');
});