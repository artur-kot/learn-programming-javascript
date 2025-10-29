# Exercise 088: Pomodoro Timer - Basic Countdown

Welcome to asynchronous JavaScript! Learn the fundamentals of setTimeout to execute code after a delay. Build the foundation for a Pomodoro productivity timer.

## Concepts

- **setTimeout** - Schedule code to run after a delay
- **Asynchronous Execution** - Code that runs later, not immediately
- **Callbacks** - Functions passed as arguments to handle results
- **Timing in Milliseconds** - Understanding delays
- **Return Values** - setTimeout returns an ID
- **Simple Promises** - Returning promises from timer functions

## What You're Learning

Asynchronous programming is crucial for real-world applications. With setTimeout, you'll:
- Schedule functions to execute after a delay
- Convert seconds to milliseconds
- Use callbacks to handle timer completion
- Return timeout IDs for later cancellation
- Create reusable timer objects
- Build the foundation for more complex timing

**Key Pattern:**
```javascript
setTimeout(() => {
  console.log("This runs after 1 second");
}, 1000); // 1000 milliseconds = 1 second
```

## Challenge

Build a basic timer system using setTimeout. Create functions that can delay execution, return promises, and track timer state. This is the first step toward a full Pomodoro timer.

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

## Tips

- setTimeout uses milliseconds, not seconds (1 second = 1000 ms)
- Callbacks are executed asynchronously (later, not immediately)
- setTimeout returns an ID that can be used with clearTimeout
- You can pass additional arguments to setTimeout's callback
- Promises are a cleaner way to handle delays than callbacks

## Next Steps

Once complete, move to [exercise 089](../089-pomodoro-setinterval) where you'll use setInterval for repeated execution.
