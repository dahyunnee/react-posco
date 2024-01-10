package com.diary.backend.service;

import com.diary.backend.Enums.UserStatus;
import com.diary.backend.dto.LoginResponse;
import com.diary.backend.entity.UserEntity;
import com.diary.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServices {
    private final UserRepository userRepository;

    public UserServices(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public LoginResponse LoginVerify(String userId, String password){
        UserEntity userEntity = userRepository.findByIdentity(userId);
        LoginResponse loginResponse;
        if(userEntity == null){
            loginResponse = new LoginResponse(UserStatus.NOT_EXIST_IDENTITY, null);
        }
        else if(userEntity.getPassword().equals(password)) {
            loginResponse = new LoginResponse(UserStatus.SUCCESS, userEntity);
        }
        else{
            loginResponse = new LoginResponse(UserStatus.WRONG_PASSWORD, null);
        }
        return loginResponse;
    }

    public UserStatus RegisterNewUser(String nickName, String identity, String password) {
        if(userRepository.findByIdentity(identity) != null ){
            return UserStatus.ALREADY_EXIST_IDENTITY;
        }
        else if(userRepository.findByNickName(nickName) != null){
            return UserStatus.ALREADY_EXIST_NICKNAME;
        }
        else{
            UserEntity newUserEntity = new UserEntity();
            newUserEntity.registerNewUser(nickName, identity, password);
            userRepository.save(newUserEntity);
            return UserStatus.SUCCESS;
        }
    }
}
