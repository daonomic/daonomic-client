//@flow
import * as React from 'react';
// $FlowFixMe
import { Trans, Plural } from '@lingui/macro';
import CountdownTimer from 'react-countdown-now';
import { Text } from '@daonomic/ui';
import { getMarker } from '~/utils/get-marker';
import { Panel } from '@daonomic/ui';
import { formatDate, formatTime } from '~/domains/app/i18n';
import { Heading } from '~/components/heading';
import style from './style.css';

type Props = {|
  startTimestamp: ?number,
  endTimestamp: ?number,
  renderContent(): React.Node,
|};

export class SalePeriodGuard extends React.Component<Props> {
  marker = getMarker('sale-period-guard');

  renderStartNotification = (props: {|
    date: number,
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
    completed: boolean,
  |}) => {
    const { date, days, hours, minutes, seconds, completed } = props;
    const startDate = new Date(date);

    if (completed) {
      return this.props.renderContent();
    } else {
      return (
        <Panel data-marker={this.marker()}>
          <div className={style.placeholder}>
            <Text
              align="center"
              size="m"
              element="p"
              className={style.paragraph}
              data-marker={this.marker('countdown-timer')()}
            >
              <Trans>
                Token sale starts in{' '}
                <Plural value={days} one="1 day" other="# days" />{' '}
                <Plural value={hours} one="1 hour" other="# hours" />{' '}
                <Plural value={minutes} one="1 minute" other="# minutes" />{' '}
                <Plural value={seconds} one="1 second" other="# seconds" />
              </Trans>
            </Text>
            <Text
              align="center"
              size="m"
              element="p"
              className={style.paragraph}
            >
              {formatDate(startDate)} {formatTime(startDate)}
            </Text>
          </div>
        </Panel>
      );
    }
  };

  render() {
    const { startTimestamp, endTimestamp } = this.props;
    const now = Date.now();

    if (startTimestamp && now < startTimestamp) {
      return (
        <CountdownTimer
          date={startTimestamp + 1000 * 10}
          zeroPadLength={0}
          renderer={this.renderStartNotification}
        />
      );
    } else if (endTimestamp && now > endTimestamp) {
      return (
        <Panel data-marker={this.marker()}>
          <Heading
            data-marker={this.marker('finish-notification')()}
            tagName="h1"
            className={style.placeholder}
            size="normal"
          >
            <Trans>Sale is finished!</Trans>
          </Heading>
        </Panel>
      );
    }

    return this.props.renderContent();
  }
}
