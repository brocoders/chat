import * as React from 'react';
import get from 'lodash/get';
import PopOwer from 'components/popower';
import styles from './create.module.css';

interface Props {
  onCreate: (uniqueName: string, friendlyName: string) => Promise<void>
}

function CreateChannel({ onCreate }: Props) {

  const [status, setStatus] = React.useState<boolean>(false);

  const field = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (field && field.current && field.current.focus) {
      field.current.focus();
    }
  }, [status]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { elements } = e.currentTarget;
    // TODO: Should have validation
    const uniqueName: string = get(elements, ['uniqueName', 'value']);
    const friendlyName: string = get(elements, ['friendlyName', 'value']);

    // TODO: Should check component is mounted
    onCreate(uniqueName, friendlyName).then(() => { setStatus(false); });
  };

  const handleClick = () => { setStatus(!status) };

  return (
    <div className={styles.container}>
      <button
        className={styles.btn}
        type="button"
        onClick={handleClick}
      />
      {
        status ? (
          <PopOwer className={styles.popower}>
            <form
              name="create"
              className={styles.form}
              onSubmit={handleSubmit}
            >
              <div className={styles.field}>
                <label className={styles.label}>Unique Name:</label>
                <input
                  required
                  type="text"
                  name="uniqueName"
                  className={styles.input}
                  ref={field}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Description:</label>
                <input required type="text" name="friendlyName" className={styles.input} />
              </div>
              <div className={styles.btnGroup}>
                <button
                  type="submit"
                  className={styles.submit}
                >Create</button>
                <button className={styles.cancel} onClick={() => setStatus(false)}>Cancel</button>
              </div>
            </form>
          </PopOwer>
        ) : null
      }
    </div>
  )
}

export default CreateChannel;