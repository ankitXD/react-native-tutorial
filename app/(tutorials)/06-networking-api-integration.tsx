import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

/**
 * Tutorial: Networking & API Integration
 *
 * In this tutorial, you'll learn:
 * 1. Making HTTP requests with fetch()
 * 2. Handling loading and error states
 * 3. Processing API responses
 * 4. Best practices for data fetching
 * 5. Real-world examples with free APIs
 */

// ============================================
// EXAMPLE 1: Basic Fetch Pattern
// ============================================
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function BasicFetchExample() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch from JSONPlaceholder - a free fake API
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1",
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPost(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.section}>
      <ThemedText type="subtitle">Example 1: Basic Fetch</ThemedText>
      <ThemedText style={styles.description}>
        Learn the fundamental pattern for fetching data from an API.
      </ThemedText>

      <TouchableOpacity
        style={styles.button}
        onPress={fetchPost}
        disabled={loading}
      >
        <ThemedText style={styles.buttonText}>
          {loading ? "Loading..." : "Fetch Post"}
        </ThemedText>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" style={styles.loader} />}

      {error && (
        <ThemedView style={styles.errorBox}>
          <ThemedText style={styles.errorText}>Error: {error}</ThemedText>
        </ThemedView>
      )}

      {post && !loading && (
        <ThemedView style={styles.resultBox}>
          <ThemedText style={styles.resultTitle}>{post.title}</ThemedText>
          <ThemedText style={styles.resultBody}>{post.body}</ThemedText>
          <ThemedText style={styles.resultMeta}>Post ID: {post.id}</ThemedText>
        </ThemedView>
      )}

      <ThemedView style={styles.codeBlock}>
        <ThemedText style={styles.codeTitle}>How it works:</ThemedText>
        <ThemedText style={styles.code}>
          {`const fetchPost = async () => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(...);
  const data = await response.json();
  setPost(data);
}`}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

// ============================================
// EXAMPLE 2: Fetching with Parameters & Headers
// ============================================
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

