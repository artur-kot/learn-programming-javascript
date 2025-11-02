# Exercise 141: Weather Dashboard - Display Data

Master **DOM rendering** to display fetched weather data. Build reusable components and interactive UI elements.

## Overview

Once you've fetched and parsed data, you need to display it to users. This exercise teaches you to create dynamic, reusable UI components.

### What You'll Learn

- **DOM element creation**: Build HTML elements with JavaScript
- **Template rendering**: Create reusable component templates
- **Event handling**: Make elements interactive
- **Dynamic styling**: Update appearance based on data
- **Component patterns**: Build maintainable UI code
- **User feedback**: Display loading and error states

## Key Concepts

### Creating DOM Elements

```javascript
// Create new element
const div = document.createElement('div');
div.textContent = 'Hello World';
div.className = 'greeting';

// Add to page
container.appendChild(div);
```

### Template Literals for HTML

```javascript
// Use backticks for multi-line HTML
const html = `
  <div class="weather-card">
    <h2>${data.city}</h2>
    <p>${data.temperature}°C</p>
  </div>
`;

element.innerHTML = html;
```

### innerHTML vs textContent

```javascript
// innerHTML - Parse HTML
element.innerHTML = '<strong>Bold</strong>'; // Creates bold element

// textContent - Plain text only
element.textContent = '<strong>Bold</strong>'; // Shows literal text
```

### Adding Event Listeners

```javascript
// Click handler
element.addEventListener('click', (event) => {
  console.log('Clicked!', event);
});

// Or simple handler
element.onclick = () => console.log('Clicked');
```

### Clearing Container

```javascript
// Remove all children
while (container.firstChild) {
  container.removeChild(container.firstChild);
}

// Or simpler
container.innerHTML = '';
```

### Dynamic CSS Classes

```javascript
// Add class
element.classList.add('active');

// Remove class
element.classList.remove('active');

// Toggle class
element.classList.toggle('active');

// Check class
if (element.classList.contains('active')) { }
```

### Conditional Styling

```javascript
if (temperature < 0) {
  element.classList.add('cold');
} else if (temperature > 25) {
  element.classList.add('hot');
} else {
  element.classList.add('mild');
}
```

## Exercise Tasks

### Task 1: Format Temperature

Implement `formatTemperature`:
- Input: Number (celsius)
- Output: "20.5°C" format

```javascript
const formatted = formatTemperature(20.5);
// "20.5°C"
```

### Task 2: Get Weather Icon

Implement `getWeatherIcon`:
- Input: Weather code (0-4)
- Return: Emoji icon string
- 0 = ☀️, 1 = 🌤️, 2 = ☁️, 3 = 🌧️, 4 = 🌩️

```javascript
const icon = getWeatherIcon(2); // ☁️
```

### Task 3: Create Weather Card

Implement `createWeatherCard`:
- Input: { city, temperature, condition }
- Return: DOM element (div)
- Should contain city, temperature, condition

```javascript
const card = createWeatherCard({ 
  city: 'NYC', 
  temperature: 20, 
  condition: 'Sunny' 
});
container.appendChild(card);
```

### Task 4: Create Weather Card HTML

Implement `createWeatherCardHTML`:
- Same as Task 3, but return HTML string
- Used for `innerHTML` rendering

```javascript
const html = createWeatherCardHTML(data);
container.innerHTML = html;
```

### Task 5: Clear Container

Implement `clearContainer`:
- Remove all child elements from container
- Used before re-rendering

```javascript
clearContainer(container);
```

### Task 6: Display Error Message

Implement `displayErrorMessage`:
- Create error element with styling
- Add to container
- Return created element

```javascript
displayErrorMessage(container, 'Failed to load data');
```

### Task 7: Display Loading State

Implement `displayLoadingState`:
- Create loading indicator
- Add to container
- Return created element

```javascript
displayLoadingState(container);
```

### Task 8: Render Multiple Cards

Implement `renderWeatherCards`:
- Input: container, array of weather data
- Create card for each item
- Return array of created elements

```javascript
const cards = renderWeatherCards(container, dataArray);
```

### Task 9: Update Temperature Display

Implement `updateTemperatureDisplay`:
- Update temperature in existing element
- Keep other content intact
- Return updated element

```javascript
updateTemperatureDisplay(element, 25);
```

### Task 10: Attach Click Listener

Implement `attachWeatherCardListener`:
- Add click listener to card
- Pass weather data to callback
- No return value

