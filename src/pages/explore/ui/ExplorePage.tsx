import { StyleSheet } from 'react-native';

import { ThemedView } from '@shared/ui';

export function ExplorePage() {
  return <ThemedView style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
