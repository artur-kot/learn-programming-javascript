import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  initCanvas,
  getCanvasContext,
  setCanvasSize,
  startDrawing,
  stopDrawing
} from './116-canvas-mouse-click.js';

describe('Interactive Drawing Canvas - Mouse Down/Up Events', () => {
  let dom;
  let window;
  let document;
  let canvas;

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
  });

  describe('initCanvas', () => {
    it('should return canvas context', () => {
      const ctx = initCanvas(canvas);
      expect(ctx).toBeDefined();
      expect(typeof ctx).toBe('object');
    });

    it('should return 2D context', () => {
      const ctx = initCanvas(canvas);
      expect(ctx.fillStyle).toBeDefined();
      expect(ctx.strokeStyle).toBeDefined();
    });

    it('should have canvas reference', () => {
      const ctx = initCanvas(canvas);
      expect(ctx.canvas).toBeDefined();
    });
  });

  describe('getCanvasContext', () => {
    it('should get 2D context', () => {
      const ctx = getCanvasContext(canvas);
      expect(ctx).toBeDefined();
      expect(typeof ctx).toBe('object');
    });

    it('should return drawing context with methods', () => {
      const ctx = getCanvasContext(canvas);
      expect(typeof ctx.fillRect).toBe('function');
      expect(typeof ctx.strokeRect).toBe('function');
      expect(typeof ctx.beginPath).toBe('function');
    });
  });

  describe('setCanvasSize', () => {
    it('should set canvas width', () => {
      setCanvasSize(canvas, 1024, 768);
      expect(canvas.width).toBe(1024);
    });

    it('should set canvas height', () => {
      setCanvasSize(canvas, 1024, 768);
      expect(canvas.height).toBe(768);
    });

    it('should set both dimensions', () => {
      setCanvasSize(canvas, 640, 480);
      expect(canvas.width).toBe(640);
      expect(canvas.height).toBe(480);
    });

    it('should accept large dimensions', () => {
      setCanvasSize(canvas, 2000, 1500);
      expect(canvas.width).toBe(2000);
      expect(canvas.height).toBe(1500);
    });
  });

  describe('startDrawing', () => {
    it('should set drawing state to true', () => {
      const drawingState = { isDrawing: false };
      const event = new window.MouseEvent('mousedown');
      
      startDrawing(event, drawingState);
      
      expect(drawingState.isDrawing).toBe(true);
    });

    it('should store starting position', () => {
      const drawingState = { isDrawing: false };
      const event = new window.MouseEvent('mousedown', {
        clientX: 100,
        clientY: 200
      });
      Object.defineProperty(event, 'target', { value: canvas, writable: false });
      
      startDrawing(event, drawingState);
      
      expect(drawingState.isDrawing).toBe(true);
      expect(drawingState.startX).toBeDefined();
      expect(drawingState.startY).toBeDefined();
    });

    it('should capture mouse position relative to canvas', () => {
      const drawingState = { isDrawing: false };
      
      canvas.getBoundingClientRect = () => ({
        left: 10,
        top: 20,
        width: 800,
        height: 600,
        right: 810,
        bottom: 620,
        x: 10,
        y: 20
      });
      
      const event = new window.MouseEvent('mousedown', {
        clientX: 110,
        clientY: 120
      });
      Object.defineProperty(event, 'target', { value: canvas, writable: false });
      
      startDrawing(event, drawingState);
      
      expect(drawingState.startX).toBeGreaterThanOrEqual(0);
      expect(drawingState.startY).toBeGreaterThanOrEqual(0);
    });
  });

  describe('stopDrawing', () => {
    it('should set drawing state to false', () => {
      const drawingState = { isDrawing: true };
      
      stopDrawing(drawingState);
      
      expect(drawingState.isDrawing).toBe(false);
    });

    it('should clear position data', () => {
      const drawingState = {
        isDrawing: true,
        startX: 100,
        startY: 200
      };
      
      stopDrawing(drawingState);
      
      expect(drawingState.isDrawing).toBe(false);
      expect(drawingState.startX).toBeUndefined();
      expect(drawingState.startY).toBeUndefined();
    });

    it('should handle already stopped drawing', () => {
      const drawingState = { isDrawing: false };
      
      expect(() => stopDrawing(drawingState)).not.toThrow();
      expect(drawingState.isDrawing).toBe(false);
    });

    it('should be idempotent', () => {
      const drawingState = { isDrawing: true };
      
      stopDrawing(drawingState);
      expect(drawingState.isDrawing).toBe(false);
      
      stopDrawing(drawingState);
      expect(drawingState.isDrawing).toBe(false);
    });
  });
});
