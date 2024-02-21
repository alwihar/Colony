import React from "react";
import { useQuery } from "@apollo/client";
import { GetSingleTransaction } from "../queries";
import { SingleTransactionData } from "../types";
import { navigate } from "./NaiveRouter";

interface SingleTransactionProps {
  id: string | null;
}

const SingleTransaction: React.FC<SingleTransactionProps> = ({ id }) => {
  const handleGoBack = () => navigate(`/transactions`);

  const { loading, error, data } = useQuery<SingleTransactionData>(
    GetSingleTransaction,
    { variables: { hash: id } },
  );

  if (loading) {
    return (
      <div className="flex flex-col mt-20">
        <div className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col mt-20">
        <div className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between text-red-600 font-bold">
          Error: {error.message}
        </div>
      </div>
    );
  }

  const { hash, to, from, value } = data?.getTransaction || {};

  return (
    <div>
      <div className="flex flex-col mt-20">
        <div className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
          <div>
            <button
              onClick={handleGoBack}
              type="button"
              className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-full border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="max-w-[85rem] w-full mx-auto px-4">
          <h1 className="text-2xl mb-10">Transaction</h1>
          <p>
            <span className="font-bold">Transaction Hash:</span> {hash}
          </p>
          <p>
            <span className="font-bold">Sender Address:</span> {from}
          </p>
          <p>
            <span className="font-bold">Recipient Address:</span> {to}
          </p>
          <p>
            <span className="font-bold">Amount:</span> {value} ETH
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleTransaction;
