const fs = require("fs");

// Read the file
fs.readFile("mul2.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Use regex to find all mul(xxx,xxx) patterns
  const mulRegex = /mul\(\d{1,3},\d{1,3}\)/g;
  const matches = data.match(regex);
  // Use regex to extract the numbers from the matches
  const numbers = matches.map((match) => match.match(/\d{1,3}/g).map(Number));

  const multNumbers = [];
  numbers.forEach((nums, i) => {
    // Multiply the numbers
    const result = nums.reduce((acc, num) => acc * num, 1);
    multNumbers.push(result);
  });

  const total = multNumbers.reduce((acc, num) => acc + num, 0);

  // Log the matches
  console.log(total);
});
