import SearchEngine from '../search/SearchEngine.js'
// import RecipeCard from '../templates/recipeCard.js'

export default class Search {
  constructor (data) {
    this.isSearchActive = false
    this.data = data
    this.dataSimplify = null
  }

  /**
   *
   * @param {Array} data
   */
  init () {
    const searchDOM = document.querySelector('#search')
    if (searchDOM) {
      searchDOM.addEventListener('keyup', e => {
        this.onSearchKeyUp(e)
      })
    }

    // Starting prepare local data for request
    this.searchEngine = new SearchEngine(this.data)
    this.dataSimplify = this.searchEngine.dataSimplify
  }

  /**
   *
   * @param {Event} e
   */
  onSearchKeyUp (e) {
    if (e.target.value.length >= 3) {
      this.updateRecipesSearch(e.target.value)
    }
  }

  /**
   *
   * @param {String} value
   */
  updateRecipesSearch (value) {
    const matchWord = []
    const matchId = []

    for (let i = 0; i < this.dataSimplify.length; i++) {
      const element = this.dataSimplify[i]

      element.simplify.forEach(word => {
        if (word.includes(value)) {
          matchWord.push(word)
          matchId.push(element.id)
        }
      })
    }

    const matchWordUnique = [...new Set(matchWord)]
    console.log('matchWordUnique :', matchWordUnique)

    const matchIdUnique = [...new Set(matchId)]
    console.log('matchIdUnique :', matchIdUnique)

    if (matchIdUnique.length > 0) {
      this.setLocalStorageIsSearchActiveTo(true)
    } else {
      this.setLocalStorageIsSearchActiveTo(false)
    }
  }

  setLocalStorageIsSearchActiveTo (value) {
    window.localStorage.setItem('isSearchActive', value)
  }
}
