export default class SearchEngine {
  /**
   *
   * @param {Array} data
   */
  constructor (data) {
    this.data = data
    this.dataSimplify = null
    this.init(this.data)
  }

  init (data) {
    this.simplifyData(data)
  }

  simplifyData (data) {
    const uniqueResultArray = []

    for (let i = 0; i < data.length; i++) {
      const recipe = data[i]

      // Description
      let descriptionArray = recipe.description.replaceAll(',', ' ').replaceAll(':', ' ').replaceAll('°', ' ').replaceAll('\'', ' ').replaceAll('(', ' ').replaceAll(')', ' ').replaceAll('.', ' ').toLowerCase().split(' ')
      let descriptionSimplify = descriptionArray.filter(word => word.length >= 3)

      // Name
      let nameArray = recipe.name.toLowerCase().split(' ')
      let nameSimplify = nameArray.filter(word => word.length >= 3)

      // Ingredient
      let ingredientsArray = recipe.ingredients
      let ingredientSimplify = []
      for (let i = 0; i < ingredientsArray.length; i++) {
        const ingredients = ingredientsArray[i]
        let ingredient = ingredients.ingredient.replaceAll(',', ' ').replaceAll(':', ' ').replaceAll('°', ' ').replaceAll('\'', ' ').replaceAll('(', ' ').replaceAll(')', ' ').replaceAll('.', ' ').toLowerCase().split(' ')
        let ingredientResult = ingredient.filter(word => word.length >= 3)
        ingredientSimplify = [...ingredientResult]
      }

      // Remove duplicate value from Array
      const toSimplify = [...descriptionSimplify, ...nameSimplify, ...ingredientSimplify]
      const uniqueResult = [...new Set(toSimplify)]
      const result = {
        id: recipe.id,
        simplify: uniqueResult
      }
      uniqueResultArray.push(result)
    }

    this.dataSimplify = uniqueResultArray
  }
}
