export default class Search {
  constructor () {
    this.isSearchActive = false
    this.data = null
  }

  /**
   *
   * @param {Array} data
   */
  init (data) {
    const searchDOM = document.querySelector('#search')

    if (searchDOM) {
      searchDOM.addEventListener('keyup', e => {
        this.onSearchKeyUp(e)
      })
    }

    this.data = data
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
