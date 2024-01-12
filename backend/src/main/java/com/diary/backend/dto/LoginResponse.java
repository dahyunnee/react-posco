package com.diary.backend.dto;

import com.diary.backend.Enums.UserStatus;
import com.diary.backend.entity.UserEntity;

public class LoginResponse {
    private final UserStatus status;
    private final UserEntity userEntity;

    public LoginResponse(UserStatus status, UserEntity userEntity) {
        this.status = status;
        this.userEntity = userEntity;
    }

    public UserStatus getStatus() {
        return status;
    }
    public UserEntity getUserEntity() {
        return userEntity;
    }
}
