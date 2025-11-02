# Exercise 145: GitHub Repositories

**Series:** 29 (GitHub User Finder)  
**Difficulty:** Intermediate  
**Time Estimate:** 90 minutes  
**Focus:** API Data Handling, Sorting, Filtering, Pagination

## Overview

In this exercise, you'll fetch and display GitHub user repositories with advanced data manipulation. You'll learn to sort, filter, paginate, and group data from API responses.

## Learning Outcomes

After completing this exercise, you will:
- ✅ Fetch paginated data from REST APIs
- ✅ Sort data by multiple criteria
- ✅ Filter data by properties
- ✅ Handle large data sets efficiently
- ✅ Group data by categories
- ✅ Calculate statistics from data
- ✅ Implement pagination controls

## Functions to Implement

### 1. `fetchUserRepositories(username)`

Fetch all public repositories for a GitHub user.

**Parameters:**
- `username` (string) - GitHub username

**Returns:** Promise resolving to array of repository objects

**API Endpoint:** `GET /users/{username}/repos`

**Example:**
```javascript
const repos = await fetchUserRepositories('torvalds');
// Returns array of repository objects with properties like:
// { id, name, description, language, stargazers_count, forks_count, updated_at, ... }
```

### 2. `sortRepositories(repos, sortBy)`

Sort repositories by different criteria.

**Parameters:**
- `repos` (array) - Array of repository objects
- `sortBy` (string) - One of: 'stars', 'forks', 'updated', 'name'

**Returns:** New sorted array

**Examples:**
```javascript
sortRepositories(repos, 'stars')     // Sort by star count descending
sortRepositories(repos, 'forks')     // Sort by fork count descending
sortRepositories(repos, 'updated')   // Sort by last update descending
sortRepositories(repos, 'name')      // Sort alphabetically
```

### 3. `filterByLanguage(repos, language)`

Filter repositories by programming language.

**Parameters:**
- `repos` (array)
- `language` (string) - Language name (e.g., 'JavaScript', 'Python')

**Returns:** Filtered array

**Behavior:**
- Case-insensitive matching
- Handle null language values

**Example:**
```javascript
filterByLanguage(repos, 'javascript') // Returns JavaScript repos
```

### 4. `calculateRepoStats(repos)`

Calculate statistics about a repository collection.

**Parameters:**
- `repos` (array)

**Returns:** Object with:
- `totalRepos` - Number of repositories
- `totalStars` - Sum of all stars
- `averageStars` - Average stars per repo
- `mostStarred` - Repository object with most stars
- `mostForked` - Repository object with most forks

**Example:**
```javascript
const stats = calculateRepoStats(repos);
// {
//   totalRepos: 50,
//   totalStars: 125000,
//   averageStars: 2500,
//   mostStarred: { name: 'linux', stargazers_count: 50000, ... },
//   mostForked: { name: 'git', forks_count: 25000, ... }
// }
```

### 5. `formatRepoData(repo)`

Format repository object for display.

**Parameters:**
- `repo` (object) - Raw GitHub API repository object

**Returns:** Formatted object with fields:
- `name` - Repository name
- `description` - Repository description (or empty string)
- `url` - Repository URL
- `language` - Programming language
- `stars` - Star count
- `forks` - Fork count
- `updated` - Last updated timestamp

### 6. `createRepoElement(repo)`

Create DOM element for repository display.

**Parameters:**
- `repo` (object) - Formatted repository object

**Returns:** DOM element with class `repo-item`

**Contents:**
- Repository name
- Description
- Language (if available)
- Stars and forks count
- Link to repository

### 7. `renderRepositories(repos, containerId)`

Render multiple repositories in a container.

**Parameters:**
- `repos` (array) - Repository objects
- `containerId` (string) - CSS selector

**Returns:** Void

**Behavior:**
1. Find container
2. Clear existing content
3. Create element for each repo
4. Append to container

### 8. `getRepositoriesByPage(username, page, perPage)`

Fetch repositories with pagination.

**Parameters:**
- `username` (string)
- `page` (number) - Page number (default: 1)
- `perPage` (number) - Items per page (default: 30)

**Returns:** Promise resolving to array of repositories

**API Parameters:**
```
?page={page}&per_page={perPage}
```

### 9. `searchRepositories(repos, query)`

Search repositories by name or description.

**Parameters:**
- `repos` (array)
- `query` (string) - Search term

**Returns:** Filtered array matching query

**Behavior:**
- Case-insensitive search
- Search both name and description fields

**Example:**
```javascript
searchRepositories(repos, 'kernel') // Returns repos with 'kernel' in name/description
```

### 10. `groupRepositoriesByLanguage(repos)`

Group repositories by programming language.

**Parameters:**
- `repos` (array)

**Returns:** Object with languages as keys, arrays of repos as values

**Example:**
```javascript
const grouped = groupRepositoriesByLanguage(repos);
// {
//   "JavaScript": [{ name: 'repo1', ... }, ...],
//   "Python": [{ name: 'repo2', ... }, ...],
//   "Go": [...]
// }
```

