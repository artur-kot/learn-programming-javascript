# Exercise 092: Pomodoro Timer - Notification System

Complete the Pomodoro timer! Add a notification system that alerts users to phase changes and key events. Build an event emitter and notification center.

## Concepts

- **Event Emitters** - Objects that emit events
- **Event Listeners** - Functions that respond to events
- **Notifications** - Informing users of state changes
- **Alerts** - Special notifications for important events
- **Custom Events** - Creating domain-specific events
- **Observer Pattern** - Multiple listeners for single events

## What You're Learning

Notifications keep users informed about timer state. In this exercise, you'll:
- Create an event emitter system
- Emit events when phases change
- Build a notification center
- Subscribe to notifications
- Alert users at key moments
- Create a complete Pomodoro app with all features

**Event Pattern:**
```javascript
emitter.on('event-name', (data) => {
  // Handle event
});

emitter.emit('event-name', data);
```

## Challenge

Build a complete, production-ready Pomodoro application with events and notifications. Create an event emitter system and integrate it into a full Pomodoro timer.

## Classes and Functions to Implement

### `EventEmitter`
Simple event emitter for custom events.

**Methods:**
- `on(eventName, callback)` - Register listener
- `emit(eventName, data)` - Fire event with data
- `off(eventName, callback)` - Unregister listener (optional)

**Examples:**
```javascript
const emitter = new EventEmitter();
emitter.on('timer-end', (data) => {
  console.log('Timer finished:', data);
});
emitter.emit('timer-end', { duration: 25 });
```

### `NotificationCenter`
Manage and send notifications.

**Methods:**
- `notify(notification)` - Send notification
- `subscribe(callback)` - Subscribe to all notifications
- `unsubscribe(callback)` - Unsubscribe (optional)

**Notification Object:**
```javascript
{
  type: 'work' | 'break' | 'break-extended',
  message: string,
  timestamp: number,
  priority: 'low' | 'normal' | 'high'
}
```

### `createNotifyingPomodoro(workMinutes, breakMinutes, sessionsCount)`
Pomodoro timer with built-in notifications.

**Parameters:**
- `workMinutes` - Work period length
- `breakMinutes` - Break period length
- `sessionsCount` - Number of work/break pairs

**Returns:**
- App object with methods

**Methods:**
- `start()` - Start the Pomodoro
- `pause()` - Pause session
- `resume()` - Resume from pause
- `on(eventName, callback)` - Listen for events

**Events:**
- `tick` - Emitted each second
- `phase-change` - Emitted when work/break changes
- `session-complete` - Emitted when all sessions done

### `timerWithAlerts(durationSeconds, onAlert)`
Timer that alerts at key moments.

**Parameters:**
- `durationSeconds` - Timer duration
- `onAlert` - Callback when alert triggered

**Returns:**
- Controller with `start()` and `stop()` methods

**Alert Moments:**
- When timer starts
- At halfway point
- In last 10 seconds
- When timer ends

### `pomodoroApp(workMinutes, breakMinutes, sessionsCount)`
Complete Pomodoro app with full notification system.

**Parameters:**
- `workMinutes` - Work period
- `breakMinutes` - Break period
- `sessionsCount` - Number of sessions

**Returns:**
- App object with full interface

**Methods:**
- `start()` - Start the app
- `pause()` - Pause
- `resume()` - Resume
- `on(eventName, callback)` - Listen for events
- `getStatus()` - Get current status

**Events:**
- `work-start` - Work session started
- `break-start` - Break started
- `work-end` - Work session complete
- `break-end` - Break complete
- `phase-change` - Any phase change
- `session-complete` - All sessions done
- `tick` - Each second

**Status Object:**
```javascript
{
  currentPhase: 'work' | 'break',
  elapsed: number,
  remaining: number,
  sessionNumber: number,
  totalSessions: number
}
```

## Tips

- Use EventEmitter to emit events from different components
- NotificationCenter can act as a central hub for notifications
- Emit events when important state changes occur
- Allow multiple listeners for the same event
- Include relevant data in event callbacks
- Consider event priority for notifications

## Series Complete!

You've mastered asynchronous JavaScript fundamentals:
- ✅ setTimeout for delayed execution
- ✅ setInterval for repeated execution
- ✅ Clearing intervals and pause/resume
- ✅ Managing multiple timers
- ✅ Events and notifications

You're ready to move on to [Phase 11: DOM Manipulation](../../#phase-11-dom-manipulation)!
