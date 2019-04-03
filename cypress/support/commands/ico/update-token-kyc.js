Cypress.Commands.add('updateTokenKyc', (tokenId, adminToken, kycData) => {
  return cy
    .request({
      method: 'POST',
      url: `http://ops:9092/v1/tokens/${tokenId}/kyc`,
      body: kycData,
      headers: { 'X-AUTH-TOKEN': adminToken },
    })
    .then(({ body }) => body);
});
