// @flow
import * as React from 'react';
import cn from 'classnames';
import { Badge, Panel } from '@daonomic/ui';
import styles from './sale-timeline.css';

import type { TimelineStep } from '~/types/sale-timeline';

const sampleTimeline = [
  {
    title: 'Sale Timeline:',
    steps: [
      {
        date: '21 Jul',
        text: '1 Token Coin = 30 BTC',
        percent: '30%',
        isActive: false,
      },
      {
        date: '21 Aug',
        text: '1 Token Coin = 40 BTC',
        percent: '20%',
        isActive: false,
      },
      {
        date: '21 Sep',
        text: '1 Token Coin = 50 BTC',
        percent: '10%',
        isActive: true,
      },
      {
        date: '21 Oct',
        text: '1 Token Coin = 40 BTC',
        percent: '5%',
        isActive: false,
      },
    ],
  },
];

export default class SaleTimeline extends React.Component<{}> {
  renderSteps = (timeline: TimelineStep[]) =>
    timeline.map(({ date, text, percent, isActive }) => (
      <li
        key={date}
        className={cn(styles.item, {
          [styles.item_active]: isActive,
        })}
      >
        <div className={styles.row}>
          {date}

          {isActive ? <span className={styles.now}> Now</span> : null}
        </div>
        <div className={styles.row}>
          {text}{' '}
          <Badge
            className={cn({
              [styles.badge_inactive]: !isActive,
            })}
          >
            {percent}
          </Badge>
        </div>
      </li>
    ));

  render() {
    if (sampleTimeline.length === 0) {
      return null;
    }

    return sampleTimeline.map(({ title, steps }) => (
      <Panel key={title} className={styles.root}>
        <h3 className={styles.title}>{title}</h3>

        <ul className={styles.timeline}>{this.renderSteps(steps)}</ul>
      </Panel>
    ));
  }
}
