import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  updateButtonText,
  getButtonText,
  updateWithHTML,
  toggleThemeText,
  updateMultipleElements
} from './099-theme-text.js';

describe('Theme Switcher - Change Text', () => {
  let dom;
  let window;
  let document;

  beforeEach(() => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head><title>Theme Switcher</title></head>
      <body>
        <button id="theme-toggle">Toggle Theme</button>
        <button id="light-btn">Light</button>
        <button id="dark-btn">Dark</button>
        <div id="status">Current theme: Light</div>
        <div id="info"></div>
      </body>
      </html>
    `;
    
    dom = new JSDOM(html);
    window = dom.window;
    document = window.document;
    global.window = window;
    global.document = document;
  });

  describe('updateButtonText', () => {
    it('should update button text', () => {
      updateButtonText('theme-toggle', 'Switch to Dark');
      const button = document.getElementById('theme-toggle');
      expect(button.textContent).toBe('Switch to Dark');
    });

    it('should replace existing text', () => {
      expect(document.getElementById('light-btn').textContent).toBe('Light');
      updateButtonText('light-btn', 'Light Mode');
      expect(document.getElementById('light-btn').textContent).toBe('Light Mode');
    });

    it('should handle multiple updates', () => {
      updateButtonText('theme-toggle', 'New Text');
      expect(document.getElementById('theme-toggle').textContent).toBe('New Text');
      updateButtonText('theme-toggle', 'Another Text');
      expect(document.getElementById('theme-toggle').textContent).toBe('Another Text');
    });
  });

  describe('getButtonText', () => {
    it('should return button text', () => {
      const text = getButtonText('theme-toggle');
      expect(text).toBe('Toggle Theme');
    });

    it('should return current text after update', () => {
      updateButtonText('theme-toggle', 'New Text');
      const text = getButtonText('theme-toggle');
      expect(text).toBe('New Text');
    });

    it('should work for different buttons', () => {
      const text1 = getButtonText('light-btn');
      const text2 = getButtonText('dark-btn');
      expect(text1).toBe('Light');
      expect(text2).toBe('Dark');
    });
  });

  describe('updateWithHTML', () => {
    it('should set HTML content', () => {
      updateWithHTML('status', '<strong>Dark Mode</strong>');
      const element = document.getElementById('status');
      expect(element.textContent).toBe('Dark Mode');
    });

    it('should support HTML tags', () => {
      updateWithHTML('status', '<em>Bold</em> text');
      const element = document.getElementById('status');
      expect(element.innerHTML).toContain('<em>');
    });

    it('should allow complex HTML', () => {
      updateWithHTML('info', '<ul><li>Item 1</li><li>Item 2</li></ul>');
      const element = document.getElementById('info');
      expect(element.querySelector('li')).toBeTruthy();
    });

    it('should replace previous HTML', () => {
      updateWithHTML('status', '<span>First</span>');
      updateWithHTML('status', '<span>Second</span>');
      const element = document.getElementById('status');
      expect(element.textContent).toBe('Second');
    });
  });

  describe('toggleThemeText', () => {
    it('should set initial text', () => {
      toggleThemeText('theme-toggle', 'Light', 'Dark');
      expect(getButtonText('theme-toggle')).toBe('Light');
    });

    it('should toggle between two texts', () => {
      toggleThemeText('theme-toggle', 'Light', 'Dark');
      expect(getButtonText('theme-toggle')).toBe('Light');
      toggleThemeText('theme-toggle', 'Light', 'Dark');
      expect(getButtonText('theme-toggle')).toBe('Dark');
    });

    it('should toggle multiple times', () => {
      toggleThemeText('theme-toggle', 'ON', 'OFF');
      expect(getButtonText('theme-toggle')).toBe('ON');
      toggleThemeText('theme-toggle', 'ON', 'OFF');
      expect(getButtonText('theme-toggle')).toBe('OFF');
      toggleThemeText('theme-toggle', 'ON', 'OFF');
      expect(getButtonText('theme-toggle')).toBe('ON');
    });

    it('should work for different buttons', () => {
      toggleThemeText('light-btn', 'Light', 'Dark');
      toggleThemeText('dark-btn', 'Light', 'Dark');
      expect(getButtonText('light-btn')).toBe('Light');
      expect(getButtonText('dark-btn')).toBe('Light');
    });
  });

  describe('updateMultipleElements', () => {
    it('should update multiple elements', () => {
      updateMultipleElements({
        'theme-toggle': 'Switch Mode',
        'light-btn': 'Light Theme',
        'dark-btn': 'Dark Theme'
      });
      expect(getButtonText('theme-toggle')).toBe('Switch Mode');
      expect(getButtonText('light-btn')).toBe('Light Theme');
      expect(getButtonText('dark-btn')).toBe('Dark Theme');
    });

    it('should handle empty object', () => {
      updateMultipleElements({});
      expect(getButtonText('theme-toggle')).toBe('Toggle Theme');
    });

    it('should update in order', () => {
      const updates = {
        'theme-toggle': 'Text 1',
        'status': 'Text 2'
      };
      updateMultipleElements(updates);
      expect(document.getElementById('theme-toggle').textContent).toBe('Text 1');
      expect(document.getElementById('status').textContent).toBe('Text 2');
    });

    it('should allow partial updates', () => {
      updateMultipleElements({
        'theme-toggle': 'Updated'
      });
      expect(getButtonText('theme-toggle')).toBe('Updated');
      expect(getButtonText('light-btn')).toBe('Light');
    });
  });
});
