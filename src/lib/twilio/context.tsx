import * as React from 'react';
import { Context } from './Types';

const ChatContext = React.createContext<Context>({
  connect: () => Promise.resolve(),
  createGroupChannel: () => Promise.resolve(),
  createPrivatChannel: () => Promise.resolve(),
  joinChannel: () => Promise.resolve(),
  getMessage: () => Promise.resolve(),
  onSendMessage: () => Promise.resolve(),
  currentChanel: null,
  channels: {},
  privatChannels: [],
  groupChannels: [],
  messages: [],
});

export default ChatContext;