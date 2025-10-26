// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
// import { Article } from '../types/news';
// import { saveArticle } from '../storage/storage';

// interface Props {
//   article: Article;
//   onPress: () => void;
// }

// const NewsCard: React.FC<Props> = ({ article, onPress }) => (
//   <TouchableOpacity style={styles.card} onPress={onPress}>
//     {article.urlToImage && (
//       <Image source={{ uri: article.urlToImage }} style={styles.image} />
//     )}
//     <View style={styles.textContainer}>
//       <Text style={styles.title}>{article.title}</Text>
//       {/* <Text style={styles.source}>{article.source.name}</Text> */}
//       <Text style={styles.source}>{article.source?.name ?? 'Unknown Source'}</Text>
//       <Text numberOfLines={2} style={styles.description}>
//         {article.description}
//       </Text>
//       <Button title="Save" onPress={() => saveArticle(article)} />
//     </View>
//   </TouchableOpacity>
// );

// const styles = StyleSheet.create({
//   card: { marginBottom: 16, backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden', elevation: 3 },
//   image: { width: '100%', height: 180 },
//   textContainer: { padding: 10 },
//   title: { fontSize: 16, fontWeight: 'bold', color: '#333' },
//   source: { color: '#777', marginTop: 4 },
//   description: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 10,
//   },
// });

// export default NewsCard;

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import { Article } from '../types/news';
import { saveArticle } from '../storage/storage';

interface Props {
  article: Article;
  onPress: () => void;
}

const NewsCard: React.FC<Props> = ({ article, onPress }) => {
  const handleSave = async () => {
    try {
      await saveArticle(article);
      Alert.alert('✅ Article Saved', 'This article has been saved for offline reading.');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while saving the article.');
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {article.urlToImage && <Image source={{ uri: article.urlToImage }} style={styles.image} />}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{article.title}</Text>
        <Text numberOfLines={2} style={styles.description}>
          {article.description}
        </Text>

        {/* ✅ Save button with alert */}
        <Button title="Save" onPress={handleSave} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  image: { width: '100%', height: 180 },
  textContainer: { padding: 10 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  description: { fontSize: 14, color: '#555', marginBottom: 10 },
});

export default NewsCard;
