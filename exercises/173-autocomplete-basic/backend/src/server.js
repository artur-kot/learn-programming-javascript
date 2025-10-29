import Fastify from 'fastify';
import cors from '@fastify/cors';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fastify = Fastify({ logger: true });

// Register CORS for frontend communication
await fastify.register(cors, {
  origin: true,
});

// Load countries data
const countriesData = JSON.parse(
  readFileSync(join(__dirname, '../data/countries.json'), 'utf-8')
);

/**
 * GET /search?q=query
 * Search for countries by name (case-insensitive)
 * 
 * Query Parameters:
 *   - q: search query string (required)
 *   - limit: max results to return (default: 10)
 * 
 * Returns: { results: [{ name, code, region }], total: number }
 */
fastify.get('/search', async (request, reply) => {
  const { q, limit = 10 } = request.query;

  // Validate input
  if (!q || typeof q !== 'string' || q.trim().length === 0) {
    return reply.code(400).send({
      error: 'Query parameter "q" is required and must be non-empty',
      results: [],
      total: 0,
    });
  }

  const query = q.trim().toLowerCase();

  // Filter countries by query
  const results = countriesData
    .filter((country) =>
      country.name.toLowerCase().includes(query) ||
      country.code.toLowerCase().includes(query)
    )
    .slice(0, parseInt(limit, 10))
    .map((country) => ({
      name: country.name,
      code: country.code,
      region: country.region,
    }));

  return {
    query,
    results,
    total: results.length,
  };
});

/**
 * GET /countries
 * Get all countries (useful for initial load or reference)
 * 
 * Query Parameters:
 *   - limit: max results to return (default: 50)
 * 
 * Returns: { countries: [...], total: number }
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

  return {
    countries,
    total: countries.length,
  };
});

/**
 * GET /health
 * Health check endpoint
 */
fastify.get('/health', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('✓ Server running at http://localhost:3000');
    console.log('✓ Autocomplete API available at GET /search?q=query');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
