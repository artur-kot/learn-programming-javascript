import { describe, it, expect, beforeEach } from 'vitest';
import {
  createWeatherCard,
  formatTemperature,
  getWeatherIcon,
  renderWeatherCards,
  clearContainer,
  displayErrorMessage,
  displayLoadingState,
  updateTemperatureDisplay,
  createWeatherCardHTML,
  attachWeatherCardListener
} from './141-weather-display.js';

// ============================================================================
// FORMAT TEMPERATURE
// ============================================================================

describe('formatTemperature', () => {
  it('formats integer temperature', () => {
    const result = formatTemperature(20);
    
    expect(typeof result).toBe('string');
    expect(result).toContain('20');
    expect(result).toMatch(/°C|C/);
  });

  it('formats decimal temperature', () => {
    const result = formatTemperature(20.5);
    
    expect(result).toContain('20.5');
  });

  it('handles negative temperatures', () => {
    const result = formatTemperature(-5);
    
    expect(result).toContain('-5');
  });

  it('handles zero', () => {
    const result = formatTemperature(0);
    
    expect(result).toContain('0');
  });
});

// ============================================================================
// GET WEATHER ICON
// ============================================================================

describe('getWeatherIcon', () => {
  it('returns emoji for weather code 0', () => {
    const icon = getWeatherIcon(0);
    
    expect(typeof icon).toBe('string');
    expect(icon.length).toBeGreaterThan(0);
  });

  it('returns different emojis for different codes', () => {
    const icon0 = getWeatherIcon(0);
    const icon1 = getWeatherIcon(1);
    
    expect(icon0).not.toBe(icon1);
  });

  it('returns emoji for code 2', () => {
    const icon = getWeatherIcon(2);
    expect(icon).toBeDefined();
  });

  it('returns emoji for code 3', () => {
    const icon = getWeatherIcon(3);
    expect(icon).toBeDefined();
  });

  it('returns emoji for code 4', () => {
    const icon = getWeatherIcon(4);
    expect(icon).toBeDefined();
  });
});

// ============================================================================
// CREATE WEATHER CARD
// ============================================================================

describe('createWeatherCard', () => {
  it('returns DOM element', () => {
    const data = { city: 'NYC', temperature: 20, condition: 'Sunny' };
    const element = createWeatherCard(data);
    
    expect(element instanceof HTMLElement).toBe(true);
  });

  it('contains city name', () => {
    const data = { city: 'New York', temperature: 20, condition: 'Sunny' };
    const element = createWeatherCard(data);
    
    expect(element.textContent).toContain('New York');
  });

  it('contains temperature', () => {
    const data = { city: 'NYC', temperature: 20, condition: 'Sunny' };
    const element = createWeatherCard(data);
    
    expect(element.textContent).toContain('20');
  });

  it('contains condition', () => {
    const data = { city: 'NYC', temperature: 20, condition: 'Sunny' };
    const element = createWeatherCard(data);
    
    expect(element.textContent).toContain('Sunny');
  });
});

// ============================================================================
// CREATE WEATHER CARD HTML
// ============================================================================

describe('createWeatherCardHTML', () => {
  it('returns string', () => {
    const data = { city: 'NYC', temperature: 20, condition: 'Sunny' };
    const html = createWeatherCardHTML(data);
    
    expect(typeof html).toBe('string');
  });

  it('contains HTML tags', () => {
    const data = { city: 'NYC', temperature: 20, condition: 'Sunny' };
    const html = createWeatherCardHTML(data);
    
    expect(html).toContain('<');
    expect(html).toContain('>');
  });

  it('contains city name', () => {
    const data = { city: 'New York', temperature: 20, condition: 'Sunny' };
    const html = createWeatherCardHTML(data);
    
    expect(html).toContain('New York');
  });

  it('contains temperature', () => {
    const data = { city: 'NYC', temperature: 20, condition: 'Sunny' };
    const html = createWeatherCardHTML(data);
    
    expect(html).toContain('20');
  });
});

// ============================================================================
// CLEAR CONTAINER
// ============================================================================

describe('clearContainer', () => {
  it('removes all children from container', () => {
    const container = document.createElement('div');
    container.innerHTML = '<p>Child 1</p><p>Child 2</p>';
    
    expect(container.children.length).toBe(2);
    
    clearContainer(container);
    
    expect(container.children.length).toBe(0);
  });

  it('works on empty container', () => {
    const container = document.createElement('div');
    
    expect(() => clearContainer(container)).not.toThrow();
  });

  it('leaves container element intact', () => {
    const container = document.createElement('div');
    container.id = 'test';
    container.innerHTML = '<p>Content</p>';
    
    clearContainer(container);
    
    expect(container.id).toBe('test');
    expect(container instanceof HTMLElement).toBe(true);
  });
});

