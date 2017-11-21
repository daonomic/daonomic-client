import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import i18n from '~/i18n';

@translate()
export default class Translation extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    data: {},
  };

  static text = i18n.t.bind(i18n);

  render() {
    const {
      t,
      id,
      data,
    } = this.props;

    return (
      <span dangerouslySetInnerHTML={{ __html: t(id, data) }} />
    );
  }
}
