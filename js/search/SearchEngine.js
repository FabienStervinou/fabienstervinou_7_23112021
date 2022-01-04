export default class SearchEngine {
  /**
   * 
   * @param {Array} data 
   */
  constructor(data) {
    this.data = data
  }

  init () {
    this.simplifyData(this.data)
  }

  simplifyData (data) {
    for (let i = 0; i < data.length; i++) {
      const recipe = data[i];

      // Description
      let descriptionArray = recipe.description.replace('.', ' ').replace(',', '').replace(':', '').replace('°', '').replace('\'', ' ').toLowerCase().split(' ')
      let descriptionSimplify = descriptionArray.filter( word => word.length >= 3)

      // Name
      let nameArray = recipe.name.toLowerCase().split(' ')
      let nameSimplify = nameArray.filter( word => word.length >= 3)

      // Ingredient
      let ingredientsArray = recipe.ingredients
      let ingredientSimplify = []
      for (let i = 0; i < ingredientsArray.length; i++) {
        const ingredients = ingredientsArray[i];
        let ingredient = ingredients.ingredient.replace('.', ' ').replace(',', '').replace(':', '').replace('°', '').replace('\'', ' ').toLowerCase().split(' ')
        let ingredientResult = ingredient.filter( word => word.length >= 3)
        ingredientSimplify = [...ingredientResult]
      }

      const result = [...descriptionSimplify, ...nameSimplify, ...ingredientSimplify]
      // TODO: remove duplicate word
      console.log('result :', result);
    }
  }
}
