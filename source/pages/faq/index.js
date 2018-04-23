// @flow
import * as React from 'react';
import { Panel } from '@daonomic/ui';
import Translation from '~/components/translation';
import Heading from '~/components/heading';
import Spoiler from '~/components/spoiler';
import config from '~/config';
import EmailUs from './components/email-us';
import styles from './faq.css';

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
            <Translation id="faq:title" />
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
