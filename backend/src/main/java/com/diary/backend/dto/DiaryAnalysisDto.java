package com.diary.backend.dto;

import com.diary.backend.entity.AnalysisEntity;
import com.diary.backend.entity.DiaryEntity;
import com.diary.backend.entity.EmotionEntity;

public class DiaryAnalysisDto {
    public DiaryEntity diaryInfo;
    public AnalysisEntity  analysisInfo;
    public EmotionEntity emotionInfo;
}
