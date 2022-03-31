
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
export class sessionToken {
  static getToken() {
    return JSON.parse(sessionStorage.getItem('token'))
  }

  static setToken(value) {
    sessionStorage.setItem('token', JSON.stringify(value))
  }

  static clearToken() {
    sessionStorage.removeItem('token')
  }
}
