import { Channel } from 'twilio-chat/lib/channel';

export interface MessageItem {
  sid: string;
  author: string;
  body: string;
  timestamp: Date;
}

export type ChannelItem = string;

export type ChannelList = ReadonlyArray<ChannelItem>;

export type ChannelGroup = Record<Channel.Type, ReadonlyArray<ChannelItem>>;

export type GetToken = () => Promise<string>;

export interface Context {
  isConnected: boolean; 
  connect: (getToken: GetToken, user: string) => Promise<void>;
  createGroupChannel: (name: string, description: string) => Promise<void>;
  createPrivatChannel: (peer: string, description: string) => Promise<void>;
  joinChannel: (n: string) => Promise<void>;
  getMessage: (name: string, pageSize?: number, anchor?: number, direction?: string) => Promise<void>;
  onSendMessage: (n: string, m: string) => Promise<void>;
  getGroupChannelName: (channel: ChannelItem) => string;
  getPrivatChannelName: (channel: ChannelItem) => string;
  getGroupChannelTitle: (channel: ChannelItem) => string;
  getPrivatChannelTitle: (channel: ChannelItem) => string;
  currentChanel: string | null;
  privatChannels: ReadonlyArray<string>;
  groupChannels: ReadonlyArray<string>;
  messages: ReadonlyArray<MessageItem>;
}