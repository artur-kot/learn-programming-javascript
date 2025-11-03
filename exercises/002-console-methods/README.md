## Console Methods: error, warn, and log

While `console.log()` is great for general output, JavaScript provides other console methods designed for specific types of messages. In this exercise, you'll learn about `console.error()` and `console.warn()` and understand when to use each one.

Go to `002-console-methods.js` file and implement the three functions to use the appropriate console methods for different message types.

## What are console.error and console.warn?

**console.log()** - Used for general informational messages. This is what you've been using so far.

**console.warn()** - Used for warning messages. These indicate potential issues that aren't critical but should be noted. In most browsers and terminals, warnings appear in yellow/orange color.

**console.error()** - Used for error messages. These indicate something went wrong. In most browsers and terminals, errors appear in red color and may include a stack trace.

### Stack Trace
Stack trace is a report that provides information about the sequence of function calls that led to an error, helping developers identify where the problem occurred in the code.
#### Example Stack Trace

Here's an example of a stack trace that might appear when using `console.error()` in Node.js:

```
Error: Division by zero
  at divide (/c:/Users/artur/Development/learn-programming-javascript/exercises/002-console-methods/002-console-methods.js:10:11)
  at main (/c:/Users/artur/Development/learn-programming-javascript/exercises/002-console-methods/002-console-methods.js:15:5)
  at Object.<anonymous> (/c:/Users/artur/Development/learn-programming-javascript/exercises/002-console-methods/002-console-methods.js:18:1)
  at Module._compile (internal/modules/cjs/loader.js:1137:30)
  at Object.Module._extensions..js (internal/modules/cjs/loader.js:1157:10)
  at Module.load (internal/modules/cjs/loader.js:985:32)
  at Function.Module._load (internal/modules/cjs/loader.js:878:14)
  at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:71:12)
  at internal/main/run_main_module.js:17:47
```

This trace shows the call stack leading to the error, starting from the point where the error occurred (`divide` function) and tracing back through the functions that called it.

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
