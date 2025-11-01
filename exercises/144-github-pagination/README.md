# Exercise 147: GitHub Pagination

Master pagination patterns for managing large result sets from APIs. Learn how to split data into pages, navigate between them, and implement efficient infinite scroll patterns.

## Learning Outcomes

By completing this exercise, you will:

- ✅ Implement pagination controls and page calculations
- ✅ Navigate between pages with proper state management
- ✅ Handle edge cases in pagination logic
- ✅ Create accessible pagination UI components
- ✅ Optimize infinite scroll implementations
- ✅ Format pagination information for users
- ✅ Implement smart page button generation
- ✅ Manage API request optimization with pagination

## Prerequisites

Before starting this exercise, you should be familiar with:

- **Exercise 146**: GitHub API filtering patterns
- **Array slicing**: `slice()` method for extracting subarrays
- **Math operations**: `Math.ceil()` for rounding up
- **DOM manipulation**: Creating and updating HTML elements
- **Event handling**: Click handlers for pagination buttons
- **State management**: Tracking current page and total count

## Concepts

### Pagination Basics

Pagination divides a large dataset into smaller, manageable chunks (pages):

```
Dataset: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Page Size: 3

Page 1: [1, 2, 3]
Page 2: [4, 5, 6]
Page 3: [7, 8, 9]
Page 4: [10]
```

**Key calculations:**
- Total Pages = Math.ceil(totalItems / pageSize)
- Page Start Index = (pageNumber - 1) * pageSize
- Page End Index = pageNumber * pageSize

### Why Pagination?

1. **Performance**: Loading 30 items is faster than 3,000
2. **UX**: Users see results faster with progressive loading
3. **API Efficiency**: GitHub API rate limits results (30 per request)
4. **Memory**: Browser uses less memory with smaller datasets
5. **Network**: Reduces bandwidth usage

### API Rate Limiting

GitHub API returns max 30 items per request. For larger datasets:

```javascript
// Bad: Requesting 1000 users requires 34 API calls sequentially
for (let page = 1; page <= 34; page++) {
  const response = await fetch(`/search/users?per_page=30&page=${page}`);
}

// Good: Fetch one page at a time, let user navigate
const currentPage = getUserInput();
const response = await fetch(`/search/users?per_page=30&page=${currentPage}`);
```

## Function Specifications

### calculateTotalPages(totalItems, itemsPerPage)

Calculate how many pages are needed to display all items.

```javascript
calculateTotalPages(100, 20)  // → 5
calculateTotalPages(105, 20)  // → 6 (rounds up)
calculateTotalPages(0, 20)    // → 0
```

**Implementation tips:**
- Use `Math.ceil()` to round up
- Handle edge case: totalItems = 0
- Pages are counted starting from 1

### getCurrentPage(repos, page, itemsPerPage)

Extract items for a specific page from an array.

```javascript
const items = [1,2,3,4,5,6,7,8,9,10];
getCurrentPage(items, 1, 3)  // → [1, 2, 3]
getCurrentPage(items, 2, 3)  // → [4, 5, 6]
getCurrentPage(items, 4, 3)  // → [10]
getCurrentPage(items, 5, 3)  // → [] (out of range)
```

**Implementation tips:**
- Pages are 1-indexed (page 1 = first page)
- Calculate start: (page - 1) * itemsPerPage
- Use `array.slice(start, end)`
- Return empty array for invalid pages

### goToPage(repos, page, itemsPerPage)

Navigate to a page with validation.

```javascript
const repos = Array.from({length: 50}, (_, i) => ({id: i+1}));
goToPage(repos, 1, 10)  // → Array with 10 items (id 1-10)
goToPage(repos, 0, 10)  // → [] (invalid: page must be >= 1)
goToPage(repos, 99, 10) // → [] (invalid: page exceeds total)
```

**Implementation tips:**
- Validate page >= 1
- Calculate total pages first
- Validate page <= totalPages
- Return empty array for invalid pages

### nextPage(currentPage, totalPages)

Calculate next page number with boundary checking.

```javascript
nextPage(1, 5)  // → 2
nextPage(4, 5)  // → 5
nextPage(5, 5)  // → 5 (don't go beyond)
```

**Implementation tips:**
- Don't exceed totalPages
- Use Math.min() to cap the value
- Handle edge case: totalPages = 1

### prevPage(currentPage)

Calculate previous page number without going below 1.

```javascript
prevPage(3)  // → 2
prevPage(1)  // → 1 (don't go below)
prevPage(0)  // → 1 (handle invalid input)
```

