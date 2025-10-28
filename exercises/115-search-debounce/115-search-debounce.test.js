import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  debounce,
  clearDebounceTimeout,
  createDebouncedSearch,
  setupDebouncedInput,
  getDebounceDelay
} from './115-search-debounce.js';

describe('Live Search Filter - Debounce Input', () => {
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
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('debounce', () => {
    it('should delay function execution', () => {
      const func = vi.fn();
      const debounced = debounce(func, 300);
      
      debounced();
      expect(func).not.toHaveBeenCalled();
      
      vi.advanceTimersByTime(300);
      expect(func).toHaveBeenCalledTimes(1);
    });

    it('should cancel previous calls', () => {
      const func = vi.fn();
      const debounced = debounce(func, 300);
      
      debounced();
      vi.advanceTimersByTime(100);
      debounced();
      vi.advanceTimersByTime(100);
      debounced();
      
      vi.advanceTimersByTime(300);
      expect(func).toHaveBeenCalledTimes(1);
    });

    it('should pass arguments to function', () => {
      const func = vi.fn();
      const debounced = debounce(func, 300);
      
      debounced('test', 123);
      vi.advanceTimersByTime(300);
      
      expect(func).toHaveBeenCalledWith('test', 123);
    });

    it('should use correct delay', () => {
      const func = vi.fn();
      const debounced = debounce(func, 500);
      
      debounced();
      vi.advanceTimersByTime(400);
      expect(func).not.toHaveBeenCalled();
      
      vi.advanceTimersByTime(100);
      expect(func).toHaveBeenCalled();
    });
  });

  describe('clearDebounceTimeout', () => {
    it('should clear timeout', () => {
      const func = vi.fn();
      const timeoutId = setTimeout(func, 300);
      
      clearDebounceTimeout(timeoutId);
      vi.advanceTimersByTime(300);
      
      expect(func).not.toHaveBeenCalled();
    });

    it('should handle invalid timeout id', () => {
      expect(() => clearDebounceTimeout(null)).not.toThrow();
      expect(() => clearDebounceTimeout(undefined)).not.toThrow();
    });
  });

  describe('getDebounceDelay', () => {
    it('should return delay based on item count', () => {
      expect(getDebounceDelay(10)).toBeGreaterThan(0);
      expect(getDebounceDelay(100)).toBeGreaterThan(0);
      expect(getDebounceDelay(1000)).toBeGreaterThan(0);
    });

    it('should return longer delay for more items', () => {
      const smallDelay = getDebounceDelay(10);
      const largeDelay = getDebounceDelay(10000);
      expect(largeDelay).toBeGreaterThanOrEqual(smallDelay);
    });

    it('should return reasonable delays', () => {
      const delay = getDebounceDelay(100);
      expect(delay).toBeGreaterThanOrEqual(100);
      expect(delay).toBeLessThanOrEqual(1000);
    });
  });

  describe('createDebouncedSearch', () => {
    it('should return a function', () => {
      const items = ['apple', 'banana'];
      const resultsContainer = document.getElementById('results');
      const debouncedSearch = createDebouncedSearch(items, resultsContainer, 300);
      
      expect(typeof debouncedSearch).toBe('function');
    });

    it('should debounce search execution', () => {
      const items = ['apple', 'apricot', 'banana'];
      const resultsContainer = document.getElementById('results');
      const debouncedSearch = createDebouncedSearch(items, resultsContainer, 300);
      
      debouncedSearch('ap');
      expect(resultsContainer.textContent).toBe('');
      
      vi.advanceTimersByTime(300);
      expect(resultsContainer.textContent.length).toBeGreaterThan(0);
    });

    it('should cancel previous searches', () => {
      const items = ['apple', 'banana', 'cherry'];
      const resultsContainer = document.getElementById('results');
      const debouncedSearch = createDebouncedSearch(items, resultsContainer, 300);
      
      debouncedSearch('a');
      vi.advanceTimersByTime(100);
      debouncedSearch('b');
      vi.advanceTimersByTime(300);
      
      const text = resultsContainer.textContent;
      expect(text).toContain('banana');
      expect(text).not.toContain('apple');
    });
  });

  describe('setupDebouncedInput', () => {
    it('should attach input listener', () => {
      const input = document.getElementById('search-input');
      const resultsContainer = document.getElementById('results');
      const items = ['apple', 'banana'];
      
      const inputSpy = vi.spyOn(input, 'addEventListener');
      setupDebouncedInput(input, items, resultsContainer, 300);
      
      expect(inputSpy).toHaveBeenCalledWith('input', expect.any(Function));
    });

    it('should debounce search on input', () => {
      const input = document.getElementById('search-input');
      const resultsContainer = document.getElementById('results');
      const items = ['apple', 'apricot', 'banana'];
      
      setupDebouncedInput(input, items, resultsContainer, 300);
      
      input.value = 'ap';
      input.dispatchEvent(new window.Event('input'));
      
      expect(resultsContainer.textContent).toBe('');
      
      vi.advanceTimersByTime(300);
      expect(resultsContainer.textContent).toContain('apple');
    });

    it('should cancel search when typing continues', () => {
      const input = document.getElementById('search-input');
      const resultsContainer = document.getElementById('results');
      const items = ['apple', 'banana'];
      
      setupDebouncedInput(input, items, resultsContainer, 300);
      
      input.value = 'a';
      input.dispatchEvent(new window.Event('input'));
      vi.advanceTimersByTime(100);
      
      input.value = 'ap';
      input.dispatchEvent(new window.Event('input'));
      vi.advanceTimersByTime(100);
      
      input.value = 'app';
      input.dispatchEvent(new window.Event('input'));
      vi.advanceTimersByTime(300);
      
      expect(resultsContainer.textContent).toContain('apple');
    });

    it('should only search after user stops typing', () => {
      const input = document.getElementById('search-input');
      const resultsContainer = document.getElementById('results');
      const items = ['javascript', 'java'];
      
      setupDebouncedInput(input, items, resultsContainer, 300);
      
      // Simulate rapid typing
      'java'.split('').forEach((char, i) => {
        input.value += char;
        input.dispatchEvent(new window.Event('input'));
        if (i < 3) vi.advanceTimersByTime(50);
      });
      
      // Should not have searched yet
      expect(resultsContainer.textContent).toBe('');
      
      // Wait full delay after last keystroke
      vi.advanceTimersByTime(300);
      expect(resultsContainer.textContent).toContain('java');
    });
  });
});
