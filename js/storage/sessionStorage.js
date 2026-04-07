export default class SessionStorageService {
  constructor() {
    this.storage = window.sessionStorage;
  }

  set(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  get(key) {
    const item = this.storage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
}
