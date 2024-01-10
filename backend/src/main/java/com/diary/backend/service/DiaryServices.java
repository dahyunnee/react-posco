package com.diary.backend.service;

import com.diary.backend.Enums.DiaryStatus;
import com.diary.backend.dto.*;
import com.diary.backend.entity.AnalysisEntity;
import com.diary.backend.entity.DiaryEntity;
import com.diary.backend.entity.EmotionEntity;
import com.diary.backend.entity.UserEntity;
import com.diary.backend.repository.AnalysisRepository;
import com.diary.backend.repository.DiaryRepository;
import com.diary.backend.repository.EmotionRepository;
import com.diary.backend.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

@Service
public class DiaryServices {
    @Value("${apiKey.openWeatherMap}")
    private String openWeatherMapApiKey;
    private final UserRepository userRepository;
    private final DiaryRepository diaryRepository;
    private final AnalysisRepository analysisRepository;
    private final EmotionRepository emotionRepository;
    private WebClient webClient;

    @Autowired
    public DiaryServices(UserRepository userRepository, DiaryRepository diaryRepository, AnalysisRepository analysisRepository, EmotionRepository emotionRepository, WebClient.Builder webClientBuilder) {
        this.userRepository = userRepository;
        this.diaryRepository = diaryRepository;
        this.analysisRepository = analysisRepository;
        this.emotionRepository = emotionRepository;
        this.webClient = webClientBuilder.build();
    }

    public DiaryStatus registerDiary(NewDiaryDto newDiaryDto){
        DiaryEntity diaryEntity = new DiaryEntity();
        UserEntity userEntity = userRepository.findByIdentity(newDiaryDto.userIdentity);
        if(userEntity == null){
            return DiaryStatus.INVALID_USER_ID;
        }
        if(newDiaryDto.date == null || newDiaryDto.date.isAfter(LocalDate.now())){
            return DiaryStatus.INVALID_DIARY_DATE;
        }
        Timestamp timestamp = Timestamp.valueOf(newDiaryDto.date.atStartOfDay());
        diaryEntity.setNewDiary(userEntity, timestamp, newDiaryDto.weather, newDiaryDto.content);
        diaryRepository.save(diaryEntity);
        return DiaryStatus.SUCESS;
    }

    public ResponseEntity<?> getWeather(float latitude, float longitude) throws JsonProcessingException {
        if(latitude <= 0 || longitude <= 0){
            return ResponseEntity.badRequest().body(DiaryStatus.INVALID_LATITUDE_OR_LONGITUDE);
        }
        String res = "";
        try {
            res = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .scheme("https")
                        .host("api.openweathermap.org")
                        .path("/data/2.5/weather")
                        .queryParam("lat", latitude)
                        .queryParam("lon", longitude)
                        .queryParam("appid", openWeatherMapApiKey)
                        .queryParam("lang", "kr")
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
        } catch (WebClientResponseException e) {
            return ResponseEntity.badRequest().body(DiaryStatus.API_PROCESSING_ERROR.toString());
        }
        ObjectMapper objectMapper = new ObjectMapper();
        WeatherAPIDto weatherAPIDto = objectMapper.readValue(res, WeatherAPIDto.class);
        if(weatherAPIDto == null){
            return ResponseEntity.badRequest().body(DiaryStatus.API_RESPONSE_COVERT_ERROR.toString());
        }else{
            return ResponseEntity.ok().body(weatherAPIDto.returnWeather());
        }
    }

    public ResponseEntity<?> getDiaryList(String userId, LocalDate yyyymm) {
        UserEntity userEntity = userRepository.findByIdentity(userId);
        if(userEntity == null){
            return ResponseEntity.badRequest().body(DiaryStatus.INVALID_USER_ID);
        }
        DiaryListDto diaryListDto = new DiaryListDto();
        List<DiaryEntity> diaryEntityList = diaryRepository.findByAuthor(userRepository.findByIdentity(userId));
        for(DiaryEntity diaryEntity : diaryEntityList){
            AnalysisEntity analysisEntity = analysisRepository.findByDiaryId(diaryEntity);
            EmotionEntity emotionEntity = emotionRepository.findByAnalysisId(analysisEntity);

            DiaryInfo diaryInfo = new DiaryInfo();
            diaryInfo.diaryInfo = diaryEntity;
            diaryInfo.emotionInfo = emotionEntity;
            diaryListDto.diaryList.add(diaryInfo);
        }
        return ResponseEntity.ok().body(diaryListDto);
    }
}
