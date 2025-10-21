// function displayMessages() {
//   // TODO: print "Long and" to the console
//   // Tip: you canse use both '' and "" for strings
//   console.log("");
  
//   // TODO: print "exciting journey" to the console
//   console.log("");
  
//   // TODO: print "before you." to the console
//   console.log("");

//   // Bonus: print "JavaScript is not Java" using + operator
//   console.log("JavaScript is " + "");
// }

// module.exports = { displayMessages };

console.log('Start');

const promise = new Promise((resolve) => {
  // This runs synchronously!
  const result = Array(1_000_000_0).fill(0).map((_, i) => i).sort((a, b) => b - a);
  resolve(result);
});

promise.then(() => console.log('Done'));

console.log('End');
