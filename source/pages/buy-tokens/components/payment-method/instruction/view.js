//@flow
import * as React from 'react';
import { Heading } from '~/components/heading';
import textStyles from '~/components/text/text.css';
import { getTranslation } from '~/domains/app/i18n';
import styles from './styles.css';

export type Props = {|
  userWalletAddress: ?string,
|};

export class PaymentInstruction extends React.Component<Props> {
  render() {
    const { userWalletAddress } = this.props;

    return (
      <React.Fragment>
        <Heading className={styles.title} tagName="h3" size="small">
          {getTranslation('paymentMethods:instructionTitle')}
        </Heading>

        <p>{getTranslation('paymentMethods:instructionText')}</p>
        <p className={textStyles['word-break-all']}>
          {userWalletAddress || ''}
        </p>
      </React.Fragment>
    );
  }
}
