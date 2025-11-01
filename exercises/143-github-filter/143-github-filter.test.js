import { describe, it, expect, vi } from 'vitest';
import {
  filterByMinStars,
  filterByMinForks,
  filterByDateRange,
  filterByTopics,
  filterBySize,
  filterArchived,
  createFilterPredicate,
  applyMultipleFilters,
  createFilterUI,
  buildFilterString
} from './143-github-filter.js';

const mockRepos = [
  { id: 1, name: 'repo1', stargazers_count: 100, forks_count: 10, size: 500, archived: false, updated_at: '2024-01-15', topics: ['javascript', 'web'] },
  { id: 2, name: 'repo2', stargazers_count: 1000, forks_count: 100, size: 5000, archived: false, updated_at: '2024-01-10', topics: ['python', 'data'] },
  { id: 3, name: 'repo3', stargazers_count: 50, forks_count: 5, size: 200, archived: true, updated_at: '2023-12-01', topics: [] }
];

describe('filterByMinStars', () => {
  it('should filter repos by minimum stars', () => {
    const filtered = filterByMinStars(mockRepos, 100);
    expect(filtered.every(r => r.stargazers_count >= 100)).toBe(true);
  });

  it('should include repos with exact min stars', () => {
    const filtered = filterByMinStars(mockRepos, 100);
    expect(filtered.length).toBeGreaterThan(0);
  });

  it('should return empty for high threshold', () => {
    const filtered = filterByMinStars(mockRepos, 10000);
    expect(filtered.length).toBe(0);
  });
});

describe('filterByMinForks', () => {
  it('should filter repos by minimum forks', () => {
    const filtered = filterByMinForks(mockRepos, 50);
    expect(filtered.every(r => r.forks_count >= 50)).toBe(true);
  });
});

describe('filterByDateRange', () => {
  it('should filter repos by date range', () => {
    const start = new Date('2024-01-01');
    const end = new Date('2024-01-20');
    const filtered = filterByDateRange(mockRepos, start, end);
    expect(filtered.length).toBeGreaterThan(0);
  });

  it('should handle ISO date strings', () => {
    const filtered = filterByDateRange(mockRepos, '2024-01-01', '2024-01-20');
    expect(filtered.length).toBeGreaterThan(0);
  });
});

describe('filterByTopics', () => {
  it('should filter repos by topics', () => {
    const filtered = filterByTopics(mockRepos, ['javascript']);
    expect(filtered.length).toBeGreaterThan(0);
  });

  it('should match any topic', () => {
    const filtered = filterByTopics(mockRepos, ['web', 'data']);
    expect(filtered.length).toBe(2);
  });
});

describe('filterBySize', () => {
  it('should filter repos by size range', () => {
    const filtered = filterBySize(mockRepos, 100, 1000);
    expect(filtered.every(r => r.size >= 100 && r.size <= 1000)).toBe(true);
  });
});

describe('filterArchived', () => {
  it('should exclude archived by default', () => {
    const filtered = filterArchived(mockRepos, false);
    expect(filtered.every(r => !r.archived)).toBe(true);
  });

  it('should include archived when requested', () => {
    const filtered = filterArchived(mockRepos, true);
    expect(filtered.length).toBe(mockRepos.length);
  });
});

describe('createFilterPredicate', () => {
  it('should create filter from criteria', () => {
    const criteria = { minStars: 100 };
    const predicate = createFilterPredicate(criteria);
    expect(typeof predicate).toBe('function');
  });

  it('should filter based on criteria', () => {
    const criteria = { minStars: 100 };
    const predicate = createFilterPredicate(criteria);
    expect(predicate(mockRepos[0])).toBe(true);
    expect(predicate(mockRepos[2])).toBe(false);
  });
});

describe('applyMultipleFilters', () => {
  it('should apply multiple filters', () => {
    const filters = [
      r => r.stargazers_count >= 100,
      r => r.forks_count >= 5
    ];
    const filtered = applyMultipleFilters(mockRepos, filters);
    expect(filtered.every(r => r.stargazers_count >= 100 && r.forks_count >= 5)).toBe(true);
  });

  it('should handle empty filters', () => {
    const filtered = applyMultipleFilters(mockRepos, []);
    expect(filtered.length).toBe(mockRepos.length);
  });
});

describe('buildFilterString', () => {
  it('should build query string', () => {
    const criteria = { minStars: 100, language: 'JavaScript' };
    const query = buildFilterString(criteria);
    expect(query).toContain('minStars=100');
    expect(query).toContain('language=JavaScript');
  });

  it('should handle empty criteria', () => {
    const query = buildFilterString({});
    expect(query).toBeDefined();
  });
});

describe('createFilterUI', () => {
  it('should create UI element', () => {
    const callback = vi.fn();
    const ui = createFilterUI(callback);
    expect(ui).toBeInstanceOf(HTMLElement);
  });

  it('should call callback on filter change', () => {
    const callback = vi.fn();
    const ui = createFilterUI(callback);
    const input = ui.querySelector('input');
    if (input) {
      input.value = '100';
      input.dispatchEvent(new Event('change'));
      expect(callback).toHaveBeenCalled();
    }
  });
});