function AdvancedFetchExample() {
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState("1");
  const [loading, setLoading] = useState(false);

  const fetchUser = async (id: string) => {
    try {
      setLoading(true);
      // Fetch specific user by ID
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) throw new Error("User not found");
      const data = await response.json();
      setUser(data);
    } catch (err) {
      Alert.alert(
        "Error",
        err instanceof Error ? err.message : "Failed to fetch",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.section}>
      <ThemedText type="subtitle">
        Example 2: Query Parameters & Headers
      </ThemedText>
      <ThemedText style={styles.description}>
        Pass data to the API using parameters and custom headers.
      </ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Enter user ID (1-10)"
        value={userId}
        onChangeText={setUserId}
        keyboardType="number-pad"
        placeholderTextColor="#999"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => fetchUser(userId)}
        disabled={loading}
      >
        <ThemedText style={styles.buttonText}>
          {loading ? "Loading..." : "Fetch User"}
        </ThemedText>
      </TouchableOpacity>

      {user && !loading && (
        <ThemedView style={styles.resultBox}>
          <ThemedText style={styles.resultTitle}>{user.name}</ThemedText>
          <ThemedText>Email: {user.email}</ThemedText>
          <ThemedText>Phone: {user.phone}</ThemedText>
        </ThemedView>
      )}

      <ThemedView style={styles.codeBlock}>
        <ThemedText style={styles.codeTitle}>Key Points:</ThemedText>
        <ThemedText style={styles.code}>
          {`• Build URLs with parameters
• Set headers for content type
• Handle different status codes
• Always validate responses`}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

// ============================================
// EXAMPLE 3: POST Request with Data Submission
// ============================================
function PostRequestExample() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const createPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: "New Post from App",
            body: "This was created via React Native!",
            userId: 1,
          }),
        },
      );

      if (!response.ok) throw new Error("Failed to create post");
      const data = await response.json();
      setResult(data);
    } catch (err) {
      Alert.alert(
        "Error",
        err instanceof Error ? err.message : "Request failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.section}>
      <ThemedText type="subtitle">Example 3: POST Request</ThemedText>
      <ThemedText style={styles.description}>
        Send data to the server using POST requests.
      </ThemedText>

      <TouchableOpacity
        style={styles.button}
        onPress={createPost}
        disabled={loading}
      >
        <ThemedText style={styles.buttonText}>
          {loading ? "Creating..." : "Create Post"}
        </ThemedText>
      </TouchableOpacity>

      {result && !loading && (
        <ThemedView style={styles.resultBox}>
          <ThemedText style={styles.resultTitle}>Post Created!</ThemedText>
          <ThemedText>ID: {result.id}</ThemedText>
          <ThemedText>Title: {result.title}</ThemedText>
        </ThemedView>
      )}

      <ThemedView style={styles.codeBlock}>
        <ThemedText style={styles.codeTitle}>POST Example:</ThemedText>
        <ThemedText style={styles.code}>
          {`fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
}).then(r => r.json())`}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

// ============================================
// EXAMPLE 4: Real-World API - Random Users
// ============================================
interface RandomUser {
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: {
    medium: string;
  };
  location: {
    city: string;
    country: string;
  };
}

function RealWorldAPIExample() {
  const [user, setUser] = useState<RandomUser | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomUser = async () => {
    try {
      setLoading(true);
      // Real API: Random User Generator
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      setUser(data.results[0]);
    } catch (err) {
      Alert.alert("Error", "Failed to fetch random user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.section}>
      <ThemedText type="subtitle">
        Example 4: Real API - Random Users
      </ThemedText>
      <ThemedText style={styles.description}>
        Fetch real data from a public API.
      </ThemedText>

      <TouchableOpacity
        style={styles.button}
        onPress={fetchRandomUser}
        disabled={loading}
      >
        <ThemedText style={styles.buttonText}>
          {loading ? "Loading..." : "Get Random User"}
        </ThemedText>
      </TouchableOpacity>

      {user && !loading && (
        <ThemedView style={styles.userCard}>
          <Image
            source={{ uri: user.picture.medium }}
            style={styles.userImage}
          />
          <ThemedText style={styles.resultTitle}>
            {user.name.first} {user.name.last}
          </ThemedText>
          <ThemedText>📧 {user.email}</ThemedText>
          <ThemedText>
            📍 {user.location.city}, {user.location.country}
          </ThemedText>
        </ThemedView>
      )}

      <ThemedView style={styles.codeBlock}>
        <ThemedText style={styles.codeTitle}>API Used:</ThemedText>
        <ThemedText style={styles.code}>
          {`https://randomuser.me/api/
Free API for random user profiles
No authentication required`}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

// ============================================
// EXAMPLE 5: Error Handling & Timeout
// ============================================
function ErrorHandlingExample() {
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fetchWithTimeout = async (url: string, timeout: number = 5000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      setLoading(true);
      setStatus("Fetching...");

      const response = await fetch(url, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        setStatus(`Error: ${response.status} ${response.statusText}`);
        return;
      }

      const data = await response.json();
      setStatus(`Success: Got ${JSON.stringify(data).length} bytes`);
    } catch (err: any) {
      if (err.name === "AbortError") {
        setStatus("Request timed out!");
      } else {
        setStatus(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.section}>
      <ThemedText type="subtitle">
        Example 5: Error Handling & Timeout
      </ThemedText>
      <ThemedText style={styles.description}>
        Handle errors, timeouts, and network issues gracefully.
      </ThemedText>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          fetchWithTimeout("https://jsonplaceholder.typicode.com/posts/1", 5000)
        }
        disabled={loading}
      >
        <ThemedText style={styles.buttonText}>
          {loading ? "Loading..." : "Test Error Handling"}
        </ThemedText>
      </TouchableOpacity>

      {status && (
        <ThemedView
          style={[
            styles.resultBox,
            status.includes("Error") && styles.errorBoxAlt,
          ]}
        >
          <ThemedText>{status}</ThemedText>
        </ThemedView>
      )}

      <ThemedView style={styles.codeBlock}>
        <ThemedText style={styles.codeTitle}>Best Practices:</ThemedText>
        <ThemedText style={styles.code}>
          {`✓ Set timeouts for requests
✓ Handle network errors
✓ Check response status codes
✓ Validate response data
✓ Show loading indicators
✓ Clear timers on cleanup`}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

// ============================================
// Main Tutorial Screen
// ============================================
export default function NetworkingTutorial() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Networking & API Integration</ThemedText>
        <ThemedText style={styles.subtitle}>
          Master HTTP requests, data fetching, and API integration in React
          Native
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.content}>
        <BasicFetchExample />
        <AdvancedFetchExample />
        <PostRequestExample />
        <RealWorldAPIExample />
        <ErrorHandlingExample />

        {/* Key Concepts Summary */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Key Concepts</ThemedText>

          <ThemedView style={styles.concept}>
            <ThemedText style={styles.conceptTitle}>🔗 HTTP Methods</ThemedText>
            <ThemedText style={styles.conceptText}>
              GET: Retrieve data • POST: Create data • PUT: Update data •
              DELETE: Remove data
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.concept}>
            <ThemedText style={styles.conceptTitle}>
              ⚙️ Request Lifecycle
            </ThemedText>
            <ThemedText style={styles.conceptText}>
              1. Start loading state • 2. Make request • 3. Handle response • 4.
              Update state • 5. Stop loading
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.concept}>
            <ThemedText style={styles.conceptTitle}>
              🛡️ Error Handling
            </ThemedText>
            <ThemedText style={styles.conceptText}>
              Always wrap in try-catch • Check response.ok • Set timeouts • Show
              user feedback
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.concept}>
            <ThemedText style={styles.conceptTitle}>📊 Status Codes</ThemedText>
            <ThemedText style={styles.conceptText}>
              2xx: Success • 4xx: Client error • 5xx: Server error • Network:
              Connection issues
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Free APIs to Try */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Free APIs to Experiment With</ThemedText>

          <ThemedView style={styles.apiItem}>
            <ThemedText style={styles.apiName}>🔴 JSONPlaceholder</ThemedText>
            <ThemedText style={styles.apiUrl}>
              jsonplaceholder.typicode.com
            </ThemedText>
            <ThemedText style={styles.apiDesc}>
              Posts, users, comments, todos data
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.apiItem}>
            <ThemedText style={styles.apiName}>👤 Random User API</ThemedText>
            <ThemedText style={styles.apiUrl}>randomuser.me/api</ThemedText>
            <ThemedText style={styles.apiDesc}>
              Random user profiles with images
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.apiItem}>
            <ThemedText style={styles.apiName}>🎮 PokéAPI</ThemedText>
            <ThemedText style={styles.apiUrl}>pokeapi.co/api/v2</ThemedText>
            <ThemedText style={styles.apiDesc}>
              Pokémon data and information
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.apiItem}>
            <ThemedText style={styles.apiName}>🧠 Open Trivia DB</ThemedText>
            <ThemedText style={styles.apiUrl}>opentdb.com/api.php</ThemedText>
            <ThemedText style={styles.apiDesc}>
              Trivia questions with categories
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.apiItem}>
            <ThemedText style={styles.apiName}>🐱 TheCatAPI</ThemedText>
            <ThemedText style={styles.apiUrl}>
              api.thecatapi.com/v1/images/search
            </ThemedText>
            <ThemedText style={styles.apiDesc}>
              Random cat images and breeds
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Common Patterns */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Common Patterns</ThemedText>

          <ThemedView style={styles.pattern}>
            <ThemedText style={styles.patternTitle}>
              Pattern 1: Fetch on Mount
            </ThemedText>
            <ThemedText style={styles.code}>
              {`useEffect(() => {
  fetchData();
}, []); // Empty dependency`}
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.pattern}>
            <ThemedText style={styles.patternTitle}>
              Pattern 2: Fetch with Dependencies
            </ThemedText>
            <ThemedText style={styles.code}>
              {`useEffect(() => {
  fetchData(userId);
}, [userId]); // Re-fetch on userId change`}
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.pattern}>
            <ThemedText style={styles.patternTitle}>
              Pattern 3: Cleanup on Unmount
            </ThemedText>
            <ThemedText style={styles.code}>
              {`useEffect(() => {
  let isMounted = true;
  fetchData();
  return () => { isMounted = false; };
}, []);`}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Additional Resources */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Pro Tips</ThemedText>
          <ThemedText style={styles.tip}>
            💡 Use AbortController for timeout handling
          </ThemedText>
          <ThemedText style={styles.tip}>
            💡 Always validate API responses before using the data
          </ThemedText>
          <ThemedText style={styles.tip}>
            💡 Implement request retry logic for better reliability
          </ThemedText>
          <ThemedText style={styles.tip}>
            💡 Consider using libraries like axios or react-query for complex
            scenarios
          </ThemedText>
          <ThemedText style={styles.tip}>
            💡 Cache API responses to reduce network requests
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

