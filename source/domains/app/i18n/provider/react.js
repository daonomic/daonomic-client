//@flow
import * as React from 'react';
// $FlowFixMe
import { I18nProvider as LinguiI18nProvider } from '@lingui/react';
import { i18n, onLanguageChange } from '.';

type Props = {|
  children: React.Node,
|};

export class I18nProvider extends React.Component<Props> {
  unsubscribeFromLanguageChanges: ?Function;

  componentDidMount() {
    this.unsubscribeFromLanguageChanges = onLanguageChange(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    if (typeof this.unsubscribeFromLanguageChanges === 'function') {
      this.unsubscribeFromLanguageChanges();
    }
  }

  render() {
    return (
      <LinguiI18nProvider i18n={i18n} language={i18n.language}>
        {this.props.children}
      </LinguiI18nProvider>
    );
  }
}
