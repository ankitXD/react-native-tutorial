import { Stack } from 'expo-router';

/**
 * Tutorials Layout
 * 
 * This layout file defines the navigation structure for all tutorials.
 * - Index page shows the list of all tutorials
 * - Each tutorial is a separate screen
 */

export default function TutorialsLayout() {
  return (
    <Stack>
      {/* Main tutorials index */}
      <Stack.Screen
        name="index"
        options={{
          title: 'Tutorials',
          headerShown: true,
        }}
      />

      {/* Individual tutorials */}
      <Stack.Screen
        name="01-components-styling"
        options={{
          title: 'Components & Styling',
          headerBackTitle: 'Back',
        }}
      />

      <Stack.Screen
        name="02-state-management"
        options={{
          title: 'State Management',
          headerBackTitle: 'Back',
        }}
      />

      <Stack.Screen
        name="03-hooks-and-effects"
        options={{
          title: 'Hooks & Effects',
          headerBackTitle: 'Back',
        }}
      />

      <Stack.Screen
        name="04-lists-and-performance"
        options={{
          title: 'Lists & Performance',
          headerBackTitle: 'Back',
        }}
      />

      <Stack.Screen
        name="05-navigation"
        options={{
          title: 'Navigation',
          headerBackTitle: 'Back',
        }}
      />
    </Stack>
  );
}
