import Api from './api/Api.js'
import RecipeCard from './templates/recipeCard.js'
import SearchForm from './templates/searchForm.js'
import Search from './/models/Search.js'

class App {
  constructor () {
    this.recipesApi = new Api('../data/recipes.json')
  }

  async fetchRecipes () {
    const recipesData = await this.recipesApi.getRecipes().then(res => {
      return res
    })
    return recipesData
  }

  async main () {
    console.log('App running 🔥')
    const recipes = await this.fetchRecipes()

    if (recipes) {
      for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i]
        let recipeObject = new RecipeCard(recipe)
        recipeObject.createRecipeCard()
      }
      // Init form
      this.search = new Search(recipes)
      this.searchForm = new SearchForm(recipes)
      this.searchForm.createSearchForm()
      this.search.init(recipes)

      this.listenLocalStorage()
    }
  }

  listenLocalStorage () {
    let originalSetItem = localStorage.setItem

    localStorage.setItem = function (key, value) {
      const event = new Event('isSearchActive')

      event.value = value
      event.key = key

      originalSetItem.apply(this, arguments)
      document.dispatchEvent(event)
    }

    const localStorageSetHandler = function (e) {
      if (e.key === 'isSearchActive' && e.value === true) {
        console.log('Update recipe')
      } else {
        console.log('Not updtae recipe')
      }
    }

    document.addEventListener('isSearchActive', localStorageSetHandler, false)
  }
}

const app = new App()
app.main()
