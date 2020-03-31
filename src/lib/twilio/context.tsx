import * as React from 'react';
import { Context } from './Types';

const ChatContext = React.createContext<Context>({
  isConnected: false, 
  connect: () => Promise.resolve(),
  createGroupChannel: () => Promise.resolve(),
  createPrivatChannel: () => Promise.resolve(),
  joinChannel: () => Promise.resolve(),
  getMessage: () => Promise.resolve(),
  onSendMessage: () => Promise.resolve(),
  getGroupChannelName: (t: string) => t,
  getPrivatChannelName: (t: string) => t,
  getGroupChannelTitle: (t: string) => t,
  getPrivatChannelTitle: (t: string) => t,
  currentChanel: null,
  privatChannels: [],
  groupChannels: [],
  messages: [],
});

export default ChatContext;