// @flow

import { compose } from 'ramda';
import { AmountInputView } from './view';

const enhance = compose();

export const AmountInput = enhance(AmountInputView);