// ============================================
// Styles
// ============================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    opacity: 0.7,
    textAlign: "center",
  },
  content: {
    paddingBottom: 40,
  },
  section: {
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  description: {
    marginVertical: 8,
    fontSize: 13,
    opacity: 0.7,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 12,
    fontSize: 14,
  },
  loader: {
    marginVertical: 20,
  },
  resultBox: {
    backgroundColor: "#F0F8FF",
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
    padding: 12,
    marginVertical: 12,
    borderRadius: 6,
  },
  errorBox: {
    backgroundColor: "#FFE6E6",
    borderLeftWidth: 4,
    borderLeftColor: "#FF3B30",
    padding: 12,
    marginVertical: 12,
    borderRadius: 6,
  },
  errorBoxAlt: {
    backgroundColor: "#FFE6E6",
    borderLeftColor: "#FF3B30",
  },
  errorText: {
    color: "#FF3B30",
    fontWeight: "600",
  },
  resultTitle: {
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 4,
  },
  resultBody: {
    fontSize: 13,
    lineHeight: 18,
    marginVertical: 8,
    opacity: 0.8,
  },
  resultMeta: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 8,
  },
  codeBlock: {
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 6,
    marginVertical: 12,
  },
  codeTitle: {
    fontWeight: "600",
    fontSize: 13,
    marginBottom: 8,
  },
  code: {
    fontFamily: "Courier New",
    fontSize: 11,
    lineHeight: 16,
    opacity: 0.7,
  },
  userCard: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    marginVertical: 12,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  concept: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  conceptTitle: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 4,
  },
  conceptText: {
    fontSize: 13,
    opacity: 0.7,
    lineHeight: 18,
  },
  apiItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  apiName: {
    fontWeight: "600",
    fontSize: 14,
  },
  apiUrl: {
    fontSize: 12,
    color: "#007AFF",
    marginVertical: 2,
  },
  apiDesc: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
  },
  pattern: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  patternTitle: {
    fontWeight: "600",
    fontSize: 13,
    marginBottom: 8,
  },
  tip: {
    fontSize: 13,
    marginVertical: 8,
    paddingLeft: 12,
    lineHeight: 18,
  },
});
