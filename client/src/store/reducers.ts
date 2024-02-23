import { Actions } from "../types";

// Define the state type
export interface RootState {
  transactions: any[];
  isModalOpen: boolean;
  walletAddress: string;
  txDetails: {
    to: string;
    value: number;
  };
}

// Initial state
const initialState: RootState = {
  transactions: [],
  isModalOpen: false,
  walletAddress: '',
  txDetails: { to: '', value: 0 }
};

// note: In a bigger project I would keep separate reducers, but as no need here to separate, I keep everything in one.
const reducer = (state = initialState, action: any): RootState => {
  switch (action.type) {
    case Actions.OpenModal:
      return { ...state, isModalOpen: true };
    case Actions.CloseModal:
      return { ...state, isModalOpen: false };
    case Actions.SetWallet:
      return {
        ...state,
        walletAddress: action.payload,
      };
    case Actions.SetTransactionDetails:
      return { ...state, txDetails: action.payload };

    default:
      return state;
  }
};

export default reducer;
