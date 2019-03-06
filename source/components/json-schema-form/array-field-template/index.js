// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { Button, FieldHint } from '@daonomic/ui';
import { FieldDescription } from '~/components/json-schema-form/field-description';
import styles from './styles.css';
import { getMarker } from '~/utils/get-marker';

type Props = {
  children: React.Node,
  canAdd: boolean,
  disabled: boolean,
  required: boolean,
  rawErrors: string[],
  title?: string,
  schema: {
    description?: string,
  },
  idSchema: {
    $id: string,
  },
  items: {
    index: number,
    children: React.Node,
    onDropIndexClick: (index: number) => void,
  }[],
  onAddClick: () => void,
};

export class ArrayFieldTemplate extends React.Component<Props> {
  marker = getMarker(this.props.idSchema.$id);

  renderLegend = () => {
    if (!this.props.title) {
      return null;
    }

    return (
      <legend className={styles.legend}>
        {this.props.title}
        {this.props.required ? '*' : ''}
      </legend>
    );
  };

  renderDescription = () => {
    if (!this.props.schema.description) {
      return null;
    }

    return <FieldDescription>{this.props.schema.description}</FieldDescription>;
  };

  renderItems = (): React.Node => {
    return this.props.items.map((item) => (
      <div key={item.index} className={styles.item}>
        <div className={styles['item-toolbar']}>
          <Button
            data-marker={this.marker(item.index)('remove')()}
            type="button"
            design="secondary"
            size="s"
            disabled={this.props.disabled}
            onClick={item.onDropIndexClick(item.index)}
          >
            -
          </Button>
        </div>

        <div className={styles['item-content']}>{item.children}</div>
      </div>
    ));
  };

  renderButtonAdd = () => {
    if (!this.props.canAdd) {
      return null;
    }

    return (
      <Button
        data-marker={this.marker('add')()}
        type="button"
        design="secondary"
        size="s"
        disabled={this.props.disabled}
        onClick={this.props.onAddClick}
      >
        <Trans>Add</Trans>
      </Button>
    );
  };

  renderErrors = () => {
    if ((this.props.rawErrors || []).length === 0) {
      return null;
    }

    return (
      <FieldHint type="error">{this.props.rawErrors.join(', ')}</FieldHint>
    );
  };

  render() {
    return (
      <fieldset className={styles.root} data-marker={this.marker()}>
        <header className={styles.header}>
          {this.renderLegend()}
          {this.renderDescription()}
        </header>
        {this.renderItems()}
        {this.renderButtonAdd()}
        {this.renderErrors()}
      </fieldset>
    );
  }
}
