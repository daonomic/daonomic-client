const axios = require('axios');

const client = axios.create({
  baseURL: 'http://ops:9090',
});

function getEmailLetter({ account, content }) {
  return client
    .post('/mails/waitOne', {
      email: account,
      content,
    })
    .then(({ data }) => data);
}

function createIco({ start, end, tokensCount }) {
  return client
    .post('/icos', { start, end, total: tokensCount })
    .then(({ data }) => ({
      saleId: data.sale,
      realmId: data.realm,
    }));
}

function createUser({ realmId }) {
  return client.post('/users', { realm: realmId }).then(({ data }) => ({
    email: data.email,
    password: data.password,
  }));
}

module.exports = {
  getEmailLetter,
  createIco,
  createUser,
};
