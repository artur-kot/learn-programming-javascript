import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  fetchUserRepositories,
  sortRepositories,
  filterByLanguage,
  calculateRepoStats,
  formatRepoData,
  createRepoElement,
  renderRepositories,
  getRepositoriesByPage,
  searchRepositories,
  groupRepositoriesByLanguage
} from './142-github-repos.js';

global.fetch = vi.fn();

const mockRepos = [
  { id: 1, name: 'linux', description: 'Linux kernel', language: 'C', stargazers_count: 50000, forks_count: 5000, updated_at: '2024-01-15' },
  { id: 2, name: 'git', description: 'Git version control', language: 'C', stargazers_count: 30000, forks_count: 2000, updated_at: '2024-01-10' },
  { id: 3, name: 'cpython', description: 'Python interpreter', language: 'Python', stargazers_count: 40000, forks_count: 3000, updated_at: '2024-01-20' }
];

describe('sortRepositories', () => {
  it('should sort by stars descending by default', () => {
    const sorted = sortRepositories([...mockRepos], 'stars');
    expect(sorted[0].stargazers_count).toBeGreaterThanOrEqual(sorted[1].stargazers_count);
  });

  it('should sort by forks', () => {
    const sorted = sortRepositories([...mockRepos], 'forks');
    expect(sorted[0].forks_count).toBeGreaterThanOrEqual(sorted[1].forks_count);
  });

  it('should sort by name', () => {
    const sorted = sortRepositories([...mockRepos], 'name');
    expect(sorted[0].name <= sorted[1].name).toBe(true);
  });

  it('should sort by updated date', () => {
    const sorted = sortRepositories([...mockRepos], 'updated');
    expect(new Date(sorted[0].updated_at) >= new Date(sorted[1].updated_at)).toBe(true);
  });
});

describe('filterByLanguage', () => {
  it('should filter by language', () => {
    const filtered = filterByLanguage(mockRepos, 'C');
    expect(filtered.every(r => r.language === 'C')).toBe(true);
  });

  it('should be case-insensitive', () => {
    const filtered = filterByLanguage(mockRepos, 'python');
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered[0].language.toLowerCase()).toBe('python');
  });

  it('should return empty array for unknown language', () => {
    const filtered = filterByLanguage(mockRepos, 'Ruby');
    expect(filtered.length).toBe(0);
  });
});

describe('calculateRepoStats', () => {
  it('should calculate total repos', () => {
    const stats = calculateRepoStats(mockRepos);
    expect(stats.totalRepos).toBe(3);
  });

  it('should calculate total stars', () => {
    const stats = calculateRepoStats(mockRepos);
    expect(stats.totalStars).toBe(120000);
  });

  it('should calculate average stars', () => {
    const stats = calculateRepoStats(mockRepos);
    expect(stats.averageStars).toBe(40000);
  });

  it('should find most starred repo', () => {
    const stats = calculateRepoStats(mockRepos);
    expect(stats.mostStarred.name).toBe('linux');
  });

  it('should find most forked repo', () => {
    const stats = calculateRepoStats(mockRepos);
    expect(stats.mostForked.name).toBe('linux');
  });
});

describe('formatRepoData', () => {
  it('should format repo data', () => {
    const formatted = formatRepoData(mockRepos[0]);
    expect(formatted.name).toBe('linux');
    expect(formatted.language).toBe('C');
    expect(formatted.stars).toBe(50000);
  });

  it('should include all required fields', () => {
    const formatted = formatRepoData(mockRepos[0]);
    expect(formatted).toHaveProperty('name');
    expect(formatted).toHaveProperty('description');
    expect(formatted).toHaveProperty('url');
    expect(formatted).toHaveProperty('language');
  });
});

describe('createRepoElement', () => {
  it('should create repo element', () => {
    const repo = formatRepoData(mockRepos[0]);
    const element = createRepoElement(repo);
    expect(element).toBeInstanceOf(HTMLElement);
  });

  it('should have repo-item class', () => {
    const repo = formatRepoData(mockRepos[0]);
    const element = createRepoElement(repo);
    expect(element.className).toContain('repo-item');
  });

  it('should include repo name', () => {
    const repo = formatRepoData(mockRepos[0]);
    const element = createRepoElement(repo);
    expect(element.textContent).toContain('linux');
  });
});

describe('renderRepositories', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="repos"></div>';
  });

  it('should render repos in container', () => {
    renderRepositories(mockRepos, '#repos');
    const container = document.querySelector('#repos');
    expect(container.children.length).toBeGreaterThan(0);
  });

  it('should clear existing content', () => {
    const container = document.querySelector('#repos');
    container.innerHTML = '<p>Old</p>';
    renderRepositories(mockRepos, '#repos');
    expect(container.textContent).not.toContain('Old');
  });
});

describe('getRepositoriesByPage', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should fetch repositories with pagination', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockRepos
    });

    const repos = await getRepositoriesByPage('torvalds', 1, 30);
    expect(repos.length).toBeGreaterThan(0);
  });

  it('should include pagination params in URL', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });

    await getRepositoriesByPage('user', 2, 50);
    const url = fetch.mock.calls[0][0];
    expect(url).toContain('page=2');
    expect(url).toContain('per_page=50');
  });
});

describe('searchRepositories', () => {
  it('should search by name', () => {
    const results = searchRepositories(mockRepos, 'linux');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].name).toContain('linux');
  });

  it('should search by description', () => {
    const results = searchRepositories(mockRepos, 'kernel');
    expect(results.length).toBeGreaterThan(0);
  });

  it('should be case-insensitive', () => {
    const results = searchRepositories(mockRepos, 'PYTHON');
    expect(results.length).toBeGreaterThan(0);
  });

  it('should return empty for no matches', () => {
    const results = searchRepositories(mockRepos, 'nonexistent');
    expect(results.length).toBe(0);
  });
});

describe('groupRepositoriesByLanguage', () => {
  it('should group by language', () => {
    const grouped = groupRepositoriesByLanguage(mockRepos);
    expect(grouped).toHaveProperty('C');
    expect(grouped).toHaveProperty('Python');
  });

  it('should have arrays as values', () => {
    const grouped = groupRepositoriesByLanguage(mockRepos);
    expect(Array.isArray(grouped.C)).toBe(true);
  });

  it('should contain correct repos in groups', () => {
    const grouped = groupRepositoriesByLanguage(mockRepos);
    expect(grouped.C.length).toBe(2);
    expect(grouped.Python.length).toBe(1);
  });
});
