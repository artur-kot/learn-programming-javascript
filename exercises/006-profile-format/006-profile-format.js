export function formatProfile() {
  // User information with some formatting issues
  const name = "  sarah chen  ";  // Extra spaces!
  const role = "software engineer";  // Should be title case
  const company = "TECH CORP";  // All caps, needs to be lowercase except first letter

  // TODO: Use string methods to clean up and format the data

  // 1. Remove extra spaces from name using .trim()
  // Hint: const cleanName = name.trim();


  // 2. Convert role to uppercase using .toUpperCase()
  // This will make it look like a heading: "SOFTWARE ENGINEER"


  // 3. Convert company to lowercase using .toLowerCase()
  // Result should be: "tech corp"


  // 4. Get the length of the cleaned name using .length
  // This tells you how many characters are in the name


  // TODO: Display the formatted profile
  // Expected output:
  // Name: sarah chen
  // Role: SOFTWARE ENGINEER
  // Company: tech corp
  // Name length: 10

}

formatProfile();
