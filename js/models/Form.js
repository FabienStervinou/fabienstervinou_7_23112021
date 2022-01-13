export default class Form {
  constructor () {
    this.form = document.querySelector('#form')
  }

  init () {
    this.form.addEventListener('submit', (e) => {
      console.log('e.keyIdentifier : ', e.keyIdentifier)
      console.log('e.submitter : ', e.submitter)
      e.preventDefault()
      return false
    })
  }
}
