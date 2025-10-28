# Exercise 089: Pomodoro Timer - Tick Every Second

Build a real countdown timer! Learn setInterval to execute code repeatedly. Create a timer that ticks every second and tracks time passing.

## Concepts

- **setInterval** - Repeat code at fixed time intervals
- **Countdown Logic** - Decreasing time each tick
- **Stopwatch Logic** - Increasing time each tick
- **Interval IDs** - Managing multiple intervals
- **Timer State** - Tracking current time
- **Callbacks for Updates** - Reporting time changes

## What You're Learning

With setInterval, you can create practical timers. In this exercise, you'll:
- Execute code repeatedly at regular intervals
- Count down from a starting value
- Track elapsed time with a stopwatch
- Build reusable countdown timer objects
- Manage timer state during execution
- Create the core Pomodoro timer functionality

**Key Pattern:**
```javascript
let seconds = 5;
const id = setInterval(() => {
  console.log(seconds);
  seconds--;
  if (seconds < 0) clearInterval(id);
}, 1000);
```

## Challenge

Build a complete countdown system with both countdown and stopwatch modes. Create timer objects that can start, track time, and provide updates via callbacks.

## Functions to Implement

### `tickingCountdown(seconds, onTick)`
Count down from seconds to 0, calling onTick each second.

**Parameters:**
- `seconds` - Starting seconds (can be decimal)
- `onTick` - Callback called each second with remaining time

**Returns:**
- Interval ID (number)

**Examples:**
```javascript
const id = tickingCountdown(5, (remaining) => {
  console.log(`${remaining} seconds left`);
});
// Output:
// 4 seconds left
// 3 seconds left
// 2 seconds left
// 1 seconds left
// 0 seconds left
```

### `createCountdownTimer()`
Create timer object that counts down and calls callbacks.

**Returns:**
- Timer object with methods

**Methods:**
- `start(seconds, onTick)` - Start countdown, return interval ID

**Examples:**
```javascript
const timer = createCountdownTimer();
const id = timer.start(3, (remaining) => {
  console.log(`${remaining}s`);
});
```

### `stopwatch(onTick)`
Track elapsed time and call onTick each second.

**Parameters:**
- `onTick` - Callback called each second with elapsed time

**Returns:**
- Interval ID (number)

**Examples:**
```javascript
const id = stopwatch((elapsed) => {
  console.log(`${elapsed} seconds elapsed`);
});
// Output:
// 1 seconds elapsed
// 2 seconds elapsed
// 3 seconds elapsed
```

### `pomodoroSession(durationSeconds, onTick, onComplete)`
Create a work session with onTick updates.

**Parameters:**
- `durationSeconds` - Session duration in seconds
- `onTick` - Callback each second with remaining time
- `onComplete` - Callback when session ends

**Returns:**
- Interval ID (number)

**Examples:**
```javascript
pomodoroSession(25 * 60, 
  (remaining) => console.log(`Work: ${remaining}s`),
  () => console.log("Break time!")
);
```

### `pomodoroWorkBreakCycle(workSeconds, breakSeconds, onUpdate)`
Run work and break periods alternately.

**Parameters:**
- `workSeconds` - Work period duration
- `breakSeconds` - Break period duration
- `onUpdate` - Callback with status and remaining time

**Returns:**
- Cycle object with methods

**Methods:**
- `start()` - Start the cycle
- `stop()` - Stop the cycle

**Examples:**
```javascript
const cycle = pomodoroWorkBreakCycle(25 * 60, 5 * 60, (status) => {
  console.log(status); // "Working: 1400s remaining" or "Break: 280s remaining"
});
cycle.start();
```

## Tips

- setInterval uses milliseconds (1 second = 1000 ms)
- Always store the interval ID to clear it later
- Call clearInterval(id) to stop the interval
- Calculate the tick interval to align with seconds
- For 1-second ticks, use 1000 milliseconds
- Handle decimal seconds by converting to milliseconds

## Next Steps

Once complete, move to [exercise 090](../090-pomodoro-clear) where you'll add pause and resume functionality.
