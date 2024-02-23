declare global {
  interface Window {
    web3: any;
  }
}

export interface Transaction {
  gasLimit: string;
  gasPrice: string;
  to: string;
  from: string;
  value: string;
  data?: string;
  chainId: string;
  hash: string;
}

export interface TransactionsData {
  getAllTransactions: Transaction[];
}

export interface SingleTransactionData {
  getTransaction: Transaction;
}

export interface TransactionDetails {
  to: string,
  value: number
}

export type Action<P> = {
  type: Actions;
  payload: P;
};

export enum Actions {
  SendTransaction = "SEND_TRANSACTION",
  PrepareTransactionDetails = "PREPARE_TRANSACTION_DETAILS",
  OpenModal= "OPEN_MODAL",
  CloseModal = "CLOSE_MODAL",
  SetTransactionDetails = "SET_TRANSACTION_DETAILS",
  SetWallet = "SET_WALLET"
}

