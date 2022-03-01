
export class StoreAuth {
  static getStoreAuth() {
    return JSON.parse(sessionStorage.getItem('store'))
  }

  static setStoreAuth(value) {
    sessionStorage.setItem('store', JSON.stringify(value))
  }

  static clearStoreAuth() {
    sessionStorage.removeItem('store')
  }
}
