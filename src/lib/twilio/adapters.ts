import { Channel } from 'twilio-chat/lib/channel';
import { ChannelDescriptor } from 'twilio-chat/lib/channeldescriptor';
import { Message } from 'twilio-chat/lib/message';
import pick from 'lodash/pick';
import { MessageItem, ChannelItem } from './Types';

export function messageAdapter(message: Message): MessageItem {
  return pick(message, ['author', 'body', 'sid', 'timestamp']);
}

export function channelToChannelItem(channel: ChannelDescriptor | Channel): ChannelItem {
  return channel.uniqueName;
}

export function messagesAdapter(messages: ReadonlyArray<Message>): ReadonlyArray<MessageItem> {
  return messages.map(messageAdapter);
}