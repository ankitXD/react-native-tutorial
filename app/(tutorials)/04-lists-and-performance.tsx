import { StyleSheet, View, Text, ScrollView, FlatList, Pressable } from 'react-native';
import { useState } from 'react';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

/**
 * TUTORIAL 4: Lists & Performance Optimization
 * 
 * This tutorial teaches you:
 * - Rendering lists with FlatList
 * - Why FlatList over map()
 * - Key extraction
 * - Performance optimization
 */

interface Item {
  id: string;
  title: string;
  color: string;
}

export default function ListsAndPerformanceTutorial() {
  const [items, setItems] = useState<Item[]>([
    { id: '1', title: 'Item 1', color: '#FF6B6B' },
    { id: '2', title: 'Item 2', color: '#4ECDC4' },
    { id: '3', title: 'Item 3', color: '#FFE66D' },
    { id: '4', title: 'Item 4', color: '#95E1D3' },
    { id: '5', title: 'Item 5', color: '#F38181' },
    { id: '6', title: 'Item 6', color: '#AA96DA' },
    { id: '7', title: 'Item 7', color: '#FCBAD3' },
    { id: '8', title: 'Item 8', color: '#A8DADC' },
  ]);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Add new item
  const handleAddItem = () => {
    const newId = String(Math.max(...items.map(i => parseInt(i.id))) + 1);
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181'];
    setItems([
      ...items,
      {
        id: newId,
        title: `Item ${newId}`,
        color: colors[Math.floor(Math.random() * colors.length)]
      }
    ]);
  };

  // Remove item
  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Render function for list items
  const renderItem = ({ item }: { item: Item }) => (
    <Pressable
      style={[
        styles.listItem,
        selectedId === item.id && styles.listItemSelected,
        { backgroundColor: item.color }
      ]}
      onPress={() => setSelectedId(item.id)}
    >
      <Text style={styles.itemText}>{item.title}</Text>
      <Pressable
        style={styles.deleteButton}
        onPress={() => handleRemoveItem(item.id)}
      >
        <Text style={styles.deleteText}>×</Text>
      </Pressable>
    </Pressable>
  );

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.section}>
        <ThemedText type="title">Lists & Performance</ThemedText>

        {/* SECTION 1: Why FlatList */}
        <ThemedView style={styles.lessonBox}>
          <ThemedText type="subtitle">1. Why Use FlatList?</ThemedText>
          <ThemedText>
            {`map() in JSX renders ALL items at once:
- Bad performance with long lists
- All items kept in memory
- Scrolling becomes slow

FlatList renders only visible items:
- Better performance
- Memory efficient
- Smooth scrolling`}
          </ThemedText>
        </ThemedView>

        {/* SECTION 2: FlatList Basic Example */}
        <ThemedView style={styles.lessonBox}>
          <ThemedText type="subtitle">2. FlatList Example</ThemedText>
          <ThemedText>
            Total items: {items.length}
            {selectedId && ` | Selected: ${selectedId}`}
          </ThemedText>

          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            style={styles.flatList}
          />

          <Pressable style={styles.button} onPress={handleAddItem}>
            <Text style={styles.buttonText}>+ Add Item</Text>
          </Pressable>
        </ThemedView>

        {/* SECTION 3: Key Extraction */}
        <ThemedView style={styles.lessonBox}>
          <ThemedText type="subtitle">3. Key Extraction (Important!)</ThemedText>
          <ThemedText>
            {`Keys help React identify which items have changed:
- Use unique, stable IDs
- Never use index (causes bugs when list changes)
- Without keyExtractor, performance is bad

keyExtractor={(item) => item.id}`}
          </ThemedText>

          <View style={styles.warningBox}>
            <Text style={styles.warningTitle}>⚠️ Common Mistake</Text>
            <Text style={styles.warningText}>
              Using array index as key causes issues when items are added/removed/reordered
            </Text>
          </View>
        </ThemedView>

        {/* SECTION 4: Performance Tips */}
        <ThemedView style={styles.lessonBox}>
          <ThemedText type="subtitle">4. Performance Tips</ThemedText>

          <View style={styles.tip}>
            <Text style={styles.tipTitle}>✓ Use removeClippedSubviews</Text>
            <Text style={styles.tipCode}>
              {'<FlatList removeClippedSubviews={true} />'}
            </Text>
            <Text style={styles.tipDesc}>Unmounts items outside view</Text>
          </View>

          <View style={styles.tip}>
            <Text style={styles.tipTitle}>✓ Set maxToRenderPerBatch</Text>
            <Text style={styles.tipCode}>
              {'<FlatList maxToRenderPerBatch={10} />'}
            </Text>
            <Text style={styles.tipDesc}>Render fewer items per batch</Text>
          </View>

          <View style={styles.tip}>
            <Text style={styles.tipTitle}>✓ Use scrollEventThrottle</Text>
            <Text style={styles.tipCode}>
              {'<FlatList scrollEventThrottle={16} />'}
            </Text>
            <Text style={styles.tipDesc}>Better scroll performance</Text>
          </View>

          <View style={styles.tip}>
            <Text style={styles.tipTitle}>✓ Memoize renderItem</Text>
            <Text style={styles.tipCode}>
              {'const renderItem = useCallback(...)'}
            </Text>
            <Text style={styles.tipDesc}>Prevent unnecessary re-renders</Text>
          </View>
        </ThemedView>

        {/* SECTION 5: Common List Patterns */}
        <ThemedView style={styles.lessonBox}>
          <ThemedText type="subtitle">5. Common Patterns</ThemedText>

          <View style={styles.pattern}>
            <Text style={styles.patternTitle}>Pattern 1: Empty State</Text>
            <Text style={styles.patternCode}>
{`<FlatList
  data={items}
  renderItem={renderItem}
  ListEmptyComponent={<Text>No items</Text>}
/>`}
            </Text>
          </View>

          <View style={styles.pattern}>
            <Text style={styles.patternTitle}>Pattern 2: Header/Footer</Text>
            <Text style={styles.patternCode}>
{`<FlatList
  data={items}
  renderItem={renderItem}
  ListHeaderComponent={<Header />}
  ListFooterComponent={<Footer />}
/>`}
            </Text>
          </View>

          <View style={styles.pattern}>
            <Text style={styles.patternTitle}>Pattern 3: Horizontal Scroll</Text>
            <Text style={styles.patternCode}>
{`<FlatList
  horizontal={true}
  data={items}
  renderItem={renderItem}
/>`}
            </Text>
          </View>
        </ThemedView>

        <ThemedText style={styles.footer}>
          💡 Key Takeaway: Use FlatList for better performance with long lists!
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    gap: 16,
  },
  lessonBox: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 8,
  },
  flatList: {
    marginTop: 8,
    borderRadius: 4,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginVertical: 4,
    borderRadius: 8,
  },
  listItemSelected: {
    borderWidth: 3,
    borderColor: '#000000',
  },
  itemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  warningBox: {
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 4,
    marginTop: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  warningTitle: {
    fontWeight: '700',
    fontSize: 13,
    color: '#E65100',
    marginBottom: 4,
  },
  warningText: {
    fontSize: 12,
    color: '#E65100',
  },
  tip: {
    marginTop: 8,
    paddingLeft: 12,
  },
  tipTitle: {
    fontWeight: '600',
    fontSize: 13,
    marginBottom: 4,
    color: '#2E7D32',
  },
  tipCode: {
    fontFamily: 'monospace',
    fontSize: 11,
    backgroundColor: '#F5F5F5',
    padding: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  tipDesc: {
    fontSize: 12,
    color: '#666666',
  },
  pattern: {
    marginTop: 8,
    paddingLeft: 12,
  },
  patternTitle: {
    fontWeight: '600',
    fontSize: 13,
    marginBottom: 4,
  },
  patternCode: {
    fontFamily: 'monospace',
    fontSize: 11,
    backgroundColor: '#F5F5F5',
    padding: 8,
    borderRadius: 4,
    lineHeight: 18,
  },
  footer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#FFF9C4',
    borderRadius: 4,
    fontSize: 12,
  },
});
