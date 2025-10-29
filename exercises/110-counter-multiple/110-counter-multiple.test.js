import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  decrementCounter,
  resetCounter,
  getCountValue,
  setupCounterButtons,
  updateCountDisplay
} from './110-counter-multiple.js';

describe('Interactive Counter - Multiple Buttons', () => {
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
        <button id="decrement-btn">-</button>
        <button id="reset-btn">Reset</button>
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

  describe('decrementCounter', () => {
    it('should decrement by 1', () => {
      const counter = { count: 5 };
      decrementCounter(counter);
      expect(getCountValue(counter)).toBe(4);
    });

    it('should handle zero', () => {
      const counter = { count: 0 };
      decrementCounter(counter);
      expect(getCountValue(counter)).toBe(-1);
    });

    it('should work multiple times', () => {
      const counter = { count: 10 };
      decrementCounter(counter);
      decrementCounter(counter);
      decrementCounter(counter);
      expect(getCountValue(counter)).toBe(7);
    });
  });

  describe('resetCounter', () => {
    it('should reset to 0', () => {
      const counter = { count: 42 };
      resetCounter(counter);
      expect(getCountValue(counter)).toBe(0);
    });

    it('should reset from negative', () => {
      const counter = { count: -10 };
      resetCounter(counter);
      expect(getCountValue(counter)).toBe(0);
    });

    it('should work after other operations', () => {
      const counter = { count: 5 };
      decrementCounter(counter);
      resetCounter(counter);
      expect(getCountValue(counter)).toBe(0);
    });
  });

  describe('getCountValue', () => {
    it('should return count', () => {
      const counter = { count: 25 };
      expect(getCountValue(counter)).toBe(25);
    });

    it('should return negative count', () => {
      const counter = { count: -5 };
      expect(getCountValue(counter)).toBe(-5);
    });
  });

  describe('updateCountDisplay', () => {
    it('should update display', () => {
      const display = document.getElementById('display');
      updateCountDisplay(display, 10);
      expect(display.textContent).toBe('10');
    });

    it('should update to different values', () => {
      const display = document.getElementById('display');
      updateCountDisplay(display, 5);
      updateCountDisplay(display, 15);
      expect(display.textContent).toBe('15');
    });

    it('should display negative numbers', () => {
      const display = document.getElementById('display');
      updateCountDisplay(display, -3);
      expect(display.textContent).toBe('-3');
    });
  });

  describe('setupCounterButtons', () => {
    it('should attach listeners to all buttons', () => {
      const incrementBtn = document.getElementById('increment-btn');
      const decrementBtn = document.getElementById('decrement-btn');
      const resetBtn = document.getElementById('reset-btn');
      const display = document.getElementById('display');
      const counter = { count: 0 };

      const incrementSpy = vi.spyOn(incrementBtn, 'addEventListener');
      const decrementSpy = vi.spyOn(decrementBtn, 'addEventListener');
      const resetSpy = vi.spyOn(resetBtn, 'addEventListener');

      setupCounterButtons(incrementBtn, decrementBtn, resetBtn, display, counter);

      expect(incrementSpy).toHaveBeenCalledWith('click', expect.any(Function));
      expect(decrementSpy).toHaveBeenCalledWith('click', expect.any(Function));
      expect(resetSpy).toHaveBeenCalledWith('click', expect.any(Function));
    });

    it('should increment on increment button click', () => {
      const incrementBtn = document.getElementById('increment-btn');
      const decrementBtn = document.getElementById('decrement-btn');
      const resetBtn = document.getElementById('reset-btn');
      const display = document.getElementById('display');
      const counter = { count: 0 };

      setupCounterButtons(incrementBtn, decrementBtn, resetBtn, display, counter);
      incrementBtn.click();

      expect(getCountValue(counter)).toBe(1);
    });

    it('should decrement on decrement button click', () => {
      const incrementBtn = document.getElementById('increment-btn');
      const decrementBtn = document.getElementById('decrement-btn');
      const resetBtn = document.getElementById('reset-btn');
      const display = document.getElementById('display');
      const counter = { count: 5 };

      setupCounterButtons(incrementBtn, decrementBtn, resetBtn, display, counter);
      decrementBtn.click();

      expect(getCountValue(counter)).toBe(4);
    });

    it('should reset on reset button click', () => {
      const incrementBtn = document.getElementById('increment-btn');
      const decrementBtn = document.getElementById('decrement-btn');
      const resetBtn = document.getElementById('reset-btn');
      const display = document.getElementById('display');
      const counter = { count: 10 };

      setupCounterButtons(incrementBtn, decrementBtn, resetBtn, display, counter);
      resetBtn.click();

      expect(getCountValue(counter)).toBe(0);
    });

    it('should update display on each action', () => {
      const incrementBtn = document.getElementById('increment-btn');
      const decrementBtn = document.getElementById('decrement-btn');
      const resetBtn = document.getElementById('reset-btn');
      const display = document.getElementById('display');
      const counter = { count: 0 };

      setupCounterButtons(incrementBtn, decrementBtn, resetBtn, display, counter);

      incrementBtn.click();
      expect(display.textContent).toBe('1');

      incrementBtn.click();
      expect(display.textContent).toBe('2');

      decrementBtn.click();
      expect(display.textContent).toBe('1');

      resetBtn.click();
      expect(display.textContent).toBe('0');
    });

    it('should handle sequence of operations', () => {
      const incrementBtn = document.getElementById('increment-btn');
      const decrementBtn = document.getElementById('decrement-btn');
      const resetBtn = document.getElementById('reset-btn');
      const display = document.getElementById('display');
      const counter = { count: 0 };

      setupCounterButtons(incrementBtn, decrementBtn, resetBtn, display, counter);

      incrementBtn.click();
      incrementBtn.click();
      incrementBtn.click();
      expect(display.textContent).toBe('3');

      decrementBtn.click();
      decrementBtn.click();
      expect(display.textContent).toBe('1');

      resetBtn.click();
      expect(display.textContent).toBe('0');
    });
  });
});
