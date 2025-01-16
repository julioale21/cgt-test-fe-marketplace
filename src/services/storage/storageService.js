export class StorageService {
    constructor(key, storage = localStorage) {
      this.key = key;
      this.storage = storage;
    }
  
    get() {
      try {
        const item = this.storage.getItem(this.key);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error('Error getting data from storage:', error);
        return null;
      }
    }
  
    set(value) {
      try {
        if (value === undefined) {
          this.storage.removeItem(this.key);
        } else {
          const item = JSON.stringify(value);
          this.storage.setItem(this.key, item);
        }
      } catch (error) {
        console.error('Error saving data to storage:', error);
      }
    }
  
    remove() {
      try {
        this.storage.removeItem(this.key);
      } catch (error) {
        console.error('Error removing data from storage:', error);
      }
    }
  
    clear() {
      try {
        this.storage.clear();
      } catch (error) {
        console.error('Error clearing storage:', error);
      }
    }
  }