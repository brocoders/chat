import * as React from 'react';
import SendMessage from 'components/message';
import HystoryMessages from 'components/history';
import { chatConnect, Context } from 'lib/twilio';
import styles from './messages.module.css';

interface Props extends Context {
  user: string;
};

function Messages({ user, sendMessage, messages, currentChanel, createPrivatChannel, getMessage }: Props) {

  const handleGetMessage = React.useCallback(() => {
    if (currentChanel) {
      getMessage(currentChanel);
    }
  }, [getMessage, currentChanel])

  const handleSend = React.useCallback((m: string) => {
    if (typeof currentChanel === 'string') {
      sendMessage(currentChanel, m);
    }
  }, [sendMessage, currentChanel]);

  React.useEffect(() => { handleGetMessage(); }, [currentChanel, handleGetMessage]);

  return (
    <div className={styles.container}>
      <HystoryMessages
        list={messages}
        user={user}
        createChannel={createPrivatChannel}
        getMessage={handleGetMessage}
      />
      <SendMessage onSend={handleSend} message="" />
    </div>
  );
}

export default chatConnect(Messages);