## Implementation Tips

### Fetching with Pagination

```javascript
async function fetchUserRepositories(username) {
  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=100`, {
    headers: { 'User-Agent': 'GitHub-Repos' }
  });
  if (!response.ok) throw new Error('Failed to fetch repos');
  return await response.json();
}
```

### Sorting Arrays

```javascript
function sortRepositories(repos, sortBy) {
  const sorted = [...repos]; // Don't mutate original
  
  if (sortBy === 'stars') {
    sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);
  } else if (sortBy === 'name') {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
  
  return sorted;
}
```

### Filtering Arrays

```javascript
function filterByLanguage(repos, language) {
  return repos.filter(r => 
    r.language && r.language.toLowerCase() === language.toLowerCase()
  );
}
```

### Calculating Statistics

```javascript
function calculateRepoStats(repos) {
  return {
    totalRepos: repos.length,
    totalStars: repos.reduce((sum, r) => sum + r.stargazers_count, 0),
    averageStars: Math.floor(repos.reduce((sum, r) => sum + r.stargazers_count, 0) / repos.length),
    mostStarred: repos.reduce((max, r) => r.stargazers_count > max.stargazers_count ? r : max),
    mostForked: repos.reduce((max, r) => r.forks_count > max.forks_count ? r : max)
  };
}
```

### Grouping Data

```javascript
function groupRepositoriesByLanguage(repos) {
  return repos.reduce((grouped, repo) => {
    const lang = repo.language || 'No Language';
    if (!grouped[lang]) grouped[lang] = [];
    grouped[lang].push(repo);
    return grouped;
  }, {});
}
```

## Common Patterns

### Pattern 1: Sort Multiple Criteria

```javascript
function multiSort(repos) {
  return repos.sort((a, b) => {
    // Sort by stars first
    if (b.stargazers_count !== a.stargazers_count) {
      return b.stargazers_count - a.stargazers_count;
    }
    // Then by forks
    return b.forks_count - a.forks_count;
  });
}
```

### Pattern 2: Chain Filters

```javascript
function filterRepos(repos) {
  return repos
    .filter(r => r.language === 'JavaScript')
    .filter(r => r.stargazers_count > 100)
    .sort((a, b) => b.stargazers_count - a.stargazers_count);
}
```

### Pattern 3: Format for Display

```javascript
function formatForDisplay(repos) {
  return repos.map(r => ({
    name: r.name,
    stars: r.stargazers_count > 1000 
      ? (r.stargazers_count / 1000).toFixed(1) + 'K'
      : r.stargazers_count,
    url: r.html_url
  }));
}
```

## Testing Guide

### Test Sorting

```javascript
it('should sort by stars descending', () => {
  const sorted = sortRepositories(repos, 'stars');
  expect(sorted[0].stargazers_count).toBeGreaterThanOrEqual(sorted[1].stargazers_count);
});
```

### Test Filtering

```javascript
it('should filter by language', () => {
  const filtered = filterByLanguage(repos, 'JavaScript');
  expect(filtered.every(r => r.language === 'JavaScript')).toBe(true);
});
```

### Test Calculations

```javascript
it('should calculate correct total stars', () => {
  const stats = calculateRepoStats(repos);
  const expected = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  expect(stats.totalStars).toBe(expected);
});
```

## Real-World Usage

### Compare Two Developers

```javascript
async function compareDevs(user1, user2) {
  const repos1 = await fetchUserRepositories(user1);
  const repos2 = await fetchUserRepositories(user2);
  
  const stats1 = calculateRepoStats(repos1);
  const stats2 = calculateRepoStats(repos2);
  
  console.log(`${user1}: ${stats1.totalStars} stars`);
  console.log(`${user2}: ${stats2.totalStars} stars`);
}

compareDevs('torvalds', 'gvanrossum');
```

### Find Popular Projects by Language

```javascript
async function findPopularRepos(username, language) {
  const repos = await fetchUserRepositories(username);
  const filtered = filterByLanguage(repos, language);
  const sorted = sortRepositories(filtered, 'stars');
  return sorted.slice(0, 5);
}

const topPython = await findPopularRepos('gvanrossum', 'Python');
```

## Key Takeaways

1. **API Pagination:** Handle multiple pages of data from APIs
2. **Array Sorting:** Sort by multiple criteria
3. **Array Filtering:** Filter with multiple conditions
4. **Data Aggregation:** Calculate statistics from data
5. **Data Grouping:** Organize data by categories
6. **Data Transformation:** Format data for display

## Resources

- [GitHub Repos Endpoint](https://docs.github.com/en/rest/repos)
- [MDN: Array.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [MDN: Array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [MDN: Array.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

## Next Steps

After completing this exercise:
- ✅ Continue to [Exercise 146: GitHub Filter](../146-github-filter) - Advanced filtering
- ✅ Learn pagination in [Exercise 147: GitHub Pagination](../147-github-pagination)
- ✅ Practice sorting in previous exercises
