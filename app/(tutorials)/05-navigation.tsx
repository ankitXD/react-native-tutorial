import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

/**
 * TUTORIAL 5: Navigation with Expo Router
 * 
 * This tutorial teaches you:
 * - Expo Router basics
 * - Navigation structure
 * - Route parameters
 * - Navigation stack
 */

export default function NavigationTutorial() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.section}>
        <ThemedText type="title">Expo Router Navigation</ThemedText>

        {/* SECTION 1: What is Routing */}
        <ThemedView style={styles.lessonBox}>
          <ThemedText type="subtitle">1. What is Routing?</ThemedText>
          <ThemedText>
            {`Routing maps file paths to screens:
/app/index.tsx → home screen
/app/(tabs) → tab navigator
/app/modal.tsx → modal screen

Expo Router:
- File-based routing (like Next.js)
- Type-safe navigation
- Support for deep linking`}
          </ThemedText>
        </ThemedView>

        {/* SECTION 2: Project Structure */}
        <ThemedView style={styles.lessonBox}>
          <ThemedText type="subtitle">2. Project Structure</ThemedText>
          
          <View style={styles.structureBox}>
            <Text style={styles.structureText}>📁 app/</Text>
            <Text style={styles.structureSubtext}>  ├─ _layout.tsx (root layout)</Text>
            <Text style={styles.structureSubtext}>  ├─ index.tsx (home page)</Text>
            <Text style={styles.structureSubtext}>  ├─ modal.tsx (modal page)</Text>
            <Text style={styles.structureSubtext}>  └─ (tabs)/ (tab group)</Text>
            <Text style={styles.structureSubtext}>     ├─ _layout.tsx (tab layout)</Text>
            <Text style={styles.structureSubtext}>     ├─ index.tsx (first tab)</Text>
            <Text style={styles.structureSubtext}>     └─ explore.tsx (second tab)</Text>
          </View>

          <ThemedText style={styles.note}>
            📝 Folders in () are route groups (don't appear in URL)
          </ThemedText>
        </ThemedView>

        {/* SECTION 3: Basic Navigation */}
        <ThemedView style={styles.lessonBox}>
          <ThemedText type="subtitle">3. Basic Navigation</ThemedText>
          <ThemedText>
            Using useRouter() hook to navigate between screens
          </ThemedText>

          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.navButton}
              onPress={() => router.push('/')}
            >
              <Text style={styles.buttonText}>Go to Home</Text>
            </Pressable>

            <Pressable
              style={styles.navButton}
              onPress={() => router.push('/modal')}
            >
              <Text style={styles.buttonText}>Go to Modal</Text>
            </Pressable>

            <Pressable
              style={styles.navButton}
              onPress={() => router.back()}
            >
              <Text style={styles.buttonText}>Go Back</Text>
            </Pressable>
          </View>

          <ThemedText style={styles.codeBlock}>
{`const router = useRouter();

// Navigate to screen
router.push('/modal');

// Go back
router.back();

// Replace current screen
router.replace('/');`}
          </ThemedText>
        </ThemedView>

        {/* SECTION 4: Route Parameters */}
        <ThemedView style={styles.lessonBox}>
          <ThemedText type="subtitle">4. Route Parameters</ThemedText>
          <ThemedText>
            Pass data between screens using route parameters
          </ThemedText>

          <Pressable
            style={styles.navButton}
            onPress={() => router.push('/user/123?name=John')}
          >
            <Text style={styles.buttonText}>Navigate with Params</Text>
          </Pressable>

          <ThemedText style={styles.codeBlock}>
{`// File: app/user/[id].tsx
import { useLocalSearchParams } from 'expo-router';

export default function UserScreen() {
  const { id, name } = useLocalSearchParams();
  
  return <Text>User {id}: {name}</Text>;
}`}
          </ThemedText>
        </ThemedView>

        {/* SECTION 5: Navigation Patterns */}
        <ThemedView style={styles.lessonBox}>
          <ThemedText type="subtitle">5. Tab Navigation</ThemedText>
          <ThemedText>
            (tabs) creates a tab navigator at the bottom
          </ThemedText>

          <View style={styles.pattern}>
            <Text style={styles.patternTitle}>Structure for Tabs:</Text>
            <Text style={styles.patternCode}>
{`/app/(tabs)/
  ├─ _layout.tsx
  ├─ index.tsx (First tab)
  └─ explore.tsx (Second tab)`}
            </Text>
          </View>

          <View style={styles.pattern}>
            <Text style={styles.patternTitle}>_layout.tsx creates navigation:</Text>
            <Text style={styles.patternCode}>
{`export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{...}} />
      <Tabs.Screen name="explore" options={{...}} />
    </Tabs>
  );
}`}
            </Text>
          </View>
        </ThemedView>

        {/* SECTION 6: Deep Linking */}
        <ThemedView style={styles.lessonBox}>
          <ThemedText type="subtitle">6. Deep Linking</ThemedText>
          <ThemedText>
            Deep linking lets you navigate from external sources (emails, notifications)
          </ThemedText>

          <View style={styles.pattern}>
            <Text style={styles.patternTitle}>Supported URLs:</Text>
            <Text style={styles.patternCode}>
{`myapp://
myapp://home
myapp://user/123
myapp://post/456?view=full`}
            </Text>
          </View>

          <ThemedText style={styles.note}>
            📝 Configure deep linking in app.json
          </ThemedText>
        </ThemedView>

        {/* SECTION 7: Best Practices */}
        <ThemedView style={styles.lessonBox}>
          <ThemedText type="subtitle">7. Best Practices</ThemedText>

          <View style={styles.practice}>
            <Text style={styles.practiceTitle}>✓ Use Dynamic Routes</Text>
            <Text style={styles.practiceDesc}>
              [id] instead of hardcoding screen names
            </Text>
          </View>

          <View style={styles.practice}>
            <Text style={styles.practiceTitle}>✓ Type Your Params</Text>
            <Text style={styles.practiceCode}>
{`const { id } = useLocalSearchParams<{ id: string }>();`}
            </Text>
          </View>

          <View style={styles.practice}>
            <Text style={styles.practiceTitle}>✓ Use Route Groups</Text>
            <Text style={styles.practiceDesc}>
              Group related screens with (groupName)
            </Text>
          </View>

          <View style={styles.practice}>
            <Text style={styles.practiceTitle}>✗ Don't use href directly</Text>
            <Text style={styles.practiceDesc}>
              Use router.push() instead for better type safety
            </Text>
          </View>
        </ThemedView>

        <ThemedText style={styles.footer}>
          💡 Key Takeaway: Expo Router makes navigation type-safe and organized!
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
  structureBox: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 4,
    marginTop: 8,
  },
  structureText: {
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  structureSubtext: {
    fontFamily: 'monospace',
    fontSize: 11,
    marginBottom: 2,
  },
  buttonContainer: {
    gap: 8,
    marginTop: 8,
  },
  navButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  codeBlock: {
    fontFamily: 'monospace',
    fontSize: 11,
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 4,
    marginTop: 8,
    lineHeight: 18,
  },
  note: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#FFF9C4',
    borderRadius: 4,
    fontSize: 12,
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
  practice: {
    marginTop: 8,
    paddingLeft: 12,
  },
  practiceTitle: {
    fontWeight: '600',
    fontSize: 13,
    marginBottom: 4,
  },
  practiceDesc: {
    fontSize: 12,
    color: '#666666',
  },
  practiceCode: {
    fontFamily: 'monospace',
    fontSize: 11,
    backgroundColor: '#F5F5F5',
    padding: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  footer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#FFF9C4',
    borderRadius: 4,
    fontSize: 12,
  },
});
