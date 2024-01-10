package com.diary.backend.controller;

import com.diary.backend.Enums.DiaryStatus;
import com.diary.backend.dto.NewDiaryDto;
import com.diary.backend.dto.WeatherResponse;
import com.diary.backend.repository.UserRepository;
import com.diary.backend.service.DiaryServices;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
public class DiaryController {

    private final UserRepository userRepository;
    private final DiaryServices diaryServices;

    @Autowired
    public DiaryController(UserRepository userRepository, DiaryServices diaryServices) {
        this.userRepository = userRepository;
        this.diaryServices = diaryServices;
    }

    @PostMapping("/diary/register")
    public ResponseEntity<String> handleDiaryRegister(@RequestBody NewDiaryDto newDiaryDto, HttpSession session){
        DiaryStatus status = diaryServices.registerDiary(newDiaryDto);
        if(status == DiaryStatus.SUCESS){
            return ResponseEntity.ok("success");
        }
        else{
            return ResponseEntity.badRequest().body(status.toString());
        }
    }

    @GetMapping("/diary/weather")
    public ResponseEntity<?> handleDiaryWeather(@RequestParam("lat") float latitude, @RequestParam("lon") float longitude, HttpSession session) {
        ResponseEntity<?> res = null;
        try {
            res = diaryServices.getWeather(latitude, longitude);
        } catch (Exception e) {
            e.printStackTrace();
        }
        assert res != null;
        return res;
    }

    @GetMapping("/diary/list")
    public ResponseEntity<?> handleDiaryList(@RequestParam String userId, @RequestParam LocalDate yyyymm, HttpSession session){
        return diaryServices.getDiaryList(userId, yyyymm);
    }
}
