//@flow
import * as React from 'react';
// import cn from 'classnames';
import { Panel, Table, Pagination } from '@daonomic/ui';
import { Heading } from '~/components/heading';
import { ReferralLink } from './components/referral-link';
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

  render() {
    return (
      <Panel>
        <Heading tagName="h1" size="normal">
          Referral
        </Heading>

        <div className={style.link}>
          <ReferralLink />
        </div>

        <Table
          isEmpty={this.props.referrals.currentPageItems.length === 0}
          caption="Referrals"
          placeholder="You have no referrals"
        >
          <thead>
            <tr>
              <th>Referee</th>
              <th>Bought token</th>
              <th>Bonus</th>
              <th>Date</th>
              <th>Source</th>
            </tr>
          </thead>

          <tbody>
            {this.props.referrals.currentPageItems.map((referral) => (
              <tr key={referral.email}>
                <td>{referral.email}</td>
                <td>{referral.bought}</td>
                <td>{referral.bonus}</td>
                <td>{referral.date}</td>
                <td>{referral.url}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination
          currentPage={this.props.referrals.currentPageNumber}
          totalPages={this.props.referrals.totalPagesCount}
          onChangePage={this.props.referrals.setPage}
        />
      </Panel>
    );
  }
}
