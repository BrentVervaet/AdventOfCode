const fs = require('fs');

// Read the file and split by lines
const lines = fs.readFileSync('./reports.txt', 'utf8').split('\n').filter(line => line.trim() !== '');

// Function to check if a line is "safe"
function isSafe(numbers) {
  const isValidDiff = numbers.slice(1).every((num, i) => {
    const diff = Math.abs(num - numbers[i]);
    return diff >= 1 && diff <= 3;
  });

  const increasing = numbers.every((num, i, arr) => i === 0 || arr[i] > arr[i - 1]);
  const decreasing = numbers.every((num, i, arr) => i === 0 || arr[i] < arr[i - 1]);

  return isValidDiff && (increasing || decreasing);
}

// Function to check if a line can be made "safe" by ignoring one element
function canBeMadeSafe(line) {
  const numbers = line.split(' ').map(Number);

  if (isSafe(numbers)) {
    return true;
  }

  for (let i = 0; i < numbers.length; i++) {
    const newNumbers = numbers.slice(0, i).concat(numbers.slice(i + 1));
    if (isSafe(newNumbers)) {
      return true;
    }
  }

  return false;
}

// Count the "safe" lines or lines that can be made "safe"
const safe = lines.reduce((count, line) => count + (canBeMadeSafe(line) ? 1 : 0), 0);

console.log('safe reports:', safe);