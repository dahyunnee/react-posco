package com.diary.backend.repository;

import com.diary.backend.entity.ChattingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChattingRepository extends JpaRepository<ChattingEntity, Long> {
}