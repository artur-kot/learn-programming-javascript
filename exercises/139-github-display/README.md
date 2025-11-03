# Exercise 144: GitHub User Display

**Series:** 29 (GitHub User Finder)  
**Difficulty:** Intermediate  
**Time Estimate:** 90 minutes  
**Focus:** DOM Manipulation, Component Creation, UI Rendering

## Overview

In this exercise, you'll create functions to render GitHub user profile data beautifully in the DOM. This exercise combines data from Exercise 143 with DOM manipulation to create responsive, interactive profile cards.

By completing this exercise, you'll learn:
- Creating DOM elements dynamically with template literals
- Building reusable component patterns
- Formatting data for display (e.g., 1000 → 1K)
- Handling loading and error states
- Styling components with CSS classes
- Attaching event listeners to components

## Learning Outcomes

After completing this exercise, you will:
- ✅ Create DOM elements using `createElement()` and template literals
- ✅ Build responsive profile card components
- ✅ Format large numbers for readability
- ✅ Display loading and error states
- ✅ Combine multiple elements into cohesive components
- ✅ Handle user interactions with components
- ✅ Apply CSS styling to dynamically created elements

## Prerequisites

- ✅ [Exercise 143: GitHub Search](../143-github-search) - Search GitHub users
- ✅ [Exercise 141: Weather Display](../141-weather-display) - Display data
- ✅ [Series 21: Card Generator](../103-card-create) - DOM manipulation basics

## Functions to Implement

### 1. `formatUserStats(user)`

**Purpose:** Format user statistics for display.

**Parameters:**
- `user` (object) - Object with `followers`, `following`, `public_repos` properties

**Returns:** An object with formatted strings:
- `followers` - Formatted follower count
- `following` - Formatted following count
- `repos` - Formatted public repos count

**Formatting Rules:**
- 0-999: Show as-is (e.g., "100")
- 1000-999999: Show in K (e.g., 3938 → "3.9K")
- 1000000+: Show in M (e.g., 1500000 → "1.5M")
- Remove trailing zeros and decimals (e.g., "3K" not "3.0K")

**Examples:**
```javascript
formatUserStats({ followers: 100, following: 50, public_repos: 25 })
// Returns: { followers: '100', following: '50', repos: '25' }

formatUserStats({ followers: 3938, following: 9, public_repos: 8 })
// Returns: { followers: '3.9K', following: '9', repos: '8' }

formatUserStats({ followers: 1500000, following: 100, public_repos: 50 })
// Returns: { followers: '1.5M', following: '100', repos: '50' }
```

**Key Concepts:**
- Number formatting logic
- Rounding and decimal handling
- String manipulation for display

### 2. `createStatsRow(label, value)`

**Purpose:** Create a single stat row element (label above, value below).

**Parameters:**
- `label` (string) - The stat label (e.g., "Followers")
- `value` (string or number) - The stat value

**Returns:** A DOM element (div) with class `stat-row`

**Structure:**
```
<div class="stat-row">
  <div class="stat-label">Followers</div>
  <div class="stat-value">100</div>
</div>
```

**Examples:**
```javascript
const row = createStatsRow('Followers', '3.9K');
// Returns DOM element with "Followers" label and "3.9K" value
```

**Key Concepts:**
- Creating labeled value displays
- CSS classes for styling
- Reusable row component

### 3. `createProfileHeader(user)`

**Purpose:** Create the top section of a profile card.

**Parameters:**
- `user` (object) with: `avatar_url`, `name`, `login`

**Returns:** A DOM element with class `profile-header`

**Contents:**
- Avatar image (in an img tag with src from avatar_url)
- Display name (use name or fallback to login)
- Username (prefixed with @)
- Optional: A badge or role indicator

**Examples:**
```javascript
const header = createProfileHeader({
  avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
  name: 'The Octocat',
  login: 'octocat'
});
// Returns element with avatar, name, and @octocat username
```

**Key Concepts:**
- Image elements
- Fallback values
- Semantic structure

### 4. `createProfileBio(bio)`

**Purpose:** Create a bio section with text.

**Parameters:**
- `bio` (string or null) - The user's bio text

**Returns:** A DOM element with class `profile-bio`

**Behavior:**
- If bio is provided: show the bio text
- If bio is empty or null: show placeholder text like "No bio available"
- Apply CSS class `placeholder` when showing placeholder text

**Examples:**
```javascript
createProfileBio('There once was...')
// Returns element with bio text

createProfileBio('')
// Returns element with placeholder text and 'placeholder' class

createProfileBio(null)
// Returns element with placeholder text and 'placeholder' class
```

**Key Concepts:**
- Conditional rendering
- CSS classes for state
- Defensive display handling

