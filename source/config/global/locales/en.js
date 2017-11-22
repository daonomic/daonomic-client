window.config = window.config || {};
window.config.locales = window.config.locales || {};

window.config.locales.en = {
  common: {
    tokenName: 'TIKR',
    loading: 'Loading',
    poweredBy: 'Powered by',
    termsOfService: 'Terms of Service',
  },

  auth: {
    email: 'E-mail',
    password: 'Password',
    forgotPassword: 'Forgot your password?',
    dontHaveAccount: 'Don’t have an account?',
    alreadyHaveAccount: 'Already have an account?',
    logout: 'Logout',
    signInHeading: 'Sign In',
    signInSubmit: 'Sign In',
    signUpHeading: 'Sign Up',
    signUpSubmit: 'Sign Up',
    signUpSuccess: 'Password has been sent to email',
    forgotPasswordInstruction: 'Enter the email address you used when you joined and we’ll send you instructions to reset your password.',
    forgotPasswordSecurity: 'For security reasons, we do NOT store your password. So rest assured that we will never send your password via email.',
    forgotPasswordSubmit: 'Send Reset Instructions',
    successfulResetTitle: 'Reset Instructions Sent',
    successfulResetAnnotation: 'Instructions to reset your password have been sent to you. Please check your email.',
    createNewPasswordTitle: 'Create New Password',
    newPassword: 'New Password',
    confirmNewPassword: 'Confirm New Password',
    submitNewPassword: 'Create New Password',
    successfulNewPasswordCreation: 'New password have been created.',
  },

  faq: {
    title: 'Frequently Asked Questions',
  },

  paymentMethods: {
    title: 'Step 2: Select your payment method',
    wantToPayWith: 'I want to pay with',
    sendFundsTo: 'Send funds to this {{ paymentMethod }} address:',
    statusesTitle: 'Payments statuses',
    statusFinished: 'finished',
    statusPending: 'pending',
    instructionTitle: 'Payment Instruction',
    instructionText: 'After your payment will be completed you will get tokens to the selected ethereum address:',
  },

  wallet: {
    title: 'Step 1: Your Ethereum Wallet',
    annotation: 'In order to recieve {{ tokenName }} tokens you need to give your Ethereum Wallet Adress.',
    noticeTitle: 'Important',
    noticeText: 'We are not able to send tokens to Exchange Ethereum wallets.',
    ethereumAddress: 'Ethereum address',
    save: 'Save',
    saved: 'Saved',
  },

  widgets: {
    yourWalletBalance: 'Your Wallet Balance',
    tokenPrice: 'Token Price',
    tokensSold: 'Tokens Sold',
    cantFindWhatLookingFor: 'Can’t find what are you looking for?',
    emailUs: 'Email Us',
  },
};
