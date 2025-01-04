import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: null,
  transactionDetails: null,
  refetchValue: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    updateTransactionDetails: (state, action) => {
      state.transactionDetails = action.payload;
    },
    updateRefetchValue: (state, action) => {
      state.refetchValue = action.payload + 1;
    },
  },
});

export default userSlice.reducer;
export const {
  updateUserDetails,
  updateTransactionDetails,
  updateRefetchValue,
} = userSlice.actions;
