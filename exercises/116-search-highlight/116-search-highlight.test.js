import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  escapeHTML,
  highlightText,
  createHighlightedElement,
  displayHighlightedResults,
  getHighlightStyles
} from './116-search-highlight.js';

describe('Live Search Filter - Highlight Results', () => {
  let dom;
  let window;
  let document;

  beforeEach(() => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head><title>Test</title></head>
      <body>
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

  describe('escapeHTML', () => {
    it('should escape < character', () => {
      const result = escapeHTML('<script>');
      expect(result).toContain('&lt;');
      expect(result).not.toContain('<script>');
    });

    it('should escape > character', () => {
      const result = escapeHTML('<div>');
      expect(result).toContain('&gt;');
    });

    it('should escape & character', () => {
      const result = escapeHTML('A & B');
      expect(result).toBe('A &amp; B');
    });

    it('should escape quotes', () => {
      const result = escapeHTML('"quoted"');
      expect(result).toContain('&quot;');
    });

    it('should handle text with no special chars', () => {
      const result = escapeHTML('plain text');
      expect(result).toBe('plain text');
    });

    it('should escape multiple characters', () => {
      const result = escapeHTML('<div class="test">A & B</div>');
      expect(result).not.toContain('<');
      expect(result).not.toContain('>');
    });
  });

  describe('highlightText', () => {
    it('should wrap matching text in mark tag', () => {
      const result = highlightText('JavaScript is great', 'Java');
      expect(result).toContain('<mark');
      expect(result).toContain('Java');
      expect(result).toContain('</mark>');
    });

    it('should be case insensitive', () => {
      const result = highlightText('JavaScript', 'JAVA');
      expect(result).toContain('<mark');
      expect(result).toContain('Java');
    });

    it('should highlight all occurrences', () => {
      const result = highlightText('Java and JavaScript', 'Java');
      const matches = (result.match(/<mark/g) || []).length;
      expect(matches).toBeGreaterThanOrEqual(1);
    });

    it('should not highlight when no match', () => {
      const result = highlightText('Python', 'Java');
      expect(result).not.toContain('<mark');
      expect(result).toBe('Python');
    });

    it('should handle empty search term', () => {
      const result = highlightText('JavaScript', '');
      expect(result).toBe('JavaScript');
    });

    it('should escape HTML before highlighting', () => {
      const result = highlightText('<script>alert("xss")</script>', 'script');
      expect(result).not.toContain('<script>');
      expect(result).toContain('&lt;');
    });
  });

  describe('createHighlightedElement', () => {
    it('should create element with highlighted text', () => {
      const element = createHighlightedElement('JavaScript', 'Java', 'result-item');
      expect(element.tagName).toBe('DIV');
      expect(element.className).toBe('result-item');
      expect(element.innerHTML).toContain('<mark');
    });

    it('should apply custom class name', () => {
      const element = createHighlightedElement('Test', 'test', 'custom-class');
      expect(element.className).toBe('custom-class');
    });

    it('should highlight search term', () => {
      const element = createHighlightedElement('Python programming', 'python', 'item');
      expect(element.innerHTML).toContain('<mark');
      expect(element.innerHTML).toContain('Python');
    });
  });

  describe('getHighlightStyles', () => {
    it('should return styles object', () => {
      const styles = getHighlightStyles();
      expect(typeof styles).toBe('object');
    });

    it('should include background color', () => {
      const styles = getHighlightStyles();
      expect(styles.backgroundColor || styles['background-color']).toBeDefined();
    });

    it('should include relevant CSS properties', () => {
      const styles = getHighlightStyles();
      const keys = Object.keys(styles);
      expect(keys.length).toBeGreaterThan(0);
    });
  });

  describe('displayHighlightedResults', () => {
    it('should display items with highlights', () => {
      const resultsContainer = document.getElementById('results');
      const items = ['JavaScript', 'Java', 'Python'];
      
      displayHighlightedResults(resultsContainer, items, 'Java');
      
      expect(resultsContainer.innerHTML).toContain('<mark');
      expect(resultsContainer.innerHTML).toContain('JavaScript');
    });

    it('should clear previous results', () => {
      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = '<div>old</div>';
      
      displayHighlightedResults(resultsContainer, ['JavaScript'], 'Java');
      
      expect(resultsContainer.innerHTML).not.toContain('old');
    });

    it('should display all items', () => {
      const resultsContainer = document.getElementById('results');
      const items = ['JavaScript', 'Python', 'Ruby'];
      
      displayHighlightedResults(resultsContainer, items, 'a');
      
      const text = resultsContainer.textContent;
      expect(text).toContain('JavaScript');
      expect(text).toContain('Python');
      expect(text).toContain('Ruby');
    });

    it('should handle empty items array', () => {
      const resultsContainer = document.getElementById('results');
      
      displayHighlightedResults(resultsContainer, [], 'test');
      
      expect(resultsContainer.textContent.length).toBeGreaterThan(0);
    });

    it('should highlight search term in all items', () => {
      const resultsContainer = document.getElementById('results');
      const items = ['JavaScript', 'Java'];
      
      displayHighlightedResults(resultsContainer, items, 'Java');
      
      const html = resultsContainer.innerHTML;
      const matches = (html.match(/<mark/g) || []).length;
      expect(matches).toBeGreaterThanOrEqual(2);
    });

    it('should handle special HTML characters safely', () => {
      const resultsContainer = document.getElementById('results');
      const items = ['<script>alert("xss")</script>'];
      
      displayHighlightedResults(resultsContainer, items, 'script');
      
      expect(resultsContainer.innerHTML).not.toContain('<script>');
      expect(resultsContainer.innerHTML).toContain('&lt;');
    });
  });
});
