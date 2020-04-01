import { Channel } from 'twilio-chat/lib/channel';
import { ChannelDescriptor } from 'twilio-chat/lib/channeldescriptor';
import { Message } from 'twilio-chat/lib/message';
import pick from 'lodash/pick';
import get from 'lodash/get';
import { MessageItem, ChannelItem } from './Types';
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
  const ch = { messagesCount: get(channel, ['lastMessage', 'index'], 0) + 1, lastConsumedMessageIndex };
  return {
    ...params,
    unreadMessageCount: getUnreadMessageCount(ch),
  }
}

export function messagesAdapter(messages: ReadonlyArray<Message>): ReadonlyArray<MessageItem> {
  return messages.map(messageAdapter);
}