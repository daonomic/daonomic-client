import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from './header';

export default withRouter(({ location, history }) => (
  <Header
    currentPagePath={location.pathname}
    onChangeCurrentPage={(url) => {
      history.push(url);
      window.scrollTo(0, 0);
    }}
  />
));
