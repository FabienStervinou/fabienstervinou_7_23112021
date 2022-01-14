import SearchEngine from '../search/SearchEngine.js'
import FilterForm from '../templates/filterForm.js'

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
      searchDOM.addEventListener('keyup', (e) => {
        if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter' || e.keyCode == 13) {
          return false
        }
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
    } else {
      this.setLocalStorageIsSearchActiveTo(false)
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

    const matchIdUnique = [...new Set(matchId)]
    const matchWordUnique = [...new Set(matchWord)]
    console.log('matchWordUnique :', matchWordUnique)

    if (matchIdUnique.length > 0) {
      window.localStorage.setItem('recipeIdMatch', matchIdUnique)
      this.setLocalStorageIsSearchActiveTo(true)
    } else if (matchIdUnique.length <= 0) {
      window.localStorage.removeItem('recipeIdMatch')
      this.setLocalStorageIsSearchActiveTo(false)
    }

    // Update filter
    const dataIngredient = this.searchEngine.simplifyIngredient(this.data)
    const filterForm = new FilterForm()
    filterForm.getFilterIngredient(dataIngredient)
  }

  setLocalStorageIsSearchActiveTo (value) {
    window.localStorage.setItem('isSearchActive', value)
  }
}
