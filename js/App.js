import Api from './api/Api.js'
import RecipeCard from './templates/recipeCard.js'
import SearchForm from './templates/searchForm.js'
import Search from './/models/Search.js'
import SearchEngine from './/search/SearchEngine.js'

class App {
  constructor () {
    this.recipesApi = new Api('../data/recipes.json')
    this.searchForm = new SearchForm()
    this.search = new Search()
  }

  async fetchRecipes () {
    const recipesData = await this.recipesApi.getRecipes().then(res => {
      return res
    })
    return recipesData
  }

  async main () {
    console.log('App running 🔥')
    this.searchForm.createSearchForm()

    const recipes = await this.fetchRecipes()

    if (recipes) {
      for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i]
        let recipeObject = new RecipeCard(recipe)
        recipeObject.createRecipeCard()
      }
      // Init form
      this.search.init(recipes)
    }

    // Starting prepare local data for request
    this.searchEngine = new SearchEngine(recipes)
    this.searchEngine.init()
  }
}

const app = new App()
app.main()
