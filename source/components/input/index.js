import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './input.css';
import Uncontrolled from './uncontrolled';

export default class Input extends PureComponent {
  static Uncontrolled = Uncontrolled;

  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    className: PropTypes.string,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    type: 'text',
    className: '',
    error: '',
    disabled: false,
    onFocus: () => {},
    onBlur: () => {},
  };

  constructor(props) {
    super(props);
    this.id = Math.random().toString();
    this.state = {
      isFocused: false,
    };
  }

  handleFocus = (event) => {
    this.setState({
      isFocused: true,
    });
    this.props.onFocus(event);
  };

  handleBlur = (event) => {
    this.setState({
      isFocused: false,
    });
    this.props.onBlur(event);
  };

  renderError = () => {
    const { error } = this.props;

    if (!error) {
      return null;
    }

    return (
      <p className={styles.error}>
        {error}
      </p>
    );
  };

  render() {
    const { id } = this;
    const {
      label,
      className,
      value,
      error,
      disabled,
      ...restProps
    } = this.props;
    const { isFocused } = this.state;

    return (
      <div
        className={cn(styles.root, {
          [styles.root_invalid]: Boolean(error),
          [styles.root_disabled]: disabled,
        })}
      >
        <div className={styles.field}>
          <input
            {...restProps}
            value={value}
            id={id}
            disabled={disabled}
            className={cn(className, styles.input)}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />

          <label
            htmlFor={id}
            className={cn(styles.label, {
              [styles.label_fixed]: isFocused || value !== '',
            })}
          >
            {label}
          </label>
        </div>

        {this.renderError()}
      </div>
    );
  }
}
