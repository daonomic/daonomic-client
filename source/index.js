import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { I18nextProvider } from 'react-i18next';
import i18n from '~/i18n';
import MobxProvider from '~/components/mobx-provider';
import Routes from '~/components/routes';

const targetNode = document.getElementById('app');

function render() {
  ReactDOM.render(
    (
      <AppContainer>
        <I18nextProvider i18n={i18n}>
          <MobxProvider>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </MobxProvider>
        </I18nextProvider>
      </AppContainer>
    ),
    targetNode,
  );
}

if (module.hot) {
  module.hot.accept(render);
}

render();
