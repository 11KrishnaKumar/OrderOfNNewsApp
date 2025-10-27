// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const saveUserPreferences = async (categories: string[]) => {
//   await AsyncStorage.setItem('userPreferences', JSON.stringify(categories));
// };

// export const getUserPreferences = async (): Promise<string[]> => {
//   const data = await AsyncStorage.getItem('userPreferences');
//   return data ? JSON.parse(data) : [];
// };

import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFS_KEY = 'USER_PREFERRED_CATEGORIES';

export const getUserPreferences = async (): Promise<string[]> => {
  try {
    const data = await AsyncStorage.getItem(PREFS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading preferences:', e);
    return [];
  }
};

export const saveUserPreferences = async (categories: string[]) => {
  try {
    await AsyncStorage.setItem(PREFS_KEY, JSON.stringify(categories));
  } catch (e) {
    console.error('Error saving preferences:', e);
  }
};
