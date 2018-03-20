const currentHash = '#';

export const getSignInPagePath = () => '/sign/in';
export const getSignUpPagePath = () => '/sign/up';
export const getPasswordResetPagePath = () => '/sign/reset-password';
export const getNewPasswordCreationPagePath = (token) =>
  `/sign/create-new-password/${token}`;
export const getNewPasswordCreationPagePathForBackend = () =>
  `${currentHash}/sign/create-new-password`;

const appPrefix = '/app';

export const getAppPath = () => appPrefix;
export const getBuyTokensPagePath = () => `${appPrefix}/buy`;
export const getWalletCreationPagePath = () => `${appPrefix}/create-wallet`;
export const getFaqPagePath = () => `${appPrefix}/faq`;
