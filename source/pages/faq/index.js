// @flow
import * as React from 'react';
import cns from 'classnames';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { Panel } from '@daonomic/ui';
import { Heading } from '~/components/heading';
import { Spoiler } from '~/components/spoiler';
import { config } from '~/domains/app/config';
import { EmailUs } from './components/email-us';
import styles from './faq.css';

type Props = {
  entries: {|
    title: string,
    questions: {| answer: string, question: string |}[],
  |}[],
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
          <Heading
            tagName="h1"
            size="normal"
            className={cns(styles.title, styles.padded)}
          >
            <Trans>Frequently asked questions</Trans>
          </Heading>

          {entries.map((section) => (
            <section key={section.title} className={styles.section}>
              <Heading
                tagName="h2"
                size="normal"
                className={cns(styles.subtitle, styles.padded)}
              >
                {section.title}
              </Heading>
              <div className={styles.list}>
                {section.questions.map(({ question, answer }) => (
                  <Spoiler key={question} title={question}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: answer,
                      }}
                    />
                  </Spoiler>
                ))}
              </div>
            </section>
          ))}
        </Panel>

        <EmailUs />
      </div>
    );
  }
}
