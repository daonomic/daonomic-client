// @flow
export function evolveSaleData(saleDataFromServer: any) {
  const { paymentMethods: originalPaymentMethods = [] } = saleDataFromServer;
  const ethPaymentMethod = originalPaymentMethods.find(
    (method) => method.id === 'ETH',
  );
  let paymentMethods = originalPaymentMethods;

  if (ethPaymentMethod) {
    paymentMethods = originalPaymentMethods.concat({
      ...ethPaymentMethod,
      id: 'ERC20',
      label: 'ERC20',
    });
  }

  return {
    ...saleDataFromServer,
    paymentMethods,
  };
}
