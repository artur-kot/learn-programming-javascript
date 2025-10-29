/**
 * Exercise 173: Autocomplete - Basic Setup
 * 
 * Frontend application for country autocomplete search.
 * 
 * This file demonstrates:
 * - DOM manipulation with querySelector and innerHTML
 * - Event listeners for user input (input event)
 * - Fetch API for backend communication
 * - Async/await for handling promises
 * - Dynamic HTML generation from API response
 */

/**
 * Configuration for the autocomplete system
 */
const CONFIG = {
  API_BASE_URL: 'http://localhost:3000',
  DEFAULT_LIMIT: 10,
  DEBOUNCE_DELAY: 300, // Will be used in Exercise 174
};

/**
 * DOM element references
 */
const elements = {
  searchInput: document.getElementById('searchInput'),
  resultsContainer: document.getElementById('resultsContainer'),
  resultCount: document.getElementById('resultCount'),
  status: document.getElementById('status'),
};

/**
 * Application state
 */
const state = {
  lastQuery: '',
  isLoading: false,
  results: [],
};

/**
 * Fetch search results from the backend API
 * 
 * @param {string} query - The search query
 * @param {number} limit - Maximum number of results
 * @returns {Promise<Object>} - API response with results
 */
async function fetchResults(query, limit = CONFIG.DEFAULT_LIMIT) {
  if (!query.trim()) {
    return { query: '', results: [], total: 0 };
  }

  try {
    state.isLoading = true;
    updateStatus('Searching...');

    const url = new URL(`${CONFIG.API_BASE_URL}/search`);
    url.searchParams.append('q', query);
    url.searchParams.append('limit', limit);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    state.isLoading = false;
    updateStatus('Ready');

    return data;
  } catch (error) {
    console.error('Error fetching results:', error);
    state.isLoading = false;
    updateStatus(`Error: ${error.message}`);
    return { query, results: [], total: 0, error: error.message };
  }
}

/**
 * Render search results to the DOM
 * 
 * @param {Array} results - Array of country objects
 */
function renderResults(results) {
  if (results.length === 0) {
    elements.resultsContainer.innerHTML =
      '<div class="no-results">No countries found</div>';
    elements.resultCount.textContent = '0';
    return;
  }

  const html = results
    .map(
      (country) => `
    <div class="result-item" data-code="${country.code}">
      <div class="result-name">${country.name}</div>
      <div class="result-meta">
        <span class="badge">${country.code}</span>
        <span class="region">${country.region}</span>
      </div>
    </div>
  `
    )
    .join('');

  elements.resultsContainer.innerHTML = html;
  elements.resultCount.textContent = results.length;

  // Add click handlers to results
  document.querySelectorAll('.result-item').forEach((item) => {
    item.addEventListener('click', handleResultClick);
  });
}

/**
 * Handle clicking on a result item
 * 
 * @param {Event} event
 */
function handleResultClick(event) {
  const item = event.currentTarget;
  const countryCode = item.getAttribute('data-code');
  const countryName = item.querySelector('.result-name').textContent;

  // This could trigger further actions (e.g., selection, navigation, etc.)
  console.log(`Selected: ${countryName} (${countryCode})`);

  // In a real app, this might:
  // - Update parent form
  // - Navigate to country detail page
  // - Save selection to state
  // - etc.
}

/**
 * Update status message
 * 
 * @param {string} message - Status message to display
 */
function updateStatus(message) {
  elements.status.textContent = message;
}

/**
 * Handle search input changes
 * This is called on every keystroke
 */
async function handleSearch() {
  const query = elements.searchInput.value.trim();

  // Skip if query hasn't changed significantly
  if (query === state.lastQuery) {
    return;
  }

  state.lastQuery = query;

  // If query is empty, clear results
  if (!query) {
    renderResults([]);
    updateStatus('Ready');
    return;
  }

  // Fetch and render results
  const response = await fetchResults(query, CONFIG.DEFAULT_LIMIT);
  state.results = response.results;
  renderResults(response.results);
}

/**
 * Initialize the application
 * Sets up event listeners and initial state
 */
function init() {
  console.log('✓ Autocomplete app initialized');
  console.log(`✓ API Base URL: ${CONFIG.API_BASE_URL}`);

  // Listen for input changes
  // Note: Using 'input' event (fires on every keystroke)
  // Exercise 174 will add debouncing to reduce API calls
  elements.searchInput.addEventListener('input', handleSearch);

  // Optional: Clear results when input loses focus (optional UX preference)
  // elements.searchInput.addEventListener('blur', () => {
  //   setTimeout(() => renderResults([]), 200);
  // });

  updateStatus('Ready');
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
