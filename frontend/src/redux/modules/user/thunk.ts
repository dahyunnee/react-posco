import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignupType } from "../../../../types/user/signupType";
import { axiosInitializer } from "../../util/https";

// 회원가입
export const signupAction: any = createAsyncThunk(
  "SIGNUP",
  async (userData: SignupType, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      await axios.post("/api/users", userData);
      alert("회원가입 완료");
    } catch (e: any) {
      alert(e.response.data.message);
      return rejectWithValue(e);
    }
  }
);
