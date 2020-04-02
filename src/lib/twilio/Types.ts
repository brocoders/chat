import { Channel } from 'twilio-chat/lib/channel';

export interface MessageItem {
  sid: string;
  author: string;
  body: string;
  timestamp: Date;
}

export interface ChannelItem {
  uniqueName: string;
  unreadMessageCount: number;
  type: Channel.Type;
};

export type ChannelList = ReadonlyArray<ChannelItem>;

export type ChannelCollection = Record<string, ChannelItem>;

export type ChannelGroup = Record<Channel.Type, ReadonlyArray<ChannelItem>>;

export type GetToken = () => Promise<string>;

export interface Context {
  connect: (getToken: GetToken, user: string) => Promise<void>;
  createGroupChannel: (name: string, description: string) => Promise<void>;
  createPrivatChannel: (peer: string, description: string) => Promise<void>;
  joinChannel: (name: string) => Promise<void>;
  getMessage: (name: string, pageSize?: number, anchor?: number, direction?: string) => Promise<void>;
  sendMessage: (name: string, message: string | FormData) => Promise<void>;
  currentChanel: string | null;
  channels: Record<string, ChannelItem>;
  privatChannels: ReadonlyArray<ChannelItem>;
  groupChannels: ReadonlyArray<ChannelItem>;
  messages: ReadonlyArray<MessageItem>;
}