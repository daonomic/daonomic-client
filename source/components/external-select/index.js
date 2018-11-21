// @flow
import * as React from 'react';
import client from '~/domains/app/api/client';
import { Select } from '@daonomic/ui';
import { getTranslation } from '~/domains/app/i18n';

import type { DataState } from '~/types/common';

type Props = {
  disabled?: boolean,
  label: string,
  placeholder: string,
  optionsUrl: string,
};

type Option = {|
  label: string,
  value: string,
|};

type State = {|
  dataState: DataState,
  options: Option[],
|};

export class ExternalSelect extends React.Component<Props, State> {
  state = {
    dataState: 'initial',
    options: [],
  };

  componentDidMount() {
    this.loadOptions();
  }

  loadOptions = async () => {
    this.setState({
      dataState: 'loading',
    });

    try {
      const { data: options } = await client.get(this.props.optionsUrl);

      this.setState({
        dataState: 'loaded',
        options,
      });
    } catch (error) {
      this.setState({
        dataState: 'failed',
      });
    }
  };

  getPlaceholder = () => {
    switch (this.state.dataState) {
      case 'loading': {
        return `${getTranslation('common:loading')}...`;
      }

      case 'loaded': {
        return this.props.placeholder || this.props.label;
      }

      default: {
        return getTranslation('common:failedToLoadOptions');
      }
    }
  };

  render() {
    const {
      optionsUrl, // eslint-disable-line no-unused-vars
      ...restProps
    } = this.props;

    return (
      <Select
        {...restProps}
        disabled={this.props.disabled || this.state.dataState === 'loading'}
        placeholder={this.getPlaceholder()}
      >
        {this.state.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    );
  }
}
