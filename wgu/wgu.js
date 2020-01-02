// function firstLastCount(str) {
//   arr = str.split('')

//   for (let i = 0; i < arr.length; i++) {
//     // replace numbers with spaces
//     if (!isNaN(+arr[i])) {
//       arr.splice(i, 1, ' ')
//     }
//     console.log(arr.join(''))
//   }
// }

// console.log(firstLastCount('Automotive'))

function removeCc(str) {
  return str.replace(/([A-Z])/g, ' $1')
}

console.log(removeCc('camelCaseThing'))

function lowerCase(str) {
  return str.replace(/[A-Z]/g, )
}