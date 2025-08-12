import { SECRET_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "crypto-js";

export const secureStorage = {
  setItem: async (key: string, value: string) => {
    const encrypted = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
    await AsyncStorage.setItem(key, encrypted);
  },
  getItem: async (key: string) => {
    const encrypted = await AsyncStorage.getItem(key);
    if (!encrypted) return null;
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  },
  removeItem: (key: string) => AsyncStorage.removeItem(key),
};
