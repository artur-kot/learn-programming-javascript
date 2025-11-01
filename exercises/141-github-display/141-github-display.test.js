/**
 * Test Suite for Exercise 144: GitHub User Display
 * Tests for DOM manipulation and profile rendering functions
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  createProfileCard,
  formatUserStats,
  createStatsRow,
  createProfileHeader,
  createProfileBio,
  renderProfile,
  createLoadingState,
  createErrorState,
  displayUserProfile,
  attachProfileClickListener
} from './141-github-display.js';

const mockUser = {
  login: 'octocat',
  name: 'The Octocat',
  avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
  bio: 'There once was...',
  location: 'San Francisco',
  followers: 3938,
  following: 9,
  public_repos: 8,
  profile_url: 'https://github.com/octocat'
};

describe('formatUserStats', () => {
  it('should format stats for normal numbers', () => {
    const stats = formatUserStats({ followers: 100, following: 50, public_repos: 25 });
    expect(stats.followers).toBe('100');
    expect(stats.following).toBe('50');
    expect(stats.repos).toBe('25');
  });

  it('should format thousands with K', () => {
    const stats = formatUserStats({ followers: 3938, following: 1000, public_repos: 5000 });
    expect(stats.followers).toContain('3');
    expect(stats.followers).toContain('K');
  });

  it('should format millions with M', () => {
    const stats = formatUserStats({ followers: 1500000, following: 100, public_repos: 50 });
    expect(stats.followers).toContain('M');
  });

  it('should handle zero values', () => {
    const stats = formatUserStats({ followers: 0, following: 0, public_repos: 0 });
    expect(stats.followers).toBe('0');
  });

  it('should return object with correct keys', () => {
    const stats = formatUserStats(mockUser);
    expect(stats).toHaveProperty('followers');
    expect(stats).toHaveProperty('following');
    expect(stats).toHaveProperty('repos');
  });
});

describe('createStatsRow', () => {
  it('should create a stat row element', () => {
    const row = createStatsRow('Followers', '100');
    expect(row).toBeInstanceOf(HTMLElement);
  });

  it('should contain label and value', () => {
    const row = createStatsRow('Followers', '100');
    expect(row.textContent).toContain('Followers');
    expect(row.textContent).toContain('100');
  });

  it('should handle numeric values', () => {
    const row = createStatsRow('Repos', 8);
    expect(row.textContent).toContain('8');
  });

  it('should have appropriate CSS class', () => {
    const row = createStatsRow('Test', 'value');
    expect(row.className).toContain('stat-row');
  });
});

describe('createProfileHeader', () => {
  it('should create header element', () => {
    const header = createProfileHeader(mockUser);
    expect(header).toBeInstanceOf(HTMLElement);
  });

  it('should include user name', () => {
    const header = createProfileHeader(mockUser);
    expect(header.textContent).toContain('The Octocat');
  });

  it('should include username', () => {
    const header = createProfileHeader(mockUser);
    expect(header.textContent).toContain('octocat');
  });

  it('should include avatar image', () => {
    const header = createProfileHeader(mockUser);
    const img = header.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.src).toContain('avatars.githubusercontent.com');
  });

  it('should have header CSS class', () => {
    const header = createProfileHeader(mockUser);
    expect(header.className).toContain('profile-header');
  });
});

describe('createProfileBio', () => {
  it('should create bio element', () => {
    const bio = createProfileBio('Sample bio');
    expect(bio).toBeInstanceOf(HTMLElement);
  });

  it('should display bio text', () => {
    const bio = createProfileBio('There once was...');
    expect(bio.textContent).toContain('There once was...');
  });

  it('should show placeholder for empty bio', () => {
    const bio = createProfileBio('');
    expect(bio.textContent).toBeTruthy();
    expect(bio.textContent).not.toBe('');
  });

  it('should show placeholder for null bio', () => {
    const bio = createProfileBio(null);
    expect(bio.textContent).toBeTruthy();
  });

  it('should have bio CSS class', () => {
    const bio = createProfileBio('Test');
    expect(bio.className).toContain('profile-bio');
  });
});

describe('createProfileCard', () => {
  it('should create card element', () => {
    const card = createProfileCard(mockUser);
    expect(card).toBeInstanceOf(HTMLElement);
  });

  it('should include avatar', () => {
    const card = createProfileCard(mockUser);
    const img = card.querySelector('img');
    expect(img).toBeTruthy();
  });

  it('should include user name', () => {
    const card = createProfileCard(mockUser);
    expect(card.textContent).toContain('The Octocat');
  });

  it('should include bio', () => {
    const card = createProfileCard(mockUser);
    expect(card.textContent).toContain('There once was');
  });

  it('should include stats', () => {
    const card = createProfileCard(mockUser);
    expect(card.textContent).toContain('Followers');
    expect(card.textContent).toContain('Following');
  });

  it('should include location', () => {
    const card = createProfileCard(mockUser);
    expect(card.textContent).toContain('San Francisco');
  });

  it('should have profile-card CSS class', () => {
    const card = createProfileCard(mockUser);
    expect(card.className).toContain('profile-card');
  });

  it('should include link to profile', () => {
    const card = createProfileCard(mockUser);
    const link = card.querySelector('a');
    expect(link).toBeTruthy();
    expect(link.href).toContain('github.com/octocat');
  });
});

describe('createLoadingState', () => {
  it('should create loading element', () => {
    const loading = createLoadingState();
    expect(loading).toBeInstanceOf(HTMLElement);
  });

  it('should contain loading text', () => {
    const loading = createLoadingState();
    expect(loading.textContent.toLowerCase()).toContain('loading');
  });

  it('should have loading CSS class', () => {
    const loading = createLoadingState();
    expect(loading.className).toContain('loading');
  });

  it('should have spinner element', () => {
    const loading = createLoadingState();
    expect(loading.querySelector('.spinner')).toBeTruthy();
  });
});

describe('createErrorState', () => {
  it('should create error element', () => {
    const error = createErrorState('User not found');
    expect(error).toBeInstanceOf(HTMLElement);
  });

  it('should display error message', () => {
    const error = createErrorState('User not found');
    expect(error.textContent).toContain('User not found');
  });

  it('should have error CSS class', () => {
    const error = createErrorState('Test error');
    expect(error.className).toContain('error');
  });

  it('should handle different error messages', () => {
    const error1 = createErrorState('Network error');
    const error2 = createErrorState('Invalid username');
    expect(error1.textContent).toContain('Network error');
    expect(error2.textContent).toContain('Invalid username');
  });
});

describe('renderProfile', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="profile-container"></div>';
  });

  it('should render profile in container', () => {
    renderProfile('#profile-container', mockUser);
    const container = document.querySelector('#profile-container');
    expect(container.children.length).toBeGreaterThan(0);
  });

  it('should clear existing content', () => {
    const container = document.querySelector('#profile-container');
    container.innerHTML = '<p>Old content</p>';
    renderProfile('#profile-container', mockUser);
    expect(container.textContent).not.toContain('Old content');
  });

  it('should display user name in rendered profile', () => {
    renderProfile('#profile-container', mockUser);
    const container = document.querySelector('#profile-container');
    expect(container.textContent).toContain('The Octocat');
  });

  it('should find container by ID', () => {
    document.body.innerHTML = '<div id="my-profile"></div>';
    renderProfile('#my-profile', mockUser);
    const container = document.querySelector('#my-profile');
    expect(container.children.length).toBeGreaterThan(0);
  });
});

describe('displayUserProfile', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="profile-container"></div>';
  });

  it('should display profile for valid user data', () => {
    displayUserProfile(mockUser, '#profile-container');
    const container = document.querySelector('#profile-container');
    expect(container.textContent).toContain('The Octocat');
  });

  it('should display error for null user data', () => {
    displayUserProfile(null, '#profile-container');
    const container = document.querySelector('#profile-container');
    expect(container.textContent.toLowerCase()).toContain('error');
  });

  it('should clear container before displaying', () => {
    const container = document.querySelector('#profile-container');
    container.innerHTML = '<p>Old</p>';
    displayUserProfile(mockUser, '#profile-container');
    expect(container.textContent).not.toContain('Old');
  });

  it('should show profile card for valid data', () => {
    displayUserProfile(mockUser, '#profile-container');
    const container = document.querySelector('#profile-container');
    expect(container.querySelector('.profile-card')).toBeTruthy();
  });

  it('should show error for null data', () => {
    displayUserProfile(null, '#profile-container');
    const container = document.querySelector('#profile-container');
    expect(container.querySelector('.error')).toBeTruthy();
  });
});

describe('attachProfileClickListener', () => {
  it('should attach click listener to element', () => {
    const element = document.createElement('div');
    const callback = vi.fn();
    attachProfileClickListener(element, callback);
    element.click();
    expect(callback).toHaveBeenCalled();
  });

  it('should call callback with user data on click', () => {
    const element = document.createElement('div');
    element.dataset.login = 'octocat';
    element.dataset.name = 'The Octocat';
    
    const callback = vi.fn();
    attachProfileClickListener(element, callback);
    element.click();
    
    expect(callback).toHaveBeenCalledWith(expect.objectContaining({
      login: 'octocat'
    }));
  });

  it('should handle multiple clicks', () => {
    const element = document.createElement('div');
    const callback = vi.fn();
    attachProfileClickListener(element, callback);
    
    element.click();
    element.click();
    element.click();
    
    expect(callback).toHaveBeenCalledTimes(3);
  });
});
