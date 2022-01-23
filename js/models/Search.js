import SearchEngine from '../search/SearchEngine.js'

export default class Search {
  constructor (data) {
    this.isSearchActive = false
    this.data = data
    this.dataSimplify = null
    this.searchEngine = null
  }

  /**
   *
   * @param {Array} data
   */
  init () {
    const searchDOM = document.querySelector('#search')
    if (searchDOM) {
      searchDOM.addEventListener('keyup', (e) => {
        if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter' || e.keyCode == 13) {
          return false
        }
        this.onSearchKeyUp(e)
      })
    }

    // Starting prepare local data for request
    this.searchEngine = new SearchEngine(this.data)
    this.searchEngine.init()
    this.dataSimplify = this.searchEngine.dataSimplify
  }

  /**
   *
   * @param {Event} e
   */
  onSearchKeyUp (e) {
    const isTagActive = document.querySelector('#tags > .tag') != null
    if (e.target.value.length >= 3 || isTagActive) {
      this.updateRecipesSearch(e.target.value)
    } else {
      this.setLocalStorageIsSearchActiveTo(false)
    }
  }

  /**
   *
   * @param {String} value
   */
  updateRecipesSearch (value) {
    // const matchWord = []
    const matchId = []

    for (let i = 0; i < this.dataSimplify.length; i++) {
      const element = this.dataSimplify[i]

      element.simplify.forEach(word => {
        if (word.includes(value)) {
          matchId.push(element.id)
        }
      })
    }

    const matchIdLocalStorage = window.localStorage.getItem('recipeIdMatch')
    const matchIdUnique = [...new Set(matchId)]

    const matchIdLocalStorageArray = matchIdLocalStorage ? matchIdLocalStorage.split(',').map(Number) : false
    const filteredArray = matchIdLocalStorageArray ? matchIdLocalStorageArray.filter(value => matchIdUnique.includes(value)) : false

    if (matchIdUnique.length > 0) {
      // If tag use filtered id list for local storage
      if (filteredArray) {
        window.localStorage.setItem('recipeIdMatch', filteredArray)
      } else {
        window.localStorage.setItem('recipeIdMatch', matchIdUnique)
      }
      this.setLocalStorageIsSearchActiveTo(true)
    } else if (matchIdUnique.length <= 0) {
      window.localStorage.removeItem('recipeIdMatch')
      this.setLocalStorageIsSearchActiveTo(false)
    }

    // Update filter
    const dataFilter = []

    for (let i = 0; i < matchIdUnique.length; i++) {
      const id = matchIdUnique[i]
      const result = this.data.filter(recipe => recipe.id == id)
      dataFilter.push(result[0])
    }
    this.searchEngine.simplifyData(dataFilter)
  }

  setLocalStorageIsSearchActiveTo (value) {
    window.localStorage.setItem('isSearchActive', value)
  }
}
