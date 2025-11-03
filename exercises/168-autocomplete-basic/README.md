# Exercise 173: Autocomplete - Basic Setup

## Overview

This exercise introduces **full-stack development** with a real-world autocomplete search application. You'll build a backend API using **Fastify** and a frontend interface using **Vite**, learning how modern web applications separate concerns between server and client.

**Key Learning:** Building distributed applications where frontend and backend communicate through HTTP APIs.

---

## 🎯 Learning Objectives

By completing this exercise, you will:

1. **Understand Full-Stack Architecture**
   - Separate backend (server) from frontend (client)
   - Understand request/response cycles
   - Learn how browsers communicate with servers

2. **Build a REST API**
   - Create HTTP endpoints with Fastify
   - Handle query parameters
   - Return structured JSON responses
   - Implement error handling

3. **Create a Dynamic Frontend**
   - Use Vite for modern frontend development
   - Listen to user input events in real-time
   - Make asynchronous API calls with fetch()
   - Dynamically render results to the DOM

4. **Master Full-Stack Communication**
   - Understand CORS (Cross-Origin Resource Sharing)
   - Make cross-domain HTTP requests
   - Handle API responses and errors
   - Build responsive user interactions

---

## 📋 Project Structure

```
173-autocomplete-basic/
├── backend/                    # Node.js/Fastify server
│   ├── package.json           # Backend dependencies
│   ├── src/
│   │   └── server.js          # Fastify HTTP server
│   └── data/
│       └── countries.json     # Countries dataset
│
├── frontend/                   # Vite frontend app
│   ├── package.json           # Frontend dependencies & Vite config
│   ├── vite.config.js         # Vite configuration
│   ├── index.html             # HTML entry point
│   └── src/
│       ├── main.js            # Frontend application logic
│       └── style.css          # Styling
│
└── README.md                   # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Basic understanding of:
  - JavaScript functions and async/await
  - HTML/CSS basics
  - Terminal/command line
  - npm (Node Package Manager)

### Installation & Running

#### Backend Setup

```bash
# Navigate to backend directory
cd exercises/173-autocomplete-basic/backend

# Install dependencies
npm install

# Start the server
npm start
# Or for development with auto-reload:
npm run dev

# Server will run on http://localhost:3000
```

#### Frontend Setup (in a new terminal)

```bash
# Navigate to frontend directory
cd exercises/173-autocomplete-basic/frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Frontend will open at http://localhost:5173
```

**✓ Both servers running?** Open http://localhost:5173 and start typing a country name!

---

## 🏗️ Architecture Explained

### Request/Response Flow

```
User Types "united"
        ↓
JavaScript captures 'input' event
        ↓
fetch() makes HTTP GET request
        ↓
Browser sends: GET http://localhost:3000/search?q=united&limit=10
        ↓
Fastify server receives request
        ↓
Server searches countries.json dataset
        ↓
Server returns JSON: { query, results: [...], total }
        ↓
Browser receives response
        ↓
JavaScript parses JSON
        ↓
JavaScript creates HTML for each result
        ↓
HTML inserted into DOM
        ↓
User sees "United States", "United Kingdom", etc.
```

### Component Breakdown

**Backend (Fastify Server)**
- Runs on port 3000
- Loads 250+ countries from JSON file
- Exposes `/search` endpoint that:
  - Accepts query parameter `q`
  - Filters countries by name/code
  - Returns matching results as JSON
- Implements CORS headers for frontend access

**Frontend (Vite App)**
- Runs on port 5173
- Provides search input field
- Listens for user typing
- Fetches results from `/search` endpoint
- Renders results dynamically
- Displays search stats

---

## 📚 Code Walkthrough

### Backend: Fastify Server (`backend/src/server.js`)

#### Key Concepts

**1. Framework Setup**
```javascript
import Fastify from 'fastify';
import cors from '@fastify/cors';

