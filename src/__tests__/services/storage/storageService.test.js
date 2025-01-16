import { StorageService } from "../../../services/storage/storageService";


describe('StorageService', () => {
  let storage;
  let mockStorage;

  beforeEach(() => {
    mockStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn()
    };
    storage = new StorageService('testKey', mockStorage);
  });

  it('should get item from storage', () => {
    const testData = { test: 'data' };
    mockStorage.getItem.mockReturnValue(JSON.stringify(testData));

    const result = storage.get();
    expect(result).toEqual(testData);
    expect(mockStorage.getItem).toHaveBeenCalledWith('testKey');
  });

  it('should return null for non-existent item', () => {
    mockStorage.getItem.mockReturnValue(null);

    const result = storage.get();
    expect(result).toBeNull();
  });

  it('should handle JSON parse errors', () => {
    mockStorage.getItem.mockReturnValue('invalid json');
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const result = storage.get();
    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('should set item in storage', () => {
    const testData = { test: 'data' };
    storage.set(testData);

    expect(mockStorage.setItem).toHaveBeenCalledWith(
      'testKey',
      JSON.stringify(testData)
    );
  });

  it('should remove item when setting undefined', () => {
    storage.set(undefined);

    expect(mockStorage.removeItem).toHaveBeenCalledWith('testKey');
    expect(mockStorage.setItem).not.toHaveBeenCalled();
  });

  it('should handle storage errors when setting', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockStorage.setItem.mockImplementation(() => {
      throw new Error('Storage error');
    });

    storage.set({ test: 'data' });
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('should remove item from storage', () => {
    storage.remove();
    expect(mockStorage.removeItem).toHaveBeenCalledWith('testKey');
  });

  it('should clear storage', () => {
    storage.clear();
    expect(mockStorage.clear).toHaveBeenCalled();
  });
});