import { createSlice } from "@reduxjs/toolkit";
import { CalendarStateType } from "../../../../types/calendar/calendarStateType";
const initialState: CalendarStateType = {

};

const calendarSlice = createSlice({
    name: "calendar",
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
  
  export default calendarSlice.reducer;