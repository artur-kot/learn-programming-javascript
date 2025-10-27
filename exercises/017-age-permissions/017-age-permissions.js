export function checkPermissions() {
  // User information
  const user1 = { name: "Alice", age: 16, hasParentalConsent: true };
  const user2 = { name: "Bob", age: 25, hasParentalConsent: false };
  const user3 = { name: "Carol", age: 14, hasParentalConsent: false };
  const user4 = { name: "David", age: 17, hasParentalConsent: true };

  // TODO: Check each user's permissions based on these rules:
  // 1. Can watch R-rated movie: Age 17+ OR (Age 13-16 AND has parental consent)
  // 2. Can vote: Age 18+
  // 3. Can drive: Age 16+

  // For user1 (Alice, 16, has consent):
  // Check all three permissions and display results


  // For user2 (Bob, 25, no consent):
  // Check all three permissions and display results


  // For user3 (Carol, 14, no consent):
  // Check all three permissions and display results


  // For user4 (David, 17, has consent):
  // Check all three permissions and display results

}

checkPermissions();
