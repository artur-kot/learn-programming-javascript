import { strict as assert } from 'node:assert';
import test from 'node:test';
import * as ex from './071-profile-friends.js';

test('071 - Profile Friends', async (t) => {
  ex.populateUsers();

  await t.test('addFriend adds friend ID to friends array', () => {
    const success = ex.addFriend(1, 2);
    assert.strictEqual(success, true);
    
    const user = ex.getUserById(1);
    assert(user.friends.includes(2));
  });

  await t.test('addFriend returns false if user not found', () => {
    const success = ex.addFriend(999, 2);
    assert.strictEqual(success, false);
  });

  await t.test('addFriend prevents duplicate friendships', () => {
    ex.addFriend(1, 2);
    const success = ex.addFriend(1, 2);
    assert.strictEqual(success, false);
    
    const user = ex.getUserById(1);
    const count = user.friends.filter(f => f === 2).length;
    assert.strictEqual(count, 1);
  });

  await t.test('removeFriend removes friend ID from array', () => {
    ex.addFriend(1, 3);
    const success = ex.removeFriend(1, 3);
    assert.strictEqual(success, true);
    
    const user = ex.getUserById(1);
    assert(!user.friends.includes(3));
  });

  await t.test('removeFriend returns false if friend not found', () => {
    const success = ex.removeFriend(1, 999);
    assert.strictEqual(success, false);
  });

  await t.test('getFriends returns array of friend objects', () => {
    ex.addFriend(2, 3);
    ex.addFriend(2, 4);
    const friends = ex.getFriends(2);
    
    assert(Array.isArray(friends));
    assert.strictEqual(friends.length, 2);
    assert(friends.some(f => f.id === 3));
    assert(friends.some(f => f.id === 4));
  });

  await t.test('getFriendCount returns number of friends', () => {
    const count = ex.getFriendCount(2);
    assert.strictEqual(count, 2);
  });

  await t.test('getFriendCount returns 0 for user with no friends', () => {
    const count = ex.getFriendCount(1);
    assert.strictEqual(count, 0);
  });

  await t.test('areFriends checks bidirectional friendship', () => {
    ex.addFriend(1, 2);
    ex.addFriend(2, 1);
    
    const isFriends = ex.areFriends(1, 2);
    assert.strictEqual(isFriends, true);
  });

  await t.test('areFriends returns false if not mutual friends', () => {
    ex.addFriend(3, 4);
    // User 4 hasn't added 3 back
    
    const isFriends = ex.areFriends(3, 4);
    assert.strictEqual(isFriends, false);
  });

  await t.test('getMutualFriends returns common friends', () => {
    ex.addFriend(1, 2);
    ex.addFriend(1, 3);
    ex.addFriend(2, 3);
    ex.addFriend(2, 4);
    
    const mutual = ex.getMutualFriends(1, 2);
    assert.strictEqual(mutual.length, 1);
    assert.strictEqual(mutual[0].id, 3);
  });

  await t.test('cleanup', () => {
    ex.resetUsers();
  });
});
