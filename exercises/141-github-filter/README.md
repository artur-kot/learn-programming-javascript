# Exercise 146: GitHub Advanced Filtering

**Series:** 29 (GitHub User Finder)  
**Difficulty:** Advanced  
**Time Estimate:** 90 minutes  
**Focus:** Complex Filtering, Multi-Criteria Selection, Filter Composition

## Overview

In this exercise, you'll build sophisticated filtering functions that allow filtering GitHub repositories by multiple criteria simultaneously. This teaches you how to compose filters, create reusable filter predicates, and build complex query logic.

## Learning Outcomes

After completing this exercise, you will:
- ✅ Implement single-criteria filters
- ✅ Combine multiple filters
- ✅ Create reusable filter predicates
- ✅ Handle date range filtering
- ✅ Build complex filter UI
- ✅ Compose filters functionally
- ✅ Manage filter state

## Prerequisites

- ✅ [Exercise 145: GitHub Repos](../145-github-repos) - Sorting and filtering basics
- ✅ Array methods (filter, reduce, map)
- ✅ Object composition patterns

## Functions to Implement

### 1. `filterByMinStars(repos, minStars)`

Filter repositories by minimum star count.

**Parameters:**
- `repos` (array) - Repository objects
- `minStars` (number) - Minimum star threshold

**Returns:** Filtered array where all repos have `stargazers_count >= minStars`

**Example:**
```javascript
const topRepos = filterByMinStars(repos, 1000);
// Returns only repos with 1000+ stars
```

### 2. `filterByMinForks(repos, minForks)`

Filter repositories by minimum fork count.

**Parameters:**
- `repos` (array)
- `minForks` (number)

**Returns:** Filtered array

### 3. `filterByDateRange(repos, startDate, endDate)`

Filter repositories by last update date.

**Parameters:**
- `repos` (array)
- `startDate` (Date or ISO string)
- `endDate` (Date or ISO string)

**Returns:** Filtered array with repos updated within date range

**Example:**
```javascript
const recent = filterByDateRange(repos, '2024-01-01', '2024-12-31');
```

### 4. `filterByTopics(repos, topics)`

Filter repositories by topics/tags.

**Parameters:**
- `repos` (array)
- `topics` (array of strings)

**Returns:** Filtered array where repos have any matching topic

**Example:**
```javascript
const webRepos = filterByTopics(repos, ['web', 'api']);
// Returns repos with 'web' OR 'api' topic
```

### 5. `filterBySize(repos, minSize, maxSize)`

Filter repositories by size range.

**Parameters:**
- `repos` (array)
- `minSize` (number) - Minimum size in KB
- `maxSize` (number) - Maximum size in KB

**Returns:** Filtered array

### 6. `filterArchived(repos, includeArchived)`

Include or exclude archived repositories.

**Parameters:**
- `repos` (array)
- `includeArchived` (boolean) - true to include archived, false to exclude

**Returns:** Filtered array

**Example:**
```javascript
const active = filterArchived(repos, false);
// Returns only non-archived repos
```

### 7. `createFilterPredicate(criteria)`

Create a reusable filter function from criteria object.

**Parameters:**
- `criteria` (object) - e.g., `{ minStars: 100, language: 'JavaScript', archived: false }`

**Returns:** A function that takes a repo and returns true if it matches all criteria

**Example:**
```javascript
const predicate = createFilterPredicate({ minStars: 100, language: 'JavaScript' });
const filtered = repos.filter(predicate);
```

### 8. `applyMultipleFilters(repos, filters)`

Apply multiple filter functions in sequence.

**Parameters:**
- `repos` (array)
- `filters` (array of filter functions)

**Returns:** Filtered array that passes all filters

**Example:**
```javascript
const filters = [
  r => r.stargazers_count >= 100,
  r => r.forks_count >= 10,
  r => !r.archived
];
const filtered = applyMultipleFilters(repos, filters);
```

### 9. `createFilterUI(onFilterChange)`

Create DOM elements for filter controls.

**Parameters:**
- `onFilterChange` (function) - Callback when filters change

**Returns:** DOM element with filter controls

**Behavior:**
- Create input fields for min stars, min forks, language, etc.
- Call callback when any filter changes
- Callback receives current filter criteria

### 10. `buildFilterString(criteria)`

Build URL query string from filter criteria.

**Parameters:**
- `criteria` (object) - Filter criteria

**Returns:** Query string like `"?minStars=100&language=JavaScript"`

**Example:**
```javascript
const query = buildFilterString({ minStars: 100, language: 'JavaScript' });
// Returns: "?minStars=100&language=JavaScript"
```

## Implementation Tips

### Single Filter Implementation

```javascript
function filterByMinStars(repos, minStars) {
  return repos.filter(repo => repo.stargazers_count >= minStars);
}
```

### Filter Predicate Pattern

