import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  getClickedResultElement,
  getResultData,
  handleResultClick,
  setupResultsDelegation,
  isResultElement
} from './115-search-delegation.js';

describe('Live Search Filter - Event Delegation', () => {
  let dom;
  let window;
  let document;

  beforeEach(() => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head><title>Test</title></head>
      <body>
        <div id="results" class="results-container">
          <div class="result-item" data-id="1">JavaScript</div>
          <div class="result-item" data-id="2">Python</div>
          <div class="result-item" data-id="3">
            <span>Java</span>
          </div>
        </div>
      </body>
      </html>
    `;
    dom = new JSDOM(html);
    window = dom.window;
    document = window.document;
    global.window = window;
    global.document = document;
  });

  describe('isResultElement', () => {
    it('should return true for result element', () => {
      const element = document.querySelector('.result-item');
      expect(isResultElement(element, 'result-item')).toBe(true);
    });

    it('should return false for non-result element', () => {
      const container = document.getElementById('results');
      expect(isResultElement(container, 'result-item')).toBe(false);
    });

    it('should check for specific class name', () => {
      const element = document.querySelector('.result-item');
      expect(isResultElement(element, 'result-item')).toBe(true);
      expect(isResultElement(element, 'other-class')).toBe(false);
    });
  });

  describe('getClickedResultElement', () => {
    it('should return element if it has the class', () => {
      const resultItem = document.querySelector('.result-item');
      const result = getClickedResultElement(resultItem, 'result-item');
      expect(result).toBe(resultItem);
    });

    it('should find parent with class', () => {
      const span = document.querySelector('.result-item span');
      const result = getClickedResultElement(span, 'result-item');
      expect(result).not.toBeNull();
      expect(result.classList.contains('result-item')).toBe(true);
    });

    it('should return null if no matching parent', () => {
      const container = document.getElementById('results');
      const result = getClickedResultElement(container, 'result-item');
      expect(result).toBeNull();
    });

    it('should work with nested elements', () => {
      const nested = document.querySelector('.result-item span');
      const result = getClickedResultElement(nested, 'result-item');
      expect(result).toBeTruthy();
      expect(result.classList.contains('result-item')).toBe(true);
    });
  });

  describe('getResultData', () => {
    it('should extract text content', () => {
      const element = document.querySelector('.result-item');
      const data = getResultData(element);
      expect(data.text).toBe('JavaScript');
    });

    it('should extract data attributes', () => {
      const element = document.querySelector('[data-id="1"]');
      const data = getResultData(element);
      expect(data.id).toBe('1');
    });

    it('should handle nested content', () => {
      const element = document.querySelector('[data-id="3"]');
      const data = getResultData(element);
      expect(data.text).toContain('Java');
    });

    it('should return object with properties', () => {
      const element = document.querySelector('.result-item');
      const data = getResultData(element);
      expect(typeof data).toBe('object');
      expect(data).toHaveProperty('text');
    });
  });

  describe('handleResultClick', () => {
    it('should call callback when result clicked', () => {
      const callback = vi.fn();
      const resultItem = document.querySelector('.result-item');
      const event = new window.MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: resultItem, writable: false });
      
      handleResultClick(event, callback);
      
      expect(callback).toHaveBeenCalled();
    });

    it('should pass result data to callback', () => {
      const callback = vi.fn();
      const resultItem = document.querySelector('[data-id="1"]');
      const event = new window.MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: resultItem, writable: false });
      
      handleResultClick(event, callback);
      
      expect(callback).toHaveBeenCalledWith(expect.objectContaining({
        text: expect.any(String)
      }));
    });

    it('should not call callback for non-result clicks', () => {
      const callback = vi.fn();
      const container = document.getElementById('results');
      const event = new window.MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: container, writable: false });
      
      handleResultClick(event, callback);
      
      expect(callback).not.toHaveBeenCalled();
    });

    it('should handle clicks on nested elements', () => {
      const callback = vi.fn();
      const span = document.querySelector('.result-item span');
      const event = new window.MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: span, writable: false });
      
      handleResultClick(event, callback);
      
      expect(callback).toHaveBeenCalled();
    });
  });

  describe('setupResultsDelegation', () => {
    it('should attach click listener to container', () => {
      const container = document.getElementById('results');
      const callback = vi.fn();
      
      const clickSpy = vi.spyOn(container, 'addEventListener');
      setupResultsDelegation(container, callback);
      
      expect(clickSpy).toHaveBeenCalledWith('click', expect.any(Function));
    });

    it('should handle clicks on result items', () => {
      const container = document.getElementById('results');
      const callback = vi.fn();
      
      setupResultsDelegation(container, callback);
      
      const resultItem = document.querySelector('.result-item');
      resultItem.click();
      
      expect(callback).toHaveBeenCalled();
    });

    it('should work with dynamically added elements', () => {
      const container = document.getElementById('results');
      const callback = vi.fn();
      
      setupResultsDelegation(container, callback);
      
      // Add new element
      const newItem = document.createElement('div');
      newItem.className = 'result-item';
      newItem.textContent = 'Ruby';
      container.appendChild(newItem);
      
      newItem.click();
      
      expect(callback).toHaveBeenCalled();
    });

    it('should not trigger for container clicks', () => {
      const container = document.getElementById('results');
      const callback = vi.fn();
      
      setupResultsDelegation(container, callback);
      
      // Clear container
      container.innerHTML = '';
      container.click();
      
      expect(callback).not.toHaveBeenCalled();
    });

    it('should handle multiple result items', () => {
      const container = document.getElementById('results');
      const callback = vi.fn();
      
      setupResultsDelegation(container, callback);
      
      const items = document.querySelectorAll('.result-item');
      items[0].click();
      items[1].click();
      items[2].click();
      
      expect(callback).toHaveBeenCalledTimes(3);
    });
  });
});
