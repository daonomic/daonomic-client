import React, { Component } from 'react';
import cn from 'classnames';
import Panel from '~/components/panel';
import Badge from '~/components/badge';
import saleTimelines from '~/config/sale-timeline';
import styles from './sale-timeline.css';

export default class SaleTimeline extends Component {
  renderSteps = (timeline) => timeline.map(({
    date,
    text,
    percent,
    isActive,
  }) => (
    <li key={date} className={cn(styles.item, { [styles['item_is-active']]: isActive })}>
      <div className={styles.row}>
        {date}

        {isActive ?
          <span className={styles.now}>{' '}Now</span> :
          null
        }
      </div>
      <div className={styles.row}>
        {text}
        {' '}
        <Badge className={cn({ [styles['badge_is-not-active']]: !isActive })}>{percent}</Badge>
      </div>
    </li>
  ));

  render() {
    if (saleTimelines.length === 0) {
      return null;
    }

    return saleTimelines.map(({ title, steps }) => (
      <Panel key={title} className={styles.root}>
        <h3 className={styles.title}>
          {title}
        </h3>

        <ul className={styles.timeline}>
          {this.renderSteps(steps)}
        </ul>
      </Panel>
    ));
  }
}
