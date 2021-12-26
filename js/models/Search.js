export default class Search {
  constructor () {
    this.isSearchActive = false
    this.data = null
  }

  init (data) {
    const searchDOM = document.querySelector('#search')

    if (searchDOM) {
      searchDOM.addEventListener('keyup', e =>{
        this.onSearchKeyUp(e)
      })
    }

    this.data = data

    console.log('Search init this.data : ', this.data);
  }

  onSearchKeyUp (e) {
    if (e.target.value.length >= 3) {
      this.isSearchActive = true
      console.log("Show result");
    } else {
      this.isSearchActive = false
    }
  }
}
