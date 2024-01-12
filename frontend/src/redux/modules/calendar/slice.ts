import { createSlice } from "@reduxjs/toolkit";
import {getCalendarAction} from "./thunk";
import { CalendarStateType } from "../../../../types/calendar/calendarStateType";
const initialState: CalendarStateType = {
    getCalendar: {loading: false, data:null, error:null},
};

const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    //   builder
    //     .addCase(getCalendarAction.pending, (state) => {
    //       state.getCalendar.loading = true;
    //       state.getCalendar.data = null;
    //       state.getCalendar.error = null;
    //     })
    //     .addCase(getCalendarAction.fulfilled, (state, { payload }) => {
    //       state.getCalendar.loading = false;
    //       state.getCalendar.data = payload;
    //       state.getCalendar.error = null;
    //     })
    //     .addCase(getCalendarAction.rejected, (state, { payload }) => {
    //       state.getCalendar.loading = false;
    //       state.getCalendar.data = null;
    //       state.getCalendar.error = payload;
    //     })
    //     ;
    },
  });
  
  export default calendarSlice.reducer;