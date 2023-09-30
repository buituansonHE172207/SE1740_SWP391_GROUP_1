package com.kas.online_book_shop.dto;

public record ChangePasswordRequest(
        String token,
        String oldPassword,
        String newPassword) {

}