const fastify = Fastify({ logger: true });
await fastify.register(cors, { origin: true });
```
- Fastify is a lightweight, fast HTTP framework
- CORS plugin enables cross-origin requests from frontend

**2. Loading Data**
```javascript
const countriesData = JSON.parse(
  readFileSync(join(__dirname, '../data/countries.json'), 'utf-8')
);
```
- Reads JSON file containing all countries
- Parsed once at startup (not on every request)

**3. Search Endpoint**
```javascript
fastify.get('/search', async (request, reply) => {
  const { q, limit = 10 } = request.query;
  
  // Validate input
  if (!q || q.trim().length === 0) {
    return reply.code(400).send({ error: '...', results: [] });
  }
  
  // Filter matching countries
  const results = countriesData
    .filter(country => 
      country.name.toLowerCase().includes(q.toLowerCase()) ||
      country.code.toLowerCase().includes(q.toLowerCase())
    )
    .slice(0, parseInt(limit, 10));
  
  return { query: q, results, total: results.length };
});
```

**What's happening:**
- Route: `GET /search` (must visit http://localhost:3000/search?q=something)
- Query params: `q` (required), `limit` (optional, default 10)
- Logic: Filter countries where name or code includes query string
- Returns: JSON object with query, results array, and total count

---

### Frontend: Vite App (`frontend/src/main.js`)

#### Key Concepts

**1. Configuration**
```javascript
const CONFIG = {
  API_BASE_URL: 'http://localhost:3000',
  DEFAULT_LIMIT: 10,
};
```
- Centralizes settings (easy to change later)
- API_BASE_URL tells frontend where backend is

**2. DOM References**
```javascript
const elements = {
  searchInput: document.getElementById('searchInput'),
  resultsContainer: document.getElementById('resultsContainer'),
  // ...
};
```
- Cache DOM elements to avoid repeated queries
- Better performance than querySelector on every use

**3. Fetching Data**
```javascript
async function fetchResults(query, limit = CONFIG.DEFAULT_LIMIT) {
  const url = new URL(`${CONFIG.API_BASE_URL}/search`);
  url.searchParams.append('q', query);
  url.searchParams.append('limit', limit);
  
  const response = await fetch(url.toString());
  const data = await response.json();
  return data;
}
```

**What's happening:**
- `new URL()` safely constructs URL with parameters
- `url.searchParams` handles query string encoding
- `fetch()` makes HTTP request to backend
- `await` pauses execution until response received
- `.json()` parses JSON response

**4. Rendering Results**
```javascript
function renderResults(results) {
  const html = results
    .map(country => `
      <div class="result-item" data-code="${country.code}">
        <div class="result-name">${country.name}</div>
        <div class="result-meta">
          <span class="badge">${country.code}</span>
          <span class="region">${country.region}</span>
        </div>
      </div>
    `)
    .join('');
  
  elements.resultsContainer.innerHTML = html;
}
```

**What's happening:**
- `.map()` transforms each country object to HTML string
- Template literals (backticks) for cleaner HTML
- `.join('')` combines array into single string
- `innerHTML` inserts HTML into DOM

**5. Event Listener**
```javascript
elements.searchInput.addEventListener('input', handleSearch);
```

**What's happening:**
- `'input'` event fires on every keystroke
- When triggered, `handleSearch()` is called
- `handleSearch()` fetches and renders results

---

## 🔄 Full Interaction Example

**User Actions:**
1. User opens http://localhost:5173
2. User types "f" in search box

**Frontend Processing:**
```javascript
// Event triggered
handleSearch() {
  query = "f"
  
  // Fetch from backend
  fetchResults("f", 10)
    // Makes HTTP request to: http://localhost:3000/search?q=f&limit=10
}
```

**Backend Processing:**
```javascript
// Server receives GET /search?q=f&limit=10
fastify.get('/search', async (request, reply) => {
  q = "f"  // from query params
  
  // Filter countries
  const results = countriesData.filter(country =>
    country.name.toLowerCase().includes("f") ||
    country.code.toLowerCase().includes("f")
  )
  // Results: Finland, France, Fiji, ... (all countries containing "f")
  
  return { query: "f", results, total: 127 }
})
```

**Response Sent:**
```json
{
  "query": "f",
  "results": [
    { "name": "Fiji", "code": "FJ", "region": "Oceania" },
    { "name": "Finland", "code": "FI", "region": "Europe" },
    { "name": "France", "code": "FR", "region": "Europe" },
    // ... more results
  ],
  "total": 10  // limited to 10
}
```

**Frontend Rendering:**
```javascript
// Parse response
state.results = response.results

