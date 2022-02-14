
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
      wrapper.addEventListener('keyup', this.onKeyUpFilter)
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

  createItemsTemplate (itemsArray, type) {
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
    const template = `<a href="#">${item}</a>`
    const wrapper = document.createElement('div')

    wrapper.setAttribute('id', 'item')
    wrapper.setAttribute('class', 'filter-item')
    wrapper.innerHTML = template

    wrapper.addEventListener('click', this.onClickFilterItem, false)
    return wrapper
  }

  listenLocalStorage () {
    // const isSearchActive = window.localStorage.getItem('isSearchActive')
    // const recipeIdMatch = window.localStorage.getItem('recipeIdMatch')

    // if (isSearchActive && recipeIdMatch) {
    //   console.log('recipeIdMatch :', recipeIdMatch)
    // }
  }

  onKeyUpFilter (event) {
    const filters = this.querySelectorAll('#item')
    const word = event.target.value

    for (let i = 0; i < filters.length; i++) {
      const item = filters[i]
      if (!item.firstChild.innerHTML.match(word)) {
        item.style.display = 'none'
      } else {
        item.style.display = 'block'
      }
    }
  }

  onClickFilter (event) {
    const arrow = this.querySelector('img')
    const item = this.querySelector('#items')
    const type = this.classList[2]
    const filters = document.querySelectorAll('.filter')

    // Toggle data active attribute
    if (this.dataset.active == 'true' && event.target.classList == 'open') {
      this.dataset.active = 'false'
      arrow.classList.remove('open')
      item.setAttribute('hidden', '')
    } else {
      this.dataset.active = 'true'
      arrow.setAttribute('class', 'open')
      item.removeAttribute('hidden')

      // Close filter if click outside
      document.querySelector('body').addEventListener('click', (e) => {
        let filter = e.target.closest('.filter')
        if (!filter) {
          this.dataset.active = 'false'
          arrow.classList.remove('open')
          item.removeAttribute('hidden')
        }
      })
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
