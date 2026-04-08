import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Topic {
  id: string;
  title: string;
  description: string;
  color: string;
  route: string;
}

const TOPICS: Topic[] = [
  {
    id: "1",
    title: "Components & Styling",
    description: "Learn basic components and styling",
    color: "#FF6B6B",
    route: "/(tutorials)/01-components-styling",
  },
  {
    id: "2",
    title: "State Management",
    description: "Master useState hook",
    color: "#4ECDC4",
    route: "/(tutorials)/02-state-management",
  },
  {
    id: "3",
    title: "Hooks & Effects",
    description: "useEffect and other hooks",
    color: "#FFE66D",
    route: "/(tutorials)/03-hooks-and-effects",
  },
  {
    id: "4",
    title: "Lists & Performance",
    description: "Render efficient lists with FlatList",
    color: "#95E1D3",
    route: "/(tutorials)/04-lists-and-performance",
  },
  {
    id: "5",
    title: "Navigation",
    description: "Navigate with Expo Router",
    color: "#F38181",
    route: "/(tutorials)/05-navigation",
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            React Native Tutorials
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Learn by doing with real code examples
          </ThemedText>
        </ThemedView>

        <View style={styles.topicsContainer}>
          {TOPICS.map((topic) => (
            <Pressable
              key={topic.id}
              onPress={() => router.push(topic.route as any)}
              style={({ pressed }) => [
                styles.topicCard,
                {
                  backgroundColor: topic.color,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text style={styles.topicNumber}>{topic.id}</Text>
              <Text style={styles.topicTitle}>{topic.title}</Text>
              <Text style={styles.topicDescription}>{topic.description}</Text>
              <Text style={styles.arrow}>→</Text>
            </Pressable>
          ))}
        </View>

        <ThemedView style={styles.footer}>
          <ThemedText style={styles.footerText}>
            💡 Tap any topic to start learning
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    color: "#666666",
  },
  topicsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  topicCard: {
    padding: 20,
    borderRadius: 12,
    position: "relative",
  },
  topicNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    opacity: 0.3,
    marginBottom: 8,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  topicDescription: {
    fontSize: 13,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  arrow: {
    fontSize: 24,
    color: "#FFFFFF",
    position: "absolute",
    right: 16,
    top: 16,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  footerText: {
    fontSize: 14,
    color: "#666666",
  },
});