// Render results
renderResults(response.results)
// Creates HTML: <div class="result-item">...</div> for each result
// Inserts into DOM
```

**User Sees:** List of countries matching "f"

---

## 🧪 Testing the API

You can test the backend API directly using curl or a browser:

**Browser:** Visit these URLs directly

```
http://localhost:3000/search?q=united
http://localhost:3000/search?q=st&limit=5
http://localhost:3000/countries
http://localhost:3000/health
```

**Terminal (curl):**
```bash
# From backend directory
curl "http://localhost:3000/search?q=united"
curl "http://localhost:3000/search?q=st&limit=5"
```

**Expected Response:**
```json
{
  "query": "united",
  "results": [
    { "name": "United States", "code": "US", "region": "North America" },
    { "name": "United Kingdom", "code": "GB", "region": "Europe" },
    { "name": "United Arab Emirates", "code": "AE", "region": "Asia" }
  ],
  "total": 3
}
```

---

## 📖 Key Concepts Explained

### REST API
- **REST** = Representational State Transfer
- Uses HTTP methods: GET (retrieve), POST (create), PUT (update), DELETE (remove)
- This exercise uses GET requests
- Each endpoint = a unique URL that returns data

### HTTP Request/Response
- **Request:** Client sends request to server with method (GET) and URL
- **Response:** Server processes and returns data (usually JSON) + status code
- Status codes: 200 (OK), 400 (Bad Request), 500 (Server Error)

### Asynchronous Programming
- JavaScript can't wait for network request (would freeze UI)
- `fetch()` returns a **Promise** - a placeholder for future value
- `await` pauses execution until Promise resolves
- This lets UI stay responsive while waiting for server

### CORS (Cross-Origin Resource Sharing)
- Browsers block requests to different domains/ports by default
- CORS headers tell browser "yes, this cross-origin request is allowed"
- `@fastify/cors` plugin adds these headers automatically

### Event Listeners
- `addEventListener('input', handler)` = "run handler when user types"
- `'input'` event fires continuously (every keystroke)
- Good for real-time search, will be optimized in Exercise 174

---

## 🎓 Common Issues & Troubleshooting

### "Cannot GET /search"
**Problem:** Backend not running
**Solution:** 
```bash
cd backend && npm start
# Check http://localhost:3000/health
```

### "Failed to fetch" / CORS errors
**Problem:** Frontend can't reach backend
**Solution:**
- Ensure backend is running on port 3000
- Check API_BASE_URL in frontend/src/main.js
- Frontend should be on 5173, backend on 3000

### Results not appearing
**Problem:** Frontend/backend miscommunication
**Solution:**
```javascript
// Add logging in frontend/src/main.js
console.log('Fetching from:', url.toString());
console.log('Response:', data);
```

### Slow performance / many API calls
**Problem:** Every keystroke makes API request (expected in this basic version)
**Solution:** This is addressed in Exercise 174 with debouncing

---

## 📚 Learning Resources

### Fastify Documentation
- https://www.fastify.io/
- Routing: https://www.fastify.io/docs/latest/Guides/Getting-Started/
- Request/Reply: https://www.fastify.io/docs/latest/Guides/Request-Reply/

### Vite Documentation
- https://vitejs.dev/
- Getting started: https://vitejs.dev/guide/

### Fetch API
- MDN: https://developer.mozilla.org/en-US/docs/Web/API/fetch
- Examples: https://developer.mozilla.org/en-US/docs/Web/API/fetch/Using_Fetch

### REST API Design
- REST Best Practices: https://restfulapi.net/
- Status Codes: https://restfulapi.net/http-status-codes/

---

## 💡 Challenges & Exploration

Try these to deepen your understanding:

### 1. Add a `/suggest` endpoint
Create a new endpoint that returns popular countries:
```javascript
fastify.get('/suggest', async (request, reply) => {
  // Return top 10 most populous countries
  return { results: [...] };
});
```

### 2. Add regional filtering
Modify frontend to filter by region:
```javascript
// In frontend search
if (selectedRegion) {
  results = results.filter(c => c.region === selectedRegion);
}
```

### 3. Add fuzzy search
Instead of exact substring match, find similar spellings:
```javascript
// Levenshtein distance or simple algorithm
function fuzzyMatch(query, target) {
  // Returns match score (0-1)
}
```

### 4. Cache results locally
Store previous searches in frontend:
```javascript
const cache = new Map();

