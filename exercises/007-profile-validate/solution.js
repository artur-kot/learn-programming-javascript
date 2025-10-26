export function validateEmail() {
  // Test various email addresses
  const email1 = "sarah.chen@email.com";
  const email2 = "invalid.email.com";
  const email3 = "john@company.org";

  // Check if each email contains the @ symbol
  const hasAt1 = email1.includes("@");
  const hasAt2 = email2.includes("@");
  const hasAt3 = email3.includes("@");

  // Display validation results
  console.log(`${email1} is ${hasAt1 ? "valid" : "invalid"}`);
  console.log(`${email2} is ${hasAt2 ? "valid" : "invalid"}`);
  console.log(`${email3} is ${hasAt3 ? "valid" : "invalid"}`);
}

validateEmail();
