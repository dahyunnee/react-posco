package com.diary.backend.service;

import com.diary.backend.Enums.DiaryStatus;
import com.diary.backend.common.CustomException;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

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

    public DiaryEntity registerDiary(NewDiaryDto newDiaryDto){
        DiaryEntity diaryEntity = new DiaryEntity();
        UserEntity userEntity = userRepository.findByUserId(newDiaryDto.userId);
        if(userEntity == null){
            return null;
        }
        if(newDiaryDto.date == null || newDiaryDto.date.isAfter(LocalDate.now())){
            return null;
        }
        Timestamp timestamp = Timestamp.valueOf(newDiaryDto.date.atStartOfDay());
        diaryEntity.setNewDiary(userEntity, timestamp, newDiaryDto.weather, newDiaryDto.content);
        diaryRepository.save(diaryEntity);
        return diaryEntity;
    }

    public DiaryStatus registerAnalysis(DiaryEntity newDiary) throws JsonProcessingException {
        if(newDiary == null){
            return DiaryStatus.INVALID_DIARY_CONTEXT;
        }
        String resAnalysis = "";
        try{
            resAnalysis = webClient.post()
                    .uri(uriBuilder -> uriBuilder
                            .scheme("http")
                            .host("127.0.0.1")
                            .port(5000)
                            .path("/chating")
                            .build())
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .body(BodyInserters.fromFormData("input_text", newDiary.getContent()))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
        } catch (WebClientResponseException e) {
            return DiaryStatus.API_PROCESSING_ERROR;
        }
        ObjectMapper objectMapper = new ObjectMapper();
        AIChatbotResDto aiChatbotResDto = objectMapper.readValue(resAnalysis, AIChatbotResDto.class);
        if(aiChatbotResDto == null){
            return DiaryStatus.API_RESPONSE_COVERT_ERROR;
        }
        AnalysisEntity analysisEntity = new AnalysisEntity();
        analysisEntity.setDiaryId(newDiary);
        analysisEntity.setResultComment(aiChatbotResDto.response);
        analysisRepository.save(analysisEntity);

        EmotionEntity emotionEntity = getEmotionSet(analysisEntity, newDiary);
        if(emotionEntity == null){
            return DiaryStatus.API_RESPONSE_COVERT_ERROR;
        }

        return DiaryStatus.SUCCESS;
    }

    public EmotionEntity getEmotionSet(AnalysisEntity analysis, DiaryEntity newDiary) throws JsonProcessingException{
        if(newDiary == null){
            return null;
        }
        String resEmotion = "";
        try{
            resEmotion = webClient.post()
                    .uri(uriBuilder -> uriBuilder
                            .scheme("http")
                            .host("127.0.0.1")
                            .port(5000)
                            .path("/diaryEmotion")
                            .build())
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .body(BodyInserters.fromFormData("input_text", newDiary.getContent()))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
        } catch (WebClientResponseException e) {
            return null;
        }
        ObjectMapper objectMapper = new ObjectMapper();
        AIEmotionResDto aiEmotionResDto = objectMapper.readValue(resEmotion, AIEmotionResDto.class);
        if(aiEmotionResDto == null){
            return null;
        }
        EmotionEntity emotionEntity = new EmotionEntity();
        emotionEntity.setAnalysisId(analysis);
        emotionEntity.setFear(aiEmotionResDto.emotion_counts.fear);
        emotionEntity.setSurprised(aiEmotionResDto.emotion_counts.surprised);
        emotionEntity.setAnger(aiEmotionResDto.emotion_counts.anger);
        emotionEntity.setSadness(aiEmotionResDto.emotion_counts.sadness);
        emotionEntity.setNeutrality(aiEmotionResDto.emotion_counts.neutrality);
        emotionEntity.setHappiness(aiEmotionResDto.emotion_counts.happiness);
        emotionEntity.setDisgust(aiEmotionResDto.emotion_counts.disgust);

        emotionRepository.save(emotionEntity);

        return emotionEntity;
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

    public ResponseEntity<?> getDiaryList(String userId, YearMonth searchMonth) {
        UserEntity userEntity = userRepository.findByUserId(userId);
        if(userEntity == null){
            return ResponseEntity.badRequest().body(DiaryStatus.INVALID_USER_ID);
        }
        DiaryListDto diaryListDto = new DiaryListDto();
        EmotionDto emotionDto = new EmotionDto();
        List<DiaryEntity> diaryEntityList = diaryRepository.findByAuthor(userRepository.findByUserId(userId));
        for(DiaryEntity diaryEntity : diaryEntityList){
            AnalysisEntity analysisEntity = analysisRepository.findByDiaryId(diaryEntity);
            EmotionEntity emotionEntity = emotionRepository.findByAnalysisId(analysisEntity);
            if(diaryEntity.getWriteDate().toLocalDateTime().getYear() != searchMonth.getYear() || diaryEntity.getWriteDate().toLocalDateTime().getMonth() != searchMonth.getMonth()){
                continue;
            }
            DiaryInfo diaryInfo = new DiaryInfo();
            diaryInfo.diaryId = diaryEntity.getDiaryId();
            diaryInfo.weather = diaryEntity.getWeather();
            diaryInfo.content = diaryEntity.getContent();
            diaryInfo.writeDate = diaryEntity.getWriteDate().toLocalDateTime().toLocalDate().toString();
            emotionDto.fear += emotionEntity.getFear();
            emotionDto.surprised += emotionEntity.getSurprised();
            emotionDto.anger += emotionEntity.getAnger();
            emotionDto.sadness += emotionEntity.getSadness();
            emotionDto.neutrality += emotionEntity.getNeutrality();
            emotionDto.happiness += emotionEntity.getHappiness();
            emotionDto.disgust += emotionEntity.getDisgust();
            diaryListDto.diaryList.add(diaryInfo);
        }
        diaryListDto.emotion = emotionDto;
        return ResponseEntity.ok().body(diaryListDto);
    }

    public List<CalendarInfo> getDiaryCalendarList(String userId, YearMonth searchMonth) {
        UserEntity userEntity = userRepository.findByUserId(userId);
        if(userEntity == null){
            throw new CustomException(HttpStatus.BAD_REQUEST, "유효한 사용자가 아닙니다.");
        }
        List<CalendarInfo> calendarList = new ArrayList<>();
        List<DiaryEntity> diaryEntityList = diaryRepository.findByAuthor(userRepository.findByUserId(userId));
        diaryEntityList.sort(new Comparator<DiaryEntity>() {
            @Override
            public int compare(DiaryEntity o1, DiaryEntity o2) {
                return o1.getWriteDate().compareTo(o2.getWriteDate());
            }
        });
        for(DiaryEntity diaryEntity : diaryEntityList){
            AnalysisEntity analysisEntity = analysisRepository.findByDiaryId(diaryEntity);
            EmotionEntity emotionEntity = emotionRepository.findByAnalysisId(analysisEntity);
            if(diaryEntity.getWriteDate().toLocalDateTime().getYear() != searchMonth.getYear() || diaryEntity.getWriteDate().toLocalDateTime().getMonth() != searchMonth.getMonth()){
                continue;
            }
            CalendarInfo samedayInfo = calendarList.stream()
                    .filter(calendarInfo -> calendarInfo.writeDate.equals(diaryEntity.getWriteDate().toLocalDateTime().toLocalDate().toString()))
                    .findFirst()
                    .orElse(null);
            if(samedayInfo != null){
                samedayInfo.fear += emotionEntity.getFear();
                samedayInfo.surprised += emotionEntity.getSurprised();
                samedayInfo.anger += emotionEntity.getAnger();
                samedayInfo.sadness += emotionEntity.getSadness();
                samedayInfo.neutrality += emotionEntity.getNeutrality();
                samedayInfo.happiness += emotionEntity.getHappiness();
                samedayInfo.disgust += emotionEntity.getDisgust();
                continue;
            }
            CalendarInfo calendarInfo = new CalendarInfo();
            calendarInfo.writeDate = diaryEntity.getWriteDate().toLocalDateTime().toLocalDate().toString();
            calendarInfo.fear += emotionEntity.getFear();
            calendarInfo.surprised += emotionEntity.getSurprised();
            calendarInfo.anger += emotionEntity.getAnger();
            calendarInfo.sadness += emotionEntity.getSadness();
            calendarInfo.neutrality += emotionEntity.getNeutrality();
            calendarInfo.happiness += emotionEntity.getHappiness();
            calendarInfo.disgust += emotionEntity.getDisgust();

            calendarList.add(calendarInfo);
        }
        return calendarList;
    }

    public ResponseEntity<?> getDiaryAnalysis(String userId, long diaryId) {
        UserEntity userEntity = userRepository.findByUserId(userId);
        if(userEntity == null){
            return ResponseEntity.badRequest().body(DiaryStatus.INVALID_USER_ID.toString());
        }
        DiaryEntity diaryEntity = diaryRepository.findByDiaryId(diaryId);
        if(diaryEntity == null){
            return ResponseEntity.badRequest().body(DiaryStatus.INVALID_DIARY_ID.toString());
        }
        AnalysisEntity analysisEntity = analysisRepository.findByDiaryId(diaryEntity);
        if(analysisEntity == null){
            return ResponseEntity.badRequest().body(DiaryStatus.INVALID_ANALYSIS_ID.toString());
        }
        EmotionEntity emotionEntity = emotionRepository.findByAnalysisId(analysisEntity);
        if(emotionEntity == null){
            return ResponseEntity.badRequest().body(DiaryStatus.INVALID_EMOTION_ID.toString());
        }
        DiaryAnalysisDto diaryAnalysisDto = new DiaryAnalysisDto();
        diaryAnalysisDto.diaryId = diaryEntity.getDiaryId();
        diaryAnalysisDto.writeDate = diaryEntity.getWriteDate().toLocalDateTime().toLocalDate().toString();
        diaryAnalysisDto.weather = diaryEntity.getWeather();
        diaryAnalysisDto.content = diaryEntity.getContent();
        diaryAnalysisDto.analysisId = analysisEntity.getAnalysisId();
        diaryAnalysisDto.resultComment = analysisEntity.getResultComment();
        diaryAnalysisDto.emotionId = emotionEntity.getEmotionId();
        diaryAnalysisDto.fear = emotionEntity.getFear();
        diaryAnalysisDto.surprised = emotionEntity.getSurprised();
        diaryAnalysisDto.anger = emotionEntity.getAnger();
        diaryAnalysisDto.sadness = emotionEntity.getSadness();
        diaryAnalysisDto.neutrality = emotionEntity.getNeutrality();
        diaryAnalysisDto.happiness = emotionEntity.getHappiness();
        diaryAnalysisDto.disgust = emotionEntity.getDisgust();

        return ResponseEntity.ok().body(diaryAnalysisDto);
    }
}
