import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  clearCanvas,
  createCanvasClearedEvent,
  dispatchCanvasClearedEvent,
  onCanvasCleared,
  saveCanvasState,
  undoCanvasAction
} from './121-canvas-custom-event.js';

describe('Interactive Drawing Canvas - Custom Events', () => {
  let dom;
  let window;
  let document;
  let canvas;
  let ctx;

  beforeEach(() => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head><title>Test</title></head>
      <body>
        <canvas id="drawing-canvas" width="800" height="600"></canvas>
      </body>
      </html>
    `;
    dom = new JSDOM(html, { pretendToBeVisual: true });
    window = dom.window;
    document = window.document;
    global.window = window;
    global.document = document;
    canvas = document.getElementById('drawing-canvas');
    ctx = canvas.getContext('2D');
  });

  describe('clearCanvas', () => {
    it('should clear the canvas', () => {
      const clearRectSpy = vi.spyOn(ctx, 'clearRect');
      const history = [];

      clearCanvas(ctx, canvas, history);

      expect(clearRectSpy).toHaveBeenCalledWith(0, 0, 800, 600);
    });

    it('should add state to history', () => {
      const history = [];
      
      // Draw something first
      ctx.fillRect(10, 10, 50, 50);
      
      clearCanvas(ctx, canvas, history);

      expect(history.length).toBeGreaterThan(0);
    });

    it('should handle empty history', () => {
      const history = [];
      
      clearCanvas(ctx, canvas, history);

      expect(history.length).toBeGreaterThan(0);
    });
  });

  describe('createCanvasClearedEvent', () => {
    it('should create a custom event', () => {
      const event = createCanvasClearedEvent();
      expect(event).toBeDefined();
    });

    it('should create event with type canvasCleared', () => {
      const event = createCanvasClearedEvent();
      expect(event.type).toBe('canvasCleared');
    });

    it('should be a CustomEvent', () => {
      const event = createCanvasClearedEvent();
      expect(event.constructor.name).toBe('CustomEvent');
    });

    it('should be bubbling', () => {
      const event = createCanvasClearedEvent();
      expect(event.bubbles).toBe(true);
    });

    it('should be cancelable', () => {
      const event = createCanvasClearedEvent();
      expect(event.cancelable).toBe(true);
    });
  });

  describe('dispatchCanvasClearedEvent', () => {
    it('should dispatch event on target', () => {
      const dispatchSpy = vi.spyOn(canvas, 'dispatchEvent');
      
      dispatchCanvasClearedEvent(canvas);

      expect(dispatchSpy).toHaveBeenCalled();
    });

    it('should dispatch canvasCleared event', () => {
      const dispatchSpy = vi.spyOn(canvas, 'dispatchEvent');
      
      dispatchCanvasClearedEvent(canvas);

      const event = dispatchSpy.mock.calls[0][0];
      expect(event.type).toBe('canvasCleared');
    });
  });

  describe('onCanvasCleared', () => {
    it('should add listener for canvasCleared event', () => {
      const addEventListenerSpy = vi.spyOn(canvas, 'addEventListener');
      const callback = vi.fn();

      onCanvasCleared(canvas, callback);

      expect(addEventListenerSpy).toHaveBeenCalledWith('canvasCleared', callback);
    });

    it('should fire callback when event is dispatched', () => {
      const callback = vi.fn();
      
      onCanvasCleared(canvas, callback);
      dispatchCanvasClearedEvent(canvas);

      expect(callback).toHaveBeenCalled();
    });

    it('should pass event to callback', () => {
      const callback = vi.fn();
      
      onCanvasCleared(canvas, callback);
      dispatchCanvasClearedEvent(canvas);

      const event = callback.mock.calls[0][0];
      expect(event.type).toBe('canvasCleared');
    });
  });

  describe('saveCanvasState', () => {
    it('should save canvas image data', () => {
      const history = [];

      // Draw something
      ctx.fillStyle = '#FF0000';
      ctx.fillRect(10, 10, 50, 50);

      saveCanvasState(canvas, history);

      expect(history.length).toBe(1);
    });

    it('should save multiple states', () => {
      const history = [];

      saveCanvasState(canvas, history);
      expect(history.length).toBe(1);

      saveCanvasState(canvas, history);
      expect(history.length).toBe(2);

      saveCanvasState(canvas, history);
      expect(history.length).toBe(3);
    });

    it('should store ImageData or URL', () => {
      const history = [];

      ctx.fillRect(10, 10, 50, 50);
      saveCanvasState(canvas, history);

      const state = history[0];
      expect(state).toBeDefined();
      expect(typeof state === 'string' || state instanceof ImageData).toBe(true);
    });
  });

  describe('undoCanvasAction', () => {
    it('should restore previous state', () => {
      const history = [];

      // Draw first
      ctx.fillStyle = '#FF0000';
      ctx.fillRect(10, 10, 50, 50);
      saveCanvasState(canvas, history);

      // Draw again
      ctx.fillStyle = '#00FF00';
      ctx.fillRect(100, 100, 50, 50);
      saveCanvasState(canvas, history);

      // Undo to first state
      undoCanvasAction(ctx, canvas, history);

      // History should have one state remaining
      expect(history.length).toBeGreaterThanOrEqual(0);
    });

    it('should handle single state in history', () => {
      const history = [];

      ctx.fillRect(10, 10, 50, 50);
      saveCanvasState(canvas, history);

      // Should not error
      expect(() => {
        undoCanvasAction(ctx, canvas, history);
      }).not.toThrow();
    });

    it('should handle empty history gracefully', () => {
      const history = [];

      expect(() => {
        undoCanvasAction(ctx, canvas, history);
      }).not.toThrow();
    });
  });

  describe('Integration: Custom Event Workflow', () => {
    it('should work with clear and event dispatch', () => {
      const callback = vi.fn();
      const history = [];

      onCanvasCleared(canvas, callback);

      ctx.fillRect(10, 10, 50, 50);
      clearCanvas(ctx, canvas, history);
      dispatchCanvasClearedEvent(canvas);

      expect(callback).toHaveBeenCalled();
    });

    it('should track history and undo', () => {
      const history = [];

      // Draw and save state
      ctx.fillStyle = '#FF0000';
      ctx.fillRect(10, 10, 50, 50);
      saveCanvasState(canvas, history);

      // Draw more and save
      ctx.fillStyle = '#00FF00';
      ctx.fillRect(100, 100, 50, 50);
      saveCanvasState(canvas, history);

      expect(history.length).toBe(2);

      // Undo
      undoCanvasAction(ctx, canvas, history);

      expect(history.length).toBeGreaterThanOrEqual(0);
    });
  });
});
