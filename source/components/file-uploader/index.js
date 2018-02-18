import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import api, { getFileUrl } from '~/api/api';
import Dropzone from '~/components/dropzone';
import listToHash from '~/utils/list-to-hash';
import removeDuplicates from '~/utils/remove-duplicates';
import omit from '~/utils/omit';
import styles from './file-uploader.css';

const getFileHash = (file) => `${file.name}${file.size}`;

export default class FileUploader extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    filesIds: PropTypes.arrayOf(PropTypes.string),
    onAddFiles: PropTypes.func.isRequired,
    onRemoveFile: PropTypes.func.isRequired,
  };

  state = {
    filesIds: [],
    filesById: {},
    filesUploadProgressById: {},
  };

  componentDidMount = () => {
    const { filesIds } = this.props;

    if ((filesIds || []).length > 0) {
      this.loadExternalFiles(filesIds);
    }
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

  loadExternalFiles = (filesIds) => {
    const files = filesIds.map((id) => ({
      id,
      preview: getFileUrl(id),
    }));
    const filesUploadProgress = filesIds.map((id) => ({
      id,
      progress: 1,
    }));

    this.setState((state) => ({
      filesIds: removeDuplicates([...state.filesIds, ...filesIds]),
      filesById: {
        ...state.filesById,
        ...listToHash('id')(files),
      },
      filesUploadProgressById: {
        ...state.filesUploadProgressById,
        ...listToHash('id', (x) => x.progress)(filesUploadProgress),
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

  handleRemoveFile = (id) => {
    this.setState((state) => ({
      filesIds: state.filesIds.filter((fileId) => fileId !== id),
      filesById: omit([id])(state.filesById),
      filesUploadProgressById: omit([id])(state.filesUploadProgressById),
    }));

    this.props.onRemoveFile(id);
  };

  renderProgress = (value) => {
    if (value >= 1) {
      return null;
    }

    return (
      <div className={styles.progress}>
        {Math.min(Math.round(value * 100), 100)}%
      </div>
    );
  };

  renderButtonRemove = ({ uploadProgress, id }) => {
    if (uploadProgress < 1) {
      return null;
    }

    return (
      <button className={styles.delete} onClick={() => this.handleRemoveFile(id)}>
        Delete file
      </button>
    );
  };

  renderFile = (file, { id, uploadProgress }) => (
    <div
      className={styles.image}
      style={{ backgroundImage: `url(${file.preview})` }}
    >
      {this.renderProgress(uploadProgress)}
      {this.renderButtonRemove({ uploadProgress, id })}
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
              id,
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
