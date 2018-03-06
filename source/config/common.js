// @flow

const sales = {
  development: '0xaee0eb707a23fee852c43b5eb22030a25a729937',
  production: '0xf76350f0ad6b7cfce1311ef43e2eef488fd16dad',
};

export const realm = '5a8d7ce7a302eb3601fdef2c';
export const sale: string = sales[process.env.API] || sales.production;
export const contactEmail = 'dev@0v1se.com';
export const termsOfServiceURL = 'terms.url';
