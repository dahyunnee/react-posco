package com.diary.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "User")
public class UserEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long userId;
  @Column(name = "nickName")
  private String nickName;
  @Column(name = "identity")
  private String identity;
  @Column(name = "password")
  private String password;

  public long getUserId() {
    return userId;
  }

  public String getNickName() {
    return nickName;
  }
  public String getIdentity() {
    return identity;
  }
  public String getPassword() {
    return password;
  }
  public void registerNewUser(String nickName, String identity, String password) {
    this.nickName = nickName;
    this.identity = identity;
    this.password = password;
  }
}
