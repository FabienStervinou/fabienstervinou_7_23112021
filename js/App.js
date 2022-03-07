import Api from './api/api.js'
import RecipeCard from './templates/recipeCard.js'
import SearchForm from './templates/searchForm.js'
import Search from './/models/Search.js'
import Form from './/models/Form.js'

class App {
  constructor () {
    this.recipesApi = new Api('./data/recipes.json')
    this.recipes = null
    this.recipeCard = null
    this.search = null
  }

  async fetchRecipes () {
    const recipesData = await this.recipesApi.getRecipes().then(res => {
      return res
    })
    return recipesData
  }

  async main () {
    console.log('App running 🔥 V2')
    const recipes = await this.fetchRecipes()

    if (recipes) {
      for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i]
        this.recipeCard = new RecipeCard(recipe)
        this.recipeCard.createRecipeCard()
      }

      // Init form
      this.search = new Search(recipes)
      this.searchForm = new SearchForm(recipes)
      this.searchForm.init()
      this.search.init(recipes)

      this.recipes = recipes
      this.listenLocalStorage()

      this.form = new Form()
    }
  }

  listenLocalStorage () {
    let originalSetItem = localStorage.setItem
    const recipeCard = this.recipeCard
    const search = this.search

    localStorage.setItem = function (key, value) {
      const event = new Event('isSearchActive')

      event.value = value
      event.key = key

      originalSetItem.apply(this, arguments)
      document.dispatchEvent(event)
    }

    const localStorageSetHandler = function (e) {
      const isTagActive = !!(localStorage.getItem('tags') && (JSON.parse(localStorage.getItem('tags')) != 'null'))
      const idsRecipesToUpdate = window.localStorage.getItem('matchId') ? window.localStorage.getItem('matchId') : null
      const searchInputActive = document.querySelector('#search').value.length >= 3

      // console.log('log e.value :', e.value)
      // console.log('log e.key :', e.key)

      // TAG event
      if (e.key === 'tags') {
        if (isTagActive) {
          return search.updateRecipesSearch()
        } else if (!isTagActive && !searchInputActive) {
          window.localStorage.removeItem('matchId')
          return recipeCard.showAllRecipeCard()
        } else if (!isTagActive && searchInputActive) {
          search.updateRecipesSearch(document.querySelector('#search').value)
          return search.updateRecipesSearch()
        }
      }

      if ((e.key == 'matchId' && idsRecipesToUpdate && idsRecipesToUpdate != 'null') || (idsRecipesToUpdate && idsRecipesToUpdate != 'null')) {
        return recipeCard.updateRecipesCard(idsRecipesToUpdate)
      } else if (e.key == 'matchId' && idsRecipesToUpdate == 'null') {
        return recipeCard.showNoRecipeMatch()
      }
    }

    document.addEventListener('isSearchActive', localStorageSetHandler, false)
  }
}

const app = new App()
app.main()

// reset localStorage on refresh page or use sessionStorage
window.localStorage.removeItem('recipeIdMatch')
window.localStorage.removeItem('isSearchActive')
window.localStorage.removeItem('tags')
window.localStorage.removeItem('matchId')
