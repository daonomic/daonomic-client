import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import api from '~/api/api';
import Dropzone from '~/components/dropzone';
import listToHash from '~/utils/list-to-hash';
import styles from './file-uploader.css';

const getFileHash = (file) => `${file.name}${file.size}`;

export default class FileUploader extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    onAddFiles: PropTypes.func.isRequired,
  };

  state = {
    filesIds: [],
    filesById: {},
    filesUploadProgressById: {},
  };

  setFilesUploadProgress = ({ files, progress }) => {
    const filesProgress = files.map(({ id }) => ({
      id,
      progress,
    }));

    this.setState((state) => ({
      filesUploadProgressById: {
        ...state.filesUploadProgressById,
        ...listToHash('id', (item) => item.progress)(filesProgress),
      },
    }));
  };

  uploadFiles = (files) => {
    this.setFilesUploadProgress({
      files,
      progress: 0,
    });

    api.files.upload({
      files: files.map(({ file }) => file),
      onUploadProgress: (progressEvent) => {
        this.setFilesUploadProgress({
          files,
          progress: progressEvent.loaded / progressEvent.total,
        });
      },
    }).then(({ data }) => {
      this.setFilesUploadProgress({
        files,
        progress: 1,
      });

      this.props.onAddFiles(data.map(({ id }) => id));
    });
  };

  handleDropFiles = (acceptedFiles) => {
    const { filesIds: currentFilesIds, filesById } = this.state;
    const newFiles = acceptedFiles
      .map((file) => ({
        id: getFileHash(file),
        file,
      }))
      .filter(({ id }) => !currentFilesIds.includes(id));

    this.setState({
      filesIds: currentFilesIds.concat(newFiles.map(({ id }) => id)),
      filesById: {
        ...filesById,
        ...listToHash('id', ({ file }) => file)(newFiles),
      },
    }, () => this.uploadFiles(newFiles));
  };

  renderFile = (file, { uploadProgress }) => (
    <div className={styles.file}>
      {file.name}, {Math.min(Math.round(uploadProgress * 100), 100)}%
    </div>
  );

  renderFiles = () => {
    const { filesIds, filesById, filesUploadProgressById } = this.state;

    if (!filesIds.length) {
      return null;
    }

    return (
      <ul className={styles.list}>
        {filesIds.map((id) => (
          <li key={id} className={styles.item}>
            {this.renderFile(filesById[id], {
              uploadProgress: filesUploadProgressById[id],
            })}
          </li>
        ))}
      </ul>
    );
  };

  renderError = () => {
    const { error } = this.props;

    if (!error) {
      return null;
    }

    return (
      <div className={styles.error}>
        {error}
      </div>
    );
  };

  render = () => {
    const { label } = this.props;

    return (
      <div className={styles.root}>
        <Dropzone
          accept="image/png, image/jpeg"
          style={{
            width: '100%',
          }}
          onDrop={this.handleDropFiles}
        >
          {label}
        </Dropzone>

        {this.renderFiles()}

        {this.renderError()}
      </div>
    );
  };
}
