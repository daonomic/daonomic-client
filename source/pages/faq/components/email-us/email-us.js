import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Translation from '~/components/translation';
import { contactEmail } from '~/config/common';
import Panel from '~/components/panel';
import textStyles from '~/components/text/text.css';
import styles from './email-us.css';

export default class EmailUs extends PureComponent {
  render() {
    if (!contactEmail) {
      return null;
    }

    return (
      <Panel paddingSize="large" className={classNames(styles.root, textStyles.center)}>
        <Translation id="widgets:cantFindWhatLookingFor" />
        {' '}
        <a href={`mailto:${contactEmail}`} className={textStyles.link}>
          <Translation id="widgets:emailUs" />&nbsp;⟩
        </a>
      </Panel>
    );
  }
}
