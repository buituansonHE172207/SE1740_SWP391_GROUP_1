package com.kas.online_book_shop.dto;

public record AuthenticationRequest(
        String email,
        String password) {

}
