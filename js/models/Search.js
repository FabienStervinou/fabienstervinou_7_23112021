import SearchEngine from '../search/SearchEngine.js'
import { toNumbers } from '../utils/utils.js'

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
    if (e.target.value.length >= 3 || e.keyCode == 13) {
      this.updateRecipesSearch(e.target.value)
    } else if (!isTagActive) {
      this.setLocalStorageIsSearchActiveTo(false)
    }
  }

  /**
   *
   * @param {String} value
   */
  updateRecipesSearch (value) {
    if (value) {
      value.trim()
    }

    const isTagActive = !!document.querySelector('.tag')
    let matchId = []
    let matchIdLocal = window.localStorage.getItem('matchId')
      ? toNumbers(window.localStorage.getItem('matchId').split(','))
      : null

    if (!isTagActive) {
      // console.log('1')
      for (let i = 0; i < this.dataSimplify.length; i++) {
        const data = this.dataSimplify[i]
        const dataSimplify = data.simplify

        for (const word of dataSimplify) {
          if (word.includes(value)) {
            matchId.push(data.id)
          }
        }
      }
      window.localStorage.setItem('matchId', [...new Set(matchId)])
    } else if (isTagActive && matchIdLocal) {
      // console.log('2')
      const tags = JSON.parse(window.localStorage.getItem('tags'))
      const valueId = []
      let result

      const idTag = this.searchEngine.getIdByTag(tags, this.dataSimplify)

      for (let i = 0; i < matchIdLocal.length; i++) {
        const idLocal = matchIdLocal[i]

        this.dataSimplify.forEach((element) => {
          if (element.id == idLocal && tags.length <= 2) {
            for (let i = 0; i < element.simplify.length; i++) {
              const word = element.simplify[i]
              if (word.includes(value)) {
                valueId.push(element.id)
              }
            }
          }
        })
        result = [...new Set(valueId)]
        matchId = result
      }

      if (idTag) {
        window.localStorage.setItem('matchId', idTag)
      }
    }

    // Clean local storage if nothing match

    // Update searchEngin data filter
    const dataFilter = []
    for (let i = 0; i < matchId.length; i++) {
      const id = matchId[i]
      const res = this.data.filter((recipe) => recipe.id == id)
      dataFilter.push(res[0])
    }
    return this.searchEngine.simplifyData(dataFilter)
  }

  setLocalStorageIsSearchActiveTo (value) {
    window.localStorage.setItem('isSearchActive', value)
  }
}
