// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { Panel, Text } from '@daonomic/ui';
import textStyles from '~/components/text/text.css';
import { config } from '~/domains/app/config';

type Props = {};

export class EmailUs extends React.PureComponent<Props> {
  render() {
    if (!config.contactEmail) {
      return null;
    }

    return (
      <Panel>
        <Text align="center" element="p">
          <Trans>Can’t find what are you looking for?</Trans>{' '}
          <a href={`mailto:${config.contactEmail}`} className={textStyles.link}>
            <Trans>Email us</Trans>
            &nbsp;⟩
          </a>
        </Text>
      </Panel>
    );
  }
}
