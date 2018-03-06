// @flow
import * as React from 'react';
import Dropzone from 'react-dropzone';
import styles from './styles.css';

export default function StyledDropzone(props: {}) {
  return (
    <Dropzone
      {...props}
      className={styles.root}
      disabledClassName={styles.root_disabled}
    />
  );
}
