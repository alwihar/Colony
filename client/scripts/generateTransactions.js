const { JsonRpcProvider, Wallet, parseEther } = require('ethers');
const fetch = require('node-fetch');

const provider = new JsonRpcProvider('http://localhost:8545');

const randomEth = () => {
  const min = 0.5;
  const max = 10;
  const random = Math.random() * (max - min) + min;
  return parseEther(random.toString());
};

const saveTransactionToDatabase = async (transaction) => {
  const query = `
    mutation AddTransaction($transaction: TransactionInput!) {
      addTransaction(transaction: $transaction) {
        hash
      }
    }
  `;

  const variables = {
    transaction: {
      gasLimit: transaction.gasLimit && transaction.gasLimit.toString() || '0',
      gasPrice: transaction.gasPrice && transaction.gasPrice.toString() || '0',
      to: transaction.to,
      from: transaction.from,
      value: transaction.value && transaction.value.toString() || '',
      data: transaction.data || null,
      chainId: transaction.chainId && transaction.chainId.toString() || '123456',
      hash: transaction.hash,
    }
  };

  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables })
  });

  const responseData = await response.json();

  // You can add some error handling here based on the response
  return responseData;
};

(async () => {
  const walletFromMnemonic = Wallet.fromPhrase('myth like bonus scare over problem client lizard pioneer submit female collect');
  const sender = new Wallet(walletFromMnemonic.privateKey, provider);

  for (let i = 1; i < 20; i++) {
    const transaction = {
      to: (await provider.listAccounts())[i].address,
      value: randomEth()
    };

    try {
      const txResponse = await sender.sendTransaction(transaction);
      const response = await txResponse.wait();

      const receipt = await response.getTransaction();

      await saveTransactionToDatabase(receipt);
    } catch (error) {
      //
    }
  }
})();
