import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryTabs: React.FC<Props> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollContainer}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.tab,
            selectedCategory === category && styles.activeTab,
          ]}
          onPress={() => onSelectCategory(category)}
        >
          <Text
            style={[
              styles.tabText,
              selectedCategory === category && styles.activeTabText,
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 0,
    paddingVertical: 8,
    marginBottom: 8,
  },
  tab: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeTab: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  tabText: {
    color: '#333',
    fontSize: 15,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
});

export default CategoryTabs;
