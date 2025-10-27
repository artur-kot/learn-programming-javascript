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
  // Check if can watch R-rated movie
  // Hint: Use logical operators && (AND) and || (OR)
  // const canWatchRRated = user1.age >= 17 || (user1.age >= 13 && user1.age <= 16 && user1.hasParentalConsent);
  // const canVote = user1.age >= 18;
  // const canDrive = user1.age >= 16;
  //
  // console.log(`${user1.name} (age ${user1.age}):`);
  // console.log(`  Can watch R-rated: ${canWatchRRated ? "Yes" : "No"}`);
  // console.log(`  Can vote: ${canVote ? "Yes" : "No"}`);
  // console.log(`  Can drive: ${canDrive ? "Yes" : "No"}`);


  // For user2 (Bob, 25, no consent):


  // For user3 (Carol, 14, no consent):


  // For user4 (David, 17, has consent):

}

checkPermissions();
