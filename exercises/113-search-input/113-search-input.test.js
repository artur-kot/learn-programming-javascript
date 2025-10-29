import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  getInputValue,
  filterItems,
  displayResults,
  setupSearchListener,
  clearResults
} from './113-search-input.js';

describe('Live Search Filter - Input Event', () => {
  let dom;
  let window;
  let document;

  beforeEach(() => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head><title>Test</title></head>
      <body>
        <input id="search-input" type="text" placeholder="Search...">
        <div id="results"></div>
      </body>
      </html>
    `;
    dom = new JSDOM(html);
    window = dom.window;
    document = window.document;
    global.window = window;
    global.document = document;
  });

  describe('getInputValue', () => {
    it('should return input value', () => {
      const input = document.getElementById('search-input');
      input.value = 'test';
      expect(getInputValue(input)).toBe('test');
    });

    it('should return empty string when empty', () => {
      const input = document.getElementById('search-input');
      input.value = '';
      expect(getInputValue(input)).toBe('');
    });

    it('should return trimmed value', () => {
      const input = document.getElementById('search-input');
      input.value = '  search  ';
      const value = getInputValue(input);
      expect(value.trim()).toBe('search');
    });
  });

  describe('filterItems', () => {
    it('should filter items by search term', () => {
      const items = ['apple', 'apricot', 'banana', 'blueberry'];
      const results = filterItems(items, 'ap');
      expect(results.length).toBe(2);
      expect(results).toContain('apple');
      expect(results).toContain('apricot');
    });

    it('should be case insensitive', () => {
      const items = ['Apple', 'apricot', 'BANANA'];
      const results = filterItems(items, 'APP');
      expect(results.length).toBe(1);
      expect(results).toContain('Apple');
    });

    it('should return all items when search is empty', () => {
      const items = ['apple', 'banana', 'cherry'];
      const results = filterItems(items, '');
      expect(results.length).toBe(3);
    });

    it('should return empty array when no matches', () => {
      const items = ['apple', 'banana', 'cherry'];
      const results = filterItems(items, 'xyz');
      expect(results.length).toBe(0);
    });

    it('should match partial strings', () => {
      const items = ['javascript', 'python', 'ruby'];
      const results = filterItems(items, 'script');
      expect(results).toContain('javascript');
      expect(results.length).toBe(1);
    });
  });

  describe('clearResults', () => {
    it('should clear results container', () => {
      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = '<div>result</div>';
      clearResults(resultsContainer);
      expect(resultsContainer.innerHTML).toBe('');
    });

    it('should handle already empty container', () => {
      const resultsContainer = document.getElementById('results');
      expect(() => clearResults(resultsContainer)).not.toThrow();
    });
  });

  describe('displayResults', () => {
    it('should display items', () => {
      const resultsContainer = document.getElementById('results');
      const items = ['apple', 'banana'];
      displayResults(resultsContainer, items);
      expect(resultsContainer.children.length).toBeGreaterThan(0);
    });

    it('should show each item', () => {
      const resultsContainer = document.getElementById('results');
      const items = ['apple', 'banana', 'cherry'];
      displayResults(resultsContainer, items);
      const text = resultsContainer.textContent;
      expect(text).toContain('apple');
      expect(text).toContain('banana');
      expect(text).toContain('cherry');
    });

    it('should clear before displaying', () => {
      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = '<div>old</div>';
      displayResults(resultsContainer, ['apple']);
      expect(resultsContainer.textContent).not.toContain('old');
    });

    it('should show message when no results', () => {
      const resultsContainer = document.getElementById('results');
      displayResults(resultsContainer, []);
      expect(resultsContainer.textContent.length).toBeGreaterThan(0);
    });
  });

  describe('setupSearchListener', () => {
    it('should attach input listener', () => {
      const input = document.getElementById('search-input');
      const resultsContainer = document.getElementById('results');
      const items = ['apple', 'banana'];
      
      const inputSpy = vi.spyOn(input, 'addEventListener');
      setupSearchListener(input, resultsContainer, items);
      
      expect(inputSpy).toHaveBeenCalledWith('input', expect.any(Function));
    });

    it('should filter on input change', () => {
      const input = document.getElementById('search-input');
      const resultsContainer = document.getElementById('results');
      const items = ['apple', 'apricot', 'banana'];
      
      setupSearchListener(input, resultsContainer, items);
      
      input.value = 'ap';
      input.dispatchEvent(new window.Event('input'));
      
      const text = resultsContainer.textContent;
      expect(text).toContain('apple');
      expect(text).toContain('apricot');
    });

    it('should update results when typing', () => {
      const input = document.getElementById('search-input');
      const resultsContainer = document.getElementById('results');
      const items = ['apple', 'apricot', 'banana', 'blueberry'];
      
      setupSearchListener(input, resultsContainer, items);
      
      input.value = 'b';
      input.dispatchEvent(new window.Event('input'));
      
      const text = resultsContainer.textContent;
      expect(text).toContain('banana');
      expect(text).toContain('blueberry');
    });

    it('should show all items when search cleared', () => {
      const input = document.getElementById('search-input');
      const resultsContainer = document.getElementById('results');
      const items = ['apple', 'banana', 'cherry'];
      
      setupSearchListener(input, resultsContainer, items);
      
      input.value = '';
      input.dispatchEvent(new window.Event('input'));
      
      const text = resultsContainer.textContent;
      expect(text).toContain('apple');
      expect(text).toContain('banana');
      expect(text).toContain('cherry');
    });
  });
});
