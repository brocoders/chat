import * as React from 'react';
import cx from 'classnames';
import styles from './list.module.css';

interface Props<T> {
  title: string | React.ReactNode;
  channels: ReadonlyArray<T>;
  onJoin: (name: string) => void;
  currentChanel: string | null;
  getTitle: (d: T) => string | React.ReactNode;
  getName: (d: T) => string;
}

interface Item {
  unreadMessageCount: number;
}

function ChannelList<T extends Item>({ title, channels, onJoin, currentChanel, ...props }: Props<T>) {

  const joinHandler = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const name = e.currentTarget.getAttribute('data-name') as string;
      onJoin(name);
    }, [onJoin]);
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
        {
          channels.map(e => (
            <li
              key={props.getName(e)}
              className={cx(styles.item, { [styles.active]: props.getName(e) === currentChanel })}
            >
              <button
                data-name={props.getName(e)}
                className={styles.btn}
                type="button"
                onClick={joinHandler}
                disabled={props.getName(e) === currentChanel}
              >
                <span className={styles.name}>{props.getTitle(e)}</span>
                <span className={styles.counter}>{e.unreadMessageCount || null}</span>
              </button>
            </li> 
          ))
        }
      </ul>
    </section>
  )
}

export default ChannelList;
