package com.diary.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Emotion")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmotionEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long emotionId;
  @OneToOne
  @JoinColumn(name = "analysisId", nullable = false)
  private AnalysisEntity analysisId;
  @Column(name = "fear")
  private long fear;
  @Column(name = "surprised")
  private long surprised;
  @Column(name = "anger")
  private long anger;
  @Column(name = "sadness")
  private long sadness;
  @Column(name = "neutrality")
  private long neutrality;
  @Column(name = "happiness")
  private long happiness;
  @Column(name = "disgust")
  private long disgust;

  public void setEmotionId(long emotionId) {
    this.emotionId = emotionId;
  }

  public void setAnalysisId(AnalysisEntity analysisId) {
    this.analysisId = analysisId;
  }

  public void setFear(long fear) {
    this.fear = fear;
  }

  public void setSurprised(long surprised) {
    this.surprised = surprised;
  }

  public void setAnger(long anger) {
    this.anger = anger;
  }

  public void setSadness(long sadness) {
    this.sadness = sadness;
  }

  public void setNeutrality(long neutrality) {
    this.neutrality = neutrality;
  }

  public void setHappiness(long happiness) {
    this.happiness = happiness;
  }


  public void setDisgust(long disgust) {
    this.disgust = disgust;
  }

}
