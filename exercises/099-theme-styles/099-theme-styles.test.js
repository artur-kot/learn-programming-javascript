import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  setBackgroundColor,
  setTextColor,
  getBackgroundColor,
  applyThemeStyles,
  toggleInlineTheme
} from './099-theme-styles.js';

describe('Theme Switcher - Inline Styles', () => {
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
        <div id="status">Status</div>
      </body>
      </html>
    `;
    
    dom = new JSDOM(html);
    window = dom.window;
    document = window.document;
    global.window = window;
    global.document = document;
  });

  describe('setBackgroundColor', () => {
    it('should set background color', () => {
      setBackgroundColor('theme-container', 'red');
      const element = document.getElementById('theme-container');
      expect(element.style.backgroundColor).toBe('red');
    });

    it('should accept hex colors', () => {
      setBackgroundColor('theme-container', '#1a1a1a');
      const element = document.getElementById('theme-container');
      expect(element.style.backgroundColor).toBe('#1a1a1a');
    });

    it('should accept rgb colors', () => {
      setBackgroundColor('theme-container', 'rgb(26, 26, 26)');
      const element = document.getElementById('theme-container');
      expect(element.style.backgroundColor).toBe('rgb(26, 26, 26)');
    });

    it('should override previous color', () => {
      setBackgroundColor('theme-container', 'red');
      setBackgroundColor('theme-container', 'blue');
      const element = document.getElementById('theme-container');
      expect(element.style.backgroundColor).toBe('blue');
    });
  });

  describe('setTextColor', () => {
    it('should set text color', () => {
      setTextColor('theme-container', 'white');
      const element = document.getElementById('theme-container');
      expect(element.style.color).toBe('white');
    });

    it('should accept hex colors', () => {
      setTextColor('theme-container', '#ffffff');
      const element = document.getElementById('theme-container');
      expect(element.style.color).toBe('#ffffff');
    });

    it('should not affect background color', () => {
      setBackgroundColor('theme-container', 'red');
      setTextColor('theme-container', 'white');
      const element = document.getElementById('theme-container');
      expect(element.style.color).toBe('white');
      expect(element.style.backgroundColor).toBe('red');
    });
  });

  describe('getBackgroundColor', () => {
    it('should return background color', () => {
      setBackgroundColor('theme-container', '#1a1a1a');
      const color = getBackgroundColor('theme-container');
      expect(color).toBe('#1a1a1a');
    });

    it('should return empty string if not set', () => {
      const color = getBackgroundColor('status');
      expect(color).toBe('');
    });

    it('should return current color after multiple sets', () => {
      setBackgroundColor('theme-container', 'red');
      setBackgroundColor('theme-container', 'blue');
      const color = getBackgroundColor('theme-container');
      expect(color).toBe('blue');
    });
  });

  describe('applyThemeStyles', () => {
    it('should apply theme object', () => {
      const theme = {
        backgroundColor: '#1a1a1a',
        color: '#ffffff'
      };
      applyThemeStyles('theme-container', theme);
      const element = document.getElementById('theme-container');
      expect(element.style.backgroundColor).toBe('#1a1a1a');
      expect(element.style.color).toBe('#ffffff');
    });

    it('should apply multiple properties', () => {
      const theme = {
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        fontSize: '16px',
        padding: '10px'
      };
      applyThemeStyles('theme-container', theme);
      const element = document.getElementById('theme-container');
      expect(element.style.backgroundColor).toBe('#1a1a1a');
      expect(element.style.color).toBe('#ffffff');
      expect(element.style.fontSize).toBe('16px');
      expect(element.style.padding).toBe('10px');
    });

    it('should override existing styles', () => {
      setBackgroundColor('theme-container', 'red');
      applyThemeStyles('theme-container', { backgroundColor: 'blue' });
      expect(getBackgroundColor('theme-container')).toBe('blue');
    });
  });

  describe('toggleInlineTheme', () => {
    it('should apply initial theme', () => {
      toggleInlineTheme('theme-container');
      const element = document.getElementById('theme-container');
      const hasStyles = element.style.backgroundColor || element.style.color;
      expect(hasStyles).toBeTruthy();
    });

    it('should toggle between two themes', () => {
      toggleInlineTheme('theme-container');
      const firstColor = document.getElementById('theme-container').style.backgroundColor;
      toggleInlineTheme('theme-container');
      const secondColor = document.getElementById('theme-container').style.backgroundColor;
      toggleInlineTheme('theme-container');
      const thirdColor = document.getElementById('theme-container').style.backgroundColor;
      expect(firstColor).toBe(thirdColor);
      expect(firstColor).not.toBe(secondColor);
    });

    it('should maintain other properties', () => {
      const element = document.getElementById('theme-container');
      element.style.fontSize = '14px';
      toggleInlineTheme('theme-container');
      expect(element.style.fontSize).toBe('14px');
    });
  });
});
