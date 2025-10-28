import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  removeClickListener,
  removeKeyboardListener,
  disableCounter,
  enableCounter,
  toggleCounterListeners
} from './112-counter-remove.js';

describe('Interactive Counter - Remove Listeners', () => {
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
        <button id="enable-btn">Enable</button>
        <button id="disable-btn">Disable</button>
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

  describe('removeClickListener', () => {
    it('should remove click listener from button', () => {
      const button = document.getElementById('increment-btn');
      let called = false;
      
      const handler = () => { called = true; };
      button.addEventListener('click', handler);
      
      removeClickListener(button, handler);
      button.click();
      
      expect(called).toBe(false);
    });

    it('should not affect other listeners', () => {
      const button = document.getElementById('increment-btn');
      let handler1Called = false;
      let handler2Called = false;
      
      const handler1 = () => { handler1Called = true; };
      const handler2 = () => { handler2Called = true; };
      
      button.addEventListener('click', handler1);
      button.addEventListener('click', handler2);
      
      removeClickListener(button, handler1);
      button.click();
      
      expect(handler1Called).toBe(false);
      expect(handler2Called).toBe(true);
    });

    it('should work for multiple buttons', () => {
      const btn1 = document.getElementById('increment-btn');
      const btn2 = document.getElementById('decrement-btn');
      let called1 = false;
      let called2 = false;
      
      const handler1 = () => { called1 = true; };
      const handler2 = () => { called2 = true; };
      
      btn1.addEventListener('click', handler1);
      btn2.addEventListener('click', handler2);
      
      removeClickListener(btn1, handler1);
      
      btn1.click();
      btn2.click();
      
      expect(called1).toBe(false);
      expect(called2).toBe(true);
    });
  });

  describe('removeKeyboardListener', () => {
    it('should remove keyboard listener', () => {
      let called = false;
      const handler = () => { called = true; };
      
      window.addEventListener('keydown', handler);
      removeKeyboardListener(handler);
      
      const event = new window.KeyboardEvent('keydown', { key: 'ArrowUp' });
      window.dispatchEvent(event);
      
      expect(called).toBe(false);
    });

    it('should work after adding listener', () => {
      let callCount = 0;
      const handler = () => { callCount++; };
      
      window.addEventListener('keydown', handler);
      
      const event1 = new window.KeyboardEvent('keydown', { key: 'ArrowUp' });
      window.dispatchEvent(event1);
      expect(callCount).toBe(1);
      
      removeKeyboardListener(handler);
      
      const event2 = new window.KeyboardEvent('keydown', { key: 'ArrowUp' });
      window.dispatchEvent(event2);
      expect(callCount).toBe(1);
    });
  });

  describe('disableCounter', () => {
    it('should disable click listeners', () => {
      const incrementBtn = document.getElementById('increment-btn');
      const decrementBtn = document.getElementById('decrement-btn');
      let incrementCalled = false;
      let decrementCalled = false;
      
      const incrementHandler = () => { incrementCalled = true; };
      const decrementHandler = () => { decrementCalled = true; };
      const keyboardHandler = () => {};
      
      incrementBtn.addEventListener('click', incrementHandler);
      decrementBtn.addEventListener('click', decrementHandler);
      
      const buttons = {
        increment: { element: incrementBtn, handler: incrementHandler },
        decrement: { element: decrementBtn, handler: decrementHandler }
      };
      
      disableCounter(buttons, keyboardHandler);
      
      incrementBtn.click();
      decrementBtn.click();
      
      expect(incrementCalled).toBe(false);
      expect(decrementCalled).toBe(false);
    });

    it('should disable keyboard listener', () => {
      let keyboardCalled = false;
      const keyboardHandler = () => { keyboardCalled = true; };
      
      window.addEventListener('keydown', keyboardHandler);
      
      const buttons = {};
      disableCounter(buttons, keyboardHandler);
      
      const event = new window.KeyboardEvent('keydown', { key: 'ArrowUp' });
      window.dispatchEvent(event);
      
      expect(keyboardCalled).toBe(false);
    });
  });

  describe('enableCounter', () => {
    it('should enable click listeners', () => {
      const incrementBtn = document.getElementById('increment-btn');
      let called = false;
      
      const handler = () => { called = true; };
      const keyboardHandler = () => {};
      
      const buttons = {
        increment: { element: incrementBtn, handler: handler }
      };
      
      enableCounter(buttons, keyboardHandler);
      incrementBtn.click();
      
      expect(called).toBe(true);
    });

    it('should enable keyboard listener', () => {
      let called = false;
      const keyboardHandler = () => { called = true; };
      
      const buttons = {};
      enableCounter(buttons, keyboardHandler);
      
      const event = new window.KeyboardEvent('keydown', { key: 'ArrowUp' });
      window.dispatchEvent(event);
      
      expect(called).toBe(true);
    });
  });

  describe('toggleCounterListeners', () => {
    it('should enable when enabled is true', () => {
      const incrementBtn = document.getElementById('increment-btn');
      let called = false;
      
      const handler = () => { called = true; };
      const keyboardHandler = () => {};
      
      const buttons = {
        increment: { element: incrementBtn, handler: handler }
      };
      
      toggleCounterListeners(buttons, keyboardHandler, true);
      incrementBtn.click();
      
      expect(called).toBe(true);
    });

    it('should disable when enabled is false', () => {
      const incrementBtn = document.getElementById('increment-btn');
      let called = false;
      
      const handler = () => { called = true; };
      const keyboardHandler = () => {};
      
      incrementBtn.addEventListener('click', handler);
      
      const buttons = {
        increment: { element: incrementBtn, handler: handler }
      };
      
      toggleCounterListeners(buttons, keyboardHandler, false);
      incrementBtn.click();
      
      expect(called).toBe(false);
    });

    it('should toggle back and forth', () => {
      const incrementBtn = document.getElementById('increment-btn');
      let callCount = 0;
      
      const handler = () => { callCount++; };
      const keyboardHandler = () => {};
      
      const buttons = {
        increment: { element: incrementBtn, handler: handler }
      };
      
      // Enable
      toggleCounterListeners(buttons, keyboardHandler, true);
      incrementBtn.click();
      expect(callCount).toBe(1);
      
      // Disable
      toggleCounterListeners(buttons, keyboardHandler, false);
      incrementBtn.click();
      expect(callCount).toBe(1);
      
      // Enable again
      toggleCounterListeners(buttons, keyboardHandler, true);
      incrementBtn.click();
      expect(callCount).toBe(2);
    });
  });
});
