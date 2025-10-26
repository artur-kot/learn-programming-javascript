export function validateEmail() {
  // Test various email addresses
  const email1 = "sarah.chen@email.com";
  const email2 = "invalid.email.com";  // Missing @
  const email3 = "john@company.org";

  // TODO: Check if each email contains the @ symbol
  // Use the .includes() method to check if a string contains another string
  // Example: "hello world".includes("world") returns true

  // Check email1
  // Hint: const hasAt1 = email1.includes("@");


  // Check email2


  // Check email3


  // TODO: Display validation results
  // For each email, show whether it's valid (contains @) or invalid
  // Expected output:
  // sarah.chen@email.com is valid
  // invalid.email.com is invalid
  // john@company.org is valid

  // Hint: Use template literals and conditional logic
  // You can use the ternary operator: hasAt1 ? "valid" : "invalid"

}

validateEmail();
