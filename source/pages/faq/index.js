// @flow
import * as React from 'react';
import { Panel } from '@daonomic/ui';
import { Heading } from '~/components/heading';
import { Spoiler } from '~/components/spoiler';
import config from '~/config';
import EmailUs from './components/email-us';
import styles from './faq.css';
import { getTranslation } from '~/i18n';

import type { FaqEntry } from '~/types/faq';

type Props = {
  entries: FaqEntry[],
};

export default class Faq extends React.PureComponent<Props> {
  static defaultProps = {
    entries: config.faq,
  };

  render() {
    const { entries } = this.props;

    return (
      <div>
        <Panel>
          <Heading tagName="h1" size="normal" className={styles.title}>
            {getTranslation('faq:title')}
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
