package com.diary.backend.entity;

import com.diary.backend.dto.NewDiaryDto;
import jakarta.persistence.*;
import org.hibernate.annotations.CurrentTimestamp;

import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "Diary")
public class DiaryEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long diaryId;
  @ManyToOne
  @JoinColumn(name = "author", nullable = false)
  private UserEntity author;
  @CurrentTimestamp
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "writeDate")
  private java.sql.Timestamp writeDate;
  @Column(name = "weather")
  private String weather;
  @Column(name = "content")
  private String content;

  public void setNewDiary(UserEntity author, Timestamp writeDate, String weather, String content) {
    if(author == null|| content == null){
      throw new IllegalArgumentException("author, weather, content must not be null");
    }
    this.author = author;
    this.writeDate = writeDate;
    this.weather = weather;
    this.content = content;
  }

  public long getDiaryId() {
    return diaryId;
  }

  public UserEntity getAuthor() {
    return author;
  }

  public java.sql.Timestamp getWriteDate() {
    return writeDate;
  }

  public String getWeather() {
    return weather;
  }

  public String getContent() {
    return content;
  }
}
