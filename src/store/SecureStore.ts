// secureStore.ts
import * as SecureStore from 'expo-secure-store';

const sanitizeKey = (key: string) => {
  return key.replace(/[^a-zA-Z0-9.\-_]/g, '_'); // replace invalid chars with _
};

export const secureStorage = {
  setItem: async (key: string, value: string) => {
    const safeKey = sanitizeKey(key);
    await SecureStore.setItemAsync(safeKey, value, {
      keychainService: safeKey, // optional for iOS
    });
  },
  getItem: async (key: string) => {
    const safeKey = sanitizeKey(key);
    return await SecureStore.getItemAsync(safeKey);
  },
  removeItem: async (key: string) => {
    const safeKey = sanitizeKey(key);
    await SecureStore.deleteItemAsync(safeKey);
  },
};

