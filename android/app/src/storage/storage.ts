// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Article } from '../types/news';

// export const saveArticle = async (article: Article) => {
//   const stored = await AsyncStorage.getItem('savedArticles');
//   const saved = stored ? JSON.parse(stored) : [];
//   const updated = [...saved, article];
//   await AsyncStorage.setItem('savedArticles', JSON.stringify(updated));
// };

// export const getSavedArticles = async (): Promise<Article[]> => {
//   const stored = await AsyncStorage.getItem('savedArticles');
//   return stored ? JSON.parse(stored) : [];
// };

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Article } from '../types/news';

const STORAGE_KEY = 'saved_articles';

export const saveArticle = async (article: Article) => {
  const existing = await getSavedArticles();
  const updated = [...existing, article];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const getSavedArticles = async (): Promise<Article[]> => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const removeArticle = async (url: string) => {
  const existing = await getSavedArticles();
  const updated = existing.filter((a) => a.url !== url);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};
