import { ChannelDescriptor } from 'twilio-chat/lib/channeldescriptor';
import { Paginator } from 'twilio-chat/lib/interfaces/paginator';
import flatMap from 'lodash/flatMap';
import uniqBy from 'lodash/uniqBy';
import get from 'lodash/get';
import * as adapters from './adapters';
import {
  ChannelItem,
  ChannelList,
  ChannelGroup,
  MessageItem,
  ChannelCollection,
} from './Types';

const DELEMITER = '#';

export const uniqChannelItem = (d: ChannelItem) => d;
export const uniqChannelDescriptor = (d: ChannelDescriptor) => d.uniqueName;

export function concatChannel(channels: ChannelList): ChannelList {
  return uniqBy(channels, uniqChannelItem);
}

function createChannelGroup(): ChannelGroup {
  return {
    private: [],
    public: [],
  };
}

export function channelGroup(collection: ChannelCollection): ChannelGroup {
  return Object.values(collection).reduce((a, v) => ({
    ...a,
    [v.type]: a[v.type].concat(v),
  }), createChannelGroup())
}

export function channelCollection(args: Paginator<ChannelDescriptor>[]): ChannelCollection {
  const group: ChannelDescriptor[] = uniqBy(flatMap(args, e => e.items), uniqChannelDescriptor);
  return group.reduce((a, v) => ({
    ...a,
    [v.uniqueName]: adapters.channelDescriptionToChannelItem(v),
  }), {});
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
  return channel.messagesCount - get(channel, 'lastConsumedMessageIndex', 0);
}
