
import { capitalize } from '../utils/utils.js'

export default class Filter {
  constructor () {
    this.filtersType = [
      'ingredient',
      'appareil',
      'ustensiles'
    ]
    this.ingredientData = null
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

      wrapper.classList.add('filter', `filter-${type}`, `${type}`)
      wrapper.dataset.active = 'false'
      wrapper.innerHTML = content

      target.insertAdjacentElement('beforeend', wrapper)

      wrapper.addEventListener('click', this.onClickFilter)
    }
  }

  createFilterTemplate (type) {
    const template = `
      <input type="text" class="filter-input" placeholder="${capitalize(type)}">
      <button class="filter-btn">
        <img src="./assets/img/arrow.svg" alt="Affiche tout les ${type}">
      </button>
      <div class="break"></div>
      <div id="items" class="filter-items ${type}" hidden></div>
    `
    return template
  }

  createItemsTemplate (itemsArray) {
    const target = document.querySelector('[data-active="true"] > #items')

    for (let i = 0; i < 30; i++) {
      const item = itemsArray[i]
      const content = this.createItemTemplate(item)

      // target.insertAdjacentElement('beforeend', content)
      target.insertAdjacentElement('beforeend', content)
    }
  }

  createItemTemplate (item) {
    const template = `<a href="#">${item}</a>`
    const wrapper = document.createElement('div')
    wrapper.setAttribute('id', 'item')
    wrapper.setAttribute('class', 'filter-item')
    wrapper.innerHTML = template

    console.log(wrapper)

    return wrapper
  }

  listenLocalStorage () {
    const isSearchActive = window.localStorage.getItem('isSearchActive')
    const recipeIdMatch = window.localStorage.getItem('recipeIdMatch')

    if (isSearchActive && recipeIdMatch) {
      console.log('recipeIdMatch :', recipeIdMatch)
    }
  }

  onClickFilter () {
    const arrow = this.querySelector('img')
    const item = this.querySelector('#items')
    const type = this.classList[2]
    const filters = document.querySelectorAll('.filter')

    arrow.classList.toggle('open')
    item.toggleAttribute('hidden')

    // Toggle data active attribute
    if (this.dataset.active == 'true') {
      this.dataset.active = 'false'
    } else {
      this.dataset.active = 'true'
    }

    // Toggle other filter if open
    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i]
      const filterType = filter.classList[2]
      const filterArrow = filter.querySelector('img')
      const items = filter.querySelector('#items')

      if (filterType != type && filterArrow.classList == 'open') {
        filterArrow.classList.remove(('open'))
        filter.dataset.active = 'false'
      }

      if (filterType != type) {
        items.setAttribute('hidden', '')
      }
    }

    if (this.ingredientData) {
      this.createItemsTemplate(this.ingredientData)
    }
  }

  getFilterIngredient (data) {
    this.ingredientData = data
    console.log('this.ingredientData :', this.ingredientData)
    this.createItemsTemplate(this.ingredientData)
  }
}
