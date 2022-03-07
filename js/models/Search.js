import SearchEngine from '../search/SearchEngine.js'
import FilterForm from '../templates/filterForm.js'

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
      this.updateRecipesSearch(e.target.value)
    }

    if (!isTagActive && document.querySelector('#search').value.length < 3) {
      this.setLocalStorageIsSearchActiveTo(false)
    } else {
      this.setLocalStorageIsSearchActiveTo(true)
      this.updateRecipesSearch(e.target.value)
    }
  }

  /**
   *
   * @param {String} value
   */
  updateRecipesSearch (value) {
    const valueTrim = value ? value.trim().toLowerCase() : null
    let resultIds = []
    const tagActive = JSON.parse(window.localStorage.getItem('tags'))
    let isTagActive = tagActive != 'null' && tagActive != null

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
        isTagActive = false
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

    // Update searchEngine data filter
    const dataFilter = []
    const matchIdFilter = window.localStorage.getItem('matchId') ? window.localStorage.getItem('matchId').split(',') : null
    if (matchIdFilter != null && matchIdFilter != 'null') {
      const matchIdFilterResult = matchIdFilter.map((x) => {
        return parseInt(x, 10)
      })

      for (let i = 0; i < matchIdFilterResult.length; i++) {
        const id = matchIdFilterResult[i]
        const res = this.data.filter((recipe) => recipe.id == id)
        dataFilter.push(res[0])
      }

      const dataIngredient = this.searchEngine.simplifyIngredient(dataFilter)
      const dataAppareil = this.searchEngine.simplifyAppareil(dataFilter)
      const dataUstensiles = this.searchEngine.simplifyUstensiles(dataFilter)
      const filterForm = new FilterForm()
      filterForm.updateFiltersData(dataIngredient, dataAppareil, dataUstensiles)
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