**Implementation tips:**
- Don't go below page 1
- Use Math.max(1, currentPage - 1)
- Handle edge case: input < 1

### getPageItems(items, page, pageSize)

Generic pagination function (works with any array).

```javascript
const arr = ['a', 'b', 'c', 'd', 'e', 'f'];
getPageItems(arr, 1, 2)  // → ['a', 'b']
getPageItems(arr, 3, 2)  // → ['e', 'f']
getPageItems(arr, 4, 2)  // → [] (out of range)
```

**Implementation tips:**
- Same logic as getCurrentPage
- More generic - works with any data type
- Useful for reusable components

### renderPagination(page, totalPages, onPageClick)

Create HTML pagination UI.

```html
<div class="pagination">
  <button class="prev">← Previous</button>
  <button>1</button>
  <button class="active">2</button>
  <button>3</button>
  <button class="next">Next →</button>
</div>
```

**Implementation tips:**
- Return HTMLElement or HTML string
- Add 'active' class to current page
- Attach click handlers to page buttons
- Disable prev button on page 1
- Disable next button on last page

### formatPaginationInfo(page, totalPages, totalItems, itemsPerPage)

Format human-readable pagination text.

```javascript
formatPaginationInfo(2, 5, 100, 20)
// → "Page 2 of 5 (Items 21-40 of 100)"

formatPaginationInfo(1, 1, 50, 50)
// → "Page 1 of 1 (Items 1-50 of 50)"
```

**Implementation tips:**
- Calculate item start: (page - 1) * itemsPerPage + 1
- Calculate item end: page * itemsPerPage
- Cap item end at totalItems
- Format as readable string

### createPageButtons(currentPage, totalPages, maxVisible)

Generate smart page button array with ellipsis for large page counts.

```javascript
createPageButtons(2, 5, 5)
// → [1, 2, 3, 4, 5]

createPageButtons(5, 20, 5)
// → [1, '...', 4, 5, 6, '...', 20]

createPageButtons(1, 20, 5)
// → [1, 2, 3, 4, 5, '...', 20]
```

**Implementation tips:**
- Always show first page (1)
- Always show last page
- Show pages around current page
- Use '...' for gaps
- Never show more than maxVisible numbers

**Algorithm:**
```
1. If totalPages <= maxVisible: return [1, 2, ..., totalPages]
2. Otherwise:
   - Start = max(1, current - 1)
   - End = min(totalPages, current + 1)
   - Add page 1 if start > 1, with '...' if start > 2
   - Add pages from start to end
   - Add '...' and totalPages if end < totalPages
```

### buildPaginationControls(currentPage, totalPages, onPageChange)

Build interactive pagination UI element.

```javascript
const controls = buildPaginationControls(1, 5, (page) => {
  console.log('Go to page:', page);
});

// Returns: HTMLElement with:
// - Previous button (disabled on page 1)
// - Page number buttons (with current highlighted)
// - Next button (disabled on last page)
```

**Implementation tips:**
- Create container element
- Add prev/next buttons
- Add page number buttons using createPageButtons()
- Attach click handlers calling onPageChange
- Set data attributes for page numbers
- Style active button differently
- Return the container element

## Common Patterns

### Pattern 1: Basic Pagination

```javascript
let currentPage = 1;
const itemsPerPage = 20;

function showPage(page) {
  const items = getPageItems(allItems, page, itemsPerPage);
  renderItems(items);
  
  const totalPages = calculateTotalPages(allItems.length, itemsPerPage);
  const info = formatPaginationInfo(page, totalPages, allItems.length, itemsPerPage);
  document.getElementById('info').textContent = info;
  
  currentPage = page;
}

document.getElementById('nextBtn').addEventListener('click', () => {
  const totalPages = calculateTotalPages(allItems.length, itemsPerPage);
  const next = nextPage(currentPage, totalPages);
  showPage(next);
});
```

### Pattern 2: Infinite Scroll

```javascript
const pageSize = 30;
let currentPage = 1;

window.addEventListener('scroll', () => {
  if (isNearBottom()) {
    const next = nextPage(currentPage, totalPages);
    if (next > currentPage) {
      loadMoreItems(next);
      currentPage = next;
    }
  }
});

async function loadMoreItems(page) {
  const response = await fetch(`/api/items?page=${page}&per_page=${pageSize}`);
  const newItems = await response.json();
  appendItems(newItems);
}
```

### Pattern 3: URL-Based Pagination

