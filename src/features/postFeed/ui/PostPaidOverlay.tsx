import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { PostModel } from '@entities/post';
import { sharedIcons } from '@shared/assets';
import { Spacing, Typography } from '@shared/constants';
import { RenderSharedIcon } from '@shared/ui/RenderSharedIcon';
import { UIButton } from '@shared/ui/UIButton';

import { useSendPostDonate } from '../model/useSendPostDonate';

export type PostPaidOverlayProps = {
  post: PostModel;
};

export function PostPaidOverlay({ post }: PostPaidOverlayProps) {
  const { sendPostDonate } = useSendPostDonate();

  const handleDonatePress = useCallback(() => {
    sendPostDonate(post);
  }, [post, sendPostDonate]);

  return (
    <View style={styles.overlay}>
      <View style={styles.messageWrap}>
        <View style={styles.topContent}>
          <View style={styles.iconBox}>
            <RenderSharedIcon icon={sharedIcons.donateSolid} width={20} height={20} />
          </View>

          <Text style={styles.messageText}>
            Контент скрыт пользователем. {'\n'}Доступ откроется после доната
          </Text>
        </View>

        <UIButton label="Отправить донат" onPress={handleDonatePress} fullWidth />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageWrap: {
    width: '100%',
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
    alignItems: 'center',
  },
  topContent: {
    width: 260,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#6115CD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    ...Typography.button,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
