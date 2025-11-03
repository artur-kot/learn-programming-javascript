# Exercise 088: Pomodoro Timer - Timer Fundamentals

Welcome to asynchronous JavaScript! Learn the fundamentals of setTimeout and setInterval to build the foundation for a Pomodoro productivity timer. Master both one-time delays and repeated intervals.

## Concepts

- **setTimeout** - Schedule code to run after a delay
- **setInterval** - Repeat code at fixed time intervals
- **Asynchronous Execution** - Code that runs later, not immediately
- **Callbacks** - Functions passed as arguments to handle results
- **Timing in Milliseconds** - Understanding delays and intervals
- **Return Values** - setTimeout/setInterval return IDs for cancellation
- **Countdown Logic** - Decreasing time each tick
- **Promises** - Cleaner way to handle async timing

## What You're Learning

Asynchronous programming is crucial for real-world applications. In this exercise, you'll:
- Schedule functions to execute after a delay
- Execute code repeatedly at regular intervals
- Convert seconds to milliseconds
- Use callbacks to handle timer events
- Return timeout/interval IDs for later cancellation
- Count down from a starting value
- Track elapsed time with a stopwatch
- Create reusable timer objects
- Build the foundation for a full Pomodoro timer

**Key Patterns:**
```javascript
// One-time execution after delay
setTimeout(() => {
  console.log("This runs after 1 second");
}, 1000); // 1000 milliseconds = 1 second

// Repeated execution every interval
let seconds = 5;
const id = setInterval(() => {
  console.log(seconds);
  seconds--;
  if (seconds < 0) clearInterval(id);
}, 1000);
```

## Challenge

Build a complete timer system using both setTimeout and setInterval. Create functions that can delay execution, repeat at intervals, return promises, and track timer state. This is the first step toward a full Pomodoro timer.

## Functions to Implement

### `runAfterDelay(callback, delayMs, ...args)`
Execute a callback after specified milliseconds.

**Parameters:**
- `callback` - Function to execute
- `delayMs` - Delay in milliseconds
- `...args` - Arguments to pass to callback (optional)

**Returns:**
- Timeout ID (number)

**Examples:**
```javascript
runAfterDelay(() => {
  console.log("Done!");
}, 1000);

runAfterDelay((name) => {
  console.log(`Hello ${name}`);
}, 500, "Alice");
```

### `runAfterSeconds(callback, seconds)`
Execute a callback after specified seconds.

**Parameters:**
- `callback` - Function to execute
- `seconds` - Delay in seconds (can be decimal)

**Returns:**
- Timeout ID (number)

**Examples:**
```javascript
runAfterSeconds(() => {
  console.log("1 second passed");
}, 1);

runAfterSeconds(() => {
  console.log("Half second");
}, 0.5);
```

### `delayedGreeting(name, delayMs)`
Return a promise that resolves after delay with greeting.

**Parameters:**
- `name` - Person's name
- `delayMs` - Delay in milliseconds

**Returns:**
- Promise that resolves to greeting message

**Examples:**
```javascript
delayedGreeting("Alice", 1000).then((message) => {
  console.log(message); // "Hello Alice"
});
```

### `countdownStart(seconds, onComplete)`
Start a simple countdown with callback.

**Parameters:**
- `seconds` - Duration in seconds
- `onComplete` - Callback when countdown finishes

**Returns:**
- Timeout ID (number)

**Examples:**
```javascript
countdownStart(5, () => {
  console.log("5 seconds passed!");
});
```

### `createTimer()`
Create a timer object with methods.

**Returns:**
- Timer object with `start(seconds, callback)` method

**Methods:**
- `start(seconds, callback)` - Start timer and return timeout ID

**Examples:**
```javascript
const timer = createTimer();
const id = timer.start(3, () => {
  console.log("Time's up!");
});
```

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

- setTimeout and setInterval use milliseconds (1 second = 1000 ms)
- Both functions return IDs that can be used with clearTimeout/clearInterval
- Always store the ID if you need to cancel the timer later
- Callbacks are executed asynchronously (later, not immediately)
- For decimal seconds, multiply by 1000 to get milliseconds
- Promises provide a cleaner alternative to callbacks for delays
- Use setInterval for repeated actions, setTimeout for one-time delays

## Next Steps

Once complete, move to [exercise 089](../089-pomodoro-advanced) where you'll add pause/resume functionality and handle multiple concurrent timers.
