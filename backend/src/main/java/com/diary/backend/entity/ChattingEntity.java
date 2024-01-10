package com.diary.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CurrentTimestamp;

@Entity
@Table(name = "Chatting")
public class ChattingEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long chattingId;
  @ManyToOne
  @JoinColumn(name = "analysisId", nullable = false)
  private AnalysisEntity analysisId;
  @Column(name = "question")
  private String question;
  @Column(name = "answer")
  private String answer;
  @Column(name = "dialogIndex")
  private long dialogIndex;
  @CurrentTimestamp
  @Column(name = "chatTime")
  private java.sql.Timestamp chatTime;


  public long getChattingId() {
    return chattingId;
  }

  public void setChattingId(long chattingId) {
    this.chattingId = chattingId;
  }


  public AnalysisEntity getAnalysisId() {
    return analysisId;
  }

  public void setAnalysisId(AnalysisEntity analysisId) {
    this.analysisId = analysisId;
  }


  public String getQuestion() {
    return question;
  }

  public void setQuestion(String question) {
    this.question = question;
  }


  public String getAnswer() {
    return answer;
  }

  public void setAnswer(String answer) {
    this.answer = answer;
  }


  public long getDialogIndex() {
    return dialogIndex;
  }

  public void setDialogIndex(long dialogIndex) {
    this.dialogIndex = dialogIndex;
  }


  public java.sql.Timestamp getChatTime() {
    return chatTime;
  }

  public void setChatTime(java.sql.Timestamp chatTime) {
    this.chatTime = chatTime;
  }

}
