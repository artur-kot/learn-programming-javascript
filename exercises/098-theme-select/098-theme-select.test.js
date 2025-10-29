import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  selectThemeButton,
  selectBody,
  selectAllThemeButtons,
  selectByIdAndClass,
  validateElements
} from './098-theme-select.js';

describe('Theme Switcher - Select Elements', () => {
  let dom;
  let window;
  let document;

  beforeEach(() => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Theme Switcher</title>
      </head>
      <body>
        <button id="theme-toggle" class="theme-btn">Toggle Theme</button>
        <button class="theme-btn">Light</button>
        <button class="theme-btn">Dark</button>
        <div id="theme-container" class="container">Content</div>
      </body>
      </html>
    `;
    
    dom = new JSDOM(html);
    window = dom.window;
    document = window.document;
    global.window = window;
    global.document = document;
  });

  describe('selectThemeButton', () => {
    it('should return a DOM element', () => {
      const button = selectThemeButton();
      expect(button).toBeTruthy();
    });

    it('should select element with id "theme-toggle"', () => {
      const button = selectThemeButton();
      expect(button?.id).toBe('theme-toggle');
    });

    it('should be a button element', () => {
      const button = selectThemeButton();
      expect(button?.tagName).toBe('BUTTON');
    });

    it('should have class "theme-btn"', () => {
      const button = selectThemeButton();
      expect(button?.classList.contains('theme-btn')).toBe(true);
    });
  });

  describe('selectBody', () => {
    it('should return a DOM element', () => {
      const body = selectBody();
      expect(body).toBeTruthy();
    });

    it('should return the body element', () => {
      const body = selectBody();
      expect(body?.tagName).toBe('BODY');
    });

    it('should contain theme buttons', () => {
      const body = selectBody();
      const buttons = body?.querySelectorAll('button');
      expect(buttons?.length).toBe(3);
    });
  });

  describe('selectAllThemeButtons', () => {
    it('should return a NodeList', () => {
      const buttons = selectAllThemeButtons();
      expect(buttons).toBeTruthy();
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should return 3 theme buttons', () => {
      const buttons = selectAllThemeButtons();
      expect(buttons.length).toBe(3);
    });

    it('all elements should have class "theme-btn"', () => {
      const buttons = selectAllThemeButtons();
      buttons.forEach(btn => {
        expect(btn.classList.contains('theme-btn')).toBe(true);
      });
    });

    it('should be able to iterate through buttons', () => {
      const buttons = selectAllThemeButtons();
      let count = 0;
      buttons.forEach(() => {
        count++;
      });
      expect(count).toBe(3);
    });
  });

  describe('selectByIdAndClass', () => {
    it('should return a DOM element', () => {
      const element = selectByIdAndClass();
      expect(element).toBeTruthy();
    });

    it('should select element with id "theme-container"', () => {
      const element = selectByIdAndClass();
      expect(element?.id).toBe('theme-container');
    });

    it('should have class "container"', () => {
      const element = selectByIdAndClass();
      expect(element?.classList.contains('container')).toBe(true);
    });

    it('should be a div element', () => {
      const element = selectByIdAndClass();
      expect(element?.tagName).toBe('DIV');
    });
  });

  describe('validateElements', () => {
    it('should return an object', () => {
      const validation = validateElements();
      expect(typeof validation).toBe('object');
    });

    it('should have properties for each element', () => {
      const validation = validateElements();
      expect(validation.hasThemeButton).toBeDefined();
      expect(validation.hasBody).toBeDefined();
      expect(validation.hasThemeButtons).toBeDefined();
    });

    it('should validate all elements exist', () => {
      const validation = validateElements();
      expect(validation.hasThemeButton).toBe(true);
      expect(validation.hasBody).toBe(true);
      expect(validation.hasThemeButtons).toBe(true);
    });

    it('should have a count property for buttons', () => {
      const validation = validateElements();
      expect(validation.buttonCount).toBe(3);
    });

    it('should indicate validation status', () => {
      const validation = validateElements();
      expect(validation.allValid).toBe(true);
    });
  });
});
