package com.diary.backend.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "Analysis")
public class AnalysisEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long analysisId;

  @OneToOne
  @JoinColumn(name = "diaryId", nullable = false)
  private DiaryEntity diaryId;
  @Column(name = "resultComment")
  private String resultComment;


  public long getAnalysisId() {
    return analysisId;
  }

  public void setAnalysisId(long analysisId) {
    this.analysisId = analysisId;
  }


  public DiaryEntity getDiaryId() {
    return diaryId;
  }

  public void setDiaryId(DiaryEntity diaryId) {
    this.diaryId = diaryId;
  }


  public String getResultComment() {
    return resultComment;
  }

  public void setResultComment(String resultComment) {
    this.resultComment = resultComment;
  }

}
