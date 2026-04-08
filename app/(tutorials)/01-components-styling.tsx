import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * TUTORIAL 1: Components & Styling
 *
 * This tutorial teaches you:
 * - Basic React Native components (View, Text)
 * - StyleSheet for efficient styling
 * - Flexbox layout
 * - Pressable for interactive elements
 */

export default function ComponentsAndStylingTutorial() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <ThemedView style={styles.section}>
          <ThemedText type="title">Components & Styling</ThemedText>

          {/* SECTION 1: Basic Components */}
          <ThemedView style={styles.lessonBox}>
            <ThemedText type="subtitle">1. Basic Components</ThemedText>
            <ThemedText>
              {`View is the basic building block (like div in web)
Text is for displaying text content`}
            </ThemedText>

            <View style={styles.demonstration}>
              <View style={styles.box1}>
                <Text style={styles.boxText}>I'm a View</Text>
              </View>
              <Text style={styles.demoText}>I'm Text</Text>
            </View>
          </ThemedView>

          {/* SECTION 2: Flexbox Layout */}
          <ThemedView style={styles.lessonBox}>
            <ThemedText type="subtitle">2. Flexbox Layout</ThemedText>
            <ThemedText>
              React Native uses Flexbox by default for layout. flex: 1 means
              "take equal space"
            </ThemedText>

            <View style={styles.flexContainer}>
              <View style={[styles.flexBox, { backgroundColor: "#FF6B6B" }]} />
              <View style={[styles.flexBox, { backgroundColor: "#4ECDC4" }]} />
              <View style={[styles.flexBox, { backgroundColor: "#FFE66D" }]} />
            </View>
          </ThemedView>

          {/* SECTION 3: Styling with StyleSheet */}
          <ThemedView style={styles.lessonBox}>
            <ThemedText type="subtitle">3. StyleSheet API</ThemedText>
            <ThemedText>
              {`StyleSheet.create() creates optimized styles
More performant than inline styles
Also provides type checking in TypeScript`}
            </ThemedText>

            <View style={styles.styledBox}>
              <Text
                style={[styles.styledText, isDark && styles.styledTextDark]}
              >
                I'm using StyleSheet
              </Text>
            </View>
          </ThemedView>

          {/* SECTION 4: Interactive Elements */}
          <ThemedView style={styles.lessonBox}>
            <ThemedText type="subtitle">4. Pressable Component</ThemedText>
            <ThemedText>
              Pressable makes elements interactive. It provides pressed state
              styling.
            </ThemedText>

            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => alert("Button pressed!")}
            >
              <Text style={styles.buttonText}>Press Me!</Text>
            </Pressable>
          </ThemedView>

          {/* SECTION 5: Common Patterns */}
          <ThemedView style={styles.lessonBox}>
            <ThemedText type="subtitle">5. Common Styling Patterns</ThemedText>

            {/* Card Pattern */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Card Component</Text>
              <Text style={styles.cardDescription}>
                Cards are commonly used for content containers
              </Text>
            </View>

            {/* Row Layout */}
            <View style={styles.row}>
              <View style={styles.avatar} />
              <View style={styles.flex1}>
                <Text style={styles.rowTitle}>User Name</Text>
                <Text style={styles.rowSubtitle}>Some description</Text>
              </View>
            </View>
          </ThemedView>

          <ThemedText style={styles.footer}>
            💡 Key Takeaway: React Native styling is similar to CSS but uses JS
            objects and camelCase property names
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
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
    borderColor: "#E0E0E0",
    gap: 8,
  },
  demonstration: {
    marginTop: 8,
    gap: 8,
  },
  box1: {
    backgroundColor: "#E8F5E9",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  boxText: {
    fontWeight: "600",
  },
  demoText: {
    fontSize: 14,
    fontWeight: "500",
  },
  flexContainer: {
    flexDirection: "row",
    height: 80,
    marginTop: 8,
    gap: 8,
  },
  flexBox: {
    flex: 1,
    borderRadius: 8,
  },
  styledBox: {
    backgroundColor: "#F3E5F5",
    padding: 12,
    borderRadius: 4,
    marginTop: 8,
  },
  styledText: {
    fontSize: 14,
    color: "#4A148C",
    fontWeight: "600",
  },
  styledTextDark: {
    color: "#CE93D8",
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonPressed: {
    backgroundColor: "#1565C0",
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666666",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#90CAF9",
  },
  flex1: {
    flex: 1,
  },
  rowTitle: {
    fontWeight: "600",
    fontSize: 14,
  },
  rowSubtitle: {
    fontSize: 12,
    color: "#999999",
  },
  footer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#FFF9C4",
    borderRadius: 4,
    fontSize: 12,
  },
});
