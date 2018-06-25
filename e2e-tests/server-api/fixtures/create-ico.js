module.exports = {
  createIcoParams: {
    token: {
      name: 'test',
      symbol: 'tst',
      decimals: 18,
    },
    sale: {
      name: 'Public sale',
      rates: [
        {
          method: 'ETH',
          rate: 1000,
        },
      ],
    },
    mail: {
      icoName: 'Test',
      sender: 'test@example.com',
      registrationTemplate: {
        subject: 'Successful registration',
        text:
          '<p>Hello, congratulations on successfully registering with ${icoName}</p><p>Use this password <b>${password}</b> to enter the <a href="${link}">Dashboard</a></p><p>Don’t forget to save our email in your contacts to check out news about ${icoName}! :)</p><p>Thanks,<br/>${icoName} team.</p>',
      },
      passwordResetTemplate: {
        subject: 'Password reset',
        text:
          '<p>You recently initiated a password reset for your Dashboard.<br/>To complete the process, click the link: <a href="${link}">Reset now</a></p><p>If this wasn’t you, your account has been compromised. Please let us know about it.</p><p>Thanks,<br/>${icoName} team</p>',
      },
    },
  },
};
