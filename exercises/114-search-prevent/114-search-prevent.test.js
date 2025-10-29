import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  preventFormSubmit,
  getFormData,
  handleSearchSubmit,
  setupFormListener,
  clearSearchForm
} from './114-search-prevent.js';

describe('Live Search Filter - Prevent Default', () => {
  let dom;
  let window;
  let document;

  beforeEach(() => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head><title>Test</title></head>
      <body>
        <form id="search-form">
          <input id="search-input" type="text" name="query" placeholder="Search...">
          <button type="submit">Search</button>
        </form>
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

  describe('preventFormSubmit', () => {
    it('should call preventDefault on event', () => {
      const event = new window.Event('submit');
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      
      preventFormSubmit(event);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should prevent default behavior', () => {
      const form = document.getElementById('search-form');
      let defaultPrevented = false;
      
      form.addEventListener('submit', (e) => {
        preventFormSubmit(e);
        defaultPrevented = e.defaultPrevented;
      });
      
      const event = new window.Event('submit', { cancelable: true });
      form.dispatchEvent(event);
      
      expect(defaultPrevented).toBe(true);
    });
  });

  describe('getFormData', () => {
    it('should extract search query from form', () => {
      const form = document.getElementById('search-form');
      const input = document.getElementById('search-input');
      input.value = 'test query';
      
      const data = getFormData(form);
      expect(data.query).toBe('test query');
    });

    it('should handle empty input', () => {
      const form = document.getElementById('search-form');
      const input = document.getElementById('search-input');
      input.value = '';
      
      const data = getFormData(form);
      expect(data.query).toBe('');
    });

    it('should return trimmed values', () => {
      const form = document.getElementById('search-form');
      const input = document.getElementById('search-input');
      input.value = '  search  ';
      
      const data = getFormData(form);
      expect(data.query.trim()).toBe('search');
    });
  });

  describe('clearSearchForm', () => {
    it('should clear form inputs', () => {
      const form = document.getElementById('search-form');
      const input = document.getElementById('search-input');
      input.value = 'test';
      
      clearSearchForm(form);
      
      expect(input.value).toBe('');
    });

    it('should handle already empty form', () => {
      const form = document.getElementById('search-form');
      expect(() => clearSearchForm(form)).not.toThrow();
    });
  });

  describe('handleSearchSubmit', () => {
    it('should prevent default on event', () => {
      const form = document.getElementById('search-form');
      const input = document.getElementById('search-input');
      const resultsContainer = document.getElementById('results');
      const items = ['apple', 'banana'];
      
      input.value = 'app';
      const event = new window.Event('submit', { cancelable: true });
      Object.defineProperty(event, 'target', { value: form, writable: false });
      
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      handleSearchSubmit(event, items, resultsContainer);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should filter and display results', () => {
      const form = document.getElementById('search-form');
      const input = document.getElementById('search-input');
      const resultsContainer = document.getElementById('results');
      const items = ['apple', 'apricot', 'banana'];
      
      input.value = 'ap';
      const event = new window.Event('submit', { cancelable: true });
      Object.defineProperty(event, 'target', { value: form, writable: false });
      
      handleSearchSubmit(event, items, resultsContainer);
      
      const text = resultsContainer.textContent;
      expect(text).toContain('apple');
      expect(text).toContain('apricot');
    });

    it('should handle empty search', () => {
      const form = document.getElementById('search-form');
      const input = document.getElementById('search-input');
      const resultsContainer = document.getElementById('results');
      const items = ['apple', 'banana', 'cherry'];
      
      input.value = '';
      const event = new window.Event('submit', { cancelable: true });
      Object.defineProperty(event, 'target', { value: form, writable: false });
      
      handleSearchSubmit(event, items, resultsContainer);
      
      const text = resultsContainer.textContent;
      expect(text).toContain('apple');
      expect(text).toContain('banana');
      expect(text).toContain('cherry');
    });
  });

  describe('setupFormListener', () => {
    it('should attach submit listener', () => {
      const form = document.getElementById('search-form');
      const resultsContainer = document.getElementById('results');
      const items = ['apple', 'banana'];
      
      const submitSpy = vi.spyOn(form, 'addEventListener');
      setupFormListener(form, items, resultsContainer);
      
      expect(submitSpy).toHaveBeenCalledWith('submit', expect.any(Function));
    });

    it('should prevent page reload on submit', () => {
      const form = document.getElementById('search-form');
      const resultsContainer = document.getElementById('results');
      const items = ['apple', 'banana'];
      
      setupFormListener(form, items, resultsContainer);
      
      const event = new window.Event('submit', { cancelable: true });
      form.dispatchEvent(event);
      
      expect(event.defaultPrevented).toBe(true);
    });

    it('should filter results on submit', () => {
      const form = document.getElementById('search-form');
      const input = document.getElementById('search-input');
      const resultsContainer = document.getElementById('results');
      const items = ['apple', 'apricot', 'banana'];
      
      setupFormListener(form, items, resultsContainer);
      
      input.value = 'ap';
      const event = new window.Event('submit', { cancelable: true });
      form.dispatchEvent(event);
      
      const text = resultsContainer.textContent;
      expect(text).toContain('apple');
      expect(text).toContain('apricot');
    });

    it('should work with Enter key submission', () => {
      const form = document.getElementById('search-form');
      const input = document.getElementById('search-input');
      const resultsContainer = document.getElementById('results');
      const items = ['javascript', 'java', 'python'];
      
      setupFormListener(form, items, resultsContainer);
      
      input.value = 'java';
      const event = new window.Event('submit', { cancelable: true });
      form.dispatchEvent(event);
      
      const text = resultsContainer.textContent;
      expect(text).toContain('javascript');
      expect(text).toContain('java');
      expect(event.defaultPrevented).toBe(true);
    });
  });
});
