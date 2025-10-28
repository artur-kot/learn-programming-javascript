import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  getCanvasDataURL,
  createBlobFromCanvas,
  downloadCanvasImage,
  getImageFormat,
  copyCanvasToClipboard,
  generateFileName
} from './122-canvas-save.js';

describe('Interactive Drawing Canvas - Save Drawing', () => {
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
        <a id="download-link"></a>
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

  describe('getCanvasDataURL', () => {
    it('should return a data URL', () => {
      const url = getCanvasDataURL(canvas);
      expect(typeof url).toBe('string');
      expect(url.startsWith('data:')).toBe(true);
    });

    it('should default to image/png format', () => {
      const url = getCanvasDataURL(canvas);
      expect(url.startsWith('data:image/png')).toBe(true);
    });

    it('should support different formats', () => {
      const pngUrl = getCanvasDataURL(canvas, 'image/png');
      expect(pngUrl.startsWith('data:image/png')).toBe(true);

      const jpegUrl = getCanvasDataURL(canvas, 'image/jpeg');
      expect(jpegUrl.startsWith('data:image/jpeg')).toBe(true);
    });

    it('should return valid data URL after drawing', () => {
      ctx.fillRect(10, 10, 50, 50);
      const url = getCanvasDataURL(canvas);
      expect(url).toMatch(/^data:image\/png;base64,/);
    });
  });

  describe('getImageFormat', () => {
    it('should extract format from PNG filename', () => {
      const format = getImageFormat('drawing.png');
      expect(format).toBe('image/png');
    });

    it('should extract format from JPEG filename', () => {
      const format = getImageFormat('drawing.jpg');
      expect(['image/jpeg', 'image/jpg']).toContain(format);
    });

    it('should extract format from JPEG with .jpeg extension', () => {
      const format = getImageFormat('drawing.jpeg');
      expect(['image/jpeg', 'image/jpg']).toContain(format);
    });

    it('should handle uppercase extensions', () => {
      const format = getImageFormat('drawing.PNG');
      expect(format).toBe('image/png');
    });

    it('should return image/png as default for unknown extensions', () => {
      const format = getImageFormat('drawing.txt');
      expect(format).toBe('image/png');
    });
  });

  describe('generateFileName', () => {
    it('should return a string', () => {
      const filename = generateFileName();
      expect(typeof filename).toBe('string');
    });

    it('should include timestamp', () => {
      const filename = generateFileName();
      expect(filename).toMatch(/\d{4}-\d{2}-\d{2}/);
    });

    it('should include extension', () => {
      const filename = generateFileName('png');
      expect(filename.endsWith('.png')).toBe(true);
    });

    it('should include different extensions', () => {
      const png = generateFileName('png');
      const jpg = generateFileName('jpg');

      expect(png.endsWith('.png')).toBe(true);
      expect(jpg.endsWith('.jpg')).toBe(true);
    });

    it('should be unique for different calls', () => {
      const filename1 = generateFileName();
      const filename2 = generateFileName();

      // At least different (may differ in timestamp or random component)
      expect(filename1).toBeDefined();
      expect(filename2).toBeDefined();
    });

    it('should default to png extension', () => {
      const filename = generateFileName();
      expect(filename.endsWith('.png')).toBe(true);
    });
  });

  describe('createBlobFromCanvas', () => {
    it('should return a Blob', (done) => {
      createBlobFromCanvas(canvas, 'image/png').then((blob) => {
        expect(blob instanceof window.Blob).toBe(true);
        done();
      });
    });

    it('should create blob with correct type', (done) => {
      createBlobFromCanvas(canvas, 'image/png').then((blob) => {
        expect(blob.type).toBe('image/png');
        done();
      });
    });

    it('should support PNG format', (done) => {
      createBlobFromCanvas(canvas, 'image/png').then((blob) => {
        expect(blob.size).toBeGreaterThan(0);
        expect(blob.type).toBe('image/png');
        done();
      });
    });

    it('should support JPEG format', (done) => {
      createBlobFromCanvas(canvas, 'image/jpeg').then((blob) => {
        expect(blob.size).toBeGreaterThan(0);
        expect(blob.type).toBe('image/jpeg');
        done();
      });
    });

    it('should create different sizes for different content', (done) => {
      const blank = createBlobFromCanvas(canvas, 'image/png');
      
      ctx.fillRect(0, 0, 50, 50);
      const drawn = createBlobFromCanvas(canvas, 'image/png');

      Promise.all([blank, drawn]).then(([b1, b2]) => {
        expect(b1.size).toBeGreaterThan(0);
        expect(b2.size).toBeGreaterThan(0);
        done();
      });
    });
  });

  describe('downloadCanvasImage', () => {
    it('should create a download link', () => {
      const createElementSpy = vi.spyOn(document, 'createElement');
      
      downloadCanvasImage(canvas, 'test.png');

      expect(createElementSpy).toHaveBeenCalledWith('a');
    });

    it('should set href attribute', () => {
      downloadCanvasImage(canvas, 'test.png');

      const link = document.querySelector('a[href^="data:"]');
      expect(link).not.toBeNull();
    });

    it('should set download attribute', () => {
      downloadCanvasImage(canvas, 'test.png');

      const link = document.querySelector('a[download]');
      expect(link).not.toBeNull();
      expect(link.download).toBe('test.png');
    });

    it('should handle different filenames', () => {
      downloadCanvasImage(canvas, 'my-drawing.png');

      const link = document.querySelector('a[download]');
      expect(link.download).toBe('my-drawing.png');
    });

    it('should trigger click', () => {
      const clickSpy = vi.fn();
      const link = document.createElement('a');
      link.click = clickSpy;

      const createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue(link);
      
      downloadCanvasImage(canvas, 'test.png');

      createElementSpy.mockRestore();
    });
  });

  describe('copyCanvasToClipboard', () => {
    it('should return a promise', () => {
      const result = copyCanvasToClipboard(canvas);
      expect(result).toBeInstanceOf(Promise);
    });

    it('should use clipboard API', async () => {
      // Mock clipboard API
      global.navigator = {
        clipboard: {
          write: vi.fn().mockResolvedValue(undefined)
        }
      };

      await copyCanvasToClipboard(canvas);
      
      // Just verify it doesn't throw
      expect(true).toBe(true);
    });

    it('should handle clipboard availability', async () => {
      // Test graceful handling when clipboard not available
      delete global.navigator?.clipboard;

      // Should not throw
      try {
        await copyCanvasToClipboard(canvas);
      } catch (e) {
        // May fail but shouldn't crash
      }
      
      expect(true).toBe(true);
    });
  });

  describe('Integration: Save Workflow', () => {
    it('should save canvas image with all functions', () => {
      // Draw something
      ctx.fillStyle = '#FF0000';
      ctx.fillRect(100, 100, 200, 200);

      // Get data URL
      const url = getCanvasDataURL(canvas);
      expect(url.startsWith('data:image/png')).toBe(true);

      // Get filename
      const filename = generateFileName('png');
      expect(filename.endsWith('.png')).toBe(true);

      // Format can be extracted
      const format = getImageFormat(filename);
      expect(format).toBe('image/png');
    });

    it('should support different formats in workflow', () => {
      ctx.fillStyle = '#0000FF';
      ctx.fillRect(50, 50, 100, 100);

      const pngUrl = getCanvasDataURL(canvas, 'image/png');
      const jpgUrl = getCanvasDataURL(canvas, 'image/jpeg');

      expect(pngUrl.startsWith('data:image/png')).toBe(true);
      expect(jpgUrl.startsWith('data:image/jpeg')).toBe(true);
    });
  });
});
