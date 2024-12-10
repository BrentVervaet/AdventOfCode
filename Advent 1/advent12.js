const fs = require('fs');

// Read the file
const data = fs.readFileSync('./list.txt', 'utf8');

// Split the file content by lines
const lines = data.split('\n');
//console.log(lines);

// Initialize arrays for left and right columns
const leftColumn = [];
const rightColumn = [];

// Process each line
lines.forEach(line => {
const [left, right] = line.trim().split(/\s{3}/);
  if (left && right) {
    leftColumn.push(left);
    rightColumn.push(right);
  }
});

// Create a map to count occurrences of left column numbers in the right column
const countMap = new Map();

leftColumn.forEach(leftNum => {
  countMap.set(leftNum, 0);
});

// Update the countMap with the rightColumn values
rightColumn.forEach(rightNum => {
  if (countMap.has(rightNum)) {
    countMap.set(rightNum, countMap.get(rightNum) + 1);
  }
});


// Create an array to store the key * value results
const keyValueArray = leftColumn.map(leftNum => {
  const count = countMap.get(leftNum) || 0;
  return leftNum * count;
});

// Output the key * value array
console.log('Key * Value Array:', keyValueArray);

// Sum all numbers in the keyValueArray
const sum = keyValueArray.reduce((acc, num) => acc + num, 0);

// Output the sum
console.log('Sum of Key * Value Array:', sum);


