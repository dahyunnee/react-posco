import { createAsyncThunk } from "@reduxjs/toolkit";
import { SigninType } from "../../../../types/user/signinType";
import { SignupType } from "../../../../types/user/signupType";
import { UpdateUserType } from "../../../../types/user/updateUserType";
import { axiosInitializer } from "../../util/https";

// 회원가입
export const signupAction: any = createAsyncThunk(
  "SIGNUP",
  async (userData: SignupType, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      console.log("userId",userData.userId);
      await axios.post("/users/register", userData);
      alert("회원가입 완료");
    } catch (e: any) {
      alert(e.response.data.message);
      return rejectWithValue(e);
    }
  }
);

// 아이디 중복 체크
export const checkIdAction: any = createAsyncThunk(
  "CHECK_ID",
  async (id: string, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      const { data } = await axios.get(`/users/id/${id}`);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// 닉네임 중복 체크
export const checkNickNameAction: any = createAsyncThunk(
  "CHECK_NICKNAME",
  async (nickName: string, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      const { data } = await axios.get(`/users/nickName/${nickName}`);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// 이메일 중복 체크
export const checkEmailAction: any = createAsyncThunk(
  "CHECK_EMAIL",
  async (email: string, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      const { data } = await axios.get(`/users/email/${email}`);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// 로그인
export const signinAction: any = createAsyncThunk(
  "SIGNIN",
  async (userData: SigninType, { dispatch, rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      await axios
        .post("/users/login", userData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
    } catch (e: any) {
      alert(e.response.data.message);
      return rejectWithValue(e);
    }
  }
);

// 로그인 정보 가져와서 state에 저장
export const setUserWithTokenAction: any = createAsyncThunk(
  "GET_ME",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      const { data } = await axios.get("/users", {
        headers: {
          "Content-Type": "application/json"
        },
      });
      // console.log(getToken());
      return data;
    } catch (e) {
      // 토큰 refresh
      // dispatch(refreshTokenAction());
      return rejectWithValue(e);
    }
  }
);


// 로그아웃
export const logoutAction: any = createAsyncThunk(
  "LOGOUT",
  async (_, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      await axios
        .delete("/logout", {
          headers: {
            "Content-Type": "application/json"
          },
        });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);



// 회원 탈퇴
export const deleteUserAction: any = createAsyncThunk(
  "DELETE_USER",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      await axios
        .delete(`/users`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          dispatch(logoutAction());
          // removeToken();
        });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);