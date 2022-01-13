import Search from '../models/Search.js'
import FilterTemplate from '../templates/filterForm.js'

export default class SearchForm extends Search {
  constructor (data) {
    super(data)
  }

  init () {
    this.createSearchForm()
    this.filterTemplate = new FilterTemplate()
  }

  createSearchForm () {
    const searchFormString = `
    <form action="./index.html" id="form">
      <div class="search">
        <input type="search" name="search" id="search" placeholder="Rechercher un ingrédient, appareil, ustensils ou une recette">
        <button type="submit">
          <img src="./assets/img/search.svg" alt="Bouton de recherche" ></img>
        </button>
      </div>
      <div class="filters">
      </div>
    </form>
    `

    let target = document.querySelector('main')
    let searchFormObject = document.createElement('div')
    searchFormObject.innerHTML = searchFormString

    target.insertAdjacentElement('afterbegin', searchFormObject)
  }
}
