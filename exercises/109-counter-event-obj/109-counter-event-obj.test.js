import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  getEventType,
  getEventTarget,
  getEventTimestamp,
  logEventDetails,
  handleClickWithDetails
} from './109-counter-event-obj.js';

describe('Interactive Counter - Event Object', () => {
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

  describe('getEventType', () => {
    it('should return event type', () => {
      const button = document.getElementById('increment-btn');
      let capturedType;
      
      button.addEventListener('click', (e) => {
        capturedType = getEventType(e);
      });
      
      button.click();
      expect(capturedType).toBe('click');
    });

    it('should handle different event types', () => {
      const button = document.getElementById('increment-btn');
      let capturedType;
      
      button.addEventListener('mouseover', (e) => {
        capturedType = getEventType(e);
      });
      
      const event = new window.MouseEvent('mouseover');
      button.dispatchEvent(event);
      
      expect(capturedType).toBe('mouseover');
    });
  });

  describe('getEventTarget', () => {
    it('should return target element', () => {
      const button = document.getElementById('increment-btn');
      let capturedTarget;
      
      button.addEventListener('click', (e) => {
        capturedTarget = getEventTarget(e);
      });
      
      button.click();
      expect(capturedTarget).toBe(button);
    });

    it('should have correct element properties', () => {
      const button = document.getElementById('increment-btn');
      let capturedTarget;
      
      button.addEventListener('click', (e) => {
        capturedTarget = getEventTarget(e);
      });
      
      button.click();
      expect(capturedTarget.id).toBe('increment-btn');
      expect(capturedTarget.tagName).toBe('BUTTON');
    });
  });

  describe('getEventTimestamp', () => {
    it('should return timestamp', () => {
      const button = document.getElementById('increment-btn');
      let capturedTimestamp;
      
      button.addEventListener('click', (e) => {
        capturedTimestamp = getEventTimestamp(e);
      });
      
      button.click();
      expect(typeof capturedTimestamp).toBe('number');
      expect(capturedTimestamp).toBeGreaterThanOrEqual(0);
    });

    it('should return valid timestamp values', () => {
      const button = document.getElementById('increment-btn');
      const timestamps = [];
      
      button.addEventListener('click', (e) => {
        timestamps.push(getEventTimestamp(e));
      });
      
      button.click();
      button.click();
      
      expect(timestamps.length).toBe(2);
      expect(timestamps[1]).toBeGreaterThanOrEqual(timestamps[0]);
    });
  });

  describe('logEventDetails', () => {
    it('should log event details', () => {
      const button = document.getElementById('increment-btn');
      const consoleSpy = vi.spyOn(console, 'log');
      
      button.addEventListener('click', (e) => {
        logEventDetails(e);
      });
      
      button.click();
      
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should include type in log', () => {
      const button = document.getElementById('increment-btn');
      const consoleSpy = vi.spyOn(console, 'log');
      
      button.addEventListener('click', (e) => {
        logEventDetails(e);
      });
      
      button.click();
      
      const logOutput = consoleSpy.mock.calls[0][0];
      expect(String(logOutput).toLowerCase()).toContain('click');
      
      consoleSpy.mockRestore();
    });
  });

  describe('handleClickWithDetails', () => {
    it('should increment counter', () => {
      const counter = { count: 0 };
      const button = document.getElementById('increment-btn');
      let result;
      
      button.addEventListener('click', (e) => {
        result = handleClickWithDetails(e, counter);
      });
      
      button.click();
      
      expect(counter.count).toBe(1);
    });

    it('should return object with event info', () => {
      const counter = { count: 0 };
      const button = document.getElementById('increment-btn');
      let result;
      
      button.addEventListener('click', (e) => {
        result = handleClickWithDetails(e, counter);
      });
      
      button.click();
      
      expect(result).toHaveProperty('type');
      expect(result).toHaveProperty('count');
      expect(result.type).toBe('click');
      expect(result.count).toBe(1);
    });

    it('should include event target in result', () => {
      const counter = { count: 0 };
      const button = document.getElementById('increment-btn');
      let result;
      
      button.addEventListener('click', (e) => {
        result = handleClickWithDetails(e, counter);
      });
      
      button.click();
      
      expect(result).toHaveProperty('target');
      expect(result.target).toBe(button);
    });

    it('should increment multiple times', () => {
      const counter = { count: 0 };
      const button = document.getElementById('increment-btn');
      const results = [];
      
      button.addEventListener('click', (e) => {
        results.push(handleClickWithDetails(e, counter));
      });
      
      button.click();
      button.click();
      button.click();
      
      expect(counter.count).toBe(3);
      expect(results[2].count).toBe(3);
    });
  });
});
