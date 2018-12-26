//@flow
import * as React from 'react';
// $FlowFixMe
import { I18n } from '@lingui/react';
// $FlowFixMe
import { t } from '@lingui/macro';
import copyToClipboard from 'clipboard-copy';

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

  getCopyText = ({ i18n }: { i18n: any }) => {
    switch (this.state.copyState) {
      case 'copied': {
        return i18n._(t`Copied`);
      }

      case 'failed': {
        return i18n._(t`Failed to copy`);
      }

      default: {
        return i18n._(t`Copy`);
      }
    }
  };

  render() {
    return (
      <I18n>
        {({ i18n }) =>
          this.props.children({
            state: this.state.copyState,
            text: this.getCopyText({ i18n }),
            copy: this.handleCopy,
          })
        }
      </I18n>
    );
  }
}
