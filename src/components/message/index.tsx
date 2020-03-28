import * as React from 'react';
import get from 'lodash/get';
import styles from './message.module.css';

interface Props {
  message: string;
  onSend: (m: string) => void;
}

function MessageInput({ message, onSend }: Props) {

  const handlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message: string = get(e.currentTarget.elements, ['message', 'value'], '');
    if (message.length) {
      onSend(message);
      e.currentTarget.reset();
    }
  }

  return (
    <form
      onSubmit={handlSubmit}
      className={styles.container}
    >
      <div className={styles.field}>
        <input
          type="text"
          name="message"
          className={styles.input}
          defaultValue={message}
        />
      </div>
      <button
        type="submit"
        className={styles.btn}
      >Send</button>
    </form>
  )
}

export default MessageInput;
