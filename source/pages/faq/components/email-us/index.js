import React, { PureComponent } from 'react';
import { Panel, Text } from '@daonomic/ui';
import textStyles from '~/components/text/text.css';
import config from '~/config';
import { getTranslation } from '~/i18n';

export default class EmailUs extends PureComponent {
  render() {
    if (!config.contactEmail) {
      return null;
    }

    return (
      <Panel>
        <Text align="center" element="p">
          {getTranslation('widgets:cantFindWhatLookingFor')}{' '}
          <a href={`mailto:${config.contactEmail}`} className={textStyles.link}>
            {getTranslation('widgets:emailUs')}&nbsp;⟩
          </a>
        </Text>
      </Panel>
    );
  }
}
