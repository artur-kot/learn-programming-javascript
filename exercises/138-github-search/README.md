# Exercise 143: GitHub User Search

**Series:** 29 (GitHub User Finder)  
**Difficulty:** Intermediate  
**Time Estimate:** 90 minutes  
**Focus:** GitHub API Integration, URL Construction, Data Validation

## Overview

In this exercise, you'll build functions to search GitHub users and fetch their profile data. This introduces you to working with the GitHub REST API, one of the most popular APIs available.

By completing this exercise, you'll learn:
- How to construct API URLs with query parameters
- Making authenticated API requests
- Validating user input before making API calls
- Parsing and formatting API responses
- Implementing a caching system to optimize API usage

## Learning Outcomes

After completing this exercise, you will:
- ✅ Construct GitHub API URLs dynamically
- ✅ Validate GitHub usernames according to GitHub's rules
- ✅ Fetch user data from the GitHub REST API
- ✅ Parse and format API responses
- ✅ Implement data caching to reduce API calls
- ✅ Handle parallel requests for multiple users
- ✅ Work with real-world REST API patterns

## Prerequisites

- ✅ [Exercise 138: Weather Fetch](../138-weather-fetch) - Understand Fetch API
- ✅ [Exercise 139: Weather JSON](../139-weather-json) - Parse JSON responses
- ✅ [Exercise 140: Weather Errors](../140-weather-errors) - Handle errors

## Functions to Implement

### 1. `buildGithubUrl(username, options = {})`

**Purpose:** Construct a GitHub API URL with query parameters.

**Parameters:**
- `username` (string) - The GitHub username to search for
- `options` (object) - Optional query parameters (e.g., { per_page: 50 })

**Returns:** A complete GitHub API URL string

**Examples:**
```javascript
buildGithubUrl('octocat')
// Returns: 'https://api.github.com/users/octocat'

buildGithubUrl('torvalds', { per_page: 100 })
// Returns: 'https://api.github.com/users/torvalds?per_page=100'
```

**Key Concepts:**
- GitHub API base URL: `https://api.github.com/users/{username}`
- Use `URLSearchParams` to build query string
- Only add `?` and parameters if options exist

### 2. `validateUsername(username)`

**Purpose:** Validate GitHub username format before making API requests.

**Parameters:**
- `username` (string) - The username to validate

**Returns:** An object `{ isValid: boolean, error: string | null }`

