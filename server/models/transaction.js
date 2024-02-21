import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  nonce: String,
  gasLimit: String,
  gasPrice: String,
  to: String,
  from: String,
  value: String,
  data: String,
  chainId: String,
  hash: String,
  r: String,
  s: String,
  v: String
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
