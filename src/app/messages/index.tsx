import * as React from 'react';
import SendMessage from 'components/message';
import HystoryMessages from 'components/history';
import { chatConnect, Context } from 'lib/twilio';
import styles from './messages.module.css';

interface Props extends Context {
  user: string;
};

function Messages({ user, onSendMessage, messages, currentChanel, createPrivatChannel }: Props) {

  const handleSend = React.useCallback((m: string) => {
    if (typeof currentChanel === 'string') {
      onSendMessage(currentChanel, m);
    }
  }, [onSendMessage, currentChanel]);

  return (
    <div className={styles.container}>
      <HystoryMessages
        list={messages}
        user={user}
        createChannel={createPrivatChannel}
      />
      <SendMessage onSend={handleSend} message="" />
    </div>
  );
}

export default chatConnect(Messages);