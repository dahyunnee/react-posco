package com.diary.backend.service;

import com.diary.backend.Enums.UserStatus;
import com.diary.backend.dto.LoginResponse;
import com.diary.backend.dto.UserRegisterDto;
import com.diary.backend.entity.UserEntity;
import com.diary.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class UserServices {
    private final UserRepository userRepository;

    public UserServices(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean isExistByUserId(String userId){
        return userRepository.existsByUserId(userId);
    }

    public boolean isExistByNickName(String nickName) {
        return userRepository.existsByNickName(nickName);
    }

    public boolean isExistByEmail(String email) {
        return userRepository.existsByEmail(email);
    }


    public UserEntity createUser(UserRegisterDto signUpDTO) {

        UserEntity userEntity = UserEntity.builder()
                .userId(signUpDTO.getUserId())
                .name(signUpDTO.getName())
                .password(signUpDTO.getPassword())
                .email(signUpDTO.getEmail())
                .nickName(signUpDTO.getNickName())
                .build();

        return userRepository.save(userEntity);
    }


    public LoginResponse LoginVerify(String userId, String password){
        UserEntity userEntity = userRepository.findByUserId(userId);
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

    public UserStatus RegisterNewUser(String nickName, String identity, String password, String name, String email) {
        if(userRepository.findByUserId(identity) != null ){
            return UserStatus.ALREADY_EXIST_IDENTITY;
        }
        else if(userRepository.findByNickName(nickName) != null){
            return UserStatus.ALREADY_EXIST_NICKNAME;
        }
        else{
            UserEntity newUserEntity = new UserEntity();
            newUserEntity.registerNewUser(nickName, identity, password, name, email);
            userRepository.save(newUserEntity);
            return UserStatus.SUCCESS;
        }
    }
}
