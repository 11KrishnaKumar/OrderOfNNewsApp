import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface Props {
  selected: string;
  onSelect: (category: string) => void;
}

const categories = ['technology', 'sports', 'business', 'health', 'science', 'entertainment'];

const CategoryBar: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[styles.category, selected === cat && styles.selected]}
          onPress={() => onSelect(cat)}
        >
          <Text style={[styles.text, selected === cat && styles.selectedText]}>
            {cat.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  category: {
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  selected: { backgroundColor: '#007BFF' },
  text: { color: '#333', fontSize: 14 },
  selectedText: { color: '#fff' },
});

export default CategoryBar;
