// @flow
import * as React from 'react';
import { translate } from 'react-i18next';
import i18n from '~/i18n';

type Props = {
  id: string,
  data?: {},
  t?: (id: string, data: {}) => string,
};

@translate()
export default class Translation extends React.PureComponent<Props, {}> {
  static text = i18n.t.bind(i18n);

  render() {
    const { t, id, data } = this.props;

    if (typeof t !== 'function') {
      return '';
    }

    return <span dangerouslySetInnerHTML={{ __html: t(id, data || {}) }} />;
  }
}
