vitest.config.js - configuration file for testing (add this if needed)

Create at root of project if vitest not working:

```javascript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
```
