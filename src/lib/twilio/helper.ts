import uniqBy from 'lodash/uniqBy';
import get from 'lodash/get';
import {
  ChannelItem,
  ChannelList,
  MessageItem,
} from './Types';

const DELEMITER = '#';

export const uniqChannelItem = (d: ChannelItem) => d;

export function concatChannel(channels: ChannelList): ChannelList {
  return uniqBy(channels, uniqChannelItem);
}

export function createChannelName(peer: string, user: string): string {
  return [peer, user].sort((a, b) => a.localeCompare(b)).join(DELEMITER);
}

export function getGroupChannelName({ uniqueName }: ChannelItem): string {
  return uniqueName;
}

export function getPrivatChannelTitle(channel: ChannelItem, user?: string): string {
  const members = channel.uniqueName.split(DELEMITER);
  return members.filter(f => f !== user).join('');
}

function sortByDate<T extends Record<K, Date>, K extends keyof T>(key: K) {
  return (a: T, b: T) => a[key].getTime() - b[key].getTime();
}

export function mergeMessage(a: ReadonlyArray<MessageItem>, b:  ReadonlyArray<MessageItem>) {
  return uniqBy(a.concat(b), m => m.sid).sort(sortByDate('timestamp'));
}

interface MessageCounter {
  messagesCount: number;
  lastConsumedMessageIndex: number;
}

export function getUnreadMessageCount(channel: MessageCounter): number {
  return channel.messagesCount - channel.lastConsumedMessageIndex;
}
