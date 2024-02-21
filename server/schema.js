import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Transaction {
    gasLimit: String!
    gasPrice: String!
    to: String!
    from: String!
    value: String!
    data: String
    chainId: String!
    hash: String!
  }

  type Query {
    getTransaction(hash: String!): Transaction
    getAllTransactions: [Transaction!]!
  }

  type Mutation {
    addTransaction(transaction: TransactionInput!): Transaction!
  }

  input TransactionInput {
    gasLimit: String!
    gasPrice: String!
    to: String!
    from: String!
    value: String!
    data: String
    chainId: String!
    hash: String!
  }
`;
