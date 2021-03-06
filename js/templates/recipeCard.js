import Recipe from '../models/Recipe.js'

export default class RecipeCard extends Recipe {
  constructor (recipe) {
    super(recipe)
  }

  createRecipeCard () {
    const recipeCard = `
      <article id="recipeCard" class="card" data-id="${this._id}">
        <div class="card-img">
          <img src="./assets/img/300x300.jpg" alt="Photo de ${this._name}">
        </div>
        <div class="card-content">
          <div class="card-content_header">
            <div class="title">${this._name}</div>
            <div class="time">
              <img src="./assets//img/horloge.svg" alt="Icône teemps de préparation">
              <p>${this._time} mins</p>
            </div>
          </div>
          <div class="card-content_main">
            <div class="left">

            ${this._ingredients.map(item => `
            <div class="ingredient">
              ${item.ingredient} :
              <span>${item.quantity ? item.quantity : ''} 
              ${item.unit == 'grammes' ? 'g'
              : item.unit == 'cuillère à soupe' ? 'CàS'
              : item.unit == 'cuillères à soupe' ? 'CàS'
              : item.unit == undefined ? ''
              : item.unit}</span>
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

    const target = document.querySelector('.cards')
    target.innerHTML += recipeCard
  }

  updateRecipesCard (idArray) {
    const id = Array.from(idArray.split(','))
    const allCard = document.querySelectorAll('#recipeCard')

    for (let i = 0; i < allCard.length; i++) {
      const card = allCard[i]
      const cardId = card.dataset.id
      const isMatch = id.find(el => el === cardId)
      const noCardMessage = document.querySelector('.noCard')
      let oneCardVisible = false

      if (!isMatch) {
        card.style.display = 'none'
      } else {
        card.style.display = 'block'
        oneCardVisible = true
      }

      if (oneCardVisible) {
        noCardMessage.style.display = 'none'
      }
    }
  }

  showAllRecipeCard () {
    const allCard = document.querySelectorAll('#recipeCard')

    for (let i = 0; i < allCard.length; i++) {
      const card = allCard[i]
      card.style.display = 'block'
    }
  }

  showNoRecipeMatch () {
    const wrapper = document.querySelector('.cards')
    const content = wrapper.querySelector('.noCard')
    const allCard = document.querySelectorAll('#recipeCard')

    // Set all card display none
    for (let i = 0; i < allCard.length; i++) {
      const card = allCard[i]
      card.style.display = 'none'
    }

    content.style.display = 'block'
  }
}
