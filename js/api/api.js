export default class Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
      this._url = url
  }

  async getRecipes() {
    return fetch(this._url)
        .then(res => res.json())
        .then(res => {
          return res.recipes
        })
        .catch(err => console.error('an error occurs', err))
  }
}
