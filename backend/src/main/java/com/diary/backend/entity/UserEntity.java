package com.diary.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "User")
public class UserEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  @Column(name = "nickName")
  private String nickName;
  @Column(name = "userId")
  private String userId;
  @Column(name = "password")
  private String password;
  @Column(name = "name")
  private String name;
  @Column(name = "email")
  private String email;


  public long geId() {
    return id;
  }

  public String getNickName() {
    return nickName;
  }
  public String getUserId() {
    return userId;
  }
  public String getPassword() {
    return password;
  }
  public String getName() {
    return name;
  }
  public String getEmail() {
    return email;
  }
  public void registerNewUser(String nickName, String userId, String password, String name, String email) {
    this.nickName = nickName;
    this.userId = userId;
    this.password = password;
    this.name = name;
    this.email = email;
  }
}