async function fetchResults(query) {
  if (cache.has(query)) return cache.get(query);
  
  const results = await fetch(...);
  cache.set(query, results);
  return results;
}
```

### 5. Add keyboard navigation
Use arrow keys to navigate results and Enter to select

---

## 🎯 What's Next? (Exercise 174)

The next exercise builds on this foundation with **performance optimizations:**

- **Debouncing:** Reduce API calls (wait after user stops typing)
- **Client-side Caching:** Store previous searches
- **Lazy Loading:** Load results only when scrolled to
- **Keyboard Navigation:** Use arrow keys to navigate
- **Better Search:** Fuzzy matching, sorting by relevance
- **Throttling:** Rate-limiting API requests

**Progress:** From "basic setup" to "production-ready autocomplete"

---

## 📝 Exercises & Tasks

### Task 1: Understand the Architecture ✓
- [ ] Run both backend and frontend
- [ ] Open browser console (F12) and check Network tab
- [ ] Search for a country and observe network requests
- [ ] Examine JSON response in Network tab

### Task 2: Modify Search Behavior
- [ ] Change search to match only at the start of country names (not substring)
  - Hint: Use `.startsWith()` instead of `.includes()`
- [ ] Change default limit from 10 to 5
- [ ] Test with different queries

### Task 3: Add Country Population
- [ ] Update countries.json to include population field
- [ ] Display population in results
- [ ] Sort results by population (highest first)

### Task 4: Improve UI
- [ ] Add a "clear" button (X icon) to search input
- [ ] Add loading spinner while fetching
- [ ] Show "no results" message better
- [ ] Add keyboard support (Enter to select, Esc to clear)

### Task 5: Error Handling
- [ ] Test what happens with very long queries (>100 chars)
- [ ] Test with special characters
- [ ] Add backend validation and frontend error display

---

## ✅ Success Criteria

You've successfully completed Exercise 173 when:

- ✅ Backend starts without errors on `npm start`
- ✅ Frontend starts without errors on `npm run dev`
- ✅ Typing in search box shows country results
- ✅ Results update in real-time as you type
- ✅ Searching "united" shows "United States", "United Kingdom", etc.
- ✅ Searching empty query clears results
- ✅ Results show country code and region
- ✅ API can be tested directly: http://localhost:3000/search?q=test
- ✅ Frontend and backend communicate successfully (check Network tab)
- ✅ No console errors in browser or terminal

---

## 📊 Key Takeaways

### Architecture
- Modern web apps split into frontend (client) and backend (server)
- They communicate via HTTP (REST APIs)
- Each runs independently and can be scaled separately

### HTTP Communication
- Frontend uses `fetch()` to make requests
- Backend uses framework (Fastify) to handle requests
- Data exchanged as JSON

### Real-Time Interactivity
- Event listeners make UI responsive
- Async/await prevents UI freezing
- DOM manipulation reflects server state

### Development Workflow
- Two separate development servers (frontend port 5173, backend port 3000)
- Frontend hot-reloads changes (Vite)
- Backend can use `--watch` for auto-reload
- Simulate real-world multi-server environment

---

## 🎉 Ready for Exercise 174?

Once you've mastered this exercise, Exercise 174 adds performance optimizations:
- Debouncing/throttling
- Caching strategies
- Advanced search algorithms
- Better UX patterns

Keep the basic version running as reference while building the optimized version!

---

**Happy Coding! 🚀**
