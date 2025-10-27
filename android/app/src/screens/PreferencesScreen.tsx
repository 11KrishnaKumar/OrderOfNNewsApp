import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getUserPreferences, saveUserPreferences } from '../storage/userPreferences';

type PreferencesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Preferences'
>;

interface Props {
  navigation: PreferencesScreenNavigationProp;
}

const ALL_CATEGORIES = [
  'Top',
  'Technology',
  'Sports',
  'Business',
  'Health',
  'Science',
  'Entertainment',
  'Politics',
  'World',
];

const PreferencesScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadPrefs = async () => {
      const prefs = await getUserPreferences();
      setSelectedCategories(prefs);
    };
    loadPrefs();
  }, []);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSave = async () => {
    await saveUserPreferences(selectedCategories);
    Alert.alert('✅ Preferences Saved', 'Your personalized feed has been updated!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧭 Choose Your Favorite Categories</Text>

      <View style={styles.categoryContainer}>
        {ALL_CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategories.includes(category) && styles.selectedCategory,
            ]}
            onPress={() => toggleCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategories.includes(category) && styles.selectedText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.saveButtonContainer}>
        <Button title="Save Preferences" onPress={handleSave} color="#007AFF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 16 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    margin: 6,
    backgroundColor: '#fff',
  },
  selectedCategory: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryText: {
    color: '#333',
    fontSize: 15,
  },
  selectedText: {
    color: '#fff',
    fontWeight: '600',
  },
  saveButtonContainer: {
    marginTop: 20,
  },
});

export default PreferencesScreen;

