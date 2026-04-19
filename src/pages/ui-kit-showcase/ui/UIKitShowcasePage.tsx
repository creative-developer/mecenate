import { useMemo, useState, type PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { CommentItem, PostActionButton } from '@entities';
import { sharedImages } from '@shared/assets';
import {
  BorderRadius,
  Colors,
  ControlSizes,
  Spacing,
  Typography,
  UiKitColors,
} from '@shared/constants';
import { useColorScheme } from '@shared/hooks';
import {
  UIButton,
  UIButtonLink,
  UIChatMessageButton,
  UILikeCounter,
  UISegmentedTabItem,
  UISegmentedTabs,
  UITextInput,
} from '@shared/ui';

type SectionProps = PropsWithChildren<{ title: string }>;

function Section({ title, children }: SectionProps) {
  const theme = useColorScheme() ?? 'light';

  return (
    <View
      style={[
        styles.section,
        {
          borderColor: Colors[theme].border,
          backgroundColor: Colors[theme].surface,
        },
      ]}
    >
      <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>{title}</Text>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

export function UIKitShowcasePage() {
  const theme = useColorScheme() ?? 'light';
  const uiKitColors = UiKitColors[theme];

  const [activeTab, setActiveTab] = useState('all');
  const [commentDraft, setCommentDraft] = useState('');

  const tabItems = useMemo(
    () => [
      { key: 'all', label: 'Все' },
      { key: 'free', label: 'Бесплатные' },
      { key: 'paid', label: 'Платные' },
    ],
    [],
  );

  return (
    <ScrollView
      style={[styles.root, { backgroundColor: Colors[theme].background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.pageTitle, { color: Colors[theme].text }]}>Ui-Kit Showcase</Text>

      <Section title="UIButton">
        <View style={styles.verticalGroup}>
          <UIButton label="Registration" onPress={() => {}} fullWidth />
          <UIButton label="Registration" state="pressed" fullWidth />
          <UIButton label="Registration" loading fullWidth />
          <UIButton label="Registration" disabled fullWidth />
        </View>
      </Section>

      <Section title="UIButtonLink">
        <View style={styles.verticalGroup}>
          <UIButtonLink label="Показать еще" onPress={() => {}} />
          <UIButtonLink label="Показать еще" state="pressed" />
          <UIButtonLink label="Показать еще" disabled />
        </View>
      </Section>

      <Section title="UIChatMessageButton">
        <View style={styles.horizontalGroup}>
          <UIChatMessageButton onPress={() => {}} />
          <UIChatMessageButton state="pressed" onPress={() => {}} />
          <UIChatMessageButton disabled />
        </View>
      </Section>

      <Section title="UISegmentedTabs">
        <View style={styles.verticalGroup}>
          <UISegmentedTabs items={tabItems} value={activeTab} onChange={setActiveTab} disabledKeys={['paid']} />
          <View style={styles.segmentedPreviewRow}>
            <UISegmentedTabItem label="Все" active style={styles.segmentPreviewItem} />
            <UISegmentedTabItem label="Бесплатные" state="pressed" onPress={() => {}} style={styles.segmentPreviewItem} />
            <UISegmentedTabItem label="Платные" disabled style={styles.segmentPreviewItem} />
          </View>
        </View>
      </Section>

      <Section title="UITextInput">
        <View style={styles.verticalGroup}>
          <UITextInput value={commentDraft} onChangeText={setCommentDraft} placeholder="Ваш комментарий" />
          <UITextInput value="Ваш комментарий" onChangeText={() => {}} state="pressed" />
          <UITextInput value="Ваш комментарий" onChangeText={() => {}} state="focused" />
          <UITextInput value="Ваш комментарий" onChangeText={() => {}} disabled />
        </View>
      </Section>

      <Section title="UILikeCounter">
        <View style={styles.verticalGroup}>
          <View style={styles.matrixRow}>
            <UILikeCounter count={2} onPress={() => {}} />
            <UILikeCounter count={2} state="pressed" onPress={() => {}} />
            <UILikeCounter count={2} disabled />
          </View>
          <View style={styles.matrixRow}>
            <UILikeCounter count={3} active onPress={() => {}} />
            <UILikeCounter count={3} active state="pressed" onPress={() => {}} />
            <UILikeCounter count={3} active disabled />
          </View>
        </View>
      </Section>

      <Section title="PostActionButton">
        <View style={styles.verticalGroup}>
          <View style={styles.matrixRow}>
            <PostActionButton type="like" count={12} onPress={() => {}} />
            <PostActionButton type="like" count={12} state="pressed" onPress={() => {}} />
            <PostActionButton type="like" count={12} disabled />
          </View>
          <View style={styles.matrixRow}>
            <PostActionButton type="like" count={12} active onPress={() => {}} />
            <PostActionButton type="like" count={12} active state="pressed" onPress={() => {}} />
            <PostActionButton type="like" count={12} active disabled />
          </View>
          <View style={styles.matrixRow}>
            <PostActionButton type="comment" count={19} onPress={() => {}} />
            <PostActionButton type="comment" count={19} state="pressed" onPress={() => {}} />
            <PostActionButton type="comment" count={19} disabled />
          </View>
        </View>
      </Section>

      <Section title="CommentItem">
        <View style={styles.verticalGroup}>
          <CommentItem
            authorName="Леша Крид"
            text="Хороший гайд)"
            likes={2}
            avatarSource={sharedImages.uiKitCommentAvatar}
            onLikePress={() => {}}
          />
          <CommentItem authorName="Петр Федько" text="Спасибо за пост!" likes={7} liked onLikePress={() => {}} />
        </View>
      </Section>

      <View style={[styles.footerHint, { backgroundColor: uiKitColors.segmentedTabs.containerBg }]}> 
        <Text style={[styles.footerHintText, { color: Colors[theme].mutedText }]}>Press компоненты, чтобы проверить native pressed-состояния.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.lg,
    gap: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  pageTitle: {
    ...Typography.display,
  },
  section: {
    borderWidth: 1,
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  sectionTitle: {
    ...Typography.heading,
  },
  sectionBody: {
    gap: Spacing.md,
  },
  verticalGroup: {
    gap: Spacing.sm,
  },
  horizontalGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  segmentedPreviewRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: '#E8ECEF',
    padding: Spacing.xxs,
  },
  segmentPreviewItem: {
    height: ControlSizes.segmentedTabHeight,
  },
  matrixRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  footerHint: {
    borderRadius: BorderRadius.sm,
    padding: Spacing.sm,
  },
  footerHintText: {
    ...Typography.caption,
  },
});
