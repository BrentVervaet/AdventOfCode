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

// Output the arrays
//console.log('Left Column:', leftColumn);
//console.log('Right Column:', rightColumn);

leftColumn.sort((a, b) => a - b);
rightColumn.sort((a, b) => a - b);

const differenceArray = [];
for (let i = 0; i < leftColumn.length; i++) {
differenceArray.push(Math.abs(rightColumn[i] - leftColumn[i]));
}

console.log('Difference Array:', differenceArray);

//add total differenceArray
let total = 0;
for (let i = 0; i < differenceArray.length; i++) {
  total += differenceArray[i];
}

console.log('Total:', total);