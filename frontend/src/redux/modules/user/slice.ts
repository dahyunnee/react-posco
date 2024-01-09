import { createSlice } from "@reduxjs/toolkit";
import { UserStateType } from "../../../../types/user/userStateType";
import {
  signupAction,
} from "./thunk";

const initialState: UserStateType = {
  userData: {
    id: "",
    name: "",
    nickName: "",
    email: "",
    isLoggedIn: false,
  },
  signup: { loading: false, data: null, error: null },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupAction.pending, (state) => {
        state.signup.loading = true;
        state.signup.data = null;
        state.signup.error = null;
      })
      .addCase(signupAction.fulfilled, (state, { payload }) => {
        state.signup.loading = false;
        state.signup.data = payload;
        state.signup.error = null;
      })
      .addCase(signupAction.rejected, (state, { payload }) => {
        state.signup.loading = false;
        state.signup.data = null;
        state.signup.error = payload;
      })
  },
});

export default userSlice.reducer;