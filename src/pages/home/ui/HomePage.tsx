import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { UIButton, ThemedView } from '@shared/ui';

export function HomePage() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <Link href="/ui-kit-showcase" asChild>
          <UIButton label="Open UI-Kit Showcase" fullWidth />
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  content: {
    width: '100%',
    maxWidth: 360,
  },
});
