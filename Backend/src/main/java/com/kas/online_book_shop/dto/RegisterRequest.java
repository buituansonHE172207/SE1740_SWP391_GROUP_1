package com.kas.online_book_shop.dto;

import com.kas.online_book_shop.enums.Role;

public record RegisterRequest(
    String fullName,
    String email,
    String password,
    String province,
    String district,
    String ward,
    String phone,
    String address,
    Role role) {

}