**Validation Rules:**
- Not empty
- No spaces
- Only alphanumeric characters and hyphens
- Length 1-39 characters (GitHub's actual limits)

**Examples:**
```javascript
validateUsername('octocat')
// Returns: { isValid: true, error: null }

validateUsername('invalid user')
// Returns: { isValid: false, error: 'Username contains spaces' }

validateUsername('a'.repeat(40))
// Returns: { isValid: false, error: 'Username exceeds 39 characters' }
```

**Key Concepts:**
- Regular expressions for pattern matching
- GitHub username constraints from their API documentation
- Early validation prevents unnecessary API calls

### 3. `formatApiResponse(response)`

**Purpose:** Format raw GitHub API response into a consistent object.

**Parameters:**
- `response` (object) - The GitHub API response object

**Returns:** A formatted object with these fields:
- `login` - GitHub username
- `name` - Display name (fallback to login if null)
- `avatar_url` - User's avatar image URL
- `bio` - User's bio (default: 'No bio available')
- `location` - User's location (default: 'Not specified')
- `followers` - Number of followers
- `following` - Number following
- `public_repos` - Number of public repositories
- `profile_url` - Computed as `https://github.com/{login}`

**Examples:**
```javascript
const response = {
  login: 'octocat',
  name: 'The Octocat',
  avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
  bio: 'There once was...',
  location: 'San Francisco',
  followers: 3938,
  following: 9,
  public_repos: 8
};

const formatted = formatApiResponse(response);
// {
//   login: 'octocat',
//   name: 'The Octocat',
//   profile_url: 'https://github.com/octocat',
//   ...
// }
```

**Key Concepts:**
- Defensive coding: handle missing fields
- Provide sensible defaults
- Add computed fields
- Standardize data structure

### 4. `checkApiResponse(response)`

**Purpose:** Validate that an API response contains required fields.

**Parameters:**
- `response` (any type) - The response to validate

**Returns:** An object `{ isValid: boolean, error: string | null }`

**Validation Rules:**
- Response must be an object
- Must have `login` field (non-empty string)
- Must have `avatar_url` field

**Examples:**
```javascript
checkApiResponse({ login: 'user', avatar_url: 'url' })
// Returns: { isValid: true, error: null }

checkApiResponse({ login: 'user' })
// Returns: { isValid: false, error: 'Response missing avatar_url field' }

checkApiResponse('not an object')
// Returns: { isValid: false, error: 'Response must be an object' }
```

**Key Concepts:**
- Runtime validation of API responses
- Fail fast on invalid data
- Meaningful error messages

### 5. `searchGithubUser(username)`

**Purpose:** Fetch a GitHub user's profile data.

**Parameters:**
- `username` (string) - The GitHub username to search

**Returns:** A Promise that resolves to the user object

**Behavior:**
1. Use `buildGithubUrl()` to create the API URL
2. Use `fetch()` with a User-Agent header (required by GitHub API)
3. Check response status and throw on errors
4. Parse JSON response
5. Return the parsed data

**Examples:**
```javascript
const user = await searchGithubUser('octocat');
// {
//   login: 'octocat',
//   name: 'The Octocat',
//   avatar_url: '...',
//   ...
// }

try {
  await searchGithubUser('invalid@@user');
} catch (error) {
  console.log('Error:', error.message);
}
```

**Key Concepts:**
- GitHub API requires User-Agent header
- HTTP status checking (200 = success, 404 = not found, 403 = rate limited)
- Error handling with meaningful messages

### 6. `getUserData(username)`

**Purpose:** Fetch and format user data in one call.

**Parameters:**
- `username` (string) - The GitHub username

**Returns:** A Promise that resolves to a formatted user object

**Behavior:**
1. Call `searchGithubUser(username)`
2. Call `formatApiResponse()` on the result
3. Return the formatted data

**Examples:**
```javascript
const user = await getUserData('gvanrossum');
// Includes computed fields like profile_url
```

**Key Concepts:**
- Composing multiple functions
- Consistent data structure for consumers

### 7. `cacheUserData(username, data)` and `getCachedUser(username)`

**Purpose:** Implement a simple in-memory cache for user data.

**cacheUserData Parameters:**
- `username` (string) - The username key
- `data` (object) - The user data to cache

**getCachedUser Parameters:**
- `username` (string) - The username to look up

**getCachedUser Returns:** 
- The cached user object, or `null` if not cached

**Examples:**
```javascript
cacheUserData('octocat', { login: 'octocat', ... });
const cached = getCachedUser('octocat');
// Returns the cached object

const notCached = getCachedUser('nobody');
// Returns null
```

**Key Concepts:**
- Using a module-level object as a cache
- Avoiding redundant API calls
- Improving application performance

### 8. `clearUserCache()`

**Purpose:** Clear all cached user data.

**Parameters:** None

**Returns:** Void

**Examples:**
```javascript
clearUserCache();
// All cached data is removed
```

### 9. `searchMultipleUsers(usernames)`

**Purpose:** Search for multiple GitHub users in parallel.

**Parameters:**
- `usernames` (array of strings) - Array of usernames to search

**Returns:** A Promise that resolves to an array of user objects

**Behavior:**
1. Use `Promise.all()` to make parallel requests
2. Map usernames to `searchGithubUser()` calls
3. Return array of formatted user objects

**Examples:**
```javascript
const users = await searchMultipleUsers(['torvalds', 'gvanrossum']);
// [
//   { login: 'torvalds', name: 'Linus Torvalds', ... },
//   { login: 'gvanrossum', name: 'Guido van Rossum', ... }
// ]
```

**Key Concepts:**
- Promise.all() for concurrent operations
- Array map and parallel execution
- Efficient multi-request patterns

## Implementation Tips

### GitHub API Basics

The GitHub REST API provides endpoints for accessing public data about users, repositories, and more.

**User Endpoint:** `GET https://api.github.com/users/{username}`

**Required Header:**
```javascript
headers: {
  'User-Agent': 'Your-App-Name' // Required by GitHub API
}
```

**Example Response:**
```json
{
  "login": "octocat",
  "id": 1,
  "node_id": "MDQ6VXNlcjE=",
  "avatar_url": "https://avatars.githubusercontent.com/u/1?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/octocat",
  "type": "User",
  "name": "The Octocat",
  "company": "@github",
  "blog": "https://github.blog",
  "location": "San Francisco",
  "email": null,
  "bio": "There once was...",
  "twitter_username": null,
  "public_repos": 8,
  "public_gists": 8,
  "followers": 3938,
  "following": 9,
  "created_at": "2011-01-25T18:44:36Z",
  "updated_at": "2022-01-01T19:01:42Z"
}
```

### Rate Limiting

GitHub API has rate limits:
- **Unauthenticated requests:** 60 requests per hour
- **Authenticated requests:** 5,000 requests per hour

Why caching is important! Use it to reduce API calls.

### Error Handling

Common HTTP status codes:
- `200` - Success
- `404` - User not found
- `403` - Rate limit exceeded (check `X-RateLimit-Remaining` header)
- `422` - Unprocessable entity (validation failed)

### Working with URLs

```javascript
// Method 1: String concatenation
const url = `https://api.github.com/users/${username}?per_page=50`;

// Method 2: URL constructor
const url = new URL('https://api.github.com/users/octocat');
url.searchParams.append('per_page', 50);

// Method 3: URLSearchParams (recommended for building params)
const params = new URLSearchParams({ per_page: 50 });
const url = `https://api.github.com/users/octocat?${params}`;
```

### Using URLSearchParams

```javascript
const params = new URLSearchParams();
params.append('per_page', 100);
params.append('sort', 'updated');
console.log(params.toString()); // 'per_page=100&sort=updated'

// Or with object initialization
const params = new URLSearchParams({ per_page: 100, sort: 'updated' });
```

### Testing with Mock Data

When testing API functions without making real requests:

```javascript
global.fetch = vi.fn().mockResolvedValueOnce({
  ok: true,
  json: async () => ({ login: 'octocat', ... })
});
```

## Common Patterns

### Pattern 1: Validate Before API Call

```javascript
async function searchGithubUser(username) {
  const validation = validateUsername(username);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }
  // Then make API call
}
```

### Pattern 2: Format on Return

```javascript
async function getUserData(username) {
  const response = await searchGithubUser(username);
  return formatApiResponse(response);
}
```

### Pattern 3: Check Response Validity

```javascript
async function searchGithubUser(username) {
  const response = await fetch(...);
  const data = await response.json();
  
  const check = checkApiResponse(data);
  if (!check.isValid) {
    throw new Error(check.error);
  }
  
  return data;
}
```

### Pattern 4: Parallel Requests

```javascript
async function searchMultipleUsers(usernames) {
  const promises = usernames.map(name => searchGithubUser(name));
  return await Promise.all(promises);
}
```

### Pattern 5: Caching Strategy

```javascript
async function searchGithubUser(username) {
  const cached = getCachedUser(username);
  if (cached) return cached;
  
  const data = await fetch(...);
  cacheUserData(username, data);
  return data;
}
```

## Testing Guide

### Test Categories

1. **URL Building Tests**
   - Basic URL without parameters
   - URLs with query parameters
   - Multiple query parameters

2. **Username Validation Tests**
   - Valid usernames
   - Empty strings
   - Usernames with spaces
   - Invalid characters
   - Length limits

3. **API Response Tests**
   - Valid responses
   - Missing fields
   - Invalid data types
   - Null/undefined values

4. **Caching Tests**
   - Storing and retrieving
   - Multiple items
   - Cache clearing
   - Null for missing items

5. **Integration Tests**
   - Mocked API calls
   - Error responses
   - Multiple parallel requests

### Testing Async Functions

```javascript
it('should fetch user data', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ login: 'user' })
  });
  
  const result = await searchGithubUser('user');
  expect(result.login).toBe('user');
});

