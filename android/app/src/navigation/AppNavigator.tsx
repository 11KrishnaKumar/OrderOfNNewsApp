import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ArticleScreen from '../screens/ArticleScreen';
import SavedArticlesScreen from '../screens/SavedArticlesScreen';

export type RootStackParamList = {
  Home: undefined;
  Article: { articleId: string };
  SavedArticles: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Article" component={ArticleScreen} />
      <Stack.Screen name="SavedArticles" component={SavedArticlesScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
