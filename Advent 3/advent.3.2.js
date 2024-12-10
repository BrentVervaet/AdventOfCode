const fs = require("fs");

fs.readFile("mul.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Use regex to find all do(), don't(), and mul(xxx,xxx) patterns
  const instructionRegex = /do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\)/g;

  const matches = data.match(instructionRegex);

  let mulEnabled = true; // mul instructions are enabled at the beginning
  const multNumbers = [];

  matches.forEach((match) => {
    if (match === "do()") {
      mulEnabled = true;
    } else if (match === "don't()") {
      mulEnabled = false;
    } else if (mulEnabled && match.startsWith("mul(")) {
      // Extract the numbers from the mul instruction
      const numbers = match.match(/\d{1,3}/g).map(Number);
      // Multiply the numbers
      const result = numbers.reduce((acc, num) => acc * num, 1);
      multNumbers.push(result);
    }
  });

  const total = multNumbers.reduce((acc, num) => acc + num, 0);

  // Log the total
  console.log(total);
});
