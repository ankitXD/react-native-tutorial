import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

/**
 * TUTORIAL 2: State Management with useState
 * 
 * This tutorial teaches you:
 * - What is state in React
 * - How to use useState hook
 * - Managing state updates
 * - State patterns
 */

export default function StateManagementTutorial() {
  // EXAMPLE 1: Simple counter
  const [count, setCount] = useState(0);

  // EXAMPLE 2: Boolean state
  const [isExpanded, setIsExpanded] = useState(false);

  // EXAMPLE 3: Object state
  const [user, setUser] = useState({
    name: 'John',
    age: 25,
    city: 'New York'
  });

  // EXAMPLE 4: Array state
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React Native', done: false },
    { id: 2, text: 'Build an app', done: false },
    { id: 3, text: 'Deploy it', done: false },
  ]);

  // Handler functions
  const handleAddTodo = () => {
    const newTodo = {
      id: todos.length + 1,
      text: 'New Task',
      done: false
    };
    setTodos([...todos, newTodo]);
  };

  const handleToggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const handleUpdateUser = () => {
    setUser({
      ...user,
      age: user.age + 1
    });
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.section}>
        <ThemedText type="title">State Management</ThemedText>

        {/* SECTION 1: What is State */}
        <ThemedView style={styles.lessonBox}>
          <ThemedText type="subtitle">1. What is State?</ThemedText>
          <ThemedText>
            {`State is data that can change over time.
When state changes, React re-renders the component.

Syntax: const [value, setValue] = useState(initialValue)`}
          </ThemedText>
        </ThemedView>

        {/* SECTION 2: Simple Counter */}
        <ThemedView style={styles.lessonBox}>
          <ThemedText type="subtitle">2. Simple Counter Example</ThemedText>
          <ThemedText>
            Count state: {count}
            Each time you press the button, count increases
          </ThemedText>

          <View style={styles.counterContainer}>
            <Text style={styles.counterDisplay}>{count}</Text>
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
              <Pressable
                style={styles.buttonSmall}
                onPress={() => setCount(0)}
              >
                <Text style={styles.buttonText}>Reset</Text>
              </Pressable>
            </View>
          </View>
        </ThemedView>

        {/* SECTION 3: Boolean State */}
        <ThemedView style={styles.lessonBox}>
          <ThemedText type="subtitle">3. Boolean State (Toggle)</ThemedText>
          <ThemedText>
            Showing toggle state
          </ThemedText>

          <Pressable
            style={styles.toggleButton}
            onPress={() => setIsExpanded(!isExpanded)}
          >
            <Text style={styles.buttonText}>
              {isExpanded ? '▼ Hide Details' : '▶ Show Details'}
            </Text>
          </Pressable>

          {isExpanded && (
            <View style={styles.expandedContent}>
              <Text style={styles.contentText}>
                This content is hidden when state is false
              </Text>
              <Text style={styles.contentText}>
                It appears when you toggle the state
              </Text>
            </View>
          )}
        </ThemedView>

        {/* SECTION 4: Object State */}
        <ThemedView style={styles.lessonBox}>
          <ThemedText type="subtitle">4. Object State (User Profile)</ThemedText>
          <ThemedText>
            Managing multiple related values in one state object
          </ThemedText>

          <View style={styles.objectStateBox}>
            <Text style={styles.label}>Name: {user.name}</Text>
            <Text style={styles.label}>Age: {user.age}</Text>
            <Text style={styles.label}>City: {user.city}</Text>

            <Pressable
              style={styles.button}
              onPress={handleUpdateUser}
            >
              <Text style={styles.buttonText}>Increase Age</Text>
            </Pressable>
          </View>

          <ThemedText style={styles.note}>
            📝 Note: When updating objects, use the spread operator (...) to create a new object
          </ThemedText>
        </ThemedView>

        {/* SECTION 5: Array State */}
        <ThemedView style={styles.lessonBox}>
          <ThemedText type="subtitle">5. Array State (Todo List)</ThemedText>
          <ThemedText>
            Managing lists of items with state
          </ThemedText>

          <View style={styles.listContainer}>
            {todos.map((todo) => (
              <Pressable
                key={todo.id}
                style={styles.todoItem}
                onPress={() => handleToggleTodo(todo.id)}
              >
                <Text style={[
                  styles.todoText,
                  todo.done && styles.todoDone
                ]}>
                  {todo.done ? '✓' : '○'} {todo.text}
                </Text>
              </Pressable>
            ))}
          </View>

          <Pressable
            style={styles.button}
            onPress={handleAddTodo}
          >
            <Text style={styles.buttonText}>+ Add Todo</Text>
          </Pressable>

          <ThemedText style={styles.note}>
            📝 Note: When adding to an array, create a new array with [...old, new]
          </ThemedText>
        </ThemedView>

        {/* KEY PATTERNS */}
        <ThemedView style={styles.lessonBox}>
          <ThemedText type="subtitle">Common State Patterns</ThemedText>

          <View style={styles.pattern}>
            <Text style={styles.patternTitle}>✓ DO: Immutable Updates</Text>
            <Text style={styles.patternCode}>
              setUser({'{...user, age: 30}'})
            </Text>
          </View>

          <View style={styles.pattern}>
            <Text style={styles.patternTitle}>✗ DON'T: Direct Mutation</Text>
            <Text style={styles.patternCode}>
              user.age = 30  // ❌ Wrong
            </Text>
          </View>
        </ThemedView>

        <ThemedText style={styles.footer}>
          💡 Key Takeaway: Always create new objects/arrays when updating state, never mutate directly!
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
  counterContainer: {
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  counterDisplay: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  buttonSmall: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    minWidth: 50,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  toggleButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  expandedContent: {
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 4,
    marginTop: 8,
  },
  contentText: {
    fontSize: 14,
    color: '#2E7D32',
    marginBottom: 8,
  },
  objectStateBox: {
    backgroundColor: '#F3E5F5',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: '#4A148C',
  },
  listContainer: {
    marginTop: 8,
    borderRadius: 4,
    backgroundColor: '#FAFAFA',
  },
  todoItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  todoText: {
    fontSize: 14,
  },
  todoDone: {
    textDecorationLine: 'line-through',
    color: '#999999',
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
    fontSize: 12,
    backgroundColor: '#F5F5F5',
    padding: 8,
    borderRadius: 4,
  },
  footer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#FFF9C4',
    borderRadius: 4,
    fontSize: 12,
  },
});
