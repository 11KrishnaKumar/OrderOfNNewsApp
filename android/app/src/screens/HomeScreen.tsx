import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Button, ActivityIndicator, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getTopHeadlinesByCategory } from '../api/newsApi';
import NewsCard from '../components/NewsCard';
import { Article } from '../types/news';
import CategoryBar from '../components/CategoryBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoryTabs from '../components/CategoryTabs';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const CATEGORIES = ['General', 'Technology', 'Sports', 'Business', 'Health', 'Science', 'Entertainment'];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNews(selectedCategory);
  }, [selectedCategory]);

  const loadNews = async (category: string) => {
    try {
      setLoading(true);
      const data = await getTopHeadlinesByCategory(category);
      setArticles(data);
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🗞️ Latest News</Text>
        <Button title="Saved" onPress={() => navigation.navigate('SavedArticles')} />
      </View>

      {/* Category Tabs */}
      <CategoryTabs
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* News List */}
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, index) => item.url || item.title || index.toString()}
          renderItem={({ item }) => (
            <NewsCard
              article={item}
              onPress={() => navigation.navigate('Article', { articleId: item.url })}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', paddingHorizontal: 10 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});

export default HomeScreen;
