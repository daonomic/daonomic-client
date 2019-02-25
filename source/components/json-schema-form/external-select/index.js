// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import client from '~/domains/app/api/client';
import { BaseSelect } from '~/components/json-schema-form/base-select';

import * as DataStateTypes from '~/domains/data/data-state/types';

type Props = {|
  schema: {
    description?: string,
  },
  options: {
    url: string,
  },
  id: string,
  disabled: boolean,
  required: boolean,
  label: string,
  rawErrors: string[],
  value: string,
  onChange: (string) => void,
|};

type Option = {|
  label: string,
  value: string,
|};

type State = {|
  dataState: DataStateTypes.DataState,
  options: Option[],
|};

export class ExternalSelect extends React.Component<Props, State> {
  state = {
    dataState: 'idle',
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
      const { data: options } = await client.get(this.props.options.url);

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
        return <Trans>Loading...</Trans>;
      }

      case 'loaded': {
        return this.props.label;
      }

      default: {
        return <Trans>Failed to load options</Trans>;
      }
    }
  };

  render() {
    const {
      options, // eslint-disable-line no-unused-vars
      ...restProps
    } = this.props;

    return (
      <BaseSelect
        {...restProps}
        disabled={this.props.disabled || this.state.dataState === 'loading'}
        options={{ enumOptions: this.state.options }}
        placeholder={this.getPlaceholder()}
      />
    );
  }
}
