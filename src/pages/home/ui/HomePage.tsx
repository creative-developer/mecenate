import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PostsFeed } from '@features/postFeed';
import { UiKitColors } from '@shared/constants';

export function HomePage() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <PostsFeed />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: UiKitColors.feed.screenBackground,
  },
});
