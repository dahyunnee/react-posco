package com.diary.backend.repository;

import com.diary.backend.entity.AnalysisEntity;
import com.diary.backend.entity.DiaryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnalysisRepository extends JpaRepository<AnalysisEntity, Long> {
    AnalysisEntity findByDiaryId(DiaryEntity diaryEntity);
}