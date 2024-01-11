package com.diary.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CurrentTimestamp;

@Entity
@Table(name = "Chatting")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChattingEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long chattingId;
  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private UserEntity userId;
  @Column(name = "question")
  private String question;
  @Column(name = "answer")
  private String answer;
  @CurrentTimestamp
  @Column(name = "chatTime")
  private java.sql.Timestamp chatTime;


  public long getChattingId() {
    return chattingId;
  }

  public void setChattingId(long chattingId) {
    this.chattingId = chattingId;
  }


  public UserEntity getUserId() {
    return userId;
  }

  public void setUserId(UserEntity userId) {
    this.userId = userId;
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

  public java.sql.Timestamp getChatTime() {
    return chatTime;
  }

  public void setChatTime(java.sql.Timestamp chatTime) {
    this.chatTime = chatTime;
  }

}
