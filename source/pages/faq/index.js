import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Translation from '~/components/translation';
import Panel from '~/components/panel';
import Heading from '~/components/heading';
import Spoiler from '~/components/spoiler';
import faqEntries from '~/config/faq';
import EmailUs from './components/email-us';
import styles from './faq.css';

export default class Faq extends PureComponent {
  static propTypes = {
    entries: PropTypes.arrayOf(PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })),
  };

  static defaultProps = {
    entries: faqEntries,
  };

  render() {
    const { entries } = this.props;

    return (
      <div className={styles.root}>
        <Panel>
          <Heading
            tagName="h1"
            size={Heading.sizes.normal}
            className={styles.title}
          >
            <Translation id="faq:title" />
          </Heading>

          <div className={styles.list}>
            {entries.map(({ question, answer }) => (
              <Spoiler key={question} title={question}>
                {answer}
              </Spoiler>
            ))}
          </div>
        </Panel>

        <EmailUs />
      </div>
    );
  }
}
