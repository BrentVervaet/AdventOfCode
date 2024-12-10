const fs = require('fs');

// Read the file and split by lines
const lines = fs.readFileSync('./reports.txt', 'utf8').split('\n').filter(line => line.trim() !== '');

// Function to check if a line is "safe"
function isSafe(line) {
  const numbers = line.split(' ').map(Number);

  const isValidDiff = numbers.slice(1).every((num, i) => {
    const diff = Math.abs(num - numbers[i]);
    return diff >= 1 && diff <= 3;
  });

  const increasing = numbers.every((num, i, arr) => i === 0 || arr[i] > arr[i - 1]);
  const decreasing = numbers.every((num, i, arr) => i === 0 || arr[i] < arr[i - 1]);

  return isValidDiff && (increasing || decreasing);
}

// Count the "safe" lines
const safe = lines.reduce((count, line) => count + (isSafe(line) ? 1 : 0), 0);

console.log('safe reports:', safe);