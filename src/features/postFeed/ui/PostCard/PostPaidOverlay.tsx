import { BlurView } from 'expo-blur';
import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { PostModel } from '@entities/post';

import { sharedIcons } from '@shared/assets';
import { BorderRadius, ControlSizes, Spacing, Typography, UiKitColors } from '@shared/constants';
import { RenderSharedIcon } from '@shared/ui/RenderSharedIcon';
import { UIButton } from '@shared/ui/UIButton';

import { useSendPostDonate } from '../../model/hooks/useSendPostDonate';

export type PostPaidOverlayProps = {
  post: PostModel;
};

export function PostPaidOverlay({ post }: PostPaidOverlayProps) {
  const { sendPostDonate } = useSendPostDonate();

  const handleDonatePress = useCallback(() => {
    sendPostDonate(post);
  }, [post, sendPostDonate]);

  return (
    <BlurView intensity={70} tint="dark" style={styles.overlay}>
      <View style={styles.tintLayer} />
      <View style={styles.messageWrap}>
        <View style={styles.topContent}>
          <View style={styles.iconBox}>
            <RenderSharedIcon icon={sharedIcons.donateSolid} width={30} height={30} />
          </View>

          <Text style={styles.messageText}>Контент скрыт пользователем. {'\n'}Доступ откроется после доната</Text>
        </View>

        <UIButton label="Отправить донат" onPress={handleDonatePress} style={styles.button} />
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  tintLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: UiKitColors.feed.paidOverlay,
  },
  messageWrap: {
    width: '100%',
    paddingHorizontal: Spacing.lg,
    gap: 1,
    alignItems: 'center',
  },
  topContent: {
    padding: Spacing.md,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: BorderRadius.xs,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: UiKitColors.feed.paidOverlayIconBg,
  },
  messageText: {
    ...Typography.button,
    textAlign: 'center',
    color: UiKitColors.feed.paidOverlayText,
  },
  button: {
    width: 239,
    height: ControlSizes.buttonHeight,
  },
});
