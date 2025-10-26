export function formatProfile() {
  // User information with some formatting issues
  const name = "  sarah chen  ";
  const role = "software engineer";
  const company = "TECH CORP";

  // Clean and format the data using string methods
  const cleanName = name.trim();
  const roleUpper = role.toUpperCase();
  const companyLower = company.toLowerCase();
  const nameLength = cleanName.length;

  // Display the formatted profile
  console.log(`Name: ${cleanName}`);
  console.log(`Role: ${roleUpper}`);
  console.log(`Company: ${companyLower}`);
  console.log(`Name length: ${nameLength}`);
}

formatProfile();
