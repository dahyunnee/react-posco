package com.diary.backend.Enums;

import com.fasterxml.jackson.annotation.JacksonInject;

public enum DiaryStatus {
    SUCCESS,
    INVALID_DIARY_DATE,
    INVALID_USER_ID,
    INVALID_LATITUDE_OR_LONGITUDE,
    API_PROCESSING_ERROR,
    INVALID_DIARY_CONTEXT,
    API_RESPONSE_COVERT_ERROR,
    DIARY_REGISTER_ERROR, INVALID_DIARY_ID, INVALID_ANALYSIS_ID, INVALID_EMOTION_ID,
    ;

}