```javascript
// Store page in URL query parameter
function navigateToPage(page) {
  const url = new URL(window.location);
  url.searchParams.set('page', page);
  window.history.pushState({}, '', url);
  showPage(page);
}

// Read page from URL on load
function initializePage() {
  const url = new URL(window.location);
  const page = parseInt(url.searchParams.get('page')) || 1;
  showPage(page);
}
```

### Pattern 4: Smart Page Buttons

```javascript
const controls = buildPaginationControls(currentPage, totalPages, (page) => {
  showPage(page);
});

// Use createPageButtons for rendering
const buttons = createPageButtons(currentPage, totalPages, 7);
buttons.forEach(button => {
  if (button === '...') {
    addEllipsis();
  } else {
    const btn = createButton(button);
    if (button === currentPage) btn.classList.add('active');
    btn.addEventListener('click', () => navigateToPage(button));
  }
});
```

### Pattern 5: API-Driven Pagination

```javascript
// Fetch paginated data from GitHub API
async function searchRepositories(query, page = 1) {
  const perPage = 30; // GitHub limit
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${query}&per_page=${perPage}&page=${page}`,
    { headers: { 'User-Agent': 'GitHub-Client' } }
  );
  const data = await response.json();
  
  const totalPages = calculateTotalPages(data.total_count, perPage);
  return {
    items: data.items,
    page,
    totalPages,
    totalItems: data.total_count
  };
}

// Use in UI
const results = await searchRepositories('javascript', 2);
renderResults(results.items);
const info = formatPaginationInfo(results.page, results.totalPages, 
                                   results.totalItems, 30);
```

### Pattern 6: State Management

```javascript
class PaginationState {
  constructor(items, pageSize) {
    this.items = items;
    this.pageSize = pageSize;
    this.currentPage = 1;
  }

  get totalPages() {
    return calculateTotalPages(this.items.length, this.pageSize);
  }

  get currentItems() {
    return getCurrentPage(this.items, this.currentPage, this.pageSize);
  }

  nextPage() {
    this.currentPage = nextPage(this.currentPage, this.totalPages);
  }

  prevPage() {
    this.currentPage = prevPage(this.currentPage);
  }

  goToPage(page) {
    this.currentPage = Math.max(1, Math.min(page, this.totalPages));
  }

