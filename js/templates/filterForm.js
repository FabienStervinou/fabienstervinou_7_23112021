
import { capitalize } from '../utils/utils.js'
import TagForm from './tagForm.js'

export default class Filter {
  constructor () {
    this.filtersType = [
      'ingredient',
      'appareil',
      'ustensiles'
    ]
    this.ingredientData = null
    this.appareilData = null
    this.ustensilesData = null
  }

  init () {
    // console.log('<filterForm> init')
    let form = document.querySelector('#form')

    if (form) {
      form.addEventListener('submit', this.listenLocalStorage)
    }
    this.createAllFiltersTemplate()
  }

  createAllFiltersTemplate () {
    // console.log('<filterForm> createAllFiltersTemplate')
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
    // console.log('<filterForm> createFilterTemplate')
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

  createItemsTemplate (itemsArray, type) {
    // console.log('<filterForm> createItemsTemplate')
    const target = document.querySelector(`#items.${type}`)
    if (target) {
      target.innerHTML = ''
      for (let i = 0; i < itemsArray.length; i++) {
        const item = itemsArray[i]
        if (item != undefined) {
          const content = this.createItemTemplate(item)

          target.insertAdjacentElement('beforeend', content)
        }
      }
    }
  }

  createItemTemplate (item) {
    // console.log('<filterForm> createItemTemplate')
    const template = `<a href="#">${item}</a>`
    const wrapper = document.createElement('div')

    wrapper.setAttribute('id', 'item')
    wrapper.setAttribute('class', 'filter-item')
    wrapper.innerHTML = template

    wrapper.addEventListener('click', this.onClickFilterItem, event, false)
    return wrapper
  }

  listenLocalStorage () {
    // console.log('<filterForm> listenLocalStorage')
    // const isSearchActive = window.localStorage.getItem('isSearchActive')
    // const recipeIdMatch = window.localStorage.getItem('recipeIdMatch')

    // if (isSearchActive && recipeIdMatch) {
    //   console.log('recipeIdMatch :', recipeIdMatch)
    // }
  }

  onClickFilter () {
    // console.log('<filterForm> onClickFilter')
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
      this.createItemsTemplate(this.ingredientData, 'ingredient')
    }
  }

  onClickFilterItem () {
    const tagForm = new TagForm()
    const item = this.firstChild.innerHTML
    const type = this.closest('.filter-items').classList[1]
    tagForm.createTag(type, item)
  }

  updateFiltersData (dataIngredient, dataAppareil, dataUstensiles) {
    this.getFiltersData(dataIngredient, 'ingredient')
    this.getFiltersData(dataAppareil, 'appareil')
    this.getFiltersData(dataUstensiles, 'ustensiles')
  }

  getFiltersData (data, type) {
    // console.log('<filterForm> getFiltersData')
    switch (type) {
      case 'ingredient':
        this.ingredientData = data
        this.createItemsTemplate(this.ingredientData, 'ingredient')
        break

      case 'appareil':
        this.appareilData = data
        this.createItemsTemplate(this.appareilData, 'appareil')
        break

      case 'ustensiles':
        this.ustensilesData = data
        this.createItemsTemplate(this.ustensilesData, 'ustensiles')
        break
    }
  }
}
