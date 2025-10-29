/**
 * Exercise 174: Autocomplete - Optimized
 * 
 * Advanced frontend with performance optimizations:
 * - Debouncing: Reduce API calls
 * - Client-side caching: Avoid re-fetching
 * - Fuzzy search support: Backend fuzzy matching
 * - Keyboard navigation: Arrow keys + Enter
 * - Better UX: Loading state, cache feedback
 */

const CONFIG = {
  API_BASE_URL: 'http://localhost:3000',
  DEFAULT_LIMIT: 10,
  DEBOUNCE_DELAY: 300, // milliseconds to wait after user stops typing
};

const elements = {
  searchInput: document.getElementById('searchInput'),
  resultsContainer: document.getElementById('resultsContainer'),
  resultCount: document.getElementById('resultCount'),
  cacheHits: document.getElementById('cacheHits'),
  status: document.getElementById('status'),
  responseTime: document.getElementById('responseTime'),
  clearBtn: document.getElementById('clearBtn'),
  loadingSpinner: document.getElementById('loadingSpinner'),
};

const state = {
  lastQuery: '',
  isLoading: false,
  results: [],
  selectedIndex: -1,
  cache: new Map(), // Client-side cache
  cacheHitCount: 0,
  lastResponseTime: 0,
  debounceTimer: null,
};

/**
 * Debounce function: delays execution until after specified time has passed
 * without the function being called again.
 * 
 * Analogy: "Wait for the user to stop typing before searching"
 */
function debounce(func, delay) {
  return function (...args) {
    clearTimeout(state.debounceTimer);
    state.debounceTimer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

/**
 * The debounced search function
 * This only runs 300ms after user stops typing
 */
const debouncedSearch = debounce(async () => {
  const query = elements.searchInput.value.trim();
  if (query === state.lastQuery) return;
  state.lastQuery = query;

  if (!query) {
    renderResults([]);
    updateStatus('Ready');
    return;
  }

  await performSearch(query);
}, CONFIG.DEBOUNCE_DELAY);

/**
 * Perform search with caching
 */
async function performSearch(query) {
  // Check cache first
  if (state.cache.has(query)) {
    state.cacheHitCount++;
    updateStatus(`Results from cache`);
    const cachedResults = state.cache.get(query);
    state.results = cachedResults;
    state.lastResponseTime = 0; // Cache hit, no network time
    renderResults(cachedResults);
    updateStats();
    return;
  }

  // Not in cache, fetch from API
  await fetchAndCache(query);
}

/**
 * Fetch from API and store in cache
 */
async function fetchAndCache(query) {
  try {
    state.isLoading = true;
    updateStatus('Searching...');
    showSpinner(true);

    const startTime = performance.now();

    const url = new URL(`${CONFIG.API_BASE_URL}/search`);
    url.searchParams.append('q', query);
    url.searchParams.append('limit', CONFIG.DEFAULT_LIMIT);

    const response = await fetch(url.toString());

    const endTime = performance.now();
    state.lastResponseTime = endTime - startTime;

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    state.results = data.results;

    // Store in cache
    state.cache.set(query, data.results);

    state.isLoading = false;
    showSpinner(false);
    updateStatus('Ready');
    renderResults(data.results);
    updateStats();
  } catch (error) {
    console.error('Search error:', error);
    state.isLoading = false;
    showSpinner(false);
    updateStatus(`Error: ${error.message}`);
    state.results = [];
    renderResults([]);
  }
}

/**
 * Render results to DOM
 */
function renderResults(results) {
  state.selectedIndex = -1; // Reset selection when re-rendering

  if (results.length === 0) {
    elements.resultsContainer.innerHTML =
      '<div class="no-results">No results found. Try different search terms!</div>';
    elements.resultCount.textContent = '0';
    return;
  }

  const html = results
    .map(
      (country, index) => `
    <div class="result-item" 
         data-index="${index}" 
         data-code="${country.code}"
         role="option">
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

  // Add click handlers
  document.querySelectorAll('.result-item').forEach((item) => {
    item.addEventListener('click', handleResultClick);
    item.addEventListener('mouseenter', (e) => {
      const index = parseInt(e.currentTarget.getAttribute('data-index'), 10);
      selectResult(index);
    });
  });
}

/**
 * Select result by index (for keyboard/mouse navigation)
 */
function selectResult(index) {
  // Remove previous selection
  document.querySelectorAll('.result-item').forEach((item) => {
    item.classList.remove('selected');
  });

  // Add selection to new item
  if (index >= 0 && index < state.results.length) {
    state.selectedIndex = index;
    const selectedItem = document.querySelector(
      `.result-item[data-index="${index}"]`
    );
    if (selectedItem) {
      selectedItem.classList.add('selected');
      selectedItem.scrollIntoView({ block: 'nearest' });
    }
  }
}

/**
 * Handle result selection
 */
function handleResultClick(event) {
  const item = event.currentTarget;
  const countryCode = item.getAttribute('data-code');
  const countryName = item.querySelector('.result-name').textContent;

  console.log(`Selected: ${countryName} (${countryCode})`);

  // Could trigger further actions here
  elements.searchInput.value = countryName;
  renderResults([]);
  updateStatus(`Selected: ${countryName}`);
}

/**
 * Handle keyboard navigation
 */
function handleKeyboard(event) {
  if (state.results.length === 0) return;

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      selectResult(Math.min(state.selectedIndex + 1, state.results.length - 1));
      break;

    case 'ArrowUp':
      event.preventDefault();
      selectResult(Math.max(state.selectedIndex - 1, 0));
      break;

    case 'Enter':
      event.preventDefault();
      if (state.selectedIndex >= 0) {
        const selectedItem = document.querySelector(
          `.result-item[data-index="${state.selectedIndex}"]`
        );
        if (selectedItem) {
          selectedItem.click();
        }
      }
      break;

    case 'Escape':
      elements.searchInput.value = '';
      renderResults([]);
      updateStatus('Ready');
      break;
  }
}

/**
 * Clear search
 */
function clearSearch() {
  elements.searchInput.value = '';
  state.lastQuery = '';
  state.selectedIndex = -1;
  renderResults([]);
  updateStatus('Ready');
  elements.searchInput.focus();
}

/**
 * Update UI stats
 */
function updateStatus(message) {
  elements.status.textContent = message;
}

function updateStats() {
  elements.cacheHits.textContent = state.cacheHitCount;
  if (state.lastResponseTime > 0) {
    elements.responseTime.textContent = state.lastResponseTime.toFixed(2) + ' ms';
  } else {
    elements.responseTime.textContent = 'cached';
  }
}

function showSpinner(visible) {
  elements.loadingSpinner.hidden = !visible;
}

/**
 * Handle search input
 */
function handleSearch() {
  // Trigger debounced search
  debouncedSearch();
}

/**
 * Initialize application
 */
function init() {
  console.log('✓ Optimized autocomplete app initialized');
  console.log(`✓ Debounce delay: ${CONFIG.DEBOUNCE_DELAY}ms`);
  console.log(`✓ API Base URL: ${CONFIG.API_BASE_URL}`);

  // Input listener with debouncing
  elements.searchInput.addEventListener('input', handleSearch);

  // Keyboard navigation
  elements.searchInput.addEventListener('keydown', handleKeyboard);

  // Clear button
  elements.clearBtn.addEventListener('click', clearSearch);

  updateStatus('Ready');
}

// Start app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
