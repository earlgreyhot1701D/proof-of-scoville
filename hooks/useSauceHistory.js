import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'sauce-history';

export async function getSauceHistory() {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}
