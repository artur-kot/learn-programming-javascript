# Exercise 091: Pomodoro Timer - Multiple Timers

Create a full Pomodoro productivity system! Manage multiple work and break periods that automatically transition. Implement the classic Pomodoro technique with multiple cycles.

## Concepts

- **Multiple Timers** - Managing several timers at once
- **Phase Transitions** - Automatically switching between phases
- **Pomodoro Cycles** - Standard work/break pattern
- **Session Management** - Tracking multiple sessions
- **Automatic Progression** - Moving through phases automatically
- **State Synchronization** - Keeping all timers in sync

## What You're Learning

A real Pomodoro timer cycles through multiple work and break periods. In this exercise, you'll:
- Create multiple timers that work together
- Automatically transition from work to break to next work
- Track which session you're on
- Manage multiple phases in sequence
- Implement the classic 25 min work / 5 min break pattern
- Create adaptive timers that adjust based on progress

**Pomodoro Technique:**
- 25 minutes work
- 5 minutes break
- Repeat 4 times
- 15-30 minute long break

## Challenge

Build a complete Pomodoro system that manages multiple work and break cycles. Create controllers that automatically progress through phases and provide updates on the current state.

## Classes and Functions to Implement

### `PomodoroSession`
Manage complete Pomodoro session with work and break cycles.

**Constructor:**
- `PomodoroSession(workMinutes, breakMinutes)`

**Methods:**
- `start(onUpdate)` - Start the session
- `pause()` - Pause current phase
- `resume()` - Resume from pause
- `getCurrentPhase()` - Get current phase info

**Update Object:**
```javascript
{
  phase: 'work' or 'break',
  elapsed: number,
  remaining: number,
  totalTime: number
}
```

**Examples:**
```javascript
const session = new PomodoroSession(25, 5);
session.start((update) => {
  console.log(`${update.phase}: ${update.remaining}m`);
});
```

### `createWorkBreakCycle(workMinutes, breakMinutes, onTick)`
Create alternating work/break timers.

**Parameters:**
- `workMinutes` - Work period length
- `breakMinutes` - Break period length
- `onTick` - Callback on each tick

**Returns:**
- Controller with `start()` and `stop()` methods

### `pomodoroPlanner(sessionsCount, onUpdate)`
Plan multiple Pomodoro sessions.

**Parameters:**
- `sessionsCount` - Number of work/break pairs
- `onUpdate` - Callback with status updates

**Returns:**
- Planner object with `start()`, `pause()`, `resume()` methods

**Update Object:**
```javascript
{
  sessionNumber: number,
  phase: 'work' or 'break',
  remaining: number,
  totalSessions: number
}
```

### `adaptivePomodoro(initialWorkMinutes, initialBreakMinutes, onUpdate)`
Adjust break time based on work sessions completed.

**Parameters:**
- `initialWorkMinutes` - Starting work duration
- `initialBreakMinutes` - Starting break duration
- `onUpdate` - Callback with status

**Returns:**
- Controller with `start()` and `stop()` methods

**Logic:**
- Every 4 work sessions, give longer break
- Track number of sessions completed

### `pomodoroWithNotifications(workMinutes, breakMinutes, sessionsCount, onPhaseChange)`
Full Pomodoro with phase change notifications.

**Parameters:**
- `workMinutes` - Work period length
- `breakMinutes` - Break period length
- `sessionsCount` - Number of sessions
- `onPhaseChange` - Callback when phase changes

**Returns:**
- Controller with `start()`, `pause()`, `resume()` methods

**Callback Object:**
```javascript
{
  phase: 'work' or 'break',
  sessionNumber: number,
  message: "Starting work session 1" // etc
}
```

## Tips

- Each phase completes before the next starts
- Track session number to implement "long break after 4 sessions"
- Maintain state about current phase and session
- Call onUpdate frequently (every tick)
- Call onPhaseChange only when phase changes
- Handle pause/resume across phase boundaries

## Next Steps

Once complete, move to [exercise 092](../092-pomodoro-notify) where you'll add notifications and alerts.
