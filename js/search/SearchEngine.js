import FilterForm from '../templates/filterForm.js'
import Tag from '../templates/tagForm.js'

export default class SearchEngine {
  /**
   *
   * @param {Array} data
   */
  constructor (data) {
    this.data = data
    this.dataSimplify = null
    this.dataIngredient = null
    this.dataAppareil = null
    this.dataUstensiles = null
    this.form = document.querySelector('#form')
    this.input = document.querySelector('#search')
  }

  init () {
    this.simplifyData(this.data)
    this.form.addEventListener('submit', this.searchInputListener.bind(this))
  }

  searchInputListener (e) {
    e.preventDefault()
    const inputValue = this.input.value
    const tag = new Tag()

    if (this.dataIngredient.find(element => element == inputValue)) {
      tag.createTag('ingredient', inputValue)
    } else if (this.dataAppareil.find(element => element == inputValue)) {
      tag.createTag('appareil', inputValue)
    } else if (this.dataUstensiles.find(element => element == inputValue)) {
      tag.createTag('ustensiles', inputValue)
    }

    // Remove input value
    this.input.value = ''
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

      let ustensilsArray = recipe.ustensils
      let ustensilsSimplify = []
      for (let i = 0; i < ustensilsArray.length; i++) {
        const ustensil = ustensilsArray[i]
        let test = ustensil.split(' ')
        let ustensilResult = test.filter(word => word.length >= 3)
        ustensilsSimplify = [...ustensilResult]
      }

      // Remove duplicate value from Array
      const toSimplify = [...descriptionSimplify, ...nameSimplify, ...ingredientSimplify, ...ustensilsSimplify]
      const uniqueResult = [...new Set(toSimplify)]
      const result = {
        id: recipe.id,
        simplify: uniqueResult
      }
      uniqueResultArray.push(result)
    }

    this.dataSimplify = uniqueResultArray

    // Update filters data
    const dataIngredient = this.simplifyIngredient(data)
    const dataAppareil = this.simplifyAppareil(data)
    const dataUstensiles = this.simplifyUstensiles(data)
    const filterForm = new FilterForm()
    filterForm.getFiltersData(dataIngredient, 'ingredient')
    filterForm.getFiltersData(dataAppareil, 'appareil')
    filterForm.getFiltersData(dataUstensiles, 'ustensiles')
  }

  simplifyIngredient (data) {
    let uniqueResultArray = []

    for (let i = 0; i < data.length; i++) {
      const recipe = data[i]

      // Ingredient
      let ingredientsArray = recipe.ingredients
      let ingredientSimplify = []
      for (let i = 0; i < ingredientsArray.length; i++) {
        const ingredients = ingredientsArray[i]
        let ingredient = ingredients.ingredient.replaceAll(',', ' ').replaceAll(':', ' ').replaceAll('°', ' ').replaceAll('\'', ' ').replaceAll('(', ' ').replaceAll(')', ' ').replaceAll('.', ' ').toLowerCase().split(' ')
        let ingredientResult = ingredient.filter(word => word.length >= 3)
        for (let i = 0; i < ingredientResult.length; i++) {
          const item = ingredientResult[i]
          ingredientSimplify.push(item)
        }
      }

      // Remove duplicate value from Array
      const toSimplify = [...ingredientSimplify]
      uniqueResultArray.push(toSimplify)
    }

    const uniqueResult = [...new Set(uniqueResultArray.flat())]
    this.dataIngredient = uniqueResult
    return uniqueResult
  }

  simplifyAppareil (data) {
    let uniqueResultArray = []

    for (let i = 0; i < data.length; i++) {
      const recipe = data[i]
      const appliance = recipe.appliance
      uniqueResultArray.push(appliance.toLowerCase())
    }

    const uniqueResult = [...new Set(uniqueResultArray.flat())]
    this.dataAppareil = uniqueResult
    return uniqueResult
  }

  simplifyUstensiles (data) {
    let uniqueResultArray = []

    for (let i = 0; i < data.length; i++) {
      const recipe = data[i]
      const ustensils = recipe.ustensils
      for (let i = 0; i < ustensils.length; i++) {
        const ustensil = ustensils[i]
        uniqueResultArray.push(ustensil.toLowerCase())
      }
    }

    const uniqueResult = [...new Set(uniqueResultArray.flat())]
    this.dataUstensiles = uniqueResult
    return uniqueResult
  }
}
