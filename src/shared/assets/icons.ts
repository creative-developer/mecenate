import type { FC } from 'react';
import type { SvgProps } from 'react-native-svg';

import ChatSendDefault from './icons/chat-send-default.svg';
import ChatSendDisabled from './icons/chat-send-disabled.svg';
import ChatSendPressed from './icons/chat-send-pressed.svg';
import CommentDefaultDisabled from './icons/comment-default-disabled.svg';
import CommentDefault from './icons/comment-default.svg';
import HeartOutlineDefault from './icons/heart-outline-default.svg';
import HeartOutlineDisabled from './icons/heart-outline-disabled.svg';
import HeartOutlinePressed from './icons/heart-outline-pressed.svg';
import HeartSolidDefault from './icons/heart-solid-default.svg';
import HeartSolidDisabled from './icons/heart-solid-disabled.svg';
import HeartSolidPressed from './icons/heart-solid-pressed.svg';
import LoaderSpinner from './icons/loader-spinner.svg';
import MecenatkaLikeActive from './icons/mecenatka-like-active.svg';
import MecenatkaLikeDefault from './icons/mecenatka-like-default.svg';
import MecenatkaLikeDisabled from './icons/mecenatka-like-disabled.svg';

export type SharedIconComponent = FC<SvgProps>;

export const sharedIcons = {
  chatSendDefault: ChatSendDefault,
  chatSendDisabled: ChatSendDisabled,
  chatSendPressed: ChatSendPressed,
  commentDefault: CommentDefault,
  commentDefaultDisabled: CommentDefaultDisabled,
  heartOutlineDefault: HeartOutlineDefault,
  heartOutlineDisabled: HeartOutlineDisabled,
  heartOutlinePressed: HeartOutlinePressed,
  heartSolidDefault: HeartSolidDefault,
  heartSolidDisabled: HeartSolidDisabled,
  heartSolidPressed: HeartSolidPressed,
  loaderSpinner: LoaderSpinner,
  mecenatkaLikeActive: MecenatkaLikeActive,
  mecenatkaLikeDefault: MecenatkaLikeDefault,
  mecenatkaLikeDisabled: MecenatkaLikeDisabled,
} as const satisfies Record<string, SharedIconComponent>;
