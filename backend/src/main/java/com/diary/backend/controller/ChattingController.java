package com.diary.backend.controller;

import com.diary.backend.dto.AIChatbotReqDto;
import com.diary.backend.service.ChattingServices;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ChattingController {
    private final ChattingServices chattingServices;

    public ChattingController(ChattingServices chattingServices) {
        this.chattingServices = chattingServices;
    }

    @PostMapping("/chatting")
    public ResponseEntity<?> handleChatting(@RequestBody AIChatbotReqDto msg) throws JsonProcessingException {
        return chattingServices.handleChatting(msg);
    }

    @GetMapping("/chatting/list")
    public ResponseEntity<?> getChattingList(@RequestParam String userId) {
        return chattingServices.getChattingList(userId);
    }
}
