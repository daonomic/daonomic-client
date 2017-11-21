import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Input from './';

export default class UncontrolledInput extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    value: '',
    onChange: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
    this.props.onChange(event);
  };

  render() {
    const { value } = this.state;

    return (
      <Input
        {...this.props}
        value={value}
        onChange={this.handleChange}
      />
    );
  }
}
