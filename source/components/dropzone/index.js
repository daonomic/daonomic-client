// @flow
import * as React from 'react';
import Dropzone from 'react-dropzone';

export default function StyledDropzone(props: {}) {
  return (
    <Dropzone
      {...props}
      style={{
        width: '100%',
        border: '1px dashed #d0d0d0',
        color: 'rgba(0, 0, 0, .7)',
        padding: '1rem',
        cursor: 'pointer',
      }}
    />
  );
}
