import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  saveTheme,
  getTheme,
  removeTheme,
  saveUserPreferences,
  getUserPreferences
} from './100-theme-storage.js';

describe('Theme Switcher - Save Preference', () => {
  let dom;
  let window;
  let localStorage;

  beforeEach(() => {
    dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
      url: 'http://localhost'
    });
    window = dom.window;
    localStorage = window.localStorage;
    global.window = window;
    global.localStorage = localStorage;
    localStorage.clear();
  });

  describe('saveTheme', () => {
    it('should save theme to localStorage', () => {
      saveTheme('dark');
      expect(localStorage.getItem('theme')).toBe('dark');
    });

    it('should overwrite previous theme', () => {
      saveTheme('dark');
      expect(localStorage.getItem('theme')).toBe('dark');
      saveTheme('light');
      expect(localStorage.getItem('theme')).toBe('light');
    });

    it('should handle different theme names', () => {
      saveTheme('auto');
      expect(localStorage.getItem('theme')).toBe('auto');
    });
  });

  describe('getTheme', () => {
    it('should return saved theme', () => {
      localStorage.setItem('theme', 'dark');
      const theme = getTheme();
      expect(theme).toBe('dark');
    });

    it('should return default if no theme saved', () => {
      const theme = getTheme();
      expect(theme).toBeDefined();
    });

    it('should return correct theme after save', () => {
      saveTheme('light');
      const theme = getTheme();
      expect(theme).toBe('light');
    });
  });

  describe('removeTheme', () => {
    it('should remove theme from storage', () => {
      saveTheme('dark');
      expect(localStorage.getItem('theme')).toBe('dark');
      removeTheme();
      expect(localStorage.getItem('theme')).toBeNull();
    });

    it('should handle removing non-existent theme', () => {
      removeTheme();
      expect(localStorage.getItem('theme')).toBeNull();
    });

    it('should allow saving new theme after removal', () => {
      saveTheme('dark');
      removeTheme();
      saveTheme('light');
      expect(localStorage.getItem('theme')).toBe('light');
    });
  });

  describe('saveUserPreferences', () => {
    it('should save preferences object as JSON', () => {
      const prefs = {
        theme: 'dark',
        fontSize: '16px'
      };
      saveUserPreferences(prefs);
      const saved = JSON.parse(localStorage.getItem('preferences'));
      expect(saved.theme).toBe('dark');
      expect(saved.fontSize).toBe('16px');
    });

    it('should save multiple preferences', () => {
      const prefs = {
        theme: 'dark',
        fontSize: '16px',
        language: 'en',
        notifications: true
      };
      saveUserPreferences(prefs);
      const saved = JSON.parse(localStorage.getItem('preferences'));
      expect(Object.keys(saved).length).toBe(4);
    });

    it('should overwrite previous preferences', () => {
      saveUserPreferences({ theme: 'dark' });
      saveUserPreferences({ theme: 'light', fontSize: '18px' });
      const saved = JSON.parse(localStorage.getItem('preferences'));
      expect(saved.theme).toBe('light');
      expect(saved.fontSize).toBe('18px');
    });

    it('should handle empty preferences', () => {
      saveUserPreferences({});
      expect(localStorage.getItem('preferences')).toBe('{}');
    });
  });

  describe('getUserPreferences', () => {
    it('should return saved preferences', () => {
      const prefs = {
        theme: 'dark',
        fontSize: '16px'
      };
      saveUserPreferences(prefs);
      const retrieved = getUserPreferences();
      expect(retrieved.theme).toBe('dark');
      expect(retrieved.fontSize).toBe('16px');
    });

    it('should return empty object if no preferences', () => {
      const prefs = getUserPreferences();
      expect(typeof prefs).toBe('object');
    });

    it('should return all saved preferences', () => {
      const prefs = {
        theme: 'dark',
        fontSize: '16px',
        language: 'en',
        notifications: true
      };
      saveUserPreferences(prefs);
      const retrieved = getUserPreferences();
      expect(Object.keys(retrieved).length).toBe(4);
    });

    it('should parse JSON correctly', () => {
      saveUserPreferences({ theme: 'dark' });
      const prefs = getUserPreferences();
      expect(typeof prefs).toBe('object');
      expect(prefs.theme).toBe('dark');
    });
  });
});
