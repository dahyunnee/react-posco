package com.diary.backend.entity;

import com.diary.backend.dto.UserRegisterDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "User")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
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


  public void registerNewUser(String nickName, String userId, String password, String name, String email) {
    this.nickName = nickName;
    this.userId = userId;
    this.password = password;
    this.name = name;
    this.email = email;
  }

  public UserRegisterDto toDto(){
    return UserRegisterDto.builder().userId(this.userId)
            .email(this.email)
            .name(this.name)
            .nickName(this.nickName)
            .build();
  }
}
