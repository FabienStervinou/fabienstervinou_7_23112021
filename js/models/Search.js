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
      console.log("Show result");
      this.updateRecipesSearch(e.target.value)
    } else {
      this.isSearchActive = false
    }
  }
}
