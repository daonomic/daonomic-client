const axios = require('axios');
const { sendTransaction } = require('../utils/transactions');
const { createIcoParams } = require('./fixtures/create-ico');

const client = axios.create({
  baseURL: 'http://ops:9090',
});

const adminClient = axios.create({
  baseURL: 'http://ops:9092/v1',
});

function getEmailLetter({ account, content }) {
  return client
    .post('/mails/waitOne', {
      email: account,
      content,
    })
    .then(({ data }) => data);
}

async function createIco({ kyc }) {
  const { id, txHash } = await sendTransaction({
    transactionDataPromise: adminClient
      .post('/transactions/generate/ico', {
        ...createIcoParams,
        kyc,
      })
      .then(({ data }) => data),
  });

  const { sale, token } = await adminClient
    .post(`/transactions/${id}/wait/ico`, {
      txHash,
    })
    .then(({ data }) => data);

  return {
    saleId: sale.id,
    realmId: token.id,
  };
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
