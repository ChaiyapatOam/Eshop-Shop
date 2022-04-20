
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
export class BillRef {
  static getBillRef() {
    return JSON.parse(sessionStorage.getItem('BillRef'))
  }
  static getBillRef2() {
    return JSON.parse(sessionStorage.getItem('BillRef2'))
  }

  static setBillRef(value) {
    sessionStorage.setItem('BillRef', JSON.stringify(value))
  }
  static setBillRef2(value) {
    sessionStorage.setItem('BillRef2', JSON.stringify(value))
  }

  static clearBillRef() {
    sessionStorage.removeItem('BillRef')
  }
}
