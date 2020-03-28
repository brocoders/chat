import * as React from 'react';
import styles from './app.module.css';
import Messages from './messages';
import Channels from './channels';

function App() {
  const user: string = 'user2@brocoders.com';
  return (
    <div className={styles.container}>
      <header className={styles.header}></header>
      <aside className={styles.aside}>
        <Channels user={user} />
      </aside>
      <main className={styles.main}>
        <Messages user={user} />
      </main>
    </div>
  );
}

export default App;