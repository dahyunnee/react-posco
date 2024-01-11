package com.diary.backend.dto;

import com.diary.backend.entity.AnalysisEntity;
import com.diary.backend.entity.DiaryEntity;
import com.diary.backend.entity.EmotionEntity;

public class DiaryAnalysisDto {

    public long diaryId;
    public String writeDate;
    public String weather;
    public String content;

    public long analysisId;
    public String resultComment;

    public long emotionId;
    public long fear;
    public long surprised;
    public long anger;
    public long sadness;
    public long neutrality;
    public long happiness;
    public long disgust;
}
