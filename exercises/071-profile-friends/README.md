# 071 - User Profile: Friends List

## Overview

Add social network features by managing arrays of friends and implementing features like mutual friends and friend relationships.

## Challenge

Implement these social functions:

1. **`addFriend(userId, friendId)`** - Add friend (prevent duplicates), return success boolean
2. **`removeFriend(userId, friendId)`** - Remove friend, return success boolean
3. **`getFriends(userId)`** - Get array of friend objects (not just IDs)
4. **`getFriendCount(userId)`** - Return number of friends
5. **`areFriends(userId1, userId2)`** - Check if mutual friends (bidirectional)
6. **`getMutualFriends(userId1, userId2)`** - Find common friends

## Hints

- Store friend IDs in an array: `user.friends = []`
- Use `.includes()` to check for duplicates
- Use `.indexOf()` and `.splice()` to remove
- Use `.map()` to convert IDs to user objects
- Mutual friends means both users have each other in their friends array

## Example Usage

```javascript
addFriend(1, 2);           // User 1 adds friend 2
addFriend(2, 1);           // User 2 adds friend 1 back
areFriends(1, 2);          // true (mutual)

addFriend(1, 3);           // One-sided friendship
areFriends(1, 3);          // false (not mutual)

getMutualFriends(1, 2);    // Find common friends
```

## Tests

```bash
npm test
```

## Read More

- [MDN: Array Operations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Graph Data Structures](https://en.wikipedia.org/wiki/Graph_(abstract_data_type))
