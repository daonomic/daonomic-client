// @flow

const sales = {
  development: '0x938a97375d6809f7fcd191139e6658d6a5109a48',
  production: '0x99a09f0d85bc6e95e110348a8522f98443e31c4a',
};

export const realm = '5a7f5cf23f6b6b92b6fdd68a';
export const sale: string = sales[process.env.API] || sales.production;
export const contactEmail = 'dev@0v1se.com';
export const termsOfServiceURL = 'terms.url';
