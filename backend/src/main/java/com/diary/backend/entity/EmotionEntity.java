package com.diary.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Emotion")
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


  public long getEmotionId() {
    return emotionId;
  }

  public void setEmotionId(long emotionId) {
    this.emotionId = emotionId;
  }


  public AnalysisEntity getAnalysisId() {
    return analysisId;
  }

  public void setAnalysisId(AnalysisEntity analysisId) {
    this.analysisId = analysisId;
  }


  public long getFear() {
    return fear;
  }

  public void setFear(long fear) {
    this.fear = fear;
  }


  public long getSurprised() {
    return surprised;
  }

  public void setSurprised(long surprised) {
    this.surprised = surprised;
  }


  public long getAnger() {
    return anger;
  }

  public void setAnger(long anger) {
    this.anger = anger;
  }


  public long getSadness() {
    return sadness;
  }

  public void setSadness(long sadness) {
    this.sadness = sadness;
  }


  public long getNeutrality() {
    return neutrality;
  }

  public void setNeutrality(long neutrality) {
    this.neutrality = neutrality;
  }


  public long getHappiness() {
    return happiness;
  }

  public void setHappiness(long happiness) {
    this.happiness = happiness;
  }


  public long getDisgust() {
    return disgust;
  }

  public void setDisgust(long disgust) {
    this.disgust = disgust;
  }

}
