export default class RecipeCard {
  constructor (recipe) {
    this._id = recipe.id
    this._name = recipe.name
    this._servings = recipe.servings
    this._ingredients = recipe.ingredients
    this._time = recipe.time
    this._description = recipe.description
    this._appliance = recipe.appliance
    this._ustensils = recipe.ustensils
  }

  createRecipeCard () {
    const recipeCard = `
      <article class="card">
        <div class="card-img">
          <img src="./assets/img/300x300.jpg" alt="Photo de ${this._name}">
        </div>
        <div class="card-content">
          <div class="card-content_header">
            <div class="title">${this._name}</div>
            <div class="time">
              <img src="./assets//img/horloge.svg" alt="Icône teemps de préparation">
              <p>${this._time}mins</p>
            </div>
          </div>
          <div class="card-content_main">
            <div class="left">

            ${this._ingredients.map(item => `
            <div class="ingredient">
              ${item.ingredint} :
              <span>${item.quantite} ${item.unit}</span>
            </div>
            `).join('')}

            </div>
            <div class="right">
              ${this._description}
            </div>
          </div>
        </div>
      </article>
    `
    return recipeCard
  }
}
