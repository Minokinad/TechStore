export default class LocalStorageService {
  constructor() {
    this.storage = window.localStorage;
  }

  set(key, value) {
    try {
      const item = {
        value: value,
        timestamp: new Date().getTime(),
      };
      this.storage.setItem(key, JSON.stringify(item));
      return true;
    } catch (error) {
      return false;
    }
  }

  get(key) {
    try {
      const item = this.storage.getItem(key);
      if (!item) return null;
      const parsed = JSON.parse(item);
      return parsed.value;
    } catch (error) {
      return null;
    }
  }

  remove(key) {
    this.storage.removeItem(key);
  }
}
