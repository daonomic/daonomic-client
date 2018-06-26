const axios = require('axios');
const { sendTransaction } = require('../utils/transactions');
const { createIcoParams } = require('./fixtures/create-ico');

const client = axios.create({
  baseURL: 'http://ops:9090',
});

const adminClient = axios.create({
  baseURL: 'http://ops:9092/v1',
});

function getResponseData(response) {
  return response.data;
}

function getEmailLetter({ account, content }) {
  return client
    .post('/mails/waitOne', {
      email: account,
      content,
    })
    .then(getResponseData);
}

async function createIco({ kyc }) {
  const { id, txHash } = await sendTransaction({
    transactionDataPromise: adminClient
      .post('/transactions/generate/ico', {
        ...createIcoParams,
        kyc,
      })
      .then(getResponseData),
  });

  const { sale, token } = await adminClient
    .post(`/transactions/${id}/wait/ico`, {
      txHash,
    })
    .then(getResponseData);

  return {
    saleId: sale.id,
    realmId: token.id,
  };
}

async function createExternalKycProvider({
  jurisdiction,
  url = 'http://example.com',
}) {
  return client
    .post('/providers', {
      name: 'Test KYC provider',
      url,
      jurisdiction,
    })
    .then(getResponseData);
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
  createExternalKycProvider,
};
