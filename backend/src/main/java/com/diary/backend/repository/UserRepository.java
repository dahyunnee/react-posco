package com.diary.backend.repository;

import com.diary.backend.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUserId(String userId);

    UserEntity findByNickName(String nickName);

    boolean existsByNickName(String nickName);

    boolean existsByEmail(String email);

    boolean existsByUserId(String userId);
}
