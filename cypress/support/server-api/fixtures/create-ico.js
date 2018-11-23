export const createIcoParams = {
  token: {
    main: { name: 'test', symbol: 'tst' },
    additional: { decimals: 18, pausable: true, burnable: true },
  },
  sale: {
    name: 'Public Sale',
    period: {},
    cap: {},
    rates: [{ method: 'ETH', rate: 1000 }],
    type: 'MINTING',
  },
  mail: {
    icoName: 'test',
    sender: 'test@test',
    registrationTemplate: {
      subject: 'Successful registration',
      text:
        '<p>Hello, congratulations on successfully registering with ${icoName}</p><p>Use this password <b>${password}</b> to enter the <a href="${link}">Dashboard</a></p><p>Don’t forget to save our email in your contacts to check out news about ${icoName}! :)</p><p>Thanks,<br/>${icoName}.</p>',
    },
    passwordResetTemplate: {
      subject: 'Password reset',
      text:
        '<p>You recently initiated a password reset for your Dashboard.<br/>To complete the process, click the link: <a href="${link}">Reset now</a></p><p>If this wasn’t you, your account has been compromised. Please let us know about it.</p><p>Thanks,<br/>${icoName}.</p>',
    },
    allowInvestorTemplate: {
      subject: 'Your KYC application approved',
      text:
        '<p>Hello!</p><p>We are pleased to inform you that your KYC application for ${icoName} sale is successfully approved. You can now continue purchasing ${symbol} tokens on sale page.</p><p>Kind regards, ${icoName}</p>',
    },
    denyInvestorTemplate: {
      subject: 'Your KYC application is rejected',
      text:
        '<p>Hello!</p><p>Unfortunately, your KYC application for ${icoName} sale is rejected. Please, contact us for more details ${email}</p><p>Kind regards, ${icoName}</p>',
    },
  },
};
