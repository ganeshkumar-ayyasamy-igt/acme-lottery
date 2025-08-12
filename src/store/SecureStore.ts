import { SECRET_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

function encode(value: string): string {
  // Simple encoding using base64 and secret key
  return btoa(`${SECRET_KEY}:${value}`);
}

function decode(encoded: string): string | null {
  try {
    const decoded = atob(encoded);
    const parts = decoded.split(":");
    if (parts[0] === SECRET_KEY) {
      return parts.slice(1).join(":");
    }
    return null;
  } catch {
    return null;
  }
}

export const secureStorage = {
  setItem: async (key: string, value: string) => {
    const encodedValue = encode(value);
    await AsyncStorage.setItem(key, encodedValue);
  },
  getItem: async (key: string) => {
    const encodedValue = await AsyncStorage.getItem(key);
    return encodedValue ? decode(encodedValue) : null;
  },
  removeItem: (key: string) => AsyncStorage.removeItem(key),
};
