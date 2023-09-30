package com.kas.online_book_shop.dto;

public record RegisterRequest(
    String fullname,
    String email,
    String password,
    String province,
    String district,
    String ward,
    String phone,
    String address) {

}
