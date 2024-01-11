import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInitializer } from "../../util/https";

// export const signupAction: any = createAsyncThunk(
//     "SIGNUP",
//     async (userData: SignupType, { rejectWithValue }) => {
//       try {
//         const axios = axiosInitializer();
//         await axios.post("/users/register", userData);
//         alert("회원가입 완료");
//       } catch (e: any) {
//         alert(e.response.data.message);
//         return rejectWithValue(e);
//       }
//     }
//   );