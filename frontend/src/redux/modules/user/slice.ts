import { createSlice } from "@reduxjs/toolkit";
import { UserStateType } from "../../../../types/user/userStateType";
import {
  signupAction,
  checkIdAction,
  checkNickNameAction,
  checkEmailAction,
  signinAction,
  logoutAction,
} from "./thunk";

const initialState: UserStateType = {
  userData: {
    id: "",
    name: "",
    nickName: "",
    email: "",
    isLoggedIn: false,
  },
  signin: { loading: false, data: null, error: null },
  signup: { loading: false, data: null, error: null },
  checkId: { loading: false, data: null, error: null },
  checkNickName: { loading: false, data: null, error: null },
  checkEmail: { loading: false, data: null, error: null },
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
      .addCase(checkIdAction.pending, (state) => {
        state.checkId.loading = true;
        state.checkId.data = null;
        state.checkId.error = null;
      })
      .addCase(checkIdAction.fulfilled, (state, { payload }) => {
        state.checkId.loading = false;
        state.checkId.data = payload;
        state.checkId.error = null;
      })
      .addCase(checkIdAction.rejected, (state, { payload }) => {
        state.checkId.loading = false;
        state.checkId.data = null;
        state.checkId.error = payload;
      })
      .addCase(checkNickNameAction.pending, (state) => {
        state.checkNickName.loading = true;
        state.checkNickName.data = null;
        state.checkNickName.error = null;
      })
      .addCase(checkNickNameAction.fulfilled, (state, { payload }) => {
        state.checkNickName.loading = false;
        state.checkNickName.data = payload;
        state.checkNickName.error = null;
      })
      .addCase(checkNickNameAction.rejected, (state, { payload }) => {
        state.checkNickName.loading = false;
        state.checkNickName.data = null;
        state.checkNickName.error = payload;
      })
      .addCase(checkEmailAction.pending, (state) => {
        state.checkEmail.loading = true;
        state.checkEmail.data = null;
        state.checkEmail.error = null;
      })
      .addCase(checkEmailAction.fulfilled, (state, { payload }) => {
        state.checkEmail.loading = false;
        state.checkEmail.data = payload;
        state.checkEmail.error = null;
      })
      .addCase(checkEmailAction.rejected, (state, { payload }) => {
        state.checkEmail.loading = false;
        state.checkEmail.data = null;
        state.checkEmail.error = payload;
      })
      .addCase(signinAction.pending, (state) => {
        state.signin.loading = true;
        state.signin.data = null;
        state.signin.error = null;
      })
      .addCase(signinAction.fulfilled, (state, { payload }) => {
        state.signin.loading = false;
        state.signin.data = payload;
        state.signin.error = null;
        state.userData.isLoggedIn = true;
        state.userData.id = payload.userId;
        state.userData.email = payload.email;
        state.userData.name = payload.name;
        state.userData.nickName = payload.nickName;
      })
      .addCase(signinAction.rejected, (state, { payload }) => {
        state.signin.loading = false;
        state.signin.data = null;
        state.signin.error = payload;
      })
      .addCase(logoutAction.fulfilled, (state, { payload }) => {
        state.userData.id = "";
        state.userData.nickName = "";
        state.userData.email = "";
        state.userData.name = "";
        state.userData.isLoggedIn = false;
      });
  },
});

export default userSlice.reducer;
