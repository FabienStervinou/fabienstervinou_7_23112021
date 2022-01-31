export const capitalize = (word) => {
  return `${word.charAt(0).toUpperCase()}${word.slice(1)}`
}

export const saveDataToLocalStorage = (data, localItem) => {
  let a = []
  a = JSON.parse(localStorage.getItem(`${localItem}`)) || []
  a.push(data)
  localStorage.setItem(`${localItem}`, JSON.stringify(a))
}

export const removeDataFromLocalStorage = (data, localItem) => {
  let a = JSON.parse(localStorage.getItem(`${localItem}`))

  if (a.length <= 1) {
    localStorage.removeItem(`${localItem}`)
  } else if (a.length > 1) {
    const isEqual = (element) => element == data
    const indexToRemove = a.findIndex(isEqual)
    a.splice(indexToRemove, 1)
    localStorage.setItem(`${localItem}`, JSON.stringify(a))
  }
}

export const replaceSpecialCharBy = (text, replace) => {
  return text.replaceAll(',', replace).replaceAll(':', replace).replaceAll('°', replace).replaceAll('\'', replace).replaceAll('(', replace).replaceAll(')', replace).replaceAll('.', replace).replaceAll('%', replace)
}

export const getDuplicates = (arr) => {
  let sortedArr = arr.slice().sort()
  let results = []
  for (let i = 0; i < sortedArr.length - 1; i++) {
    if (sortedArr[i + 1] == sortedArr[i]) {
      results.push(sortedArr[i])
    }
  }
  return [...new Set(results)]
}

export const toNumbers = (arr) => {
  return arr.map(Number)
}

// TODO:
//   filter word length >= 3
