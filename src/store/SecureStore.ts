import AsyncStorage from "@react-native-async-storage/async-storage";

export const secureStorage = {
  setItem: async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
  },
  getItem: async (key: string) => {
    return await AsyncStorage.getItem(key);
  },
  removeItem: (key: string) => AsyncStorage.removeItem(key),
};