### 5. `createProfileCard(userData)`

**Purpose:** Create a complete profile card element.

**Parameters:**
- `userData` (object) - Complete user data with: login, name, avatar_url, bio, followers, following, public_repos, location, profile_url

**Returns:** A DOM element with class `profile-card`

**Contents:**
1. Profile header (avatar, name, username)
2. Bio section
3. Stats grid (followers, following, repos)
4. Location info (if available)
5. Actions (e.g., "Visit GitHub" link)

**Examples:**
```javascript
const card = createProfileCard({
  login: 'octocat',
  name: 'The Octocat',
  avatar_url: '...',
  bio: 'There once was...',
  followers: 3938,
  following: 9,
  public_repos: 8,
  location: 'San Francisco',
  profile_url: 'https://github.com/octocat'
});
// Returns complete card element ready to append to DOM
```

**Key Concepts:**
- Composing multiple components
- Combining elements into larger UI
- Complete component pattern

### 6. `renderProfile(containerId, userData)`

**Purpose:** Render a profile card in a specific container.

**Parameters:**
- `containerId` (string) - CSS selector (e.g., "#profile-container" or ".profile")
- `userData` (object) - User data to display

**Returns:** Void

**Behavior:**
1. Find the container element
2. Clear existing content
3. Create profile card
4. Append to container

**Examples:**
```javascript
renderProfile('#profile-container', userData);
// Container now contains the profile card
```

**Key Concepts:**
- Finding DOM elements
- Clearing and appending content
- Putting components on the page

### 7. `createLoadingState()`

**Purpose:** Create a loading indicator element.

**Parameters:** None

**Returns:** A DOM element with class `loading` and `active`

**Contents:**
- Animated spinner
- "Loading..." or "Fetching..." text

**Examples:**
```javascript
const loading = createLoadingState();
container.appendChild(loading);
// Shows spinner animation to user
```

**Key Concepts:**
- Visual feedback
- Animation
- UX best practices

### 8. `createErrorState(errorMessage)`

**Purpose:** Create an error display element.

**Parameters:**
- `errorMessage` (string) - The error message to display

**Returns:** A DOM element with class `error`

**Contents:**
- Error icon (e.g., ⚠️)
- Error message text
- Styled for visibility

**Examples:**
```javascript
const error = createErrorState('User not found');
container.appendChild(error);
// Shows error message to user
```

**Key Concepts:**
- Error presentation
- User communication
- Styling for state

### 9. `displayUserProfile(userData, containerId)`

**Purpose:** Intelligently display user profile or error.

**Parameters:**
- `userData` (object or null) - User data or null if error
- `containerId` (string) - Container CSS selector

**Returns:** Void

**Behavior:**
- If `userData` is null: display error state
- If `userData` is valid: display profile card
- Clear container first

**Examples:**
```javascript
displayUserProfile(userData, '#profile');
// Shows profile card if data exists

displayUserProfile(null, '#profile');
// Shows error message
```

**Key Concepts:**
- Conditional UI rendering
- Error handling in display
- User feedback

### 10. `attachProfileClickListener(element, callback)`

**Purpose:** Add click handler to profile element for interactivity.

**Parameters:**
- `element` (DOM element) - The profile element
- `callback` (function) - Function to call on click, receives user data

**Returns:** Void

**Behavior:**
1. Add click event listener to element
2. On click, extract user data from element's data attributes
3. Call callback with extracted data

**Examples:**
```javascript
const card = createProfileCard(userData);
attachProfileClickListener(card, (data) => {
  console.log('Clicked on:', data.login);
});
// Callback fires when user clicks the card
```

**Key Concepts:**
- Event listeners
- Data attributes
- Callbacks for events

## Implementation Tips

### DOM Element Creation

```javascript
// Method 1: createElement
const div = document.createElement('div');
div.className = 'profile-card';
div.textContent = 'Hello';

// Method 2: Template literal with innerHTML
const container = document.createElement('div');
container.innerHTML = `
  <div class="header">
    <img src="${user.avatar_url}">
  </div>
`;

// Combine both
const card = document.createElement('div');
card.className = 'profile-card';
const header = document.createElement('div');
header.className = 'profile-header';
card.appendChild(header);
```

### Appending Elements

```javascript
// Method 1: appendChild
parent.appendChild(child);

// Method 2: Multiple children
parent.appendChild(header);
parent.appendChild(bio);
parent.appendChild(stats);

// Method 3: Query selector to find container
const container = document.querySelector('#profile-container');
container.appendChild(card);
```

### Clearing Containers

