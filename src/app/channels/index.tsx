import * as React from 'react';
import { chatConnect, Context, getPrivatChannelTitle, ChannelItem } from 'lib/twilio';
import { Create, ChannelList } from 'components/channels';
import { options, handler } from './helpers'
import styles from './channels.module.css';

interface Props extends Context {
  user: string;
};

function Channels({ user, connect, createGroupChannel, joinChannel, currentChanel, ...props }: Props) {

  React.useEffect(() => {
    const getToken = () => window.fetch('/auth', options(user)).then(handler)
    connect(getToken, user);
  }, [connect, user]);

  const getName = ({ uniqueName }: ChannelItem) => uniqueName;

  return (
    <section className={styles.container}>
      <Create onCreate={createGroupChannel} />
      <ChannelList
        title="Channels"
        channels={props.groupChannels}
        onJoin={joinChannel}
        currentChanel={currentChanel}
        getName={getName}
        getTitle={getName}
      />
      <ChannelList
        title="Direct messages"
        channels={props.privatChannels}
        onJoin={joinChannel}
        currentChanel={currentChanel}
        getName={getName}
        getTitle={(c) => getPrivatChannelTitle(c, user)}
      />
    </section>
  )
}

export default chatConnect(Channels);