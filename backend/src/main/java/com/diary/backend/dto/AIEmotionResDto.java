package com.diary.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AIEmotionResDto {
    public EmotionCounts emotion_counts;

    public static class EmotionCounts {
        public int fear = 0;
        public int surprised = 0;
        public int anger = 0;
        public int sadness = 0;
        public int neutrality = 0;
        public int happiness = 0;
        public int disgust = 0;
    }
}
