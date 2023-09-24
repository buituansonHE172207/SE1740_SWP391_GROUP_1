package com.kas.online_book_shop.exception;

public class  PostNotFoundException extends RuntimeException {
    public PostNotFoundException(String message) {
        super(message);
    }
}
