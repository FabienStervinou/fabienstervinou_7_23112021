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
    if (e.target.value.length >= 3 || e.keyCode == 13 || (e.target.value.length < 3 && isTagActive)) {
      console.time('performance test')
      for (let i = 0; i < 1000; i++) {
        this.updateRecipesSearch(e.target.value)
      }
      console.timeEnd('performance test')
    } else if (!isTagActive) {
      this.setLocalStorageIsSearchActiveTo(false)
    }
  }

  /**
   *
   * @param {String} value
   */
  updateRecipesSearch (value) {
    const valueTrim = value ? value.trim().toLowerCase() : null
    let resultIds = []
    const isTagActive = !!JSON.parse(window.localStorage.getItem('tags'))

    // Get ids by data info
    if (value && valueTrim != null) {
      this.data.forEach(data => {
        // By ingredients
        data.ingredients.forEach(ingredients => {
          let dataIngredient = ingredients.ingredient.toLowerCase()

          if (dataIngredient.includes(valueTrim)) {
            resultIds.push(data.id)
          }
        })

        // By title
        let dataName = data.name.toLowerCase()
        if (dataName.includes(valueTrim)) {
          resultIds.push(data.id)
        }

        // By description
        let dataDescription = data.description.toLowerCase()
        if (dataDescription.includes(valueTrim)) {
          resultIds.push(data.id)
        }
      })

      // No ids match
      if (resultIds.length === 0) {
        resultIds.push('null')
      }
    }

    // Manage ids if data
    if (isTagActive) {
      const tags = JSON.parse(window.localStorage.getItem('tags'))
      const idTag = this.searchEngine.getIdByTag(tags, this.dataSimplify)
      const resultIdsWithTag = []

      if (valueTrim) {
        resultIds.forEach(id => {
          if (idTag.includes(id)) {
            resultIdsWithTag.push(id)
          }
        })
        resultIds = resultIdsWithTag
      } else if (!valueTrim) {
        resultIds = idTag
      }
    }

    // Remove duplicate data from resultIds
    if (resultIds.length > 0) {
      return window.localStorage.setItem('matchId', [...new Set(resultIds)])
    }
  }

  setLocalStorageIsSearchActiveTo (value) {
    window.localStorage.setItem('isSearchActive', value)
  }
}
