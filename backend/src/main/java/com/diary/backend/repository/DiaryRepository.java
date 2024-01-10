package com.diary.backend.repository;

import com.diary.backend.entity.DiaryEntity;
import com.diary.backend.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiaryRepository extends JpaRepository<DiaryEntity, Long> {
    List<DiaryEntity> findByAuthor(UserEntity userEntity);
}
