import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInitializer } from "../../util/https";
import { GetResultType } from "../../../../types/calendar/getResultType";

// 캘린더 데이터 가져오기
export const getCalendarAction: any = createAsyncThunk(
    "GET_CALENDAR",
    async (searchData: GetResultType, { rejectWithValue }) => {
      try {
        const axios = axiosInitializer();
        const { data } = await axios.get(`/diary/list?userId=${searchData.userId}&searchMonth=${searchData.searchMonth}`);
        return data;
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  );