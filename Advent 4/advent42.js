const fs = require("fs");

// Read the file content
const fileContent = fs.readFileSync("XMAS2.TXT", "utf-8");

// Split the content by new lines to create an array of strings
const lines = fileContent.split("\n");

// Split each string into an array of characters
const array2D = lines.map((line) => line.split(""));

// Check if a specific position is valid within the grid
function isValidPosition(x, y, grid) {
  return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;
}

// Check if a specific center forms an "X-MAS"
function isXMas(array, centerX, centerY) {
  // Ensure the center is "A"
  if (array[centerX][centerY] !== "A") return false;

  // Define relative positions for the four configurations
  const configurations = [
    {
      top: [
        [-1, -1],
        [-1, 1],
      ],
      bottom: [
        [1, -1],
        [1, 1],
      ],
      topChars: "MM",
      bottomChars: "SS",
    },
    {
      top: [
        [-1, -1],
        [-1, 1],
      ],
      bottom: [
        [1, -1],
        [1, 1],
      ],
      topChars: "MS",
      bottomChars: "MS",
    },
    {
      top: [
        [-1, -1],
        [-1, 1],
      ],
      bottom: [
        [1, -1],
        [1, 1],
      ],
      topChars: "SM",
      bottomChars: "SM",
    },
    {
      top: [
        [-1, -1],
        [-1, 1],
      ],
      bottom: [
        [1, -1],
        [1, 1],
      ],
      topChars: "SS",
      bottomChars: "MM",
    },
  ];

  for (const { top, bottom, topChars, bottomChars } of configurations) {
    const [topLeft, topRight] = top;
    const [bottomLeft, bottomRight] = bottom;

    if (
      isValidPosition(centerX + topLeft[0], centerY + topLeft[1], array) &&
      isValidPosition(centerX + topRight[0], centerY + topRight[1], array) &&
      isValidPosition(
        centerX + bottomLeft[0],
        centerY + bottomLeft[1],
        array
      ) &&
      isValidPosition(
        centerX + bottomRight[0],
        centerY + bottomRight[1],
        array
      ) &&
      array[centerX + topLeft[0]][centerY + topLeft[1]] === topChars[0] &&
      array[centerX + topRight[0]][centerY + topRight[1]] === topChars[1] &&
      array[centerX + bottomLeft[0]][centerY + bottomLeft[1]] ===
        bottomChars[0] &&
      array[centerX + bottomRight[0]][centerY + bottomRight[1]] ===
        bottomChars[1]
    ) {
      return true;
    }
  }

  return false;
}

let count = 0;

// Iterate over the grid
for (let i = 0; i < array2D.length; i++) {
  for (let j = 0; j < array2D[i].length; j++) {
    if (isXMas(array2D, i, j)) {
      count++;
    }
  }
}

console.log(`The X-MAS pattern was found ${count} times.`);
