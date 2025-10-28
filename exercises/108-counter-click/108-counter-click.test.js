import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  setupCounter,
  incrementCounter,
  getCount,
  updateDisplay,
  createCounter
} from './108-counter-click.js';

describe('Interactive Counter - Click Event', () => {
  let dom;
  let window;
  let document;

  beforeEach(() => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head><title>Test</title></head>
      <body>
        <button id="increment-btn">+</button>
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

  describe('createCounter', () => {
    it('should create counter with initial value', () => {
      const counter = createCounter(5);
      expect(getCount(counter)).toBe(5);
    });

    it('should default to 0', () => {
      const counter = createCounter();
      expect(getCount(counter)).toBe(0);
    });

    it('should handle negative initial value', () => {
      const counter = createCounter(-10);
      expect(getCount(counter)).toBe(-10);
    });
  });

  describe('incrementCounter', () => {
    it('should increment by 1', () => {
      const counter = createCounter(0);
      incrementCounter(counter);
      expect(getCount(counter)).toBe(1);
    });

    it('should increment multiple times', () => {
      const counter = createCounter(0);
      incrementCounter(counter);
      incrementCounter(counter);
      incrementCounter(counter);
      expect(getCount(counter)).toBe(3);
    });

    it('should work from any value', () => {
      const counter = createCounter(10);
      incrementCounter(counter);
      expect(getCount(counter)).toBe(11);
    });
  });

  describe('getCount', () => {
    it('should return counter value', () => {
      const counter = createCounter(42);
      expect(getCount(counter)).toBe(42);
    });

    it('should return 0 for new counter', () => {
      const counter = createCounter();
      expect(getCount(counter)).toBe(0);
    });
  });

  describe('updateDisplay', () => {
    it('should update display text', () => {
      const display = document.getElementById('display');
      updateDisplay(display, 5);
      expect(display.textContent).toBe('5');
    });

    it('should update to different values', () => {
      const display = document.getElementById('display');
      updateDisplay(display, 10);
      expect(display.textContent).toBe('10');
      updateDisplay(display, 25);
      expect(display.textContent).toBe('25');
    });

    it('should handle zero', () => {
      const display = document.getElementById('display');
      updateDisplay(display, 0);
      expect(display.textContent).toBe('0');
    });

    it('should handle negative numbers', () => {
      const display = document.getElementById('display');
      updateDisplay(display, -5);
      expect(display.textContent).toBe('-5');
    });
  });

  describe('setupCounter', () => {
    it('should attach click listener to button', () => {
      const button = document.getElementById('increment-btn');
      const display = document.getElementById('display');
      const counter = createCounter(0);
      
      const clickSpy = vi.spyOn(button, 'addEventListener');
      setupCounter(button, display, counter);
      
      expect(clickSpy).toHaveBeenCalledWith('click', expect.any(Function));
    });

    it('should increment on click', () => {
      const button = document.getElementById('increment-btn');
      const display = document.getElementById('display');
      const counter = createCounter(0);
      
      setupCounter(button, display, counter);
      button.click();
      
      expect(getCount(counter)).toBe(1);
    });

    it('should update display on click', () => {
      const button = document.getElementById('increment-btn');
      const display = document.getElementById('display');
      const counter = createCounter(0);
      
      setupCounter(button, display, counter);
      button.click();
      
      expect(display.textContent).toBe('1');
    });

    it('should handle multiple clicks', () => {
      const button = document.getElementById('increment-btn');
      const display = document.getElementById('display');
      const counter = createCounter(0);
      
      setupCounter(button, display, counter);
      button.click();
      button.click();
      button.click();
      
      expect(display.textContent).toBe('3');
    });
  });
});
