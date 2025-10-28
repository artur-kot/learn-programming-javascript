# Exercise 090: Pomodoro Timer - Pause and Resume

Master timer control! Learn to stop and restart intervals while preserving state. Add pause and resume functionality to create a practical timer.

## Concepts

- **clearInterval** - Stop a running interval
- **State Management** - Tracking timer state (running, paused)
- **Pausing Timers** - Stopping without losing progress
- **Resuming Timers** - Continuing from where paused
- **Control Objects** - Managing multiple timers
- **Interval Cleanup** - Properly managing resources

## What You're Learning

Real timers need to be pausable. In this exercise, you'll:
- Stop intervals with clearInterval
- Track whether a timer is running or paused
- Preserve remaining time when paused
- Resume from the exact pause point
- Create reusable controllable timer objects
- Manage multiple timers at once

**Key Pattern:**
```javascript
let intervalId = null;

function start() {
  intervalId = setInterval(tick, 1000);
}

function pause() {
  clearInterval(intervalId);
}

function resume() {
  intervalId = setInterval(tick, 1000);
}
```

## Challenge

Build a complete timer system with pause/resume support. Create classes and functions that manage timer state and allow full control over execution.

## Classes and Functions to Implement

### `ControllableTimer`
Timer class that can be started, paused, and resumed.

**Methods:**
- `start(seconds, onTick)` - Start countdown
- `pause()` - Pause the countdown
- `resume()` - Resume from pause
- `getRemaining()` - Get remaining seconds

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
- `clearAll()` - Stop and clear all timers

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

## Tips

- Always store the interval ID returned by setInterval
- Call clearInterval with the stored ID to stop the timer
- Track remaining time to resume from the correct point
- Maintain state to know if timer is running or paused
- Handle edge cases like pausing/resuming when already paused/running
- Use classes to organize timer state and methods

## Next Steps

Once complete, move to [exercise 091](../091-pomodoro-multiple) where you'll manage multiple work and break periods.
