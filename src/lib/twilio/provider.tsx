import * as React from 'react';
import { Client } from 'twilio-chat';
import { Channel } from 'twilio-chat/lib/channel';
import { Message } from 'twilio-chat/lib/message';
import debounce from 'lodash/debounce';
import ChatContext from './context';
import ChatError from './ChatError';
import {
  createChannelName,
  channelGroup,
  getGroupChannelName,
  getPrivatChannelTitle,
  mergeMessage,
} from './helper';
import {
  MessageItem,
  Context,
  ChannelList,
  ChannelItem,
  GetToken,
} from './Types';
import * as adapters from './adapters';

interface Props {
  children: React.ReactNode;
}

type ChannelsName = 'groupChannels' | 'privatChannels';

type ChannelState<T extends ChannelsName = ChannelsName> = Readonly<Record<T, ChannelList>>;

interface State extends ChannelState {
  currentChanel: string | null,
  messages: ReadonlyArray<MessageItem>,
}

class Provider extends React.Component<Props, State> {

  state = {
    groupChannels: [],
    privatChannels: [],
    currentChanel: null,
    messages: [],
  }

  private getToken: GetToken | undefined;

  private _user: string | undefined;

  private _chatClient: Client | null = null;

  private get user(): string {
    if (typeof this._user === 'string') return this._user;
    throw new Error('Mo USER');
  }

  private set user(user: string) {
    this._user = user;
  }

  private async chatClient(): Promise<Client> {
    if (this._chatClient) {
      switch (this._chatClient.connectionState) {
        case 'connected':
          return Promise.resolve(this._chatClient);
        case 'disconnected':
        case 'disconnecting':
          await this.updateToken();
          return this._chatClient;

        default:
          throw new ChatError('Unhandled Client Status', {
            status: this._chatClient.connectionState,
          });
      }
    } else if (typeof this.getToken === 'function') {
      const token = await this.getToken();
      this._chatClient = await Client.create(token);
      return this._chatClient;
    } else {
      throw new ChatError('No Chat Client');
    }
  }

  updateToken = async() => {
    if (this._chatClient && typeof this.getToken === 'function') {
      const token = await this.getToken();
      await this._chatClient.updateToken(token);
    } else {
      throw new ChatError('Can\'t update token', {
        client: this._chatClient
      });
    }
  }

  connectHandler = async(getToken: GetToken, user: string): Promise<void> => {
    this.getToken = getToken;
    this.user = user;

    const client = await this.chatClient();

    client
      .on('messageAdded', this.onMessageAdd)
      .on('channelJoined', this.onJoinChannel)
      .on('tokenAboutToExpire', this.updateToken);
    
    const channels = await Promise.all([
      client.getPublicChannelDescriptors(),
      client.getUserChannelDescriptors(),
    ]);

    console.log(channels)

    const group = channelGroup(channels);
    
    this.setState({
      privatChannels: group.private,
      groupChannels: group.public,
    });
  };

  createGroupChannel = async(uniqueName: string, friendlyName: string) => {
    try {
      const option = {
        uniqueName,
        friendlyName,
      };
      const client = await this.chatClient();
      const channel = await client.createChannel(option);
      const channelList: ChannelList = this.state.groupChannels;
      this.setState({
        groupChannels: channelList.concat(
          adapters.channelToChannelItem(channel),
        )
      });
    } catch (err) {
      console.warn(err);
    }
  };

  createPrivatChannel = async(peer: string, friendlyName: string) => {
    try {
      const client = await this.chatClient();
      const channel = await client.createChannel({
        uniqueName: createChannelName(peer, this.user),
        friendlyName,
        isPrivate: true,
        attributes: {
          peers: [this.user, peer],
        }
      });
      await Promise.all([ channel.invite(peer), channel.join() ]);
      const channelList: ChannelList = this.state.privatChannels;
      this.setState({
        groupChannels: channelList.concat(
          adapters.channelToChannelItem(channel),
        )
      });
    } catch (err) {
      console.warn(err);
    }
  }

  _joinChannel = (channel: Channel) => {
    console.log(channel, '>');
    if (this.state.currentChanel !== channel.uniqueName) {
      this.setState({
        currentChanel: channel.uniqueName,
        messages: [],
      });
    }
  };

  onJoinChannel = debounce(this._joinChannel, 500);

  onMessageAdd = (message: Message) => {
    if (message.channel.uniqueName === this.state.currentChanel) {
      this.setState(({ messages }) => ({
        messages: messages.concat([adapters.messageAdapter(message)]),
      }));
    }
  }

  getMessages = async(name: string, pageSize?: number, anchor?: number, direction?: string): Promise<void> => {
    try {
      const client = await this.chatClient();
      const channel = await client.getChannelByUniqueName(name);
      const pageMessage = await channel.getMessages(pageSize, anchor, direction);
      console.log(pageMessage, '#');
      const nextMessages = adapters.messagesAdapter(pageMessage.items);
      this.setState({
        messages: mergeMessage(this.state.messages, nextMessages),
      });
    } catch (err) {
      console.warn(err);
    }
  } 

  handleJoinChannel = async(name: string): Promise<void> => {
    if (this.state.currentChanel !== name) {
      await new Promise((resolve) => {
        this.setState({
          currentChanel: name,
          messages: [],
        }, () => { resolve() });
      });
      try {
        const client = await this.chatClient();
        const channel = await client.getChannelByUniqueName(name);
        if (channel.status !== 'joined') {
          await channel.join();
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }

  handleSandMessage = async(name: string, message: string) => {
    try {
      const client = await this.chatClient();
      const channel = await client.getChannelByUniqueName(name);
      await channel.sendMessage(message);
    } catch (err) {
      console.warn(err);
    }
  }

  getPrivatChannelTitle = (channel: ChannelItem): string => {
    return getPrivatChannelTitle(channel, this.user);
  }

  get api(): Context {
    return {
      isConnected: false,
      connect: this.connectHandler,
      createGroupChannel: this.createGroupChannel,
      createPrivatChannel: this.createPrivatChannel,
      joinChannel: this.handleJoinChannel,
      getMessage: this.getMessages,
      onSendMessage: this.handleSandMessage,
      getGroupChannelName: getGroupChannelName,
      getPrivatChannelName: getGroupChannelName,
      getGroupChannelTitle: getGroupChannelName,
      getPrivatChannelTitle: this.getPrivatChannelTitle,
      ...this.state,
    }
  }

  render () {
  
    return (
      <ChatContext.Provider value={this.api}>
        {
          this.props.children
        }
      </ChatContext.Provider>
    )
  }
}

export default Provider;
