
import { capitalize } from '../utils/utils.js'

export default class Filter {
  constructor () {
    this.filtersType = [
      'ingredient',
      'appareil',
      'ustensiles'
    ]
  }

  init () {
    let form = document.querySelector('#form')

    if (form) {
      form.addEventListener('submit', this.listenLocalStorage)
    }
    this.createAllFiltersTemplate()
  }

  createAllFiltersTemplate () {
    const target = document.querySelector('.filters')

    for (let i = 0; i < this.filtersType.length; i++) {
      const type = this.filtersType[i]
      const wrapper = document.createElement('div')
      const content = this.createFilterTemplate(type)

      wrapper.classList.add('filter', `filter-${type}`)
      wrapper.innerHTML = content

      target.insertAdjacentElement('beforeend', wrapper)
    }
  }

  createFilterTemplate (type) {
    const template = `
      <input type="text" class="filter-input" placeholder="${capitalize(type)}">
      <button class="filter-btn">
        <img src="./assets/img/arrow.svg" alt="Affiche tout les ${type}">
      </button>
    `
    return template
  }

  listenLocalStorage () {
    const isSearchActive = window.localStorage.getItem('isSearchActive')
    const recipeIdMatch = window.localStorage.getItem('recipeIdMatch')

    if (isSearchActive && recipeIdMatch) {
      console.log('recipeIdMatch :', recipeIdMatch)
    }
  }

  getFilterIngredient (data) {
    console.log('getFilterIngredient', data)
  }
}
