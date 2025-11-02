# Exercise 089: Pomodoro Timer - Advanced Control and Cycles

Master timer control and build a complete Pomodoro system! Learn to pause and resume timers, manage multiple cycles, and implement automatic phase transitions. Create a practical productivity tool.

## Concepts

- **clearInterval** - Stop a running interval
- **State Management** - Tracking timer state (running, paused)
- **Pausing Timers** - Stopping without losing progress
- **Resuming Timers** - Continuing from where paused
- **Multiple Timers** - Managing several timers at once
- **Phase Transitions** - Automatically switching between phases
- **Pomodoro Cycles** - Standard work/break pattern
- **Control Objects** - Managing multiple timers and sessions

## What You're Learning

Real-world timers need full control and automation. In this exercise, you'll:
- Stop intervals with clearInterval while preserving state
- Track whether a timer is running or paused
- Preserve remaining time when paused and resume correctly
- Create reusable controllable timer objects
- Manage multiple timers at once
- Automatically transition between work and break phases
- Track which session you're on
- Implement the classic Pomodoro technique
- Build adaptive timers that respond to progress

**Key Patterns:**
```javascript
// Pause/Resume
let intervalId = null;
let remaining = duration;

function start() {
  intervalId = setInterval(() => {
    remaining--;
    if (remaining <= 0) clearInterval(intervalId);
  }, 1000);
}

function pause() {
  clearInterval(intervalId);
}

function resume() {
  intervalId = setInterval(tick, 1000); // Continue with remaining
}

// Work/Break Cycles
if (remaining <= 0) {
  if (phase === 'work') {
    phase = 'break';
    remaining = breakDuration;
  } else {
    phase = 'work';
    remaining = workDuration;
  }
}
```

**Pomodoro Technique:**
- 25 minutes work
- 5 minutes break
- Repeat 4 times
- 15-30 minute long break

## Challenge

Build a complete, production-ready Pomodoro system. Create classes and functions that manage timer state, support pause/resume, and automatically cycle through work and break periods with proper session tracking.

## Classes and Functions to Implement

### `ControllableTimer`
Timer class that can be started, paused, and resumed.

**Methods:**
- `start(seconds, onTick)` - Start countdown
- `pause()` - Pause the countdown
- `resume()` - Resume from pause
- `getRemaining()` - Get remaining seconds (optional)

**Examples:**
```javascript
const timer = new ControllableTimer();
timer.start(5, (remaining) => console.log(remaining));
// After 2 ticks...
timer.pause(); // Timer stops
timer.resume(); // Timer continues
```

### `pauseableCountdown(seconds, onTick, onComplete)`
Countdown with pause capability.

**Parameters:**
- `seconds` - Starting duration
- `onTick` - Callback each tick
- `onComplete` - Callback when done

**Returns:**
- Controller object with `pause()` and `resume()` methods

**Examples:**
```javascript
const controller = pauseableCountdown(5, 
  (remaining) => console.log(remaining),
  () => console.log("Done!")
);
controller.pause();
controller.resume();
```

### `createTimerController()`
Create a controller for managing multiple timers.

**Returns:**
- Controller object with methods

**Methods:**
- `create(seconds, onTick)` - Create and start a timer
- `pauseAll()` - Pause all timers
- `resumeAll()` - Resume all timers
- `clearAll()` - Stop and clear all timers (optional)

**Examples:**
```javascript
const controller = createTimerController();
const timer1 = controller.create(10, console.log);
const timer2 = controller.create(5, console.log);
controller.pauseAll(); // Both timers paused
controller.resumeAll(); // Both timers resume
```

### `pauseAndResume(seconds, onTick)`
Start, pause, resume a countdown.

**Parameters:**
- `seconds` - Starting duration
- `onTick` - Callback each tick

**Returns:**
- Timer object with `pause()` and `resume()` methods

**Examples:**
```javascript
const timer = pauseAndResume(3, (remaining) => {
  console.log(`${remaining}s`);
});
setTimeout(() => timer.pause(), 1500);
setTimeout(() => timer.resume(), 2000);
```

### `multiPhaseTimer(phases, onUpdate)`
Timer with multiple phases (work, break, etc).

**Parameters:**
- `phases` - Array of phase objects: `[{ duration: seconds, label: 'work' }, ...]`
- `onUpdate` - Callback with update info

**Returns:**
- Controller with `start()`, `pause()`, `resume()` methods

**Examples:**
```javascript
const timer = multiPhaseTimer([
  { duration: 25, label: 'work' },
  { duration: 5, label: 'break' },
  { duration: 25, label: 'work' },
  { duration: 5, label: 'break' }
], (update) => {
  console.log(`${update.phase}: ${update.remaining}s`);
});

timer.start();
// After 5 seconds...
timer.pause();
timer.resume();
```

### `PomodoroSession`
Manage complete Pomodoro session with work and break cycles.

**Constructor:**
- `PomodoroSession(workMinutes, breakMinutes)`

**Methods:**
- `start(onUpdate)` - Start the session
- `pause()` - Pause current phase
- `resume()` - Resume from pause
- `getCurrentPhase()` - Get current phase info (optional)

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

- Always store the interval ID returned by setInterval
- Call clearInterval with the stored ID to stop the timer
- Track remaining time to resume from the correct point
- Maintain state to know if timer is running or paused
- Handle edge cases like pausing/resuming when already paused/running
- Use classes to organize timer state and methods
- Each phase should complete before the next starts
- Track session number to implement "long break after 4 sessions"
- Call onUpdate frequently (every tick)
- Call onPhaseChange only when phase actually changes

## Next Steps

Once complete, move to [exercise 090](../090-pomodoro-complete) where you'll add notifications, events, and build a complete Pomodoro application.
