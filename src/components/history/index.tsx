import * as React from 'react';
import { MessageItem } from './Types';
import styles from './hystory.module.css';
import Popower from 'components/popower';
import omit from 'lodash/fp/omit';

interface Props {
  list: ReadonlyArray<MessageItem>;
  user: string;
  createChannel: (peer: string, friendlyName: string) => Promise<void>;
  getMessage: () => void;
}

interface Item extends MessageItem {
  disabled: boolean;
  onAuthor: (a: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface CA extends React.CSSProperties {
  author: string,
}

function Item({ body, author, timestamp, onAuthor, disabled }: Item ) {
  return (
    <div className={styles.message}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.author}
          onClick={onAuthor(author)}
          disabled={disabled}
        >{author}</button>
        <div className={styles.date}>{timestamp.toDateString()}</div>
      </div>
      <div className={styles.body}>{body}</div>
    </div>
  )
}

function MessagesHistory({ list, user, createChannel, getMessage }: Props) {

  const container = React.useRef<HTMLDivElement>(null);

  const [isDialog, setDialog] = React.useState<CA | null>(null);

  const handleClick = (author: string) => (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (author === user) return;
    const { left, top } = e.currentTarget.getBoundingClientRect();
    if (container && container.current) {
      const cont = container.current.getBoundingClientRect();
      setDialog({
        top: (top - cont.top) + 'px',
        left: (left - cont.left) + 'px',
        transform: 'translate3d(10px, calc(-100% - 10px), 0)',
        author,
      });
    }
  }

  const handleCreate = () => {
    if (isDialog) {
      const { author } = isDialog;
      createChannel(author, '');
    }
  }

  const style = isDialog && omit('author')(isDialog);

  return (
    <div className={styles.container} ref={container}>
      <ul className={styles.wrapper}>
        {
          list.map(e => (
            <li key={e.sid} className={styles.item}>
              <Item {...e} onAuthor={handleClick} disabled={e.author === user} />
            </li>
          ))
        }
      </ul>
      {
        style && (
          <Popower
            className={styles.popower}
            style={style}
          >
            <button
              className={styles.close}
              onClick={() => setDialog(null)}
            />
            <button
              className={styles.btn}
              onClick={handleCreate}
            >Direct message?</button>
          </Popower>
        )
      }
    </div>
  )
}

export default MessagesHistory;
