import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  addClass,
  removeClass,
  toggleClass,
  hasClass,
  switchTheme
} from './098-theme-classes.js';

describe('Theme Switcher - Toggle Classes', () => {
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
        <div id="theme-container">Content</div>
        <div id="status" class="info">Status</div>
      </body>
      </html>
    `;
    
    dom = new JSDOM(html);
    window = dom.window;
    document = window.document;
    global.window = window;
    global.document = document;
  });

  describe('addClass', () => {
    it('should add a class to element', () => {
      addClass('theme-container', 'dark');
      const element = document.getElementById('theme-container');
      expect(element.classList.contains('dark')).toBe(true);
    });

    it('should add multiple classes', () => {
      addClass('theme-container', 'dark');
      addClass('theme-container', 'active');
      const element = document.getElementById('theme-container');
      expect(element.classList.contains('dark')).toBe(true);
      expect(element.classList.contains('active')).toBe(true);
    });

    it('should not duplicate classes', () => {
      addClass('theme-container', 'dark');
      addClass('theme-container', 'dark');
      const element = document.getElementById('theme-container');
      const classCount = Array.from(element.classList).filter(c => c === 'dark').length;
      expect(classCount).toBe(1);
    });

    it('should preserve existing classes', () => {
      const element = document.getElementById('status');
      expect(element.classList.contains('info')).toBe(true);
      addClass('status', 'active');
      expect(element.classList.contains('info')).toBe(true);
      expect(element.classList.contains('active')).toBe(true);
    });
  });

  describe('removeClass', () => {
    it('should remove a class from element', () => {
      const element = document.getElementById('status');
      expect(element.classList.contains('info')).toBe(true);
      removeClass('status', 'info');
      expect(element.classList.contains('info')).toBe(false);
    });

    it('should remove specific class only', () => {
      addClass('theme-container', 'dark');
      addClass('theme-container', 'active');
      removeClass('theme-container', 'dark');
      const element = document.getElementById('theme-container');
      expect(element.classList.contains('dark')).toBe(false);
      expect(element.classList.contains('active')).toBe(true);
    });

    it('should handle removing non-existent class', () => {
      const element = document.getElementById('theme-container');
      removeClass('theme-container', 'non-existent');
      expect(element.classList.length).toBe(0);
    });
  });

  describe('toggleClass', () => {
    it('should add class if not present', () => {
      const element = document.getElementById('theme-container');
      expect(element.classList.contains('dark')).toBe(false);
      toggleClass('theme-container', 'dark');
      expect(element.classList.contains('dark')).toBe(true);
    });

    it('should remove class if present', () => {
      addClass('theme-container', 'dark');
      expect(document.getElementById('theme-container').classList.contains('dark')).toBe(true);
      toggleClass('theme-container', 'dark');
      expect(document.getElementById('theme-container').classList.contains('dark')).toBe(false);
    });

    it('should toggle multiple times', () => {
      const element = document.getElementById('theme-container');
      expect(element.classList.contains('dark')).toBe(false);
      toggleClass('theme-container', 'dark');
      expect(element.classList.contains('dark')).toBe(true);
      toggleClass('theme-container', 'dark');
      expect(element.classList.contains('dark')).toBe(false);
      toggleClass('theme-container', 'dark');
      expect(element.classList.contains('dark')).toBe(true);
    });
  });

  describe('hasClass', () => {
    it('should return true if element has class', () => {
      const result = hasClass('status', 'info');
      expect(result).toBe(true);
    });

    it('should return false if element does not have class', () => {
      const result = hasClass('status', 'dark');
      expect(result).toBe(false);
    });

    it('should work after adding class', () => {
      addClass('theme-container', 'active');
      const result = hasClass('theme-container', 'active');
      expect(result).toBe(true);
    });

    it('should work after removing class', () => {
      addClass('theme-container', 'active');
      removeClass('theme-container', 'active');
      const result = hasClass('theme-container', 'active');
      expect(result).toBe(false);
    });
  });

  describe('switchTheme', () => {
    it('should toggle dark class on element', () => {
      const element = document.getElementById('theme-container');
      expect(element.classList.contains('dark')).toBe(false);
      switchTheme('theme-container');
      expect(element.classList.contains('dark')).toBe(true);
    });

    it('should toggle light class on element', () => {
      const element = document.getElementById('theme-container');
      switchTheme('theme-container');
      expect(element.classList.contains('light') || element.classList.contains('dark')).toBe(true);
    });

    it('should switch between themes', () => {
      switchTheme('theme-container');
      const isDark1 = hasClass('theme-container', 'dark');
      switchTheme('theme-container');
      const isDark2 = hasClass('theme-container', 'dark');
      expect(isDark1).not.toBe(isDark2);
    });

    it('should maintain other classes', () => {
      addClass('theme-container', 'container');
      switchTheme('theme-container');
      expect(hasClass('theme-container', 'container')).toBe(true);
    });
  });
});
