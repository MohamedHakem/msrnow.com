export default function generateCombinations(num) {
  const combinations = []
  // console.log("here 2, num is: ", num)
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const random = Math.floor(Math.random() * chars.length)
  // console.log("random: ", random)
  let counter1 = 0
  let counter2 = 0
  while (combinations.length < num) {
    counter1++
    const combination =
      chars[Math.floor(Math.random() * chars.length)] +
      chars[Math.floor(Math.random() * chars.length)] +
      chars[Math.floor(Math.random() * chars.length)]
    if (!combinations.includes(combination)) {
      // console.log("here 4")
      counter2++
      combinations.push(combination)
    }
  }
  // console.log("counter1: ", counter1)
  // console.log("counter2: ", counter2)
  // return combinations // return an array with many items
  return combinations // return single item
}

// export default function generateCombinations() {
//   const combinations = []
//   const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

//   for (let i = 0; i < chars.length; i++) {
//     for (let j = 0; j < chars.length; j++) {
//       const combination = chars[i] + chars[j]
//       combinations.push(combination)
//     }
//   }
//   return combinations
// }
