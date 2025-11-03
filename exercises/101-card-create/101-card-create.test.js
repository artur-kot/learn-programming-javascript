import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  createCard,
  createCardWithClass,
  createCardElements,
  createButton,
  createCompleteCard
} from './101-card-create.js';

describe('Card Generator - Create Element', () => {
  let dom;
  let window;
  let document;

  beforeEach(() => {
    dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    window = dom.window;
    document = window.document;
    global.window = window;
    global.document = document;
  });

  describe('createCard', () => {
    it('should create a div element', () => {
      const card = createCard();
      expect(card).toBeTruthy();
      expect(card.tagName).toBe('DIV');
    });

    it('should return a DOM element', () => {
      const card = createCard();
      expect(card).toBeInstanceOf(window.HTMLElement);
    });

    it('should create element with no attributes', () => {
      const card = createCard();
      expect(card.className).toBe('');
      expect(card.id).toBe('');
    });

    it('should create independent elements', () => {
      const card1 = createCard();
      const card2 = createCard();
      expect(card1).not.toBe(card2);
    });
  });

  describe('createCardWithClass', () => {
    it('should create div with class', () => {
      const card = createCardWithClass('card');
      expect(card.tagName).toBe('DIV');
      expect(card.classList.contains('card')).toBe(true);
    });

    it('should add specific class name', () => {
      const card = createCardWithClass('product-card');
      expect(card.classList.contains('product-card')).toBe(true);
    });

    it('should handle different class names', () => {
      const card1 = createCardWithClass('dark');
      const card2 = createCardWithClass('light');
      expect(card1.classList.contains('dark')).toBe(true);
      expect(card2.classList.contains('light')).toBe(true);
    });
  });

  describe('createCardElements', () => {
    it('should return object with elements', () => {
      const elements = createCardElements();
      expect(typeof elements).toBe('object');
    });

    it('should have header, content, and footer', () => {
      const elements = createCardElements();
      expect(elements.header).toBeTruthy();
      expect(elements.content).toBeTruthy();
      expect(elements.footer).toBeTruthy();
    });

    it('should create div elements', () => {
      const elements = createCardElements();
      expect(elements.header.tagName).toBe('DIV');
      expect(elements.content.tagName).toBe('DIV');
      expect(elements.footer.tagName).toBe('DIV');
    });

    it('should create independent element sets', () => {
      const set1 = createCardElements();
      const set2 = createCardElements();
      expect(set1.header).not.toBe(set2.header);
    });
  });

  describe('createButton', () => {
    it('should create button element', () => {
      const button = createButton('Click me');
      expect(button.tagName).toBe('BUTTON');
    });

    it('should set button text', () => {
      const button = createButton('Submit');
      expect(button.textContent).toBe('Submit');
    });

    it('should handle different text', () => {
      const button1 = createButton('Delete');
      const button2 = createButton('Edit');
      expect(button1.textContent).toBe('Delete');
      expect(button2.textContent).toBe('Edit');
    });

    it('should return independent buttons', () => {
      const btn1 = createButton('A');
      const btn2 = createButton('B');
      expect(btn1).not.toBe(btn2);
    });
  });

  describe('createCompleteCard', () => {
    it('should return object with card structure', () => {
      const card = createCompleteCard('Title', 'Content', 'Click');
      expect(typeof card).toBe('object');
      expect(card.card).toBeTruthy();
    });

    it('should have card, header, content, footer', () => {
      const card = createCompleteCard('Title', 'Content', 'Click');
      expect(card.card).toBeTruthy();
      expect(card.header).toBeTruthy();
      expect(card.content).toBeTruthy();
      expect(card.footer).toBeTruthy();
    });

    it('should create div structure', () => {
      const card = createCompleteCard('Title', 'Content', 'Click');
      expect(card.card.tagName).toBe('DIV');
      expect(card.header.tagName).toBe('DIV');
      expect(card.content.tagName).toBe('DIV');
    });

    it('should have button in footer', () => {
      const card = createCompleteCard('Title', 'Content', 'Click');
      expect(card.button).toBeTruthy();
      expect(card.button.tagName).toBe('BUTTON');
    });

    it('should set text content', () => {
      const card = createCompleteCard('My Title', 'My Content', 'Submit');
      expect(card.header.textContent).toBe('My Title');
      expect(card.content.textContent).toBe('My Content');
      expect(card.button.textContent).toBe('Submit');
    });

    it('should organize elements correctly', () => {
      const card = createCompleteCard('Title', 'Content', 'Click');
      expect(card.card.className).toBe('card');
      expect(card.header.className).toBe('card-header');
      expect(card.content.className).toBe('card-content');
      expect(card.footer.className).toBe('card-footer');
    });
  });
});
