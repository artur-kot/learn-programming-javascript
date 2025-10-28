import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  getMousePosition,
  drawLineSegment,
  handleMouseMove,
  updateDrawingState,
  setupDrawingEventHandlers
} from './119-canvas-mouse-move.js';

describe('Interactive Drawing Canvas - Mouse Move Events', () => {
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

  describe('getMousePosition', () => {
    it('should return object with x and y', () => {
      const event = new window.MouseEvent('mousemove', {
        clientX: 100,
        clientY: 200
      });
      Object.defineProperty(event, 'target', { value: canvas, writable: false });

      canvas.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 800,
        height: 600
      });

      const pos = getMousePosition(event, canvas);
      expect(pos).toHaveProperty('x');
      expect(pos).toHaveProperty('y');
    });

    it('should calculate canvas-relative coordinates', () => {
      const event = new window.MouseEvent('mousemove', {
        clientX: 110,
        clientY: 120
      });

      canvas.getBoundingClientRect = () => ({
        left: 10,
        top: 20,
        width: 800,
        height: 600
      });

      const pos = getMousePosition(event, canvas);
      expect(pos.x).toBe(100);
      expect(pos.y).toBe(100);
    });

    it('should handle negative coordinates', () => {
      const event = new window.MouseEvent('mousemove', {
        clientX: 5,
        clientY: 10
      });

      canvas.getBoundingClientRect = () => ({
        left: 10,
        top: 20,
        width: 800,
        height: 600
      });

      const pos = getMousePosition(event, canvas);
      expect(pos.x).toBe(-5);
      expect(pos.y).toBe(-10);
    });
  });

  describe('drawLineSegment', () => {
    it('should draw a line with provided color', () => {
      const beginPathSpy = vi.spyOn(ctx, 'beginPath');
      const strokeSpy = vi.spyOn(ctx, 'stroke');

      drawLineSegment(ctx, 10, 10, 100, 100, '#000000', 2);

      expect(beginPathSpy).toHaveBeenCalled();
      expect(strokeSpy).toHaveBeenCalled();
      expect(ctx.strokeStyle).toBe('#000000');
    });

    it('should set line width', () => {
      drawLineSegment(ctx, 10, 10, 100, 100, '#000', 5);
      expect(ctx.lineWidth).toBe(5);
    });

    it('should move to starting point', () => {
      const moveToSpy = vi.spyOn(ctx, 'moveTo');
      drawLineSegment(ctx, 10, 10, 100, 100, '#000', 2);

      expect(moveToSpy).toHaveBeenCalledWith(10, 10);
    });

    it('should draw line to ending point', () => {
      const lineToSpy = vi.spyOn(ctx, 'lineTo');
      drawLineSegment(ctx, 10, 10, 100, 100, '#000', 2);

      expect(lineToSpy).toHaveBeenCalledWith(100, 100);
    });

    it('should use different colors', () => {
      drawLineSegment(ctx, 0, 0, 50, 50, '#FF0000', 2);
      expect(ctx.strokeStyle).toBe('#FF0000');

      drawLineSegment(ctx, 0, 0, 50, 50, '#00FF00', 2);
      expect(ctx.strokeStyle).toBe('#00FF00');
    });
  });

  describe('updateDrawingState', () => {
    it('should store new position', () => {
      const state = { lastX: 0, lastY: 0 };
      updateDrawingState(state, 100, 200);

      expect(state.lastX).toBe(100);
      expect(state.lastY).toBe(200);
    });

    it('should update previous values', () => {
      const state = { lastX: 50, lastY: 50 };
      updateDrawingState(state, 100, 200);

      expect(state.lastX).toBe(100);
      expect(state.lastY).toBe(200);
    });

    it('should handle multiple updates', () => {
      const state = {};
      updateDrawingState(state, 10, 20);
      expect(state.lastX).toBe(10);
      expect(state.lastY).toBe(20);

      updateDrawingState(state, 30, 40);
      expect(state.lastX).toBe(30);
      expect(state.lastY).toBe(40);
    });
  });

  describe('handleMouseMove', () => {
    it('should not draw if not drawing', () => {
      const state = { isDrawing: false, lastX: 0, lastY: 0 };
      const strokeSpy = vi.spyOn(ctx, 'stroke');

      const event = new window.MouseEvent('mousemove', {
        clientX: 100,
        clientY: 100
      });
      Object.defineProperty(event, 'target', { value: canvas, writable: false });

      canvas.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 800,
        height: 600
      });

      handleMouseMove(event, canvas, ctx, state);

      expect(strokeSpy).not.toHaveBeenCalled();
    });

    it('should draw line when drawing', () => {
      const state = { isDrawing: true, lastX: 50, lastY: 50 };
      const strokeSpy = vi.spyOn(ctx, 'stroke');

      const event = new window.MouseEvent('mousemove', {
        clientX: 100,
        clientY: 100
      });

      canvas.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 800,
        height: 600
      });

      handleMouseMove(event, canvas, ctx, state);

      expect(strokeSpy).toHaveBeenCalled();
    });

    it('should update state after drawing', () => {
      const state = { isDrawing: true, lastX: 50, lastY: 50 };

      const event = new window.MouseEvent('mousemove', {
        clientX: 100,
        clientY: 100
      });

      canvas.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 800,
        height: 600
      });

      handleMouseMove(event, canvas, ctx, state);

      expect(state.lastX).toBe(100);
      expect(state.lastY).toBe(100);
    });
  });

  describe('setupDrawingEventHandlers', () => {
    it('should attach mousedown listener', () => {
      const addEventListenerSpy = vi.spyOn(canvas, 'addEventListener');
      const state = { isDrawing: false };

      setupDrawingEventHandlers(canvas, ctx, state);

      expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    });

    it('should attach mouseup listener', () => {
      const addEventListenerSpy = vi.spyOn(canvas, 'addEventListener');
      const state = { isDrawing: false };

      setupDrawingEventHandlers(canvas, ctx, state);

      expect(addEventListenerSpy).toHaveBeenCalledWith('mouseup', expect.any(Function));
    });

    it('should attach mousemove listener', () => {
      const addEventListenerSpy = vi.spyOn(canvas, 'addEventListener');
      const state = { isDrawing: false };

      setupDrawingEventHandlers(canvas, ctx, state);

      expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    });

    it('should set drawing state on mousedown', () => {
      const state = { isDrawing: false };
      setupDrawingEventHandlers(canvas, ctx, state);

      const event = new window.MouseEvent('mousedown', {
        clientX: 100,
        clientY: 100
      });

      canvas.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 800,
        height: 600
      });

      canvas.dispatchEvent(event);
      expect(state.isDrawing).toBe(true);
    });

    it('should clear drawing state on mouseup', () => {
      const state = { isDrawing: true };
      setupDrawingEventHandlers(canvas, ctx, state);

      const event = new window.MouseEvent('mouseup');
      canvas.dispatchEvent(event);

      expect(state.isDrawing).toBe(false);
    });
  });
});
