import SearchEngine from '../search/SearchEngine.js'

export default class Search {
  constructor (data) {
    this.isSearchActive = false
    this.data = data
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
  }

  /**
   *
   * @param {Event} e
   */
  onSearchKeyUp (e) {
    if (e.target.value.length >= 3) {
      this.isSearchActive = true
      this.updateRecipesSearch(e.target.value)
    } else {
      this.isSearchActive = false
    }
  }

  /**
   *
   * @param {String} value
   */
  updateRecipesSearch (value) {
    console.log('value :', value)
    console.log('this.data :', this.data)
  }
}
