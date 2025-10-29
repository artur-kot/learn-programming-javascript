import Fastify from 'fastify';
import cors from '@fastify/cors';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fastify = Fastify({ logger: true });

// Register CORS
await fastify.register(cors, {
  origin: true,
});

// Load countries data
const countriesData = JSON.parse(
  readFileSync(join(__dirname, '../data/countries.json'), 'utf-8')
);

// Pre-index data for faster searching
const indexedCountries = createIndex(countriesData);

/**
 * Create search index for faster lookups
 * Maps each letter to countries that start with it
 */
function createIndex(countries) {
  const index = {};

  countries.forEach((country) => {
    const name = country.name.toLowerCase();
    const code = country.code.toLowerCase();

    // Index by first letter
    const firstLetter = name[0];
    if (!index[firstLetter]) {
      index[firstLetter] = [];
    }
    index[firstLetter].push(country);

    // Also index by code first letter
    if (code[0] !== firstLetter) {
      const codeLetter = code[0];
      if (!index[codeLetter]) {
        index[codeLetter] = [];
      }
      index[codeLetter].push(country);
    }
  });

  return index;
}

/**
 * Levenshtein distance for fuzzy matching
 * Measures similarity between two strings (0 = identical, higher = more different)
 */
function levenshteinDistance(a, b) {
  const aLower = a.toLowerCase();
  const bLower = b.toLowerCase();
  const matrix = [];

  for (let i = 0; i <= bLower.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= aLower.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= bLower.length; i++) {
    for (let j = 1; j <= aLower.length; j++) {
      if (bLower[i - 1] === aLower[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[bLower.length][aLower.length];
}

/**
 * Fuzzy match score (0-1, where 1 is perfect match)
 */
function fuzzyMatchScore(query, target) {
  const maxLen = Math.max(query.length, target.length);
  const distance = levenshteinDistance(query, target);
  return Math.max(0, 1 - distance / maxLen);
}

/**
 * Advanced search with fuzzy matching and scoring
 */
function advancedSearch(query, limit = 10) {
  const queryLower = query.toLowerCase();
  const results = [];

  // Score all countries
  const scored = countriesData.map((country) => {
    const nameLower = country.name.toLowerCase();
    const codeLower = country.code.toLowerCase();

    // Exact substring match (highest priority)
    if (nameLower.includes(queryLower) || codeLower.includes(queryLower)) {
      return {
        country,
        score: 1.0,
        matchType: 'exact',
      };
    }

    // Fuzzy match
    const nameScore = fuzzyMatchScore(queryLower, nameLower);
    const codeScore = fuzzyMatchScore(queryLower, codeLower);
    const score = Math.max(nameScore, codeScore);

    if (score > 0.6) {
      // Only include if reasonably close
      return {
        country,
        score,
        matchType: 'fuzzy',
      };
    }

    return null;
  });

  // Filter nulls and sort by score
  return scored
    .filter((item) => item !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => ({
      ...item.country,
      matchScore: item.score,
      matchType: item.matchType,
    }));
}

/**
 * GET /search?q=query
 * Advanced search with fuzzy matching
 */
fastify.get('/search', async (request, reply) => {
  const { q, limit = 10 } = request.query;

  if (!q || typeof q !== 'string' || q.trim().length === 0) {
    return reply.code(400).send({
      error: 'Query parameter "q" is required',
      results: [],
      total: 0,
    });
  }

  const results = advancedSearch(q.trim(), parseInt(limit, 10));

  return {
    query: q,
    results: results.map((r) => ({
      name: r.name,
      code: r.code,
      region: r.region,
      // Optionally include match details for debugging:
      // matchScore: r.matchScore,
      // matchType: r.matchType,
    })),
    total: results.length,
    timestamp: Date.now(),
  };
});

/**
 * GET /search-with-stats?q=query
 * Returns search results with performance metrics
 */
fastify.get('/search-with-stats', async (request, reply) => {
  const startTime = performance.now();
  const { q, limit = 10 } = request.query;

  if (!q || q.trim().length === 0) {
    return reply.code(400).send({ error: 'Query required', results: [] });
  }

  const results = advancedSearch(q.trim(), parseInt(limit, 10));
  const endTime = performance.now();

  return {
    query: q,
    results: results.map((r) => ({
      name: r.name,
      code: r.code,
      region: r.region,
    })),
    total: results.length,
    stats: {
      responseTimeMs: (endTime - startTime).toFixed(2),
      timestamp: new Date().toISOString(),
    },
  };
});

/**
 * GET /countries?limit=50
 */
fastify.get('/countries', async (request, reply) => {
  const { limit = 50 } = request.query;

  const countries = countriesData
    .slice(0, parseInt(limit, 10))
    .map((country) => ({
      name: country.name,
      code: country.code,
      region: country.region,
    }));

  return { countries, total: countries.length };
});

/**
 * GET /health
 */
fastify.get('/health', async (request, reply) => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    countriesIndexed: Object.keys(indexedCountries).length,
  };
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('✓ Optimized server running at http://localhost:3000');
    console.log('✓ Advanced search with fuzzy matching enabled');
    console.log('✓ Available endpoints:');
    console.log('  - GET /search?q=query');
    console.log('  - GET /search-with-stats?q=query');
    console.log('  - GET /countries?limit=50');
    console.log('  - GET /health');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
