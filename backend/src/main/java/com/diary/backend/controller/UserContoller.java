package com.diary.backend.controller;

import com.diary.backend.Enums.UserStatus;
import com.diary.backend.common.Message;
import com.diary.backend.dto.LoginDto;
import com.diary.backend.dto.LoginResponse;
import com.diary.backend.dto.UserRegisterDto;
import com.diary.backend.entity.UserEntity;
import com.diary.backend.service.UserServices;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@RestController
@RequestMapping("/users")
public class UserContoller {
    private final UserServices userServices;

    public UserContoller(UserServices userServices) {
        this.userServices = userServices;
    }

    @PostMapping("/register")
    public ResponseEntity insertUser(@RequestBody UserRegisterDto signUpDTO){
        System.out.println("userId"+signUpDTO.getUserId());
        UserEntity result = userServices.createUser(signUpDTO);
        if(result==null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Message("회원가입에 실패하였습니다."));
        }
        return ResponseEntity.ok(new Message("회원가입 성공"));
    }

    @GetMapping("/id/{id}")
    public ResponseEntity checkDuplicatedId(@PathVariable String id){
        System.out.println("아이디 확인");
        if(userServices.isExistByUserId(id)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Message("이미 존재하는 아이디입니다."));
        }
        return ResponseEntity.ok(new Message("사용 가능한 아이디 입니다."));
    }

    @GetMapping("/nickName/{nickName}")
    public ResponseEntity checkDuplicatedNickName(@PathVariable String nickName){
        if(userServices.isExistByNickName(nickName)){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Message("이미 존재하는 닉네임입니다."));
        }
        return ResponseEntity.ok(new Message("사용 가능한 닉네임 입니다."));
    }


    @PostMapping("/login")
    public ResponseEntity loginUser(@RequestBody LoginDto loginDto){
        if(!userServices.isExistByUserId(loginDto.getUserId())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Message("존재하지 않는 사용자 입니다"));
        }
        UserRegisterDto result = userServices.loginUser(loginDto);
        if(result==null) {
            return ResponseEntity.ok(new Message("로그인 실패"));
        }
        return ResponseEntity.ok(result);
    }

//    @PostMapping("/login")
//    public UserEntity handleLogin(@RequestParam String userId, @RequestParam String password, HttpSession session, RedirectAttributes redirectAttributes){
//        LoginResponse loginResponse = userServices.LoginVerify(userId, password);
//        if(loginResponse.getStatus() == UserStatus.NOT_EXIST_IDENTITY){
//            return null;
//        }
//        else if(loginResponse.getStatus() == UserStatus.WRONG_PASSWORD){
//            return null;
//        }
//        else{
//            return loginResponse.getUserEntity();
//        }
//    }
//
//    @PostMapping("/register")
//    public ResponseEntity<String> handleRegister(@RequestBody UserRegisterDto newUser, HttpSession session, RedirectAttributes redirectAttributes){
//
//        UserStatus status = userServices.RegisterNewUser(newUser.nickName, newUser.userId, newUser.password, newUser.name, newUser.email);
//        if(status == UserStatus.SUCCESS){
//            return ResponseEntity.ok(UserStatus.SUCCESS.toString());
//        }
//        else if(status == UserStatus.ALREADY_EXIST_IDENTITY){
//            return ResponseEntity.ok(UserStatus.ALREADY_EXIST_IDENTITY.toString());
//        }
//        else{
//            return ResponseEntity.ok(UserStatus.ALREADY_EXIST_NICKNAME.toString());
//        }
//    }
}
