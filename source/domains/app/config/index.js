// @flow

const globalDaonomicConfig = window.daonomicConfig || {};

export const environment: 'development' | 'staging' | 'production' =
  globalDaonomicConfig.environment || process.env.ENVIRONMENT;

const realms = {
  development: '',
  staging: '5c8fb92adfe5224664edfa11',
  production: '5c9b6e124c76b06a3c608658',
};

export const config = {
  realmId:
    globalDaonomicConfig.realm || realms[environment] || realms.production,
  contactEmail: 'tge@transitprotocol.com',
  termsOfServiceUrl: 'terms.url',
  daonomicUrl: 'https://daonomic.io',
  faq: [
    {
      title: '1. General questions',
      questions: [
        {
          question: 'What is the Transit Protocol? And what is it for?',
          answer: `Transit Protocol is transforming mass transit to provide urban commuters with a
            seamless commuting experience everyday, bringing every mode of transport together
            into one single app that integrates transport options from different providers (such as
            buses and train), and handling the full experience from journey planning to payments
            and dynamic journey adjustments.`,
        },
        {
          question: 'What is ICO and pre-ICO? ',
          answer: `ICO, or Initial Coin Offering, otherwise know as TGE (Token Generation Event) is a
          mechanism for fundraising, under the terms of which future crypto currency is sold for
          fiat currency or liquid virtual money. You can receive tokens of the ICO or TGE project in
          exchange for your USD, Bitcoin or Ether. This is a new iteration of the crowdfunding
          model. Participants finance the company’s development now for some benefits in the
          future.
          <br /><br />
          Pre-ICO is the fundraising phase before ICO, the main phase of the project. It is
          conducted to test and verify the demand for the project, get support from the
          community and expand the budget for marketing before the main ICO event. `,
        },
        {
          question: 'What is blockchain? ',
          answer: `Blockchain is a distributed database that doesn’t have storage devices connected to a
          shared server. This database stores an ever-growing list of ordered records, called
          blocks. Each block contains a timestamp and a link to the previous block.`,
        },
        {
          question: 'What is Smart Contract? ',
          answer: `This is a program code that allows you to automatically perform certain functions
          when certain conditions occur. To implement smart contracts, a decentralised
          environment is required that completely excludes the human factor. To use the transfer
          of value in a smart contract, it requires a cryptocurrency.`,
        },
        {
          question: 'What is cryptocurrency? ',
          answer: `These are monetary units (also known as “coins” or “tokens”) protected by
          cryptographic technology. There is no physical analogue to these monetary units, they
          exist only in virtual space. Tokens are protected from forgery, because they represent
          encrypted information that can not be copied (the use of cryptography defined the
          prefix “crypto” in the title).`,
        },
      ],
    },
    {
      title: '2. Transit Protocol ICO Related Questions: ',
      questions: [
        {
          question: 'When is the ICO? ',
          answer: `Pre-ICO will commence on January 28, 2019. The main ICO/TGE event will be launch on
          March 25, 2019, with the targeted completion date of June 2, 2019. `,
        },
        {
          question: `What is the total supply of TRANSIT tokens? How many tokens will be sold in this
          TGE?`,
          answer: `A total of 1.5 billion (1,500,000,000) TRANSIT tokens will be minted this Token
          Generation Event, of which 825 million (55%) will be available for the sale. For all latest
          updates, please refer to our official website: <a href="http://transitprotocol.com" target="_blank" title="transit protocol web-site"></a>`,
        },
        {
          question: `How much does one TRANSIT token cost? `,
          answer: `<b>TRANSIT</b> tokens are available for sale at the price of US$ 0.10 per token in this token
          sale exercise. `,
        },
        {
          question: `What happens if all tokens are not sold out? `,
          answer: `Tokens not sold during the Token Sale will be held by Company at the reserve fund and
          may be sold by the Company in the future, as determined by the management of the
          Company in the best interest of the Company. `,
        },
        {
          question: `How can I pay for the purchase of TRANSIT tokens? `,
          answer: `We accept the payment for tokens in BTC or ETH. If purchase payment is made in
          cryptocurrency, it will be converted, for calculation purposes, into USD using the
          exchange rate prevailing at or around the time of receipt of such purchase payment by
          the Company. For purchases in fiat currencies, please contact us directly for
          discussion. `,
        },
        {
          question: `Which wallet should I use to purchase my TRANSIT tokens? `,
          answer: `TRANSIT token is an Ethereum-based ERC20 token. Token holders can easily store and
          manage their TRANSIT token using existing Ethereum wallets of their choice.`,
        },
        {
          question: `Can I participate in the Transit Protocol ICO if I don’t have an official Ethereum
          address? `,
          answer: `No. As the TRANSIT tokens are released on the Ethereum blockchain, you are required
          to have an Ethereum address in order to get and store TRANSIT tokens. You can use
          the following Ethereum wallets: Ethereum wallet, Mist, MyEtherWallet.com or other
          wallets in which you have access to your private keys. Do not send ETH to participate in
          the ICO from the accounts of exchanges!!! You don’t have access to your private keys
          on accounts of crypto exchanges, so you will not have access to TRANSIT tokens! `,
        },
        {
          question: `What is the legal structure of the Transit Protocol project?  `,
          answer: `Transitlink Technologies Pte Ltd (company running Transit Protocol project) is
          incorporated in Singapore. It is managed by a cross-culture team of multiple nationalities. We also have a multi disciplinary team of advisors based in the region
          and around the world assisting us.`,
        },
        {
          question: `What is the hard cap of the ICO campaign? `,
          answer: `The hard cap of the campaign is set at 35,000,000 USD. `,
        },
        {
          question: `How will the funds collected during the pre-ICO and ICO event be utilised? `,
          answer: `The utilisation of funds received during the pre-ICO and ICO campaigns will almost
          completely be used for further development of the Transit Protocol platform. The
          development plan includes not only the development of the platform described in our
          vision, but also the future iterations to further our competitive advantage in the global
          arena. `,
        },
        {
          question: `Have TRANSIT token’s smart contract been checked by reputable third party auditors?  `,
          answer: `Yes, all our token smart contracts has been audited by SmartDec - a service provider
          that evaluates and secures all cybersecurity aspects of our blockchain-based project. `,
        },
        {
          question: `What is the token lockup or vesting period for the team members and advisors? `,
          answer: `The tokens allocated to our advisors and team members will be fully vested for 8
          months from the date of listing in a crypto exchange. `,
        },
        {
          question: `When is TRANSIT token going to be listed?  `,
          answer: `The TRANSIT token is going to be listed on a crypto exchange after completion of ICO
          campaign and technical integration with the selected exchange`,
        },
        {
          question: `Which are the crypto exchanges that you are listing in? Any timeline? `,
          answer: `The TRANSIT tokens will be listed on a few crypto exchanges in order to provide our
          backer with more liquidity and better accessibility for trading. Currently, we are
          considering listing on several top exchanges like ProBit, P2PB2P, CoinTiger, Coinsuper,
          LAToken and more. The initial listing is planned for Q2 2019, with the subsequent
          crypto exchange listings happening in Q3 and Q4 of 2019. `,
        },
      ],
    },
    {
      title: '3. Economic System Questions',
      questions: [
        {
          question: 'What is TRANSIT token?',
          answer: `TRANSIT tokens are not stocks, goods or investments. The TRANSIT token is an ERC20
          standard utility token. The Token can be used on Transit Protocol platform as a means
          of payment for the services offered through the Platform. Outside of the platform, the
          TRANSIT token will be freely transferable to third parties on the open market upon its
          receipt, just like any other ERC20 standard token. `,
        },
        {
          question: 'Where does TRANSIT tokens come from?',
          answer: `TRANSIT tokens are created by a smart contract at the time when it receives funds
          (ETH, BTC or USD). In the event that the ICO campaign successfully achieves the
          fundraising goal, TRANSIT tokens will be credited to all respective backers’ crypto
          wallets. `,
        },
        {
          question: 'Why do I want to buy TRANSIT tokens?',
          answer: `There are over 4 billion people living in urban cities globally today. And they all need to
          commute to work or study everyday. That’s over 265 billion trips a year. The Transit
          Protocol project is founded based on empowering public transport operators to
          improve commuters experience on a daily and continual basis. The platform will be the
          most advance global public transport centric platform in the world, and well positioned
          to take advantage of this industry.
          <br /></br />
          TRANSIT token is the clearing and settlement token for all transactions processed on
          the Transit Protocol platform, including both ticket processing fees and advertising
          fees. TRANSIT tokens will also be traded on the major crypto exchanges of the world
          and provide liquidity to token holders at such times that they want to convert those into
          fiat currencies (legal tender of countries). Token holders can experience price
          appreciation in their TRANSIT tokens driven by the growing adoption of Transit Protocol
          and TRANSIT tokens globally, and leading to high demand for the token. `,
        },
        {
          question: 'How can I buy TRANSIT tokens?',
          answer: `TRANSIT tokens can only be purchased in two ways: through our official token sales
          web page during the ICO event, or on the crypto exchanges after the ICO when all
          TRANSIT tokens purchased have been issued. `,
        },
        {
          question: 'Where can I deal with TRANSIT tokens?',
          answer: `Like all cryptocurrencies, TRANSIT tokens can be sold on crypto exchanges upon
          closure of the ICO event and completion of listing procedure.  `,
        },
        {
          question: 'How do you store the TRANSIT tokens?',
          answer: `All TRANSIT tokens are generated and controlled by the smart contract. The TRANSIT
          tokens will be stored by the company in a cold storage and secured by MultiSig. `,
        },
        {
          question: 'How do you store my TRANSIT tokens?',
          answer: `Your TRANSIT tokens will be kept by you, on your personal crypto wallet. `,
        },
        {
          question:
            'Do I need to register and/or submit KYC (Know Your Customer) application?',
          answer: `As part of our compliance and KYC/AML (Know Your Customer / Anti-MoneyLaundering) process, all backers of the TRANSIT tokens need to be verified. You will
          need to register on our official token sales web page and provide all the necessary
          information required by the regulations along with your Ethereum address. `,
        },
        {
          question: 'How much will your token cost in the future?',
          answer: `The value of the TRANSIT token on the open market will always be determined by a
          number of factors which are beyond our control. The most critical factors affecting the
          price of tokens are the scarcity (number of tokens in supply), the liquidity (number of
          holders of the tokens) and the utility (how the tokens are used in the ecosystem). We
          can hypothesise that the value of the TRANSIT tokens in the future would be higher
          when we scale and execute our business model. Please note, that there shall be no
          guarantee of any particular market value of the TRANSIT token. `,
        },
        {
          question: 'What are the major benefits for early token buyers?',
          answer: `Contributing during the early private sale stages will entitle token holders to exclusive
          discounts and bonuses on the platform.`,
        },
      ],
    },
    {
      title: '4. Participation in Crowdsale Questions',
      questions: [
        {
          question: 'What is a crowdsale?',
          answer: `Crowdsale is any ICO, pre-ICO, or crowd-investing campaign. Historically, a
          crowdfunding campaign is not considered as crowdsale. `,
        },
        {
          question: 'How to participate in the crowdsale? ',
          answer: `In order to participate in the crowdsale on the Transit Protocol platform, you need to
          have ETH cryptocurrency. In order to buy the Ethereum, you must first create a wallet.
          The most common way is www.myetherwallet.com and we recommend using this
          method of creating and managing your wallet. You can also use a different crypto
          wallet of your choice, including hardware (cold) wallets. Always protect your private
          keys!
          <br /><br />
          We are also already working on taking not only ETH, but also other cryptocurrencies
          and fiat money. However, due to the fact that we are doing everything legally and safely
          for all participants of the platform, the reception of fiat money won’t be realised
          immediately, but only after an optimal legal scheme has been worked out. This option
          is only available for pre-ICO now. Please contact us for more details. `,
        },
        {
          question: 'How do I get a Ethereum wallet? ',
          answer: `There are a few options available for you when you want to get an Ethereum wallet. The
          final decision on which method to use, how to create Ethereum wallet, what security
          measures to take and how to maintain the integrity of your crypto wallet remains at
          your full discretion. Please, choose any method that you feel the most comfortable
          with, and use our suggestion only as recommendation.
          <br />
          <ul><li>Option #1: MyEtherWallet. Go to <a href="https://myetherwallet.com/" target="_blank">https://myetherwallet.com/</a> and carefully follow
          the instructions to set up your new Ethereum wallet.</li>
          <li>Option #2: MetaMask. If you use Google Chrome, Opera, Firefox browser you can
          install MetaMask plugin to setup your crypto wallet. Go to <a href="https://metamask.io/" target="_blank">https://metamask.io/</a>
          and follow the instructions on how to install the plugin for your browser.
          </li>
          <li>Option #3: Legder Nano S. This option provides you with a higher security but
          requires a purchase of a small hardware device (“cold wallet”). Go to <a href="https://ledger.com/" target="_blank">https://ledger.com/</a> to learn more and order online, or alternatively, you can purchase a
          unit from an authorised reseller.
          </li></ul>
          After you have a wallet, to buy ether on crypto exchanges and open markets, you just
          need to specify its number and make a purchase (on each site its own way). The ETH
          will be transferred there.`,
        },
        {
          question: 'How do I buy ETH? ',
          answer: `The best way is usually to buy them on crypto exchanges, for example
          www.coinbase.com (has its own mobile wallet for buying / selling bitcoins and ether). There are many other exchanges, but if you haven’t worked with them before, carefully
          read the reviews about them, so as not to get to phishing sites. `,
        },
        {
          question: 'How do I support TRANSIT token ICO campaign? ',
          answer: `In order to support our ICO campaign, you must be registered on the platform. After
          that, you can choose the desired payment. The platform will generate a unique address
          to which you will send the amount of ETH corresponding to the chosen payment from
          any place and in any desired way. When you receive the appropriate amount, this
          unique address will link the payment to your registered profile on our official token
          sales web page, and the campaign’s smart contract lists the appropriate amount of
          TRANSIT tokens.`,
        },
      ],
    },
  ],
  kyberWidgetUrl: 'https://kyber.daonomic.io',
  defaultPollingInterval: 3000,
};

export function actualizeRealmId() {
  if (globalDaonomicConfig.realm) {
    config.realmId = globalDaonomicConfig.realm;
  }
}
