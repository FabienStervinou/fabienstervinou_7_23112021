import { saveDataToLocalStorage, removeDataFromLocalStorage } from '../utils/utils.js'

export default class Tag {
  constructor () {
    this.type = null
    this.tag = null
    this.wrapper = document.querySelector('#tags')
  }

  init () {

  }

  createTag (type, tag) {
    this.type = type
    this.tag = tag
    const target = document.querySelector('#tags')
    const localTag = window.localStorage.getItem('tags')

    if (localTag && localTag.includes(tag)) return

    const tagContent = `
      <div class="tag-content">${tag}</div>
      <div class="tag-close">
        <svg height="32" id="close" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg"><path d="M4 8 L8 4 L16 12 L24 4 L28 8 L20 16 L28 24 L24 28 L16 20 L8 28 L4 24 L12 16 z"/></svg>
      </div>
    `

    const tagElement = document.createElement('div')
    tagElement.setAttribute('class', `tag ${type}`)
    tagElement.innerHTML = tagContent
    target.insertAdjacentElement('afterbegin', tagElement)

    // Add event for remove tag
    const tagClose = tagElement.querySelector('.tag-close')
    tagClose.addEventListener('click', this.removeTag)

    // Remove null element from localStorage
    if (JSON.parse(localStorage.getItem('tags')) == 'null') {
      removeDataFromLocalStorage('null', 'tags')
    }
    saveDataToLocalStorage(tag, 'tags')
  }

  removeTag (e) {
    const toClose = e.target.closest('.tag')
    const tag = toClose.firstChild.nextSibling.innerText.toLowerCase()

    toClose.remove()
    removeDataFromLocalStorage(tag, 'tags')
    if (!localStorage.getItem('tags')) {
      saveDataToLocalStorage('null', 'tags')
    }
  }
}
