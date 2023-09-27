package com.kas.online_book_shop.auth;

import com.kas.online_book_shop.model.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

  private String fullname;
  private String email;
  private String password;
  private Role role;
}
