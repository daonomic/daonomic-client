// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { Panel } from '@daonomic/ui';
import { Heading } from '~/components/heading';
import { Spoiler } from '~/components/spoiler';
import { faq } from '~/domains/app/config/faq';
import { EmailUs } from './components/email-us';
import styles from './faq.css';

type Props = {
  entries: {|
    question: string,
    answer: string,
  |}[],
};

export class FaqPage extends React.PureComponent<Props> {
  static defaultProps = {
    entries: faq,
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
