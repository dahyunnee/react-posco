package com.diary.backend.service;

import com.diary.backend.Enums.DiaryStatus;
import com.diary.backend.dto.AIChatbotReqDto;
import com.diary.backend.dto.AIChatbotResDto;
import com.diary.backend.entity.ChattingEntity;
import com.diary.backend.entity.UserEntity;
import com.diary.backend.repository.ChattingRepository;
import com.diary.backend.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@Service
public class ChattingServices {
    private final ChattingRepository chattingRepository;
    private final UserRepository userRepository;

    private final WebClient webClient;

    public ChattingServices(ChattingRepository chattingRepository, UserRepository userRepository, WebClient.Builder webClientBuilder) {
        this.chattingRepository = chattingRepository;
        this.userRepository = userRepository;
        this.webClient = webClientBuilder.build();
    }

    public ResponseEntity<?> handleChatting(AIChatbotReqDto msg) throws JsonProcessingException {
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
                    .body(BodyInserters.fromFormData("input_text", msg.message))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
        } catch (WebClientResponseException e) {
            return ResponseEntity.internalServerError().body(DiaryStatus.API_PROCESSING_ERROR.toString());
        }
        ObjectMapper objectMapper = new ObjectMapper();
        AIChatbotResDto aiChatbotResDto = objectMapper.readValue(resAnalysis, AIChatbotResDto.class);
        if(aiChatbotResDto == null){
            return ResponseEntity.internalServerError().body(DiaryStatus.API_RESPONSE_COVERT_ERROR.toString());
        }
        UserEntity user =  userRepository.findByUserId(msg.userId);
        if(user == null){
            return ResponseEntity.internalServerError().body(DiaryStatus.INVALID_USER_ID.toString());
        }
        ChattingEntity chattingEntity = new ChattingEntity();
        chattingEntity.setUserId(user);
        chattingEntity.setQuestion(msg.message);
        chattingEntity.setAnswer(aiChatbotResDto.response);
        chattingRepository.save(chattingEntity);

        return ResponseEntity.ok().body(chattingEntity);
    }


    public ResponseEntity<?> getChattingList(String userId) {
        UserEntity user =  userRepository.findByUserId(userId);
        if(user == null){
            System.out.println(DiaryStatus.INVALID_USER_ID.toString());
        }
        return ResponseEntity.ok().body(chattingRepository.findAllByUserId(user));
    }
}
