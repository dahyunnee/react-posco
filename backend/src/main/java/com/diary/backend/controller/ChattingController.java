package com.diary.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChattingController {
    @PostMapping("/chatting")
    public String handleChatting(){
        return "chatting";
    }
}
