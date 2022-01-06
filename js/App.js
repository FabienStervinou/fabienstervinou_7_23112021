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
    }
  }
}

const app = new App()
app.main()
