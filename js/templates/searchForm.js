import Search from '../models/Search.js'

export default class SearchForm extends Search {
  constructor() {
    super()
  }

  createSearchForm() {
    const searchFormString = `
    <form action="./index.html">
      <div class="search">
        <input type="search" name="search" id="search" placeholder="Rechercher un ingrédient, appareil, ustensils ou une recette">
        <button type="submit">
          <img src="./assets/img/search.svg" alt="Bouton de recherche" ></img>
        </button>
      </div>
      <div class="filters">
        <div class="filter filter-ingredient">
          <input type="text" class="filter-input" placeholder="Ingrédients">
          <button class="filter-btn">
            <img src="./assets/img/arrow.svg" alt="Affiche tout les ingrédients">
          </button>
        </div>

        <div class="filter filter-appareil">
          <input type="text" class="filter-input" placeholder="Appareil">
          <button class="filter-btn">
            <img src="./assets/img/arrow.svg" alt="Affiche tout les ingrédients">
          </button>
        </div>

        <div class="filter filter-ustensile">
          <input type="text" class="filter-input" placeholder="Ustensiles">
          <button class="filter-btn">
            <img src="./assets/img/arrow.svg" alt="Affiche tout les ingrédients">
          </button>
        </div>
      </div>
    </form>
    `

    let target = document.querySelector('main')
    let searchFormObject = document.createElement('div')
    searchFormObject.innerHTML = searchFormString

    target.insertAdjacentElement('afterbegin', searchFormObject)
  }
}
