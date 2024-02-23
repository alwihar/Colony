import {WalletState} from "@web3-onboard/core";

import {Actions} from "../types";

export const openModal = () => ({
    type: Actions.OpenModal,
});

export const closeModal = () => ({
    type: Actions.CloseModal,
});

export const setTransactionDetails = (txDetails: { to: string; value: number }) => ({
    type: Actions.SetTransactionDetails,
    payload: txDetails,
});

export const setWallet = (payload: string) => ({
    type: Actions.SetWallet,
    payload
});