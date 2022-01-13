
import { capitalize } from '../utils/utils.js'

export default class Filter {
  constructor () {
  }

  createFilterTemplate (name) {
    const template = `
      <div class="filter filter-${name}">
        <input type="text" class="filter-input" placeholder="${capitalize(name)}">
        <button class="filter-btn">
          <img src="./assets/img/arrow.svg" alt="Affiche tout les ${name}">
        </button>
      </div>
    `

    return template
  }
}
