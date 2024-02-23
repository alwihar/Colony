import {Actions} from "../types";

// added actions for global states
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