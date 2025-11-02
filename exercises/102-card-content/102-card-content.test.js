import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  setCardTitle,
  setCardDescription,
  createCardWithContent,
  setCardHTML,
  buildCardFromData
} from './102-card-content.js';

describe('Card Generator - Set Content', () => {
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

  describe('setCardTitle', () => {
    it('should set title text', () => {
      const header = document.createElement('div');
      setCardTitle(header, 'My Title');
      expect(header.textContent).toBe('My Title');
    });

    it('should replace existing text', () => {
      const header = document.createElement('div');
      header.textContent = 'Old Title';
      setCardTitle(header, 'New Title');
      expect(header.textContent).toBe('New Title');
    });

    it('should handle different titles', () => {
      const header1 = document.createElement('div');
      const header2 = document.createElement('div');
      setCardTitle(header1, 'Title 1');
      setCardTitle(header2, 'Title 2');
      expect(header1.textContent).toBe('Title 1');
      expect(header2.textContent).toBe('Title 2');
    });
  });

  describe('setCardDescription', () => {
    it('should set description text', () => {
      const content = document.createElement('div');
      setCardDescription(content, 'This is a description');
      expect(content.textContent).toBe('This is a description');
    });

    it('should replace existing text', () => {
      const content = document.createElement('div');
      content.textContent = 'Old description';
      setCardDescription(content, 'New description');
      expect(content.textContent).toBe('New description');
    });

    it('should handle long descriptions', () => {
      const content = document.createElement('div');
      const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
      setCardDescription(content, longText);
      expect(content.textContent).toBe(longText);
    });
  });

  describe('createCardWithContent', () => {
    it('should return object with card structure', () => {
      const card = createCardWithContent('Title', 'Description');
      expect(typeof card).toBe('object');
      expect(card.card).toBeTruthy();
    });

    it('should have card, header, and content', () => {
      const card = createCardWithContent('Title', 'Description');
      expect(card.card).toBeTruthy();
      expect(card.header).toBeTruthy();
      expect(card.content).toBeTruthy();
    });

    it('should populate title and content', () => {
      const card = createCardWithContent('My Title', 'My Description');
      expect(card.header.textContent).toBe('My Title');
      expect(card.content.textContent).toBe('My Description');
    });

    it('should create independent cards', () => {
      const card1 = createCardWithContent('Title 1', 'Desc 1');
      const card2 = createCardWithContent('Title 2', 'Desc 2');
      expect(card1.header).not.toBe(card2.header);
    });

    it('should have proper structure', () => {
      const card = createCardWithContent('Title', 'Content');
      expect(card.card.tagName).toBe('DIV');
      expect(card.header.tagName).toBe('DIV');
      expect(card.content.tagName).toBe('DIV');
    });
  });

  describe('setCardHTML', () => {
    it('should set HTML content', () => {
      const element = document.createElement('div');
      setCardHTML(element, '<p>Paragraph</p>');
      expect(element.innerHTML).toContain('<p>');
    });

    it('should support rich formatting', () => {
      const element = document.createElement('div');
      setCardHTML(element, '<strong>Bold</strong> and <em>italic</em>');
      expect(element.querySelector('strong')).toBeTruthy();
      expect(element.querySelector('em')).toBeTruthy();
    });

    it('should replace previous HTML', () => {
      const element = document.createElement('div');
      setCardHTML(element, '<p>First</p>');
      setCardHTML(element, '<p>Second</p>');
      expect(element.textContent).toBe('Second');
    });

    it('should handle multiple elements', () => {
      const element = document.createElement('div');
      setCardHTML(element, '<p>Item 1</p><p>Item 2</p>');
      expect(element.querySelectorAll('p').length).toBe(2);
    });
  });

  describe('buildCardFromData', () => {
    it('should accept data object', () => {
      const data = { title: 'Title', description: 'Desc' };
      const card = buildCardFromData(data);
      expect(card).toBeTruthy();
    });

    it('should create card with title from data', () => {
      const data = { title: 'Data Title', description: 'Description' };
      const card = buildCardFromData(data);
      expect(card.header.textContent).toBe('Data Title');
    });

    it('should create card with description from data', () => {
      const data = { title: 'Title', description: 'Data Description' };
      const card = buildCardFromData(data);
      expect(card.content.textContent).toBe('Data Description');
    });

    it('should handle multiple data objects', () => {
      const data1 = { title: 'Title 1', description: 'Desc 1' };
      const data2 = { title: 'Title 2', description: 'Desc 2' };
      const card1 = buildCardFromData(data1);
      const card2 = buildCardFromData(data2);
      expect(card1.header.textContent).toBe('Title 1');
      expect(card2.header.textContent).toBe('Title 2');
    });

    it('should return complete card structure', () => {
      const data = { title: 'Title', description: 'Description' };
      const card = buildCardFromData(data);
      expect(card.card).toBeTruthy();
      expect(card.header).toBeTruthy();
      expect(card.content).toBeTruthy();
    });
  });
});
