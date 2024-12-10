const fs = require("fs");

// Read the file content
const fileContent = fs.readFileSync("XMAS.TXT", "utf-8");

// Split the content by new lines to create an array of strings
const lines = fileContent.split("\n");

// Split each string into an array of characters
const array2D = lines.map((line) => line.split(""));

// Directions: right, down, diagonal down-right, diagonal down-left
const directions = [
  [0, 1], // right
  [0, -1], // left
  [1, 0], // down
  [-1, 0], // up
  [-1, 1], // diagonal up-right
  [-1, -1], // diagonal up-left
  [1, 1], // diagonal down-right
  [1, -1], // diagonal down-left
];

const word = "XMAS";
const wordLength = word.length;

function searchWord(array, word, startX, startY, dirX, dirY) {
  for (let i = 0; i < wordLength; i++) {
    const x = startX + i * dirX;
    const y = startY + i * dirY;
    if (
      x < 0 ||
      x >= array.length ||
      y < 0 ||
      y >= array[0].length ||
      array[x][y] !== word[i]
    ) {
      return false;
    }
  }
  return true;
}

let count = 0;

for (let i = 0; i < array2D.length; i++) {
  for (let j = 0; j < array2D[i].length; j++) {
    for (const [dirX, dirY] of directions) {
      if (searchWord(array2D, word, i, j, dirX, dirY)) {
        count++;
      }
    }
  }
}

console.log(`The word "${word}" was found ${count} times.`);
