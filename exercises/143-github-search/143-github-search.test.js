/**
 * Test Suite for Exercise 143: GitHub User Search
 * Tests for all GitHub API search and user fetching functions
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  searchGithubUser,
  buildGithubUrl,
  getUserData,
  validateUsername,
  cacheUserData,
  getCachedUser,
  clearUserCache,
  formatApiResponse,
  checkApiResponse,
  searchMultipleUsers
} from './143-github-search.js';

// Mock fetch for testing
global.fetch = vi.fn();

const mockGithubResponse = {
  login: 'octocat',
  name: 'The Octocat',
  avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
  bio: 'There once was...',
  location: 'San Francisco',
  followers: 3938,
  following: 9,
  public_repos: 8,
  id: 1
};

describe('buildGithubUrl', () => {
  it('should build basic GitHub user URL', () => {
    const url = buildGithubUrl('octocat');
    expect(url).toContain('api.github.com/users/octocat');
  });

  it('should build URL with options', () => {
    const url = buildGithubUrl('torvalds', { per_page: 50 });
    expect(url).toContain('torvalds');
    expect(url).toContain('per_page=50');
  });

  it('should handle multiple query parameters', () => {
    const url = buildGithubUrl('gvanrossum', { per_page: 100, page: 2 });
    expect(url).toContain('gvanrossum');
    expect(url).toContain('per_page=100');
    expect(url).toContain('page=2');
  });

  it('should not add query string if no options', () => {
    const url = buildGithubUrl('test');
    expect(url).not.toContain('?');
  });

  it('should handle empty options object', () => {
    const url = buildGithubUrl('user', {});
    expect(url).toContain('api.github.com/users/user');
  });
});

describe('validateUsername', () => {
  it('should validate valid username', () => {
    const result = validateUsername('octocat');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });

  it('should reject empty username', () => {
    const result = validateUsername('');
    expect(result.isValid).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it('should reject username with spaces', () => {
    const result = validateUsername('octo cat');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('space');
  });

  it('should reject username with special characters', () => {
    const result = validateUsername('octo@cat');
    expect(result.isValid).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it('should accept username with hyphens', () => {
    const result = validateUsername('octo-cat');
    expect(result.isValid).toBe(true);
  });

  it('should reject username that is too long (>39 chars)', () => {
    const longUsername = 'a'.repeat(40);
    const result = validateUsername(longUsername);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('length');
  });

  it('should accept username at max length (39 chars)', () => {
    const maxUsername = 'a'.repeat(39);
    const result = validateUsername(maxUsername);
    expect(result.isValid).toBe(true);
  });

  it('should accept alphanumeric and hyphens', () => {
    const result = validateUsername('test-user-123');
    expect(result.isValid).toBe(true);
  });
});

describe('formatApiResponse', () => {
  it('should format valid GitHub response', () => {
    const formatted = formatApiResponse(mockGithubResponse);
    expect(formatted.login).toBe('octocat');
    expect(formatted.name).toBe('The Octocat');
    expect(formatted.avatar_url).toBeTruthy();
  });

  it('should add profile_url field', () => {
    const formatted = formatApiResponse(mockGithubResponse);
    expect(formatted.profile_url).toBe('https://github.com/octocat');
  });

  it('should include all required fields', () => {
    const formatted = formatApiResponse(mockGithubResponse);
    expect(formatted).toHaveProperty('login');
    expect(formatted).toHaveProperty('name');
    expect(formatted).toHaveProperty('avatar_url');
    expect(formatted).toHaveProperty('bio');
    expect(formatted).toHaveProperty('followers');
    expect(formatted).toHaveProperty('following');
    expect(formatted).toHaveProperty('public_repos');
  });

  it('should use login as name if name is null', () => {
    const response = { ...mockGithubResponse, name: null };
    const formatted = formatApiResponse(response);
    expect(formatted.name).toBe('octocat');
  });

  it('should set default bio if missing', () => {
    const response = { ...mockGithubResponse, bio: null };
    const formatted = formatApiResponse(response);
    expect(formatted.bio).toBeDefined();
  });

  it('should set default location if missing', () => {
    const response = { ...mockGithubResponse, location: null };
    const formatted = formatApiResponse(response);
    expect(formatted.location).toBe('Not specified');
  });
});

describe('checkApiResponse', () => {
  it('should validate correct response', () => {
    const check = checkApiResponse(mockGithubResponse);
    expect(check.isValid).toBe(true);
    expect(check.error).toBeNull();
  });

  it('should reject non-object response', () => {
    const check = checkApiResponse('not an object');
    expect(check.isValid).toBe(false);
    expect(check.error).toBeTruthy();
  });

  it('should reject response without login', () => {
    const response = { ...mockGithubResponse };
    delete response.login;
    const check = checkApiResponse(response);
    expect(check.isValid).toBe(false);
  });

  it('should reject response without avatar_url', () => {
    const response = { ...mockGithubResponse };
    delete response.avatar_url;
    const check = checkApiResponse(response);
    expect(check.isValid).toBe(false);
  });

  it('should reject response with empty login', () => {
    const response = { ...mockGithubResponse, login: '' };
    const check = checkApiResponse(response);
    expect(check.isValid).toBe(false);
  });

  it('should reject null response', () => {
    const check = checkApiResponse(null);
    expect(check.isValid).toBe(false);
  });
});

describe('cacheUserData and getCachedUser', () => {
  beforeEach(() => {
    clearUserCache();
  });

  it('should cache user data', () => {
    cacheUserData('octocat', mockGithubResponse);
    const cached = getCachedUser('octocat');
    expect(cached).toEqual(mockGithubResponse);
  });

  it('should return null for non-cached user', () => {
    const cached = getCachedUser('nonexistent');
    expect(cached).toBeNull();
  });

  it('should cache multiple users', () => {
    cacheUserData('user1', { login: 'user1' });
    cacheUserData('user2', { login: 'user2' });
    expect(getCachedUser('user1')).toEqual({ login: 'user1' });
    expect(getCachedUser('user2')).toEqual({ login: 'user2' });
  });

  it('should update cache when caching same user again', () => {
    cacheUserData('octocat', { login: 'octocat', followers: 100 });
    cacheUserData('octocat', { login: 'octocat', followers: 200 });
    expect(getCachedUser('octocat').followers).toBe(200);
  });

  it('should clear cache completely', () => {
    cacheUserData('user1', { login: 'user1' });
    cacheUserData('user2', { login: 'user2' });
    clearUserCache();
    expect(getCachedUser('user1')).toBeNull();
    expect(getCachedUser('user2')).toBeNull();
  });
});

describe('searchGithubUser', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should fetch GitHub user data', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockGithubResponse
    });

    const user = await searchGithubUser('octocat');
    expect(user.login).toBe('octocat');
    expect(fetch).toHaveBeenCalled();
  });

  it('should include User-Agent header', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockGithubResponse
    });

    await searchGithubUser('octocat');
    const call = fetch.mock.calls[0];
    expect(call[1]?.headers).toBeDefined();
  });

  it('should throw error on non-OK response', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    });

    await expect(searchGithubUser('invalid')).rejects.toThrow();
  });

  it('should throw error on network failure', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));
    await expect(searchGithubUser('octocat')).rejects.toThrow();
  });

  it('should return formatted user object', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockGithubResponse
    });

    const user = await searchGithubUser('octocat');
    expect(user).toHaveProperty('login');
    expect(user).toHaveProperty('avatar_url');
  });
});

describe('getUserData', () => {
  beforeEach(() => {
    fetch.mockClear();
    clearUserCache();
  });

  it('should return formatted user data', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockGithubResponse
    });

    const user = await getUserData('octocat');
    expect(user.login).toBe('octocat');
    expect(user.name).toBe('The Octocat');
  });

  it('should include profile_url in response', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockGithubResponse
    });

    const user = await getUserData('octocat');
    expect(user.profile_url).toContain('github.com/octocat');
  });

  it('should use name if available', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockGithubResponse
    });

    const user = await getUserData('octocat');
    expect(user.name).toBe('The Octocat');
  });
});

describe('searchMultipleUsers', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should fetch multiple users in parallel', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ login: 'user1', avatar_url: 'url1' })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ login: 'user2', avatar_url: 'url2' })
      });

    const users = await searchMultipleUsers(['user1', 'user2']);
    expect(users).toHaveLength(2);
    expect(users[0].login).toBe('user1');
    expect(users[1].login).toBe('user2');
  });

  it('should return empty array for empty input', async () => {
    const users = await searchMultipleUsers([]);
    expect(users).toEqual([]);
  });

  it('should make parallel requests', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ login: 'user1', avatar_url: 'url1' })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ login: 'user2', avatar_url: 'url2' })
      });

    await searchMultipleUsers(['user1', 'user2']);
    // All requests should be made at once (Promise.all behavior)
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('should handle single user in array', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockGithubResponse
    });

    const users = await searchMultipleUsers(['octocat']);
    expect(users).toHaveLength(1);
    expect(users[0].login).toBe('octocat');
  });
});
