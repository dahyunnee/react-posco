package com.diary.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class UserRegisterDto {
    public String nickName;
    public String userId;
    public String password;
    public String name;
    public String email;
}
