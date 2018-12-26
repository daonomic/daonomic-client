//@flow
import * as React from 'react';
import { Select } from '@daonomic/ui';
import { i18n, setLanguage, supportedLanguages } from '~/domains/app/i18n';

type Props = {||};

export class LanguageSelect extends React.Component<Props> {
  handleChange = (event: SyntheticInputEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
    this.forceUpdate();
  };

  render() {
    return (
      <Select value={i18n.language} onChange={this.handleChange}>
        {supportedLanguages.map((language) => (
          <option key={language.id} value={language.id}>
            {language.name}
          </option>
        ))}
      </Select>
    );
  }
}
