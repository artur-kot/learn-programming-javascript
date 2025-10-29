import { describe, it, expect, beforeEach } from 'vitest';
import {
  createHistoryManager,
  pushState,
  undo,
  redo,
  getCurrentState,
  getHistory,
  canUndo,
  canRedo,
  clearHistory,
  getHistoryStats
} from './157-notes-undo.js';

describe('Notes Undo/Redo & History', () => {
  let history;
  const initialState = [];
  const state1 = [{ id: 1, title: 'Note 1' }];
  const state2 = [{ id: 1, title: 'Note 1' }, { id: 2, title: 'Note 2' }];
  const state3 = [{ id: 1, title: 'Updated' }, { id: 2, title: 'Note 2' }];

  beforeEach(() => {
    history = createHistoryManager(initialState);
  });

  describe('createHistoryManager', () => {
    it('should initialize with state', () => {
      expect(history).toBeDefined();
      expect(getCurrentState(history)).toEqual(initialState);
    });

    it('should have default maxHistory', () => {
      const stats = getHistoryStats(history);
      expect(stats.maxHistory).toBe(50);
    });

    it('should accept custom maxHistory', () => {
      const custom = createHistoryManager([], 100);
      const stats = getHistoryStats(custom);
      expect(stats.maxHistory).toBe(100);
    });

    it('should initialize with no undo', () => {
      expect(canUndo(history)).toBe(false);
    });

    it('should initialize with no redo', () => {
      expect(canRedo(history)).toBe(false);
    });
  });

  describe('pushState', () => {
    it('should add state to history', () => {
      pushState(history, state1);
      expect(getCurrentState(history)).toEqual(state1);
    });

    it('should enable undo after push', () => {
      pushState(history, state1);
      expect(canUndo(history)).toBe(true);
    });

    it('should push multiple states', () => {
      pushState(history, state1);
      pushState(history, state2);
      expect(getCurrentState(history)).toEqual(state2);
    });

    it('should clear redo stack on push', () => {
      pushState(history, state1);
      pushState(history, state2);
      undo(history);
      expect(canRedo(history)).toBe(true);
      
      pushState(history, state3);
      expect(canRedo(history)).toBe(false);
    });

    it('should return true on success', () => {
      const result = pushState(history, state1);
      expect(result).toBe(true);
    });
  });

  describe('undo', () => {
    it('should move to previous state', () => {
      pushState(history, state1);
      pushState(history, state2);
      
      undo(history);
      expect(getCurrentState(history)).toEqual(state1);
    });

    it('should enable redo after undo', () => {
      pushState(history, state1);
      undo(history);
      expect(canRedo(history)).toBe(true);
    });

    it('should do nothing if at start', () => {
      pushState(history, state1);
      undo(history);
      undo(history); // Try to undo past start
      
      expect(getCurrentState(history)).toEqual(initialState);
    });

    it('should support multiple undos', () => {
      pushState(history, state1);
      pushState(history, state2);
      pushState(history, state3);
      
      undo(history);
      undo(history);
      expect(getCurrentState(history)).toEqual(state1);
    });

    it('should return current state', () => {
      pushState(history, state1);
      const result = undo(history);
      expect(result).toEqual(initialState);
    });
  });

  describe('redo', () => {
    it('should move to next state', () => {
      pushState(history, state1);
      pushState(history, state2);
      undo(history);
      
      redo(history);
      expect(getCurrentState(history)).toEqual(state2);
    });

    it('should disable redo when done', () => {
      pushState(history, state1);
      undo(history);
      redo(history);
      
      expect(canRedo(history)).toBe(false);
    });

    it('should do nothing if no redo available', () => {
      pushState(history, state1);
      redo(history); // Try to redo when none available
      
      expect(getCurrentState(history)).toEqual(state1);
    });

    it('should support multiple redos', () => {
      pushState(history, state1);
      pushState(history, state2);
      pushState(history, state3);
      
      undo(history);
      undo(history);
      redo(history);
      redo(history);
      
      expect(getCurrentState(history)).toEqual(state3);
    });

    it('should return current state', () => {
      pushState(history, state1);
      undo(history);
      const result = redo(history);
      expect(result).toEqual(state1);
    });
  });

  describe('getCurrentState', () => {
    it('should return current state', () => {
      expect(getCurrentState(history)).toEqual(initialState);
    });

    it('should update after push', () => {
      pushState(history, state1);
      expect(getCurrentState(history)).toEqual(state1);
    });

    it('should update after undo', () => {
      pushState(history, state1);
      pushState(history, state2);
      undo(history);
      
      expect(getCurrentState(history)).toEqual(state1);
    });

    it('should update after redo', () => {
      pushState(history, state1);
      undo(history);
      redo(history);
      
      expect(getCurrentState(history)).toEqual(state1);
    });
  });

  describe('getHistory', () => {
    it('should return all states to current', () => {
      pushState(history, state1);
      pushState(history, state2);
      
      const hist = getHistory(history);
      expect(hist).toHaveLength(3); // initial + 2 pushes
      expect(hist[0]).toEqual(initialState);
      expect(hist[1]).toEqual(state1);
      expect(hist[2]).toEqual(state2);
    });

    it('should not include redo states', () => {
      pushState(history, state1);
      pushState(history, state2);
      undo(history);
      
      const hist = getHistory(history);
      expect(hist).toHaveLength(2);
      expect(hist[hist.length - 1]).toEqual(state1);
    });

    it('should handle empty history', () => {
      const hist = getHistory(history);
      expect(hist).toEqual([initialState]);
    });
  });

  describe('canUndo', () => {
    it('should return false initially', () => {
      expect(canUndo(history)).toBe(false);
    });

    it('should return true after push', () => {
      pushState(history, state1);
      expect(canUndo(history)).toBe(true);
    });

    it('should return false at start', () => {
      pushState(history, state1);
      undo(history);
      expect(canUndo(history)).toBe(false);
    });

    it('should return true in middle', () => {
      pushState(history, state1);
      pushState(history, state2);
      undo(history);
      
      expect(canUndo(history)).toBe(true);
    });
  });

  describe('canRedo', () => {
    it('should return false initially', () => {
      expect(canRedo(history)).toBe(false);
    });

    it('should return true after undo', () => {
      pushState(history, state1);
      undo(history);
      expect(canRedo(history)).toBe(true);
    });

    it('should return false after redo completes', () => {
      pushState(history, state1);
      undo(history);
      redo(history);
      
      expect(canRedo(history)).toBe(false);
    });

    it('should return false after new push', () => {
      pushState(history, state1);
      undo(history);
      pushState(history, state2);
      
      expect(canRedo(history)).toBe(false);
    });
  });

  describe('clearHistory', () => {
    it('should clear all history', () => {
      pushState(history, state1);
      pushState(history, state2);
      
      clearHistory(history);
      
      expect(canUndo(history)).toBe(false);
      expect(canRedo(history)).toBe(false);
    });

    it('should preserve current state', () => {
      pushState(history, state1);
      const current = getCurrentState(history);
      
      clearHistory(history);
      
      // After clear, should be at initial
      expect(getCurrentState(history)).toEqual(initialState);
    });

    it('should return true', () => {
      const result = clearHistory(history);
      expect(result).toBe(true);
    });

    it('should reset after undo', () => {
      pushState(history, state1);
      pushState(history, state2);
      undo(history);
      
      clearHistory(history);
      
      expect(getCurrentState(history)).toEqual(initialState);
      expect(canUndo(history)).toBe(false);
    });
  });

  describe('getHistoryStats', () => {
    it('should return stats object', () => {
      const stats = getHistoryStats(history);
      expect(stats).toHaveProperty('currentIndex');
      expect(stats).toHaveProperty('totalStates');
      expect(stats).toHaveProperty('undoCount');
      expect(stats).toHaveProperty('redoCount');
      expect(stats).toHaveProperty('maxHistory');
    });

    it('should show initial state', () => {
      const stats = getHistoryStats(history);
      expect(stats.currentIndex).toBe(0);
      expect(stats.totalStates).toBe(1);
      expect(stats.undoCount).toBe(0);
      expect(stats.redoCount).toBe(0);
    });

    it('should update after pushes', () => {
      pushState(history, state1);
      pushState(history, state2);
      
      const stats = getHistoryStats(history);
      expect(stats.currentIndex).toBe(2);
      expect(stats.totalStates).toBe(3);
      expect(stats.undoCount).toBe(2);
      expect(stats.redoCount).toBe(0);
    });

    it('should update after undo', () => {
      pushState(history, state1);
      pushState(history, state2);
      undo(history);
      
      const stats = getHistoryStats(history);
      expect(stats.currentIndex).toBe(1);
      expect(stats.undoCount).toBe(1);
      expect(stats.redoCount).toBe(1);
    });

    it('should show correct redo count', () => {
      pushState(history, state1);
      pushState(history, state2);
      pushState(history, state3);
      
      undo(history);
      undo(history);
      
      const stats = getHistoryStats(history);
      expect(stats.redoCount).toBe(2);
    });
  });

  describe('Integration tests', () => {
    it('should handle complete undo/redo workflow', () => {
      pushState(history, state1);
      pushState(history, state2);
      pushState(history, state3);
      
      undo(history);
      expect(getCurrentState(history)).toEqual(state2);
      
      undo(history);
      expect(getCurrentState(history)).toEqual(state1);
      
      redo(history);
      expect(getCurrentState(history)).toEqual(state2);
      
      redo(history);
      expect(getCurrentState(history)).toEqual(state3);
    });

    it('should handle branch after undo', () => {
      pushState(history, state1);
      pushState(history, state2);
      
      undo(history);
      expect(canRedo(history)).toBe(true);
      
      pushState(history, state3);
      expect(canRedo(history)).toBe(false);
      expect(getCurrentState(history)).toEqual(state3);
    });

    it('should track history correctly', () => {
      pushState(history, state1);
      pushState(history, state2);
      
      let hist = getHistory(history);
      expect(hist).toHaveLength(3);
      
      undo(history);
      hist = getHistory(history);
      expect(hist).toHaveLength(2);
      
      redo(history);
      hist = getHistory(history);
      expect(hist).toHaveLength(3);
    });

    it('should manage state with stats', () => {
      pushState(history, state1);
      pushState(history, state2);
      
      let stats = getHistoryStats(history);
      expect(stats.undoCount).toBe(2);
      
      undo(history);
      stats = getHistoryStats(history);
      expect(stats.undoCount).toBe(1);
      expect(stats.redoCount).toBe(1);
      
      clearHistory(history);
      stats = getHistoryStats(history);
      expect(stats.undoCount).toBe(0);
      expect(stats.redoCount).toBe(0);
    });

    it('should handle max history limit', () => {
      const limited = createHistoryManager([], 3);
      
      pushState(limited, state1);
      pushState(limited, state2);
      pushState(limited, state3);
      
      const stats = getHistoryStats(limited);
      expect(stats.totalStates).toBeLessThanOrEqual(3);
    });

    it('should support rapid undo/redo', () => {
      pushState(history, state1);
      pushState(history, state2);
      
      undo(history);
      undo(history);
      
      redo(history);
      redo(history);
      
      expect(getCurrentState(history)).toEqual(state2);
      expect(canUndo(history)).toBe(true);
      expect(canRedo(history)).toBe(false);
    });
  });
});
