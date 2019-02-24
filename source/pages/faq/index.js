// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { Panel } from '@daonomic/ui';
import { Heading } from '~/components/heading';
import { Spoiler } from '~/components/spoiler';
import { config } from '~/domains/app/config';
import { EmailUs } from './components/email-us';
import styles from './faq.css';

import type { FaqEntry } from '~/types/faq';

type Props = {
  entries: FaqEntry[],
};

export class FaqPage extends React.PureComponent<Props> {
  static defaultProps = {
    entries: config.faq,
  };

  render() {
    const { entries } = this.props;

    return (
      <div>
        <Panel>
          <Heading tagName="h1" size="normal" className={styles.title}>
            <Trans>Frequently asked questions</Trans>
          </Heading>

          <div className={styles.list}>
            {entries.map(({ question, answer }) => (
              <Spoiler key={question} title={question}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: answer,
                  }}
                />
              </Spoiler>
            ))}
          </div>
        </Panel>

        <EmailUs />
      </div>
    );
  }
}
