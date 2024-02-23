import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Onboard from "@web3-onboard/core";
import metamaskModule from "@web3-onboard/metamask";

import SendTransaction from "./SendTransaction";
import { setWallet } from "../store/actions";
import { RootState } from "../store/reducers"

const metamask = metamaskModule({options: {}});

const onboard = Onboard({
  wallets: [metamask],
  chains: [
    {
      id: "123456",
      token: "ETH",
      label: "Local Ganache",
      rpcUrl: "http://localhost:8545",
    },
  ],
});

const Navigation: React.FC = () => {
  const dispatch = useDispatch();
  const walletAddress = useSelector((state: RootState) => state.walletAddress);

  const handleConnect = useCallback(async () => {
    try {
      const wallets = await onboard.connectWallet();

      const [metamaskWallet] = wallets;

      if (
          metamaskWallet.label === "MetaMask" &&
          metamaskWallet.accounts[0].address
      ) {
        dispatch(setWallet(metamaskWallet.accounts[0].address));
      } else {
        console.error("MetaMask wallet not found or no account connected.");
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  }, []);

  return (
    <header className="flex flex-wrap justify-between sm:justify-start z-50 w-full text-sm py-4 bg-gray-800">
      <nav className="max-w-[85rem] w-full mx-auto px-4 flex items-center justify-between sm:justify-between">
        <div className="flex items-center justify-between">
          <a
            className="flex-none text-xl font-semibold dark:text-white"
            href="."
          >
            Transactions List
          </a>
        </div>
        <div className="flex hs-collapse overflow-hidden transition-all duration-300">
          <div className="flex flex-col sm:flex-row gap-5 items-center justify-end w-full sm:w-auto">
            {walletAddress && (
              <>
                <SendTransaction />
                <p className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-gray-200 font-semibold text-gray-200 text-sm">
                  {walletAddress}
                </p>
              </>
            )}
            {!walletAddress && (
              <button
                type="button"
                onClick={handleConnect}
                className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-gray-200 font-semibold text-gray-200 hover:text-white hover:bg-gray-500 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 transition-all text-sm"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
