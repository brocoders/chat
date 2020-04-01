import { Channel } from 'twilio-chat/lib/channel';
import { ChannelDescriptor } from 'twilio-chat/lib/channeldescriptor';
import { Message } from 'twilio-chat/lib/message';
import { Paginator } from 'twilio-chat/lib/interfaces/paginator';
import pick from 'lodash/pick';
import get from 'lodash/get';
import uniqBy from 'lodash/uniqBy';
import flatMap from 'lodash/flatMap';
import { MessageItem, ChannelItem, ChannelGroup, ChannelCollection } from './Types';
import { getUnreadMessageCount } from './helper';

export function messageAdapter(message: Message): MessageItem {
  return pick(message, ['author', 'body', 'sid', 'timestamp']);
}

export function getLastMessageIndex(channel: Channel) {
  return get(channel, ['lastMessage', 'index'], 0);
}

export function channelDescriptionToChannelItem(channel: ChannelDescriptor): ChannelItem {
  // TODO: lastConsumedMessageIndex can not show correct information
  const params = pick(channel, ['uniqueName', 'type']);
  return {
    ...params,
    unreadMessageCount: getUnreadMessageCount(channel),
  };
}

export function channelToChannelItem(channel: Channel): ChannelItem {
  const { lastConsumedMessageIndex, ...params } = pick(channel, ['uniqueName', 'type', 'lastConsumedMessageIndex' ]);
  const rc = lastConsumedMessageIndex ? lastConsumedMessageIndex + 1 : 0;
  const ch = {
    messagesCount: get(channel, ['lastMessage', 'index'], 0) + 1,
    lastConsumedMessageIndex: rc,
  };
  return {
    ...params,
    unreadMessageCount: getUnreadMessageCount(ch),
  }
}

export function messagesAdapter(messages: ReadonlyArray<Message>): ReadonlyArray<MessageItem> {
  return messages.map(messageAdapter);
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

const uniqChannelDescriptor = (d: ChannelDescriptor | Channel) => d.uniqueName;

export function channelCollection(args: Paginator<ChannelDescriptor>[]): ChannelCollection {
  const group: ChannelDescriptor[] = uniqBy(flatMap(args, e => e.items), uniqChannelDescriptor);
  return group.reduce((a, v) => ({
    ...a,
    [uniqChannelDescriptor(v)]: channelDescriptionToChannelItem(v),
  }), {});
}

export function channetsToCollection(page: Paginator<Channel>): ChannelCollection {
  const channel = page.items;
  return channel.reduce((a, v) => ({
    ...a,
    [uniqChannelDescriptor(v)]: channelToChannelItem(v),
  }), {});
}
