import * as React from 'react';
import cn from 'classnames';
import { Panel } from '@daonomic/ui';
import styles from './style.css';

const sampleTimeline = [
  {
    title: 'Rounds Timeline:',
    steps: [
      { date: 'Jan 28 - Mar 31', text: 'Seed Round' },
      { date: 'Apr 1 - Apr 28', text: 'Private A' },
      { date: 'Apr 29 - May 26', text: 'Private B' },
      { date: 'May 27 - Jun 23', text: 'Private C' },
      { date: 'Jun 24 - Jul 21', text: 'Private D' },
      { date: 'Jul 22 - Sep 1', text: 'Private E' },
    ].map((step) => {
      let [start, end] = step.date.split(' - ');

      start = Number(new Date(start.concat(' 2019 UTC+0')));

      end = new Date(end.concat(' 2019 UTC+0'));
      end.setHours(23);
      end.setMinutes(59);
      end = Number(end);

      return { ...step, start, end };
    }),
  },
];

function toDuration(date) {
  let delta = Math.floor(Number(date) / 1000);

  const seconds = delta % 60;
  const minutes = Math.floor(delta / 60) % 60;
  const hours = Math.floor(delta / 60 / 60) % 24;
  const days = Math.floor(delta / 60 / 60 / 24);

  return `${days} days ${hours}:${minutes}:${seconds}`;
}

export class RoundsTimeline extends React.Component {
  state = {
    now: Number(new Date()),
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ now: Number(new Date()) });
    }, 1000 / 60);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderSteps(timeline) {
    return timeline.map(({ date, text, start, end }) => {
      const isActive = start <= this.state.now && this.state.now < end;
      const remaining = toDuration(end - this.state.now);

      return (
        <li
          key={date}
          className={cn(styles.item, {
            [styles.item_active]: isActive,
          })}
        >
          <div className={styles.row}>
            <span className={styles.title}>{text}</span>
          </div>
          <div className={styles.row}>
            {date} {isActive && <span className={styles.now}>(Now)</span>}
          </div>
          {isActive && (
            <div className={styles.row}>
              <span className={styles.now}>{remaining} remaining</span>
            </div>
          )}
        </li>
      );
    });
  }

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
