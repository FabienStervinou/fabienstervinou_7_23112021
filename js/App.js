import Api from './api/Api.js'
import RecipeCard from './templates/recipeCard.js'
import SearchForm from './templates/searchForm.js'

class App {
  constructor() {
    this.recipesApi = new Api('../data/recipes.json')
    this.searchForm = new SearchForm()
  }

  async fetchRecipes () {
    const recipesData = await this.recipesApi.getRecipes().then(res => { 
    return res
  })
    return recipesData
  }

  async main() {
    console.log('App running 🔥')
    this.searchForm.createSearchForm()

    let recipeArray = []
    const recipes = await this.fetchRecipes()

    if (recipes) {
      for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        let recipeObject = new RecipeCard(recipe)
        recipeObject.createRecipeCard()
      }
      
    }
    console.log(recipeArray)
  }
}

const app = new App()
app.main()