it('should throw on network error', async () => {
  fetch.mockRejectedValueOnce(new Error('Network error'));
  await expect(searchGithubUser('user')).rejects.toThrow();
});
```

## Real-World Usage

### Example: Search and Display

```javascript
// User searches for a GitHub username
const username = 'torvalds';

// Validate input
const validation = validateUsername(username);
if (!validation.isValid) {
  console.error('Invalid username:', validation.error);
  return;
}

// Try to get from cache first
let user = getCachedUser(username);

if (!user) {
  // Not cached, fetch from API
  user = await getUserData(username);
}

// Display the user
console.log(`Name: ${user.name}`);
console.log(`Followers: ${user.followers}`);
console.log(`Public Repos: ${user.public_repos}`);
console.log(`Profile: ${user.profile_url}`);
```

### Example: Search Multiple Users

```javascript
async function compareUsers() {
  const creators = ['torvalds', 'gvanrossum', 'mojombo'];
  
  const users = await searchMultipleUsers(creators);
  
  // Find most followed
  const mostFollowed = users.reduce((max, user) => 
    user.followers > max.followers ? user : max
  );
  
  console.log(`Most followed: ${mostFollowed.name} (${mostFollowed.followers})`);
}
```

## Key Takeaways

1. **API Integration:** Learn how to work with real-world REST APIs
2. **URL Construction:** Build dynamic URLs with query parameters
3. **Data Validation:** Validate input and API responses
4. **Error Handling:** Handle network and API errors gracefully
5. **Caching:** Implement caching to optimize performance
6. **Parallel Requests:** Use Promise.all() for efficient multi-user fetches
7. **Formatting:** Standardize data structures for your application

## Resources

- [GitHub REST API Documentation](https://docs.github.com/en/rest)
- [GitHub Users Endpoint](https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user)
- [URLSearchParams Documentation](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## Next Steps

After completing this exercise:
- ✅ Continue to [Exercise 144: GitHub Display](../144-github-display) - Display user profiles
- ✅ Learn about rendering data in [Exercise 141: Weather Display](../141-weather-display)
- ✅ Explore advanced API patterns in [Exercise 142: Weather Multiple](../142-weather-multiple)
