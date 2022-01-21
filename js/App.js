import Api from './api/Api.js'
import RecipeCard from './templates/recipeCard.js'
import SearchForm from './templates/searchForm.js'
import Search from './/models/Search.js'
import Form from './/models/Form.js'
import Tag from './templates/tagForm.js'

class App {
  constructor () {
    this.recipesApi = new Api('../data/recipes.json')
    this.recipes = null
    this.recipeCard = null
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
      this.form.init()

      this.tag = new Tag()
      this.tag.init()
    }
  }

  listenLocalStorage () {
    let originalSetItem = localStorage.setItem
    const recipeCard = this.recipeCard

    localStorage.setItem = function (key, value) {
      const event = new Event('isSearchActive')

      event.value = value
      event.key = key

      originalSetItem.apply(this, arguments)
      document.dispatchEvent(event)
    }

    const localStorageSetHandler = function (e) {
      const isTagActive = document.querySelector('#tags > .tag') != null

      if (e.key === 'isSearchActive' && e.value === true) {
        const idMatch = window.localStorage.getItem('recipeIdMatch')
        recipeCard.updateRecipesCard(idMatch)
      } else if (e.key === 'isSearchActive' && e.value === false && isTagActive) {
        window.localStorage.removeItem('recipeIdMatch')
        recipeCard.showAllRecipeCard()
      }
    }

    document.addEventListener('isSearchActive', localStorageSetHandler, false)
  }
}

const app = new App()
app.main()
