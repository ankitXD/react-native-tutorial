import { StyleSheet, View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

/**
 * TUTORIAL 3: Hooks & Side Effects
 * 
 * This tutorial teaches you:
 * - What are React Hooks
 * - useEffect for side effects
 * - useCallback for memoized functions
 * - Common Hook patterns
 */

export default function HooksAndEffectsTutorial() {
  // EXAMPLE 1: useEffect for data fetching simulation
  const [data, setData] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [renderCount, setRenderCount] = useState(0);

  // EXAMPLE 2: useEffect with dependencies
  const [count, setCount] = useState(0);
  const [squared, setSquared] = useState(0);

  // EXAMPLE 3: useEffect cleanup
  const [timerRunning, setTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // EXAMPLE 4: InputField with useCallback
  const [inputValue, setInputValue] = useState('');

  // useEffect Example 1: Runs once on component mount
  useEffect(() => {
    console.log('Component mounted!');
    return () => {
      console.log('Component unmounting!');
    };
  }, []); // Empty dependency array = run only on mount

  // useEffect Example 2: Runs when count changes
  useEffect(() => {
    setSquared(count * count);
  }, [count]); // Dependency array with count = run when count changes

  // useEffect Example 3: Timer with cleanup
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerRunning) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }

    // Cleanup function
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning]); // Run when timerRunning changes

  // useCallback Example: Memoized function
  const handleSearch = useCallback((text: string) => {
    setInputValue(text);
    if (text.length > 0) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setData(`Results for "${text}"`);
        setLoading(false);
      }, 500);
    } else {
      setData('');
    }
  }, []);

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.section}>
        <ThemedText type="title">Hooks & Side Effects</ThemedText>

        {/* SECTION 1: What are Hooks */}
        <ThemedView style={styles.lessonBox}>
          <ThemedText type="subtitle">1. What are Hooks?</ThemedText>
          <ThemedText>
            {`Hooks are special functions that let you "hook into" React features:
- useState: Manage local state
- useEffect: Handle side effects
- useCallback: Memoize functions
- useContext: Access global state
- And more...

Rules of Hooks:
1. Only call at top level (not in loops, conditionals)
2. Only call from React components/custom hooks`}
          </ThemedText>
        </ThemedView>

        {/* SECTION 2: useEffect Basics */}
        <ThemedView style={styles.lessonBox}>
          <ThemedText type="subtitle">2. useEffect - Run Code After Render</ThemedText>
          <ThemedText>
            {`useEffect runs after the component renders.
Component rendered {renderCount} times`}
          </ThemedText>

          <Pressable
            style={styles.button}
            onPress={() => setRenderCount(renderCount + 1)}
          >
            <Text style={styles.buttonText}>Trigger Re-render</Text>
          </Pressable>

          <ThemedText style={styles.note}>
            📝 useEffect with empty [] only runs once on mount
          </ThemedText>
        </ThemedView>

        {/* SECTION 3: useEffect with Dependencies */}
        <ThemedView style={styles.lessonBox}>
          <ThemedText type="subtitle">3. useEffect Dependencies</ThemedText>
          <ThemedText>
            {`Dependency array controls when effect runs:
- No array: Run after every render
- Empty []: Run once on mount
- [dependency]: Run when dependency changes

Count: {count}
Squared: {squared}`}
          </ThemedText>

          <View style={styles.buttonRow}>
            <Pressable
              style={styles.buttonSmall}
              onPress={() => setCount(count - 1)}
            >
              <Text style={styles.buttonText}>-</Text>
            </Pressable>
            <Pressable
              style={styles.buttonSmall}
              onPress={() => setCount(count + 1)}
            >
              <Text style={styles.buttonText}>+</Text>
            </Pressable>
          </View>

          <ThemedText style={styles.info}>
            Notice: Squared updates automatically when count changes
          </ThemedText>
        </ThemedView>

        {/* SECTION 4: useEffect Cleanup */}
        <ThemedView style={styles.lessonBox}>
          <ThemedText type="subtitle">4. useEffect Cleanup (Timer Example)</ThemedText>
          <ThemedText>
            {`Return a cleanup function from useEffect to run code on unmount or before re-running.

Timer: {seconds}s`}
          </ThemedText>

          <View style={styles.timerDisplay}>
            <Text style={styles.timerText}>{seconds}</Text>
          </View>

          <Pressable
            style={[styles.button, timerRunning && styles.buttonActive]}
            onPress={() => setTimerRunning(!timerRunning)}
          >
            <Text style={styles.buttonText}>
              {timerRunning ? 'Stop Timer' : 'Start Timer'}
            </Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => setSeconds(0)}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </Pressable>

          <ThemedText style={styles.note}>
            📝 Cleanup function prevents memory leaks by clearing intervals/timeouts
          </ThemedText>
        </ThemedView>

        {/* SECTION 5: useCallback */}
        <ThemedView style={styles.lessonBox}>
          <ThemedText type="subtitle">5. useCallback - Memoized Functions</ThemedText>
          <ThemedText>
            {`useCallback memoizes a function so it's not recreated on every render.
Useful for passing functions to child components.`}
          </ThemedText>

          <TextInput
            style={styles.input}
            placeholder="Type to search..."
            value={inputValue}
            onChangeText={handleSearch}
          />

          {loading && <Text style={styles.loadingText}>Loading...</Text>}
          {data && <Text style={styles.resultText}>{data}</Text>}
        </ThemedView>

        {/* SECTION 6: Common Patterns */}
        <ThemedView style={styles.lessonBox}>
          <ThemedText type="subtitle">6. Common Hook Patterns</ThemedText>

          <View style={styles.pattern}>
            <Text style={styles.patternTitle}>Pattern 1: Fetch Data on Mount</Text>
            <Text style={styles.patternCode}>
{`useEffect(() => {
  fetchData();
}, []);`}
            </Text>
          </View>

          <View style={styles.pattern}>
            <Text style={styles.patternTitle}>Pattern 2: React to Prop Change</Text>
            <Text style={styles.patternCode}>
{`useEffect(() => {
  handlePropChange();
}, [prop]);`}
            </Text>
          </View>

          <View style={styles.pattern}>
            <Text style={styles.patternTitle}>Pattern 3: Cleanup on Unmount</Text>
            <Text style={styles.patternCode}>
{`useEffect(() => {
  setupListener();
  return () => removeListener();
}, []);`}
            </Text>
          </View>
        </ThemedView>

        <ThemedText style={styles.footer}>
          💡 Key Takeaway: Hooks let you use React features in functional components!
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
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonActive: {
    backgroundColor: '#FF6B6B',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  buttonSmall: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    minWidth: 50,
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  timerDisplay: {
    backgroundColor: '#F0F0F0',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 8,
    backgroundColor: '#FAFAFA',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
  },
  resultText: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#E8F5E9',
    borderRadius: 4,
    color: '#2E7D32',
    fontWeight: '500',
  },
  note: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#FFF9C4',
    borderRadius: 4,
    fontSize: 12,
  },
  info: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#E3F2FD',
    borderRadius: 4,
    fontSize: 12,
    color: '#1565C0',
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
