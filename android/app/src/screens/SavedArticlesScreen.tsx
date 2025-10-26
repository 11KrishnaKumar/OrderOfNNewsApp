// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// interface Article {
//   title: string;
//   url: string;
// }

// const SavedArticlesScreen = () => {
//   const [savedArticles, setSavedArticles] = useState<Article[]>([]);

//   const loadSavedArticles = async () => {
//     const data = await AsyncStorage.getItem('savedArticles');
//     if (data) setSavedArticles(JSON.parse(data));
//   };

//   useEffect(() => {
//     loadSavedArticles();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {savedArticles.length === 0 ? (
//         <Text>No saved articles</Text>
//       ) : (
//         <FlatList
//           data={savedArticles}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => (
//             <TouchableOpacity onPress={() => console.log('Open article', item.url)}>
//               <Text style={styles.title}>{item.title}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   title: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 }
// });

// export default SavedArticlesScreen;

// import React, { useEffect, useState } from 'react';
// import { View, FlatList, StyleSheet } from 'react-native';
// // import { getSavedArticles } from '../utils/storage';
// import { getSavedArticles } from '../storage/storage';
// import NewsCard from '../components/NewsCard';
// import { Article } from '../types/news';

// const SavedArticlesScreen: React.FC = () => {
//   const [articles, setArticles] = useState<Article[]>([]);

//   useEffect(() => {
//     loadSaved();
//   }, []);

//   const loadSaved = async () => {
//     const saved = await getSavedArticles();
//     setArticles(saved);
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={articles}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => <NewsCard article={item} 
//         onPress={() => {}}
//         />}
        
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
// });

// export default SavedArticlesScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import { Article } from '../types/news';
import { getSavedArticles, removeArticle } from '../storage/storage';
import NewsCard from '../components/NewsCard';

const SavedArticlesScreen: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  const loadArticles = async () => {
    const saved = await getSavedArticles();
    setArticles(saved);
  };

  const handleRemove = async (url: string) => {
    await removeArticle(url);
    Alert.alert('🗑️ Article Removed', 'The article has been removed.');
    loadArticles();
  };

  useEffect(() => {
    const unsubscribe = loadArticles();
    return () => {
      // clean up
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Saved Articles</Text>
      {articles.length === 0 ? (
        <Text style={styles.empty}>No saved articles yet.</Text>
      ) : (
        <FlatList
          data={articles}
        //   keyExtractor={(item) => item.url}
          keyExtractor={(item, index) => item.url || item.title || index.toString()} // ✅ Safe fallback
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <NewsCard article={item} onPress={() => {}} />
              <Button title="Remove" color="red" onPress={() => handleRemove(item.url || item.title)} />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f2f2f2' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  empty: { textAlign: 'center', marginTop: 50, color: '#777' },
  cardContainer: { marginBottom: 16 },
});

export default SavedArticlesScreen;

