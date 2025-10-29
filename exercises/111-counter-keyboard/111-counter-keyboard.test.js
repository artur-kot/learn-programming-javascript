import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  handleKeyPress,
  setupKeyboardListener,
  isArrowKey,
  handleArrowKey,
  getKeyName
} from './111-counter-keyboard.js';

describe('Interactive Counter - Keyboard Events', () => {
  let dom;
  let window;
  let document;

  beforeEach(() => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head><title>Test</title></head>
      <body>
        <div id="display">0</div>
      </body>
      </html>
    `;
    dom = new JSDOM(html);
    window = dom.window;
    document = window.document;
    global.window = window;
    global.document = document;
  });

  describe('isArrowKey', () => {
    it('should identify ArrowUp', () => {
      expect(isArrowKey('ArrowUp')).toBe(true);
    });

    it('should identify ArrowDown', () => {
      expect(isArrowKey('ArrowDown')).toBe(true);
    });

    it('should identify ArrowLeft', () => {
      expect(isArrowKey('ArrowLeft')).toBe(true);
    });

    it('should identify ArrowRight', () => {
      expect(isArrowKey('ArrowRight')).toBe(true);
    });

    it('should reject non-arrow keys', () => {
      expect(isArrowKey('Enter')).toBe(false);
      expect(isArrowKey('a')).toBe(false);
      expect(isArrowKey(' ')).toBe(false);
    });
  });

  describe('getKeyName', () => {
    it('should return name for ArrowUp', () => {
      expect(getKeyName('ArrowUp')).toBe('ArrowUp');
    });

    it('should return name for ArrowDown', () => {
      expect(getKeyName('ArrowDown')).toBe('ArrowDown');
    });

    it('should return readable name', () => {
      expect(typeof getKeyName('ArrowUp')).toBe('string');
    });
  });

  describe('handleArrowKey', () => {
    it('should increment on ArrowUp', () => {
      const counter = { count: 5 };
      handleArrowKey('ArrowUp', counter);
      expect(counter.count).toBe(6);
    });

    it('should increment on ArrowRight', () => {
      const counter = { count: 5 };
      handleArrowKey('ArrowRight', counter);
      expect(counter.count).toBe(6);
    });

    it('should decrement on ArrowDown', () => {
      const counter = { count: 5 };
      handleArrowKey('ArrowDown', counter);
      expect(counter.count).toBe(4);
    });

    it('should decrement on ArrowLeft', () => {
      const counter = { count: 5 };
      handleArrowKey('ArrowLeft', counter);
      expect(counter.count).toBe(4);
    });

    it('should handle multiple key presses', () => {
      const counter = { count: 0 };
      handleArrowKey('ArrowUp', counter);
      handleArrowKey('ArrowUp', counter);
      handleArrowKey('ArrowDown', counter);
      expect(counter.count).toBe(1);
    });
  });

  describe('handleKeyPress', () => {
    it('should increment counter on ArrowUp', () => {
      const counter = { count: 0 };
      const event = new window.KeyboardEvent('keydown', { key: 'ArrowUp' });
      
      handleKeyPress(event, counter);
      
      expect(counter.count).toBe(1);
    });

    it('should decrement counter on ArrowDown', () => {
      const counter = { count: 5 };
      const event = new window.KeyboardEvent('keydown', { key: 'ArrowDown' });
      
      handleKeyPress(event, counter);
      
      expect(counter.count).toBe(4);
    });

    it('should reset counter on r key', () => {
      const counter = { count: 10 };
      const event = new window.KeyboardEvent('keydown', { key: 'r' });
      
      handleKeyPress(event, counter);
      
      expect(counter.count).toBe(0);
    });

    it('should reset counter on R key', () => {
      const counter = { count: 10 };
      const event = new window.KeyboardEvent('keydown', { key: 'R' });
      
      handleKeyPress(event, counter);
      
      expect(counter.count).toBe(0);
    });

    it('should ignore unknown keys', () => {
      const counter = { count: 5 };
      const event = new window.KeyboardEvent('keydown', { key: 'x' });
      
      handleKeyPress(event, counter);
      
      expect(counter.count).toBe(5);
    });

    it('should handle sequence of keys', () => {
      const counter = { count: 0 };
      
      handleKeyPress(new window.KeyboardEvent('keydown', { key: 'ArrowUp' }), counter);
      handleKeyPress(new window.KeyboardEvent('keydown', { key: 'ArrowUp' }), counter);
      handleKeyPress(new window.KeyboardEvent('keydown', { key: 'ArrowDown' }), counter);
      
      expect(counter.count).toBe(1);
    });
  });

  describe('setupKeyboardListener', () => {
    it('should attach listener to window', () => {
      const display = document.getElementById('display');
      const counter = { count: 0 };
      
      const windowSpy = vi.spyOn(global.window, 'addEventListener');
      
      setupKeyboardListener(display, counter);
      
      expect(windowSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
      
      windowSpy.mockRestore();
    });

    it('should increment on arrow key', () => {
      const display = document.getElementById('display');
      const counter = { count: 0 };
      
      setupKeyboardListener(display, counter);
      
      const event = new window.KeyboardEvent('keydown', { key: 'ArrowUp' });
      window.dispatchEvent(event);
      
      expect(counter.count).toBe(1);
    });

    it('should update display on key press', () => {
      const display = document.getElementById('display');
      const counter = { count: 0 };
      
      setupKeyboardListener(display, counter);
      
      const event = new window.KeyboardEvent('keydown', { key: 'ArrowUp' });
      window.dispatchEvent(event);
      
      expect(display.textContent).toBe('1');
    });

    it('should handle reset key', () => {
      const display = document.getElementById('display');
      const counter = { count: 5 };
      display.textContent = '5';
      
      setupKeyboardListener(display, counter);
      
      const event = new window.KeyboardEvent('keydown', { key: 'r' });
      window.dispatchEvent(event);
      
      expect(counter.count).toBe(0);
      expect(display.textContent).toBe('0');
    });
  });
});
