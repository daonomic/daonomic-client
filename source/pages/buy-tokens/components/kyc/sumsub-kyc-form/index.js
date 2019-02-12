// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { Spinner } from '@daonomic/ui';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { fromPromise } from 'mobx-utils';
import { initSumsub } from '~/modules/kyc/sumsub';
import { getMarker } from '~/utils/get-marker';
import customWidgetStylesUrl from '~/assets/sum-and-substance-widget.css';

type ExternalProps = {|
  configuration: {
    [key: string]: any,
  },
|};

type Props = ExternalProps & {|
  i18n: any,
|};

const iframeTargetId = 'sumsub-target';

export const SumsubKycForm = observer(
  class extends React.Component<Props> {
    marker = getMarker('sumsub-kyc-form');

    @observable
    sumsubIdensic = fromPromise(initSumsub());

    componentDidUpdate() {
      if (this.sumsubIdensic.state === 'fulfilled') {
        const idensic = this.sumsubIdensic.value;
        const configuration = {
          ...this.props.configuration,
          uiConf: {
            ...((this.props.configuration || {}).uiConf || {}),
            // $FlowFixMe
            customCss: `${window.location.origin}${customWidgetStylesUrl}`,
          },
        };

        idensic.init(`#${iframeTargetId}`, configuration);
      }
    }

    render() {
      return (
        <div data-marker={this.marker()}>
          {this.sumsubIdensic.case({
            pending: () => <Spinner />,
            fulfilled: () => (
              <div
                data-marker={this.marker('iframe-target')()}
                id={iframeTargetId}
              />
            ),
            rejected: () => (
              <p data-marker={this.marker('error')()}>
                <Trans>Something went wrong, please try again</Trans>
              </p>
            ),
          })}
        </div>
      );
    }
  },
);
