import Transaction from './models/transaction.js';

export const resolvers = {
  Query: {
    getTransaction: async (_, { hash }) => {
      return await Transaction.findOne({ hash });
    },
    getAllTransactions: async () => {
      return await Transaction.find();
    }
  },
  Mutation: {
    addTransaction: async (_, { transaction }) => {
      const newTransaction = new Transaction(transaction);
      await newTransaction.save();
      return newTransaction;
    }
  }
};
