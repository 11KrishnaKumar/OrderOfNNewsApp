import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
  Text,
  Animated,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getTopHeadlinesByCategory } from '../api/newsApi';
import NewsCard from '../components/NewsCard';
import { Article } from '../types/news';
import CategoryTabs from '../components/CategoryTabs';
import { getUserPreferences } from '../storage/userPreferences';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const DEFAULT_CATEGORIES = [
  'Top',
  'Technology',
  'Sports',
  'Business',
  'Health',
  'Science',
  'Entertainment',
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [loading, setLoading] = useState(false);
  const [preferredCategories, setPreferredCategories] = useState<string[]>([]);

  const scrollY = useRef(new Animated.Value(0)).current;

  const categoryBarHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [70, 40], // from big to small
    extrapolate: 'clamp',
  });

  useEffect(() => {
    // Load user preferences
    const loadPreferences = async () => {
      const prefs = await getUserPreferences();
      if (prefs.length > 0) {
        setPreferredCategories(prefs);
      } else {
        setPreferredCategories(DEFAULT_CATEGORIES);
      }
    };
    loadPreferences();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      loadNews(selectedCategory);
    }
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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🗞️ Latest News</Text>
        <Button
          title="Saved"
          onPress={() => navigation.navigate('SavedArticles')}
        />
      </View>

      {/* Category Tabs with Shrink Animation */}
      <Animated.View style={{ height: categoryBarHeight }}>
        <CategoryTabs
          categories={preferredCategories.length ? preferredCategories : DEFAULT_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </Animated.View>

      {/* News List */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={{ marginTop: 20 }}
        />
      ) : (
        <Animated.FlatList
          data={articles}
          keyExtractor={(item, index) =>
            item.url || item.title || index.toString()
          }
          renderItem={({ item }) => (
            <NewsCard
              article={item}
              onPress={() =>
                navigation.navigate('Article', { articleId: item.url })
              }
            />
          )}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
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
