import React, { PureComponent } from 'react';
import { Panel, Text } from '@daonomic/ui';
import Translation from '~/components/translation';
import textStyles from '~/components/text/text.css';
import { contactEmail } from '~/config';

export default class EmailUs extends PureComponent {
  render() {
    if (!contactEmail) {
      return null;
    }

    return (
      <Panel>
        <Text align="center" element="p">
          <Translation id="widgets:cantFindWhatLookingFor" />{' '}
          <a href={`mailto:${contactEmail}`} className={textStyles.link}>
            <Translation id="widgets:emailUs" />&nbsp;⟩
          </a>
        </Text>
      </Panel>
    );
  }
}