```javascript
function createFilterPredicate(criteria) {
  return function(repo) {
    if (criteria.minStars && repo.stargazers_count < criteria.minStars) {
      return false;
    }
    if (criteria.language && repo.language !== criteria.language) {
      return false;
    }
    if (criteria.archived !== undefined && repo.archived !== criteria.archived) {
      return false;
    }
    return true;
  };
}
```

### Date Range Filtering

```javascript
function filterByDateRange(repos, startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return repos.filter(repo => {
    const updated = new Date(repo.updated_at);
    return updated >= start && updated <= end;
  });
}
```

### Composing Filters

```javascript
function applyMultipleFilters(repos, filters) {
  return filters.reduce((result, filter) => {
    return result.filter(filter);
  }, repos);
  
  // Or more simply:
  // return repos.filter(repo => filters.every(f => f(repo)));
}
```

### Building Query Strings

```javascript
function buildFilterString(criteria) {
  const params = new URLSearchParams();
  
  if (criteria.minStars) params.append('minStars', criteria.minStars);
  if (criteria.language) params.append('language', criteria.language);
  if (criteria.archived !== undefined) params.append('archived', criteria.archived);
  
  const query = params.toString();
  return query ? `?${query}` : '';
}
```

## Common Patterns

### Pattern 1: Chainable Filters

```javascript
function createFilterChain(repos) {
  return {
    byStars: (min) => createFilterChain(filterByMinStars(repos, min)),
    byLanguage: (lang) => createFilterChain(filterByLanguage(repos, lang)),
    get: () => repos
  };
}

// Usage:
const filtered = createFilterChain(repos)
  .byStars(100)
  .byLanguage('JavaScript')
  .get();
```

### Pattern 2: Filter Factory

```javascript
const filters = {
  minStars: (min) => (r) => r.stargazers_count >= min,
  maxStars: (max) => (r) => r.stargazers_count <= max,
  language: (lang) => (r) => r.language === lang,
  archived: (include) => (r) => include ? true : !r.archived
};

// Usage:
const combined = [
  filters.minStars(100),
  filters.language('JavaScript'),
  filters.archived(false)
];
const result = applyMultipleFilters(repos, combined);
```

### Pattern 3: Criteria Validation

```javascript
function validateCriteria(criteria) {
  if (criteria.minStars && typeof criteria.minStars !== 'number') {
    throw new Error('minStars must be a number');
  }
  if (criteria.startDate && !isValidDate(criteria.startDate)) {
    throw new Error('startDate must be a valid date');
  }
  return true;
}
```

## Testing Guide

### Test Basic Filters

```javascript
it('should filter by minimum stars', () => {
  const filtered = filterByMinStars(repos, 100);
  expect(filtered.every(r => r.stargazers_count >= 100)).toBe(true);
});
```

### Test Composed Filters

```javascript
it('should apply multiple filters', () => {
  const filters = [
    r => r.stargazers_count >= 100,
    r => r.language === 'JavaScript'
  ];
  const result = applyMultipleFilters(repos, filters);
  expect(result.every(r => r.stargazers_count >= 100 && r.language === 'JavaScript')).toBe(true);
});
```

### Test Filter Predicates

```javascript
it('should create filter predicate', () => {
  const predicate = createFilterPredicate({ minStars: 100 });
  expect(predicate(repoWith100Stars)).toBe(true);
  expect(predicate(repoWith50Stars)).toBe(false);
});
```

## Real-World Usage

### Find Best Python Projects

```javascript
async function findBestPythonProjects(username) {
  const repos = await fetchUserRepositories(username);
  
  const criteria = {
    language: 'Python',
    minStars: 50,
    archived: false
  };
  
  const predicate = createFilterPredicate(criteria);
  return repos.filter(predicate).sort((a, b) => b.stargazers_count - a.stargazers_count);
}
```

### Build Filter URL

```javascript
function searchRepos(criteria) {
  const queryString = buildFilterString(criteria);
  const url = `https://example.com/repos${queryString}`;
  return fetch(url);
}

// Usage:
searchRepos({ language: 'JavaScript', minStars: 100 });
// Fetches: https://example.com/repos?language=JavaScript&minStars=100
```

## Key Takeaways

1. **Single Responsibility:** Each filter function does one thing
2. **Composability:** Filters combine easily
3. **Reusability:** Filter predicates can be stored and reused
4. **Clarity:** Named filter functions are more readable than inline logic
5. **Flexibility:** Criteria objects make filters flexible
6. **Testability:** Pure filter functions are easy to test

## Resources

- [MDN: Array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [MDN: Array.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
- [MDN: URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

## Next Steps

After completing this exercise:
- ✅ Continue to [Exercise 147: GitHub Pagination](../147-github-pagination) - Paginate large result sets
- ✅ Practice filtering in [Exercise 145: GitHub Repos](../145-github-repos)
- ✅ Explore functional programming patterns
