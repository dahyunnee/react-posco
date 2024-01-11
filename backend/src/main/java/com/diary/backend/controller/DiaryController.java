package com.diary.backend.controller;

import com.diary.backend.Enums.DiaryStatus;
import com.diary.backend.dto.NewDiaryDto;
import com.diary.backend.dto.WeatherResponse;
import com.diary.backend.entity.DiaryEntity;
import com.diary.backend.repository.UserRepository;
import com.diary.backend.service.DiaryServices;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.YearMonth;

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
        DiaryEntity newDiary = diaryServices.registerDiary(newDiaryDto);
        if(newDiary == null){
            return ResponseEntity.badRequest().body(DiaryStatus.DIARY_REGISTER_ERROR.toString());
        }

        try {
            DiaryStatus status = diaryServices.registerAnalysis(newDiary);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok().body(Long.toString(newDiary.getDiaryId()));
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
    public ResponseEntity<?> handleDiaryList(@RequestParam String userId, @RequestParam @DateTimeFormat(pattern = "yyyy-MM") YearMonth searchMonth, HttpSession session){
        return diaryServices.getDiaryList(userId, searchMonth);
    }

    @GetMapping("/diary/analysis")
    public ResponseEntity<?> handleDiaryAnalysis(@RequestParam String userId, @RequestParam long diaryId, HttpSession session){
        return diaryServices.getDiaryAnalysis(userId, diaryId);
    }
}
