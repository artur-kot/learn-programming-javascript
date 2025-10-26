export function displayProfileCard() {
  // Same variables from previous exercises
  const name = "Sarah Chen";
  const age = 28;
  const email = "sarah.chen@email.com";

  // Create formatted messages using template literals
  const nameMessage = `Name: ${name}`;
  const ageMessage = `Age: ${age}`;
  const emailMessage = `Email: ${email}`;

  // Display the formatted profile
  console.log(nameMessage);
  console.log(ageMessage);
  console.log(emailMessage);
}

displayProfileCard();
