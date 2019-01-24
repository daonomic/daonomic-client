//@flow
import * as React from 'react';
// $FlowFixMe
import { Trans, DateFormat, NumberFormat } from '@lingui/macro';
import { Panel, Table, Pagination } from '@daonomic/ui';
import { Heading } from '~/components/heading';
import { ReferralLink } from './components/referral-link';
import { ReferralStatistics } from './components/referral-statistics';
import style from './style.css';

import type { PaginatedList } from '~/domains/data/paginated-list';
import * as ReferralProgramTypes from '~/domains/business/referral-program/types';

export type Props = {|
  referrals: PaginatedList<
    ReferralProgramTypes.Referral,
    ReferralProgramTypes.Referral,
    void,
  >,
|};

export class ReferralPage extends React.Component<Props> {
  componentDidMount() {
    this.props.referrals.loadPage(1);
  }

  handleChangePage = (pageNumber: number) => {
    this.props.referrals.loadPage(pageNumber);
    this.props.referrals.setPage(pageNumber);
  };

  render() {
    return (
      <Panel>
        <Heading tagName="h1" size="normal">
          <Trans>Referral</Trans>
        </Heading>

        <div className={style.link}>
          <ReferralLink />
        </div>

        <div className={style.statistics}>
          <ReferralStatistics />
        </div>

        <Table
          isEmpty={this.props.referrals.currentPageItems.length === 0}
          caption={<Trans>Referrals</Trans>}
          placeholder={<Trans>You have no referrals</Trans>}
        >
          <thead>
            <tr>
              <th>
                <Trans>Referee</Trans>
              </th>
              <th className={style.numeric}>
                <Trans>Bought</Trans>
              </th>
              <th className={style.numeric}>
                <Trans>Bonus</Trans>
              </th>
              <th className={style.numeric}>
                <Trans>Registration date</Trans>
              </th>
              <th>
                <Trans>Source</Trans>
              </th>
            </tr>
          </thead>

          <tbody>
            {this.props.referrals.currentPageItems.map((referral) => (
              <tr key={referral.email}>
                <td>{referral.email}</td>
                <td className={style.numeric}>
                  <NumberFormat
                    value={referral.sold}
                    format={{
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }}
                  />
                </td>
                <td className={style.numeric}>
                  <NumberFormat
                    value={referral.bonus}
                    format={{
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }}
                  />
                </td>
                <td className={style.numeric}>
                  <DateFormat
                    value={referral.registrationDate}
                    format={{
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                    }}
                  />
                </td>
                <td>{referral.source}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination
          className={style.pagination}
          currentPage={this.props.referrals.currentPageNumber}
          totalPages={this.props.referrals.totalPagesCount}
          onChangePage={this.handleChangePage}
        />
      </Panel>
    );
  }
}
