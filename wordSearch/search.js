/***
 * search (grid, wordlist)
 * This function accepts a grid (a 2d array of letters)
 * and a wordlist (an array of words to search for). The function finds any words
 * that exist in the word search in any of the 8 possible directions (up, down, left, right
 * and all 4 diagonal directions). This function is case-insensitive in its matching.
 *
 * Returns: an array of words that can be found in the word search
 ***/
module.exports = function search(grid, wordlist) {
  const foundWords = []

  // Dimensions of array
  const height = grid.length
  const width = grid[0].length
  const maxLength = Math.max(height, width)

  // * Forward Possibilities:
  const rowsForward = grid.map(row => row.join(''))
  // * Backward Possibilities
  const rowsBackward = grid.map(row => row.reverse().join(''))
  // * Downward Possibilities
  const columnsDown = []
  for (let i = 0; i < width; i++) {
    columnsDown.push(grid.map(row => row[i]).join(''))
  }
  // * Upward Possibilities
  const columnsUp = columnsDown.map(column =>
    column
      .split('')
      .reverse()
      .join('')
  )
  // for (let i = width - 1; i >= 0; i--) {
  //   const column = []
  //   for (let j = height - 1; j >= 0; j--) {
  //     column.push(grid[j][i])
  //   }
  //   columnsUp.push(column.join(''))
  // }
  // * Up-Right Possibilities
  const upRight = []
  for (let i = 0; i <= 2 * (maxLength - 1); i++) {
    const subArr = []
    for (let j = height - 1; j >= 0; j--) {
      const x = i - j
      if (x >= 0 && x < width) {
        subArr.push(grid[j][x])
      }
    }
    upRight.push(subArr.join(''))
  }
  // * Up-Left Possibilities
  const upLeft = []
  for (let i = 0; i <= 2 * (maxLength - 1); i++) {
    const subArr = []
    for (let j = height - 1; j >= 0; j--) {
      const x = i - (height - j)
      if (x >= 0 && x < width) {
        subArr.push(grid[j][x])
      }
    }
    upLeft.push(subArr.join(''))
  }
  // * Down-Left Possibilities
  const downLeft = upRight.map(el =>
    el
      .split('')
      .reverse()
      .join('')
  )
  // * Down-Right Possibilities
  const downRight = upLeft.map(el =>
    el
      .split('')
      .reverse()
      .join('')
  )

  // *** COMBINED POSSIBILITIES:
  const allPossibilities = rowsBackward
    .concat(rowsForward)
    .concat(columnsDown)
    .concat(columnsUp)
    .concat(upLeft)
    .concat(upRight)
    .concat(downLeft)
    .concat(downRight)

  // Add the words that are found
  allPossibilities.forEach(possibility => {
    wordlist.forEach(word => {
      if (possibility.toLowerCase().includes(word.toLowerCase())) foundWords.push(word)
    })
  })
    
  // Remove any duplicates
  for (let i = foundWords.length - 1; i >= 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      if (foundWords[i] === foundWords[j]) {
        foundWords.splice(i, 1)
      }
    }
  }
  return foundWords
}
