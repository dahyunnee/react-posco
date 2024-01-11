package com.diary.backend.repository;

import com.diary.backend.entity.ChattingEntity;
import com.diary.backend.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChattingRepository extends JpaRepository<ChattingEntity, Long> {
    List<ChattingEntity> findAllByUserId(UserEntity user);
}