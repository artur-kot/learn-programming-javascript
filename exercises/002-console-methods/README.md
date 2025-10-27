## Console Methods: error, warn, and log

While `console.log()` is great for general output, JavaScript provides other console methods designed for specific types of messages. In this exercise, you'll learn about `console.error()` and `console.warn()` and understand when to use each one.

Go to `002-console-methods.js` file and implement the three functions to use the appropriate console methods for different message types.

## What are console.error and console.warn?

**console.log()** - Used for general informational messages. This is what you've been using so far.

**console.warn()** - Used for warning messages. These indicate potential issues that aren't critical but should be noted. In most browsers and terminals, warnings appear in yellow/orange color.

**console.error()** - Used for error messages. These indicate something went wrong. In most browsers and terminals, errors appear in red color and may include a stack trace.

## Why does this matter?

Using the right console method helps developers:
- Quickly identify the severity of messages
- Filter logs by type in browser DevTools or terminal
- Make debugging easier by categorizing output

For example, if you're looking for why something broke, you can filter to show only `console.error()` messages instead of sifting through hundreds of `console.log()` statements.

## Test your code

To run your code, open your terminal/command prompt, navigate to the `exercises/002-console-methods` directory, and run the following command:

```bash
cd exercises/002-console-methods
node 002-console-methods
```

To run the tests:

```bash
npm test
```

You should see three different colored outputs (if your terminal supports colors), each demonstrating a different console method!

## Read More

Want to dive deeper? Check out these resources:

- 📚 [Console API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Console)
- 🎯 [Debugging in JavaScript - JavaScript.info](https://javascript.info/debugging-chrome)
