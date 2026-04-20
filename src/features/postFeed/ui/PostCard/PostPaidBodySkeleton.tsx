import { StyleSheet, View } from 'react-native';

import { Spacing } from '@shared/constants';
import { UISkeleton } from '@shared/ui/UISkeleton';

export function PostPaidBodySkeleton() {
  return (
    <View style={styles.textWrap}>
      <UISkeleton width={164} height={26} />
      <UISkeleton width="100%" height={40} />
    </View>
  );
}

const styles = StyleSheet.create({
  textWrap: {
    width: '100%',
    paddingTop: Spacing.sm,
    gap: Spacing.sm,
  },
});
