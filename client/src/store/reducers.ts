// Define the state type
export interface RootState {
  transactions: any[];
}

// Initial state
const initialState: RootState = {
  transactions: [],
};

const reducer = (state = initialState, action: any): RootState => {
  switch (action.type) {
    // Define your actions
    default:
      return state;
  }
};

export default reducer;
