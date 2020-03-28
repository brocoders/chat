import { ChannelDescriptor } from 'twilio-chat/lib/channeldescriptor';
import { Paginator } from 'twilio-chat/lib/interfaces/paginator';
import flatMap from 'lodash/flatMap';
import uniqBy from 'lodash/uniqBy';
import * as adapters from './adapters';
import { ChannelItem, ChannelList, ChannelGroup } from './Types';

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

export function channelGroup(args: Paginator<ChannelDescriptor>[]): ChannelGroup {
  const group: ChannelDescriptor[] = uniqBy(flatMap(args, e => e.items), uniqChannelDescriptor);
  return group.reduce((a, v) => ({
    ...a, [v.type]: a[v.type].concat(adapters.channelToChannelItem(v))
  }), createChannelGroup());
}

export function createChannelName(peer: string, user: string): string {
  return [peer, user].sort((a, b) => a.localeCompare(b)).join(DELEMITER);
}

export function getGroupChannelName(channel: ChannelItem): string {
  return channel;
}

export function getPrivatChannelTitle(name: string, user?: string): string {
  const users = name.split(DELEMITER);
  return users.filter(f => f !== user).join('');
}
