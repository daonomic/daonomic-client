//@flow
import * as React from 'react';
import copyToClipboard from 'clipboard-copy';
import { getTranslation } from '~/domains/app/i18n';

type CopyState = 'initial' | 'copied' | 'failed';

type Props = {|
  value: string,
  children({| state: CopyState, text: string, copy(): mixed |}): React.Node,
|};

type State = {|
  copyState: CopyState,
|};

export class CopyToClipboard extends React.Component<Props, State> {
  state = {
    copyState: 'initial',
  };

  handleCopy = () => {
    copyToClipboard(this.props.value)
      .then(() => {
        this.setState({
          copyState: 'copied',
        });
      })
      .catch(() => {
        this.setState({
          copyState: 'failed',
        });
      })
      .then(() => {
        setTimeout(
          () =>
            this.setState({
              copyState: 'initial',
            }),
          1500,
        );
      });
  };

  getCopyText = () => {
    switch (this.state.copyState) {
      case 'copied': {
        return getTranslation('copy:copied');
      }

      case 'failed': {
        return getTranslation('copy:failedToCopy');
      }

      default: {
        return getTranslation('copy:copy');
      }
    }
  };

  render() {
    return this.props.children({
      state: this.state.copyState,
      text: this.getCopyText(),
      copy: this.handleCopy,
    });
  }
}