  get info() {
    return formatPaginationInfo(this.currentPage, this.totalPages, 
                               this.items.length, this.pageSize);
  }
}
```

## Testing Guide

### Test Page Calculations

```javascript
it('should calculate correct pages', () => {
  expect(calculateTotalPages(100, 20)).toBe(5);
  expect(calculateTotalPages(105, 20)).toBe(6);
  expect(calculateTotalPages(0, 20)).toBe(0);
});
```

### Test Page Extraction

```javascript
it('should extract page items correctly', () => {
  const items = [1,2,3,4,5,6];
  expect(getCurrentPage(items, 1, 2)).toEqual([1,2]);
  expect(getCurrentPage(items, 2, 2)).toEqual([3,4]);
  expect(getCurrentPage(items, 3, 2)).toEqual([5,6]);
  expect(getCurrentPage(items, 4, 2)).toEqual([]);
});
```

### Test Navigation

```javascript
it('should navigate with bounds checking', () => {
  expect(nextPage(1, 5)).toBe(2);
  expect(nextPage(5, 5)).toBe(5);
  expect(prevPage(3)).toBe(2);
  expect(prevPage(1)).toBe(1);
});
```

### Test UI Rendering

```javascript
it('should render pagination controls', () => {
  const controls = buildPaginationControls(2, 5, () => {});
  expect(controls).toBeDefined();
  expect(controls.querySelector('.active')).toBeDefined();
});
```

### Test Event Handling

```javascript
it('should call callback on page click', (done) => {
  const controls = buildPaginationControls(1, 3, (page) => {
    expect(page).toBe(2);
    done();
  });
  controls.querySelector('[data-page="2"]').click();
});
```

## Real-World Usage

### GitHub Repository Search

```javascript
async function searchGithubRepos(query, page = 1) {
  const perPage = 30;
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${query}&per_page=${perPage}&page=${page}`,
    { headers: { 'User-Agent': 'GitHub-Paginator' } }
  );
  
  const data = await response.json();
  const totalPages = calculateTotalPages(data.total_count, perPage);
  
  return {
    repositories: data.items,
    page,
    totalPages,
    totalCount: data.total_count,
    info: formatPaginationInfo(page, totalPages, data.total_count, perPage)
  };
}

// Usage
const results = await searchGithubRepos('react', 1);
console.log(results.info); // "Page 1 of 1667 (Items 1-30 of 50000)"
displayRepositories(results.repositories);
renderPagination(results.page, results.totalPages, (page) => {
  searchGithubRepos(results.query, page);
});
```

### Infinite Scroll Implementation

```javascript
class InfiniteScroll {
  constructor(container, fetchFn, pageSize = 30) {
    this.container = container;
    this.fetchFn = fetchFn;
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.isLoading = false;
    this.allItems = [];
    
    this.observeScrolling();
  }

  async loadMoreItems() {
    if (this.isLoading) return;
    this.isLoading = true;
    
    try {
      const newItems = await this.fetchFn(this.currentPage);
      this.allItems.push(...newItems);
      this.renderItems(newItems);
      this.currentPage++;
    } finally {
      this.isLoading = false;
    }
  }

  observeScrolling() {
    window.addEventListener('scroll', () => {
      if (this.isNearBottom()) {
        this.loadMoreItems();
      }
    });
  }

  isNearBottom() {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
  }

  renderItems(items) {
    items.forEach(item => {
      const element = createItemElement(item);
      this.container.appendChild(element);
    });
  }
}
```

### Table with Pagination

```javascript
class PaginatedTable {
  constructor(tableSelector, data, pageSize = 10) {
    this.table = document.querySelector(tableSelector);
    this.data = data;
    this.pageSize = pageSize;
    this.currentPage = 1;
    
    this.render();
  }

  render() {
    const items = getCurrentPage(this.data, this.currentPage, this.pageSize);
    const totalPages = calculateTotalPages(this.data.length, this.pageSize);
    
    this.renderTableRows(items);
    this.renderPaginationControls(totalPages);
    this.updatePaginationInfo(totalPages);
  }

  renderTableRows(items) {
    const tbody = this.table.querySelector('tbody');
    tbody.innerHTML = '';
    items.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = Object.values(row).map(v => `<td>${v}</td>`).join('');
      tbody.appendChild(tr);
    });
  }

  renderPaginationControls(totalPages) {
    const controls = buildPaginationControls(
      this.currentPage,
      totalPages,
      (page) => {
        this.currentPage = page;
        this.render();
      }
    );
    
    const paginationContainer = this.table.parentElement.querySelector('.pagination');
    paginationContainer.innerHTML = '';
    paginationContainer.appendChild(controls);
  }

  updatePaginationInfo(totalPages) {
    const info = formatPaginationInfo(
      this.currentPage,
      totalPages,
      this.data.length,
      this.pageSize
    );
    document.getElementById('paginationInfo').textContent = info;
  }
}

// Usage
const table = new PaginatedTable('#dataTable', largeDataset, 15);
```

## Implementation Tips

1. **Always validate pages**: Check that page >= 1 and page <= totalPages
2. **Use 1-indexed pages**: Users think "page 1" not "page 0"
3. **Cache total pages**: Calculate once, reuse throughout
4. **Handle empty results**: Show helpful message instead of blank page
5. **Keyboard navigation**: Support arrow keys for page navigation
6. **Mobile-friendly**: Show fewer page buttons on small screens
7. **Accessibility**: Use semantic HTML, ARIA attributes, keyboard support
8. **Performance**: Lazy-load items instead of rendering all at once
9. **URL state**: Store current page in URL for bookmarkability
10. **Loading states**: Show spinner while fetching next page

## Resources

- [MDN: Array.slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
- [MDN: Math.ceil()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil)
- [GitHub REST API Pagination](https://docs.github.com/en/rest/using-the-rest-api/pagination)
- [Web Infinite Scroll](https://www.smashingmagazine.com/2013/05/infinite-scrolling-lets-get-to-the-bottom-of-this/)
- [WCAG Pagination](https://www.w3.org/WAI/tutorials/pagination/)

## Key Takeaways

- **Pagination splits data** into manageable pages for better performance and UX
- **Calculate pages correctly** using Math.ceil(total / pageSize)
- **Validate page numbers** to prevent off-by-one errors
- **Use 1-indexed pages** for user-friendly interfaces
- **Implement navigation** with prev/next and direct page selection
- **Format information** to help users understand their position
- **Create accessible UI** with keyboard support and proper semantics
- **Optimize API usage** by fetching one page at a time
- **Smart buttons** show relevant pages with ellipsis for gaps
- **State management** keeps pagination logic clean and testable

Good luck! 🚀