```javascript
attachWeatherCardListener(card, data, (clickedData) => {
  console.log(clickedData);
});
```

## Real-World Examples

### Weather Dashboard Component

```javascript
function createWeatherDashboard(cities) {
  const dashboard = document.createElement('div');
  dashboard.className = 'weather-dashboard';
  
  cities.forEach(city => {
    const card = createWeatherCard(city);
    dashboard.appendChild(card);
  });
  
  return dashboard;
}

// Usage
const dashboard = createWeatherDashboard(cityData);
document.body.appendChild(dashboard);
```

### Loading Pattern

```javascript
async function displayWeather(latitude, longitude) {
  const container = document.querySelector('.weather-container');
  
  // Show loading
  clearContainer(container);
  displayLoadingState(container);
  
  try {
    // Fetch data
    const response = await fetch(url);
    const data = await response.json();
    
    // Render
    clearContainer(container);
    renderWeatherCards(container, [data]);
  } catch (error) {
    // Show error
    clearContainer(container);
    displayErrorMessage(container, error.message);
  }
}
```

### Interactive Cards

```javascript
function createInteractiveWeather(data) {
  const card = createWeatherCard(data);
  
  card.addEventListener('click', () => {
    // Show details
    showWeatherDetails(data);
  });
  
  return card;
}
```

## Best Practices

### 1. Separate Data from Display

```javascript
// ✓ GOOD - Separate concerns
function formatWeatherDisplay(data) {
  return {
    temperature: `${data.temperature}°C`,
    icon: getWeatherIcon(data.code),
    text: `${data.condition}`
  };
}

const display = formatWeatherDisplay(data);
renderCard(display);

// ❌ MIXED - Harder to test
function renderWeather(data) {
  element.innerHTML = `${data.temperature}°C`;
}
```

### 2. Reusable Components

```javascript
// ✓ GOOD - Reusable function
function createCard(title, content) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <h3>${title}</h3>
    <p>${content}</p>
  `;
  return card;
}

// ❌ HARD TO MAINTAIN - Repeated code
container.innerHTML = `<div class="card"><h3>Title1</h3><p>Content1</p></div>`;
container.innerHTML += `<div class="card"><h3>Title2</h3><p>Content2</p></div>`;
```

### 3. Event Delegation

```javascript
// ✓ GOOD - Single listener on parent
container.addEventListener('click', (event) => {
  if (event.target.classList.contains('weather-card')) {
    handleCardClick(event.target);
  }
});

// ❌ INEFFICIENT - Listener on each card
cards.forEach(card => {
  card.addEventListener('click', handleCardClick);
});
```

### 4. Clear State Before Rendering

```javascript
// ✓ GOOD - Clean state
function render(newData) {
  clearContainer(container);
  renderWeatherCards(container, newData);
}

// ❌ ACCUMULATES - Old data stays
function render(newData) {
  renderWeatherCards(container, newData);
}
```

## Common Mistakes

```javascript
// ❌ WRONG - innerHTML overwrites
container.innerHTML = card1;
container.innerHTML = card2; // card1 is gone!

// ✓ RIGHT - Use appendChild
container.appendChild(card1);
container.appendChild(card2);

// ❌ WRONG - HTML injection vulnerability
element.innerHTML = userInput; // Dangerous!

// ✓ RIGHT - Use textContent for user input
element.textContent = userInput;

// ❌ WRONG - Listener on old element
const card = createWeatherCard(data);
card.addEventListener('click', handler);
container.innerHTML = ''; // Event listener gone!

// ✓ RIGHT - Add listener after adding to DOM
const card = createWeatherCard(data);
container.appendChild(card);
card.addEventListener('click', handler);
```

## Testing DOM Code

```javascript
// Create test element
const container = document.createElement('div');

// Test rendering
const card = createWeatherCard(data);
container.appendChild(card);

expect(container.textContent).toContain(data.city);
expect(container.querySelector('.temperature')).toBeDefined();
```

## Summary

DOM rendering keys:

✅ Use `createElement()` for structure
✅ Use template literals for HTML strings
✅ Append elements with `appendChild()`
✅ Use `textContent` for user input (security)
✅ Use `innerHTML` for HTML content only
✅ Clear container before re-rendering
✅ Add event listeners after adding to DOM
✅ Separate data from display logic
✅ Create reusable component functions
✅ Handle loading and error states

Next exercise: You'll learn to **fetch multiple data sources** in parallel!