```javascript
// Method 1: innerHTML
container.innerHTML = '';

// Method 2: removeChild loop (less common)
while (container.firstChild) {
  container.removeChild(container.firstChild);
}

// Method 3: textContent (only for text)
container.textContent = '';
```

### Number Formatting

```javascript
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}

formatNumber(3938);     // "3.9K"
formatNumber(1500000);  // "1.5M"
```

### Template Literals for HTML

```javascript
const html = `
  <div class="profile-card">
    <img src="${user.avatar_url}" alt="${user.login}">
    <h2>${user.name}</h2>
    <p>@${user.login}</p>
  </div>
`;

container.innerHTML = html;
```

### Conditional CSS Classes

```javascript
const bio = document.createElement('div');
bio.className = 'profile-bio';

if (!user.bio) {
  bio.classList.add('placeholder');
}
```

### Component Composition

```javascript
const card = document.createElement('div');
card.className = 'profile-card';

const header = createProfileHeader(user);
const bio = createProfileBio(user.bio);
const stats = createStatsGrid(user);

card.appendChild(header);
card.appendChild(bio);
card.appendChild(stats);

return card;
```

## Common Patterns

### Pattern 1: Component Factory

```javascript
function createComponent(data) {
  const element = document.createElement('div');
  element.className = 'component';
  // Configure element with data
  return element;
}
```

### Pattern 2: Render to Container

```javascript
function renderTo(containerId, element) {
  const container = document.querySelector(containerId);
  container.innerHTML = '';
  container.appendChild(element);
}
```

### Pattern 3: State Display

```javascript
function displayState(container, state) {
  container.innerHTML = '';
  
  if (state === 'loading') {
    container.appendChild(createLoadingState());
  } else if (state === 'error') {
    container.appendChild(createErrorState('Error message'));
  } else {
    container.appendChild(createContent(data));
  }
}
```

### Pattern 4: Event Delegation

```javascript
element.addEventListener('click', (event) => {
  const data = element.dataset;
  callback(data);
});
```

## Testing Guide

### Test DOM Creation

```javascript
it('should create div with correct class', () => {
  const element = createStatsRow('Label', 'Value');
  expect(element).toBeInstanceOf(HTMLElement);
  expect(element.className).toContain('stat-row');
});
```

### Test Content

```javascript
it('should include user name', () => {
  const card = createProfileCard(mockUser);
  expect(card.textContent).toContain('The Octocat');
});
```

### Test Structure

```javascript
it('should have avatar image', () => {
  const card = createProfileCard(mockUser);
  const img = card.querySelector('img');
  expect(img).toBeTruthy();
  expect(img.src).toContain('avatars');
});
```

### Test Appending

```javascript
it('should append to container', () => {
  const container = document.createElement('div');
  renderProfile(container, mockUser);
  expect(container.children.length).toBeGreaterThan(0);
});
```

## Real-World Usage

### Example: Display Search Result

```javascript
async function searchAndDisplay(username) {
  // Show loading
  const container = document.querySelector('#profile');
  container.appendChild(createLoadingState());

  try {
    // Search user (from Exercise 143)
    const user = await getUserData(username);
    
    // Display profile
    displayUserProfile(user, '#profile');
  } catch (error) {
    // Display error
    displayUserProfile(null, '#profile');
  }
}
```

### Example: Click Handler

```javascript
const card = createProfileCard(user);
attachProfileClickListener(card, (data) => {
  console.log(`Navigating to ${data.login}'s profile`);
  window.location.href = data.profile_url;
});
document.body.appendChild(card);
```

### Example: Multiple Profiles

```javascript
async function displayUsers(usernames) {
  const container = document.querySelector('#profiles');
  container.innerHTML = '';
  
  for (const username of usernames) {
    const user = await getUserData(username);
    const card = createProfileCard(user);
    container.appendChild(card);
  }
}

displayUsers(['torvalds', 'gvanrossum', 'octocat']);
```

## Key Takeaways

1. **Component Creation:** Build reusable, self-contained components
2. **DOM Manipulation:** Master element creation, manipulation, and appending
3. **Conditional Rendering:** Show different UI based on data/state
4. **Formatting:** Display data in user-friendly formats
5. **Event Handling:** Make components interactive
6. **CSS Integration:** Apply styles to dynamically created elements
7. **Error Handling:** Provide feedback for error states

## Resources

- [MDN: DOM Manipulation](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [MDN: createElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
- [MDN: appendChild](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)
- [MDN: Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

## Next Steps

After completing this exercise:
- ✅ Continue to [Exercise 145: GitHub Repos](../145-github-repos) - Display repositories
- ✅ Practice DOM skills in [Exercise 141: Weather Display](../141-weather-display)
- ✅ Learn event handling in [Series 22: Counter](../108-counter-click)