// ============================================================================
// DISPLAY ERROR MESSAGE
// ============================================================================

describe('displayErrorMessage', () => {
  it('returns element', () => {
    const container = document.createElement('div');
    const result = displayErrorMessage(container, 'Error message');
    
    expect(result instanceof HTMLElement).toBe(true);
  });

  it('adds element to container', () => {
    const container = document.createElement('div');
    displayErrorMessage(container, 'Error message');
    
    expect(container.children.length).toBeGreaterThan(0);
  });

  it('contains error message text', () => {
    const container = document.createElement('div');
    displayErrorMessage(container, 'Network error');
    
    expect(container.textContent).toContain('Network error');
  });

  it('has error styling', () => {
    const container = document.createElement('div');
    const element = displayErrorMessage(container, 'Error');
    
    expect(element.className).toContain('error');
  });
});

// ============================================================================
// DISPLAY LOADING STATE
// ============================================================================

describe('displayLoadingState', () => {
  it('returns element', () => {
    const container = document.createElement('div');
    const result = displayLoadingState(container);
    
    expect(result instanceof HTMLElement).toBe(true);
  });

  it('adds loading message to container', () => {
    const container = document.createElement('div');
    displayLoadingState(container);
    
    expect(container.children.length).toBeGreaterThan(0);
  });

  it('contains loading text', () => {
    const container = document.createElement('div');
    displayLoadingState(container);
    
    const text = container.textContent.toLowerCase();
    expect(text).toContain('loading');
  });
});

// ============================================================================
// RENDER WEATHER CARDS
// ============================================================================

describe('renderWeatherCards', () => {
  it('renders array of weather cards', () => {
    const container = document.createElement('div');
    const data = [
      { city: 'NYC', temperature: 20, condition: 'Sunny' },
      { city: 'London', temperature: 15, condition: 'Rainy' }
    ];
    
    const result = renderWeatherCards(container, data);
    
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
  });

  it('adds cards to container', () => {
    const container = document.createElement('div');
    const data = [
      { city: 'NYC', temperature: 20, condition: 'Sunny' },
      { city: 'London', temperature: 15, condition: 'Rainy' }
    ];
    
    renderWeatherCards(container, data);
    
    expect(container.children.length).toBe(2);
  });

  it('returns array of DOM elements', () => {
    const container = document.createElement('div');
    const data = [
      { city: 'NYC', temperature: 20, condition: 'Sunny' }
    ];
    
    const result = renderWeatherCards(container, data);
    
    expect(result[0] instanceof HTMLElement).toBe(true);
  });

  it('handles empty array', () => {
    const container = document.createElement('div');
    const result = renderWeatherCards(container, []);
    
    expect(result).toEqual([]);
    expect(container.children.length).toBe(0);
  });
});

// ============================================================================
// UPDATE TEMPERATURE DISPLAY
// ============================================================================

describe('updateTemperatureDisplay', () => {
  it('updates temperature in element', () => {
    const element = document.createElement('div');
    element.textContent = '15°C';
    
    updateTemperatureDisplay(element, 20);
    
    expect(element.textContent).toContain('20');
  });

  it('returns updated element', () => {
    const element = document.createElement('div');
    element.textContent = '15°C';
    
    const result = updateTemperatureDisplay(element, 20);
    
    expect(result).toBe(element);
  });

  it('preserves element structure', () => {
    const element = document.createElement('div');
    element.innerHTML = '<span>Temperature: 15°C</span>';
    
    updateTemperatureDisplay(element, 20);
    
    expect(element.querySelector('span')).toBeDefined();
  });
});

// ============================================================================
// ATTACH WEATHER CARD LISTENER
// ============================================================================

describe('attachWeatherCardListener', () => {
  it('adds click listener to card', () => {
    const cardElement = document.createElement('div');
    const data = { city: 'NYC', temperature: 20 };
    const callback = () => {};
    
    expect(() => {
      attachWeatherCardListener(cardElement, data, callback);
    }).not.toThrow();
  });

  it('calls callback on click', (done) => {
    const cardElement = document.createElement('div');
    const data = { city: 'NYC', temperature: 20 };
    let called = false;
    
    const callback = () => {
      called = true;
    };
    
    attachWeatherCardListener(cardElement, data, callback);
    cardElement.click();
    
    setTimeout(() => {
      expect(called).toBe(true);
      done();
    }, 10);
  });

  it('passes data to callback', (done) => {
    const cardElement = document.createElement('div');
    const data = { city: 'NYC', temperature: 20 };
    let receivedData = null;
    
    const callback = (passedData) => {
      receivedData = passedData;
    };
    
    attachWeatherCardListener(cardElement, data, callback);
    cardElement.click();
    
    setTimeout(() => {
      expect(receivedData).toEqual(data);
      done();
    }, 10);
  });
});
