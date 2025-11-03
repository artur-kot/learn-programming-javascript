import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  appendCard,
  appendMultipleCards,
  insertCardBefore,
  appendCardToBody,
  createAndAppendCard
} from './104-card-append.js';

describe('Card Generator - Append to Page', () => {
  let dom;
  let window;
  let document;

  beforeEach(() => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head><title>Test</title></head>
      <body>
        <div id="container"></div>
      </body>
      </html>
    `;
    dom = new JSDOM(html);
    window = dom.window;
    document = window.document;
    global.window = window;
    global.document = document;
  });

  describe('appendCard', () => {
    it('should add card to container', () => {
      const container = document.getElementById('container');
      const card = document.createElement('div');
      card.className = 'card';
      
      appendCard(container, card);
      
      expect(container.children.length).toBe(1);
      expect(container.firstChild).toBe(card);
    });

    it('should preserve existing children', () => {
      const container = document.getElementById('container');
      const card1 = document.createElement('div');
      const card2 = document.createElement('div');
      
      appendCard(container, card1);
      appendCard(container, card2);
      
      expect(container.children.length).toBe(2);
    });

    it('should add cards in order', () => {
      const container = document.getElementById('container');
      const card1 = document.createElement('div');
      const card2 = document.createElement('div');
      
      card1.id = 'first';
      card2.id = 'second';
      
      appendCard(container, card1);
      appendCard(container, card2);
      
      expect(container.children[0].id).toBe('first');
      expect(container.children[1].id).toBe('second');
    });
  });

  describe('appendMultipleCards', () => {
    it('should add multiple cards', () => {
      const container = document.getElementById('container');
      const cards = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
      ];
      
      appendMultipleCards(container, cards);
      
      expect(container.children.length).toBe(3);
    });

    it('should add cards in order', () => {
      const container = document.getElementById('container');
      const cards = [
        document.createElement('div'),
        document.createElement('div')
      ];
      
      cards[0].id = 'card-0';
      cards[1].id = 'card-1';
      
      appendMultipleCards(container, cards);
      
      expect(container.children[0].id).toBe('card-0');
      expect(container.children[1].id).toBe('card-1');
    });

    it('should handle empty array', () => {
      const container = document.getElementById('container');
      appendMultipleCards(container, []);
      expect(container.children.length).toBe(0);
    });
  });

  describe('insertCardBefore', () => {
    it('should insert card before element', () => {
      const container = document.getElementById('container');
      const card1 = document.createElement('div');
      const card2 = document.createElement('div');
      const newCard = document.createElement('div');
      
      card1.id = 'first';
      card2.id = 'second';
      newCard.id = 'inserted';
      
      appendCard(container, card1);
      appendCard(container, card2);
      insertCardBefore(container, newCard, card2);
      
      expect(container.children[1].id).toBe('inserted');
    });

    it('should insert at beginning', () => {
      const container = document.getElementById('container');
      const card1 = document.createElement('div');
      const newCard = document.createElement('div');
      
      card1.id = 'original';
      newCard.id = 'new';
      
      appendCard(container, card1);
      insertCardBefore(container, newCard, card1);
      
      expect(container.firstChild.id).toBe('new');
    });

    it('should preserve order', () => {
      const container = document.getElementById('container');
      const cards = [];
      
      for (let i = 0; i < 3; i++) {
        const card = document.createElement('div');
        card.id = `card-${i}`;
        cards.push(card);
        appendCard(container, card);
      }
      
      const newCard = document.createElement('div');
      newCard.id = 'inserted';
      insertCardBefore(container, newCard, cards[1]);
      
      expect(container.children[1].id).toBe('inserted');
      expect(container.children[2].id).toBe('card-1');
    });
  });

  describe('appendCardToBody', () => {
    it('should add card to body', () => {
      const body = document.body;
      const initialLength = body.children.length;
      const card = document.createElement('div');
      
      appendCardToBody(card);
      
      expect(body.children.length).toBe(initialLength + 1);
    });

    it('should add to document body', () => {
      const card = document.createElement('div');
      card.id = 'body-card';
      
      appendCardToBody(card);
      
      expect(document.getElementById('body-card')).toBe(card);
    });
  });

  describe('createAndAppendCard', () => {
    it('should create and append card', () => {
      const container = document.getElementById('container');
      
      createAndAppendCard(container, 'Title', 'Content', 'card-1');
      
      expect(container.children.length).toBe(1);
    });

    it('should create card with content', () => {
      const container = document.getElementById('container');
      
      createAndAppendCard(container, 'My Title', 'My Content', 'my-card');
      
      const card = container.firstChild;
      expect(card.id).toBe('my-card');
    });

    it('should create multiple cards', () => {
      const container = document.getElementById('container');
      
      createAndAppendCard(container, 'Title 1', 'Content 1', 'card-1');
      createAndAppendCard(container, 'Title 2', 'Content 2', 'card-2');
      
      expect(container.children.length).toBe(2);
    });

    it('should return created card', () => {
      const container = document.getElementById('container');
      
      const card = createAndAppendCard(container, 'Title', 'Content', 'my-card');
      
      expect(card).toBeTruthy();
      expect(card.id).toBe('my-card');
    });
  });
});
