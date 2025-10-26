// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, ScrollView, StyleSheet, Linking } from 'react-native';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../navigation/AppNavigator';
// import axios from 'axios';

// type Props = NativeStackScreenProps<RootStackParamList, 'Article'>;

// interface Article {
//   title: string;
// description: string;
// urlToImage: string;
// url: string;
// }

// const ArticleScreen: React.FC<Props> = ({ route }) => {
//   const { articleId } = route.params;
//   const [article, setArticle] = useState<Article | null>(null);

//   useEffect(() => {
//     axios.get(`https://newsapi.org/v2/everything?apiKey=YOUR_API_KEY&q=${encodeURIComponent(articleId)}`)
//       .then(res => setArticle(res.data.articles[0]))
//       .catch(err => console.log(err));
//   }, [articleId]);

//   if (!article) return <Text>Loading...</Text>;

//   return (
//     <ScrollView style={styles.container}>
//       {article.urlToImage && <Image source={{ uri: article.urlToImage }} style={styles.image} />}
//       <Text style={styles.title}>{article.title}</Text>
//       <Text style={styles.description}>{article.description}</Text>
//       <Text style={styles.link} onPress={() => Linking.openURL(article.url)}>Read full article</Text>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   image: { width: '100%', height: 200, marginBottom: 16 },
//   title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
//   description: { fontSize: 16, marginBottom: 16 },
//   link: { color: 'blue', textDecorationLine: 'underline' }
// });

// export default ArticleScreen;


import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type ArticleScreenRouteProp = RouteProp<RootStackParamList, 'Article'>;

interface Props {
  route: ArticleScreenRouteProp;
}

const ArticleScreen: React.FC<Props> = ({ route }) => {
  const { articleId } = route.params; // we stored URL in articleId

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: articleId }}
        startInLoadingState
        renderLoading={() => <ActivityIndicator style={{ flex: 1 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default ArticleScreen;
