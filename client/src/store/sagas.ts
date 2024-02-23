import { takeEvery, put, select, all } from "redux-saga/effects";
import {
  JsonRpcProvider,
  Transaction,
  TransactionResponse,
  TransactionReceipt,
  BrowserProvider,
  Signer
} from "ethers";

import apolloClient from "../apollo/client";
import { Actions } from "../types";
import { closeModal, setTransactionDetails } from "./actions"
import { SaveTransaction, GetAllTransactions } from "../queries";
import { navigate } from "../components/NaiveRouter";
import { RootState } from "./reducers"
import { TransactionDetails } from "../types"

// preparing transaction details before sending the tx
function* prepareTransactionDetails() {
  const provider = new JsonRpcProvider("http://localhost:8545");
  const accounts: Array<{ address: string }> = yield provider.listAccounts();

  const randomAddress = () => {
    const min = 1;
    const max = 19;
    const random = Math.round(Math.random() * (max - min) + min);
    return accounts[random].address;
  };

  const transactionDetails = {
    to: randomAddress(),
    value: 1000
  };

  // Set the transaction details in the global state
  yield put(setTransactionDetails(transactionDetails));
}

function* sendTransaction() {
  const walletProvider = new BrowserProvider(window.web3.currentProvider);

  const signer: Signer = yield walletProvider.getSigner();

  // Access transaction details from the Redux store
  const transaction: TransactionDetails = yield select((state: RootState) => state.txDetails);

  if (!transaction) {
    console.error("Transaction details are not set.");
    return;
  }

  try {
    const txResponse: TransactionResponse =
      yield signer.sendTransaction(transaction);
    const response: TransactionReceipt = yield txResponse.wait();

    const receipt: Transaction = yield response.getTransaction();

    const variables = {
      transaction: {
        gasLimit: (receipt.gasLimit && receipt.gasLimit.toString()) || "0",
        gasPrice: (receipt.gasPrice && receipt.gasPrice.toString()) || "0",
        to: receipt.to,
        from: receipt.from,
        value: (receipt.value && receipt.value.toString()) || "",
        data: receipt.data || null,
        chainId: (receipt.chainId && receipt.chainId.toString()) || "123456",
        hash: receipt.hash
      }
    };

    yield apolloClient.mutate({
      mutation: SaveTransaction,
      variables,
    });

    // navigating to the single tx screen
    navigate(`/transaction/${receipt.hash}`);

    yield apolloClient.query({
      query: GetAllTransactions,
      fetchPolicy: 'network-only'
    });

    // closing the send tx modal, state managed globally
    yield put(closeModal());

  } catch (error) {
    console.log(error)
  }
}

export function* rootSaga() {
  yield all([
    takeEvery(Actions.SendTransaction, sendTransaction),
    takeEvery(Actions.PrepareTransactionDetails, prepareTransactionDetails)
  ]);
}
