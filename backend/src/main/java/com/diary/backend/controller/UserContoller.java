package com.diary.backend.controller;

import com.diary.backend.Enums.UserStatus;
import com.diary.backend.dto.LoginResponse;
import com.diary.backend.dto.UserRegisterDto;
import com.diary.backend.entity.UserEntity;
import com.diary.backend.service.UserServices;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@RestController
public class UserContoller {
    private final UserServices userServices;

    public UserContoller(UserServices userServices) {
        this.userServices = userServices;
    }

    @PostMapping("/login")
    public UserEntity handleLogin(@RequestParam String userId, @RequestParam String password, HttpSession session, RedirectAttributes redirectAttributes){
        LoginResponse loginResponse = userServices.LoginVerify(userId, password);
        if(loginResponse.getStatus() == UserStatus.NOT_EXIST_IDENTITY){
            return null;
        }
        else if(loginResponse.getStatus() == UserStatus.WRONG_PASSWORD){
            return null;
        }
        else{
            return loginResponse.getUserEntity();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> handleRegister(@RequestBody UserRegisterDto newUser, HttpSession session, RedirectAttributes redirectAttributes){

        UserStatus status = userServices.RegisterNewUser(newUser.nickName, newUser.identity, newUser.password);
        if(status == UserStatus.SUCCESS){
            return ResponseEntity.ok(UserStatus.SUCCESS.toString());
        }
        else if(status == UserStatus.ALREADY_EXIST_IDENTITY){
            return ResponseEntity.ok(UserStatus.ALREADY_EXIST_IDENTITY.toString());
        }
        else{
            return ResponseEntity.ok(UserStatus.ALREADY_EXIST_NICKNAME.toString());
        }
    }
}
