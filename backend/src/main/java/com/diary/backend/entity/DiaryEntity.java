package com.diary.backend.entity;

import com.diary.backend.dto.NewDiaryDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CurrentTimestamp;

import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "Diary")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DiaryEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long diaryId;
  @ManyToOne
  @JoinColumn(name = "author", nullable = false)
  private UserEntity author;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "write_date")
  private Timestamp writeDate;
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

}
