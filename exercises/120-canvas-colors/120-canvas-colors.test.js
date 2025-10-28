import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  getColorFromButton,
  updateDrawingColor,
  handleColorClick,
  setupColorEventDelegation,
  createColorButton,
  initColorPicker
} from './120-canvas-colors.js';

describe('Interactive Drawing Canvas - Color Picker', () => {
  let dom;
  let window;
  let document;
  let canvas;
  let ctx;
  let colorContainer;

  beforeEach(() => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head><title>Test</title></head>
      <body>
        <canvas id="drawing-canvas" width="800" height="600"></canvas>
        <div id="color-container"></div>
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
    colorContainer = document.getElementById('color-container');
  });

  describe('getColorFromButton', () => {
    it('should return color from data attribute', () => {
      const button = document.createElement('button');
      button.dataset.color = '#FF0000';
      
      const color = getColorFromButton(button);
      expect(color).toBe('#FF0000');
    });

    it('should handle different color formats', () => {
      const button1 = document.createElement('button');
      button1.dataset.color = '#00FF00';
      
      const button2 = document.createElement('button');
      button2.dataset.color = 'rgb(0, 0, 255)';
      
      expect(getColorFromButton(button1)).toBe('#00FF00');
      expect(getColorFromButton(button2)).toBe('rgb(0, 0, 255)');
    });

    it('should return undefined for button without color', () => {
      const button = document.createElement('button');
      const color = getColorFromButton(button);
      expect(color).toBeUndefined();
    });
  });

  describe('updateDrawingColor', () => {
    it('should set context strokeStyle', () => {
      updateDrawingColor(ctx, '#FF0000');
      expect(ctx.strokeStyle).toBe('#FF0000');
    });

    it('should update to different colors', () => {
      updateDrawingColor(ctx, '#00FF00');
      expect(ctx.strokeStyle).toBe('#00FF00');

      updateDrawingColor(ctx, '#0000FF');
      expect(ctx.strokeStyle).toBe('#0000FF');
    });

    it('should handle RGB format', () => {
      updateDrawingColor(ctx, 'rgb(255, 0, 0)');
      // Canvas converts to normalized form
      expect(ctx.strokeStyle).not.toBeUndefined();
    });
  });

  describe('createColorButton', () => {
    it('should create a button element', () => {
      const button = createColorButton('#FF0000', 'Red');
      expect(button.tagName).toBe('BUTTON');
    });

    it('should set data-color attribute', () => {
      const button = createColorButton('#FF0000', 'Red');
      expect(button.dataset.color).toBe('#FF0000');
    });

    it('should set text content', () => {
      const button = createColorButton('#FF0000', 'Red');
      expect(button.textContent).toBe('Red');
    });

    it('should create multiple buttons with different colors', () => {
      const red = createColorButton('#FF0000', 'Red');
      const blue = createColorButton('#0000FF', 'Blue');

      expect(red.dataset.color).toBe('#FF0000');
      expect(blue.dataset.color).toBe('#0000FF');
    });
  });

  describe('handleColorClick', () => {
    it('should update color when button is clicked', () => {
      const button = document.createElement('button');
      button.dataset.color = '#FF0000';
      colorContainer.appendChild(button);

      const event = new window.MouseEvent('click');
      Object.defineProperty(event, 'target', { value: button, writable: false });

      handleColorClick(event, ctx, colorContainer);

      expect(ctx.strokeStyle).toBe('#FF0000');
    });

    it('should work with event delegation', () => {
      const button1 = document.createElement('button');
      button1.dataset.color = '#FF0000';
      const button2 = document.createElement('button');
      button2.dataset.color = '#00FF00';
      
      colorContainer.appendChild(button1);
      colorContainer.appendChild(button2);

      let event = new window.MouseEvent('click');
      Object.defineProperty(event, 'target', { value: button1, writable: false });
      handleColorClick(event, ctx, colorContainer);
      expect(ctx.strokeStyle).toBe('#FF0000');

      event = new window.MouseEvent('click');
      Object.defineProperty(event, 'target', { value: button2, writable: false });
      handleColorClick(event, ctx, colorContainer);
      expect(ctx.strokeStyle).toBe('#00FF00');
    });

    it('should ignore clicks on non-button elements', () => {
      const originalColor = '#000000';
      ctx.strokeStyle = originalColor;

      const div = document.createElement('div');
      colorContainer.appendChild(div);

      const event = new window.MouseEvent('click');
      Object.defineProperty(event, 'target', { value: div, writable: false });

      handleColorClick(event, ctx, colorContainer);
      expect(ctx.strokeStyle).toBe(originalColor);
    });
  });

  describe('setupColorEventDelegation', () => {
    it('should add click listener to container', () => {
      const addEventListenerSpy = vi.spyOn(colorContainer, 'addEventListener');
      
      setupColorEventDelegation(colorContainer, ctx);

      expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
    });

    it('should handle click events', () => {
      setupColorEventDelegation(colorContainer, ctx);

      const button = document.createElement('button');
      button.dataset.color = '#FF0000';
      colorContainer.appendChild(button);

      const event = new window.MouseEvent('click');
      Object.defineProperty(event, 'target', { value: button, writable: false });

      colorContainer.dispatchEvent(event);
      expect(ctx.strokeStyle).toBe('#FF0000');
    });
  });

  describe('initColorPicker', () => {
    it('should create color buttons', () => {
      const colors = [
        { hex: '#000000', name: 'Black' },
        { hex: '#FF0000', name: 'Red' },
        { hex: '#00FF00', name: 'Green' }
      ];

      initColorPicker(colorContainer, colors, ctx);

      const buttons = colorContainer.querySelectorAll('button');
      expect(buttons.length).toBe(3);
    });

    it('should set up event delegation', () => {
      const colors = [
        { hex: '#000000', name: 'Black' },
        { hex: '#FF0000', name: 'Red' }
      ];

      initColorPicker(colorContainer, colors, ctx);

      const button = colorContainer.querySelector('button[data-color="#FF0000"]');
      const event = new window.MouseEvent('click');
      Object.defineProperty(event, 'target', { value: button, writable: false });

      colorContainer.dispatchEvent(event);
      expect(ctx.strokeStyle).toBe('#FF0000');
    });

    it('should create buttons with correct colors', () => {
      const colors = [
        { hex: '#FF0000', name: 'Red' },
        { hex: '#00FF00', name: 'Green' },
        { hex: '#0000FF', name: 'Blue' }
      ];

      initColorPicker(colorContainer, colors, ctx);

      const buttons = colorContainer.querySelectorAll('button');
      expect(buttons[0].dataset.color).toBe('#FF0000');
      expect(buttons[1].dataset.color).toBe('#00FF00');
      expect(buttons[2].dataset.color).toBe('#0000FF');
    });

    it('should display color names', () => {
      const colors = [
        { hex: '#FF0000', name: 'Red' },
        { hex: '#00FF00', name: 'Green' }
      ];

      initColorPicker(colorContainer, colors, ctx);

      const buttons = colorContainer.querySelectorAll('button');
      expect(buttons[0].textContent).toBe('Red');
      expect(buttons[1].textContent).toBe('Green');
    });
  });
});
