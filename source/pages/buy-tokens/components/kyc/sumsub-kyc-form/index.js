// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { Spinner } from '@daonomic/ui';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { fromPromise } from 'mobx-utils';
import { initSumsub } from '~/modules/kyc/sumsub';

type ExternalProps = {|
  configuration: {},
|};

type Props = ExternalProps & {|
  i18n: any,
|};

const iframeTargetId = 'sumsub-target';

export const SumsubKycForm = observer(
  class extends React.Component<Props> {
    @observable
    sumsubIdensic = fromPromise(initSumsub());

    componentDidUpdate() {
      if (this.sumsubIdensic.state === 'fulfilled') {
        const idensic = this.sumsubIdensic.value;

        idensic.init(`#${iframeTargetId}`, this.props.configuration);
      }
    }

    render() {
      return this.sumsubIdensic.case({
        pending: () => <Spinner />,
        fulfilled: () => <div id={iframeTargetId} />,
        rejected: () => <Trans>Something went wrong, please try again</Trans>,
      });
    }
  },
);
