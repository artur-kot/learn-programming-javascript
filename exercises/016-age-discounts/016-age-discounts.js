export function calculateTicketPrice() {
  const basePrice = 20; // Base ticket price in dollars

  // Test different ages
  const age1 = 8;
  const age2 = 16;
  const age3 = 35;
  const age4 = 70;

  // TODO: Calculate ticket price based on age with these discount rules:
  // - Child (0-12): 50% discount ($10)
  // - Teen (13-17): 25% discount ($15)
  // - Adult (18-64): No discount ($20)
  // - Senior (65+): 30% discount ($14)

  // For age1 (8):
  // 1. Determine age group (Child)
  // 2. Calculate discount amount
  // 3. Calculate final price
  // 4. Display: "Age 8: Child ticket = $10"
  // Hint:
  // if (age1 <= 12) {
  //   const discount = basePrice * 0.50;  // 50% discount
  //   const finalPrice = basePrice - discount;
  //   console.log(`Age ${age1}: Child ticket = $${finalPrice}`);
  // } else if (age1 <= 17) {
  //   const discount = basePrice * 0.25;
  //   const finalPrice = basePrice - discount;
  //   console.log(`Age ${age1}: Teen ticket = $${finalPrice}`);
  // } ...


  // For age2 (16): Display "Age 16: Teen ticket = $15"


  // For age3 (35): Display "Age 35: Adult ticket = $20"


  // For age4 (70): Display "Age 70: Senior ticket = $14"

}

calculateTicketPrice();
