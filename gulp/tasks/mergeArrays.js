/*
INPUT
['modules', 'buttons', 'are', 'awesome']
['pages', 'head']
EXPECTED OUTPUT
{
  modules: {
    buttons: {
      are: {
        awesome: true
      }
    }
  },
  pages: {
  head: true
}
}
*/
const mergeArrays = (accumulator, current, index, array) => {
  const checkArray = num => array[num]
  const test = checkArray(index)
  if (accumulator[test] === undefined) {
    accumulator[test] = test
  }
}

module.exports = mergeArrays
