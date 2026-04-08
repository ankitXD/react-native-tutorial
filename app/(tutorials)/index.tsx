import { ScrollView, StyleSheet, View, Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * TUTORIALS INDEX
 * 
 * This is the main index page for all tutorials.
 * Each tutorial teaches a specific React Native / Expo concept with practical examples.
 */

interface Tutorial {
  id: string;
  title: string;
  description: string;
  topics: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  color: string;
  routePath: string;
}

const TUTORIALS: Tutorial[] = [
  {
    id: '1',
    title: 'Components & Styling',
    description: 'Learn the basics of React Native components and how to style them',
    topics: ['View', 'Text', 'StyleSheet', 'Flexbox', 'Pressable'],
    difficulty: 'Beginner',
    color: '#FF6B6B',
    routePath: '/(tutorials)/01-components-styling',
  },
  {
    id: '2',
    title: 'State Management',
    description: 'Master useState hook for managing component state',
    topics: ['useState', 'State Updates', 'Counter', 'Todo List', 'Patterns'],
    difficulty: 'Beginner',
    color: '#4ECDC4',
    routePath: '/(tutorials)/02-state-management',
  },
  {
    id: '3',
    title: 'Hooks & Effects',
    description: 'Learn useEffect and other hooks for side effects and lifecycle',
    topics: ['useEffect', 'useCallback', 'Dependencies', 'Cleanup', 'Patterns'],
    difficulty: 'Intermediate',
    color: '#FFE66D',
    routePath: '/(tutorials)/03-hooks-and-effects',
  },
  {
    id: '4',
    title: 'Lists & Performance',
    description: 'Render efficient lists with FlatList and optimize performance',
    topics: ['FlatList', 'Keys', 'Performance Tips', 'Patterns'],
    difficulty: 'Intermediate',
    color: '#95E1D3',
    routePath: '/(tutorials)/04-lists-and-performance',
  },
  {
    id: '5',
    title: 'Navigation',
    description: 'Navigate between screens using Expo Router',
    topics: ['Expo Router', 'Routes', 'Parameters', 'Deep Linking', 'Tabs'],
    difficulty: 'Intermediate',
    color: '#F38181',
    routePath: '/(tutorials)/05-navigation',
  },
];

export default function TutorialsIndex() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isLight = colorScheme === 'light';

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return '#4CAF50';
      case 'Intermediate':
        return '#FF9800';
      case 'Advanced':
        return '#F44336';
      default:
        return '#999999';
    }
  };

  const handleTutorialPress = (tutorial: Tutorial) => {
    router.push(tutorial.routePath);
  };

  return (
    <ScrollView 
      style={[
        styles.container,
        { backgroundColor: isLight ? '#FFFFFF' : '#121212' }
      ]}
    >
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          React Native Tutorials
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Learn React Native & Expo by building real examples
        </ThemedText>
      </ThemedView>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{TUTORIALS.length}</Text>
          <Text style={styles.statLabel}>Tutorials</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>~1h</Text>
          <Text style={styles.statLabel}>Learning Time</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>Code</Text>
          <Text style={styles.statLabel}>Examples</Text>
        </View>
      </View>

      {/* Tutorial Cards */}
      <ThemedView style={styles.cardsContainer}>
        {TUTORIALS.map((tutorial, index) => (
          <Pressable
            key={tutorial.id}
            onPress={() => handleTutorialPress(tutorial)}
            style={({ pressed }) => [
              styles.tutorialCard,
              {
                opacity: pressed ? 0.8 : 1,
                borderLeftColor: tutorial.color,
              }
            ]}
          >
            {/* Card Header with Color */}
            <View
              style={[
                styles.cardHeader,
                { backgroundColor: tutorial.color }
              ]}
            >
              <Text style={styles.cardNumber}>{index + 1}</Text>
            </View>

            {/* Card Content */}
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{tutorial.title}</Text>
              <Text style={styles.cardDescription}>
                {tutorial.description}
              </Text>

              {/* Difficulty Badge */}
              <View
                style={[
                  styles.difficultyBadge,
                  { backgroundColor: getDifficultyColor(tutorial.difficulty) }
                ]}
              >
                <Text style={styles.difficultyText}>
                  {tutorial.difficulty}
                </Text>
              </View>

              {/* Topics */}
              <View style={styles.topicsContainer}>
                {tutorial.topics.slice(0, 3).map((topic, i) => (
                  <View key={i} style={styles.topicTag}>
                    <Text style={styles.topicText}>{topic}</Text>
                  </View>
                ))}
                {tutorial.topics.length > 3 && (
                  <View style={styles.topicTag}>
                    <Text style={styles.topicText}>
                      +{tutorial.topics.length - 3}
                    </Text>
                  </View>
                )}
              </View>

              {/* CTA */}
              <Text style={styles.cta}>Start Learning →</Text>
            </View>
          </Pressable>
        ))}
      </ThemedView>

      {/* How to Use */}
      <ThemedView style={styles.guideBox}>
        <ThemedText type="subtitle">How to Use These Tutorials</ThemedText>

        <View style={styles.guideItem}>
          <Text style={styles.guideNumber}>1</Text>
          <Text style={styles.guideText}>
            Read the explanation of each concept
          </Text>
        </View>

        <View style={styles.guideItem}>
          <Text style={styles.guideNumber}>2</Text>
          <Text style={styles.guideText}>
            Study the code examples with comments
          </Text>
        </View>

        <View style={styles.guideItem}>
          <Text style={styles.guideNumber}>3</Text>
          <Text style={styles.guideText}>
            Try interactive examples and buttons
          </Text>
        </View>

        <View style={styles.guideItem}>
          <Text style={styles.guideNumber}>4</Text>
          <Text style={styles.guideText}>
            Apply what you learned in your own projects
          </Text>
        </View>
      </ThemedView>

      {/* Tips */}
      <ThemedView style={styles.tipsBox}>
        <ThemedText type="subtitle">Tips for Learning</ThemedText>

        <Text style={styles.tipText}>
          💡 Read the code comments - they explain what's happening
        </Text>
        <Text style={styles.tipText}>
          💡 Interact with examples - buttons, inputs, etc.
        </Text>
        <Text style={styles.tipText}>
          💡 Modify the code and see what breaks
        </Text>
        <Text style={styles.tipText}>
          💡 Complete tutorials in order for best results
        </Text>
      </ThemedView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Ready to learn? Pick a tutorial above to get started!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#666666',
  },
  cardsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  tutorialCard: {
    borderRadius: 12,
    overflow: 'hidden',
    borderLeftWidth: 4,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    color: '#333333',
  },
  cardDescription: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 12,
    lineHeight: 18,
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 10,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  topicTag: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  topicText: {
    fontSize: 11,
    color: '#2E7D32',
    fontWeight: '500',
  },
  cta: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2196F3',
    marginTop: 8,
  },
  guideBox: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  guideItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
    gap: 12,
  },
  guideNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    minWidth: 24,
  },
  guideText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    color: '#555555',
  },
  tipsBox: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#FFF9C4',
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  tipText: {
    fontSize: 13,
    color: '#F57F17',
    marginBottom: 8,
    lineHeight: 18,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginTop: 12,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2196F3',
  },
});
