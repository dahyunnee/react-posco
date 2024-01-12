package com.diary.backend.repository;

import com.diary.backend.entity.AnalysisEntity;
import com.diary.backend.entity.EmotionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmotionRepository extends JpaRepository<EmotionEntity, Long> {
    EmotionEntity findByAnalysisId(AnalysisEntity analysisId);
}