//@flow
import * as React from 'react';
// $FlowFixMe
import { Trans, DateFormat, NumberFormat } from '@lingui/macro';
import { Panel, DataTable, Pagination } from '@daonomic/ui';
import { Heading } from '~/components/heading';
import { ReferralLink } from './components/referral-link';
import { ReferralStatistics } from './components/referral-statistics';
import { getMarker } from '~/utils/get-marker';
import style from './style.css';

import type { PaginatedList } from '~/domains/data/paginated-list';
import * as ReferralProgramTypes from '~/domains/business/referral-program/types';

export type Props = {|
  isReferralAvailable: boolean,
  referrals: PaginatedList<
    ReferralProgramTypes.Referral,
    ReferralProgramTypes.Referral,
    void,
  >,
  onMount(): void,
|};

export class ReferralPage extends React.Component<Props> {
  marker = getMarker('referral-page');

  componentDidMount() {
    this.props.onMount();
  }

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.isReferralAvailable && this.props.isReferralAvailable) {
      this.props.referrals.loadPage(1);
    }
  }

  handleChangePage = (pageNumber: number) => {
    this.props.referrals.loadPage(pageNumber);
    this.props.referrals.setPage(pageNumber);
  };

  render() {
    return (
      <Panel data-marker={this.marker()}>
        <Heading tagName="h1" size="normal">
          <Trans>Referral</Trans>
        </Heading>

        {this.props.isReferralAvailable && (
          <div data-marker={this.marker('content')()}>
            <div className={style.link}>
              <ReferralLink />
            </div>

            <div className={style.statistics}>
              <ReferralStatistics />
            </div>

            <DataTable
              getRowKey={(referee: ReferralProgramTypes.Referral) =>
                referee.email
              }
              data-marker={this.marker('referrals')()}
              placeholder={<Trans>You have no referees</Trans>}
              errorPlaceholder={<Trans>Failed to load referees</Trans>}
              schema={[
                {
                  id: 'referee',
                  name: <Trans>Referee</Trans>,
                  render: (referee: ReferralProgramTypes.Referral) =>
                    referee.email,
                },
                {
                  id: 'bought',
                  name: <Trans>Bought</Trans>,
                  align: 'right',
                  render: (referee: ReferralProgramTypes.Referral) => (
                    <NumberFormat
                      value={referee.sold}
                      format={{
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }}
                    />
                  ),
                },
                {
                  id: 'bonus',
                  name: <Trans>Bonus</Trans>,
                  align: 'right',
                  render: (referee: ReferralProgramTypes.Referral) => (
                    <NumberFormat
                      value={referee.bonus}
                      format={{
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }}
                    />
                  ),
                },
                {
                  id: 'registrationDate',
                  name: <Trans>Registration date</Trans>,
                  align: 'right',
                  render: (referee: ReferralProgramTypes.Referral) => (
                    <DateFormat
                      value={referee.registrationDate}
                      format={{
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                      }}
                    />
                  ),
                },
                {
                  id: 'source',
                  name: <Trans>Source</Trans>,
                  render: (referee: ReferralProgramTypes.Referral) =>
                    referee.source,
                },
              ]}
              data={this.props.referrals.currentPageItems}
            />

            <Pagination
              className={style.pagination}
              currentPage={this.props.referrals.currentPageNumber}
              totalPages={this.props.referrals.totalPagesCount}
              onChangePage={this.handleChangePage}
            />
          </div>
        )}

        {!this.props.isReferralAvailable && (
          <p
            data-marker={this.marker('required-kyc')()}
            className={style.paragraph}
          >
            <Trans>
              Referral will become available after the KYC approval.
            </Trans>
          </p>
        )}
      </Panel>
    );
  }
}
