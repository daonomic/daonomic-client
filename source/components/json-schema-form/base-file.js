// @flow
import * as React from 'react';
import { Upload, Button, Icon } from 'antd';

type Props = {|
  required: boolean,
  schema: {|
    title: string,
  |},
  uiSchema: {|
    'ui:options': {|
      url: string,
    |},
  |},
  formData?: string[],
  onChange(string[]): mixed,
|};

type FileId = string;
type UploadedFile = { id: FileId };
type FileUploadResponse = UploadedFile[];
type Uid = string;
type CustomizedFile = File & { uid: string };

export class BaseFile extends React.Component<Props> {
  uploadedFilesIdsByUid: Map<Uid, FileId> = new Map();

  handleSuccessfulUpload = (
    [uploadedFile]: FileUploadResponse,
    file: CustomizedFile,
  ) => {
    this.uploadedFilesIdsByUid.set(file.uid, uploadedFile.id);

    this.props.onChange([...(this.props.formData || []), uploadedFile.id]);
  };

  handleRemoveFile = (file: CustomizedFile) => {
    const fileId = this.uploadedFilesIdsByUid.get(file.uid);

    this.props.onChange(
      (this.props.formData || []).filter((id) => id !== fileId),
    );
  };

  render() {
    const options = this.props.uiSchema['ui:options'];

    return (
      <Upload
        listType="picture"
        action={options.url}
        required={this.props.required}
        onSuccess={this.handleSuccessfulUpload}
        onRemove={this.handleRemoveFile}
      >
        <input
          type="text"
          style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
          required={this.props.required}
          value={(this.props.formData || []).join(',')}
        />

        <Button>
          <Icon type="upload" />{' '}
          {`${this.props.schema.title}${this.props.required ? '*' : ''}`}
        </Button>
      </Upload>
    );
  }
}
