import { config } from '../../../config';

Cypress.Commands.add(
  'getCurrentNetworkTime',
  () =>
    cy
      .request({
        method: 'GET',
        url: `${config.baseTestUrl}/time`,
      })
      .then((response) => response.body),
  // new Cypress.Promise(
  //   (resolve) => {
  //     try {
  //       const timeContract = new web3.eth.Contract(
  //         [
  //           {
  //             constant: true,
  //             inputs: [],
  //             name: 'getTime',
  //             outputs: [
  //               {
  //                 name: '',
  //                 type: 'uint256',
  //               },
  //             ],
  //             payable: false,
  //             stateMutability: 'view',
  //             type: 'function',
  //           },
  //         ],
  //         '0000000000000000000000000000000010000000',
  //       );

  //       timeContract.methods
  //         .getTime()
  //         .call()
  //         .then((response) => {
  //           resolve(response * Math.pow(10, 3));
  //         });
  //     } catch (error) {
  //       // eslint-disable-next-line
  //       console.error(error);

  //       throw new Error("Can't get time");
  //     }
  //   },
  //   { timeout: 1000 * 10 },
  // ),
);
