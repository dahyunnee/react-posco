import { createSlice } from "@reduxjs/toolkit";
import { ResultStateType } from "../../../../types/result/resultStateType";
const initialState: ResultStateType = {
    
};

const resultSlice = createSlice({
    name: "result",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    //   builder
    //     .addCase(signupAction.pending, (state) => {
    //       state.signup.loading = true;
    //       state.signup.data = null;
    //       state.signup.error = null;
    //     })
    //     .addCase(signupAction.fulfilled, (state, { payload }) => {
    //       state.signup.loading = false;
    //       state.signup.data = payload;
    //       state.signup.error = null;
    //     })
    //     .addCase(signupAction.rejected, (state, { payload }) => {
    //       state.signup.loading = false;
    //       state.signup.data = null;
    //       state.signup.error = payload;
    //     })
    //     ;
    },
  });
  
  export default resultSlice.reducer;